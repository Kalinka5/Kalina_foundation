import io
import re
from decimal import Decimal
from unittest import mock

from django.contrib.auth import authenticate
from django.core import mail
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.cache import cache
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.test import APIClient

from PIL import Image

from .models import Donation, User
from .tokens import account_activation_token


ACTIVATION_LINK = re.compile(r"/email-verify/([^/]+)/([^/]+)/")


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
)
class ResendActivationTests(TestCase):
    url = reverse("resend_activation")

    def setUp(self):
        # Throttle counters and the resend cooldown live in the cache
        cache.clear()
        self.client = APIClient()

    def make_user(self, email="new@example.com", is_active=False):
        return User.objects.create_user(
            email=email, username=email, password="secret-pass-123",
            is_active=is_active,
        )

    def resend(self, email):
        return self.client.post(self.url, {"email": email}, format="json")

    def test_sends_a_working_link_to_an_inactive_account(self):
        user = self.make_user()

        response = self.resend("new@example.com")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "success")
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ["new@example.com"])

        uidb64, token = ACTIVATION_LINK.search(mail.outbox[0].body).groups()
        self.assertEqual(force_str(urlsafe_base64_decode(uidb64)), str(user.pk))
        self.assertTrue(account_activation_token.check_token(user, token))

    def test_email_lookup_ignores_case_and_whitespace(self):
        self.make_user()

        self.resend("  New@Example.COM ")

        self.assertEqual(len(mail.outbox), 1)

    def test_same_response_for_active_and_unknown_accounts(self):
        self.make_user(email="active@example.com", is_active=True)
        expected = self.resend("new-but-missing@example.com").json()

        for email in ("active@example.com", "nobody@example.com"):
            response = self.resend(email)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json(), expected)

        self.assertEqual(len(mail.outbox), 0)

    def test_rejects_missing_or_malformed_email(self):
        for payload in ({}, {"email": ""}, {"email": "not-an-email"}):
            response = self.client.post(self.url, payload, format="json")
            self.assertEqual(response.status_code, 400)
        self.assertEqual(len(mail.outbox), 0)

    def test_cooldown_prevents_repeated_emails(self):
        self.make_user()

        self.resend("new@example.com")
        second = self.resend("new@example.com")

        self.assertEqual(second.status_code, 200)
        self.assertEqual(len(mail.outbox), 1)

    def test_registration_starts_the_cooldown(self):
        self.client.post(
            reverse("register_new_user"),
            {"username": "fresh@example.com", "email": "fresh@example.com",
             "password": "secret-pass-123"},
            format="json",
        )
        self.assertEqual(len(mail.outbox), 1)

        self.resend("fresh@example.com")

        self.assertEqual(len(mail.outbox), 1)

    def test_rate_limited_per_ip(self):
        for _ in range(5):
            self.assertEqual(self.resend("nobody@example.com").status_code, 200)

        self.assertEqual(self.resend("nobody@example.com").status_code, 429)


@override_settings(
    EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend",
)
class RegisterActivationEmailTests(TestCase):
    def setUp(self):
        cache.clear()

    def test_register_sends_activation_link_and_link_activates(self):
        client = APIClient()
        response = client.post(
            reverse("register_new_user"),
            {"username": "fresh@example.com", "email": "fresh@example.com",
             "password": "secret-pass-123"},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(mail.outbox), 1)
        uidb64, token = ACTIVATION_LINK.search(mail.outbox[0].body).groups()

        activated = client.get(reverse("activate", args=[uidb64, token]))

        self.assertEqual(activated.json()["status"], "success")
        self.assertTrue(User.objects.get(email="fresh@example.com").is_active)


def png_upload(name="avatar.png", size=(8, 8), image_format="PNG"):
    buffer = io.BytesIO()
    Image.new("RGB", size, "yellow").save(buffer, format=image_format)
    return SimpleUploadedFile(name, buffer.getvalue(), content_type="image/png")


class ProfileTests(TestCase):
    def setUp(self):
        cache.clear()
        self.user = User.objects.create_user(
            email="me@example.com", username="me@example.com",
            password="old-secret-pass-1", first_name="Olena", is_active=True,
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_get_hides_the_password_and_reports_account_state(self):
        data = self.client.get(reverse("profile")).json()

        self.assertNotIn("password", data)
        self.assertNotIn("username", data)
        self.assertEqual(data["email"], "me@example.com")
        self.assertTrue(data["has_password"])
        self.assertIsNone(data["rank"])
        self.assertEqual(data["donations_count"], 0)

    def test_rank_counts_users_who_donated_more(self):
        self.user.donated = Decimal("500")
        self.user.save()
        for i, amount in enumerate(("900", "700", "100")):
            User.objects.create_user(
                email=f"d{i}@example.com", username=f"d{i}@example.com",
                donated=Decimal(amount))

        self.assertEqual(self.client.get(reverse("profile")).json()["rank"], 3)

    def test_google_accounts_have_no_password(self):
        self.user.set_unusable_password()
        self.user.save()

        self.assertFalse(
            self.client.get(reverse("profile")).json()["has_password"])

    def test_patch_updates_names_and_ignores_protected_fields(self):
        response = self.client.patch(reverse("profile"), {
            "first_name": "  Iryna ", "last_name": "Koval",
            "is_superuser": True, "is_staff": True, "donated": "99999",
            "email": "attacker@example.com",
        }, format="json")

        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "Iryna")
        self.assertEqual(self.user.last_name, "Koval")
        self.assertFalse(self.user.is_superuser)
        self.assertFalse(self.user.is_staff)
        self.assertEqual(self.user.donated, Decimal("0"))
        self.assertEqual(self.user.email, "me@example.com")
        self.assertNotIn("password", response.json())

    def test_patch_accepts_an_avatar(self):
        response = self.client.patch(
            reverse("profile"), {"image": png_upload()}, format="multipart")

        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(self.user.image.name.startswith("profile_images/"))

    def test_patch_rejects_a_file_that_is_not_an_image(self):
        fake = SimpleUploadedFile(
            "avatar.png", b"not an image", content_type="image/png")

        response = self.client.patch(
            reverse("profile"), {"image": fake}, format="multipart")

        self.assertEqual(response.status_code, 400)
        self.assertIn("image", response.json())

    def test_patch_rejects_unsupported_image_formats(self):
        response = self.client.patch(
            reverse("profile"),
            {"image": png_upload("avatar.gif", image_format="GIF")},
            format="multipart")

        self.assertEqual(response.status_code, 400)
        self.assertIn("image", response.json())

    def test_patch_rejects_images_over_the_size_limit(self):
        # A tiny limit stands in for the 5 MB one, so no 5 MB file is needed
        with mock.patch("fond_api.serializers.MAX_PROFILE_IMAGE_BYTES", 10):
            response = self.client.patch(
                reverse("profile"), {"image": png_upload()},
                format="multipart")

        self.assertEqual(response.status_code, 400)
        self.assertIn("image", response.json())

    def test_profile_requires_authentication(self):
        self.assertIn(
            APIClient().get(reverse("profile")).status_code, (401, 403))


class ChangePasswordTests(TestCase):
    url = reverse("change_password")

    def setUp(self):
        cache.clear()
        self.user = User.objects.create_user(
            email="me@example.com", username="me@example.com",
            password="old-secret-pass-1", is_active=True,
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def change(self, current, new):
        return self.client.post(self.url, {
            "current_password": current, "new_password": new,
        }, format="json")

    def test_rejects_a_wrong_current_password(self):
        response = self.change("wrong-pass", "brand-new-pass-42")

        self.assertEqual(response.status_code, 400)
        self.assertIn("current_password", response.json())
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("old-secret-pass-1"))

    def test_rejects_weak_or_unchanged_passwords(self):
        for new in ("short", "12345678", "old-secret-pass-1"):
            response = self.change("old-secret-pass-1", new)
            self.assertEqual(response.status_code, 400, new)
            self.assertIn("new_password", response.json())

    def test_changes_the_password(self):
        response = self.change("old-secret-pass-1", "brand-new-pass-42")

        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(
            authenticate(email="me@example.com", password="brand-new-pass-42"))
        self.assertIsNone(
            authenticate(email="me@example.com", password="old-secret-pass-1"))


class DonationHistoryTests(TestCase):
    def setUp(self):
        cache.clear()
        self.user = User.objects.create_user(
            email="me@example.com", username="me@example.com", is_active=True)
        self.other = User.objects.create_user(
            email="other@example.com", username="other@example.com")
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_lists_only_the_current_users_donations(self):
        Donation.objects.create(user=self.user, currency="USD",
                                original_amount=10, amount_uah=410)
        Donation.objects.create(user=self.other, currency="ETH",
                                original_amount=1, amount_uah=90000)

        data = self.client.get(reverse("profile_donations")).json()

        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]["currency"], "USD")
        self.assertEqual(
            self.client.get(reverse("profile")).json()["donations_count"], 1)

    @mock.patch("fond_api.views.get_usd_to_uah", return_value=40)
    def test_paypal_donation_is_recorded(self, _rate):
        from .models import Category, Item
        from .views import DONATE_ITEM_ID
        category = Category.objects.create(slug="c", title="C")
        Item.objects.create(pk=DONATE_ITEM_ID, title="Donate", amount=1,
                            full_price=1, category_id=category)

        response = APIClient().post(reverse("process_donation"), {
            "donate_type": "dollars", "amount": "25",
            "email": "me@example.com",
        }, format="json")

        self.assertEqual(response.status_code, 200)
        donation = Donation.objects.get()
        self.assertEqual(donation.user, self.user)
        self.assertEqual(donation.currency, "USD")
        self.assertEqual(donation.original_amount, Decimal("25"))
        self.assertEqual(donation.amount_uah, Decimal("1000.00"))


class PublicDonorsTests(TestCase):
    def test_leaderboard_hides_private_fields(self):
        User.objects.create_user(
            email="donor@example.com", username="donor@example.com",
            password="secret-pass-123", first_name="Taras",
            donated=Decimal("100"))

        donor = APIClient().get(reverse("top-donators")).json()[0]

        self.assertEqual(donor["display_name"], "Taras")
        for field in ("email", "username", "password", "is_superuser"):
            self.assertNotIn(field, donor)
