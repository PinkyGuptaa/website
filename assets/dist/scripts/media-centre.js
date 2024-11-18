"use strict";

var apiData;
var filterApiData = {};
var downloadPfdLabel;
var readMore;
var pressReleasesDataFF;
$(window).bind("load", function () {
  // Labels
  try {
    if (window.location.href.indexOf('/media-centre') >= 0) {
      $.get("/api/getPageLabel?url=/press-release-label", function (data, status) {
        try {
          if (status) {
            var resp = data;
            console.log('amm ', resp);
            // resp.content.field_labels.forEach( item => {
            //   if(item.download_pdf){
            //     downloadPfdLabel = item.download_pdf;
            //   };
            //   if(item.read_more){
            //     readMore = item.read_more;
            //   }
            // });

            Object.keys(resp.data).forEach(function (key) {
              // console.log(key);        // the name of the current key.
              // console.log(resp.labels[key]); // the value of the current key.
              if (key === 'download_pdf') {
                downloadPfdLabel = resp.data[key];
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
        $.get("/api/media-centre", function (data, status) {
          try {
            if (status) {
              var _resp2 = data;
              apiData = _resp2;
              filterData(apiData);
              var $videoSrc;
              $('.video-btn').click(function () {
                $videoSrc = $(this).attr("data-src");
              });
              $('#myModal').on('shown.bs.modal', function (e) {
                $("#video").attr('src', $videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0');
              });
              $('#myModal').on('hide.bs.modal', function (e) {
                $("#video").attr('src', $videoSrc);
              });
            } else {
              $('#pressRelease, #publications, #iffcoLive, #latestVideos').html("");
            }
          } catch (e) {
            console.log(e);
          }
        });
        $.get("/api/getApiKey?key=media-center-year", function (data, status) {
          try {
            if (status) {
              var _resp = data;
              yearFilterPressRel(_resp, '#pressRelYearList');
              prsRelFilterfunc();
            } else {
              $('#pressRelYearList').html("");
            }
          } catch (e) {
            console.log(e);
          }
        });
      });
    }
    ;
    if (window.location.href.indexOf('/corporate') >= 0) {
      $.get("/api/getPageLabel?url=/press-release-label", function (data, status) {
        try {
          if (status) {
            var resp = data;
            // resp.content.field_labels.forEach( item => {
            //   if(item.download_pdf){
            //     downloadPfdLabel = item.download_pdf;
            //   };
            //   if(item.read_more){
            //     readMore = item.read_more;
            //   }
            // });

            Object.keys(resp.data).forEach(function (key) {
              // console.log(key);        // the name of the current key.
              // console.log(resp.labels[key]); // the value of the current key.
              if (key === 'download_pdf') {
                downloadPfdLabel = resp.data[key];
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
        $.get("/api/media-centre", function (data, status) {
          try {
            if (status) {
              var _resp3 = data;
              apiData = _resp3;
              filterData(apiData);
            } else {
              $('#pressRelease').html("");
            }
          } catch (e) {
            console.log(e);
          }
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
  ;
});
var keywordVal, categoryVal, yearVal, locationVal;
$('.filterKeyword .searchbox-media').keyup(function () {
  var keyWord = $(this).val();
  keywordVal = keyWord;
  if (keywordVal === "") {
    keywordVal = undefined;
  }
  filterDataCheck(keywordVal, categoryVal, yearVal, locationVal);
});
$('.categorySelect').change(function () {
  var _thisVal = $(this).val();
  categoryVal = _thisVal;
  if (categoryVal === "") {
    categoryVal = undefined;
  }
  filterDataCheck(keywordVal, categoryVal, yearVal, locationVal);
});
$('.yearSelect').change(function () {
  var _thisVal = $(this).val();
  yearVal = _thisVal;
  if (yearVal === "") {
    yearVal = undefined;
  }
  filterDataCheck(keywordVal, categoryVal, yearVal, locationVal);
});
$('.locationSelect').change(function () {
  var _thisVal = $(this).val();
  locationVal = _thisVal;
  if (locationVal === "") {
    locationVal = undefined;
  }
  filterDataCheck(keywordVal, categoryVal, yearVal, locationVal);
});
function filterDataCheck(valKey, valCatalog, valYear, valLocation) {
  filterApiData = [];
  $('#pressRelease, #publications, #iffcoLive, #latestVideos').closest('section').show();
  $('#mainMenuBar').next().remove('.noRecordFound');
  if (valKey === undefined && valCatalog === undefined && valYear === undefined && valLocation === undefined) {
    filterApiData = apiData;
  } else {
    apiData.forEach(function (item) {
      var keyValue = valKey && valKey.toLowerCase();
      var title = item.title.toLowerCase();
      var bodyText = item.body.toLowerCase();

      // case one
      if (valKey !== undefined && valKey.length > 2 && valCatalog === undefined && valYear === undefined && valLocation === undefined) {
        if (title.indexOf(keyValue) > -1 || bodyText.indexOf(keyValue) > -1) {
          filterApiData.push(item);
        }
      }
      if (valKey !== undefined && valCatalog !== undefined && valYear === undefined && valLocation === undefined) {
        if ((title.indexOf(keyValue) > -1 || bodyText.indexOf(keyValue) > -1) && valCatalog === item.field_type) {
          filterApiData.push(item);
        }
      }
      if (valKey !== undefined && valCatalog !== undefined && valYear !== undefined && valLocation === undefined) {
        if ((title.indexOf(keyValue) > -1 || bodyText.indexOf(keyValue) > -1) && valCatalog === item.field_type && valYear === item.field_year) {
          filterApiData.push(item);
        }
      }
      if (valKey !== undefined && valCatalog !== undefined && valYear !== undefined && valLocation !== undefined) {
        if ((title.indexOf(keyValue) > -1 || bodyText.indexOf(keyValue) > -1) && valCatalog === item.field_type && valYear === item.field_year && valLocation === item.field_internalisation_location) {
          filterApiData.push(item);
        }
      }

      // case 2
      if (valKey === undefined && valCatalog !== undefined && valYear === undefined && valLocation === undefined) {
        if (valCatalog === item.field_type) {
          filterApiData.push(item);
        }
      }
      if (valKey === undefined && valCatalog === undefined && valYear !== undefined && valLocation === undefined) {
        if (valYear === item.field_year) {
          filterApiData.push(item);
        }
      }
      if (valKey === undefined && valCatalog === undefined && valYear === undefined && valLocation !== undefined) {
        if (valLocation === item.field_internalisation_location) {
          filterApiData.push(item);
        }
      }

      // case 3
      if (valKey === undefined && valCatalog !== undefined && valYear !== undefined && valLocation === undefined) {
        if (valCatalog === item.field_type && valYear === item.field_year) {
          filterApiData.push(item);
        }
      }
      if (valKey === undefined && valCatalog !== undefined && valYear === undefined && valLocation !== undefined) {
        if (valCatalog === item.field_type && valLocation === item.field_internalisation_location) {
          filterApiData.push(item);
        }
      }
      if (valKey === undefined && valCatalog !== undefined && valYear !== undefined && valLocation !== undefined) {
        if (valCatalog === item.field_type && valYear === item.field_year && valLocation === item.field_internalisation_location) {
          filterApiData.push(item);
        }
      }

      // case 4
      if (valKey === undefined && valCatalog === undefined && valYear !== undefined && valLocation !== undefined) {
        if (valYear === item.field_year && valLocation === item.field_internalisation_location) {
          filterApiData.push(item);
        }
      }

      // case 5
      if (valKey !== undefined && valCatalog === undefined && valYear !== undefined && valLocation === undefined) {
        if ((title.indexOf(keyValue) > -1 || bodyText.indexOf(keyValue) > -1) && valYear === item.field_year) {
          filterApiData.push(item);
        }
      }
      if (valKey !== undefined && valCatalog === undefined && valYear !== undefined && valLocation !== undefined) {
        if ((title.indexOf(keyValue) > -1 || bodyText.indexOf(keyValue) > -1) && valYear === item.field_year && valLocation === item.field_internalisation_location) {
          filterApiData.push(item);
        }
      }
      if (valKey !== undefined && valCatalog === undefined && valYear === undefined && valLocation !== undefined) {
        if ((title.indexOf(keyValue) > -1 || bodyText.indexOf(keyValue) > -1) && valLocation === item.field_internalisation_location) {
          filterApiData.push(item);
        }
      }
    });
  }
  filterData(filterApiData);
}
function prsRelFilterfunc() {
  $('#pressRelYearList li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $(this).closest('.selectListCustom').find('.textSelected').text($(this).find('a').text());
    var liId = $(this).attr('data-id');
    var filteredDataPR = [];
    if ($(this).attr('data-id')) {
      pressReleasesDataFF.filter(function (filterData) {
        if (filterData.field_year !== null) {
          if (filterData.field_year.includes(liId)) {
            filteredDataPR.push(filterData);
          }
        }
      });
    } else {
      filteredDataPR = pressReleasesDataFF;
    }
    ;
    pressReleaseFunc(filteredDataPR, '#pressRelease');
    $(this).parent().slideUp();
    $('.textSelected').removeClass('open');
  });
}
function filterData(data) {
  try {
    var iffcoLive = [],
      publications = [],
      pressReleases = [],
      latestVideos = [];
    if (data.length > 0) {
      data.forEach(function (item) {
        var typeItem = item.type_1;
        switch (typeItem) {
          case 'press_release':
            pressReleases.push(item);
            break;
          case 'iffco_live':
            iffcoLive.push(item);
            break;
          case 'publications':
            publications.push(item);
            break;
          case 'latest_videos':
            latestVideos.push(item);
            break;
          default:
            console.log('Sorry, we are out of ' + item + '.');
        }
      });
      $('#pressRelease, #publications, #iffcoLive, #latestVideos').empty();
      pressReleasesDataFF = pressReleases;
      pressReleaseFunc(pressReleasesDataFF, '#pressRelease');
      publicationsFunc(publications, '#publications');
      iffcoLiveFunc(iffcoLive, '#iffcoLive');
      latestVideosFunc(latestVideos, '#latestVideos');
      if ($('.iffcolive-slider').hasClass('slick-slider') && typeof $slickSlider !== "undefined") {
        $slickSlider.slick('unslick');
      }
      iffcoliveSliderFunc('.iffcolive-slider');
      if (window.location.href.indexOf('publication') > -1) {
        $('html, body').animate({
          scrollTop: $('#media-latest-publications').offset().top - $('#mainMenuBar-home').outerHeight()
        }, 500);
      }
      ;
      if (window.location.href.indexOf('press-released') > -1) {
        $('html, body').animate({
          scrollTop: $('#media-press-releases').offset().top - $('#mainMenuBar-home').outerHeight()
        }, 500);
      }
    } else {
      // no records
      console.log(' No Records');
      $('#publications, #iffcoLive, #latestVideos').closest('section').hide();
      $('#mainMenuBar').parent().append('<div class="noRecordFound">No Records</div>');
    }
  } catch (e) {
    console.log(e);
  }
}
function pressReleaseFunc(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      resp.forEach(function (obj, index) {
        html += ejs.render("\n            <div class=\"pr_row mhide\">\n              <div class=\"row align-items-center\">\n                <div class=\"col-md-8\">\n                  <p class=\"pr_text\"><a href=\"<%- data.field_link %>\"><%- data.title %></a></p>\n                  <span class=\"date\"><%- data.field_date %></span>\n                  <% var title = data.title %>\n                </div>\n                <div class=\"col-md-4\">\n                  <ul class=\"d-flex\">\n                    <li>\n                      <a class=\"knowmore btn btn-primary rounded-0\" href=\"<%- data.field_link %>\">\n                        <span> Read More </span>\n                      </a>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n            ", {
          data: resp[index]
        });
      });
      $(id).html(html);
    } else {
      $(id).html("<div class='noRecordFound'>No Records</div>");
      //$(id).closest('section').hide();
    }
  } catch (e) {
    console.log(e);
  }
}
function publicationsFunc(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      resp.forEach(function (obj, index) {
        html += ejs.render("<div class=\"col-lg-3 col-md-4 col-sm-6 col-12 pb-4 mb-4 pb-lg-5 mhide-lp publicSecMedia\">\n                <div class=\"row media-box\">\n                      <div class=\"col-12\">\n                          <img src=\"<%- data.field_image %>\">\n                      </div>\n                    <div class=\"col-12\">\n                        <div class=\"box-bottom-text\"><a href=\"<%- data.field_unique_url %>\" class=\"media-box\"><%- data.title %></a></div>\n                        <div class=\"exploremore\"><a href=\"<%- data.field_upload_document %>\" target=\"_blank\"><span>Explore More</span></a></div>\n                    </div>\n                </div>\n            </div>", {
          data: resp[index]
        });
      });
      $(id).html(html);
      $(id).closest('section').show();
    } else {
      $(id).closest('section').hide();
    }
  } catch (e) {
    console.log(e);
  }
}
function iffcoLiveFunc(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      resp.forEach(function (obj, index) {
        html += ejs.render("<div>\n                <div class=\"iffco-livebox\">\n                    <a href=\"<%- data.field_unique_url %>\">\n                        <div class=\"iffco-livebox-txt\"><%- data.title %></div>\n                        <div class=\"iffco-livebox-date\"><%- data.body %></div>\n                    </a>\n                </div>\n            </div>", {
          data: resp[index]
        });
      });
      $(id).html(html);
      $(id).closest('section').show();
    } else {
      $(id).closest('section').hide();
    }
  } catch (e) {
    console.log(e);
  }
}
function yearFilterPressRel(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      resp.forEach(function (obj, index) {
        html = ejs.render("\n            <li class=\"active\"><a href=\"javascript:;\">Filter by year</a></li>\n            <% data.items.forEach(function(item){ %>\n              <li data-id=\"<%- item.term_id %>\"><a href=\"javascript:;\"><%- item.name %></a></li>\n            <% }) %>\n          ", {
          data: resp[index]
        });
      });
      $(id).html(html);
      $(id).closest('section').show();
    } else {
      $(id).closest('section').hide();
    }
  } catch (e) {
    console.log(e);
  }
}
function latestVideosFunc(data, id) {
  try {
    var html = "";
    var resp = data;
    if (data.length > 0) {
      resp.forEach(function (obj, index) {
        html += ejs.render("<div class=\"col-lg-3 col-md-4 col-sm-6 pb-5 pb-md-5 mhide-lv\">\n                <div class=\"row\">\n                    <div class=\"col-12\">\n                        <a href=\"javascript:;\" class=\"video-btn playbtn latest-video-media\" data-toggle=\"modal\" data-src=\"<%- data.field_link %>\" data-target=\"#myModal\">\n                            <div class=\"imgbox\"><img src=\"<%- data.field_image %>\" width=\"\" height=\"\" class=\"scale\" alt=\"\"/></div>\n                            <div class=\"textbox border\">\n                                <div class=\"play\"><i class=\"far fa-play-circle\"></i></div>\n                                <div class=\"playbtn-heading\">\n                                    <h5><%- data.title %></h5>\n                                    <h6><%- data.field_sub_title %></h6>\n                                </div>\n                            </div>\n                        </a>\n                    </div>\n                </div>\n            </div>", {
          data: resp[index]
        });
      });
      $(id).html(html);
      $(id).closest('section').show();
    } else {
      $(id).closest('section').hide();
    }
  } catch (e) {
    console.log(e);
  }
}
$(function () {
  $('.eventGallery').on('click', function (e) {
    e.preventDefault();
    $('#mediaEvents').html("");
    var galleryItems = $(this).closest('.eventSlideBox').find('.hiddenImg').html();
    $('#mediaEvents').append(galleryItems);
    setTimeout(function () {
      $('#mediaEvents .eventGallerySlider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true
      });
    }, 1000);
  });
  $('.eventGallery').on('click', function (e) {
    e.preventDefault();
    $('#mediaEvents').html("");
    var galleryItems = $(this).closest('.eventSlideBox').find('.hiddenImg').html();
    $('#mediaEvents').append(galleryItems);
    setTimeout(function () {
      $('#mediaEvents .eventGallerySlider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true
      });
    }, 1000);
  });
});