from django.contrib import admin
from .models import Category, Donation, Item, User

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Item)


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'user', 'original_amount', 'currency',
                    'amount_uah')
    list_filter = ('currency',)
    search_fields = ('user__email',)
