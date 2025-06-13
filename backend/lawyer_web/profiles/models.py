from django.contrib.auth.models import User
from django.db import models
from django.db.models import CASCADE


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
    # Если будет меняться модель, переписать название поля на  inst и в сериалайзере
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

