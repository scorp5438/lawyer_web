from rest_framework import serializers

from ..models import Article, Category


class ArticleSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Article
    """

    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = (
            'title',
            'type',
            'category_name',
            'content',
            'creation_date',
            'update_date',
            'image'

        )

    def get_category_name(self, obj):
        return obj.category.name


class CategorySerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Category
    """

    class Meta:
        model = Category
        fields = 'pk', 'name',


class TypeSerializer(serializers.Serializer):
    """
    Сериализатор для choices поля type модели Article
    """

    types = serializers.ListField(
        child=serializers.ChoiceField(choices=Article.ARTICLE_TYPES)
    )
