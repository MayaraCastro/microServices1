from django.urls import path
from .views import song


urlpatterns = [
    path('song/', song, name="songs")
]
