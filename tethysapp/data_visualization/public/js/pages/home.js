// Tạo bản đồ
var map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            'becagis-source': {
                type: 'raster',
                tiles: ['https://maps.becagis.vn/tiles/basemap/light/{z}/{x}/{y}.png'],
                tileSize: 256,
            },
            'streets-source': {
                type: 'raster',
                tiles: ['https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=roY3b7JE1zbvrHutS87H'],
                tileSize: 256,
            },
            'satellite-source': {
                type: 'raster',
                tiles: ['https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=roY3b7JE1zbvrHutS87H'],
                tileSize: 256,
            },
            'topo-source': {
                type: 'raster',
                tiles: ['https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=roY3b7JE1zbvrHutS87H'],
                tileSize: 256,
            },
            'openstreetmap-source': {
                type: 'raster',
                tiles: ['https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=roY3b7JE1zbvrHutS87H'],
                tileSize: 256,
            },
            'zone-plan-source': {
                'type': 'raster',
                'tiles': [
                    'https://api.mkdc.com.vn/geoserver/v1/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=phan_vung_quy_hoach'
                ],
                'tileSize': 256,
            },
            'sat-lo-duong-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=QH_SatLo_Duong'
                ],
                'tileSize': 256,
            },
            'sat-lo-diem-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=QH_SatLo_Diem'
                ],
                'tileSize': 256,
            },
            'monitoring-well-source': {
                type: 'geojson',
                data: 'https://gis.mkdc.com.vn/geoserver/data_visualization/wfs?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=data_visualization:monitoring_well_v3',
            },
            'qp3-db-month-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=qp3_MucNuoc_T9vsT8'
                ],
                'tileSize': 256,
            },
            'qp3-db-year-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=qp3_Mucnuoc_T9_2024_2023'
                ],
                'tileSize': 256,
            },
            'qp3-db-5-year-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=qp3_Mucnuoc_T9_2024_2019'
                ],
                'tileSize': 256,
            },
            'qp3-db-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=qp3_DB_MucNuoc_T10'
                ],
                'tileSize': 256,
            },
            'qp23-db-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=qp23_DB_MucNuoc_T10'
                ],
                'tileSize': 256,
            },
            'qp1-db-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=qp1_DB_MucNuoc_T10'
                ],
                'tileSize': 256,
            },
            'n22-db-source': {
                'type': 'raster',
                'tiles': [
                    'https://gis.mkdc.com.vn/geoserver/data_visualization/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=n22_DB_MucNuoc_T10'
                ],
                'tileSize': 256,
            },
            'qh-sut-lun-source': {
                'type': 'raster',
                'tiles': [
                    'https://api.mkdc.com.vn/geoserver/v1/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=sut_lun_dbscl'
                ],
                'tileSize': 256,
            },
            'diem_pvcnnn_source': {
                'type': 'raster',
                'tiles': [
                    'https://api.mkdc.com.vn/geoserver/v1/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=diem_pvcnnn'
                ],
                'tileSize': 256,
            }
        },
        layers: [
            {
                id: 'becagis-layer',
                type: 'raster',
                source: 'becagis-source',
                paint: {
                }
            },
            {
                id: 'streets-layer',
                type: 'raster',
                source: 'streets-source',
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'satellite-layer',
                type: 'raster',
                source: 'satellite-source',
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'topo-layer',
                type: 'raster',
                source: 'topo-source',
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'openstreetmap-layer',
                type: 'raster',
                source: 'openstreetmap-source',
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'zone-plan',
                'type': 'raster',
                'source': 'zone-plan-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'sat-lo-duong',
                'type': 'raster',
                'source': 'sat-lo-duong-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none',
                }
            },
            {
                'id': 'sat-lo-diem',
                'type': 'raster',
                'source': 'sat-lo-diem-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'stations',
                type: 'circle',
                source: 'monitoring-well-source',
                paint: {
                    'circle-radius': 7,
                    'circle-color': [
                        'match',
                        ['get', 'status'],
                        'Dừng quan trắc', '#ff0000',
                        'Đang hoạt động', '#00ff40',
                        '#ffdd00'
                    ],
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ccc'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'qp3-db-month',
                'type': 'raster',
                'source': 'qp3-db-month-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'qp3-db-year',
                'type': 'raster',
                'source': 'qp3-db-year-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'qp3-db-5-year',
                'type': 'raster',
                'source': 'qp3-db-5-year-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'qp3-db',
                'type': 'raster',
                'source': 'qp3-db-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'qp23-db',
                'type': 'raster',
                'source': 'qp23-db-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'qp1-db',
                'type': 'raster',
                'source': 'qp1-db-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'n22-db',
                'type': 'raster',
                'source': 'n22-db-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'qh-sut-lun',
                'type': 'raster',
                'source': 'qh-sut-lun-source',
                'paint': {
                },
                layout: {
                    'visibility': 'none',
                }
            },
            {
                'id': 'diem_pvcnnn',
                'type': 'raster',
                'source': 'diem_pvcnnn_source',
                'paint': {
                },
                layout: {
                    'visibility': 'none',
                }
            }
        ],
    },
    center: [105.854444, 21.028511],
    zoom: 10,
});

// Thêm control trên bản đồ
map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

// Function: Ẩn layer trên bản đồ
function hideLayer(layer_id) {
    map.setLayoutProperty(layer_id, 'visibility', 'none');
}

function showLayer(layer_id) {
    map.setLayoutProperty(layer_id, 'visibility', 'visible');
}

function layerExists(layer_id) {
    return map.getLayer(layer_id) !== undefined;
}


// Lưu trữ layer nền hiện tại
// Mặc định là becagisLayer
let current_bg_layer = 'becagis-layer';

// Xử lý chọn bản đồ nền
$(document).ready(function () {
    $('.background-layers .layer-item').click(function () {
        // Kiểm tra xem bản đồ đã được tải xong hay chưa
        // Nếu chưa tải xong thì hiện toast

        if ($(this).hasClass('active')) {
            return;
        } else {
            // Loại bỏ trạng thái active của layer-item cũ
            $('.background-layers .layer-item.active').removeClass('active');

            // Thêm class active cho layer hiện tại
            $(this).addClass('active');

            // Ẩn layer cũ
            hideLayer(current_bg_layer);

            // Lấy layer-name
            let layer_name = $(this).attr('bg-layer-name');
            current_bg_layer = `${layer_name}-layer`;
            showLayer(current_bg_layer);
        }
    });
});

// Giả sử bạn đã có một layer 'stations' với source là 'monitoring-stations'

map.on('mouseenter', 'stations', () => {
    map.getCanvas().style.cursor = 'pointer'; // Chỉ định cursor là 'pointer'
});

// Khôi phục cursor về mặc định khi không hover
map.on('mouseleave', 'stations', () => {
    map.getCanvas().style.cursor = ''; // Khôi phục cursor về mặc định
});

let current_well_code;

// Thêm sự kiện click điểm quan trắc trên bản đồ
map.on('click', 'stations', (e) => {
    // Lấy thông tin của điểm được nhấn
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['stations'],

    });
    console.log(features);
    if (features.length > 0) {
        const feature = features[0];

        if (current_well_code == feature.properties.well_code) {
            return;
        }

        current_well_code = feature.properties.well_code;


        var address = '';

        if (feature.properties.commune) {
            if (feature.properties.commune.toString().trim().length > 0) {
                address += feature.properties.commune.toString().trim() + ', ';
            }
        }

        if (feature.properties.district) {
            if (feature.properties.district.toString().trim().length > 0) {
                address += feature.properties.district.toString().trim() + ', ';
            }
        }

        if (feature.properties.province) {
            if (feature.properties.province.toString().trim().length > 0) {
                address += feature.properties.province.toString().trim();
            }
        }

        // Tạo nội dung bảng
        const tableContent = `
            <tr>
                <td>Mã trạm</td>
                <td>${feature.properties.well_code || ''}</td>
            </tr>
            <tr>
                <td>Loại trạm</td>
                <td>${feature.properties.objective || ''}</td>
            </tr>
            <tr>
                <td>Địa chỉ</td>
                <td>${address || ''}</td>
            </tr>
            <tr>
                <td>Hiện trạng</td>
                <td>${feature.properties.status || ''}</td>
            </tr>
            <tr>
                <td>Lưu vực</td>
                <td>${feature.properties.watershed || ''}</td>
            </tr>
            <tr>
                <td>Tầng chứa nước quan trắc</td>
                <td>${feature.properties.water_layer || ''}</td>
            </tr>
            <tr>
                <td>Ngày bắt đầu hoạt động</td>
                <td>${feature.properties.start_date ? feature.properties.start_date.replace("Z", "") : ''}</td>
            </tr>
        `;


        // Hủy request hiện tại
        try {
            if (wl_last_ajax_request) {
                wl_last_ajax_request.abort();
            }
            else if (tl_last_ajax_request) {
                tl_last_ajax_request.abort();
            }
            else if (cl_last_ajax_request) {
                cl_last_ajax_request.abort();
            }
        } catch (e) { }

        // Hủy chart
        try {
            if (water_level_chart) {
                water_level_chart.destroy();
            }
            else if (temp_level_chart) {
                temp_level_chart.destroy();
            }
            else if (water_chemistry_chart) {
                water_chemistry_chart.destroy();
            }
        } catch (e) { }

        // Click 2 nút xem
        $('#view-water-level-button').trigger('click');
        $('#view-water-temp-button').trigger('click');
        $('#view-water-chemistry-button').trigger('click');

        // showWaterLevelChartItem();
        // showTempLevelChartItem();

        $('.data-info-table').removeClass('d-none');
        $('.data-info-table .table tbody').html(tableContent);
    }
});

$('#data-info-table__close-btn').on('click', function () {
    $('.data-info-table').addClass('d-none');
});

// Xử lý biểu đồ mực nước cho điểm quan trắc
var water_level_chart;
var wl_last_ajax_request;

function showWaterLevelChartItem(class_name) {
    // Ẩn text error
    $(`#water-level-collapse .error-text`).addClass('d-none');

    // Ẩn chart
    $(`#water-level-collapse canvas`).addClass('d-none');

    // Ẩn loading
    $(`#water-level-collapse .loading-box`).addClass('d-none');

    if (class_name) {
        $(`#water-level-collapse ${class_name}`).removeClass('d-none');
    }
}

function showWaterLevelChart(well_code, start, end) {
    try {
        if (wl_last_ajax_request) {
            wl_last_ajax_request.abort();
        }
    } catch (error) { }

    wl_last_ajax_request = $.ajax({
        url: `/apps/data_visualization/api/monitoring-well/${well_code}/water-level?start=${start}&end=${end}`,
        method: 'GET',
        success: function (res) {
            // Hiển thị chart
            showWaterLevelChartItem('canvas');

            var data = res['data'];
            water = data.data;

            try {
                water_level_chart.destroy();
            } catch (e) { }

            water_level_chart = drawLineChart('water-level-chart', water.map(item => ({
                datetime: item.datetime,
                value: item.water_level
            })), 'Mực nước', 'Mực nước');

        },
        error: function (error) {
            // Hiện text error
            showWaterLevelChartItem('.error-text');
        }
    });
}

$('#view-water-level-button').on('click', function () {

    // Lấy start time
    let start_date = $('#water-level-collapse .start-date').val();

    // Lấy end time
    let end_date = $('#water-level-collapse .end-date').val();

    if (validateStartToEndDate(start_date, end_date)) {
        showWaterLevelChart(current_well_code, start_date, end_date);

        // Đặt lại error text 
        $('#water-level-collapse .error-text').text('Có lỗi xảy ra, vui lòng thử lại!');

        showWaterLevelChartItem('.loading-box');
    } else {
        $('#water-level-collapse .error-text').text('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
        showWaterLevelChartItem('.error-text');
    }

});

$('#water-level-collapse .cancel-button').on('click', function () {
    try {
        if (wl_last_ajax_request) {
            wl_last_ajax_request.abort();
        }
    } catch (error) { }

    showWaterLevelChartItem();
});

// Xử lý biểu đồ nhiệt độ cho điểm quan trắc
var temp_level_chart;
var tl_last_ajax_request;

function showTempLevelChartItem(class_name) {
    // Ẩn text error
    $(`#water-temp-collapse .error-text`).addClass('d-none');

    // Ẩn chart
    $(`#water-temp-collapse canvas`).addClass('d-none');

    // Ẩn loading
    $(`#water-temp-collapse .loading-box`).addClass('d-none');

    if (class_name) {
        $(`#water-temp-collapse ${class_name}`).removeClass('d-none');
    }
}

function showTempLevelChart(well_code, start, end) {
    try {
        if (tl_last_ajax_request) {
            tl_last_ajax_request.abort();
        }
    } catch (error) { }

    tl_last_ajax_request = $.ajax({
        url: `/apps/data_visualization/api/monitoring-well/${well_code}/water-temperature?start=${start}&end=${end}`,
        method: 'GET',
        success: function (res) {
            // Hiển thị chart
            showTempLevelChartItem('canvas');

            var data = res['data'];
            temp = data.data;

            try {
                water_temp_chart.destroy();
            } catch (e) { }

            water_temp_chart = drawLineChart('water-temp-chart', temp.map(item => ({
                datetime: item.datetime,
                value: item.temperature
            })), 'Nhiệt độ', 'Nhiệt độ');

        },
        error: function (error) {
            // Hiện text error
            showTempLevelChartItem('.error-text');
        }
    });
}

$('#view-water-temp-button').on('click', function () {

    // Lấy start time
    let start_date = $('#water-temp-collapse .start-date').val();

    // Lấy end time
    let end_date = $('#water-temp-collapse .end-date').val();

    if (validateStartToEndDate(start_date, end_date)) {
        showTempLevelChart(current_well_code, start_date, end_date);

        // Đặt lại error text 
        $('#water-temp-collapse .error-text').text('Có lỗi xảy ra, vui lòng thử lại!');

        showTempLevelChartItem('.loading-box');
    } else {
        $('#water-temp-collapse .error-text').text('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
        showTempLevelChartItem('.error-text');
    }
});

$('#water-temp-collapse .cancel-button').on('click', function () {
    try {
        if (tl_last_ajax_request) {
            tl_last_ajax_request.abort();
        }
    } catch (error) { }

    showTempLevelChartItem();
});

// Xử lý biểu đồ hóa học cho trạm quan trắc
var water_chemistry_chart;
var cl_last_ajax_request;

function showChemicalChartItem(class_name) {
    // Ẩn text error
    $(`#water-chemistry-collapse .error-text`).addClass('d-none');

    // Ẩn chart

    $(`#water-chemistry-collapse canvas`).addClass('d-none');

    // Ẩn loading

    $(`#water-chemistry-collapse .loading-box`).addClass('d-none');

    if (class_name) {
        $(`#water-chemistry-collapse ${class_name}`).removeClass('d-none');
    }
}

// Hàm lấy danh sách thông số hóa học vào select
function loadChemistryParameters() {
    $.ajax({
        url: `/apps/data_visualization/api/monitoring-well/${well_code}/water-chemistry?start=${start}&end=${end}`,
        method: 'GET',
        success: function (res) {
            var parameters = res['data'];  // Giả sử dữ liệu trả về là mảng các thông số
            var selectElement = document.getElementById('parameter-chemistry');

            console.log(parameters);

            // // Xóa các tùy chọn cũ (nếu có)
            // selectElement.innerHTML = '<option value="">--Chọn thông số--</option>';

            for (var key in data) {
                if (data[key] !== null) {
                    var option = document.createElement('option');
                    option.value = key;
                    option.text = key.toUpperCase();
                    selectElement.appendChild(option);
                }
            }
        },
        error: function (error) {
            console.error('Lỗi khi lấy thông số hóa học:', error);
        }
    });
}

function showChemicalChart(well_code, start, end) {
    try {
        if (cl_last_ajax_request) {
            cl_last_ajax_request.abort();
        }
    }
    catch (error) { }

    cl_last_ajax_request = $.ajax({
        url: `/apps/data_visualization/api/monitoring-well/${well_code}/water-chemistry?start=${start}&end=${end}`,
        method: 'GET',
        success: function (res) {
            // Hiển thị chart
            showChemicalChartItem('canvas');

            var data = res['data'];
            chemistry = data.data;

            try {
                water_chemistry_chart.destroy();
            } catch (e) { }

            water_chemistry_chart = drawLineChart('water-chemistry-chart', chemistry.map(item => ({
                datetime: item.datetime,
                value: item.water_chemistry
            })), 'Hóa học', 'Hóa học');

        },
        error: function (error) {
            // Hiện text error
            showChemicalChartItem('.error-text');
        }

    });
}

$('#view-water-chemistry-button').on('click', function () {

    // Lấy start time
    let start_date = $('#water-chemistry-collapse .start-date').val();

    // Lấy end time
    let end_date = $('#water-chemistry-collapse .end-date').val();

    if (validateStartToEndDate(start_date, end_date)) {
        showChemicalChart(current_well_code, start_date, end_date);

        // Đặt lại error text
        $('#water-chemistry-collapse .error-text').text('Có lỗi xảy ra, vui lòng thử lại!');

        showChemicalChartItem('.loading-box');
    } else {
        $('#water-chemistry-collapse .error-text').text('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');

        showChemicalChartItem('.error-text');
    }
});


$('#water-chemistry-collapse .cancel-button').on('click', function () {
    try {
        if (cl_last_ajax_request) {
            cl_last_ajax_request.abort();
        }
    }
    catch (error) { }

    showChemicalChartItem();
});

function validateStartToEndDate(start_date, end_date) {
    if (start_date && end_date) {
        let start = new Date(start_date);
        let end = new Date(end_date);

        if (start <= end) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2); // Lấy ngày với định dạng 2 chữ số
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Lấy tháng với định dạng 2 chữ số
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Định dạng dd/mm/yyyy
}
// Hàm vẽ biểu đồ
function drawLineChart(element_id, data, label, yTitle) {
    const labels = data.map(item => item.datetime); // Các nhãn (thời gian)
    const levels = data.map(item => item.value); // Giá trị (mực nước hoặc nhiệt độ)

    // var chart_element = document.getElementById(element_id).getContext("2d");
    var chart_element = document.querySelector(`#${element_id}`).getContext("2d");

    return new Chart(chart_element, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: levels,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: false,
                pointRadius: 0,
                pointHoverRadius: 0,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Thời gian'
                    },
                    ticks: {
                        callback: function (value, index, ticks) {
                            return formatDate(labels[index]); // Hiển thị thời gian dạng dd/mm/yyyy trên trục x
                        },
                        display: true,
                        autoSkip: true,
                        maxTicksLimit: 10,
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: yTitle
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy' // Cho phép di chuyển theo cả hai hướng
                    },
                    zoom: {
                        enabled: true,
                        mode: 'xy', // Cho phép phóng to theo cả hai hướng
                        wheel: {
                            enabled: true, // Bật tính năng phóng to bằng bánh xe chuột
                        },
                        pinch: {
                            enabled: true, // Bật tính năng phóng to bằng thao tác chụm trên thiết bị cảm ứng
                        },
                        drag: {
                            enabled: true, // Bật tính năng phóng to bằng thao tác kéo
                        }
                    }
                }
            }
        }
    });
}