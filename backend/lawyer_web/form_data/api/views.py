from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .serializers import DataSerializer


class FormDataViewSet(ViewSet):

    def create(self, request):
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            first_name = serializer.validated_data['first_name']
            last_name = serializer.validated_data['last_name']
            phone = serializer.validated_data['phone']
            email = serializer.validated_data['email']
            text = serializer.validated_data['text']
            print(f'{first_name = } {last_name = } {phone = } {email = } {text = }')

            return Response({'message': 'Successfully', 'status': status.HTTP_200_OK})

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
