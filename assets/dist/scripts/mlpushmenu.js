!function(e) {
    "use strict";
    function t(e, s) {
        return classie.has(e, s) ? e : e.parentNode && t(e.parentNode, s)
    }
    function s(e, t, s) {
        this.el = e,
        this.trigger = t,
        this.options = function(e, t) {
            for (var s in t)
                t.hasOwnProperty(s) && (e[s] = t[s]);
            return e
        }(this.defaults, s),
        this.support = Modernizr.csstransforms3d,
        this.support && this._init()
    }
    s.prototype = {
        defaults: {
            type: "overlap",
            levelSpacing: 40,
            backClass: "mp-back"
        },
        _init: function() {
            this.open = !1,
            this.level = 0,
            this.wrapper = document.getElementById("mp-pusher"),
            this.levels = Array.prototype.slice.call(this.el.querySelectorAll("div.mp-level"));
            var e = this;
            this.levels.forEach(function(t, s) {
                t.setAttribute("data-level", function e(t, s, l, i) {
                    return i = i || 0,
                    t.id.indexOf(s) >= 0 ? i : (classie.has(t, l) && ++i,
                    t.parentNode && e(t.parentNode, s, l, i))
                }(t, e.el.id, "mp-level"))
            }),
            this.menuItems = Array.prototype.slice.call(this.el.querySelectorAll("li")),
            this.levelBack = Array.prototype.slice.call(this.el.querySelectorAll("." + this.options.backClass)),
            this.eventtype = "click",
            classie.add(this.el, "mp-" + this.options.type),
            this._initEvents()
        },
        _initEvents: function() {
            var e = this
              , s = function(t) {
                e._resetMenu(),
                t.removeEventListener(e.eventtype, s)
            };
            this.trigger.addEventListener(this.eventtype, function(t) {
                t.stopPropagation(),
                t.preventDefault(),
                e.open ? e._resetMenu() : (e._openMenu(),
                document.addEventListener(e.eventtype, function(t) {
                    e.open && !function(e, t) {
                        if (!e)
                            return !1;
                        for (var s = e.target || e.srcElement || e || !1; s && s.id != t; )
                            s = s.parentNode || !1;
                        return !1 !== s
                    }(t.target, e.el.id) && s(this)
                }))
            }),
            this.menuItems.forEach(function(s, l) {
                var i = s.querySelector("div.mp-level");
                i && s.querySelector("a").addEventListener(e.eventtype, function(l) {
                    l.preventDefault();
                    var n = t(s, "mp-level").getAttribute("data-level");
                    e.level <= n && (l.stopPropagation(),
                    classie.add(t(s, "mp-level"), "mp-level-overlay"),
                    e._openMenu(i))
                })
            }),
            this.levels.forEach(function(t, s) {
                t.addEventListener(e.eventtype, function(s) {
                    s.stopPropagation();
                    var l = t.getAttribute("data-level");
                    e.level > l && (e.level = l,
                    e._closeMenu())
                })
            }),
            this.levelBack.forEach(function(s, l) {
                s.addEventListener(e.eventtype, function(l) {
                    l.preventDefault();
                    var i = t(s, "mp-level").getAttribute("data-level");
                    e.level <= i && (l.stopPropagation(),
                    e.level = t(s, "mp-level").getAttribute("data-level") - 1,
                    0 === e.level ? e._resetMenu() : e._closeMenu())
                })
            })
        },
        _openMenu: function(e) {
            ++this.level;
            var t = (this.level - 1) * this.options.levelSpacing
              , s = "overlap" === this.options.type ? this.el.offsetWidth + t : this.el.offsetWidth;
            if (this._setTransform("translate3d(" + s + "px,0,0)"),
            e) {
                this._setTransform("", e);
                for (var l = 0, i = this.levels.length; l < i; ++l) {
                    var n = this.levels[l];
                    n == e || classie.has(n, "mp-level-open") || this._setTransform("translate3d(-100%,0,0) translate3d(" + -1 * t + "px,0,0)", n)
                }
            }
            1 === this.level && (classie.add(this.wrapper, "mp-pushed"),
            this.open = !0),
            classie.add(e || this.levels[0], "mp-level-open")
        },
        _resetMenu: function() {
            this._setTransform("translate3d(0,0,0)"),
            this.level = 0,
            classie.remove(this.wrapper, "mp-pushed"),
            this._toggleLevels(),
            this.open = !1
        },
        _closeMenu: function() {
            var e = "overlap" === this.options.type ? this.el.offsetWidth + (this.level - 1) * this.options.levelSpacing : this.el.offsetWidth;
            this._setTransform("translate3d(" + e + "px,0,0)"),
            this._toggleLevels()
        },
        _setTransform: function(e, t) {
            (t = t || this.wrapper).style.WebkitTransform = e,
            t.style.MozTransform = e,
            t.style.transform = e
        },
        _toggleLevels: function() {
            for (var e = 0, t = this.levels.length; e < t; ++e) {
                var s = this.levels[e];
                s.getAttribute("data-level") >= this.level + 1 ? (classie.remove(s, "mp-level-open"),
                classie.remove(s, "mp-level-overlay")) : Number(s.getAttribute("data-level")) == this.level && classie.remove(s, "mp-level-overlay")
            }
        }
    },
    e.mlPushMenu = s
}(window);
