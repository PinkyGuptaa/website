"use strict";

function sticky_relocateMenu() {
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
function stickyRelocateProduct() {
  var window_top = $(window).scrollTop();
  var footer_top = $("#footer").offset().top - 500;
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
$(function () {
  if ($('#mainMenuBar-prod').length && $('#oursoul').length) {
    $(window).scroll(sticky_relocateMenu);
    sticky_relocateMenu();
  } else {
    if ($('#mainMenuBar-prod').length) {
      $(window).scroll(stickyRelocateProduct);
      stickyRelocateProduct();
    }
  }
});
//////////

$(window).on("load", function (e) {
  $(".wherebuy-mapaddres-box").mCustomScrollbar({
    theme: "inset-dark"
  });
});
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
  $('#onloadModal').modal('show');
  //////////////
  // $('.filterprod-link').on('click', function(){
  //   $('.filter-optionbox').addClass('open-filter');  
  //   $('.filterprod-link').hide();
  //   $('.submitbtn').show().css("display","block");
  //   $('.filter-close').fadeIn();
  // });
  // $('.filter-close').on('click', function(){
  //   $('.filter-optionbox').removeClass('open-filter');
  //   $('.filterprod-link').show();
  //   $('.submitbtn').hide();
  //   $('.filter-close').fadeOut();
  // });
  ///////
  // var checkboxes = $(".filter-check input[type='checkbox']"),
  //   actions = $(".filterdot");
  //   checkboxes.click(function() {
  //     actions.attr("hidden", !checkboxes.is(":checked"));					
  //   });
});