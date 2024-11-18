"use strict";

var $slickSlider;

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
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
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
var isRecording = false,
  recorder;
function voiceToText(This) {
  /* This function needs above two global variable to be existing */
  function sendToSocket(blob) {
    blob = recorder.getBlob();
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var arrayBufferData = reader.result;
      // console.log("arrayBufferData",arrayBufferData);
      /*let lang = getCookie("localeParam");
      lang = lang ? JSON.parse(lang).language : "en";*/
      var lang = 'en';
      socket.emit("voiceRecording", {
        base64Data: arrayBufferData.substring("data:audio/wav;base64,".length),
        sampleRate: recorder.getInternalRecorder().sampleRate,
        lang: lang
      });
    };
  }
  function receivingSocket() {
    socket.on("voiceText", function (resp) {
      // console.log("resp",resp);
      if (resp && resp.text) {
        if (!document.getElementById('search').value) {
          document.getElementById('search').value = "";
        }
        window.location.href = "/search?q=" + resp.text || "";
        document.getElementById('search').value += resp.text || "";
        socket.disconnect();
      }
    });
  }
  // function autoDectectSilence(stream) {
  //     let speechEvents = hark(stream, {});
  //     speechEvents.on('speaking', function () {});
  //     speechEvents.on('stopped_speaking', function () {
  //         console.log("stopped recording");
  //         recorder.stopRecording(sendToSocket)
  //     });
  // }
  if (!isRecording) {
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(function (stream) {
      socket = io();
      recorder = RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm',
        // timeSlice: 5000,
        recorderType: StereoAudioRecorder,
        // ondataavailable: sendToSocket,
        numberOfAudioChannels: 1
      });
      // autoDectectSilence(stream);
      receivingSocket();
      recorder.startRecording();
      $(This).addClass("active");
      $('.startTalkingPopup, .searchOverlay').addClass("show");
      // console.log("recorder",recorder, recorder.getInternalRecorder());

      setTimeout(function () {
        if (isRecording) {
          recorder.stopRecording(sendToSocket);
          isRecording = !isRecording;
          $(This).removeClass("active");
          // $('.startTalkingPopup, .searchOverlay').removeClass("show");
          $('.startTalkingPopup .icon').hide();
          $('.startTalkingPopup .voiceTxt').show();
        }
      }, 7000);
    })["catch"](function (err) {
      console.log("err", err);
    });
  } else {
    if (isRecording) {
      recorder.stopRecording(sendToSocket);
      $(This).removeClass("active");
      $('.startTalkingPopup, .searchOverlay').removeClass("show");
    }
    //socket.disconnect();
  }
  isRecording = !isRecording;
}
function isIE() {
  var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
  var msie = ua.indexOf('MSIE '); // IE 10 or older
  var trident = ua.indexOf('Trident/'); //IE 11

  return msie > 0 || trident > 0;
}
$(function () {
  isIE();
  if (isIE()) {
    $('#twitterNotSuppoerMSG').text("Your browser does not support the display of the Twitter feed. Please try another browser.");
  }

  /*let webLang = getCookie("localeParam");
  let webState = getCookie("localeParam");
  webLang = webLang ? JSON.parse(webLang).language : "en";
  webState = webState ? JSON.parse(webState).state : "gj";*/

  if ($('.locations_slider_wrap').length > 0) {
    $('.locations_slider_wrap').css('visibility', 'hidden');
  }
  $('#userType li a').on('click', function () {
    try {
      var getCookieState = getCookie("geoLocationState");
      var getCookieStateSelect = getCookieState.split('"');
      var langName = $('#homeLangSelect .active a').data('value') || 'en';
      var stateName = getCookieStateSelect[1] || $('#homeStateList .active a').data('value') || 'gj';
      var typeName = $(this).data('key') === '/' || $(this).data('key') === '/en' ? 'farmer' : 'corporate';
      $('#preloader').show();
      $.get("/api/updateParam?state=".concat(stateName, "&lang=").concat(langName, "&type=").concat(typeName), function (resp, status) {
        if (status) {
          if (resp) {
            window.location.href = '/';
          }
        }
      });
    } catch (e) {
      $('#preloader').hide();
      console.log(e);
      alert('Opps Sorry !!! There is some techinical error. Please Try Again');
    }
    ;
  });
  $('#homeLangSelect li').click(function () {
    try {
      var langName = $(this).find('a').data('value') || 'en';
      var stateName = $('#homeStateList .active a').data('value') || 'gj';
      var typeName = $('.userTypeSec .textSelected').attr('data-type').toLowerCase() || 'corporate';
      $('#preloader').show();
      $.get("/api/updateParam?state=".concat(stateName, "&lang=").concat(langName, "&type=").concat(typeName), function (resp, status) {
        if (status) {
          if (resp) {
            // window.location.href = '/';
            var pathName = window.location.pathname;
            if (pathName.indexOf('/en') == 0) {
              pathName = pathName.replace('/en', '/' + langName);
            }
            if (pathName.indexOf('/hi') == 0) {
              pathName = pathName.replace('/hi', '/' + langName);
            }
            if (pathName.indexOf('/gu') == 0) {
              pathName = pathName.replace('/gu', '/' + langName);
            }
            if (pathName.indexOf('/mr') == 0) {
              pathName = pathName.replace('/mr', '/' + langName);
            }
            if (pathName.indexOf('/as') == 0) {
              pathName = pathName.replace('/as', '/' + langName);
            }
            if (pathName.indexOf('/te') == 0) {
              pathName = pathName.replace('/te', '/' + langName);
            }
            if (pathName.indexOf('/ta') == 0) {
              pathName = pathName.replace('/ta', '/' + langName);
            }
            if (pathName.indexOf('/bn') == 0) {
              pathName = pathName.replace('/bn', '/' + langName);
            }
            if (pathName.indexOf('/pa') == 0) {
              pathName = pathName.replace('/pa', '/' + langName);
            }
            if (pathName.indexOf('/kn') == 0) {
              pathName = pathName.replace('/kn', '/' + langName);
            }
            if (pathName.indexOf('/ml') == 0) {
              pathName = pathName.replace('/ml', '/' + langName);
            }
            if (pathName.indexOf('/ori') == 0) {
              pathName = pathName.replace('/ori', '/' + langName);
            }
            if (pathName.indexOf('/sa') == 0) {
              pathName = pathName.replace('/sa', '/' + langName);
            }
            window.location.href = pathName + window.location.search;
            $('#homeLangSelect li a[data-value="' + langName + '"]').parent().addClass('active').siblings().removeClass('active');
          }
        }
      });
    } catch (e) {
      $('#preloader').hide();
      console.log(e);
      alert('Opps Sorry !!! There is some techinical error. Please Try Again');
    }
    ;
  });
  $('#deviceSearchBtn').on('click', function () {
    window.location.href = '/search?q=' + $('#searchDevice').val(), true;
    return false;
  });

  //$('#homeStateList').prev('#selectedText').text($('#homeStateList').val());
  $('#homeStateList li').click(function () {
    try {
      var langName = $('#homeLangSelect .active a').data('value') || 'en';
      var stateName = $(this).find('a').data('value') || 'gj';
      var typeName = $('.userTypeSec .textSelected').attr('data-type').toLowerCase() || 'corporate';
      $('#preloader').show();
      $.get("/api/updateParam?state=".concat(stateName, "&lang=").concat(langName, "&type=").concat(typeName), function (resp, status) {
        if (status) {
          if (resp) {
            //window.location.href = '/';
            var pathName = window.location.pathname;
            if (pathName.indexOf('/en') == 0) {
              pathName = pathName.replace('/en', '/' + langName);
            }
            if (pathName.indexOf('/hi') == 0) {
              pathName = pathName.replace('/hi', '/' + langName);
            }
            if (pathName.indexOf('/gu') == 0) {
              pathName = pathName.replace('/gu', '/' + langName);
            }
            if (pathName.indexOf('/mr') == 0) {
              pathName = pathName.replace('/mr', '/' + langName);
            }
            if (pathName.indexOf('/as') == 0) {
              pathName = pathName.replace('/as', '/' + langName);
            }
            if (pathName.indexOf('/te') == 0) {
              pathName = pathName.replace('/te', '/' + langName);
            }
            if (pathName.indexOf('/ta') == 0) {
              pathName = pathName.replace('/ta', '/' + langName);
            }
            if (pathName.indexOf('/bn') == 0) {
              pathName = pathName.replace('/bn', '/' + langName);
            }
            if (pathName.indexOf('/pa') == 0) {
              pathName = pathName.replace('/pa', '/' + langName);
            }
            if (pathName.indexOf('/kn') == 0) {
              pathName = pathName.replace('/kn', '/' + langName);
            }
            if (pathName.indexOf('/ml') == 0) {
              pathName = pathName.replace('/ml', '/' + langName);
            }
            if (pathName.indexOf('/ori') == 0) {
              pathName = pathName.replace('/ori', '/' + langName);
            }
            if (pathName.indexOf('/sa') == 0) {
              pathName = pathName.replace('/sa', '/' + langName);
            }
            window.location.href = pathName + window.location.search;
          }
        }
      });
    } catch (e) {
      $('#preloader').hide();
      console.log(e);
      alert('Opps Sorry !!! There is some techinical error. Please Try Again');
    }
    ;
  });
  try {
    $('.microphone-button').click(function () {
      voiceToText(this);
      /* console.log('Ready to receive a color command.'); */
    });
  } catch (e) {
    console.log(e);
  }
  try {
    $('.menudrop > .menuleft > a').hover(function () {
      if ($(this).parent().hasClass('active')) {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().find('.nav-content').removeClass('active');
        $(this).parent().removeClass('active');
      } else {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().find('.nav-content').removeClass('active');
        $(this).parent('li').addClass('active');
        $(this).parent().find('.nav-content').addClass('active');
      }
    });
    /////////////////
    $('.navmain-device').on('click', function () {
      $('.device-search').removeClass('device-search-visible');
      $(this).toggleClass('devicem-active');
    });
    var hide = true;
    $('html').on("click", function () {
      if (hide) $('.navmain-device').removeClass('devicem-active');
      hide = true;
    });
    $('html').on('click', '.navmain-device', function () {
      var self = $(this);
      if (self.hasClass('devicem-active')) {
        $('.navmain-device').removeClass('devicem-active');
        return false;
      }
      $('.navmain-device').removeClass('devicem-active');
      self.toggleClass('devicem-active');
      hide = false;
    });
  } catch (e) {
    console.log(e);
  }
  try {
    $('#search').on('focus', function () {
      $('.topheader').css('z-index', '51');
      $('html').css('overflow-y', 'hidden');
      $('.navmain').addClass('navmain-pointer');
    });
    $('.morphsearch-close').on('click', function () {
      $('.topheader').css('z-index', '55');
      $('html').css('overflow-y', 'auto');
      $('.navmain').removeClass('navmain-pointer');
    });
  } catch (e) {
    console.log(e);
  }
});
(function () {
  $('.navmain').click(function () {
    $('.main-menu').toggleClass('menutrans');
    $(this).toggleClass('active1');
    $('.menu-overlay').fadeToggle();
  });
  $(document).on('click', '.menu-overlay', function () {
    $('.main-menu').removeClass('menutrans');
    $('.menu-overlay').fadeOut();
    $('.navmain').removeClass('active1');
  });
  $(document).on('focus', '.morphsearch-input', function () {
    $('.main-menu').removeClass('menutrans');
    $('.menu-overlay').fadeOut();
    $('.navmain').removeClass('active1');
  });
}).call(void 0);
$(document).scroll(function () {
  if ($(document).scrollTop() >= 10) {
    $('.backtop-box').fadeIn();
    $('.talktobig, .callus').hide();
    $('.talktosmall').fadeIn();
    $('.talkto-veer').addClass('taktosmall-width');
  } else {
    $('.backtop-box').hide();
    $('.talktobig, .callus').fadeIn();
    $('.talktosmall').hide();
    $('.talkto-veer').removeClass('taktosmall-width');
  }
});
(function ($) {
  function mediaSize() {
    if (window.matchMedia('(max-width: 990px)').matches) {
      $(document).scroll(function () {
        if ($(document).scrollTop() >= 5) {
          // $('.mainheader').addClass('fixedActice');
          // $('.main').addClass('toppadding');
          $('.mp-pusher').addClass('pushmenu-space');
        } else {
          // $('.mainheader').removeClass('fixedActice');
          // $('.main').removeClass('toppadding');
          $('.mp-pusher').removeClass('pushmenu-space');
        }
      });
    } else {}
  }
  ;
  mediaSize();
  window.addEventListener('resize', mediaSize, false);
})(jQuery);
///////////////////////////

/////////////////vdoytube///////////////////
$(document).ready(function () {
  var $videoSrc;
  var $mpVideoSrc;
  $('.video-btn').click(function () {
    $videoSrc = $(this).attr("data-src");
  });
  $('.videoMpBtn').click(function () {
    $mpVideoSrc = $(this).attr("data-src");
  });
  $('#myModal').on('shown.bs.modal', function (e) {
    $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
  });
  $('#myModal').on('hide.bs.modal', function (e) {
    $("#video").attr('src', $videoSrc);
  });
  $('#videoModal').on('shown.bs.modal', function (e) {
    $("#videoModal video").attr('src', $mpVideoSrc);
  });
  $('#videoModal').on('hide.bs.modal', function (e) {
    $("#videoModal video").attr('src', "");
  });
});
///////////////////talk/////////////////////////
function checkOffset() {
  try {
    if ($(window).width() >= 767 && $('.talkto-veer').length > 0) {
      if ($('.talkto-veer').offset().top + $('.talkto-veer').height() >= $('footer').offset().top - 10) $('.talkto-veer').css('position', 'absolute');
      if ($(document).scrollTop() + window.innerHeight < $('footer').offset().top) $('.talkto-veer').css('position', 'fixed');
    }
    if ($(window).width() >= 767 && $('.talkto-veer').length > 0) {
      if ($('.backtop-box').offset().top + $('.backtop-box').height() >= $('footer').offset().top - 150) $('.backtop-box').css('position', 'absolute');
      if ($(document).scrollTop() + window.innerHeight < $('footer').offset().top) $('.backtop-box').css('position', 'fixed');
    }
  } catch (e) {
    console.log(e);
  }
}
$(document).scroll(function () {
  checkOffset();
});

//////////////////////append//////////////////////

function moveDiv() {
  if ($(window).width() <= 767) {
    $(".microphone-button").appendTo($(".bottom-grey-center"));
    $(".talkto-veer").appendTo($(".bottom-grey-right"));
    // $(".morphsearch").appendTo($(".bottom-grey-left"));
    $(".topheader ul.formwrap li").appendTo($("ul.farmer-drop"));
  }
}
moveDiv();
$(window).resize(moveDiv);

////////////////////bottomdevice/////////////////////////
var lastScrollTop = 0;
window.addEventListener("scroll", function () {
  var st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    document.getElementById("bottom-box").style.bottom = "-100%";
  } else {
    document.getElementById("bottom-box").style.bottom = "0";
  }
  lastScrollTop = st;
}, false);
$(document).ready(function () {
  $('.dsearch-btn').click(function () {
    $('.device-search').addClass('device-search-visible');
    $('html').css('overflow-y', 'hidden');
  });
  $('.close-search-device').click(function () {
    $('.device-search').removeClass('device-search-visible');
    $('html').css('overflow-y', 'auto');
  });
  if (window.location.href.indexOf('international-ventures') > -1) {
    $('.tabsbusiness .nav-item').eq(1).trigger('click');
  }
  ;
  if (window.location.href.indexOf('headoffice') > -1 || window.location.href.indexOf('marketingoffices') > -1 || window.location.href.indexOf('productionunits') > -1) {
    $('html, body').animate({
      scrollTop: $('.address-mapwrap .reach-address-filter').offset().top - $('#mainMenuBar-home').outerHeight()
    }, 500);
  }
  ;
});

////////////////
$(window).on('load', function () {
  $('#preloader').fadeOut(500);

  /* home hero slider */
  $('.home-top-slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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
  /* end home hero slider */
  /* sfr slider */
  $('.sfr-slider-product').slick({
    dots: false,
    infinite: true,
    lazyLoad: 'ondemand',
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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

  /*meet our farmer*/
  if ($('.plot-demo-videowrap').length > 0) {
    $('.mof-plotdemo').slick({
      centerMode: true,
      slidesToShow: 3,
      variableWidth: true,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [{
        breakpoint: 800,
        settings: {
          arrows: true,
          centerMode: false,
          slidesToShow: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: false,
          slidesToShow: 1,
          variableWidth: false
        }
      }]
    });
  }

  /* sfr slider */
  $('.cooperative-topslider').slick({
    dots: false,
    lazyLoad: 'ondemand',
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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

  /* end home hero slider */

  // ///// Start cooperative slider
  $('.cooperatModelSlider').slick({
    dots: false,
    infinite: true,
    lazyLoad: 'ondemand',
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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
  ///// End cooperative slider

  $(".nav1scroll").click(function () {
    $('html,body').animate({
      scrollTop: $("#section2").offset().top
    }, 1000);
    $('#section2').addClass('section2padding');
  });
  $(".navscroll-cooperative").click(function () {
    $('html,body').animate({
      scrollTop: $("#stick-onclickarrow").offset().top
    }, 1000);
  });

  /*******Slider bottom Slider with TAbs *******/

  /////////
  $('.slider-for1').slick({
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    asNavFor: '.slider-nav1'
  });
  $('.slider-nav1').slick({
    slidesToShow: 4,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    asNavFor: '.slider-for1',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    speed: 300,
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
  /////////
  $('.slider-for2').slick({
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    asNavFor: '.slider-nav2'
  });
  $('.slider-nav2').slick({
    slidesToShow: 4,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    asNavFor: '.slider-for2',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    speed: 300,
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
  /////////
  $('.slider-for3').slick({
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    asNavFor: '.slider-nav3'
  });
  $('.slider-nav3').slick({
    slidesToShow: 4,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    asNavFor: '.slider-for3',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    speed: 300,
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
  /////////
  $('.slider-for4').slick({
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    asNavFor: '.slider-nav4'
  });
  $('.slider-nav4').slick({
    slidesToShow: 4,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    asNavFor: '.slider-for4',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    speed: 300,
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
  /////////
  $('.slider-for5').slick({
    slidesToShow: 1,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    asNavFor: '.slider-nav5'
  });
  $('.slider-nav5').slick({
    slidesToShow: 4,
    lazyLoad: 'ondemand',
    slidesToScroll: 1,
    asNavFor: '.slider-for5',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    speed: 300,
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
  /*******Slider bottom Slider with TAbs *******/

  /* Product slider single */
  $('.singleslider').slick({
    dots: false,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    fade: true,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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
  /* Product slider single */

  /* farmerslider single */
  $('.farmerslider').slick({
    lazyLoad: 'ondemand',
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
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
  /* farmerslider single */

  /* farmerslider single */
  $('.searchbox-slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [{
      breakpoint: 1030,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
      }
    }]
  });
  /* farmerslider single */

  /* ticker slider */
  $('.tickerslider').slick({
    dots: false,
    lazyLoad: 'ondemand',
    infinite: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 450,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }]
  });
  /* ticker slider */
  /* also like product description */
  $('.alsolike-slider').slick({
    dots: false,
    lazyLoad: 'ondemand',
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });

  /* awards-detail slider */

  $('.awardsdetail-slider').slick({
    centerMode: true,
    lazyLoad: 'ondemand',
    slidesToShow: 3,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [{
      breakpoint: 800,
      settings: {
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        variableWidth: false
      }
    }, {
      breakpoint: 480,
      settings: {
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        variableWidth: false
      }
    }]
  });

  /* end home hero slider */
  /* faqs slider */
  $('.faqs-product-slider').slick({
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false
      }
    }, {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        infinite: true
      }
    }, {
      breakpoint: 450,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        infinite: true
      }
    }]
  });
  /* farmerslider single */
  /*production unit slider*/
  $('.production_slider').slick({
    centerMode: true,
    slidesToShow: 3,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [{
      breakpoint: 767,
      settings: {
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        variableWidth: false
      }
    }, {
      breakpoint: 480,
      settings: {
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        variableWidth: false
      }
    }]
  });

  /*production unit gallery slider*/
  $('.gallerySlider').slick({
    centerMode: false,
    slidesToShow: 3,
    variableWidth: true,
    autoplay: true,
    infinite: false,
    loop: true,
    autoplaySpeed: 3000,
    responsive: [{
      breakpoint: 767,
      settings: {
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        variableWidth: false
      }
    }, {
      breakpoint: 480,
      settings: {
        arrows: true,
        centerMode: false,
        slidesToShow: 1,
        variableWidth: false
      }
    }]
  });

  ///////////// milestone slider /////////////////////

  $('.slider-for-insidemile').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav-insidemile',
    // autoplaySpeed: 8000,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
    // speed:1000,
    // autoplay: true,
    // infinite: true,
  });
  $('.slider-nav-insidemile').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-for-insidemile',
    dots: false,
    arrows: false,
    centerMode: false,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 8000,
    responsive: [{
      breakpoint: 990,
      settings: {
        slidesToShow: 1
      }
    }]
  });
});

//////////////place///////////
$(function () {
  $('#searchbox-faq, #searchbox-media').data('holder', $('#searchbox-faq, #searchbox-media').attr('placeholder'));
  $('#searchbox-faq, #searchbox-media').focusin(function () {
    $(this).attr('placeholder', '');
  });
  $('#searchbox-faq, #searchbox-media').focusout(function () {
    $(this).attr('placeholder', $(this).data('holder'));
  });
  $('#tab_selector').on('change', function (e) {
    $('.tabs-faq li a').eq($(this).val()).tab('show');
  });
  $(".backtop-box").on('click', function () {
    $("html, body").animate({
      scrollTop: 0
    }, 1000);
  });
});
//////////////////////
function stickymenutop() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#footer").length > 0 ? $("#footer").offset().top - 100 : "";
  var div_top = $('#mainMenuBarAnchor-home').length > 0 ? $('#mainMenuBarAnchor-home').offset().top - 0 : "";
  var div_height = $("#mainMenuBar-home").height();
  var padding = 20;
  if (window_top + div_height > footer_top - padding) {
    $('#mainMenuBar-home').css({
      top: 0
    });
    $('.startTalkingPopup').css({
      top: ($('#mainMenuBar-home').outerHeight() - footer_top + padding) * -1
    });
  } else if (window_top > div_top) {
    $('#mainMenuBar-home').addClass('stick-topmenu');
    $('header').addClass('stick-header');
    $('#mainMenuBar-home').css({
      top: 0
    });
    $('.startTalkingPopup').css({
      top: $('#mainMenuBar-home').outerHeight()
    });
  } else {
    $('#mainMenuBar-home').removeClass('stick-topmenu');
    $('header').removeClass('stick-header');
    $('.startTalkingPopup').css({
      top: $('.topheader').outerHeight() + $('#mainMenuBar-home').outerHeight()
    });
  }
}
$(function () {
  $(window).scroll(stickymenutop);
  stickymenutop();
});
///////////////////////
$(function () {
  var t;
  var ani;
  if ($(window).width() > 990) {
    $('.iv').on('inview', function (event, isInView) {
      if (isInView) {
        t = $(this).attr("data-time") ? $(this).attr("data-time") : 0;
        $(this).delay(t).queue(function () {
          ani = $(this).attr("class").match(/iv\-([A-Za-z]+)/);
          $(this).addClass('animated ' + ani[1]);
          $(this).css('opacity', 1);
        });
      } else {
        ani = $(this).attr("class").match(/iv\-([A-Za-z]+)/);
        $(this).removeClass('animated ' + ani[1]);
        $(this).css('opacity', 0);
        $(this).dequeue();
      }
    });
  }
});
//////
/* also like product description */
/* iffco live */
function iffcoliveSliderFunc(slideClass) {
  $slickSlider = $(slideClass);
  $slickSlider.slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true
      }
    }, {
      breakpoint: 990,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 850,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 650,
      settings: {
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true
      }
    }]
  });
}
/* iffco live */

$(function () {
  $('.lazy').lazy({
    effect: "fadeIn",
    effectTime: 1000,
    threshold: 0
  });
  $('.tablink_slider').slick({
    //centerMode: false,
    slidesToShow: 8,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: false,
    dots: false,
    infinite: true,
    speed: 300,
    arrows: true,
    loop: false
  });
  // $('.covidStateTab .awardsdetail-slider').slick({
  //    slidesToShow: 1,
  //   slidesToScroll: 1,

  // });

  $('.covidStateTab .tablinks-md .nav-link').click(function () {
    $('.covidStateTab .tablinks-md .nav-link').removeClass('active');
  });
});
window.onload = function () {
  if ($('.locations_slider_wrap').length > 0) {
    $('.locations_slider_wrap').css('visibility', 'visible');
  }
};