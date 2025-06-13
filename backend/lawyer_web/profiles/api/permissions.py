from rest_framework.permissions import BasePermission


class HasHeaderReact(BasePermission):

    def has_header(self, request, view):
        react_header = request.headers.get('X-Superuser-Access')
        return react_header == 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'