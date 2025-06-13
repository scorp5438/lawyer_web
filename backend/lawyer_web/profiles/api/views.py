from django.contrib.auth.models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.select_related('profile').all()
    serializer_class = UserSerializer
    http_method_names = ['get',]
    # permission_classes = [IsAuthenticated, IsAdminUser]

