from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """
    Сериализатор для моделей User и связанного Profile.

    Преобразует данные пользователя, включая поля из связанного профиля:
    - Контактные данные (телефон, соцсети)
    - Дополнительная информация (биография, сайт)

    Поля:
    - Основные: `username`, `first_name`, `last_name`, `email`, `is_staff`
    - Из Profile: `phone`, `fb` (Facebook), `x` (Twitter/X), `tg` (Telegram),
      `wa` (WhatsApp), `viber`, `inst` (Instagram), `site`, `bio`

    Методы:
    - Все методы `get_<field>` возвращают значения из связанного объекта `Profile`.
    """
    phone = serializers.SerializerMethodField()
    fb = serializers.SerializerMethodField()
    x = serializers.SerializerMethodField()
    tg = serializers.SerializerMethodField()
    wa = serializers.SerializerMethodField()
    viber = serializers.SerializerMethodField()
    inst = serializers.SerializerMethodField()
    site = serializers.SerializerMethodField()
    bio = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'is_staff',
            'phone',
            'fb',
            'x',
            'tg',
            'wa',
            'viber',
            'inst',
            'site',
            'bio',
        )

    def get_phone(self, obj):
        """Возвращает телефон из профиля пользователя."""
        return obj.profile.phone

    def get_fb(self, obj):
        """Возвращает ссылку на Facebook из профиля."""
        return obj.profile.fb

    def get_x(self, obj):
        """Возвращает ссылку на Twitter/X из профиля."""
        return obj.profile.x

    def get_tg(self, obj):
        """Возвращает username Telegram из профиля."""
        return obj.profile.tg

    def get_wa(self, obj):
        """Возвращает номер WhatsApp из профиля."""
        return obj.profile.wa

    def get_viber(self, obj):
        """Возвращает номер Viber из профиля."""
        return obj.profile.viber

    def get_inst(self, obj):
        """Возвращает username Instagram из профиля."""
        return obj.profile.inst

    def get_site(self, obj):
        """Возвращает URL персонального сайта из профиля."""
        return obj.profile.site

    def get_bio(self, obj):
        """Возвращает биографию из профиля."""
        return obj.profile.bio
