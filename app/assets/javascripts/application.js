// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require bootstrap-sprockets

$(document).ready(function() {
  function initialize() {
    var downTown = new google.maps.LatLng(49.235214, -122.965123);
    var mapOptions = {
      zoom: 12,
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'You are here.'
        });

        map.setCenter(pos);
      }, function() {
          handleNoGeolocation(true);
        });
    } else {
      // Browser doesn't support Geolocation or user block this feature
      handleNoGeolocation(false);
    }
    // Handle GeoLocation problems
    function handleNoGeolocation(errorFlag) {
      if (errorFlag) {
        var options = {
          map: map,
          zoom: 12,
          position: downTown,
        };
      }
      map.setCenter(options.position);
    }

    // Load centres from the database and set each pin data
    var pins = [];
    $.get('/centres.json').done(function(data) {
      pins = data
      $.each(pins, function(index, item){
        addPin(item.latitude, item.longitude, item.name, item.description);
      });
    });

    var addPin = function(lat, long, name, description) {
      var loc = new google.maps.LatLng(lat, long);
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        title: name,
        icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
      });

      var newInfoWindow = new google.maps.InfoWindow({
        content: "<h3>Description: " + description + "</h3>"
      });
      addInfoWindowListener(newMarker, newInfoWindow);
    }

    var lastInfoWindow;
    var addInfoWindowListener = function(marker, newInfoWindow) {
      google.maps.event.addListener(marker, 'click', function() {
        if(!!lastInfoWindow){
          lastInfoWindow.close();
        }
        if(lastInfoWindow === newInfoWindow){
          lastInfoWindow = null;
        }
        else {
          newInfoWindow.open(map,this);
          lastInfoWindow = newInfoWindow;
        }
      });
    }

    // var contentString = '<div id="content">'+
    //     '<div id="siteNotice">'+
    //     '</div>'+
    //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    //     '<div id="bodyContent">'+
    //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    //     'sandstone rock formation in the southern part of the '+
    //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    //     'south west of the nearest large town, Alice Springs; 450&#160;km '+
    //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    //     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    //     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    //     'Aboriginal people of the area. It has many springs, waterholes, '+
    //     'rock caves and ancient paintings. Uluru is listed as a World '+
    //     'Heritage Site.</p>'+
    //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    //     '(last visited June 22, 2009).</p>'+
    //     '</div>'+
    //     '</div>';

    // var infowindow = new google.maps.InfoWindow({
    //     content: contentString
    // });

    // var theirMarker = new google.maps.Marker({
    //     position: theirLatLng,
    //     map: map,
    //     title: 'Hello World!'
    // });

    // var myMarker = new google.maps.Marker({
    //     position: myLatLng,
    //     map: map,
    //     draggable:true,
    //     animation: google.maps.Animation.DROP,
    //     title: 'Deer Lake!'
    // });

    // google.maps.event.addListener(newMarker, 'click', function() {
    //   infowindow.open(map,this);
    // });
  }

  google.maps.event.addDomListener(window, 'load', initialize);
});
