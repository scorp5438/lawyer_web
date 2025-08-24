from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from django.conf.urls.static import static

from lawyer_web import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api_root.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc')
]

urlpatterns = [
    path('', include(router.urls)),
    path('get-csrf-token/', CustomCSRFView.as_view(), name='get-csrf-token'),
]
