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
//= require bootstrap

$(document).ready(function() {
  function initialize() {
    var downTown = new google.maps.LatLng(49.235214, -122.965123);
    var mapOptions = {
      zoom: 12,
      scrollwheel: false
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        var userMarker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'You are here!',
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          animation: google.maps.Animation.DROP
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

    // Load C. Centres from the database and set each pin data
    var pins = [];
    $.get('/centres.json').done(function(data) {
      pins = data
      $.each(pins, function(index, item){
        addPin(
          item.latitude, 
          item.longitude, 
          item.name, 
          item.description,
          item.address,
          item.phone,
          item.email,
          item.city,
          item.province
        );
      });
    });

    // Add all Pins to the map on the specified position
    var addPin = function(lat, long, name, description, address, phone, email, city, province) {
      var loc = new google.maps.LatLng(lat, long);
      // Create new marker
      var newMarker = new google.maps.Marker({
        position: loc,
        map: map,
        title: name,
        icon: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
        animation: google.maps.Animation.DROP
      });

      //Set InfoWindow properties
      var newInfoWindow = new google.maps.InfoWindow({
        content: '<div id="iw-container">' +
                    '<div class="iw-title">' + name + '</div>' +
                    '<div class="iw-content">' +
                      '<p>' + description + '</p>' +
                      '<div class="iw-subTitle">Contacts</div>' +
                      '<p>Phone: ' + phone + '<br>Email: ' + email + '<br>'+
                      '<p>Address: ' + address + ', ' + city + ' - ' + province + '<br>' +
                    '</div>' +
                    '<div class="iw-bottom-gradient"></div>' +
                  '</div>',
        maxWidth: 350
      });

      addInfoWindowListener(newMarker, newInfoWindow);

      google.maps.event.addListener(newInfoWindow, 'domready', function() {

        // Reference to the DIV that wraps the bottom of infowindow
        var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
        */
        var iwBackground = iwOuter.prev();

        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display' : 'none'});

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});

        // Moves the infowindow 115px to the right.
        iwOuter.parent().parent().css({left: '115px'});

        // Moves the shadow of the arrow 76px to the left margin.
        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Moves the arrow 76px to the left margin.
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

        // Changes the desired tail shadow color.
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

        // Reference to the div that groups the close button
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.css({opacity: '1', right: '60px', top: '20px'});

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        if($('.iw-content').height() < 140){
          $('.iw-bottom-gradient').css({display: 'none'});
        }

        // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
        });
      });
    }

    //Function to toggle InfoWindow On/Off based on user's click
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
      // Closes infoWindow if user clicks anywhere on the map
      google.maps.event.addListener(map, 'click', function() {
        newInfoWindow.close();
      });      
    } 

  }
  google.maps.event.addDomListener(window, 'load', initialize);
});
