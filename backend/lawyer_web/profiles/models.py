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
    vk = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='Вконтакте'
    )
    _max = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name='MAX'
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

    def __str__(self):
        return f"{self.user_id.username}"

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профиль'


class Address(models.Model):
    region = models.CharField(max_length=100, verbose_name='Регион')
    district = models.CharField(blank=True, max_length=100, verbose_name='Район')
    city = models.CharField(max_length=100, verbose_name='Населенный пункт')
    street = models.CharField(blank=True, max_length=100, verbose_name='Улица')
    house = models.CharField(max_length=20, verbose_name='Номер дома')
    structure = models.CharField(blank=True, max_length=100, verbose_name='Строение')
    housing = models.CharField(blank=True, max_length=100, verbose_name='Корпус')

    latitude = models.FloatField(null=True, blank=True, verbose_name='широта')
    longitude = models.FloatField(null=True, blank=True, verbose_name='долгота')
    coordinates_updated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Адрес'
        verbose_name_plural = 'Адрес'

    def get_full_address(self):
        return f"{self.region}, {self.city}, {self.street}, {self.house}"

    def save(self, *args, **kwargs):
        need_update = False

        if not self.pk:
            need_update = True
        else:
            try:
                old = Address.objects.get(pk=self.pk)
                if (old.region != self.region or
                        old.city != self.city or
                        old.street != self.street or
                        old.house != self.house):
                    need_update = True
            except Address.DoesNotExist:
                need_update = True

        if need_update or not self.latitude or not self.longitude:
            coords = PhotonGeocoder.geocode(self.get_full_address())
            if coords and coords[0] is not None and coords[1] is not None:
                self.latitude, self.longitude = coords

        super().save(*args, **kwargs)

    @property
    def coordinates(self):
        if self.latitude is not None and self.longitude is not None:
            return self.latitude, self.longitude

        coords = PhotonGeocoder.geocode(self.get_full_address())
        if coords and coords[0] is not None and coords[1] is not None:
            self.latitude, self.longitude = coords
            self.save(update_fields=['latitude', 'longitude'])
            return coords

        return None, None
