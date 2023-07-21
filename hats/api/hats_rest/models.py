from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)


# Create your models here.
class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField()
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )


def get_api_url(self):
    return reverse("api_show_hat", kwargs={"pk": self.pk})


def __str__(self):
    return self.name
