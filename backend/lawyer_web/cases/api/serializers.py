from drf_spectacular.utils import extend_schema_serializer, OpenApiExample
from rest_framework import serializers

from ..models import Cases, Practice


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            'Пример кейса',
            value={
                'name_case': 'Успешный проект для крупного банка',
                'description': 'Разработка системы онлайн-банкинга...',
                'case_category_name': 'Финансовые системы',
                'tart_date': '2023-01-15',
                'end_date': '2023-06-20',
                'review': 'Отличное сотрудничество, высокое качество работ'
            },
            response_only=True
        )
    ]
)
class CaseSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Cases.

     Поля:
    - Основные:
      - 'name_case': Название кейса
      - 'description': Описание
      - 'start_date', 'end_date': Даты начала и завершения
      - 'review': Отзыв (если есть)
    - Дополнительное:
      - 'case_category_name': Название категории (из связанной модели 'case_category')

     Методы:
    - 'get_case_category_name': Возвращает название категории ('case_category.category').
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
        """
        Возвращает название категории кейса.

        Args:
            obj (Cases): Объект модели Cases.

        Returns:
            str: Название категории ('case_category.category').
        """
        return obj.case_category.category


class PracticeSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Practice

    Поля:
        - 'pk:' Первичный ключ (автоматически генерируется)
        - 'category': Категория практики
        - 'description': Описание практики

    Мета-класс:
        'model': Practice - модель, с которой работает сериализатор
        'fields': Список полей для сериализации ('pk', 'category', 'description')
    """
    class Meta:
        model = Practice
        fields = (
            'pk',
            'category',
            'description',
        )
