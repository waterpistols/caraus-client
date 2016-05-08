var map = L.map('map');

L.tileLayer('https://api.mapbox.com/styles/v1/depishor/cinx0oscf003ebrnokvzqzf3m/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVwaXNob3IiLCJhIjoiY2lueDBta3d6MDBwdXZ4bTI4dDIzZDRuNSJ9.1ljt7edUQj0WolCNuu9I2Q', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var myLayer = new L.FeatureGroup();
var searchPoints = [];
var start = L.latLng(47.04, 21.91);
var finish = L.latLng(44.42, 26.11);
var firstPoint = null;
var secondPoint = null;
var matchFirst = null;
var matchSecond = null;

var router = L.Routing.control({
    waypoints: [start, finish],
    routeWhileDragging: false,
    geocoder: L.Control.Geocoder.nominatim(),
    showAlternatives: true,
    autoRoute: true,
}).addTo(map);

var clickHandler = function(e) {
    var lat = 0.2; // 33 km
    var lng = 0.3; // 
    var found = false;
    var northest = e.latlng.lat + lat;
    var southest = e.latlng.lat - lat;
    var eastest = e.latlng.lng + lng;
    var westest = e.latlng.lng - lng;

    L.marker(e.latlng).addTo(map);

    if(!firstPoint) {
      firstPoint = e.latlng;
    } else {
      secondPoint = e.latlng;

      var router = L.Routing.control({
          waypoints: [firstPoint, secondPoint],
          geocoder: L.Control.Geocoder.nominatim(),
          autoRoute: true
      }).addTo(map);
    }

    // search for a nearby point in the route
    for(var i = 0; i < searchPoints.length && !found; i++) {
      if(searchPoints[i]['lat'] <= northest && searchPoints[i]['lat'] >= southest && searchPoints[i]['lng'] >= westest && searchPoints[i]['lng'] <= eastest) {
        if(!matchFirst) {
          matchFirst = true;
        } else {
          matchSecond = true;
        }
        found = true;
      }
    }

    if(matchFirst && matchSecond) {

      // Validate direction
      if(firstPoint.distanceTo(start) <= firstPoint.distanceTo(finish) && secondPoint.distanceTo(finish) <= secondPoint.distanceTo(start)) {
        var popLocation= searchPoints[i];
        var popup = L.popup()
        .setLatLng(popLocation)
        .setContent('Bingo')
        .openOn(map);

      } else {
        var popLocation= searchPoints[i];
        var popup = L.popup()
        .setLatLng(popLocation)
        .setContent('Wrong Direction')
        .openOn(map);
      }

    }



    L.marker([northest, eastest]).addTo(map);
    L.marker([southest, eastest]).addTo(map);
    L.marker([northest, westest]).addTo(map);
    L.marker([southest, westest]).addTo(map);
};

map.on('click', clickHandler);

router.on('routesfound', function(routes) {

  // Split route coordinates
  var radius = 30; // km
  var route = routes.routes[0];
  var coordinates = route.coordinates;
  var squares = Math.round(route.summary.totalDistance / (radius * 1000 )) * 4;
  var whichPoint = Math.round(coordinates.length / squares);
  var previous = L.latLng(47.04, 21.91);

  for(var i = 0; i < coordinates.length; i++) {
    if(i%whichPoint === 0) {
      var distance = Math.round(previous.distanceTo(coordinates[i]) / 1000, { parts: 120 });
      var difference = distance - (radius);
      var displayPoint = i;
      searchPoints.push(coordinates[i]);

      if(difference > 0 || distance == 0) {
        var temp = LGeo.circle(coordinates[i], (radius * 1000), { parts: 120 }).addTo(myLayer);
        previous = coordinates[displayPoint];
      }
    }
  }

  // last circle
  LGeo.circle(coordinates[i-1], (radius * 1000)).addTo(myLayer);

  function unify(polyList) {
    for (var i = 0; i < polyList.length; ++i) {
      if (i == 0) {
        var unionTemp = polyList[i].toGeoJSON();
      } else {
        unionTemp = turf.union(unionTemp, polyList[i].toGeoJSON());
      }
    }
    return L.geoJson(unionTemp);
  }
  // myLayer.on('click', clickHandler)

// console.log(myLayer.getLayers())
  var temp = unify(myLayer.getLayers());
  temp._layers[53].options.stroke = false;
  temp._layers[53].options.color = '#ff7800';
  temp.on('click', clickHandler).addTo(map);
});
