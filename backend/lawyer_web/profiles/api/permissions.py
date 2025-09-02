import os

from rest_framework.permissions import BasePermission
from dotenv import load_dotenv
load_dotenv()

HEADER_SUPERUSER_ACCESS = os.getenv('HEADER_SUPERUSER_ACCESS', 'Test_Superuser-Access')


class HasHeaderReact(BasePermission):

    def has_permission(self, request, view):
        react_header = request.headers.get('HTTP_X_SUPERUSER_ACCESS')
        return react_header == HEADER_SUPERUSER_ACCESS