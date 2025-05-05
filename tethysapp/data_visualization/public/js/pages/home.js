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
            'all-hanoi-source': {
                type: 'geojson',
                data: 'http://localhost:8080/geoserver/health_map/wfs?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=health_map:all_hanoi',
            },
            'hospital-source': {
                type: 'geojson',
                data: 'http://localhost:8080/geoserver/health_map/wfs?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=health_map:hospital',
            },
            'clinic-doctor-source':{
                type: 'geojson',
                data: 'http://localhost:8080/geoserver/health_map/wfs?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=health_map:clinic_doctor',
            },
            'pharmacy-source': {
                type: 'geojson',
                data: 'http://localhost:8080/geoserver/health_map/wfs?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=health_map:pharmacy',
            },
            'dentist-source': {
                type: 'geojson',
                data: 'http://localhost:8080/geoserver/health_map/wfs?service=WFS&version=1.0.0&request=GetFeature&outputFormat=application/json&typeName=health_map:dentist',
            },
            'population-source': {
                'type': 'raster',
                'tiles': [
                    'http://localhost:8080/geoserver/health_map/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=population_2020'
                ],
                'tileSize': 256,
            },
            'road-layer-source': {
                'type': 'raster',
                'tiles': [
                    'http://localhost:8080/geoserver/health_map/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=gis_osm_roads_free_1'
                ]
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
                id: 'hospitals',
                type: 'fill',
                source: 'hospital-source',
                paint: {
                    // 'circle-radius': 7,
                    'fill-color': '#d73027',
                    // 'circle-stroke-width': 1,
                    // 'circle-stroke-color': '#ccc'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'clinics-doctors',
                type: 'circle',
                source: 'clinic-doctor-source',
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#fc8d59',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ccc'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'pharmacies',
                type: 'circle',
                source: 'pharmacy-source',
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#1a9850',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ccc'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'dentists',
                type: 'circle',
                source: 'dentist-source',
                paint: {
                    'circle-radius': 7,
                    // màu khác
                    'circle-color': '#91bfdb',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ccc'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'population',
                'type': 'raster',
                'source': 'population-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                'id': 'road-layer',
                'type': 'raster',
                'source': 'road-layer-source',
                'paint': {
                    'raster-opacity': 0.8
                },
                layout: {
                    'visibility': 'none'
                }
            }
        ],
    },
    center: [105.854444, 21.028511],
    zoom: 8,
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

map.on('mouseenter', 'hospitals', () => {
    map.getCanvas().style.cursor = 'pointer'; // Chỉ định cursor là 'pointer'
});

// Khôi phục cursor về mặc định khi không hover
map.on('mouseleave', 'hospitals', () => {
    map.getCanvas().style.cursor = ''; // Khôi phục cursor về mặc định
});

let current_id;

// Thêm sự kiện click điểm quan trắc trên bản đồ
map.on('click', 'hospitals', (e) => {
    // Lấy thông tin của điểm được nhấn
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['hospitals'],

    });
    console.log(features);

    if (features.length > 0) {
        const feature = features[0];
        console.log(feature);

        if (current_id == feature.properties.id) {
            return;
        }

        current_id == feature.properties.id;


        var address = '';

        if (feature.properties["addr:housenumber"]) {
            if (feature.properties["addr:housenumber"].toString().trim().length > 0) {
                address += feature.properties["addr:housenumber"].toString().trim() + ', ';
            }
        }

        if (feature.properties["addr:street"]) {
            if (feature.properties["addr:street"].toString().trim().length > 0) {
                address += feature.properties["addr:street"].toString().trim() + ', ';
            }
        }

        if (feature.properties["addr:subdistrict"]) {
            if (feature.properties["addr:subdistrict"].toString().trim().length > 0) {
                address += feature.properties["addr:subdistrict"].toString().trim() + ', ';
            }
        }

        if (feature.properties["addr:district"]) {
            if (feature.properties["addr:district"].toString().trim().length > 0) {
                address += feature.properties["addr:district"].toString().trim() + ', ';
            }
        }
        if (feature.properties["addr:city"] || feature.properties["addr:province"]) {
            if (feature.properties["addr:city"].toString().trim().length > 0) {
                address += feature.properties["addr:city"].toString().trim();
            }
        }

        const healthcareMapping = {
            "hospital": "Bệnh viện",
            "clinic": "Trạm xá",
            "doctor": "Phòng khám bác sĩ",
            "pharmacy": "Nhà thuốc",
            "dentist": "Nha sĩ",
        };

        // Kiểm tra và thay đổi giá trị cho 'healthcare' hoặc 'amenity'
        let healthcareType = feature.properties.healthcare || feature.properties.amenity;

        if (healthcareType) {
            // Nếu có giá trị trong healthcare hoặc amenity, thay thế bằng tiếng Việt
            healthcareType = healthcareMapping[healthcareType.toLowerCase()] || healthcareType; // Nếu không có trong mapping, giữ nguyên giá trị gốc
        }


        // Tạo nội dung bảng
        const tableContent = `
            <tr>
                <td>Mã địa lý</td>
                <td>${feature.properties.id || ''}</td>
            </tr>
            <tr>
                <td>Loại</td>
                <td>${healthcareType ||''}</td>
            </tr>
            <tr>
                <td>Đối tượng đặc biệt</td>
                <td>${feature.properties["healthcare:speciality"] || ''}</td>
            </tr>
            <tr>
                <td>Địa chỉ</td>
                <td>${address || ''}</td>
            </tr>
            <tr>
                <td>Tên</td>
                <td>${feature.properties.name || ''}</td>
            </tr>
            <tr>
                <td>Liên lạc</td>
                <td>${feature.properties.phone || feature.properties.mobile || feature.properties["contact:phone"] ||''}</td>
            </tr>
        `;

        $('.data-info-table').removeClass('d-none');
        $('.data-info-table .table tbody').html(tableContent);
    }
});

$('#data-info-table__close-btn').on('click', function () {
    $('.data-info-table').addClass('d-none');
});