from datetime import datetime

from django.contrib.auth.models import User
from django.db import models
from django.db.models import CASCADE

from .services.geocoder import PhotonGeocoder


class Profile(models.Model):
    user_id = models.OneToOneField(
        to=User,
        on_delete=CASCADE,
        related_name='profile',
        related_query_name='profile',
        unique=True,
    )
    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        unique=True,
        verbose_name='номер телефона'
    )

    fb = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='фейсбук'
    )
    x = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='твиттер'
    )
    tg = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='телеграмм'
    )
    wa = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='ватсап'
    )
    viber = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='вайбер'
    )
    inst = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='инстаграм'
    )
    site = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='сайт'
    )
    bio = models.TextField(
        max_length=5000,
        blank=True,
        null=True,
        verbose_name='биография'
    )

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профиль'


class Address(models.Model):
    region = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    street = models.CharField(blank=True, max_length=100)
    house = models.CharField(max_length=20)

    latitude = models.FloatField(null=True, blank=True, verbose_name='широта')
    longitude = models.FloatField(null=True, blank=True, verbose_name='долгота')
    coordinates_updated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Адрес'
        verbose_name_plural = 'Адрес'

    def get_full_address(self):
        return f"{self.region}, {self.city}, {self.street}, {self.house}"

    @property
    def coordinates(self):
        return PhotonGeocoder.geocode(self.get_full_address())

    def save(self, *args, **kwargs):
        if not self.latitude and not self.longitude:
            self.latitude, self.longitude = PhotonGeocoder.geocode(self.get_full_address())
        super().save(*args, **kwargs)
        return None
