from django.urls import path
from .views import song, recomendations


urlpatterns = [
    path('song/', song, name="songs"),
    path('songRecomendation/', recomendations, name="recomendation")
]
