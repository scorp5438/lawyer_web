from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet
from .permissions import HasHeaderReact
from .serializers import UserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.select_related('profile').all()
    serializer_class = UserSerializer
    http_method_names = ['get',]
    permission_classes = [HasHeaderReact | IsAdminUser]

