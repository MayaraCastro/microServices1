from django.db import models


class Song(models.Model):
    title = models.CharField(max_length=20)
    genre = models.CharField(max_length=20)
    singer = models.CharField(max_length=20)

    def __str__(self):
        return self.title
