from django.urls import path, include
from rest_framework.routers import DefaultRouter

from profiles.api.views import UserViewSet
from articles.api.views import ArticleViewSet
from cases.api.views import CaseViewSet

app_name = 'api-root'

router = DefaultRouter()

router.register(r'user', UserViewSet, basename='user')
router.register(r'article', ArticleViewSet, basename='article')
router.register(r'case', CaseViewSet, basename='case')

urlpatterns = [
    path('', include(router.urls))
]
