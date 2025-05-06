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
                id: 'hospital-points',
                type: 'circle',
                source: 'hospital-source',
                filter: ['==', '$type', 'Point'],
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#d73027',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'hospital-polygons',
                type: 'fill',
                source: 'hospital-source',
                filter: ['==', '$type', 'Polygon'],
                paint: {
                    'fill-color': '#d73027',
                    'fill-opacity': 0.4,
                    'fill-outline-color': '#990000'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            // Layer cho các phòng khám, bác sĩ, nhà thuốc, nha khoa
            {
                id: 'clinics-doctors-points',
                type: 'circle',
                source: 'clinic-doctor-source',
                filter: ['==', '$type', 'Point'],
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#FFCC00',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'clinics-doctors-polygons',
                type: 'fill',
                source: 'clinic-doctor-source',
                filter: ['==', '$type', 'Polygon'],
                paint: {
                    'fill-color': '#FFCC00',
                    'fill-opacity': 0.4,
                    'fill-outline-color': '#b30000'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'pharmacies-points',
                type: 'circle',
                source: 'pharmacy-source',
                filter: ['==', '$type', 'Point'],
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#1a9850',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'pharmacies-polygons',
                type: 'fill',
                source: 'pharmacy-source',
                filter: ['==', '$type', 'Polygon'],
                paint: {
                    'fill-color': '#1a9850',
                    'fill-opacity': 0.4,
                    'fill-outline-color': '#b30000'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'dentists-points',
                type: 'circle',
                source: 'dentist-source',
                filter: ['==', '$type', 'Point'],
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#91bfdb',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            {
                id: 'dentists-polygons',
                type: 'fill',
                source: 'dentist-source',
                filter: ['==', '$type', 'Polygon'],
                paint: {
                    'fill-color': '#91bfdb',
                    'fill-opacity': 0.4,
                    'fill-outline-color': '#b30000'
                },
                layout: {
                    'visibility': 'none'
                }
            },
            // {
            //     id: 'clinics-doctors',
            //     type: 'circle',
            //     source: 'clinic-doctor-source',
            //     paint: {
            //         'circle-radius': 7,
            //         'circle-color': '#fc8d59',
            //         'circle-stroke-width': 1,
            //         'circle-stroke-color': '#ccc'
            //     },
            //     layout: {
            //         'visibility': 'none'
            //     }
            // },
            // {
            //     id: 'pharmacies',
            //     type: 'circle',
            //     source: 'pharmacy-source',
            //     paint: {
            //         'circle-radius': 7,
            //         'circle-color': '#1a9850',
            //         'circle-stroke-width': 1,
            //         'circle-stroke-color': '#ccc'
            //     },
            //     layout: {
            //         'visibility': 'none'
            //     }
            // },
            // {
            //     id: 'dentists',
            //     type: 'circle',
            //     source: 'dentist-source',
            //     paint: {
            //         'circle-radius': 7,
            //         'circle-color': '#91bfdb',
            //         'circle-stroke-width': 1,
            //         'circle-stroke-color': '#ccc'
            //     },
            //     layout: {
            //         'visibility': 'none'
            //     }
            // },
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

const healthcareMapping = {
    "hospital": "Bệnh viện",
    "clinic": "Trạm xá/phòng khám",
    "doctor": "Phòng khám tư nhân",
    "pharmacy": "Nhà thuốc",
    "dentist": "Nha khoa",
};

const layers = ['hospital-points', 'hospital-polygons', 'clinics-doctors-points', 'clinics-doctors-polygons', 'pharmacies-points', 'pharmacies-polygons', 'dentists-points', 'dentists-polygons'];

let current_id = null;

function getAddress(properties) {
    let addressParts = [];

    if (properties["addr:housenumber"]) addressParts.push(properties["addr:housenumber"].trim());
    if (properties["addr:street"]) addressParts.push(properties["addr:street"].trim());
    if (properties["addr:subdistrict"]) addressParts.push(properties["addr:subdistrict"].trim());
    if (properties["addr:district"]) addressParts.push(properties["addr:district"].trim());
    if (properties["addr:city"]) addressParts.push(properties["addr:city"].trim());
    else if (properties["addr:province"]) addressParts.push(properties["addr:province"].trim());

    return addressParts.filter(Boolean).join(', ');
}

function showFeatureInfo(feature) {
    const properties = feature.properties;

    if (current_id === properties.id) return;
    current_id = properties.id;

    const address = getAddress(properties);

    let healthcareType = properties.healthcare || properties.amenity;
    if (healthcareType) {
        healthcareType = healthcareMapping[healthcareType.toLowerCase()] || healthcareType;
    }

    const tableContent = `
        <tr><td>Mã địa lý</td><td>${properties.id || ''}</td></tr>
        <tr><td>Loại</td><td>${healthcareType || ''}</td></tr>
        <tr><td>Đối tượng đặc biệt</td><td>${properties["healthcare:speciality"] || 'chung'}</td></tr>
        <tr><td>Địa chỉ</td><td>${address || ''}</td></tr>
        <tr><td>Tên</td><td>${properties.name || ''}</td></tr>
        <tr><td>Liên lạc</td><td>${properties.phone || properties.mobile || properties["contact:phone"] || ''}</td></tr>
    `;

    $('.data-info-table').removeClass('d-none');
    $('.data-info-table .table tbody').html(tableContent);
}

// Gắn sự kiện cho từng layer
layers.forEach(layer => {
    map.on('mouseenter', layer, () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', layer, () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', layer, (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: [layer]
        });

        if (features.length > 0) {
            showFeatureInfo(features[0]);
        }
    });
});

$('#data-info-table__close-btn').on('click', function () {
    $('.data-info-table').addClass('d-none');
});
