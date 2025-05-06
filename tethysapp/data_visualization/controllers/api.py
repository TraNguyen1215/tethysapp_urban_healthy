import base64
import os
import time
import requests
from dotenv import load_dotenv
from django.http import JsonResponse, HttpResponse
from tethys_sdk.routing import controller

load_dotenv()

APIM_ADMIN_URL = os.getenv('APIM_ADMIN_URL')
APIM_URL = os.getenv('APIM_URL')
APIM_CLIENT_ID = os.getenv('APIM_CLIENT_ID')
APIM_SECRET_KEY = os.getenv('APIM_SECRET_KEY')

# Thời gian đệm trước khi token hết hạn (giây)
BUFFER_TIME = 60

def fetch_new_token():
    """Lấy token mới từ API."""
    url = f"{APIM_ADMIN_URL}/oauth2/token"
    auth_str = f"{APIM_CLIENT_ID}:{APIM_SECRET_KEY}"
    auth_base64 = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')
    headers = {
        "Authorization": f"Basic {auth_base64}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        json_data = response.json()
        return json_data.get('access_token', ''), json_data.get('expires_in', 0)
    else:
        print(f"Error {response.status_code}: {response.text}")
        return None, 0

def get_user_token(request):
    """Kiểm tra token trong session của người dùng, và làm mới nếu cần."""
    # Lấy token và thời gian hết hạn từ session
    token = request.session.get('access_token')
    expires_at = request.session.get('expires_at', 0)
    current_time = int(time.time())

    # Kiểm tra xem token có còn hạn không (kể cả BUFFER_TIME)
    if token and current_time < (expires_at - BUFFER_TIME):
        return token

    # Nếu không hợp lệ hoặc hết hạn, lấy token mới
    token, expires_in = fetch_new_token()
    if token:
        request.session['access_token'] = token
        request.session['expires_at'] = current_time + expires_in
    return token

@controller(url='/api/monitoring-well/{well_code}/water-level')
def get_water_level(request, well_code):
    # token = get_user_token(request)
    token = fetch_new_token()[0]

    # Lấy tham số start và end từ request
    start = request.GET.get('start')
    end = request.GET.get('end')

    # url = f"{APIM_URL}/monitoring-data/water-level/v1/{well_code}?start={start}&end={end}"
    url = f"{APIM_URL}/nawapi/v1/api/monitoring-data/water-level/{well_code}?start={start}&end={end}"

    print(url)
    headers = {"Authorization": f"Bearer {token}"}

    # Gửi yêu cầu GET
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
    else:
        data = {"error": response.text}

    return JsonResponse({'data': data})

@controller(url='/api/monitoring-well/{well_code}/water-temperature')
def get_temperature_level(request, well_code):
    # token = get_user_token(request)
    token = fetch_new_token()[0]
    
    # Lấy tham số start và end từ request
    start = request.GET.get('start')
    end = request.GET.get('end')
    
    # url = f"{APIM_URL}/monitoring-data/water-temperature/v1/{well_code}?start={start}&end={end}"
    url = f"{APIM_URL}/nawapi/v1/api/monitoring-data/water-temperature/{well_code}?start={start}&end={end}"
    headers = {"Authorization": f"Bearer {token}"}
    
    # Gửi yêu cầu GET
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
    else:
        data = {"error": response.text}

    return JsonResponse({'data': data})

@controller(url='/api/monitoring-well/{well_code}/water-chemistry')
def get_water_chemistry(request, well_code):
    # token = get_user_token(request)
    token = fetch_new_token()[0]
    
    # Lấy tham số start và end từ request
    start = request.GET.get('start')
    end = request.GET.get('end')
    
    # url = f"{APIM_URL}/monitoring-data/water-chemistry/v1/{well_code}?start={start}&end={end}"
    url = f"{APIM_URL}/nawapi/v1/api/monitoring-data/water-chemistry/{well_code}?start={start}&end={end}"
    headers = {"Authorization": f"Bearer {token}"}
    
    # Gửi yêu cầu GET
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
    else:
        data = {"error": response.text}

    return JsonResponse({'data': data})

@controller(url='/api/news')
def get_news(request):
    token = get_user_token(request)
    url = f"{APIM_URL}/nawapi/v1/api/news/"
    headers = {"Authorization": f"Bearer {token}"}
    print(url)
    response = requests.get(url, headers=headers)


    if response.status_code == 200:
        data = response.json()
    else:
        data = {"error": response.text}

    return JsonResponse({'data': data})

@controller(url='/api/news/{new_id}')
def get_news_detail(request, new_id):
    token = get_user_token(request)
    url = f"{APIM_URL}/nawapi/v1/api/news/{new_id}/"
    print(url)

    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        if response.headers.get('Content-Type') == 'application/pdf':
            return HttpResponse(response.content, content_type='application/pdf')
        else:
            return JsonResponse({'error': 'Not a PDF file'}, status=400)
    else:
        return JsonResponse({'error': response.text}, status=response.status_code)

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

    wms_url = f"{APIM_URL}/geoserver/v1/nawapi/wms"
    token = get_user_token(request)
    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.get(wms_url, params=params, headers=headers)
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

    wfs_url = f"{APIM_URL}/geoserver/v1/nawapi/wfs"
    token = get_user_token(request)
    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.get(wfs_url, params=params, headers=headers)
        return HttpResponse(response.content, content_type="application/json")
    except requests.exceptions.RequestException as e:
        return HttpResponse(f"Error: {str(e)}", status=500)
    
@controller(url='/api/menu/group')
def get_layer(request):
    try:
        token = get_user_token(request)
        url = f"{APIM_URL}/nawapi/v1/api/menu/group/"
        headers = {"Authorization": f"Bearer {token}"}
        layer_response = requests.get(url, headers=headers)
        layers_data = layer_response.json()
        
        return JsonResponse({"data": layers_data})
    except requests.exceptions.RequestException as e:
        return HttpResponse(f"Error: {str(e)}", status=500)