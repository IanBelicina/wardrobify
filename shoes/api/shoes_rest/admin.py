from django.contrib import admin

from .models import BinVO, Shoe

# Register your models here.

@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Shoe)
class ShoeAdmin(admin.ModelAdmin):
    pass
