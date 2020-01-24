/*
Comecero Data Export version: 1.0.3
https://comecero.com
https://github.com/comecero/data-export
Copyright Comecero and other contributors. Released under MIT license. See LICENSE for details.
*/

// 2.2.1
angular.module("gettext", []), angular.module("gettext").constant("gettext", function (a) { return a }), angular.module("gettext").factory("gettextCatalog", ["gettextPlurals", "gettextFallbackLanguage", "$http", "$cacheFactory", "$interpolate", "$rootScope", function (a, b, c, d, e, f) { function g() { f.$broadcast("gettextLanguageChanged") } var h, i = "$$noContext", j = '<span id="test" title="test" class="tested">test</span>', k = angular.element("<span>" + j + "</span>").html() !== j, l = function (a) { return h.debug && h.currentLanguage !== h.baseLanguage?h.debugPrefix + a:a }, m = function (a) { return h.showTranslatedMarkers?h.translatedMarkerPrefix + a + h.translatedMarkerSuffix:a }; return h = { debug: !1, debugPrefix: "[MISSING]: ", showTranslatedMarkers: !1, translatedMarkerPrefix: "[", translatedMarkerSuffix: "]", strings: {}, baseLanguage: "en", currentLanguage: "en", cache: d("strings"), setCurrentLanguage: function (a) { this.currentLanguage = a, g() }, getCurrentLanguage: function () { return this.currentLanguage }, setStrings: function (a, b) { this.strings[a] || (this.strings[a] = {}); for (var c in b) { var d = b[c]; if (k && (c = angular.element("<span>" + c + "</span>").html()), angular.isString(d) || angular.isArray(d)) { var e = {}; e[i] = d, d = e } for (var f in d) { var h = d[f]; d[f] = angular.isArray(h)?h:[h] } this.strings[a][c] = d } g() }, getStringFormFor: function (b, c, d, e) { if (!b) return null; var f = this.strings[b] || {}, g = f[c] || {}, h = g[e || i] || []; return h[a(b, d)] }, getString: function (a, c, d) { var f = b(this.currentLanguage); return a = this.getStringFormFor(this.currentLanguage, a, 1, d) || this.getStringFormFor(f, a, 1, d) || l(a), a = c?e(a)(c):a, m(a) }, getPlural: function (a, c, d, f, g) { var h = b(this.currentLanguage); return c = this.getStringFormFor(this.currentLanguage, c, a, g) || this.getStringFormFor(h, c, a, g) || l(1 === a?c:d), f && (f.$count = a, c = e(c)(f)), m(c) }, loadRemote: function (a) { return c({ method: "GET", url: a, cache: h.cache }).then(function (a) { var b = a.data; for (var c in b) h.setStrings(c, b[c]); return a }) } } }]), angular.module("gettext").directive("translate", ["gettextCatalog", "$parse", "$animate", "$compile", "$window", function (a, b, c, d, e) { function f(a, b, c) { if (!a) throw new Error("You should add a " + b + " attribute whenever you add a " + c + " attribute.") } var g = function () { return String.prototype.trim?function (a) { return "string" == typeof a?a.trim():a }:function (a) { return "string" == typeof a?a.replace(/^\s*/, "").replace(/\s*$/, ""):a } }(), h = parseInt((/msie (\d+)/.exec(angular.lowercase(e.navigator.userAgent)) || [])[1], 10); return { restrict: "AE", terminal: !0, compile: function (e, i) { f(!i.translatePlural || i.translateN, "translate-n", "translate-plural"), f(!i.translateN || i.translatePlural, "translate-plural", "translate-n"); var j = g(e.html()), k = i.translatePlural, l = i.translateContext; return 8 >= h && "<!--IE fix-->" === j.slice(-13) && (j = j.slice(0, -13)), { post: function (e, f, h) { function i() { var b; k?(e = n || (n = e.$new()), e.$count = m(e), b = a.getPlural(e.$count, j, k, null, l)):b = a.getString(j, null, l); var h = f.contents(); if (0 !== h.length) { if (b === g(h.html())) return void (o && d(h)(e)); var i = angular.element("<span>" + b + "</span>"); d(i.contents())(e); var p = i.contents(); c.enter(p, f), c.leave(h) } } var m = b(h.translateN), n = null, o = !0; h.translateN && e.$watch(h.translateN, i), e.$on("gettextLanguageChanged", i), i(), o = !1 } } } } }]), angular.module("gettext").factory("gettextFallbackLanguage", function () { var a = {}, b = /([^_]+)_[^_]+$/; return function (c) { if (a[c]) return a[c]; var d = b.exec(c); return d?(a[c] = d[1], d[1]):null } }), angular.module("gettext").filter("translate", ["gettextCatalog", function (a) { function b(b, c) { return a.getString(b, null, c) } return b.$stateful = !0, b }]), angular.module("gettext").factory("gettextPlurals", function () { return function (a, b) { switch (a) {case "ay":case "bo":case "cgg":case "dz":case "fa":case "id":case "ja":case "jbo":case "ka":case "kk":case "km":case "ko":case "ky":case "lo":case "ms":case "my":case "sah":case "su":case "th":case "tt":case "ug":case "vi":case "wo":case "zh": return 0;case "is": return b % 10 != 1 || b % 100 == 11?1:0;case "jv": return 0 != b?1:0;case "mk": return 1 == b || b % 10 == 1?0:1;case "ach":case "ak":case "am":case "arn":case "br":case "fil":case "fr":case "gun":case "ln":case "mfe":case "mg":case "mi":case "oc":case "pt_BR":case "tg":case "ti":case "tr":case "uz":case "wa":case "zh": return b > 1?1:0;case "lv": return b % 10 == 1 && b % 100 != 11?0:0 != b?1:2;case "lt": return b % 10 == 1 && b % 100 != 11?0:b % 10 >= 2 && (10 > b % 100 || b % 100 >= 20)?1:2;case "be":case "bs":case "hr":case "ru":case "sr":case "uk": return b % 10 == 1 && b % 100 != 11?0:b % 10 >= 2 && 4 >= b % 10 && (10 > b % 100 || b % 100 >= 20)?1:2;case "mnk": return 0 == b?0:1 == b?1:2;case "ro": return 1 == b?0:0 == b || b % 100 > 0 && 20 > b % 100?1:2;case "pl": return 1 == b?0:b % 10 >= 2 && 4 >= b % 10 && (10 > b % 100 || b % 100 >= 20)?1:2;case "cs":case "sk": return 1 == b?0:b >= 2 && 4 >= b?1:2;case "sl": return b % 100 == 1?1:b % 100 == 2?2:b % 100 == 3 || b % 100 == 4?3:0;case "mt": return 1 == b?0:0 == b || b % 100 > 1 && 11 > b % 100?1:b % 100 > 10 && 20 > b % 100?2:3;case "gd": return 1 == b || 11 == b?0:2 == b || 12 == b?1:b > 2 && 20 > b?2:3;case "cy": return 1 == b?0:2 == b?1:8 != b && 11 != b?2:3;case "kw": return 1 == b?0:2 == b?1:3 == b?2:3;case "ga": return 1 == b?0:2 == b?1:7 > b?2:11 > b?3:4;case "ar": return 0 == b?0:1 == b?1:2 == b?2:b % 100 >= 3 && 10 >= b % 100?3:b % 100 >= 11?4:5;default: return 1 != b?1:0} } });
// https://github.com/oblador/angular-scroll
var duScrollDefaultEasing = function (e) { "use strict"; return .5 > e ? Math.pow(2 * e, 2) / 2 : 1 - Math.pow(2 * (1 - e), 2) / 2 }; angular.module("duScroll", ["duScroll.scrollspy", "duScroll.smoothScroll", "duScroll.scrollContainer", "duScroll.spyContext", "duScroll.scrollHelpers"]).value("duScrollDuration", 350).value("duScrollSpyWait", 100).value("duScrollGreedy", !1).value("duScrollOffset", 0).value("duScrollEasing", duScrollDefaultEasing).value("duScrollCancelOnEvents", "scroll mousedown mousewheel touchmove keydown").value("duScrollBottomSpy", !1).value("duScrollActiveClass", "active"), angular.module("duScroll.scrollHelpers", ["duScroll.requestAnimation"]).run(["$window", "$q", "cancelAnimation", "requestAnimation", "duScrollEasing", "duScrollDuration", "duScrollOffset", "duScrollCancelOnEvents", function (e, t, n, r, o, l, u, i) { "use strict"; var c = {}, a = function (e) { return "undefined" != typeof HTMLDocument && e instanceof HTMLDocument || e.nodeType && e.nodeType === e.DOCUMENT_NODE }, s = function (e) { return "undefined" != typeof HTMLElement && e instanceof HTMLElement || e.nodeType && e.nodeType === e.ELEMENT_NODE }, d = function (e) { return s(e) || a(e) ? e : e[0] }; c.duScrollTo = function (t, n, r, o) { var l; if (angular.isElement(t) ? l = this.duScrollToElement : angular.isDefined(r) && (l = this.duScrollToAnimated), l) return l.apply(this, arguments); var u = d(this); return a(u) ? e.scrollTo(t, n) : (u.scrollLeft = t, void (u.scrollTop = n)) }; var f, p; c.duScrollToAnimated = function (e, l, u, c) { u && !c && (c = o); var a = this.duScrollLeft(), s = this.duScrollTop(), d = Math.round(e - a), m = Math.round(l - s), S = null, g = 0, h = this, v = function (e) { (!e || g && e.which > 0) && (i && h.unbind(i, v), n(f), p.reject(), f = null) }; if (f && v(), p = t.defer(), 0 === u || !d && !m) return 0 === u && h.duScrollTo(e, l), p.resolve(), p.promise; var y = function (e) { null === S && (S = e), g = e - S; var t = g >= u ? 1 : c(g / u); h.scrollTo(a + Math.ceil(d * t), s + Math.ceil(m * t)), 1 > t ? f = r(y) : (i && h.unbind(i, v), f = null, p.resolve()) }; return h.duScrollTo(a, s), i && h.bind(i, v), f = r(y), p.promise }, c.duScrollToElement = function (e, t, n, r) { var o = d(this); (!angular.isNumber(t) || isNaN(t)) && (t = u); var l = this.duScrollTop() + d(e).getBoundingClientRect().top - t; return s(o) && (l -= o.getBoundingClientRect().top), this.duScrollTo(0, l, n, r) }, c.duScrollLeft = function (t, n, r) { if (angular.isNumber(t)) return this.duScrollTo(t, this.duScrollTop(), n, r); var o = d(this); return a(o) ? e.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft : o.scrollLeft }, c.duScrollTop = function (t, n, r) { if (angular.isNumber(t)) return this.duScrollTo(this.duScrollLeft(), t, n, r); var o = d(this); return a(o) ? e.scrollY || document.documentElement.scrollTop || document.body.scrollTop : o.scrollTop }, c.duScrollToElementAnimated = function (e, t, n, r) { return this.duScrollToElement(e, t, n || l, r) }, c.duScrollTopAnimated = function (e, t, n) { return this.duScrollTop(e, t || l, n) }, c.duScrollLeftAnimated = function (e, t, n) { return this.duScrollLeft(e, t || l, n) }, angular.forEach(c, function (e, t) { angular.element.prototype[t] = e; var n = t.replace(/^duScroll/, "scroll"); angular.isUndefined(angular.element.prototype[n]) && (angular.element.prototype[n] = e) }) }]), angular.module("duScroll.polyfill", []).factory("polyfill", ["$window", function (e) { "use strict"; var t = ["webkit", "moz", "o", "ms"]; return function (n, r) { if (e[n]) return e[n]; for (var o, l = n.substr(0, 1).toUpperCase() + n.substr(1), u = 0; u < t.length; u++) if (o = t[u] + l, e[o]) return e[o]; return r } }]), angular.module("duScroll.requestAnimation", ["duScroll.polyfill"]).factory("requestAnimation", ["polyfill", "$timeout", function (e, t) { "use strict"; var n = 0, r = function (e, r) { var o = (new Date).getTime(), l = Math.max(0, 16 - (o - n)), u = t(function () { e(o + l) }, l); return n = o + l, u }; return e("requestAnimationFrame", r) }]).factory("cancelAnimation", ["polyfill", "$timeout", function (e, t) { "use strict"; var n = function (e) { t.cancel(e) }; return e("cancelAnimationFrame", n) }]), angular.module("duScroll.spyAPI", ["duScroll.scrollContainerAPI"]).factory("spyAPI", ["$rootScope", "$timeout", "$window", "$document", "scrollContainerAPI", "duScrollGreedy", "duScrollSpyWait", "duScrollBottomSpy", "duScrollActiveClass", function (e, t, n, r, o, l, u, i, c) { "use strict"; var a = function (o) { var a = !1, s = !1, d = function () { s = !1; var t, u = o.container, a = u[0], d = 0; "undefined" != typeof HTMLElement && a instanceof HTMLElement || a.nodeType && a.nodeType === a.ELEMENT_NODE ? (d = a.getBoundingClientRect().top, t = Math.round(a.scrollTop + a.clientHeight) >= a.scrollHeight) : t = Math.round(n.pageYOffset + n.innerHeight) >= r[0].body.scrollHeight; var f, p, m, S, g, h, v = i && t ? "bottom" : "top"; for (S = o.spies, p = o.currentlyActive, m = void 0, f = 0; f < S.length; f++) g = S[f], h = g.getTargetPosition(), h && (i && t || h.top + g.offset - d < 20 && (l || -1 * h.top + d) < h.height) && (!m || m[v] < h[v]) && (m = { spy: g }, m[v] = h[v]); m && (m = m.spy), p === m || l && !m || (p && (p.$element.removeClass(c), e.$broadcast("duScrollspy:becameInactive", p.$element, angular.element(p.getTargetElement()))), m && (m.$element.addClass(c), e.$broadcast("duScrollspy:becameActive", m.$element, angular.element(m.getTargetElement()))), o.currentlyActive = m) }; return u ? function () { a ? s = !0 : (d(), a = t(function () { a = !1, s && d() }, u, !1)) } : d }, s = {}, d = function (e) { var t = e.$id, n = { spies: [] }; return n.handler = a(n), s[t] = n, e.$on("$destroy", function () { f(e) }), t }, f = function (e) { var t = e.$id, n = s[t], r = n.container; r && r.off("scroll", n.handler), delete s[t] }, p = d(e), m = function (e) { return s[e.$id] ? s[e.$id] : e.$parent ? m(e.$parent) : s[p] }, S = function (e) { var t, n, r = e.$scope; if (r) return m(r); for (n in s) if (t = s[n], -1 !== t.spies.indexOf(e)) return t }, g = function (e) { for (; e.parentNode;) if (e = e.parentNode, e === document) return !0; return !1 }, h = function (e) { var t = S(e); t && (t.spies.push(e), t.container && g(t.container) || (t.container && t.container.off("scroll", t.handler), t.container = o.getContainer(e.$scope), t.container.on("scroll", t.handler).triggerHandler("scroll"))) }, v = function (e) { var t = S(e); e === t.currentlyActive && (t.currentlyActive = null); var n = t.spies.indexOf(e); -1 !== n && t.spies.splice(n, 1), e.$element = null }; return { addSpy: h, removeSpy: v, createContext: d, destroyContext: f, getContextForScope: m } }]), angular.module("duScroll.scrollContainerAPI", []).factory("scrollContainerAPI", ["$document", function (e) { "use strict"; var t = {}, n = function (e, n) { var r = e.$id; return t[r] = n, r }, r = function (e) { return t[e.$id] ? e.$id : e.$parent ? r(e.$parent) : void 0 }, o = function (n) { var o = r(n); return o ? t[o] : e }, l = function (e) { var n = r(e); n && delete t[n] }; return { getContainerId: r, getContainer: o, setContainer: n, removeContainer: l } }]), angular.module("duScroll.smoothScroll", ["duScroll.scrollHelpers", "duScroll.scrollContainerAPI"]).directive("duSmoothScroll", ["duScrollDuration", "duScrollOffset", "scrollContainerAPI", function (e, t, n) { "use strict"; return { link: function (r, o, l) { o.on("click", function (o) { if (l.href && -1 !== l.href.indexOf("#") || "" !== l.duSmoothScroll) { var u = l.href ? l.href.replace(/.*(?=#[^\s]+$)/, "").substring(1) : l.duSmoothScroll, i = document.getElementById(u) || document.getElementsByName(u)[0]; if (i && i.getBoundingClientRect) { o.stopPropagation && o.stopPropagation(), o.preventDefault && o.preventDefault(); var c = l.offset ? parseInt(l.offset, 10) : t, a = l.duration ? parseInt(l.duration, 10) : e, s = n.getContainer(r); s.duScrollToElement(angular.element(i), isNaN(c) ? 0 : c, isNaN(a) ? 0 : a) } } }) } } }]), angular.module("duScroll.spyContext", ["duScroll.spyAPI"]).directive("duSpyContext", ["spyAPI", function (e) { "use strict"; return { restrict: "A", scope: !0, compile: function (t, n, r) { return { pre: function (t, n, r, o) { e.createContext(t) } } } } }]), angular.module("duScroll.scrollContainer", ["duScroll.scrollContainerAPI"]).directive("duScrollContainer", ["scrollContainerAPI", function (e) { "use strict"; return { restrict: "A", scope: !0, compile: function (t, n, r) { return { pre: function (t, n, r, o) { r.$observe("duScrollContainer", function (r) { angular.isString(r) && (r = document.getElementById(r)), r = angular.isElement(r) ? angular.element(r) : n, e.setContainer(t, r), t.$on("$destroy", function () { e.removeContainer(t) }) }) } } } } }]), angular.module("duScroll.scrollspy", ["duScroll.spyAPI"]).directive("duScrollspy", ["spyAPI", "duScrollOffset", "$timeout", "$rootScope", function (e, t, n, r) { "use strict"; var o = function (e, t, n, r) { angular.isElement(e) ? this.target = e : angular.isString(e) && (this.targetId = e), this.$scope = t, this.$element = n, this.offset = r }; return o.prototype.getTargetElement = function () { return !this.target && this.targetId && (this.target = document.getElementById(this.targetId) || document.getElementsByName(this.targetId)[0]), this.target }, o.prototype.getTargetPosition = function () { var e = this.getTargetElement(); return e ? e.getBoundingClientRect() : void 0 }, o.prototype.flushTargetCache = function () { this.targetId && (this.target = void 0) }, { link: function (l, u, i) { var c, a = i.ngHref || i.href; if (a && -1 !== a.indexOf("#") ? c = a.replace(/.*(?=#[^\s]+$)/, "").substring(1) : i.duScrollspy ? c = i.duScrollspy : i.duSmoothScroll && (c = i.duSmoothScroll), c) { var s = n(function () { var n = new o(c, l, u, -(i.offset ? parseInt(i.offset, 10) : t)); e.addSpy(n), l.$on("$locationChangeSuccess", n.flushTargetCache.bind(n)); var a = r.$on("$stateChangeSuccess", n.flushTargetCache.bind(n)); l.$on("$destroy", function () { e.removeSpy(n), a() }) }, 0, !1); l.$on("$destroy", function () { n.cancel(s) }) } } } }]);
//# sourceMappingURL=angular-scroll.min.js.map
/*! 
 * angular-loading-bar v0.8.0
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2015 Wes Cruver
 * License: MIT
 */
!function(){"use strict";angular.module("angular-loading-bar",["cfp.loadingBarInterceptor"]),angular.module("chieffancypants.loadingBar",["cfp.loadingBarInterceptor"]),angular.module("cfp.loadingBarInterceptor",["cfp.loadingBar"]).config(["$httpProvider",function(a){var b=["$q","$cacheFactory","$timeout","$rootScope","$log","cfpLoadingBar",function(b,c,d,e,f,g){function h(){d.cancel(j),g.complete(),l=0,k=0}function i(b){var d,e=c.get("$http"),f=a.defaults;!b.cache&&!f.cache||b.cache===!1||"GET"!==b.method&&"JSONP"!==b.method||(d=angular.isObject(b.cache)?b.cache:angular.isObject(f.cache)?f.cache:e);var g=void 0!==d?void 0!==d.get(b.url):!1;return void 0!==b.cached&&g!==b.cached?b.cached:(b.cached=g,g)}var j,k=0,l=0,m=g.latencyThreshold;return{request:function(a){return a.ignoreLoadingBar||i(a)||(e.$broadcast("cfpLoadingBar:loading",{url:a.url}),0===k&&(j=d(function(){g.start()},m)),k++,g.set(l/k)),a},response:function(a){return a&&a.config?(a.config.ignoreLoadingBar||i(a.config)||(l++,e.$broadcast("cfpLoadingBar:loaded",{url:a.config.url,result:a}),l>=k?h():g.set(l/k)),a):(f.error("Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50"),a)},responseError:function(a){return a&&a.config?(a.config.ignoreLoadingBar||i(a.config)||(l++,e.$broadcast("cfpLoadingBar:loaded",{url:a.config.url,result:a}),l>=k?h():g.set(l/k)),b.reject(a)):(f.error("Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50"),b.reject(a))}}}];a.interceptors.push(b)}]),angular.module("cfp.loadingBar",[]).provider("cfpLoadingBar",function(){this.autoIncrement=!0,this.includeSpinner=!0,this.includeBar=!0,this.latencyThreshold=100,this.startSize=.02,this.parentSelector="body",this.spinnerTemplate='<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>',this.loadingBarTemplate='<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>',this.$get=["$injector","$document","$timeout","$rootScope",function(a,b,c,d){function e(){k||(k=a.get("$animate"));var e=b.find(n).eq(0);c.cancel(m),r||(d.$broadcast("cfpLoadingBar:started"),r=!0,v&&k.enter(o,e,angular.element(e[0].lastChild)),u&&k.enter(q,e,angular.element(e[0].lastChild)),f(w))}function f(a){if(r){var b=100*a+"%";p.css("width",b),s=a,t&&(c.cancel(l),l=c(function(){g()},250))}}function g(){if(!(h()>=1)){var a=0,b=h();a=b>=0&&.25>b?(3*Math.random()+3)/100:b>=.25&&.65>b?3*Math.random()/100:b>=.65&&.9>b?2*Math.random()/100:b>=.9&&.99>b?.005:0;var c=h()+a;f(c)}}function h(){return s}function i(){s=0,r=!1}function j(){k||(k=a.get("$animate")),d.$broadcast("cfpLoadingBar:completed"),f(1),c.cancel(m),m=c(function(){var a=k.leave(o,i);a&&a.then&&a.then(i),k.leave(q)},500)}var k,l,m,n=this.parentSelector,o=angular.element(this.loadingBarTemplate),p=o.find("div").eq(0),q=angular.element(this.spinnerTemplate),r=!1,s=0,t=this.autoIncrement,u=this.includeSpinner,v=this.includeBar,w=this.startSize;return{start:e,set:f,status:h,inc:g,complete:j,autoIncrement:this.autoIncrement,includeSpinner:this.includeSpinner,latencyThreshold:this.latencyThreshold,parentSelector:this.parentSelector,startSize:this.startSize}}]})}();
(function (window) {
    'use strict';
    angular.module('tmh.dynamicLocale', []).provider('tmhDynamicLocale', function () {

        var defaultLocale,
          localeLocationPattern = 'angular/i18n/angular-locale_{{locale}}.js',
          storageFactory = 'tmhDynamicLocaleStorageCache',
          storage,
          storeKey = 'tmhDynamicLocale.locale',
          promiseCache = {},
          activeLocale;

        /**
         * Loads a script asynchronously
         *
         * @param {string} url The url for the script
         @ @param {function) callback A function to be called once the script is loaded
         */
        function loadScript(url, callback, errorCallback, $timeout) {
            var script = document.createElement('script'),
              body = document.getElementsByTagName('body')[0],
              removed = false;

            script.type = 'text/javascript';
            if (script.readyState) { // IE
                script.onreadystatechange = function () {
                    if (script.readyState === 'complete' ||
                        script.readyState === 'loaded') {
                        script.onreadystatechange = null;
                        $timeout(
                          function () {
                              if (removed) return;
                              removed = true;
                              body.removeChild(script);
                              callback();
                          }, 30, false);
                    }
                };
            } else { // Others
                script.onload = function () {
                    if (removed) return;
                    removed = true;
                    body.removeChild(script);
                    callback();
                };
                script.onerror = function () {
                    if (removed) return;
                    removed = true;
                    body.removeChild(script);
                    errorCallback();
                };
            }
            script.src = url;
            script.async = false;
            body.appendChild(script);
        }

        /**
         * Loads a locale and replaces the properties from the current locale with the new locale information
         *
         * @param localeUrl The path to the new locale
         * @param $locale The locale at the curent scope
         */
        function loadLocale(localeUrl, $locale, localeId, $rootScope, $q, localeCache, $timeout) {

            function overrideValues(oldObject, newObject) {
                if (activeLocale !== localeId) {
                    return;
                }
                angular.forEach(oldObject, function (value, key) {
                    if (!newObject[key]) {
                        delete oldObject[key];
                    } else if (angular.isArray(newObject[key])) {
                        oldObject[key].length = newObject[key].length;
                    }
                });
                angular.forEach(newObject, function (value, key) {
                    if (angular.isArray(newObject[key]) || angular.isObject(newObject[key])) {
                        if (!oldObject[key]) {
                            oldObject[key] = angular.isArray(newObject[key]) ? [] : {};
                        }
                        overrideValues(oldObject[key], newObject[key]);
                    } else {
                        oldObject[key] = newObject[key];
                    }
                });
            }


            if (promiseCache[localeId]) return promiseCache[localeId];

            var cachedLocale,
              deferred = $q.defer();
            if (localeId === activeLocale) {
                deferred.resolve($locale);
            } else if ((cachedLocale = localeCache.get(localeId))) {
                activeLocale = localeId;
                $rootScope.$evalAsync(function () {
                    overrideValues($locale, cachedLocale);
                    $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
                    storage.put(storeKey, localeId);
                    deferred.resolve($locale);
                });
            } else {
                activeLocale = localeId;
                promiseCache[localeId] = deferred.promise;
                loadScript(localeUrl, function () {
                    // Create a new injector with the new locale
                    var localInjector = angular.injector(['ngLocale']),
                      externalLocale = localInjector.get('$locale');

                    overrideValues($locale, externalLocale);
                    localeCache.put(localeId, externalLocale);
                    delete promiseCache[localeId];

                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
                        storage.put(storeKey, localeId);
                        deferred.resolve($locale);
                    });
                }, function () {
                    delete promiseCache[localeId];

                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('$localeChangeError', localeId);
                        deferred.reject(localeId);
                    });
                }, $timeout);
            }
            return deferred.promise;
        }

        this.localeLocationPattern = function (value) {
            if (value) {
                localeLocationPattern = value;
                return this;
            } else {
                return localeLocationPattern;
            }
        };

        this.useStorage = function (storageName) {
            storageFactory = storageName;
        };

        this.useCookieStorage = function () {
            this.useStorage('$cookieStore');
        };

        this.defaultLocale = function (value) {
            defaultLocale = value;
        };

        this.$get = ['$rootScope', '$injector', '$interpolate', '$locale', '$q', 'tmhDynamicLocaleCache', '$timeout', function ($rootScope, $injector, interpolate, locale, $q, tmhDynamicLocaleCache, $timeout) {
            var localeLocation = interpolate(localeLocationPattern);

            storage = $injector.get(storageFactory);
            $rootScope.$evalAsync(function () {
                var initialLocale;
                if ((initialLocale = (storage.get(storeKey) || defaultLocale))) {
                    loadLocale(localeLocation({ locale: initialLocale }), locale, initialLocale, $rootScope, $q, tmhDynamicLocaleCache, $timeout);
                }
            });
            return {
                /**
                 * @ngdoc method
                 * @description
                 * @param {string=} value Sets the locale to the new locale. Changing the locale will trigger
                 *    a background task that will retrieve the new locale and configure the current $locale
                 *    instance with the information from the new locale
                 */
                set: function (value) {
                    return loadLocale(localeLocation({ locale: value }), locale, value, $rootScope, $q, tmhDynamicLocaleCache, $timeout);
                }
            };
        }];
    }).provider('tmhDynamicLocaleCache', function () {
        this.$get = ['$cacheFactory', function ($cacheFactory) {
            return $cacheFactory('tmh.dynamicLocales');
        }];
    }).provider('tmhDynamicLocaleStorageCache', function () {
        this.$get = ['$cacheFactory', function ($cacheFactory) {
            return $cacheFactory('tmh.dynamicLocales.store');
        }];
    }).run(['tmhDynamicLocale', angular.noop]);
}(window));
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () { function n(n) { function t(t, r, e, u, i, o) { for (; i >= 0 && o > i; i += n) { var a = u ? u[i] : i; e = r(e, t[a], a, t) } return e } return function (r, e, u, i) { e = b(e, i, 4); var o = !k(r) && m.keys(r), a = (o || r).length, c = n > 0 ? 0 : a - 1; return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a) } } function t(n) { return function (t, r, e) { r = x(r, e); for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n) if (r(t[i], i, t)) return i; return -1 } } function r(n, t, r) { return function (e, u, i) { var o = 0, a = O(e); if ("number" == typeof i) n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1; else if (r && i && a) return i = r(e, u), e[i] === u ? i : -1; if (u !== u) return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1; for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n) if (e[i] === u) return i; return -1 } } function e(n, t) { var r = I.length, e = n.constructor, u = m.isFunction(e) && e.prototype || a, i = "constructor"; for (m.has(n, i) && !m.contains(t, i) && t.push(i) ; r--;) i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i) } var u = this, i = u._, o = Array.prototype, a = Object.prototype, c = Function.prototype, f = o.push, l = o.slice, s = a.toString, p = a.hasOwnProperty, h = Array.isArray, v = Object.keys, g = c.bind, y = Object.create, d = function () { }, m = function (n) { return n instanceof m ? n : this instanceof m ? void (this._wrapped = n) : new m(n) }; "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3"; var b = function (n, t, r) { if (t === void 0) return n; switch (null == r ? 3 : r) { case 1: return function (r) { return n.call(t, r) }; case 2: return function (r, e) { return n.call(t, r, e) }; case 3: return function (r, e, u) { return n.call(t, r, e, u) }; case 4: return function (r, e, u, i) { return n.call(t, r, e, u, i) } } return function () { return n.apply(t, arguments) } }, x = function (n, t, r) { return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n) }; m.iteratee = function (n, t) { return x(n, t, 1 / 0) }; var _ = function (n, t) { return function (r) { var e = arguments.length; if (2 > e || null == r) return r; for (var u = 1; e > u; u++) for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) { var f = o[c]; t && r[f] !== void 0 || (r[f] = i[f]) } return r } }, j = function (n) { if (!m.isObject(n)) return {}; if (y) return y(n); d.prototype = n; var t = new d; return d.prototype = null, t }, w = function (n) { return function (t) { return null == t ? void 0 : t[n] } }, A = Math.pow(2, 53) - 1, O = w("length"), k = function (n) { var t = O(n); return "number" == typeof t && t >= 0 && A >= t }; m.each = m.forEach = function (n, t, r) { t = b(t, r); var e, u; if (k(n)) for (e = 0, u = n.length; u > e; e++) t(n[e], e, n); else { var i = m.keys(n); for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n) } return n }, m.map = m.collect = function (n, t, r) { t = x(t, r); for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) { var a = e ? e[o] : o; i[o] = t(n[a], a, n) } return i }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function (n, t, r) { var e; return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0 }, m.filter = m.select = function (n, t, r) { var e = []; return t = x(t, r), m.each(n, function (n, r, u) { t(n, r, u) && e.push(n) }), e }, m.reject = function (n, t, r) { return m.filter(n, m.negate(x(t)), r) }, m.every = m.all = function (n, t, r) { t = x(t, r); for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) { var o = e ? e[i] : i; if (!t(n[o], o, n)) return !1 } return !0 }, m.some = m.any = function (n, t, r) { t = x(t, r); for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) { var o = e ? e[i] : i; if (t(n[o], o, n)) return !0 } return !1 }, m.contains = m.includes = m.include = function (n, t, r, e) { return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0 }, m.invoke = function (n, t) { var r = l.call(arguments, 2), e = m.isFunction(t); return m.map(n, function (n) { var u = e ? t : n[t]; return null == u ? u : u.apply(n, r) }) }, m.pluck = function (n, t) { return m.map(n, m.property(t)) }, m.where = function (n, t) { return m.filter(n, m.matcher(t)) }, m.findWhere = function (n, t) { return m.find(n, m.matcher(t)) }, m.max = function (n, t, r) { var e, u, i = -1 / 0, o = -1 / 0; if (null == t && null != n) { n = k(n) ? n : m.values(n); for (var a = 0, c = n.length; c > a; a++) e = n[a], e > i && (i = e) } else t = x(t, r), m.each(n, function (n, r, e) { u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u) }); return i }, m.min = function (n, t, r) { var e, u, i = 1 / 0, o = 1 / 0; if (null == t && null != n) { n = k(n) ? n : m.values(n); for (var a = 0, c = n.length; c > a; a++) e = n[a], i > e && (i = e) } else t = x(t, r), m.each(n, function (n, r, e) { u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u) }); return i }, m.shuffle = function (n) { for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i]; return u }, m.sample = function (n, t, r) { return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t)) }, m.sortBy = function (n, t, r) { return t = x(t, r), m.pluck(m.map(n, function (n, r, e) { return { value: n, index: r, criteria: t(n, r, e) } }).sort(function (n, t) { var r = n.criteria, e = t.criteria; if (r !== e) { if (r > e || r === void 0) return 1; if (e > r || e === void 0) return -1 } return n.index - t.index }), "value") }; var F = function (n) { return function (t, r, e) { var u = {}; return r = x(r, e), m.each(t, function (e, i) { var o = r(e, i, t); n(u, e, o) }), u } }; m.groupBy = F(function (n, t, r) { m.has(n, r) ? n[r].push(t) : n[r] = [t] }), m.indexBy = F(function (n, t, r) { n[r] = t }), m.countBy = F(function (n, t, r) { m.has(n, r) ? n[r]++ : n[r] = 1 }), m.toArray = function (n) { return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : [] }, m.size = function (n) { return null == n ? 0 : k(n) ? n.length : m.keys(n).length }, m.partition = function (n, t, r) { t = x(t, r); var e = [], u = []; return m.each(n, function (n, r, i) { (t(n, r, i) ? e : u).push(n) }), [e, u] }, m.first = m.head = m.take = function (n, t, r) { return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t) }, m.initial = function (n, t, r) { return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t))) }, m.last = function (n, t, r) { return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t)) }, m.rest = m.tail = m.drop = function (n, t, r) { return l.call(n, null == t || r ? 1 : t) }, m.compact = function (n) { return m.filter(n, m.identity) }; var S = function (n, t, r, e) { for (var u = [], i = 0, o = e || 0, a = O(n) ; a > o; o++) { var c = n[o]; if (k(c) && (m.isArray(c) || m.isArguments(c))) { t || (c = S(c, t, r)); var f = 0, l = c.length; for (u.length += l; l > f;) u[i++] = c[f++] } else r || (u[i++] = c) } return u }; m.flatten = function (n, t) { return S(n, t, !1) }, m.without = function (n) { return m.difference(n, l.call(arguments, 1)) }, m.uniq = m.unique = function (n, t, r, e) { m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e)); for (var u = [], i = [], o = 0, a = O(n) ; a > o; o++) { var c = n[o], f = r ? r(c, o, n) : c; t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c) } return u }, m.union = function () { return m.uniq(S(arguments, !0, !0)) }, m.intersection = function (n) { for (var t = [], r = arguments.length, e = 0, u = O(n) ; u > e; e++) { var i = n[e]; if (!m.contains(t, i)) { for (var o = 1; r > o && m.contains(arguments[o], i) ; o++); o === r && t.push(i) } } return t }, m.difference = function (n) { var t = S(arguments, !0, !0, 1); return m.filter(n, function (n) { return !m.contains(t, n) }) }, m.zip = function () { return m.unzip(arguments) }, m.unzip = function (n) { for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++) r[e] = m.pluck(n, e); return r }, m.object = function (n, t) { for (var r = {}, e = 0, u = O(n) ; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1]; return r }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function (n, t, r, e) { r = x(r, e, 1); for (var u = r(t), i = 0, o = O(n) ; o > i;) { var a = Math.floor((i + o) / 2); r(n[a]) < u ? i = a + 1 : o = a } return i }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function (n, t, r) { null == t && (t = n || 0, n = 0), r = r || 1; for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n; return u }; var E = function (n, t, r, e, u) { if (!(e instanceof t)) return n.apply(r, u); var i = j(n.prototype), o = n.apply(i, u); return m.isObject(o) ? o : i }; m.bind = function (n, t) { if (g && n.bind === g) return g.apply(n, l.call(arguments, 1)); if (!m.isFunction(n)) throw new TypeError("Bind must be called on a function"); var r = l.call(arguments, 2), e = function () { return E(n, e, t, this, r.concat(l.call(arguments))) }; return e }, m.partial = function (n) { var t = l.call(arguments, 1), r = function () { for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) i[o] = t[o] === m ? arguments[e++] : t[o]; for (; e < arguments.length;) i.push(arguments[e++]); return E(n, r, this, this, i) }; return r }, m.bindAll = function (n) { var t, r, e = arguments.length; if (1 >= e) throw new Error("bindAll must be passed function names"); for (t = 1; e > t; t++) r = arguments[t], n[r] = m.bind(n[r], n); return n }, m.memoize = function (n, t) { var r = function (e) { var u = r.cache, i = "" + (t ? t.apply(this, arguments) : e); return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i] }; return r.cache = {}, r }, m.delay = function (n, t) { var r = l.call(arguments, 2); return setTimeout(function () { return n.apply(null, r) }, t) }, m.defer = m.partial(m.delay, m, 1), m.throttle = function (n, t, r) { var e, u, i, o = null, a = 0; r || (r = {}); var c = function () { a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null) }; return function () { var f = m.now(); a || r.leading !== !1 || (a = f); var l = t - (f - a); return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i } }, m.debounce = function (n, t, r) { var e, u, i, o, a, c = function () { var f = m.now() - o; t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null))) }; return function () { i = this, u = arguments, o = m.now(); var f = r && !e; return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a } }, m.wrap = function (n, t) { return m.partial(t, n) }, m.negate = function (n) { return function () { return !n.apply(this, arguments) } }, m.compose = function () { var n = arguments, t = n.length - 1; return function () { for (var r = t, e = n[t].apply(this, arguments) ; r--;) e = n[r].call(this, e); return e } }, m.after = function (n, t) { return function () { return --n < 1 ? t.apply(this, arguments) : void 0 } }, m.before = function (n, t) { var r; return function () { return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r } }, m.once = m.partial(m.before, 2); var M = !{ toString: null }.propertyIsEnumerable("toString"), I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"]; m.keys = function (n) { if (!m.isObject(n)) return []; if (v) return v(n); var t = []; for (var r in n) m.has(n, r) && t.push(r); return M && e(n, t), t }, m.allKeys = function (n) { if (!m.isObject(n)) return []; var t = []; for (var r in n) t.push(r); return M && e(n, t), t }, m.values = function (n) { for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]]; return e }, m.mapObject = function (n, t, r) { t = x(t, r); for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) e = u[a], o[e] = t(n[e], e, n); return o }, m.pairs = function (n) { for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]]; return e }, m.invert = function (n) { for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e]; return t }, m.functions = m.methods = function (n) { var t = []; for (var r in n) m.isFunction(n[r]) && t.push(r); return t.sort() }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function (n, t, r) { t = x(t, r); for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++) if (e = u[i], t(n[e], e, n)) return e }, m.pick = function (n, t, r) { var e, u, i = {}, o = n; if (null == o) return i; m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function (n, t, r) { return t in r }, o = Object(o)); for (var a = 0, c = u.length; c > a; a++) { var f = u[a], l = o[f]; e(l, f, o) && (i[f] = l) } return i }, m.omit = function (n, t, r) { if (m.isFunction(t)) t = m.negate(t); else { var e = m.map(S(arguments, !1, !1, 1), String); t = function (n, t) { return !m.contains(e, t) } } return m.pick(n, t, r) }, m.defaults = _(m.allKeys, !0), m.create = function (n, t) { var r = j(n); return t && m.extendOwn(r, t), r }, m.clone = function (n) { return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n }, m.tap = function (n, t) { return t(n), n }, m.isMatch = function (n, t) { var r = m.keys(t), e = r.length; if (null == n) return !e; for (var u = Object(n), i = 0; e > i; i++) { var o = r[i]; if (t[o] !== u[o] || !(o in u)) return !1 } return !0 }; var N = function (n, t, r, e) { if (n === t) return 0 !== n || 1 / n === 1 / t; if (null == n || null == t) return n === t; n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped); var u = s.call(n); if (u !== s.call(t)) return !1; switch (u) { case "[object RegExp]": case "[object String]": return "" + n == "" + t; case "[object Number]": return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t; case "[object Date]": case "[object Boolean]": return +n === +t } var i = "[object Array]" === u; if (!i) { if ("object" != typeof n || "object" != typeof t) return !1; var o = n.constructor, a = t.constructor; if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t) return !1 } r = r || [], e = e || []; for (var c = r.length; c--;) if (r[c] === n) return e[c] === t; if (r.push(n), e.push(t), i) { if (c = n.length, c !== t.length) return !1; for (; c--;) if (!N(n[c], t[c], r, e)) return !1 } else { var f, l = m.keys(n); if (c = l.length, m.keys(t).length !== c) return !1; for (; c--;) if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e)) return !1 } return r.pop(), e.pop(), !0 }; m.isEqual = function (n, t) { return N(n, t) }, m.isEmpty = function (n) { return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length }, m.isElement = function (n) { return !(!n || 1 !== n.nodeType) }, m.isArray = h || function (n) { return "[object Array]" === s.call(n) }, m.isObject = function (n) { var t = typeof n; return "function" === t || "object" === t && !!n }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (n) { m["is" + n] = function (t) { return s.call(t) === "[object " + n + "]" } }), m.isArguments(arguments) || (m.isArguments = function (n) { return m.has(n, "callee") }), "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function (n) { return "function" == typeof n || !1 }), m.isFinite = function (n) { return isFinite(n) && !isNaN(parseFloat(n)) }, m.isNaN = function (n) { return m.isNumber(n) && n !== +n }, m.isBoolean = function (n) { return n === !0 || n === !1 || "[object Boolean]" === s.call(n) }, m.isNull = function (n) { return null === n }, m.isUndefined = function (n) { return n === void 0 }, m.has = function (n, t) { return null != n && p.call(n, t) }, m.noConflict = function () { return u._ = i, this }, m.identity = function (n) { return n }, m.constant = function (n) { return function () { return n } }, m.noop = function () { }, m.property = w, m.propertyOf = function (n) { return null == n ? function () { } : function (t) { return n[t] } }, m.matcher = m.matches = function (n) { return n = m.extendOwn({}, n), function (t) { return m.isMatch(t, n) } }, m.times = function (n, t, r) { var e = Array(Math.max(0, n)); t = b(t, r, 1); for (var u = 0; n > u; u++) e[u] = t(u); return e }, m.random = function (n, t) { return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1)) }, m.now = Date.now || function () { return (new Date).getTime() }; var B = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }, T = m.invert(B), R = function (n) { var t = function (t) { return n[t] }, r = "(?:" + m.keys(n).join("|") + ")", e = RegExp(r), u = RegExp(r, "g"); return function (n) { return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n } }; m.escape = R(B), m.unescape = R(T), m.result = function (n, t, r) { var e = null == n ? void 0 : n[t]; return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e }; var q = 0; m.uniqueId = function (n) { var t = ++q + ""; return n ? n + t : t }, m.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g }; var K = /(.)^/, z = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" }, D = /\\|'|\r|\n|\u2028|\u2029/g, L = function (n) { return "\\" + z[n] }; m.template = function (n, t, r) { !t && r && (t = r), t = m.defaults({}, t, m.templateSettings); var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"), u = 0, i = "__p+='"; n.replace(e, function (t, r, e, o, a) { return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n"; try { var o = new Function(t.variable || "obj", "_", i) } catch (a) { throw a.source = i, a } var c = function (n) { return o.call(this, n, m) }, f = t.variable || "obj"; return c.source = "function(" + f + "){\n" + i + "}", c }, m.chain = function (n) { var t = m(n); return t._chain = !0, t }; var P = function (n, t) { return n._chain ? m(t).chain() : t }; m.mixin = function (n) { m.each(m.functions(n), function (t) { var r = m[t] = n[t]; m.prototype[t] = function () { var n = [this._wrapped]; return f.apply(n, arguments), P(this, r.apply(m, n)) } }) }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) { var t = o[n]; m.prototype[n] = function () { var r = this._wrapped; return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r) } }), m.each(["concat", "join", "slice"], function (n) { var t = o[n]; m.prototype[n] = function () { return P(this, t.apply(this._wrapped, arguments)) } }), m.prototype.value = function () { return this._wrapped }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function () { return "" + this._wrapped }, "function" == typeof define && define.amd && define("underscore", [], function () { return m }) }).call(this);
//# sourceMappingURL=underscore-min.map
var utils = (function () {

    // These are general, home-grown javascript functions for common functions used withing the app.

    function setCookie(name, value, minutes) {
        if (minutes) {
            var date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            var expires = "; expires=" + date.toUTCString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(name + "=");
            if (c_start != -1) {
                c_start = c_start + name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return null;
    }

    function deleteCookie(name) {
        setCookie(name, "", -60);
    }

    function resetCookieExpiration(name, minutes) {

        var value = getCookie(name);

        if (value != null) {
            setCookie(name, value, minutes);
        }

    }

    function getPageHashParameters() {

        return getHashParameters(window.location.href);

    }

    function getHashParameters(url) {

        var hashParameters = {};

        if (url.indexOf("#") == -1) {
            return hashParameters;
        }

        var e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&;=]+)=?([^&;]*)/g,
            d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
            q = url.substring(url.indexOf("#") + 1);

        while (e = r.exec(q))
            hashParameters[d(e[1])] = d(e[2]);

        return hashParameters;
    }

    function getPageQueryParameters() {

        return getQueryParameters(window.location.href);

    }

    function getQueryParameters(url) {

        if (url.indexOf("?") == -1) {
            return {};
        }

        q = url.substring(url.indexOf("?") + 1);

        // Strip off any hash parameters
        if (q.indexOf("#") > 0) {
            q = q.substring(0, q.indexOf("#"));
        }

        return parseQueryParameters(q);
    }

    function parseQueryParameters(query) {

        var queryParameters = {};

        if (isNullOrEmpty(query)) {
            return queryParameters;
        }

        var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&;=]+)=?([^&;]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); }
        queryParameters = {};

        while (e = r.exec(query))
            queryParameters[d(e[1])] = d(e[2]);

        return queryParameters;

    }

    function appendParams(url, params) {

        if (params.length == 0) {
            return url;
        }

        url += "?";

        _.each(params, function (item, index) {
            url += index + "=" + item + "&";
        });

        // remove the trailing ampersand
        url = url.substring(0, (url.length - 1));

        return url;

    }

    function left(str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0, n);
    }

    function right(str, n) {
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else {
            var iLen = String(str).length;
            return String(str).substring(iLen, iLen - n);
        }
    }

    function isValidNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function isValidInteger(value) {

        if (isValidNumber(value) == false) {
            return false;
        }

        value = parseFloat(value);

        var result = (value === (parseInt(value) | 0));

        return result;
    }

    function isValidEmail(value) {

        // http://stackoverflow.com/a/46181/2002383 anystring@anystring.anystring
        return /\S+@\S+\.\S+/.test(value);

    }

    function getRandom() {
        return Math.floor((Math.random() * 10000000) + 1);
    }

    function hasProperty(obj, prop) {

        // Determine if an object has a particular property http://stackoverflow.com/a/136411/2002383

        if (obj != null) {
            var proto = obj.__proto__ || obj.constructor.prototype;
            return (prop in obj) &&
                (!(prop in proto) || proto[prop] !== obj[prop]);
        }

        return false;
    }

    function sumProperties(collection, prop) {

        // Get the sum of a particular property from a collection
        var sum = 0;

        _.each(collection, function (item) {
            if (hasProperty(item, prop)) {
                sum += item[prop];
            }
        });

        return sum;
    }

    function areEqual() {
        
        // For an unlimited number of parameters, determines if they are all equal, i.e. areEqual(x, y, z, ...)
        var len = arguments.length;
        for (var i = 1; i < len; i++) {
            if (arguments[i] == null || arguments[i] != arguments[i - 1])
                return false;
        }

        return true;
    }

    function isNullOrEmpty(string) {

        if (string == null || string == undefined) {
            return true;
        }

        if (string == "") {
            return true;
        }

        if (removeWhitespace(string) == null) {
            return true;
        }

        return false;

    }

    function stringsToBool(object) {

        // This converts all properties with "true" and "false" values to true and false, respectively.

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                if (object[property] === "false") {
                    object[property] = false;
                }
                if (object[property] === "true") {
                    object[property] = true;
                }
            }
        }
    }

    function stringToBool(string) {
        return (string == "true");
    }

    function removeWhitespace(string) {
        return string.replace(/ /g, '');
    }
    
    function convert(money, rate) {
        return Math.round((money * rate) * 100) / 100;
    }

    function luhnCheck(value) {

        var nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
            var cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
    }

    function undefinedToNull(object) {
        for (var property in object) {
            if (object.hasOwnProperty(property)) {

                // If an object, run through all its properties
                if (Object.prototype.toString.call(object[property]) === '[object Object]') {
                    undefinedToNull(object[property]);
                }

                // If an array, run through all items in the array
                if (Object.prototype.toString.call(object[property]) === '[object Array]') {
                    for (var obj in object[property]) {
                        undefinedToNull(obj);
                    }
                }

                // Otherwise, convert to null
                if (object[property] === undefined) {
                    object[property] = null;
                }
            }
        }
    }

    function getChildrenElements(n, skipMe, type) {
        // Get children elements from an HTML element
        var r = [];
        for (; n; n = n.nextSibling)
            if (n.nodeType == 1 && n != skipMe)
                if (type) {
                    if (type.toUpperCase() == n.nodeName.toUpperCase()) {
                        r.push(n);
                    }
                } else {
                    r.push(n);
                }
        return r;
    };

    function getSiblingElements(n, type) {
        // Get sibling elements from an HTML element, excluding self.
        return getChildrenElements(n.parentNode.firstChild, n, type);
    }
    
    function getCurrentIsoDate(atStartOfDay) {

        var date = new Date();
        
        function pad(number) {
            var r = String(number);
            if (r.length === 1) {
                r = '0' + r;
            }
            return r;
        }
        
        var hours = "00";
        var minutes = "00";
        var seconds = "00"
        
        if (!atStartOfDay) {
            hours = date.getUTCHours();
            minutes = date.getUTCMinutes();
            seconds = date.getUTCSeconds();
        }

        return date.getUTCFullYear() 
        + '-' + pad(date.getUTCMonth() + 1) 
        + '-' + pad(date.getUTCDate())
        + 'T' + pad(hours) 
        + ':' + pad(minutes) 
        + ':' + pad(seconds) 
        + 'Z';
    };
    
    function repeat(char, number) {
        var e = "";
        for (i = 0; i < number; i++) {
            e += char;
        }
        return e;
    }
    
    function mergeParams(params, required, expand) {
        
        // If you have a string, parse it into an object
        if (_.isString(params)) {
            params = parseQueryParameters(params);
        }

        // If null, set as an empty object
        params = params || {};
        
        // Takes parameters, removes any hidden that are listed in required from the existing, adds any supplied expand parameters.

        var currentHide = String((params.hide || "")).split(",");
        var currentExpand = String((params.expand || "")).split(",");
        
        var newRequired = String((required || "")).split(",");
        var newExpand = String((expand || "")).split(",");

        // Remove items from hide that are in newRequired
        currentHide = _.reject(currentHide, function (val) {
            return (newRequired.indexOf(val) >= 0);
        });
        
        // Concat expand
        currentExpand = currentExpand.concat(newExpand);
        currentExpand = _.uniq(currentExpand);

        // Return
        params.hide = currentHide.join(",");
        params.expand = currentExpand.join(",");
        
        // Remove any leading or trailing commas
        params.hide = TrimIf(params.hide, ",");
        params.expand = TrimIf(params.expand, ",");

        return params;

    }
    
    function LeftTrimIf(str, char) {
        if (str) {
            if (str.substring(0, 1) == char) {
                str = str.substring(1);
            }
        }
        return str;
    }
    
    function RightTrimIf(str, char) {
        if (str) {
            if (str.charAt(str.length - 1) == "/") {
                str = str.substr(0, str.length - 1)
            }
        }
        return str;
    }
    
    function deDuplicateCsv(csv) {
        var array = csv.split(',');
        var unique = _.uniq(array);
        return unique.join(",");
    }
    
    function TrimIf(str, char) {
        return (RightTrimIf(LeftTrimIf(str, char), char));
    }
    
    function getLocale(language) {
        
        // Array of supported locales
        var locales = [];
        locales.push("af-na", "af-za", "af", "ar-ae", "ar-bh", "ar-dj", "ar-dz", "ar-eg", "ar-eh", "ar-er", "ar-il", "ar-iq", "ar-jo", "ar-km", "ar-kw", "ar-lb", "ar-ly", "ar-ma", "ar-mr", "ar-om", "ar-ps", "ar-qa", "ar-sa", "ar-sd", "ar-so", "ar-ss", "ar-sy", "ar-td", "ar-tn", "ar-ye", "ar", "az-cyrl-az", "az-cyrl", "az-latn-az", "az-latn", "az", "bg-bg", "bg", "bo-cn", "bo-in", "bo", "cs-cz", "cs", "da-dk", "da-gl", "da", "dav-ke", "dav", "de-at", "de-be", "de-ch", "de-de", "de-li", "de-lu", "de", "el-cy", "el-gr", "el", "en-ag", "en-ai", "en-as", "en-au", "en-bb", "en-be", "en-bm", "en-bs", "en-bw", "en-bz", "en-ca", "en-cc", "en-ck", "en-cm", "en-cx", "en-dg", "en-dm", "en-dsrt-us", "en-dsrt", "en-er", "en-fj", "en-fk", "en-fm", "en-gb", "en-gd", "en-gg", "en-gh", "en-gi", "en-gm", "en-gu", "en-gy", "en-hk", "en-ie", "en-im", "en-in", "en-io", "en-iso", "en-je", "en-jm", "en-ke", "en-ki", "en-kn", "en-ky", "en-lc", "en-lr", "en-ls", "en-mg", "en-mh", "en-mo", "en-mp", "en-ms", "en-mt", "en-mu", "en-mw", "en-na", "en-nf", "en-ng", "en-nr", "en-nu", "en-nz", "en-pg", "en-ph", "en-pk", "en-pn", "en-pr", "en-pw", "en-rw", "en-sb", "en-sc", "en-sd", "en-sg", "en-sh", "en-sl", "en-ss", "en-sx", "en-sz", "en-tc", "en-tk", "en-to", "en-tt", "en-tv", "en-tz", "en-ug", "en-um", "en-us", "en-vc", "en-vg", "en-vi", "en-vu", "en-ws", "en-za", "en-zm", "en-zw", "en", "es-ar", "es-bo", "es-cl", "es-co", "es-cr", "es-cu", "es-do", "es-ea", "es-ec", "es-es", "es-gq", "es-gt", "es-hn", "es-ic", "es-mx", "es-ni", "es-pa", "es-pe", "es-ph", "es-pr", "es-py", "es-sv", "es-us", "es-uy", "es-ve", "es", "et-ee", "et", "eu-es", "eu", "fa-af", "fa-ir", "fa", "fi-fi", "fi", "fil-ph", "fil", "fr-be", "fr-bf", "fr-bi", "fr-bj", "fr-bl", "fr-ca", "fr-cd", "fr-cf", "fr-cg", "fr-ch", "fr-ci", "fr-cm", "fr-dj", "fr-dz", "fr-fr", "fr-ga", "fr-gf", "fr-gn", "fr-gp", "fr-gq", "fr-ht", "fr-km", "fr-lu", "fr-ma", "fr-mc", "fr-mf", "fr-mg", "fr-ml", "fr-mq", "fr-mr", "fr-mu", "fr-nc", "fr-ne", "fr-pf", "fr-pm", "fr-re", "fr-rw", "fr-sc", "fr-sn", "fr-sy", "fr-td", "fr-tg", "fr-tn", "fr-vu", "fr-wf", "fr-yt", "fr", "hi-in", "hi", "hr-ba", "hr-hr", "hr", "hu-hu", "hu", "hy-am", "hy", "is-is", "is", "it-ch", "it-it", "it-sm", "it", "ja-jp", "ja", "ka-ge", "ka", "kab-dz", "kab", "kam-ke", "kam", "kk-cyrl-kz", "kk-cyrl", "kk", "kkj-cm", "kkj", "kl-gl", "kl", "kln-ke", "kln", "km-kh", "km", "ko-kp", "ko-kr", "ko", "kok-in", "kok", "lo-la", "lo", "lt-lt", "lt", "mg-mg", "mg", "mgh-mz", "mgh", "mgo-cm", "mgo", "mk-mk", "mk", "mn-cyrl-mn", "mn-cyrl", "mn", "ms-bn", "ms-latn-bn", "ms-latn-my", "ms-latn-sg", "ms-latn", "ms-my", "ms", "mt-mt", "mt", "ne-in", "ne-np", "ne", "nl-aw", "nl-be", "nl-bq", "nl-cw", "nl-nl", "nl-sr", "nl-sx", "nl", "no-no", "no", "pl-pl", "pl", "pt-ao", "pt-br", "pt-cv", "pt-gw", "pt-mo", "pt-mz", "pt-pt", "pt-st", "pt-tl", "pt", "ro-md", "ro-ro", "ro", "rof-tz", "rof", "ru-by", "ru-kg", "ru-kz", "ru-md", "ru-ru", "ru-ua", "ru", "shi-latn-ma", "shi-latn", "shi-tfng-ma", "shi-tfng", "shi", "sk-sk", "sk", "sl-si", "sl", "sq-al", "sq-mk", "sq-xk", "sq", "sr-cyrl-ba", "sr-cyrl-me", "sr-cyrl-rs", "sr-cyrl-xk", "sr-cyrl", "sr-latn-ba", "sr-latn-me", "sr-latn-rs", "sr-latn-xk", "sr-latn", "sr", "sv-ax", "sv-fi", "sv-se", "sv", "th-th", "th", "tl", "to-to", "to", "tr-cy", "tr-tr", "tr", "uk-ua", "uk", "uz-arab-af", "uz-arab", "uz-cyrl-uz", "uz-cyrl", "uz-latn-uz", "uz-latn", "uz", "vi-vn", "vi", "zh-cn", "zh-hans-cn", "zh-hans-hk", "zh-hans-mo", "zh-hans-sg", "zh-hans", "zh-hant-hk", "zh-hant-mo", "zh-hant-tw", "zh-hant", "zh-hk", "zh-tw", "zh");
        
        // If their locale exists in the locale list, use it. Otherwise, use the locale from their selected language.
        if (locales.indexOf(localStorage.getItem("locale")) >= 0) {
            return localStorage.getItem("locale");
        } else {
            return language;
        }

    }

    function cleanPrice(price) {
        // Strip everything except numbers and decimals

        if (typeof price === 'undefined' || price == null) {
            return "";
        }

        var cleanedPrice = price.toString().replace(/[^0-9\.\s]/g, '').trim();

        if (isNaN(cleanedPrice) == true || cleanedPrice.trim() == "") {
            // The value is not reasonably close enough for it to be a valid price. Just return the original input.
            return price;
        } else {
            // Truncate at two decimal places.
            return parseFloat(cleanedPrice).toFixed(2);
        }
    }
    
    return {
        setCookie: setCookie,
        getCookie: getCookie,
        deleteCookie: deleteCookie,
        getPageHashParameters: getPageHashParameters,
        getHashParameters: getHashParameters,
        getPageQueryParameters: getPageQueryParameters,
        getQueryParameters: getQueryParameters,
        appendParams: appendParams,
        left: left,
        right: right,
        isValidNumber: isValidNumber,
        isValidInteger: isValidInteger,
        getRandom: getRandom,
        stringsToBool: stringsToBool,
        stringToBool: stringToBool,
        hasProperty: hasProperty,
        areEqual: areEqual,
        sumProperties: sumProperties,
        isNullOrEmpty: isNullOrEmpty,
        resetCookieExpiration: resetCookieExpiration,
        removeWhitespace: removeWhitespace,
        luhnCheck: luhnCheck,
        undefinedToNull: undefinedToNull,
        parseQueryParameters: parseQueryParameters,
        isValidEmail: isValidEmail,
        getChildrenElements: getChildrenElements,
        getSiblingElements: getSiblingElements,
        convert: convert,
        getCurrentIsoDate: getCurrentIsoDate,
        repeat: repeat,
        mergeParams: mergeParams,
        deDuplicateCsv: deDuplicateCsv,
        getLocale: getLocale,
        cleanPrice: cleanPrice
    };

})();

// Prototypes
String.prototype.replaceAll = function (f, r) {
    return this.split(f).join(r);
}

var app = angular.module("data-export", ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngFileSaver', 'ui.bootstrap', 'ui.bootstrap.tpls', 'angular-loading-bar', 'gettext', 'duScroll', 'tmh.dynamicLocale']);

app.config(function ($httpProvider, $routeProvider, $locationProvider, $provide, cfpLoadingBarProvider, tmhDynamicLocaleProvider) {

    // Configure the app routes
    $routeProvider.when("/", { templateUrl: "app/pages/root.html", controller: "RootController" });

    // Loading bar https://github.com/chieffancypants/angular-loading-bar A global loading bar when HTTP requests are being made so you don't have to manually trigger spinners on each ajax call.
    cfpLoadingBarProvider.latencyThreshold = 300;
    cfpLoadingBarProvider.includeSpinner = false;

    // Dynamically load locale files
    tmhDynamicLocaleProvider.localeLocationPattern("https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.4.8/angular-locale_{{locale}}.js");

});

app.run(function ($rootScope) {

    // There is another app.run function in run.js. This app.run is here for settings that apply to kit's direct implementation and wouldn't necessarily be done the same way by apps that consume kit.js.
    // Only things that are not desirable to port into other apps should be here. Otherise you should use run.js.

    // This defines the languages supported by the app. Each supported language must have an associated translation file in the languages folder. It ain't magic.
    $rootScope.languages = [
        {
            code: "en",
            name: "English"
        },        
        {
            code: "cs",
            name: "čeština"
        },
        {
            code: "de",
            name: "Deutsche"
        },
        {
            code: "el",
            name: "Ελληνικά"
        },
        {
            code: "es",
            name: "Español"
        },                
        {
            code: "fi",
            name: "Suomalainen"
        },
        {
            code: "fr",
            name: "français"
        },            
        {
            code: "it",
            name: "italiano"
        },
        {
            code: "ja",
            name: "日本語"
        },
        {
            code: "ko",
            name: "한국어"
        },
        {
            code: "nl",
            name: "Nederlands"
        },
        {
            code: "pl",
            name: "Polskie"
        },
        {
            code: "pt",
            name: "Português"
        },
        {
            code: "ru",
            name: "русский"
        },            
        {
            code: "sv",
            name: "svenska"
        }
    ]

    // Analytics. Watch for route changes and load analytics accordingly.
    $rootScope.$on('$locationChangeSuccess', function () {
        if (window.__pageview && window.__pageview.recordPageLoad) {
            window.__pageview.recordPageLoad();
        }
    });

});

// The following code needs to run after app.js and after utilities.js are loaded but before any directive, controller, etc. are run. This bootstraps the app at run time with the initial settings and configurations.

app.run(function ($rootScope, $http, SettingsService, StorageService, LanguageService, ApiService) {

        // Get the settings
        var settings = SettingsService.get();

        // Enable CORS when running in development environments.
        if (settings.config.development) {
            $http.defaults.useXDomain = true;
        }

    // Establish the app language
        LanguageService.establishLanguage($rootScope.languagesPath);

        // Establish the pageview load code. This is used to send Analytics data to the platform.
        var loadPageview = function () {

            // Find the pageview script in the DOM. If present, append the pageview analytics source to the page. Replace any previous to not pollute the page with each pageview.
            var app_pageview = document.getElementById("app_pageview");

            if (app_pageview && settings.config.development != true) {
                var head = document.getElementsByTagName("head")[0];
                var js = document.createElement("script");
                js.id = "app_pageviewload";
                js.type = "text/javascript";
                js.src = "analytics/pageview.js";

                // Remove any existing
                if (document.getElementById("app_pageviewload") != null) {
                    head.removeChild(document.getElementById("app_pageviewload"));
                }

                // Add again to force reload.
                head.appendChild(js);
            }
        }

    });


app.directive('updateIncludeFields', function () {
    var linkFn = function (scope, element, attrs) {
        var availableIncludes = {
            payments: [
              { 'value': 'fee_summary', 'label': 'Fee Summary' },
            ],
            refunds: [
              { 'value': 'payment', 'label': 'Payment' },
              { 'value': 'fee_summary', 'label': 'Fee Summary' },
            ],
            orders: [
              { 'value': 'customer', 'label': 'Customer' },
              { 'value': 'fee_summary', 'label': 'Fee Summary' },
            ],
            order_items: [
              { 'value': 'customer', 'label': 'Customer' },
              { 'value': 'fee_summary', 'label': 'Fee Summary' },
            ],
            invoices: [
              { 'value': 'customer', 'label': 'Customer' },
            ]
        };

        scope.toggleCheckbox = function (resource, field, value) {
            if (angular.isUndefined(resource[field])) resource[field] = [];
            var list = resource[field];
            var idx = list.indexOf(value);
            if (idx >= 0) {
                list.splice(idx, 1);
            } else {
                list.push(value);
            }
        };

        scope.$watch(function () {
            return scope.options.dataset;
        }, function (newValue) {
            scope.includes = [];
            scope.options.expand = [];
            if (angular.isDefined(availableIncludes[newValue])) {
                scope.includes = availableIncludes[newValue];
            }
        });
    };

    return {
        restrict: 'A',
        scope: true,
        link: linkFn
    }
});

app.directive('displaySuccessField', function () {
    var linkFn = function (scope, element, attrs) {
        scope.$watch(function () {
            return scope.options.dataset;
        }, function (newValue) {
            switch (newValue) {
                case 'payments':
                case 'refunds':
                    element.css('display', 'inline');
                    scope.successValues = [
                      { 'value': '', 'label': 'Any' },
                      { 'value': 'true', 'label': 'True' },
                      { 'value': 'false', 'label': 'False' }
                    ];
                    if (angular.isUndefined(scope.options.success)) scope.options.success = 'true';
                    break;
                case 'invoices':
                case 'orders':
                case 'fees':
                default:
                    delete scope.options['success'];
                    element.css('display', 'none');
                    scope.successValues = [];
            };
        });
    };

    return {
        restrict: 'A',
        scope: true,
        link: linkFn
    }
});

app.directive('displayCurrencyTypeField', function () {
    var linkFn = function (scope, element, attrs) {
        scope.$watch(function () {
            return scope.options.dataset;
        }, function (newValue) {
            switch (newValue) {
                case 'reports/tax':
                    element.css('display', 'inline');
                    scope.currencyTypeValues = [
                      { 'value': 'settlement', 'label': 'Settlement' },
                      { 'value': 'payment', 'label': 'Payment' }
                    ];
                    if (angular.isUndefined(scope.options.currency_type)) scope.options.currency_type = 'settlement';
                    break;
                default:
                    delete scope.options['currency_type'];
                    element.css('display', 'none');
                    scope.currencyTypeValues = [];
            };
        });
    };

    return {
        restrict: 'A',
        scope: true,
        link: linkFn
    }
});


app.directive('updateStatusFields', function () {
    var linkFn = function (scope, element, attrs) {
        var defaultStatuses = [
          { 'value': '', 'label': 'Any' },                // Export all
          { 'value': 'unpaid', 'label': 'Unpaid' },       // Used with Carts, Invoices
          { 'value': 'scheduled', 'label': 'scheduled' }, // Used with Invoices
          { 'value': 'initiated', 'label': 'initiated' }, // Used on Payments which are created but not authorized yet.
          { 'value': 'pending', 'label': 'pending' },     // Used with Payments, Carts, Invoices, Refunds, Orders
          { 'value': 'completed', 'label': 'completed' }, // Used with Payments, Carts, Invoices, Refunds, Orders
          { 'value': 'failed', 'label': 'failed' },       // Used with Payments, Carts, Invoices, Refunds
          { 'value': 'cancelled', 'label': 'cancelled' }, // Used with Payments, Carts, Invoices, Orders
          { 'value': 'refunded', 'label': 'refunded' },   // Used with Payments, Carts, Invoices, Orders
          { 'value': 'retry', 'label': 'retry' }          // Used with Payments, Invoices
        ];

        scope.$watch(function () {
            return scope.options.dataset;
        }, function (newValue) {
            newValue = 'DoNotDisplayForNow';
            switch (newValue) {
                case 'orders':
                    scope.options.statusField = 'payment_status';
                    scope.options.status = 'completed';
                    scope.statusesLabel = 'Payment Status';
                    scope.statuses = [
                      { 'value': '', 'label': 'Any' },                // Export all
                      { 'value': 'pending', 'label': 'pending' },     // Used with Payments, Carts, Invoices, Refunds, Orders
                      { 'value': 'completed', 'label': 'completed' }, // Used with Payments, Carts, Invoices, Refunds, Orders
                      { 'value': 'cancelled', 'label': 'cancelled' }, // Used with Payments, Carts, Invoices, Orders
                      { 'value': 'refunded', 'label': 'refunded' }    // Used with Payments, Carts, Invoices, Orders
                    ];
                    break;
                case 'invoices':
                    scope.options.statusField = 'payment_status';
                    scope.options.status = 'completed';
                    scope.statusesLabel = 'Payment Status';
                    scope.statuses = [
                      { 'value': '', 'label': 'Any' },                // Export all
                      { 'value': 'unpaid', 'label': 'Unpaid' },       // Used with Carts, Invoices
                      { 'value': 'scheduled', 'label': 'scheduled' }, // Used with Invoices
                      { 'value': 'pending', 'label': 'pending' },     // Used with Payments, Carts, Invoices, Refunds, Orders
                      { 'value': 'completed', 'label': 'completed' }, // Used with Payments, Carts, Invoices, Refunds, Orders
                      { 'value': 'failed', 'label': 'failed' },       // Used with Payments, Carts, Invoices, Refunds
                      { 'value': 'cancelled', 'label': 'cancelled' }, // Used with Payments, Carts, Invoices, Orders
                      { 'value': 'refunded', 'label': 'refunded' },   // Used with Payments, Carts, Invoices, Orders
                      { 'value': 'retry', 'label': 'retry' }          // Used with Payments, Invoices
                    ];
                    break;
                case 'payments':
                    scope.options.statusField = 'status';
                    scope.options.status = 'completed';
                    scope.statusesLabel = 'Status';
                    scope.statuses = [
                      { 'value': '', 'label': 'Any' },                // Export all
                      { 'value': 'initiated', 'label': 'initiated' }, // Used on Payments which are created but not authorized yet.
                      { 'value': 'pending', 'label': 'pending' },     // Used with Payments, Carts, Invoices, Refunds, Orders
                      { 'value': 'completed', 'label': 'completed' }, // Used with Payments, Carts, Invoices, Refunds, Orders
                      { 'value': 'failed', 'label': 'failed' },       // Used with Payments, Carts, Invoices, Refunds
                      { 'value': 'cancelled', 'label': 'cancelled' }, // Used with Payments, Carts, Invoices, Orders
                      { 'value': 'refunded', 'label': 'refunded' },   // Used with Payments, Carts, Invoices, Orders
                      { 'value': 'retry', 'label': 'retry' }          // Used with Payments, Invoices
                    ];
                    break;
                case 'refunds':
                    scope.options.statusField = 'status';
                    scope.options.status = 'completed';
                    scope.statusesLabel = 'Status';
                    scope.statuses = [
                      { 'value': '', 'label': 'Any' },                // Export all
                      { 'value': 'pending', 'label': 'pending' },     // Used with Payments, Carts, Invoices, Refunds, Orders
                      { 'value': 'completed', 'label': 'completed' }, // Used with Payments, Carts, Invoices, Refunds, Orders
                      { 'value': 'failed', 'label': 'failed' },       // Used with Payments, Carts, Invoices, Refunds
                    ];
                    break;
                case 'fees':
                default:
                    scope.options.statusField = '';
                    scope.options.status = '';
                    scope.statusLabel = '';
                    scope.statuses = [];
            };
        });
    };

    return {
        restrict: 'A',
        scope: true,
        link: linkFn
    }
});


app.factory('appCache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('appCache');
}]);

app.factory('fetchData', function (ApiService, $q, buildRootUrl) {
    var _cancel = function (scope) {
        if (angular.isFunction(scope.cancelFunc)) {
            scope.cancelFunc();
            scope.cancelFunc = undefined;
            return true;
        }
        return false;
    }

    return function (scope, options, datepicker) {
        var deferred = $q.defer();
        var url = buildRootUrl(options, datepicker);
        var success = null;
        if (angular.isDefined(options.success) && options.success.length) {
            success = options.success == 'true';
        }
        var data = [];
        scope.cancelFunc = scope.$watch(function () {
            return url;
        }, function (next) {
            if (angular.isUndefined(next) || next == null) return;
            ApiService.getList(next).then(
              function (response) {
                  var d = response.data;
                  var next_page = d.next_page_url;
                  if (angular.isArray(d.data)) {
                      for (var i in d.data) {
                          var row = d.data[i];
                          if (typeof success == 'boolean') {
                              if (success != row.success) continue;
                          }
                          data.push(row);
                      }
                  }
                  if (angular.isUndefined(next_page) || next_page == null) {
                      deferred.resolve(data);
                      _cancel(scope);
                      return;
                  }
                  url = next_page;
              }, function (error) {
                  _cancel(scope);
                  deferred.reject(error);
              }
            );
        });
        return deferred.promise;
    };
});

app.factory('buildRootUrl', function ($httpParamSerializer) {
    return function (options, datepicker) {
        var query = {
            date_start: options.dates,
            date_end: options.dates,
            timezone: options.timezone
        };

        if (angular.isDefined(options.statusField) && options.statusField.length && angular.isDefined(options.status)) {
            query[options.statusField] = options.status;
        }

        if (angular.isDefined(options.currency_type) && angular.isDefined(options.currency_type)) {
            query['currency_type'] = options.currency_type;
        }

        if (angular.isArray(options.expand) && options.expand.length) {
            query['expand'] = options.expand.join(',');
        } else if (angular.isString(options.expand) && options.expand.length) {
            query['expand'] = options.expand;
        }

        // Override if necessary
        switch (options.dates) {
            case "last_30":
                query.date_start = -29;
                query.date_end = 0;
                break;
            case "last_7":
                query.date_start = -6;
                query.date_end = 0;
                break;
            case "custom":

                if (!datepicker.date_end) datepicker.date_end = new Date();
                if (!datepicker.date_start) datepicker.date_start = datepicker.date_end;

                query.date_start = datepicker.date_start.toISOString().substring(0, 10);
                query.date_end = datepicker.date_end.toISOString().substring(0, 10);
                break;
        }

        var resource = angular.copy(options.dataset);

        if (resource == "orders") {
            query.hide = "items";
        }

        if (resource == "order_items") {
            resource = "orders";
        }

        return '/' + resource + '?' + $httpParamSerializer(query);
    };
});


app.factory('saveFile', function (FileSaver, Blob) {
    return function (name, type, text) {
        var data = new Blob([text], { type: type });
        FileSaver.saveAs(data, name);
    };
});

app.factory('toCSV', function () {
    var doOrderItemFeeSummary = function (row) {
        var items_count = row['items_count'];
        var item_subtotal = row['items.settlement_subtotal'];
        var subtotal = row['settlement_subtotal'];
        var fee_total = row['fee_summary.total']
        row['fees'] = subtotal != 0.00 ? fee_total * item_subtotal / subtotal : fee_total / items_count;
        row['fees_currency'] = row['fee_summary.currency'];
        for (var key in row) {
            if (key.match(/^fee_summary/)) delete row[key];
        }
    }
    var doOrderItemSplitOrderDiscount = function (row) {
        var fields = ['discount', 'settlement_discount'];
        var items_count = row['items_count'];
        var item_subtotal = row['items.settlement_subtotal'];
        var subtotal = row['settlement_subtotal'];
        var rate = subtotal != 0.00 ? item_subtotal / subtotal : 1 / items_count;
        for (var idx in fields) {
            var field = fields[idx];
            var order_discount = row[field];
            var item_discount = row['items.' + field];
            row['adjusted_' + field] = item_discount + order_discount * rate;
        }
    }
    var doit = true;
    var doOrderItemRebillInfo = function (row) {
        row['new_sub'] = row['subscription'] == null && row['items.subscription'] != null ? 'true' : 'false';
        row['rebill'] = row['subscription'] != null && row['items.subscription'] != null ? 'true' : 'false';
    }
    var doOrderItemCalcs = function (row, options) {
        if (options.expand.indexOf('fee_summary') >= 0) doOrderItemFeeSummary(row);
        doOrderItemSplitOrderDiscount(row);
        doOrderItemRebillInfo(row);
    }

    var doCalcs = function (row, options) {
        if (options.dataset == 'order_items')
            doOrderItemCalcs(row, options);
    }

    var mergeNestedObjects = function (parent) {
        if (angular.isArray(parent) || !angular.isObject(parent)) return;
        var keys = Object.keys(parent);
        for (var k in keys) {
            var key = keys[k];
            mergeNestedObjects(parent[key]);
        }

        var keys1 = Object.keys(parent);
        for (var k1 in keys1) {
            var key1 = keys1[k1];
            var value1 = parent[key1];
            if (angular.isArray(value1) || !angular.isObject(value1)) continue;
            var keys2 = Object.keys(value1);
            for (var k2 in keys2) {
                var key2 = keys2[k2];
                var value2 = value1[key2];
                parent[key1 + '.' + key2] = value2;
            }
            delete parent[key1];
        }
    };

    var to_csv = function (data, options) {
        var unraveled = [];
        // Unravel items if present, otherwise just push object on to unraveled.
        var commonFields = [];
        for (var i in data) {
            var row = angular.copy(data[i]);
            var rowKeys = Object.keys(row);
            if (angular.isDefined(options.unravelField) && angular.isArray(row[options.unravelField])) {
                var items = row[options.unravelField];
                delete row[options.unravelField];
                for (var j in items) {
                    var item = angular.copy(items[j]);
                    var keys = Object.keys(item);
                    for (var k in keys) {
                        var key = keys[k];
                        if (rowKeys.includes(key) && !commonFields.includes(key)) commonFields.push(key);
                        var value = item[key];
                        delete item[key];
                        item[options.unravelField + '.' + key] = value;
                    }
                    unraveled.push(
                      angular.merge(item, row)
                    );
                }
            } else {
                unraveled.push(row);
            }
        }

        // Merge nested objects
        for (var i in unraveled) {
            mergeNestedObjects(unraveled[i]);
        }

        var excludeColumns = [];
        // Remove nested arrays and/or api urls.
        for (var i in unraveled) {
            var row = unraveled[i];
            doCalcs(row, options);
            var keys = Object.keys(row);
            for (var j in keys) {
                var key = keys[j];
                if (key == 'order') {
                    if (row[key] && row[key].length) {
                        row['has_order'] = true;
                        row['order_id'] = row[key].replace(/.*\/api\/v1\/orders\//, '');
                    } else {
                        row['has_order'] = false;
                        row['order_id'] = '';
                    }
                }

                if (angular.isArray(row[key]) || key.match(/object$/)) {
                    if (excludeColumns.indexOf(key) < 0) excludeColumns.push(key);
                    delete row[key];
                    continue;
                }

                if (angular.isString(row[key]) && row[key].match(/\/api\/v1\//)) {
                    if (excludeColumns.indexOf(key) < 0) excludeColumns.push(key);
                    delete row[key];
                    continue;
                }

                // remove T and Z from dates so excel treats as dates
                if (key.match(/(_|\b)date(_|\b)/) && row[key]) {
                    row[key] = row[key].replace('T', ' ').replace('Z', '');
                }

            }
        }

        // Everything is done. now figure out columns to display.
        var columns = [];
        for (var i in unraveled) {
            var row = unraveled[i];
            var keys = Object.keys(row);
            for (var j in keys) {
                var key = keys[j];
                if (excludeColumns.indexOf(key) >= 0) continue;
                if (columns.indexOf(key) >= 0) continue;
                columns.push(key);
            }
        }

        return Papa.unparse(unraveled, { columns: columns });
    };
    return to_csv;
});

app.service("TimezonesService", [function () {

    // Return public API.
    return ({
        getTimezones: getTimezones,
    });

    function getTimezones() {

        var timezones = ["Asia/China", "America/Alaska", "America/Atlantic_Time", "America/Arizona", "America/Central_Time", "America/Eastern_Time", "America/Hawaii", "America/Mountain_Time", "America/Newfoundland", "America/Pacific_Time", "Europe/Central", "Europe/Eastern", "Europe/GMT", "Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara", "Africa/Asmera", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Kampala", "Africa/Khartoum", "Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Porto-Novo", "Africa/Sao_Tome", "Africa/Timbuktu", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek", "America/Adak", "America/Anchorage", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/ComodRivadavia", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Atikokan", "America/Atka", "America/Bahia", "America/Barbados", "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Buenos_Aires", "America/Cambridge_Bay", "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Catamarca", "America/Cayenne", "America/Cayman", "America/Chicago", "America/Chicago", "America/Chihuahua", "America/Coral_Harbour", "America/Cordoba", "America/Costa_Rica", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson", "America/Dawson_Creek", "America/Denver", "America/Denver", "America/Detroit", "America/Dominica", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Ensenada", "America/Fort_Wayne", "America/Fortaleza", "America/Glace_Bay", "America/Godthab", "America/Goose_Bay", "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Indianapolis", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Jujuy", "America/Juneau", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Knox_IN", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Los_Angeles", "America/Louisville", "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique", "America/Matamoros", "America/Mazatlan", "America/Mendoza", "America/Menominee", "America/Merida", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey", "America/Montevideo", "America/Montreal", "America/Montserrat", "America/Nassau", "America/New_York", "America/New_York", "America/Nipigon", "America/Nome", "America/Noronha", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Ojinaga", "America/Panama", "America/Pangnirtung", "America/Paramaribo", "America/Phoenix", "America/Phoenix", "America/Port_of_Spain", "America/Port-au-Prince", "America/Porto_Acre", "America/Porto_Velho", "America/Puerto_Rico", "America/Puerto_Rico", "America/Rainy_River", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Rosario", "America/Santa_Isabel", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Shiprock", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Swift_Current", "America/Tegucigalpa", "America/Thule", "America/Thunder_Bay", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver", "America/Virgin", "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife", "Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Palmer", "Antarctica/Rothera", "Antarctica/South_Pole", "Antarctica/Syowa", "Antarctica/Vostok", "Arctic/Longyearbyen", "Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Ashkhabad", "Asia/Baghdad", "Asia/Bahrain", "Asia/Baku", "Asia/Bangkok", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Calcutta", "Asia/Choibalsan", "Asia/Chongqing", "Asia/Chungking", "Asia/Colombo", "Asia/Dacca", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Gaza", "Asia/Harbin", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Istanbul", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", "Asia/Kamchatka", "Asia/Karachi", "Asia/Kashgar", "Asia/Kathmandu", "Asia/Katmandu", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Kuwait", "Asia/Macao", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qyzylorda", "Asia/Rangoon", "Asia/Riyadh", "Asia/Saigon", "Asia/Sakhalin", "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Tel_Aviv", "Asia/Thimbu", "Asia/Thimphu", "Asia/Tokyo", "Asia/Ujung_Pandang", "Asia/Ulaanbaatar", "Asia/Ulan_Bator", "Asia/Urumqi", "Asia/Vientiane", "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yekaterinburg", "Asia/Yerevan", "Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faeroe", "Atlantic/Faroe", "Atlantic/Jan_Mayen", "Atlantic/Madeira", "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/St_Helena", "Atlantic/Stanley", "Australia/ACT", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Canberra", "Australia/Currie", "Australia/Darwin", "Australia/Eucla", "Australia/Hobart", "Australia/LHI", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/North", "Australia/NSW", "Australia/Perth", "Australia/Queensland", "Australia/South", "Australia/Sydney", "Australia/Tasmania", "Australia/Victoria", "Australia/West", "Australia/Yancowinna", "Europe/Amsterdam", "Europe/Andorra", "Europe/Athens", "Europe/Belfast", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest", "Europe/Budapest", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul", "Europe/Jersey", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Lisbon", "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Nicosia", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", "Europe/Samara", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Simferopol", "Europe/Skopje", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", "Europe/Tiraspol", "Europe/Uzhgorod", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zaporozhye", "Europe/Zurich", "Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte", "Indian/Reunion", "Pacific/Apia", "Pacific/Auckland", "Pacific/Chatham", "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Honolulu", "Pacific/Johnston", "Pacific/Kiritimati", "Pacific/Kosrae", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", "Pacific/Pitcairn", "Pacific/Ponape", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Saipan", "Pacific/Samoa", "Pacific/Tahiti", "Pacific/Tarawa", "Pacific/Tongatapu", "Pacific/Truk", "Pacific/Wake", "Pacific/Wallis", "Pacific/Yap", "UTC"];

        return timezones;
    }

}]);

app.service("ApiService", ['$http', '$q', '$location', 'SettingsService', 'HelperService', 'StorageService', '$rootScope', 'gettextCatalog', function ($http, $q, $location, SettingsService, HelperService, StorageService, $rootScope, gettextCatalog) {

    // Return public API.
    return {
        create: create,
        getItem: getItem,
        getList: getList,
        update: update,
        remove: remove,
        getItemPdf: getItemPdf,
        getToken: getToken,
        getTokenExpiration: getTokenExpiration
    };

    function getTokenExpiration(expiresInSeconds) {

        // The header response tells us when the cookie expires. Note that the expiration date slides, we'll update the token expiration with every API call.
        var expiresInMinutes = 360; // 6 hours, default if for some reason we didn't get a header value.

        if (expiresInSeconds != null && isNaN(expiresInSeconds) == false) {
            expiresInMinutes = expiresInSeconds / 60;
        }

        // Subtract 5 minutes to ensure we'll be less than the server.
        expiresInMinutes = expiresInMinutes - 10;

        return expiresInMinutes;

    }

    function getToken() {

        var deferred = $q.defer();

        var token = StorageService.get("token");

        if (token != null) {
            deferred.resolve(token);
            return deferred.promise;
        }

        // The account_id is only needed in development environments. The hosted environment can call this endpoint without the account_id and it will be determined on the api side from the hostname.
        var parameters = { browser_info: true };
        var settings = SettingsService.get();

        if (settings.account.account_id && settings.config.development == true) {
            parameters = _.extend(parameters, { account_id: settings.account.account_id });
        }

        // Prepare the url
        var endpoint = buildUrl("/auths/limited", settings);

        var request = $http({
            ignoreLoadingBar: false,
            method: "post",
            url: endpoint + "?timezone=UTC",
            params: parameters,
            timeout: 15000,
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Get the token
        request.then(function (response) {

            StorageService.set("token", response.data.token, response.headers("X-Token-Expires-In-Seconds"));
            StorageService.set("locale", response.data.browser_info.locale);
            StorageService.set("language", response.data.browser_info.language);

            // If you got a new token, delete any cart_id or invoice_id cookie. The new token won't be bound to them and letting them remain will cause a conflict when the new token tries to access a cart_id that it's not associated with.
            StorageService.remove("cart_id");
            StorageService.remove("invoice_id");

            deferred.resolve(response.data.token);
        }, function (error) {
            deferred.reject({ type: "internal_server_error", reference: "6lnOOW1", code: "unspecified_error", message: "There was a problem obtaining authorization for this session. Please reload the page to try your request again.", status: error.status });
        });

        return deferred.promise;
    }

    function create(data, url, parameters, quiet) {

        var deferred = $q.defer();

        getToken().then(function (token) {

            if (data == null) {
                data = undefined;
            }

            // Get the settings
            var settings = SettingsService.get();

            // Prepare the url
            var endpoint = buildUrl(url, settings);

            // Timeout is high to handle payment requests that return slowly.
            var request = $http({
                ignoreLoadingBar: quiet,
                method: "post",
                data: angular.toJson(data),
                url: endpoint + "?timezone=UTC",
                params: parameters,
                timeout: 65000,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });

            request.then(function (response) { onApiSuccess(response, deferred); }, function (error) { onApiError(error, deferred); });

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function getItem(url, parameters, quiet) {

        var deferred = $q.defer();

        getToken().then(function (token) {

            // Get the settings
            var settings = SettingsService.get();

            // Prepare the url
            var endpoint = buildUrl(url, settings);

            var request = $http({
                ignoreLoadingBar: quiet,
                method: "get",
                url: endpoint + "?timezone=UTC",
                params: parameters,
                timeout: 15000,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });

            request.then(function (response) { onApiSuccess(response, deferred); }, function (error) { onApiError(error, deferred); });

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function getList(url, parameters, quiet) {

        var deferred = $q.defer();

        getToken().then(function (token) {

            // Get the settings
            var settings = SettingsService.get();

            // Prepare the url
            var endpoint = buildUrl(url, settings);

            // Parse the query parameters in the url
            var queryParameters = utils.getQueryParameters(url);

            // Remove any query parameters that are explicitly provided in parameters
            _.each(parameters, function (item, index) {
                if (queryParameters[index] != null) {
                    delete queryParameters[index];
                }
            });

            // Remove the current query string
            if (url.indexOf("?") > 0) {
                url = url.substring(0, url.indexOf("?"));
            }

            // Append the parameters
            url = utils.appendParams(url, queryParameters);

            var request = $http({
                ignoreLoadingBar: quiet,
                method: "get",
                url: endpoint,
                params: parameters,
                timeout: 25000,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });

            request.then(function (response) { onApiSuccess(response, deferred); }, function (error) { onApiError(error, deferred); });

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function update(data, url, parameters, quiet) {

        var deferred = $q.defer();

        getToken().then(function (token) {

            // Get the settings
            var settings = SettingsService.get();

            // Prepare the url
            var endpoint = buildUrl(url, settings);

            if (data == null) {
                data = undefined;
            }

            var request = $http({
                ignoreLoadingBar: quiet,
                method: "post",
                data: angular.toJson(slim(data)),
                url: endpoint + "?timezone=UTC",
                params: parameters,
                timeout: 25000,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });

            request.then(function (response) { onApiSuccess(response, deferred); }, function (error) { onApiError(error, deferred); });

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function remove(url, parameters, quiet) {

        var deferred = $q.defer();

        getToken().then(function (token) {

            // Get the settings
            var settings = SettingsService.get();

            // Prepare the url
            var endpoint = buildUrl(url, settings);

            var request = $http({
                ignoreLoadingBar: quiet,
                method: "delete",
                url: endpoint + "?timezone=UTC",
                params: parameters,
                timeout: 15000,
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            });

            request.then(function (response) { onApiSuccess(response, deferred); }, function (error) { onApiError(error, deferred); });

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function getItemPdf(url, parameters, quiet) {

        var deferred = $q.defer();

        getToken().then(function (token) {

            // Get the settings
            var settings = SettingsService.get();

            // Prepare the url
            var endpoint = buildUrl(url, settings);

            var request = $http({
                ignoreLoadingBar: quiet,
                method: "get",
                url: endpoint + "?timezone=UTC",
                params: parameters,
                timeout: 15000,
                responseType: "arraybuffer",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Accept": "application/pdf"
                }
            });

            request.then(function (response) { onApiSuccess(response, deferred); }, function (error) { onApiError(error, deferred); });

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function buildUrl(endpoint, settings) {

        // If the url is fully qualified, just return it.
        if (endpoint.substring(0, 7) == "http://" || endpoint.substring(0, 8) == "https://") {
            return endpoint;
        } else {
            // The api prefix will contain the fully qualified URL if you are running in development mode. The prefix is defined during the app's bootstrap.
            return settings.config.apiPrefix + endpoint;
        }

    }

    function slim(data) {

        // Trim down the size of the payload
        if (data != null && typeof data === 'object') {
            var dataCopy = JSON.parse(JSON.stringify(data));

            if (dataCopy.object == "cart") {
                delete dataCopy.options;
                delete dataCopy.shipping_item;
                delete dataCopy.payments;
                _.each(dataCopy.items, function (item) {
                    delete item.subscription_terms;
                    delete item.url;
                    delete item.date_created;
                    delete item.date_modified;
                    delete item.formatted;
                    delete item.product;
                    delete item.subscription_plan;
                });
                delete dataCopy.customer.url;
                delete dataCopy.customer.payments;
                delete dataCopy.customer.refunds;
                delete dataCopy.customer.orders;
                delete dataCopy.customer.subscriptions;
                delete dataCopy.customer.invoices;
                delete dataCopy.promotion;
            }

            delete dataCopy.date_created;
            delete dataCopy.date_modified;
            delete dataCopy.object;
            delete dataCopy.url;
            delete dataCopy.test;
            delete dataCopy.account_id;
            delete dataCopy.formatted;
        }

        return dataCopy;

    }

    function onApiSuccess(response, defer) {

        // Update the token expiration date
        if (StorageService.get("token")) {
            StorageService.set("token", StorageService.get("token"), response.headers("X-Token-Expires-In-Seconds"));
        }

        return defer.resolve(response);
    }

    function onApiError(response, defer) {

        var error = {};

        if (response.data) {
            if (response.data.error) {
                error = response.data.error;
            }
        }

        var type;
        var reference;
        var code;
        var message;

        if (error) {

            if (error.type) {
                type = error.type;
            }

            if (error.code) {
                code = error.code;
            }

            if (error.reference) {
                reference = error.reference;
            }

            if (error.message) {
                message = error.message;
            }

        }

        // If your error is 401, then the token has died, or a login failure.
        if (response.status == 401) {

            // If the response code is invalid_login or account_locked, then don't get a new token. This is a failed login attempt and not a bad token.
            if (code != "invalid_login" && code != "account_locked") {

                // We'll do a full reset because the token is invalid and that means any associated cart_id is now orphaned.
                HelperService.newSessionRedirect(true, "Performing session reset due to invalid token in the cookie / request.");
            }
        }

        if (response.status == 403) {
            message = "There was a problem establishing your session. Please reload the page to try again.";
        }

        // If you don't have an error.message, then you didn't receive a normalized error message from the server. This should not happen rarely but prevents the application from having to consider edge cases where an unexpected response format is returned.
        if (!message) {

            switch (response.status) {
                case 404:
                    type = "not_found";
                    reference = "4jnJPb7";
                    code = "resource_not_found";
                    message = gettextCatalog.getString("The item you are trying to access could not be found.");
                    break;
                default:
                    type = "internal_server_error";
                    reference = "XEnf9FY";
                    code = "unspecified_error";
                    message = gettextCatalog.getString("An error occured while attempting to process your request. Please try your request again. If the problem persists, please contact support.");
            }

        }

        error.type = type;
        error.reference = reference;
        error.code = code;
        error.message = message;
        error.status = response.status;

        defer.reject(error);

    }

}]);

app.service("CartService", ['$http', '$q', '$rootScope', 'ApiService', 'PaymentService', 'SettingsService', 'HelperService', 'StorageService', function ($http, $q, $rootScope, ApiService, PaymentService, SettingsService, HelperService, StorageService) {

    // Return public API.
    return {
        create: create,
        get: get,
        update: update,
        addItem: addItem,
        getItems: getItems,
        pay: pay,
        login: login,
        logout: logout,
        fromParams: fromParams
    };

    function create(data, parameters, quiet, fromParams) {

        // The fromParams parameter indicates if this call is being made with a cart created from URL parameters.
        // This helps determine how invalid promotion codes should be handled.

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        // If defined, set the currency
        var currency = StorageService.get("currency");
        if (currency) {
            data.currency = currency;
        }

        var url = "/carts";
        ApiService.create(data, url, parameters, quiet).then(function (response) {
            var cart = response.data;
            // Set a cookie. The expiration date of this cookie will be the same as the token expiration, which we can get from the headers.
            StorageService.set("cart_id", cart.cart_id, response.headers("X-Token-Expires-In-Seconds"));

            // Set the display currency
            syncCurrency(cart.currency);

            deferred.resolve(cart);

        }, function (error) {

            // If the error is 400, the error code is "invalid_promotion_code" and the cart was built from URL parameters, replay the request without the promotion code.
            // This allows a user to still create a cart when the URL contains an invalid embedded promotion code, although without a promotion. But it allows the order to continue.
            if (error.code == "invalid_promotion_code" && fromParams) {
                delete data.promotion_code;
                create(data, parameters, quiet, false).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                // Jus reject it
                deferred.reject(error);
            }
        });

        return deferred.promise;

    }

    function get(parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);
        var cart_id = StorageService.get("cart_id");

        // Set up some stubs in the event of no cart or customer
        var customerStub = { billing_address: {}, shipping_address: {} };
        var cartStub = { items: [], customer: customerStub };

        if (cart_id) {
            var url = "/carts/" + cart_id;

            ApiService.getItem(url, parameters, quiet).then(function (response) {
                var cart = response.data;
                // If the customer is null, set a stub
                if (cart.customer == null) {
                    cart.customer = customerStub;
                }

                // If the billing country is null, supply from the ip address
                if (cart.customer.billing_address.country == null) {
                    cart.customer.billing_address.country = cart.customer_ip_country;
                }

                // If the shiping country is null, supply from the ip address
                if (cart.customer.shipping_address.country == null) {
                    cart.customer.shipping_address.country = cart.customer_ip_country;
                }

                // In case it changed, sync the currency
                syncCurrency(cart.currency);

                deferred.resolve(cart);

            }, function (error) {

                // If 404, perform a session reset.
                if (error.status == 404) {
                    HelperService.newSessionRedirect(true, "Performing a session reset due to an invalid cart_id in the cookie / request. (404 - cart not found)");
                }

                deferred.reject(error);
            });

        } else {
            // Return an empty cart. Build a stub object to make it easy to reference deep items even before a cart is created.
            deferred.resolve(cartStub);
        }

        return deferred.promise;

    }

    function update(data, parameters, quiet, fromParams) {

        // The fromParams parameter indicates if this call is being made with a cart created from URL parameters.
        // This helps determine how invalid promotion codes should be handled.

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);
        var cart_id = StorageService.get("cart_id");

        if (cart_id) {

            var url = "/carts/" + cart_id;
            ApiService.update(data, url, parameters, quiet).then(function (response) {

                var cart = response.data;
                // Update the cookie expiration date. The expiration date of this cookie will be the same as the token expiration, which we can get from the headers.
                StorageService.set("cart_id", cart.cart_id, response.headers("X-Token-Expires-In-Seconds"));

                // In case it changed, sync the currency
                syncCurrency(cart.currency);

                deferred.resolve(cart);

            }, function (error) {

                // If the error is 400, the error code is "invalid_promotion_code" and the cart was built from URL parameters, replay the request without the promotion code.
                // This allows a user to still create a cart when the URL contains an invalid embedded promotion code, although without a promotion. But it allows the order to continue.
                if (error.code == "invalid_promotion_code" && fromParams) {
                    delete data.promotion_code;
                    update(data, parameters, quiet, false).then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error);
                    });
                } else {
                    // If 404, perform a session reset.
                    if (error.status == 404) {
                        HelperService.newSessionRedirect(true, "Performing a session reset due to an invalid cart_id in the cookie / request. (404 - cart not found)");
                    }

                    // If invalid state, then the cart is already closed, perform a session reset.
                    if (error.code == "invalid_state") {
                        // Delete the cart_id as it can no longer be modified.
                        StorageService.remove("cart_id");
                        HelperService.newSessionRedirect(false, "Performing a cart_id reset due to an invalid cart_id in the cookie / request. (422 - invalid state): " + error.message);
                    }

                    deferred.reject(error);

                }

            });

            return deferred.promise;

        } else {

            // No cart exists. Create a new cart.
            return create(data, parameters, quiet, fromParams);

        }

    }

    function login(data, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);
        var cart_id = StorageService.get("cart_id");

        var url = "/carts/" + cart_id + "/login";
        ApiService.update(data, url, parameters, quiet).then(function (response) {

            var cart = response.data;
            // Update the cookie expiration date. The expiration date of this cookie will be the same as the token expiration, which we can get from the headers.
            StorageService.set("cart_id", cart.cart_id, response.headers("X-Token-Expires-In-Seconds"));

            // In case it changed, sync the currency
            syncCurrency(cart.currency);

            deferred.resolve(cart);

        }, function (error) {

            // If 404, perform a session reset.
            if (error.status == 404) {
                HelperService.newSessionRedirect(true, "Performing a session reset due to an invalid cart_id in the cookie / request. (404 - cart not found)");
            }

            deferred.reject(error);
        });

        return deferred.promise;

    }

    function logout(parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);
        var cart_id = StorageService.get("cart_id");

        var url = "/carts/" + cart_id + "/logout";
        ApiService.update(null, url, parameters, quiet).then(function (response) {

            var cart = response.data;
            // Update the cookie expiration date. The expiration date of this cookie will be the same as the token expiration, which we can get from the headers.
            StorageService.set("cart_id", cart.cart_id, response.headers("X-Token-Expires-In-Seconds"));

            // In case it changed, sync the currency
            syncCurrency(cart.currency);

            deferred.resolve(cart);

        }, function (error) {

            // If 404, perform a session reset.
            if (error.status == 404) {
                HelperService.newSessionRedirect(true, "Performing a session reset due to an invalid cart_id in the cookie / request. (404 - cart not found)");
            }

            deferred.reject(error);
        });

        return deferred.promise;

    }

    function addItem(data, parameters, quiet) {

        var deferred = $q.defer();

        if (data == null) {
            deferred.reject({ type: "bad_request", reference: "vbVcrcF", code: "invalid_input", message: "You must supply an item to add to the cart.", status: 400 });
            return deferred.promise;
        }

        parameters = setDefaultParameters(parameters);

        // Get the cart.
        get(parameters).then(function (cart) {

            // Check if the cart has already been created.
            if (cart.url) {
                // Is the item in the cart?
                var existingItem = _.findWhere(cart.items, data);

                if (existingItem != null) {
                    ApiService.update(data, existingItem.url, parameters, quiet).then(function (response) {

                        var item = response.data;
                        // In case it changed, sync the currency
                        syncCurrency(item.currency);

                        deferred.resolve(item);

                    }, function (error) {
                        deferred.reject(error);
                    });
                } else {
                    // Add it
                    ApiService.create(data, cart.url + "/items", parameters, quiet).then(function (response) {

                        var item = response.data;
                        // In case it changed, sync the currency
                        syncCurrency(item.currency);

                        deferred.resolve(item);

                    }, function (error) {
                        deferred.reject(error);
                    });
                }

            } else {
                // No cart created yet, create a cart with this item and send it.
                cart.items.push(data);
                create(cart, parameters, quiet).then(function (cart) {
                    deferred.resolve(_.findWhere(cart.items, { item_id: data.product_id }));
                }, function (error) {
                    deferred.reject(error);
                });
            }

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function getItems(parameters, quiet) {

        get(parameters, quiet).then(function (cart) {

            // In case it changed, sync the currency
            syncCurrency(cart.currency);

            deferred.resolve(cart.items);

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function pay(cart, payment_method, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        // Define a function to send the payment, which happens after we create or update the cart.
        var sendPayment = function (cart_id, payment_method) {

            // Create the payment url
            var url = "/carts/" + cart.cart_id + "/payments";

            // Run the payment
            PaymentService.create(payment_method, url, parameters, quiet).then(function (payment) {

                // If the payment status is completed or the payment status is pending and the payment method is credit card, delete the cart_id. Attempting to interact with a closed cart (due to a successful payment) will result in errors.
                if (payment.status == "completed" || payment.status == "pending") {
                    StorageService.remove("cart_id");
                }

                deferred.resolve(payment);

            }, function (error) {
                deferred.reject(error);
            });
        };

        // If there currently is no cart, create it. Otherwise, update the existing cart.
        if (cart.cart_id == null) {
            create(cart, parameters, quiet).then(function (cart) {
                sendPayment(cart.cart_id, payment_method);
            }, function (error) {
                deferred.reject(error);
            });

        } else {
            update(cart, parameters, quiet).then(function (cart) {
                sendPayment(cart.cart_id, payment_method);
            }, function (error) {
                deferred.reject(error);
            });
        }

        return deferred.promise;

    }

    function fromParams(cart, location) {

        // location should be the angular $location object

        var params = location.search();

        // We are looking for the following parameters. This can be exapnded at any time, as needed.
        // product_id:xxxx, promotion_code, currency, name, email.

        // If empty_cart is true, remove the items from the current cart.
        if (utils.stringToBool(params.empty_cart)) {
            cart.items = [];
            location.search("empty_cart", null);
        }

        // Find the product_ids
        for (var property in params) {
            if (params.hasOwnProperty(property)) {
                if (utils.left(property, 11) == "product_id:") {

                    var item = { product_id: property.substring(11) };
                    if (utils.isValidInteger(params[property]) == false) {
                        item.quantity = 1;
                    } else {
                        item.quantity = params[property];
                    }

                    // Remove the item if it already exists in the cart
                    var existingItem = _.find(cart.items, function (i) { return i.product_id == item.product_id; });
                    if (existingItem != null) {
                        cart.items = _.reject(cart.items, function (i) { return i.product_id == item.product_id; });
                    }

                    // Set the item into the cart
                    cart.items = cart.items || [];
                    cart.items.push(item);
                    location.search(property, null);

                }
            }
        }

        // Append the others
        if (params.promotion_code) {
            cart.promotion_code = params.promotion_code;
            location.search("promotion_code", null);
        }

        if (params.currency) {
            cart.currency = params.currency;
            location.search("currency", null);
        }

        if (params.name) {
            cart.customer.name = params.name;
            location.search("name", null);
        }

        if (params.email) {
            if (utils.isValidEmail(params.email)) {
                cart.customer.email = params.email;
            }
            location.search("email", null);
        }

        if (params.referrer) {
            cart.referrer = params.referrer;
            location.search("referrer", null);
        }

        if (params.affiliate_id) {
            cart.affiliate_id = params.affiliate_id;
            location.search("affiliate_id", null);
        }

        // If there are no customer properties, delete the customer property
        if (_.size(cart.customer) == 0) {
            delete cart.customer;
        }

        // Append any other parameters as meta
        params = location.search();

        for (var property in params) {
            if (params.hasOwnProperty(property)) {
                if (cart.meta == null) {
                    cart.meta = {};
                }
                cart.meta[property] = params[property];
            }
        }


        return cart;

    }

    function syncCurrency(newCurrency) {

        // This makes sure that the currency in cart payload responses automatically sync the stored currency value
        var currentCurrency = StorageService.get("currency");

        if (newCurrency != currentCurrency) {

            StorageService.set("currency", newCurrency);

            // Emit the change
            $rootScope.$emit("currencyChanged", newCurrency);
        }
    }

    function setDefaultParameters(parameters, quiet) {

        var parametersCopy = angular.copy(parameters);

        // Cart is a complicated object and a lot of directives interact with it at the same time. As such, we don't allow the show parameter. Too likely toes will get stepped on.
        if (parametersCopy) {
            parametersCopy.formatted = true;
            delete parametersCopy.show;
            return parametersCopy;
        } else {
            return { formatted: true, options: true };
        }

    }

}]);

app.service("InvoiceService", ['$http', '$q', '$rootScope', 'ApiService', 'PaymentService', 'SettingsService', 'HelperService', 'StorageService', '$location', function ($http, $q, $rootScope, ApiService, PaymentService, SettingsService, HelperService, StorageService, $location) {

    // Return public API.
    return {
        get: get,
        update: update,
        pay: pay
    };

    function get(parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        // Get the invoice ID
        var invoice_id = $location.search().invoice_id;
        if (!invoice_id) {
            invoice_id = StorageService.get("invoice_id");
        }

        var url = "/invoices/" + invoice_id;

        ApiService.getItem(url, parameters, quiet).then(function (response) {

            var invoice = response.data;
            StorageService.set("invoice_id", invoice.invoice_id);

            // In case it changed, sync the currency
            syncCurrency(invoice.currency);

            deferred.resolve(invoice);

        }, function (error) {

            // If 404, perform a redirect to base entry page. Don't perform a hard reset, just delete the invoice ID from storage and redirect. Also remove from the query string, if provided.
            if (error.status == 404) {
                $location.search("invoice_id", null);
                StorageService.remove("invoice_id");
                HelperService.newSessionRedirect(false, "Performing a redirect due to an invalid invoice_id in the cookie / request. (404 - invoice not found)");
            }

            deferred.reject(error);
        });

        return deferred.promise;

    }

    function update(data, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);
        var invoice_id = StorageService.get("invoice_id");

        var url = "/invoices/" + invoice_id;
        ApiService.update(data, url, parameters, quiet).then(function (response) {

            var invoice = response.data;
            // Update the cookie expiration date. The expiration date of this cookie will be the same as the token expiration, which we can get from the headers.
            StorageService.set("invoice_id", invoice.invoice_id, response.headers("X-Token-Expires-In-Seconds"));

            // In case it changed, sync the currency
            syncCurrency(invoice.currency);

            deferred.resolve(invoice);

        }, function (error) {

            // If 404, perform a session reset.
            if (error.status == 404) {
                HelperService.newSessionRedirect(true, "Performing a session reset due to an invalid invoice_id in the cookie / request. (404 - invoice not found)");
            }

            deferred.reject(error);
        });

        return deferred.promise;

    }

    function pay(invoice, payment_method, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        var sendPayment = function (invoice_id, payment_method) {

            // Create the payment url
            var url = "/invoices/" + invoice.invoice_id + "/payments";

            // Run the payment
            PaymentService.create(payment_method, url, parameters, quiet).then(function (payment) {

                // If the payment is completed or pending, remove the invoice_id from the cookie.
                if (payment.status == "completed" || payment.status == "pending") {
                    StorageService.remove("invoice_id");
                }

                deferred.resolve(payment);

            }, function (error) {
                deferred.reject(error);
            });
        };

        // Send the payment.
        sendPayment(invoice.invoice_id, payment_method);

        return deferred.promise;

    }

    function syncCurrency(newCurrency) {

        // This makes sure that the currency in invoice payload responses automatically sync the stored currency value
        var currentCurrency = StorageService.get("currency");

        if (newCurrency != currentCurrency) {

            StorageService.set("currency", newCurrency);

            // Emit the change
            $rootScope.$emit("currencyChanged", newCurrency);
        }
    }

    function setDefaultParameters(parameters, quiet) {

        var parametersCopy = angular.copy(parameters);

        // Invoice is a complicated object and a lot of directives interact with it at the same time. As such, we don't allow the show parameter. Too likely toes will get stepped on.
        if (parametersCopy) {
            parametersCopy.formatted = true;
            delete parametersCopy.show;
            return parametersCopy;
        } else {
            return { formatted: true, options: true };
        }

    }

}]);

app.service("PaymentService", ['$http', '$q', 'ApiService', 'SettingsService', 'StorageService', function ($http, $q, ApiService, SettingsService, StorageService) {

    // Return public API.
    return {
        create: create,
        createDirect: createDirect,
        get: get,
        update: update,
        getOptions: getOptions,
        commit: commit,
        fromParams: fromParams
    };

    function create(payment_method, url, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        // Build the payment method object
        var data = { payment_method: payment_method };

        ApiService.create(data, url, parameters, quiet).then(function (response) {
            var payment = response.data;
            deferred.resolve(payment);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function update(data, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        ApiService.update(data, "/payments/" + data.payment_id, parameters, quiet).then(function (response) {
            var payment = response.data;
            deferred.resolve(payment);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function createDirect(payment, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);
        var url = "/payments";

        ApiService.create(payment, url, parameters, quiet).then(function (response) {
            var result = response.data;
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function get(payment_id, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        if (payment_id) {
            var url = "/payments/" + payment_id;

            ApiService.getItem(url, parameters, quiet).then(function (response) {
                var payment = response.data;
                deferred.resolve(payment);
            }, function (error) {
                deferred.reject(error);
            });

        } else {
            deferred.reject({ "type": "bad_request", reference: "HdPWrih", code: "invalid_input", message: "You request contained invalid data and could not be processed.", status: 400 });
            console.log("Your request for a payment must include a payment_id.");
        }

        return deferred.promise;

    }

    function getOptions(parameters, quiet) {

        var deferred = $q.defer();

        var url = "/payments/options";
        ApiService.getItem(url, parameters, quiet).then(function (response) {
            var options = response.data;
            deferred.resolve(options);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function commit(payment_id, parameters, quiet) {

        // This is used for payment methods such as PayPal and Amazon Pay that need to be tiggered for completion after they have been reviewed by the customer.

        var url = "/payments/" + payment_id + "/commit";

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        ApiService.create(null, url, parameters, quiet).then(function (response) {
            var payment = response.data;

            // If the payment status is completed or pending, delete the cart_id and / or invoice_id. Attempting to interact with a closed cart or invoice (due to a successful payment) will result in errors.
            if (payment.status == "completed" || payment.status == "pending") {
                StorageService.remove("cart_id");
                StorageService.remove("invoice_id");
            }

            deferred.resolve(payment);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

    function fromParams(payment, location) {

        // Set payment as an object if null
        payment = payment || {}

        // location should be the angular $location object

        // Make a copy so we can modify without changing the original params
        var params = angular.copy(location.search());

        // This is designed to be used for a "hosted payment page", where the customer makes an arbitrary payment not associated with a cart or invoice. Parameters such as amount, currency, description, reference and customer details can be passed as URL params.

        if (params.currency) {
            payment.currency = params.currency;
            delete params.currency;
            location.search("currency", null);
        }

        if (params.total && utils.isValidNumber(params.total)) {
            payment.total = params.total;
            delete params.total;
            location.search("total", null);
        }

        // If the total is not supplied, look for subtotal, shipping, tax.
        if (!payment.total) {

            if (params.subtotal && utils.isValidNumber(params.subtotal)) {
                payment.subtotal = params.subtotal;
                delete params.subtotal;
                location.search("subtotal", null);
            }

            if (params.shipping && utils.isValidNumber(params.shipping)) {
                payment.shipping = params.shipping;
                delete params.shipping;
                location.search("shipping", null);
            }

            if (params.tax && utils.isValidNumber(params.tax)) {
                payment.tax = params.tax;
                delete params.tax;
                location.search("tax", null);
            }

        }

        if (params.reference) {
            payment.reference = params.reference;
            delete params.reference;
            location.search("reference", null);
        }

        if (params.description) {
            payment.description = params.description;
            delete params.description;
            location.search("description", null);
        }

        payment.customer = payment.customer || {};

        if (params.company_name) {
            payment.customer.company_name = params.company_name;
            delete params.company_name;
        }

        if (params.name) {
            payment.customer.name = params.name;
            delete params.name;
        }

        if (params.email) {
            if (utils.isValidEmail(params.email)) {
                payment.customer.email = params.email;
            }
            delete params.email;
        }

        if (params.referrer) {
            payment.referrer = params.referrer;
            delete params.referrer;
        }

        // Append any other parameters as meta
        for (var property in params) {
            if (params.hasOwnProperty(property)) {
                if (payment.meta == null) {
                    payment.meta = {};
                }
                payment.meta[property] = params[property];
            }
        }

        return payment;

    }

    function setDefaultParameters(parameters, quiet) {

        // Make sure the response data and payment method is expanded.
        if (parameters) {

            parameters.formatted = true;

            if (parameters.expand == null) {
                parameters.expand = "response_data,payment_method";
            } else {
                if (parameters.expand.indexOf("response_data") == "-1") {
                    parameters.expand += ",response_data";
                }
                if (parameters.expand.indexOf("payment_method") == "-1") {
                    parameters.expand += ",payment_method";
                }
            }

            return parameters;

        } else {

            return { formatted: true, expand: "response_data,payment_method" };

        }

    }

}]);

app.service("OrderService", ['$http', '$q', 'ApiService', function ($http, $q, ApiService) {

    // Return public API.
    return {
        get: get
    };

    function get(order_id, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        if (order_id) {
            var url = "/orders/" + order_id;

            ApiService.getItem(url, parameters, quiet).then(function (response) {
                var payment = response.data;
                deferred.resolve(payment);
            }, function (error) {
                deferred.reject(error);
            });

        } else {
            deferred.reject({ "type": "bad_request", reference: "HdPWrih", code: "invalid_input", message: "The order you are trying to view cannot be found.", status: 400 });
            console.log("The order_id was not provided.");
        }

        return deferred.promise;

    }

    function setDefaultParameters(parameters, quiet) {

        if (parameters) {
            parameters.formatted = true;
            return parameters;
        } else {
            return { formatted: true };
        }

    }

}]);

app.service("CustomerService", ['$http', '$q', 'ApiService', function ($http, $q, ApiService) {

    // Return public API.
    return {
        createAccount: createAccount,
        login: login
    };

    function createAccount(customer, parameters, quiet) {

        var deferred = $q.defer();

        if (customer.customer_id) {
            var url = "/customers/" + customer.customer_id;

            ApiService.update(customer, url, parameters, quiet).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error);
            });

        } else {
            deferred.reject({ "type": "bad_request", reference: "8b1oMYs", code: "invalid_input", message: "The request could not be completed.", status: 400 });
            console.log("The customer object in the account creation request did not contain a customer_id.");
        }

        return deferred.promise;

    }

    function login(data, parameters, quiet) {

        var deferred = $q.defer();

        var url = "/customers/login";
        ApiService.create(data, url, parameters, quiet).then(function (response) {

            var customer = response.data;
            deferred.resolve(customer);

        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;

    }

}]);

app.service("ProductService", ['$http', '$q', 'ApiService', 'CurrencyService', function ($http, $q, ApiService, CurrencyService) {

    // Return public API.
    return {
        get: get,
        getList: getList
    };

    function get(product_id, parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);

        if (product_id) {
            var url = "/products/" + product_id;

            ApiService.getItem(url, parameters, quiet).then(function (response) {
                var product = response.data;
                // If the currency is not currently set, set it to the value of the returned product.
                if (CurrencyService.getCurrency() == null) {
                    CurrencyService.setCurrency(product.currency);
                }

                deferred.resolve(product);
            }, function (error) {
                deferred.reject(error);
            });

        } else {
            deferred.reject({ "type": "bad_request", reference: "IrUQTRv", code: "invalid_input", message: "The product you are trying to view cannot be found.", status: 400 });
            console.log("The product_id was not provided.");
        }

        return deferred.promise;

    }

    function getList(parameters, quiet) {

        var deferred = $q.defer();
        parameters = setDefaultParameters(parameters);
        var url = "/products";

        ApiService.getList(url, parameters, quiet).then(function (response) {
            var products = response.data;
            // If the currency is not currently set, set it to the value of the returned product.
            if (CurrencyService.getCurrency() == null) {
                if (products.data[0]) {
                    CurrencyService.setCurrency(products.data[0].currency);
                }
            }

            deferred.resolve(products);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function setDefaultParameters(parameters, quiet) {

        if (parameters) {
            parameters.formatted = true;
            return parameters;
        } else {
            return { formatted: true };
        }

    }

}]);

app.service("GeoService", [function () {

    // Return public API.
    return {
        getData: getData,
        getStatesProvs: getStatesProvs,
        isEu: isEu,
        getCurrencySymbol: getCurrencySymbol
    };

    function getData() {

        var geo = {};

        geo.countries = [{ name: 'Afghanistan', code: 'AF' }, { name: 'Albania', code: 'AL' }, { name: 'Algeria', code: 'DZ' }, { name: 'American Samoa', code: 'AS' }, { name: 'Andorra', code: 'AD' }, { name: 'Angola', code: 'AO' }, { name: 'Anguilla', code: 'AI' }, { name: 'Antarctica', code: 'AQ' }, { name: 'Antigua and Barbuda', code: 'AG' }, { name: 'Argentina', code: 'AR' }, { name: 'Armenia', code: 'AM' }, { name: 'Aruba', code: 'AW' }, { name: 'Australia', code: 'AU' }, { name: 'Austria', code: 'AT' }, { name: 'Azerbaijan', code: 'AZ' }, { name: 'Bahamas', code: 'BS' }, { name: 'Bahrain', code: 'BH' }, { name: 'Bangladesh', code: 'BD' }, { name: 'Barbados', code: 'BB' }, { name: 'Belarus', code: 'BY' }, { name: 'Belgium', code: 'BE' }, { name: 'Belize', code: 'BZ' }, { name: 'Benin', code: 'BJ' }, { name: 'Bermuda', code: 'BM' }, { name: 'Bhutan', code: 'BT' }, { name: 'Bolivia, Plurinational State of', code: 'BO' }, { name: 'Bonaire, Sint Eustatius and Saba', code: 'BQ' }, { name: 'Bosnia and Herzegovina', code: 'BA' }, { name: 'Botswana', code: 'BW' }, { name: 'Bouvet Island', code: 'BV' }, { name: 'Brazil', code: 'BR' }, { name: 'British Indian Ocean Territory', code: 'IO' }, { name: 'Brunei Darussalam', code: 'BN' }, { name: 'Bulgaria', code: 'BG' }, { name: 'Burkina Faso', code: 'BF' }, { name: 'Burundi', code: 'BI' }, { name: 'Cambodia', code: 'KH' }, { name: 'Cameroon', code: 'CM' }, { name: 'Canada', code: 'CA' }, { name: 'Cape Verde', code: 'CV' }, { name: 'Cayman Islands', code: 'KY' }, { name: 'Central African Republic', code: 'CF' }, { name: 'Chad', code: 'TD' }, { name: 'Chile', code: 'CL' }, { name: 'China', code: 'CN' }, { name: 'Christmas Island', code: 'CX' }, { name: 'Cocos (Keeling) Islands', code: 'CC' }, { name: 'Colombia', code: 'CO' }, { name: 'Comoros', code: 'KM' }, { name: 'Congo', code: 'CG' }, { name: 'Congo, the Democratic Republic of the', code: 'CD' }, { name: 'Cook Islands', code: 'CK' }, { name: 'Costa Rica', code: 'CR' }, { name: 'Cote d Ivoire', code: 'CI' }, { name: 'Croatia', code: 'HR' }, { name: 'Cuba', code: 'CU' }, { name: 'Curacao', code: 'CW' }, { name: 'Cyprus', code: 'CY' }, { name: 'Czech Republic', code: 'CZ' }, { name: 'Denmark', code: 'DK' }, { name: 'Djibouti', code: 'DJ' }, { name: 'Dominica', code: 'DM' }, { name: 'Dominican Republic', code: 'DO' }, { name: 'Ecuador', code: 'EC' }, { name: 'Egypt', code: 'EG' }, { name: 'El Salvador', code: 'SV' }, { name: 'Equatorial Guinea', code: 'GQ' }, { name: 'Eritrea', code: 'ER' }, { name: 'Estonia', code: 'EE' }, { name: 'Ethiopia', code: 'ET' }, { name: 'Falkland Islands', code: 'AX' }, { name: 'Falkland Islands (Malvinas)', code: 'FK' }, { name: 'Faroe Islands', code: 'FO' }, { name: 'Fiji', code: 'FJ' }, { name: 'Finland', code: 'FI' }, { name: 'France', code: 'FR' }, { name: 'French Guiana', code: 'GF' }, { name: 'French Polynesia', code: 'PF' }, { name: 'French Southern Territories', code: 'TF' }, { name: 'Gabon', code: 'GA' }, { name: 'Gambia', code: 'GM' }, { name: 'Georgia', code: 'GE' }, { name: 'Germany', code: 'DE' }, { name: 'Ghana', code: 'GH' }, { name: 'Gibraltar', code: 'GI' }, { name: 'Greece', code: 'GR' }, { name: 'Greenland', code: 'GL' }, { name: 'Grenada', code: 'GD' }, { name: 'Guadeloupe', code: 'GP' }, { name: 'Guam', code: 'GU' }, { name: 'Guatemala', code: 'GT' }, { name: 'Guernsey', code: 'GG' }, { name: 'Guinea', code: 'GN' }, { name: 'Guine Bissau', code: 'GW' }, { name: 'Guyana', code: 'GY' }, { name: 'Haiti', code: 'HT' }, { name: 'Heard Island and McDonald Islands', code: 'HM' }, { name: 'Holy See (Vatican City State)', code: 'VA' }, { name: 'Honduras', code: 'HN' }, { name: 'Hong Kong', code: 'HK' }, { name: 'Hungary', code: 'HU' }, { name: 'Iceland', code: 'IS' }, { name: 'India', code: 'IN' }, { name: 'Indonesia', code: 'ID' }, { name: 'Iran', code: 'IR' }, { name: 'Iraq', code: 'IQ' }, { name: 'Ireland', code: 'IE' }, { name: 'Isle of Man', code: 'IM' }, { name: 'Israel', code: 'IL' }, { name: 'Italy', code: 'IT' }, { name: 'Jamaica', code: 'JM' }, { name: 'Japan', code: 'JP' }, { name: 'Jersey', code: 'JE' }, { name: 'Jordan', code: 'JO' }, { name: 'Kazakhstan', code: 'KZ' }, { name: 'Kenya', code: 'KE' }, { name: 'Kiribati', code: 'KI' }, { name: 'Korea', code: 'KR' }, { name: 'Kuwait', code: 'KW' }, { name: 'Kyrgyzstan', code: 'KG' }, { name: 'Lao Peoples Democratic Republic', code: 'LA' }, { name: 'Latvia', code: 'LV' }, { name: 'Lebanon', code: 'LB' }, { name: 'Lesotho', code: 'LS' }, { name: 'Liberia', code: 'LR' }, { name: 'Libya', code: 'LY' }, { name: 'Liechtenstein', code: 'LI' }, { name: 'Lithuania', code: 'LT' }, { name: 'Luxembourg', code: 'LU' }, { name: 'Macao', code: 'MO' }, { name: 'Macedonia', code: 'MK' }, { name: 'Madagascar', code: 'MG' }, { name: 'Malawi', code: 'MW' }, { name: 'Malaysia', code: 'MY' }, { name: 'Maldives', code: 'MV' }, { name: 'Mali', code: 'ML' }, { name: 'Malta', code: 'MT' }, { name: 'Marshall Islands', code: 'MH' }, { name: 'Martinique', code: 'MQ' }, { name: 'Mauritania', code: 'MR' }, { name: 'Mauritius', code: 'MU' }, { name: 'Mayotte', code: 'YT' }, { name: 'Mexico', code: 'MX' }, { name: 'Micronesia', code: 'FM' }, { name: 'Moldova', code: 'MD' }, { name: 'Monaco', code: 'MC' }, { name: 'Mongolia', code: 'MN' }, { name: 'Montenegro', code: 'ME' }, { name: 'Montserrat', code: 'MS' }, { name: 'Morocco', code: 'MA' }, { name: 'Mozambique', code: 'MZ' }, { name: 'Myanmar', code: 'MM' }, { name: 'Namibia', code: 'NA' }, { name: 'Nauru', code: 'NR' }, { name: 'Nepal', code: 'NP' }, { name: 'Netherlands', code: 'NL' }, { name: 'New Caledonia', code: 'NC' }, { name: 'New Zealand', code: 'NZ' }, { name: 'Nicaragua', code: 'NI' }, { name: 'Niger', code: 'NE' }, { name: 'Nigeria', code: 'NG' }, { name: 'Niue', code: 'NU' }, { name: 'Norfolk Island', code: 'NF' }, { name: 'Northern Mariana Islands', code: 'MP' }, { name: 'Norway', code: 'NO' }, { name: 'Oman', code: 'OM' }, { name: 'Pakistan', code: 'PK' }, { name: 'Palau', code: 'PW' }, { name: 'Panama', code: 'PA' }, { name: 'Papua New Guinea', code: 'PG' }, { name: 'Paraguay', code: 'PY' }, { name: 'Peru', code: 'PE' }, { name: 'Philippines', code: 'PH' }, { name: 'Pitcairn', code: 'PN' }, { name: 'Poland', code: 'PL' }, { name: 'Portugal', code: 'PT' }, { name: 'Puerto Rico', code: 'PR' }, { name: 'Qatar', code: 'QA' }, { name: 'Reunion', code: 'RE' }, { name: 'Romania', code: 'RO' }, { name: 'Russian Federation', code: 'RU' }, { name: 'Rwanda', code: 'RW' }, { name: 'Saint Barthélemy', code: 'BL' }, { name: 'Saint Helena', code: 'SH' }, { name: 'Saint Kitts and Nevis', code: 'KN' }, { name: 'Saint Lucia', code: 'LC' }, { name: 'Saint Martin French', code: 'MF' }, { name: 'Saint Pierre and Miquelon', code: 'PM' }, { name: 'Saint Vincent and the Grenadines', code: 'VC' }, { name: 'Samoa', code: 'WS' }, { name: 'San Marino', code: 'SM' }, { name: 'Sao Tome and Principe', code: 'ST' }, { name: 'Saudi Arabia', code: 'SA' }, { name: 'Senegal', code: 'SN' }, { name: 'Serbia', code: 'RS' }, { name: 'Seychelles', code: 'SC' }, { name: 'Sierra Leone', code: 'SL' }, { name: 'Singapore', code: 'SG' }, { name: 'Sint Maarten Dutch', code: 'SX' }, { name: 'Slovakia', code: 'SK' }, { name: 'Slovenia', code: 'SI' }, { name: 'Solomon Islands', code: 'SB' }, { name: 'Somalia', code: 'SO' }, { name: 'South Africa', code: 'ZA' }, { name: 'South Sudan', code: 'SS' }, { name: 'Spain', code: 'ES' }, { name: 'Sri Lanka', code: 'LK' }, { name: 'Sudan', code: 'SD' }, { name: 'Suriname', code: 'SR' }, { name: 'Svalbard and Jan Mayen', code: 'SJ' }, { name: 'Swaziland', code: 'SZ' }, { name: 'Sweden', code: 'SE' }, { name: 'Switzerland', code: 'CH' }, { name: 'Syrian Arab Republic', code: 'SY' }, { name: 'Taiwan', code: 'TW' }, { name: 'Tajikistan', code: 'TJ' }, { name: 'Tanzania', code: 'TZ' }, { name: 'Thailand', code: 'TH' }, { name: 'Timor Leste', code: 'TL' }, { name: 'Togo', code: 'TG' }, { name: 'Tokelau', code: 'TK' }, { name: 'Tonga', code: 'TO' }, { name: 'Trinidad and Tobago', code: 'TT' }, { name: 'Tunisia', code: 'TN' }, { name: 'Turkey', code: 'TR' }, { name: 'Turkmenistan', code: 'TM' }, { name: 'Turks and Caicos Islands', code: 'TC' }, { name: 'Tuvalu', code: 'TV' }, { name: 'Uganda', code: 'UG' }, { name: 'Ukraine', code: 'UA' }, { name: 'United Arab Emirates', code: 'AE' }, { name: 'United Kingdom', code: 'GB' }, { name: 'United States', code: 'US' }, { name: 'United States Minor Outlying Islands', code: 'UM' }, { name: 'Uruguay', code: 'UY' }, { name: 'Uzbekistan', code: 'UZ' }, { name: 'Vanuatu', code: 'VU' }, { name: 'Venezuela', code: 'VE' }, { name: 'Viet Nam', code: 'VN' }, { name: 'Virgin Islands British', code: 'VG' }, { name: 'Virgin Islands U.S.', code: 'VI' }, { name: 'Wallis and Futuna', code: 'WF' }, { name: 'Western Sahara', code: 'EH' }, { name: 'Yemen', code: 'YE' }, { name: 'Zambia', code: 'ZM' }, { name: 'Zimbabwe', code: 'ZW' }];
        geo.usStates = [{ name: "Alabama", code: "AL" }, { name: "Alaska", code: "AK" }, { name: "American Samoa", code: "AS" }, { name: "Arizona", code: "AZ" }, { name: "Arkansas", code: "AR" }, { name: "California", code: "CA" }, { name: "Colorado", code: "CO" }, { name: "Connecticut", code: "CT" }, { name: "Delaware", code: "DE" }, { name: "District Of Columbia", code: "DC" }, { name: "Federated States Of Micronesia", code: "FM" }, { name: "Florida", code: "FL" }, { name: "Georgia", code: "GA" }, { name: "Guam", code: "GU" }, { name: "Hawaii", code: "HI" }, { name: "Idaho", code: "ID" }, { name: "Illinois", code: "IL" }, { name: "Indiana", code: "IN" }, { name: "Iowa", code: "IA" }, { name: "Kansas", code: "KS" }, { name: "Kentucky", code: "KY" }, { name: "Louisiana", code: "LA" }, { name: "Maine", code: "ME" }, { name: "Marshall Islands", code: "MH" }, { name: "Maryland", code: "MD" }, { name: "Massachusetts", code: "MA" }, { name: "Michigan", code: "MI" }, { name: "Minnesota", code: "MN" }, { name: "Mississippi", code: "MS" }, { name: "Missouri", code: "MO" }, { name: "Montana", code: "MT" }, { name: "Nebraska", code: "NE" }, { name: "Nevada", code: "NV" }, { name: "New Hampshire", code: "NH" }, { name: "New Jersey", code: "NJ" }, { name: "New Mexico", code: "NM" }, { name: "New York", code: "NY" }, { name: "North Carolina", code: "NC" }, { name: "North Dakota", code: "ND" }, { name: "Northern Mariana Islands", code: "MP" }, { name: "Ohio", code: "OH" }, { name: "Oklahoma", code: "OK" }, { name: "Oregon", code: "OR" }, { name: "Palau", code: "PW" }, { name: "Pennsylvania", code: "PA" }, { name: "Puerto Rico", code: "PR" }, { name: "Rhode Island", code: "RI" }, { name: "South Carolina", code: "SC" }, { name: "South Dakota", code: "SD" }, { name: "Tennessee", code: "TN" }, { name: "Texas", code: "TX" }, { name: "Utah", code: "UT" }, { name: "Vermont", code: "VT" }, { name: "Virgin Islands", code: "VI" }, { name: "Virginia", code: "VA" }, { name: "Washington", code: "WA" }, { name: "West Virginia", code: "WV" }, { name: "Wisconsin", code: "WI" }, { name: "Wyoming", code: "WY" }, { name: "U.S. Armed Forces Americas", code: "AA" }, { name: "U.S. Armed Forces Europe", code: "AE" }, { name: "U.S. Armed Forces Pacific", code: "AP" }];
        geo.caProvinces = [{ code: "AB", name: "Alberta" }, { code: "BC", name: "British Columbia" }, { code: "LB", name: "Labrador" }, { code: "MB", name: "Manitoba" }, { code: "NB", name: "New Brunswick" }, { code: "NL", name: "Newfoundland" }, { code: "NS", name: "Nova Scotia" }, { code: "NU", name: "Nunavut" }, { code: "NW", name: "Northwest Territories" }, { code: "ON", name: "Ontario" }, { code: "PE", name: "Prince Edward Island" }, { code: "QC", name: "Quebec" }, { code: "SK", name: "Saskatchewen" }, { code: "YT", name: "Yukon" }];

        return geo;
    }

    function getStatesProvs(country) {

        var data = getData();

        if (country == "US") {
            return data.usStates;
        }

        if (country == "CA") {
            return data.caProvinces;
        }

        return null;

    }

    function isEu(country) {

        var euCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB"];

        if (euCountries.indexOf(country) > -1) {
            return true;
        }

        return false;

    }

    function getCurrencySymbol(code) {

        var currencies = { "AED": "د.إ", "AFN": "؋", "ALL": "L", "AMD": "֏", "ANG": "ƒ", "AOA": "Kz", "ARS": "$", "AUD": "$", "AWG": "ƒ", "AZN": "ман", "BAM": "KM", "BBD": "$", "BDT": "৳", "BGN": "лв", "BHD": ".د.ب", "BIF": "FBu", "BMD": "$", "BND": "$", "BOB": "$b", "BRL": "R$", "BSD": "$", "BTC": "฿", "BTN": "Nu.", "BWP": "P", "BYR": "p.", "BZD": "BZ$", "CAD": "$", "CDF": "FC", "CHF": "CHF", "CLP": "$", "CNY": "¥", "COP": "$", "CRC": "₡", "CUC": "$", "CUP": "₱", "CVE": "$", "CZK": "Kč", "DJF": "Fdj", "DKK": "kr", "DOP": "RD$", "DZD": "دج", "EEK": "kr", "EGP": "£", "ERN": "Nfk", "ETB": "Br", "ETH": "Ξ", "EUR": "€", "FJD": "$", "FKP": "£", "GBP": "£", "GEL": "₾", "GGP": "£", "GHC": "₵", "GHS": "GH₵", "GIP": "£", "GMD": "D", "GNF": "FG", "GTQ": "Q", "GYD": "$", "HKD": "$", "HNL": "L", "HRK": "kn", "HTG": "G", "HUF": "Ft", "IDR": "Rp", "ILS": "₪", "IMP": "£", "INR": "₹", "IQD": "ع.د", "IRR": "﷼", "ISK": "kr", "JEP": "£", "JMD": "J$", "JOD": "JD", "JPY": "¥", "KES": "KSh", "KGS": "лв", "KHR": "៛", "KMF": "CF", "KPW": "₩", "KRW": "₩", "KWD": "KD", "KYD": "$", "KZT": "лв", "LAK": "₭", "LBP": "£", "LKR": "₨", "LRD": "$", "LSL": "M", "LTC": "Ł", "LTL": "Lt", "LVL": "Ls", "LYD": "LD", "MAD": "MAD", "MDL": "lei", "MGA": "Ar", "MKD": "ден", "MMK": "K", "MNT": "₮", "MOP": "MOP$", "MRO": "UM", "MUR": "₨", "MVR": "Rf", "MWK": "MK", "MXN": "$", "MYR": "RM", "MZN": "MT", "NAD": "$", "NGN": "₦", "NIO": "C$", "NOK": "kr", "NPR": "₨", "NZD": "$", "OMR": "﷼", "PAB": "B/.", "PEN": "S/.", "PGK": "K", "PHP": "₱", "PKR": "₨", "PLN": "zł", "PYG": "Gs", "QAR": "﷼", "RMB": "￥", "RON": "lei", "RSD": "Дин.", "RUB": "₽", "RWF": "R₣", "SAR": "﷼", "SBD": "$", "SCR": "₨", "SDG": "ج.س.", "SEK": "kr", "SGD": "$", "SHP": "£", "SLL": "Le", "SOS": "S", "SRD": "$", "SSP": "£", "STD": "Db", "SVC": "$", "SYP": "£", "SZL": "E", "THB": "฿", "TJS": "SM", "TMT": "T", "TND": "د.ت", "TOP": "T$", "TRL": "₤", "TRY": "₺", "TTD": "TT$", "TVD": "$", "TWD": "NT$", "TZS": "TSh", "UAH": "₴", "UGX": "USh", "USD": "$", "UYU": "$U", "UZS": "лв", "VEF": "Bs", "VND": "₫", "VUV": "VT", "WST": "WS$", "XAF": "FCFA", "XBT": "Ƀ", "XCD": "$", "XOF": "CFA", "XPF": "₣", "YER": "﷼", "ZAR": "R", "ZWD": "Z$" }

        return currencies[code] || "";
    }

}]);

app.service("CurrencyService", ['$q', '$rootScope', 'SettingsService', 'CartService', 'InvoiceService', 'StorageService', 'ApiService', function ($q, $rootScope, SettingsService, CartService, InvoiceService, StorageService, ApiService) {

    // Return public API.
    return {
        getCurrency: getCurrency,
        getCurrencyName: getCurrencyName,
        setCurrency: setCurrency
    };

    function getCurrency() {
        return StorageService.get("currency");
    }

    function getCurrencyName() {

        var code = getCurrency();
        var settings = SettingsService.get();

        var name = null;
        _.each(settings.account.currencies, function (item) {
            if (item.code == code) {
                name = item.name;
            }
        });

        return name;

    }

    function setCurrency(newValue) {

        // Store in a cookie to persist page refreshes
        StorageService.set("currency", newValue);

        // Emit the change
        $rootScope.$emit("currencyChanged", newValue);

    }

}]);

app.service("LanguageService", ['$q', '$rootScope', 'SettingsService', 'StorageService', 'gettextCatalog', 'ApiService', function ($q, $rootScope, SettingsService, StorageService, gettextCatalog, ApiService) {

    // Angular gettext https://angular-gettext.rocketeer.be/ Used to provide application translations. Translation files are located in the languages folder.

    // Return public API.
    return {
        getSelectedLanguage: getSelectedLanguage,
        getLanguages: getLanguages,
        setLanguage: setLanguage,
        establishLanguage: establishLanguage
    };

    function getLanguages() {

        // The supported languages are defined in rootScope. This allows the setting to be changed by apps that use kit don't want to modify kit's source.
        if ($rootScope.languages) {
            return $rootScope.languages;
        } else {
            // Return the default language
            return [{ code: "en", name: "English" }];
        }

    }

    function getSelectedLanguage() {

        var languages = getLanguages();
        var language = StorageService.get("language");

        // Only return if the value is valid.
        language = _.findWhere(languages, { code: language });
        if (language) {
            return language;
        }

        // Return empty.
        return { name: null, code: null };

    }

    function isSupportedLanguage(language) {

        var languages = getLanguages();
        return !(_.findWhere(languages, { code: language }) == null);

    }

    function setLanguage(language, languagesPath) {

        // Only attempt to set the language if the supplied value is valid.
        if (isSupportedLanguage(language) == false) {
            return;
        }

        if (language != null) {
            StorageService.set("language", language);
            gettextCatalog.setCurrentLanguage(language);

            // Emit the change
            $rootScope.$emit("languageChanged", language);

            // English does not need to be loaded since it's embedded in the HTML.
            if (language != "en") {
                // Load the language configuration file.
                gettextCatalog.loadRemote((languagesPath || "languages/") + language + "/" + language + ".json");
            }
        }

    }

    function getUserLanguage() {

        var deferred = $q.defer();

        // Check if languages are provided. If not, just return english and don't bother fetching the user's language from the server.
        if (!$rootScope.languages) {
            deferred.resolve("en");
            return deferred.promise;
        }

        // If a language is already set and it's valid, just return that language.
        var language = getSelectedLanguage();

        if (language.code) {

            // We already have a language set, return it.
            deferred.resolve(language.code);

        } else {

            // Determine the user's language from the server, which is the most reliable way to get browser language settings into JavaScript.
            var settings = SettingsService.get();
            ApiService.getItem("/browser_info", null, true).then(function (response) {

                // The value returned in language will either be a valid two-character language code or null.
                deferred.resolve(response.data.language);

            }, function (error) {
                // We always resolve the promise, just with null in the case of error.
                deferred.resolve(null);
            });

        }

        return deferred.promise;

    }

    function establishLanguage(languagesPath) {

        // This called when the app is intially bootstrapped and sets the language according to the user's preference, auto-detected language or default language.
        getUserLanguage().then(function (language) {

            // If null, set the default
            if (language == null) {
                language = "en";
            }

            // Set the language
            setLanguage(language, languagesPath);

        });

    }

}]);

app.service("SettingsService", [function ($http, $q) {

    // Return public API.
    return {
        get: get
    };

    function get() {

        // The embedded settings/app.js and settings/account.js set the values within the __settings global variable.

        // Get account settings
        var getAccountSettings = function () {

            var accountSettings = {};

            if (window.__settings) {
                if (window.__settings.account) {
                    accountSettings = window.__settings.account;
                }
            }

            // If accountSettings doesn't have the property "date_utc", inject the current client-side date.
            // The purpose is to provide the current server date to the app when running in the hosted environment. It is not designed to give precise time (because the settings file may be cached for minutes) 
            // Therefore, it always returns a date with the time at midnight, but will provide a reliable date "seed" in the application for things like credit card expiration date lists and copyright dates. Useful when you don't want to rely on a client-side clock.
            if (!accountSettings.date_utc) {
                // No value provided in the settings file, which is likely in development environments. Inject the client-side date so the app doesn't have to consider null values.
                accountSettings.date_utc = utils.getCurrentIsoDate(true);
            }

            // Split the date into parts for easy access
            var date = new Date(accountSettings.date_utc);
            accountSettings.year = date.getFullYear();
            accountSettings.month = date.getMonth();
            accountSettings.date = date.getDate();

            return accountSettings;
        };

        // Get app settings
        var getAppSettings = function () {

            var appSettings = {};

            if (window.__settings) {
                if (window.__settings.app) {
                    appSettings = window.__settings.app;
                }
            }

            return appSettings;
        };

        // Build and return the settings object
        var settings = { account: getAccountSettings(), app: getAppSettings(), config: {} };

        // Define the api prefix
        settings.config.apiPrefix = "/api/v1";

        settings.config.development = false;

        // For convenience, if you place a development flag in either one of the settings stubs (during local development), the app will be marked as running in development mode.
        if (settings.account.development || settings.app.development) {

            settings.config.development = true;

            var apiHost = settings.account.api_host || settings.app.api_host || settings.style.api_host || "api.comecero.com";
            apiHost = "https://" + apiHost;

            // Make the apiPrefix a fully qualified url since requests in development mode don't have access to the reverse proxy.
            settings.config.apiPrefix = apiHost + settings.config.apiPrefix;
        }

        return settings;

    }

}]);

app.service("HelperService", ['SettingsService', 'StorageService', '$location', function (SettingsService, StorageService, $location) {

    // Return public API.
    return {
        isRequiredCustomerField: isRequiredCustomerField,
        isOptionalCustomerField: isOptionalCustomerField,
        isCustomerField: isCustomerField,
        hasShippingAddress: hasShippingAddress,
        newSessionRedirect: newSessionRedirect,
        getShoppingUrl: getShoppingUrl,
        hasSubscription: hasSubscription,
        hasPhysical: hasPhysical,
        supportsPaymentMethod: supportsPaymentMethod
    };

    function isRequiredCustomerField(field, options, shippingIsBilling) {

        if (!field || !options) {
            return false;
        }

        // If shippingIsBilling == false and the field is a shipping address, swap shipping_address in the field name with billing_address before you compare.
        var isShippingField = false;
        if (field.substring(0, 17) == "shipping_address.") {
            field = "billing_address." + field.substring(17);
            isShippingField = true;
        }

        if (field == "billing_address.name") {
            field = "name";
        }

        if (shippingIsBilling === true) {
            return false;
        }

        if (!options.customer_required_fields) {
            return false;
        }

        if (options.customer_required_fields.indexOf(field) >= 0) {
            return true;
        }

        return false;

    }

    function isOptionalCustomerField(field, options, shippingIsBilling) {

        if (!field || !options) {
            return false;
        }

        // If shippingIsBilling == false and the field is a shipping address, swap shipping_address in the field name with billing_address before you compare.
        var isShippingField = false;
        if (field.substring(0, 17) == "shipping_address.") {
            field = "billing_address." + field.substring(17);
            isShippingField = true;
        }
        if (field == "billing_address.name") {
            field = "name";
        }

        if (shippingIsBilling === true) {
            return false;
        }

        if (!options.customer_optional_fields) {
            return false;
        }

        if (options.customer_optional_fields.indexOf(field) >= 0) {
            return true;
        }

        return false;

    }

    function isCustomerField(field, options, shippingIsBilling) {

        if (!field || !options) {
            return false;
        }

        if (options.customer_required_fields) {
            if (isRequiredCustomerField(field, options, shippingIsBilling)) {
                return true;
            }
        }

        if (options.customer_optional_fields) {
            if (isOptionalCustomerField(field, options, shippingIsBilling)) {
                return true;
            }
        }

        return false;

    }

    function hasShippingAddress(customer) {

        if (customer) {
            if (customer.shipping_address) {
                if (customer.shipping_address.address_1) {
                    return true;
                }
            }
        }

        return false;

    }

    function newSessionRedirect(reset, debug) {

        // This redirects the user to the base location of a new session, which may be an external URL.
        // If reset == true, then it flushes the cart_id and token before performing the redirect.

        // In the case of a bad token, invalid cart id or other unfortunate situation, this resets the user's session and redirects them to the desired URL.

        console.log(debug);

        if (reset === true) {
            StorageService.remove("cart_id");
            StorageService.remove("invoice_id");
            StorageService.remove("token");
        }

        var settings = SettingsService.get().app;

        if (settings.main_shopping_url) {

            // If a main shopping URL has been provided, redirect to it.
            window.location.replace(settings.main_shopping_url);

        } else {

            // Otherwise, redirect to the app root. If the destination is the same page they're on, the location.replace won't do anything. Reload the current page in that case.
            if ($location.path() != "/") {
                $location.path("/");
                $location.replace();
            } else {
                window.location.reload();
            }

        }
    }

    function getShoppingUrl() {

        var settings = SettingsService.get().app;

        if (settings.main_shopping_url == null) {
            return window.location.href.substring(0, window.location.href.indexOf("#")) + "#/";
        } else {
            return settings.main_shopping_url;
        }

    }

    function hasSubscription(items) {

        if (_.find(items, function (item) { return item.subscription_plan != null; }) != null) {
            return true;
        }

        return false;

    }

    function hasPhysical(items) {

        if (_.find(items, function (item) { return item.type == "physical"; }) != null) {
            return true;
        }

        return false;

    }

    function supportsPaymentMethod(type, options) {

        if (!type || !options) {
            return false;
        }

        if (_.find(options.payment_methods, function (item) { return item.payment_method_type == type; }) != null) {
            return true;
        }

        return false;

    }

}]);

app.service("StorageService", ['appCache', function (appCache) {

    // Return public API.
    return {
        get: get,
        set: set,
        remove: remove
    };

    function get(key) {

        var value = appCache.get(key);

        if (value == null) {
            // Look to to cookie for a backup
            value = utils.getCookie(key);
        }

        return value;

    }

    function set(key, value, expiresInSeconds) {

        appCache.put(key, value);

        // If expiresInSeconds is not defined, we'll use 14 days as the default
        if (expiresInSeconds == null) {
            expiresInSeconds = 1209600;
        }

        // Backup to a cookie
        utils.setCookie(key, value, expiresInSeconds / 60);

    }

    function remove(key) {

        appCache.remove(key);

        // Remove the associated cookie
        utils.deleteCookie(key);

    }

}]);


app.controller("SettingsController", function ($scope, SettingsService) {
    $scope.settings = SettingsService.get();
});

app.controller("TimezonesController", function ($scope, TimezonesService) {
    $scope.timezones = TimezonesService.getTimezones();
});

app.controller("RootController",
  function ($scope, ApiService, $q, toCSV, saveFile, buildRootUrl, fetchData, SettingsService) {
      var settings = SettingsService.get();
      if (angular.isUndefined(settings.app.timezone) || settings.app.timezone.length <= 0)
          settings.app.timezone = 'UTC';
      if (angular.isUndefined(settings.app.exportFormat) || settings.app.exportFormat.length <= 0)
          settings.app.exportFormat = 'csv';
      if (angular.isUndefined(settings.app.dates) || settings.app.dates.length <= 0)
          settings.app.dates = 'last_30';
      if (angular.isUndefined(settings.app.dataset) || settings.app.dataset.length <= 0)
          settings.app.dataset = 'orders';

      // Set defaults
      $scope.options = {
          dataset: settings.app.dataset,
          format: settings.app.exportFormat,
          timezone: settings.app.timezone,
          dates: settings.app.dates,
          unravelFields: [{ id: 'items', name: 'Items' }],
          unravelField: 'items'
      };
      $scope.datepicker = {
          status: {
              date_start: { opened: false },
              date_end: { opened: false }
          },
          options: {
              startingDay: 1,
              showWeeks: false,
              initDate: new Date(),
              yearRange: 10
          },
          open: function ($event, which) {
              $scope.datepicker.status[which].opened = true;
          }
      };

      var _cancel = function () {
          if (angular.isFunction($scope.cancelFunc)) {
              $scope.cancelFunc();
              $scope.cancelFunc = undefined;
              return true;
          }
          return false;
      }

      var _export = function (options, datepicker) {
          fetchData($scope, options, datepicker).then(function (data) {
              if (!angular.isArray(data) || data.length <= 0) {
                  $scope.error = { message: 'No results found' };
                  return;
              }

              var formatted;
              var type = 'text/' + options.format;
              switch (options.format) {
                  case 'csv':
                      formatted = toCSV(data, options);
                      break;
                  case 'json':
                      formatted = JSON.stringify(data, function (key, value) { return value; }, new Number(2));
                      break;
                  default:
                      $scope.error = { message: 'Unknown export format' };
                      return;
              };

              var date_range = options.dates;
              if (date_range == 'custom') {
                  date_range = datepicker.date_start.toISOString().substring(0, 10) + '_to_' +
                    datepicker.date_end.toISOString().substring(0, 10);
              }

              var fileName = options.dataset;
              if (angular.isDefined(options.status) && options.status.length > 0) fileName += '_' + options.status;
              fileName += '_' + date_range + '.' + options.format;
              saveFile(fileName, type, formatted);
              $scope.successMessage = 'Export successful';
          }, function (error) {
              $scope.error = error;
              _cancel();
          });
      };

      $scope.export = function () {
          $scope.clearMessages();
          _export(angular.copy($scope.options), angular.copy($scope.datepicker));
      };

      $scope.cancel = function () {
          if (_cancel()) {
              $scope.successMessage = 'Canceled export.';
          }
      }

      $scope.clearMessages = function () {
          $scope.successMessage = '';
          $scope.error = {};
      };
  });

//# sourceMappingURL=data-export.js.map
