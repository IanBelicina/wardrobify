import json
from django.shortcuts import render
from .models import Shoe
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder



class ShoeEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "url",
        "bin",
    ]

# Create your views here.

@require_http_methods(["GET","POST"])
def api_shoes(request):

    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes":shoes},
            encoder=ShoeEncoder
        )
    else:
        content = json.loads(request.body)
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeEncoder,
            safe=False
        )
