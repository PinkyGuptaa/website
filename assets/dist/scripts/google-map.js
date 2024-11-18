"use strict";

var currentLat = 28.4595;
var currentLong = 77.0266;
var lat, longT;
var map;
var markers = [];
var whereToBuyMarkers = [];
var geocodingToCityAPI = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=".concat(lat, "&longitude=").concat(longT, "&localityLanguage=en");
$(function () {
  // var wheretobuyBtn = $('a[data-target=".wheretobuy-modal"]');
  // wheretobuyBtn.on('click', function(){
  //   getLocation();
  // });
});
$(window).on('load', function () {
  if ($('#mapAddressSecAonla').length || $('#mapAddressSecKalol').length || $('#mapAddressSecKandla').length || $('#mapAddressSecParadeep').length || $('#mapAddressSecPhulpur').length || $('#mapAddressContentUs').length || $('#reachAddrsList').length) {
    getLocation();
  }
  if (window.location.href.indexOf('/corporate') >= 0) {
    try {
      getLocation();
      $.get(geocodingToCityAPI, function (resp, status) {
        if (status) {
          if (resp) {
            var principalSubdivisionCode = resp.principalSubdivisionCode.split('-');
            var getStateOnly = principalSubdivisionCode[1].toLowerCase();
            setCookie("geoLocationState", JSON.stringify(getStateOnly));
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
    ;
  }
});
function getLocation() {
  try {
    if (typeof navigator.permissions === "undefined") {
      //console.log(" getLocation undefined", navigator.geolocation)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, geoError);
      } else {
        console.log("Geolocation is not supported by this browser.");
        showPosition('notsupported');
      }
    } else {
      console.log(" navigator undefined");
      navigator.permissions.query({
        name: 'geolocation'
      }).then(function (result) {
        if (result.state == 'granted') {
          console.log(" navigator granted");
          navigator.geolocation.getCurrentPosition(showPosition, geoError);
        } else if (result.state == 'prompt') {
          console.log(" navigator prompt");
          navigator.geolocation.getCurrentPosition(showPosition, geoError);
          if ($('#mapAddressSecAonla').length || $('#mapAddressSecKalol').length || $('#mapAddressSecKandla').length || $('#mapAddressSecParadeep').length || $('#mapAddressSecPhulpur').length || $('#mapAddressContentUs').length) {
            console.log(" navigator mapAddressSecAonla");
            location.reload();
          }
        } else if (result.state == 'denied') {
          console.log(" navigator denied");
          showPosition('notsupported');
        }
      })["catch"](function (error) {
        console.log(error.message);
        showPosition('notsupported');
      });
    }
  } catch (e) {
    showPosition('notsupported');
  }
}
var geoError = function geoError(code, msg) {
  console.log("geoError", code, msg);
  showPosition('notsupported');
};
function showPosition(position) {
  try {
    lat = position === 'notsupported' ? currentLat : position.coords.latitude;
    longT = position === 'notsupported' ? currentLong : position.coords.longitude;
    console.log("==== showPosition ====", lat, longT);
    if ($('#map').length) {
      initMap();
    }
  } catch (e) {
    console.log(e);
  }
}
function initMap() {
  var mapOptions = {
    zoom: 6,
    center: {
      lat: lat,
      lng: longT
    }
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  setMarkers(map, whereToBuyMarkers);
  //console.log('latttttttttt', lat , longT)
}
function initMapPresence() {
  var mapOptions = {
    zoom: 5,
    center: {
      lat: lat,
      lng: longT
    }
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  setMarkers(map, whereToBuyMarkers);

  //console.log('our-presence Only')
}

// Map Marders /////////////////////////////////////////////////////

function setMarkers(map, whereToBuyMarkers) {
  var marker, i;
  for (i = 0; i < whereToBuyMarkers.length; i++) {
    var loan = whereToBuyMarkers[i][0];
    var lat = whereToBuyMarkers[i][1];
    var _long = whereToBuyMarkers[i][2];
    var add = whereToBuyMarkers[i][3];
    var address_type = whereToBuyMarkers[i][4];
    var mapPointIcon = "/assets/images/production-unit/corporate-offices.svg";
    if (address_type == "IFFCO BAZAAR CENTRE") {
      mapPointIcon = "/assets/images/production-unit/IFFCO-bazaar center.svg";
    } else if (address_type == "CORPORATE OFFICE") {
      mapPointIcon = "/assets/images/production-unit/corporate-offices.svg";
    } else if (address_type == "FARMERS SERVICE CENTRE") {
      mapPointIcon = "/assets/images/production-unit/service-center.svg";
    } else if (address_type == "MARKETING OFFICE") {
      mapPointIcon = "/assets/images/production-unit/marketing-offices.svg";
    } else if (address_type == "PRODUCTION UNIT") {
      mapPointIcon = "/assets/images/production-unit/production-unitt.svg";
    }
    var latlngset = new google.maps.LatLng(lat, _long);
    var marker = new google.maps.Marker({
      map: map,
      title: loan,
      position: latlngset,
      icon: mapPointIcon
    });
    //map.setCenter(marker.getPosition())
    //console.log('latlngset ----- ',lat, long,"marker",marker)
    var content = "<ul class='wherebuy-address-listbox'><h6>" + loan + "</h6><li><span class='icon-addleft locicon-wb'><img src='/assets/images/production-unit/address_pointer.png' alt='' class='scale mCS_img_loaded'></span>" + add + "</li></ul>";
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function (marker, content, infowindow) {
      return function () {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };
    }(marker, content, infowindow));
  }
}