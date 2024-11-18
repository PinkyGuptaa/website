var chkBindHandler = !0
  , buttonFilter = {
    $filters: null,
    $reset: null,
    groups: [],
    outputArray: [],
    outputString: "",
    init: function() {
        var t = this;
        t.$filters = $("#Filters"),
        t.$reset = $("#Reset"),
        t.$container = $("#Container-filter"),
        t.$filters.find("fieldset").each(function() {
            var e = $(this);
            t.groups.push({
                $buttons: e.find(".filter"),
                $dropdown: e.find("select"),
                active: ""
            })
        }),
        chkBindHandler && t.bindHandlers()
    },
    reset: function() {
        var t = this;
        t.groups = [],
        t.outputArray = [],
        t.outputString = "",
        t.parseFilters()
    },
    bindHandlers: function() {
        chkBindHandler = !1;
        var t = this;
        t.$filters.on("click", ".filter", function(e) {
            e.preventDefault();
            var i = $(this);
            i.hasClass("active") ? i.removeClass("active") : i.addClass("active").siblings(".filter").removeClass("active"),
            t.parseFilters()
        }),
        t.$filters.on("change", function() {
            t.parseFilters()
        }),
        t.$reset.on("click", function(e) {
            e.preventDefault(),
            t.$filters.find(".filter").removeClass("active"),
            t.$filters.find(".show-all").addClass("active"),
            t.$filters.find("select").val(""),
            t.parseFilters()
        })
    },
    parseFilters: function() {
        for (var t, e = 0; t = this.groups[e]; e++)
            t.active = t.$buttons.length ? t.$buttons.filter(".active").attr("data-filter") || "" : t.$dropdown.val();
        this.concatenate()
    },
    concatenate: function() {
        var t = this;
        t.outputString = "";
        for (var e, i = 0; e = t.groups[i]; i++)
            t.outputString += e.active;
        t.outputString.length || (t.outputString = "all"),
        console.log("outputString", t.outputString),
        $(".noRecord").hide(),
        t.$container.mixItUp("isLoaded") && t.$container.mixItUp("filter", t.outputString)
    }
};
function mixup(t) {
    try {
        $(".noRecord").hide(),
        $(t).mixItUp({
            controls: {
                enable: !1
            },
            callbacks: {
                onMixFail: function() {
                    $(".noRecord").show(),
                    console.log("No items were found matching the selected filters.")
                }
            }
        }),
        buttonFilter.init()
    } catch (e) {
        console.log(e)
    }
}
