window.dsnSwiper = [];
const wind = jQuery(window),
    body = jQuery("body"),
    dsnGrid = {
        isMobile: function(e = !0) {
            return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || e && wind.width() <= 991)
        },
        convertToJQuery: function(e) {
            return e instanceof jQuery == !1 ? jQuery(e) : e
        },
        convertTextLine: function(e, t, n = !0) {
            if (e = this.convertToJQuery(e), t = t || e, t = this.convertToJQuery(t), e.find(".dsn-word-wrapper").length > 0) return;
            let o = e.text().replace(/\n/g, "").trim().split(" "),
                i = "";
            e.html("");
            let r = 0,
                s = 0;
            for (let e of o)
                if (0 !== e.length) {
                    if (i += '<div class="dsn-word-wrapper" style="position: relative;display: inline-block;--word-dsn-index:' + r + ';">', n)
                        for (let t = 0; t < e.length; t++) i += '<span class="dsn-chars-wrapper" style="position: relative;display: inline-block;--char-dsn-index:' + s + ';">' + e.charAt(t) + "</span>", s++;
                    else i += e;
                    i += "</div>", r !== o.length - 1 && (i += "&nbsp;"), r++
                }
            t.append(i), i = null, e = null, t = null
        },
        cutterHtml: function(e) {
            (e = this.convertToJQuery(e)).children().each(function(e) {
                $(this).addClass("dsn-html").attr("style", "--html-dsn-index:" + e + ";" + ($(this).attr("style") || ""))
            }), e = null
        },
        removeAttr: function(e, t) {
            if (void 0 === e || void 0 === t) return;
            let n = e.data(t);
            return void 0 !== n && e.removeAttr("data-" + t), n
        },
        getData: function(e, t, n) {
            return (e = this.convertToJQuery(e)).length <= 0 ? n : this.removeAttr(e, "dsn-" + t) || n
        },
        tweenMaxParallax: function(e, t) {
            if (void 0 === e || void 0 === t || null === t) return !1;
            let n = this;
            return {
                addParrlax: function(o) {
                    if (void 0 === o.tween || void 0 === o.id) return !1;
                    if (o.tween._totalDuration <= 0) return !1;
                    let i = n.convertToJQuery(o.id),
                        r = new ScrollMagic.Scene({
                            triggerElement: i.get(0),
                            triggerHook: o.triggerHook || 0,
                            duration: o.duration || "100%",
                            offset: o.offset || 0,
                            reverse: o.reverse || !0
                        });
                    if (!1 !== o.reverse && r.setTween(o.tween), r.addTo(t), !0 === o._fixed) {
                        r.setPin(i.get(0));
                        let t = !1;
                        r.on("enter", function() {
                            t = !0
                        }), r.on("leave", function() {
                            t = !1, i.css("transform", "")
                        }), e.getListener(function() {
                            t && i.css("transform", "translateY(" + e.getScrollbar().offset.y + "px)")
                        }, !1)
                    }
                    return !0 === o.refreshParallax && e.getListener(function() {
                        r.refresh()
                    }, !0), !1 === o.reverse && r.on("enter", function() {
                        void 0 !== o.tween && o.tween.play(), t.removeScene(r), setTimeout(function() {
                            r.destroy(!0), t.destroy(!0), r = null, t = null, o.tween = null, o = null
                        }, 300)
                    }), n = null, !0 !== o._fixed && (i = null), !1 !== o.reverse && (o = null), r
                }
            }
        },
        endAnimate: function(e, t) {
            void 0 !== t && null !== t && (e.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", t), e = t = null)
        },
        elementHover: function(e, t, n) {
            e = this.convertToJQuery(e), (t = this.convertToJQuery(t)).on("mouseenter", function() {
                e.addClass(n)
            }).on("mouseleave", function() {
                e.removeClass(n)
            })
        },
        mouseMove: function(e, t) {
            if (this.isMobile() || void 0 === e || null === e) return;
            e = this.convertToJQuery(e);
            let n = !1;
            body.on("mousemove", function(o) {
                TweenLite.to(e, .5, {
                    left: o.clientX,
                    top: o.clientY
                }), void 0 !== t && void 0 !== t.onUpdate && t.onUpdate(o, o.pageX, o.pageY, e), void 0 !== t && void 0 !== t.onComplete && (n = !0, dsnGrid.endAnimate(e, function(o) {
                    n && t.onComplete(o, e), n = !1
                }))
            })
        },
        moveIcon: function(e, t) {
            (e = this.convertToJQuery(e)).off("mousemove"), e.on("mousemove", function(e) {
                TweenLite.to($(this).find(t), 1, {
                    left: e.pageX,
                    top: e.pageY - jQuery(this).offset().top
                })
            })
        },
        numberText: function(e) {
            return e < 10 && e > 0 ? "0" + e : e
        },
        scrollTop: function(e, t, n, o) {
            n = n || 0;
            let i = 0;
            "number" == typeof e ? i = e : (e = this.convertToJQuery(e)).length && (i = e.get(0).offsetTop), TweenLite.to(window.Scrollbar.get(document.querySelector("#dsn-scrollbar")) || wind, t || 1, {
                scrollTo: {
                    y: i + (n || 0)
                },
                onComplete: o
            }), i = t = e = null
        },
        pageLoad: function(e, t, n, o) {
            let i = window.performance.timing,
                r = -1 * (i.loadEventEnd - i.navigationStart) / 1e3 % 50 * 10,
                s = e,
                a = t > e ? 1 : -1,
                l = Math.abs(Math.floor((r + n) / 100)),
                d = setInterval(function() {
                    o(s += a), s >= t && clearInterval(d)
                }, l);
            return d
        },
        randomObjectArray: function(e, t) {
            return t = t || 100, e.sort(function() {
                return Math.round(Math.random()) * t
            })
        },
        parallaxIt: function(e, t, n, o) {
            if (t.length <= 0) return void(e = t = n = o = null);
            let i = t[0].getBoundingClientRect(),
                r = e.pageX - i.left,
                s = e.pageY - i.top,
                a = window.pageYOffset || document.documentElement.scrollTop;
            o = o || .5, n = n || -1, TweenMax.to(t, o, {
                x: (r - i.width / 2) / i.width * n,
                y: (s - i.height / 2 - a) / i.width * n,
                ease: Power0.easeOut
            }), i = r = s = a = o = n = null
        },
        parallaxMoveElement: function(e, t, n, o, i) {
            let r = e.target || e,
                s = e.element || e.target || e;
            if (!s.length) return;
            n = void 0 === n ? .5 : parseFloat(n), t = void 0 === t ? 20 : parseFloat(t);
            let a = $('<div class="icon-circle"></div>');
            r.append(a), r.off("mouseleave"), r.off("mouseenter"), r.off("mousemove"), r.on("mouseleave", function(e) {
                let t = {
                    x: 0,
                    y: 0,
                    ease: Back.easeOut.config(4)
                };
                i && (t.scale = 1);
                let n = [s, a];
                o && n.push(o), TweenLite.to(n, 1, t), t = null, n = null
            }).on("mouseenter", function(e) {
                let t = {
                    transformOrigin: "0 0"
                };
                i && (t.scale = "1.03"), TweenLite.to([s, a], .3, t), t = null
            }).on("mousemove", function(e) {
                dsnGrid.parallaxIt(e, s, t, n), dsnGrid.parallaxIt(e, a, 2 * t, n), void 0 !== o && dsnGrid.parallaxIt(e, o, -5, .5)
            })
        },
        removeWhiteSpace: function(e) {
            (e = this.convertToJQuery(e)).contents().filter(function() {
                return 3 === this.nodeType
            }).remove(), e = null
        },
        cookie: function() {
            return {
                set: function(e, t, n) {
                    let o = new Date;
                    o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
                    let i = "expires=" + o.toUTCString();
                    document.cookie = e + "=" + t + ";" + i + ";path=/", o = i = e = t = n = null
                },
                get: function(e) {
                    let t = e + "=",
                        n = decodeURIComponent(document.cookie),
                        o = n.split(";");
                    for (let e = 0; e < o.length; e++) {
                        let i = o[e];
                        for (;
                            " " === i.charAt(0);) i = i.substring(1);
                        if (0 === i.indexOf(t)) {
                            let e = i.substring(t.length, i.length);
                            return i = o = n = t = null, e
                        }
                    }
                    return o = n = t = null, !1
                },
                remove: function(e) {
                    this.set(e, "", -1)
                }
            }
        },
        destorySwiper: function() {
            for (let e of window.dsnSwiper) {
                if ("function" == typeof e.destroy) try {
                    e.destroy()
                } catch (e) {
                    console.log()
                }
                e = null
            }
            window.dsnSwiper = []
        },
        backgroundPosition: function(e, t, n) {
            var o, i, r, s, a;
            return e instanceof jQuery == !1 && (e = jQuery(e)), n = this.getUndefinedVal(n, {}), o = this.getUndefinedVal(n.sizeX, "105%"), i = this.getUndefinedVal(n.sizeY, "105%"), s = this.getUndefinedVal(n.left, "-5%"), a = this.getUndefinedVal(n.top, "-5%"), r = this.getUndefinedVal(n.move, 100), e.css({
                width: o,
                height: i,
                left: s,
                top: a,
                backgroundPositionX: "calc(50% - " + -2 * r + "px)",
                backgroundPositionY: "calc(50% - " + -2 * r + "px)"
            }), t = this.getUndefinedVal(t, 1), e.parent().on("mousemove", function(o) {
                if (void 0 !== n.dataActive && jQuery(this).find(e).hasClass(n.dataActive)) return !1;
                var i = o.clientX / jQuery(this).width() - .5,
                    s = o.clientY / jQuery(this).height() - .5;
                TweenLite.to(jQuery(this).find(e), t, {
                    transformPerspective: 100,
                    x: r * i + r + " ",
                    y: r * s + r + ""
                }), void 0 !== n.onEnter && n.onEnter(jQuery(this), o)
            }).on("mouseleave", function(o) {
                TweenMax.to(jQuery(this).find(e), t, {
                    x: r,
                    y: r,
                    ease: Back.easeOut.config(4)
                }), void 0 !== n.onLeave && n.onLeave(jQuery(this), o)
            }), dsnGrid
        },
        scaleIt: function(e, t, n) {
            if (void 0 === t) return !1;
            var o = 0;
            o = body.hasClass("dsn-effect-scroll") ? e.scrollTop : e.scrollTop();
            var i, r, s;
            s = this.getUndefinedVal(n.plus, 0), i = this.getUndefinedVal(n.position, !1);
            var a = t.offset();
            r = void 0 === a || body.hasClass("dsn-effect-scroll") ? 0 : a.top, i && (r -= o);
            return o / (t.height() + r + s)
        },
        scrollerIt: function(e, t, n) {
            if (void 0 === t) return !1;
            var o, i, r, s = e.scrollTop();
            r = this.getUndefinedVal(n.duration, 0), i = this.getUndefinedVal(n.plus, 0);
            var a = t.offset();
            o = void 0 !== a ? a.top : 0, o += r;
            var l = t.height() + o + i;
            if (o <= s && void 0 !== n.action) {
                var d = o - s,
                    c = d / l,
                    u = s / (t.height() + o + i);
                n.action({
                    scroll: d,
                    position: c,
                    targetEnd: l,
                    ScrollTop: s,
                    num: u
                })
            }
            return u
        },
        setPositionMoveSection: function(e, t, n) {
            if (void 0 !== e) {
                var o = e.offset(),
                    i = void 0 === o ? 0 : o.top;
                t = dsnGrid.getUndefinedVal(t, 2), n = dsnGrid.getUndefinedVal(n, 0);
                var r = (e.innerHeight() + i + n) / 2;
                e.css({
                    marginBottom: r / t * -1
                })
            }
        },
        mouseWheel: function(e, t, n) {
            e.bind("mousewheel DOMMouseScroll", function(e) {
                e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? void 0 !== n && n(e) : void 0 !== t && t(e)
            })
        },
        convertTextWord: function(e, t, n) {
            var o = e.html().trim().split(" "),
                i = "";
            e.html("");
            for (var r = 0; r < o.length; r++)
                if (o[r].length > 0) {
                    if (i += '<span class="dsn-wrapper">', n) {
                        i += '<span class="dsn-word-wrapper">';
                        for (var s = 0; s < o[r].length; s++) i += '<span class="dsn-chars-wrapper">' + o[r].charAt(s) + "</span>";
                        i += "</span>"
                    } else i += '<span class="dsn-word-wrapper">' + o[r] + "</span>";
                    i += "</span>"
                }
            t.append(i)
        },
        getRndInteger: function(e, t) {
            return Math.floor(Math.random() * (t - e)) + e
        },
        parallaxMoveElemntCir: function(e, t, n, o, i) {
            var r = e,
                s = this;
            n = void 0 === n ? .5 : parseFloat(n), t = void 0 === t ? 20 : parseFloat(t), i = void 0 !== i && i;
            var a = r.html(),
                l = $('<div class="icon-circle"></div>'),
                d = $('<div class="dsn-grid-parallax">' + a + "</div>");
            r.html(""), r.append(l), r.append(d), r.on("mouseleave", function(e) {
                TweenMax.to(r, n, {
                    scale: 1
                }), TweenMax.to(d, .3, {
                    scale: 1,
                    x: 0,
                    y: 0
                }), TweenMax.to(l, n, {
                    scale: 1,
                    x: 0,
                    y: 0
                })
            }).on("mouseenter", function(e) {
                TweenMax.to(r, n, {
                    transformOrigin: "0 0",
                    scale: 1
                }), TweenMax.to(l, n, {
                    scale: 1.2
                })
            }).on("mousemove", function(e) {
                s.parallaxIt(e, d, t), dsnGrid.parallaxIt(e, l, t)
            })
        },
        changeSizeText: function(e, t) {
            e instanceof jQuery == !1 && (e = jQuery(e)), e.each(function() {
                var e = jQuery(this);
                for (var n in t) e.text().length >= parseInt(n) && (console.log(t[n]), e.css(t[n]))
            })
        },
        animateText: function(e, t, n, o) {
            function i() {
                t.each(function() {
                    let e = $(this);
                    if (e.hasClass(r)) return;
                    let t = e.offset().top;
                    void 0 !== t && s > t - (wind.height() - 100) && (e.hasClass(r) || e.addClass(r))
                })
            }(t = this.convertToJQuery(t)).each(function() {
                let e = $(this);
                dsnGrid.convertTextWord(e, e), void 0 !== n && e.attr(n, "animate"), void 0 !== o && e.removeClass(o), e.addClass("dsn-has-animate-text")
            });
            const r = "dsn-animate";
            var s = 0,
                a = null;
            e.getListener(function(e) {
                s = void 0 === e.offset ? wind.scrollTop() : 0, a && clearTimeout(a), a = setTimeout(i, 10)
            })
        },
        getBoundingClientRect: function(e) {
            const t = e.getBoundingClientRect();
            return {
                top: t.top,
                right: t.right,
                bottom: t.bottom,
                left: t.left,
                width: t.width,
                height: t.height,
                x: t.x,
                y: t.y
            }
        },
        progressCircle: function(e) {
            const t = $('[data-dsn-grid="progress-circle"]'),
                n = this.removeAttr(t, "data-dsn-grid-stroke");
            var o = void 0 === n ? "" : 'stroke="' + n + '"';
            t.css({
                position: "fixed",
                right: "-60px",
                bottom: "60px",
                width: "52px",
                height: "52px",
                "z-index": "99999999"
            }), t.append('<svg class="dsn-progress-circle-up" width="100%" height="100%" ' + o + ' viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet" fill="none">\n        <path class="dsn-progress-path" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style="transition:  stroke-dashoffset 300ms linear 0s;stroke-dasharray: 307.919, 307.919; stroke-dashoffset: 309;"></path>    </svg>');
            var i = wind;
            e.isScroller(!0) && (i = e.getScrollbar()), e.getListener(function(e) {
                let n = 0,
                    o = $(document).height() - wind.height();
                void 0 === e.offset ? n = wind.scrollTop() : (n = e.offset.y, o = $(document).height() - i.getSize().content.height + 100), n > 70 ? (TweenMax.to(t, 1, {
                    ease: Back.easeOut.config(4),
                    right: 60
                }), t.find(".dsn-progress-path").css("stroke-dashoffset", 300 - Math.round(300 * n / o) + "%")) : TweenMax.to(t, 1, {
                    ease: Back.easeIn.config(4),
                    right: -60
                })
            }), t.on("click", function() {
                e.isScroller(!0) ? i.scrollTo(0, 0, 600) : $("body,html").animate({
                    scrollTop: 0
                }, 300)
            })
        }
    };