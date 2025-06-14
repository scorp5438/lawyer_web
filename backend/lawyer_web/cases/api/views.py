from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CaseSerializer, PracticeSerializer
from ..models import Cases, Practice


class CaseViewSet(ModelViewSet):
    queryset = Cases.objects.select_related('case_category').all()
    serializer_class = CaseSerializer
    http_method_names = ['get', 'post', 'delete', 'patch']
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['case_category']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdminUser()]

class PracticeViewSet(ModelViewSet):
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    http_method_names = ['get',]
