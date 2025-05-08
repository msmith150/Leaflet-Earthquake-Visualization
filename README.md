# 🌍 Leaflet Earthquake Visualization

## 📌 Project Overview

This project is part of Module 15 of a data analytics bootcamp and focuses on visualizing real-time earthquake data using the Leaflet.js library. The objective is to create an interactive map that displays earthquake occurrences, providing insights into their magnitude and depth.

## 🗺️ Features

- **Interactive Map**: Utilizes Leaflet.js to render a dynamic map centered on the United States.
- **Real-Time Data**: Fetches earthquake data from the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), specifically the "All Earthquakes from the Past Day" dataset.
- **Data Representation**:
  - **Markers**: Each earthquake is represented by a circle marker.
    - **Size**: Proportional to the earthquake's magnitude.
    - **Color**: Indicates the depth of the earthquake.
  - **Popups**: Clicking on a marker reveals:
    - Location
    - Magnitude
    - Depth
    - A hyperlink to the USGS event page for more details.
- **Legend**: A map legend explains the color coding for earthquake depths.

## 🧱 Repository Structure

- `Leaflet-Part-1/`: Contains the initial implementation focusing on earthquake data visualization.
- `Leaflet-Part-2/`: Enhances the map by overlaying tectonic plate boundary data.
- `README.md`: Provides an overview and instructions for the project.

## 🔧 Technologies Used

- **JavaScript**: Core scripting language for interactivity.
- **Leaflet.js**: Library for mobile-friendly interactive maps.
- **D3.js**: For data manipulation and binding.
- **HTML/CSS**: Structure and styling of the web pages.

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/msmith150/leaflet-challenge.git
 
2. **Navigate to the Directory**:
 ```bash
   cd leaflet-challenge/Leaflet-Part-1
 ```

3. **Open index.html in a Web Browser***:
Use your preferred browser to view the interactive map.

## 📈 Enhancements in Part 2
In Leaflet-Part-2, the project integrates tectonic plate boundary data to provide context on the relationship between earthquake occurrences and plate boundaries.

## 📄 License
This project is open-source and available under the MIT License.
