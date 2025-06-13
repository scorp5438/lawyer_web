from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser


from .serializers import ArticleSerializer
from ..models import Article


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.select_related('category').all()
    serializer_class = ArticleSerializer
    http_method_names = ['get', 'post', 'delete', 'patch']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdminUser()]