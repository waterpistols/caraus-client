import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {
    componentDidMount() {
        let L  = this.L = require('lib/leaflet');
        require('lib/Control.Geocoder');
        require('lib/leaflet-routing-machine.min');

        L.Icon.Default.imagePath = 'images';
        let map = this.map = L.map(ReactDOM.findDOMNode(this));

        L.tileLayer('https://api.mapbox.com/styles/v1/depishor/cinx0oscf003ebrnokvzqzf3m/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGVwaXNob3IiLCJhIjoiY2lueDBta3d6MDBwdXZ4bTI4dDIzZDRuNSJ9.1ljt7edUQj0WolCNuu9I2Q', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        this.matchFirst = null;
        this.matchSecond = null;
        this.firstPoint = null;
        this.secondPoint = null;

        var myLayer = new L.FeatureGroup();
        var searchPoints = [];
        var start = this.start = L.latLng(47.04, 21.91);
        var finish = this.finish = L.latLng(44.42, 26.11);


        var router = L.Routing.control({
            waypoints: [start, finish],
            routeWhileDragging: false,
            geocoder: L.Control.Geocoder.nominatim(),
            showAlternatives: true,
            autoRoute: true,
        }).addTo(map);

        // var clickHandler = function(e) {
        //
        // };

        map.on('click', (event) => { this.onMapClick(event) });

        router.on('routesfound', (routes) => {

          // Split route coordinates
          var radius = 30; // km
          var route = routes.routes[0];
          var coordinates = route.coordinates;
          var squares = Math.round(route.summary.totalDistance / (radius * 1000 )) * 4;
          var whichPoint = Math.round(coordinates.length / squares);
          var previous = L.latLng(47.04, 21.91);


          for(var i = 0; i < coordinates.length; i++) {
            if(i%whichPoint === 0) {
              var distance = Math.round(previous.distanceTo(coordinates[i]) / 1000);
              var difference = distance - (radius);
              var displayPoint = i;
              searchPoints.push(coordinates[i]);

              if(difference > 0 || distance == 0) {
                var temp = L.circle(coordinates[i], (radius * 1000), { stroke: false, color: '#ff7800' }).addTo(map);
                previous = coordinates[displayPoint];
              }
            }
          }

          // last circle
          L.circle(coordinates[i-1], (radius * 1000), { stroke: false, color: '#ff7800' }).addTo(map);

          this.searchPoints = searchPoints;

          // function unify(polyList) {
          //   for (var i = 0; i < polyList.length; ++i) {
          //     if (i == 0) {
          //       var unionTemp = polyList[i].toGeoJSON();
          //     } else {
          //       unionTemp = turf.union(unionTemp, polyList[i].toGeoJSON());
          //     }
          //   }
          //   return L.geoJson(unionTemp);
          // }
          // myLayer.on('click', clickHandler)

        // console.log(myLayer.getLayers())
          // var temp = unify(myLayer.getLayers());
          // temp._layers[53].options.stroke = false;
          // temp._layers[53].options.color = '#ff7800';
          // temp.on('click', clickHandler).addTo(map);
        });
    }
    componentWillUnmount() {
        this.map.off('click', this.onMapClick);
        this.map = null;
    }

    onMapClick(event) {
      const lat = 0.2;
      const lng = 0.3;
      const northest = event.latlng.lat + lat;
      const southest = event.latlng.lat - lat;
      const eastest = event.latlng.lng + lng;
      const westest = event.latlng.lng - lng;

      let found = false;

      this.L.marker(event.latlng).addTo(this.map);

      if(!this.firstPoint) {
        this.firstPoint = event.latlng;
      } else {
        this.secondPoint = event.latlng;

        const router = this.L.Routing.control({
            waypoints: [this.firstPoint, this.secondPoint],
            geocoder: this.L.Control.Geocoder.nominatim(),
            autoRoute: true
        }).addTo(this.map);
      }

      // search for a nearby point in the route
      for(let i = 0; i < this.searchPoints.length && !found; i++) {
        if(this.searchPoints[i]['lat'] <= northest && this.searchPoints[i]['lat'] >= southest && this.searchPoints[i]['lng'] >= westest && this.searchPoints[i]['lng'] <= eastest) {
          if(!this.matchFirst) {
            this.matchFirst = true;
          } else {
            this.matchSecond = true;
          }
          found = true;
        }
      }

      if(this.matchFirst && this.matchSecond) {

        // Validate direction
        if(this.firstPoint.distanceTo(this.start) <= this.firstPoint.distanceTo(this.finish) && this.secondPoint.distanceTo(this.finish) <= this.secondPoint.distanceTo(this.start)) {
          var popLocation = this.searchPoints[i];
          var popup = L.popup()
            .setLatLng(popLocation)
            .setContent('Bingo')
            .openOn(this.map);

        } else {
          var popLocation = this.searchPoints[i];
          var popup = L.popup()
            .setLatLng(popLocation)
            .setContent('Wrong Direction')
            .openOn(this.map);
        }
      }

      L.marker([northest, eastest]).addTo(this.map);
      L.marker([southest, eastest]).addTo(this.map);
      L.marker([northest, westest]).addTo(this.map);
      L.marker([southest, westest]).addTo(this.map);
    }

    render() {
        const mapStyle = {
          position: 'absolute',
          width: '100%',
          height: '100%'
        }

        return (
            <div style={mapStyle}></div>
        );
    }
}

export default Map;
