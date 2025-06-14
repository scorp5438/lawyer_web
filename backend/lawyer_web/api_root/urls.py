from django.urls import path, include
from rest_framework.routers import DefaultRouter

from profiles.api.views import UserViewSet
from articles.api.views import ArticleViewSet, CategoryApiViewSet, TypeApiViewSet
from cases.api.views import CaseViewSet, PracticeViewSet
from form_data.api.views import FormDataViewSet

app_name = 'api-root'

router = DefaultRouter()

router.register(r'user', UserViewSet, basename='user')
router.register(r'article', ArticleViewSet, basename='article')
router.register(r'case', CaseViewSet, basename='case')
router.register(r'category', CategoryApiViewSet, basename='category')
router.register(r'type', TypeApiViewSet, basename='type')
router.register(r'practice', PracticeViewSet, basename='practice')
router.register(r'data', FormDataViewSet, basename='data')

urlpatterns = [
    path('', include(router.urls))
]
