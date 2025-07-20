from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from profiles.models import Profile, Address

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Профиль'
    fk_name = 'user_id'


class CustomUserAdmin(UserAdmin):
    list_display = 'pk', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser'
    list_display_links = 'pk', 'username', 'email',
    inlines = (ProfileInline,)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = 'pk', 'region', 'city', 'street', 'house'
    list_display_links = 'pk', 'region',


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
