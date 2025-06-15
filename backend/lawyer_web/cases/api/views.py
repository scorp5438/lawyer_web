from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from .serializers import CaseSerializer, PracticeSerializer
from ..models import Cases, Practice


class CaseViewSet(ModelViewSet):
    """
    ViewSet для операций с кейсами (модель Cases).

     Особенности:
    - Доступ только на чтение (разрешены только GET-запросы)
    - Оптимизация запросов: Использует 'select_related' для загрузки связанной категории ('case_category')
    - Фильтрация, поиск и сортировка:
      - Фильтрация по полю 'case_category'
      - Поиск по полям 'name_case' и 'description' (регистронезависимый, с использованием '$' для полнотекстового поиска)
      - Сортировка по 'pk', 'name_case', 'start_date', 'end_date' (по умолчанию: '-pk' — новые первыми)
    Права доступа:
      - Просмотр списка и деталей ('list', 'retrieve') — доступно всем
      - Остальные действия ('create', 'update', 'delete') — только администраторам ('IsAdminUser')

    Примеры запросов:
    - Фильтрация: /api/cases/?case_category=1
    - Поиск: /api/cases/?search=важный
    - Сортировка: /api/cases/?ordering=-start_date (от новых к старым)
    """
    queryset = Cases.objects.select_related('case_category').all()
    serializer_class = CaseSerializer
    http_method_names = ['get']
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_fields = ['case_category']
    search_fields = ['$name_case', '$description']
    ordering_fields = ['pk', 'name_case', 'start_date', 'end_date'] #'case_category__name',
    ordering = ['-pk']

    def get_permissions(self):
        """
        Определяет права доступа в зависимости от действия ('action').

        Returns:
            list: Пустой список для 'list' и 'retrieve', иначе '[IsAdminUser()]'.
        """
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdminUser()]

class PracticeViewSet(ModelViewSet):
    """
    ViewSet для работы с моделью Practice

    Обеспечивает только чтение данных (разрешен только GET-метод)

    Атрибуты:
        queryset (QuerySet): Все объекты Practice из базы данных
        serializer_class (ModelSerializer): Класс сериализатора для модели Practice
        http_method_names (list): Разрешенные HTTP-методы (только GET)
    """
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    http_method_names = ['get',]
