from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from .serializers import CaseSerializer
from ..models import Cases


class CaseViewSet(ModelViewSet):
    queryset = Cases.objects.select_related('case_category').all()
    serializer_class = CaseSerializer
    http_method_names = ['get', 'post', 'delete', 'patch']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdminUser()]
