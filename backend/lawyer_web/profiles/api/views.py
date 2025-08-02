import logging
import os

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.middleware.csrf import get_token
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import (
    extend_schema,
    extend_schema_view,
    OpenApiParameter,
    OpenApiExample,
    OpenApiResponse
)
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from dotenv import load_dotenv

from .permissions import HasHeaderReact
from .serializers import UserSerializer, AddressSerializer
from ..models import Address

console_logger = logging.getLogger("console_logger")
file_logger = logging.getLogger("file_logger")

load_dotenv()

HEADER_CSRF_TOKEN = os.getenv('HEADER_CSRF_TOKEN')

@extend_schema_view(
    list=extend_schema(
        summary='Список пользователей',
        description="""
        Получение списка пользователей с расширенными данными профиля.

        Требования доступа:
        - Заголовок 'X-React' должен присутствовать в запросе
        ИЛИ
        - Пользователь должен быть администратором
        """,
        tags=['Пользователи'],
        parameters=[
            OpenApiParameter(
                name='X-React',
                type=OpenApiTypes.STR,
                location=OpenApiParameter.HEADER,
                required=False,
                description='Кастомный заголовок для доступа (альтернатива admin-правам)'
            )
        ],
        responses={
            200: UserSerializer(many=True),
            403: OpenApiResponse(
                description='Доступ запрещен (нет заголовка X-React или прав администратора)',
                examples=[
                    OpenApiExample(
                        'Пример ошибки',
                        value={'detail': 'У вас нет прав для выполнения этого действия.'},
                        status_codes=['403']
                    )
                ]
            )
        }
    ),
    retrieve=extend_schema(exclude=True),
)
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
    http_method_names = ['get', ]
    permission_classes = [HasHeaderReact | IsAdminUser]
    @extend_schema(
        exclude=True
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)


class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    http_method_names = ['get', ]


@extend_schema(exclude=True)
class CustomCSRFView(APIView):

    def get(self, request):
        referrer = request.META.get('HTTP_X_GET_TOKEN_CSRF_FOR_REACT')
        if not referrer or HEADER_CSRF_TOKEN != referrer:
            file_logger.error('Access denied')
            return JsonResponse({'error': 'Access denied'}, status=403)
        token = get_token(request)
        console_logger.info('csrfToken sent')
        return JsonResponse({'csrfToken': token})
