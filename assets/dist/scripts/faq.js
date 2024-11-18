"use strict";

if (window.location.href.indexOf('/faqs') >= 0) {
  var faqFilterData = function faqFilterData(data) {
    faqSearchData(data, '#faqContentList');
  }; // For FAQ Page : Category HTML
  var faqCategory = function faqCategory(data, id) {
    var html = "";
    var resp = data;
    console.log(resp);
    if (resp.length > 0) {
      resp.forEach(function (obj, index) {
        html += ejs.render("<li role=\"presentation\"><a href=\"#tab1\" class=\"active\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">View All</a></li>\n            <% data.items.forEach( function(item, index) { %>\n                <li role=\"presentation\"><a href=\"#tab1\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\"><%- item.name %></a></li>\n            <% }) %>", {
          data: resp[index]
        });
      });
      $(id).html(html);
    }
    ;
  }; // For FAQ Page : Data HTML
  // For FAQ Page : Filter by Category---
  var filterCategory = function filterCategory(_this, _val) {
    faqFilterApiData = [];
    faqApiData.forEach(function (item) {
      console.log(item.field_tags);
      if (item.field_tags === _val) {
        faqFilterApiData.push(item);
      } else if (_val === 'View All') {
        faqFilterApiData = [];
        faqFilterApiData = faqApiData;
      }
    });
    faqFilterData(faqFilterApiData);
  }; // For FAQ Page : Filter by Category-----------END
  // For FAQ Page : Category HTML For Mobile view
  var faqCategoryMob = function faqCategoryMob(data, id) {
    var html = "";
    var resp = data;
    console.log(resp);
    if (resp.length > 0) {
      resp.forEach(function (obj, index) {
        html += ejs.render("<option role=\"presentation\"><a href=\"#tab1\" class=\"active\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">View All</a></option>\n            <% data.items.forEach( function(item, index) { %>\n                <option><a href=\"#tab1\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\"><%- item.name %></a></option>\n            <% }) %>", {
          data: resp[index]
        });
      });
      $(id).html(html);
    }
    ;
  }; // For FAQ Page : Category HTML For Mobile view
  var faqSearchData = function faqSearchData(data, id) {
    var html = "";
    var resp = data;
    resp.forEach(function (obj, index) {
      html = ejs.render("<% data.forEach( function(item, index) { %><div class=\"card rounded-0\">\n            <div class=\"card-header\" role=\"tab\" id=\"faqtxt<%- index %>\">\n                <h5 class=\"mb-0\">\n                    <a data-toggle=\"collapse\" href=\"#faq<%- index %>\" aria-expanded=\"<%- index === 0 ? \"true\" : \"false\" %>\" aria-controls=\"collapse1-1\">\n                        <%- item.title %>\n                    </a>\n                </h5>\n            </div>\n            <div id=\"faq<%- index %>\" class=\"collapse <%- index === 0 ? \"show\" : \"\" %>\" role=\"tabpanel\" aria-labelledby=\"faqtxt<%- index %>\" data-parent=\"#accordion\">\n                <div class=\"card-body\">\n                    <%- item.body %>\n                </div>\n            </div>\n        </div><% }) %>", {
        data: resp
      });
    });
    $(id).html(html);
  };
  var faqApiData;
  var faqFilterApiData = [];
  var inputSearchData = [];
  // FAQ Page API Function
  $(window).bind("load", function () {
    try {
      if (window.location.href.indexOf('/en/faqs') || window.location.href.indexOf('/hi/faqs') >= 0) {
        try {
          $.get("/api/faqsCategory", function (data, status) {
            try {
              if (status) {
                var resp = data;
                faqCategory(resp, '#liFaqList');
                faqCategoryMob(resp, '#tab_selector');
              } else {
                $('#liFaqList').html("");
              }
            } catch (e) {
              console.log(e);
            }
          });
          $.get("/api/faqs", function (data, status) {
            try {
              if (status) {
                var resp = data;
                faqApiData = resp;
                faqFilterData(faqApiData);
              } else {
                $('#faqSearchSec').html("");
              }
            } catch (e) {
              console.log(e);
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
  $(function () {
    $(document).on('click', '#liFaqList li', function () {
      var _this = $(this);
      var _val = $(this).find('a').text();
      filterCategory(_this, _val);
    });
    $(document).on('change', '.faq-select #tab_selector', function () {
      var _this = $(this);
      var _val = $(this).val();
      filterCategory(_this, _val);
    });
    $(document).on('keyup', '#faqSearchSec input', function () {
      inputSearchData = [];
      var inputVal = $(this).val().toLowerCase();
      if (inputVal.length > 2) {
        $('#faqSearchSec .faq-search-close-icon').fadeIn();
        if (faqFilterApiData.length === 0) {
          faqApiData.forEach(function (item) {
            var quesLover = item.title.toLowerCase();
            if (quesLover.indexOf(inputVal) > -1) {
              inputSearchData.push(item);
            }
          });
          faqFilterData(inputSearchData);
        } else {
          faqFilterApiData.forEach(function (item) {
            var quesLover = item.title.toLowerCase();
            if (quesLover.indexOf(inputVal) > -1) {
              inputSearchData.push(item);
            }
          });
          faqFilterData(inputSearchData);
        }
      } else {
        $('#faqSearchSec .faq-search-close-icon').fadeOut();
        if (faqFilterApiData.length === 0) {
          faqFilterData(faqApiData);
        } else {
          faqFilterData(faqFilterApiData);
        }
      }
      if ($('#faqContentList .card').length === 0) {
        $('#faqContentList').append("<div class='noRecordFound'>No Records</div>");
      }
    });
    $('#faqSearchSec .faq-search-close-icon').click(function (e) {
      e.preventDefault();
      if (faqFilterApiData.length === 0) {
        faqFilterData(faqApiData);
      } else {
        faqFilterData(faqFilterApiData);
      }
      $(this).prev('input').val('');
      $(this).fadeOut();
      console.log(faqFilterApiData.length);
    });
  });
}