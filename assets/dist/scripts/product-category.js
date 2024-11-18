"use strict";

var productData, selectedProductText;
var pageUrl = window.location.href;
//if(window.location.href.indexOf('/faqs') >= 0){
// FAQ Page API Function
$(window).bind("load", function () {
  try {
    //if(window.location.href.indexOf('/faqs') >= 0){
    $.get("/api/productCategory", function (data, status) {
      try {
        if (status) {
          var resp = data;
          prodCategory(resp, '#prodCateLinks');
        } else {
          $('#prodCateLinks').html("");
        }
      } catch (e) {
        console.log(e);
      }
    });
    $.get("/api/productNutrients", function (data, status) {
      try {
        if (status) {
          var resp = data;
          prodNutrients(resp, '#chemicalComposition');
          filterNutrientsInput();
          var nCount = 0;
          $('#chemicalComposition > label').each(function () {
            $(this).find('input').click(function () {
              $('.filterdot').html(nCount += this.checked ? 1 : -1);
            });
          });
        } else {
          $('#chemicalComposition').html("");
        }
      } catch (e) {
        console.log(e);
      }
    });
    var locationPath = window.location.href;
    var pathArray = locationPath.split('/');
    var prodName = pathArray[pathArray.length - 1];
    $.get("/api/getCatId?key=".concat(prodName), function (data, status) {
      console.log("data data for getProdTermId", data, status);
      try {
        if (status) {
          console.log("status", status);
          var resp = data;
          getProdTermId(resp);
        } else {
          //$('#prodCateLinks').html("");
        }
      } catch (e) {
        console.log(e);
      }
    });
    //}

    /*$('.prod-filtertab-inner .filterimg').on('click', function () {
        var text = $(this).find('h2').text();
        selectedProductText = text;
        filterProdData(productData, selectedProductText);
    });*/
  } catch (e) {
    console.log(e);
  }
});
function getProdTermId(termId) {
  var pdTermId = typeof termId !== "undefined" && termId.length > 0 ? termId[0].term_id : 0;
  console.log("pdTermId pdTermId", pdTermId);
  if (pdTermId === 0) {
    console.log("No records found");
    return;
  }
  $.get("/api/product?id=".concat(pdTermId), function (data, status) {
    try {
      if (status) {
        var resp = data;
        productData = resp;
        console.log('productData ==', resp);
        prodCardList(resp, '#productCardList');
        var wheretobuyBtn = $('a[data-target=".wheretobuy-modal"]');
        wheretobuyBtn.on('click', function () {
          getLocation();
        });
      } else {
        //$('#prodCateLinks').html("");
      }
    } catch (e) {
      console.log(e);
    }
  });
}
function prodCategory(data, id) {
  var html = "";
  var resp = data;
  if (resp.length > 0) {
    resp.forEach(function (obj, index) {
      html += ejs.render("<% data.items.forEach( function(item, index) { %>\n            <a class=\"nav-item nav-link <%- url.indexOf(item.url) > -1 ? \"active\" : \"\" %>\" href=\"<%- item.url %>\">\n              <div class=\"p-nutri-tabimg<%- index %>\">\n                  <img src=\"<%- item.image.url %>\" class=\"hidetab-icon\" alt=\"<%- item.image.alt %>\">\n                  <img src=\"<%- item.active_icon.url %>\" class=\"showtab-icon\" alt=\"<%- item.active_icon.alt %>\">\n              </div>\n              <h2><%- item.name %></h2>\n            <% }) %>", {
        data: obj,
        url: pageUrl
      });
    });
    $(id).html(html);
  }
  ;
}
function prodNutrients(data, id) {
  var html = "";
  var resp = data;
  if (resp.length > 0) {
    resp.forEach(function (obj, index) {
      html += ejs.render("<% data.items.forEach( function(item) { %>\n                    <label>\n                        <input type=\"checkbox\"/ data-id=\"<%- item.term_id %>\"><span class=\"checkbox-r\"><span class=\"text\"><%- item.value %><span class=\"smalltxt\"><%- item.name %></span></span>\n                    </label>\n                <% }) %>", {
        data: resp[index]
      });
    });
    $(id).html(html);
  }
  ;
}
function prodCardList(data, id) {
  var html = "";
  var resp = data;
  if (resp.length > 0) {
    resp.forEach(function (obj, index) {
      html += ejs.render("\n                <div class=\"col-xl-4 col-lg-6 col-md-6 pt-4 pb-4\" data-time=\"400\">\n                    <div class=\"card\">\n                        <% if(data.field_image_for_category_page){ %>\n                            <div class=\"prodimg prodCataImg\"><img class=\"card-img-top lazy\" data-src=\"<%- data.field_image_for_category_page %>\" src=\"<%- data.field_image_for_category_page %>\" alt=\"<%- data.title %>\" width=\"\" height=\"\"></div>\n                        <% }else{ %>\n                            <div class=\"prodimg\"><img class=\"card-img-top lazy\" data-src=\"<%- data.field_image %>\" src=\"<%- data.field_image %>\" alt=\"<%- data.title %>\"></div>\n                        <% } %>\n                        <div class=\"card-body\">\n                            <h5 class=\"card-title\"><a href=\"<%- data.field_know_more.uri %>\"><%- data.title %></a></h5>\n                            <div class=\"card-text\"><%- data.body %></div>\n                            <a href=\"<%- data.field_know_more.uri %>\" class=\"btn btn-outline-primary rounded-0 pl-2 pr-2\" title=\"Know More - <%- data.title %>\" aria-label=\"Know More - <%- data.title %>\"><span><%- data.field_know_more.title %></span></a>  </div>\n                    </div>\n                </div>\n           ", {
        data: obj
      });
    });
    $(id).html(html);
  } else {
    $(id).html('<p class="noData">To be launched soon. Stay Tuned !</p>');
    if ($('.container').hasClass('prodDiscSec')) {
      $(id).html('<p class="noData">No Products Found</p>');
    }
  }
  ;
}
//}

var chemicalSel = [];
function filterProdData(apiData, productCatag) {
  try {
    filterProductData = [];
    chemicalSel = [];
    $('#chemicalComposition label').each(function () {
      var _input = $(this).find('input');
      if (_input.is(':checked')) {
        chemicalSel.push(_input.data('id'));
      }
    });

    /* apiData.forEach( item => {
         if(apiData !== undefined && item.field_product_category[0].name === productCatag ){
             filterProductData.push(item);
         };
     });*/

    var filterData = chemicalSel.length > 0 ? apiData.filter(filterByChemical) : apiData;
    $('#productCardList').empty();
    prodCardList(filterData, '#productCardList');
  } catch (e) {
    console.log(e);
  }
}
function checkChemical(item) {
  try {
    var isCheck = false;
    item.forEach(function (items) {
      if (chemicalSel.indexOf(parseInt(items.id)) >= 0) {
        isCheck = true;
      }
    });
    return isCheck;
  } catch (e) {
    console.log(e);
  }
}
function filterByChemical(item) {
  try {
    if (item.field_nutrient) {
      return checkChemical(item.field_nutrient);
    }
  } catch (e) {
    console.log(e);
  }
}