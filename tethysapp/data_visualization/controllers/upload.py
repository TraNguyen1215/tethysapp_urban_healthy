from django.shortcuts import render, redirect
from tethys_sdk.routing import controller
from tethys_sdk.gizmos import *
from django.urls import reverse
import random
import string
from ..app import DataVisualization as App

WORKSPACE = 'geoserver_app'

@controller(url='/upload')
def upload(request):
    geoserver_engine = App.get_spatial_dataset_service(name='main_geoserver', as_engine=True)

    # Tạo workspace nếu chưa tồn tại
    response = geoserver_engine.list_workspaces()
    if response['success']:
        workspaces = response['result']
        if WORKSPACE not in workspaces:
            from urllib.parse import urlparse
            parsed = urlparse(geoserver_engine.public_endpoint)
            uri = f'{parsed.scheme}://{parsed.netloc}/{WORKSPACE}'
            geoserver_engine.create_workspace(workspace_id=WORKSPACE, uri=uri)

    # Xử lý upload
    if request.method == 'POST' and 'submit' in request.POST:
        if not request.FILES or 'files' not in request.FILES or len(request.FILES.getlist('files')) == 0:
        # Trường hợp không chọn file nào
            request.session['modal_feedback'] = {
                    'type': 'warning',
                    'title': 'Không có tệp được chọn',
                    'message': 'Vui lòng chọn ít nhất một tệp shapefile để tải lên.'
                }
            return redirect(reverse('data_visualization:upload'))
        
        if request.FILES and 'files' in request.FILES:
            file_list = request.FILES.getlist('files')
            filenames = [f.name.lower() for f in file_list]

            required_exts = ['.shp', '.shx', '.dbf', '.prj']
            missing_exts = [ext for ext in required_exts if not any(f.endswith(ext) for f in filenames)]

            if missing_exts:
                request.session['modal_feedback'] = {
                    'type': 'warning',
                    'title': 'Thiếu tệp',
                    'message': f'Vui lòng chọn đầy đủ các tệp shapefile: {", ".join(required_exts)}. Thiếu: {", ".join(missing_exts)}'
                }
                return redirect(reverse('data_visualization:upload'))

            # Đủ tệp → tiến hành upload
            store = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(6))
            store_id = WORKSPACE + ':' + store

            try:
                geoserver_engine.create_shapefile_resource(
                    store_id=store_id,
                    shapefile_upload=file_list,
                    overwrite=True
                )
                request.session['modal_feedback'] = {
                    'type': 'success',
                    'title': 'Thành công',
                    'message': f'Shapefile đã được tải lên GeoServer với store ID: {store_id}.'
                }
            except Exception as e:
                request.session['modal_feedback'] = {
                    'type': 'danger',
                    'title': 'Lỗi',
                    'message': f'Không thể tải shapefile: {str(e)}'
                }

            return redirect(reverse('data_visualization:upload'))

    # Hiển thị modal nếu có feedback trong session
    context = {}
    modal_data = request.session.pop('modal_feedback', None)
    if modal_data:
        context.update({
            'show_modal': True,
            'modal_type': modal_data['type'],
            'modal_title': modal_data['title'],
            'modal_message': modal_data['message']
        })

    return render(request, 'data_visualization/pages/upload.html', context)
