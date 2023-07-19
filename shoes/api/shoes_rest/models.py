from django.db import models

# Create your models here.


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    url = models.URLField(max_length=200)
    bin = models.CharField(max_length=200)
