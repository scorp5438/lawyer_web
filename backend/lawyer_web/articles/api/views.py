from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ViewSet
from rest_framework.pagination import PageNumberPagination

from .serializers import ArticleSerializer, CategorySerializer, TypeSerializer
from ..models import Article, Category


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.select_related('category').all()
    pagination_class = CustomPagination
    serializer_class = ArticleSerializer
    http_method_names = ['get', 'post', 'delete', 'patch']
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_fields = ['type', 'category']
    search_fields = ['$title', '$title', '$content']
    ordering_fields = ['pk', 'title', 'type', 'category', 'update_date']
    ordering = ['-pk']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdminUser()]


class CategoryApiViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']


class TypeApiViewSet(ViewSet):
    serializer = TypeSerializer

    def list(self, request):
        result = Article.ARTICLE_TYPES
        types = [res[0] for res in result]
        return Response({'types': types})
