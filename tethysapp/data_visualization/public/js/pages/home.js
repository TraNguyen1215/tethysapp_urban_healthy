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
            {
                'id': 'population',
                'type': 'raster',
                'source': 'population-source',
                'paint': {
                    'raster-opacity': 0.6
                },
                layout: {
                    'visibility': 'none'
                }
            },
        ],
    },
    center: [105.854444, 21.028511],
    zoom: 12,
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

const layers = ['hospital-points', 'hospital-polygons', 'clinics-doctors-points', 'clinics-doctors-polygons', 'pharmacies-points', 'pharmacies-polygons', 'dentists-points', 'dentists-polygons', 'population'];

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

    $('#data-info-table').removeClass('d-none');
    $('#data-info-table .table tbody').html(tableContent);
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

map.on('click', function (e) {
    const visibility = map.getLayoutProperty('population', 'visibility');
    if (visibility !== 'visible') {
        console.log('Layer "population" đang bị ẩn, bỏ qua xử lý click.');
        return;
    }
    const bbox = map.getBounds().toArray().flat();
    const width = map.getContainer().clientWidth;
    const height = map.getContainer().clientHeight;

    const x = Math.round(e.point.x);
    const y = Math.round(e.point.y);

    const url = `http://localhost:8080/geoserver/health_map/wms?` +
        `SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo` +
        `&FORMAT=image/png&TRANSPARENT=true` +
        `&QUERY_LAYERS=vn_dancu_2020_1km` +
        `&LAYERS=vn_dancu_2020_1km` +
        `&INFO_FORMAT=application/json` +
        `&SRS=EPSG:4326` +
        `&WIDTH=${width}&HEIGHT=${height}` +
        `&X=${x}&Y=${y}` +
        `&BBOX=${bbox.join(',')}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.features && data.features.length > 0) {
                console.log(data);
                const props = data.features[0].properties;
                const tableContent = `
                    <tr><td>Mật độ dân số 1km2</td><td>${props.GRAY_INDEX || 'Không có dữ liệu mật độ dân số'}</td></tr>
                `;

                $('#data-info-table-population').removeClass('d-none');
                $('#data-info-table-population .table tbody').html(tableContent);
            }
        })
        .catch(err => console.error('Error fetching feature info:', err));
});


$('#data-info-table__close-btn').on('click', function () {
    $('#data-info-table').addClass('d-none');
});
$('#data-info-table-population__close-btn').on('click', function () {
    $('#data-info-table-population').addClass('d-none');
});

// Tải danh sách cơ sở y tế
$.ajax({
    url: `/apps/data-visualization/api/facilities`,
    method: 'GET',
    success: function (data) {
        updateFacilityDropdown(data.data.data);
        console.log(data);
    },
    error: function () {
        $('#search-keyword').html('<option>-- Không thể tải dữ liệu --</option>');
    }
});

$('#type-checkboxes input[type="checkbox"]').on('change', function () {
    $('#search-keyword').html('<option>-- Đang tải tên cơ sở... --</option>');

    let selectedTypes = [];
    $('#type-checkboxes input[type="checkbox"]:checked').each(function () {
        selectedTypes.push($(this).val());
    });

    $('#search-keyword').empty().append('<option>-- Đang tải dữ liệu... --</option>');

    let allFacilities = [];

    if (selectedTypes.length ==0 ) {
        $.ajax({
            url: `/apps/data-visualization/api/facilities`,
            method: 'GET',
            success: function (data) {
                updateFacilityDropdown(data.data.data);
                console.log(data);
            },
            error: function () {
                $('#search-keyword').html('<option>-- Không thể tải dữ liệu --</option>');
            }
        });

    } else {
        let pending = selectedTypes.length;

        console.log(selectedTypes);

        selectedTypes.forEach(function (type) {
            $.ajax({
                url: `/apps/data-visualization/api/facilities/${type}`,
                method: 'GET',
                data: { type: type },
                success: function (data) {
                    allFacilities = allFacilities.concat(data.data.data);

                },
                complete: function () {
                    pending--;
                    if (pending === 0) {
                        updateFacilityDropdown(allFacilities);
                    }
                },
                error: function () {
                    pending--;
                    if (pending === 0) {
                        updateFacilityDropdown(allFacilities);
                    }
                }
            });
        });
    }
});
// Cập nhật dropdown với danh sách cơ sở y tế
function updateFacilityDropdown(data) {
    $('#search-keyword').empty().append('<option value="">-- Chọn tên cơ sở --</option>');
    if (data && data.length > 0) {
        data.forEach(function (item) {
            $('#search-keyword').append(
                $('<option>', {
                    text: item.name || '[Không tên]'
                })
            );
        });
    } else {
        $('#search-keyword').append('<option value="">-- Không có cơ sở nào --</option>');
    }
}

// Tìm kiếm địa chỉ
const API_KEY = 'JgkWvFIk4UTLFsY8PmCW2hlm3puo3WRhsqYspuJX';
let debounceTimer;
let marker;
let userLatLng = null;  // Lưu [lat, lng]

$('#search-location').on('input', function () {
    const query = $(this).val().trim();
    clearTimeout(debounceTimer);

    if (!query) {
        $('#suggestions').empty();
        return;
    }

    debounceTimer = setTimeout(() => {
        $.get('https://rsapi.goong.io/Place/AutoComplete', {
            input: query,
            api_key: API_KEY
        }, function (data) {
            $('#suggestions').empty();
            if (data.predictions) {
                data.predictions.forEach(item => {
                    $('#suggestions').append(`
                                <li class="list-group-item list-group-item-action" data-id="${item.place_id}">
                                    ${item.description}
                                </li>
                            `);
                });
            }
        });
    }, 300);
});

// Khi người dùng chọn gợi ý
$(document).on('click', '#suggestions li', function () {
    const selectedText = $(this).text().trim();
    $('#search-location').val(selectedText);
    $('#suggestions').empty();

    // Nếu bạn muốn lấy tọa độ từ place_id:
    const placeId = $(this).data('id');
    $.get('https://rsapi.goong.io/Place/Detail', {
        place_id: placeId,
        api_key: API_KEY
    }, function (detail) {
        const location = detail.result.geometry.location;
        console.log('Tọa độ:', location.lat, location.lng);
        userLatLng = [location.lat, location.lng];  // Lưu tọa độ người dùng
        map.flyTo({
            center: [location.lng, location.lat],
            zoom: 15
        });
        if (marker) {
            marker.remove();
        }
        marker = new maplibregl.Marker()
            .setLngLat([location.lng, location.lat])
            .setPopup(new maplibregl.Popup().setText(selectedText))
            .addTo(map);

        marker.togglePopup();
    });
});

// Ẩn gợi ý khi click ra ngoài
$(document).on('click', function (e) {
    if (!$(e.target).closest('#search-location').length) {
        $('#suggestions').empty();
    }
});

const btnNearest = document.getElementById('btn-nearest');
const btnShortest = document.getElementById('btn-shortest');
const locationInput = document.getElementById('search-location');
const keywordSelect = document.getElementById('search-keyword');
const resultDiv = document.getElementById('nearest-results');

// MapLibre đã khởi tạo sẵn với biến tên `map`
let markers = [];
let routeLayerId = "shortest-route";

// Xóa các marker và route cũ
function clearMap() {
    markers.forEach(m => m.remove());
    markers = [];
    if (map.getSource(routeLayerId)) {
        map.removeLayer(routeLayerId);
        map.removeSource(routeLayerId);
    }
}

// Hiển thị popup kết quả
function showPopup(coord, htmlContent) {
    new maplibregl.Popup()
        .setLngLat(coord)
        .setHTML(htmlContent)
        .addTo(map);
}

// Thêm marker
function addMarker(coord, color = '#FF0000') {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = color;
    el.style.width = '12px';
    el.style.height = '12px';
    el.style.borderRadius = '50%';

    const marker = new maplibregl.Marker(el).setLngLat(coord).addTo(map);
    markers.push(marker);
    return marker;
}

// Lấy danh sách loại cơ sở được chọn
function getSelectedTypes() {
    const checkboxes = document.querySelectorAll('#type-checkboxes input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

btnNearest.addEventListener('click', async () => {
    let types = getSelectedTypes();
    const address = locationInput.value;

    if (!address || types.length === 0) {
        alert('Vui lòng nhập địa chỉ và chọn ít nhất một loại cơ sở.');
        return;
    }

    if (!userLatLng) {
        alert('Vui lòng chọn một địa điểm từ ô tìm kiếm.');
        return;
    }
    if(types == 'hospital'){
        types = 'bệnh viện';
    } else if (types == 'clinic') {
        types = 'trạm y tế/phòng khám';
    }else if (types == 'doctor') {
        types = 'phòng khám tư nhân';
    } else if (types == 'pharmacy') {
        types = 'nhà thuốc';
    } else if (types == 'dentist') {
        types = 'nha khoa';
    }


    const lat = userLatLng[0];
    const lng = userLatLng[1];
    console.log('Tọa độ người dùng:', lat, '+', lng);

    try {
        const response = await fetch(`/apps/data-visualization/api/facility/nearest?lat=${lat}&lon=${lng}&type=${types}`, {
            method: 'GET'
        });

        const data = await response.json();
        clearMap();
        resultDiv.innerHTML = '';

        console.log(data.data);

        data.data.forEach((item, index) => {
            let coord;

            if (item.geometry.type === 'Point') {
                coord = item.geometry.coordinates;
            } else if (item.geometry.type === 'Polygon') {
                // Lấy điểm đầu tiên của vòng ngoài hoặc dùng thư viện Turf để lấy centroid
                coord = item.geometry.coordinates[0][0];
            } else {
                console.warn('Không hỗ trợ geometry type:', item.geometry.type);
                return;
            }

            const html = `<strong>${item.name}</strong><br>${item.address || ''}`;
            addMarker(coord, '#ff0000');
            showPopup(coord, html);
            resultDiv.innerHTML += `<p>${index + 1}. ${item.name}</p>`;
        });
        

    } catch (err) {
        console.error(err);
        alert('Không thể tìm kiếm gần nhất.');
    }
});


btnShortest.addEventListener('click', async () => {
    const keyword = keywordSelect.value;
    const address = locationInput.value;

    if (!address || !keyword) {
        alert('Vui lòng nhập địa chỉ và chọn tên cơ sở y tế.');
        return;
    }

    if (!userLatLng) {
        alert('Vui lòng chọn một địa điểm từ ô tìm kiếm.');
        return;
    }

    const [lat, lng] = userLatLng;

    try {
        const response = await fetch(`/apps/data-visualization/api/facility/shortest_path?lat=${lat}&lon=${lng}&name=${encodeURIComponent(keyword)}`);
        let data = await response.json();
        data = data.data;
        clearMap();

        const geometry = data.route;
        console.log(geometry);

        map.addSource(routeLayerId, {
            type: 'geojson',
            data: {
                type: "Feature",
                geometry: {
                    type: "MultiLineString",
                    coordinates: data.route.coordinates
                },
                properties: {}
            }
        });
        

        map.addLayer({
            id: routeLayerId,
            type: 'line',
            source: routeLayerId,
            paint: {
                'line-color': '#00b894',
                'line-width': 4
            }
        });
        console.log(data);
        
        addMarker(data.data.start, '#2d3436');
        addMarker(data.data.end, '#d63031');
        showPopup(data.data.end, `<strong>${data.data.name}</strong>`);

        map.fitBounds([
            data.data.start,
            data.data.end
        ], { padding: 50 });

    } catch (err) {
        console.error(err);
        alert('Không thể tìm đường.');
    }
});
