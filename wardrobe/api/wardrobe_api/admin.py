from django.contrib import admin

# Register your models here.
from .models import Location, Bin

@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    pass
