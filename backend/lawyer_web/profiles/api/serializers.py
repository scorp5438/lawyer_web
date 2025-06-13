from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """
    Сериализатор для моделей User и Profile
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
        return obj.profile.phone

    def get_fb(self, obj):
        return obj.profile.fb

    def get_x(self, obj):
        return obj.profile.x

    def get_tg(self, obj):
        return obj.profile.tg

    def get_wa(self, obj):
        return obj.profile.wa

    def get_viber(self, obj):
        return obj.profile.viber

    def get_inst(self, obj):
        return obj.profile.inst

    def get_site(self, obj):
        return obj.profile.site

    def get_bio(self, obj):
        return obj.profile.bio
