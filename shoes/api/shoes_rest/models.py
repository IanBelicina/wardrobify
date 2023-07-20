from django.db import models

# Create your models here.


class BinVO(models.Model):
    import_href = models.CharField(max_length=200,unique=True)
    closet_name = models.CharField(max_length=100)



class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    url = models.URLField(max_length=200)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )
