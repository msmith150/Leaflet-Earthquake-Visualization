// Initialize the map
const map = L.map('map').setView([20, 0], 2); // Centered on an arbitrary point

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Fetch earthquake data from USGS using D3
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
    .then(data => {
        data.features.forEach(earthquake => {
            const coords = earthquake.geometry.coordinates;
            const magnitude = earthquake.properties.mag;
            const depth = coords[2];

            // Determine marker size based on magnitude
            const markerSize = magnitude * 5; // Adjust size multiplier as necessary

            // Determine marker color based on depth
            let markerColor;
            if (depth > 50) {
                markerColor = '#ff0000'; // red
            } else if (depth > 20) {
                markerColor = '#ff7f00'; // orange
            } else if (depth > 10) {
                markerColor = '#ffff00'; // yellow
            } else {
                markerColor = '#7fff00'; // light green
            }

            // Create a circle marker
            const marker = L.circleMarker([coords[1], coords[0]], {
                radius: markerSize,
                fillColor: markerColor,
                color: markerColor,
                fillOpacity: 0.6,
                stroke: false
            }).addTo(map);

            // Add a popup with earthquake information
            marker.bindPopup(`<strong>Location:</strong> ${earthquake.properties.place}<br>
                              <strong>Magnitude:</strong> ${magnitude}<br>
                              <strong>Depth:</strong> ${depth} km<br>
                              <a href="${earthquake.properties.url}" target="_blank">More Info</a>`);
        });
    })
    .catch(error => console.error('Error fetching the earthquake data:', error));
