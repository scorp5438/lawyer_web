from rest_framework import filters
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CaseSerializer, PracticeSerializer
from ..models import Cases, Practice


class CaseViewSet(ModelViewSet):
    queryset = Cases.objects.select_related('case_category').all()
    serializer_class = CaseSerializer
    http_method_names = ['get', 'post', 'delete', 'patch']
    filter_backends = [
        DjangoFilterBackend,  # для обычной фильтрации
        filters.SearchFilter,  # для поиска по полям
        filters.OrderingFilter  # для сортировки
    ]
    filterset_fields = ['case_category']
    search_fields = ['$name_case', '$description']
    ordering_fields = ['pk', 'name_case', 'start_date', 'end_date'] #'case_category__name',
    ordering = ['-pk']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdminUser()]

class PracticeViewSet(ModelViewSet):
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    http_method_names = ['get',]
