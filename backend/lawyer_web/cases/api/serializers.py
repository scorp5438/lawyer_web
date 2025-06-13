from rest_framework import serializers

from ..models import Cases


class CaseSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Case
    """

    case_category_name = serializers.SerializerMethodField()

    class Meta:
        model = Cases
        fields = (
            'name_case',
            'description',
            'case_category_name',
            'start_date',
            'end_date',
            'review',
        )

    def get_case_category_name(self, obj):
        return obj.case_category.category
