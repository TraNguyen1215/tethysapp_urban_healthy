import base64
import os
import time
import requests
from dotenv import load_dotenv
from django.http import JsonResponse, HttpResponse
from tethys_sdk.routing import controller

load_dotenv()

BACKEND_URL = os.getenv('BACKEND_URL')

# lấy tất cả các cơ sở y tế
@controller(url='/api/facilities')
def get_news(request):
    url = f"{BACKEND_URL}/api/data/facilities/"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
    else:
        data = {"error": response.text}

    return JsonResponse({'data': data})

@controller(url='/api/facility')
def get_facility_detail(request):
    facility_id = request.GET.get('facility_id')
    
    if not facility_id:
        return JsonResponse({"error": "facility_id is required"}, status=400)
    
    url = f"{BACKEND_URL}/api/facility?id={facility_id}"

    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
        else:
            data = {"error": response.text}

        return JsonResponse({'data': data})
    
    except Exception as e:
        return JsonResponse({"error": "Error fetching data from the backend", "details": str(e)}, status=500)

# lấy cơ sở y tế theo loại
@controller(url='/api/facilities/<facility_type>', methods=['GET'])
def get_facilities_by_type(request, facility_type):
    url = f"{BACKEND_URL}/api/data/facilities/{facility_type}/"
    response = requests.get(url)
    
    try:
        if response.status_code == 200:
            data = response.json()
        else:
            data = {"error": response.text}
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Error fetching data from the backend", "details": str(e)}, status=500)
    
# lấy cơ sở y tế theo tên
@controller(url='/api/facilities/search', methods=['GET'])
def search_facilities(request):
    facility_name = request.GET.get('facility_name')
    
    if not facility_name:
        return JsonResponse({"error": "facility_name is required"}, status=400)
    
    url = f"{BACKEND_URL}/api/facilities/search?name={facility_name}"

    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
        else:
            data = {"error": response.text}

        return JsonResponse({'data': data})
    
    except Exception as e:
        return JsonResponse({"error": "Error fetching data from the backend", "details": str(e)}, status=500)

# 5 cơ sở y tế gần nhất
@controller(url='/api/facilities/5_nearest', methods=['GET'])
def get_nearest_facilities(request):
    address = request.GET.get('address')
    url = f"{BACKEND_URL}/api/analysis/nearest_facilities?address={address}"
    
    response = requests.get(url)
    
    try:
        if response.status_code == 200:
            data = response.json()
        else:
            data = {"error": response.text}
        
        return JsonResponse({'data': data})
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Error fetching data from the backend", "details": str(e)}, status=500)

# đường đi ngắn nhất đến cơ sở y tế cho trước
@controller(url='/api/facility/shortest_path', methods=['GET'])
def get_shortest_path(request):
    name = request.GET.get('name')
    address = request.GET.get('address')
    
    if not name or not address:
        return JsonResponse({"error": "name and address is required"}, status=400)
    
    url = f"{BACKEND_URL}/api/analysis/shortest_path?name={name}&address={address}"

    try:
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
        else:
            data = {"error": response.text}

        return JsonResponse({'data': data})
    
    except Exception as e:
        return JsonResponse({"error": "Error fetching data from the backend", "details": str(e)}, status=500)

@controller(url='/map/wms')
def get_wms_map(request):

    params = {
        'bbox': request.GET.get('bbox', ''),
        'format': request.GET.get('format', 'image/png'),
        'service': request.GET.get('service', 'WMS'),
        'version': request.GET.get('version', '1.1.1'),
        'request': request.GET.get('request', 'GetMap'),
        'srs': request.GET.get('srs', 'EPSG:3857'),
        'transparent': request.GET.get('transparent', 'true'),
        'width': request.GET.get('width', '256'),
        'height': request.GET.get('height', '256'),
        'layers': request.GET.get('layers', 'qp3_DB_MucNuoc_T10'),
    }

    wms_url = f"{BACKEND_URL}/geoserver/health_map/wms"

    try:
        response = requests.get(wms_url, params=params)
        return HttpResponse(response.content, content_type="image/png")
    except requests.exceptions.RequestException as e:
        return HttpResponse(f"Error: {str(e)}", status=500)


@controller(url='/map/wfs')
def get_wfs_map(request):
    params = {
        'service': request.GET.get('service', 'WFS'),
        'version': request.GET.get('version', '1.0.0'),
        'request': request.GET.get('request', 'GetFeature'),
        'outputFormat': request.GET.get('outputFormat', 'application/json'),
        'typeName': request.GET.get('typeName', 'nawapi:monitoring_well'),
    }

    wfs_url = f"{BACKEND_URL}/geoserver/health_map/wfs"

    try:
        response = requests.get(wfs_url, params=params)
        return HttpResponse(response.content, content_type="application/json")
    except requests.exceptions.RequestException as e:
        return HttpResponse(f"Error: {str(e)}", status=500)