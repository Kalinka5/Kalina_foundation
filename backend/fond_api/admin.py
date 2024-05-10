from django.contrib import admin
from .models import Category, Item, User

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Item)
