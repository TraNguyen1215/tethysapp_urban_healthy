const mapMap = new ol.Map({
    target: 'custom-map-container',
    layers: [
        new ol.layer.Tile({
            // https://maps.becagis.vn/tiles/basemap/light/{z}/{x}/{y}.png
            source: new ol.source.XYZ({
                url: 'https://maps.becagis.vn/tiles/basemap/light/{z}/{x}/{y}.png',
                
            })
            
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([105.854444, 21.028511]), // Hà Nội
        zoom: 8
    })
});

function addWMSLayer(layerName) {
    $('#map-error').addClass('d-none');

    try {
        // Xóa các lớp WMS cũ
        mapMap.getLayers().getArray().forEach(layer => {
            if (layer.get('type') === 'wms') {
                mapMap.removeLayer(layer);
            }
        });

        // Tạo nguồn WMS mới
        const wmsSource = new ol.source.ImageWMS({
            url: 'http://localhost:8080/geoserver/wms',
            params: { 'LAYERS': layerName },
            serverType: 'geoserver',
            crossOrigin: 'anonymous'
        });

        // Lắng nghe sự kiện load để kiểm soát lỗi
        wmsSource.once('imageloadend', function () {
            // Cập nhật thông tin layer đang hiển thị
            $('#current-layer-name').text(layerName);
        });

        wmsSource.once('imageloaderror', function (e) {
            $('#map-error').text(`Lỗi khi tải lớp: ${layerName}`).removeClass('d-none');
            console.error('Lỗi WMS:', e);
        });

        const wmsLayer = new ol.layer.Image({
            source: wmsSource,
            properties: { 'type': 'wms' }
        });

        mapMap.addLayer(wmsLayer);

        $('#current-layer-name').text(layerName);

    } catch (error) {
        $('#map-error').text(`Lỗi khi tải layer: ${error.message}`).removeClass('d-none');
        console.error('Lỗi ngoài WMS:', error);
    }
}

$('#layer-form').on('submit', function (e) {
    e.preventDefault();
    const selectedLayer = $('#layer').val();
    if (selectedLayer) {
        addWMSLayer(selectedLayer);
    } else {
        $('#map-error').text('Vui lòng chọn một lớp dữ liệu.').removeClass('d-none');
        $('#current-layer-name').text('Chưa có lớp nào được chọn');
    }
});

$(window).on('load', function () {
    const defaultLayer = 'health_map:ADM_ADM_1';
    $('#layer').val(defaultLayer);
    addWMSLayer(defaultLayer);
});