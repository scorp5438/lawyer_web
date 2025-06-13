from rest_framework.permissions import BasePermission


class HasHeaderReact(BasePermission):

    def has_permission(self, request, view):
        react_header = request.headers.get('X-Superuser-Access')
        print(f'{react_header = }')
        return react_header == 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
