"use strict";

$(window).bind("load", function () {
  // Labels
  try {
    $.get("/api/getPageLabel?url=/press-release-label", function (data, status) {
      if (status) {
        var resp = data;
        resp && resp.content && resp.content.field_labels.forEach(function (item) {
          if (item.watchVideoText) {
            $('#watchVideoText').text(item.watchVideoText);
          }
          if (item.YouMayAlsoLike) {
            $('#youMayAlsoLike').text(item.YouMayAlsoLike);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
  ;
  try {
    $.get("/api/webCounter", function (data, status) {
      try {
        if (status) {
          var resp = data;
          console.log('webcounter ', resp);
          $('.webCounts').text(resp.counter);
          //categoriesList(resp, '#awardcategoriesList');
        } else {
          $('.webCounts').text("");
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
  try {
    if ($('.keyInitiatives').length && $(window).width() < 768) {
      $('.keyInitiatives').on('setPosition', function () {
        $(this).find('.slick-slide').height('auto');
        var slickTrack = $(this).find('.slick-track');
        var slickTrackHeight = $(slickTrack).height();
        $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
      });
    }
  } catch (e) {
    console.log(e);
  }
  ;
  if (window.location.href.indexOf('kalol') >= 0) {
    if ($(window).width() < 767) {
      $('.prod-unitmiddle-nav #submenu-list').addClass('kalolTabWidth');
    }
  }
  if (window.location.href.indexOf('aonla') >= 0) {
    if ($(window).width() < 767) {
      $('.prod-unitmiddle-nav #submenu-list').addClass('aonlaTabWidth');
    }
  }
});
$(function () {
  //Disable Cut, Copy, and Paste
  $('body').bind('cut copy paste', function (event) {
    event.preventDefault();
  });
  document.oncontextmenu = new Function("return false"); // it will disable right-click on your web page

  try {
    if ($('#hometabs').length > 0) {
      $("#hometabs").stickOnScroll({
        topOffset: $("#mainMenuBarAnchor-home").outerHeight(),
        footerElement: $("#oursoul"),
        bottomOffset: 100,
        setParentOnStick: true,
        setWidthOnStick: true
      });
    }
    ///////// For Home
    if ($('#mainMenuBar-prod').length && $('#oursoul').length) {
      $(window).scroll(sticky_relocateHome);
      sticky_relocateHome();
    } else {
      if ($('#mainMenuBar-prod').length && $('.nutrientFilterTab').length) {
        $(window).scroll(sticky_nutriTabProd);
        sticky_nutriTabProd();
      }
    }
    if ($('.nutrientFilterTab').length && $('#oursoul').length) {
      $(window).scroll(sticky_nutriTab);
      sticky_nutriTab();
    }
    ;
    //////// END ///////
  } catch (e) {
    console.log(e);
  }
  ;
  if ($('.prod-unitmiddle-nav').length) {
    $(window).scroll(sticky_relocateNew);
    sticky_relocateNew();
  }
  if ($('.awards-searchfilter').length) {
    $(window).scroll(stickyAwardFilterMenu);
    stickyAwardFilterMenu();
  }
  if ($('.notprofit-toptab').length || $('#stick-onclickarrow').length) {
    $(window).scroll(stickyNFPIMenu);
    stickyNFPIMenu();
  }
  $('.submitbtn').on('click', function () {
    filterProdData(productData, selectedProductText);
    $('.filter-close').trigger('click');
  });
  ///////

  //////////////
  $('.filterprod-link').on('click', function () {
    $('.filter-optionbox').addClass('open-filter');
    $('.filterprod-link').hide();
    $('.submitbtn').show();
    $('.filter-close').fadeIn();
  });
  $('.filter-close').on('click', function () {
    $('.filter-optionbox').removeClass('open-filter');
    $('.filterprod-link').show();
    $('.submitbtn').hide();
    $('.filter-close').fadeOut();
    $('.nutrientFilterTab .nutriListSec').slideUp();
    $('.nutrientFilterTab .tabClickSec').removeClass('open');
  });
  filterNutrientsInput();

  ////////////

  $('.reportPDFSec').each(function () {
    var downLink = $(this).find('.repostPdfDownload');
    var yearSelect = $(this).find('.attGlanceSelect');
    downLink.attr('href', yearSelect.find('li.active').attr('data-pdf'));
    yearSelect.find('li').click(function () {
      var dataLink = $(this).attr('data-pdf');
      downLink.attr('href', dataLink);
    });
  });

  // production-unit Page stiky nav
  if (window.location.href.indexOf('/production-unit') >= 0) {
    // $(window).scroll(sticky_relocateNew);
    // sticky_relocateNew();
    jQuery(document).ready(function (jQuery) {
      var topMenu = jQuery("#submenu-list"),
        offset = 40,
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
          id = href.substring(href.indexOf('#'));
        var offsetTop = href === "#" ? 0 : jQuery(id).offset().top - topMenuHeight - 40;
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
          if (jQuery(this).offset().top - 200 < fromTop) return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        menuItems.parent().removeClass("active-link");
        if (id) {
          menuItems.parent().end().filter("[href*='#" + id + "']").parent().addClass("active-link");
        }
      });
    });
  }
  ////////////////////

  // our-reach
  if (window.location.href.indexOf('/our-presence') >= 0) {
    var a = 0;
    $(window).scroll(function () {
      var oTop = $('#counter').offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function () {
          var $this = $(this),
            countTo = $this.attr('data-count');
          $({
            countNum: $this.text()
          }).animate({
            countNum: countTo
          }, {
            duration: 7000,
            easing: 'swing',
            step: function step() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function complete() {
              $this.text(this.countNum);
            }
          });
        });
        a = 1;
      }
    });
  }
  ///////////////////////////////

  // milestone
  if ($('.slider-yeargreenbox .gallery-thumbs .swiper-slide-visible').length == $('.slider-yeargreenbox .gallery-thumbs .swiper-slide').length) {
    $('.slider-yeargreenbox .swiper-button-next,.slider-yeargreenbox .swiper-button-prev').hide();
  }
  $(document).on('click', '.shareLink', function (e) {
    e.preventDefault();
    $(this).parent().find('.sharethis-inline-share-buttons').toggleClass('open');
  });

  // News-letter subscription /////////////////////////////////
  function submitForm() {
    try {
      if (ValidateEmail($('.new-update input').val())) {
        var data = {
          email: $('.new-update input').val() || ''
        };
        var result = $.param(data);
        var body = {
          "mail": [{
            "value": $('.new-update input').val()
          }],
          "subscriptions": [{
            "target_id": "iffco_new_letter",
            "status": 2,
            "source": "news letter subscription"
          }]
        };
        $.get('/api/submitForm', body, function (resp, status) {
          console.log(resp);
          if (status && resp) {
            $('.footertop .APIerrorMsg').hide();
            $('.footertop .thankYouMsg').show();
            $('.footertop input').val("");
            setTimeout(function () {
              $('.footertop .thankYouMsg').hide();
            }, 5000);
          }
        }).fail(function (e) {
          console.error(e);
          $('.footertop .APIerrorMsg').show();
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  $('.new-update').append('<p class="errorMsg">Please enter your email</p>');
  $('input[type="text"]').keyup(function () {
    $(this).parent().find('.errorMsg').hide();
  });
  $('#NewsLetter').click(function () {
    if ($(this).parent().find('input').val() === "") {
      $(this).parent().find('.errorMsg').show();
    }
    if ($(this).parent().find('.errorMsg:visible').length === 0) {
      submitForm();
    }
  });
  $('input[type="text"]').bind("cut copy paste", function (e) {
    e.preventDefault();
  });
  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    $('.new-update input').parent().find('.errorMsg').show().text('Please enter valid Email ID');
    return false;
  }
  // News-letter subscription ///////////////////////////////// END //////////

  var count = 0;
  ////////////
  $('#refreshTestisec .milegreenbox-txtwrap').eq(count).fadeIn().siblings(".milegreenbox-txtwrap").hide();
  $('.refresh-mile #refreshTestiBtn').click(function () {
    count++;
    if (count === $('#refreshTestisec .milegreenbox-txtwrap').length) {
      count = 0;
    }
    $('#refreshTestisec .milegreenbox-txtwrap').eq(count).fadeIn().siblings(".milegreenbox-txtwrap").hide();
  });
  $(".cooperatContent .tab-pane").each(function () {
    $(this).find('.volunterNext').click(function () {
      var thidId = $(this).closest(".tab-pane").attr('id');
      $('.principleTab ul li a[href$="#' + thidId + '"]').parent().next().find('a').trigger('click');
    });
    $(this).find('.volunterPrev').click(function () {
      var thidId = $(this).closest(".tab-pane").attr('id');
      $('.principleTab ul li a[href$="#' + thidId + '"]').parent().prev().find('a').trigger('click');
    });
  });

  /// For corporate banner
  if ($('.circle-plus').length) {
    $('.circle-plus').on('click', function () {
      var THIS = $(this).parents('.colOne');
      var THAT = $(this);
      if (THAT.hasClass('opened')) {
        THAT.removeClass('opened');
        $(this).parents('.colOne').siblings('.colOne').find('opened').removeClass('opened');
      } else {
        THAT.siblings().removeClass('opened');
        THAT.addClass('opened');
      }
    });
    $('.circle-plus').on('click', function () {
      var THIS = $(this).parents('.colOne');
      if (THIS.hasClass('divHeight')) {
        THIS.removeClass('divHeight');
        THIS.siblings().removeClass('divHeight');
      } else {
        THIS.siblings().removeClass('divHeight');
        THIS.addClass('divHeight');
        THIS.siblings().find('.innerDetails').slideUp();
        THIS.find('.innerDetails').slideDown();
      }
    });
  }

  /// For corporate banner END

  // for social corner
  if ($(window).width() < 1200 && $(window).width() >= 992) {
    $('.fb_iframe_widget').attr('data-width', 290);
  } else if ($(window).width() < 992 && $(window).width() >= 768) {
    $('.fb_iframe_widget').attr('data-width', 210);
  } else if ($(window).width() < 768 && $(window).width() >= 480) {
    $('.fb_iframe_widget').attr('data-width', 360);
  } else if ($(window).width() < 480 && $(window).width() >= 360) {
    $('.fb_iframe_widget').attr('data-width', 325);
  } else if ($(window).width() < 360) {
    $('.fb_iframe_widget').attr('data-width', 290);
  }
  //////////////////////////////////////////////////////////////

  $('#searchResetBtn').click(function () {
    $(this).parent().find('input').attr('value', '');
  });
  $('.selectListCustom').each(function () {
    var selectedText = $(this).find('ul li.active').text();
    $(this).find('.textSelected').text(selectedText);
    $(this).find('.textSelected').click(function () {
      $(this).toggleClass('open');
      $(this).next('.listSelect').slideToggle();
      if ($(this).next('.listSelect').find('li').length > 5) {
        $(this).next('.listSelect').niceScroll({});
      }
      ;
    });
    $(this).find('.listSelect li').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
      $(this).closest('.selectListCustom').find('.textSelected').text($(this).find('a').text());
      if ($(this).next('.listSelect').find('li').length > 5) {
        $('.selectListCustom .listSelect').niceScroll('destroy');
      }
      ;
      $(this).parent().slideUp();
      $('.textSelected').removeClass('open');
    });
    $(document).click(function (e) {
      if ($(e.target).closest('.selectListCustom').length === 0 && $(e.target).closest('.listSelect li').length === 0) {
        $('.listSelect').slideUp();
        $('.textSelected').removeClass('open');
      }
    });
  });

  /*$('#userType li').click(function(){
      if($(this).find('li.active a').text('Corporate') && window.location.href.indexOf('/corporate') === -1){
          window.location.href = "/corporate";
      }else{
          window.location.href = "/";
      }
  });*/
  if (window.location.href.indexOf('/corporate') > -1) {
    $('#userType').prev().text($('#userType li').eq(1).find('a').text());
    $('#userType li').eq(1).addClass('active').siblings().removeClass('active');
  }

  // if($('#intro2').hasClass('active-introtab')){
  //     window.location.href = "/corporate";
  // }else{
  //     window.location.href = "/";
  // };

  $('.nutrientFilterTab .tabClickSec').click(function () {
    $(this).toggleClass('open');
    $(this).next('.nutriListSec').slideToggle();
  });
  if ($(window).width() < 992) {
    $('.deskChemCompId').attr('id', '');
  }
  $('#mp4PlayBtnKeyB').click(function () {
    var _this = $(this);
    var videoPlayer = $('.keyBenefitVideoMp4Sec').find('video');
    $('.keyBenefitVideoMp4Sec').addClass('showVideo');
    setTimeout(function () {
      videoPlayer.trigger('play');
      $('.closeVdoBtn').show();
    }, 500);
  });
  $('.closeVdoBtn').click(function () {
    var _this = $(this);
    var videoPlayer = _this.parent('.keyBenefitVideoMp4Sec').find('video');
    _this.parent('.keyBenefitVideoMp4Sec').removeClass('showVideo');
    _this.hide();
    setTimeout(function () {
      $('video').trigger('pause');
    }, 500);
  });
});
(function ($) {
  $("#search").autocomplete({
    source: function source(request, response) {
      jQuery.get("/api/predictive", {
        key: request.term
      }, function (data) {
        console.log(data);
        response($.map(data.search_result, function (value, key) {
          console.log("www == ", value.title);
          if (value.title) {
            return {
              label: value.title,
              value: value.title,
              url: value.field_unique_url
            };
          }
        }));
      });
    },
    select: function select(event, ui) {
      if (ui && ui.item && ui.item.url && ui.item.url !== null && ui.item.url !== "") {
        window.location.href = ui.item.url;
      }
      return false;
    },
    minLength: 2
  });
  if ($(window).width() < 1024) {
    $("#searchDevice").autocomplete({
      source: function source(request, response) {
        jQuery.get("/api/predictive", {
          key: request.term
        }, function (data) {
          console.log(data);
          response($.map(data.search_result, function (value, key) {
            console.log("www == ", value.title);
            if (value.title) {
              return {
                label: value.title,
                value: value.title,
                url: value.field_unique_url
              };
            }
          }));
        });
      },
      select: function select(event, ui) {
        if (ui && ui.item && ui.item.url && ui.item.url !== null && ui.item.url !== "") {
          window.location.href = ui.item.url;
        }
        return false;
      },
      minLength: 2
    });
  }
  try {
    $('.read-more-wrap .card .readMoreBtn').click(function () {
      var card = $(this).closest('.card');
      var profileImg = card.find('.card-img-top').attr('src');
      var profileName = card.find('.card-title').text();
      var designation = card.find('.card-text .designation').text();
      var description = card.find('.card-text .descript').html();
      console.log('www', profileName);
      $('#readMoreContent .card-img-top').attr('src', profileImg);
      $('#readMoreContent .modal-body h5 strong').text(profileName);
      $('#readMoreContent .modal-body .desig i').text(designation);
      $('#readMoreContent .modal-body .poptxt').html(description);
    });
  } catch (e) {
    console.log(e);
  }
})(jQuery);

//////// For Home page ////////
function sticky_relocateHome() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#oursoul").offset().top - 200;
  var div_top = $('#mainMenuBarAnchor-prod').offset().top - 75;
  var div_height = $("#mainMenuBar-prod").height();
  var padding = 20;
  if (window_top + div_height > footer_top - padding) $('#mainMenuBar-prod').css({
    top: (window_top + div_height - footer_top + padding) * -1
  });else if (window_top > div_top) {
    $('#mainMenuBar-prod').addClass('stick-prod');
    $('#mainMenuBar-prod').css({
      top: 75
    });
  } else {
    $('#mainMenuBar-prod').removeClass('stick-prod');
  }
}
///////////////END
function sticky_nutriTab() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#oursoul").offset().top - 200;
  var div_top = $('#mainMenuBarAnchor-prod').offset().top - 75;
  var div_height = $(".nutrientFilterTab").height();
  var padding = 20;
  if (window_top + div_height > footer_top - padding) $('.nutrientFilterTab').css({
    top: (window_top + div_height - footer_top + padding) * -1
  });else if (window_top > div_top) {
    $('.nutrientFilterTab').addClass('stickyNuttri');
    $('.nutrientFilterTab').css({
      top: 75
    });
  } else {
    $('.nutrientFilterTab').removeClass('stickyNuttri');
  }
}
function sticky_nutriTabProd() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#footer").offset().top - 500;
  var div_top = $('#mainMenuBarAnchor-prod').offset().top - 75;
  var div_height = $(".nutrientFilterTab").height();
  var padding = 20;
  if (window_top + div_height > footer_top - padding) $('.nutrientFilterTab').css({
    top: (window_top + div_height - footer_top + padding) * -1
  });else if (window_top > div_top) {
    $('.nutrientFilterTab').addClass('stickyNuttri');
    $('.nutrientFilterTab').css({
      top: 75
    });
  } else {
    $('.nutrientFilterTab').removeClass('stickyNuttri');
  }
}

// production-unit Page stiky nav
function sticky_relocateNew() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#footer").offset().top - 500;
  var div_top = $('.prod-unitmiddle-nav').offset().top - 75;
  var div_height = $(".prod-unitmiddle-nav > .fdpnav").height();
  var padding = 20;
  if (window_top + div_height > footer_top - padding) $('.prod-unitmiddle-nav > .fdpnav').css({
    top: (window_top + div_height - footer_top + padding) * -1
  });else if (window_top > div_top) {
    $('.prod-unitmiddle-nav > .fdpnav').addClass('stick-pu');
    $('.prod-unitmiddle-nav > .fdpnav').css({
      top: 75
    });
  } else {
    $('.prod-unitmiddle-nav > .fdpnav').removeClass('stick-pu');
  }
}
///////////

//////////////// awards-accolades ////
function stickyAwardFilterMenu() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#footer").offset().top - 500;
  var div_top = $('#Filters').offset().top - 75;
  var div_height = $("#mainMenuBar").height();
  var padding = 20;
  if (window_top + div_height > footer_top - padding) $('#mainMenuBar').css({
    top: (window_top + div_height - footer_top + padding) * -1
  });else if (window_top > div_top) {
    $('#mainMenuBar').addClass('stick-awards-filter');
    $('#mainMenuBar').css({
      top: 75
    });
  } else {
    $('#mainMenuBar').removeClass('stick-awards-filter');
  }
}
////////////////////

//////////////// not-for-profit-initiatives ////
function stickyNFPIMenu() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#footer").offset().top - 500;
  var div_top = $('#mainMenuBarAnchor').offset().top - 75;
  var div_height = $("#mainMenuBar").height();
  var padding = 20;
  if (window_top + div_height > footer_top - padding) $('#mainMenuBar').css({
    top: (window_top + div_height - footer_top + padding) * -1
  });else if (window_top > div_top) {
    $('#mainMenuBar').addClass('stick-awards-filter');
    $('#mainMenuBar').css({
      top: 75
    });
  } else {
    $('#mainMenuBar').removeClass('stick-awards-filter');
  }
}
////////////////////

//////////////////////////////////
function filterNutrientsInput() {
  var checkboxes = $(".filter-check input[type='checkbox']"),
    actions = $(".filterdot");
  checkboxes.click(function () {
    actions.attr("hidden", !checkboxes.is(":checked"));
  });
}
//////////

$(window).on("load", function (e) {
  try {
    if (window.location.hostname == "https://www.iffco.in" || window.location.hostname == "www.iffco.in") {
      $('meta[name=robots]').attr('content', 'index,follow');
    } else {
      $('meta[name=robots]').attr('content', 'noindex');
    }
    if ($(".wherebuy-mapaddres-box").length > 0) {
      $(".wherebuy-mapaddres-box").mCustomScrollbar({
        theme: "inset-dark"
      });
    }
    setTimeout(function () {
      var $window = $(window),
        win_height_padded = $window.height() * 1.1;
      //isTouch = Modernizr.touch;

      //if (isTouch) { $('.revealOnScroll').addClass('animated'); }

      $window.on('scroll', revealOnScroll);
      function revealOnScroll() {
        var scrolled = $window.scrollTop(),
          win_height_padded = $window.height() * 1.1;

        // Showed...
        $(".revealOnScroll:not(.animated)").each(function () {
          var $this = $(this),
            offsetTop = $this.offset().top;
          if (scrolled + win_height_padded > offsetTop) {
            if ($this.data('timeout')) {
              window.setTimeout(function () {
                $this.addClass('animated ' + $this.data('animation'));
              }, parseInt($this.data('timeout'), 10));
            } else {
              $this.addClass('animated ' + $this.data('animation'));
            }
          }
        });
        // Hidden...
        $(".revealOnScroll.animated").each(function (index) {
          var $this = $(this),
            offsetTop = $this.offset().top;
          if (scrolled + win_height_padded < offsetTop) {
            $(this).removeClass('animated fadeInUp fadeInLeft flipInX lightSpeedIn');
          }
        });
      }
      revealOnScroll();
      var topMenu = jQuery("#submenu-list"),
        offset = 40,
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
          offsetTop = href === "#" ? 0 : jQuery(id).offset().top - topMenuHeight + 1;
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
          if (jQuery(this).offset().top - 200 < fromTop) return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        menuItems.parent().removeClass("active-link");
        if (id) {
          menuItems.parent().end().filter("[href*='#" + id + "']").parent().addClass("active-link");
        }
      });
    }, 3000);
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
      event.preventDefault();
      $(this).ekkoLightbox({
        alwaysShowClose: true
      });
    });
    $('.lightpath-slider').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      //asNavFor: '.slider-for-insidemile',
      dots: false,
      arrows: true,
      centerMode: false,
      focusOnSelect: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      responsive: [{
        breakpoint: 990,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 470,
        settings: {
          slidesToShow: 1
        }
      }]
    });

    /////////////
    $('.ourheroslider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      //asNavFor: '.slider-for-insidemile',
      dots: false,
      arrows: true,
      centerMode: false,
      focusOnSelect: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      responsive: [{
        breakpoint: 990,
        settings: {
          slidesToShow: 1
        }
      }, {
        breakpoint: 470,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    $('.keyInitiatives').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      //asNavFor: '.slider-for-insidemile',
      dots: false,
      arrows: true,
      centerMode: false,
      focusOnSelect: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      responsive: [{
        breakpoint: 990,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 470,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    $('.locations_slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      centerMode: false,
      focusOnSelect: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      responsive: [{
        breakpoint: 990,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 470,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    $('.nonprofit_slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      centerMode: false,
      focusOnSelect: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 2000,
      fade: true,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      touchThreshold: 100,
      responsive: [{
        breakpoint: 990,
        settings: {
          slidesToShow: 1
        }
      }, {
        breakpoint: 470,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    $('.initiative_slider_bg').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.initiative_slider'
    });
    $('.initiative_slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.initiative_slider_bg',
      dots: true,
      arrows: true
      //focusOnSelect: true
    });
    $(".mhide-lp").hide();
    $(".mhide-lp").slice(0, 4).show();
    $("#loadmore-lp").on('click', function (e) {
      e.preventDefault();
      $(".mhide-lp:hidden").slice(0, 4).slideDown();
      if ($(".mhide-lp:hidden").length == 0) {
        $("#loadmore-lp").fadeOut('slow');
      }
    });

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         var hrefDirection = 'https://www.google.com/maps/dir/?api=1&amp;origin=19.2977542,73.20786869999999&amp;destination=28.456814,77.020021'
    //         $('#getDirection').attr('href', hrefDirection);
    //     });
    // }
  } catch (e) {
    console.log(e);
  }
});
$(window).on('scroll', function () {
  if ($('#mp-pusher').hasClass('pushmenu-space')) {
    $('.device-search').addClass('pushedMenu');
  } else {
    $('.device-search').removeClass('pushedMenu');
  }
});