"use strict";

var productData;
var filterProductData = [];
var selectedProductText;
var $homeSlickSlider1;
var $homeSlickSliderfor;
$(window).bind("load", function () {
  try {
    if (window.location.pathname === "/en" || window.location.pathname === "/hi" || window.location.pathname === "/mr" || window.location.pathname === "/gu" || window.location.pathname === "/as" || window.location.pathname === "/te" || window.location.pathname === "/ta" || window.location.pathname === "/bn" || window.location.pathname === "/pa" || window.location.pathname === "/kn" || window.location.pathname === "/ml" || window.location.pathname === "/ori" || window.location.pathname === "/sa") {
      $.get("/api/product", function (data, status) {
        try {
          if (status) {
            productData = data;
            console.log(productData);
            filterProdData(productData, selectedProductText);
            $('#mainMenuBar-prod .navtab-tophome > a').eq(0).trigger('click');
            var wheretobuyBtn = $('a[data-target=".wheretobuy-modal"]');
            wheretobuyBtn.click(function () {
              // getLocation();
            });
          } else {
            $('#homeProductApi').html("");
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
});
$('#mainMenuBar-prod .navtab-tophome > a').on('click', function () {
  var text = $(this).find('h2').text();
  selectedProductText = text;
  filterProdData(productData, selectedProductText);
});
$('.submitbtn .filterimg-txtbox').on('click', function () {
  if ($('#chemicalComposition label').find('input:checked')) {
    filterProdData(productData, selectedProductText);
  }
});
var nCount = 0;
$('#chemicalComposition > label').each(function () {
  $(this).find('input').click(function () {
    $('.filterdot').html(nCount += this.checked ? 1 : -1);
  });
});
var chemicalSel = [];
function filterProdData(apiData, productCatag) {
  try {
    filterProductData = [];
    if ($homeSlickSlider1 !== undefined) {
      $homeSlickSlider1.slick('unslick');
      $homeSlickSliderfor.slick('unslick');
    }
    $('.bgslidenav .container').find('.noData').remove();
    $('#homeProductImgList, #homeProductDetailApi').empty();
    chemicalSel = [];
    $('#chemicalComposition label').each(function () {
      var _input = $(this).find('input');
      if (_input.is(':checked')) {
        chemicalSel.push(_input.data('id'));
      }
    });
    apiData.forEach(function (item) {
      if (apiData !== undefined) {
        item.field_product_category.forEach(function (titleItem) {
          if (titleItem.name === productCatag) {
            filterProductData.push(item);
          }
        });
      }
      ;
    });
    var filterData = chemicalSel.length > 0 ? filterProductData.filter(filterByChemical) : filterProductData;
    productListGallery(filterData, '#homeProductImgList');
    productListDetail(filterData, '#homeProductDetailApi');
    productSlideFor('.slider-for');
    productImgSlide('.slider-nav');
    if (filterData.length < 1) {
      $('.bgslidenav .container').append('<p class="noData">No Products Found!</p>');
      $('.slide-bot-tab .nav-tabs .nav-link').click(function () {
        var nanofert_txt = $(this).find('h2').html();
        console.log(nanofert_txt);
        if (nanofert_txt === 'Nano Fertilisers') {
          $('.bgslidenav .container').find('.noData').html('To be launched soon. Stay Tuned!');
        } else {
          $('.bgslidenav .container').find('.noData').html('No Products Found!');
        }
      });
    } else {
      $('.bgslidenav .container').find('.noData').remove();
    }
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
function productListGallery(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      resp.forEach(function (obj, index) {
        html += ejs.render("\n                <div class=\"item\">\n                    <img class=\"scale lazy\" alt=\"\" title=\"\" src=\"<%- data.field_image %>\" style=\"\">\n                </div>\n                ", {
          data: resp[index]
        });
      });
      $(id).html(html);
    } else {}
  } catch (e) {
    console.log(e);
  }
}
function productListDetail(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      resp.forEach(function (obj, index) {
        html += ejs.render("\n              <div class=\"item\">\n                  <div class=\"urea-sliderfor\">\n                      <div class=\"row\">\n                          <div class=\"col-xs-12 col-md-12\">\n                              <h3><%- data.title %></h3>\n                          </div>\n                      </div>\n                      <div class=\"row\">\n                          <div class=\"col-xs-12 col-md-9 contentHeight\">\n                              <%- data.body %>\n                          </div>\n                          <div class=\"col-xs-12 col-md-3 btnSection\"><a href=\"<%- data.field_know_more.uri %>\" class=\"btn btn-primary mb-3 btn-all\"><%- data.field_know_more.title %></a></div>\n                      </div>\n                  </div>\n              </div>\n          ", {
          data: resp[index]
        });
      });
      $(id).html(html);
    } else {}
  } catch (e) {
    console.log(e);
  }
}
function productSlideFor(forSlide) {
  $homeSlickSliderfor = $(forSlide);
  $homeSlickSliderfor.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    asNavFor: '.slider-nav'
  });
}
function productImgSlide(productDallery) {
  $homeSlickSlider1 = $(productDallery);
  $homeSlickSlider1.slick({
    slidesToShow: 4,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    arrows: true,
    responsive: [{
      breakpoint: 1256,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
}