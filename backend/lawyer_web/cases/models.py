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
        db_index=True,
        verbose_name='Описание процесса'
    )
    case_category = models.ForeignKey(
        to='Practice',
        on_delete=CASCADE,
        related_name='practice',
        related_query_name='practice',
        verbose_name='категория процесса'
    )
    start_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='начало процесса',
        db_index=True,
    )
    end_date = models.DateTimeField(
        verbose_name='окончание процесса',
        null = True,
        db_index=True,
    )
    review = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name='отзыв'

    )

    class Meta:
        verbose_name = 'Делопроизводство'
        verbose_name_plural = 'Делопроизводство'

    def __str__(self):
        return self.name_case

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

    class Meta:
        verbose_name = 'Практику'
        verbose_name_plural = 'Практика'

    def __str__(self):
        return self.category
