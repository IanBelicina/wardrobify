from django.http import JsonResponse
from django.shortcuts import render
from .models import Hat, LocationVO
import json
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods


class LocationVoDetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["import_href", "closet_name"]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "id",
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location",
    ]
    encoders = {
        "location": LocationVoDetailEncoder(),
    }


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style_name", "id", "location"]
    encoders = {"location": LocationVoDetailEncoder()}


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_hat(request, id):
    if request.method == "GET":
        try:
            hat = Hat.objects.get(id=id)
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Hat does not exist"})
            response.status_code = 404
        return response
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        hat = Hat.objects.get(id=id)
        for key, value in content.items():
            setattr(hat, key, value)
        hat.save()
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
