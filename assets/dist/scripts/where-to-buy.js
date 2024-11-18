"use strict";

var productCenterData = [];
var filterproductCenterData = [];
var lat;
var longT;
$(window).bind("load", function () {
  try {
    if ($('#section2').length || $('#whereTobuyFind').length) {
      var stateText = $('#selectedText').text() || "Gujarat";
      $('#addressSearch').val(stateText);
      $.get("/api/getApiContentType?type=stores", function (data, status) {
        try {
          if (status) {
            productCenterData = data;
            $('#map').empty();
            lat = parseFloat(productCenterData[0].content.field_latitude);
            longT = parseFloat(productCenterData[0].content.field_longitude);
            productCenterData.forEach(function (item) {
              whereToBuyMarkers.push([item.content.title, parseFloat(item.content.field_latitude), parseFloat(item.content.field_longitude), item.content.body]);
            });
            initMap();
            whereToBuyCont(productCenterData, '#whereToBuyCont');
            wtbEvent();
            checkData();
            $('#whereToBuyCont').mCustomScrollbar('destroy');
            $(".wherebuy-mapaddres-box").mCustomScrollbar({
              theme: "inset-dark"
            });
          } else {
            $('#whereToBuyCont').html("");
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }

  ///////////////////////  Office types //////////////////
  try {
    if ($('#officeType').length || $('#whereTobuyFind').length) {
      $.get("/api/getApiKey?key=homepage-where-to-buy", function (data, status) {
        try {
          if (status) {
            var resp = data[0].items;
            officeType(resp, "#officeType");
          } else {}
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
  //////////////////////////
});
function checkData() {
  var selectedCheck = [];
  var inputVal = $('#addressSearch').val() || "Gujarat";
  $('.wherebuy-chkbox-wrap input').each(function () {
    if ($(this).is(":checked")) {
      selectedCheck.push($(this).parent().data('ref'));
    }
  });
  whereTobuyFilter(selectedCheck, inputVal);
}
function checkSelect(item, obj) {
  item.forEach(function (key) {
    if (obj.field_address_type !== null && obj.field_address_type) {
      if (obj.field_address_type.includes(key)) {
        return obj;
      }
    }
  });
}
function whereTobuyFilter(checkSelct, val) {
  try {
    var filterData = productCenterData;
    var itemList = [];
    var typeFiler = [];
    if (checkSelct && checkSelct.length > 0) {
      filterData.map(function (item) {
        if (item && item.content && item.content.field_address_type && item.content.field_address_type.some(function (type) {
          return checkSelct.includes(type);
        })) {
          typeFiler.push(item);
        }
      });
    }
    if (val && val !== "" && val.length > 3) {
      typeFiler.map(function (item) {
        if (item && item.content && item.content.body && item.content.body.toLowerCase().indexOf(val.toLowerCase()) >= 0 || item && item.content && item.content.field_location && item.content.field_location.toLowerCase().indexOf(val.toLowerCase()) >= 0 || item && item.content && item.content.field_google_address_state && item.content.field_google_address_state.toString().toLowerCase().indexOf(val.toLocaleString()) >= 0) {
          itemList.push(item);
        }
      });
    }
    if (itemList && itemList.length > 0) {
      //itemList = filterData;
      lat = parseFloat(itemList[0].content.field_latitude);
      longT = parseFloat(itemList[0].content.field_longitude);
      whereToBuyCont(itemList, '#whereToBuyCont');
      $('#map').empty();
      whereToBuyMarkers = [];
      //console.log('itemList ', itemList)
      itemList.forEach(function (item) {
        //console.log('aj ', parseFloat(item.content.field_latitude), parseFloat(item.content.field_longitude))
        whereToBuyMarkers.push([item.content.title, parseFloat(item.content.field_latitude), parseFloat(item.content.field_longitude), item.content.body]);
      });
      console.log('whereToBuyMarkers ', whereToBuyMarkers);
      initMap();
    } else {
      $('#map').empty();
      whereToBuyCont([], '#whereToBuyCont');
    }
  } catch (e) {
    console.log(e);
  }
}
function wtbEvent() {
  $('.wherebuy-chkbox-wrap label input').change(function () {
    $('#whereToBuyCont').mCustomScrollbar('destroy');
    checkData();
    if ($('#whereToBuyCont ul').length > 2) {
      $(".wherebuy-mapaddres-box").mCustomScrollbar({
        theme: "inset-dark"
      });
    }
  });
  $('#addressSearch').keyup(function () {
    var _thisval = $(this).val();
    setTimeout(function () {
      if (_thisval.length > 2) {
        $('#whereToBuyCont').mCustomScrollbar('destroy');
        checkData();
        if ($('#whereToBuyCont ul').length > 2) {
          $(".wherebuy-mapaddres-box").mCustomScrollbar({
            theme: "inset-dark"
          });
        }
      } else {
        $('#whereToBuyCont').mCustomScrollbar('destroy');
        whereToBuyCont(productCenterData, '#whereToBuyCont');
        if ($('#whereToBuyCont ul').length > 2) {
          $(".wherebuy-mapaddres-box").mCustomScrollbar({
            theme: "inset-dark"
          });
        }
      }
    }, 300);
  });
}
function officeType(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render("\n            <% data && data.forEach(function(item) { %>\n              <div class=\"col-xl-6 col-sm-6\">\n                <label data-ref=\"<%- item.name %>\">\n                  <input type=\"checkbox\" checked/>\n                  <span class=\"checkbox-r\"></span>\n                  <span class=\"text\"><%- item.name %></span>\n                </label>\n              </div>\n            <% }) %>\n          ", {
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
function whereToBuyCont(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render("\n            <% data && data.forEach(function(item) { %>\n              <ul class=\"wherebuy-address-listbox\">\n                <h6><%- item.content.title %></h6>\n                <li>\n                  <span class=\"icon-addleft locicon-wb\"><img src=\"/assets/images/production-unit/address_pointer.png\" alt=\"\" class=\"scale\"></span>\n                  <%- item.content.body %>\n                </li>\n                <li class=\"sublist-wb\">\n                  <ul>\n                    <li>\n                      <span class=\"icon-addleft timeicon-wb\"><img src=\"/assets/images/production-unit/timeicon.png\" alt=\"\" class=\"scale\"></span>\n                      <% if(item.content.field_time_duration){ %>\n                        <%- item.content.field_time_duration %>\n                      <% } %>\n                    </li>\n                    <li>\n                      <span class=\"icon-addleft diricon-wb\"><img src=\"/assets/images/production-unit/direction_icon.png\" alt=\"\" class=\"scale\"></span>\n                      <a href=\"https://www.google.com/maps/dir/?api=1&amp;origin=".concat(lat, ",").concat(longT, "&amp;destination=<%- item.content.field_latitude %>,<%- item.content.field_longitude %>\" target=\"_blank\">Get Direction</a>\n                    </li>\n                  </ul>\n                </li>\n              </ul>\n            <% }) %>\n          "), {
        data: resp
      });
      $(id).html(html);
      $(id).addClass('wherebuy-mapaddres-box');
    } else {
      $(id).html('<p class="noData">No record found</p>');
      $(id).removeClass('wherebuy-mapaddres-box');
      $(id).mCustomScrollbar('destroy');
    }
  } catch (e) {
    console.log(e);
  }
}