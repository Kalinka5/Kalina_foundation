from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager


class Category(models.Model):
    slug = models.SlugField()
    title = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self) -> str:
        return self.title


class Item(models.Model):
    title = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to='uploads/', blank=True, default=None)
    amount = models.IntegerField(null=False)
    full_price = models.IntegerField()
    collected = models.IntegerField(default=0)
    category_id = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        default=1
    )

    class Meta:
        # Shows like Items in admin panel
        verbose_name_plural = "Items"
        ordering = ['title']  # Default ordering by title

    def __str__(self) -> str:
        return self.title


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        max_length=255, blank=True, default='', unique=True)
    email = models.EmailField(blank=True, default='', unique=True)
    first_name = models.CharField(max_length=255, blank=True, default='')
    last_name = models.CharField(max_length=255, blank=True, default='')
    image = models.ImageField(
        upload_to="profile_images/", blank=True, default="profile_images/default_profile.png")
    donated = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
