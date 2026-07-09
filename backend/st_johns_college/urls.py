from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Custom or styled Django Admin
    path('admin/', admin.site.urls),
    
    # Include all website-related apps, APIs, and dashboard URLs
    path('', include('website.urls')),
]

# Serve media and static files in development mode
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
