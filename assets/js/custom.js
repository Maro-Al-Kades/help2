function background() {
    $(".cover-bg, section , [data-image-src]").each(function() {
        var e = $(this).attr("data-image-src");
        void 0 !== e && !1 !== e && $(this).css("background-image", "url(" + e + ")")
    })
}

function initMap() {
    let e = $(".map-custom");
    if (!e.length) return void(e = null);
    if (!$("#map_api").length) {
        let e = "AIzaSyA5bpEs3xlB8vhxNFErwoo3MXR64uavf6Y",
            t = document.createElement("script");
        t.type = "text/javascript", t.id = "map_api", t.src = "https://maps.googleapis.com/maps/api/js?key=" + e, document.body.appendChild(t), e = t = null
    }
    setTimeout(function() {
        e.each(function() {
            try {
                let t = dsnGrid.getData(this, "lat"),
                    n = dsnGrid.getData(this, "len"),
                    i = dsnGrid.getData(this, "zoom"),
                    o = new google.maps.LatLng(t, n),
                    a = new google.maps.Map(e.get(0), {
                        center: {
                            lat: t,
                            lng: n
                        },
                        mapTypeControl: !1,
                        scrollwheel: !1,
                        draggable: !0,
                        streetViewControl: !1,
                        navigationControl: !1,
                        zoom: i,
                        styles: [{
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{
                                color: "#e9e9e9"
                            }, {
                                lightness: 17
                            }]
                        }, {
                            featureType: "landscape",
                            elementType: "geometry",
                            stylers: [{
                                color: "#f5f5f5"
                            }, {
                                lightness: 20
                            }]
                        }, {
                            featureType: "road.highway",
                            elementType: "geometry.fill",
                            stylers: [{
                                color: "#ffffff"
                            }, {
                                lightness: 17
                            }]
                        }, {
                            featureType: "road.highway",
                            elementType: "geometry.stroke",
                            stylers: [{
                                color: "#ffffff"
                            }, {
                                lightness: 29
                            }, {
                                weight: .2
                            }]
                        }, {
                            featureType: "road.arterial",
                            elementType: "geometry",
                            stylers: [{
                                color: "#ffffff"
                            }, {
                                lightness: 18
                            }]
                        }, {
                            featureType: "road.local",
                            elementType: "geometry",
                            stylers: [{
                                color: "#ffffff"
                            }, {
                                lightness: 16
                            }]
                        }, {
                            featureType: "poi",
                            elementType: "geometry",
                            stylers: [{
                                color: "#f5f5f5"
                            }, {
                                lightness: 21
                            }]
                        }, {
                            featureType: "poi.park",
                            elementType: "geometry",
                            stylers: [{
                                color: "#dedede"
                            }, {
                                lightness: 21
                            }]
                        }, {
                            elementType: "labels.text.stroke",
                            stylers: [{
                                visibility: "on"
                            }, {
                                color: "#ffffff"
                            }, {
                                lightness: 16
                            }]
                        }, {
                            elementType: "labels.text.fill",
                            stylers: [{
                                saturation: 36
                            }, {
                                color: "#333333"
                            }, {
                                lightness: 40
                            }]
                        }, {
                            elementType: "labels.icon",
                            stylers: [{
                                visibility: "off"
                            }]
                        }, {
                            featureType: "transit",
                            elementType: "geometry",
                            stylers: [{
                                color: "#f2f2f2"
                            }, {
                                lightness: 19
                            }]
                        }, {
                            featureType: "administrative",
                            elementType: "geometry.fill",
                            stylers: [{
                                color: "#fefefe"
                            }, {
                                lightness: 20
                            }]
                        }, {
                            featureType: "administrative",
                            elementType: "geometry.stroke",
                            stylers: [{
                                color: "#fefefe"
                            }, {
                                lightness: 17
                            }, {
                                weight: 1.2
                            }]
                        }]
                    });
                google.maps.event.addDomListener(window, "resize", function() {
                    let e = a.getCenter();
                    google.maps.event.trigger(a, "resize"), a.setCenter(e), e = null
                }), new google.maps.Marker({
                    position: o,
                    animation: google.maps.Animation.BOUNCE,
                    icon: "assets/img/map-marker.png",
                    title: "ASL",
                    map: a
                }), t = n = i = o = null
            } catch (e) {
                console.log(e)
            }
        })
    }, 1e3)
}

function contactValidator() {
    var e = $("#contact-form");
    e < 1 || (e.validator(), e.on("submit", function(t) {
        if (!t.isDefaultPrevented()) {
            return $.ajax({
                type: "POST",
                url: "contact.php",
                data: $(this).serialize(),
                success: function(t) {
                    var n = "alert-" + t.type,
                        i = t.message,
                        o = '<div class="alert ' + n + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + i + "</div>";
                    n && i && (e.find(".messages").html(o), e[0].reset()), setTimeout(function() {
                        e.find(".messages").html("")
                    }, 3e3)
                },
                error: function(e) {
                    console.log(e)
                }
            }), !1
        }
    }))
}! function(e) {
    "use strict";

    function t(t) {
        dsnGrid.destorySwiper(), n("poster"), n("src"), n("srcset"), d.start(),
            function() {
                let t = [];
                return {
                    swiper: function(n, i) {
                        n = dsnGrid.convertToJQuery(n), i = e.extend(!0, {
                            slidesPerView: 1,
                            spaceBetween: 0,
                            pagination: {
                                el: n.find(".swiper-pagination"),
                                clickable: !0
                            },
                            navigation: {
                                nextEl: n.find(".next-container"),
                                prevEl: n.find(".prev-container")
                            }
                        }, i);
                        let o = new Swiper(n.find(".swiper-container"), i);
                        if (this.addSwiper(o), n.hasClass("dsn-swiper-parallax") && 1 === i.slidesPerView) {
                            let e = s();
                            e.progress(o, !1), e.touchStart(o), e.setTransition(o)
                        }
                        let a = dsnGrid.getData(n, "controller");
                        a && (t[a] = o), o = n = i = a = null
                    },
                    addSwiper: function(e) {
                        void 0 !== e && window.dsnSwiper.push(e)
                    },
                    run: function() {
                        let n = this;
                        e(".dsn-swiper").each(function() {
                            let e = dsnGrid.getData(this, "option", {});
                            e.slidesPerView >= 2.5 && (e.breakpoints = {
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                                575: {
                                    slidesPerView: 1,
                                    spaceBetween: 0
                                }
                            }), n.swiper(this, e)
                        });
                        let i = t["testimonial-content"],
                            o = t["testimonial-avatar"];
                        i && o && (i.controller.control = o, o.controller.control = i), i = o = null, t = []
                    }
                }
            }().run(), c.allInt(), s().run(),
            function(t) {
                let n = e(".accordion__question");
                if (!n.length) return void(n = null);
                t && n.off("click");
                n.on("click", function() {
                    let t = e(this).next();
                    e(".accordion__answer").not(t).slideUp(400), e(".accordion__question").parents(".accordion__item").removeClass("background-main"), e(".accordion__question").not(this).removeClass("expanded"), e(this).toggleClass("expanded"), e(this).hasClass("expanded") && e(this).parents(".accordion__item").addClass("background-main"), t.slideToggle(400), t = null
                })
            }(t), e('[data-dsn-cutter="html"]').each(function() {
                dsnGrid.getData(this, "cutter"), dsnGrid.cutterHtml(this)
            }), e("[data-dsn-position]").each(function() {
                "IMG" === this.nodeName ? e(this).css("object-position", dsnGrid.getData(this, "position", "center")) : e(this).css("background-position", dsnGrid.getData(this, "position", "center"))
            }),
            function(t) {
                e("[data-dsn-col]").each(function() {
                    let t = dsnGrid.getData(this, "col", 2);
                    e(this).addClass("dsn-col col-margin-" + t).attr("style", "--dsn-col:" + t + ";" + (e(this).attr("style") || ""))
                }), e(".projects-list").each(function() {
                    let t = e(this);
                    t.isotope({
                        itemSelector: ".work-item",
                        transitionDuration: "0.5s"
                    }), t.parents(".work-inner").find(".filterings").on("click", "button", function(n) {
                        n.preventDefault(), e(this).addClass("active").siblings().removeClass("active"), t.isotope({
                            filter: e(this).attr("data-filter")
                        })
                    })
                }), e(".projects-list , .our-work").find("video").each(function() {
                    this.pause();
                    let n = e(this);
                    t && n.off("mouseenter").off("mouseleave"), n.parents(".work-item").on("mouseenter", function() {
                        e(this).find("video").get(0).play()
                    }).on("mouseleave", function() {
                        e(this).find("video").get(0).pause()
                    }), n = null
                })
            }(t), initMap(), o().ajaxLoad(), e(".gallery-portfolio").each(function() {
                let t = e(this);
                t.justifiedGallery({
                    rowHeight: 300,
                    margins: 15
                });
                let n = t.parents(".work-masonry").find(".filterings-t");
                n.length && (n.find("button").off("click"), n.find("button").on("click", function() {
                    e(this).addClass("active").siblings().removeClass("active");
                    let n = e(this).data("filter");
                    t.justifiedGallery({
                        filter: function(t, i, o) {
                            return e(t).is(n) ? TweenLite.to(t, .6, {
                                scale: 1,
                                ease: Back.easeOut.config(1.2),
                                delay: .1 * i
                            }) : TweenLite.to(t, .1, {
                                scale: 0,
                                ease: Back.easeIn.config(1.2)
                            }), e(t).is(n)
                        }
                    }), n = null
                })), n = null
            }), e("[data-dsn-bg]").each(function() {
                let t = dsnGrid.getData(this, "bg"),
                    n = dsnGrid.getData(this, "color");
                t && e(this).css("background-color", t), t && (e(this).css("color", n), e(this).addClass("section-dsn-color")), t = n = null
            }), e(".zoom-gallery").magnificPopup({
                delegate: "a:not(.effect-ajax)",
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                image: {
                    verticalFit: !0,
                    titleSrc: function(e) {
                        return e.el.attr("title") + ' &middot; <a class="image-source-link" href="' + e.el.attr("data-source") + '" target="_blank">image source</a>'
                    }
                },
                gallery: {
                    enabled: !0
                },
                zoom: {
                    enabled: !0,
                    duration: 300,
                    opener: function(e) {
                        return e.find("img")
                    }
                }
            }),
            function() {
                let t = {
                    delegate: "a:not(.effect-ajax)",
                    type: "image",
                    closeOnContentClick: !1,
                    closeBtnInside: !1,
                    mainClass: "mfp-with-zoom",
                    gallery: {
                        enabled: !0
                    },
                    zoom: {
                        enabled: !0,
                        duration: 400,
                        easing: "cubic-bezier(0.36, 0, 0.66, -0.56)",
                        opener: function(e) {
                            return e.find("img")
                        }
                    },
                    callbacks: {
                        open: function() {
                            e("html").css({
                                margin: 0
                            })
                        },
                        close: function() {}
                    }
                };
                e(".gallery-portfolio").each(function() {
                    e(this).magnificPopup(t)
                }), e(".has-popup .pop-up").length && (t.delegate = "a.pop-up");
                e(".has-popup").magnificPopup(t)
            }(), e("a.vid").YouTubePopUp(), background(),
            function() {
                if (dsnGrid.isMobile()) return;
                e(".dsn-animate-bg").each(function() {
                    function t(e) {
                        e = dsnGrid.convertToJQuery(e), TweenLite.to(i, .8, {
                            left: e.position().left,
                            top: e.position().top,
                            width: e.outerWidth(),
                            height: e.outerHeight()
                        })
                    }
                    let n = e(this),
                        i = n.find(".animate-bg"),
                        o = n.find(".item-animate-bg");
                    !i || o.length < 3 ? i = n = null : (n.hasClass("hide-animate-bg") || t(o.get(1)), o.each(function() {
                        e(this).on("mouseenter", function() {
                            t(this)
                        }), n.hasClass("hide-animate-bg") && n.on("mouseleave", function() {
                            TweenLite.to(i, .2, {
                                width: 0,
                                height: 0
                            })
                        })
                    }))
                })
            }(),
            function(t) {
                function n() {
                    dsnGrid.elementHover(i, "a:not(> img):not(.vid) , .dsn-button-sidebar,  button , .mfp-container", "cursor-scale-full"), dsnGrid.elementHover(i, ".c-hidden", "no-scale"), dsnGrid.elementHover(i, ".has-popup a , .work-item-box a:not(.effect-ajax)", "cursor-scale-half cursor-open"), dsnGrid.elementHover(i, '[data-cursor="close"]', "cursor-scale-full cursor-close"), dsnGrid.elementHover(i, "a.link-pop ", "cursor-scale-full cursor-view"), dsnGrid.elementHover(i, ".proj-slider-image > .slick-list ,.our-work .slick-slider > .slick-list, .slider-project-swiper .swiper-wrapper ", "cursor-scale-half cursor-drag cursor-next cursor-prev"), dsnGrid.elementHover(i, ".main-slider:not(.has-horizontal) .slide-item", "cursor-scale-half cursor-up-down cursor-drag cursor-next cursor-prev"), dsnGrid.elementHover(i, ".main-slider.has-horizontal .slide-item", "cursor-scale-half cursor-drag cursor-next cursor-prev"), dsnGrid.elementHover(i, '[data-cursor="next"]', "cursor-scale-half cursor-next"), dsnGrid.elementHover(i, '[data-cursor="prev"]', "cursor-scale-half cursor-prev"), dsnGrid.elementHover(i, ".our-work .work-item a ", "no-drag"), dsnGrid.moveIcon(".img-box-parallax", ".title-popup")
                }
                let i = e(".cursor");
                if (dsnGrid.isMobile() || !r.hasClass("dsn-cursor-effect")) return i.length && (i.css("display", "none"), r.removeClass("dsn-cursor-effect")), void(i = null);
                if (!0 === t) return i.attr("class", "cursor"), void n();
                dsnGrid.mouseMove(i), n()
            }(t), contactValidator(), setTimeout(function() {
                e('a[href="#"]').on("click", function(e) {
                    e.preventDefault()
                }), e('[href*="#"]:not([href="#"])').on("click", function(t) {
                    t.preventDefault();
                    let n = e(e(this).attr("href"));
                    if (!n.length) return n = null, !1;
                    dsnGrid.scrollTop(n.get(0).offsetTop, 1, -100), n = null
                }), window.location.hash.length && (l.scrollTop(0), dsnGrid.scrollTop(window.location.hash, 1, -100)), c.dsnScrollTop(), t ? u && (u.t1.kill(), u.t2.kill(), e(".site-header").css({
                    paddingTop: "",
                    paddingBottom: "",
                    backgroundColor: "",
                    top: ""
                }), u = a()) : u = a()
            }, 500)
    }

    function n(t) {
        setTimeout(function() {
            e("[data-dsn-" + t + "]").each(function() {
                e(this).attr(t, dsnGrid.getData(this, t, ""))
            })
        }, 0)
    }

    function i() {
        let n = e(".preloader"),
            i = n.find(".percent"),
            a = n.find(".title .text-fill"),
            s = {
                value: 0
            },
            d = n.find(".preloader-bar"),
            c = d.find(".preloader-progress"),
            u = dsnGrid.pageLoad(0, 100, 1e3, function(e) {
                i.text(e), s.value = e, a.css("clip-path", "inset(" + (100 - e) + "% 0% 0% 0%)"), c.css("width", e + "%")
            });
        l.on("load", function() {
            clearInterval(u), (new TimelineLite).to(s, 1, {
                value: 100,
                onUpdate: function() {
                    i.text(s.value.toFixed(0)), a.css("clip-path", "inset(" + (100 - s.value) + "% 0% 0% 0%)"), c.css("width", s.value + "%")
                }
            }).set(c, {
                backgroundColor: "#090909"
            }).to(d, .5, {
                height: "100%"
            }).to(s, .4, {
                value: 0,
                onUpdate: function() {
                    a.css("clip-path", "inset(" + (100 - s.value) + "% 0% 0% 0%)")
                }
            }, "-=0.4").call(function() {
                (function() {
                    const t = e(".site-header");
                    return {
                        lineActive: function() {
                            let e = t.find("ul.extend-container > li.dsn-active");
                            e.length && this.setLine(e.offset().left), e = null
                        },
                        lineMove: function() {
                            let n = this;
                            t.find("ul.extend-container > li").off("mouseenter"), t.find("ul.extend-container > li").on("mouseenter", function() {
                                if (r.hasClass("hamburger-menu")) return;
                                let t = e(this),
                                    i = t.find(" > ul");
                                i.length ? n.setLine(i.offset().left, 65, i.width(), t.offset().left) : n.setLine(e(this).offset().left), t = null, i = null
                            }), t.find("ul.extend-container").off("mouseleave"), t.find("ul.extend-container").on("mouseleave", function() {
                                n.lineActive()
                            })
                        },
                        setLine: function(t, n = 65, i = 25, o) {
                            TweenMax.to(".nav-border-bottom", .3, {
                                left: t,
                                top: n,
                                width: i,
                                onComplete: function() {
                                    e(".nav-border-bottom").css({
                                        left: o || t,
                                        width: 25
                                    })
                                }
                            })
                        },
                        cutterText: function() {
                            let e = t.find(".menu-icon .text-menu");
                            if (e.length <= 0) return;
                            let n = e.find(".text-button"),
                                i = e.find(".text-open"),
                                o = e.find(".text-close");
                            dsnGrid.convertTextLine(n, n), dsnGrid.convertTextLine(i, i), dsnGrid.convertTextLine(o, o), o = null, i = null, n = null, e = null
                        },
                        hamburgerOpen: function() {
                            const n = t.find(".menu-icon"),
                                i = t.find(".main-navigation");
                            let o = new TimelineMax({
                                paused: !0,
                                onReverseComplete: function() {
                                    setTimeout(function() {
                                        n.find(".icon-top , .icon-bottom").css("transform", "").css("display", ""), r.css("overflow", "")
                                    }, 50)
                                }
                            });
                            var a = new TimelineMax;
                            let s = Power3.easeOut;
                            o.set(n.find(".icon-center"), {
                                display: "none"
                            }), o.to(n.find(".icon-top"), .5, {
                                width: 23,
                                rotation: 45,
                                top: 6,
                                ease: s
                            }), o.to(n.find(".icon-bottom"), .5, {
                                width: 23,
                                rotation: -45,
                                top: -5,
                                ease: s
                            }, 0), o.to(n, .01, {
                                css: {
                                    className: "+=nav-active"
                                }
                            }, 0), o.to(r, .01, {
                                overflow: "hidden"
                            }, 0), o.to(i, .5, {
                                y: "0%",
                                autoAlpha: 1,
                                ease: s
                            }, 0), o.fromTo(i, .5, {
                                y: "-100%",
                                autoAlpha: 0
                            }, {
                                y: "0%",
                                autoAlpha: 1,
                                ease: Expo.easeInOut
                            }, 0), o.staggerTo(i.find("ul.extend-container > li > a .dsn-title-menu"), .5, {
                                autoAlpha: 1,
                                y: 0,
                                ease: Back.easeOut.config(1.7)
                            }, .1), o.to(i.find("ul.extend-container > li > a .dsn-meta-menu"), .5, {
                                autoAlpha: 1,
                                ease: s
                            }), o.to(i.find(".container-content"), 1, {
                                autoAlpha: 1
                            }, "-=1"), o.reverse(), i.find("ul.extend-container > li.dsn-drop-down").on("click", function(t) {
                                t.stopPropagation(), a._totalDuration > 0 || ((a = new TimelineMax({
                                    onReverseComplete: function() {
                                        a = new TimelineMax
                                    }
                                })).set(e(this).find("ul"), {
                                    display: "flex"
                                }), a.staggerTo(i.find("ul.extend-container > li > a .dsn-title-menu"), .5, {
                                    y: -30,
                                    autoAlpha: 0,
                                    ease: Back.easeIn.config(1.7)
                                }, .1), a.to(i.find("ul.extend-container > li > a .dsn-meta-menu"), .5, {
                                    autoAlpha: 0
                                }, .5), a.staggerFromTo(e(this).find("ul li"), .5, {
                                    x: 50,
                                    autoAlpha: 0
                                }, {
                                    x: 0,
                                    autoAlpha: 1,
                                    ease: Back.easeOut.config(1.7)
                                }, .1))
                            }), n.off("click"), n.on("click", function() {
                                a.reverse(-1), o.reversed(!o.reversed()), a = new TimelineMax
                            });
                            let l = e(".dsn-back-menu");
                            l.off("click"), l.on("click", function() {
                                a.reverse()
                            }), l = null
                        },
                        init: function() {
                            if (!t.length) return;
                            let e = this;
                            this.cutterText(), l.width() > 991 && r.hasClass("classic-menu") && (t.find("ul.extend-container > li").off("mouseenter"), t.find("ul.extend-container").off("mouseleave"), e.lineMove(), setTimeout(e.lineActive.bind(e), 500)), e.hamburgerOpen()
                        }
                    }
                })().init(), dsnGrid.removeWhiteSpace(".site-header ul.extend-container li > a"), l.on("popstate", function(e) {
                    if (window.location.hash.length) return l.scrollTop(0), void dsnGrid.scrollTop(window.location.hash, 1, -100);
                    document.location.href.indexOf("#") > -1 || setTimeout(function() {
                        o().backAnimate(document.location)
                    }, 100)
                }), t(), e(".day-night").on("click", function() {
                    r.toggleClass("v-light")
                })
            }).to(s, .8, {
                value: 100,
                onUpdate: function() {
                    n.css("clip-path", "inset(" + s.value + "% 0% 0% 0%)")
                },
                ease: Power2.easeInOut
            }, "+=0.1").call(function() {
                n.remove(), u = n = i = a = s = d = c = null
            })
        })
    }

    function o() {
        let n, i, o = "main.main-root",
            a = '[data-dsn-ajax="img"]',
            s = new TimelineLite;
        return {
            mainRoot: e(o),
            ajaxClick: e("a.effect-ajax "),
            effectAjax: function(e) {
                if (e) r.addClass("dsn-ajax-effect");
                else {
                    if (!1 !== e) return r.hasClass("dsn-ajax-effect");
                    r.removeClass("dsn-ajax-effect")
                }
            },
            setTitle: function(t) {
                let n = t.match(/<title[^>]*>(.+)<\/title>/);
                n && e("head title").html(n[1]), n = null
            },
            setBodyClass: function(e) {
                let t = e.match(/<body[^>]*class="(.+)">/);
                t && r.attr("class", t[1]), t = null
            },
            ajaxNormal: function() {
                let t = e('<div class="dsn-ajax-loader dsn-ajax-normal"></div>');
                r.append(t), s.to(t, .5, {
                    scaleY: 1,
                    ease: Circ.easeIn
                }, 0), t = null
            },
            ajaxSlider: function(t) {
                let n = t.parents(".slide-content"),
                    i = n.data("dsn-id"),
                    o = e('.main-slider .slide-item[data-dsn-id="' + i + '"] .cover-bg').first(),
                    a = n.find(".title");
                o.removeClass("hidden"), this.dsnCreateElement(o, e(".bg-container"), a, a.find("a"))
            },
            ajaxNextProject: function(e) {
                let t = e.parents(".next-project"),
                    n = t.find(".img-footer-parallax"),
                    i = t.find(".title");
                t.addClass("dsn-active"), this.dsnCreateElement(n, t, i, i.find("a")), t = n = i = null
            },
            ajaxWork: function(e) {
                let t = e.parents(".work-item"),
                    i = t.find(".img-next-box"),
                    o = t.find("h4").addClass("dsn-cutter");
                o.addClass("fw-600"), i.addClass("before-z-index"), t.addClass("dsn-active"), this.dsnCreateElement(i, t, o, o.find("a")), s.to(n.find("img"), 1, {
                    height: "100%",
                    top: "0%",
                    y: "0"
                }), t = i = o = null
            },
            addElement: function(e, t, n) {
                if (void 0 === t || t.length <= 0) return;
                (void 0 === n || n.length <= 0) && (n = t), t.removeClass("line-after").removeClass("line-before");
                let i = t.clone(),
                    o = n[0].getBoundingClientRect();
                return void 0 === o && (o = {
                    left: 0,
                    top: 0
                }), i.css({
                    position: "absolute",
                    display: "block",
                    transform: "",
                    transition: "",
                    objectFit: "cover"
                }), i.css(dsnGrid.getBoundingClientRect(n[0])), e.append(i), i
            },
            dsnCreateElement: function(t, o, a, l) {
                let d = e('<div class="dsn-ajax-loader"></div>');
                d.css("background-color", r.css("background-color")), n = this.addElement(d, t, o), (i = this.addElement(d, a, l)).hasClass("dsn-cutter") && dsnGrid.convertTextLine(i), i && i.css("z-index", 2), i.css("width", "100%"), n && n.css("z-index", 1), r.append(d), s.to(d, 1, {
                    autoAlpha: 1,
                    ease: Power4.easeInOut
                })
            },
            completeElement: function(t) {
                let o = e(a),
                    l = e('[data-dsn-ajax="title"]');
                if (!o.length && !l.length) {
                    let e = {
                        value: "0%"
                    };
                    return void s.to(e, 1, {
                        value: "100%",
                        onUpdate: function() {
                            t.css("clip-path", "inset(0% 0% " + e.value + " 0%)")
                        },
                        onComplete: function() {
                            e = null
                        },
                        ease: Circ.easeIn
                    })
                }
                let r = {
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: "none"
                };
                if ((o = o.first()).length && (r = {
                        top: o.get(0).offsetTop,
                        left: o.get(0).offsetLeft,
                        width: o.width(),
                        height: o.height(),
                        transform: o.css("transform")
                    }), n.length && s.to(n, .8, {
                        top: r.top,
                        left: r.left,
                        width: r.width,
                        height: r.height,
                        objectFit: "cover",
                        borderRadius: 0,
                        transform: r.transform
                    }), i.length && (l = l.first(), void 0 === (r = l.offset()) && (r = {
                        top: 0,
                        left: 0
                    }), s.to(i, .8, {
                        top: r.top,
                        left: r.left
                    }, "-=0.8"), s.to(i, .8, {
                        css: {
                            className: "+=" + l.attr("class")
                        }
                    }, "-=0.8"), l.find(".dsn-chars-wrapper").length)) {
                    let e = l.find(".dsn-chars-wrapper").css("transform").split(/[()]/)[1];
                    e && (e = e.split(",")[5]), e && s.staggerTo(dsnGrid.randomObjectArray(i.find(".dsn-chars-wrapper"), .5), .6, {
                        force3D: !0,
                        y: e,
                        ease: Back.easeOut.config(1.7)
                    }, .04, "-=0.8")
                }
                let d = {
                    value: "0%"
                };
                s.to(d, .5, {
                    value: "100%",
                    onUpdate: function() {
                        t.css("clip-path", "inset(0% 0% " + d.value + " 0%)")
                    },
                    onComplete: function() {
                        d = null
                    },
                    ease: Circ.easeIn
                })
            },
            animateAjaxStart: function(e, t) {
                s = new TimelineMax, "slider" === e ? this.ajaxSlider(t) : "next" === e ? this.ajaxNextProject(t) : "work" === e ? this.ajaxWork(t) : this.ajaxNormal(), d.locked(), s.call(function() {
                    dsnGrid.scrollTop(0, .01)
                })
            },
            animateAjaxEnd: function(n) {
                this.setTitle(n), this.setBodyClass(n), this.mainRoot.html(e(n).filter(o).html()), t(!0), setTimeout(function() {
                    let t = e(".dsn-ajax-loader");
                    t.hasClass("dsn-ajax-normal") ? s.to(t, 1, {
                        autoAlpha: 0
                    }) : this.completeElement(t), s.call(function() {
                        t.remove(), this.effectAjax(!1), s = a = o = null
                    }.bind(this))
                }.bind(this), 100)
            },
            backAnimate: function(t) {
                if (!t) return;
                let n = this;
                e.ajax({
                    url: t,
                    dataType: "html",
                    beforeSend: n.animateAjaxStart.bind(n),
                    success: function(e) {
                        s.call(n.animateAjaxEnd.bind(n, e), null, null, "+=0.2")
                    },
                    error: function(e) {
                        window.location = t
                    }
                })
            },
            ajaxLoad: function() {
                if (!r.hasClass("dsn-ajax")) return;
                let t = this;
                this.ajaxClick.off("click"), this.ajaxClick.on("click", function(n) {
                    n.preventDefault();
                    let i = e(this),
                        o = i.attr("href"),
                        a = i.data("dsn-ajax");
                    o.indexOf("#") >= 0 || void 0 === o ? i = o = a = null : t.effectAjax() || (t.effectAjax(!0), e.ajax({
                        url: o,
                        dataType: "html",
                        beforeSend: t.animateAjaxStart.bind(t, a, i),
                        success: function(e) {
                            try {
                                history.pushState(null, "", o), s.call(t.animateAjaxEnd.bind(t, e), null, null, "+=0.2")
                            } catch (e) {
                                window.location = o
                            }
                        },
                        error: function(e) {
                            window.location = o
                        }
                    }))
                })
            }
        }
    }

    function a() {
        e(".site-header").removeClass("header-stickytop");
        let t = 0;
        var n = e(".wrapper").offset() || {
                top: 0
            },
            i = e(".header-single-post .containers").offset(),
            o = e(".post-full-content").offset(),
            a = 0;
        void 0 !== i ? n = i : n.top <= 70 && (n = o);
        var s = new TimelineMax({
                paused: !0
            }),
            r = new TimelineMax({
                paused: !0
            });
        return s.to(".header-top .header-container, .site-header ", .5, {
            backgroundColor: "#212121",
            paddingTop: 15,
            paddingBottom: 15
        }), s.reverse(), r.to(".header-top .header-container,  .site-header , .dsn-multi-lang", .5, {
            top: -70
        }), r.reverse(), d.getListener(function(e) {
            t = "scroll" === e.type ? l.scrollTop() : e.offset.y;
            let i = 70;
            void 0 !== n && (i = n.top - 100), t > i ? (s.play(), a < t ? r.play() : r.reverse()) : s.reverse(), a = t
        }), {
            t1: s,
            t2: r
        }
    }

    function s() {
        const t = e(".main-slider"),
            n = e.extend(!0, {
                speed: 1500,
                grabCursor: !0,
                allowTouchMove: !0,
                direction: "horizontal",
                slidesPerView: 1,
                centeredSlides: !0,
                slideToClickedSlide: !0,
                spaceBetween: 0,
                loop: !1,
                autoplay: !0
            }, t.data("dsn-option") || {});
        dsnGrid.getData(t, "option");
        let i = e(".nav-slider"),
            o = new TimelineLite;
        return {
            isDemoSlide: function() {
                return t.hasClass("demo-3")
            },
            initSlider: function() {
                let n = t.find(".slide-item"),
                    i = t.find(".dsn-slider-content > .container"),
                    o = this,
                    a = [];
                n.each(function(t) {
                    let n = e(this);
                    n.attr("data-dsn-id", t);
                    let s = e(this).find(".slide-content");
                    s.attr("data-dsn-id", t), 0 === t && s.addClass("dsn-active dsn-active-cat"), i.append(s);
                    let l = s.find(".title a");
                    o.isDemoSlide() || a.push(o.nextSlide(e(this).find(".image-bg").clone())), dsnGrid.convertTextLine(l, l), n = s = l = null
                }), o.isDemoSlide() || (a.push(a.shift()), e(".box-next > .swiper-wrapper").append(a)), a = o = i = n = null
            },
            swiperObject: function(i, o = !0) {
                let a = {};
                return this.isDemoSlide() && (a = {
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    575: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    }
                }), new Swiper(".main-slider .slide-inner", {
                    speed: n.speed,
                    grabCursor: n.grabCursor,
                    allowTouchMove: n.allowTouchMove,
                    direction: n.direction,
                    slidesPerView: n.slidesPerView,
                    centeredSlides: n.centeredSlides,
                    slideToClickedSlide: n.slideToClickedSlide,
                    loop: n.loop,
                    autoplay: n.autoPlay,
                    navigation: {
                        nextEl: ".main-slider .control-nav .next-container",
                        prevEl: ".main-slider .control-nav .prev-container"
                    },
                    pagination: {
                        el: ".main-slider .dsn-controls .dsn-numbers span:not(.full-number)",
                        type: "custom",
                        clickable: !0,
                        renderCustom: function(t, n, i) {
                            return e(".main-slider .dsn-controls .dsn-numbers span.full-number").html(dsnGrid.numberText(i)), e(".footer-slid .control-num span").html(dsnGrid.numberText(n)), TweenLite.to(".main-slider .dsn-controls .dsn-progress .dsn-progress-indicator", 1, {
                                height: n / i * 100 + "%"
                            }), dsnGrid.numberText(n)
                        }
                    },
                    spaceBetween: n.spaceBetween,
                    breakpoints: a,
                    on: {
                        init: function() {
                            this.autoplay.stop(), t.find('[data-dsn="video"] video').each(function() {
                                this.pause()
                            })
                        },
                        imagesReady: function() {
                            let t = e(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                            t.length && t.get(0).play(), t = null
                        }
                    }
                })
            },
            progress: function(e, t = !0) {
                e.on("progress", function() {
                    let e = this;
                    for (let n = 0; n < e.slides.length; n++) {
                        let i = e.slides[n].progress,
                            o = .5 * (t ? e.height : e.width),
                            a = i * o,
                            s = t ? "Y" : "X";
                        e.slides[n].querySelector(".image-bg").style.transform = "translate" + s + "(" + a + "px) skew" + s + "(" + a / 90 + "deg)", a = s = o = i = null
                    }
                    e = null
                })
            },
            touchStart: function(t) {
                t.on("touchStart", function() {
                    e(this.slides).css("transition", "")
                })
            },
            setTransition: function(t) {
                t.on("setTransition", function(t) {
                    e(this.slides).find(".image-bg").css("transition", t - 100 + "ms  ")
                })
            },
            slideChange: function(n) {
                let i = this;
                n.on("slideChange", function() {
                    let a = t.find(".dsn-slider-content .dsn-active"),
                        s = a.data("dsn-id"),
                        l = e(n.slides[n.activeIndex]),
                        r = l.data("dsn-id");
                    if (s === r) return;
                    t.find('[data-dsn="video"] video').each(function() {
                        this.pause()
                    });
                    let d = e(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                    d.length && d.get(0).play();
                    let c = a.find(".dsn-chars-wrapper");
                    a.removeClass("dsn-active-cat");
                    let u = t.find('.dsn-slider-content [data-dsn-id="' + r + '"]'),
                        f = u.find(".dsn-chars-wrapper"),
                        h = s > r;
                    o.progress(1), (o = new TimelineLite).staggerFromTo(h ? c.toArray().reverse() : c, .3, i.showText().title, i.hideText(h).title, .05, 0, function() {
                        t.find(".dsn-slider-content .slide-content").removeClass("dsn-active").removeClass("dsn-active-cat"), u.addClass("dsn-active"), u.addClass("dsn-active-cat")
                    }), o.staggerFromTo(h ? f.toArray().reverse() : f, .8, i.hideText(!h).title, i.showText().title, .05, "-=.1"), a = s = l = r = d = c = f = h = null
                })
            },
            showText: function() {
                return {
                    title: {
                        autoAlpha: 1,
                        x: "0%",
                        scale: 1,
                        rotation: 0,
                        ease: Back.easeOut.config(4),
                        yoyo: !0
                    },
                    subtitle: {
                        autoAlpha: 1,
                        y: "0%",
                        ease: Elastic.easeOut
                    }
                }
            },
            hideText: function(e) {
                return {
                    title: {
                        autoAlpha: 0,
                        x: e ? "40%" : "-40%",
                        rotation: 3,
                        ease: Back.easeIn.config(4),
                        yoyo: !0
                    },
                    subtitle: {
                        autoAlpha: 0,
                        y: e ? "50%" : "-50%",
                        ease: Elastic.easeOut
                    }
                }
            },
            nextSlide: function(e) {
                return ' <div class="swiper-slide">\n                    <div class="d-flex a-item-center h-100">\n                        <div class="img-box-next p-relative h-100 w-100 overflow-hidden">\n' + e.addClass("p-absolute").removeClass("hidden").get(0).outerHTML + "                        </div>\n                    </div>\n                </div>"
            },
            run: function() {
                if (t.length <= 0) return;
                let e = "horizontal" === n.direction;
                this.initSlider();
                let a = this.swiperObject(this.isDemoSlide(), !e);
                if (this.isDemoSlide() || (this.progress(a, !e), this.touchStart(a), this.setTransition(a)), this.slideChange(a), this.isDemoSlide() && !t.hasClass("has-loop") && a.slideTo(1), i.length <= 0 || this.isDemoSlide()) return window.dsnSwiper.push(a), void(a = null);
                let s = new Swiper(".nav-slider", {
                    speed: n.speed,
                    grabCursor: n.grabCursor,
                    centeredSlides: n.centeredSlides,
                    touchRatio: .2,
                    slideToClickedSlide: n.slideToClickedSlide,
                    direction: n.direction,
                    resistanceRatio: .65,
                    spaceBetween: n.spaceBetween,
                    loop: n.loop
                });
                a.controller.control = s, s.controller.control = a, this.progress(s, !e), this.setTransition(s), i.on("click", function() {
                    o.isActive() || (s.slides.length === s.activeIndex + 1 ? a.slideTo(0) : a.slideNext())
                }), window.dsnSwiper.push(a), window.dsnSwiper.push(s), i = null
            }
        }
    }
    const l = e(window),
        r = e("body");
    console.log(jQuery.fn.jquery), i();
    const d = function() {
            const t = window.Scrollbar;
            var n = document.querySelector("#dsn-scrollbar");
            return {
                isScroller: function(e) {
                    e && (n = document.querySelector("#dsn-scrollbar"));
                    let t = !r.hasClass("dsn-effect-scroll") || dsnGrid.isMobile() || null === n;
                    return t && e && r.addClass("dsn-mobile"), !t
                },
                locked: function() {
                    if (r.addClass("locked-scroll"), this.isScroller()) {
                        let e = this.getScrollbar();
                        void 0 !== e && e.destroy(), e = null
                    }
                },
                getScrollbar: function(e) {
                    return void 0 === e ? t.get(n) : t.get(document.querySelector(e))
                },
                getListener: function(e, t = !0) {
                    if (void 0 === e) return;
                    let n = this;
                    n.isScroller() ? n.getScrollbar().addListener(e) : t && l.on("scroll", e), n = null
                },
                scrollNavigate: function() {
                    let t = e(".wrapper").offset();
                    t = t ? t.top : 0, e(".scroll-top , .scroll-to-top").on("click", function() {
                        dsnGrid.scrollTop(0, 2)
                    }), e(".scroll-d").on("click", function() {
                        dsnGrid.scrollTop(t, 2, -1 * e(".scrollmagic-pin-spacer").height() - 200 || -200)
                    })
                },
                start: function() {
                    r.removeClass("locked-scroll"), dsnGrid.scrollTop(0, 1), this.isScroller(!0) && t.init(n, {
                        damping: .05
                    })
                }
            }
        }(),
        c = function() {
            let t = new ScrollMagic.Controller,
                n = [];
            return {
                clearControl: function() {
                    t.destroy(!0), t = new ScrollMagic.Controller;
                    for (let e of n) e.destroy(!0), e = null;
                    n = []
                },
                headerPages: function() {
                    e(".dsn-header-parallax").each(function() {
                        let i = e(this),
                            o = i.find(".dsn-hero-parallax-img"),
                            a = i.find(".dsn-hero-parallax-title"),
                            s = i.find(".dsn-footer-parallax"),
                            l = new TimelineLite;
                        o.length > 0 && l.to(o, 1, {
                            y: "30%",
                            scale: 1
                        }, 0), a.length > 0 && l.to(a, .8, {
                            force3D: !0,
                            y: dsnGrid.getData(a, "y", "100%"),
                            autoAlpha: 0,
                            scale: dsnGrid.getData(a, "scale", o.hasClass("header-scale-hero") ? .9 : o.hasClass("header-no-scale-hero") ? 1 : 1.08)
                        }, 0), s.length > 0 && l.to(s, .8, {
                            force3D: !0,
                            y: 60,
                            autoAlpha: 0
                        }, 0);
                        let r = dsnGrid.tweenMaxParallax(d, t).addParrlax({
                            id: this,
                            triggerHook: 0,
                            tween: l
                        });
                        if (!i.hasClass("main-slider")) {
                            let e = o.find("video");
                            e.length ? (r.on("enter", function() {
                                e.length && e.get(0).play()
                            }), r.on("leave", function() {
                                e.length && e.get(0).pause()
                            })) : e = null
                        }
                        r && n.push(r), l = r = null
                    })
                },
                moveSection: function() {
                    let i = e('[data-dsn-grid="move-section"]'),
                        o = Linear.easeNone,
                        a = .01;
                    i.each(function() {
                        let i = e(this);
                        if (dsnGrid.getData(i, "grid"), i.addClass("dsn-move-section"), "tablet" === dsnGrid.getData(i, "responsive") && l.width() < 992) return;
                        let s = dsnGrid.getData(i, "move", -100),
                            r = dsnGrid.getData(i, "triggerhook", 1),
                            c = dsnGrid.getData(i, "opacity", i.css("opacity")),
                            u = dsnGrid.getData(i, "duration", "150%"),
                            f = dsnGrid.tweenMaxParallax(d, t).addParrlax({
                                id: this,
                                triggerHook: r,
                                duration: u,
                                tween: TweenMax.to(i, a, {
                                    y: s,
                                    autoAlpha: c,
                                    ease: o
                                })
                            });
                        n.push(f), i = s = r = c = u = null
                    }), i = o = a = null
                },
                parallaxImg: function() {
                    let i = Linear.easeNone,
                        o = .01;
                    e('[data-dsn-grid="move-up"]').each(function(a) {
                        let s = e(this);
                        s.attr("data-dsn-grid", "moveUp");
                        let l = s.find("img:not(.hidden) , video"),
                            r = dsnGrid.getData(this, "triggerhook", 1),
                            c = dsnGrid.getData(this, "duration", "200%"),
                            u = dsnGrid.getData(this, "top");
                        if (l.length > 0) {
                            u && l.css("top", u);
                            let e, a = dsnGrid.getData(l, "y", l.hasClass("has-opposite-direction") ? "-15" : "30");
                            l.hasClass("has-opposite-direction") || l.css("height", 100 + a / 2 + "%");
                            let f = {
                                y: a + "%",
                                skewX: 0,
                                ease: i,
                                scale: 1
                            };
                            l.hasClass("has-top-bottom") ? e = TweenMax.to(l, o, f) : (f.scale = dsnGrid.getData(l, "scale", 1.1), e = TweenMax.to(l, o, f)), l.css("perspective", s.width() > 1e3 ? 1e3 : s.width());
                            let h = dsnGrid.tweenMaxParallax(d, t).addParrlax({
                                id: this,
                                triggerHook: r,
                                duration: c,
                                tween: e
                            });
                            h && n.push(h), h = e = a = c = r = l = s = f = null
                        }
                    }), i = o = null
                },
                parallaxImgHover: function() {
                    dsnGrid.isMobile() || e('[data-dsn="parallax"]').each(function() {
                        let t = e(this),
                            n = dsnGrid.removeAttr(t, "data-dsn"),
                            i = dsnGrid.getData(t, "speed", .5),
                            o = dsnGrid.getData(t, "move", 20);
                        dsnGrid.parallaxMoveElement(t, o, i, t.find(".dsn-parallax-rev").get(0), t.hasClass("image-zoom")), t = n = i = o = null
                    })
                },
                animateFade: function() {
                    let t = e('[data-dsn-animate="section"]');
                    dsnGrid.getData(t, "animate"), t.each(function() {
                        let t = new ScrollMagic.Controller,
                            n = new TimelineLite({
                                paused: !0
                            }),
                            i = e(this),
                            o = i.find(".dsn-up"),
                            a = i.find(".dsn-text");
                        i.hasClass("dsn-animate") && (i.addClass("transform-3d overflow-hidden"), n.fromTo(this, 1, {
                            y: 50,
                            opacity: 0
                        }, {
                            y: 0,
                            opacity: 1
                        })), a.length && (i.addClass("animate-text-section"), dsnGrid.convertTextLine(a, a, !1), n.set(a, {
                            className: "+=dsn-active"
                        })), o.length && n.staggerFromTo(o, .8, {
                            y: 20,
                            opacity: 0
                        }, {
                            y: 0,
                            opacity: 1,
                            delay: i.hasClass("dsn-animate") ? .5 : 0,
                            ease: Back.easeOut.config(1.7)
                        }, .2, 0), (o.length || a.length || i.hasClass("dsn-animate")) && (n._totalDuration = 1), dsnGrid.tweenMaxParallax(d, t).addParrlax({
                            id: this,
                            reverse: !1,
                            triggerHook: .5,
                            duration: 0,
                            tween: n
                        }), t = n = i = o = a = null
                    }), t = null
                },
                animateNumbers: function() {
                    e(".have-dsn-animate-number").each(function() {
                        let t = e(this).find(".has-animate-number");
                        if (!t.length) return void(t = null);
                        let n = new TimelineLite({
                            paused: !0
                        });
                        t.each(function(t) {
                            let i = e(this),
                                o = {
                                    value: 0
                                };
                            n.to(o, 4, {
                                value: i.text(),
                                ease: Back.easeOut.config(1.2),
                                onUpdate: function() {
                                    i.text(dsnGrid.numberText(o.value.toFixed(0)))
                                },
                                onComplete: function() {
                                    i = o = null
                                }
                            }, .2 * t), i.text(0)
                        }), n._totalDuration = 1, dsnGrid.tweenMaxParallax(d, new ScrollMagic.Controller).addParrlax({
                            id: this,
                            reverse: !1,
                            triggerHook: .5,
                            duration: 0,
                            tween: n
                        }), n = null
                    })
                },
                changeColor: function() {
                    e('[data-dsn="color"]').each(function() {
                        e(this).removeAttr("data-dsn");
                        let i = dsnGrid.getData(this, "duration", e(this).outerHeight() + 50),
                            o = new ScrollMagic.Scene({
                                triggerElement: this,
                                triggerHook: .05,
                                duration: i
                            }).addTo(t);
                        o.on("enter", function() {
                            r.toggleClass("v-light")
                        }), o.on("leave", function() {
                            r.toggleClass("v-light")
                        }), o && n.push(o)
                    })
                },
                animateSkills: function() {
                    e(".skills-inner").each(function() {
                        let t = new ScrollMagic.Controller,
                            n = new TimelineLite({
                                paused: !0
                            }),
                            i = e(this).find(".skills-item .fill");
                        i.length && (i.each(function(e) {
                            n.set(this, {
                                width: dsnGrid.getData(this, "width"),
                                delay: .2 * e
                            })
                        }), n._totalDuration = 1), dsnGrid.tweenMaxParallax(d, t).addParrlax({
                            id: this,
                            reverse: !1,
                            triggerHook: .7,
                            duration: 0,
                            tween: n
                        }), t = n = i = null
                    })
                },
                nextProject: function() {
                    e('[data-dsn-footer="project"]').each(function() {
                        dsnGrid.getData(this, "footer");
                        let i = e(this),
                            o = i.find(".dsn-footer-title"),
                            a = i.find(".img-footer-parallax"),
                            s = i.find(".title-cover"),
                            l = new TimelineLite;
                        a.length && l.fromTo(a, 1, {
                            scale: 1.15,
                            y: "-30%"
                        }, {
                            scale: 1,
                            y: "0%"
                        }, 0), o.length > 0 && l.fromTo(o, 1, {
                            y: 300,
                            autoAlpha: 0,
                            scale: .6
                        }, {
                            force3D: !0,
                            y: 0,
                            autoAlpha: 1,
                            scale: 1
                        }, 0), s.length > 0 && l.fromTo(s, 1, {
                            autoAlpha: 0,
                            y: -50
                        }, {
                            autoAlpha: .07,
                            y: 0
                        }, 0);
                        let r = dsnGrid.tweenMaxParallax(d, t).addParrlax({
                            id: this,
                            triggerHook: 1,
                            tween: l
                        });
                        r && n.push(r)
                    })
                },
                dsnScrollTop: function() {
                    let i = e(".wrapper");
                    if (!i.length || !e(".scroll-to-top").length) return void(i = null);
                    TweenLite.to(".scroll-to-top", 1, {
                        right: -100,
                        autoAlpha: 0
                    }), TweenLite.to(".stories-sticky-footer", 1, {
                        autoAlpha: 0
                    });
                    let o = dsnGrid.tweenMaxParallax(d, t).addParrlax({
                        id: i,
                        triggerHook: .5,
                        duration: i.height() - .5 * l.height() + (e(".next-project").outerHeight() || 0),
                        tween: TweenLite.to(".scroll-to-top > img", .3, {
                            rotation: i.height() / 2
                        })
                    });
                    o.on("progress", function(t) {
                        e(".scroll-to-top .box-numper span").text((100 * t.progress).toFixed(0) + "%")
                    }), o.on("enter", function(e) {
                        TweenLite.to(".scroll-to-top", 1, {
                            right: 20,
                            autoAlpha: 1
                        }), TweenLite.to(".stories-sticky-footer", 1, {
                            autoAlpha: 1
                        })
                    }), o.on("leave", function(e) {
                        TweenLite.to(".scroll-to-top", 1, {
                            right: -100,
                            autoAlpha: 0
                        }), TweenLite.to(".stories-sticky-footer", 1, {
                            autoAlpha: 0
                        })
                    }), o && n.push(o), o = i = null
                },
                allInt: function() {
                    this.clearControl(), this.headerPages(), this.moveSection(), this.parallaxImg(), this.parallaxImgHover(), this.animateFade(), this.animateNumbers(), this.changeColor(), this.animateSkills(), this.nextProject(), d.scrollNavigate(), d.getListener(function() {
                        for (let e of n) e.refresh()
                    })
                }
            }
        }();
    var u
}(jQuery);