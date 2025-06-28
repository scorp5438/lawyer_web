from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .serializers import DataSerializer
from .task import send_form


@extend_schema(exclude=True)
class FormDataViewSet(ViewSet):
    """
    ViewSet для обработки и валидации данных формы перед отправкой.

    Предоставляет единственный метод create, который:
    1. Валидирует входящие данные через DataSerializer.
    2. При успешной валидации отправляет данные в очередь задач (Celery) через send_form.delay().
    3. Возвращает соответствующий HTTP-ответ.

    Пример запроса POST /api/form-data/:
    Поля и их требования:
    - first_name: 2-50 символов, только кириллица и дефис
    - last_name: 2-50 символов, только кириллица и дефис
    - phone: 5-12 символов, форматы +7/8 XXX XXX-XX-XX
    - email: валидный email-адрес
    - text: 12-500 символов

    Ответы:
    - 200 OK: Данные успешно приняты и отправлены в обработку.
    - 400 Bad Request: Ошибки валидации (некорректные данные).

    Использует:
    - Сериализатор: DataSerializer
    - Асинхронная задача: send_form.delay()
    """

    def create(self, request):
        """
        Обрабатывает POST-запрос с данными формы.

        Args:
            request (Request): Объект запроса Django REST framework.

        Returns:
            Response:
                - 200 OK: `{'message': 'Successfully', 'status': 200}`
                - 400 Bad Request: `{'message': 'Invalid data', 'errors': {...}, 'status': 400}`
        """
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            data_dict = dict(serializer.validated_data)
            send_form.delay(data_dict)

            return Response(
                {
                    'message': 'Successfully',
                    'status': status.HTTP_200_OK
                }
            )

        return Response(
            {
                'message': 'Invalid data',
                'errors': serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST
        )


a = {
    "first_name": "Алекс",
    "last_name": "Иванов",
    "phone": "+79999999999",
    "email": "a@bk.ru",
    "text": "Какой-то рандомный текст обращения"
}
