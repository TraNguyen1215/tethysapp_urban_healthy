const map = L.map('map').setView([21.0278, 105.8342], 10); // Hà Nội

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Load hospital data
fetch('/api/hospitals')
    .then(res => res.json())
    .then(data => {
        data.forEach(feature => {
            const [lon, lat] = feature.geometry.coordinates;
            L.circleMarker([lat, lon], {
                radius: 5,
                color: 'red'
            }).bindPopup(`<b>Bệnh viện:</b> ${feature.properties.name || 'Không rõ'}`).addTo(map);
        });
    });
