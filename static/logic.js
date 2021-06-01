var Region = [[42.03, -124.49],[32.5, -114.47]]
var earthquakeMagnitude = 3
var faultURL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2016-01-01&endtime=2021-05-01"+
`&maxlongitude=${Region[1][1]}&minlongitude=${Region[0][1]}&maxlatitude=${Region[0][0]}&minlatitude=${Region[1][0]}&minmagnitude=${earthquakeMagnitude}`;
var zipcodeURL = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=&rows=3000&facet=state&facet=timezone&facet=dst&geofilter.polygon=(37.81%2C+-124.49)%2C+(37.81%2C+-105.61)%2C+(32.06%2C+-105.61)%2C+(32.06%2C-124.49)"
var houseURL = "/api/house"

  var myMap = L.map("map", {
    center: [
      35.0, -115.71
    ],
    zoom: 7,
  });


L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


d3.json(faultURL).then(function(earthquakeData) {
d3.json(houseURL).then(function(houseinfo) {

    function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "coordinates: " + feature.geometry.coordinates +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 10,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
        });
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "dark-v10",
    accessToken: API_KEY
        });

    console.log(houseinfo)
    var houselat_long = []
    var j;
    var housemarkers = []
    for (j = 0; j < houseinfo[0].lat.length; j++){

        var city = houseinfo[0].text[j]
        var lat = houseinfo[0].lat[j];
        var lon = houseinfo[0].lon[j];
        var price = houseinfo[0].pri[j]
        if (lat) {
          houselat_long.push([lat, lon, price]);
        };
          housemarkers.push(L.marker([lat, lon]).bindPopup("<h1>" + city + "</h1>" + "<h2>" + "Median House Price: " + price+ "</h2>"))
    }
    console.log(housemarkers)
    console.log(houselat_long)
    // var magnitude = []
    var lat_long = [];
    var i;
    for (i = 0; i < earthquakeData.features.length; i ++){

        var geometry = earthquakeData.features[i].geometry;
        var properties = earthquakeData.features[i].properties;
        if (geometry) {
          lat_long.push([geometry.coordinates[1], geometry.coordinates[0], properties.mag]);
        }
    }


  // Create a layer control
    var houselayer = L.layerGroup(housemarkers)

    var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
     };

    var heat = L.heatLayer(lat_long, {
    radius: 15,
    maxZoom: 10
    }).addTo(myMap)

    var overlayMaps = {
    Housing: houselayer
    };

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

});
});

