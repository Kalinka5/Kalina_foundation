# Generated by Django 5.0.4 on 2024-06-03 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fond_api', '0004_user_donated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='image',
            field=models.ImageField(blank=True, default=None, upload_to='uploads/'),
        ),
    ]
