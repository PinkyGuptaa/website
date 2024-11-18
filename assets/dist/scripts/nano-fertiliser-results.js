"use strict";

var dataType = '';
var tabIndex = 0;
var count = 0;
$(window).bind("load", function () {});
$(function () {
  try {
    $('#nanoAllTabs a').on('click', function () {
      tabIndex = $(this).index();
      if ($(this).find('h2').text().indexOf('DAP') > -1) {
        dataType = 'dap';
      } else {
        dataType = 'urea';
      }
      filteredNanoFertiData("type=".concat(dataType, "&states=&city=&corp_season=&corp=&page_no=").concat(count), $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.table-bordered'));
      stateAPIcallFunc();
      corpSeasonData();
      corpData();
      count = 0;
      $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.paginationNFR .prev').attr('disabled', 'disabled');
    }).eq(0).click();
  } catch (e) {
    console.log(e);
  }
});
function stateAPIcallFunc() {
  try {
    if ($('#nanoFertiliserContent').length && $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).length) {
      $.get("/api/filterStateList", function (data, status) {
        if (status) {
          var resp = data;
          var content = resp === null || resp === void 0 ? void 0 : resp.data;
          filterStateOptions(content, '.stateDropdownData select');
          stateSelectFunc();
          $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('select').change(function () {
            if ($(this).val() !== '') {
              $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.clearFilters').show();
            } else {
              $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.clearFilters').hide();
            }
          });
          $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.clearFilters').click(function () {
            $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('select').val('');
            $(this).hide();
          });
        } else {
          $('.stateDropdownData select').html("");
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function stateSelectFunc() {
  $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.stateDropdownData select').on('change', function () {
    var activeTab = $("#nanoFertiliserContent #nano-urea".concat(tabIndex));
    var selectedCityVal = activeTab.find('.distDropdownData select').val() || '';
    var selectedCorpSeasorVal = activeTab.find('.seasonDropdownData select').val() || '';
    var selectedCorpVal = activeTab.find('.cropDropdownData select').val() || '';
    districtDatacall($(this).val(), $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.distDropdownData select'));
    filteredNanoFertiData("type=".concat(dataType, "&states=").concat($(this).val(), "&city=").concat(selectedCityVal, "&corp_season=").concat(selectedCorpSeasorVal, "&corp=").concat(selectedCorpVal, "&page_no=").concat(count), $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.table-bordered'));
    count = 0;
    $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.paginationNFR .prev').attr('disabled', 'disabled');
  });
}
function districtDatacall(stateSelected, selector) {
  try {
    $.get("/api/filterDistrictList?states=".concat(stateSelected), function (data, status) {
      if (status) {
        var resp = data;
        var content = resp === null || resp === void 0 ? void 0 : resp.data;
        filterDistOptions(content, selector);
        distSelectFunc(stateSelected);
      } else {
        $('.distDropdownData select').html("");
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function corpSeasonData() {
  try {
    $.get("/api/corpSeasonData", function (data, status) {
      if (status) {
        var resp = data;
        var content = resp === null || resp === void 0 ? void 0 : resp.data;
        corpSeasonOptions(content, $("#nanoFertiliserContent #nano-urea".concat(tabIndex, " .seasonDropdownData select")));
        corpSeasonSelectFunc();
      } else {
        $('#nanoFertiliserContent .tab-pane.active .seasonDropdownData select').html("");
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function corpSeasonSelectFunc() {
  var activeTab = $("#nanoFertiliserContent #nano-urea".concat(tabIndex));
  activeTab.find('.seasonDropdownData select').on('change', function () {
    var selectedStateVal = activeTab.find('.stateDropdownData select').val() || '';
    var selectedCityVal = activeTab.find('.distDropdownData select').val() || '';
    var selectedCorpVal = activeTab.find('.cropDropdownData select').val() || '';
    // State, city, corp_season, selector
    filteredNanoFertiData("type=".concat(dataType, "&states=").concat(selectedStateVal, "&city=").concat(selectedCityVal, "&corp_season=").concat($(this).val(), "&corp=").concat(selectedCorpVal, "&page_no=").concat(count), $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.table-bordered'));
    count = 0;
    $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.paginationNFR .prev').attr('disabled', 'disabled');
  });
}
function corpData() {
  try {
    $.get("/api/corpData", function (data, status) {
      if (status) {
        var resp = data;
        var content = resp === null || resp === void 0 ? void 0 : resp.data;
        corpOptions(content, $("#nanoFertiliserContent #nano-urea".concat(tabIndex, " .cropDropdownData select")));
        corpSelectFunc();
      } else {
        $('#nanoFertiliserContent .tab-pane.active .cropDropdownData select').html("");
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function corpSelectFunc() {
  var activeTab = $("#nanoFertiliserContent #nano-urea".concat(tabIndex));
  activeTab.find('.cropDropdownData select').on('change', function () {
    var selectedStateVal = activeTab.find('.stateDropdownData select').val() || '';
    var selectedCityVal = activeTab.find('.distDropdownData select').val() || '';
    var selectedCorpSeasorVal = activeTab.find('.seasonDropdownData select').val() || '';
    // State, city, corp_season, selector
    filteredNanoFertiData("type=".concat(dataType, "&states=").concat(selectedStateVal, "&city=").concat(selectedCityVal, "&corp_season=").concat(selectedCorpSeasorVal, "&corp=").concat($(this).val(), "&page_no=").concat(count), $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.table-bordered'));
    count = 0;
    $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.paginationNFR .prev').attr('disabled', 'disabled');
  });
}
function distSelectFunc(stateSelected) {
  $('#nanoFertiliserContent .tab-pane.active').find('.distDropdownData select').on('change', function () {
    // State, city, selector
    filteredNanoFertiData("type=".concat(dataType, "&states=").concat(stateSelected, "&city=").concat($(this).val(), "&corp_season=&corp=&page_no=").concat(count), $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.table-bordered'));
    count = 0;
    $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.paginationNFR .prev').attr('disabled', 'disabled');
  });
}
function corpOptions(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render(" <option value=\"\">Select Crop</option>\n              <% data && data.forEach(function(item) { %>\n                <option value=\"<%- item.corp %>\"><%- item.corp %></option>\n              <% }) %>\n            ", {
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
function corpSeasonOptions(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render(" <option value=\"\">Select Crop Season</option>\n              <% data && data.forEach(function(item) { %>\n                <option value=\"<%- item.corp_season %>\"><%- item.corp_season %></option>\n              <% }) %>\n            ", {
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
function filterDistOptions(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render(" <option value=\"\">Select District</option>\n              <% data && data.forEach(function(item) { %>\n                <option value=\"<%- item.district %>\"><%- item.district %></option>\n              <% }) %>\n            ", {
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
function filterStateOptions(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render(" <option value=\"\">Select State</option>\n              <% data && data.forEach(function(item) { %>\n                <option value=\"<%- item.state %>\"><%- item.state %></option>\n              <% }) %>\n            ", {
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
//states=${selectedState}&city=${dist}&corp_season=${corp_season}
function filteredNanoFertiData(params, id) {
  try {
    $.get("/api/filteredNanoFertiData?".concat(params), function (data, status) {
      if (status) {
        var resp = data;
        var totalFoundRecord = data.totalFoundRecord / 50;
        var content = resp === null || resp === void 0 ? void 0 : resp.data;
        createFilterTable(content, id);
        paginationNFRFunc(totalFoundRecord);
      } else {
        $('.distDropdownData select').html("");
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createFilterTable(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      html += ejs.render("\n            <thead>\n                <tr>\n                    <th colspan=\"1\" rowspan=\"2\" scope=\"col\">District</th>\n                    <th colspan=\"1\" rowspan=\"2\" scope=\"col\">Village</th>\n                    <th colspan=\"1\" rowspan=\"2\" scope=\"col\">Farmer's Name</th>\n                    <th colspan=\"1\" rowspan=\"2\" scope=\"col\">Season</th>\n                    <th colspan=\"1\" rowspan=\"2\" scope=\"col\">Crop</th>\n                    <th colspan=\"1\" rowspan=\"2\" scope=\"col\">Crop Variety</th>\n                    <th colspan=\"2\" rowspan=\"1\" scope=\"col\">Grain/ Fruit/ Vegetable Yield (QT./HA)</th>\n                    <th colspan=\"1\" rowspan=\"2\" scope=\"col\">% Increase over Farmer Plot (T1)</th>\n                </tr>\n                <tr>\n                    <th scope=\"col\">Farmer Plot(T1)</th>\n                    <th scope=\"col\">Nano Demonstration Plot (T2)</th>\n                </tr>\n            </thead>\n            <tbody>\n              <% data && data.forEach(function(item) { %>\n                <tr>\n                    <td><%- item.district %></td>\n                    <td><%- item.village %></td>\n                    <td><%- item.fathers_name %></td>\n                    <td><%- item.corp_season %></td>\n                    <td><%- item.corp %></td>\n                    <td><%- item.corp_varity %></td>\n                    <td><%- item.farmer_plot_1 %></td>\n                    <td><%- item.farmer_plot_2 %></td>\n                    <td><%- item.increased_over_farmer_plot_1 %></td>\n                </tr>\n              <% }) %>\n            </tbody>\n            ", {
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
function paginationNFRFunc(totalFoundRecord) {
  var totalPageRec = parseInt(totalFoundRecord);
  var activeTab = $("#nanoFertiliserContent #nano-urea".concat(tabIndex));
  var selectedStateVal = activeTab.find('.stateDropdownData select').val() || '';
  var selectedCityVal = activeTab.find('.distDropdownData select').val() || '';
  var selectedCorpSeasorVal = activeTab.find('.seasonDropdownData select').val() || '';
  var selectedCorpVal = activeTab.find('.cropDropdownData select').val() || '';
  var next = activeTab.find('.paginationNFR .next');
  var prev = activeTab.find('.paginationNFR .prev');
  if (Number(totalPageRec) === 0) {
    prev.attr('disabled', 'disabled');
    next.attr('disabled', 'disabled');
  } else if (Number(totalPageRec) < 0) {
    next.attr('disabled', 'disabled');
  } else {
    next.removeAttr('disabled');
    next.unbind('click').bind('click', function (e) {
      count++;
      prev.removeAttr('disabled');
      if (count === totalPageRec) {
        next.attr('disabled', 'disabled');
        return;
      }
      console.log('totalFoundRecord', totalPageRec, '==', count, count === totalPageRec);
      filteredNanoFertiData("type=".concat(dataType, "&states=").concat(selectedStateVal, "&city=").concat(selectedCityVal, "&corp_season=").concat(selectedCorpSeasorVal, "&corp=").concat(selectedCorpVal, "&page_no=").concat(count), $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.table-bordered'));
    });
    prev.unbind('click').bind('click', function (e) {
      count--;
      if (count === 0) {
        prev.attr('disabled', 'disabled');
      }
      console.log('totalFoundRecord', totalPageRec, '==', count);
      filteredNanoFertiData("type=".concat(dataType, "&states=").concat(selectedStateVal, "&city=").concat(selectedCityVal, "&corp_season=").concat(selectedCorpSeasorVal, "&corp=").concat(selectedCorpVal, "&page_no=").concat(count), $("#nanoFertiliserContent #nano-urea".concat(tabIndex)).find('.table-bordered'));
    });
  }
}