// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function popFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "(" + feature.properties.mag + ")" +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    
  }
  
  function getColor(d) {
    return d > 5   ? '#800026' :
           d > 4   ? '#E31A1C' :
           d > 3   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 1   ? '#FED976' :
                     '#FFEDA0';
  }

  function geojsonMarkerOptions(feature) {    
      return {
          radius:  feature.properties.mag * 3,
          fillColor: getColor(feature.properties.mag),
          color: "blue",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
      };
   }     

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions(feature))},
        onEachFeature: popFeature      
      });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define satellitemap, outdoormap and grayscalemap layers
  var outdoormap=L.tileLayer("https://api.mapbox.com/styles/v1/jgdataquest/cjbiqqsi20m7k2rpg25cz8gfo/tiles/256/{z}/{x}/{y}?" +
     "access_token=pk.eyJ1IjoiamdkYXRhcXVlc3QiLCJhIjoiY2o4MmozMmx3NTk3OTM3bnFrdXg3czgwayJ9.u_iJP8lRO6C1FuQdZn7KWA")
  
  var satellitemap=L.tileLayer("https://api.mapbox.com/styles/v1/jgdataquest/cjbiqd6gb0lwc2spcpx5a18j5/tiles/256/{z}/{x}/{y}?" +
     "access_token=pk.eyJ1IjoiamdkYXRhcXVlc3QiLCJhIjoiY2o4MmozMmx3NTk3OTM3bnFrdXg3czgwayJ9.u_iJP8lRO6C1FuQdZn7KWA");

  var grayscalemap=L.tileLayer("https://api.mapbox.com/styles/v1/jgdataquest/cjbisgkb50nqp2rl55x3zniin/tiles/256/{z}/{x}/{y}?"+
     "access_token=pk.eyJ1IjoiamdkYXRhcXVlc3QiLCJhIjoiY2o4MmozMmx3NTk3OTM3bnFrdXg3czgwayJ9.u_iJP8lRO6C1FuQdZn7KWA")

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite Map": satellitemap,
    "Outdoor Map": outdoormap,
    "GrayScale Map": grayscalemap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [satellitemap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);



  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0,1,2,3,4,5],
          labels = [];

          function getColor(d) {
              return d > 5   ? '#800026' :
                     d > 4   ? '#E31A1C' :
                     d > 3   ? '#FD8D3C' :
                     d > 2   ? '#FEB24C' :
                     d > 1   ? '#FED976' :
                               '#FFEDA0';
  }

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(myMap);
}