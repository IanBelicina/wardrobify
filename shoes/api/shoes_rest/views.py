import json
from django.shortcuts import render
from .models import BinVO, Shoe
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from common.json import ModelEncoder

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "import_href"
    ]


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "url",
        "bin",
    ]

    encoders = {
        "bin":BinVODetailEncoder()
    }

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties=[
        "model_name",
        "id",
        "bin"
        ]
    encoders = {
        "bin":BinVODetailEncoder(),
    }

    # def get_extra_data(self, o):
    #     return {"bin": o.bin.closet_name}

# Create your views here.

@require_http_methods(["GET","POST"])
def api_list_shoes(request, bin_vo_id=None):

    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes":shoes},
            encoder=ShoeListEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
        )



@require_http_methods(["DELETE","GET"])
def api_shoe_detail(request, id):

    if request.method == "GET":
        shoe = Shoe.objects.get(id=id)
        return(
            JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
            )
        )
    else:
        try:
            shoe = Shoe.objects.get(id=id)
            shoe.delete()
            return JsonResponse(
                shoe,
                encoder=ShoeListEncoder,
                safe=False
            )
        except Shoe.DoesNotExist:
            response = JsonResponse({"message":"Does not exist"})
            response.status_code = 404
            return response
