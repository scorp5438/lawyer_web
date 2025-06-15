from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ViewSet

from .serializers import ArticleSerializer, CategorySerializer, TypeSerializer
from ..models import Article, Category


class CustomPagination(PageNumberPagination):
    """
    Кастомная пагинация для статей

    Настройки:
        'page_size': 10 - количество элементов на странице по умолчанию
        'page_size_query_param': ''page_size'' - параметр запроса для изменения размера страницы
        'max_page_size': 100 - максимальное количество элементов на странице

    Пример использования:
        /api/articles/?page=2&page_size=20
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ArticleViewSet(ModelViewSet):
    """
    ViewSet для работы со статьями (Article)

    Особенности:
        - Только чтение (GET-запросы)
        - Оптимизированные запросы (select_related для категорий)
        - Кастомная пагинация (CustomPagination)
        - Фильтрация, поиск и сортировка

    Доступ:
        - Просмотр списка и деталей: доступно всем
        - Остальные действия: только администраторам

    Параметры запросов:
        - Фильтрация: ?type=X&category=Y
        - Поиск: ?search=текст (по заголовку и содержимому)
        - Сортировка: ?ordering=field (-field для обратной)
        - Пагинация: ?page=N&page_size=M

    Сортировка по умолчанию: новые первыми (-pk)
    """
    queryset = Article.objects.select_related('category').all()
    pagination_class = CustomPagination
    serializer_class = ArticleSerializer
    http_method_names = ['get', ]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_fields = ['type', 'category']
    search_fields = ['$title', '$content']
    ordering_fields = ['pk', 'title', 'type', 'category', 'update_date']
    ordering = ['-pk']

    def get_permissions(self):
        """
        Определение прав доступа в зависимости от действия
        """
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdminUser()]


class CategoryApiViewSet(ModelViewSet):
    """
    ViewSet для работы с категориями (модель Category)

    Обеспечивает только чтение данных (разрешен только GET-метод)

    Атрибуты:
        'queryset' (QuerySet): Все объекты Category из базы данных
        'serializer_class' (ModelSerializer): Класс сериализатора для модели Category
        'http_method_names' (list): Разрешенные HTTP-методы (только GET)

    Доступ:
        - Доступно всем пользователям только для чтения
        - Изменения (POST, PUT, DELETE) запрещены на уровне http_method_names
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']


class TypeApiViewSet(ViewSet):
    """
    ViewSet для получения типов статей

    Предоставляет список возможных типов статей, определенных в Article.ARTICLE_TYPES

    Методы:
        'list': Возвращает список типов статей в формате {'types': [...]}

    Особенности:
        - Использует TypeSerializer для описания формата ответа
        - Возвращает только первый элемент каждого choices-значения
        - Доступен только GET-запрос (list)

    Пример ответа:
        {'types': ['заметка', 'статья', 'новое в праве']}
    """
    serializer = TypeSerializer

    def list(self, request):
        """
        Получение списка типов статей

        Логика:
            1. Берет Article.ARTICLE_TYPES (choices-значения)
            2. Извлекает первый элемент каждого choices-значения
            3. Возвращает список в Response

        Возвращает:
            Response: {'types': [список типов]}
        """
        result = Article.ARTICLE_TYPES
        types = [res[0] for res in result]
        return Response({'types': types})
