"use strict";

// Get the input field
var headerSearchInput = document.getElementById("search");

// Execute a function when the user releases a key on the keyboard
headerSearchInput.addEventListener("keypress", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.which == 13 || event.keyCode == 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    searchResult();
  }
});
function searchResult() {
  try {
    window.location.href = '/search?q=' + headerSearchInput.value;
  } catch (e) {
    console.log(e);
  }
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
$(function () {
  try {
    $('#deviceSearchBtn').on('click', function () {
      window.location.href = '/search?q=' + $('#searchDevice').val(), true;
      return false;
    });
  } catch (e) {
    console.log(e);
  }
  try {
    $('.microphone-button').click(function () {
      console.log('How come this function got called ? ');
    });

    // not-for-profit-initiatives
    if ($('.ikst-wrap').length) {
      $('.ikst-wrap').eq(0).addClass('colorWhiteContent');
    }
    //////////
  } catch (e) {
    console.log(e);
  }

  ///
  if (window.location.href.indexOf('/not-for-profit-initiatives') >= 0) {
    var topMenu = jQuery("#submenu-list-npi"),
      offset = 30,
      topMenuHeight = topMenu.outerHeight() + offset,
      // All list items
      menuItems = topMenu.find('a[href*="#"]'),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function () {
        var href = jQuery(this).attr("href"),
          id = href.substring(href.indexOf('#')),
          item = jQuery(id);
        //console.log(item)
        if (item.length) {
          return item;
        }
      });

    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
      var href = jQuery(this).attr("href"),
        id = href.substring(href.indexOf('#')),
        offsetTop = href === "#" ? 0 : jQuery(id).offset().top - topMenuHeight - 30;
      jQuery('html, body').stop().animate({
        scrollTop: offsetTop
      }, 800);
      e.preventDefault();
    });

    // Bind to scroll
    jQuery(window).scroll(function () {
      // Get container scroll position
      var fromTop = jQuery(this).scrollTop() + topMenuHeight;

      // Get id of current scroll item
      var cur = scrollItems.map(function () {
        if (jQuery(this).offset().top - 300 < fromTop) return this;
      });

      // Get the id of the current element
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";
      menuItems.parent().removeClass("active-link");
      if (id) {
        menuItems.parent().end().filter("[href*='#" + id + "']").parent().addClass("active-link");
      }
    });
    $(window).scroll(sticky_relocate);
    sticky_relocate();
  }
  ///////////////////////////////

  // product-category-description Page
  if ($("#productimg-stick").length && $("#prod-tech-spec").length) {
    $("#productimg-stick").stickOnScroll({
      topOffset: 240,
      footerElement: $("#prod-tech-spec"),
      bottomOffset: 20,
      setParentOnStick: true,
      setWidthOnStick: true
    });
  }
  //////////////////

  // Product-description-fertilisers
  if ($("#productimg-stick").length && $("#benefit-fertilisers").length) {
    $("#productimg-stick").stickOnScroll({
      topOffset: 240,
      footerElement: $("#benefit-fertilisers"),
      bottomOffset: 10,
      setParentOnStick: true,
      setWidthOnStick: true
    });
  }
  ;
  /////////////
  $('ul.bioicon-detail li:nth-child(1)').addClass('ferti-bulletitems1');
  $('ul.bioicon-detail li:nth-child(2)').addClass('ferti-bulletitems2').removeClass('ferti-bulletitems1 ferti-bulletitems3');
  $('ul.bioicon-detail li:nth-child(3)').addClass('ferti-bulletitems3').removeClass('ferti-bulletitems1 ferti-bulletitems2');
  $(".bf-benefit-icon1").hover(function () {
    $('.ferti-bulletitems1').addClass('opaup');
    $('.ferti-bulletitems2, .ferti-bulletitems3').addClass('opadown');
  }, function () {
    $('.ferti-bulletitems1').removeClass('opaup');
    $('.ferti-bulletitems2, .ferti-bulletitems3').removeClass('opadown');
  });
  $(".bf-benefit-icon2").hover(function () {
    $('.ferti-bulletitems2').addClass('opaup');
    $('.ferti-bulletitems1, .ferti-bulletitems3').addClass('opadown');
  }, function () {
    $('.ferti-bulletitems2').removeClass('opaup');
    $('.ferti-bulletitems1, .ferti-bulletitems3').removeClass('opadown');
  });
  $(".bf-benefit-icon3").hover(function () {
    $('.ferti-bulletitems3').addClass('opaup');
    $('.ferti-bulletitems2, .ferti-bulletitems1').addClass('opadown');
  }, function () {
    $('.ferti-bulletitems3').removeClass('opaup');
    $('.ferti-bulletitems2, .ferti-bulletitems1').removeClass('opadown');
  });
});
//not-for-profit-initiatives
function sticky_relocate() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#footer").offset().top - 300;
  var div_top = $('#mainMenuBarAnchor').offset().top - 75;
  var div_height = $("#mainMenuBar").height();
  var padding = 40;
  if (window_top + div_height > footer_top - padding) $('#mainMenuBar').css({
    top: (window_top + div_height - footer_top + padding) * -1
  });else if (window_top > div_top) {
    $('#mainMenuBar').addClass('stick-npi');
    $('#mainMenuBar').css({
      top: 75
    });
  } else {
    $('#mainMenuBar').removeClass('stick-npi');
  }
}
/////////////////

$(document).on('change', '#awardYearList select', function () {
  try {
    var selectedYear = $(this).find('option:selected').text();
    if ($('#Container-filter').length > 0) {
      $('#Container-filter').mixItUp('destroy');
    }
    $('#Container-filter').empty();
    buttonFilter.reset();
    if (selectedYear === "Year") {
      getAwardyear();
    } else {
      getAwardyear(selectedYear);
    }
  } catch (e) {
    console.log(e);
  }
});
$(window).bind("load", function () {
  try {
    getAwardyear();
    //$('#Container-filter').parent().append("<p class='noRecord'>No data found</p>");
  } catch (e) {
    console.log(e);
  }

  // try{
  //     $.get("/api/webCounter", function(data, status){
  //         try {
  //             if(status){
  //                 let resp = data;
  //                 //console.log('webcounter ', resp);
  //                 $('.webCounts').text(resp.counter);
  //                 //categoriesList(resp, '#awardcategoriesList');
  //             }else{
  //                 $('.webCounts').text("");
  //             }
  //         }
  //         catch(e) {
  //             console.log(e);
  //         }

  //     });

  // }catch (e) {
  //     console.log(e)
  // }

  if (window.location.href.indexOf('/awards-accolades') >= 0) {
    try {
      $.get("/api/navigation?key=categories", function (data, status) {
        try {
          if (status) {
            var resp = data;
            categoriesList(resp, '#awardcategoriesList');
          } else {
            $('#awardcategoriesList').html("");
          }
        } catch (e) {
          console.log(e);
        }
      });
      $.get("/api/navigation?key=years", function (data, status) {
        try {
          if (status) {
            var resp = data;
            yearList(resp, '#awardYearList');
            //getAwardyear(data[0].items[0].name);
          } else {
            $('#awardYearList').html("");
            $('#Container-filter').parent().append("<p class='noRecord'>No data found</p>");
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
});
function getAwardyear(year) {
  try {
    var api = typeof year === "undefined" || year === "" ? "/api/awards-accolades" : "/api/awards-accolades?year=" + year;
    console.log('api ', api);
    $.get(api, function (data, status) {
      try {
        if (status) {
          var resp = data;
          generateCard(resp, '#Container-filter');
          if ($('#Container-filter').length > 0) {
            mixup('#Container-filter');
            buttonFilter.parseFilters();
          }
        } else {
          $('#Container-filter').html("");
          $('#Container-filter').parent().append("<p class='noRecord'>No data found</p>");
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function categoriesList(data, id) {
  var html = "";
  var resp = data;
  resp.forEach(function (obj, index) {
    html += ejs.render("<% data.items.forEach(function(item) { %>\n               <button class=\"filter btn-otherimg\" data-filter=\".<%- item.name %>\">\n                <img src=\"<%- item.image.url %>\" class=\"scale icon-filterawwards\" alt=\"<%- item.image.alt %>\"><%- item.name %>\n              </button> <% }) %>", {
      data: resp[index]
    });
  });
  $(id).html(html);
}
function yearList(data, id) {
  try {
    var html = "";
    var resp = data;
    resp.forEach(function (obj, index) {
      html += ejs.render("<div class=\"filter-select\">\n                        <span>Filter by</span>\n                        <div class=\"chosen-wrapper awards-new-select choosen-language chosen-wrapper--style2\" data-js=\"custom-scroll\">\n                            <select class=\"chosen-select\" data-placeholder=\"Year\">\n                                <option value=\"\">Year</option>\n                                <% data.items.forEach(function(item) { %>\n                                    <option value=\".<%- item.name %>\"><%- item.name %></option>\n                                <% }) %>\n                            </select>\n                        </div>\n                    </div>", {
        data: resp[index]
      });
    });
    $(id).html(html);
  } catch (e) {
    console.log(e);
  }
}
function generateCard(data, id) {
  var html = "";
  var resp = data;
  if (resp.length > 0) {
    resp.forEach(function (obj, index) {
      html += ejs.render("<div class=\"col-xl-4 col-lg-6 col-md-6 pt-4 pb-4 mix <%- data.field_award_category %> <%- data.field_award_years %>\" style=\"display: inline-block;\" data-bound=\"\">\n                        <div class=\"card\">\n                            <div class=\"prodimg\">\n                                <img class=\"card-img-top\" src=\"<%- data.field_image && data.field_image %>\" alt=\"Card image cap\">\n                                <div class=\"prod-name\">Year <%- data.field_award_years %></div>\n                            </div>\n                            <div class=\"card-body\">\n                                <h5 class=\"card-title\"><%- data.title %></h5>\n                                <% if(data.field_unique_url){ %>\n                                    <a href=\"<%- data.field_unique_url %>\" class=\"btn btn-outline-primary rounded-0 pl-4 pr-4\"><span>View Gallery</span></a>\n                                <% } %>\n                            </div>\n                        </div>\n                    </div>", {
        data: resp[index]
      });
    });
    $(id).html(html);
  }
}

// Leadership Popup func
function showLeaders(componentIndex, tabsIndex, itemIndex) {
  var leadersData = leadersRes[componentIndex].tabs_component.field_tab_components[tabsIndex].tab_item.field_tab_items[itemIndex];
  console.log(leadersData);
  leadersPopup(leadersData, "#leadersPopup");
}
function leadersPopup(data, id) {
  var html = "";
  var resp = data;
  // resp.forEach( (obj, index) => {
  html += ejs.render("<div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <button type=\"button\" class=\"close-leadership-modal\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">\xD7</span>\n                        </button>\n                        <div class=\"modal-body\">\n                            <div class=\"container\">\n                                <div class=\"row\">\n                                    <div class=\"col-md-5\">\n                                        <% data.image_with_title_and_description.field_image_link_component.forEach(function(item) { %>\n                                            <div class=\"popimg relative\">\n                                                <div class=\"orangepopimgbox\"></div>\n                                                <% if(item.image_with_link.field_image){ %>\n                                                    <img src=\"<%- item.image_with_link.field_image.url %>\" alt=\"<%- item.image_with_link.field_image.alt %>\" class=\"scale\">\n                                                <% } %>\n                                                <% if( item.image_with_link.field_cta ){ %>\n                                                    <div class=\"followpop\">Follow : <a href=\"javascript:;\"><i class=\"fab fa-twitter twitter-follow-blue\"></i></a></div>\n                                                <% } %>\n                                            </div>\n                                        <% }) %>\n                                    </div>\n                                    <div class=\"col-md-7\">\n                                        <h5><%- data.image_with_title_and_description.field_component_title %><small><%- data.image_with_title_and_description.field_designation %></small></h5>\n                                        <div class=\"poptxt\"><%- data.image_with_title_and_description.field_description %></div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>", {
    data: resp
  });
  //});
  $(id).html(html);
}