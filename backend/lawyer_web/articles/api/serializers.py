from rest_framework import serializers

from ..models import Article, Category


class ArticleSerializer(serializers.ModelSerializer):
    """
    Сериализатор для статей (Article)

    Поля:
        - 'title': заголовок статьи
        - 'type': тип статьи
        - 'category_name': название категории (вычисляемое поле)
        - 'content': содержимое статьи
        - 'creation_date': дата создания
        - 'update_date': дата обновления
        - 'image': изображение статьи

    Методы:
        - 'get_category_name': возвращает название категории статьи
    """
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'type',
            'category_name',
            'content',
            'creation_date',
            'update_date',
            'image'

        )

    def get_category_name(self, obj):
        """
        Получение названия категории статьи

        Аргументы:
            'obj': объект статьи

        Возвращает:
            Название категории (str)
        """
        return obj.category.name


class CategorySerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Category

    Поля:
        - 'pk': Первичный ключ (автоматически генерируется)
        - 'name': Название категории

    Мета-класс:
        'model': Category - модель, с которой работает сериализатор
        'fields': Кортеж полей для сериализации (pk, name)
    """
    class Meta:
        model = Category
        fields = 'pk', 'name',


class TypeSerializer(serializers.Serializer):
    """
    Сериализатор для работы с типами статей (choices поле type модели Article)

    Описывает структуру ответа с типами статей

    Поле:
        types: Список (ListField) возможных типов статей, где каждый элемент:
               - ChoiceField с choices=Article.ARTICLE_TYPES
               - Возможные значения берутся из Article.ARTICLE_TYPES

    Назначение:
        - Валидация формата ответа
        - Документирование структуры данных API
        - Обеспечение согласованности формата ответа

    Пример использования:
        Используется TypeApiViewSet для возврата списка типов
    """
    types = serializers.ListField(
        child=serializers.ChoiceField(choices=Article.ARTICLE_TYPES)
    )
