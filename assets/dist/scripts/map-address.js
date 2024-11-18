"use strict";

var mapLat, mapLong;
var grievances;
$(window).bind("load", function () {
  try {
    if ($('#mapAddressSecAonla').length) {
      $.get("/api/mapStatic?url=/production-unit-aonla-map", function (data, status) {
        if (status) {
          var mapAddressData = data.content && data.content.field_component && data.content.field_component !== "" ? data.content.field_component : [];
          mapApiContent(mapAddressData, '#mapAddressSecAonla');
        } else {
          $('#mapAddressSecAonla').html("");
        }
      });
    }
    ;
    if ($('#mapAddressSecKalol').length) {
      $.get("/api/mapStatic?url=/production-unit-kalol-gujarat-map", function (data, status) {
        if (status) {
          var mapAddressData = data.content && data.content.field_component && data.content.field_component !== "" ? data.content.field_component : [];
          mapApiContent(mapAddressData, '#mapAddressSecKalol');
        } else {
          $('#mapAddressSecKalol').html("");
        }
      });
    }
    ;
    if ($('#mapAddressSecKandla').length) {
      $.get("/api/mapStatic?url=/production-unit-kandla-gujrat-map", function (data, status) {
        if (status) {
          var mapAddressData = data.content && data.content.field_component && data.content.field_component !== "" ? data.content.field_component : [];
          mapApiContent(mapAddressData, '#mapAddressSecKandla');
        } else {
          $('#mapAddressSecKandla').html("");
        }
      });
    }
    ;
    if ($('#mapAddressSecParadeep').length) {
      $.get("/api/mapStatic?url=/production-unit-paradeep-map", function (data, status) {
        if (status) {
          var mapAddressData = data.content && data.content.field_component && data.content.field_component !== "" ? data.content.field_component : [];
          mapApiContent(mapAddressData, '#mapAddressSecParadeep');
        } else {
          $('#mapAddressSecParadeep').html("");
        }
      });
    }
    ;
    if ($('#mapAddressSecPhulpur').length) {
      $.get("/api/mapStatic?url=/production-unit-phulpur-map", function (data, status) {
        if (status) {
          var mapAddressData = data.content && data.content.field_component && data.content.field_component !== "" ? data.content.field_component : [];
          mapApiContent(mapAddressData, '#mapAddressSecPhulpur');
        } else {
          $('#mapAddressSecPhulpur').html("");
        }
      });
    }
    ;
    if ($('#mapAddressContentUs').length) {
      $.get("/api/mapStatic?url=/contact-us-map", function (data, status) {
        if (status) {
          var mapAddressData = data.content && data.content.field_component && data.content.field_component !== "" ? data.content.field_component : [];
          mapApiContent(mapAddressData, '#mapAddressContentUs');
        } else {
          $('#mapAddressContentUs').html("");
        }
      });
    }
    ;
  } catch (e) {
    console.log(e);
  }
});
function mapApiContent(data, id) {
  try {
    $('#innermap').empty();
    if (data && data.length > 0) {
      data.forEach(function (item) {
        if (item.content) {
          whereToBuyMarkers.push([item.content.field_address_type[0], parseFloat(item.content.field_latitude), parseFloat(item.content.field_longitude), item.content.field_address]);
        } else {
          whereToBuyMarkers.push([item.field_address_type[0], parseFloat(item.field_latitude), parseFloat(item.field_longitude), item.field_address]);
        }
      });
      if (data.length > 1) {
        mapLat = parseFloat(data[0].content.field_latitude);
        mapLong = parseFloat(data[0].content.field_longitude);
      } else {
        mapLat = parseFloat(data[0].field_latitude);
        mapLong = parseFloat(data[0].field_longitude);
      }
      initMapStatic();
      var mapData = data;
      $.get("/api/getPageLabel?url=/press-release-label", function (data, status) {
        try {
          if (status) {
            var resp = data;
            Object.keys(resp.data).forEach(function (key) {
              // console.log(key);        // the name of the current key.
              // console.log(resp.labels[key]); // the value of the current key.
              if (key === 'grievances') {
                grievances = resp.data[key];
                mapAddress(mapData, id);
              }
              ;
              if (key === 'read_more') {
                readMore = resp.data[key];
              }
            });
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function mapAddress(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render("\n            <% data && data.forEach(function(item) { %>\n              <ul class=\"contact-greenbox\">\n                  <% if(item.field_address_type) { %>\n                      <li><%- item.field_address_type[0] %></li>\n                  <% } %>\n                  <% if(item.field_location){ %>\n                      <li><%- item.field_location %></li>\n                  <% } %>\n              </ul>\n              <ul class=\"contactDtl\">\n                  <% if(item.field_address) { %>\n                      <li class=\"addrs\"><h2><%- item.field_address %></h2></li>\n                  <% } %>\n                  <% if(item.field_phone_numbers) { %>\n                      <li class=\"telephones\">\n                          <%- item.field_phone_numbers %>\n                      </li>\n                  <% } %>\n                  \n                  <% if(item.field_short_name) { %>\n                    <li class=\"pipalia\"><%- item.field_short_name[0] %></li>\n                  <% } %>\n\n                  <li class=\"getdirection\"><a id=\"getDirection\" href=\"https://www.google.com/maps/dir/?api=1&amp;origin=".concat(lat, ",").concat(longT, "&amp;destination=<%- item.field_latitude %>,<%- item.field_longitude %>\" target=\"_blank\"><span><%- item.field_title %></span></a></li>\n                  <li><p><%- grievances %></p> </li>\n              </ul>\n            <% }) %>\n          "), {
        data: resp
      });
      $(id).html(html);
    } else {
      $(id).html('<p class="noData">No record found</p>');
    }
  } catch (e) {
    console.log(e);
  }
}
function initMapStatic() {
  var mapOptions = {
    zoom: 6,
    center: {
      lat: mapLat,
      lng: mapLong
    }
  };
  map = new google.maps.Map(document.getElementById('innermap'), mapOptions);
  setMarkers(map, whereToBuyMarkers);
  console.log("----initMapStatic----");
}