!function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    "use strict";
    var e = !1 === t.support.optSelected
      , o = {};
    function i(i) {
        var s, n, l = o[t(this).prop("stickOnScroll")];
        for (s = 0,
        n = l.length; s < n; s++)
            !function(o) {
                var i, n, r, c, p, f;
                null === (o = l[s]) || t.contains(document.documentElement, o.ele[0]) || (l[s] = o = null),
                null !== o && (i = o.viewport.scrollTop(),
                n = o.getEleMaxTop(),
                !1 === o.isWindow && e && o.ele.stop(),
                i >= n ? (r = {
                    position: "fixed",
                    top: o.topOffset - o.eleTopMargin
                },
                !1 === o.isWindow && (r = {
                    position: "absolute",
                    top: i + o.topOffset - o.eleTopMargin
                }),
                o.isStick = !0,
                o.footerElement.length && (c = o.getEleTopPosition(o.footerElement),
                p = o.ele.outerHeight(),
                f = r.top + p + o.bottomOffset + o.topOffset,
                !1 === o.isWindow ? f = p + o.bottomOffset + o.topOffset : (f = r.top + i + p + o.bottomOffset,
                c = o.getElementDistanceFromViewport(o.footerElement)),
                f > c && (!0 === o.isWindow ? r.top = c - (i + p + o.bottomOffset) : r.top = i - (f - c))),
                !0 === o.setParentOnStick && o.eleParent.css("height", o.eleParent.height()),
                !0 === o.setWidthOnStick && o.ele.css("width", o.ele.css("width")),
                o.isViewportOffsetParent || (r.top = r.top - o.getElementDistanceFromViewport(o.eleOffsetParent)),
                e && !1 === o.isWindow ? o.ele.addClass(o.stickClass).css("position", r.position).animate({
                    top: r.top
                }, 150) : o.ele.css(r).addClass(o.stickClass),
                !1 === o.wasStickCalled && (o.wasStickCalled = !0,
                setTimeout(function() {
                    !0 === o.isOnStickSet && o.onStick.call(o.ele, o.ele),
                    o.ele.trigger("stickOnScroll:onStick", [o.ele])
                }, 20))) : i <= n && o.isStick && (o.ele.css({
                    position: "",
                    top: ""
                }).removeClass(o.stickClass),
                o.isStick = !1,
                !0 === o.setParentOnStick && o.eleParent.css("height", ""),
                !0 === o.setWidthOnStick && o.ele.css("width", ""),
                o.wasStickCalled = !1,
                setTimeout(function() {
                    o.isOnUnStickSet && o.onUnStick.call(o.ele, o.ele),
                    o.ele.trigger("stickOnScroll:onUnStick", [o.ele])
                }, 20)),
                0 === i && o.setEleTop())
            }(l[s]);
        return this
    }
    t.fn.stickOnScroll = function(e) {
        return this.each(function() {
            if (t(this).hasClass("hasStickOnScroll"))
                return this;
            var s, n, l = t.extend({}, {
                topOffset: 0,
                bottomOffset: 5,
                footerElement: null,
                viewport: window,
                stickClass: "stickOnScroll-on",
                setParentOnStick: !1,
                setWidthOnStick: !1,
                onStick: null,
                onUnStick: null
            }, e), r = 1800;
            function c() {
                l.setEleTop(),
                s = l.viewport.prop("stickOnScroll"),
                l.isWindow || (l.isViewportOffsetParent = l.eleOffsetParent[0] === l.viewport[0]),
                s || (s = "stickOnScroll" + String(Math.random()).replace(/\D/g, ""),
                l.viewport.prop("stickOnScroll", s),
                o[s] = [],
                l.viewport.on("scroll", i)),
                o[s].push(l),
                l.viewport.trigger("scroll")
            }
            return l.isStick = !1,
            l.ele = t(this).addClass("hasStickOnScroll"),
            l.eleParent = l.ele.parent(),
            l.eleOffsetParent = l.ele.offsetParent(),
            l.viewport = t(l.viewport),
            l.eleTop = 0,
            l.eleTopMargin = parseFloat(l.ele.css("margin-top") || 0) || 0,
            l.footerElement = t(l.footerElement),
            l.isWindow = !0,
            l.isOnStickSet = t.isFunction(l.onStick),
            l.isOnUnStickSet = t.isFunction(l.onUnStick),
            l.wasStickCalled = !1,
            l.isViewportOffsetParent = !0,
            l.setEleTop = function() {
                !1 === l.isStick && (l.isWindow ? l.eleTop = l.ele.offset().top : l.eleTop = l.ele.offset().top - l.viewport.offset().top)
            }
            ,
            l.getEleTopPosition = function(t) {
                var e = 0;
                return l.isWindow ? t.offset().top : t.offset().top - l.viewport.offset().top
            }
            ,
            l.getEleMaxTop = function() {
                var t = l.eleTop - l.topOffset;
                return l.isWindow || (t += l.eleTopMargin),
                t
            }
            ,
            l.getElementDistanceFromViewport = function(t) {
                var e = t.position().top
                  , o = t.offsetParent();
                return o.is("body") || o.is("html") || (o[0] !== l.viewport[0] ? e += l.getElementDistanceFromViewport(o) : e += l.viewport.scrollTop()),
                e
            }
            ,
            !0 === l.setParentOnStick && l.eleParent.is("body") && (l.setParentOnStick = !1),
            t.isWindow(l.viewport[0]) || (l.isWindow = !1),
            l.ele.is(":visible") ? c() : n = setInterval(function() {
                (l.ele.is(":visible") || !r) && (clearInterval(n),
                c()),
                --r
            }, 100),
            this
        })
    }
});
