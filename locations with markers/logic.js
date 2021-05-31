// Create a map object
var myMap = L.map("map", {
  center: [36.09, -115.71],
  zoom: 6
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// An array containing each city's name, location, and population
var cities = [{

location: [37.155177, -119.543418], name: "Amador" },
{ location: [37.7799, -122.282], name: "Alameda" },
  { location: [39.6254, -121.537], name: "Butte" },
  { location: [37.155177, -119.543418], name: "Calaveras" },
  { location: [34.839964, -115.967051], name: "Contra-Costa" },
  { location: [41.7076, -123.966], name: "Del Norte" },
  { location: [38.676272, -120.84598], name: "El Dorado" },
  { location: [36.8411, -119.801015], name: "Fresno" },
  { location: [39.596546, -122.032181], name: "Glenn" },
  { location: [40.745, -123.8695], name: "Humboldt" },
  { location: [37.155177, -119.543418], name: "Kern" },
  { location: [36.0988, -119.8815], name: "Kings" },
  { location: [38.25047, -121.509397], name: "Lake" },
  { location: [40.5394, -120.712], name: "Lassen" },
  { location: [33.973951, -118.248405], name: "Los Angeles" },
  { location: [36.928286, -120.182423], name: "Madera" },
  { location: [36.6844, -121.80217], name: "Marin" },
  { location: [37.572907, -120.018973], name: "Mariposa" },
  { location: [39.319949, -123.734377], name: "Mendocino" },
  { location: [37.345785, -120.42415], name: "Merced" },
  { location: [37.155177, -119.543418], name: "Mono" },
  { location: [36.57485, -121.840727], name: "Monterey" },
  { location: [38.442011, -122.23832], name: "Napa" },
  { location: [38.134068, -122.52719], name: "Nevada" },
  { location: [33.640302, -117.769442], name: "Orange" },
  { location: [39.0916, -120.8039], name: "Placer" },
  { location: [37.155177, -119.543418], name: "Plumas" },
  { location: [33.99504, -117.373184], name: "Riverside" },
  { location: [38.380456, -121.555406], name: "Sacramento" },
  { location: [36.509685, -121.08186], name: "San Benito" },
  { location: [34.104794, -117.29215], name: "San Bernardino" },
  { location: [32.724103, -117.170912], name: "San Diego" },
  { location: [37.776646, -122.417481], name: "San Francisco" },
  { location: [36.60662, -120.18904], name: "San Joaquin" },
  { location: [35.265573, -120.62122], name: "San Luis Obispo" },
  { location: [37.573485, -122.32253], name: "San Mateo" },
  { location: [34.421897, -119.707135], name: "Santa Barbara" },
  { location: [37.351158, -121.952295], name: "Santa Clara" },
  { location: [37.052748, -122.111126], name: "Santa Cruz" },
  { location: [40.601263, -122.494455], name: "Shasta" },
  { location: [37.155177, -119.543418], name: "Siskiyou" },
  { location: [38.3105, -121.9018], name: "Solano" },
  { location: [38.255943, -122.476819], name: "Sonoma" },
  { location: [37.155177, -119.543418], name: "Stanislaus" },
  { location: [39.172636, -121.80251], name: "Sutter" },
  { location: [40.0271, -122.12332], name: "Tehama" },
  { location: [36.133527, -119.299856], name: "Tulare" },
  { location: [37.921694, -120.267887], name: "Tuolumne" },
  { location: [34.330829, -119.358352], name: "Ventura" },
  { location: [38.73185, -121.80774], name: "Yolo" },
  { location: [39.2547, -121.3999], name: "Yuba" },
  { location: [34.0522, -118.2437], name: "LA Metro" },
  { location: [35.6, -121.1], name: "Central Coast" },
  { location: [40.1999, -122.2011], name: "Central Valley" },
  { location: [34.9592, -116.4194], name: "Inland Empire" },
  { location: [37.8272, -122.2913], name: "S.F. Bay Area" },
  { location: [34.9592, -116.4149], name: "SoCal" }
  
//   location: [40.7128, -74.0059],
//   name: "New York",
//   population: "8,550,405"
// },
// {
//   location: [41.8781, -87.6298],
//   name: "Chicago",
//   population: "2,720,546"
// },
// {
//   location: [29.7604, -95.3698],
//   name: "Houston",
//   population: "2,296,224"
// },
// {
//   location: [34.0522, -118.2437],
//   name: "Los Angeles",
//   population: "3,971,883"
// },
// {
//   location: [41.2524, -95.9980],
//   name: "Omaha",
//   population: "446,599"
// }
];

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  L.marker(city.location)
    .bindPopup("<h1>" + city.name + "</h1>")
    .addTo(myMap);
}
