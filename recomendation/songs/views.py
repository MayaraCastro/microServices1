from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Song
from .serializers import SongSerializer


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
