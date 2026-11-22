import re

from django.core import mail
from django.core.cache import cache
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework.test import APIClient

from .models import User
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
