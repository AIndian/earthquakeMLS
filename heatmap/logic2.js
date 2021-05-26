
// Store our API endpoint inside queryUrl

var myMap = L.map("map", {
    center: [36.1699, -115.1398],
    zoom: 6,
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v10",
//     accessToken: API_KEY
//   }).addTo(myMap);

var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-01-01&endtime=2021-05-01&maxlongitude=-105.61&minlongitude=-124.49&maxlatitude=37.81&minlatitude=32.06&minmagnitude=4";

d3.json(queryUrl).then(function(earthquakeData) {
    
    console.log(earthquakeData);
    // var magnitude = []
    var lat_long = [];
    var i;
    for (i = 0; i < earthquakeData.features.length; i ++){
        
        var geometry = earthquakeData.features[i].geometry;
        var properties = earthquakeData.features[i].properties;
        if (geometry) {
          lat_long.push([geometry.coordinates[1], geometry.coordinates[0], properties.mag]); 
        }
        // if (properties) {
        //     magnitude.push([properties.mag]);
        // }
    }

console.log(lat_long);
// console.log(magnitude)

L.heatLayer(lat_long, {
    radius: 15,
    maxZoom: 5

  }).addTo(myMap);

});