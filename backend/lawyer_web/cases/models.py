from django.db import models
from django.db.models import CASCADE


class Cases(models.Model):
    name_case = models.CharField(
        max_length=100,
        blank=False,
        null=False,
        db_index=True,
        verbose_name='Заголовок'
    )
    description = models.TextField(
        max_length=3000,
        blank=False,
        null=False,
        verbose_name='Описание процесса'
    )
    case_category = models.OneToOneField(
        to='Practice',
        on_delete=CASCADE,
        related_name='practice',
        related_query_name='practice',
        verbose_name='категория процесса'
    )
    start_date = models.CharField(
        auto_now_add=True,
        verbose_name='начало процесса'
    )
    end_date = models.CharField(
        verbose_name='окончание процесса'
    )
    review = models.CharField(
        max_length=200,
        blank=False,
        null=False,
        verbose_name='отзыв'

    )


class Practice(models.Model):
    category = models.CharField(
        max_length=50,
        blank=False,
        null=False,
        db_index=True,
        verbose_name='Наименование практики'
    )
    description = models.TextField(
        max_length=300,
        blank=False,
        null=False,
        verbose_name='Описание практики'
    )
