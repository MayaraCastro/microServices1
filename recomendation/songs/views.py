from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Song
from .serializers import SongSerializer
import random

@api_view(['GET', 'POST'])
def song(request):
    if request.method == 'GET':  # user requesting data
        snippets = Song.objects.all()
        serializer = SongSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':  # user posting data
        serializer = SongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # save to db
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def recomendations(request):
    if request.method == 'GET':  # user requesting data
        snippets = Song.objects.all()
        recomendation = snippets[random.randint(0, len(snippets) - 1)]

        serializer = SongSerializer(recomendation)
        return Response(serializer.data)

    elif request.method == 'POST':  # user posting data
        snippets = Song.objects.all()
        recomendation = []
        for i in range(request.data['length']):
            song = snippets[random.randint(0, len(snippets) - 1)]
            if song not in recomendation:
                recomendation.append(song)
        print(recomendation)
        serializer = SongSerializer(recomendation, many=True)
        return Response(serializer.data)
