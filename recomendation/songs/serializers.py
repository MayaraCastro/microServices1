from rest_framework import serializers
from .models import Song


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song  # this is the model that is being serialized
        fields = ('title', 'genre', 'singer')
