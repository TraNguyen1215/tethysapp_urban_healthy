from django.shortcuts import render
from tethys_sdk.routing import controller
from django.urls import reverse
from tethys_sdk.gizmos import SelectInput, MVLayer, MVLegendClass, MVView, MapView

from ..app import DataVisualization as App

@controller(url='/map')
def map(request):
    # Lấy danh sách layer từ GeoServer
    geoserver_engine = App.get_spatial_dataset_service(name='main_geoserver', as_engine=True)
    response = geoserver_engine.list_layers(with_properties=False)
    
    layer_options = []
    if response['success']:
        layer_options = [(layer, layer) for layer in response['result']]
    
    # Tạo select input
    select_input = SelectInput(
        display_text='Chọn Layer',
        name='layer',
        multiple=False,
        options=layer_options,
        initial=layer_options[0][0] if layer_options else None,
        attributes={
            'id': 'layer',  # Thêm ID để có thể select bằng JavaScript
            'class': 'form-select'
        }
    )

    context = {
        'select_input': select_input
    }

    return render(request, 'data_visualization/pages/map.html', context)