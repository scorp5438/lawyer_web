from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .permissions import HasHeaderReact
from .serializers import UserSerializer


class UserViewSet(ModelViewSet):
    """
    ViewSet для операций с пользователями (User model).

    Предоставляет только безопасные HTTP-методы (GET) для чтения данных пользователей.
    Автоматически включает связанные данные профиля (Profile) через `select_related`.

    Права доступа:
    - Запрос должен содержать заголовок `X-React` (кастомное разрешение `HasHeaderReact`)
        ИЛИ
    - Пользователь является администратором (`IsAdminUser`).

    Attributes:
        queryset (QuerySet): Список пользователей с предварительной загрузкой профилей.
        serializer_class (ModelSerializer): Класс сериализатора для преобразования данных.
        http_method_names (list): Разрешенные HTTP-методы (только GET).
        permission_classes (list): Проверки доступа.
    """
    queryset = User.objects.select_related('profile').all()
    serializer_class = UserSerializer
    http_method_names = ['get',]
    permission_classes = [HasHeaderReact | IsAdminUser]


class CustomCSRFView(APIView):
    http_method_names = ['get', ]

    def get_csrf_token(self, request):
        referrer = request.META.get('HTTP_X_GET_TOKEN_CSRF_FOR_REACT')
        if not referrer or 'Hkjh98hjk8khj77slkhj' != referrer:
            return JsonResponse({'error': 'Access denied'}, status=403)
        token = get_token(request)
        return JsonResponse({'csrfToken': token})
