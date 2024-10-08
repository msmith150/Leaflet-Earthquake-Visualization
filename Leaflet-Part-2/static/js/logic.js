// Initialize the map
const map = L.map('map').setView([20, 0], 2); // Centered on an arbitrary point

// Define base map layers
const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // Street Map
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors' // Layer source displayed at bottom right of screen
}).addTo(map); // Add streets layer to the map

const satellite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { // Satellite Map
    maxZoom: 19,
    attribution: '© Google' // Layer source displayed at bottom right of screen
});

const grayscale = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { // Grayscale Map
    maxZoom: 17,
    attribution: '© OpenTopoMap' // Layer source displayed at bottom right of screen
});

// Base layers for control
const baseMaps = {
    "Streets": streets,
    "Satellite": satellite,
    "Grayscale": grayscale,
};

// Layer groups for earthquake and tectonic plates
const earthquakeLayer = L.layerGroup().addTo(map); // Layer for earthquakes
const tectonicPlateLayer = L.layerGroup(); // Layer for tectonic plates

// Fetch earthquake data
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
    .then(data => {
        data.features.forEach(earthquake => {
            const coords = earthquake.geometry.coordinates;
            const magnitude = earthquake.properties.mag;
            const depth = coords[2];

            // Determine marker size and color
            const markerSize = magnitude * 5;
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

            // Create a circle marker and add to the earthquake layer
            const marker = L.circleMarker([coords[1], coords[0]], {
                radius: markerSize,
                fillColor: markerColor,
                color: markerColor,
                fillOpacity: 0.6,
                stroke: false
            }).addTo(earthquakeLayer);

            // Add a popup with earthquake information
            marker.bindPopup(`<strong>Location:</strong> ${earthquake.properties.place}<br>
                              <strong>Magnitude:</strong> ${magnitude}<br>
                              <strong>Depth:</strong> ${depth} km<br>
                              <a href="${earthquake.properties.url}" target="_blank">More Info</a>`);
        });

        // Load tectonic plate data
        d3.json('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json')  // Direct link to raw Github file to avoide placing on local machine
            .then(data => {
                L.geoJSON(data, {
                    style: {
                        color: 'blue',
                        weight: 2,
                        opacity: 0.6
                    }
                }).addTo(tectonicPlateLayer);
            })
            .catch(error => console.error('Error fetching the tectonic plate data:', error));
    })
    .catch(error => console.error('Error fetching the earthquake data:', error));

// Add layer control for toggling
const overlayMaps = {
    "Earthquakes": earthquakeLayer,
    "Tectonic Plates": tectonicPlateLayer
};

L.control.layers(baseMaps, overlayMaps).addTo(map);



