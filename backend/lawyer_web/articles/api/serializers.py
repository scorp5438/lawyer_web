from rest_framework import serializers

from ..models import Article


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
