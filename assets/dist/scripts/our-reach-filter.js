"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var productCenterDataReach = [];
var filterproductCenterData = [];
$(window).bind("load", function () {
  try {
    if ($('#reachAddrsList').length && $('#stateListReach').length) {
      $.get("/api/getApiContentType?type=our_reach", function (data, status) {
        if (status) {
          productCenterDataReach = data;
          $('#map').empty();
          productCenterDataReach.forEach(function (item) {
            whereToBuyMarkers.push([item.content.title, parseFloat(item.content.field_latitude), parseFloat(item.content.field_longitude), item.content.body, item.content.field_address_type]);
          });
          initMapPresence();
          setTimeout(function () {
            $('#nationalityFilter input').eq(0).trigger('click').change();
          }, 500);
          wtbEventReach();
          whereToBuyReachCont(productCenterDataReach, '#reachAddrsList');
          loadMore();
        } else {
          $('#reachAddrsList').html("");
        }
      });
    }
  } catch (e) {
    console.log(e);
  }

  ///////////////////////  Office types //////////////////
  try {
    if ($('#officeTypeReach').length) {
      $.get("/api/getApiKey?key=office-type", function (data, status) {
        if (status) {
          var resp = data[0].items;
          officeTypeReach(resp, "#officeTypeReach");
        } else {
          $('#officeTypeReach').html("");
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
  //////////////////////////

  ///////////////////////  State List //////////////////
  try {
    if ($('#stateListReach').length) {
      $.get("/api/getStateList?key=statemain", function (data, status) {
        if (status) {
          var resp = data[0].items;
          stateListReach(resp, '#stateListReach');
        } else {
          $('#stateListReach').html("");
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
  //////////////////////////
});
function checkReachData() {
  var selectedCheck = [];
  var inputVal = $('#addressSearch').val();
  $('#officeTypeReach input').each(function () {
    if ($(this).is(":checked")) {
      selectedCheck.push($(this).parent().data('ref'));
    }
  });
  var nationalityCheck = $('#nationalityFilter input:checked').val();
  var stateSelected = $('#stateListReach option:selected').text();
  whereTobuyFilterReach(selectedCheck, inputVal, nationalityCheck, stateSelected);
}
function checkSelct(item, obj) {
  item.forEach(function (key) {
    if (obj.content.field_address_type !== null && obj.content.field_address_type) {
      if (obj.content.field_address_type.includes(key)) {
        return obj;
      }
    }
  });
}
function whereTobuyFilterReach(checkSelct, val, nationality, state) {
  try {
    var filterData = productCenterDataReach;
    var itemList;
    checkSelct = checkSelct.filter(function (item) {
      return item !== "All";
    });
    if (nationality) {
      filterData.map(function (item) {
        var thisNationality = nationality.toLowerCase();
        itemList = filterData.filter(function (itemIn) {
          var datanationalism = item.content.field_nationalism;
          if (datanationalism !== null && datanationalism) {
            return itemIn.content.field_nationalism === thisNationality;
          }
        });
      });
    }
    if (state && state !== "Select State") {
      var stateFilterData = [];
      itemList.filter(function (filterData) {
        if (filterData.content.field_google_address_state[0] !== null && filterData.content.field_google_address_state[0]) {
          if (filterData.content.field_google_address_state.toString().toLowerCase().includes(state.toLowerCase())) {
            stateFilterData.push(filterData);
          }
        }
      });
      if (stateFilterData !== "undefined") {
        itemList = stateFilterData;
      }
    }
    if (checkSelct && checkSelct.length > 0) {
      var checkBoxFilterData = [];
      checkSelct.map(function (key) {
        key = key.toUpperCase();
        itemList.filter(function (filterData) {
          if (filterData.content.field_address_type !== null && filterData.content.field_address_type) {
            if (filterData.content.field_address_type.toString().includes(key)) {
              checkBoxFilterData.push(filterData);
            }
          }
        });
      });
      itemList = checkBoxFilterData;
    }
    if (checkSelct.length === 0 && val !== "" && val.length > 3) {
      var text = val.toLowerCase();
      itemList = filterData.filter(function (item) {
        if (item.field_location) {
          var field_location = item.field_location.toString().toLowerCase();
        }
        if (item.field_address_type.toString().toLowerCase().indexOf(text) >= 0 || item.content.field_google_address_state.toString().toLowerCase().indexOf(text) >= 0 || item.field_component_title.toLowerCase().indexOf(text) >= 0 || field_location.indexOf(text) >= 0) {
          return item;
        }
      });
    }
    if (checkSelct && checkSelct.length > 0 && val !== "" && val.length > 3) {
      var text = val.toLowerCase();
      var data = itemList;
      itemList = data.filter(function (item) {
        if (item.field_location) {
          var field_location = item.field_location.toString().toLowerCase().indexOf(text);
        }
        if (item.content.field_address_type.toString().toLowerCase().indexOf(text) >= 0 || item.content.field_google_address_state.toString().toLowerCase().indexOf(text) >= 0 || item.content.body.toLowerCase().indexOf(text) >= 0 || field_location >= 0) {
          return item;
        }
      });
    }
    if (checkSelct.length !== 0 && val !== "" && val.length < 3) {
      if (_typeof(itemList) === undefined) {
        itemList = filterData;
      }
    }
    if (typeof itemList === "undefined") {
      //itemList = filterData;
      itemList = [];
    }
    whereToBuyReachCont(itemList, '#reachAddrsList');
    //$('#map').empty();
    whereToBuyMarkers = [];
    itemList.forEach(function (item) {
      whereToBuyMarkers.push([item.field_component_title, parseFloat(item.content.field_latitude), parseFloat(item.content.field_longitude), item.field_address]);
    });
    //initMap();
  } catch (e) {
    console.log(e);
  }
}
function wtbEventReach() {
  $('#officeTypeReach label input').change(function () {
    checkReachData();
    loadMore();
  });
  $('#nationalityFilter input').change(function () {
    $('#addressSearch').val("");
    if ($(this).val().toLowerCase() == "international") {
      $('#stateListReach').find('option').eq(0).prop('selected', true);
      setTimeout(function () {
        $('#stateListReach').prop('disabled', true);
        $('.reach-check label input').prop('disabled', true);
      }, 300);
    } else {
      $('#stateListReach').find('option').eq(0).prop('selected', true);
      setTimeout(function () {
        $('#stateListReach').prop('disabled', false);
        $('.reach-check label input').prop('disabled', false);
      }, 300);
    }
    checkReachData();
    loadMore();
  });
  $('#stateListReach').change(function () {
    checkReachData();
    loadMore();
  });
  $('#addressSearch').keyup(function () {
    if ($(this).val().length > 2) {
      checkReachData();
      loadMore();
    }
  });
  $('#officeTypeReach label input').each(function () {
    $(this).prop('checked', true);
  });
  $('#checkAll').click(function () {
    $('#officeTypeReach input[type="checkbox"]').prop('checked', this.checked);
  });
}
function stateListReach(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render("\n            <option>Select State</option>\n            <% data && data.forEach(function(item) { %>\n              <option value=\"<%- item.name %>\"><%- item.name %></option>\n            <% }) %>\n          ", {
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
function officeTypeReach(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render("\n          <div class=\"col-md-4 mb-1 mb-md-0 iv-fadeInLeft pr-0\" data-time=\"500\">\n\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t<div class=\"col-12 mb-1 mb-md-3 pr-0\">\n\t\t\t\t\t\t\t\t\t<label data-ref=\"All\">\n                    <input id=\"checkAll\" type=\"checkbox\" value=\"all\"/>\n                    <span class=\"checkbox-r\"></span>\n                    <span class=\"text\">All</span>\n\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n            <% data && data.forEach(function(item) { %>\n              <div class=\"col-md-4 mb-1 mb-md-0 iv-fadeInLeft pr-0\" data-time=\"500\">\n                <div class=\"row\">\n                  <div class=\"col-12\">\n                    <label data-ref=\"<%- item.name %>\">\n                      <input type=\"checkbox\" /><span class=\"checkbox-r\"></span>\n                      <span class=\"text\"><%- item.name %></span>\n                    </label>\n                  </div>\n                </div>\n\t\t\t\t\t\t  </div>\n            <% }) %>\n          ", {
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
function whereToBuyReachCont(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render("\n            <% data && data.forEach(function(item) { %>\n              <div class=\"col-12 col-lg-6 mb-5 addhide iv-fadeIn\" data-time=\"100\">\n                <ul class=\"contact-greenbox\">\n                  <% item.content.field_google_address_state.forEach(function(stateItem){ %>\n                    <li><%- stateItem %></li>\n                  <% }) %>\n                </ul>\n                <ul class=\"contact-detail\">\n                  <li class=\"addrs\">\n                    <h2><%- item.content.body %></h2>\n                  </li>\n                  <% if(item.content.field_nationalism === \"national\"){ %>\n                    <li class=\"getdirection\"><a href=\"https://www.google.com/maps/dir/?api=1&amp;origin=".concat(lat, ",").concat(longT, "&amp;destination=<%- item.content.field_latitude %>,<%- item.content.field_longitude %>\" target=\"_blank\"><span>Get Direction</span></a></li>\n                  <% } %>\n                  </ul>\n              </div>\n            <% }) %>\n            <div class=\"col-12 text-center\"><a href=\"javascript:;\" id=\"loadmore-add\"\n              class=\"btn btn-primary rounded-0\">Load More</a>\n            </div>\n          "), {
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
function loadMore() {
  $(".addhide").hide();
  $(".addhide").slice(0, 4).show();
  if ($(".addhide").length < 5) {
    $("#loadmore-add").fadeOut('fast');
  } else {
    $("#loadmore-add").fadeIn('slow');
  }
  $("#loadmore-add").on('click', function (e) {
    e.preventDefault();
    $(".addhide:hidden").slice(0, 4).slideDown();
    if ($(".addhide:hidden").length == 0) {
      $("#loadmore-add").fadeOut('slow');
    }
  });
}