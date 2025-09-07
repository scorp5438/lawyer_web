from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.contrib import messages
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

    # Добавляем методы для синглтона
    def has_add_permission(self, request):
        """Запрещаем добавление, если пользователь уже существует"""
        if User.objects.exists():
            return False
        return super().has_add_permission(request)

    def changelist_view(self, request, extra_context=None):
        """Показываем информационное сообщение при наличии пользователя"""
        if User.objects.exists():
            messages.info(
                request,
                "✅ В системе уже есть пользователь. Создание новых пользователей запрещено. "
                "Для изменений редактируйте существующую запись."
            )
        return super().changelist_view(request, extra_context)

    def get_actions(self, request):
        """Скрываем действия массового удаления/изменения для пользователей"""
        actions = super().get_actions(request)
        if User.objects.exists():
            if 'delete_selected' in actions:
                del actions['delete_selected']
        return actions


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = 'pk', 'region', 'city', 'street', 'house'
    list_display_links = 'pk', 'region',

    def has_add_permission(self, request):
        """Запрещаем добавление, если адрес уже существует"""
        if Address.objects.exists():
            return False
        return super().has_add_permission(request)

    def changelist_view(self, request, extra_context=None):
        """Показываем информационное сообщение"""
        if Address.objects.exists():
            messages.info(
                request,
                "✅ Адрес уже создан. Можно редактировать только существующую запись."
            )
        return super().changelist_view(request, extra_context)


admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
