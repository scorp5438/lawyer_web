from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .serializers import DataSerializer
from .task import send_form


class FormDataViewSet(ViewSet):

    def create(self, request):
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
                'status': status.HTTP_400_BAD_REQUEST
            }
        )


a = {
    "first_name": "Алекс",
    "last_name": "Иванов",
    "phone": "+79999999999",
    "email": "a@bk.ru",
    "text": "Какой-то рандомный текст обращения"
}
