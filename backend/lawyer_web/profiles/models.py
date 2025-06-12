from django.db import models
from django.db.models import CASCADE
from django.contrib.auth.models import User

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
    social_networks = models.JSONField(
        blank=True,
        default=list,
        verbose_name='cоциальные сети'
    )

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профиль'

