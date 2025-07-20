from django.db import models
from django.db.models import CASCADE
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill


class Article(models.Model):
    ARTICLE_TYPES = [
        ('заметка', 'заметка'),
        ('статья', 'статья'),
        ('новое в праве', 'новое в праве')
    ]

    title = models.CharField(
        max_length=100,
        blank=False,
        null=False,
        db_index=True,
        verbose_name='Заголовок'
    )
    type = models.CharField(
        blank=False,
        null=False,
        choices=ARTICLE_TYPES,
        db_index=True,
        verbose_name='тип статьи'
    )
    category = models.ForeignKey(
        to='Category',
        on_delete=CASCADE,
        related_name='сategory',
        related_query_name='сategory',
        verbose_name='категория',
        db_index=True,
    )
    content = models.TextField(
        max_length=3000,
        blank=False,
        null=False,
        db_index=True,
        verbose_name='текст статьи'
    )
    creation_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='дата создания'
    )
    update_date = models.DateTimeField(
        auto_now=True,
        verbose_name='дата изменения',
        db_index=True,
    )
    image = ProcessedImageField(
        upload_to='images/',
        processors=[ResizeToFill(450, 340)],
        format='JPEG',
        options={'quality': 85},
        blank=True,
        null=True,
        verbose_name='Изображение для статьи'
    )

    class Meta:
        verbose_name = 'Статью'
        verbose_name_plural = 'Статья'

    def get_image_url(self):
        """Возвращает относительный URL изображения или None если изображения нет"""
        return f'/media/{self.image.name}' if self.image else None

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(
        max_length=30,
        blank=False,
        null=False,
        db_index=True,
        verbose_name='категория статьи'
    )

    class Meta:
        verbose_name = 'Категорию'
        verbose_name_plural = 'Категория'

    def __str__(self):
        return self.name
