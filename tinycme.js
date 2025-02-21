/*!
 * TinyMCE
 *
 * Copyright (c) 2024 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 7.0.0
 */
!(function () {
  "use strict";
  var e = function (e) {
      if (null === e) return "null";
      if (void 0 === e) return "undefined";
      var t = typeof e;
      return "object" === t &&
        (Array.prototype.isPrototypeOf(e) ||
          (e.constructor && "Array" === e.constructor.name))
        ? "array"
        : "object" === t &&
          (String.prototype.isPrototypeOf(e) ||
            (e.constructor && "String" === e.constructor.name))
        ? "string"
        : t;
    },
    t = function (e) {
      return { eq: e };
    },
    n = t(function (e, t) {
      return e === t;
    }),
    o = function (e) {
      return t(function (t, n) {
        if (t.length !== n.length) return !1;
        for (var o = t.length, r = 0; r < o; r++)
          if (!e.eq(t[r], n[r])) return !1;
        return !0;
      });
    },
    r = function (e) {
      return t(function (r, s) {
        var a = Object.keys(r),
          i = Object.keys(s);
        if (
          !(function (e, n) {
            return (function (e, n) {
              return t(function (t, o) {
                return e.eq(n(t), n(o));
              });
            })(o(e), function (e) {
              return (function (e, t) {
                return Array.prototype.slice.call(e).sort(t);
              })(e, n);
            });
          })(n).eq(a, i)
        )
          return !1;
        for (var l = a.length, d = 0; d < l; d++) {
          var c = a[d];
          if (!e.eq(r[c], s[c])) return !1;
        }
        return !0;
      });
    },
    s = t(function (t, n) {
      if (t === n) return !0;
      var a = e(t);
      return (
        a === e(n) &&
        ((function (e) {
          return (
            -1 !==
            [
              "undefined",
              "boolean",
              "number",
              "string",
              "function",
              "xml",
              "null",
            ].indexOf(e)
          );
        })(a)
          ? t === n
          : "array" === a
          ? o(s).eq(t, n)
          : "object" === a && r(s).eq(t, n))
      );
    });
  const a = Object.getPrototypeOf,
    i = (e, t, n) => {
      var o;
      return (
        !!n(e, t.prototype) ||
        (null === (o = e.constructor) || void 0 === o ? void 0 : o.name) ===
          t.name
      );
    },
    l = (e) => (t) =>
      ((e) => {
        const t = typeof e;
        return null === e
          ? "null"
          : "object" === t && Array.isArray(e)
          ? "array"
          : "object" === t && i(e, String, (e, t) => t.isPrototypeOf(e))
          ? "string"
          : t;
      })(t) === e,
    d = (e) => (t) => typeof t === e,
    c = (e) => (t) => e === t,
    u = (e, t) => f(e) && i(e, t, (e, t) => a(e) === t),
    m = l("string"),
    f = l("object"),
    g = (e) => u(e, Object),
    p = l("array"),
    h = c(null),
    b = d("boolean"),
    v = c(void 0),
    y = (e) => null == e,
    C = (e) => !y(e),
    w = d("function"),
    x = d("number"),
    E = (e, t) => {
      if (p(e)) {
        for (let n = 0, o = e.length; n < o; ++n) if (!t(e[n])) return !1;
        return !0;
      }
      return !1;
    },
    k = () => {},
    _ =
      (e, t) =>
      (...n) =>
        e(t.apply(null, n)),
    S = (e, t) => (n) => e(t(n)),
    N = (e) => () => e,
    R = (e) => e,
    A = (e, t) => e === t;
  function T(e, ...t) {
    return (...n) => {
      const o = t.concat(n);
      return e.apply(null, o);
    };
  }
  const O = (e) => (t) => !e(t),
    B = (e) => () => {
      throw new Error(e);
    },
    P = (e) => e(),
    D = (e) => {
      e();
    },
    L = N(!1),
    M = N(!0);
  class I {
    constructor(e, t) {
      (this.tag = e), (this.value = t);
    }
    static some(e) {
      return new I(!0, e);
    }
    static none() {
      return I.singletonNone;
    }
    fold(e, t) {
      return this.tag ? t(this.value) : e();
    }
    isSome() {
      return this.tag;
    }
    isNone() {
      return !this.tag;
    }
    map(e) {
      return this.tag ? I.some(e(this.value)) : I.none();
    }
    bind(e) {
      return this.tag ? e(this.value) : I.none();
    }
    exists(e) {
      return this.tag && e(this.value);
    }
    forall(e) {
      return !this.tag || e(this.value);
    }
    filter(e) {
      return !this.tag || e(this.value) ? this : I.none();
    }
    getOr(e) {
      return this.tag ? this.value : e;
    }
    or(e) {
      return this.tag ? this : e;
    }
    getOrThunk(e) {
      return this.tag ? this.value : e();
    }
    orThunk(e) {
      return this.tag ? this : e();
    }
    getOrDie(e) {
      if (this.tag) return this.value;
      throw new Error(null != e ? e : "Called getOrDie on None");
    }
    static from(e) {
      return C(e) ? I.some(e) : I.none();
    }
    getOrNull() {
      return this.tag ? this.value : null;
    }
    getOrUndefined() {
      return this.value;
    }
    each(e) {
      this.tag && e(this.value);
    }
    toArray() {
      return this.tag ? [this.value] : [];
    }
    toString() {
      return this.tag ? `some(${this.value})` : "none()";
    }
  }
  I.singletonNone = new I(!1);
  const F = Array.prototype.slice,
    U = Array.prototype.indexOf,
    z = Array.prototype.push,
    j = (e, t) => U.call(e, t),
    H = (e, t) => j(e, t) > -1,
    $ = (e, t) => {
      for (let n = 0, o = e.length; n < o; n++) if (t(e[n], n)) return !0;
      return !1;
    },
    V = (e, t) => {
      const n = e.length,
        o = new Array(n);
      for (let r = 0; r < n; r++) {
        const n = e[r];
        o[r] = t(n, r);
      }
      return o;
    },
    q = (e, t) => {
      for (let n = 0, o = e.length; n < o; n++) t(e[n], n);
    },
    W = (e, t) => {
      for (let n = e.length - 1; n >= 0; n--) t(e[n], n);
    },
    K = (e, t) => {
      const n = [],
        o = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const s = e[r];
        (t(s, r) ? n : o).push(s);
      }
      return { pass: n, fail: o };
    },
    Y = (e, t) => {
      const n = [];
      for (let o = 0, r = e.length; o < r; o++) {
        const r = e[o];
        t(r, o) && n.push(r);
      }
      return n;
    },
    G = (e, t, n) => (
      W(e, (e, o) => {
        n = t(n, e, o);
      }),
      n
    ),
    X = (e, t, n) => (
      q(e, (e, o) => {
        n = t(n, e, o);
      }),
      n
    ),
    Z = (e, t, n) => {
      for (let o = 0, r = e.length; o < r; o++) {
        const r = e[o];
        if (t(r, o)) return I.some(r);
        if (n(r, o)) break;
      }
      return I.none();
    },
    Q = (e, t) => Z(e, t, L),
    J = (e, t) => {
      for (let n = 0, o = e.length; n < o; n++)
        if (t(e[n], n)) return I.some(n);
      return I.none();
    },
    ee = (e) => {
      const t = [];
      for (let n = 0, o = e.length; n < o; ++n) {
        if (!p(e[n]))
          throw new Error(
            "Arr.flatten item " + n + " was not an array, input: " + e
          );
        z.apply(t, e[n]);
      }
      return t;
    },
    te = (e, t) => ee(V(e, t)),
    ne = (e, t) => {
      for (let n = 0, o = e.length; n < o; ++n)
        if (!0 !== t(e[n], n)) return !1;
      return !0;
    },
    oe = (e) => {
      const t = F.call(e, 0);
      return t.reverse(), t;
    },
    re = (e, t) => Y(e, (e) => !H(t, e)),
    se = (e, t) => {
      const n = {};
      for (let o = 0, r = e.length; o < r; o++) {
        const r = e[o];
        n[String(r)] = t(r, o);
      }
      return n;
    },
    ae = (e, t) => {
      const n = F.call(e, 0);
      return n.sort(t), n;
    },
    ie = (e, t) => (t >= 0 && t < e.length ? I.some(e[t]) : I.none()),
    le = (e) => ie(e, 0),
    de = (e) => ie(e, e.length - 1),
    ce = w(Array.from) ? Array.from : (e) => F.call(e),
    ue = (e, t) => {
      for (let n = 0; n < e.length; n++) {
        const o = t(e[n], n);
        if (o.isSome()) return o;
      }
      return I.none();
    },
    me = (e, t) => {
      const n = [],
        o = w(t) ? (e) => $(n, (n) => t(n, e)) : (e) => H(n, e);
      for (let t = 0, r = e.length; t < r; t++) {
        const r = e[t];
        o(r) || n.push(r);
      }
      return n;
    },
    fe = Object.keys,
    ge = Object.hasOwnProperty,
    pe = (e, t) => {
      const n = fe(e);
      for (let o = 0, r = n.length; o < r; o++) {
        const r = n[o];
        t(e[r], r);
      }
    },
    he = (e, t) => be(e, (e, n) => ({ k: n, v: t(e, n) })),
    be = (e, t) => {
      const n = {};
      return (
        pe(e, (e, o) => {
          const r = t(e, o);
          n[r.k] = r.v;
        }),
        n
      );
    },
    ve = (e) => (t, n) => {
      e[n] = t;
    },
    ye = (e, t, n, o) => {
      pe(e, (e, r) => {
        (t(e, r) ? n : o)(e, r);
      });
    },
    Ce = (e, t) => {
      const n = {};
      return ye(e, t, ve(n), k), n;
    },
    we = (e, t) => {
      const n = [];
      return (
        pe(e, (e, o) => {
          n.push(t(e, o));
        }),
        n
      );
    },
    xe = (e) => we(e, R),
    Ee = (e, t) => (ke(e, t) ? I.from(e[t]) : I.none()),
    ke = (e, t) => ge.call(e, t),
    _e = (e, t) => ke(e, t) && void 0 !== e[t] && null !== e[t],
    Se = (e) => {
      const t = {};
      return (
        q(e, (e) => {
          t[e] = {};
        }),
        fe(t)
      );
    },
    Ne = (e) => void 0 !== e.length,
    Re = Array.isArray,
    Ae = (e, t, n) => {
      if (!e) return !1;
      if (((n = n || e), Ne(e))) {
        for (let o = 0, r = e.length; o < r; o++)
          if (!1 === t.call(n, e[o], o, e)) return !1;
      } else
        for (const o in e)
          if (ke(e, o) && !1 === t.call(n, e[o], o, e)) return !1;
      return !0;
    },
    Te = (e, t) => {
      const n = [];
      return (
        Ae(e, (o, r) => {
          n.push(t(o, r, e));
        }),
        n
      );
    },
    Oe = (e, t) => {
      const n = [];
      return (
        Ae(e, (o, r) => {
          (t && !t(o, r, e)) || n.push(o);
        }),
        n
      );
    },
    Be = (e, t, n, o) => {
      let r = v(n) ? e[0] : n;
      for (let n = 0; n < e.length; n++) r = t.call(o, r, e[n], n);
      return r;
    },
    Pe = (e, t, n) => {
      for (let o = 0, r = e.length; o < r; o++)
        if (t.call(n, e[o], o, e)) return o;
      return -1;
    },
    De = (e) => e[e.length - 1],
    Le = (e) => {
      let t,
        n = !1;
      return (...o) => (n || ((n = !0), (t = e.apply(null, o))), t);
    },
    Me = () => Ie(0, 0),
    Ie = (e, t) => ({ major: e, minor: t }),
    Fe = {
      nu: Ie,
      detect: (e, t) => {
        const n = String(t).toLowerCase();
        return 0 === e.length
          ? Me()
          : ((e, t) => {
              const n = ((e, t) => {
                for (let n = 0; n < e.length; n++) {
                  const o = e[n];
                  if (o.test(t)) return o;
                }
              })(e, t);
              if (!n) return { major: 0, minor: 0 };
              const o = (e) => Number(t.replace(n, "$" + e));
              return Ie(o(1), o(2));
            })(e, n);
      },
      unknown: Me,
    },
    Ue = (e, t) => {
      const n = String(t).toLowerCase();
      return Q(e, (e) => e.search(n));
    },
    ze = (e, t, n) =>
      "" === t || (e.length >= t.length && e.substr(n, n + t.length) === t),
    je = (e, t) => ($e(e, t) ? ((e, t) => e.substring(t))(e, t.length) : e),
    He = (e, t, n = 0, o) => {
      const r = e.indexOf(t, n);
      return -1 !== r && (!!v(o) || r + t.length <= o);
    },
    $e = (e, t) => ze(e, t, 0),
    Ve = (e, t) => ze(e, t, e.length - t.length),
    qe = (e) => (t) => t.replace(e, ""),
    We = qe(/^\s+|\s+$/g),
    Ke = qe(/^\s+/g),
    Ye = qe(/\s+$/g),
    Ge = (e) => e.length > 0,
    Xe = (e) => !Ge(e),
    Ze = (e, t = 10) => {
      const n = parseInt(e, t);
      return isNaN(n) ? I.none() : I.some(n);
    },
    Qe = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
    Je = (e) => (t) => He(t, e),
    et = [
      {
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: (e) =>
          He(e, "edge/") &&
          He(e, "chrome") &&
          He(e, "safari") &&
          He(e, "applewebkit"),
      },
      {
        name: "Chromium",
        brand: "Chromium",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, Qe],
        search: (e) => He(e, "chrome") && !He(e, "chromeframe"),
      },
      {
        name: "IE",
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/,
        ],
        search: (e) => He(e, "msie") || He(e, "trident"),
      },
      {
        name: "Opera",
        versionRegexes: [Qe, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: Je("opera"),
      },
      {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: Je("firefox"),
      },
      {
        name: "Safari",
        versionRegexes: [Qe, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: (e) =>
          (He(e, "safari") || He(e, "mobile/")) && He(e, "applewebkit"),
      },
    ],
    tt = [
      {
        name: "Windows",
        search: Je("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/],
      },
      {
        name: "iOS",
        search: (e) => He(e, "iphone") || He(e, "ipad"),
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/,
        ],
      },
      {
        name: "Android",
        search: Je("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/],
      },
      {
        name: "macOS",
        search: Je("mac os x"),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/],
      },
      { name: "Linux", search: Je("linux"), versionRegexes: [] },
      { name: "Solaris", search: Je("sunos"), versionRegexes: [] },
      { name: "FreeBSD", search: Je("freebsd"), versionRegexes: [] },
      {
        name: "ChromeOS",
        search: Je("cros"),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/],
      },
    ],
    nt = { browsers: N(et), oses: N(tt) },
    ot = "Edge",
    rt = "Chromium",
    st = "Opera",
    at = "Firefox",
    it = "Safari",
    lt = (e) => {
      const t = e.current,
        n = e.version,
        o = (e) => () => t === e;
      return {
        current: t,
        version: n,
        isEdge: o(ot),
        isChromium: o(rt),
        isIE: o("IE"),
        isOpera: o(st),
        isFirefox: o(at),
        isSafari: o(it),
      };
    },
    dt = () => lt({ current: void 0, version: Fe.unknown() }),
    ct = lt,
    ut = (N(ot), N(rt), N("IE"), N(st), N(at), N(it), "Windows"),
    mt = "Android",
    ft = "Linux",
    gt = "macOS",
    pt = "Solaris",
    ht = "FreeBSD",
    bt = "ChromeOS",
    vt = (e) => {
      const t = e.current,
        n = e.version,
        o = (e) => () => t === e;
      return {
        current: t,
        version: n,
        isWindows: o(ut),
        isiOS: o("iOS"),
        isAndroid: o(mt),
        isMacOS: o(gt),
        isLinux: o(ft),
        isSolaris: o(pt),
        isFreeBSD: o(ht),
        isChromeOS: o(bt),
      };
    },
    yt = () => vt({ current: void 0, version: Fe.unknown() }),
    Ct = vt,
    wt =
      (N(ut),
      N("iOS"),
      N(mt),
      N(ft),
      N(gt),
      N(pt),
      N(ht),
      N(bt),
      (e) => window.matchMedia(e).matches);
  let xt = Le(() =>
    ((e, t, n) => {
      const o = nt.browsers(),
        r = nt.oses(),
        s = t
          .bind((e) =>
            ((e, t) =>
              ue(t.brands, (t) => {
                const n = t.brand.toLowerCase();
                return Q(e, (e) => {
                  var t;
                  return (
                    n ===
                    (null === (t = e.brand) || void 0 === t
                      ? void 0
                      : t.toLowerCase())
                  );
                }).map((e) => ({
                  current: e.name,
                  version: Fe.nu(parseInt(t.version, 10), 0),
                }));
              }))(o, e)
          )
          .orThunk(() =>
            ((e, t) =>
              Ue(e, t).map((e) => {
                const n = Fe.detect(e.versionRegexes, t);
                return { current: e.name, version: n };
              }))(o, e)
          )
          .fold(dt, ct),
        a = ((e, t) =>
          Ue(e, t).map((e) => {
            const n = Fe.detect(e.versionRegexes, t);
            return { current: e.name, version: n };
          }))(r, e).fold(yt, Ct),
        i = ((e, t, n, o) => {
          const r = e.isiOS() && !0 === /ipad/i.test(n),
            s = e.isiOS() && !r,
            a = e.isiOS() || e.isAndroid(),
            i = a || o("(pointer:coarse)"),
            l = r || (!s && a && o("(min-device-width:768px)")),
            d = s || (a && !l),
            c = t.isSafari() && e.isiOS() && !1 === /safari/i.test(n),
            u = !d && !l && !c;
          return {
            isiPad: N(r),
            isiPhone: N(s),
            isTablet: N(l),
            isPhone: N(d),
            isTouch: N(i),
            isAndroid: e.isAndroid,
            isiOS: e.isiOS,
            isWebView: N(c),
            isDesktop: N(u),
          };
        })(a, s, e, n);
      return { browser: s, os: a, deviceType: i };
    })(navigator.userAgent, I.from(navigator.userAgentData), wt)
  );
  const Et = () => xt(),
    kt = navigator.userAgent,
    _t = Et(),
    St = _t.browser,
    Nt = _t.os,
    Rt = _t.deviceType,
    At = -1 !== kt.indexOf("Windows Phone"),
    Tt = {
      transparentSrc:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      documentMode: St.isIE() ? document.documentMode || 7 : 10,
      cacheSuffix: null,
      container: null,
      canHaveCSP: !St.isIE(),
      windowsPhone: At,
      browser: {
        current: St.current,
        version: St.version,
        isChromium: St.isChromium,
        isEdge: St.isEdge,
        isFirefox: St.isFirefox,
        isIE: St.isIE,
        isOpera: St.isOpera,
        isSafari: St.isSafari,
      },
      os: {
        current: Nt.current,
        version: Nt.version,
        isAndroid: Nt.isAndroid,
        isChromeOS: Nt.isChromeOS,
        isFreeBSD: Nt.isFreeBSD,
        isiOS: Nt.isiOS,
        isLinux: Nt.isLinux,
        isMacOS: Nt.isMacOS,
        isSolaris: Nt.isSolaris,
        isWindows: Nt.isWindows,
      },
      deviceType: {
        isDesktop: Rt.isDesktop,
        isiPad: Rt.isiPad,
        isiPhone: Rt.isiPhone,
        isPhone: Rt.isPhone,
        isTablet: Rt.isTablet,
        isTouch: Rt.isTouch,
        isWebView: Rt.isWebView,
      },
    },
    Ot = /^\s*|\s*$/g,
    Bt = (e) => (y(e) ? "" : ("" + e).replace(Ot, "")),
    Pt = function (e, t, n, o) {
      (o = o || this),
        e &&
          (n && (e = e[n]),
          Ae(e, (e, r) => !1 !== t.call(o, e, r, n) && (Pt(e, t, n, o), !0)));
    },
    Dt = {
      trim: Bt,
      isArray: Re,
      is: (e, t) =>
        t ? !("array" !== t || !Re(e)) || typeof e === t : void 0 !== e,
      toArray: (e) => {
        if (Re(e)) return e;
        {
          const t = [];
          for (let n = 0, o = e.length; n < o; n++) t[n] = e[n];
          return t;
        }
      },
      makeMap: (e, t, n = {}) => {
        const o = m(e) ? e.split(t || ",") : e || [];
        let r = o.length;
        for (; r--; ) n[o[r]] = {};
        return n;
      },
      each: Ae,
      map: Te,
      grep: Oe,
      inArray: (e, t) => {
        if (e)
          for (let n = 0, o = e.length; n < o; n++) if (e[n] === t) return n;
        return -1;
      },
      hasOwn: ke,
      extend: (e, ...t) => {
        for (let n = 0; n < t.length; n++) {
          const o = t[n];
          for (const t in o)
            if (ke(o, t)) {
              const n = o[t];
              void 0 !== n && (e[t] = n);
            }
        }
        return e;
      },
      walk: Pt,
      resolve: (e, t = window) => {
        const n = e.split(".");
        for (let e = 0, o = n.length; e < o && (t = t[n[e]]); e++);
        return t;
      },
      explode: (e, t) => (p(e) ? e : "" === e ? [] : Te(e.split(t || ","), Bt)),
      _addCacheSuffix: (e) => {
        const t = Tt.cacheSuffix;
        return t && (e += (-1 === e.indexOf("?") ? "?" : "&") + t), e;
      },
    },
    Lt = (e, t, n = A) => e.exists((e) => n(e, t)),
    Mt = (e, t, n = A) => It(e, t, n).getOr(e.isNone() && t.isNone()),
    It = (e, t, n) =>
      e.isSome() && t.isSome()
        ? I.some(n(e.getOrDie(), t.getOrDie()))
        : I.none(),
    Ft = (e, t) => (e ? I.some(t) : I.none()),
    Ut = "undefined" != typeof window ? window : Function("return this;")(),
    zt = (e, t) =>
      ((e, t) => {
        let n = null != t ? t : Ut;
        for (let t = 0; t < e.length && null != n; ++t) n = n[e[t]];
        return n;
      })(e.split("."), t),
    jt = Object.getPrototypeOf,
    Ht = (e) => {
      const t = zt("ownerDocument.defaultView", e);
      return (
        f(e) &&
        (((e) =>
          ((e, t) => {
            const n = ((e, t) => zt(e, t))(e, t);
            if (null == n)
              throw new Error(e + " not available on this browser");
            return n;
          })("HTMLElement", e))(t).prototype.isPrototypeOf(e) ||
          /^HTML\w*Element$/.test(jt(e).constructor.name))
      );
    },
    $t = (e) => e.dom.nodeName.toLowerCase(),
    Vt = (e) => e.dom.nodeType,
    qt = (e) => (t) => Vt(t) === e,
    Wt = (e) => Kt(e) && Ht(e.dom),
    Kt = qt(1),
    Yt = qt(3),
    Gt = qt(9),
    Xt = qt(11),
    Zt = (e) => (t) => Kt(t) && $t(t) === e,
    Qt = (e, t, n) => {
      if (!(m(n) || b(n) || x(n)))
        throw (
          (console.error(
            "Invalid call to Attribute.set. Key ",
            t,
            ":: Value ",
            n,
            ":: Element ",
            e
          ),
          new Error("Attribute value was not simple"))
        );
      e.setAttribute(t, n + "");
    },
    Jt = (e, t, n) => {
      Qt(e.dom, t, n);
    },
    en = (e, t) => {
      const n = e.dom;
      pe(t, (e, t) => {
        Qt(n, t, e);
      });
    },
    tn = (e, t) => {
      const n = e.dom.getAttribute(t);
      return null === n ? void 0 : n;
    },
    nn = (e, t) => I.from(tn(e, t)),
    on = (e, t) => {
      const n = e.dom;
      return !(!n || !n.hasAttribute) && n.hasAttribute(t);
    },
    rn = (e, t) => {
      e.dom.removeAttribute(t);
    },
    sn = (e) => X(e.dom.attributes, (e, t) => ((e[t.name] = t.value), e), {}),
    an = (e, t) => {
      const n = tn(e, t);
      return void 0 === n || "" === n ? [] : n.split(" ");
    },
    ln = (e) => void 0 !== e.dom.classList,
    dn = (e) => an(e, "class"),
    cn = (e, t) =>
      ((e, t, n) => {
        const o = an(e, t).concat([n]);
        return Jt(e, t, o.join(" ")), !0;
      })(e, "class", t),
    un = (e, t) =>
      ((e, t, n) => {
        const o = Y(an(e, t), (e) => e !== n);
        return o.length > 0 ? Jt(e, t, o.join(" ")) : rn(e, t), !1;
      })(e, "class", t),
    mn = (e, t) => {
      ln(e) ? e.dom.classList.add(t) : cn(e, t);
    },
    fn = (e) => {
      0 === (ln(e) ? e.dom.classList : dn(e)).length && rn(e, "class");
    },
    gn = (e, t) => {
      ln(e) ? e.dom.classList.remove(t) : un(e, t), fn(e);
    },
    pn = (e, t) => ln(e) && e.dom.classList.contains(t),
    hn = (e) => {
      if (null == e) throw new Error("Node cannot be null or undefined");
      return { dom: e };
    },
    bn = (e, t) => {
      const n = (t || document).createElement("div");
      if (((n.innerHTML = e), !n.hasChildNodes() || n.childNodes.length > 1)) {
        const t = "HTML does not have a single root node";
        throw (console.error(t, e), new Error(t));
      }
      return hn(n.childNodes[0]);
    },
    vn = (e, t) => {
      const n = (t || document).createElement(e);
      return hn(n);
    },
    yn = (e, t) => {
      const n = (t || document).createTextNode(e);
      return hn(n);
    },
    Cn = hn,
    wn = (e, t, n) => I.from(e.dom.elementFromPoint(t, n)).map(hn),
    xn = (e, t) => {
      const n = [],
        o = (e) => (n.push(e), t(e));
      let r = t(e);
      do {
        r = r.bind(o);
      } while (r.isSome());
      return n;
    },
    En = (e, t) => {
      const n = e.dom;
      if (1 !== n.nodeType) return !1;
      {
        const e = n;
        if (void 0 !== e.matches) return e.matches(t);
        if (void 0 !== e.msMatchesSelector) return e.msMatchesSelector(t);
        if (void 0 !== e.webkitMatchesSelector)
          return e.webkitMatchesSelector(t);
        if (void 0 !== e.mozMatchesSelector) return e.mozMatchesSelector(t);
        throw new Error("Browser lacks native selectors");
      }
    },
    kn = (e) =>
      (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType) ||
      0 === e.childElementCount,
    _n = (e, t) => e.dom === t.dom,
    Sn = (e, t) => {
      const n = e.dom,
        o = t.dom;
      return n !== o && n.contains(o);
    },
    Nn = (e) => Cn(e.dom.ownerDocument),
    Rn = (e) => (Gt(e) ? e : Nn(e)),
    An = (e) => Cn(Rn(e).dom.defaultView),
    Tn = (e) => I.from(e.dom.parentNode).map(Cn),
    On = (e) => I.from(e.dom.parentElement).map(Cn),
    Bn = (e, t) => {
      const n = w(t) ? t : L;
      let o = e.dom;
      const r = [];
      for (; null !== o.parentNode && void 0 !== o.parentNode; ) {
        const e = o.parentNode,
          t = Cn(e);
        if ((r.push(t), !0 === n(t))) break;
        o = e;
      }
      return r;
    },
    Pn = (e) => I.from(e.dom.previousSibling).map(Cn),
    Dn = (e) => I.from(e.dom.nextSibling).map(Cn),
    Ln = (e) => oe(xn(e, Pn)),
    Mn = (e) => xn(e, Dn),
    In = (e) => V(e.dom.childNodes, Cn),
    Fn = (e, t) => {
      const n = e.dom.childNodes;
      return I.from(n[t]).map(Cn);
    },
    Un = (e) => Fn(e, 0),
    zn = (e) => Fn(e, e.dom.childNodes.length - 1),
    jn = (e) => e.dom.childNodes.length,
    Hn = (e) => Xt(e) && C(e.dom.host),
    $n = w(Element.prototype.attachShadow) && w(Node.prototype.getRootNode),
    Vn = N($n),
    qn = $n ? (e) => Cn(e.dom.getRootNode()) : Rn,
    Wn = (e) =>
      Hn(e)
        ? e
        : ((e) => {
            const t = e.dom.head;
            if (null == t) throw new Error("Head is not available yet");
            return Cn(t);
          })(Rn(e)),
    Kn = (e) => Cn(e.dom.host),
    Yn = (e) => {
      if (Vn() && C(e.target)) {
        const t = Cn(e.target);
        if (Kt(t) && Gn(t) && e.composed && e.composedPath) {
          const t = e.composedPath();
          if (t) return le(t);
        }
      }
      return I.from(e.target);
    },
    Gn = (e) => C(e.dom.shadowRoot),
    Xn = (e) => {
      const t = Yt(e) ? e.dom.parentNode : e.dom;
      if (null == t || null === t.ownerDocument) return !1;
      const n = t.ownerDocument;
      return ((e) => {
        const t = qn(e);
        return Hn(t) ? I.some(t) : I.none();
      })(Cn(t)).fold(() => n.body.contains(t), S(Xn, Kn));
    };
  var Zn = (e, t, n, o, r) =>
    e(n, o) ? I.some(n) : w(r) && r(n) ? I.none() : t(n, o, r);
  const Qn = (e, t, n) => {
      let o = e.dom;
      const r = w(n) ? n : L;
      for (; o.parentNode; ) {
        o = o.parentNode;
        const e = Cn(o);
        if (t(e)) return I.some(e);
        if (r(e)) break;
      }
      return I.none();
    },
    Jn = (e, t, n) => Zn((e, t) => t(e), Qn, e, t, n),
    eo = (e, t) => {
      const n = (e) => {
        for (let o = 0; o < e.childNodes.length; o++) {
          const r = Cn(e.childNodes[o]);
          if (t(r)) return I.some(r);
          const s = n(e.childNodes[o]);
          if (s.isSome()) return s;
        }
        return I.none();
      };
      return n(e.dom);
    },
    to = (e, t, n) => Qn(e, (e) => En(e, t), n),
    no = (e, t) =>
      ((e, t) => {
        const n = void 0 === t ? document : t.dom;
        return kn(n) ? I.none() : I.from(n.querySelector(e)).map(Cn);
      })(t, e),
    oo = (e, t, n) => Zn((e, t) => En(e, t), to, e, t, n),
    ro = (e, t = !1) => {
      return Xn(e)
        ? e.dom.isContentEditable
        : ((n = e), oo(n, "[contenteditable]")).fold(
            N(t),
            (e) => "true" === so(e)
          );
      var n;
    },
    so = (e) => e.dom.contentEditable,
    ao = (e) => void 0 !== e.style && w(e.style.getPropertyValue),
    io = (e, t, n) => {
      if (!m(n))
        throw (
          (console.error(
            "Invalid call to CSS.set. Property ",
            t,
            ":: Value ",
            n,
            ":: Element ",
            e
          ),
          new Error("CSS value must be a string: " + n))
        );
      ao(e) && e.style.setProperty(t, n);
    },
    lo = (e, t, n) => {
      const o = e.dom;
      io(o, t, n);
    },
    co = (e, t) => {
      const n = e.dom;
      pe(t, (e, t) => {
        io(n, t, e);
      });
    },
    uo = (e, t) => {
      const n = e.dom,
        o = window.getComputedStyle(n).getPropertyValue(t);
      return "" !== o || Xn(e) ? o : mo(n, t);
    },
    mo = (e, t) => (ao(e) ? e.style.getPropertyValue(t) : ""),
    fo = (e, t) => {
      const n = e.dom,
        o = mo(n, t);
      return I.from(o).filter((e) => e.length > 0);
    },
    go = (e) => {
      const t = {},
        n = e.dom;
      if (ao(n))
        for (let e = 0; e < n.style.length; e++) {
          const o = n.style.item(e);
          t[o] = n.style[o];
        }
      return t;
    },
    po = (e, t) => {
      ((e, t) => {
        ao(e) && e.style.removeProperty(t);
      })(e.dom, t),
        Lt(nn(e, "style").map(We), "") && rn(e, "style");
    },
    ho = (e, t) => {
      Tn(e).each((n) => {
        n.dom.insertBefore(t.dom, e.dom);
      });
    },
    bo = (e, t) => {
      Dn(e).fold(
        () => {
          Tn(e).each((e) => {
            yo(e, t);
          });
        },
        (e) => {
          ho(e, t);
        }
      );
    },
    vo = (e, t) => {
      Un(e).fold(
        () => {
          yo(e, t);
        },
        (n) => {
          e.dom.insertBefore(t.dom, n.dom);
        }
      );
    },
    yo = (e, t) => {
      e.dom.appendChild(t.dom);
    },
    Co = (e, t) => {
      ho(e, t), yo(t, e);
    },
    wo = (e, t) => {
      q(t, (t) => {
        yo(e, t);
      });
    },
    xo = (e) => {
      (e.dom.textContent = ""),
        q(In(e), (e) => {
          Eo(e);
        });
    },
    Eo = (e) => {
      const t = e.dom;
      null !== t.parentNode && t.parentNode.removeChild(t);
    },
    ko = (e) => {
      const t = In(e);
      var n, o;
      t.length > 0 &&
        ((n = e),
        q((o = t), (e, t) => {
          const r = 0 === t ? n : o[t - 1];
          bo(r, e);
        })),
        Eo(e);
    },
    _o = (e) => V(e, Cn),
    So = (e) => e.dom.innerHTML,
    No = (e, t) => {
      const n = Nn(e).dom,
        o = Cn(n.createDocumentFragment()),
        r = ((e, t) => {
          const n = (t || document).createElement("div");
          return (n.innerHTML = e), In(Cn(n));
        })(t, n);
      wo(o, r), xo(e), yo(e, o);
    },
    Ro = (e, t, n, o) =>
      ((e, t, n, o, r) => {
        const s = ((e, t) => (n) => {
          e(n) &&
            t(
              ((e) => {
                const t = Cn(Yn(e).getOr(e.target)),
                  n = () => e.stopPropagation(),
                  o = () => e.preventDefault(),
                  r = _(o, n);
                return ((e, t, n, o, r, s, a) => ({
                  target: e,
                  x: t,
                  y: n,
                  stop: o,
                  prevent: r,
                  kill: s,
                  raw: a,
                }))(t, e.clientX, e.clientY, n, o, r, e);
              })(n)
            );
        })(n, o);
        return (
          e.dom.addEventListener(t, s, false), { unbind: T(Ao, e, t, s, false) }
        );
      })(e, t, n, o),
    Ao = (e, t, n, o) => {
      e.dom.removeEventListener(t, n, o);
    },
    To = (e, t) => ({ left: e, top: t, translate: (n, o) => To(e + n, t + o) }),
    Oo = To,
    Bo = (e, t) => (void 0 !== e ? e : void 0 !== t ? t : 0),
    Po = (e) => {
      const t = e.dom,
        n = t.ownerDocument.body;
      return n === t
        ? Oo(n.offsetLeft, n.offsetTop)
        : Xn(e)
        ? ((e) => {
            const t = e.getBoundingClientRect();
            return Oo(t.left, t.top);
          })(t)
        : Oo(0, 0);
    },
    Do = (e) => {
      const t = void 0 !== e ? e.dom : document,
        n = t.body.scrollLeft || t.documentElement.scrollLeft,
        o = t.body.scrollTop || t.documentElement.scrollTop;
      return Oo(n, o);
    },
    Lo = (e, t, n) => {
      const o = (void 0 !== n ? n.dom : document).defaultView;
      o && o.scrollTo(e, t);
    },
    Mo = (e, t) => {
      Et().browser.isSafari() && w(e.dom.scrollIntoViewIfNeeded)
        ? e.dom.scrollIntoViewIfNeeded(!1)
        : e.dom.scrollIntoView(t);
    },
    Io = (e, t, n, o) => ({
      x: e,
      y: t,
      width: n,
      height: o,
      right: e + n,
      bottom: t + o,
    }),
    Fo = (e) => {
      const t = void 0 === e ? window : e,
        n = t.document,
        o = Do(Cn(n));
      return ((e) => {
        const t = void 0 === e ? window : e;
        return Et().browser.isFirefox() ? I.none() : I.from(t.visualViewport);
      })(t).fold(
        () => {
          const e = t.document.documentElement,
            n = e.clientWidth,
            r = e.clientHeight;
          return Io(o.left, o.top, n, r);
        },
        (e) =>
          Io(
            Math.max(e.pageLeft, o.left),
            Math.max(e.pageTop, o.top),
            e.width,
            e.height
          )
      );
    },
    Uo = (e, t) => {
      let n = [];
      return (
        q(In(e), (e) => {
          t(e) && (n = n.concat([e])), (n = n.concat(Uo(e, t)));
        }),
        n
      );
    },
    zo = (e, t) =>
      ((e, t) => {
        const n = void 0 === t ? document : t.dom;
        return kn(n) ? [] : V(n.querySelectorAll(e), Cn);
      })(t, e),
    jo = (e, t, n) => Qn(e, t, n).isSome(),
    Ho = (e, t) =>
      ((e, t) => {
        const n = e.dom;
        return n.parentNode
          ? ((e, t) => Q(e.dom.childNodes, (e) => t(Cn(e))).map(Cn))(
              Cn(n.parentNode),
              (n) => !_n(e, n) && t(n)
            )
          : I.none();
      })(e, t).isSome(),
    $o = (e, t) => eo(e, t).isSome();
  class Vo {
    constructor(e, t) {
      (this.node = e),
        (this.rootNode = t),
        (this.current = this.current.bind(this)),
        (this.next = this.next.bind(this)),
        (this.prev = this.prev.bind(this)),
        (this.prev2 = this.prev2.bind(this));
    }
    current() {
      return this.node;
    }
    next(e) {
      return (
        (this.node = this.findSibling(
          this.node,
          "firstChild",
          "nextSibling",
          e
        )),
        this.node
      );
    }
    prev(e) {
      return (
        (this.node = this.findSibling(
          this.node,
          "lastChild",
          "previousSibling",
          e
        )),
        this.node
      );
    }
    prev2(e) {
      return (this.node = this.findPreviousNode(this.node, e)), this.node;
    }
    findSibling(e, t, n, o) {
      if (e) {
        if (!o && e[t]) return e[t];
        if (e !== this.rootNode) {
          let t = e[n];
          if (t) return t;
          for (let o = e.parentNode; o && o !== this.rootNode; o = o.parentNode)
            if (((t = o[n]), t)) return t;
        }
      }
    }
    findPreviousNode(e, t) {
      if (e) {
        const n = e.previousSibling;
        if (this.rootNode && n === this.rootNode) return;
        if (n) {
          if (!t)
            for (let e = n.lastChild; e; e = e.lastChild)
              if (!e.lastChild) return e;
          return n;
        }
        const o = e.parentNode;
        if (o && o !== this.rootNode) return o;
      }
    }
  }
  const qo = "\ufeff",
    Wo = "\xa0",
    Ko = (e) => e === qo,
    Yo = /^[ \t\r\n]*$/,
    Go = (e) => Yo.test(e),
    Xo = (e) => "\n" === e || "\r" === e,
    Zo = (e, t = 4, n = !0, o = !0) => {
      const r = ((e, t) => (t <= 0 ? "" : new Array(t + 1).join(" ")))(0, t),
        s = e.replace(/\t/g, r),
        a = X(
          s,
          (e, t) =>
            ((e) => -1 !== " \f\t\v".indexOf(e))(t) || t === Wo
              ? e.pcIsSpace ||
                ("" === e.str && n) ||
                (e.str.length === s.length - 1 && o) ||
                ((e, t) => t < e.length && t >= 0 && Xo(e[t]))(
                  s,
                  e.str.length + 1
                )
                ? { pcIsSpace: !1, str: e.str + Wo }
                : { pcIsSpace: !0, str: e.str + " " }
              : { pcIsSpace: Xo(t), str: e.str + t },
          { pcIsSpace: !1, str: "" }
        );
      return a.str;
    },
    Qo = (e) => (t) => !!t && t.nodeType === e,
    Jo = (e) => !!e && !Object.getPrototypeOf(e),
    er = Qo(1),
    tr = (e) => er(e) && Wt(Cn(e)),
    nr = (e) => {
      const t = e.toLowerCase();
      return (e) => C(e) && e.nodeName.toLowerCase() === t;
    },
    or = (e) => {
      const t = e.map((e) => e.toLowerCase());
      return (e) => {
        if (e && e.nodeName) {
          const n = e.nodeName.toLowerCase();
          return H(t, n);
        }
        return !1;
      };
    },
    rr = (e, t) => {
      const n = t.toLowerCase().split(" ");
      return (t) => {
        if (er(t)) {
          const o = t.ownerDocument.defaultView;
          if (o)
            for (let r = 0; r < n.length; r++) {
              const s = o.getComputedStyle(t, null);
              if ((s ? s.getPropertyValue(e) : null) === n[r]) return !0;
            }
        }
        return !1;
      };
    },
    sr = (e) => er(e) && e.hasAttribute("data-mce-bogus"),
    ar = (e) => er(e) && "TABLE" === e.tagName,
    ir = (e) => (t) => {
      if (tr(t)) {
        if (t.contentEditable === e) return !0;
        if (t.getAttribute("data-mce-contenteditable") === e) return !0;
      }
      return !1;
    },
    lr = or(["textarea", "input"]),
    dr = Qo(3),
    cr = Qo(4),
    ur = Qo(7),
    mr = Qo(8),
    fr = Qo(9),
    gr = Qo(11),
    pr = nr("br"),
    hr = nr("img"),
    br = ir("true"),
    vr = ir("false"),
    yr = or(["td", "th"]),
    Cr = or(["td", "th", "caption"]),
    wr = or(["video", "audio", "object", "embed"]),
    xr = nr("li"),
    Er = nr("details"),
    kr = nr("summary"),
    _r = { skipBogus: !0, includeZwsp: !1, checkRootAsContent: !1 },
    Sr =
      ("data-mce-bookmark",
      (e) => er(e) && e.hasAttribute("data-mce-bookmark"));
  const Nr = (e, t, n, o) =>
      dr(e) &&
      !((e, t, n) =>
        Go(e.data) &&
        !((e, t, n) => {
          const o = Cn(t),
            r = Cn(e),
            s = n.getWhitespaceElements();
          return jo(r, (e) => ke(s, $t(e)), T(_n, o));
        })(e, t, n))(e, t, n) &&
      (!o.includeZwsp ||
        !((e) => {
          for (const t of e) if (!Ko(t)) return !1;
          return !0;
        })(e.data)),
    Rr = (e, t, n, o) =>
      (w(o.isContent) && o.isContent(t)) ||
      ((e, t) => er(e) && ke(t.getNonEmptyElements(), e.nodeName))(t, e) ||
      Sr(t) ||
      ((e) =>
        er(e) &&
        "A" === e.nodeName &&
        !e.hasAttribute("href") &&
        (e.hasAttribute("name") || e.hasAttribute("id")))(t) ||
      Nr(t, n, e, o) ||
      vr(t) ||
      (br(t) && ((e) => On(Cn(e)).exists((e) => !ro(e)))(t)),
    Ar = (e, t, n) => {
      const o = { ..._r, ...n };
      if (o.checkRootAsContent && Rr(e, t, t, o)) return !1;
      let r = t.firstChild,
        s = 0;
      if (!r) return !0;
      const a = new Vo(r, t);
      do {
        if (o.skipBogus && er(r)) {
          const e = r.getAttribute("data-mce-bogus");
          if (e) {
            r = a.next("all" === e);
            continue;
          }
        }
        if (mr(r)) r = a.next(!0);
        else if (pr(r)) s++, (r = a.next());
        else {
          if (Rr(e, r, t, o)) return !1;
          r = a.next();
        }
      } while (r);
      return s <= 1;
    },
    Tr = (e, t, n) => Ar(e, t.dom, { checkRootAsContent: !0, ...n }),
    Or = (e, t, n) => Rr(e, t, t, { includeZwsp: _r.includeZwsp, ...n }),
    Br = (e) => "svg" === e.toLowerCase(),
    Pr = (e) => Br(e.nodeName),
    Dr = (e) => ("svg" === (null == e ? void 0 : e.nodeName) ? "svg" : "html"),
    Lr = ["svg"],
    Mr = "data-mce-block",
    Ir = (e) =>
      V(
        ((e) => Y(fe(e), (e) => !/[A-Z]/.test(e)))(e),
        (e) => `${e}:` + V(Lr, (t) => `not(${t} ${e})`).join(":")
      ).join(","),
    Fr = (e, t) =>
      C(t.querySelector(e))
        ? (t.setAttribute(Mr, "true"),
          "inline-boundary" === t.getAttribute("data-mce-selected") &&
            t.removeAttribute("data-mce-selected"),
          !0)
        : (t.removeAttribute(Mr), !1),
    Ur = (e, t) => {
      const n = Ir(e.getTransparentElements()),
        o = Ir(e.getBlockElements());
      return Y(t.querySelectorAll(n), (e) => Fr(o, e));
    },
    zr = (e, t, n) => {
      var o;
      const r = n ? "lastChild" : "firstChild";
      for (let n = t[r]; n; n = n[r])
        if (Ar(e, n, { checkRootAsContent: !0 }))
          return void (
            null === (o = n.parentNode) ||
            void 0 === o ||
            o.removeChild(n)
          );
    },
    jr = (e, t, n) => {
      const o = e.getBlockElements(),
        r = Cn(t),
        s = (e) => $t(e) in o,
        a = (e) => _n(e, r);
      q(_o(n), (t) => {
        Qn(t, s, a).each((n) => {
          const o = ((t, o) =>
            Y(In(t), (t) => s(t) && !e.isValidChild($t(n), $t(t))))(t);
          if (o.length > 0) {
            const t = On(n);
            q(o, (t) => {
              Qn(t, s, a).each((n) => {
                ((e, t, n) => {
                  const o = document.createRange(),
                    r = t.parentNode;
                  if (r) {
                    o.setStartBefore(t), o.setEndBefore(n);
                    const s = o.extractContents();
                    zr(e, s, !0), o.setStartAfter(n), o.setEndAfter(t);
                    const a = o.extractContents();
                    zr(e, a, !1),
                      Ar(e, s, { checkRootAsContent: !0 }) ||
                        r.insertBefore(s, t),
                      Ar(e, n, { checkRootAsContent: !0 }) ||
                        r.insertBefore(n, t),
                      Ar(e, a, { checkRootAsContent: !0 }) ||
                        r.insertBefore(a, t),
                      r.removeChild(t);
                  }
                })(e, n.dom, t.dom);
              });
            }),
              t.each((t) => Ur(e, t.dom));
          }
        });
      });
    },
    Hr = (e, t) => {
      const n = Ur(e, t);
      jr(e, t, n),
        ((e, t, n) => {
          q([...n, ...(Kr(e, t) ? [t] : [])], (t) =>
            q(zo(Cn(t), t.nodeName.toLowerCase()), (t) => {
              Yr(e, t.dom) && ko(t);
            })
          );
        })(e, t, n);
    },
    $r = (e, t) => {
      if (Wr(e, t)) {
        const n = Ir(e.getBlockElements());
        Fr(n, t);
      }
    },
    Vr = (e) => e.hasAttribute(Mr),
    qr = (e, t) => ke(e.getTransparentElements(), t),
    Wr = (e, t) => er(t) && qr(e, t.nodeName),
    Kr = (e, t) => Wr(e, t) && Vr(t),
    Yr = (e, t) => Wr(e, t) && !Vr(t),
    Gr = (e, t) => 1 === t.type && qr(e, t.name) && m(t.attr(Mr)),
    Xr = Et().browser,
    Zr = (e) => Q(e, Kt),
    Qr = (e, t) => e.children && H(e.children, t),
    Jr = (e, t = {}) => {
      let n = 0;
      const o = {},
        r = Cn(e),
        s = Rn(r),
        a = (e) => {
          yo(Wn(r), e);
        },
        i = (e) => {
          const t = Wn(r);
          no(t, "#" + e).each(Eo);
        },
        l = (e) =>
          Ee(o, e).getOrThunk(() => ({
            id: "mce-u" + n++,
            passed: [],
            failed: [],
            count: 0,
          })),
        d = (e) =>
          new Promise((n, r) => {
            let i;
            const d = Dt._addCacheSuffix(e),
              c = l(d);
            (o[d] = c), c.count++;
            const u = (e, t) => {
                q(e, D),
                  (c.status = t),
                  (c.passed = []),
                  (c.failed = []),
                  i && ((i.onload = null), (i.onerror = null), (i = null));
              },
              m = () => u(c.passed, 2),
              f = () => u(c.failed, 3);
            if ((n && c.passed.push(n), r && c.failed.push(r), 1 === c.status))
              return;
            if (2 === c.status) return void m();
            if (3 === c.status) return void f();
            c.status = 1;
            const g = vn("link", s.dom);
            en(g, { rel: "stylesheet", type: "text/css", id: c.id }),
              t.contentCssCors && Jt(g, "crossOrigin", "anonymous"),
              t.referrerPolicy && Jt(g, "referrerpolicy", t.referrerPolicy),
              (i = g.dom),
              (i.onload = m),
              (i.onerror = f),
              a(g),
              Jt(g, "href", d);
          }),
        c = (e) => {
          const t = Dt._addCacheSuffix(e);
          Ee(o, t).each((e) => {
            0 == --e.count && (delete o[t], i(e.id));
          });
        };
      return {
        load: d,
        loadRawCss: (e, t) => {
          const n = l(e);
          (o[e] = n), n.count++;
          const r = vn("style", s.dom);
          en(r, { rel: "stylesheet", type: "text/css", id: n.id }),
            (r.dom.innerHTML = t),
            a(r);
        },
        loadAll: (e) =>
          Promise.allSettled(V(e, (e) => d(e).then(N(e)))).then((e) => {
            const t = K(e, (e) => "fulfilled" === e.status);
            return t.fail.length > 0
              ? Promise.reject(V(t.fail, (e) => e.reason))
              : V(t.pass, (e) => e.value);
          }),
        unload: c,
        unloadRawCss: (e) => {
          Ee(o, e).each((t) => {
            0 == --t.count && (delete o[e], i(t.id));
          });
        },
        unloadAll: (e) => {
          q(e, (e) => {
            c(e);
          });
        },
        _setReferrerPolicy: (e) => {
          t.referrerPolicy = e;
        },
        _setContentCssCors: (e) => {
          t.contentCssCors = e;
        },
      };
    },
    es = (() => {
      const e = new WeakMap();
      return {
        forElement: (t, n) => {
          const o = qn(t).dom;
          return I.from(e.get(o)).getOrThunk(() => {
            const t = Jr(o, n);
            return e.set(o, t), t;
          });
        },
      };
    })(),
    ts = (e, t) => C(e) && (Or(t, e) || t.isInline(e.nodeName.toLowerCase())),
    ns = (e) =>
      ((e) => "span" === e.nodeName.toLowerCase())(e) &&
      "bookmark" === e.getAttribute("data-mce-type"),
    os = (e, t, n, o) => {
      var r;
      const s = o || t;
      if (er(t) && ns(t)) return t;
      const a = t.childNodes;
      for (let t = a.length - 1; t >= 0; t--) os(e, a[t], n, s);
      if (er(t)) {
        const e = t.childNodes;
        1 === e.length &&
          ns(e[0]) &&
          (null === (r = t.parentNode) ||
            void 0 === r ||
            r.insertBefore(e[0], t));
      }
      return (
        ((e) => gr(e) || fr(e))(t) ||
          Or(n, t) ||
          ((e) => !!er(e) && e.childNodes.length > 0)(t) ||
          ((e, t, n) =>
            dr(e) &&
            e.data.length > 0 &&
            ((e, t, n) => {
              const o = new Vo(e, t).prev(!1),
                r = new Vo(e, t).next(!1),
                s = v(o) || ts(o, n),
                a = v(r) || ts(r, n);
              return s && a;
            })(e, t, n))(t, s, n) ||
          e.remove(t),
        t
      );
    },
    rs = Dt.makeMap,
    ss =
      /[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    as = /[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    is = /[<>&\"\']/g,
    ls = /&#([a-z0-9]+);?|&([a-z0-9]+);/gi,
    ds = {
      128: "\u20ac",
      130: "\u201a",
      131: "\u0192",
      132: "\u201e",
      133: "\u2026",
      134: "\u2020",
      135: "\u2021",
      136: "\u02c6",
      137: "\u2030",
      138: "\u0160",
      139: "\u2039",
      140: "\u0152",
      142: "\u017d",
      145: "\u2018",
      146: "\u2019",
      147: "\u201c",
      148: "\u201d",
      149: "\u2022",
      150: "\u2013",
      151: "\u2014",
      152: "\u02dc",
      153: "\u2122",
      154: "\u0161",
      155: "\u203a",
      156: "\u0153",
      158: "\u017e",
      159: "\u0178",
    },
    cs = {
      '"': "&quot;",
      "'": "&#39;",
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "`": "&#96;",
    },
    us = {
      "&lt;": "<",
      "&gt;": ">",
      "&amp;": "&",
      "&quot;": '"',
      "&apos;": "'",
    },
    ms = (e, t) => {
      const n = {};
      if (e) {
        const o = e.split(",");
        t = t || 10;
        for (let e = 0; e < o.length; e += 2) {
          const r = String.fromCharCode(parseInt(o[e], t));
          if (!cs[r]) {
            const t = "&" + o[e + 1] + ";";
            (n[r] = t), (n[t] = r);
          }
        }
        return n;
      }
    },
    fs = ms(
      "50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",
      32
    ),
    gs = (e, t) => e.replace(t ? ss : as, (e) => cs[e] || e),
    ps = (e, t) =>
      e.replace(t ? ss : as, (e) =>
        e.length > 1
          ? "&#" +
            (1024 * (e.charCodeAt(0) - 55296) +
              (e.charCodeAt(1) - 56320) +
              65536) +
            ";"
          : cs[e] || "&#" + e.charCodeAt(0) + ";"
      ),
    hs = (e, t, n) => {
      const o = n || fs;
      return e.replace(t ? ss : as, (e) => cs[e] || o[e] || e);
    },
    bs = {
      encodeRaw: gs,
      encodeAllRaw: (e) => ("" + e).replace(is, (e) => cs[e] || e),
      encodeNumeric: ps,
      encodeNamed: hs,
      getEncodeFunc: (e, t) => {
        const n = ms(t) || fs,
          o = rs(e.replace(/\+/g, ","));
        return o.named && o.numeric
          ? (e, t) =>
              e.replace(t ? ss : as, (e) =>
                void 0 !== cs[e]
                  ? cs[e]
                  : void 0 !== n[e]
                  ? n[e]
                  : e.length > 1
                  ? "&#" +
                    (1024 * (e.charCodeAt(0) - 55296) +
                      (e.charCodeAt(1) - 56320) +
                      65536) +
                    ";"
                  : "&#" + e.charCodeAt(0) + ";"
              )
          : o.named
          ? t
            ? (e, t) => hs(e, t, n)
            : hs
          : o.numeric
          ? ps
          : gs;
      },
      decode: (e) =>
        e.replace(ls, (e, t) =>
          t
            ? (t =
                "x" === t.charAt(0).toLowerCase()
                  ? parseInt(t.substr(1), 16)
                  : parseInt(t, 10)) > 65535
              ? ((t -= 65536),
                String.fromCharCode(55296 + (t >> 10), 56320 + (1023 & t)))
              : ds[t] || String.fromCharCode(t)
            : us[e] ||
              fs[e] ||
              ((e) => {
                const t = vn("div").dom;
                return (t.innerHTML = e), t.textContent || t.innerText || e;
              })(e)
        ),
    },
    vs = (e, t) => ((e = Dt.trim(e)) ? e.split(t || " ") : []),
    ys = (e) => new RegExp("^" + e.replace(/([?+*])/g, ".$1") + "$"),
    Cs = (e) =>
      Object.freeze([
        "id",
        "accesskey",
        "class",
        "dir",
        "lang",
        "style",
        "tabindex",
        "title",
        "role",
        ...("html4" !== e
          ? [
              "contenteditable",
              "contextmenu",
              "draggable",
              "dropzone",
              "hidden",
              "spellcheck",
              "translate",
            ]
          : []),
        ...("html5-strict" !== e ? ["xml:lang"] : []),
      ]),
    ws = (e) => {
      let t, n;
      (t =
        "address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul"),
        (n =
          "a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment"),
        "html4" !== e &&
          ((t +=
            " article aside details dialog figure main header footer hgroup section nav a ins del canvas map"),
          (n +=
            " audio canvas command data datalist mark meter output picture progress time wbr video ruby bdi keygen svg")),
        "html5-strict" !== e &&
          ((n = [n, "acronym applet basefont big font strike tt"].join(" ")),
          (t = [t, "center dir isindex noframes"].join(" ")));
      const o = [t, n].join(" ");
      return { blockContent: t, phrasingContent: n, flowContent: o };
    },
    xs = (e) => {
      const { blockContent: t, phrasingContent: n, flowContent: o } = ws(e),
        r = (e) => Object.freeze(e.split(" "));
      return Object.freeze({
        blockContent: r(t),
        phrasingContent: r(n),
        flowContent: r(o),
      });
    },
    Es = {
      html4: Le(() => xs("html4")),
      html5: Le(() => xs("html5")),
      "html5-strict": Le(() => xs("html5-strict")),
    },
    ks = (e, t) => {
      const { blockContent: n, phrasingContent: o, flowContent: r } = Es[e]();
      return "blocks" === t
        ? I.some(n)
        : "phrasing" === t
        ? I.some(o)
        : "flow" === t
        ? I.some(r)
        : I.none();
    },
    _s = (e) =>
      I.from(
        /^(@?)([A-Za-z0-9_\-.\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]+)$/.exec(
          e
        )
      ).map((e) => ({ preset: "@" === e[1], name: e[2] })),
    Ss = {},
    Ns = Dt.makeMap,
    Rs = Dt.each,
    As = Dt.extend,
    Ts = Dt.explode,
    Os = (e, t = {}) => {
      const n = Ns(e, " ", Ns(e.toUpperCase(), " "));
      return As(n, t);
    },
    Bs = (e) =>
      Os(
        "td th li dt dd figcaption caption details summary",
        e.getTextBlockElements()
      ),
    Ps = (e, t) => {
      if (e) {
        const n = {};
        return (
          m(e) && (e = { "*": e }),
          Rs(e, (e, o) => {
            n[o] = n[o.toUpperCase()] =
              "map" === t ? Ns(e, /[, ]/) : Ts(e, /[, ]/);
          }),
          n
        );
      }
    },
    Ds = (e = {}) => {
      var t;
      const n = {},
        o = {};
      let r = [];
      const s = {},
        a = {},
        i = (t, n, o) => {
          const r = e[t];
          if (r) return Ns(r, /[, ]/, Ns(r.toUpperCase(), /[, ]/));
          {
            let e = Ss[t];
            return e || ((e = Os(n, o)), (Ss[t] = e)), e;
          }
        },
        l = null !== (t = e.schema) && void 0 !== t ? t : "html5",
        d = ((e) => {
          const t = Cs(e),
            { phrasingContent: n, flowContent: o } = ws(e),
            r = {},
            s = (e, t, n) => {
              r[e] = {
                attributes: se(t, N({})),
                attributesOrder: t,
                children: se(n, N({})),
              };
            },
            a = (e, n = "", o = "") => {
              const r = vs(o),
                a = vs(e);
              let i = a.length;
              const l = [...t, ...vs(n)];
              for (; i--; ) s(a[i], l.slice(), r);
            },
            i = (e, t) => {
              const n = vs(e),
                o = vs(t);
              let s = n.length;
              for (; s--; ) {
                const e = r[n[s]];
                for (let t = 0, n = o.length; t < n; t++)
                  (e.attributes[o[t]] = {}), e.attributesOrder.push(o[t]);
              }
            };
          return (
            "html5-strict" !== e &&
              (q(vs("acronym applet basefont big font strike tt"), (e) => {
                a(e, "", n);
              }),
              q(vs("center dir isindex noframes"), (e) => {
                a(e, "", o);
              })),
            a("html", "manifest", "head body"),
            a("head", "", "base command link meta noscript script style title"),
            a("title hr noscript br"),
            a("base", "href target"),
            a("link", "href rel media hreflang type sizes hreflang"),
            a("meta", "name http-equiv content charset"),
            a("style", "media type scoped"),
            a("script", "src async defer type charset"),
            a(
              "body",
              "onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload",
              o
            ),
            a("dd div", "", o),
            a("address dt caption", "", "html4" === e ? n : o),
            a(
              "h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn",
              "",
              n
            ),
            a("blockquote", "cite", o),
            a("ol", "reversed start type", "li"),
            a("ul", "", "li"),
            a("li", "value", o),
            a("dl", "", "dt dd"),
            a(
              "a",
              "href target rel media hreflang type",
              "html4" === e ? n : o
            ),
            a("q", "cite", n),
            a("ins del", "cite datetime", o),
            a("img", "src sizes srcset alt usemap ismap width height"),
            a("iframe", "src name width height", o),
            a("embed", "src type width height"),
            a(
              "object",
              "data type typemustmatch name usemap form width height",
              [o, "param"].join(" ")
            ),
            a("param", "name value"),
            a("map", "name", [o, "area"].join(" ")),
            a("area", "alt coords shape href target rel media hreflang type"),
            a(
              "table",
              "border",
              "caption colgroup thead tfoot tbody tr" +
                ("html4" === e ? " col" : "")
            ),
            a("colgroup", "span", "col"),
            a("col", "span"),
            a("tbody thead tfoot", "", "tr"),
            a("tr", "", "td th"),
            a("td", "colspan rowspan headers", o),
            a("th", "colspan rowspan headers scope abbr", o),
            a(
              "form",
              "accept-charset action autocomplete enctype method name novalidate target",
              o
            ),
            a("fieldset", "disabled form name", [o, "legend"].join(" ")),
            a("label", "form for", n),
            a(
              "input",
              "accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"
            ),
            a(
              "button",
              "disabled form formaction formenctype formmethod formnovalidate formtarget name type value",
              "html4" === e ? o : n
            ),
            a(
              "select",
              "disabled form multiple name required size",
              "option optgroup"
            ),
            a("optgroup", "disabled label", "option"),
            a("option", "disabled label selected value"),
            a(
              "textarea",
              "cols dirname disabled form maxlength name readonly required rows wrap"
            ),
            a("menu", "type label", [o, "li"].join(" ")),
            a("noscript", "", o),
            "html4" !== e &&
              (a("wbr"),
              a("ruby", "", [n, "rt rp"].join(" ")),
              a("figcaption", "", o),
              a("mark rt rp bdi", "", n),
              a("summary", "", [n, "h1 h2 h3 h4 h5 h6"].join(" ")),
              a("canvas", "width height", o),
              a("data", "value", n),
              a(
                "video",
                "src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered",
                [o, "track source"].join(" ")
              ),
              a(
                "audio",
                "src crossorigin preload autoplay mediagroup loop muted controls buffered volume",
                [o, "track source"].join(" ")
              ),
              a("picture", "", "img source"),
              a("source", "src srcset type media sizes"),
              a("track", "kind src srclang label default"),
              a("datalist", "", [n, "option"].join(" ")),
              a("article section nav aside main header footer", "", o),
              a("hgroup", "", "h1 h2 h3 h4 h5 h6"),
              a("figure", "", [o, "figcaption"].join(" ")),
              a("time", "datetime", n),
              a("dialog", "open", o),
              a(
                "command",
                "type label icon disabled checked radiogroup command"
              ),
              a("output", "for form name", n),
              a("progress", "value max", n),
              a("meter", "value min max low high optimum", n),
              a("details", "open", [o, "summary"].join(" ")),
              a("keygen", "autofocus challenge disabled form keytype name"),
              s(
                "svg",
                "id tabindex lang xml:space class style x y width height viewBox preserveAspectRatio zoomAndPan transform".split(
                  " "
                ),
                []
              )),
            "html5-strict" !== e &&
              (i("script", "language xml:space"),
              i("style", "xml:space"),
              i(
                "object",
                "declare classid code codebase codetype archive standby align border hspace vspace"
              ),
              i("embed", "align name hspace vspace"),
              i("param", "valuetype type"),
              i("a", "charset name rev shape coords"),
              i("br", "clear"),
              i(
                "applet",
                "codebase archive code object alt name width height align hspace vspace"
              ),
              i("img", "name longdesc align border hspace vspace"),
              i(
                "iframe",
                "longdesc frameborder marginwidth marginheight scrolling align"
              ),
              i("font basefont", "size color face"),
              i("input", "usemap align"),
              i("select"),
              i("textarea"),
              i("h1 h2 h3 h4 h5 h6 div p legend caption", "align"),
              i("ul", "type compact"),
              i("li", "type"),
              i("ol dl menu dir", "compact"),
              i("pre", "width xml:space"),
              i("hr", "align noshade size width"),
              i("isindex", "prompt"),
              i(
                "table",
                "summary width frame rules cellspacing cellpadding align bgcolor"
              ),
              i("col", "width align char charoff valign"),
              i("colgroup", "width align char charoff valign"),
              i("thead", "align char charoff valign"),
              i("tr", "align char charoff valign bgcolor"),
              i(
                "th",
                "axis align char charoff valign nowrap bgcolor width height"
              ),
              i("form", "accept"),
              i(
                "td",
                "abbr axis scope align char charoff valign nowrap bgcolor width height"
              ),
              i("tfoot", "align char charoff valign"),
              i("tbody", "align char charoff valign"),
              i("area", "nohref"),
              i("body", "background bgcolor text link vlink alink")),
            "html4" !== e &&
              (i("input button select textarea", "autofocus"),
              i("input textarea", "placeholder"),
              i("a", "download"),
              i("link script img", "crossorigin"),
              i("img", "loading"),
              i("iframe", "sandbox seamless allow allowfullscreen loading")),
            "html4" !== e &&
              q([r.video, r.audio], (e) => {
                delete e.children.audio, delete e.children.video;
              }),
            q(vs("a form meter progress dfn"), (e) => {
              r[e] && delete r[e].children[e];
            }),
            delete r.caption.children.table,
            delete r.script,
            r
          );
        })(l);
      !1 === e.verify_html && (e.valid_elements = "*[*]");
      const c = Ps(e.valid_styles),
        u = Ps(e.invalid_styles, "map"),
        g = Ps(e.valid_classes, "map"),
        h = i(
          "whitespace_elements",
          "pre script noscript style textarea video audio iframe object code"
        ),
        v = i(
          "self_closing_elements",
          "colgroup dd dt li option p td tfoot th thead tr"
        ),
        y = i(
          "void_elements",
          "area base basefont br col frame hr img input isindex link meta param embed source wbr track"
        ),
        C = i(
          "boolean_attributes",
          "checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls allowfullscreen"
        ),
        w = "td th iframe video audio object script code",
        x = i("non_empty_elements", w + " pre svg textarea summary", y),
        E = i("move_caret_before_on_enter_elements", w + " table", y),
        k = "h1 h2 h3 h4 h5 h6",
        _ = i(
          "text_block_elements",
          k +
            " p div address pre form blockquote center dir fieldset header footer article section hgroup aside main nav figure"
        ),
        S = i(
          "block_elements",
          "hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup figcaption details summary html body multicol listing",
          _
        ),
        R = i(
          "text_inline_elements",
          "span strong b em i font s strike u var cite dfn code mark q sup sub samp"
        ),
        A = i("transparent_elements", "a ins del canvas map"),
        T = i("wrap_block_elements", "pre " + k);
      Rs(
        "script noscript iframe noframes noembed title style textarea xmp plaintext".split(
          " "
        ),
        (e) => {
          a[e] = new RegExp("</" + e + "[^>]*>", "gi");
        }
      );
      const O = (e) => {
          const t = I.from(n["@"]),
            o = /[*?+]/;
          q(
            ((e, t) => {
              const n =
                /^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)])?$/;
              return te(vs(t, ","), (t) => {
                const o = n.exec(t);
                if (o) {
                  const t = o[1],
                    n = o[2],
                    r = o[3],
                    s = o[4],
                    a = o[5],
                    i = { attributes: {}, attributesOrder: [] };
                  if (
                    (e.each((e) =>
                      ((e, t) => {
                        pe(e.attributes, (e, n) => {
                          t.attributes[n] = e;
                        }),
                          t.attributesOrder.push(...e.attributesOrder);
                      })(e, i)
                    ),
                    "#" === t
                      ? (i.paddEmpty = !0)
                      : "-" === t && (i.removeEmpty = !0),
                    "!" === s && (i.removeEmptyAttrs = !0),
                    a &&
                      ((e, t) => {
                        const n =
                            /^([!\-])?(\w+[\\:]:\w+|[^=~<]+)?(?:([=~<])(.*))?$/,
                          o = /[*?+]/,
                          { attributes: r, attributesOrder: s } = t;
                        q(vs(e, "|"), (e) => {
                          const a = n.exec(e);
                          if (a) {
                            const e = {},
                              n = a[1],
                              i = a[2].replace(/[\\:]:/g, ":"),
                              l = a[3],
                              d = a[4];
                            if (
                              ("!" === n &&
                                ((t.attributesRequired =
                                  t.attributesRequired || []),
                                t.attributesRequired.push(i),
                                (e.required = !0)),
                              "-" === n)
                            )
                              return (
                                delete r[i], void s.splice(Dt.inArray(s, i), 1)
                              );
                            if (
                              (l &&
                                ("=" === l
                                  ? ((t.attributesDefault =
                                      t.attributesDefault || []),
                                    t.attributesDefault.push({
                                      name: i,
                                      value: d,
                                    }),
                                    (e.defaultValue = d))
                                  : "~" === l
                                  ? ((t.attributesForced =
                                      t.attributesForced || []),
                                    t.attributesForced.push({
                                      name: i,
                                      value: d,
                                    }),
                                    (e.forcedValue = d))
                                  : "<" === l &&
                                    (e.validValues = Dt.makeMap(d, "?"))),
                              o.test(i))
                            ) {
                              const n = e;
                              (t.attributePatterns = t.attributePatterns || []),
                                (n.pattern = ys(i)),
                                t.attributePatterns.push(n);
                            } else r[i] || s.push(i), (r[i] = e);
                          }
                        });
                      })(a, i),
                    r && (i.outputName = n),
                    "@" === n)
                  ) {
                    if (!e.isNone()) return [];
                    e = I.some(i);
                  }
                  return [
                    r
                      ? { name: n, element: i, aliasName: r }
                      : { name: n, element: i },
                  ];
                }
                return [];
              });
            })(t, null != e ? e : ""),
            ({ name: e, element: t, aliasName: s }) => {
              if ((s && (n[s] = t), o.test(e))) {
                const n = t;
                (n.pattern = ys(e)), r.push(n);
              } else n[e] = t;
            }
          );
        },
        B = (e) => {
          (r = []),
            q(fe(n), (e) => {
              delete n[e];
            }),
            O(e);
        },
        P = (e, t) => {
          var r, a;
          delete Ss.text_block_elements, delete Ss.block_elements;
          const i = !!t.extends && !oe(t.extends),
            d = t.extends;
          if (
            ((o[e] = d ? o[d] : {}),
            (s[e] = null != d ? d : e),
            (x[e.toUpperCase()] = {}),
            (x[e] = {}),
            i || ((S[e.toUpperCase()] = {}), (S[e] = {})),
            d && !n[e] && n[d])
          ) {
            const t = ((e) => {
              const t = (e) =>
                p(e)
                  ? V(e, t)
                  : ((e) =>
                      f(e) &&
                      e.source &&
                      "[object RegExp]" === Object.prototype.toString.call(e))(
                      e
                    )
                  ? new RegExp(e.source, e.flags)
                  : f(e)
                  ? he(e, t)
                  : e;
              return t(e);
            })(n[d]);
            delete t.removeEmptyAttrs, delete t.removeEmpty, (n[e] = t);
          } else n[e] = { attributesOrder: [], attributes: {} };
          if (p(t.attributes)) {
            const o = (e) => {
                s.attributesOrder.push(e), (s.attributes[e] = {});
              },
              s = null !== (r = n[e]) && void 0 !== r ? r : {};
            delete s.attributesDefault,
              delete s.attributesForced,
              delete s.attributePatterns,
              delete s.attributesRequired,
              (s.attributesOrder = []),
              (s.attributes = {}),
              q(t.attributes, (e) => {
                const t = Cs(l);
                _s(e).each(({ preset: e, name: n }) => {
                  e ? "global" === n && q(t, o) : o(n);
                });
              }),
              (n[e] = s);
          }
          if (b(t.padEmpty)) {
            const o = null !== (a = n[e]) && void 0 !== a ? a : {};
            (o.paddEmpty = t.padEmpty), (n[e] = o);
          }
          if (p(t.children)) {
            const n = {},
              r = (e) => {
                n[e] = {};
              },
              s = (e) => {
                ks(l, e).each((e) => {
                  q(e, r);
                });
              };
            q(t.children, (e) => {
              _s(e).each(({ preset: e, name: t }) => {
                e ? s(t) : r(t);
              });
            }),
              (o[e] = n);
          }
          d &&
            pe(o, (t, n) => {
              t[d] && ((o[n] = t = As({}, o[n])), (t[e] = t[d]));
            });
        },
        D = (e) => {
          f(e)
            ? pe(e, (e, t) => P(t, e))
            : m(e) &&
              ((e) => {
                q(
                  ((e) => {
                    const t = /^(~)?(.+)$/;
                    return te(vs(e, ","), (e) => {
                      const n = t.exec(e);
                      return n
                        ? [
                            {
                              cloneName: "~" === n[1] ? "span" : "div",
                              name: n[2],
                            },
                          ]
                        : [];
                    });
                  })(null != e ? e : ""),
                  ({ name: e, cloneName: t }) => {
                    P(e, { extends: t });
                  }
                );
              })(e);
        },
        L = (e) => {
          q(
            ((e) => {
              const t =
                /^([+\-]?)([A-Za-z0-9_\-.\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u037f-\u1fff\u200c-\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]+)\[([^\]]+)]$/;
              return te(vs(e, ","), (e) => {
                const n = t.exec(e);
                if (n) {
                  const e = n[1],
                    t = e
                      ? ((e) => ("-" === e ? "remove" : "add"))(e)
                      : "replace";
                  return [
                    {
                      operation: t,
                      name: n[2],
                      validChildren: te(vs(n[3], "|"), (e) => _s(e).toArray()),
                    },
                  ];
                }
                return [];
              });
            })(null != e ? e : ""),
            ({ operation: e, name: t, validChildren: n }) => {
              const r = "replace" === e ? { "#comment": {} } : o[t],
                s = (t) => {
                  "remove" === e ? delete r[t] : (r[t] = {});
                };
              q(n, ({ preset: e, name: t }) => {
                e
                  ? ((e) => {
                      ks(l, e).each((e) => {
                        q(e, s);
                      });
                    })(t)
                  : s(t);
              }),
                (o[t] = r);
            }
          );
        },
        M = (e) => {
          const t = n[e];
          if (t) return t;
          let o = r.length;
          for (; o--; ) {
            const t = r[o];
            if (t.pattern.test(e)) return t;
          }
        },
        F = N(c),
        U = N(u),
        z = N(g),
        j = N(C),
        H = N(S),
        $ = N(_),
        W = N(R),
        K = N(Object.seal(y)),
        Y = N(v),
        G = N(x),
        X = N(E),
        Z = N(h),
        Q = N(A),
        J = N(T),
        ee = N(Object.seal(a)),
        ne = (e, t) => {
          const n = M(e);
          if (n) {
            if (!t) return !0;
            {
              if (n.attributes[t]) return !0;
              const e = n.attributePatterns;
              if (e) {
                let n = e.length;
                for (; n--; ) if (e[n].pattern.test(t)) return !0;
              }
            }
          }
          return !1;
        },
        oe = (e) => ke(H(), e),
        re = (e) => !$e(e, "#") && ne(e) && !oe(e),
        ae = N(s);
      return (
        e.valid_elements
          ? (B(e.valid_elements),
            Rs(d, (e, t) => {
              o[t] = e.children;
            }))
          : (Rs(d, (e, t) => {
              (n[t] = {
                attributes: e.attributes,
                attributesOrder: e.attributesOrder,
              }),
                (o[t] = e.children);
            }),
            Rs(vs("strong/b em/i"), (e) => {
              const t = vs(e, "/");
              n[t[1]].outputName = t[0];
            }),
            Rs(R, (t, o) => {
              n[o] &&
                (e.padd_empty_block_inline_children &&
                  (n[o].paddInEmptyBlock = !0),
                (n[o].removeEmpty = !0));
            }),
            Rs(vs("ol ul blockquote a table tbody"), (e) => {
              n[e] && (n[e].removeEmpty = !0);
            }),
            Rs(
              vs(
                "p h1 h2 h3 h4 h5 h6 th td pre div address caption li summary"
              ),
              (e) => {
                n[e] && (n[e].paddEmpty = !0);
              }
            ),
            Rs(vs("span"), (e) => {
              n[e].removeEmptyAttrs = !0;
            })),
        delete n.svg,
        D(e.custom_elements),
        L(e.valid_children),
        O(e.extended_valid_elements),
        L("+ol[ul|ol],+ul[ul|ol]"),
        Rs(
          {
            dd: "dl",
            dt: "dl",
            li: "ul ol",
            td: "tr",
            th: "tr",
            tr: "tbody thead tfoot",
            tbody: "table",
            thead: "table",
            tfoot: "table",
            legend: "fieldset",
            area: "map",
            param: "video audio object",
          },
          (e, t) => {
            n[t] && (n[t].parentsRequired = vs(e));
          }
        ),
        e.invalid_elements &&
          Rs(Ts(e.invalid_elements), (e) => {
            n[e] && delete n[e];
          }),
        M("span") || O("span[!data-mce-type|*]"),
        {
          type: l,
          children: o,
          elements: n,
          getValidStyles: F,
          getValidClasses: z,
          getBlockElements: H,
          getInvalidStyles: U,
          getVoidElements: K,
          getTextBlockElements: $,
          getTextInlineElements: W,
          getBoolAttrs: j,
          getElementRule: M,
          getSelfClosingElements: Y,
          getNonEmptyElements: G,
          getMoveCaretBeforeOnEnterElements: X,
          getWhitespaceElements: Z,
          getTransparentElements: Q,
          getSpecialElements: ee,
          isValidChild: (e, t) => {
            const n = o[e.toLowerCase()];
            return !(!n || !n[t.toLowerCase()]);
          },
          isValid: ne,
          isBlock: oe,
          isInline: re,
          isWrapper: (e) => ke(J(), e) || re(e),
          getCustomElements: ae,
          addValidElements: O,
          setValidElements: B,
          addCustomElements: D,
          addValidChildren: L,
        }
      );
    },
    Ls = (e) => {
      const t = e.toString(16);
      return (1 === t.length ? "0" + t : t).toUpperCase();
    },
    Ms = (e) =>
      ((e) => {
        return { value: ((t = e), je(t, "#").toUpperCase()) };
        var t;
      })(Ls(e.red) + Ls(e.green) + Ls(e.blue)),
    Is = /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i,
    Fs =
      /^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?(?:\.\d+)?)\s*\)\s*$/i,
    Us = (e, t, n, o) => ({ red: e, green: t, blue: n, alpha: o }),
    zs = (e, t, n, o) => {
      const r = parseInt(e, 10),
        s = parseInt(t, 10),
        a = parseInt(n, 10),
        i = parseFloat(o);
      return Us(r, s, a, i);
    },
    js = (e) => {
      if ("transparent" === e) return I.some(Us(0, 0, 0, 0));
      const t = Is.exec(e);
      if (null !== t) return I.some(zs(t[1], t[2], t[3], "1"));
      const n = Fs.exec(e);
      return null !== n ? I.some(zs(n[1], n[2], n[3], n[4])) : I.none();
    },
    Hs = (e) => `rgba(${e.red},${e.green},${e.blue},${e.alpha})`,
    $s = (e) =>
      js(e)
        .map(Ms)
        .map((e) => "#" + e.value)
        .getOr(e),
    Vs = (e = {}, t) => {
      const n =
          /(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,
        o = /\s*([^:]+):\s*([^;]+);?/g,
        r = /\s+$/,
        s = /rgba *\(/i,
        a = {};
      let i, l;
      const d = qo;
      t && ((i = t.getValidStyles()), (l = t.getInvalidStyles()));
      const c = "\\\" \\' \\; \\: ; : \ufeff".split(" ");
      for (let e = 0; e < c.length; e++) (a[c[e]] = d + e), (a[d + e] = c[e]);
      const u = {
        parse: (t) => {
          const i = {};
          let l = !1;
          const c = e.url_converter,
            m = e.url_converter_scope || u,
            f = (e, t, n) => {
              const o = i[e + "-top" + t];
              if (!o) return;
              const r = i[e + "-right" + t];
              if (!r) return;
              const s = i[e + "-bottom" + t];
              if (!s) return;
              const a = i[e + "-left" + t];
              if (!a) return;
              const l = [o, r, s, a];
              let d = l.length - 1;
              for (; d-- && l[d] === l[d + 1]; );
              (d > -1 && n) ||
                ((i[e + t] = -1 === d ? l[0] : l.join(" ")),
                delete i[e + "-top" + t],
                delete i[e + "-right" + t],
                delete i[e + "-bottom" + t],
                delete i[e + "-left" + t]);
            },
            g = (e) => {
              const t = i[e];
              if (!t) return;
              const n = t.indexOf(",") > -1 ? [t] : t.split(" ");
              let o = n.length;
              for (; o--; ) if (n[o] !== n[0]) return !1;
              return (i[e] = n[0]), !0;
            },
            p = (e) => ((l = !0), a[e]),
            h = (e, t) => (
              l && (e = e.replace(/\uFEFF[0-9]/g, (e) => a[e])),
              t || (e = e.replace(/\\([\'\";:])/g, "$1")),
              e
            ),
            b = (e) => String.fromCharCode(parseInt(e.slice(1), 16)),
            v = (e) => e.replace(/\\[0-9a-f]+/gi, b),
            y = (t, n, o, r, s, a) => {
              if ((s = s || a))
                return "'" + (s = h(s)).replace(/\'/g, "\\'") + "'";
              if (((n = h(n || o || r || "")), !e.allow_script_urls)) {
                const t = n.replace(/[\s\r\n]+/g, "");
                if (/(java|vb)script:/i.test(t)) return "";
                if (!e.allow_svg_data_urls && /^data:image\/svg/i.test(t))
                  return "";
              }
              return (
                c && (n = c.call(m, n, "style")),
                "url('" + n.replace(/\'/g, "\\'") + "')"
              );
            };
          if (t) {
            let a;
            for (
              t = (t = t.replace(/[\u0000-\u001F]/g, ""))
                .replace(/\\[\"\';:\uFEFF]/g, p)
                .replace(/\"[^\"]+\"|\'[^\']+\'/g, (e) =>
                  e.replace(/[;:]/g, p)
                );
              (a = o.exec(t));

            ) {
              o.lastIndex = a.index + a[0].length;
              let t = a[1].replace(r, "").toLowerCase(),
                c = a[2].replace(r, "");
              if (t && c) {
                if (
                  ((t = v(t)),
                  (c = v(c)),
                  -1 !== t.indexOf(d) || -1 !== t.indexOf('"'))
                )
                  continue;
                if (
                  !e.allow_script_urls &&
                  ("behavior" === t || /expression\s*\(|\/\*|\*\//.test(c))
                )
                  continue;
                "font-weight" === t && "700" === c
                  ? (c = "bold")
                  : ("color" !== t && "background-color" !== t) ||
                    (c = c.toLowerCase()),
                  s.test(c) ||
                    js(c).each((e) => {
                      c = $s(Hs(e)).toLowerCase();
                    }),
                  (c = c.replace(n, y)),
                  (i[t] = l ? h(c, !0) : c);
              }
            }
            f("border", "", !0),
              f("border", "-width"),
              f("border", "-color"),
              f("border", "-style"),
              f("padding", ""),
              f("margin", ""),
              "border",
              (w = "border-style"),
              (x = "border-color"),
              g((C = "border-width")) &&
                g(w) &&
                g(x) &&
                ((i.border = i[C] + " " + i[w] + " " + i[x]),
                delete i[C],
                delete i[w],
                delete i[x]),
              "medium none" === i.border && delete i.border,
              "none" === i["border-image"] && delete i["border-image"];
          }
          var C, w, x;
          return i;
        },
        serialize: (e, t) => {
          let n = "";
          const o = (t, o) => {
            const r = o[t];
            if (r)
              for (let t = 0, o = r.length; t < o; t++) {
                const o = r[t],
                  s = e[o];
                s && (n += (n.length > 0 ? " " : "") + o + ": " + s + ";");
              }
          };
          return (
            t && i
              ? (o("*", i), o(t, i))
              : pe(e, (e, o) => {
                  e &&
                    ((e, t) => {
                      if (!l || !t) return !0;
                      let n = l["*"];
                      return !((n && n[e]) || ((n = l[t]), n && n[e]));
                    })(o, t) &&
                    (n += (n.length > 0 ? " " : "") + o + ": " + e + ";");
                }),
            n
          );
        },
      };
      return u;
    },
    qs = {
      keyLocation: !0,
      layerX: !0,
      layerY: !0,
      returnValue: !0,
      webkitMovementX: !0,
      webkitMovementY: !0,
      keyIdentifier: !0,
      mozPressure: !0,
    },
    Ws = (e, t) => {
      const n = null != t ? t : {};
      for (const t in e) ke(qs, t) || (n[t] = e[t]);
      return (
        C(e.composedPath) && (n.composedPath = () => e.composedPath()),
        C(e.getModifierState) &&
          (n.getModifierState = (t) => e.getModifierState(t)),
        C(e.getTargetRanges) && (n.getTargetRanges = () => e.getTargetRanges()),
        n
      );
    },
    Ks = (e, t, n, o) => {
      var r;
      const s = Ws(t, o);
      return (
        (s.type = e),
        y(s.target) &&
          (s.target = null !== (r = s.srcElement) && void 0 !== r ? r : n),
        ((e) =>
          y(e.preventDefault) ||
          ((e) => e instanceof Event || w(e.initEvent))(e))(t) &&
          ((s.preventDefault = () => {
            (s.defaultPrevented = !0),
              (s.isDefaultPrevented = M),
              w(t.preventDefault) && t.preventDefault();
          }),
          (s.stopPropagation = () => {
            (s.cancelBubble = !0),
              (s.isPropagationStopped = M),
              w(t.stopPropagation) && t.stopPropagation();
          }),
          (s.stopImmediatePropagation = () => {
            (s.isImmediatePropagationStopped = M), s.stopPropagation();
          }),
          ((e) => e.isDefaultPrevented === M || e.isDefaultPrevented === L)(
            s
          ) ||
            ((s.isDefaultPrevented = !0 === s.defaultPrevented ? M : L),
            (s.isPropagationStopped = !0 === s.cancelBubble ? M : L),
            (s.isImmediatePropagationStopped = L))),
        s
      );
    },
    Ys = /^(?:mouse|contextmenu)|click/,
    Gs = (e, t, n, o) => {
      e.addEventListener(t, n, o || !1);
    },
    Xs = (e, t, n, o) => {
      e.removeEventListener(t, n, o || !1);
    },
    Zs = (e, t) => {
      const n = Ks(e.type, e, document, t);
      if (((e) => C(e) && Ys.test(e.type))(e) && v(e.pageX) && !v(e.clientX)) {
        const t = n.target.ownerDocument || document,
          o = t.documentElement,
          r = t.body,
          s = n;
        (s.pageX =
          e.clientX +
          ((o && o.scrollLeft) || (r && r.scrollLeft) || 0) -
          ((o && o.clientLeft) || (r && r.clientLeft) || 0)),
          (s.pageY =
            e.clientY +
            ((o && o.scrollTop) || (r && r.scrollTop) || 0) -
            ((o && o.clientTop) || (r && r.clientTop) || 0));
      }
      return n;
    },
    Qs = (e, t, n) => {
      const o = e.document,
        r = { type: "ready" };
      if (n.domLoaded) return void t(r);
      const s = () => {
        Xs(e, "DOMContentLoaded", s),
          Xs(e, "load", s),
          n.domLoaded || ((n.domLoaded = !0), t(r)),
          (e = null);
      };
      "complete" === o.readyState || ("interactive" === o.readyState && o.body)
        ? s()
        : Gs(e, "DOMContentLoaded", s),
        n.domLoaded || Gs(e, "load", s);
    };
  class Js {
    constructor() {
      (this.domLoaded = !1),
        (this.events = {}),
        (this.count = 1),
        (this.expando = "mce-data-" + (+new Date()).toString(32)),
        (this.hasFocusIn = "onfocusin" in document.documentElement),
        (this.count = 1);
    }
    bind(e, t, n, o) {
      const r = this;
      let s;
      const a = window,
        i = (e) => {
          r.executeHandlers(Zs(e || a.event), l);
        };
      if (!e || dr(e) || mr(e)) return n;
      let l;
      e[r.expando]
        ? (l = e[r.expando])
        : ((l = r.count++), (e[r.expando] = l), (r.events[l] = {})),
        (o = o || e);
      const d = t.split(" ");
      let c = d.length;
      for (; c--; ) {
        let t = d[c],
          u = i,
          m = !1,
          f = !1;
        "DOMContentLoaded" === t && (t = "ready"),
          r.domLoaded && "ready" === t && "complete" === e.readyState
            ? n.call(o, Zs({ type: t }))
            : (r.hasFocusIn ||
                ("focusin" !== t && "focusout" !== t) ||
                ((m = !0),
                (f = "focusin" === t ? "focus" : "blur"),
                (u = (e) => {
                  const t = Zs(e || a.event);
                  (t.type = "focus" === t.type ? "focusin" : "focusout"),
                    r.executeHandlers(t, l);
                })),
              (s = r.events[l][t]),
              s
                ? "ready" === t && r.domLoaded
                  ? n(Zs({ type: t }))
                  : s.push({ func: n, scope: o })
                : ((r.events[l][t] = s = [{ func: n, scope: o }]),
                  (s.fakeName = f),
                  (s.capture = m),
                  (s.nativeHandler = u),
                  "ready" === t ? Qs(e, u, r) : Gs(e, f || t, u, m)));
      }
      return (e = s = null), n;
    }
    unbind(e, t, n) {
      if (!e || dr(e) || mr(e)) return this;
      const o = e[this.expando];
      if (o) {
        let r = this.events[o];
        if (t) {
          const o = t.split(" ");
          let s = o.length;
          for (; s--; ) {
            const t = o[s],
              a = r[t];
            if (a) {
              if (n) {
                let e = a.length;
                for (; e--; )
                  if (a[e].func === n) {
                    const n = a.nativeHandler,
                      o = a.fakeName,
                      s = a.capture,
                      i = a.slice(0, e).concat(a.slice(e + 1));
                    (i.nativeHandler = n),
                      (i.fakeName = o),
                      (i.capture = s),
                      (r[t] = i);
                  }
              }
              (n && 0 !== a.length) ||
                (delete r[t],
                Xs(e, a.fakeName || t, a.nativeHandler, a.capture));
            }
          }
        } else
          pe(r, (t, n) => {
            Xs(e, t.fakeName || n, t.nativeHandler, t.capture);
          }),
            (r = {});
        for (const e in r) if (ke(r, e)) return this;
        delete this.events[o];
        try {
          delete e[this.expando];
        } catch (t) {
          e[this.expando] = null;
        }
      }
      return this;
    }
    fire(e, t, n) {
      return this.dispatch(e, t, n);
    }
    dispatch(e, t, n) {
      if (!e || dr(e) || mr(e)) return this;
      const o = Zs({ type: t, target: e }, n);
      do {
        const t = e[this.expando];
        t && this.executeHandlers(o, t),
          (e =
            e.parentNode || e.ownerDocument || e.defaultView || e.parentWindow);
      } while (e && !o.isPropagationStopped());
      return this;
    }
    clean(e) {
      if (!e || dr(e) || mr(e)) return this;
      if (
        (e[this.expando] && this.unbind(e),
        e.getElementsByTagName || (e = e.document),
        e && e.getElementsByTagName)
      ) {
        this.unbind(e);
        const t = e.getElementsByTagName("*");
        let n = t.length;
        for (; n--; ) (e = t[n])[this.expando] && this.unbind(e);
      }
      return this;
    }
    destroy() {
      this.events = {};
    }
    cancel(e) {
      return e && (e.preventDefault(), e.stopImmediatePropagation()), !1;
    }
    executeHandlers(e, t) {
      const n = this.events[t],
        o = n && n[e.type];
      if (o)
        for (let t = 0, n = o.length; t < n; t++) {
          const n = o[t];
          if (
            (n && !1 === n.func.call(n.scope, e) && e.preventDefault(),
            e.isImmediatePropagationStopped())
          )
            return;
        }
    }
  }
  Js.Event = new Js();
  const ea = Dt.each,
    ta = Dt.grep,
    na = "data-mce-style",
    oa = Dt.makeMap(
      "fill-opacity font-weight line-height opacity orphans widows z-index zoom",
      " "
    ),
    ra = (e, t, n) => {
      y(n) || "" === n ? rn(e, t) : Jt(e, t, n);
    },
    sa = (e) => e.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase()),
    aa = (e, t) => {
      let n = 0;
      if (e)
        for (
          let o = e.nodeType, r = e.previousSibling;
          r;
          r = r.previousSibling
        ) {
          const e = r.nodeType;
          (!t || !dr(r) || (e !== o && r.data.length)) && (n++, (o = e));
        }
      return n;
    },
    ia = (e, t) => {
      const n = tn(t, "style"),
        o = e.serialize(e.parse(n), $t(t));
      ra(t, na, o);
    },
    la = (e, t, n) => {
      const o = sa(t);
      y(n) || "" === n
        ? po(e, o)
        : lo(
            e,
            o,
            ((e, t) => (x(e) ? (ke(oa, t) ? e + "" : e + "px") : e))(n, o)
          );
    },
    da = (e, t = {}) => {
      const n = {},
        o = window,
        r = {};
      let s = 0;
      const a = es.forElement(Cn(e), {
          contentCssCors: t.contentCssCors,
          referrerPolicy: t.referrerPolicy,
        }),
        i = [],
        l = t.schema ? t.schema : Ds({}),
        d = Vs(
          {
            url_converter: t.url_converter,
            url_converter_scope: t.url_converter_scope,
          },
          t.schema
        ),
        c = t.ownEvents ? new Js() : Js.Event,
        u = l.getBlockElements(),
        f = (t) => (t && e && m(t) ? e.getElementById(t) : t),
        h = (e) => {
          const t = f(e);
          return C(t) ? Cn(t) : null;
        },
        b = (e, t, n = "") => {
          let o;
          const r = h(e);
          if (C(r) && Kt(r)) {
            const e = G[t];
            o = e && e.get ? e.get(r.dom, t) : tn(r, t);
          }
          return C(o) ? o : n;
        },
        v = (e) => {
          const t = f(e);
          return y(t) ? [] : t.attributes;
        },
        x = (e, n, o) => {
          B(e, (e) => {
            if (er(e)) {
              const r = Cn(e),
                s = "" === o ? null : o,
                a = tn(r, n),
                i = G[n];
              i && i.set ? i.set(r.dom, s, n) : ra(r, n, s),
                a !== s &&
                  t.onSetAttrib &&
                  t.onSetAttrib({ attrElm: r.dom, attrName: n, attrValue: s });
            }
          });
        },
        E = () => t.root_element || e.body,
        _ = (t, n) =>
          ((e, t, n) => {
            let o = 0,
              r = 0;
            const s = e.ownerDocument;
            if (((n = n || e), t)) {
              if (
                n === e &&
                t.getBoundingClientRect &&
                "static" === uo(Cn(e), "position")
              ) {
                const n = t.getBoundingClientRect();
                return (
                  (o =
                    n.left +
                    (s.documentElement.scrollLeft || e.scrollLeft) -
                    s.documentElement.clientLeft),
                  (r =
                    n.top +
                    (s.documentElement.scrollTop || e.scrollTop) -
                    s.documentElement.clientTop),
                  { x: o, y: r }
                );
              }
              let a = t;
              for (; a && a !== n && a.nodeType && !Qr(a, n); ) {
                const e = a;
                (o += e.offsetLeft || 0),
                  (r += e.offsetTop || 0),
                  (a = e.offsetParent);
              }
              for (a = t.parentNode; a && a !== n && a.nodeType && !Qr(a, n); )
                (o -= a.scrollLeft || 0),
                  (r -= a.scrollTop || 0),
                  (a = a.parentNode);
              r += ((e) =>
                Xr.isFirefox() && "table" === $t(e)
                  ? Zr(In(e))
                      .filter((e) => "caption" === $t(e))
                      .bind((e) =>
                        Zr(Mn(e)).map((t) => {
                          const n = t.dom.offsetTop,
                            o = e.dom.offsetTop,
                            r = e.dom.offsetHeight;
                          return n <= o ? -r : 0;
                        })
                      )
                      .getOr(0)
                  : 0)(Cn(t));
            }
            return { x: o, y: r };
          })(e.body, f(t), n),
        S = (e, t, n) => {
          const o = f(e);
          var r;
          if (
            !y(o) &&
            (tr(o) ||
              (er((r = o)) && "http://www.w3.org/2000/svg" === r.namespaceURI))
          )
            return n
              ? uo(Cn(o), sa(t))
              : ("float" ===
                  (t = t.replace(/-(\D)/g, (e, t) => t.toUpperCase())) &&
                  (t = "cssFloat"),
                o.style ? o.style[t] : void 0);
        },
        R = (e) => {
          const t = f(e);
          if (!t) return { w: 0, h: 0 };
          let n = S(t, "width"),
            o = S(t, "height");
          return (
            (n && -1 !== n.indexOf("px")) || (n = "0"),
            (o && -1 !== o.indexOf("px")) || (o = "0"),
            {
              w: parseInt(n, 10) || t.offsetWidth || t.clientWidth,
              h: parseInt(o, 10) || t.offsetHeight || t.clientHeight,
            }
          );
        },
        A = (e, t) => {
          if (!e) return !1;
          const n = p(e) ? e : [e];
          return $(n, (e) => En(Cn(e), t));
        },
        T = (e, t, n, o) => {
          const r = [];
          let s = f(e);
          o = void 0 === o;
          const a = n || ("BODY" !== E().nodeName ? E().parentNode : null);
          if (m(t))
            if ("*" === t) t = er;
            else {
              const e = t;
              t = (t) => A(t, e);
            }
          for (; s && !(s === a || y(s.nodeType) || fr(s) || gr(s)); ) {
            if (!t || t(s)) {
              if (!o) return [s];
              r.push(s);
            }
            s = s.parentNode;
          }
          return o ? r : null;
        },
        O = (e, t, n) => {
          let o = t;
          if (e) {
            m(t) && (o = (e) => A(e, t));
            for (let t = e[n]; t; t = t[n]) if (w(o) && o(t)) return t;
          }
          return null;
        },
        B = function (e, t, n) {
          const o = null != n ? n : this;
          if (p(e)) {
            const n = [];
            return (
              ea(e, (e, r) => {
                const s = f(e);
                s && n.push(t.call(o, s, r));
              }),
              n
            );
          }
          {
            const n = f(e);
            return !!n && t.call(o, n);
          }
        },
        P = (e, t) => {
          B(e, (e) => {
            pe(t, (t, n) => {
              x(e, n, t);
            });
          });
        },
        D = (e, t) => {
          B(e, (e) => {
            const n = Cn(e);
            No(n, t);
          });
        },
        L = (t, n, o, r, s) =>
          B(t, (t) => {
            const a = m(n) ? e.createElement(n) : n;
            return (
              C(o) && P(a, o),
              r && (!m(r) && r.nodeType ? a.appendChild(r) : m(r) && D(a, r)),
              s ? a : t.appendChild(a)
            );
          }),
        M = (t, n, o) => L(e.createElement(t), t, n, o, !0),
        I = bs.encodeAllRaw,
        F = (e, t) =>
          B(e, (e) => {
            const n = Cn(e);
            return (
              t &&
                q(In(n), (e) => {
                  Yt(e) && 0 === e.dom.length ? Eo(e) : ho(n, e);
                }),
              Eo(n),
              n.dom
            );
          }),
        U = (e, t, n) => {
          B(e, (e) => {
            if (er(e)) {
              const o = Cn(e),
                r = t.split(" ");
              q(r, (e) => {
                C(n)
                  ? (n ? mn : gn)(o, e)
                  : ((e, t) => {
                      const n = ln(e)
                        ? e.dom.classList.toggle(t)
                        : ((e, t) => (H(dn(e), t) ? un(e, t) : cn(e, t)))(e, t);
                      fn(e);
                    })(o, e);
              });
            }
          });
        },
        z = (e, t, n) =>
          B(t, (o) => {
            var r;
            const s = p(t) ? e.cloneNode(!0) : e;
            return (
              n &&
                ea(ta(o.childNodes), (e) => {
                  s.appendChild(e);
                }),
              null === (r = o.parentNode) ||
                void 0 === r ||
                r.replaceChild(s, o),
              o
            );
          }),
        j = () => e.createRange(),
        V = (n, r, s, a) => {
          if (p(n)) {
            let e = n.length;
            const t = [];
            for (; e--; ) t[e] = V(n[e], r, s, a);
            return t;
          }
          return (
            !t.collect || (n !== e && n !== o) || i.push([n, r, s, a]),
            c.bind(n, r, s, a || Y)
          );
        },
        W = (t, n, r) => {
          if (p(t)) {
            let e = t.length;
            const o = [];
            for (; e--; ) o[e] = W(t[e], n, r);
            return o;
          }
          if (i.length > 0 && (t === e || t === o)) {
            let e = i.length;
            for (; e--; ) {
              const [o, s, a] = i[e];
              t !== o || (n && n !== s) || (r && r !== a) || c.unbind(o, s, a);
            }
          }
          return c.unbind(t, n, r);
        },
        K = (e) => {
          if (e && tr(e)) {
            const t = e.getAttribute("data-mce-contenteditable");
            return t && "inherit" !== t
              ? t
              : "inherit" !== e.contentEditable
              ? e.contentEditable
              : null;
          }
          return null;
        },
        Y = {
          doc: e,
          settings: t,
          win: o,
          files: r,
          stdMode: !0,
          boxModel: !0,
          styleSheetLoader: a,
          boundEvents: i,
          styles: d,
          schema: l,
          events: c,
          isBlock: (e) =>
            m(e) ? ke(u, e) : er(e) && (ke(u, e.nodeName) || Kr(l, e)),
          root: null,
          clone: (e, t) => e.cloneNode(t),
          getRoot: E,
          getViewPort: (e) => {
            const t = Fo(e);
            return { x: t.x, y: t.y, w: t.width, h: t.height };
          },
          getRect: (e) => {
            const t = f(e),
              n = _(t),
              o = R(t);
            return { x: n.x, y: n.y, w: o.w, h: o.h };
          },
          getSize: R,
          getParent: (e, t, n) => {
            const o = T(e, t, n, !1);
            return o && o.length > 0 ? o[0] : null;
          },
          getParents: T,
          get: f,
          getNext: (e, t) => O(e, t, "nextSibling"),
          getPrev: (e, t) => O(e, t, "previousSibling"),
          select: (n, o) => {
            var r, s;
            const a =
              null !==
                (s =
                  null !== (r = f(o)) && void 0 !== r ? r : t.root_element) &&
              void 0 !== s
                ? s
                : e;
            return w(a.querySelectorAll) ? ce(a.querySelectorAll(n)) : [];
          },
          is: A,
          add: L,
          create: M,
          createHTML: (e, t, n = "") => {
            let o = "<" + e;
            for (const e in t)
              _e(t, e) && (o += " " + e + '="' + I(t[e]) + '"');
            return Xe(n) && ke(l.getVoidElements(), e)
              ? o + " />"
              : o + ">" + n + "</" + e + ">";
          },
          createFragment: (t) => {
            const n = e.createElement("div"),
              o = e.createDocumentFragment();
            let r;
            for (o.appendChild(n), t && (n.innerHTML = t); (r = n.firstChild); )
              o.appendChild(r);
            return o.removeChild(n), o;
          },
          remove: F,
          setStyle: (e, n, o) => {
            B(e, (e) => {
              const r = Cn(e);
              la(r, n, o), t.update_styles && ia(d, r);
            });
          },
          getStyle: S,
          setStyles: (e, n) => {
            B(e, (e) => {
              const o = Cn(e);
              pe(n, (e, t) => {
                la(o, t, e);
              }),
                t.update_styles && ia(d, o);
            });
          },
          removeAllAttribs: (e) =>
            B(e, (e) => {
              const t = e.attributes;
              for (let n = t.length - 1; n >= 0; n--)
                e.removeAttributeNode(t.item(n));
            }),
          setAttrib: x,
          setAttribs: P,
          getAttrib: b,
          getPos: _,
          parseStyle: (e) => d.parse(e),
          serializeStyle: (e, t) => d.serialize(e, t),
          addStyle: (t) => {
            if (Y !== da.DOM && e === document) {
              if (n[t]) return;
              n[t] = !0;
            }
            let o = e.getElementById("mceDefaultStyles");
            if (!o) {
              (o = e.createElement("style")),
                (o.id = "mceDefaultStyles"),
                (o.type = "text/css");
              const t = e.head;
              t.firstChild ? t.insertBefore(o, t.firstChild) : t.appendChild(o);
            }
            o.styleSheet
              ? (o.styleSheet.cssText += t)
              : o.appendChild(e.createTextNode(t));
          },
          loadCSS: (e) => {
            e || (e = ""),
              q(e.split(","), (e) => {
                (r[e] = !0), a.load(e).catch(k);
              });
          },
          addClass: (e, t) => {
            U(e, t, !0);
          },
          removeClass: (e, t) => {
            U(e, t, !1);
          },
          hasClass: (e, t) => {
            const n = h(e),
              o = t.split(" ");
            return C(n) && ne(o, (e) => pn(n, e));
          },
          toggleClass: U,
          show: (e) => {
            B(e, (e) => po(Cn(e), "display"));
          },
          hide: (e) => {
            B(e, (e) => lo(Cn(e), "display", "none"));
          },
          isHidden: (e) => {
            const t = h(e);
            return C(t) && Lt(fo(t, "display"), "none");
          },
          uniqueId: (e) => (e || "mce_") + s++,
          setHTML: D,
          getOuterHTML: (e) => {
            const t = h(e);
            return C(t)
              ? er(t.dom)
                ? t.dom.outerHTML
                : ((e) => {
                    const t = vn("div"),
                      n = Cn(e.dom.cloneNode(!0));
                    return yo(t, n), So(t);
                  })(t)
              : "";
          },
          setOuterHTML: (e, t) => {
            B(e, (e) => {
              er(e) && (e.outerHTML = t);
            });
          },
          decode: bs.decode,
          encode: I,
          insertAfter: (e, t) => {
            const n = f(t);
            return B(e, (e) => {
              const t = null == n ? void 0 : n.parentNode,
                o = null == n ? void 0 : n.nextSibling;
              return t && (o ? t.insertBefore(e, o) : t.appendChild(e)), e;
            });
          },
          replace: z,
          rename: (e, t) => {
            if (e.nodeName !== t.toUpperCase()) {
              const n = M(t);
              return (
                ea(v(e), (t) => {
                  x(n, t.nodeName, b(e, t.nodeName));
                }),
                z(n, e, !0),
                n
              );
            }
            return e;
          },
          findCommonAncestor: (e, t) => {
            let n = e;
            for (; n; ) {
              let e = t;
              for (; e && n !== e; ) e = e.parentNode;
              if (n === e) break;
              n = n.parentNode;
            }
            return !n && e.ownerDocument ? e.ownerDocument.documentElement : n;
          },
          run: B,
          getAttribs: v,
          isEmpty: (e, t, n) => {
            if (g(t)) {
              const o = (e) => {
                const n = e.nodeName.toLowerCase();
                return Boolean(t[n]);
              };
              return Ar(l, e, { ...n, isContent: o });
            }
            return Ar(l, e, n);
          },
          createRng: j,
          nodeIndex: aa,
          split: (e, t, n) => {
            let o,
              r,
              s = j();
            if (e && t && e.parentNode && t.parentNode) {
              const a = e.parentNode;
              return (
                s.setStart(a, aa(e)),
                s.setEnd(t.parentNode, aa(t)),
                (o = s.extractContents()),
                (s = j()),
                s.setStart(t.parentNode, aa(t) + 1),
                s.setEnd(a, aa(e) + 1),
                (r = s.extractContents()),
                a.insertBefore(os(Y, o, l), e),
                n ? a.insertBefore(n, e) : a.insertBefore(t, e),
                a.insertBefore(os(Y, r, l), e),
                F(e),
                n || t
              );
            }
          },
          bind: V,
          unbind: W,
          fire: (e, t, n) => c.dispatch(e, t, n),
          dispatch: (e, t, n) => c.dispatch(e, t, n),
          getContentEditable: K,
          getContentEditableParent: (e) => {
            const t = E();
            let n = null;
            for (
              let o = e;
              o && o !== t && ((n = K(o)), null === n);
              o = o.parentNode
            );
            return n;
          },
          isEditable: (e) => {
            if (C(e)) {
              const t = er(e) ? e : e.parentElement;
              return C(t) && tr(t) && ro(Cn(t));
            }
            return !1;
          },
          destroy: () => {
            if (i.length > 0) {
              let e = i.length;
              for (; e--; ) {
                const [t, n, o] = i[e];
                c.unbind(t, n, o);
              }
            }
            pe(r, (e, t) => {
              a.unload(t), delete r[t];
            });
          },
          isChildOf: (e, t) => e === t || t.contains(e),
          dumpRng: (e) =>
            "startContainer: " +
            e.startContainer.nodeName +
            ", startOffset: " +
            e.startOffset +
            ", endContainer: " +
            e.endContainer.nodeName +
            ", endOffset: " +
            e.endOffset,
        },
        G = ((e, t, n) => {
          const o = t.keep_values,
            r = {
              set: (e, o, r) => {
                const s = Cn(e);
                w(t.url_converter) &&
                  C(o) &&
                  (o = t.url_converter.call(
                    t.url_converter_scope || n(),
                    String(o),
                    r,
                    e
                  )),
                  ra(s, "data-mce-" + r, o),
                  ra(s, r, o);
              },
              get: (e, t) => {
                const n = Cn(e);
                return tn(n, "data-mce-" + t) || tn(n, t);
              },
            },
            s = {
              style: {
                set: (t, n) => {
                  const r = Cn(t);
                  o && ra(r, na, n), rn(r, "style"), m(n) && co(r, e.parse(n));
                },
                get: (t) => {
                  const n = Cn(t),
                    o = tn(n, na) || tn(n, "style");
                  return e.serialize(e.parse(o), $t(n));
                },
              },
            };
          return o && (s.href = s.src = r), s;
        })(d, t, N(Y));
      return Y;
    };
  (da.DOM = da(document)), (da.nodeIndex = aa);
  const ca = da.DOM;
  class ua {
    constructor(e = {}) {
      (this.states = {}),
        (this.queue = []),
        (this.scriptLoadedCallbacks = {}),
        (this.queueLoadedCallbacks = []),
        (this.loading = !1),
        (this.settings = e);
    }
    _setReferrerPolicy(e) {
      this.settings.referrerPolicy = e;
    }
    loadScript(e) {
      return new Promise((t, n) => {
        const o = ca;
        let r;
        const s = () => {
            o.remove(a), r && (r.onerror = r.onload = r = null);
          },
          a = o.uniqueId();
        (r = document.createElement("script")),
          (r.id = a),
          (r.type = "text/javascript"),
          (r.src = Dt._addCacheSuffix(e)),
          this.settings.referrerPolicy &&
            o.setAttrib(r, "referrerpolicy", this.settings.referrerPolicy),
          (r.onload = () => {
            s(), t();
          }),
          (r.onerror = () => {
            s(), n("Failed to load script: " + e);
          }),
          (
            document.getElementsByTagName("head")[0] || document.body
          ).appendChild(r);
      });
    }
    isDone(e) {
      return 2 === this.states[e];
    }
    markDone(e) {
      this.states[e] = 2;
    }
    add(e) {
      const t = this;
      return (
        t.queue.push(e),
        void 0 === t.states[e] && (t.states[e] = 0),
        new Promise((n, o) => {
          t.scriptLoadedCallbacks[e] || (t.scriptLoadedCallbacks[e] = []),
            t.scriptLoadedCallbacks[e].push({ resolve: n, reject: o });
        })
      );
    }
    load(e) {
      return this.add(e);
    }
    remove(e) {
      delete this.states[e], delete this.scriptLoadedCallbacks[e];
    }
    loadQueue() {
      const e = this.queue;
      return (this.queue = []), this.loadScripts(e);
    }
    loadScripts(e) {
      const t = this,
        n = (e, n) => {
          Ee(t.scriptLoadedCallbacks, n).each((t) => {
            q(t, (t) => t[e](n));
          }),
            delete t.scriptLoadedCallbacks[n];
        },
        o = (e) => {
          const t = Y(e, (e) => "rejected" === e.status);
          return t.length > 0
            ? Promise.reject(te(t, ({ reason: e }) => (p(e) ? e : [e])))
            : Promise.resolve();
        },
        r = (e) =>
          Promise.allSettled(
            V(e, (e) =>
              2 === t.states[e]
                ? (n("resolve", e), Promise.resolve())
                : 3 === t.states[e]
                ? (n("reject", e), Promise.reject(e))
                : ((t.states[e] = 1),
                  t.loadScript(e).then(
                    () => {
                      (t.states[e] = 2), n("resolve", e);
                      const s = t.queue;
                      return s.length > 0
                        ? ((t.queue = []), r(s).then(o))
                        : Promise.resolve();
                    },
                    () => ((t.states[e] = 3), n("reject", e), Promise.reject(e))
                  ))
            )
          ),
        s = (e) => (
          (t.loading = !0),
          r(e).then((e) => {
            t.loading = !1;
            const n = t.queueLoadedCallbacks.shift();
            return I.from(n).each(D), o(e);
          })
        ),
        a = Se(e);
      return t.loading
        ? new Promise((e, n) => {
            t.queueLoadedCallbacks.push(() => {
              s(a).then(e, n);
            });
          })
        : s(a);
    }
  }
  ua.ScriptLoader = new ua();
  const ma = (e) => {
      let t = e;
      return {
        get: () => t,
        set: (e) => {
          t = e;
        },
      };
    },
    fa = {},
    ga = ma("en"),
    pa = () => Ee(fa, ga.get()),
    ha = {
      getData: () => he(fa, (e) => ({ ...e })),
      setCode: (e) => {
        e && ga.set(e);
      },
      getCode: () => ga.get(),
      add: (e, t) => {
        let n = fa[e];
        n || (fa[e] = n = {});
        const o = V(fe(t), (e) => e.toLowerCase());
        pe(t, (e, r) => {
          const s = r.toLowerCase();
          s !== r &&
          ((e, t) => {
            const n = e.indexOf(t);
            return -1 !== n && e.indexOf(t, n + 1) > n;
          })(o, s)
            ? (ke(t, s) || (n[s] = e), (n[r] = e))
            : (n[s] = e);
        });
      },
      translate: (e) => {
        const t = pa().getOr({}),
          n = (e) =>
            w(e) ? Object.prototype.toString.call(e) : o(e) ? "" : "" + e,
          o = (e) => "" === e || null == e,
          r = (e) => {
            const o = n(e);
            return ke(t, o) ? n(t[o]) : Ee(t, o.toLowerCase()).map(n).getOr(o);
          },
          s = (e) => e.replace(/{context:\w+}$/, "");
        if (o(e)) return "";
        if (f((a = e)) && ke(a, "raw")) return n(e.raw);
        var a;
        if (((e) => p(e) && e.length > 1)(e)) {
          const t = e.slice(1);
          return s(
            r(e[0]).replace(/\{([0-9]+)\}/g, (e, o) => (ke(t, o) ? n(t[o]) : e))
          );
        }
        return s(r(e));
      },
      isRtl: () =>
        pa()
          .bind((e) => Ee(e, "_dir"))
          .exists((e) => "rtl" === e),
      hasCode: (e) => ke(fa, e),
    },
    ba = () => {
      const e = [],
        t = {},
        n = {},
        o = [],
        r = (e, t) => {
          const n = Y(o, (n) => n.name === e && n.state === t);
          q(n, (e) => e.resolve());
        },
        s = (e) => ke(t, e),
        a = (e, n) => {
          const o = ha.getCode();
          !o ||
            (n && -1 === ("," + (n || "") + ",").indexOf("," + o + ",")) ||
            ua.ScriptLoader.add(t[e] + "/langs/" + o + ".js");
        },
        i = (e, t = "added") =>
          ("added" === t && ((e) => ke(n, e))(e)) || ("loaded" === t && s(e))
            ? Promise.resolve()
            : new Promise((n) => {
                o.push({ name: e, state: t, resolve: n });
              });
      return {
        items: e,
        urls: t,
        lookup: n,
        get: (e) => {
          if (n[e]) return n[e].instance;
        },
        requireLangPack: (e, t) => {
          !1 !== ba.languageLoad &&
            (s(e) ? a(e, t) : i(e, "loaded").then(() => a(e, t)));
        },
        add: (t, o) => (e.push(o), (n[t] = { instance: o }), r(t, "added"), o),
        remove: (e) => {
          delete t[e], delete n[e];
        },
        createUrl: (e, t) =>
          m(t)
            ? m(e)
              ? { prefix: "", resource: t, suffix: "" }
              : { prefix: e.prefix, resource: t, suffix: e.suffix }
            : t,
        load: (e, o) => {
          if (t[e]) return Promise.resolve();
          let s = m(o) ? o : o.prefix + o.resource + o.suffix;
          0 !== s.indexOf("/") &&
            -1 === s.indexOf("://") &&
            (s = ba.baseURL + "/" + s),
            (t[e] = s.substring(0, s.lastIndexOf("/")));
          const a = () => (r(e, "loaded"), Promise.resolve());
          return n[e] ? a() : ua.ScriptLoader.add(s).then(a);
        },
        waitFor: i,
      };
    };
  (ba.languageLoad = !0),
    (ba.baseURL = ""),
    (ba.PluginManager = ba()),
    (ba.ThemeManager = ba()),
    (ba.ModelManager = ba());
  const va = (e) => {
      const t = ma(I.none()),
        n = () => t.get().each((e) => clearInterval(e));
      return {
        clear: () => {
          n(), t.set(I.none());
        },
        isSet: () => t.get().isSome(),
        get: () => t.get(),
        set: (o) => {
          n(), t.set(I.some(setInterval(o, e)));
        },
      };
    },
    ya = () => {
      const e = ((e) => {
        const t = ma(I.none()),
          n = () => t.get().each(e);
        return {
          clear: () => {
            n(), t.set(I.none());
          },
          isSet: () => t.get().isSome(),
          get: () => t.get(),
          set: (e) => {
            n(), t.set(I.some(e));
          },
        };
      })(k);
      return { ...e, on: (t) => e.get().each(t) };
    },
    Ca = (e, t) => {
      let n = null;
      return {
        cancel: () => {
          h(n) || (clearTimeout(n), (n = null));
        },
        throttle: (...o) => {
          h(n) &&
            (n = setTimeout(() => {
              (n = null), e.apply(null, o);
            }, t));
        },
      };
    },
    wa = (e, t) => {
      let n = null;
      const o = () => {
        h(n) || (clearTimeout(n), (n = null));
      };
      return {
        cancel: o,
        throttle: (...r) => {
          o(),
            (n = setTimeout(() => {
              (n = null), e.apply(null, r);
            }, t));
        },
      };
    },
    xa = N("mce-annotation"),
    Ea = N("data-mce-annotation"),
    ka = N("data-mce-annotation-uid"),
    _a = N("data-mce-annotation-active"),
    Sa = N("data-mce-annotation-classes"),
    Na = N("data-mce-annotation-attrs"),
    Ra = (e) => (t) => _n(t, e),
    Aa = (e, t) => {
      const n = e.selection.getRng(),
        o = Cn(n.startContainer),
        r = Cn(e.getBody()),
        s = t.fold(
          () => "." + xa(),
          (e) => `[${Ea()}="${e}"]`
        ),
        a = Fn(o, n.startOffset).getOr(o);
      return oo(a, s, Ra(r)).bind((t) =>
        nn(t, `${ka()}`).bind((n) =>
          nn(t, `${Ea()}`).map((t) => {
            const o = Oa(e, n);
            return { uid: n, name: t, elements: o };
          })
        )
      );
    },
    Ta = (e, t) =>
      on(e, "data-mce-bogus") ||
      ((e, t, n) => to(e, '[data-mce-bogus="all"]', n).isSome())(e, 0, Ra(t)),
    Oa = (e, t) => {
      const n = Cn(e.getBody()),
        o = zo(n, `[${ka()}="${t}"]`);
      return Y(o, (e) => !Ta(e, n));
    },
    Ba = (e, t) => {
      const n = Cn(e.getBody()),
        o = zo(n, `[${Ea()}="${t}"]`),
        r = {};
      return (
        q(o, (e) => {
          if (!Ta(e, n)) {
            const t = tn(e, ka()),
              n = Ee(r, t).getOr([]);
            r[t] = n.concat([e]);
          }
        }),
        r
      );
    };
  let Pa = 0;
  const Da = (e) => {
      const t = new Date().getTime(),
        n = Math.floor(1e9 * Math.random());
      return Pa++, e + "_" + n + Pa + String(t);
    },
    La = (e, t) => Cn(e.dom.cloneNode(t)),
    Ma = (e) => La(e, !1),
    Ia = (e) => La(e, !0),
    Fa = (e, t, n = L) => {
      const o = new Vo(e, t),
        r = (e) => {
          let t;
          do {
            t = o[e]();
          } while (t && !dr(t) && !n(t));
          return I.from(t).filter(dr);
        };
      return {
        current: () => I.from(o.current()).filter(dr),
        next: () => r("next"),
        prev: () => r("prev"),
        prev2: () => r("prev2"),
      };
    },
    Ua = (e, t) => {
      const n = t || ((t) => e.isBlock(t) || pr(t) || vr(t)),
        o = (e, t, n, r) => {
          if (dr(e)) {
            const n = r(e, t, e.data);
            if (-1 !== n) return I.some({ container: e, offset: n });
          }
          return n().bind((e) => o(e.container, e.offset, n, r));
        };
      return {
        backwards: (t, r, s, a) => {
          const i = Fa(t, null != a ? a : e.getRoot(), n);
          return o(
            t,
            r,
            () => i.prev().map((e) => ({ container: e, offset: e.length })),
            s
          ).getOrNull();
        },
        forwards: (t, r, s, a) => {
          const i = Fa(t, null != a ? a : e.getRoot(), n);
          return o(
            t,
            r,
            () => i.next().map((e) => ({ container: e, offset: 0 })),
            s
          ).getOrNull();
        },
      };
    },
    za = ((e, t) => {
      const n = (t) => (e(t) ? I.from(t.dom.nodeValue) : I.none());
      return {
        get: (t) => {
          if (!e(t)) throw new Error("Can only get text value of a text node");
          return n(t).getOr("");
        },
        getOption: n,
        set: (t, n) => {
          if (!e(t))
            throw new Error("Can only set raw text value of a text node");
          t.dom.nodeValue = n;
        },
      };
    })(Yt),
    ja = (e) => za.get(e),
    Ha = (e) => {
      let t;
      return (n) => ((t = t || se(e, M)), ke(t, $t(n)));
    },
    $a = (e) => Kt(e) && "br" === $t(e),
    Va = Ha([
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "div",
      "address",
      "pre",
      "form",
      "blockquote",
      "center",
      "dir",
      "fieldset",
      "header",
      "footer",
      "article",
      "section",
      "hgroup",
      "aside",
      "nav",
      "figure",
    ]),
    qa = Ha(["ul", "ol", "dl"]),
    Wa = Ha(["li", "dd", "dt"]),
    Ka = Ha(["thead", "tbody", "tfoot"]),
    Ya = Ha(["td", "th"]),
    Ga = Ha(["pre", "script", "textarea", "style"]),
    Xa = () => {
      const e = vn("br");
      return Jt(e, "data-mce-bogus", "1"), e;
    },
    Za = (e) => {
      xo(e), yo(e, Xa());
    },
    Qa = qo,
    Ja = Ko,
    ei = (e) => e.replace(/\uFEFF/g, ""),
    ti = er,
    ni = dr,
    oi = (e) => (
      ni(e) && (e = e.parentNode), ti(e) && e.hasAttribute("data-mce-caret")
    ),
    ri = (e) => ni(e) && Ja(e.data),
    si = (e) => oi(e) || ri(e),
    ai = (e) => e.firstChild !== e.lastChild || !pr(e.firstChild),
    ii = (e) => {
      const t = e.container();
      return (
        !!dr(t) &&
        (t.data.charAt(e.offset()) === Qa ||
          (e.isAtStart() && ri(t.previousSibling)))
      );
    },
    li = (e) => {
      const t = e.container();
      return (
        !!dr(t) &&
        (t.data.charAt(e.offset() - 1) === Qa ||
          (e.isAtEnd() && ri(t.nextSibling)))
      );
    },
    di = (e) => ni(e) && e.data[0] === Qa,
    ci = (e) => ni(e) && e.data[e.data.length - 1] === Qa,
    ui = (e) =>
      e && e.hasAttribute("data-mce-caret")
        ? (((e) => {
            var t;
            const n = e.getElementsByTagName("br"),
              o = n[n.length - 1];
            sr(o) &&
              (null === (t = o.parentNode) || void 0 === t || t.removeChild(o));
          })(e),
          e.removeAttribute("data-mce-caret"),
          e.removeAttribute("data-mce-bogus"),
          e.removeAttribute("style"),
          e.removeAttribute("data-mce-style"),
          e.removeAttribute("_moz_abspos"),
          e)
        : null,
    mi = (e) => oi(e.startContainer),
    fi = Math.round,
    gi = (e) =>
      e
        ? {
            left: fi(e.left),
            top: fi(e.top),
            bottom: fi(e.bottom),
            right: fi(e.right),
            width: fi(e.width),
            height: fi(e.height),
          }
        : { left: 0, top: 0, bottom: 0, right: 0, width: 0, height: 0 },
    pi = (e, t) => (
      (e = gi(e)),
      t || (e.left = e.left + e.width),
      (e.right = e.left),
      (e.width = 0),
      e
    ),
    hi = (e, t, n) => e >= 0 && e <= Math.min(t.height, n.height) / 2,
    bi = (e, t) => {
      const n = Math.min(t.height / 2, e.height / 2);
      return (
        e.bottom - n < t.top ||
        (!(e.top > t.bottom) && hi(t.top - e.bottom, e, t))
      );
    },
    vi = (e, t) =>
      e.top > t.bottom || (!(e.bottom < t.top) && hi(t.bottom - e.top, e, t)),
    yi = (e, t, n) => {
      const o = Math.max(Math.min(t, e.left + e.width), e.left),
        r = Math.max(Math.min(n, e.top + e.height), e.top);
      return Math.sqrt((t - o) * (t - o) + (n - r) * (n - r));
    },
    Ci = (e) => {
      const t = e.startContainer,
        n = e.startOffset;
      return t === e.endContainer && t.hasChildNodes() && e.endOffset === n + 1
        ? t.childNodes[n]
        : null;
    },
    wi = (e, t) => {
      if (er(e) && e.hasChildNodes()) {
        const n = e.childNodes,
          o = ((e, t, n) => Math.min(Math.max(e, 0), n))(t, 0, n.length - 1);
        return n[o];
      }
      return e;
    },
    xi = new RegExp(
      "[\u0300-\u036f\u0483-\u0487\u0488-\u0489\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962-\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2-\u09e3\u0a01-\u0a02\u0a3c\u0a41-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a82\u0abc\u0ac1-\u0ac5\u0ac7-\u0ac8\u0acd\u0ae2-\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62-\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c00\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c81\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d01\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62-\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039-\u103a\u103d-\u103e\u1058-\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17b5\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193b\u1a17-\u1a18\u1a1b\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1ab0-\u1abd\u1abe\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80-\u1b81\u1ba2-\u1ba5\u1ba8-\u1ba9\u1bab-\u1bad\u1be6\u1be8-\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1cf4\u1cf8-\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u200c-\u200d\u20d0-\u20dc\u20dd-\u20e0\u20e1\u20e2-\u20e4\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302d\u302e-\u302f\u3099-\u309a\ua66f\ua670-\ua672\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua825-\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\ua9e5\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uaaf6\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\uff9e-\uff9f]"
    ),
    Ei = (e) => m(e) && e.charCodeAt(0) >= 768 && xi.test(e),
    ki = br,
    _i = vr,
    Si = pr,
    Ni = dr,
    Ri = or(["script", "style", "textarea"]),
    Ai = or([
      "img",
      "input",
      "textarea",
      "hr",
      "iframe",
      "video",
      "audio",
      "object",
      "embed",
    ]),
    Ti = or(["table"]),
    Oi = si,
    Bi = (e) =>
      !Oi(e) && (Ni(e) ? !Ri(e.parentNode) : Ai(e) || Si(e) || Ti(e) || Pi(e)),
    Pi = (e) =>
      !((e) => er(e) && "true" === e.getAttribute("unselectable"))(e) && _i(e),
    Di = (e, t) =>
      Bi(e) &&
      ((e, t) => {
        for (let n = e.parentNode; n && n !== t; n = n.parentNode) {
          if (Pi(n)) return !1;
          if (ki(n)) return !0;
        }
        return !0;
      })(e, t),
    Li = er,
    Mi = Bi,
    Ii = rr("display", "block table"),
    Fi = rr("float", "left right"),
    Ui = (
      (...e) =>
      (t) => {
        for (let n = 0; n < e.length; n++) if (!e[n](t)) return !1;
        return !0;
      }
    )(Li, Mi, O(Fi)),
    zi = O(rr("white-space", "pre pre-line pre-wrap")),
    ji = dr,
    Hi = pr,
    $i = da.nodeIndex,
    Vi = (e, t) => (t < 0 && er(e) && e.hasChildNodes() ? void 0 : wi(e, t)),
    qi = (e) => (e ? e.createRange() : da.DOM.createRng()),
    Wi = (e) => m(e) && /[\r\n\t ]/.test(e),
    Ki = (e) => !!e.setStart && !!e.setEnd,
    Yi = (e) => {
      const t = e.startContainer,
        n = e.startOffset;
      if (Wi(e.toString()) && zi(t.parentNode) && dr(t)) {
        const e = t.data;
        if (Wi(e[n - 1]) || Wi(e[n + 1])) return !0;
      }
      return !1;
    },
    Gi = (e) => 0 === e.left && 0 === e.right && 0 === e.top && 0 === e.bottom,
    Xi = (e) => {
      var t;
      let n;
      const o = e.getClientRects();
      return (
        (n = o.length > 0 ? gi(o[0]) : gi(e.getBoundingClientRect())),
        !Ki(e) && Hi(e) && Gi(n)
          ? ((e) => {
              const t = e.ownerDocument,
                n = qi(t),
                o = t.createTextNode(Wo),
                r = e.parentNode;
              r.insertBefore(o, e), n.setStart(o, 0), n.setEnd(o, 1);
              const s = gi(n.getBoundingClientRect());
              return r.removeChild(o), s;
            })(e)
          : Gi(n) &&
            Ki(e) &&
            null !==
              (t = ((e) => {
                const t = e.startContainer,
                  n = e.endContainer,
                  o = e.startOffset,
                  r = e.endOffset;
                if (t === n && dr(n) && 0 === o && 1 === r) {
                  const t = e.cloneRange();
                  return t.setEndAfter(n), Xi(t);
                }
                return null;
              })(e)) &&
            void 0 !== t
          ? t
          : n
      );
    },
    Zi = (e, t) => {
      const n = pi(e, t);
      return (n.width = 1), (n.right = n.left + 1), n;
    },
    Qi = (e, t, n) => {
      const o = () => (
        n ||
          (n = ((e) => {
            const t = [],
              n = (e) => {
                var n, o;
                0 !== e.height &&
                  ((t.length > 0 &&
                    ((n = e),
                    (o = t[t.length - 1]),
                    n.left === o.left &&
                      n.top === o.top &&
                      n.bottom === o.bottom &&
                      n.right === o.right)) ||
                    t.push(e));
              },
              o = (e, t) => {
                const o = qi(e.ownerDocument);
                if (t < e.data.length) {
                  if (Ei(e.data[t])) return;
                  if (
                    Ei(e.data[t - 1]) &&
                    (o.setStart(e, t), o.setEnd(e, t + 1), !Yi(o))
                  )
                    return void n(Zi(Xi(o), !1));
                }
                t > 0 &&
                  (o.setStart(e, t - 1),
                  o.setEnd(e, t),
                  Yi(o) || n(Zi(Xi(o), !1))),
                  t < e.data.length &&
                    (o.setStart(e, t),
                    o.setEnd(e, t + 1),
                    Yi(o) || n(Zi(Xi(o), !0)));
              },
              r = e.container(),
              s = e.offset();
            if (ji(r)) return o(r, s), t;
            if (Li(r))
              if (e.isAtEnd()) {
                const e = Vi(r, s);
                ji(e) && o(e, e.data.length),
                  Ui(e) && !Hi(e) && n(Zi(Xi(e), !1));
              } else {
                const a = Vi(r, s);
                if ((ji(a) && o(a, 0), Ui(a) && e.isAtEnd()))
                  return n(Zi(Xi(a), !1)), t;
                const i = Vi(e.container(), e.offset() - 1);
                Ui(i) &&
                  !Hi(i) &&
                  (Ii(i) || Ii(a) || !Ui(a)) &&
                  n(Zi(Xi(i), !1)),
                  Ui(a) && n(Zi(Xi(a), !0));
              }
            return t;
          })(Qi(e, t))),
        n
      );
      return {
        container: N(e),
        offset: N(t),
        toRange: () => {
          const n = qi(e.ownerDocument);
          return n.setStart(e, t), n.setEnd(e, t), n;
        },
        getClientRects: o,
        isVisible: () => o().length > 0,
        isAtStart: () => (ji(e), 0 === t),
        isAtEnd: () => (ji(e) ? t >= e.data.length : t >= e.childNodes.length),
        isEqual: (n) => n && e === n.container() && t === n.offset(),
        getNode: (n) => Vi(e, n ? t - 1 : t),
      };
    };
  (Qi.fromRangeStart = (e) => Qi(e.startContainer, e.startOffset)),
    (Qi.fromRangeEnd = (e) => Qi(e.endContainer, e.endOffset)),
    (Qi.after = (e) => Qi(e.parentNode, $i(e) + 1)),
    (Qi.before = (e) => Qi(e.parentNode, $i(e))),
    (Qi.isAbove = (e, t) =>
      It(le(t.getClientRects()), de(e.getClientRects()), bi).getOr(!1)),
    (Qi.isBelow = (e, t) =>
      It(de(t.getClientRects()), le(e.getClientRects()), vi).getOr(!1)),
    (Qi.isAtStart = (e) => !!e && e.isAtStart()),
    (Qi.isAtEnd = (e) => !!e && e.isAtEnd()),
    (Qi.isTextPosition = (e) => !!e && dr(e.container())),
    (Qi.isElementPosition = (e) => !Qi.isTextPosition(e));
  const Ji = (e, t) => {
      dr(t) && 0 === t.data.length && e.remove(t);
    },
    el = (e, t, n) => {
      gr(n)
        ? ((e, t, n) => {
            const o = I.from(n.firstChild),
              r = I.from(n.lastChild);
            t.insertNode(n),
              o.each((t) => Ji(e, t.previousSibling)),
              r.each((t) => Ji(e, t.nextSibling));
          })(e, t, n)
        : ((e, t, n) => {
            t.insertNode(n), Ji(e, n.previousSibling), Ji(e, n.nextSibling);
          })(e, t, n);
    },
    tl = dr,
    nl = sr,
    ol = da.nodeIndex,
    rl = (e) => {
      const t = e.parentNode;
      return nl(t) ? rl(t) : t;
    },
    sl = (e) =>
      e
        ? Be(
            e.childNodes,
            (e, t) => (
              nl(t) && "BR" !== t.nodeName ? (e = e.concat(sl(t))) : e.push(t),
              e
            ),
            []
          )
        : [],
    al = (e) => (t) => e === t,
    il = (e) =>
      (tl(e) ? "text()" : e.nodeName.toLowerCase()) +
      "[" +
      ((e) => {
        let t, n;
        (t = sl(rl(e))), (n = Pe(t, al(e), e)), (t = t.slice(0, n + 1));
        const o = Be(t, (e, n, o) => (tl(n) && tl(t[o - 1]) && e++, e), 0);
        return (t = Oe(t, or([e.nodeName]))), (n = Pe(t, al(e), e)), n - o;
      })(e) +
      "]",
    ll = (e, t) => {
      let n,
        o = [],
        r = t.container(),
        s = t.offset();
      if (tl(r))
        n = ((e, t) => {
          let n = e;
          for (; (n = n.previousSibling) && tl(n); ) t += n.data.length;
          return t;
        })(r, s);
      else {
        const e = r.childNodes;
        s >= e.length ? ((n = "after"), (s = e.length - 1)) : (n = "before"),
          (r = e[s]);
      }
      o.push(il(r));
      let a = ((e, t, n) => {
        const o = [];
        for (let n = t.parentNode; n && n !== e; n = n.parentNode) o.push(n);
        return o;
      })(e, r);
      return (
        (a = Oe(a, O(sr))),
        (o = o.concat(Te(a, (e) => il(e)))),
        o.reverse().join("/") + "," + n
      );
    },
    dl = (e, t) => {
      if (!t) return null;
      const n = t.split(","),
        o = n[0].split("/"),
        r = n.length > 1 ? n[1] : "before",
        s = Be(
          o,
          (e, t) => {
            const n = /([\w\-\(\)]+)\[([0-9]+)\]/.exec(t);
            return n
              ? ("text()" === n[1] && (n[1] = "#text"),
                ((e, t, n) => {
                  let o = sl(e);
                  return (
                    (o = Oe(o, (e, t) => !tl(e) || !tl(o[t - 1]))),
                    (o = Oe(o, or([t]))),
                    o[n]
                  );
                })(e, n[1], parseInt(n[2], 10)))
              : null;
          },
          e
        );
      if (!s) return null;
      if (!tl(s) && s.parentNode) {
        let e;
        return (e = "after" === r ? ol(s) + 1 : ol(s)), Qi(s.parentNode, e);
      }
      return ((e, t) => {
        let n = e,
          o = 0;
        for (; tl(n); ) {
          const r = n.data.length;
          if (t >= o && t <= o + r) {
            (e = n), (t -= o);
            break;
          }
          if (!tl(n.nextSibling)) {
            (e = n), (t = r);
            break;
          }
          (o += r), (n = n.nextSibling);
        }
        return tl(e) && t > e.data.length && (t = e.data.length), Qi(e, t);
      })(s, parseInt(r, 10));
    },
    cl = vr,
    ul = (e, t, n, o, r) => {
      const s = r ? o.startContainer : o.endContainer;
      let a = r ? o.startOffset : o.endOffset;
      const i = [],
        l = e.getRoot();
      if (dr(s))
        i.push(
          n
            ? ((e, t, n) => {
                let o = e(t.data.slice(0, n)).length;
                for (
                  let n = t.previousSibling;
                  n && dr(n);
                  n = n.previousSibling
                )
                  o += e(n.data).length;
                return o;
              })(t, s, a)
            : a
        );
      else {
        let t = 0;
        const o = s.childNodes;
        a >= o.length && o.length && ((t = 1), (a = Math.max(0, o.length - 1))),
          i.push(e.nodeIndex(o[a], n) + t);
      }
      for (let t = s; t && t !== l; t = t.parentNode) i.push(e.nodeIndex(t, n));
      return i;
    },
    ml = (e, t, n) => {
      let o = 0;
      return (
        Dt.each(e.select(t), (e) =>
          "all" === e.getAttribute("data-mce-bogus")
            ? void 0
            : e !== n && void o++
        ),
        o
      );
    },
    fl = (e, t) => {
      let n = t ? e.startContainer : e.endContainer,
        o = t ? e.startOffset : e.endOffset;
      if (er(n) && "TR" === n.nodeName) {
        const r = n.childNodes;
        (n = r[Math.min(t ? o : o - 1, r.length - 1)]),
          n &&
            ((o = t ? 0 : n.childNodes.length),
            t ? e.setStart(n, o) : e.setEnd(n, o));
      }
    },
    gl = (e) => (fl(e, !0), fl(e, !1), e),
    pl = (e, t) => {
      if (er(e) && ((e = wi(e, t)), cl(e))) return e;
      if (si(e)) {
        dr(e) && oi(e) && (e = e.parentNode);
        let t = e.previousSibling;
        if (cl(t)) return t;
        if (((t = e.nextSibling), cl(t))) return t;
      }
    },
    hl = (e, t, n) => {
      const o = n.getNode(),
        r = n.getRng();
      if ("IMG" === o.nodeName || cl(o)) {
        const e = o.nodeName;
        return { name: e, index: ml(n.dom, e, o) };
      }
      const s = ((e) =>
        pl(e.startContainer, e.startOffset) || pl(e.endContainer, e.endOffset))(
        r
      );
      if (s) {
        const e = s.tagName;
        return { name: e, index: ml(n.dom, e, s) };
      }
      return ((e, t, n, o) => {
        const r = t.dom,
          s = ul(r, e, n, o, !0),
          a = t.isForward(),
          i = mi(o) ? { isFakeCaret: !0 } : {};
        return t.isCollapsed()
          ? { start: s, forward: a, ...i }
          : { start: s, end: ul(r, e, n, o, !1), forward: a, ...i };
      })(e, n, t, r);
    },
    bl = (e, t, n) => {
      const o = {
        "data-mce-type": "bookmark",
        id: t,
        style: "overflow:hidden;line-height:0px",
      };
      return n ? e.create("span", o, "&#xFEFF;") : e.create("span", o);
    },
    vl = (e, t) => {
      const n = e.dom;
      let o = e.getRng();
      const r = n.uniqueId(),
        s = e.isCollapsed(),
        a = e.getNode(),
        i = a.nodeName,
        l = e.isForward();
      if ("IMG" === i) return { name: i, index: ml(n, i, a) };
      const d = gl(o.cloneRange());
      if (!s) {
        d.collapse(!1);
        const e = bl(n, r + "_end", t);
        el(n, d, e);
      }
      (o = gl(o)), o.collapse(!0);
      const c = bl(n, r + "_start", t);
      return (
        el(n, o, c),
        e.moveToBookmark({ id: r, keep: !0, forward: l }),
        { id: r, forward: l }
      );
    },
    yl = T(hl, R, !0),
    Cl = (e) => {
      const t = (t) => t(e),
        n = N(e),
        o = () => r,
        r = {
          tag: !0,
          inner: e,
          fold: (t, n) => n(e),
          isValue: M,
          isError: L,
          map: (t) => xl.value(t(e)),
          mapError: o,
          bind: t,
          exists: t,
          forall: t,
          getOr: n,
          or: o,
          getOrThunk: n,
          orThunk: o,
          getOrDie: n,
          each: (t) => {
            t(e);
          },
          toOptional: () => I.some(e),
        };
      return r;
    },
    wl = (e) => {
      const t = () => n,
        n = {
          tag: !1,
          inner: e,
          fold: (t, n) => t(e),
          isValue: L,
          isError: M,
          map: t,
          mapError: (t) => xl.error(t(e)),
          bind: t,
          exists: L,
          forall: M,
          getOr: R,
          or: R,
          getOrThunk: P,
          orThunk: P,
          getOrDie: B(String(e)),
          each: k,
          toOptional: I.none,
        };
      return n;
    },
    xl = {
      value: Cl,
      error: wl,
      fromOption: (e, t) => e.fold(() => wl(t), Cl),
    },
    El = (e) => {
      if (!p(e)) throw new Error("cases must be an array");
      if (0 === e.length) throw new Error("there must be at least one case");
      const t = [],
        n = {};
      return (
        q(e, (o, r) => {
          const s = fe(o);
          if (1 !== s.length) throw new Error("one and only one name per case");
          const a = s[0],
            i = o[a];
          if (void 0 !== n[a]) throw new Error("duplicate key detected:" + a);
          if ("cata" === a)
            throw new Error("cannot have a case named cata (sorry)");
          if (!p(i)) throw new Error("case arguments must be an array");
          t.push(a),
            (n[a] = (...n) => {
              const o = n.length;
              if (o !== i.length)
                throw new Error(
                  "Wrong number of arguments to case " +
                    a +
                    ". Expected " +
                    i.length +
                    " (" +
                    i +
                    "), got " +
                    o
                );
              return {
                fold: (...t) => {
                  if (t.length !== e.length)
                    throw new Error(
                      "Wrong number of arguments to fold. Expected " +
                        e.length +
                        ", got " +
                        t.length
                    );
                  return t[r].apply(null, n);
                },
                match: (e) => {
                  const o = fe(e);
                  if (t.length !== o.length)
                    throw new Error(
                      "Wrong number of arguments to match. Expected: " +
                        t.join(",") +
                        "\nActual: " +
                        o.join(",")
                    );
                  if (!ne(t, (e) => H(o, e)))
                    throw new Error(
                      "Not all branches were specified when using match. Specified: " +
                        o.join(", ") +
                        "\nRequired: " +
                        t.join(", ")
                    );
                  return e[a].apply(null, n);
                },
                log: (e) => {
                  console.log(e, {
                    constructors: t,
                    constructor: a,
                    params: n,
                  });
                },
              };
            });
        }),
        n
      );
    };
  El([
    { bothErrors: ["error1", "error2"] },
    { firstError: ["error1", "value2"] },
    { secondError: ["value1", "error2"] },
    { bothValues: ["value1", "value2"] },
  ]);
  const kl = (e) => "inline-command" === e.type || "inline-format" === e.type,
    _l = (e) => "block-command" === e.type || "block-format" === e.type,
    Sl = (e) => {
      var t;
      const n = (t) => xl.error({ message: t, pattern: e }),
        o = (t, o, r) => {
          if (void 0 !== e.format) {
            let r;
            if (p(e.format)) {
              if (!ne(e.format, m))
                return n(
                  t + " pattern has non-string items in the `format` array"
                );
              r = e.format;
            } else {
              if (!m(e.format))
                return n(t + " pattern has non-string `format` parameter");
              r = [e.format];
            }
            return xl.value(o(r));
          }
          return void 0 !== e.cmd
            ? m(e.cmd)
              ? xl.value(r(e.cmd, e.value))
              : n(t + " pattern has non-string `cmd` parameter")
            : n(t + " pattern is missing both `format` and `cmd` parameters");
        };
      if (!f(e)) return n("Raw pattern is not an object");
      if (!m(e.start)) return n("Raw pattern is missing `start` parameter");
      if (void 0 !== e.end) {
        if (!m(e.end))
          return n("Inline pattern has non-string `end` parameter");
        if (0 === e.start.length && 0 === e.end.length)
          return n("Inline pattern has empty `start` and `end` parameters");
        let t = e.start,
          r = e.end;
        return (
          0 === r.length && ((r = t), (t = "")),
          o(
            "Inline",
            (e) => ({ type: "inline-format", start: t, end: r, format: e }),
            (e, n) => ({
              type: "inline-command",
              start: t,
              end: r,
              cmd: e,
              value: n,
            })
          )
        );
      }
      if (void 0 !== e.replacement)
        return m(e.replacement)
          ? 0 === e.start.length
            ? n("Replacement pattern has empty `start` parameter")
            : xl.value({
                type: "inline-command",
                start: "",
                end: e.start,
                cmd: "mceInsertContent",
                value: e.replacement,
              })
          : n("Replacement pattern has non-string `replacement` parameter");
      {
        const r = null !== (t = e.trigger) && void 0 !== t ? t : "space";
        return 0 === e.start.length
          ? n("Block pattern has empty `start` parameter")
          : o(
              "Block",
              (t) => ({
                type: "block-format",
                start: e.start,
                format: t[0],
                trigger: r,
              }),
              (t, n) => ({
                type: "block-command",
                start: e.start,
                cmd: t,
                value: n,
                trigger: r,
              })
            );
      }
    },
    Nl = (e) => Y(e, _l),
    Rl = (e) => Y(e, kl),
    Al = (e, t) => ({
      ...e,
      blockPatterns: Y(e.blockPatterns, (e) =>
        ((e, t) =>
          ("block-command" === e.type || "block-format" === e.type) &&
          e.trigger === t)(e, t)
      ),
    }),
    Tl = (e) => {
      const t = ((e) => {
        const t = [],
          n = [];
        return (
          q(e, (e) => {
            e.fold(
              (e) => {
                t.push(e);
              },
              (e) => {
                n.push(e);
              }
            );
          }),
          { errors: t, values: n }
        );
      })(V(e, Sl));
      return q(t.errors, (e) => console.error(e.message, e.pattern)), t.values;
    },
    Ol = Et().deviceType,
    Bl = Ol.isTouch(),
    Pl = da.DOM,
    Dl = (e) => u(e, RegExp),
    Ll = (e) => (t) => t.options.get(e),
    Ml = (e) => m(e) || f(e),
    Il =
      (e, t = "") =>
      (n) => {
        const o = m(n);
        if (o) {
          if (-1 !== n.indexOf("=")) {
            const r = ((e) => {
              const t =
                e.indexOf("=") > 0
                  ? e.split(/[;,](?![^=;,]*(?:[;,]|$))/)
                  : e.split(",");
              return X(
                t,
                (e, t) => {
                  const n = t.split("="),
                    o = n[0],
                    r = n.length > 1 ? n[1] : o;
                  return (e[We(o)] = We(r)), e;
                },
                {}
              );
            })(n);
            return { value: Ee(r, e.id).getOr(t), valid: o };
          }
          return { value: n, valid: o };
        }
        return { valid: !1, message: "Must be a string." };
      },
    Fl = Ll("iframe_attrs"),
    Ul = Ll("doctype"),
    zl = Ll("document_base_url"),
    jl = Ll("body_id"),
    Hl = Ll("body_class"),
    $l = Ll("content_security_policy"),
    Vl = Ll("br_in_pre"),
    ql = Ll("forced_root_block"),
    Wl = Ll("forced_root_block_attrs"),
    Kl = Ll("newline_behavior"),
    Yl = Ll("br_newline_selector"),
    Gl = Ll("no_newline_selector"),
    Xl = Ll("keep_styles"),
    Zl = Ll("end_container_on_empty_block"),
    Ql = Ll("automatic_uploads"),
    Jl = Ll("images_reuse_filename"),
    ed = Ll("images_replace_blob_uris"),
    td = Ll("icons"),
    nd = Ll("icons_url"),
    od = Ll("images_upload_url"),
    rd = Ll("images_upload_base_path"),
    sd = Ll("images_upload_credentials"),
    ad = Ll("images_upload_handler"),
    id = Ll("content_css_cors"),
    ld = Ll("referrer_policy"),
    dd = Ll("language"),
    cd = Ll("language_url"),
    ud = Ll("indent_use_margin"),
    md = Ll("indentation"),
    fd = Ll("content_css"),
    gd = Ll("content_style"),
    pd = Ll("font_css"),
    hd = Ll("directionality"),
    bd = Ll("inline_boundaries_selector"),
    vd = Ll("object_resizing"),
    yd = Ll("resize_img_proportional"),
    Cd = Ll("placeholder"),
    wd = Ll("event_root"),
    xd = Ll("service_message"),
    Ed = Ll("theme"),
    kd = Ll("theme_url"),
    _d = Ll("model"),
    Sd = Ll("model_url"),
    Nd = Ll("inline_boundaries"),
    Rd = Ll("formats"),
    Ad = Ll("preview_styles"),
    Td = Ll("format_empty_lines"),
    Od = Ll("format_noneditable_selector"),
    Bd = Ll("custom_ui_selector"),
    Pd = Ll("inline"),
    Dd = Ll("hidden_input"),
    Ld = Ll("submit_patch"),
    Md = Ll("add_form_submit_trigger"),
    Id = Ll("add_unload_trigger"),
    Fd = Ll("custom_undo_redo_levels"),
    Ud = Ll("disable_nodechange"),
    zd = Ll("readonly"),
    jd = Ll("editable_root"),
    Hd = Ll("content_css_cors"),
    $d = Ll("plugins"),
    Vd = Ll("external_plugins"),
    qd = Ll("block_unsupported_drop"),
    Wd = Ll("visual"),
    Kd = Ll("visual_table_class"),
    Yd = Ll("visual_anchor_class"),
    Gd = Ll("iframe_aria_text"),
    Xd = Ll("setup"),
    Zd = Ll("init_instance_callback"),
    Qd = Ll("urlconverter_callback"),
    Jd = Ll("auto_focus"),
    ec = Ll("browser_spellcheck"),
    tc = Ll("protect"),
    nc = Ll("paste_block_drop"),
    oc = Ll("paste_data_images"),
    rc = Ll("paste_preprocess"),
    sc = Ll("paste_postprocess"),
    ac = Ll("newdocument_content"),
    ic = Ll("paste_webkit_styles"),
    lc = Ll("paste_remove_styles_if_webkit"),
    dc = Ll("paste_merge_formats"),
    cc = Ll("smart_paste"),
    uc = Ll("paste_as_text"),
    mc = Ll("paste_tab_spaces"),
    fc = Ll("allow_html_data_urls"),
    gc = Ll("text_patterns"),
    pc = Ll("text_patterns_lookup"),
    hc = Ll("noneditable_class"),
    bc = Ll("editable_class"),
    vc = Ll("noneditable_regexp"),
    yc = Ll("preserve_cdata"),
    Cc = Ll("highlight_on_focus"),
    wc = Ll("xss_sanitization"),
    xc = Ll("init_content_sync"),
    Ec = (e) => Dt.explode(e.options.get("images_file_types")),
    kc = Ll("table_tab_navigation"),
    _c = Ll("details_initial_state"),
    Sc = Ll("details_serialized_state"),
    Nc = Ll("sandbox_iframes"),
    Rc = (e) => e.options.get("sandbox_iframes_exclusions"),
    Ac = Ll("convert_unsafe_embeds"),
    Tc = Ll("license_key"),
    Oc = Ll("api_key"),
    Bc = er,
    Pc = dr,
    Dc = (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    Lc = (e) => {
      const t = ei(e);
      return { count: e.length - t.length, text: t };
    },
    Mc = (e) => {
      let t;
      for (; -1 !== (t = e.data.lastIndexOf(Qa)); ) e.deleteData(t, 1);
    },
    Ic = (e, t) => (Uc(e), t),
    Fc = (e, t) =>
      Qi.isTextPosition(t)
        ? ((e, t) =>
            Pc(e) && t.container() === e
              ? ((e, t) => {
                  const n = Lc(e.data.substr(0, t.offset())),
                    o = Lc(e.data.substr(t.offset()));
                  return (n.text + o.text).length > 0
                    ? (Mc(e), Qi(e, t.offset() - n.count))
                    : t;
                })(e, t)
              : Ic(e, t))(e, t)
        : ((e, t) =>
            t.container() === e.parentNode
              ? ((e, t) => {
                  const n = t.container(),
                    o = ((e, t) => {
                      const n = j(e, t);
                      return -1 === n ? I.none() : I.some(n);
                    })(ce(n.childNodes), e)
                      .map((e) => (e < t.offset() ? Qi(n, t.offset() - 1) : t))
                      .getOr(t);
                  return Uc(e), o;
                })(e, t)
              : Ic(e, t))(e, t),
    Uc = (e) => {
      Bc(e) && si(e) && (ai(e) ? e.removeAttribute("data-mce-caret") : Dc(e)),
        Pc(e) && (Mc(e), 0 === e.data.length && Dc(e));
    },
    zc = vr,
    jc = wr,
    Hc = yr,
    $c = (e, t, n) => {
      const o = pi(t.getBoundingClientRect(), n);
      let r, s;
      if ("BODY" === e.tagName) {
        const t = e.ownerDocument.documentElement;
        (r = e.scrollLeft || t.scrollLeft), (s = e.scrollTop || t.scrollTop);
      } else {
        const t = e.getBoundingClientRect();
        (r = e.scrollLeft - t.left), (s = e.scrollTop - t.top);
      }
      (o.left += r),
        (o.right += r),
        (o.top += s),
        (o.bottom += s),
        (o.width = 1);
      let a = t.offsetWidth - t.clientWidth;
      return a > 0 && (n && (a *= -1), (o.left += a), (o.right += a)), o;
    },
    Vc = (e, t, n, o) => {
      const r = ya();
      let s, a;
      const i = ql(e),
        l = e.dom,
        d = () => {
          ((e) => {
            var t, n;
            const o = zo(
              Cn(e),
              "*[contentEditable=false],video,audio,embed,object"
            );
            for (let e = 0; e < o.length; e++) {
              const r = o[e].dom;
              let s = r.previousSibling;
              if (ci(s)) {
                const e = s.data;
                1 === e.length
                  ? null === (t = s.parentNode) ||
                    void 0 === t ||
                    t.removeChild(s)
                  : s.deleteData(e.length - 1, 1);
              }
              (s = r.nextSibling),
                di(s) &&
                  (1 === s.data.length
                    ? null === (n = s.parentNode) ||
                      void 0 === n ||
                      n.removeChild(s)
                    : s.deleteData(0, 1));
            }
          })(t),
            a && (Uc(a), (a = null)),
            r.on((e) => {
              l.remove(e.caret), r.clear();
            }),
            s && (clearInterval(s), (s = void 0));
        };
      return {
        show: (e, c) => {
          let u;
          if ((d(), Hc(c))) return null;
          if (!n(c))
            return (
              (a = ((e, t) => {
                var n;
                const o = (
                    null !== (n = e.ownerDocument) && void 0 !== n
                      ? n
                      : document
                  ).createTextNode(Qa),
                  r = e.parentNode;
                if (t) {
                  const t = e.previousSibling;
                  if (ni(t)) {
                    if (si(t)) return t;
                    if (ci(t)) return t.splitText(t.data.length - 1);
                  }
                  null == r || r.insertBefore(o, e);
                } else {
                  const t = e.nextSibling;
                  if (ni(t)) {
                    if (si(t)) return t;
                    if (di(t)) return t.splitText(1), t;
                  }
                  e.nextSibling
                    ? null == r || r.insertBefore(o, e.nextSibling)
                    : null == r || r.appendChild(o);
                }
                return o;
              })(c, e)),
              (u = c.ownerDocument.createRange()),
              Wc(a.nextSibling)
                ? (u.setStart(a, 0), u.setEnd(a, 0))
                : (u.setStart(a, 1), u.setEnd(a, 1)),
              u
            );
          {
            const n = ((e, t, n) => {
                var o;
                const r = (
                  null !== (o = t.ownerDocument) && void 0 !== o ? o : document
                ).createElement(e);
                r.setAttribute("data-mce-caret", n ? "before" : "after"),
                  r.setAttribute("data-mce-bogus", "all"),
                  r.appendChild(Xa().dom);
                const s = t.parentNode;
                return (
                  n
                    ? null == s || s.insertBefore(r, t)
                    : t.nextSibling
                    ? null == s || s.insertBefore(r, t.nextSibling)
                    : null == s || s.appendChild(r),
                  r
                );
              })(i, c, e),
              d = $c(t, c, e);
            l.setStyle(n, "top", d.top),
              l.setStyle(n, "caret-color", "transparent"),
              (a = n);
            const m = l.create("div", {
              class: "mce-visual-caret",
              "data-mce-bogus": "all",
            });
            l.setStyles(m, { ...d }),
              l.add(t, m),
              r.set({ caret: m, element: c, before: e }),
              e && l.addClass(m, "mce-visual-caret-before"),
              (s = setInterval(() => {
                r.on((e) => {
                  o()
                    ? l.toggleClass(e.caret, "mce-visual-caret-hidden")
                    : l.addClass(e.caret, "mce-visual-caret-hidden");
                });
              }, 500)),
              (u = c.ownerDocument.createRange()),
              u.setStart(n, 0),
              u.setEnd(n, 0);
          }
          return u;
        },
        hide: d,
        getCss: () =>
          ".mce-visual-caret {position: absolute;background-color: black;background-color: currentcolor;}.mce-visual-caret-hidden {display: none;}*[data-mce-caret] {position: absolute;left: -1000px;right: auto;top: 0;margin: 0;padding: 0;}",
        reposition: () => {
          r.on((e) => {
            const n = $c(t, e.element, e.before);
            l.setStyles(e.caret, { ...n });
          });
        },
        destroy: () => clearInterval(s),
      };
    },
    qc = () => Tt.browser.isFirefox(),
    Wc = (e) => zc(e) || jc(e),
    Kc = (e) => (Wc(e) || (ar(e) && qc())) && On(Cn(e)).exists(ro),
    Yc = br,
    Gc = vr,
    Xc = wr,
    Zc = rr("display", "block table table-cell table-caption list-item"),
    Qc = si,
    Jc = oi,
    eu = er,
    tu = dr,
    nu = Bi,
    ou = (e) => e > 0,
    ru = (e) => e < 0,
    su = (e, t) => {
      let n;
      for (; (n = e(t)); ) if (!Jc(n)) return n;
      return null;
    },
    au = (e, t, n, o, r) => {
      const s = new Vo(e, o),
        a = Gc(e) || Jc(e);
      let i;
      if (ru(t)) {
        if (a && ((i = su(s.prev.bind(s), !0)), n(i))) return i;
        for (; (i = su(s.prev.bind(s), r)); ) if (n(i)) return i;
      }
      if (ou(t)) {
        if (a && ((i = su(s.next.bind(s), !0)), n(i))) return i;
        for (; (i = su(s.next.bind(s), r)); ) if (n(i)) return i;
      }
      return null;
    },
    iu = (e, t) => {
      for (; e && e !== t; ) {
        if (Zc(e)) return e;
        e = e.parentNode;
      }
      return null;
    },
    lu = (e, t, n) => iu(e.container(), n) === iu(t.container(), n),
    du = (e, t) => {
      if (!t) return I.none();
      const n = t.container(),
        o = t.offset();
      return eu(n) ? I.from(n.childNodes[o + e]) : I.none();
    },
    cu = (e, t) => {
      var n;
      const o = (
        null !== (n = t.ownerDocument) && void 0 !== n ? n : document
      ).createRange();
      return (
        e
          ? (o.setStartBefore(t), o.setEndBefore(t))
          : (o.setStartAfter(t), o.setEndAfter(t)),
        o
      );
    },
    uu = (e, t, n) => iu(t, e) === iu(n, e),
    mu = (e, t, n) => {
      const o = e ? "previousSibling" : "nextSibling";
      let r = n;
      for (; r && r !== t; ) {
        let e = r[o];
        if ((e && Qc(e) && (e = e[o]), Gc(e) || Xc(e))) {
          if (uu(t, e, r)) return e;
          break;
        }
        if (nu(e)) break;
        r = r.parentNode;
      }
      return null;
    },
    fu = T(cu, !0),
    gu = T(cu, !1),
    pu = (e, t, n) => {
      let o;
      const r = T(mu, !0, t),
        s = T(mu, !1, t),
        a = n.startContainer,
        i = n.startOffset;
      if (oi(a)) {
        const e = tu(a) ? a.parentNode : a,
          t = e.getAttribute("data-mce-caret");
        if ("before" === t && ((o = e.nextSibling), Kc(o))) return fu(o);
        if ("after" === t && ((o = e.previousSibling), Kc(o))) return gu(o);
      }
      if (!n.collapsed) return n;
      if (dr(a)) {
        if (Qc(a)) {
          if (1 === e) {
            if (((o = s(a)), o)) return fu(o);
            if (((o = r(a)), o)) return gu(o);
          }
          if (-1 === e) {
            if (((o = r(a)), o)) return gu(o);
            if (((o = s(a)), o)) return fu(o);
          }
          return n;
        }
        if (ci(a) && i >= a.data.length - 1)
          return 1 === e && ((o = s(a)), o) ? fu(o) : n;
        if (di(a) && i <= 1) return -1 === e && ((o = r(a)), o) ? gu(o) : n;
        if (i === a.data.length) return (o = s(a)), o ? fu(o) : n;
        if (0 === i) return (o = r(a)), o ? gu(o) : n;
      }
      return n;
    },
    hu = (e, t) => du(e ? 0 : -1, t).filter(Gc),
    bu = (e, t, n) => {
      const o = pu(e, t, n);
      return -1 === e ? Qi.fromRangeStart(o) : Qi.fromRangeEnd(o);
    },
    vu = (e) => I.from(e.getNode()).map(Cn),
    yu = (e, t) => {
      let n = t;
      for (; (n = e(n)); ) if (n.isVisible()) return n;
      return n;
    },
    Cu = (e, t) => {
      const n = lu(e, t);
      return !(n || !pr(e.getNode())) || n;
    };
  var wu;
  !(function (e) {
    (e[(e.Backwards = -1)] = "Backwards"), (e[(e.Forwards = 1)] = "Forwards");
  })(wu || (wu = {}));
  const xu = vr,
    Eu = dr,
    ku = er,
    _u = pr,
    Su = Bi,
    Nu = (e) =>
      Ai(e) ||
      ((e) =>
        !!Pi(e) &&
        !X(ce(e.getElementsByTagName("*")), (e, t) => e || ki(t), !1))(e),
    Ru = Di,
    Au = (e, t) =>
      e.hasChildNodes() && t < e.childNodes.length ? e.childNodes[t] : null,
    Tu = (e, t) => {
      if (ou(e)) {
        if (Su(t.previousSibling) && !Eu(t.previousSibling))
          return Qi.before(t);
        if (Eu(t)) return Qi(t, 0);
      }
      if (ru(e)) {
        if (Su(t.nextSibling) && !Eu(t.nextSibling)) return Qi.after(t);
        if (Eu(t)) return Qi(t, t.data.length);
      }
      return ru(e) ? (_u(t) ? Qi.before(t) : Qi.after(t)) : Qi.before(t);
    },
    Ou = (e, t, n) => {
      let o, r, s, a;
      if (!ku(n) || !t) return null;
      if (t.isEqual(Qi.after(n)) && n.lastChild) {
        if (
          ((a = Qi.after(n.lastChild)),
          ru(e) && Su(n.lastChild) && ku(n.lastChild))
        )
          return _u(n.lastChild) ? Qi.before(n.lastChild) : a;
      } else a = t;
      const i = a.container();
      let l = a.offset();
      if (Eu(i)) {
        if (ru(e) && l > 0) return Qi(i, --l);
        if (ou(e) && l < i.length) return Qi(i, ++l);
        o = i;
      } else {
        if (ru(e) && l > 0 && ((r = Au(i, l - 1)), Su(r)))
          return !Nu(r) && ((s = au(r, e, Ru, r)), s)
            ? Eu(s)
              ? Qi(s, s.data.length)
              : Qi.after(s)
            : Eu(r)
            ? Qi(r, r.data.length)
            : Qi.before(r);
        if (ou(e) && l < i.childNodes.length && ((r = Au(i, l)), Su(r)))
          return _u(r)
            ? ((e, t) => {
                const n = t.nextSibling;
                return n && Su(n)
                  ? Eu(n)
                    ? Qi(n, 0)
                    : Qi.before(n)
                  : Ou(wu.Forwards, Qi.after(t), e);
              })(n, r)
            : !Nu(r) && ((s = au(r, e, Ru, r)), s)
            ? Eu(s)
              ? Qi(s, 0)
              : Qi.before(s)
            : Eu(r)
            ? Qi(r, 0)
            : Qi.after(r);
        o = r || a.getNode();
      }
      if (
        o &&
        ((ou(e) && a.isAtEnd()) || (ru(e) && a.isAtStart())) &&
        ((o = au(o, e, M, n, !0)), Ru(o, n))
      )
        return Tu(e, o);
      r = o ? au(o, e, Ru, n) : o;
      const d = De(
        Y(
          ((e, t) => {
            const n = [];
            let o = e;
            for (; o && o !== t; ) n.push(o), (o = o.parentNode);
            return n;
          })(i, n),
          xu
        )
      );
      return !d || (r && d.contains(r))
        ? r
          ? Tu(e, r)
          : null
        : ((a = ou(e) ? Qi.after(d) : Qi.before(d)), a);
    },
    Bu = (e) => ({
      next: (t) => Ou(wu.Forwards, t, e),
      prev: (t) => Ou(wu.Backwards, t, e),
    }),
    Pu = (e) => (Qi.isTextPosition(e) ? 0 === e.offset() : Bi(e.getNode())),
    Du = (e) => {
      if (Qi.isTextPosition(e)) {
        const t = e.container();
        return e.offset() === t.data.length;
      }
      return Bi(e.getNode(!0));
    },
    Lu = (e, t) =>
      !Qi.isTextPosition(e) &&
      !Qi.isTextPosition(t) &&
      e.getNode() === t.getNode(!0),
    Mu = (e, t, n) => {
      const o = Bu(t);
      return I.from(e ? o.next(n) : o.prev(n));
    },
    Iu = (e, t, n) =>
      Mu(e, t, n).bind((o) =>
        lu(n, o, t) &&
        ((e, t, n) => {
          return e
            ? !Lu(t, n) &&
                ((o = t), !(!Qi.isTextPosition(o) && pr(o.getNode()))) &&
                Du(t) &&
                Pu(n)
            : !Lu(n, t) && Pu(t) && Du(n);
          var o;
        })(e, n, o)
          ? Mu(e, t, o)
          : I.some(o)
      ),
    Fu = (e, t, n, o) =>
      Iu(e, t, n).bind((n) => (o(n) ? Fu(e, t, n, o) : I.some(n))),
    Uu = (e, t) => {
      const n = e ? t.firstChild : t.lastChild;
      return dr(n)
        ? I.some(Qi(n, e ? 0 : n.data.length))
        : n
        ? Bi(n)
          ? I.some(e ? Qi.before(n) : pr((o = n)) ? Qi.before(o) : Qi.after(o))
          : ((e, t, n) => {
              const o = e ? Qi.before(n) : Qi.after(n);
              return Mu(e, t, o);
            })(e, t, n)
        : I.none();
      var o;
    },
    zu = T(Mu, !0),
    ju = T(Mu, !1),
    Hu = T(Uu, !0),
    $u = T(Uu, !1),
    Vu = "_mce_caret",
    qu = (e) => er(e) && e.id === Vu,
    Wu = (e, t) => {
      let n = t;
      for (; n && n !== e; ) {
        if (qu(n)) return n;
        n = n.parentNode;
      }
      return null;
    },
    Ku = (e) => ke(e, "name"),
    Yu = (e) => Dt.isArray(e.start),
    Gu = (e) => !(!Ku(e) && b(e.forward)) || e.forward,
    Xu = (e, t) => (
      er(t) &&
        e.isBlock(t) &&
        !t.innerHTML &&
        (t.innerHTML = '<br data-mce-bogus="1" />'),
      t
    ),
    Zu = (e, t) =>
      $u(e).fold(
        L,
        (e) => (
          t.setStart(e.container(), e.offset()),
          t.setEnd(e.container(), e.offset()),
          !0
        )
      ),
    Qu = (e, t, n) =>
      !(
        !((e) => !e.hasChildNodes())(t) ||
        !Wu(e, t) ||
        (((e, t) => {
          var n;
          const o = (
            null !== (n = e.ownerDocument) && void 0 !== n ? n : document
          ).createTextNode(Qa);
          e.appendChild(o), t.setStart(o, 0), t.setEnd(o, 0);
        })(t, n),
        0)
      ),
    Ju = (e, t, n, o) => {
      const r = n[t ? "start" : "end"],
        s = e.getRoot();
      if (r) {
        let e = s,
          n = r[0];
        for (let t = r.length - 1; e && t >= 1; t--) {
          const n = e.childNodes;
          if (Qu(s, e, o)) return !0;
          if (r[t] > n.length - 1) return !!Qu(s, e, o) || Zu(e, o);
          e = n[r[t]];
        }
        dr(e) && (n = Math.min(r[0], e.data.length)),
          er(e) && (n = Math.min(r[0], e.childNodes.length)),
          t ? o.setStart(e, n) : o.setEnd(e, n);
      }
      return !0;
    },
    em = (e) => dr(e) && e.data.length > 0,
    tm = (e, t, n) => {
      const o = e.get(n.id + "_" + t),
        r = null == o ? void 0 : o.parentNode,
        s = n.keep;
      if (o && r) {
        let a, i;
        if (
          ("start" === t
            ? s
              ? o.hasChildNodes()
                ? ((a = o.firstChild), (i = 1))
                : em(o.nextSibling)
                ? ((a = o.nextSibling), (i = 0))
                : em(o.previousSibling)
                ? ((a = o.previousSibling), (i = o.previousSibling.data.length))
                : ((a = r), (i = e.nodeIndex(o) + 1))
              : ((a = r), (i = e.nodeIndex(o)))
            : s
            ? o.hasChildNodes()
              ? ((a = o.firstChild), (i = 1))
              : em(o.previousSibling)
              ? ((a = o.previousSibling), (i = o.previousSibling.data.length))
              : ((a = r), (i = e.nodeIndex(o)))
            : ((a = r), (i = e.nodeIndex(o))),
          !s)
        ) {
          const r = o.previousSibling,
            s = o.nextSibling;
          let l;
          for (
            Dt.each(Dt.grep(o.childNodes), (e) => {
              dr(e) && (e.data = e.data.replace(/\uFEFF/g, ""));
            });
            (l = e.get(n.id + "_" + t));

          )
            e.remove(l, !0);
          if (dr(s) && dr(r) && !Tt.browser.isOpera()) {
            const t = r.data.length;
            r.appendData(s.data), e.remove(s), (a = r), (i = t);
          }
        }
        return I.some(Qi(a, i));
      }
      return I.none();
    },
    nm = (e, t, n) =>
      ((e, t, n = !1) =>
        2 === t
          ? hl(ei, n, e)
          : 3 === t
          ? ((e) => {
              const t = e.getRng();
              return {
                start: ll(e.dom.getRoot(), Qi.fromRangeStart(t)),
                end: ll(e.dom.getRoot(), Qi.fromRangeEnd(t)),
                forward: e.isForward(),
              };
            })(e)
          : t
          ? ((e) => ({ rng: e.getRng(), forward: e.isForward() }))(e)
          : vl(e, !1))(e, t, n),
    om = (e, t) => {
      ((e, t) => {
        const n = e.dom;
        if (t) {
          if (Yu(t))
            return ((e, t) => {
              const n = e.createRng();
              return Ju(e, !0, t, n) && Ju(e, !1, t, n)
                ? I.some({ range: n, forward: Gu(t) })
                : I.none();
            })(n, t);
          if (((e) => m(e.start))(t))
            return ((e, t) => {
              const n = I.from(dl(e.getRoot(), t.start)),
                o = I.from(dl(e.getRoot(), t.end));
              return It(n, o, (n, o) => {
                const r = e.createRng();
                return (
                  r.setStart(n.container(), n.offset()),
                  r.setEnd(o.container(), o.offset()),
                  { range: r, forward: Gu(t) }
                );
              });
            })(n, t);
          if (((e) => ke(e, "id"))(t))
            return ((e, t) => {
              const n = tm(e, "start", t),
                o = tm(e, "end", t);
              return It(n, o.or(n), (n, o) => {
                const r = e.createRng();
                return (
                  r.setStart(Xu(e, n.container()), n.offset()),
                  r.setEnd(Xu(e, o.container()), o.offset()),
                  { range: r, forward: Gu(t) }
                );
              });
            })(n, t);
          if (Ku(t))
            return ((e, t) =>
              I.from(e.select(t.name)[t.index]).map((t) => {
                const n = e.createRng();
                return n.selectNode(t), { range: n, forward: !0 };
              }))(n, t);
          if (((e) => ke(e, "rng"))(t))
            return I.some({ range: t.rng, forward: Gu(t) });
        }
        return I.none();
      })(e, t).each(({ range: t, forward: n }) => {
        e.setRng(t, n);
      });
    },
    rm = (e) =>
      er(e) &&
      "SPAN" === e.tagName &&
      "bookmark" === e.getAttribute("data-mce-type"),
    sm = ((am = Wo), (e) => am === e);
  var am;
  const im = (e) => "" !== e && -1 !== " \f\n\r\t\v".indexOf(e),
    lm = (e) => !im(e) && !sm(e) && !Ko(e),
    dm = (e) => {
      const t = [];
      if (e) for (let n = 0; n < e.rangeCount; n++) t.push(e.getRangeAt(n));
      return t;
    },
    cm = (e, t) => {
      const n = zo(t, "td[data-mce-selected],th[data-mce-selected]");
      return n.length > 0
        ? n
        : ((e) =>
            Y(
              ((e) =>
                te(e, (e) => {
                  const t = Ci(e);
                  return t ? [Cn(t)] : [];
                }))(e),
              Ya
            ))(e);
    },
    um = (e) => cm(dm(e.selection.getSel()), Cn(e.getBody())),
    mm = (e, t) => to(e, "table", t),
    fm = (e) => Un(e).fold(N([e]), (t) => [e].concat(fm(t))),
    gm = (e) =>
      zn(e).fold(N([e]), (t) =>
        "br" === $t(t)
          ? Pn(t)
              .map((t) => [e].concat(gm(t)))
              .getOr([])
          : [e].concat(gm(t))
      ),
    pm = (e, t) =>
      It(
        ((e) => {
          const t = e.startContainer,
            n = e.startOffset;
          return dr(t)
            ? 0 === n
              ? I.some(Cn(t))
              : I.none()
            : I.from(t.childNodes[n]).map(Cn);
        })(t),
        ((e) => {
          const t = e.endContainer,
            n = e.endOffset;
          return dr(t)
            ? n === t.data.length
              ? I.some(Cn(t))
              : I.none()
            : I.from(t.childNodes[n - 1]).map(Cn);
        })(t),
        (t, n) => {
          const o = Q(fm(e), T(_n, t)),
            r = Q(gm(e), T(_n, n));
          return o.isSome() && r.isSome();
        }
      ).getOr(!1),
    hm = (e, t, n, o) => {
      const r = n,
        s = new Vo(n, r),
        a = Ce(
          e.schema.getMoveCaretBeforeOnEnterElements(),
          (e, t) => !H(["td", "th", "table"], t.toLowerCase())
        );
      let i = n;
      do {
        if (dr(i) && 0 !== Dt.trim(i.data).length)
          return void (o ? t.setStart(i, 0) : t.setEnd(i, i.data.length));
        if (a[i.nodeName])
          return void (o
            ? t.setStartBefore(i)
            : "BR" === i.nodeName
            ? t.setEndBefore(i)
            : t.setEndAfter(i));
      } while ((i = o ? s.next() : s.prev()));
      "BODY" === r.nodeName &&
        (o ? t.setStart(r, 0) : t.setEnd(r, r.childNodes.length));
    },
    bm = (e) => {
      const t = e.selection.getSel();
      return C(t) && t.rangeCount > 0;
    },
    vm = (e, t) => {
      const n = um(e);
      n.length > 0
        ? q(n, (n) => {
            const o = n.dom,
              r = e.dom.createRng();
            r.setStartBefore(o), r.setEndAfter(o), t(r, !0);
          })
        : t(e.selection.getRng(), !1);
    },
    ym = (e, t, n) => {
      const o = vl(e, t);
      n(o), e.moveToBookmark(o);
    },
    Cm = (e) => x(null == e ? void 0 : e.nodeType),
    wm = (e) => er(e) && !rm(e) && !qu(e) && !sr(e),
    xm = (e, t, n) => {
      const { selection: o, dom: r } = e,
        s = o.getNode(),
        a = vr(s);
      ym(o, !0, () => {
        t();
      }),
        a && vr(s) && r.isChildOf(s, e.getBody())
          ? e.selection.select(s)
          : n(o.getStart()) && Em(r, o);
    },
    Em = (e, t) => {
      var n, o;
      const r = t.getRng(),
        { startContainer: s, startOffset: a } = r;
      if (
        !((e, t) => {
          if (wm(t) && !/^(TD|TH)$/.test(t.nodeName)) {
            const n = e.getAttrib(t, "data-mce-selected"),
              o = parseInt(n, 10);
            return !isNaN(o) && o > 0;
          }
          return !1;
        })(e, t.getNode()) &&
        er(s)
      ) {
        const i = s.childNodes,
          l = e.getRoot();
        let d;
        if (a < i.length) {
          const t = i[a];
          d = new Vo(
            t,
            null !== (n = e.getParent(t, e.isBlock)) && void 0 !== n ? n : l
          );
        } else {
          const t = i[i.length - 1];
          (d = new Vo(
            t,
            null !== (o = e.getParent(t, e.isBlock)) && void 0 !== o ? o : l
          )),
            d.next(!0);
        }
        for (let n = d.current(); n; n = d.next()) {
          if ("false" === e.getContentEditable(n)) return;
          if (dr(n) && !Nm(n)) return r.setStart(n, 0), void t.setRng(r);
        }
      }
    },
    km = (e, t, n) => {
      if (e) {
        const o = t ? "nextSibling" : "previousSibling";
        for (e = n ? e : e[o]; e; e = e[o]) if (er(e) || !Nm(e)) return e;
      }
    },
    _m = (e, t) =>
      !!e.getTextBlockElements()[t.nodeName.toLowerCase()] || Kr(e, t),
    Sm = (e, t, n) => e.schema.isValidChild(t, n),
    Nm = (e, t = !1) => {
      if (C(e) && dr(e)) {
        const n = t ? e.data.replace(/ /g, "\xa0") : e.data;
        return Go(n);
      }
      return !1;
    },
    Rm = (e, t) => {
      const n = e.dom;
      return (
        wm(t) &&
        "false" === n.getContentEditable(t) &&
        ((e, t) => {
          const n = "[data-mce-cef-wrappable]",
            o = Od(e),
            r = Xe(o) ? n : `${n},${o}`;
          return En(Cn(t), r);
        })(e, t) &&
        0 === n.select('[contenteditable="true"]', t).length
      );
    },
    Am = (e, t) =>
      w(e)
        ? e(t)
        : (C(t) && (e = e.replace(/%(\w+)/g, (e, n) => t[n] || e)), e),
    Tm = (e, t) => (
      (t = t || ""),
      (e = "" + ((e = e || "").nodeName || e)),
      (t = "" + (t.nodeName || t)),
      e.toLowerCase() === t.toLowerCase()
    ),
    Om = (e, t) => {
      if (y(e)) return null;
      {
        let n = String(e);
        return (
          ("color" !== t && "backgroundColor" !== t) || (n = $s(n)),
          "fontWeight" === t && 700 === e && (n = "bold"),
          "fontFamily" === t &&
            (n = n.replace(/[\'\"]/g, "").replace(/,\s+/g, ",")),
          n
        );
      }
    },
    Bm = (e, t, n) => {
      const o = e.getStyle(t, n);
      return Om(o, n);
    },
    Pm = (e, t) => {
      let n;
      return (
        e.getParent(
          t,
          (t) =>
            !!er(t) &&
            ((n = e.getStyle(t, "text-decoration")), !!n && "none" !== n)
        ),
        n
      );
    },
    Dm = (e, t, n) => e.getParents(t, n, e.getRoot()),
    Lm = (e, t, n) => {
      const o = e.formatter.get(t);
      return C(o) && $(o, n);
    },
    Mm = (e) => _e(e, "block"),
    Im = (e) => _e(e, "selector"),
    Fm = (e) => _e(e, "inline"),
    Um = (e) => Im(e) && !1 !== e.expand && !Fm(e),
    zm = (e) =>
      ((e) => {
        const t = [];
        let n = e;
        for (; n; ) {
          if ((dr(n) && n.data !== Qa) || n.childNodes.length > 1) return [];
          er(n) && t.push(n), (n = n.firstChild);
        }
        return t;
      })(e).length > 0,
    jm = (e) => qu(e.dom) && zm(e.dom),
    Hm = rm,
    $m = Dm,
    Vm = Nm,
    qm = _m,
    Wm = (e, t) => {
      let n = t;
      for (; n; ) {
        if (er(n) && e.getContentEditable(n))
          return "false" === e.getContentEditable(n) ? n : t;
        n = n.parentNode;
      }
      return t;
    },
    Km = (e, t, n, o) => {
      const r = t.data;
      if (e) {
        for (let e = n; e > 0; e--) if (o(r.charAt(e - 1))) return e;
      } else for (let e = n; e < r.length; e++) if (o(r.charAt(e))) return e;
      return -1;
    },
    Ym = (e, t, n) => Km(e, t, n, (e) => sm(e) || im(e)),
    Gm = (e, t, n) => Km(e, t, n, lm),
    Xm = (e, t, n, o, r, s) => {
      let a;
      const i = e.getParent(n, e.isBlock) || t,
        l = (t, n, o) => {
          const s = Ua(e),
            l = r ? s.backwards : s.forwards;
          return I.from(
            l(
              t,
              n,
              (e, t) => (Hm(e.parentNode) ? -1 : ((a = e), o(r, e, t))),
              i
            )
          );
        };
      return l(n, o, Ym)
        .bind((e) =>
          s ? l(e.container, e.offset + (r ? -1 : 0), Gm) : I.some(e)
        )
        .orThunk(() =>
          a ? I.some({ container: a, offset: r ? 0 : a.length }) : I.none()
        );
    },
    Zm = (e, t, n, o, r) => {
      const s = o[r];
      dr(o) && Xe(o.data) && s && (o = s);
      const a = $m(e, o);
      for (let o = 0; o < a.length; o++)
        for (let r = 0; r < t.length; r++) {
          const s = t[r];
          if (
            (!C(s.collapsed) || s.collapsed === n.collapsed) &&
            Im(s) &&
            e.is(a[o], s.selector)
          )
            return a[o];
        }
      return o;
    },
    Qm = (e, t, n, o) => {
      var r;
      let s = n;
      const a = e.getRoot(),
        i = t[0];
      if ((Mm(i) && (s = i.wrapper ? null : e.getParent(n, i.block, a)), !s)) {
        const t =
          null !== (r = e.getParent(n, "LI,TD,TH,SUMMARY")) && void 0 !== r
            ? r
            : a;
        s = e.getParent(
          dr(n) ? n.parentNode : n,
          (t) => t !== a && qm(e.schema, t),
          t
        );
      }
      if (
        (s && Mm(i) && i.wrapper && (s = $m(e, s, "ul,ol").reverse()[0] || s),
        !s)
      )
        for (
          s = n;
          s && s[o] && !e.isBlock(s[o]) && ((s = s[o]), !Tm(s, "br"));

        );
      return s || n;
    },
    Jm = (e, t, n, o) => {
      const r = n.parentNode;
      return (
        !C(n[o]) && (!(r !== t && !y(r) && !e.isBlock(r)) || Jm(e, t, r, o))
      );
    },
    ef = (e, t, n, o, r) => {
      let s = n;
      const a = r ? "previousSibling" : "nextSibling",
        i = e.getRoot();
      if (dr(n) && !Vm(n) && (r ? o > 0 : o < n.data.length)) return n;
      for (; s; ) {
        if (!t[0].block_expand && e.isBlock(s)) return s;
        for (let t = s[a]; t; t = t[a]) {
          const n = dr(t) && !Jm(e, i, t, a);
          if (
            !Hm(t) &&
            (!pr((l = t)) ||
              !l.getAttribute("data-mce-bogus") ||
              l.nextSibling) &&
            !Vm(t, n)
          )
            return s;
        }
        if (s === i || s.parentNode === i) {
          n = s;
          break;
        }
        s = s.parentNode;
      }
      var l;
      return n;
    },
    tf = (e) => Hm(e.parentNode) || Hm(e),
    nf = (e, t, n, o = !1) => {
      let {
        startContainer: r,
        startOffset: s,
        endContainer: a,
        endOffset: i,
      } = t;
      const l = n[0];
      return (
        er(r) && r.hasChildNodes() && ((r = wi(r, s)), dr(r) && (s = 0)),
        er(a) &&
          a.hasChildNodes() &&
          ((a = wi(a, t.collapsed ? i : i - 1)), dr(a) && (i = a.data.length)),
        (r = Wm(e, r)),
        (a = Wm(e, a)),
        tf(r) &&
          ((r = Hm(r) ? r : r.parentNode),
          (r = t.collapsed ? r.previousSibling || r : r.nextSibling || r),
          dr(r) && (s = t.collapsed ? r.length : 0)),
        tf(a) &&
          ((a = Hm(a) ? a : a.parentNode),
          (a = t.collapsed ? a.nextSibling || a : a.previousSibling || a),
          dr(a) && (i = t.collapsed ? 0 : a.length)),
        t.collapsed &&
          (Xm(e, e.getRoot(), r, s, !0, o).each(
            ({ container: e, offset: t }) => {
              (r = e), (s = t);
            }
          ),
          Xm(e, e.getRoot(), a, i, !1, o).each(
            ({ container: e, offset: t }) => {
              (a = e), (i = t);
            }
          )),
        (Fm(l) || l.block_expand) &&
          ((Fm(l) && dr(r) && 0 !== s) || (r = ef(e, n, r, s, !0)),
          (Fm(l) && dr(a) && i !== a.data.length) || (a = ef(e, n, a, i, !1))),
        Um(l) &&
          ((r = Zm(e, n, t, r, "previousSibling")),
          (a = Zm(e, n, t, a, "nextSibling"))),
        (Mm(l) || Im(l)) &&
          ((r = Qm(e, n, r, "previousSibling")),
          (a = Qm(e, n, a, "nextSibling")),
          Mm(l) &&
            (e.isBlock(r) || ((r = ef(e, n, r, s, !0)), dr(r) && (s = 0)),
            e.isBlock(a) ||
              ((a = ef(e, n, a, i, !1)), dr(a) && (i = a.data.length)))),
        er(r) && r.parentNode && ((s = e.nodeIndex(r)), (r = r.parentNode)),
        er(a) && a.parentNode && ((i = e.nodeIndex(a) + 1), (a = a.parentNode)),
        { startContainer: r, startOffset: s, endContainer: a, endOffset: i }
      );
    },
    of = (e, t, n) => {
      var o;
      const r = t.startOffset,
        s = wi(t.startContainer, r),
        a = t.endOffset,
        i = wi(t.endContainer, a - 1),
        l = (e) => {
          const t = e[0];
          dr(t) && t === s && r >= t.data.length && e.splice(0, 1);
          const n = e[e.length - 1];
          return (
            0 === a &&
              e.length > 0 &&
              n === i &&
              dr(n) &&
              e.splice(e.length - 1, 1),
            e
          );
        },
        d = (e, t, n) => {
          const o = [];
          for (; e && e !== n; e = e[t]) o.push(e);
          return o;
        },
        c = (t, n) => e.getParent(t, (e) => e.parentNode === n, n),
        u = (e, t, o) => {
          const r = o ? "nextSibling" : "previousSibling";
          for (let s = e, a = s.parentNode; s && s !== t; s = a) {
            a = s.parentNode;
            const t = d(s === e ? s : s[r], r);
            t.length && (o || t.reverse(), n(l(t)));
          }
        };
      if (s === i) return n(l([s]));
      const m =
        null !== (o = e.findCommonAncestor(s, i)) && void 0 !== o
          ? o
          : e.getRoot();
      if (e.isChildOf(s, i)) return u(s, m, !0);
      if (e.isChildOf(i, s)) return u(i, m);
      const f = c(s, m) || s,
        g = c(i, m) || i;
      u(s, f, !0);
      const p = d(
        f === s ? f : f.nextSibling,
        "nextSibling",
        g === i ? g.nextSibling : g
      );
      p.length && n(l(p)), u(i, g);
    },
    rf = [
      'pre[class*=language-][contenteditable="false"]',
      "figure.image",
      "div[data-ephox-embed-iri]",
      "div.tiny-pageembed",
      "div.mce-toc",
      "div[data-mce-toc]",
    ],
    sf = (e, t, n, o, r, s) => {
      const { uid: a = t, ...i } = n;
      mn(e, xa()), Jt(e, `${ka()}`, a), Jt(e, `${Ea()}`, o);
      const { attributes: l = {}, classes: d = [] } = r(a, i);
      if (
        (en(e, l),
        ((e, t) => {
          q(t, (t) => {
            mn(e, t);
          });
        })(e, d),
        s)
      ) {
        d.length > 0 && Jt(e, `${Sa()}`, d.join(","));
        const t = fe(l);
        t.length > 0 && Jt(e, `${Na()}`, t.join(","));
      }
    },
    af = (e, t, n, o, r) => {
      const s = vn("span", e);
      return sf(s, t, n, o, r, !1), s;
    },
    lf = (e, t, n, o, r, s) => {
      const a = [],
        i = af(e.getDoc(), n, s, o, r),
        l = ya(),
        d = () => {
          l.clear();
        },
        c = (e) => {
          q(e, u);
        },
        u = (t) => {
          switch (
            ((e, t, n, o) =>
              Tn(t).fold(
                () => "skipping",
                (r) =>
                  "br" === o || ((e) => Yt(e) && ja(e) === Qa)(t)
                    ? "valid"
                    : ((e) => Kt(e) && pn(e, xa()))(t)
                    ? "existing"
                    : qu(t.dom)
                    ? "caret"
                    : $(rf, (e) => En(t, e))
                    ? "valid-block"
                    : Sm(e, n, o) && Sm(e, $t(r), n)
                    ? "valid"
                    : "invalid-child"
              ))(e, t, "span", $t(t))
          ) {
            case "invalid-child": {
              d();
              const e = In(t);
              c(e), d();
              break;
            }
            case "valid-block":
              d(), sf(t, n, s, o, r, !0);
              break;
            case "valid": {
              const e = l.get().getOrThunk(() => {
                const e = Ma(i);
                return a.push(e), l.set(e), e;
              });
              Co(t, e);
              break;
            }
          }
        };
      return (
        of(e.dom, t, (e) => {
          d(),
            ((e) => {
              const t = V(e, Cn);
              c(t);
            })(e);
        }),
        a
      );
    },
    df = (e) => {
      const t = (() => {
        const e = {};
        return {
          register: (t, n) => {
            e[t] = { name: t, settings: n };
          },
          lookup: (t) => Ee(e, t).map((e) => e.settings),
          getNames: () => fe(e),
        };
      })();
      ((e, t) => {
        const n = Ea(),
          o = (e) => I.from(e.attr(n)).bind(t.lookup),
          r = (e) => {
            var t, n;
            e.attr(ka(), null), e.attr(Ea(), null), e.attr(_a(), null);
            const o = I.from(e.attr(Na()))
                .map((e) => e.split(","))
                .getOr([]),
              r = I.from(e.attr(Sa()))
                .map((e) => e.split(","))
                .getOr([]);
            q(o, (t) => e.attr(t, null));
            const s =
                null !==
                  (n =
                    null === (t = e.attr("class")) || void 0 === t
                      ? void 0
                      : t.split(" ")) && void 0 !== n
                  ? n
                  : [],
              a = re(s, [xa()].concat(r));
            e.attr("class", a.length > 0 ? a.join(" ") : null),
              e.attr(Sa(), null),
              e.attr(Na(), null);
          };
        e.serializer.addTempAttr(_a()),
          e.serializer.addAttributeFilter(n, (e) => {
            for (const t of e)
              o(t).each((e) => {
                !1 === e.persistent && ("span" === t.name ? t.unwrap() : r(t));
              });
          });
      })(e, t);
      const n = ((e, t) => {
          const n = ma({}),
            o = () => ({ listeners: [], previous: ya() }),
            r = (e, t) => {
              s(e, (e) => (t(e), e));
            },
            s = (e, t) => {
              const r = n.get(),
                s = t(Ee(r, e).getOrThunk(o));
              (r[e] = s), n.set(r);
            },
            a = (t, n) => {
              q(Oa(e, t), (e) => {
                n ? Jt(e, _a(), "true") : rn(e, _a());
              });
            },
            i = wa(() => {
              const n = ae(t.getNames());
              q(n, (t) => {
                s(t, (n) => {
                  const o = n.previous.get();
                  return (
                    Aa(e, I.some(t)).fold(
                      () => {
                        o.each((e) => {
                          ((e) => {
                            r(e, (t) => {
                              q(t.listeners, (t) => t(!1, e));
                            });
                          })(t),
                            n.previous.clear(),
                            a(e, !1);
                        });
                      },
                      ({ uid: e, name: t, elements: s }) => {
                        Lt(o, e) ||
                          (o.each((e) => a(e, !1)),
                          ((e, t, n) => {
                            r(e, (o) => {
                              q(o.listeners, (o) =>
                                o(!0, e, { uid: t, nodes: V(n, (e) => e.dom) })
                              );
                            });
                          })(t, e, s),
                          n.previous.set(e),
                          a(e, !0));
                      }
                    ),
                    { previous: n.previous, listeners: n.listeners }
                  );
                });
              });
            }, 30);
          return (
            e.on("remove", () => {
              i.cancel();
            }),
            e.on("NodeChange", () => {
              i.throttle();
            }),
            {
              addListener: (e, t) => {
                s(e, (e) => ({
                  previous: e.previous,
                  listeners: e.listeners.concat([t]),
                }));
              },
            }
          );
        })(e, t),
        o = Zt("span"),
        r = (e) => {
          q(e, (e) => {
            o(e)
              ? ko(e)
              : ((e) => {
                  gn(e, xa()),
                    rn(e, `${ka()}`),
                    rn(e, `${Ea()}`),
                    rn(e, `${_a()}`);
                  const t = nn(e, `${Na()}`)
                      .map((e) => e.split(","))
                      .getOr([]),
                    n = nn(e, `${Sa()}`)
                      .map((e) => e.split(","))
                      .getOr([]);
                  var o;
                  q(t, (t) => rn(e, t)),
                    (o = e),
                    q(n, (e) => {
                      gn(o, e);
                    }),
                    rn(e, `${Sa()}`),
                    rn(e, `${Na()}`);
                })(e);
          });
        };
      return {
        register: (e, n) => {
          t.register(e, n);
        },
        annotate: (n, o) => {
          t.lookup(n).each((t) => {
            ((e, t, n, o) => {
              e.undoManager.transact(() => {
                const r = e.selection,
                  s = r.getRng(),
                  a = um(e).length > 0,
                  i = Da("mce-annotation");
                if (
                  (s.collapsed &&
                    !a &&
                    ((e, t) => {
                      const n = nf(e.dom, t, [{ inline: "span" }]);
                      t.setStart(n.startContainer, n.startOffset),
                        t.setEnd(n.endContainer, n.endOffset),
                        e.selection.setRng(t);
                    })(e, s),
                  r.getRng().collapsed && !a)
                ) {
                  const s = af(e.getDoc(), i, o, t, n.decorate);
                  No(s, Wo), r.getRng().insertNode(s.dom), r.select(s.dom);
                } else
                  ym(r, !1, () => {
                    vm(e, (r) => {
                      lf(e, r, i, t, n.decorate, o);
                    });
                  });
              });
            })(e, n, t, o);
          });
        },
        annotationChanged: (e, t) => {
          n.addListener(e, t);
        },
        remove: (t) => {
          Aa(e, I.some(t)).each(({ elements: t }) => {
            const n = e.selection.getBookmark();
            r(t), e.selection.moveToBookmark(n);
          });
        },
        removeAll: (t) => {
          const n = e.selection.getBookmark();
          pe(Ba(e, t), (e, t) => {
            r(e);
          }),
            e.selection.moveToBookmark(n);
        },
        getAll: (t) => {
          const n = Ba(e, t);
          return he(n, (e) => V(e, (e) => e.dom));
        },
      };
    },
    cf = (e) => ({ getBookmark: T(nm, e), moveToBookmark: T(om, e) });
  cf.isBookmarkNode = rm;
  const uf = (e, t, n) =>
      !n.collapsed &&
      $(n.getClientRects(), (n) =>
        ((e, t, n) =>
          t >= e.left && t <= e.right && n >= e.top && n <= e.bottom)(n, e, t)
      ),
    mf = (e, t, n) => {
      e.dispatch(t, n);
    },
    ff = (e, t, n, o) => {
      e.dispatch("FormatApply", { format: t, node: n, vars: o });
    },
    gf = (e, t, n, o) => {
      e.dispatch("FormatRemove", { format: t, node: n, vars: o });
    },
    pf = (e, t) => e.dispatch("SetContent", t),
    hf = (e, t) => e.dispatch("GetContent", t),
    bf = (e, t) => {
      e.dispatch("AutocompleterUpdateActiveRange", t);
    },
    vf = (e, t) => e.dispatch("PastePlainTextToggle", { state: t }),
    yf = {
      BACKSPACE: 8,
      DELETE: 46,
      DOWN: 40,
      ENTER: 13,
      ESC: 27,
      LEFT: 37,
      RIGHT: 39,
      SPACEBAR: 32,
      TAB: 9,
      UP: 38,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      modifierPressed: (e) =>
        e.shiftKey || e.ctrlKey || e.altKey || yf.metaKeyPressed(e),
      metaKeyPressed: (e) =>
        Tt.os.isMacOS() || Tt.os.isiOS() ? e.metaKey : e.ctrlKey && !e.altKey,
    },
    Cf = "data-mce-selected",
    wf = Math.abs,
    xf = Math.round,
    Ef = {
      nw: [0, 0, -1, -1],
      ne: [1, 0, 1, -1],
      se: [1, 1, 1, 1],
      sw: [0, 1, -1, 1],
    },
    kf = (e, t) => {
      const n = t.dom,
        o = t.getDoc(),
        r = document,
        s = t.getBody();
      let a, i, l, d, c, u, m, f, g, p, h, b, v, y, w;
      const x = (e) => C(e) && (hr(e) || n.is(e, "figure.image")),
        E = (e) => wr(e) || n.hasClass(e, "mce-preview-object"),
        k = (e) => {
          const n = e.target;
          ((e, t) => {
            if (
              ((e) => "longpress" === e.type || 0 === e.type.indexOf("touch"))(
                e
              )
            ) {
              const n = e.touches[0];
              return x(e.target) && !uf(n.clientX, n.clientY, t);
            }
            return x(e.target) && !uf(e.clientX, e.clientY, t);
          })(e, t.selection.getRng()) &&
            !e.isDefaultPrevented() &&
            t.selection.select(n);
        },
        _ = (e) =>
          n.hasClass(e, "mce-preview-object") && C(e.firstElementChild)
            ? [e, e.firstElementChild]
            : n.is(e, "figure.image")
            ? [e.querySelector("img")]
            : [e],
        S = (e) => {
          const o = vd(t);
          return (
            !!o &&
            "false" !== e.getAttribute("data-mce-resize") &&
            e !== t.getBody() &&
            (n.hasClass(e, "mce-preview-object") && C(e.firstElementChild)
              ? En(Cn(e.firstElementChild), o)
              : En(Cn(e), o))
          );
        },
        N = (e, o, r) => {
          if (C(r)) {
            const s = _(e);
            q(s, (e) => {
              e.style[o] || !t.schema.isValid(e.nodeName.toLowerCase(), o)
                ? n.setStyle(e, o, r)
                : n.setAttrib(e, o, "" + r);
            });
          }
        },
        R = (e, t, n) => {
          N(e, "width", t), N(e, "height", n);
        },
        A = (e) => {
          let o, r, c, C, k;
          (o = e.screenX - u),
            (r = e.screenY - m),
            (b = o * d[2] + f),
            (v = r * d[3] + g),
            (b = b < 5 ? 5 : b),
            (v = v < 5 ? 5 : v),
            (c =
              (x(a) || E(a)) && !1 !== yd(t)
                ? !yf.modifierPressed(e)
                : yf.modifierPressed(e)),
            c &&
              (wf(o) > wf(r)
                ? ((v = xf(b * p)), (b = xf(v / p)))
                : ((b = xf(v / p)), (v = xf(b * p)))),
            R(i, b, v),
            (C = d.startPos.x + o),
            (k = d.startPos.y + r),
            (C = C > 0 ? C : 0),
            (k = k > 0 ? k : 0),
            n.setStyles(l, { left: C, top: k, display: "block" }),
            (l.innerHTML = b + " &times; " + v),
            d[2] < 0 &&
              i.clientWidth <= b &&
              n.setStyle(i, "left", void 0 + (f - b)),
            d[3] < 0 &&
              i.clientHeight <= v &&
              n.setStyle(i, "top", void 0 + (g - v)),
            (o = s.scrollWidth - y),
            (r = s.scrollHeight - w),
            o + r !== 0 && n.setStyles(l, { left: C - o, top: k - r }),
            h ||
              (((e, t, n, o, r) => {
                e.dispatch("ObjectResizeStart", {
                  target: t,
                  width: n,
                  height: o,
                  origin: r,
                });
              })(t, a, f, g, "corner-" + d.name),
              (h = !0));
        },
        T = () => {
          const e = h;
          (h = !1),
            e && (N(a, "width", b), N(a, "height", v)),
            n.unbind(o, "mousemove", A),
            n.unbind(o, "mouseup", T),
            r !== o && (n.unbind(r, "mousemove", A), n.unbind(r, "mouseup", T)),
            n.remove(i),
            n.remove(l),
            n.remove(c),
            O(a),
            e &&
              (((e, t, n, o, r) => {
                e.dispatch("ObjectResized", {
                  target: t,
                  width: n,
                  height: o,
                  origin: r,
                });
              })(t, a, b, v, "corner-" + d.name),
              n.setAttrib(a, "style", n.getAttrib(a, "style"))),
            t.nodeChanged();
        },
        O = (e) => {
          M();
          const h = n.getPos(e, s),
            C = h.x,
            x = h.y,
            k = e.getBoundingClientRect(),
            N = k.width || k.right - k.left,
            O = k.height || k.bottom - k.top;
          a !== e && (P(), (a = e), (b = v = 0));
          const B = t.dispatch("ObjectSelected", { target: e });
          S(e) && !B.isDefaultPrevented()
            ? pe(Ef, (e, t) => {
                let h = n.get("mceResizeHandle" + t);
                h && n.remove(h),
                  (h = n.add(s, "div", {
                    id: "mceResizeHandle" + t,
                    "data-mce-bogus": "all",
                    class: "mce-resizehandle",
                    unselectable: !0,
                    style: "cursor:" + t + "-resize; margin:0; padding:0",
                  })),
                  n.bind(h, "mousedown", (h) => {
                    h.stopImmediatePropagation(),
                      h.preventDefault(),
                      ((h) => {
                        const b = _(a)[0];
                        (u = h.screenX),
                          (m = h.screenY),
                          (f = b.clientWidth),
                          (g = b.clientHeight),
                          (p = g / f),
                          (d = e),
                          (d.name = t),
                          (d.startPos = { x: N * e[0] + C, y: O * e[1] + x }),
                          (y = s.scrollWidth),
                          (w = s.scrollHeight),
                          (c = n.add(s, "div", {
                            class: "mce-resize-backdrop",
                            "data-mce-bogus": "all",
                          })),
                          n.setStyles(c, {
                            position: "fixed",
                            left: "0",
                            top: "0",
                            width: "100%",
                            height: "100%",
                          }),
                          (i = ((e, t) => {
                            if (E(t))
                              return e.create("img", {
                                src: Tt.transparentSrc,
                              });
                            if (ar(t)) {
                              const n = $e(d.name, "n") ? le : de,
                                o = t.cloneNode(!0);
                              return (
                                n(e.select("tr", o)).each((t) => {
                                  const n = e.select("td,th", t);
                                  e.setStyle(t, "height", null),
                                    q(n, (t) => e.setStyle(t, "height", null));
                                }),
                                o
                              );
                            }
                            return t.cloneNode(!0);
                          })(n, a)),
                          n.addClass(i, "mce-clonedresizable"),
                          n.setAttrib(i, "data-mce-bogus", "all"),
                          (i.contentEditable = "false"),
                          n.setStyles(i, { left: C, top: x, margin: 0 }),
                          R(i, N, O),
                          i.removeAttribute(Cf),
                          s.appendChild(i),
                          n.bind(o, "mousemove", A),
                          n.bind(o, "mouseup", T),
                          r !== o &&
                            (n.bind(r, "mousemove", A),
                            n.bind(r, "mouseup", T)),
                          (l = n.add(
                            s,
                            "div",
                            {
                              class: "mce-resize-helper",
                              "data-mce-bogus": "all",
                            },
                            f + " &times; " + g
                          ));
                      })(h);
                  }),
                  (e.elm = h),
                  n.setStyles(h, {
                    left: N * e[0] + C - h.offsetWidth / 2,
                    top: O * e[1] + x - h.offsetHeight / 2,
                  });
              })
            : P(!1);
        },
        B = Ca(O, 0),
        P = (e = !0) => {
          B.cancel(),
            M(),
            a && e && a.removeAttribute(Cf),
            pe(Ef, (e, t) => {
              const o = n.get("mceResizeHandle" + t);
              o && (n.unbind(o), n.remove(o));
            });
        },
        D = (e, t) => n.isChildOf(e, t),
        L = (o) => {
          if (h || t.removed || t.composing) return;
          const r = "mousedown" === o.type ? o.target : e.getNode(),
            a = oo(
              Cn(r),
              "table,img,figure.image,hr,video,span.mce-preview-object,details"
            )
              .map((e) => e.dom)
              .filter(
                (e) =>
                  n.isEditable(e.parentElement) ||
                  ("IMG" === e.nodeName && n.isEditable(e))
              )
              .getOrUndefined(),
            i = C(a) ? n.getAttrib(a, Cf, "1") : "1";
          if (
            (q(n.select(`img[${Cf}],hr[${Cf}]`), (e) => {
              e.removeAttribute(Cf);
            }),
            C(a) && D(a, s) && t.hasFocus())
          ) {
            I();
            const t = e.getStart(!0);
            if (D(t, a) && D(e.getEnd(!0), a))
              return n.setAttrib(a, Cf, i), void B.throttle(a);
          }
          P();
        },
        M = () => {
          pe(Ef, (e) => {
            e.elm && (n.unbind(e.elm), delete e.elm);
          });
        },
        I = () => {
          try {
            t.getDoc().execCommand("enableObjectResizing", !1, "false");
          } catch (e) {}
        };
      return (
        t.on("init", () => {
          I(),
            t.on("NodeChange ResizeEditor ResizeWindow ResizeContent drop", L),
            t.on("keyup compositionend", (e) => {
              a && "TABLE" === a.nodeName && L(e);
            }),
            t.on("hide blur", P),
            t.on("contextmenu longpress", k, !0);
        }),
        t.on("remove", M),
        {
          isResizable: S,
          showResizeRect: O,
          hideResizeRect: P,
          updateResizeRect: L,
          destroy: () => {
            B.cancel(), (a = i = c = null);
          },
        }
      );
    },
    _f = (e, t, n) => {
      const o = e.document.createRange();
      var r;
      return (
        (r = o),
        t.fold(
          (e) => {
            r.setStartBefore(e.dom);
          },
          (e, t) => {
            r.setStart(e.dom, t);
          },
          (e) => {
            r.setStartAfter(e.dom);
          }
        ),
        ((e, t) => {
          t.fold(
            (t) => {
              e.setEndBefore(t.dom);
            },
            (t, n) => {
              e.setEnd(t.dom, n);
            },
            (t) => {
              e.setEndAfter(t.dom);
            }
          );
        })(o, n),
        o
      );
    },
    Sf = (e, t, n, o, r) => {
      const s = e.document.createRange();
      return s.setStart(t.dom, n), s.setEnd(o.dom, r), s;
    },
    Nf = El([
      { ltr: ["start", "soffset", "finish", "foffset"] },
      { rtl: ["start", "soffset", "finish", "foffset"] },
    ]),
    Rf = (e, t, n) =>
      t(Cn(n.startContainer), n.startOffset, Cn(n.endContainer), n.endOffset);
  Nf.ltr, Nf.rtl;
  const Af = (e, t, n, o) => ({ start: e, soffset: t, finish: n, foffset: o }),
    Tf = document.caretPositionFromPoint
      ? (e, t, n) => {
          var o, r;
          return I.from(
            null === (r = (o = e.dom).caretPositionFromPoint) || void 0 === r
              ? void 0
              : r.call(o, t, n)
          ).bind((t) => {
            if (null === t.offsetNode) return I.none();
            const n = e.dom.createRange();
            return n.setStart(t.offsetNode, t.offset), n.collapse(), I.some(n);
          });
        }
      : document.caretRangeFromPoint
      ? (e, t, n) => {
          var o, r;
          return I.from(
            null === (r = (o = e.dom).caretRangeFromPoint) || void 0 === r
              ? void 0
              : r.call(o, t, n)
          );
        }
      : I.none,
    Of = El([
      { before: ["element"] },
      { on: ["element", "offset"] },
      { after: ["element"] },
    ]),
    Bf = {
      before: Of.before,
      on: Of.on,
      after: Of.after,
      cata: (e, t, n, o) => e.fold(t, n, o),
      getStart: (e) => e.fold(R, R, R),
    },
    Pf = El([
      { domRange: ["rng"] },
      { relative: ["startSitu", "finishSitu"] },
      { exact: ["start", "soffset", "finish", "foffset"] },
    ]),
    Df = {
      domRange: Pf.domRange,
      relative: Pf.relative,
      exact: Pf.exact,
      exactFromRange: (e) => Pf.exact(e.start, e.soffset, e.finish, e.foffset),
      getWin: (e) => {
        const t = ((e) =>
          e.match({
            domRange: (e) => Cn(e.startContainer),
            relative: (e, t) => Bf.getStart(e),
            exact: (e, t, n, o) => e,
          }))(e);
        return An(t);
      },
      range: Af,
    },
    Lf = (e, t) => {
      const n = $t(e);
      return "input" === n
        ? Bf.after(e)
        : H(["br", "img"], n)
        ? 0 === t
          ? Bf.before(e)
          : Bf.after(e)
        : Bf.on(e, t);
    },
    Mf = (e, t) => {
      const n = e.fold(Bf.before, Lf, Bf.after),
        o = t.fold(Bf.before, Lf, Bf.after);
      return Df.relative(n, o);
    },
    If = (e, t, n, o) => {
      const r = Lf(e, t),
        s = Lf(n, o);
      return Df.relative(r, s);
    },
    Ff = (e, t) => {
      const n = (t || document).createDocumentFragment();
      return (
        q(e, (e) => {
          n.appendChild(e.dom);
        }),
        Cn(n)
      );
    },
    Uf = (e) => {
      const t = Df.getWin(e).dom,
        n = (e, n, o, r) => Sf(t, e, n, o, r),
        o = ((e) =>
          e.match({
            domRange: (e) => {
              const t = Cn(e.startContainer),
                n = Cn(e.endContainer);
              return If(t, e.startOffset, n, e.endOffset);
            },
            relative: Mf,
            exact: If,
          }))(e);
      return ((e, t) => {
        const n = ((e, t) =>
          t.match({
            domRange: (e) => ({ ltr: N(e), rtl: I.none }),
            relative: (t, n) => ({
              ltr: Le(() => _f(e, t, n)),
              rtl: Le(() => I.some(_f(e, n, t))),
            }),
            exact: (t, n, o, r) => ({
              ltr: Le(() => Sf(e, t, n, o, r)),
              rtl: Le(() => I.some(Sf(e, o, r, t, n))),
            }),
          }))(e, t);
        return ((e, t) => {
          const n = t.ltr();
          return n.collapsed
            ? t
                .rtl()
                .filter((e) => !1 === e.collapsed)
                .map((e) =>
                  Nf.rtl(
                    Cn(e.endContainer),
                    e.endOffset,
                    Cn(e.startContainer),
                    e.startOffset
                  )
                )
                .getOrThunk(() => Rf(0, Nf.ltr, n))
            : Rf(0, Nf.ltr, n);
        })(0, n);
      })(t, o).match({ ltr: n, rtl: n });
    },
    zf = (e, t, n) =>
      ((e, t, n) =>
        ((e, t, n) => {
          const o = Cn(e.document);
          return Tf(o, t, n).map((e) =>
            Af(
              Cn(e.startContainer),
              e.startOffset,
              Cn(e.endContainer),
              e.endOffset
            )
          );
        })(e, t, n))(An(Cn(n)).dom, e, t)
        .map((e) => {
          const t = n.createRange();
          return (
            t.setStart(e.start.dom, e.soffset),
            t.setEnd(e.finish.dom, e.foffset),
            t
          );
        })
        .getOrUndefined(),
    jf = (e, t) =>
      C(e) &&
      C(t) &&
      e.startContainer === t.startContainer &&
      e.startOffset === t.startOffset &&
      e.endContainer === t.endContainer &&
      e.endOffset === t.endOffset,
    Hf = (e, t, n) =>
      null !==
      ((e, t, n) => {
        let o = e;
        for (; o && o !== t; ) {
          if (n(o)) return o;
          o = o.parentNode;
        }
        return null;
      })(e, t, n),
    $f = (e, t, n) => Hf(e, t, (e) => e.nodeName === n),
    Vf = (e, t) => si(e) && !Hf(e, t, qu),
    qf = (e, t, n) => {
      const o = t.parentNode;
      if (o) {
        const r = new Vo(t, e.getParent(o, e.isBlock) || e.getRoot());
        let s;
        for (; (s = r[n ? "prev" : "next"]()); ) if (pr(s)) return !0;
      }
      return !1;
    },
    Wf = (e, t, n, o, r) => {
      const s = e.getRoot(),
        a = e.schema.getNonEmptyElements(),
        i = r.parentNode;
      let l, d;
      if (!i) return I.none();
      const c = e.getParent(i, e.isBlock) || s;
      if (o && pr(r) && t && e.isEmpty(c)) return I.some(Qi(i, e.nodeIndex(r)));
      const u = new Vo(r, c);
      for (; (d = u[o ? "prev" : "next"]()); ) {
        if ("false" === e.getContentEditableParent(d) || Vf(d, s))
          return I.none();
        if (dr(d) && d.data.length > 0)
          return $f(d, s, "A")
            ? I.none()
            : I.some(Qi(d, o ? d.data.length : 0));
        if (e.isBlock(d) || a[d.nodeName.toLowerCase()]) return I.none();
        l = d;
      }
      return mr(l) ? I.none() : n && l ? I.some(Qi(l, 0)) : I.none();
    },
    Kf = (e, t, n, o) => {
      const r = e.getRoot();
      let s,
        a = !1,
        i = n ? o.startContainer : o.endContainer,
        l = n ? o.startOffset : o.endOffset;
      const d = er(i) && l === i.childNodes.length,
        c = e.schema.getNonEmptyElements();
      let u = n;
      if (si(i)) return I.none();
      if (
        (er(i) && l > i.childNodes.length - 1 && (u = !1),
        fr(i) && ((i = r), (l = 0)),
        i === r)
      ) {
        if (u && ((s = i.childNodes[l > 0 ? l - 1 : 0]), s)) {
          if (si(s)) return I.none();
          if (c[s.nodeName] || ar(s)) return I.none();
        }
        if (i.hasChildNodes()) {
          if (
            ((l = Math.min(!u && l > 0 ? l - 1 : l, i.childNodes.length - 1)),
            (i = i.childNodes[l]),
            (l = dr(i) && d ? i.data.length : 0),
            !t && i === r.lastChild && ar(i))
          )
            return I.none();
          if (
            ((e, t) => {
              let n = t;
              for (; n && n !== e; ) {
                if (vr(n)) return !0;
                n = n.parentNode;
              }
              return !1;
            })(r, i) ||
            si(i)
          )
            return I.none();
          if (Er(i)) return I.none();
          if (i.hasChildNodes() && !ar(i)) {
            s = i;
            const t = new Vo(i, r);
            do {
              if (vr(s) || si(s)) {
                a = !1;
                break;
              }
              if (dr(s) && s.data.length > 0) {
                (l = u ? 0 : s.data.length), (i = s), (a = !0);
                break;
              }
              if (c[s.nodeName.toLowerCase()] && !Cr(s)) {
                (l = e.nodeIndex(s)), (i = s.parentNode), u || l++, (a = !0);
                break;
              }
            } while ((s = u ? t.next() : t.prev()));
          }
        }
      }
      return (
        t &&
          (dr(i) &&
            0 === l &&
            Wf(e, d, t, !0, i).each((e) => {
              (i = e.container()), (l = e.offset()), (a = !0);
            }),
          er(i) &&
            ((s = i.childNodes[l]),
            s || (s = i.childNodes[l - 1]),
            !s ||
              !pr(s) ||
              ((e, t) => {
                var n;
                return (
                  "A" ===
                  (null === (n = e.previousSibling) || void 0 === n
                    ? void 0
                    : n.nodeName)
                );
              })(s) ||
              qf(e, s, !1) ||
              qf(e, s, !0) ||
              Wf(e, d, t, !0, s).each((e) => {
                (i = e.container()), (l = e.offset()), (a = !0);
              }))),
        u &&
          !t &&
          dr(i) &&
          l === i.data.length &&
          Wf(e, d, t, !1, i).each((e) => {
            (i = e.container()), (l = e.offset()), (a = !0);
          }),
        a && i ? I.some(Qi(i, l)) : I.none()
      );
    },
    Yf = (e, t) => {
      const n = t.collapsed,
        o = t.cloneRange(),
        r = Qi.fromRangeStart(t);
      return (
        Kf(e, n, !0, o).each((e) => {
          (n && Qi.isAbove(r, e)) || o.setStart(e.container(), e.offset());
        }),
        n ||
          Kf(e, n, !1, o).each((e) => {
            o.setEnd(e.container(), e.offset());
          }),
        n && o.collapse(!0),
        jf(t, o) ? I.none() : I.some(o)
      );
    },
    Gf = (e, t) => e.splitText(t),
    Xf = (e) => {
      let t = e.startContainer,
        n = e.startOffset,
        o = e.endContainer,
        r = e.endOffset;
      if (t === o && dr(t)) {
        if (n > 0 && n < t.data.length)
          if (((o = Gf(t, n)), (t = o.previousSibling), r > n)) {
            r -= n;
            const e = Gf(o, r).previousSibling;
            (t = o = e), (r = e.data.length), (n = 0);
          } else r = 0;
      } else if (
        (dr(t) && n > 0 && n < t.data.length && ((t = Gf(t, n)), (n = 0)),
        dr(o) && r > 0 && r < o.data.length)
      ) {
        const e = Gf(o, r).previousSibling;
        (o = e), (r = e.data.length);
      }
      return {
        startContainer: t,
        startOffset: n,
        endContainer: o,
        endOffset: r,
      };
    },
    Zf = (e) => ({
      walk: (t, n) => of(e, t, n),
      split: Xf,
      expand: (t, n = { type: "word" }) => {
        if ("word" === n.type) {
          const n = nf(e, t, [{ inline: "span" }]),
            o = e.createRng();
          return (
            o.setStart(n.startContainer, n.startOffset),
            o.setEnd(n.endContainer, n.endOffset),
            o
          );
        }
        return t;
      },
      normalize: (t) =>
        Yf(e, t).fold(
          L,
          (e) => (
            t.setStart(e.startContainer, e.startOffset),
            t.setEnd(e.endContainer, e.endOffset),
            !0
          )
        ),
    });
  (Zf.compareRanges = jf),
    (Zf.getCaretRangeFromPoint = zf),
    (Zf.getSelectedNode = Ci),
    (Zf.getNode = wi);
  const Qf = ((e, t) => {
      const n = (t) => {
          const n = ((e) => {
            const t = e.dom;
            return Xn(e) ? t.getBoundingClientRect().height : t.offsetHeight;
          })(t);
          if (n <= 0 || null === n) {
            const n = uo(t, e);
            return parseFloat(n) || 0;
          }
          return n;
        },
        o = (e, t) =>
          X(
            t,
            (t, n) => {
              const o = uo(e, n),
                r = void 0 === o ? 0 : parseInt(o, 10);
              return isNaN(r) ? t : t + r;
            },
            0
          );
      return {
        set: (t, n) => {
          if (!x(n) && !n.match(/^[0-9]+$/))
            throw new Error(
              e + ".set accepts only positive integer values. Value was " + n
            );
          const o = t.dom;
          ao(o) && (o.style[e] = n + "px");
        },
        get: n,
        getOuter: n,
        aggregate: o,
        max: (e, t, n) => {
          const r = o(e, n);
          return t > r ? t - r : 0;
        },
      };
    })("height"),
    Jf = () => Cn(document),
    eg = (e, t) =>
      e.view(t).fold(N([]), (t) => {
        const n = e.owner(t),
          o = eg(e, n);
        return [t].concat(o);
      });
  var tg = Object.freeze({
    __proto__: null,
    view: (e) => {
      var t;
      return (
        e.dom === document
          ? I.none()
          : I.from(
              null === (t = e.dom.defaultView) || void 0 === t
                ? void 0
                : t.frameElement
            )
      ).map(Cn);
    },
    owner: (e) => Rn(e),
  });
  const ng = (e) => "textarea" === $t(e),
    og = (e, t) => {
      const n = ((e) => {
          const t = e.dom.ownerDocument,
            n = t.body,
            o = t.defaultView,
            r = t.documentElement;
          if (n === e.dom) return Oo(n.offsetLeft, n.offsetTop);
          const s = Bo(null == o ? void 0 : o.pageYOffset, r.scrollTop),
            a = Bo(null == o ? void 0 : o.pageXOffset, r.scrollLeft),
            i = Bo(r.clientTop, n.clientTop),
            l = Bo(r.clientLeft, n.clientLeft);
          return Po(e).translate(a - l, s - i);
        })(e),
        o = ((e) => Qf.get(e))(e);
      return { element: e, bottom: n.top + o, height: o, pos: n, cleanup: t };
    },
    rg = (e, t, n, o) => {
      lg(e, (r, s) => ag(e, t, n, o), n);
    },
    sg = (e, t, n, o, r) => {
      const s = { elm: o.element.dom, alignToTop: r };
      ((e, t) => e.dispatch("ScrollIntoView", t).isDefaultPrevented())(e, s) ||
        (n(e, t, Do(t).top, o, r),
        ((e, t) => {
          e.dispatch("AfterScrollIntoView", t);
        })(e, s));
    },
    ag = (e, t, n, o) => {
      const r = Cn(e.getBody()),
        s = Cn(e.getDoc());
      r.dom.offsetWidth;
      const a = ((e, t) => {
        const n = ((e, t) => {
            const n = In(e);
            if (0 === n.length || ng(e)) return { element: e, offset: t };
            if (t < n.length && !ng(n[t])) return { element: n[t], offset: 0 };
            {
              const o = n[n.length - 1];
              return ng(o)
                ? { element: e, offset: t }
                : "img" === $t(o)
                ? { element: o, offset: 1 }
                : Yt(o)
                ? { element: o, offset: ja(o).length }
                : { element: o, offset: In(o).length };
            }
          })(e, t),
          o = bn(
            '<span data-mce-bogus="all" style="display: inline-block;">\ufeff</span>'
          );
        return ho(n.element, o), og(o, () => Eo(o));
      })(Cn(n.startContainer), n.startOffset);
      sg(e, s, t, a, o), a.cleanup();
    },
    ig = (e, t, n, o) => {
      const r = Cn(e.getDoc());
      sg(e, r, n, ((e) => og(Cn(e), k))(t), o);
    },
    lg = (e, t, n) => {
      const o = n.startContainer,
        r = n.startOffset,
        s = n.endContainer,
        a = n.endOffset;
      t(Cn(o), Cn(s));
      const i = e.dom.createRng();
      i.setStart(o, r), i.setEnd(s, a), e.selection.setRng(n);
    },
    dg = (e, t, n, o, r) => {
      const s = t.pos;
      if (o) Lo(s.left, s.top, r);
      else {
        const o = s.top - n + t.height;
        Lo(-e.getBody().getBoundingClientRect().left, o, r);
      }
    },
    cg = (e, t, n, o, r, s) => {
      const a = o + n,
        i = r.pos.top,
        l = r.bottom,
        d = l - i >= o;
      i < n
        ? dg(e, r, o, !1 !== s, t)
        : i > a
        ? dg(e, r, o, d ? !1 !== s : !0 === s, t)
        : l > a && !d && dg(e, r, o, !0 === s, t);
    },
    ug = (e, t, n, o, r) => {
      const s = An(t).dom.innerHeight;
      cg(e, t, n, s, o, r);
    },
    mg = (e, t, n, o, r) => {
      const s = An(t).dom.innerHeight;
      cg(e, t, n, s, o, r);
      const a = ((e) => {
          const t = Jf(),
            n = Do(t),
            o = ((e, t) => {
              const n = t.owner(e);
              return eg(t, n);
            })(e, tg),
            r = Po(e),
            s = G(
              o,
              (e, t) => {
                const n = Po(t);
                return { left: e.left + n.left, top: e.top + n.top };
              },
              { left: 0, top: 0 }
            );
          return Oo(s.left + r.left + n.left, s.top + r.top + n.top);
        })(o.element),
        i = Fo(window);
      a.top < i.y
        ? Mo(o.element, !1 !== r)
        : a.top > i.bottom && Mo(o.element, !0 === r);
    },
    fg = (e, t, n) => rg(e, ug, t, n),
    gg = (e, t, n) => ig(e, t, ug, n),
    pg = (e, t, n) => rg(e, mg, t, n),
    hg = (e, t, n) => ig(e, t, mg, n),
    bg = (e, t, n) => {
      (e.inline ? fg : pg)(e, t, n);
    },
    vg = (e, t = !1) => e.dom.focus({ preventScroll: t }),
    yg = (e) => {
      const t = qn(e).dom;
      return e.dom === t.activeElement;
    },
    Cg = (e = Jf()) => I.from(e.dom.activeElement).map(Cn),
    wg = (e, t) => {
      const n = Yt(t) ? ja(t).length : In(t).length + 1;
      return e > n ? n : e < 0 ? 0 : e;
    },
    xg = (e) =>
      Df.range(
        e.start,
        wg(e.soffset, e.start),
        e.finish,
        wg(e.foffset, e.finish)
      ),
    Eg = (e, t) => !Jo(t.dom) && (Sn(e, t) || _n(e, t)),
    kg = (e) => (t) => Eg(e, t.start) && Eg(e, t.finish),
    _g = (e) =>
      Df.range(
        Cn(e.startContainer),
        e.startOffset,
        Cn(e.endContainer),
        e.endOffset
      ),
    Sg = (e) => {
      const t = document.createRange();
      try {
        return (
          t.setStart(e.start.dom, e.soffset),
          t.setEnd(e.finish.dom, e.foffset),
          I.some(t)
        );
      } catch (e) {
        return I.none();
      }
    },
    Ng = (e) => {
      const t = ((e) => e.inline || Tt.browser.isFirefox())(e)
        ? ((n = Cn(e.getBody())),
          ((e) => {
            const t = e.getSelection();
            return (
              t && 0 !== t.rangeCount ? I.from(t.getRangeAt(0)) : I.none()
            ).map(_g);
          })(An(n).dom).filter(kg(n)))
        : I.none();
      var n;
      e.bookmark = t.isSome() ? t : e.bookmark;
    },
    Rg = (e) =>
      (e.bookmark ? e.bookmark : I.none())
        .bind((t) => {
          return (
            (n = Cn(e.getBody())), (o = t), I.from(o).filter(kg(n)).map(xg)
          );
          var n, o;
        })
        .bind(Sg),
    Ag = {
      isEditorUIElement: (e) => {
        const t = e.className.toString();
        return -1 !== t.indexOf("tox-") || -1 !== t.indexOf("mce-");
      },
    },
    Tg = {
      setEditorTimeout: (e, t, n) =>
        ((e, t) => (x(t) || (t = 0), setTimeout(e, t)))(() => {
          e.removed || t();
        }, n),
      setEditorInterval: (e, t, n) => {
        const o = ((e, t) => (x(t) || (t = 0), setInterval(e, t)))(() => {
          e.removed ? clearInterval(o) : t();
        }, n);
        return o;
      },
    };
  let Og;
  const Bg = da.DOM,
    Pg = (e) => {
      const t = e.classList;
      return (
        void 0 !== t &&
        (t.contains("tox-edit-area") ||
          t.contains("tox-edit-area__iframe") ||
          t.contains("mce-content-body"))
      );
    },
    Dg = (e, t) => {
      const n = Bd(e),
        o = Bg.getParent(
          t,
          (t) =>
            ((e) => er(e) && Ag.isEditorUIElement(e))(t) ||
            (!!n && e.dom.is(t, n))
        );
      return null !== o;
    },
    Lg = (e) => {
      try {
        const t = qn(Cn(e.getElement()));
        return Cg(t).fold(
          () => document.body,
          (e) => e.dom
        );
      } catch (e) {
        return document.body;
      }
    },
    Mg = (e, t) => {
      const n = t.editor;
      ((e) => {
        const t = Ca(() => {
          Ng(e);
        }, 0);
        e.on("init", () => {
          e.inline &&
            ((e, t) => {
              const n = () => {
                t.throttle();
              };
              da.DOM.bind(document, "mouseup", n),
                e.on("remove", () => {
                  da.DOM.unbind(document, "mouseup", n);
                });
            })(e, t),
            ((e, t) => {
              ((e, t) => {
                e.on("mouseup touchend", (e) => {
                  t.throttle();
                });
              })(e, t),
                e.on("keyup NodeChange AfterSetSelectionRange", (t) => {
                  ((e) => "nodechange" === e.type && e.selectionChange)(t) ||
                    Ng(e);
                });
            })(e, t);
        }),
          e.on("remove", () => {
            t.cancel();
          });
      })(n);
      const o = (e, t) => {
        Cc(e) && !0 !== e.inline && t(Cn(e.getContainer()), "tox-edit-focus");
      };
      n.on("focusin", () => {
        const t = e.focusedEditor;
        Pg(Lg(n)) && o(n, mn),
          t !== n &&
            (t && t.dispatch("blur", { focusedEditor: n }),
            e.setActive(n),
            (e.focusedEditor = n),
            n.dispatch("focus", { blurredEditor: t }),
            n.focus(!0));
      }),
        n.on("focusout", () => {
          Tg.setEditorTimeout(n, () => {
            const t = e.focusedEditor;
            (Pg(Lg(n)) && t === n) || o(n, gn),
              Dg(n, Lg(n)) ||
                t !== n ||
                (n.dispatch("blur", { focusedEditor: null }),
                (e.focusedEditor = null));
          });
        }),
        Og ||
          ((Og = (t) => {
            const n = e.activeEditor;
            n &&
              Yn(t).each((t) => {
                const o = t;
                o.ownerDocument === document &&
                  (o === document.body ||
                    Dg(n, o) ||
                    e.focusedEditor !== n ||
                    (n.dispatch("blur", { focusedEditor: null }),
                    (e.focusedEditor = null)));
              });
          }),
          Bg.bind(document, "focusin", Og));
    },
    Ig = (e, t) => {
      e.focusedEditor === t.editor && (e.focusedEditor = null),
        !e.activeEditor &&
          Og &&
          (Bg.unbind(document, "focusin", Og), (Og = null));
    },
    Fg = (e, t) => {
      ((e, t) =>
        ((e) =>
          e.collapsed
            ? I.from(wi(e.startContainer, e.startOffset)).map(Cn)
            : I.none())(t).bind((t) =>
          Ka(t) ? I.some(t) : Sn(e, t) ? I.none() : I.some(e)
        ))(Cn(e.getBody()), t)
        .bind((e) => Hu(e.dom))
        .fold(
          () => {
            e.selection.normalize();
          },
          (t) => e.selection.setRng(t.toRange())
        );
    },
    Ug = (e) => {
      if (e.setActive)
        try {
          e.setActive();
        } catch (t) {
          e.focus();
        }
      else e.focus();
    },
    zg = (e) =>
      e.inline
        ? ((e) => {
            const t = e.getBody();
            return (
              t &&
              ((n = Cn(t)),
              yg(n) ||
                ((o = n),
                Cg(qn(o)).filter((e) => o.dom.contains(e.dom))).isSome())
            );
            var n, o;
          })(e)
        : ((e) => C(e.iframeElement) && yg(Cn(e.iframeElement)))(e),
    jg = (e) =>
      zg(e) ||
      ((e) => {
        const t = qn(Cn(e.getElement()));
        return Cg(t)
          .filter((t) => !Pg(t.dom) && Dg(e, t.dom))
          .isSome();
      })(e),
    Hg = (e) => e.editorManager.setActive(e),
    $g = (e, t) =>
      t.collapsed
        ? e.isEditable(t.startContainer)
        : e.isEditable(t.startContainer) && e.isEditable(t.endContainer),
    Vg = (e, t, n, o, r) => {
      const s = n ? t.startContainer : t.endContainer,
        a = n ? t.startOffset : t.endOffset;
      return I.from(s)
        .map(Cn)
        .map((e) => (o && t.collapsed ? e : Fn(e, r(e, a)).getOr(e)))
        .bind((e) => (Kt(e) ? I.some(e) : Tn(e).filter(Kt)))
        .map((e) => e.dom)
        .getOr(e);
    },
    qg = (e, t, n = !1) => Vg(e, t, !0, n, (e, t) => Math.min(jn(e), t)),
    Wg = (e, t, n = !1) => Vg(e, t, !1, n, (e, t) => (t > 0 ? t - 1 : t)),
    Kg = (e, t) => {
      const n = e;
      for (; e && dr(e) && 0 === e.length; )
        e = t ? e.nextSibling : e.previousSibling;
      return e || n;
    },
    Yg = (e, t) =>
      V(t, (t) => {
        const n = e.dispatch("GetSelectionRange", { range: t });
        return n.range !== t ? n.range : t;
      }),
    Gg = {
      "#text": 3,
      "#comment": 8,
      "#cdata": 4,
      "#pi": 7,
      "#doctype": 10,
      "#document-fragment": 11,
    },
    Xg = (e, t, n) => {
      const o = n ? "lastChild" : "firstChild",
        r = n ? "prev" : "next";
      if (e[o]) return e[o];
      if (e !== t) {
        let n = e[r];
        if (n) return n;
        for (let o = e.parent; o && o !== t; o = o.parent)
          if (((n = o[r]), n)) return n;
      }
    },
    Zg = (e) => {
      var t;
      const n = null !== (t = e.value) && void 0 !== t ? t : "";
      if (!Go(n)) return !1;
      const o = e.parent;
      return !o || ("span" === o.name && !o.attr("style")) || !/^[ ]+$/.test(n);
    },
    Qg = (e) => {
      const t = "a" === e.name && !e.attr("href") && e.attr("id");
      return (
        e.attr("name") ||
        (e.attr("id") && !e.firstChild) ||
        e.attr("data-mce-bookmark") ||
        t
      );
    };
  class Jg {
    static create(e, t) {
      const n = new Jg(e, Gg[e] || 1);
      return (
        t &&
          pe(t, (e, t) => {
            n.attr(t, e);
          }),
        n
      );
    }
    constructor(e, t) {
      (this.name = e),
        (this.type = t),
        1 === t && ((this.attributes = []), (this.attributes.map = {}));
    }
    replace(e) {
      const t = this;
      return e.parent && e.remove(), t.insert(e, t), t.remove(), t;
    }
    attr(e, t) {
      const n = this;
      if (!m(e))
        return (
          C(e) &&
            pe(e, (e, t) => {
              n.attr(t, e);
            }),
          n
        );
      const o = n.attributes;
      if (o) {
        if (void 0 !== t) {
          if (null === t) {
            if (e in o.map) {
              delete o.map[e];
              let t = o.length;
              for (; t--; ) if (o[t].name === e) return o.splice(t, 1), n;
            }
            return n;
          }
          if (e in o.map) {
            let n = o.length;
            for (; n--; )
              if (o[n].name === e) {
                o[n].value = t;
                break;
              }
          } else o.push({ name: e, value: t });
          return (o.map[e] = t), n;
        }
        return o.map[e];
      }
    }
    clone() {
      const e = this,
        t = new Jg(e.name, e.type),
        n = e.attributes;
      if (n) {
        const e = [];
        e.map = {};
        for (let t = 0, o = n.length; t < o; t++) {
          const o = n[t];
          "id" !== o.name &&
            ((e[e.length] = { name: o.name, value: o.value }),
            (e.map[o.name] = o.value));
        }
        t.attributes = e;
      }
      return (t.value = e.value), t;
    }
    wrap(e) {
      const t = this;
      return t.parent && (t.parent.insert(e, t), e.append(t)), t;
    }
    unwrap() {
      const e = this;
      for (let t = e.firstChild; t; ) {
        const n = t.next;
        e.insert(t, e, !0), (t = n);
      }
      e.remove();
    }
    remove() {
      const e = this,
        t = e.parent,
        n = e.next,
        o = e.prev;
      return (
        t &&
          (t.firstChild === e
            ? ((t.firstChild = n), n && (n.prev = null))
            : o && (o.next = n),
          t.lastChild === e
            ? ((t.lastChild = o), o && (o.next = null))
            : n && (n.prev = o),
          (e.parent = e.next = e.prev = null)),
        e
      );
    }
    append(e) {
      const t = this;
      e.parent && e.remove();
      const n = t.lastChild;
      return (
        n
          ? ((n.next = e), (e.prev = n), (t.lastChild = e))
          : (t.lastChild = t.firstChild = e),
        (e.parent = t),
        e
      );
    }
    insert(e, t, n) {
      e.parent && e.remove();
      const o = t.parent || this;
      return (
        n
          ? (t === o.firstChild
              ? (o.firstChild = e)
              : t.prev && (t.prev.next = e),
            (e.prev = t.prev),
            (e.next = t),
            (t.prev = e))
          : (t === o.lastChild
              ? (o.lastChild = e)
              : t.next && (t.next.prev = e),
            (e.next = t.next),
            (e.prev = t),
            (t.next = e)),
        (e.parent = o),
        e
      );
    }
    getAll(e) {
      const t = this,
        n = [];
      for (let o = t.firstChild; o; o = Xg(o, t)) o.name === e && n.push(o);
      return n;
    }
    children() {
      const e = [];
      for (let t = this.firstChild; t; t = t.next) e.push(t);
      return e;
    }
    empty() {
      const e = this;
      if (e.firstChild) {
        const t = [];
        for (let n = e.firstChild; n; n = Xg(n, e)) t.push(n);
        let n = t.length;
        for (; n--; ) {
          const e = t[n];
          e.parent = e.firstChild = e.lastChild = e.next = e.prev = null;
        }
      }
      return (e.firstChild = e.lastChild = null), e;
    }
    isEmpty(e, t = {}, n) {
      var o;
      const r = this;
      let s = r.firstChild;
      if (Qg(r)) return !1;
      if (s)
        do {
          if (1 === s.type) {
            if (s.attr("data-mce-bogus")) continue;
            if (e[s.name]) return !1;
            if (Qg(s)) return !1;
          }
          if (8 === s.type) return !1;
          if (3 === s.type && !Zg(s)) return !1;
          if (
            3 === s.type &&
            s.parent &&
            t[s.parent.name] &&
            Go(null !== (o = s.value) && void 0 !== o ? o : "")
          )
            return !1;
          if (n && n(s)) return !1;
        } while ((s = Xg(s, r)));
      return !0;
    }
    walk(e) {
      return Xg(this, null, e);
    }
  }
  const ep = Dt.makeMap(
      "NOSCRIPT STYLE SCRIPT XMP IFRAME NOEMBED NOFRAMES PLAINTEXT",
      " "
    ),
    tp = (e) => m(e.nodeValue) && e.nodeValue.includes(Qa),
    np = (e) =>
      (0 === e.length ? "" : `${V(e, (e) => `[${e}]`).join(",")},`) +
      '[data-mce-bogus="all"]',
    op = (e) =>
      document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, (e) =>
        tp(e) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
      ),
    rp = (e) =>
      document.createTreeWalker(e, NodeFilter.SHOW_TEXT, (e) => {
        if (tp(e)) {
          const t = e.parentNode;
          return t && ke(ep, t.nodeName)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_SKIP;
      }),
    sp = (e) => null !== op(e).nextNode(),
    ap = (e) => null !== rp(e).nextNode(),
    ip = (e, t) => null !== t.querySelector(np(e)),
    lp = (e, t) => {
      q(((e, t) => t.querySelectorAll(np(e)))(e, t), (t) => {
        const n = Cn(t);
        "all" === tn(n, "data-mce-bogus")
          ? Eo(n)
          : q(e, (e) => {
              on(n, e) && rn(n, e);
            });
      });
    },
    dp = (e) => {
      let t = e.nextNode();
      for (; null !== t; ) (t.nodeValue = null), (t = e.nextNode());
    },
    cp = _(dp, op),
    up = _(dp, rp),
    mp = (e, t) => {
      const n = [
        { condition: T(ip, t), action: T(lp, t) },
        { condition: sp, action: cp },
        { condition: ap, action: up },
      ];
      let o = e,
        r = !1;
      return (
        q(n, ({ condition: t, action: n }) => {
          t(o) && (r || ((o = e.cloneNode(!0)), (r = !0)), n(o));
        }),
        o
      );
    },
    fp = (e) => {
      const t = zo(e, "[data-mce-bogus]");
      q(t, (e) => {
        "all" === tn(e, "data-mce-bogus")
          ? Eo(e)
          : $a(e)
          ? (ho(e, yn(qo)), Eo(e))
          : ko(e);
      });
    },
    gp = (e) => {
      const t = zo(e, "input");
      q(t, (e) => {
        rn(e, "name");
      });
    },
    pp = (e, t, n) => {
      let o;
      return (
        (o =
          "raw" === t.format
            ? Dt.trim(ei(mp(n, e.serializer.getTempAttrs()).innerHTML))
            : "text" === t.format
            ? ((e, t) => {
                const n = e.getDoc(),
                  o = qn(Cn(e.getBody())),
                  r = vn("div", n);
                Jt(r, "data-mce-bogus", "all"),
                  co(r, { position: "fixed", left: "-9999999px", top: "0" }),
                  No(r, t.innerHTML),
                  fp(r),
                  gp(r);
                const s = ((e) => (Hn(e) ? e : Cn(Rn(e).dom.body)))(o);
                yo(s, r);
                const a = ei(r.dom.innerText);
                return Eo(r), a;
              })(e, n)
            : "tree" === t.format
            ? e.serializer.serialize(n, t)
            : ((e, t) => {
                const n = ql(e),
                  o = new RegExp(
                    `^(<${n}[^>]*>(&nbsp;|&#160;|\\s|\xa0|<br \\/>|)<\\/${n}>[\r\n]*|<br \\/>[\r\n]*)$`
                  );
                return t.replace(o, "");
              })(e, e.serializer.serialize(n, t))),
        "text" !== t.format && !Ga(Cn(n)) && m(o) ? Dt.trim(o) : o
      );
    },
    hp = Dt.makeMap,
    bp = (e) => {
      const t = [],
        n = (e = e || {}).indent,
        o = hp(e.indent_before || ""),
        r = hp(e.indent_after || ""),
        s = bs.getEncodeFunc(e.entity_encoding || "raw", e.entities),
        a = "xhtml" !== e.element_format;
      return {
        start: (e, i, l) => {
          if (n && o[e] && t.length > 0) {
            const e = t[t.length - 1];
            e.length > 0 && "\n" !== e && t.push("\n");
          }
          if ((t.push("<", e), i))
            for (let e = 0, n = i.length; e < n; e++) {
              const n = i[e];
              t.push(" ", n.name, '="', s(n.value, !0), '"');
            }
          if (
            ((t[t.length] = !l || a ? ">" : " />"),
            l && n && r[e] && t.length > 0)
          ) {
            const e = t[t.length - 1];
            e.length > 0 && "\n" !== e && t.push("\n");
          }
        },
        end: (e) => {
          let o;
          t.push("</", e, ">"),
            n &&
              r[e] &&
              t.length > 0 &&
              ((o = t[t.length - 1]),
              o.length > 0 && "\n" !== o && t.push("\n"));
        },
        text: (e, n) => {
          e.length > 0 && (t[t.length] = n ? e : s(e));
        },
        cdata: (e) => {
          t.push("<![CDATA[", e, "]]>");
        },
        comment: (e) => {
          t.push("\x3c!--", e, "--\x3e");
        },
        pi: (e, o) => {
          o ? t.push("<?", e, " ", s(o), "?>") : t.push("<?", e, "?>"),
            n && t.push("\n");
        },
        doctype: (e) => {
          t.push("<!DOCTYPE", e, ">", n ? "\n" : "");
        },
        reset: () => {
          t.length = 0;
        },
        getContent: () => t.join("").replace(/\n$/, ""),
      };
    },
    vp = (e = {}, t = Ds()) => {
      const n = bp(e);
      return (
        (e.validate = !("validate" in e) || e.validate),
        {
          serialize: (o) => {
            const r = e.validate,
              s = {
                3: (e) => {
                  var t;
                  n.text(
                    null !== (t = e.value) && void 0 !== t ? t : "",
                    e.raw
                  );
                },
                8: (e) => {
                  var t;
                  n.comment(null !== (t = e.value) && void 0 !== t ? t : "");
                },
                7: (e) => {
                  n.pi(e.name, e.value);
                },
                10: (e) => {
                  var t;
                  n.doctype(null !== (t = e.value) && void 0 !== t ? t : "");
                },
                4: (e) => {
                  var t;
                  n.cdata(null !== (t = e.value) && void 0 !== t ? t : "");
                },
                11: (e) => {
                  let t = e;
                  if ((t = t.firstChild))
                    do {
                      a(t);
                    } while ((t = t.next));
                },
              };
            n.reset();
            const a = (e) => {
              var o;
              const i = s[e.type];
              if (i) i(e);
              else {
                const s = e.name,
                  i = s in t.getVoidElements();
                let l = e.attributes;
                if (r && l && l.length > 1) {
                  const n = [];
                  n.map = {};
                  const o = t.getElementRule(e.name);
                  if (o) {
                    for (let e = 0, t = o.attributesOrder.length; e < t; e++) {
                      const t = o.attributesOrder[e];
                      if (t in l.map) {
                        const e = l.map[t];
                        (n.map[t] = e), n.push({ name: t, value: e });
                      }
                    }
                    for (let e = 0, t = l.length; e < t; e++) {
                      const t = l[e].name;
                      if (!(t in n.map)) {
                        const e = l.map[t];
                        (n.map[t] = e), n.push({ name: t, value: e });
                      }
                    }
                    l = n;
                  }
                }
                if ((n.start(s, l, i), Br(s)))
                  m(e.value) && n.text(e.value, !0), n.end(s);
                else if (!i) {
                  let t = e.firstChild;
                  if (t) {
                    ("pre" !== s && "textarea" !== s) ||
                      3 !== t.type ||
                      "\n" !==
                        (null === (o = t.value) || void 0 === o
                          ? void 0
                          : o[0]) ||
                      n.text("\n", !0);
                    do {
                      a(t);
                    } while ((t = t.next));
                  }
                  n.end(s);
                }
              }
            };
            return (
              1 !== o.type || e.inner
                ? 3 === o.type
                  ? s[3](o)
                  : s[11](o)
                : a(o),
              n.getContent()
            );
          },
        }
      );
    },
    yp = new Set();
  q(
    [
      "margin",
      "margin-left",
      "margin-right",
      "margin-top",
      "margin-bottom",
      "padding",
      "padding-left",
      "padding-right",
      "padding-top",
      "padding-bottom",
      "border",
      "border-width",
      "border-style",
      "border-color",
      "background",
      "background-attachment",
      "background-clip",
      "background-color",
      "background-image",
      "background-origin",
      "background-position",
      "background-repeat",
      "background-size",
      "float",
      "position",
      "left",
      "right",
      "top",
      "bottom",
      "z-index",
      "display",
      "transform",
      "width",
      "max-width",
      "min-width",
      "height",
      "max-height",
      "min-height",
      "overflow",
      "overflow-x",
      "overflow-y",
      "text-overflow",
      "vertical-align",
      "transition",
      "transition-delay",
      "transition-duration",
      "transition-property",
      "transition-timing-function",
    ],
    (e) => {
      yp.add(e);
    }
  );
  const Cp = ["font", "text-decoration", "text-emphasis"],
    wp = (e, t) => fe(e.parseStyle(e.getAttrib(t, "style"))),
    xp = (e, t, n) => {
      const o = wp(e, t),
        r = wp(e, n),
        s = (o) => {
          var r, s;
          const a = null !== (r = e.getStyle(t, o)) && void 0 !== r ? r : "",
            i = null !== (s = e.getStyle(n, o)) && void 0 !== s ? s : "";
          return Ge(a) && Ge(i) && a !== i;
        };
      return $(o, (e) => {
        const t = (t) => $(t, (t) => t === e);
        if (!t(r) && t(Cp)) {
          const e = Y(r, (e) => $(Cp, (t) => $e(e, t)));
          return $(e, s);
        }
        return s(e);
      });
    },
    Ep = (e, t, n) =>
      I.from(n.container())
        .filter(dr)
        .exists((o) => {
          const r = e ? 0 : -1;
          return t(o.data.charAt(n.offset() + r));
        }),
    kp = T(Ep, !0, im),
    _p = T(Ep, !1, im),
    Sp = (e) => {
      const t = e.container();
      return (
        dr(t) &&
        (0 === t.data.length || (Ja(t.data) && cf.isBookmarkNode(t.parentNode)))
      );
    },
    Np = (e, t) => (n) =>
      du(e ? 0 : -1, n)
        .filter(t)
        .isSome(),
    Rp = (e) => hr(e) && "block" === uo(Cn(e), "display"),
    Ap = (e) =>
      vr(e) && !((e) => er(e) && "all" === e.getAttribute("data-mce-bogus"))(e),
    Tp = Np(!0, Rp),
    Op = Np(!1, Rp),
    Bp = Np(!0, wr),
    Pp = Np(!1, wr),
    Dp = Np(!0, ar),
    Lp = Np(!1, ar),
    Mp = Np(!0, Ap),
    Ip = Np(!1, Ap),
    Fp = (e, t) =>
      ((e, t, n) =>
        Sn(t, e) ? Bn(e, (e) => n(e) || _n(e, t)).slice(0, -1) : [])(e, t, L),
    Up = (e, t) => [e].concat(Fp(e, t)),
    zp = (e, t, n) => Fu(e, t, n, Sp),
    jp = (e, t, n) =>
      Q(
        Up(Cn(t.container()), e),
        (
          (e) => (t) =>
            e.isBlock($t(t))
        )(n)
      ),
    Hp = (e, t, n, o) =>
      zp(e, t.dom, n).forall((e) =>
        jp(t, n, o).fold(
          () => !lu(e, n, t.dom),
          (o) => !lu(e, n, t.dom) && Sn(o, Cn(e.container()))
        )
      ),
    $p = (e, t, n, o) =>
      jp(t, n, o).fold(
        () => zp(e, t.dom, n).forall((e) => !lu(e, n, t.dom)),
        (t) => zp(e, t.dom, n).isNone()
      ),
    Vp = T($p, !1),
    qp = T($p, !0),
    Wp = T(Hp, !1),
    Kp = T(Hp, !0),
    Yp = (e) => vu(e).exists($a),
    Gp = (e, t, n, o) => {
      const r = Y(Up(Cn(n.container()), t), (e) => o.isBlock($t(e))),
        s = le(r).getOr(t);
      return Mu(e, s.dom, n).filter(Yp);
    },
    Xp = (e, t, n) => vu(t).exists($a) || Gp(!0, e, t, n).isSome(),
    Zp = (e, t, n) =>
      ((e) => I.from(e.getNode(!0)).map(Cn))(t).exists($a) ||
      Gp(!1, e, t, n).isSome(),
    Qp = T(Gp, !1),
    Jp = T(Gp, !0),
    eh = (e) => Qi.isTextPosition(e) && !e.isAtStart() && !e.isAtEnd(),
    th = (e, t, n) => {
      const o = Y(Up(Cn(t.container()), e), (e) => n.isBlock($t(e)));
      return le(o).getOr(e);
    },
    nh = (e, t, n) =>
      eh(t) ? _p(t) : _p(t) || ju(th(e, t, n).dom, t).exists(_p),
    oh = (e, t, n) =>
      eh(t) ? kp(t) : kp(t) || zu(th(e, t, n).dom, t).exists(kp),
    rh = (e) =>
      vu(e)
        .bind((e) => Jn(e, Kt))
        .exists((e) =>
          ((e) => H(["pre", "pre-wrap"], e))(uo(e, "white-space"))
        ),
    sh = (e, t) => (n) => {
      return (o = new Vo(n, e)[t]()), C(o) && vr(o) && Zc(o);
      var o;
    },
    ah = (e, t, n) =>
      !rh(t) &&
      (((e, t, n) =>
        ((e, t) => ju(e.dom, t).isNone())(e, t) ||
        ((e, t) => zu(e.dom, t).isNone())(e, t) ||
        Vp(e, t, n) ||
        qp(e, t, n) ||
        Zp(e, t, n) ||
        Xp(e, t, n))(e, t, n) ||
        nh(e, t, n) ||
        oh(e, t, n)),
    ih = (e, t, n) =>
      !rh(t) &&
      (Vp(e, t, n) ||
        Wp(e, t, n) ||
        Zp(e, t, n) ||
        nh(e, t, n) ||
        ((e, t) => {
          const n = ju(e.dom, t).getOr(t),
            o = sh(e.dom, "prev");
          return t.isAtStart() && (o(t.container()) || o(n.container()));
        })(e, t)),
    lh = (e, t, n) =>
      !rh(t) &&
      (qp(e, t, n) ||
        Kp(e, t, n) ||
        Xp(e, t, n) ||
        oh(e, t, n) ||
        ((e, t) => {
          const n = zu(e.dom, t).getOr(t),
            o = sh(e.dom, "next");
          return t.isAtEnd() && (o(t.container()) || o(n.container()));
        })(e, t)),
    dh = (e, t, n) =>
      ih(e, t, n) ||
      lh(
        e,
        ((e) => {
          const t = e.container(),
            n = e.offset();
          return dr(t) && n < t.data.length ? Qi(t, n + 1) : e;
        })(t),
        n
      ),
    ch = (e, t) => sm(e.charAt(t)),
    uh = (e, t) => im(e.charAt(t)),
    mh = (e, t, n, o) => {
      const r = t.data,
        s = Qi(t, 0);
      return n || !ch(r, 0) || dh(e, s, o)
        ? !!(n && uh(r, 0) && ih(e, s, o)) && ((t.data = Wo + r.slice(1)), !0)
        : ((t.data = " " + r.slice(1)), !0);
    },
    fh = (e, t, n, o) => {
      const r = t.data,
        s = Qi(t, r.length - 1);
      return n || !ch(r, r.length - 1) || dh(e, s, o)
        ? !!(n && uh(r, r.length - 1) && lh(e, s, o)) &&
            ((t.data = r.slice(0, -1) + Wo), !0)
        : ((t.data = r.slice(0, -1) + " "), !0);
    },
    gh = (e, t, n) => {
      const o = t.container();
      if (!dr(o)) return I.none();
      if (
        ((e) => {
          const t = e.container();
          return dr(t) && He(t.data, Wo);
        })(t)
      ) {
        const r =
          mh(e, o, !1, n) ||
          ((e) => {
            const t = e.data,
              n = ((e) => {
                const t = e.split("");
                return V(t, (e, n) =>
                  sm(e) &&
                  n > 0 &&
                  n < t.length - 1 &&
                  lm(t[n - 1]) &&
                  lm(t[n + 1])
                    ? " "
                    : e
                ).join("");
              })(t);
            return n !== t && ((e.data = n), !0);
          })(o) ||
          fh(e, o, !1, n);
        return Ft(r, t);
      }
      if (dh(e, t, n)) {
        const r = mh(e, o, !0, n) || fh(e, o, !0, n);
        return Ft(r, t);
      }
      return I.none();
    },
    ph = (e, t, n, o) => {
      if (0 === n) return;
      const r = Cn(e),
        s = Qn(r, (e) => o.isBlock($t(e))).getOr(r),
        a = e.data.slice(t, t + n),
        i = t + n >= e.data.length && lh(s, Qi(e, e.data.length), o),
        l = 0 === t && ih(s, Qi(e, 0), o);
      e.replaceData(t, n, Zo(a, 4, l, i));
    },
    hh = (e, t, n) => {
      const o = e.data.slice(t),
        r = o.length - Ke(o).length;
      ph(e, t, r, n);
    },
    bh = (e, t, n) => {
      const o = e.data.slice(0, t),
        r = o.length - Ye(o).length;
      ph(e, t - r, r, n);
    },
    vh = (e, t, n, o, r = !0) => {
      const s = Ye(e.data).length,
        a = r ? e : t,
        i = r ? t : e;
      return (
        r ? a.appendData(i.data) : a.insertData(0, i.data),
        Eo(Cn(i)),
        o && hh(a, s, n),
        a
      );
    },
    yh = (e, t) =>
      ((e, t) => {
        const n = e.container(),
          o = e.offset();
        return (
          !Qi.isTextPosition(e) &&
          n === t.parentNode &&
          o > Qi.before(t).offset()
        );
      })(t, e)
        ? Qi(t.container(), t.offset() - 1)
        : t,
    Ch = (e) => {
      return Bi(e.previousSibling)
        ? I.some(
            ((t = e.previousSibling),
            dr(t) ? Qi(t, t.data.length) : Qi.after(t))
          )
        : e.previousSibling
        ? $u(e.previousSibling)
        : I.none();
      var t;
    },
    wh = (e) => {
      return Bi(e.nextSibling)
        ? I.some(((t = e.nextSibling), dr(t) ? Qi(t, 0) : Qi.before(t)))
        : e.nextSibling
        ? Hu(e.nextSibling)
        : I.none();
      var t;
    },
    xh = (e, t, n) =>
      ((e, t, n) =>
        e
          ? ((e, t) =>
              wh(t)
                .orThunk(() => Ch(t))
                .orThunk(() =>
                  ((e, t) =>
                    zu(e, Qi.after(t)).orThunk(() => ju(e, Qi.before(t))))(e, t)
                ))(t, n)
          : ((e, t) =>
              Ch(t)
                .orThunk(() => wh(t))
                .orThunk(() =>
                  ((e, t) =>
                    I.from(t.previousSibling ? t.previousSibling : t.parentNode)
                      .bind((t) => ju(e, Qi.before(t)))
                      .orThunk(() => zu(e, Qi.after(t))))(e, t)
                ))(t, n))(e, t, n).map(T(yh, n)),
    Eh = (e, t, n) => {
      n.fold(
        () => {
          e.focus();
        },
        (n) => {
          e.selection.setRng(n.toRange(), t);
        }
      );
    },
    kh = (e, t) => t && ke(e.schema.getBlockElements(), $t(t)),
    _h = (e, t, n, o = !0, r = !1) => {
      const s = xh(t, e.getBody(), n.dom),
        a = Qn(n, T(kh, e), ((i = e.getBody()), (e) => e.dom === i));
      var i;
      const l = ((e, t, n, o) => {
        const r = Pn(e).filter(Yt),
          s = Dn(e).filter(Yt);
        return (
          Eo(e),
          ((a = r),
          (i = s),
          (l = t),
          (d = (e, t, r) => {
            const s = e.dom,
              a = t.dom,
              i = s.data.length;
            return vh(s, a, n, o), r.container() === a ? Qi(s, i) : r;
          }),
          a.isSome() && i.isSome() && l.isSome()
            ? I.some(d(a.getOrDie(), i.getOrDie(), l.getOrDie()))
            : I.none()).orThunk(
            () => (
              o &&
                (r.each((e) => bh(e.dom, e.dom.length, n)),
                s.each((e) => hh(e.dom, 0, n))),
              t
            )
          )
        );
        var a, i, l, d;
      })(
        n,
        s,
        e.schema,
        ((e, t) => ke(e.schema.getTextInlineElements(), $t(t)))(e, n)
      );
      e.dom.isEmpty(e.getBody())
        ? (e.setContent(""), e.selection.setCursorLocation())
        : a
            .bind((t) =>
              ((e, t, n) => {
                if (Tr(e, t)) {
                  const e = bn('<br data-mce-bogus="1">');
                  return (
                    n
                      ? q(In(t), (e) => {
                          jm(e) || Eo(e);
                        })
                      : xo(t),
                    yo(t, e),
                    I.some(Qi.before(e.dom))
                  );
                }
                return I.none();
              })(e.schema, t, r)
            )
            .fold(
              () => {
                o && Eh(e, t, l);
              },
              (n) => {
                o && Eh(e, t, I.some(n));
              }
            );
    },
    Sh = /[\u0591-\u07FF\uFB1D-\uFDFF\uFE70-\uFEFC]/,
    Nh = (e, t) => En(Cn(t), bd(e)) && !Kr(e.schema, t) && e.dom.isEditable(t),
    Rh = (e) => {
      var t;
      return (
        "rtl" === da.DOM.getStyle(e, "direction", !0) ||
        ((e) => Sh.test(e))(
          null !== (t = e.textContent) && void 0 !== t ? t : ""
        )
      );
    },
    Ah = (e, t, n) => {
      const o = ((e, t, n) => Y(da.DOM.getParents(n.container(), "*", t), e))(
        e,
        t,
        n
      );
      return I.from(o[o.length - 1]);
    },
    Th = (e, t) => {
      const n = t.container(),
        o = t.offset();
      return e
        ? ri(n)
          ? dr(n.nextSibling)
            ? Qi(n.nextSibling, 0)
            : Qi.after(n)
          : ii(t)
          ? Qi(n, o + 1)
          : t
        : ri(n)
        ? dr(n.previousSibling)
          ? Qi(n.previousSibling, n.previousSibling.data.length)
          : Qi.before(n)
        : li(t)
        ? Qi(n, o - 1)
        : t;
    },
    Oh = T(Th, !0),
    Bh = T(Th, !1),
    Ph = (e, t) => {
      const n = (e) => e.stopImmediatePropagation();
      e.on("beforeinput input", n, !0),
        e.getDoc().execCommand(t),
        e.off("beforeinput input", n);
    },
    Dh = (e) => Ph(e, "Delete"),
    Lh = (e) => Va(e) || Wa(e),
    Mh = (e, t) =>
      Sn(e, t)
        ? Jn(
            t,
            Lh,
            (
              (e) => (t) =>
                Lt(Tn(t), e, _n)
            )(e)
          )
        : I.none(),
    Ih = (e, t = !0) => {
      e.dom.isEmpty(e.getBody()) && e.setContent("", { no_selection: !t });
    },
    Fh = (e, t, n) =>
      It(Hu(n), $u(n), (o, r) => {
        const s = Th(!0, o),
          a = Th(!1, r),
          i = Th(!1, t);
        return e
          ? zu(n, i).exists((e) => e.isEqual(a) && t.isEqual(s))
          : ju(n, i).exists((e) => e.isEqual(s) && t.isEqual(a));
      }).getOr(!0),
    Uh = (e) => {
      var t;
      return (8 === Vt((t = e)) || "#comment" === $t(t) ? Pn(e) : zn(e))
        .bind(Uh)
        .orThunk(() => I.some(e));
    },
    zh = (e, t, n, o = !0) => {
      var r;
      t.deleteContents();
      const s = Uh(n).getOr(n),
        a = Cn(
          null !== (r = e.dom.getParent(s.dom, e.dom.isBlock)) && void 0 !== r
            ? r
            : n.dom
        );
      if (
        (a.dom === e.getBody()
          ? Ih(e, o)
          : Tr(e.schema, a, { checkRootAsContent: !1 }) &&
            (Za(a), o && e.selection.setCursorLocation(a.dom, 0)),
        !_n(n, a))
      ) {
        const t = Lt(Tn(a), n)
          ? []
          : Tn((i = a))
              .map(In)
              .map((e) => Y(e, (e) => !_n(i, e)))
              .getOr([]);
        q(t.concat(In(n)), (t) => {
          _n(t, a) || Sn(t, a) || !Tr(e.schema, t) || Eo(t);
        });
      }
      var i;
    },
    jh = (e) => zo(e, "td,th"),
    Hh = (e, t) => mm(Cn(e), t),
    $h = (e, t) => ({ start: e, end: t }),
    Vh = El([
      { singleCellTable: ["rng", "cell"] },
      { fullTable: ["table"] },
      { partialTable: ["cells", "outsideDetails"] },
      { multiTable: ["startTableCells", "endTableCells", "betweenRng"] },
    ]),
    qh = (e, t) => oo(Cn(e), "td,th", t),
    Wh = (e) => !_n(e.start, e.end),
    Kh = (e, t) =>
      mm(e.start, t).bind((n) => mm(e.end, t).bind((e) => Ft(_n(n, e), n))),
    Yh = (e) => (t) =>
      Kh(t, e).map((e) =>
        ((e, t, n) => ({ rng: e, table: t, cells: n }))(t, e, jh(e))
      ),
    Gh = (e, t, n, o) => {
      if (n.collapsed || !e.forall(Wh)) return I.none();
      if (t.isSameTable) {
        const t = e.bind(Yh(o));
        return I.some({ start: t, end: t });
      }
      {
        const e = qh(n.startContainer, o),
          t = qh(n.endContainer, o),
          r = e
            .bind(
              (
                (e) => (t) =>
                  mm(t, e).bind((e) => de(jh(e)).map((e) => $h(t, e)))
              )(o)
            )
            .bind(Yh(o)),
          s = t
            .bind(
              (
                (e) => (t) =>
                  mm(t, e).bind((e) => le(jh(e)).map((e) => $h(e, t)))
              )(o)
            )
            .bind(Yh(o));
        return I.some({ start: r, end: s });
      }
    },
    Xh = (e, t) => J(e, (e) => _n(e, t)),
    Zh = (e) =>
      It(Xh(e.cells, e.rng.start), Xh(e.cells, e.rng.end), (t, n) =>
        e.cells.slice(t, n + 1)
      ),
    Qh = (e, t) => {
      const { startTable: n, endTable: o } = t,
        r = e.cloneRange();
      return (
        n.each((e) => r.setStartAfter(e.dom)),
        o.each((e) => r.setEndBefore(e.dom)),
        r
      );
    },
    Jh = (e, t) => {
      const n = (
          (e) => (t) =>
            _n(e, t)
        )(e),
        o = ((e, t) => {
          const n = qh(e.startContainer, t),
            o = qh(e.endContainer, t);
          return It(n, o, $h);
        })(t, n),
        r = ((e, t) => {
          const n = Hh(e.startContainer, t),
            o = Hh(e.endContainer, t),
            r = n.isSome(),
            s = o.isSome(),
            a = It(n, o, _n).getOr(!1);
          return ((e) =>
            It(e.startTable, e.endTable, (t, n) => {
              const o = $o(t, (e) => _n(e, n)),
                r = $o(n, (e) => _n(e, t));
              return o || r
                ? {
                    ...e,
                    startTable: o ? I.none() : e.startTable,
                    endTable: r ? I.none() : e.endTable,
                    isSameTable: !1,
                    isMultiTable: !1,
                  }
                : e;
            }).getOr(e))({
            startTable: n,
            endTable: o,
            isStartInTable: r,
            isEndInTable: s,
            isSameTable: a,
            isMultiTable: !a && r && s,
          });
        })(t, n);
      return ((e, t, n) =>
        e.exists(
          (e) =>
            ((e, t) =>
              !Wh(e) &&
              Kh(e, t).exists((e) => {
                const t = e.dom.rows;
                return 1 === t.length && 1 === t[0].cells.length;
              }))(e, n) && pm(e.start, t)
        ))(o, t, n)
        ? o.map((e) => Vh.singleCellTable(t, e.start))
        : r.isMultiTable
        ? ((e, t, n, o) =>
            Gh(e, t, n, o).bind(({ start: e, end: o }) => {
              const r = e.bind(Zh).getOr([]),
                s = o.bind(Zh).getOr([]);
              if (r.length > 0 && s.length > 0) {
                const e = Qh(n, t);
                return I.some(Vh.multiTable(r, s, e));
              }
              return I.none();
            }))(o, r, t, n)
        : ((e, t, n, o) =>
            Gh(e, t, n, o)
              .bind(({ start: e, end: t }) => e.or(t))
              .bind((e) => {
                const { isSameTable: o } = t,
                  r = Zh(e).getOr([]);
                if (o && e.cells.length === r.length)
                  return I.some(Vh.fullTable(e.table));
                if (r.length > 0) {
                  if (o) return I.some(Vh.partialTable(r, I.none()));
                  {
                    const e = Qh(n, t);
                    return I.some(Vh.partialTable(r, I.some({ ...t, rng: e })));
                  }
                }
                return I.none();
              }))(o, r, t, n);
    },
    eb = (e) =>
      q(e, (e) => {
        rn(e, "contenteditable"), Za(e);
      }),
    tb = (e, t, n, o) => {
      const r = n.cloneRange();
      o
        ? (r.setStart(n.startContainer, n.startOffset),
          r.setEndAfter(t.dom.lastChild))
        : (r.setStartBefore(t.dom.firstChild),
          r.setEnd(n.endContainer, n.endOffset)),
        sb(e, r, t, !1).each((e) => e());
    },
    nb = (e) => {
      const t = um(e),
        n = Cn(e.selection.getNode());
      yr(n.dom) && Tr(e.schema, n)
        ? e.selection.setCursorLocation(n.dom, 0)
        : e.selection.collapse(!0),
        t.length > 1 &&
          $(t, (e) => _n(e, n)) &&
          Jt(n, "data-mce-selected", "1");
    },
    ob = (e, t, n) =>
      I.some(() => {
        const o = e.selection.getRng(),
          r = n
            .bind(({ rng: n, isStartInTable: r }) => {
              const s = ((e, t) =>
                I.from(e.dom.getParent(t, e.dom.isBlock)).map(Cn))(
                e,
                r ? n.endContainer : n.startContainer
              );
              n.deleteContents(),
                ((e, t, n) => {
                  n.each((n) => {
                    t
                      ? Eo(n)
                      : (Za(n), e.selection.setCursorLocation(n.dom, 0));
                  });
                })(e, r, s.filter(T(Tr, e.schema)));
              const a = r ? t[0] : t[t.length - 1];
              return (
                tb(e, a, o, r),
                Tr(e.schema, a)
                  ? I.none()
                  : I.some(r ? t.slice(1) : t.slice(0, -1))
              );
            })
            .getOr(t);
        eb(r), nb(e);
      }),
    rb = (e, t, n, o) =>
      I.some(() => {
        const r = e.selection.getRng(),
          s = t[0],
          a = n[n.length - 1];
        tb(e, s, r, !0), tb(e, a, r, !1);
        const i = Tr(e.schema, s) ? t : t.slice(1),
          l = Tr(e.schema, a) ? n : n.slice(0, -1);
        eb(i.concat(l)), o.deleteContents(), nb(e);
      }),
    sb = (e, t, n, o = !0) =>
      I.some(() => {
        zh(e, t, n, o);
      }),
    ab = (e, t) => I.some(() => _h(e, !1, t)),
    ib = (e, t) => Q(Up(t, e), Ya),
    lb = (e, t) => Q(Up(t, e), Zt("caption")),
    db = (e, t) =>
      I.some(() => {
        Za(t), e.selection.setCursorLocation(t.dom, 0);
      }),
    cb = (e, t) => (e ? Dp(t) : Lp(t)),
    ub = (e, t, n) => {
      const o = Cn(e.getBody());
      return lb(o, n).fold(
        () =>
          ((e, t, n, o) => {
            const r = Qi.fromRangeStart(e.selection.getRng());
            return ib(n, o).bind((o) =>
              Tr(e.schema, o, { checkRootAsContent: !1 })
                ? db(e, o)
                : ((e, t, n, o, r) =>
                    Iu(n, e.getBody(), r).bind((e) =>
                      ib(t, Cn(e.getNode())).bind((e) =>
                        _n(e, o) ? I.none() : I.some(k)
                      )
                    ))(e, n, t, o, r)
            );
          })(e, t, o, n).orThunk(() =>
            Ft(
              ((e, t) => {
                const n = Qi.fromRangeStart(e.selection.getRng());
                return (
                  cb(t, n) || Mu(t, e.getBody(), n).exists((e) => cb(t, e))
                );
              })(e, t),
              k
            )
          ),
        (n) =>
          ((e, t, n, o) => {
            const r = Qi.fromRangeStart(e.selection.getRng());
            return Tr(e.schema, o)
              ? db(e, o)
              : ((e, t, n, o, r) =>
                  Iu(n, e.getBody(), r).fold(
                    () => I.some(k),
                    (s) =>
                      ((e, t, n, o) =>
                        Hu(e.dom)
                          .bind((r) =>
                            $u(e.dom).map((e) =>
                              t
                                ? n.isEqual(r) && o.isEqual(e)
                                : n.isEqual(e) && o.isEqual(r)
                            )
                          )
                          .getOr(!0))(o, n, r, s)
                        ? ((e, t) => db(e, t))(e, o)
                        : ((e, t, n) =>
                            lb(e, Cn(n.getNode())).fold(
                              () => I.some(k),
                              (e) => Ft(!_n(e, t), k)
                            ))(t, o, s)
                  ))(e, n, t, o, r);
          })(e, t, o, n)
      );
    },
    mb = (e, t) => {
      const n = Cn(e.selection.getStart(!0)),
        o = um(e);
      return e.selection.isCollapsed() && 0 === o.length
        ? ub(e, t, n)
        : ((e, t, n) => {
            const o = Cn(e.getBody()),
              r = e.selection.getRng();
            return 0 !== n.length
              ? ob(e, n, I.none())
              : ((e, t, n, o) =>
                  lb(t, o).fold(
                    () =>
                      ((e, t, n) =>
                        Jh(t, n).bind((t) =>
                          t.fold(T(sb, e), T(ab, e), T(ob, e), T(rb, e))
                        ))(e, t, n),
                    (t) => ((e, t) => db(e, t))(e, t)
                  ))(e, o, r, t);
          })(e, n, o);
    },
    fb = (e, t) => {
      let n = t;
      for (; n && n !== e; ) {
        if (br(n) || vr(n)) return n;
        n = n.parentNode;
      }
      return null;
    },
    gb = ["data-ephox-", "data-mce-", "data-alloy-", "data-snooker-", "_"],
    pb = Dt.each,
    hb = (e) => {
      const t = e.dom,
        n = new Set(e.serializer.getTempAttrs()),
        o = (e) => $(gb, (t) => $e(e, t)) || n.has(e);
      return {
        compare: (e, n) => {
          if (e.nodeName !== n.nodeName || e.nodeType !== n.nodeType) return !1;
          const r = (e) => {
              const n = {};
              return (
                pb(t.getAttribs(e), (r) => {
                  const s = r.nodeName.toLowerCase();
                  "style" === s || o(s) || (n[s] = t.getAttrib(e, s));
                }),
                n
              );
            },
            s = (e, t) => {
              for (const n in e)
                if (ke(e, n)) {
                  const o = t[n];
                  if (v(o)) return !1;
                  if (e[n] !== o) return !1;
                  delete t[n];
                }
              for (const e in t) if (ke(t, e)) return !1;
              return !0;
            };
          if (er(e) && er(n)) {
            if (!s(r(e), r(n))) return !1;
            if (
              !s(
                t.parseStyle(t.getAttrib(e, "style")),
                t.parseStyle(t.getAttrib(n, "style"))
              )
            )
              return !1;
          }
          return !rm(e) && !rm(n);
        },
        isAttributeInternal: o,
      };
    },
    bb = (e) => ["h1", "h2", "h3", "h4", "h5", "h6"].includes(e.name),
    vb = (e, t, n, o) => {
      const r = n.name;
      for (let t = 0, s = e.length; t < s; t++) {
        const s = e[t];
        if (s.name === r) {
          const e = o.nodes[r];
          e ? e.nodes.push(n) : (o.nodes[r] = { filter: s, nodes: [n] });
        }
      }
      if (n.attributes)
        for (let e = 0, r = t.length; e < r; e++) {
          const r = t[e],
            s = r.name;
          if (s in n.attributes.map) {
            const e = o.attributes[s];
            e ? e.nodes.push(n) : (o.attributes[s] = { filter: r, nodes: [n] });
          }
        }
    },
    yb = (e, t) => {
      const n = (e, n) => {
        pe(e, (e) => {
          const o = ce(e.nodes);
          q(e.filter.callbacks, (r) => {
            for (let t = o.length - 1; t >= 0; t--) {
              const r = o[t];
              ((n
                ? void 0 !== r.attr(e.filter.name)
                : r.name === e.filter.name) &&
                !y(r.parent)) ||
                o.splice(t, 1);
            }
            o.length > 0 && r(o, e.filter.name, t);
          });
        });
      };
      n(e.nodes, !1), n(e.attributes, !0);
    },
    Cb = (e, t, n, o = {}) => {
      const r = ((e, t, n) => {
        const o = { nodes: {}, attributes: {} };
        return (
          n.firstChild &&
            ((n, r) => {
              let s = n;
              for (; (s = s.walk()); ) vb(e, t, s, o);
            })(n),
          o
        );
      })(e, t, n);
      yb(r, o);
    },
    wb = (e, t, n, o) => {
      if ((e.pad_empty_with_br || t.insert) && n(o)) {
        const e = new Jg("br", 1);
        t.insert && e.attr("data-mce-bogus", "1"), o.empty().append(e);
      } else o.empty().append(new Jg("#text", 3)).value = Wo;
    },
    xb = (e, t) => {
      const n = null == e ? void 0 : e.firstChild;
      return C(n) && n === e.lastChild && n.name === t;
    },
    Eb = (e, t, n, o) =>
      o.isEmpty(t, n, (t) =>
        ((e, t) => {
          const n = e.getElementRule(t.name);
          return !0 === (null == n ? void 0 : n.paddEmpty);
        })(e, t)
      ),
    kb = (e) => {
      let t;
      for (let n = e; n; n = n.parent) {
        const e = n.attr("contenteditable");
        if ("false" === e) break;
        "true" === e && (t = n);
      }
      return I.from(t);
    },
    _b = (e, t, n = e.parent) => {
      if (t.getSpecialElements()[e.name]) e.empty().remove();
      else {
        const o = e.children();
        for (const e of o) n && !t.isValidChild(n.name, e.name) && _b(e, t, n);
        e.unwrap();
      }
    },
    Sb = (e, t, n, o = k) => {
      const r = t.getTextBlockElements(),
        s = t.getNonEmptyElements(),
        a = t.getWhitespaceElements(),
        i = Dt.makeMap("tr,td,th,tbody,thead,tfoot,table,summary"),
        l = new Set(),
        d = (e) => e !== n && !i[e.name];
      for (let n = 0; n < e.length; n++) {
        const i = e[n];
        let c, u, m;
        if (!i.parent || l.has(i)) continue;
        if (r[i.name] && "li" === i.parent.name) {
          let e = i.next;
          for (; e && r[e.name]; )
            (e.name = "li"),
              l.add(e),
              i.parent.insert(e, i.parent),
              (e = e.next);
          i.unwrap();
          continue;
        }
        const f = [i];
        for (
          c = i.parent;
          c && !t.isValidChild(c.name, i.name) && d(c);
          c = c.parent
        )
          f.push(c);
        if (c && f.length > 1)
          if (Nb(t, i, c)) _b(i, t);
          else {
            f.reverse(), (u = f[0].clone()), o(u);
            let e = u;
            for (let n = 0; n < f.length - 1; n++) {
              t.isValidChild(e.name, f[n].name) && n > 0
                ? ((m = f[n].clone()), o(m), e.append(m))
                : (m = e);
              for (let e = f[n].firstChild; e && e !== f[n + 1]; ) {
                const t = e.next;
                m.append(e), (e = t);
              }
              e = m;
            }
            Eb(t, s, a, u)
              ? c.insert(i, f[0], !0)
              : (c.insert(u, f[0], !0), c.insert(i, u)),
              (c = f[0]),
              (Eb(t, s, a, c) || xb(c, "br")) && c.empty().remove();
          }
        else if (i.parent) {
          if ("li" === i.name) {
            let e = i.prev;
            if (e && ("ul" === e.name || "ol" === e.name)) {
              e.append(i);
              continue;
            }
            if (
              ((e = i.next),
              e && ("ul" === e.name || "ol" === e.name) && e.firstChild)
            ) {
              e.insert(i, e.firstChild, !0);
              continue;
            }
            const t = new Jg("ul", 1);
            o(t), i.wrap(t);
            continue;
          }
          if (
            t.isValidChild(i.parent.name, "div") &&
            t.isValidChild("div", i.name)
          ) {
            const e = new Jg("div", 1);
            o(e), i.wrap(e);
          } else _b(i, t);
        }
      }
    },
    Nb = (e, t, n = t.parent) =>
      !(
        !n ||
        ((!e.children[t.name] || e.isValidChild(n.name, t.name)) &&
          ("a" !== t.name ||
            !((e, t) => {
              let n = e;
              for (; n; ) {
                if ("a" === n.name) return !0;
                n = n.parent;
              }
              return !1;
            })(n)) &&
          (!((e) => "summary" === e.name)(n) ||
            !bb(t) ||
            ((null == n ? void 0 : n.firstChild) === t &&
              (null == n ? void 0 : n.lastChild) === t)))
      ),
    Rb = (e) =>
      e.collapsed
        ? e
        : ((e) => {
            const t = Qi.fromRangeStart(e),
              n = Qi.fromRangeEnd(e),
              o = e.commonAncestorContainer;
            return Mu(!1, o, n)
              .map((r) =>
                !lu(t, n, o) && lu(t, r, o)
                  ? ((e, t, n, o) => {
                      const r = document.createRange();
                      return r.setStart(e, t), r.setEnd(n, o), r;
                    })(t.container(), t.offset(), r.container(), r.offset())
                  : e
              )
              .getOr(e);
          })(e),
    Ab = (e, t) => {
      let n = t.firstChild,
        o = t.lastChild;
      return (
        n && "meta" === n.name && (n = n.next),
        o && "mce_marker" === o.attr("id") && (o = o.prev),
        ((e, t) => {
          const n = e.getNonEmptyElements();
          return (
            C(t) &&
            (t.isEmpty(n) ||
              ((e, t) =>
                e.getBlockElements()[t.name] &&
                ((e) => C(e.firstChild) && e.firstChild === e.lastChild)(t) &&
                ((e) => "br" === e.name || e.value === Wo)(t.firstChild))(e, t))
          );
        })(e, o) && (o = null == o ? void 0 : o.prev),
        !(!n || n !== o || ("ul" !== n.name && "ol" !== n.name))
      );
    },
    Tb = (e) => {
      return e.length > 0 &&
        (!(n = e[e.length - 1]).firstChild ||
          (C(null == (t = n) ? void 0 : t.firstChild) &&
            t.firstChild === t.lastChild &&
            ((e) => e.data === Wo || pr(e))(t.firstChild)))
        ? e.slice(0, -1)
        : e;
      var t, n;
    },
    Ob = (e, t) => {
      const n = e.getParent(t, e.isBlock);
      return n && "LI" === n.nodeName ? n : null;
    },
    Bb = (e, t) => {
      const n = Qi.after(e),
        o = Bu(t).prev(n);
      return o ? o.toRange() : null;
    },
    Pb = (e, t, n, o) => {
      const r = ((e, t, n) => {
          const o = t.serialize(n);
          return ((e) => {
            var t, n;
            const o = e.firstChild,
              r = e.lastChild;
            return (
              o &&
                "META" === o.nodeName &&
                (null === (t = o.parentNode) ||
                  void 0 === t ||
                  t.removeChild(o)),
              r &&
                "mce_marker" === r.id &&
                (null === (n = r.parentNode) ||
                  void 0 === n ||
                  n.removeChild(r)),
              e
            );
          })(e.createFragment(o));
        })(t, e, o),
        s = Ob(t, n.startContainer),
        a = Tb(
          ((i = r.firstChild),
          Y(
            null !== (l = null == i ? void 0 : i.childNodes) && void 0 !== l
              ? l
              : [],
            (e) => "LI" === e.nodeName
          ))
        );
      var i, l;
      const d = t.getRoot(),
        c = (e) => {
          const o = Qi.fromRangeStart(n),
            r = Bu(t.getRoot()),
            a = 1 === e ? r.prev(o) : r.next(o),
            i = null == a ? void 0 : a.getNode();
          return !i || Ob(t, i) !== s;
        };
      return s
        ? c(1)
          ? ((e, t, n) => {
              const o = e.parentNode;
              return (
                o &&
                  Dt.each(t, (t) => {
                    o.insertBefore(t, e);
                  }),
                ((e, t) => {
                  const n = Qi.before(e),
                    o = Bu(t).next(n);
                  return o ? o.toRange() : null;
                })(e, n)
              );
            })(s, a, d)
          : c(2)
          ? ((e, t, n, o) => (o.insertAfter(t.reverse(), e), Bb(t[0], n)))(
              s,
              a,
              d,
              t
            )
          : ((e, t, n, o) => {
              const r = ((e, t) => {
                  const n = t.cloneRange(),
                    o = t.cloneRange();
                  return (
                    n.setStartBefore(e),
                    o.setEndAfter(e),
                    [n.cloneContents(), o.cloneContents()]
                  );
                })(e, o),
                s = e.parentNode;
              return (
                s &&
                  (s.insertBefore(r[0], e),
                  Dt.each(t, (t) => {
                    s.insertBefore(t, e);
                  }),
                  s.insertBefore(r[1], e),
                  s.removeChild(e)),
                Bb(t[t.length - 1], n)
              );
            })(s, a, d, n)
        : null;
    },
    Db = ["pre"],
    Lb = yr,
    Mb = (e, t, n) => {
      var o, r;
      const s = e.selection,
        a = e.dom,
        i = e.parser,
        l = n.merge,
        d = vp({ validate: !0 }, e.schema),
        c = '<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;</span>';
      n.preserve_zwsp || (t = ei(t)),
        -1 === t.indexOf("{$caret}") && (t += "{$caret}"),
        (t = t.replace(/\{\$caret\}/, c));
      let u = s.getRng();
      const m = u.startContainer,
        f = e.getBody();
      m === f &&
        s.isCollapsed() &&
        a.isBlock(f.firstChild) &&
        ((e, t) => C(t) && !e.schema.getVoidElements()[t.nodeName])(
          e,
          f.firstChild
        ) &&
        a.isEmpty(f.firstChild) &&
        ((u = a.createRng()),
        u.setStart(f.firstChild, 0),
        u.setEnd(f.firstChild, 0),
        s.setRng(u)),
        s.isCollapsed() ||
          ((e) => {
            const t = e.dom,
              n = Rb(e.selection.getRng());
            e.selection.setRng(n);
            const o = t.getParent(n.startContainer, Lb);
            ((e, t, n) =>
              !!C(n) && n === e.getParent(t.endContainer, Lb) && pm(Cn(n), t))(
              t,
              n,
              o
            )
              ? sb(e, n, Cn(o))
              : n.startContainer === n.endContainer &&
                n.endOffset - n.startOffset == 1 &&
                dr(n.startContainer.childNodes[n.startOffset])
              ? n.deleteContents()
              : e.getDoc().execCommand("Delete", !1);
          })(e);
      const g = s.getNode(),
        p = { context: g.nodeName.toLowerCase(), data: n.data, insert: !0 },
        h = i.parse(t, p);
      if (!0 === n.paste && Ab(e.schema, h) && ((e, t) => !!Ob(e, t))(a, g))
        return (u = Pb(d, a, s.getRng(), h)), u && s.setRng(u), t;
      !0 === n.paste &&
        ((e, t, n, o) => {
          var r;
          const s = t.firstChild,
            a = t.lastChild,
            i = s === ("bookmark" === a.attr("data-mce-type") ? a.prev : a),
            l = H(Db, s.name);
          if (i && l) {
            const t = "false" !== s.attr("contenteditable"),
              a =
                (null === (r = e.getParent(n, e.isBlock)) || void 0 === r
                  ? void 0
                  : r.nodeName.toLowerCase()) === s.name,
              i = I.from(fb(o, n)).forall(br);
            return t && a && i;
          }
          return !1;
        })(a, h, g, e.getBody()) &&
        (null === (o = h.firstChild) || void 0 === o || o.unwrap()),
        ((e) => {
          let t = e;
          for (; (t = t.walk()); )
            1 === t.type && t.attr("data-mce-fragment", "1");
        })(h);
      let b = h.lastChild;
      if (b && "mce_marker" === b.attr("id")) {
        const t = b;
        for (b = b.prev; b; b = b.walk(!0))
          if (3 === b.type || !a.isBlock(b.name)) {
            b.parent &&
              e.schema.isValidChild(b.parent.name, "span") &&
              b.parent.insert(t, b, "br" === b.name);
            break;
          }
      }
      if (
        (e._selectionOverrides.showBlockCaretContainer(g),
        p.invalid ||
          ((e, t, n) => {
            var o;
            return (
              $(n.children(), bb) &&
              "SUMMARY" ===
                (null === (o = e.getParent(t, e.isBlock)) || void 0 === o
                  ? void 0
                  : o.nodeName)
            );
          })(a, g, h))
      ) {
        e.selection.setContent(c);
        let n,
          o = s.getNode();
        const l = e.getBody();
        for (fr(o) ? (o = n = l) : (n = o); n && n !== l; )
          (o = n), (n = n.parentNode);
        t = o === l ? l.innerHTML : a.getOuterHTML(o);
        const u = i.parse(t),
          m = ((e) => {
            for (let t = e; t; t = t.walk())
              if ("mce_marker" === t.attr("id")) return I.some(t);
            return I.none();
          })(u),
          f = m.bind(kb).getOr(u);
        m.each((e) => e.replace(h));
        const g = h.children(),
          p = null !== (r = h.parent) && void 0 !== r ? r : u;
        h.unwrap();
        const b = Y(g, (t) => Nb(e.schema, t, p));
        Sb(b, e.schema, f),
          Cb(i.getNodeFilters(), i.getAttributeFilters(), u),
          (t = d.serialize(u)),
          o === l ? a.setHTML(l, t) : a.setOuterHTML(o, t);
      } else
        (t = d.serialize(h)),
          ((e, t, n) => {
            var o;
            if ("all" === n.getAttribute("data-mce-bogus"))
              null === (o = n.parentNode) ||
                void 0 === o ||
                o.insertBefore(e.dom.createFragment(t), n);
            else {
              const o = n.firstChild,
                r = n.lastChild;
              !o || (o === r && "BR" === o.nodeName)
                ? e.dom.setHTML(n, t)
                : e.selection.setContent(t, { no_events: !0 });
            }
          })(e, t, g);
      var v;
      return (
        ((e, t) => {
          const n = e.schema.getTextInlineElements(),
            o = e.dom;
          if (t) {
            const t = e.getBody(),
              r = hb(e);
            Dt.each(o.select("*[data-mce-fragment]"), (e) => {
              if (
                C(n[e.nodeName.toLowerCase()]) &&
                ((e, t) => ne(wp(e, t), (e) => !((e) => yp.has(e))(e)))(o, e)
              )
                for (
                  let n = e.parentElement;
                  C(n) && n !== t && !xp(o, e, n);
                  n = n.parentElement
                )
                  if (r.compare(n, e)) {
                    o.remove(e, !0);
                    break;
                  }
            });
          }
        })(e, l),
        ((e, t) => {
          var n, o, r;
          let s;
          const a = e.dom,
            i = e.selection;
          if (!t) return;
          i.scrollIntoView(t);
          const l = fb(e.getBody(), t);
          if (l && "false" === a.getContentEditable(l))
            return a.remove(t), void i.select(l);
          let d = a.createRng();
          const c = t.previousSibling;
          if (dr(c)) {
            d.setStart(
              c,
              null !==
                (o =
                  null === (n = c.nodeValue) || void 0 === n
                    ? void 0
                    : n.length) && void 0 !== o
                ? o
                : 0
            );
            const e = t.nextSibling;
            dr(e) &&
              (c.appendData(e.data),
              null === (r = e.parentNode) || void 0 === r || r.removeChild(e));
          } else d.setStartBefore(t), d.setEndBefore(t);
          const u = a.getParent(t, a.isBlock);
          if ((a.remove(t), u && a.isEmpty(u))) {
            const t = Lb(u);
            xo(Cn(u)),
              d.setStart(u, 0),
              d.setEnd(u, 0),
              t ||
              ((e) => !!e.getAttribute("data-mce-fragment"))(u) ||
              !(s = ((t) => {
                let n = Qi.fromRangeStart(t);
                return (
                  (n = Bu(e.getBody()).next(n)),
                  null == n ? void 0 : n.toRange()
                );
              })(d))
                ? a.add(u, a.create("br", t ? {} : { "data-mce-bogus": "1" }))
                : ((d = s), a.remove(u));
          }
          i.setRng(d);
        })(e, a.get("mce_marker")),
        (v = e.getBody()),
        Dt.each(v.getElementsByTagName("*"), (e) => {
          e.removeAttribute("data-mce-fragment");
        }),
        ((e, t, n) => {
          I.from(e.getParent(t, "td,th"))
            .map(Cn)
            .each((e) =>
              ((e, t) => {
                zn(e).each((n) => {
                  Pn(n).each((o) => {
                    t.isBlock($t(e)) && $a(n) && t.isBlock($t(o)) && Eo(n);
                  });
                });
              })(e, n)
            );
        })(a, s.getStart(), e.schema),
        ((e, t, n) => {
          const o = Bn(Cn(n), (e) => _n(e, Cn(t)));
          ie(o, o.length - 2)
            .filter(Kt)
            .fold(
              () => Hr(e, t),
              (t) => Hr(e, t.dom)
            );
        })(e.schema, e.getBody(), s.getStart()),
        t
      );
    },
    Ib = (e) => e instanceof Jg,
    Fb = (e, t, n) => {
      e.dom.setHTML(e.getBody(), t),
        !0 !== n &&
          ((e) => {
            zg(e) &&
              Hu(e.getBody()).each((t) => {
                const n = t.getNode(),
                  o = ar(n) ? Hu(n).getOr(t) : t;
                e.selection.setRng(o.toRange());
              });
          })(e);
    },
    Ub = (e) => (w(e) ? e : L),
    zb = (e, t, n) => {
      const o = t(e),
        r = Ub(n);
      return o.orThunk(() =>
        r(e)
          ? I.none()
          : ((e, t, n) => {
              let o = e.dom;
              const r = Ub(n);
              for (; o.parentNode; ) {
                o = o.parentNode;
                const e = Cn(o),
                  n = t(e);
                if (n.isSome()) return n;
                if (r(e)) break;
              }
              return I.none();
            })(e, t, r)
      );
    },
    jb = Tm,
    Hb = (e, t, n) => {
      const o = e.formatter.get(n);
      if (o)
        for (let n = 0; n < o.length; n++) {
          const r = o[n];
          if (Im(r) && !1 === r.inherit && e.dom.is(t, r.selector)) return !0;
        }
      return !1;
    },
    $b = (e, t, n, o, r) => {
      const s = e.dom.getRoot();
      if (t === s) return !1;
      const a = e.dom.getParent(
        t,
        (t) => !!Hb(e, t, n) || t.parentNode === s || !!Wb(e, t, n, o, !0)
      );
      return !!Wb(e, a, n, o, r);
    },
    Vb = (e, t, n) =>
      !(!Fm(n) || !jb(t, n.inline)) ||
      !(!Mm(n) || !jb(t, n.block)) ||
      (!!Im(n) && er(t) && e.is(t, n.selector)),
    qb = (e, t, n, o, r, s) => {
      const a = n[o],
        i = "attributes" === o;
      if (w(n.onmatch)) return n.onmatch(t, n, o);
      if (a)
        if (Ne(a)) {
          for (let n = 0; n < a.length; n++)
            if (i ? e.getAttrib(t, a[n]) : Bm(e, t, a[n])) return !0;
        } else
          for (const o in a)
            if (ke(a, o)) {
              const l = i ? e.getAttrib(t, o) : Bm(e, t, o),
                d = Am(a[o], s),
                c = y(l) || Xe(l);
              if (c && y(d)) continue;
              if (r && c && !n.exact) return !1;
              if ((!r || n.exact) && !jb(l, Om(d, o))) return !1;
            }
      return !0;
    },
    Wb = (e, t, n, o, r) => {
      const s = e.formatter.get(n),
        a = e.dom;
      if (s && er(t))
        for (let n = 0; n < s.length; n++) {
          const i = s[n];
          if (
            Vb(e.dom, t, i) &&
            qb(a, t, i, "attributes", r, o) &&
            qb(a, t, i, "styles", r, o)
          ) {
            const n = i.classes;
            if (n)
              for (let r = 0; r < n.length; r++)
                if (!e.dom.hasClass(t, Am(n[r], o))) return;
            return i;
          }
        }
    },
    Kb = (e, t, n, o, r) => {
      if (o) return $b(e, o, t, n, r);
      if (((o = e.selection.getNode()), $b(e, o, t, n, r))) return !0;
      const s = e.selection.getStart();
      return !(s === o || !$b(e, s, t, n, r));
    },
    Yb = Qa,
    Gb = (e) => {
      if (e) {
        const t = new Vo(e, e);
        for (let e = t.current(); e; e = t.next()) if (dr(e)) return e;
      }
      return null;
    },
    Xb = (e) => {
      const t = vn("span");
      return (
        en(t, {
          id: Vu,
          "data-mce-bogus": "1",
          "data-mce-type": "format-caret",
        }),
        e && yo(t, yn(Yb)),
        t
      );
    },
    Zb = (e, t, n) => {
      const o = e.dom,
        r = e.selection;
      if (zm(t)) _h(e, !1, Cn(t), n, !0);
      else {
        const e = r.getRng(),
          n = o.getParent(t, o.isBlock),
          s = e.startContainer,
          a = e.startOffset,
          i = e.endContainer,
          l = e.endOffset,
          d = ((e) => {
            const t = Gb(e);
            return t && t.data.charAt(0) === Yb && t.deleteData(0, 1), t;
          })(t);
        o.remove(t, !0),
          s === d && a > 0 && e.setStart(d, a - 1),
          i === d && l > 0 && e.setEnd(d, l - 1),
          n && o.isEmpty(n) && Za(Cn(n)),
          r.setRng(e);
      }
    },
    Qb = (e, t, n) => {
      const o = e.dom,
        r = e.selection;
      if (t) Zb(e, t, n);
      else if (!(t = Wu(e.getBody(), r.getStart())))
        for (; (t = o.get(Vu)); ) Zb(e, t, n);
    },
    Jb = (e, t) => (e.appendChild(t), t),
    ev = (e, t) => {
      var n;
      const o = G(e, (e, t) => Jb(e, t.cloneNode(!1)), t),
        r = null !== (n = o.ownerDocument) && void 0 !== n ? n : document;
      return Jb(o, r.createTextNode(Yb));
    },
    tv = (e, t, n, o) => {
      const a = e.dom,
        i = e.selection;
      let l = !1;
      const d = e.formatter.get(t);
      if (!d) return;
      const c = i.getRng(),
        u = c.startContainer,
        m = c.startOffset;
      let f = u;
      dr(u) && (m !== u.data.length && (l = !0), (f = f.parentNode));
      const g = [];
      let h;
      for (; f; ) {
        if (Wb(e, f, t, n, o)) {
          h = f;
          break;
        }
        f.nextSibling && (l = !0), g.push(f), (f = f.parentNode);
      }
      if (h)
        if (l) {
          const r = i.getBookmark();
          c.collapse(!0);
          let s = nf(a, c, d, !0);
          (s = Xf(s)), e.formatter.remove(t, n, s, o), i.moveToBookmark(r);
        } else {
          const l = Wu(e.getBody(), h),
            d = C(l) ? a.getParents(h.parentNode, M, l) : [],
            c = Xb(!1).dom;
          ((e, t, n) => {
            var o, r;
            const s = e.dom,
              a = s.getParent(n, T(_m, e.schema));
            a && s.isEmpty(a)
              ? null === (o = n.parentNode) ||
                void 0 === o ||
                o.replaceChild(t, n)
              : (((e) => {
                  const t = zo(e, "br"),
                    n = Y(
                      ((e) => {
                        const t = [];
                        let n = e.dom;
                        for (; n; ) t.push(Cn(n)), (n = n.lastChild);
                        return t;
                      })(e).slice(-1),
                      $a
                    );
                  t.length === n.length && q(n, Eo);
                })(Cn(n)),
                s.isEmpty(n)
                  ? null === (r = n.parentNode) ||
                    void 0 === r ||
                    r.replaceChild(t, n)
                  : s.insertAfter(t, n));
          })(e, c, null != l ? l : h);
          const u = ((e, t, n, o, a, i) => {
              const l = e.formatter,
                d = e.dom,
                c = Y(fe(l.get()), (e) => e !== o && !He(e, "removeformat")),
                u = ((e, t, n) =>
                  X(
                    n,
                    (n, o) => {
                      const r = ((e, t) =>
                        Lm(e, t, (e) => {
                          const t = (e) =>
                            w(e) || (e.length > 1 && "%" === e.charAt(0));
                          return $(["styles", "attributes"], (n) =>
                            Ee(e, n).exists((e) => {
                              const n = p(e) ? e : xe(e);
                              return $(n, t);
                            })
                          );
                        }))(e, o);
                      return e.formatter.matchNode(t, o, {}, r)
                        ? n.concat([o])
                        : n;
                    },
                    []
                  ))(e, n, c);
              if (
                Y(
                  u,
                  (t) =>
                    !((e, t, n) => {
                      const o = [
                          "inline",
                          "block",
                          "selector",
                          "attributes",
                          "styles",
                          "classes",
                        ],
                        a = (e) => Ce(e, (e, t) => $(o, (e) => e === t));
                      return Lm(e, t, (t) => {
                        const o = a(t);
                        return Lm(e, n, (e) => {
                          const t = a(e);
                          return ((e, t, n = s) => r(n).eq(e, t))(o, t);
                        });
                      });
                    })(e, t, o)
                ).length > 0
              ) {
                const e = n.cloneNode(!1);
                return (
                  d.add(t, e), l.remove(o, a, e, i), d.remove(e), I.some(e)
                );
              }
              return I.none();
            })(e, c, h, t, n, o),
            m = ev([...g, ...u.toArray(), ...d], c);
          l && Zb(e, l, C(l)),
            i.setCursorLocation(m, 1),
            a.isEmpty(h) && a.remove(h);
        }
    },
    nv = (e) => {
      const t = Xb(!1),
        n = ev(e, t.dom);
      return { caretContainer: t, caretPosition: Qi(n, 0) };
    },
    ov = (e, t) => {
      const { caretContainer: n, caretPosition: o } = nv(t);
      return ho(Cn(e), n), Eo(Cn(e)), o;
    },
    rv = (e, t) => {
      if (qu(t.dom)) return !1;
      const n = e.schema.getTextInlineElements();
      return ke(n, $t(t)) && !qu(t.dom) && !sr(t.dom);
    },
    sv = {},
    av = or(["pre"]);
  ((e, t) => {
    sv[e] || (sv[e] = []),
      sv[e].push((e) => {
        if (!e.selection.getRng().collapsed) {
          const t = e.selection.getSelectedBlocks(),
            n = Y(
              Y(t, av),
              ((e) => (t) => {
                const n = t.previousSibling;
                return av(n) && H(e, n);
              })(t)
            );
          q(n, (e) => {
            ((e, t) => {
              const n = Cn(t),
                o = Rn(n).dom;
              Eo(n), wo(Cn(e), [vn("br", o), vn("br", o), ...In(n)]);
            })(e.previousSibling, e);
          });
        }
      });
  })("pre");
  const iv = ["fontWeight", "fontStyle", "color", "fontSize", "fontFamily"],
    lv = (e, t) => {
      const n = e.get(t);
      return p(n)
        ? Q(
            n,
            (e) =>
              Fm(e) &&
              "span" === e.inline &&
              ((e) => f(e.styles) && $(fe(e.styles), (e) => H(iv, e)))(e)
          )
        : I.none();
    },
    dv = (e, t) => ju(t, Qi.fromRangeStart(e)).isNone(),
    cv = (e, t) =>
      !1 ===
      zu(t, Qi.fromRangeEnd(e)).exists(
        (e) => !pr(e.getNode()) || zu(t, e).isSome()
      ),
    uv = (e) => (t) => xr(t) && e.isEditable(t),
    mv = (e) => Y(e.getSelectedBlocks(), uv(e.dom)),
    fv = Dt.each,
    gv = (e) => er(e) && !rm(e) && !qu(e) && !sr(e),
    pv = (e, t) => {
      for (let n = e; n; n = n[t]) {
        if (dr(n) && Ge(n.data)) return e;
        if (er(n) && !rm(n)) return n;
      }
      return e;
    },
    hv = (e, t, n) => {
      const o = hb(e),
        r = tr(t) && e.dom.isEditable(t),
        s = tr(n) && e.dom.isEditable(n);
      if (r && s) {
        const r = pv(t, "previousSibling"),
          s = pv(n, "nextSibling");
        if (o.compare(r, s)) {
          for (let e = r.nextSibling; e && e !== s; ) {
            const t = e;
            (e = e.nextSibling), r.appendChild(t);
          }
          return (
            e.dom.remove(s),
            Dt.each(Dt.grep(s.childNodes), (e) => {
              r.appendChild(e);
            }),
            r
          );
        }
      }
      return n;
    },
    bv = (e, t, n, o) => {
      var r;
      if (o && !1 !== t.merge_siblings) {
        const t = null !== (r = hv(e, km(o), o)) && void 0 !== r ? r : o;
        hv(e, t, km(t, !0));
      }
    },
    vv = (e, t, n) => {
      fv(e.childNodes, (e) => {
        gv(e) && (t(e) && n(e), e.hasChildNodes() && vv(e, t, n));
      });
    },
    yv = (e, t) => (n) => !(!n || !Bm(e, n, t)),
    Cv = (e, t, n) => (o) => {
      e.setStyle(o, t, n),
        "" === o.getAttribute("style") && o.removeAttribute("style"),
        ((e, t) => {
          "SPAN" === t.nodeName &&
            0 === e.getAttribs(t).length &&
            e.remove(t, !0);
        })(e, o);
    },
    wv = El([{ keep: [] }, { rename: ["name"] }, { removed: [] }]),
    xv = /^(src|href|style)$/,
    Ev = Dt.each,
    kv = Tm,
    _v = (e, t, n) => e.isChildOf(t, n) && t !== n && !e.isBlock(n),
    Sv = (e, t, n) => {
      let o = t[n ? "startContainer" : "endContainer"],
        r = t[n ? "startOffset" : "endOffset"];
      if (er(o)) {
        const e = o.childNodes.length - 1;
        !n && r && r--, (o = o.childNodes[r > e ? e : r]);
      }
      return (
        dr(o) &&
          n &&
          r >= o.data.length &&
          (o = new Vo(o, e.getBody()).next() || o),
        dr(o) && !n && 0 === r && (o = new Vo(o, e.getBody()).prev() || o),
        o
      );
    },
    Nv = (e, t) => {
      const n = t ? "firstChild" : "lastChild",
        o = e[n];
      return ((e) => /^(TR|TH|TD)$/.test(e.nodeName))(e) && o
        ? ("TR" === e.nodeName && o[n]) || o
        : e;
    },
    Rv = (e, t, n, o) => {
      var r;
      const s = e.create(n, o);
      return (
        null === (r = t.parentNode) || void 0 === r || r.insertBefore(s, t),
        s.appendChild(t),
        s
      );
    },
    Av = (e, t, n, o, r) => {
      const s = Cn(t),
        a = Cn(e.create(o, r)),
        i = n ? Mn(s) : Ln(s);
      return wo(a, i), n ? (ho(s, a), vo(a, s)) : (bo(s, a), yo(a, s)), a.dom;
    },
    Tv = (e, t, n) => {
      const o = t.parentNode;
      let r;
      const s = e.dom,
        a = ql(e);
      Mm(n) &&
        o === s.getRoot() &&
        ((n.list_block && kv(t, n.list_block)) ||
          q(ce(t.childNodes), (t) => {
            Sm(e, a, t.nodeName.toLowerCase())
              ? r
                ? r.appendChild(t)
                : ((r = Rv(s, t, a)), s.setAttribs(r, Wl(e)))
              : (r = null);
          })),
        (((e) => Im(e) && Fm(e) && Lt(Ee(e, "mixed"), !0))(n) &&
          !kv(n.inline, t)) ||
          s.remove(t, !0);
    },
    Ov = (e, t, n) =>
      x(e) ? { name: t, value: null } : { name: e, value: Am(t, n) },
    Bv = (e, t) => {
      "" === e.getAttrib(t, "style") &&
        (t.removeAttribute("style"), t.removeAttribute("data-mce-style"));
    },
    Pv = (e, t, n, o, r) => {
      let s = !1;
      Ev(n.styles, (a, i) => {
        const { name: l, value: d } = Ov(i, a, o),
          c = Om(d, l);
        (n.remove_similar || h(d) || !er(r) || kv(Bm(e, r, l), c)) &&
          e.setStyle(t, l, ""),
          (s = !0);
      }),
        s && Bv(e, t);
    },
    Dv = (e, t, n, o, r) => {
      const s = e.dom,
        a = hb(e),
        i = e.schema;
      if (
        Fm(t) &&
        qr(i, t.inline) &&
        Kr(i, o) &&
        o.parentElement === e.getBody()
      )
        return Tv(e, o, t), wv.removed();
      if (!t.ceFalseOverride && o && "false" === s.getContentEditableParent(o))
        return wv.keep();
      if (o && !Vb(s, o, t) && !((e, t) => t.links && "A" === e.nodeName)(o, t))
        return wv.keep();
      const l = o,
        d = t.preserve_attributes;
      if (Fm(t) && "all" === t.remove && p(d)) {
        const e = Y(s.getAttribs(l), (e) => H(d, e.name.toLowerCase()));
        if (
          (s.removeAllAttribs(l),
          q(e, (e) => s.setAttrib(l, e.name, e.value)),
          e.length > 0)
        )
          return wv.rename("span");
      }
      if ("all" !== t.remove) {
        Pv(s, l, t, n, r),
          Ev(t.attributes, (e, o) => {
            const { name: a, value: i } = Ov(o, e, n);
            if (
              t.remove_similar ||
              h(i) ||
              !er(r) ||
              kv(s.getAttrib(r, a), i)
            ) {
              if ("class" === a) {
                const e = s.getAttrib(l, a);
                if (e) {
                  let t = "";
                  if (
                    (q(e.split(/\s+/), (e) => {
                      /mce\-\w+/.test(e) && (t += (t ? " " : "") + e);
                    }),
                    t)
                  )
                    return void s.setAttrib(l, a, t);
                }
              }
              if (
                (xv.test(a) && l.removeAttribute("data-mce-" + a),
                "style" === a &&
                  or(["li"])(l) &&
                  "none" === s.getStyle(l, "list-style-type"))
              )
                return (
                  l.removeAttribute(a),
                  void s.setStyle(l, "list-style-type", "none")
                );
              "class" === a && l.removeAttribute("className"),
                l.removeAttribute(a);
            }
          }),
          Ev(t.classes, (e) => {
            (e = Am(e, n)), (er(r) && !s.hasClass(r, e)) || s.removeClass(l, e);
          });
        const e = s.getAttribs(l);
        for (let t = 0; t < e.length; t++) {
          const n = e[t].nodeName;
          if (!a.isAttributeInternal(n)) return wv.keep();
        }
      }
      return "none" !== t.remove ? (Tv(e, l, t), wv.removed()) : wv.keep();
    },
    Lv = (e, t, n, o) =>
      Dv(e, t, n, o, o).fold(
        N(o),
        (t) => (e.dom.createFragment().appendChild(o), e.dom.rename(o, t)),
        N(null)
      ),
    Mv = (e, t, n, o, r) => {
      (o || e.selection.isEditable()) &&
        ((e, t, n, o, r) => {
          const s = e.formatter.get(t),
            a = s[0],
            i = e.dom,
            l = e.selection,
            d = (o) => {
              const i = ((e, t, n, o, r) => {
                let s;
                return (
                  t.parentNode &&
                    q(Dm(e.dom, t.parentNode).reverse(), (t) => {
                      if (!s && er(t) && "_start" !== t.id && "_end" !== t.id) {
                        const a = Wb(e, t, n, o, r);
                        a && !1 !== a.split && (s = t);
                      }
                    }),
                  s
                );
              })(e, o, t, n, r);
              return ((e, t, n, o, r, s, a, i) => {
                var l, d;
                let c, u;
                const m = e.dom;
                if (n) {
                  const s = n.parentNode;
                  for (let n = o.parentNode; n && n !== s; n = n.parentNode) {
                    let o = m.clone(n, !1);
                    for (
                      let n = 0;
                      n < t.length && ((o = Lv(e, t[n], i, o)), null !== o);
                      n++
                    );
                    o && (c && o.appendChild(c), u || (u = o), (c = o));
                  }
                  (a.mixed && m.isBlock(n)) ||
                    (o = null !== (l = m.split(n, o)) && void 0 !== l ? l : o),
                    c &&
                      u &&
                      (null === (d = r.parentNode) ||
                        void 0 === d ||
                        d.insertBefore(c, r),
                      u.appendChild(r),
                      Fm(a) && bv(e, a, 0, c));
                }
                return o;
              })(e, s, i, o, o, 0, a, n);
            },
            c = (t) => $(s, (o) => Iv(e, o, n, t, t)),
            u = (t) => {
              const n = ce(t.childNodes),
                o = c(t) || $(s, (e) => Vb(i, t, e)),
                r = t.parentNode;
              if ((!o && C(r) && Um(a) && c(r), a.deep && n.length))
                for (let e = 0; e < n.length; e++) u(n[e]);
              q(["underline", "line-through", "overline"], (n) => {
                er(t) &&
                  e.dom.getStyle(t, "text-decoration") === n &&
                  t.parentNode &&
                  Pm(i, t.parentNode) === n &&
                  Iv(
                    e,
                    {
                      deep: !1,
                      exact: !0,
                      inline: "span",
                      styles: { textDecoration: n },
                    },
                    void 0,
                    t
                  );
              });
            },
            m = (e) => {
              const t = i.get(e ? "_start" : "_end");
              if (t) {
                let n = t[e ? "firstChild" : "lastChild"];
                return (
                  ((e) =>
                    rm(e) && er(e) && ("_start" === e.id || "_end" === e.id))(
                    n
                  ) && (n = n[e ? "firstChild" : "lastChild"]),
                  dr(n) &&
                    0 === n.data.length &&
                    (n = e
                      ? t.previousSibling || t.nextSibling
                      : t.nextSibling || t.previousSibling),
                  i.remove(t, !0),
                  n
                );
              }
              return null;
            },
            f = (t) => {
              let n,
                o,
                r = nf(i, t, s, t.collapsed);
              if (a.split) {
                if (
                  ((r = Xf(r)), (n = Sv(e, r, !0)), (o = Sv(e, r)), n !== o)
                ) {
                  if (((n = Nv(n, !0)), (o = Nv(o, !1)), _v(i, n, o))) {
                    const e = I.from(n.firstChild).getOr(n);
                    return (
                      d(
                        Av(i, e, !0, "span", {
                          id: "_start",
                          "data-mce-type": "bookmark",
                        })
                      ),
                      void m(!0)
                    );
                  }
                  if (_v(i, o, n)) {
                    const e = I.from(o.lastChild).getOr(o);
                    return (
                      d(
                        Av(i, e, !1, "span", {
                          id: "_end",
                          "data-mce-type": "bookmark",
                        })
                      ),
                      void m(!1)
                    );
                  }
                  (n = Rv(i, n, "span", {
                    id: "_start",
                    "data-mce-type": "bookmark",
                  })),
                    (o = Rv(i, o, "span", {
                      id: "_end",
                      "data-mce-type": "bookmark",
                    }));
                  const e = i.createRng();
                  e.setStartAfter(n),
                    e.setEndBefore(o),
                    of(i, e, (e) => {
                      q(e, (e) => {
                        rm(e) || rm(e.parentNode) || d(e);
                      });
                    }),
                    d(n),
                    d(o),
                    (n = m(!0)),
                    (o = m());
                } else n = o = d(n);
                (r.startContainer = n.parentNode ? n.parentNode : n),
                  (r.startOffset = i.nodeIndex(n)),
                  (r.endContainer = o.parentNode ? o.parentNode : o),
                  (r.endOffset = i.nodeIndex(o) + 1);
              }
              of(i, r, (e) => {
                q(e, u);
              });
            };
          if (o) {
            if (Cm(o)) {
              const e = i.createRng();
              e.setStartBefore(o), e.setEndAfter(o), f(e);
            } else f(o);
            gf(e, t, o, n);
          } else
            l.isCollapsed() && Fm(a) && !um(e).length
              ? tv(e, t, n, r)
              : (xm(
                  e,
                  () => vm(e, f),
                  (o) => Fm(a) && Kb(e, t, n, o)
                ),
                e.nodeChanged()),
              ((e, t, n) => {
                "removeformat" === t
                  ? q(mv(e.selection), (t) => {
                      q(iv, (n) => e.dom.setStyle(t, n, "")), Bv(e.dom, t);
                    })
                  : lv(e.formatter, t).each((t) => {
                      q(mv(e.selection), (o) => Pv(e.dom, o, t, n, null));
                    });
              })(e, t, n),
              gf(e, t, o, n);
        })(e, t, n, o, r);
    },
    Iv = (e, t, n, o, r) =>
      Dv(e, t, n, o, r).fold(L, (t) => (e.dom.rename(o, t), !0), M),
    Fv = Dt.each,
    Uv = Dt.each,
    zv = (e, t, n, o) => {
      if (
        (Uv(n.styles, (n, r) => {
          e.setStyle(t, r, Am(n, o));
        }),
        n.styles)
      ) {
        const n = e.getAttrib(t, "style");
        n && e.setAttrib(t, "data-mce-style", n);
      }
    },
    jv = (e, t, n, o) => {
      const r = e.formatter.get(t),
        s = r[0],
        a = !o && e.selection.isCollapsed(),
        i = e.dom,
        l = e.selection,
        d = (e, t = s) => {
          w(t.onformat) && t.onformat(e, t, n, o),
            zv(i, e, t, n),
            Uv(t.attributes, (t, o) => {
              i.setAttrib(e, o, Am(t, n));
            }),
            Uv(t.classes, (t) => {
              const o = Am(t, n);
              i.hasClass(e, o) || i.addClass(e, o);
            });
        },
        c = (e, t) => {
          let n = !1;
          return (
            Uv(
              e,
              (e) =>
                !(
                  !Im(e) ||
                  (("false" !== i.getContentEditable(t) || e.ceFalseOverride) &&
                    (!C(e.collapsed) || e.collapsed === a) &&
                    i.is(t, e.selector) &&
                    !qu(t) &&
                    (d(t, e), (n = !0), 1))
                )
            ),
            n
          );
        },
        u = (e) => {
          if (m(e)) {
            const t = i.create(e);
            return d(t), t;
          }
          return null;
        },
        f = (o, a, i) => {
          const l = [];
          let m = !0;
          const f = s.inline || s.block,
            g = u(f);
          of(o, a, (a) => {
            let u;
            const p = (a) => {
              let h = !1,
                b = m,
                v = !1;
              const y = a.parentNode,
                w = y.nodeName.toLowerCase(),
                x = o.getContentEditable(a);
              C(x) && ((b = m), (m = "true" === x), (h = !0), (v = Rm(e, a)));
              const E = m && !h;
              if (
                pr(a) &&
                !((e, t, n, o) => {
                  if (Td(e) && Fm(t) && n.parentNode) {
                    const t = Bs(e.schema),
                      r = Ho(Cn(n), (e) => qu(e.dom));
                    return (
                      _e(t, o) &&
                      Ar(e.schema, n.parentNode, {
                        skipBogus: !1,
                        includeZwsp: !0,
                      }) &&
                      !r
                    );
                  }
                  return !1;
                })(e, s, a, w)
              )
                return (u = null), void (Mm(s) && o.remove(a));
              if (
                ((o) =>
                  ((e) => Mm(e) && !0 === e.wrapper)(s) && Wb(e, o, t, n))(a)
              )
                u = null;
              else {
                if (
                  ((t, n, o) => {
                    const r =
                      ((e) => Mm(e) && !0 !== e.wrapper)(s) &&
                      _m(e.schema, t) &&
                      Sm(e, n, f);
                    return o && r;
                  })(a, w, E)
                ) {
                  const e = o.rename(a, f);
                  return d(e), l.push(e), void (u = null);
                }
                if (Im(s)) {
                  let e = c(r, a);
                  if ((!e && C(y) && Um(s) && (e = c(r, y)), !Fm(s) || e))
                    return void (u = null);
                }
                C(g) &&
                ((t, n, r, a) => {
                  const l = t.nodeName.toLowerCase(),
                    d = Sm(e, f, l) && Sm(e, n, f),
                    c = !i && dr(t) && Ja(t.data),
                    u = qu(t),
                    m = !Fm(s) || !o.isBlock(t);
                  return (r || a) && d && !c && !u && m;
                })(a, w, E, v)
                  ? (u ||
                      ((u = o.clone(g, !1)), y.insertBefore(u, a), l.push(u)),
                    v && h && (m = b),
                    u.appendChild(a))
                  : ((u = null),
                    q(ce(a.childNodes), p),
                    h && (m = b),
                    (u = null));
              }
            };
            q(a, p);
          }),
            !0 === s.links &&
              q(l, (e) => {
                const t = (e) => {
                  "A" === e.nodeName && d(e, s), q(ce(e.childNodes), t);
                };
                t(e);
              }),
            q(l, (a) => {
              const i = ((e) => {
                let t = 0;
                return (
                  q(e.childNodes, (e) => {
                    ((e) => C(e) && dr(e) && 0 === e.length)(e) || rm(e) || t++;
                  }),
                  t
                );
              })(a);
              (!(l.length > 1) && o.isBlock(a)) || 0 !== i
                ? (Fm(s) || (Mm(s) && s.wrapper)) &&
                  (s.exact ||
                    1 !== i ||
                    (a = ((e) => {
                      const t = Q(e.childNodes, wm).filter(
                        (e) =>
                          "false" !== o.getContentEditable(e) && Vb(o, e, s)
                      );
                      return t
                        .map((t) => {
                          const n = o.clone(t, !1);
                          return d(n), o.replace(n, e, !0), o.remove(t, !0), n;
                        })
                        .getOr(e);
                    })(a)),
                  ((e, t, n, o) => {
                    Fv(t, (t) => {
                      Fm(t) &&
                        Fv(e.dom.select(t.inline, o), (o) => {
                          gv(o) && Iv(e, t, n, o, t.exact ? o : null);
                        }),
                        ((e, t, n) => {
                          if (t.clear_child_styles) {
                            const o = t.links ? "*:not(a)" : "*";
                            fv(e.select(o, n), (n) => {
                              gv(n) &&
                                e.isEditable(n) &&
                                fv(t.styles, (t, o) => {
                                  e.setStyle(n, o, "");
                                });
                            });
                          }
                        })(e.dom, t, o);
                    });
                  })(e, r, n, a),
                  ((e, t, n, o, r) => {
                    const s = r.parentNode;
                    (Wb(e, s, n, o) && Iv(e, t, o, r)) ||
                      (t.merge_with_parents &&
                        s &&
                        e.dom.getParent(
                          s,
                          (s) => !!Wb(e, s, n, o) && (Iv(e, t, o, r), !0)
                        ));
                  })(e, s, t, n, a),
                  ((e, t, n, o) => {
                    if (t.styles && t.styles.backgroundColor) {
                      const r = yv(e, "fontSize");
                      vv(
                        o,
                        (t) => r(t) && e.isEditable(t),
                        Cv(
                          e,
                          "backgroundColor",
                          Am(t.styles.backgroundColor, n)
                        )
                      );
                    }
                  })(o, s, n, a),
                  ((e, t, n, o) => {
                    const r = (t) => {
                      if (tr(t) && er(t.parentNode) && e.isEditable(t)) {
                        const n = Pm(e, t.parentNode);
                        e.getStyle(t, "color") && n
                          ? e.setStyle(t, "text-decoration", n)
                          : e.getStyle(t, "text-decoration") === n &&
                            e.setStyle(t, "text-decoration", null);
                      }
                    };
                    t.styles &&
                      (t.styles.color || t.styles.textDecoration) &&
                      (Dt.walk(o, r, "childNodes"), r(o));
                  })(o, s, 0, a),
                  ((e, t, n, o) => {
                    if (Fm(t) && ("sub" === t.inline || "sup" === t.inline)) {
                      const n = yv(e, "fontSize");
                      vv(
                        o,
                        (t) => n(t) && e.isEditable(t),
                        Cv(e, "fontSize", "")
                      );
                      const r = Y(
                        e.select("sup" === t.inline ? "sub" : "sup", o),
                        e.isEditable
                      );
                      e.remove(r, !0);
                    }
                  })(o, s, 0, a),
                  bv(e, s, 0, a))
                : o.remove(a, !0);
            });
        },
        g = Cm(o) ? o : l.getNode();
      if ("false" === i.getContentEditable(g) && !Rm(e, g))
        return c(r, (o = g)), void ff(e, t, o, n);
      if (s) {
        if (o)
          if (Cm(o)) {
            if (!c(r, o)) {
              const e = i.createRng();
              e.setStartBefore(o), e.setEndAfter(o), f(i, nf(i, e, r), !0);
            }
          } else f(i, o, !0);
        else
          a && Fm(s) && !um(e).length
            ? ((e, t, n) => {
                let o;
                const r = e.selection,
                  s = e.formatter.get(t);
                if (!s) return;
                const a = r.getRng();
                let i = a.startOffset;
                const l = a.startContainer.nodeValue;
                o = Wu(e.getBody(), r.getStart());
                const d = /[^\s\u00a0\u00ad\u200b\ufeff]/;
                if (
                  l &&
                  i > 0 &&
                  i < l.length &&
                  d.test(l.charAt(i)) &&
                  d.test(l.charAt(i - 1))
                ) {
                  const o = r.getBookmark();
                  a.collapse(!0);
                  let i = nf(e.dom, a, s);
                  (i = Xf(i)), e.formatter.apply(t, n, i), r.moveToBookmark(o);
                } else {
                  let s = o ? Gb(o) : null;
                  (o && (null == s ? void 0 : s.data) === Yb) ||
                    ((c = e.getDoc()),
                    (u = Xb(!0).dom),
                    (o = c.importNode(u, !0)),
                    (s = o.firstChild),
                    a.insertNode(o),
                    (i = 1)),
                    e.formatter.apply(t, n, o),
                    r.setCursorLocation(s, i);
                }
                var c, u;
              })(e, t, n)
            : (l.setRng(Rb(l.getRng())),
              xm(
                e,
                () => {
                  vm(e, (e, t) => {
                    const n = t ? e : nf(i, e, r);
                    f(i, n, !1);
                  });
                },
                M
              ),
              e.nodeChanged()),
            lv(e.formatter, t).each((t) => {
              q(
                ((e) =>
                  Y(
                    ((e) => {
                      const t = e.getSelectedBlocks(),
                        n = e.getRng();
                      if (e.isCollapsed()) return [];
                      if (1 === t.length)
                        return dv(n, t[0]) && cv(n, t[0]) ? t : [];
                      {
                        const e = le(t)
                            .filter((e) => dv(n, e))
                            .toArray(),
                          o = de(t)
                            .filter((e) => cv(n, e))
                            .toArray(),
                          r = t.slice(1, -1);
                        return e.concat(r).concat(o);
                      }
                    })(e),
                    uv(e.dom)
                  ))(e.selection),
                (e) => zv(i, e, t, n)
              );
            });
        ((e, t) => {
          ke(sv, e) &&
            q(sv[e], (e) => {
              e(t);
            });
        })(t, e);
      }
      ff(e, t, o, n);
    },
    Hv = (e, t, n, o) => {
      (o || e.selection.isEditable()) && jv(e, t, n, o);
    },
    $v = (e) => ke(e, "vars"),
    Vv = (e) => e.selection.getStart(),
    qv = (e, t, n, o, r) =>
      Z(
        t,
        (t) => {
          const s = e.formatter.matchNode(t, n, null != r ? r : {}, o);
          return !v(s);
        },
        (t) => !!Hb(e, t, n) || (!o && C(e.formatter.matchNode(t, n, r, !0)))
      ),
    Wv = (e, t) => {
      const n = null != t ? t : Vv(e);
      return Y(Dm(e.dom, n), (e) => er(e) && !sr(e));
    },
    Kv = (e, t, n) => {
      const o = Wv(e, t);
      pe(n, (n, r) => {
        const s = (n) => {
          const s = qv(e, o, r, n.similar, $v(n) ? n.vars : void 0),
            a = s.isSome();
          if (n.state.get() !== a) {
            n.state.set(a);
            const e = s.getOr(t);
            $v(n)
              ? n.callback(a, { node: e, format: r, parents: o })
              : q(n.callbacks, (t) => t(a, { node: e, format: r, parents: o }));
          }
        };
        q([n.withSimilar, n.withoutSimilar], s), q(n.withVars, s);
      });
    },
    Yv = Dt.explode,
    Gv = () => {
      const e = {};
      return {
        addFilter: (t, n) => {
          q(Yv(t), (t) => {
            ke(e, t) || (e[t] = { name: t, callbacks: [] }),
              e[t].callbacks.push(n);
          });
        },
        getFilters: () => xe(e),
        removeFilter: (t, n) => {
          q(Yv(t), (t) => {
            if (ke(e, t))
              if (C(n)) {
                const o = e[t],
                  r = Y(o.callbacks, (e) => e !== n);
                r.length > 0 ? (o.callbacks = r) : delete e[t];
              } else delete e[t];
          });
        },
      };
    },
    Xv = (e, t, n) => {
      var o;
      const r = Vs();
      t.convert_fonts_to_spans &&
        ((e, t, n) => {
          e.addNodeFilter("font", (e) => {
            q(e, (e) => {
              const o = t.parse(e.attr("style")),
                r = e.attr("color"),
                s = e.attr("face"),
                a = e.attr("size");
              r && (o.color = r),
                s && (o["font-family"] = s),
                a &&
                  Ze(a).each((e) => {
                    o["font-size"] = n[e - 1];
                  }),
                (e.name = "span"),
                e.attr("style", t.serialize(o)),
                ((e, t) => {
                  q(["color", "face", "size"], (t) => {
                    e.attr(t, null);
                  });
                })(e);
            });
          });
        })(
          e,
          r,
          Dt.explode(
            null !== (o = t.font_size_legacy_values) && void 0 !== o ? o : ""
          )
        ),
        ((e, t, n) => {
          e.addNodeFilter("strike", (e) => {
            const o = "html4" !== t.type;
            q(e, (e) => {
              if (o) e.name = "s";
              else {
                const t = n.parse(e.attr("style"));
                (t["text-decoration"] = "line-through"),
                  (e.name = "span"),
                  e.attr("style", n.serialize(t));
              }
            });
          });
        })(e, n, r);
    },
    Zv = (e) => {
      const [t, ...n] = e.split(","),
        o = n.join(","),
        r = /data:([^/]+\/[^;]+)(;.+)?/.exec(t);
      if (r) {
        const e = ";base64" === r[2],
          t = e
            ? ((e) => {
                const t = /([a-z0-9+\/=\s]+)/i.exec(e);
                return t ? t[1] : "";
              })(o)
            : decodeURIComponent(o);
        return I.some({ type: r[1], data: t, base64Encoded: e });
      }
      return I.none();
    },
    Qv = (e, t, n = !0) => {
      let o = t;
      if (n)
        try {
          o = atob(t);
        } catch (e) {
          return I.none();
        }
      const r = new Uint8Array(o.length);
      for (let e = 0; e < r.length; e++) r[e] = o.charCodeAt(e);
      return I.some(new Blob([r], { type: e }));
    },
    Jv = (e) =>
      new Promise((t, n) => {
        const o = new FileReader();
        (o.onloadend = () => {
          t(o.result);
        }),
          (o.onerror = () => {
            var e;
            n(null === (e = o.error) || void 0 === e ? void 0 : e.message);
          }),
          o.readAsDataURL(e);
      });
  let ey = 0;
  const ty = (e, t, n) =>
      Zv(e).bind(({ data: e, type: o, base64Encoded: r }) => {
        if (t && !r) return I.none();
        {
          const t = r ? e : btoa(e);
          return n(t, o);
        }
      }),
    ny = (e, t, n) => {
      const o = e.create("blobid" + ey++, t, n);
      return e.add(o), o;
    },
    oy = (e, t, n = !1) =>
      ty(t, n, (t, n) =>
        I.from(e.getByData(t, n)).orThunk(() =>
          Qv(n, t).map((n) => ny(e, n, t))
        )
      ),
    ry =
      /^(?:(?:(?:[A-Za-z][A-Za-z\d.+-]{0,14}:\/\/(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?|www\.|[-;:&=+$,.\w]+@)([A-Za-z\d-]+(?:\.[A-Za-z\d-]+)*))(?::\d+)?(?:\/(?:[-.~*+=!;:'%@$(),\/\w]*[-~*+=%@$()\/\w])?)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+)?)?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+)?)?)$/,
    sy = (e) =>
      I.from(e.match(ry))
        .bind((e) => ie(e, 1))
        .map((e) => ($e(e, "www.") ? e.substring(4) : e)),
    ay = (e, t) => {
      I.from(e.attr("src"))
        .bind(sy)
        .forall((e) => !H(t, e)) && e.attr("sandbox", "");
    },
    iy = (e, t) => $e(e, `${t}/`),
    {
      entries: ly,
      setPrototypeOf: dy,
      isFrozen: cy,
      getPrototypeOf: uy,
      getOwnPropertyDescriptor: my,
    } = Object;
  let { freeze: fy, seal: gy, create: py } = Object,
    { apply: hy, construct: by } = "undefined" != typeof Reflect && Reflect;
  hy ||
    (hy = function (e, t, n) {
      return e.apply(t, n);
    }),
    fy ||
      (fy = function (e) {
        return e;
      }),
    gy ||
      (gy = function (e) {
        return e;
      }),
    by ||
      (by = function (e, t) {
        return new e(...t);
      });
  const vy = Ty(Array.prototype.forEach),
    yy = Ty(Array.prototype.pop),
    Cy = Ty(Array.prototype.push),
    wy = Ty(String.prototype.toLowerCase),
    xy = Ty(String.prototype.toString),
    Ey = Ty(String.prototype.match),
    ky = Ty(String.prototype.replace),
    _y = Ty(String.prototype.indexOf),
    Sy = Ty(String.prototype.trim),
    Ny = Ty(RegExp.prototype.test),
    Ry =
      ((Ay = TypeError),
      function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return by(Ay, t);
      });
  var Ay;
  function Ty(e) {
    return function (t) {
      for (
        var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1;
        r < n;
        r++
      )
        o[r - 1] = arguments[r];
      return hy(e, t, o);
    };
  }
  function Oy(e, t, n) {
    var o;
    (n = null !== (o = n) && void 0 !== o ? o : wy), dy && dy(e, null);
    let r = t.length;
    for (; r--; ) {
      let o = t[r];
      if ("string" == typeof o) {
        const e = n(o);
        e !== o && (cy(t) || (t[r] = e), (o = e));
      }
      e[o] = !0;
    }
    return e;
  }
  function By(e) {
    const t = py(null);
    for (const [n, o] of ly(e)) t[n] = o;
    return t;
  }
  function Py(e, t) {
    for (; null !== e; ) {
      const n = my(e, t);
      if (n) {
        if (n.get) return Ty(n.get);
        if ("function" == typeof n.value) return Ty(n.value);
      }
      e = uy(e);
    }
    return function (e) {
      return console.warn("fallback value for", e), null;
    };
  }
  const Dy = fy([
      "a",
      "abbr",
      "acronym",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "bdi",
      "bdo",
      "big",
      "blink",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "center",
      "cite",
      "code",
      "col",
      "colgroup",
      "content",
      "data",
      "datalist",
      "dd",
      "decorator",
      "del",
      "details",
      "dfn",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "element",
      "em",
      "fieldset",
      "figcaption",
      "figure",
      "font",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "img",
      "input",
      "ins",
      "kbd",
      "label",
      "legend",
      "li",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meter",
      "nav",
      "nobr",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "section",
      "select",
      "shadow",
      "small",
      "source",
      "spacer",
      "span",
      "strike",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "template",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "tr",
      "track",
      "tt",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
    ]),
    Ly = fy([
      "svg",
      "a",
      "altglyph",
      "altglyphdef",
      "altglyphitem",
      "animatecolor",
      "animatemotion",
      "animatetransform",
      "circle",
      "clippath",
      "defs",
      "desc",
      "ellipse",
      "filter",
      "font",
      "g",
      "glyph",
      "glyphref",
      "hkern",
      "image",
      "line",
      "lineargradient",
      "marker",
      "mask",
      "metadata",
      "mpath",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialgradient",
      "rect",
      "stop",
      "style",
      "switch",
      "symbol",
      "text",
      "textpath",
      "title",
      "tref",
      "tspan",
      "view",
      "vkern",
    ]),
    My = fy([
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feDropShadow",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
    ]),
    Iy = fy([
      "animate",
      "color-profile",
      "cursor",
      "discard",
      "font-face",
      "font-face-format",
      "font-face-name",
      "font-face-src",
      "font-face-uri",
      "foreignobject",
      "hatch",
      "hatchpath",
      "mesh",
      "meshgradient",
      "meshpatch",
      "meshrow",
      "missing-glyph",
      "script",
      "set",
      "solidcolor",
      "unknown",
      "use",
    ]),
    Fy = fy([
      "math",
      "menclose",
      "merror",
      "mfenced",
      "mfrac",
      "mglyph",
      "mi",
      "mlabeledtr",
      "mmultiscripts",
      "mn",
      "mo",
      "mover",
      "mpadded",
      "mphantom",
      "mroot",
      "mrow",
      "ms",
      "mspace",
      "msqrt",
      "mstyle",
      "msub",
      "msup",
      "msubsup",
      "mtable",
      "mtd",
      "mtext",
      "mtr",
      "munder",
      "munderover",
      "mprescripts",
    ]),
    Uy = fy([
      "maction",
      "maligngroup",
      "malignmark",
      "mlongdiv",
      "mscarries",
      "mscarry",
      "msgroup",
      "mstack",
      "msline",
      "msrow",
      "semantics",
      "annotation",
      "annotation-xml",
      "mprescripts",
      "none",
    ]),
    zy = fy(["#text"]),
    jy = fy([
      "accept",
      "action",
      "align",
      "alt",
      "autocapitalize",
      "autocomplete",
      "autopictureinpicture",
      "autoplay",
      "background",
      "bgcolor",
      "border",
      "capture",
      "cellpadding",
      "cellspacing",
      "checked",
      "cite",
      "class",
      "clear",
      "color",
      "cols",
      "colspan",
      "controls",
      "controlslist",
      "coords",
      "crossorigin",
      "datetime",
      "decoding",
      "default",
      "dir",
      "disabled",
      "disablepictureinpicture",
      "disableremoteplayback",
      "download",
      "draggable",
      "enctype",
      "enterkeyhint",
      "face",
      "for",
      "headers",
      "height",
      "hidden",
      "high",
      "href",
      "hreflang",
      "id",
      "inputmode",
      "integrity",
      "ismap",
      "kind",
      "label",
      "lang",
      "list",
      "loading",
      "loop",
      "low",
      "max",
      "maxlength",
      "media",
      "method",
      "min",
      "minlength",
      "multiple",
      "muted",
      "name",
      "nonce",
      "noshade",
      "novalidate",
      "nowrap",
      "open",
      "optimum",
      "pattern",
      "placeholder",
      "playsinline",
      "poster",
      "preload",
      "pubdate",
      "radiogroup",
      "readonly",
      "rel",
      "required",
      "rev",
      "reversed",
      "role",
      "rows",
      "rowspan",
      "spellcheck",
      "scope",
      "selected",
      "shape",
      "size",
      "sizes",
      "span",
      "srclang",
      "start",
      "src",
      "srcset",
      "step",
      "style",
      "summary",
      "tabindex",
      "title",
      "translate",
      "type",
      "usemap",
      "valign",
      "value",
      "width",
      "xmlns",
      "slot",
    ]),
    Hy = fy([
      "accent-height",
      "accumulate",
      "additive",
      "alignment-baseline",
      "ascent",
      "attributename",
      "attributetype",
      "azimuth",
      "basefrequency",
      "baseline-shift",
      "begin",
      "bias",
      "by",
      "class",
      "clip",
      "clippathunits",
      "clip-path",
      "clip-rule",
      "color",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "cx",
      "cy",
      "d",
      "dx",
      "dy",
      "diffuseconstant",
      "direction",
      "display",
      "divisor",
      "dur",
      "edgemode",
      "elevation",
      "end",
      "fill",
      "fill-opacity",
      "fill-rule",
      "filter",
      "filterunits",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "fx",
      "fy",
      "g1",
      "g2",
      "glyph-name",
      "glyphref",
      "gradientunits",
      "gradienttransform",
      "height",
      "href",
      "id",
      "image-rendering",
      "in",
      "in2",
      "k",
      "k1",
      "k2",
      "k3",
      "k4",
      "kerning",
      "keypoints",
      "keysplines",
      "keytimes",
      "lang",
      "lengthadjust",
      "letter-spacing",
      "kernelmatrix",
      "kernelunitlength",
      "lighting-color",
      "local",
      "marker-end",
      "marker-mid",
      "marker-start",
      "markerheight",
      "markerunits",
      "markerwidth",
      "maskcontentunits",
      "maskunits",
      "max",
      "mask",
      "media",
      "method",
      "mode",
      "min",
      "name",
      "numoctaves",
      "offset",
      "operator",
      "opacity",
      "order",
      "orient",
      "orientation",
      "origin",
      "overflow",
      "paint-order",
      "path",
      "pathlength",
      "patterncontentunits",
      "patterntransform",
      "patternunits",
      "points",
      "preservealpha",
      "preserveaspectratio",
      "primitiveunits",
      "r",
      "rx",
      "ry",
      "radius",
      "refx",
      "refy",
      "repeatcount",
      "repeatdur",
      "restart",
      "result",
      "rotate",
      "scale",
      "seed",
      "shape-rendering",
      "specularconstant",
      "specularexponent",
      "spreadmethod",
      "startoffset",
      "stddeviation",
      "stitchtiles",
      "stop-color",
      "stop-opacity",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke",
      "stroke-width",
      "style",
      "surfacescale",
      "systemlanguage",
      "tabindex",
      "targetx",
      "targety",
      "transform",
      "transform-origin",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "textlength",
      "type",
      "u1",
      "u2",
      "unicode",
      "values",
      "viewbox",
      "visibility",
      "version",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "width",
      "word-spacing",
      "wrap",
      "writing-mode",
      "xchannelselector",
      "ychannelselector",
      "x",
      "x1",
      "x2",
      "xmlns",
      "y",
      "y1",
      "y2",
      "z",
      "zoomandpan",
    ]),
    $y = fy([
      "accent",
      "accentunder",
      "align",
      "bevelled",
      "close",
      "columnsalign",
      "columnlines",
      "columnspan",
      "denomalign",
      "depth",
      "dir",
      "display",
      "displaystyle",
      "encoding",
      "fence",
      "frame",
      "height",
      "href",
      "id",
      "largeop",
      "length",
      "linethickness",
      "lspace",
      "lquote",
      "mathbackground",
      "mathcolor",
      "mathsize",
      "mathvariant",
      "maxsize",
      "minsize",
      "movablelimits",
      "notation",
      "numalign",
      "open",
      "rowalign",
      "rowlines",
      "rowspacing",
      "rowspan",
      "rspace",
      "rquote",
      "scriptlevel",
      "scriptminsize",
      "scriptsizemultiplier",
      "selection",
      "separator",
      "separators",
      "stretchy",
      "subscriptshift",
      "supscriptshift",
      "symmetric",
      "voffset",
      "width",
      "xmlns",
    ]),
    Vy = fy([
      "xlink:href",
      "xml:id",
      "xlink:title",
      "xml:space",
      "xmlns:xlink",
    ]),
    qy = gy(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    Wy = gy(/<%[\w\W]*|[\w\W]*%>/gm),
    Ky = gy(/\${[\w\W]*}/gm),
    Yy = gy(/^data-[\-\w.\u00B7-\uFFFF]/),
    Gy = gy(/^aria-[\-\w]+$/),
    Xy = gy(
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    ),
    Zy = gy(/^(?:\w+script|data):/i),
    Qy = gy(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    Jy = gy(/^html$/i);
  var eC = Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: qy,
    ERB_EXPR: Wy,
    TMPLIT_EXPR: Ky,
    DATA_ATTR: Yy,
    ARIA_ATTR: Gy,
    IS_ALLOWED_URI: Xy,
    IS_SCRIPT_OR_DATA: Zy,
    ATTR_WHITESPACE: Qy,
    DOCTYPE_NAME: Jy,
  });
  const tC = () => ("undefined" == typeof window ? null : window);
  var nC = (function e() {
    let t =
      arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : tC();
    const n = (t) => e(t);
    if (
      ((n.version = "3.0.5"),
      (n.removed = []),
      !t || !t.document || 9 !== t.document.nodeType)
    )
      return (n.isSupported = !1), n;
    const o = t.document,
      r = o.currentScript;
    let { document: s } = t;
    const {
        DocumentFragment: a,
        HTMLTemplateElement: i,
        Node: l,
        Element: d,
        NodeFilter: c,
        NamedNodeMap: u = t.NamedNodeMap || t.MozNamedAttrMap,
        HTMLFormElement: m,
        DOMParser: f,
        trustedTypes: g,
      } = t,
      p = d.prototype,
      h = Py(p, "cloneNode"),
      b = Py(p, "nextSibling"),
      v = Py(p, "childNodes"),
      y = Py(p, "parentNode");
    if ("function" == typeof i) {
      const e = s.createElement("template");
      e.content && e.content.ownerDocument && (s = e.content.ownerDocument);
    }
    let C,
      w = "";
    const {
        implementation: x,
        createNodeIterator: E,
        createDocumentFragment: k,
        getElementsByTagName: _,
      } = s,
      { importNode: S } = o;
    let N = {};
    n.isSupported =
      "function" == typeof ly &&
      "function" == typeof y &&
      x &&
      void 0 !== x.createHTMLDocument;
    const {
      MUSTACHE_EXPR: R,
      ERB_EXPR: A,
      TMPLIT_EXPR: T,
      DATA_ATTR: O,
      ARIA_ATTR: B,
      IS_SCRIPT_OR_DATA: P,
      ATTR_WHITESPACE: D,
    } = eC;
    let { IS_ALLOWED_URI: L } = eC,
      M = null;
    const I = Oy({}, [...Dy, ...Ly, ...My, ...Fy, ...zy]);
    let F = null;
    const U = Oy({}, [...jy, ...Hy, ...$y, ...Vy]);
    let z = Object.seal(
        Object.create(null, {
          tagNameCheck: {
            writable: !0,
            configurable: !1,
            enumerable: !0,
            value: null,
          },
          attributeNameCheck: {
            writable: !0,
            configurable: !1,
            enumerable: !0,
            value: null,
          },
          allowCustomizedBuiltInElements: {
            writable: !0,
            configurable: !1,
            enumerable: !0,
            value: !1,
          },
        })
      ),
      j = null,
      H = null,
      $ = !0,
      V = !0,
      q = !1,
      W = !0,
      K = !1,
      Y = !1,
      G = !1,
      X = !1,
      Z = !1,
      Q = !1,
      J = !1,
      ee = !0,
      te = !1,
      ne = !0,
      oe = !1,
      re = {},
      se = null;
    const ae = Oy({}, [
      "annotation-xml",
      "audio",
      "colgroup",
      "desc",
      "foreignobject",
      "head",
      "iframe",
      "math",
      "mi",
      "mn",
      "mo",
      "ms",
      "mtext",
      "noembed",
      "noframes",
      "noscript",
      "plaintext",
      "script",
      "style",
      "svg",
      "template",
      "thead",
      "title",
      "video",
      "xmp",
    ]);
    let ie = null;
    const le = Oy({}, ["audio", "video", "img", "source", "image", "track"]);
    let de = null;
    const ce = Oy({}, [
        "alt",
        "class",
        "for",
        "id",
        "label",
        "name",
        "pattern",
        "placeholder",
        "role",
        "summary",
        "title",
        "value",
        "style",
        "xmlns",
      ]),
      ue = "http://www.w3.org/1998/Math/MathML",
      me = "http://www.w3.org/2000/svg",
      fe = "http://www.w3.org/1999/xhtml";
    let ge = fe,
      pe = !1,
      he = null;
    const be = Oy({}, [ue, me, fe], xy);
    let ve;
    const ye = ["application/xhtml+xml", "text/html"];
    let Ce,
      we = null;
    const xe = s.createElement("form"),
      Ee = function (e) {
        return e instanceof RegExp || e instanceof Function;
      },
      ke = function (e) {
        if (!we || we !== e) {
          if (
            ((e && "object" == typeof e) || (e = {}),
            (e = By(e)),
            (ve = ve =
              -1 === ye.indexOf(e.PARSER_MEDIA_TYPE)
                ? "text/html"
                : e.PARSER_MEDIA_TYPE),
            (Ce = "application/xhtml+xml" === ve ? xy : wy),
            (M = "ALLOWED_TAGS" in e ? Oy({}, e.ALLOWED_TAGS, Ce) : I),
            (F = "ALLOWED_ATTR" in e ? Oy({}, e.ALLOWED_ATTR, Ce) : U),
            (he =
              "ALLOWED_NAMESPACES" in e
                ? Oy({}, e.ALLOWED_NAMESPACES, xy)
                : be),
            (de =
              "ADD_URI_SAFE_ATTR" in e
                ? Oy(By(ce), e.ADD_URI_SAFE_ATTR, Ce)
                : ce),
            (ie =
              "ADD_DATA_URI_TAGS" in e
                ? Oy(By(le), e.ADD_DATA_URI_TAGS, Ce)
                : le),
            (se = "FORBID_CONTENTS" in e ? Oy({}, e.FORBID_CONTENTS, Ce) : ae),
            (j = "FORBID_TAGS" in e ? Oy({}, e.FORBID_TAGS, Ce) : {}),
            (H = "FORBID_ATTR" in e ? Oy({}, e.FORBID_ATTR, Ce) : {}),
            (re = "USE_PROFILES" in e && e.USE_PROFILES),
            ($ = !1 !== e.ALLOW_ARIA_ATTR),
            (V = !1 !== e.ALLOW_DATA_ATTR),
            (q = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
            (W = !1 !== e.ALLOW_SELF_CLOSE_IN_ATTR),
            (K = e.SAFE_FOR_TEMPLATES || !1),
            (Y = e.WHOLE_DOCUMENT || !1),
            (Z = e.RETURN_DOM || !1),
            (Q = e.RETURN_DOM_FRAGMENT || !1),
            (J = e.RETURN_TRUSTED_TYPE || !1),
            (X = e.FORCE_BODY || !1),
            (ee = !1 !== e.SANITIZE_DOM),
            (te = e.SANITIZE_NAMED_PROPS || !1),
            (ne = !1 !== e.KEEP_CONTENT),
            (oe = e.IN_PLACE || !1),
            (L = e.ALLOWED_URI_REGEXP || Xy),
            (ge = e.NAMESPACE || fe),
            (z = e.CUSTOM_ELEMENT_HANDLING || {}),
            e.CUSTOM_ELEMENT_HANDLING &&
              Ee(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
              (z.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
            e.CUSTOM_ELEMENT_HANDLING &&
              Ee(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
              (z.attributeNameCheck =
                e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
            e.CUSTOM_ELEMENT_HANDLING &&
              "boolean" ==
                typeof e.CUSTOM_ELEMENT_HANDLING
                  .allowCustomizedBuiltInElements &&
              (z.allowCustomizedBuiltInElements =
                e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
            K && (V = !1),
            Q && (Z = !0),
            re &&
              ((M = Oy({}, [...zy])),
              (F = []),
              !0 === re.html && (Oy(M, Dy), Oy(F, jy)),
              !0 === re.svg && (Oy(M, Ly), Oy(F, Hy), Oy(F, Vy)),
              !0 === re.svgFilters && (Oy(M, My), Oy(F, Hy), Oy(F, Vy)),
              !0 === re.mathMl && (Oy(M, Fy), Oy(F, $y), Oy(F, Vy))),
            e.ADD_TAGS && (M === I && (M = By(M)), Oy(M, e.ADD_TAGS, Ce)),
            e.ADD_ATTR && (F === U && (F = By(F)), Oy(F, e.ADD_ATTR, Ce)),
            e.ADD_URI_SAFE_ATTR && Oy(de, e.ADD_URI_SAFE_ATTR, Ce),
            e.FORBID_CONTENTS &&
              (se === ae && (se = By(se)), Oy(se, e.FORBID_CONTENTS, Ce)),
            ne && (M["#text"] = !0),
            Y && Oy(M, ["html", "head", "body"]),
            M.table && (Oy(M, ["tbody"]), delete j.tbody),
            e.TRUSTED_TYPES_POLICY)
          ) {
            if ("function" != typeof e.TRUSTED_TYPES_POLICY.createHTML)
              throw Ry(
                'TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.'
              );
            if ("function" != typeof e.TRUSTED_TYPES_POLICY.createScriptURL)
              throw Ry(
                'TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.'
              );
            (C = e.TRUSTED_TYPES_POLICY), (w = C.createHTML(""));
          } else
            void 0 === C &&
              (C = (function (e, t) {
                if ("object" != typeof e || "function" != typeof e.createPolicy)
                  return null;
                let n = null;
                const o = "data-tt-policy-suffix";
                t && t.hasAttribute(o) && (n = t.getAttribute(o));
                const r = "dompurify" + (n ? "#" + n : "");
                try {
                  return e.createPolicy(r, {
                    createHTML: (e) => e,
                    createScriptURL: (e) => e,
                  });
                } catch (e) {
                  return (
                    console.warn(
                      "TrustedTypes policy " + r + " could not be created."
                    ),
                    null
                  );
                }
              })(g, r)),
              null !== C && "string" == typeof w && (w = C.createHTML(""));
          fy && fy(e), (we = e);
        }
      },
      _e = Oy({}, ["mi", "mo", "mn", "ms", "mtext"]),
      Se = Oy({}, ["foreignobject", "desc", "title", "annotation-xml"]),
      Ne = Oy({}, ["title", "style", "font", "a", "script"]),
      Re = Oy({}, Ly);
    Oy(Re, My), Oy(Re, Iy);
    const Ae = Oy({}, Fy);
    Oy(Ae, Uy);
    const Te = function (e) {
        Cy(n.removed, { element: e });
        try {
          e.parentNode.removeChild(e);
        } catch (t) {
          e.remove();
        }
      },
      Oe = function (e, t) {
        try {
          Cy(n.removed, { attribute: t.getAttributeNode(e), from: t });
        } catch (e) {
          Cy(n.removed, { attribute: null, from: t });
        }
        if ((t.removeAttribute(e), "is" === e && !F[e]))
          if (Z || Q)
            try {
              Te(t);
            } catch (e) {}
          else
            try {
              t.setAttribute(e, "");
            } catch (e) {}
      },
      Be = function (e) {
        let t, n;
        if (X) e = "<remove></remove>" + e;
        else {
          const t = Ey(e, /^[\r\n\t ]+/);
          n = t && t[0];
        }
        "application/xhtml+xml" === ve &&
          ge === fe &&
          (e =
            '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
            e +
            "</body></html>");
        const o = C ? C.createHTML(e) : e;
        if (ge === fe)
          try {
            t = new f().parseFromString(o, ve);
          } catch (e) {}
        if (!t || !t.documentElement) {
          t = x.createDocument(ge, "template", null);
          try {
            t.documentElement.innerHTML = pe ? w : o;
          } catch (e) {}
        }
        const r = t.body || t.documentElement;
        return (
          e &&
            n &&
            r.insertBefore(s.createTextNode(n), r.childNodes[0] || null),
          ge === fe
            ? _.call(t, Y ? "html" : "body")[0]
            : Y
            ? t.documentElement
            : r
        );
      },
      Pe = function (e) {
        return E.call(
          e.ownerDocument || e,
          e,
          c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT,
          null,
          !1
        );
      },
      De = function (e) {
        return "object" == typeof l
          ? e instanceof l
          : e &&
              "object" == typeof e &&
              "number" == typeof e.nodeType &&
              "string" == typeof e.nodeName;
      },
      Le = function (e, t, o) {
        N[e] &&
          vy(N[e], (e) => {
            e.call(n, t, o, we);
          });
      },
      Me = function (e) {
        let t;
        if (
          (Le("beforeSanitizeElements", e, null),
          (o = e) instanceof m &&
            ("string" != typeof o.nodeName ||
              "string" != typeof o.textContent ||
              "function" != typeof o.removeChild ||
              !(o.attributes instanceof u) ||
              "function" != typeof o.removeAttribute ||
              "function" != typeof o.setAttribute ||
              "string" != typeof o.namespaceURI ||
              "function" != typeof o.insertBefore ||
              "function" != typeof o.hasChildNodes))
        )
          return Te(e), !0;
        var o;
        const r = Ce(e.nodeName);
        if (
          (Le("uponSanitizeElement", e, { tagName: r, allowedTags: M }),
          e.hasChildNodes() &&
            !De(e.firstElementChild) &&
            (!De(e.content) || !De(e.content.firstElementChild)) &&
            Ny(/<[/\w]/g, e.innerHTML) &&
            Ny(/<[/\w]/g, e.textContent))
        )
          return Te(e), !0;
        if (!M[r] || j[r]) {
          if (!j[r] && Fe(r)) {
            if (z.tagNameCheck instanceof RegExp && Ny(z.tagNameCheck, r))
              return !1;
            if (z.tagNameCheck instanceof Function && z.tagNameCheck(r))
              return !1;
          }
          if (ne && !se[r]) {
            const t = y(e) || e.parentNode,
              n = v(e) || e.childNodes;
            if (n && t)
              for (let o = n.length - 1; o >= 0; --o)
                t.insertBefore(h(n[o], !0), b(e));
          }
          return Te(e), !0;
        }
        return e instanceof d &&
          !(function (e) {
            let t = y(e);
            (t && t.tagName) || (t = { namespaceURI: ge, tagName: "template" });
            const n = wy(e.tagName),
              o = wy(t.tagName);
            return (
              !!he[e.namespaceURI] &&
              (e.namespaceURI === me
                ? t.namespaceURI === fe
                  ? "svg" === n
                  : t.namespaceURI === ue
                  ? "svg" === n && ("annotation-xml" === o || _e[o])
                  : Boolean(Re[n])
                : e.namespaceURI === ue
                ? t.namespaceURI === fe
                  ? "math" === n
                  : t.namespaceURI === me
                  ? "math" === n && Se[o]
                  : Boolean(Ae[n])
                : e.namespaceURI === fe
                ? !(t.namespaceURI === me && !Se[o]) &&
                  !(t.namespaceURI === ue && !_e[o]) &&
                  !Ae[n] &&
                  (Ne[n] || !Re[n])
                : !("application/xhtml+xml" !== ve || !he[e.namespaceURI]))
            );
          })(e)
          ? (Te(e), !0)
          : ("noscript" !== r && "noembed" !== r && "noframes" !== r) ||
            !Ny(/<\/no(script|embed|frames)/i, e.innerHTML)
          ? (K &&
              3 === e.nodeType &&
              ((t = e.textContent),
              (t = ky(t, R, " ")),
              (t = ky(t, A, " ")),
              (t = ky(t, T, " ")),
              e.textContent !== t &&
                (Cy(n.removed, { element: e.cloneNode() }),
                (e.textContent = t))),
            Le("afterSanitizeElements", e, null),
            !1)
          : (Te(e), !0);
      },
      Ie = function (e, t, n) {
        if (ee && ("id" === t || "name" === t) && (n in s || n in xe))
          return !1;
        if (V && !H[t] && Ny(O, t));
        else if ($ && Ny(B, t));
        else if (!F[t] || H[t]) {
          if (
            !(
              (Fe(e) &&
                ((z.tagNameCheck instanceof RegExp && Ny(z.tagNameCheck, e)) ||
                  (z.tagNameCheck instanceof Function && z.tagNameCheck(e))) &&
                ((z.attributeNameCheck instanceof RegExp &&
                  Ny(z.attributeNameCheck, t)) ||
                  (z.attributeNameCheck instanceof Function &&
                    z.attributeNameCheck(t)))) ||
              ("is" === t &&
                z.allowCustomizedBuiltInElements &&
                ((z.tagNameCheck instanceof RegExp && Ny(z.tagNameCheck, n)) ||
                  (z.tagNameCheck instanceof Function && z.tagNameCheck(n))))
            )
          )
            return !1;
        } else if (de[t]);
        else if (Ny(L, ky(n, D, "")));
        else if (
          ("src" !== t && "xlink:href" !== t && "href" !== t) ||
          "script" === e ||
          0 !== _y(n, "data:") ||
          !ie[e]
        )
          if (q && !Ny(P, ky(n, D, "")));
          else if (n) return !1;
        return !0;
      },
      Fe = function (e) {
        return e.indexOf("-") > 0;
      },
      Ue = function (e) {
        let t, n, o, r;
        Le("beforeSanitizeAttributes", e, null);
        const { attributes: s } = e;
        if (!s) return;
        const a = {
          attrName: "",
          attrValue: "",
          keepAttr: !0,
          allowedAttributes: F,
        };
        for (r = s.length; r--; ) {
          t = s[r];
          const { name: i, namespaceURI: l } = t;
          n = "value" === i ? t.value : Sy(t.value);
          const d = n;
          if (
            ((o = Ce(i)),
            (a.attrName = o),
            (a.attrValue = n),
            (a.keepAttr = !0),
            (a.forceKeepAttr = void 0),
            Le("uponSanitizeAttribute", e, a),
            (n = a.attrValue),
            a.forceKeepAttr)
          )
            continue;
          if (!a.keepAttr) {
            Oe(i, e);
            continue;
          }
          if (!W && Ny(/\/>/i, n)) {
            Oe(i, e);
            continue;
          }
          K && ((n = ky(n, R, " ")), (n = ky(n, A, " ")), (n = ky(n, T, " ")));
          const c = Ce(e.nodeName);
          if (Ie(c, o, n)) {
            if (
              (!te ||
                ("id" !== o && "name" !== o) ||
                (Oe(i, e), (n = "user-content-" + n)),
              C &&
                "object" == typeof g &&
                "function" == typeof g.getAttributeType)
            )
              if (l);
              else
                switch (g.getAttributeType(c, o)) {
                  case "TrustedHTML":
                    n = C.createHTML(n);
                    break;
                  case "TrustedScriptURL":
                    n = C.createScriptURL(n);
                }
            if (n !== d)
              try {
                l ? e.setAttributeNS(l, i, n) : e.setAttribute(i, n);
              } catch (t) {
                Oe(i, e);
              }
          } else Oe(i, e);
        }
        Le("afterSanitizeAttributes", e, null);
      },
      ze = function e(t) {
        let n;
        const o = Pe(t);
        for (Le("beforeSanitizeShadowDOM", t, null); (n = o.nextNode()); )
          Le("uponSanitizeShadowNode", n, null),
            Me(n) || (n.content instanceof a && e(n.content), Ue(n));
        Le("afterSanitizeShadowDOM", t, null);
      };
    return (
      (n.sanitize = function (e) {
        let t,
          r,
          s,
          i,
          d =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (
          ((pe = !e), pe && (e = "\x3c!--\x3e"), "string" != typeof e && !De(e))
        ) {
          if ("function" != typeof e.toString)
            throw Ry("toString is not a function");
          if ("string" != typeof (e = e.toString()))
            throw Ry("dirty is not a string, aborting");
        }
        if (!n.isSupported) return e;
        if (
          (G || ke(d), (n.removed = []), "string" == typeof e && (oe = !1), oe)
        ) {
          if (e.nodeName) {
            const t = Ce(e.nodeName);
            if (!M[t] || j[t])
              throw Ry(
                "root node is forbidden and cannot be sanitized in-place"
              );
          }
        } else if (e instanceof l)
          (t = Be("\x3c!----\x3e")),
            (r = t.ownerDocument.importNode(e, !0)),
            (1 === r.nodeType && "BODY" === r.nodeName) || "HTML" === r.nodeName
              ? (t = r)
              : t.appendChild(r);
        else {
          if (!Z && !K && !Y && -1 === e.indexOf("<"))
            return C && J ? C.createHTML(e) : e;
          if (((t = Be(e)), !t)) return Z ? null : J ? w : "";
        }
        t && X && Te(t.firstChild);
        const c = Pe(oe ? e : t);
        for (; (s = c.nextNode()); )
          Me(s) || (s.content instanceof a && ze(s.content), Ue(s));
        if (oe) return e;
        if (Z) {
          if (Q)
            for (i = k.call(t.ownerDocument); t.firstChild; )
              i.appendChild(t.firstChild);
          else i = t;
          return (
            (F.shadowroot || F.shadowrootmode) && (i = S.call(o, i, !0)), i
          );
        }
        let u = Y ? t.outerHTML : t.innerHTML;
        return (
          Y &&
            M["!doctype"] &&
            t.ownerDocument &&
            t.ownerDocument.doctype &&
            t.ownerDocument.doctype.name &&
            Ny(Jy, t.ownerDocument.doctype.name) &&
            (u = "<!DOCTYPE " + t.ownerDocument.doctype.name + ">\n" + u),
          K && ((u = ky(u, R, " ")), (u = ky(u, A, " ")), (u = ky(u, T, " "))),
          C && J ? C.createHTML(u) : u
        );
      }),
      (n.setConfig = function (e) {
        ke(e), (G = !0);
      }),
      (n.clearConfig = function () {
        (we = null), (G = !1);
      }),
      (n.isValidAttribute = function (e, t, n) {
        we || ke({});
        const o = Ce(e),
          r = Ce(t);
        return Ie(o, r, n);
      }),
      (n.addHook = function (e, t) {
        "function" == typeof t && ((N[e] = N[e] || []), Cy(N[e], t));
      }),
      (n.removeHook = function (e) {
        if (N[e]) return yy(N[e]);
      }),
      (n.removeHooks = function (e) {
        N[e] && (N[e] = []);
      }),
      (n.removeAllHooks = function () {
        N = {};
      }),
      n
    );
  })();
  const oC = Dt.each,
    rC = Dt.trim,
    sC = [
      "source",
      "protocol",
      "authority",
      "userInfo",
      "user",
      "password",
      "host",
      "port",
      "relative",
      "path",
      "directory",
      "file",
      "query",
      "anchor",
    ],
    aC = { ftp: 21, http: 80, https: 443, mailto: 25 },
    iC = ["img", "video"],
    lC = (e, t, n) => {
      const o = ((e) => {
        try {
          return decodeURIComponent(e);
        } catch (t) {
          return unescape(e);
        }
      })(t).replace(/\s/g, "");
      return (
        !e.allow_script_urls &&
        (!!/((java|vb)script|mhtml):/i.test(o) ||
          (!e.allow_html_data_urls &&
            (/^data:image\//i.test(o)
              ? ((e, t) => (C(e) ? !e : !C(t) || !H(iC, t)))(
                  e.allow_svg_data_urls,
                  n
                ) && /^data:image\/svg\+xml/i.test(o)
              : /^data:/i.test(o))))
      );
    };
  class dC {
    static parseDataUri(e) {
      let t;
      const n = decodeURIComponent(e).split(","),
        o = /data:([^;]+)/.exec(n[0]);
      return o && (t = o[1]), { type: t, data: n[1] };
    }
    static isDomSafe(e, t, n = {}) {
      if (n.allow_script_urls) return !0;
      {
        const o = bs.decode(e).replace(/[\s\u0000-\u001F]+/g, "");
        return !lC(n, o, t);
      }
    }
    static getDocumentBaseUrl(e) {
      var t;
      let n;
      return (
        (n =
          0 !== e.protocol.indexOf("http") && "file:" !== e.protocol
            ? null !== (t = e.href) && void 0 !== t
              ? t
              : ""
            : e.protocol + "//" + e.host + e.pathname),
        /^[^:]+:\/\/\/?[^\/]+\//.test(n) &&
          ((n = n.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, "")),
          /[\/\\]$/.test(n) || (n += "/")),
        n
      );
    }
    constructor(e, t = {}) {
      (this.path = ""), (this.directory = ""), (e = rC(e)), (this.settings = t);
      const n = t.base_uri,
        o = this;
      if (/^([\w\-]+):([^\/]{2})/i.test(e) || /^\s*#/.test(e))
        return void (o.source = e);
      const r = 0 === e.indexOf("//");
      if (
        (0 !== e.indexOf("/") ||
          r ||
          (e = ((n && n.protocol) || "http") + "://mce_host" + e),
        !/^[\w\-]*:?\/\//.test(e))
      ) {
        const t = n ? n.path : new dC(document.location.href).directory;
        if ("" === (null == n ? void 0 : n.protocol))
          e = "//mce_host" + o.toAbsPath(t, e);
        else {
          const r = /([^#?]*)([#?]?.*)/.exec(e);
          r &&
            (e =
              ((n && n.protocol) || "http") +
              "://mce_host" +
              o.toAbsPath(t, r[1]) +
              r[2]);
        }
      }
      e = e.replace(/@@/g, "(mce_at)");
      const s =
        /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?(\[[a-zA-Z0-9:.%]+\]|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(
          e
        );
      s &&
        oC(sC, (e, t) => {
          let n = s[t];
          n && (n = n.replace(/\(mce_at\)/g, "@@")), (o[e] = n);
        }),
        n &&
          (o.protocol || (o.protocol = n.protocol),
          o.userInfo || (o.userInfo = n.userInfo),
          o.port || "mce_host" !== o.host || (o.port = n.port),
          (o.host && "mce_host" !== o.host) || (o.host = n.host),
          (o.source = "")),
        r && (o.protocol = "");
    }
    setPath(e) {
      const t = /^(.*?)\/?(\w+)?$/.exec(e);
      t && ((this.path = t[0]), (this.directory = t[1]), (this.file = t[2])),
        (this.source = ""),
        this.getURI();
    }
    toRelative(e) {
      if ("./" === e) return e;
      const t = new dC(e, { base_uri: this });
      if (
        ("mce_host" !== t.host && this.host !== t.host && t.host) ||
        this.port !== t.port ||
        (this.protocol !== t.protocol && "" !== t.protocol)
      )
        return t.getURI();
      const n = this.getURI(),
        o = t.getURI();
      if (
        n === o ||
        ("/" === n.charAt(n.length - 1) && n.substr(0, n.length - 1) === o)
      )
        return n;
      let r = this.toRelPath(this.path, t.path);
      return (
        t.query && (r += "?" + t.query), t.anchor && (r += "#" + t.anchor), r
      );
    }
    toAbsolute(e, t) {
      const n = new dC(e, { base_uri: this });
      return n.getURI(t && this.isSameOrigin(n));
    }
    isSameOrigin(e) {
      if (this.host == e.host && this.protocol == e.protocol) {
        if (this.port == e.port) return !0;
        const t = this.protocol ? aC[this.protocol] : null;
        if (t && (this.port || t) == (e.port || t)) return !0;
      }
      return !1;
    }
    toRelPath(e, t) {
      let n,
        o,
        r = 0,
        s = "";
      const a = e.substring(0, e.lastIndexOf("/")).split("/"),
        i = t.split("/");
      if (a.length >= i.length)
        for (n = 0, o = a.length; n < o; n++)
          if (n >= i.length || a[n] !== i[n]) {
            r = n + 1;
            break;
          }
      if (a.length < i.length)
        for (n = 0, o = i.length; n < o; n++)
          if (n >= a.length || a[n] !== i[n]) {
            r = n + 1;
            break;
          }
      if (1 === r) return t;
      for (n = 0, o = a.length - (r - 1); n < o; n++) s += "../";
      for (n = r - 1, o = i.length; n < o; n++)
        s += n !== r - 1 ? "/" + i[n] : i[n];
      return s;
    }
    toAbsPath(e, t) {
      let n = 0;
      const o = /\/$/.test(t) ? "/" : "",
        r = e.split("/"),
        s = t.split("/"),
        a = [];
      oC(r, (e) => {
        e && a.push(e);
      });
      const i = [];
      for (let e = s.length - 1; e >= 0; e--)
        0 !== s[e].length &&
          "." !== s[e] &&
          (".." !== s[e] ? (n > 0 ? n-- : i.push(s[e])) : n++);
      const l = a.length - n;
      let d;
      return (
        (d =
          l <= 0
            ? oe(i).join("/")
            : a.slice(0, l).join("/") + "/" + oe(i).join("/")),
        0 !== d.indexOf("/") && (d = "/" + d),
        o && d.lastIndexOf("/") !== d.length - 1 && (d += o),
        d
      );
    }
    getURI(e = !1) {
      let t;
      return (
        (this.source && !e) ||
          ((t = ""),
          e ||
            (this.protocol ? (t += this.protocol + "://") : (t += "//"),
            this.userInfo && (t += this.userInfo + "@"),
            this.host && (t += this.host),
            this.port && (t += ":" + this.port)),
          this.path && (t += this.path),
          this.query && (t += "?" + this.query),
          this.anchor && (t += "#" + this.anchor),
          (this.source = t)),
        this.source
      );
    }
  }
  const cC = Dt.makeMap(
      "src,href,data,background,action,formaction,poster,xlink:href"
    ),
    uC = "data-mce-type";
  let mC = 0;
  const fC = (e, t, n, o, r) => {
      var s, a, i, l;
      const d = t.validate,
        c = n.getSpecialElements();
      8 === e.nodeType &&
        !t.allow_conditional_comments &&
        /^\[if/i.test(null !== (s = e.nodeValue) && void 0 !== s ? s : "") &&
        (e.nodeValue = " " + e.nodeValue);
      const u =
        null !== (a = null == r ? void 0 : r.tagName) && void 0 !== a
          ? a
          : e.nodeName.toLowerCase();
      if ("html" !== o && n.isValid(o))
        return void (C(r) && (r.allowedTags[u] = !0));
      if (1 !== e.nodeType || "body" === u) return;
      const f = Cn(e),
        g = on(f, uC),
        p = tn(f, "data-mce-bogus");
      if (!g && m(p)) return void ("all" === p ? Eo(f) : ko(f));
      const h = n.getElementRule(u);
      if (!d || h) {
        if ((C(r) && (r.allowedTags[u] = !0), d && h && !g)) {
          if (
            (q(
              null !== (i = h.attributesForced) && void 0 !== i ? i : [],
              (e) => {
                Jt(f, e.name, "{$uid}" === e.value ? "mce_" + mC++ : e.value);
              }
            ),
            q(
              null !== (l = h.attributesDefault) && void 0 !== l ? l : [],
              (e) => {
                on(f, e.name) ||
                  Jt(f, e.name, "{$uid}" === e.value ? "mce_" + mC++ : e.value);
              }
            ),
            h.attributesRequired && !$(h.attributesRequired, (e) => on(f, e)))
          )
            return void ko(f);
          if (
            h.removeEmptyAttrs &&
            ((e) => {
              const t = e.dom.attributes;
              return null == t || 0 === t.length;
            })(f)
          )
            return void ko(f);
          h.outputName &&
            h.outputName !== u &&
            ((e, t) => {
              const n = ((e, t) => {
                const n = vn(t),
                  o = sn(e);
                return en(n, o), n;
              })(e, t);
              bo(e, n);
              const o = In(e);
              wo(n, o), Eo(e);
            })(f, h.outputName);
        }
      } else ke(c, u) ? Eo(f) : ko(f);
    },
    gC = (e, t, n, o, r, s) =>
      ("html" !== n && !Br(o)) ||
      (!(r in cC && lC(e, s, o)) &&
        (!e.validate || t.isValid(o, r) || $e(r, "data-") || $e(r, "aria-"))),
    pC = (e, t) =>
      e.hasAttribute(uC) && ("id" === t || "class" === t || "style" === t),
    hC = (e, t) => e in t.getBoolAttrs(),
    bC = (e, t, n, o) => {
      const { attributes: r } = e;
      for (let s = r.length - 1; s >= 0; s--) {
        const a = r[s],
          i = a.name,
          l = a.value;
        gC(t, n, o, e.tagName.toLowerCase(), i, l) || pC(e, i)
          ? hC(i, n) && e.setAttribute(i, i)
          : e.removeAttribute(i);
      }
    },
    vC = (e, t, n) => {
      const o = nC();
      return (
        o.addHook("uponSanitizeElement", (o, r) => {
          fC(o, e, t, n.track(o), r);
        }),
        o.addHook("uponSanitizeAttribute", (o, r) => {
          ((e, t, n, o, r) => {
            const s = e.tagName.toLowerCase(),
              { attrName: a, attrValue: i } = r;
            (r.keepAttr = gC(t, n, o, s, a, i)),
              r.keepAttr
                ? ((r.allowedAttributes[a] = !0),
                  hC(a, n) && (r.attrValue = a),
                  t.allow_svg_data_urls &&
                    $e(i, "data:image/svg+xml") &&
                    (r.forceKeepAttr = !0))
                : pC(e, a) && (r.forceKeepAttr = !0);
          })(o, e, t, n.current(), r);
        }),
        o
      );
    },
    yC = (e) => {
      const t = [
          "type",
          "href",
          "role",
          "arcrole",
          "title",
          "show",
          "actuate",
          "label",
          "from",
          "to",
        ].map((e) => `xlink:${e}`),
        n = {
          IN_PLACE: !0,
          USE_PROFILES: { html: !0, svg: !0, svgFilters: !0 },
          ALLOWED_ATTR: t,
        };
      return nC().sanitize(e, n), e.innerHTML;
    },
    CC = Dt.makeMap,
    wC = Dt.extend,
    xC = (e, t, n, o) => {
      const r = e.name,
        s = r in n && "title" !== r && "textarea" !== r,
        a = t.childNodes;
      for (let t = 0, r = a.length; t < r; t++) {
        const r = a[t],
          i = new Jg(r.nodeName.toLowerCase(), r.nodeType);
        if (er(r)) {
          const e = r.attributes;
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e[t];
            i.attr(n.name, n.value);
          }
          Br(i.name) && (o(r), (i.value = r.innerHTML));
        } else
          dr(r)
            ? ((i.value = r.data), s && (i.raw = !0))
            : (mr(r) || cr(r) || ur(r)) && (i.value = r.data);
        Br(i.name) || xC(i, r, n, o), e.append(i);
      }
    },
    EC = (e = {}, t = Ds()) => {
      const n = Gv(),
        o = Gv(),
        r = { validate: !0, root_name: "body", sanitize: !0, ...e },
        s = new DOMParser(),
        a = ((e, t) => {
          const n = (() => {
            let e = [];
            const t = () => e[e.length - 1];
            return {
              track: (n) => {
                Pr(n) && e.push(n);
                let o = t();
                return o && !o.contains(n) && (e.pop(), (o = t())), Dr(o);
              },
              current: () => Dr(t()),
              reset: () => {
                e = [];
              },
            };
          })();
          if (e.sanitize) {
            const o = vC(e, t, n),
              r = (t, r) => {
                o.sanitize(
                  t,
                  ((e, t) => {
                    const n = {
                      IN_PLACE: !0,
                      ALLOW_UNKNOWN_PROTOCOLS: !0,
                      ALLOWED_TAGS: ["#comment", "#cdata-section", "body"],
                      ALLOWED_ATTR: [],
                    };
                    return (
                      (n.PARSER_MEDIA_TYPE = t),
                      e.allow_script_urls
                        ? (n.ALLOWED_URI_REGEXP = /.*/)
                        : e.allow_html_data_urls &&
                          (n.ALLOWED_URI_REGEXP = /^(?!(\w+script|mhtml):)/i),
                      n
                    );
                  })(e, r)
                ),
                  (o.removed = []),
                  n.reset();
              };
            return { sanitizeHtmlElement: r, sanitizeNamespaceElement: yC };
          }
          return {
            sanitizeHtmlElement: (o, r) => {
              const s = document.createNodeIterator(
                o,
                NodeFilter.SHOW_ELEMENT |
                  NodeFilter.SHOW_COMMENT |
                  NodeFilter.SHOW_TEXT
              );
              let a;
              for (; (a = s.nextNode()); ) {
                const o = n.track(a);
                fC(a, e, t, o), er(a) && bC(a, e, t, o);
              }
              n.reset();
            },
            sanitizeNamespaceElement: k,
          };
        })(r, t),
        i = n.addFilter,
        l = n.getFilters,
        d = n.removeFilter,
        c = o.addFilter,
        u = o.getFilters,
        f = o.removeFilter,
        g = (e, n) => {
          const o = m(n.attr(uC)),
            r = 1 === n.type && !ke(e, n.name) && !Gr(t, n) && !Br(n.name);
          return 3 === n.type || (r && !o);
        },
        p = {
          schema: t,
          addAttributeFilter: c,
          getAttributeFilters: u,
          removeAttributeFilter: f,
          addNodeFilter: i,
          getNodeFilters: l,
          removeNodeFilter: d,
          parse: (e, n = {}) => {
            var o;
            const i = r.validate,
              d = null !== (o = n.context) && void 0 !== o ? o : r.root_name,
              c = ((e, n, o = "html") => {
                const r = "xhtml" === o ? "application/xhtml+xml" : "text/html",
                  i = ke(t.getSpecialElements(), n.toLowerCase()),
                  l = i ? `<${n}>${e}</${n}>` : e,
                  d =
                    "xhtml" === o
                      ? `<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>${l}</body></html>`
                      : `<body>${l}</body>`,
                  c = s.parseFromString(d, r).body;
                return a.sanitizeHtmlElement(c, r), i ? c.firstChild : c;
              })(e, d, n.format);
            Hr(t, c);
            const m = new Jg(d, 11);
            xC(m, c, t.getSpecialElements(), a.sanitizeNamespaceElement),
              (c.innerHTML = "");
            const [f, p] = ((e, t, n, o) => {
                const r = n.validate,
                  s = t.getNonEmptyElements(),
                  a = t.getWhitespaceElements(),
                  i = wC(
                    CC("script,style,head,html,body,title,meta,param"),
                    t.getBlockElements()
                  ),
                  l = Bs(t),
                  d = /[ \t\r\n]+/g,
                  c = /^[ \t\r\n]+/,
                  u = /[ \t\r\n]+$/,
                  m = (e) => {
                    let t = e.parent;
                    for (; C(t); ) {
                      if (t.name in a) return !0;
                      t = t.parent;
                    }
                    return !1;
                  },
                  f = (n) =>
                    n.name in i || Gr(t, n) || (Br(n.name) && n.parent === e),
                  g = (t, n) => {
                    const r = n ? t.prev : t.next;
                    return (
                      !C(r) &&
                      !y(t.parent) &&
                      f(t.parent) &&
                      (t.parent !== e || !0 === o.isRootContent)
                    );
                  };
                return [
                  (e) => {
                    var t;
                    if (3 === e.type && !m(e)) {
                      let n = null !== (t = e.value) && void 0 !== t ? t : "";
                      (n = n.replace(d, " ")),
                        (((e, t) => C(e) && (t(e) || "br" === e.name))(
                          e.prev,
                          f
                        ) ||
                          g(e, !0)) &&
                          (n = n.replace(c, "")),
                        0 === n.length ? e.remove() : (e.value = n);
                    }
                  },
                  (e) => {
                    var i;
                    if (1 === e.type) {
                      const i = t.getElementRule(e.name);
                      if (r && i) {
                        const r = Eb(t, s, a, e);
                        i.paddInEmptyBlock &&
                        r &&
                        ((e) => {
                          let n = e;
                          for (; C(n); ) {
                            if (n.name in l) return Eb(t, s, a, n);
                            n = n.parent;
                          }
                          return !1;
                        })(e)
                          ? wb(n, o, f, e)
                          : i.removeEmpty && r
                          ? f(e)
                            ? e.remove()
                            : e.unwrap()
                          : i.paddEmpty &&
                            (r ||
                              ((e) => {
                                var t;
                                return (
                                  xb(e, "#text") &&
                                  (null ===
                                    (t = null == e ? void 0 : e.firstChild) ||
                                  void 0 === t
                                    ? void 0
                                    : t.value) === Wo
                                );
                              })(e)) &&
                            wb(n, o, f, e);
                      }
                    } else if (3 === e.type && !m(e)) {
                      let t = null !== (i = e.value) && void 0 !== i ? i : "";
                      ((e.next && f(e.next)) || g(e, !1)) &&
                        (t = t.replace(u, "")),
                        0 === t.length ? e.remove() : (e.value = t);
                    }
                  },
                ];
              })(m, t, r, n),
              h = [],
              b = i
                ? (e) =>
                    ((e, n) => {
                      Nb(t, e) && n.push(e);
                    })(e, h)
                : k,
              v = { nodes: {}, attributes: {} },
              w = (e) => vb(l(), u(), e, v);
            if (
              (((e, t, n) => {
                const o = [];
                for (let n = e, r = n; n; r = n, n = n.walk()) {
                  const s = n;
                  q(t, (e) => e(s)),
                    y(s.parent) && s !== e ? (n = r) : o.push(s);
                }
                for (let e = o.length - 1; e >= 0; e--) {
                  const t = o[e];
                  q(n, (e) => e(t));
                }
              })(m, [f, w], [p, b]),
              h.reverse(),
              i && h.length > 0)
            )
              if (n.context) {
                const { pass: e, fail: o } = K(h, (e) => e.parent === m);
                Sb(o, t, m, w), (n.invalid = e.length > 0);
              } else Sb(h, t, m, w);
            const x = ((e, t) => {
              var n;
              const o =
                null !== (n = t.forced_root_block) && void 0 !== n
                  ? n
                  : e.forced_root_block;
              return !1 === o ? "" : !0 === o ? "p" : o;
            })(r, n);
            return (
              x &&
                ("body" === m.name || n.isRootContent) &&
                ((e, n) => {
                  const o = wC(
                      CC("script,style,head,html,body,title,meta,param"),
                      t.getBlockElements()
                    ),
                    s = /^[ \t\r\n]+/,
                    a = /[ \t\r\n]+$/;
                  let i = e.firstChild,
                    l = null;
                  const d = (e) => {
                    var t, n;
                    e &&
                      ((i = e.firstChild),
                      i &&
                        3 === i.type &&
                        (i.value =
                          null === (t = i.value) || void 0 === t
                            ? void 0
                            : t.replace(s, "")),
                      (i = e.lastChild),
                      i &&
                        3 === i.type &&
                        (i.value =
                          null === (n = i.value) || void 0 === n
                            ? void 0
                            : n.replace(a, "")));
                  };
                  if (t.isValidChild(e.name, n.toLowerCase())) {
                    for (; i; ) {
                      const t = i.next;
                      g(o, i)
                        ? (l ||
                            ((l = new Jg(n, 1)),
                            l.attr(r.forced_root_block_attrs),
                            e.insert(l, i)),
                          l.append(i))
                        : (d(l), (l = null)),
                        (i = t);
                    }
                    d(l);
                  }
                })(m, x),
              n.invalid || yb(v, n),
              m
            );
          },
        };
      return (
        ((e, t) => {
          var n, o;
          const r = e.schema;
          e.addAttributeFilter("href", (e) => {
            let n = e.length;
            const o = (e) => {
              const t = e ? Dt.trim(e) : "";
              return /\b(noopener)\b/g.test(t)
                ? t
                : ((e) =>
                    e
                      .split(" ")
                      .filter((e) => e.length > 0)
                      .concat(["noopener"])
                      .sort()
                      .join(" "))(t);
            };
            if (!t.allow_unsafe_link_target)
              for (; n--; ) {
                const t = e[n];
                "a" === t.name &&
                  "_blank" === t.attr("target") &&
                  t.attr("rel", o(t.attr("rel")));
              }
          }),
            t.allow_html_in_named_anchor ||
              e.addAttributeFilter("id,name", (e) => {
                let t,
                  n,
                  o,
                  r,
                  s = e.length;
                for (; s--; )
                  if (
                    ((r = e[s]),
                    "a" === r.name && r.firstChild && !r.attr("href"))
                  )
                    for (o = r.parent, t = r.lastChild; t && o; )
                      (n = t.prev), o.insert(t, r), (t = n);
              }),
            t.fix_list_elements &&
              e.addNodeFilter("ul,ol", (e) => {
                let t,
                  n,
                  o = e.length;
                for (; o--; )
                  if (
                    ((t = e[o]),
                    (n = t.parent),
                    n && ("ul" === n.name || "ol" === n.name))
                  )
                    if (t.prev && "li" === t.prev.name) t.prev.append(t);
                    else {
                      const e = new Jg("li", 1);
                      e.attr("style", "list-style-type: none"), t.wrap(e);
                    }
              });
          const s = r.getValidClasses();
          t.validate &&
            s &&
            e.addAttributeFilter("class", (e) => {
              var t;
              let n = e.length;
              for (; n--; ) {
                const o = e[n],
                  r = null !== (t = o.attr("class")) && void 0 !== t ? t : "",
                  a = Dt.explode(r, " ");
                let i = "";
                for (let e = 0; e < a.length; e++) {
                  const t = a[e];
                  let n = !1,
                    r = s["*"];
                  r && r[t] && (n = !0),
                    (r = s[o.name]),
                    !n && r && r[t] && (n = !0),
                    n && (i && (i += " "), (i += t));
                }
                i.length || (i = null), o.attr("class", i);
              }
            }),
            ((e, t) => {
              const { blob_cache: n } = t;
              if (n) {
                const t = (e) => {
                  const t = e.attr("src");
                  ((e) =>
                    e.attr("src") === Tt.transparentSrc ||
                    C(e.attr("data-mce-placeholder")))(e) ||
                    ((e) => C(e.attr("data-mce-bogus")))(e) ||
                    y(t) ||
                    oy(n, t, !0).each((t) => {
                      e.attr("src", t.blobUri());
                    });
                };
                e.addAttributeFilter("src", (e) => q(e, t));
              }
            })(e, t);
          const a = null !== (n = t.sandbox_iframes) && void 0 !== n && n,
            i = me(
              null !== (o = t.sandbox_iframes_exclusions) && void 0 !== o
                ? o
                : []
            );
          t.convert_unsafe_embeds &&
            e.addNodeFilter("object,embed", (e) =>
              q(e, (e) => {
                e.replace(
                  (({ type: e, src: t, width: n, height: o } = {}, r, s) => {
                    const a = ((e) =>
                        v(e)
                          ? "iframe"
                          : iy(e, "image")
                          ? "img"
                          : iy(e, "video")
                          ? "video"
                          : iy(e, "audio")
                          ? "audio"
                          : "iframe")(e),
                      i = new Jg(a, 1);
                    return (
                      i.attr(
                        "audio" === a
                          ? { src: t }
                          : { src: t, width: n, height: o }
                      ),
                      ("audio" !== a && "video" !== a) ||
                        i.attr("controls", ""),
                      "iframe" === a && r && ay(i, s),
                      i
                    );
                  })(
                    {
                      type: e.attr("type"),
                      src: "object" === e.name ? e.attr("data") : e.attr("src"),
                      width: e.attr("width"),
                      height: e.attr("height"),
                    },
                    a,
                    i
                  )
                );
              })
            ),
            a && e.addNodeFilter("iframe", (e) => q(e, (e) => ay(e, i)));
        })(p, r),
        ((e, t, n) => {
          t.inline_styles && Xv(e, t, n);
        })(p, r, t),
        p
      );
    },
    kC = (e, t, n) => {
      const o = ((e) => (Ib(e) ? vp({ validate: !1 }).serialize(e) : e))(e),
        r = t(o);
      if (r.isDefaultPrevented()) return r;
      if (Ib(e)) {
        if (r.content !== o) {
          const t = EC({ validate: !1, forced_root_block: !1, ...n }).parse(
            r.content,
            { context: e.name }
          );
          return { ...r, content: t };
        }
        return { ...r, content: e };
      }
      return r;
    },
    _C = (e) => ({
      sanitize: wc(e),
      sandbox_iframes: Nc(e),
      sandbox_iframes_exclusions: Rc(e),
    }),
    SC = (e, t) => {
      if (t.no_events) return xl.value(t);
      {
        const n = ((e, t) => e.dispatch("BeforeGetContent", t))(e, t);
        return n.isDefaultPrevented()
          ? xl.error(hf(e, { content: "", ...n }).content)
          : xl.value(n);
      }
    },
    NC = (e, t, n) => {
      if (n.no_events) return t;
      {
        const o = kC(t, (t) => hf(e, { ...n, content: t }), _C(e));
        return o.content;
      }
    },
    RC = (e, t) => {
      if (t.no_events) return xl.value(t);
      {
        const n = kC(
          t.content,
          (n) =>
            ((e, t) => e.dispatch("BeforeSetContent", t))(e, {
              ...t,
              content: n,
            }),
          _C(e)
        );
        return n.isDefaultPrevented()
          ? (pf(e, n), xl.error(void 0))
          : xl.value(n);
      }
    },
    AC = (e, t, n) => {
      n.no_events || pf(e, { ...n, content: t });
    },
    TC = (e, t, n) => ({ element: e, width: t, rows: n }),
    OC = (e, t) => ({ element: e, cells: t }),
    BC = (e, t) => ({ x: e, y: t }),
    PC = (e, t) => nn(e, t).bind(Ze).getOr(1),
    DC = (e, t, n) => {
      const o = e.rows;
      return !!(o[n] ? o[n].cells : [])[t];
    },
    LC = (e) => X(e, (e, t) => (t.cells.length > e ? t.cells.length : e), 0),
    MC = (e, t) => {
      const n = e.rows;
      for (let e = 0; e < n.length; e++) {
        const o = n[e].cells;
        for (let n = 0; n < o.length; n++)
          if (_n(o[n], t)) return I.some(BC(n, e));
      }
      return I.none();
    },
    IC = (e, t, n, o, r) => {
      const s = [],
        a = e.rows;
      for (let e = n; e <= r; e++) {
        const n = a[e].cells,
          r = t < o ? n.slice(t, o + 1) : n.slice(o, t + 1);
        s.push(OC(a[e].element, r));
      }
      return s;
    },
    FC = (e) =>
      ((e, t) => {
        const n = Ma(e.element),
          o = vn("tbody");
        return wo(o, t), yo(n, o), n;
      })(
        e,
        ((e) =>
          V(e.rows, (e) => {
            const t = V(e.cells, (e) => {
                const t = Ia(e);
                return rn(t, "colspan"), rn(t, "rowspan"), t;
              }),
              n = Ma(e.element);
            return wo(n, t), n;
          }))(e)
      ),
    UC = (e, t, n) => {
      const o = Cn(t.commonAncestorContainer),
        r = Up(o, e),
        s = Y(r, (e) => n.isWrapper($t(e))),
        a = ((e, t) =>
          Q(e, (e) => "li" === $t(e) && pm(e, t)).fold(N([]), (t) =>
            ((e) => Q(e, (e) => "ul" === $t(e) || "ol" === $t(e)))(e)
              .map((e) => {
                const t = vn($t(e)),
                  n = Ce(go(e), (e, t) => $e(t, "list-style"));
                return co(t, n), [vn("li"), t];
              })
              .getOr([])
          ))(r, t),
        i = s.concat(
          a.length
            ? a
            : ((e) =>
                Wa(e)
                  ? Tn(e)
                      .filter(qa)
                      .fold(N([]), (t) => [e, t])
                  : qa(e)
                  ? [e]
                  : [])(o)
        );
      return V(i, Ma);
    },
    zC = () => Ff([]),
    jC = (e, t) =>
      ((e, t) => to(t, "table", T(_n, e)))(e, t[0])
        .bind((e) => {
          const n = t[0],
            o = t[t.length - 1],
            r = ((e) => {
              const t = TC(Ma(e), 0, []);
              return (
                q(zo(e, "tr"), (e, n) => {
                  q(zo(e, "td,th"), (o, r) => {
                    ((e, t, n, o, r) => {
                      const s = PC(r, "rowspan"),
                        a = PC(r, "colspan"),
                        i = e.rows;
                      for (let e = n; e < n + s; e++) {
                        i[e] || (i[e] = OC(Ia(o), []));
                        for (let o = t; o < t + a; o++)
                          i[e].cells[o] = e === n && o === t ? r : Ma(r);
                      }
                    })(
                      t,
                      ((e, t, n) => {
                        for (; DC(e, t, n); ) t++;
                        return t;
                      })(t, r, n),
                      n,
                      e,
                      o
                    );
                  });
                }),
                TC(t.element, LC(t.rows), t.rows)
              );
            })(e);
          return ((e, t, n) =>
            MC(e, t).bind((t) =>
              MC(e, n).map((n) =>
                ((e, t, n) => {
                  const o = t.x,
                    r = t.y,
                    s = n.x,
                    a = n.y,
                    i = r < a ? IC(e, o, r, s, a) : IC(e, o, a, s, r);
                  return TC(e.element, LC(i), i);
                })(e, t, n)
              )
            ))(r, n, o).map((e) => Ff([FC(e)]));
        })
        .getOrThunk(zC),
    HC = (e, t, n) => {
      const o = cm(t, e);
      return o.length > 0
        ? jC(e, o)
        : ((e, t, n) =>
            t.length > 0 && t[0].collapsed
              ? zC()
              : ((e, t, n) =>
                  ((e, t) => {
                    const n = X(t, (e, t) => (yo(t, e), t), e);
                    return t.length > 0 ? Ff([n]) : n;
                  })(Cn(t.cloneContents()), UC(e, t, n)))(e, t[0], n))(e, t, n);
    },
    $C = (e, t) => t >= 0 && t < e.length && im(e.charAt(t)),
    VC = (e) => ei(e.innerText),
    qC = (e) =>
      er(e)
        ? e.outerHTML
        : dr(e)
        ? bs.encodeRaw(e.data, !1)
        : mr(e)
        ? "\x3c!--" + e.data + "--\x3e"
        : "",
    WC = (e, t) => (
      ((e, t) => {
        let n = 0;
        q(e, (e) => {
          0 === e[0]
            ? n++
            : 1 === e[0]
            ? (((e, t, n) => {
                const o = ((e) => {
                  let t;
                  const n = document.createElement("div"),
                    o = document.createDocumentFragment();
                  for (e && (n.innerHTML = e); (t = n.firstChild); )
                    o.appendChild(t);
                  return o;
                })(t);
                if (e.hasChildNodes() && n < e.childNodes.length) {
                  const t = e.childNodes[n];
                  e.insertBefore(o, t);
                } else e.appendChild(o);
              })(t, e[1], n),
              n++)
            : 2 === e[0] &&
              ((e, t) => {
                if (e.hasChildNodes() && t < e.childNodes.length) {
                  const n = e.childNodes[t];
                  e.removeChild(n);
                }
              })(t, n);
        });
      })(
        ((e, t) => {
          const n = e.length + t.length + 2,
            o = new Array(n),
            r = new Array(n),
            s = (n, o, r, a, l) => {
              const d = i(n, o, r, a);
              if (
                null === d ||
                (d.start === o && d.diag === o - a) ||
                (d.end === n && d.diag === n - r)
              ) {
                let s = n,
                  i = r;
                for (; s < o || i < a; )
                  s < o && i < a && e[s] === t[i]
                    ? (l.push([0, e[s]]), ++s, ++i)
                    : o - n > a - r
                    ? (l.push([2, e[s]]), ++s)
                    : (l.push([1, t[i]]), ++i);
              } else {
                s(n, d.start, r, d.start - d.diag, l);
                for (let t = d.start; t < d.end; ++t) l.push([0, e[t]]);
                s(d.end, o, d.end - d.diag, a, l);
              }
            },
            a = (n, o, r, s) => {
              let a = n;
              for (; a - o < s && a < r && e[a] === t[a - o]; ) ++a;
              return ((e, t, n) => ({ start: e, end: t, diag: n }))(n, a, o);
            },
            i = (n, s, i, l) => {
              const d = s - n,
                c = l - i;
              if (0 === d || 0 === c) return null;
              const u = d - c,
                m = c + d,
                f = (m % 2 == 0 ? m : m + 1) / 2;
              let g, p, h, b, v;
              for (o[1 + f] = n, r[1 + f] = s + 1, g = 0; g <= f; ++g) {
                for (p = -g; p <= g; p += 2) {
                  for (
                    h = p + f,
                      p === -g || (p !== g && o[h - 1] < o[h + 1])
                        ? (o[h] = o[h + 1])
                        : (o[h] = o[h - 1] + 1),
                      b = o[h],
                      v = b - n + i - p;
                    b < s && v < l && e[b] === t[v];

                  )
                    (o[h] = ++b), ++v;
                  if (
                    u % 2 != 0 &&
                    u - g <= p &&
                    p <= u + g &&
                    r[h - u] <= o[h]
                  )
                    return a(r[h - u], p + n - i, s, l);
                }
                for (p = u - g; p <= u + g; p += 2) {
                  for (
                    h = p + f - u,
                      p === u - g || (p !== u + g && r[h + 1] <= r[h - 1])
                        ? (r[h] = r[h + 1] - 1)
                        : (r[h] = r[h - 1]),
                      b = r[h] - 1,
                      v = b - n + i - p;
                    b >= n && v >= i && e[b] === t[v];

                  )
                    (r[h] = b--), v--;
                  if (u % 2 == 0 && -g <= p && p <= g && r[h] <= o[h + u])
                    return a(r[h], p + n - i, s, l);
                }
              }
              return null;
            },
            l = [];
          return s(0, e.length, 0, t.length, l), l;
        })(V(ce(t.childNodes), qC), e),
        t
      ),
      t
    ),
    KC = Le(() => document.implementation.createHTMLDocument("undo")),
    YC = (e) => {
      const t = e.serializer.getTempAttrs(),
        n = mp(e.getBody(), t);
      return ((e) => null !== e.querySelector("iframe"))(n)
        ? {
            type: "fragmented",
            fragments: Y(V(ce(n.childNodes), _(ei, qC)), (e) => e.length > 0),
            content: "",
            bookmark: null,
            beforeBookmark: null,
          }
        : {
            type: "complete",
            fragments: null,
            content: ei(n.innerHTML),
            bookmark: null,
            beforeBookmark: null,
          };
    },
    GC = (e, t, n) => {
      const o = n ? t.beforeBookmark : t.bookmark;
      "fragmented" === t.type
        ? WC(t.fragments, e.getBody())
        : e.setContent(t.content, {
            format: "raw",
            no_selection: !C(o) || !Yu(o) || !o.isFakeCaret,
          }),
        o && (e.selection.moveToBookmark(o), e.selection.scrollIntoView());
    },
    XC = (e) => ("fragmented" === e.type ? e.fragments.join("") : e.content),
    ZC = (e) => {
      const t = vn("body", KC());
      return No(t, XC(e)), q(zo(t, "*[data-mce-bogus]"), ko), So(t);
    },
    QC = (e, t) =>
      !(!e || !t) &&
      (!!((e, t) => XC(e) === XC(t))(e, t) ||
        ((e, t) => ZC(e) === ZC(t))(e, t)),
    JC = (e) => 0 === e.get(),
    ew = (e, t, n) => {
      JC(n) && (e.typing = t);
    },
    tw = (e, t) => {
      e.typing && (ew(e, !1, t), e.add());
    },
    nw = (e) => ({
      init: { bindEvents: k },
      undoManager: {
        beforeChange: (t, n) =>
          ((e, t, n) => {
            JC(t) && n.set(yl(e.selection));
          })(e, t, n),
        add: (t, n, o, r, s, a) =>
          ((e, t, n, o, r, s, a) => {
            const i = YC(e),
              l = Dt.extend(s || {}, i);
            if (!JC(o) || e.removed) return null;
            const d = t.data[n.get()];
            if (
              e
                .dispatch("BeforeAddUndo", {
                  level: l,
                  lastLevel: d,
                  originalEvent: a,
                })
                .isDefaultPrevented()
            )
              return null;
            if (d && QC(d, l)) return null;
            t.data[n.get()] &&
              r.get().each((e) => {
                t.data[n.get()].beforeBookmark = e;
              });
            const c = Fd(e);
            if (c && t.data.length > c) {
              for (let e = 0; e < t.data.length - 1; e++)
                t.data[e] = t.data[e + 1];
              t.data.length--, n.set(t.data.length);
            }
            (l.bookmark = yl(e.selection)),
              n.get() < t.data.length - 1 && (t.data.length = n.get() + 1),
              t.data.push(l),
              n.set(t.data.length - 1);
            const u = { level: l, lastLevel: d, originalEvent: a };
            return (
              n.get() > 0
                ? (e.setDirty(!0),
                  e.dispatch("AddUndo", u),
                  e.dispatch("change", u))
                : e.dispatch("AddUndo", u),
              l
            );
          })(e, t, n, o, r, s, a),
        undo: (t, n, o) =>
          ((e, t, n, o) => {
            let r;
            return (
              t.typing && (t.add(), (t.typing = !1), ew(t, !1, n)),
              o.get() > 0 &&
                (o.set(o.get() - 1),
                (r = t.data[o.get()]),
                GC(e, r, !0),
                e.setDirty(!0),
                e.dispatch("Undo", { level: r })),
              r
            );
          })(e, t, n, o),
        redo: (t, n) =>
          ((e, t, n) => {
            let o;
            return (
              t.get() < n.length - 1 &&
                (t.set(t.get() + 1),
                (o = n[t.get()]),
                GC(e, o, !1),
                e.setDirty(!0),
                e.dispatch("Redo", { level: o })),
              o
            );
          })(e, t, n),
        clear: (t, n) =>
          ((e, t, n) => {
            (t.data = []), n.set(0), (t.typing = !1), e.dispatch("ClearUndos");
          })(e, t, n),
        reset: (e) =>
          ((e) => {
            e.clear(), e.add();
          })(e),
        hasUndo: (t, n) =>
          ((e, t, n) =>
            n.get() > 0 || (t.typing && t.data[0] && !QC(YC(e), t.data[0])))(
            e,
            t,
            n
          ),
        hasRedo: (e, t) =>
          ((e, t) => t.get() < e.data.length - 1 && !e.typing)(e, t),
        transact: (e, t, n) =>
          ((e, t, n) => (tw(e, t), e.beforeChange(), e.ignore(n), e.add()))(
            e,
            t,
            n
          ),
        ignore: (e, t) =>
          ((e, t) => {
            try {
              e.set(e.get() + 1), t();
            } finally {
              e.set(e.get() - 1);
            }
          })(e, t),
        extra: (t, n, o, r) =>
          ((e, t, n, o, r) => {
            if (t.transact(o)) {
              const o = t.data[n.get()].bookmark,
                s = t.data[n.get() - 1];
              GC(e, s, !0),
                t.transact(r) && (t.data[n.get() - 1].beforeBookmark = o);
            }
          })(e, t, n, o, r),
      },
      formatter: {
        match: (t, n, o, r) => Kb(e, t, n, o, r),
        matchAll: (t, n) =>
          ((e, t, n) => {
            const o = [],
              r = {},
              s = e.selection.getStart();
            return (
              e.dom.getParent(
                s,
                (s) => {
                  for (let a = 0; a < t.length; a++) {
                    const i = t[a];
                    !r[i] && Wb(e, s, i, n) && ((r[i] = !0), o.push(i));
                  }
                },
                e.dom.getRoot()
              ),
              o
            );
          })(e, t, n),
        matchNode: (t, n, o, r) => Wb(e, t, n, o, r),
        canApply: (t) =>
          ((e, t) => {
            const n = e.formatter.get(t),
              o = e.dom;
            if (n && e.selection.isEditable()) {
              const t = e.selection.getStart(),
                r = Dm(o, t);
              for (let e = n.length - 1; e >= 0; e--) {
                const t = n[e];
                if (!Im(t)) return !0;
                for (let e = r.length - 1; e >= 0; e--)
                  if (o.is(r[e], t.selector)) return !0;
              }
            }
            return !1;
          })(e, t),
        closest: (t) =>
          ((e, t) => {
            const n = (t) => _n(t, Cn(e.getBody()));
            return I.from(e.selection.getStart(!0))
              .bind((o) =>
                zb(
                  Cn(o),
                  (n) =>
                    ue(t, (t) =>
                      ((t, n) => (Wb(e, t.dom, n) ? I.some(n) : I.none()))(n, t)
                    ),
                  n
                )
              )
              .getOrNull();
          })(e, t),
        apply: (t, n, o) => Hv(e, t, n, o),
        remove: (t, n, o, r) => Mv(e, t, n, o, r),
        toggle: (t, n, o) =>
          ((e, t, n, o) => {
            const r = e.formatter.get(t);
            r &&
              (!Kb(e, t, n, o) || ("toggle" in r[0] && !r[0].toggle)
                ? Hv(e, t, n, o)
                : Mv(e, t, n, o));
          })(e, t, n, o),
        formatChanged: (t, n, o, r, s) =>
          ((e, t, n, o, r, s) => (
            ((e, t, n, o, r, s) => {
              const a = t.get();
              q(n.split(","), (t) => {
                const n = Ee(a, t).getOrThunk(() => {
                    const e = {
                      withSimilar: {
                        state: ma(!1),
                        similar: !0,
                        callbacks: [],
                      },
                      withoutSimilar: {
                        state: ma(!1),
                        similar: !1,
                        callbacks: [],
                      },
                      withVars: [],
                    };
                    return (a[t] = e), e;
                  }),
                  i = () => {
                    const n = Wv(e);
                    return qv(e, n, t, r, s).isSome();
                  };
                if (v(s)) {
                  const e = r ? n.withSimilar : n.withoutSimilar;
                  e.callbacks.push(o),
                    1 === e.callbacks.length && e.state.set(i());
                } else
                  n.withVars.push({
                    state: ma(i()),
                    similar: r,
                    vars: s,
                    callback: o,
                  });
              }),
                t.set(a);
            })(e, t, n, o, r, s),
            {
              unbind: () =>
                ((e, t, n) => {
                  const o = e.get();
                  q(t.split(","), (e) =>
                    Ee(o, e).each((t) => {
                      o[e] = {
                        withSimilar: {
                          ...t.withSimilar,
                          callbacks: Y(t.withSimilar.callbacks, (e) => e !== n),
                        },
                        withoutSimilar: {
                          ...t.withoutSimilar,
                          callbacks: Y(
                            t.withoutSimilar.callbacks,
                            (e) => e !== n
                          ),
                        },
                        withVars: Y(t.withVars, (e) => e.callback !== n),
                      };
                    })
                  ),
                    e.set(o);
                })(t, n, o),
            }
          ))(e, t, n, o, r, s),
      },
      editor: {
        getContent: (t) =>
          ((e, t) =>
            I.from(e.getBody()).fold(
              N("tree" === t.format ? new Jg("body", 11) : ""),
              (n) => pp(e, t, n)
            ))(e, t),
        setContent: (t, n) =>
          ((e, t, n) =>
            I.from(e.getBody())
              .map((o) =>
                Ib(t)
                  ? ((e, t, n, o) => {
                      Cb(
                        e.parser.getNodeFilters(),
                        e.parser.getAttributeFilters(),
                        n
                      );
                      const r = vp({ validate: !1 }, e.schema).serialize(n),
                        s = ei(Ga(Cn(t)) ? r : Dt.trim(r));
                      return Fb(e, s, o.no_selection), { content: n, html: s };
                    })(e, o, t, n)
                  : ((e, t, n, o) => {
                      if (0 === (n = ei(n)).length || /^\s+$/.test(n)) {
                        const r = '<br data-mce-bogus="1">';
                        "TABLE" === t.nodeName
                          ? (n = "<tr><td>" + r + "</td></tr>")
                          : /^(UL|OL)$/.test(t.nodeName) &&
                            (n = "<li>" + r + "</li>");
                        const s = ql(e);
                        return (
                          e.schema.isValidChild(
                            t.nodeName.toLowerCase(),
                            s.toLowerCase()
                          )
                            ? ((n = r), (n = e.dom.createHTML(s, Wl(e), n)))
                            : n || (n = r),
                          Fb(e, n, o.no_selection),
                          { content: n, html: n }
                        );
                      }
                      {
                        "raw" !== o.format &&
                          (n = vp({ validate: !1 }, e.schema).serialize(
                            e.parser.parse(n, { isRootContent: !0, insert: !0 })
                          ));
                        const r = Ga(Cn(t)) ? n : Dt.trim(n);
                        return (
                          Fb(e, r, o.no_selection), { content: r, html: r }
                        );
                      }
                    })(e, o, t, n)
              )
              .getOr({ content: t, html: Ib(n.content) ? "" : n.content }))(
            e,
            t,
            n
          ),
        insertContent: (t, n) => Mb(e, t, n),
        addVisual: (t) =>
          ((e, t) => {
            const n = e.dom,
              o = C(t) ? t : e.getBody();
            q(n.select("table,a", o), (t) => {
              switch (t.nodeName) {
                case "TABLE":
                  const o = Kd(e),
                    r = n.getAttrib(t, "border");
                  (r && "0" !== r) || !e.hasVisual
                    ? n.removeClass(t, o)
                    : n.addClass(t, o);
                  break;
                case "A":
                  if (!n.getAttrib(t, "href")) {
                    const o = n.getAttrib(t, "name") || t.id,
                      r = Yd(e);
                    o && e.hasVisual ? n.addClass(t, r) : n.removeClass(t, r);
                  }
              }
            }),
              e.dispatch("VisualAid", { element: t, hasVisual: e.hasVisual });
          })(e, t),
      },
      selection: {
        getContent: (t, n) =>
          ((e, t, n = {}) => {
            const o = ((e, t) => ({
              ...e,
              format: t,
              get: !0,
              selection: !0,
              getInner: !0,
            }))(n, t);
            return SC(e, o).fold(R, (t) => {
              const n = ((e, t) => {
                if ("text" === t.format)
                  return ((e) =>
                    I.from(e.selection.getRng())
                      .map((t) => {
                        var n;
                        const o = I.from(
                            e.dom.getParent(
                              t.commonAncestorContainer,
                              e.dom.isBlock
                            )
                          ),
                          r = e.getBody(),
                          s = ((e) =>
                            e
                              .map((e) => e.nodeName)
                              .getOr("div")
                              .toLowerCase())(o),
                          a = Cn(t.cloneContents());
                        fp(a), gp(a);
                        const i = e.dom.add(
                            r,
                            s,
                            {
                              "data-mce-bogus": "all",
                              style: "overflow: hidden; opacity: 0;",
                            },
                            a.dom
                          ),
                          l = VC(i),
                          d = ei(
                            null !== (n = i.textContent) && void 0 !== n
                              ? n
                              : ""
                          );
                        if (
                          (e.dom.remove(i), $C(d, 0) || $C(d, d.length - 1))
                        ) {
                          const e = o.getOr(r),
                            t = VC(e),
                            n = t.indexOf(l);
                          return -1 === n
                            ? l
                            : ($C(t, n - 1) ? " " : "") +
                                l +
                                ($C(t, n + l.length) ? " " : "");
                        }
                        return l;
                      })
                      .getOr(""))(e);
                {
                  const n = ((e, t) => {
                    const n = e.selection.getRng(),
                      o = e.dom.create("body"),
                      r = e.selection.getSel(),
                      s = Yg(e, dm(r)),
                      a = t.contextual
                        ? HC(Cn(e.getBody()), s, e.schema).dom
                        : n.cloneContents();
                    return (
                      a && o.appendChild(a),
                      e.selection.serializer.serialize(o, t)
                    );
                  })(e, t);
                  return "tree" === t.format
                    ? n
                    : e.selection.isCollapsed()
                    ? ""
                    : n;
                }
              })(e, t);
              return NC(e, n, t);
            });
          })(e, t, n),
      },
      autocompleter: { addDecoration: k, removeDecoration: k },
      raw: { getModel: () => I.none() },
    }),
    ow = (e) => ke(e.plugins, "rtc"),
    rw = (e) => (e.rtcInstance ? e.rtcInstance : nw(e)),
    sw = (e) => {
      const t = e.rtcInstance;
      if (t) return t;
      throw new Error("Failed to get RTC instance not yet initialized.");
    },
    aw = (e) => sw(e).init.bindEvents(),
    iw = (e) => (0 === e.dom.length ? (Eo(e), I.none()) : I.some(e)),
    lw = (e, t, n, o, r) => {
      e.bind(
        (e) => (
          (o ? bh : hh)(e.dom, o ? e.dom.length : 0, r),
          t.filter(Yt).map((t) =>
            ((e, t, n, o, r) => {
              const s = e.dom,
                a = t.dom,
                i = o ? s.length : a.length;
              o
                ? (vh(s, a, r, !1, !o), n.setStart(a, i))
                : (vh(a, s, r, !1, !o), n.setEnd(a, i));
            })(e, t, n, o, r)
          )
        )
      ).orThunk(() => {
        const e = ((e, t) =>
          e.filter((e) => cf.isBookmarkNode(e.dom)).bind(t ? Dn : Pn))(t, o)
          .or(t)
          .filter(Yt);
        return e.map((e) =>
          ((e, t, n) => {
            Tn(e).each((o) => {
              const r = e.dom;
              t && ih(o, Qi(r, 0), n)
                ? hh(r, 0, n)
                : !t && lh(o, Qi(r, r.length), n) && bh(r, r.length, n);
            });
          })(e, o, r)
        );
      });
    },
    dw = (e, t, n) => {
      if (ke(e, t)) {
        const o = Y(e[t], (e) => e !== n);
        0 === o.length ? delete e[t] : (e[t] = o);
      }
    };
  const cw = (e) => !(!e || !e.ownerDocument) && Sn(Cn(e.ownerDocument), Cn(e)),
    uw = (e, t, n, o) => {
      let r, s;
      const { selectorChangedWithUnbind: a } = ((e, t) => {
          let n, o;
          const r = (t, n) => Q(n, (n) => e.is(n, t)),
            s = (t) => e.getParents(t, void 0, e.getRoot());
          return {
            selectorChangedWithUnbind: (e, a) => (
              n ||
                ((n = {}),
                (o = {}),
                t.on("NodeChange", (e) => {
                  const t = e.element,
                    a = s(t),
                    i = {};
                  pe(n, (e, t) => {
                    r(t, a).each((n) => {
                      o[t] ||
                        (q(e, (e) => {
                          e(!0, { node: n, selector: t, parents: a });
                        }),
                        (o[t] = e)),
                        (i[t] = e);
                    });
                  }),
                    pe(o, (e, n) => {
                      i[n] ||
                        (delete o[n],
                        q(e, (e) => {
                          e(!1, { node: t, selector: n, parents: a });
                        }));
                    });
                })),
              n[e] || (n[e] = []),
              n[e].push(a),
              r(e, s(t.selection.getStart())).each(() => {
                o[e] = n[e];
              }),
              {
                unbind: () => {
                  dw(n, e, a), dw(o, e, a);
                },
              }
            ),
          };
        })(e, o),
        i = (e, t) =>
          ((e, t, n = {}) => {
            const o = ((e, t) => ({
              format: "html",
              ...e,
              set: !0,
              selection: !0,
              content: t,
            }))(n, t);
            RC(e, o).each((t) => {
              const n = ((e, t) => {
                  if ("raw" !== t.format) {
                    const n = e.selection.getRng(),
                      o = e.dom.getParent(
                        n.commonAncestorContainer,
                        e.dom.isBlock
                      ),
                      r = o ? { context: o.nodeName.toLowerCase() } : {},
                      s = e.parser.parse(t.content, {
                        forced_root_block: !1,
                        ...r,
                        ...t,
                      });
                    return vp({ validate: !1 }, e.schema).serialize(s);
                  }
                  return t.content;
                })(e, t),
                o = e.selection.getRng();
              ((e, t, n) => {
                const o = I.from(t.firstChild).map(Cn),
                  r = I.from(t.lastChild).map(Cn);
                e.deleteContents(), e.insertNode(t);
                const s = o.bind(Pn).filter(Yt).bind(iw),
                  a = r.bind(Dn).filter(Yt).bind(iw);
                lw(s, o, e, !0, n), lw(a, r, e, !1, n), e.collapse(!1);
              })(o, o.createContextualFragment(n), e.schema),
                e.selection.setRng(o),
                bg(e, o),
                AC(e, n, t);
            });
          })(o, e, t),
        l = (e) => {
          const t = c();
          t.collapse(!!e), u(t);
        },
        d = () => (t.getSelection ? t.getSelection() : t.document.selection),
        c = () => {
          let n;
          const a = (e, t, n) => {
              try {
                return t.compareBoundaryPoints(e, n);
              } catch (e) {
                return -1;
              }
            },
            i = t.document;
          if (C(o.bookmark) && !zg(o)) {
            const e = Rg(o);
            if (e.isSome())
              return e.map((e) => Yg(o, [e])[0]).getOr(i.createRange());
          }
          try {
            const e = d();
            e &&
              !Jo(e.anchorNode) &&
              ((n = e.rangeCount > 0 ? e.getRangeAt(0) : i.createRange()),
              (n = Yg(o, [n])[0]));
          } catch (e) {}
          if (
            (n || (n = i.createRange()), fr(n.startContainer) && n.collapsed)
          ) {
            const t = e.getRoot();
            n.setStart(t, 0), n.setEnd(t, 0);
          }
          return (
            r &&
              s &&
              (0 === a(n.START_TO_START, n, r) && 0 === a(n.END_TO_END, n, r)
                ? (n = s)
                : ((r = null), (s = null))),
            n
          );
        },
        u = (e, t) => {
          if (!((e) => !!e && cw(e.startContainer) && cw(e.endContainer))(e))
            return;
          const n = d();
          if (
            ((e = o.dispatch("SetSelectionRange", {
              range: e,
              forward: t,
            }).range),
            n)
          ) {
            s = e;
            try {
              n.removeAllRanges(), n.addRange(e);
            } catch (e) {}
            !1 === t &&
              n.extend &&
              (n.collapse(e.endContainer, e.endOffset),
              n.extend(e.startContainer, e.startOffset)),
              (r = n.rangeCount > 0 ? n.getRangeAt(0) : null);
          }
          if (
            !e.collapsed &&
            e.startContainer === e.endContainer &&
            (null == n ? void 0 : n.setBaseAndExtent) &&
            e.endOffset - e.startOffset < 2 &&
            e.startContainer.hasChildNodes()
          ) {
            const t = e.startContainer.childNodes[e.startOffset];
            t &&
              "IMG" === t.nodeName &&
              (n.setBaseAndExtent(
                e.startContainer,
                e.startOffset,
                e.endContainer,
                e.endOffset
              ),
              (n.anchorNode === e.startContainer &&
                n.focusNode === e.endContainer) ||
                n.setBaseAndExtent(t, 0, t, 1));
          }
          o.dispatch("AfterSetSelectionRange", { range: e, forward: t });
        },
        m = () => {
          const t = d(),
            n = null == t ? void 0 : t.anchorNode,
            o = null == t ? void 0 : t.focusNode;
          if (!t || !n || !o || Jo(n) || Jo(o)) return !0;
          const r = e.createRng(),
            s = e.createRng();
          try {
            r.setStart(n, t.anchorOffset),
              r.collapse(!0),
              s.setStart(o, t.focusOffset),
              s.collapse(!0);
          } catch (e) {
            return !0;
          }
          return r.compareBoundaryPoints(r.START_TO_START, s) <= 0;
        },
        f = {
          dom: e,
          win: t,
          serializer: n,
          editor: o,
          expand: (t = { type: "word" }) => u(Zf(e).expand(c(), t)),
          collapse: l,
          setCursorLocation: (t, n) => {
            const r = e.createRng();
            C(t) && C(n)
              ? (r.setStart(t, n), r.setEnd(t, n), u(r), l(!1))
              : (hm(e, r, o.getBody(), !0), u(r));
          },
          getContent: (e) =>
            ((e, t = {}) =>
              ((e, t, n) => sw(e).selection.getContent(t, n))(
                e,
                t.format ? t.format : "html",
                t
              ))(o, e),
          setContent: i,
          getBookmark: (e, t) => g.getBookmark(e, t),
          moveToBookmark: (e) => g.moveToBookmark(e),
          select: (t, n) => (
            ((e, t, n) =>
              I.from(t).bind((t) =>
                I.from(t.parentNode).map((o) => {
                  const r = e.nodeIndex(t),
                    s = e.createRng();
                  return (
                    s.setStart(o, r),
                    s.setEnd(o, r + 1),
                    n && (hm(e, s, t, !0), hm(e, s, t, !1)),
                    s
                  );
                })
              ))(e, t, n).each(u),
            t
          ),
          isCollapsed: () => {
            const e = c(),
              t = d();
            return (
              !(!e || e.item) &&
              (e.compareEndPoints
                ? 0 === e.compareEndPoints("StartToEnd", e)
                : !t || e.collapsed)
            );
          },
          isEditable: () => {
            const t = c(),
              n = o.getBody().querySelectorAll('[data-mce-selected="1"]');
            return n.length > 0
              ? ne(n, (t) => e.isEditable(t.parentElement))
              : $g(e, t);
          },
          isForward: m,
          setNode: (t) => (i(e.getOuterHTML(t)), t),
          getNode: () =>
            ((e, t) => {
              if (!t) return e;
              let n = t.startContainer,
                o = t.endContainer;
              const r = t.startOffset,
                s = t.endOffset;
              let a = t.commonAncestorContainer;
              t.collapsed ||
                (n === o &&
                  s - r < 2 &&
                  n.hasChildNodes() &&
                  (a = n.childNodes[r]),
                dr(n) &&
                  dr(o) &&
                  ((n = n.length === r ? Kg(n.nextSibling, !0) : n.parentNode),
                  (o = 0 === s ? Kg(o.previousSibling, !1) : o.parentNode),
                  n && n === o && (a = n)));
              const i = dr(a) ? a.parentNode : a;
              return tr(i) ? i : e;
            })(o.getBody(), c()),
          getSel: d,
          setRng: u,
          getRng: c,
          getStart: (e) => qg(o.getBody(), c(), e),
          getEnd: (e) => Wg(o.getBody(), c(), e),
          getSelectedBlocks: (t, n) =>
            ((e, t, n, o) => {
              const r = [],
                s = e.getRoot(),
                a = e.getParent(n || qg(s, t, t.collapsed), e.isBlock),
                i = e.getParent(o || Wg(s, t, t.collapsed), e.isBlock);
              if ((a && a !== s && r.push(a), a && i && a !== i)) {
                let t;
                const n = new Vo(a, s);
                for (; (t = n.next()) && t !== i; ) e.isBlock(t) && r.push(t);
              }
              return i && a !== i && i !== s && r.push(i), r;
            })(e, c(), t, n),
          normalize: () => {
            const t = c(),
              n = d();
            if (!(dm(n).length > 1) && bm(o)) {
              const n = Yf(e, t);
              return (
                n.each((e) => {
                  u(e, m());
                }),
                n.getOr(t)
              );
            }
            return t;
          },
          selectorChanged: (e, t) => (a(e, t), f),
          selectorChangedWithUnbind: a,
          getScrollContainer: () => {
            let t,
              n = e.getRoot();
            for (; n && "BODY" !== n.nodeName; ) {
              if (n.scrollHeight > n.clientHeight) {
                t = n;
                break;
              }
              n = n.parentNode;
            }
            return t;
          },
          scrollIntoView: (e, t) => {
            C(e)
              ? ((e, t, n) => {
                  (e.inline ? gg : hg)(e, t, n);
                })(o, e, t)
              : bg(o, c(), t);
          },
          placeCaretAt: (e, t) => u(zf(e, t, o.getDoc())),
          getBoundingClientRect: () => {
            const e = c();
            return e.collapsed
              ? Qi.fromRangeStart(e).getClientRects()[0]
              : e.getBoundingClientRect();
          },
          destroy: () => {
            (t = r = s = null), p.destroy();
          },
        },
        g = cf(f),
        p = kf(f, o);
      return (f.bookmarkManager = g), (f.controlSelection = p), f;
    },
    mw = (e, t, n) => {
      -1 === Dt.inArray(t, n) &&
        (e.addAttributeFilter(n, (e, t) => {
          let n = e.length;
          for (; n--; ) e[n].attr(t, null);
        }),
        t.push(n));
    },
    fw = (e, t) => {
      const n = ["data-mce-selected"],
        o = {
          entity_encoding: "named",
          remove_trailing_brs: !0,
          pad_empty_with_br: !1,
          ...e,
        },
        r = t && t.dom ? t.dom : da.DOM,
        s = t && t.schema ? t.schema : Ds(o),
        a = EC(o, s);
      return (
        ((e, t, n) => {
          e.addAttributeFilter("data-mce-tabindex", (e, t) => {
            let n = e.length;
            for (; n--; ) {
              const o = e[n];
              o.attr("tabindex", o.attr("data-mce-tabindex")), o.attr(t, null);
            }
          }),
            e.addAttributeFilter("src,href,style", (e, o) => {
              const r = "data-mce-" + o,
                s = t.url_converter,
                a = t.url_converter_scope;
              let i = e.length;
              for (; i--; ) {
                const t = e[i];
                let l = t.attr(r);
                void 0 !== l
                  ? (t.attr(o, l.length > 0 ? l : null), t.attr(r, null))
                  : ((l = t.attr(o)),
                    "style" === o
                      ? (l = n.serializeStyle(n.parseStyle(l), t.name))
                      : s && (l = s.call(a, l, o, t.name)),
                    t.attr(o, l.length > 0 ? l : null));
              }
            }),
            e.addAttributeFilter("class", (e) => {
              let t = e.length;
              for (; t--; ) {
                const n = e[t];
                let o = n.attr("class");
                o &&
                  ((o = o.replace(/(?:^|\s)mce-item-\w+(?!\S)/g, "")),
                  n.attr("class", o.length > 0 ? o : null));
              }
            }),
            e.addAttributeFilter("data-mce-type", (e, t, n) => {
              let o = e.length;
              for (; o--; ) {
                const t = e[o];
                if ("bookmark" === t.attr("data-mce-type") && !n.cleanup) {
                  const e = I.from(t.firstChild).exists((e) => {
                    var t;
                    return !Ja(null !== (t = e.value) && void 0 !== t ? t : "");
                  });
                  e ? t.unwrap() : t.remove();
                }
              }
            }),
            e.addNodeFilter("noscript", (e) => {
              var t;
              let n = e.length;
              for (; n--; ) {
                const o = e[n].firstChild;
                o &&
                  (o.value = bs.decode(
                    null !== (t = o.value) && void 0 !== t ? t : ""
                  ));
              }
            }),
            e.addNodeFilter("script,style", (e, n) => {
              var o;
              const r = (e) =>
                e
                  .replace(/(<!--\[CDATA\[|\]\]-->)/g, "\n")
                  .replace(/^[\r\n]*|[\r\n]*$/g, "")
                  .replace(
                    /^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,
                    ""
                  )
                  .replace(
                    /\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,
                    ""
                  );
              let s = e.length;
              for (; s--; ) {
                const a = e[s],
                  i = a.firstChild,
                  l =
                    null !== (o = null == i ? void 0 : i.value) && void 0 !== o
                      ? o
                      : "";
                if ("script" === n) {
                  const e = a.attr("type");
                  e &&
                    a.attr(
                      "type",
                      "mce-no/type" === e ? null : e.replace(/^mce\-/, "")
                    ),
                    "xhtml" === t.element_format &&
                      i &&
                      l.length > 0 &&
                      (i.value = "// <![CDATA[\n" + r(l) + "\n// ]]>");
                } else
                  "xhtml" === t.element_format &&
                    i &&
                    l.length > 0 &&
                    (i.value = "\x3c!--\n" + r(l) + "\n--\x3e");
              }
            }),
            e.addNodeFilter("#comment", (e) => {
              let o = e.length;
              for (; o--; ) {
                const r = e[o],
                  s = r.value;
                t.preserve_cdata &&
                0 === (null == s ? void 0 : s.indexOf("[CDATA["))
                  ? ((r.name = "#cdata"),
                    (r.type = 4),
                    (r.value = n.decode(s.replace(/^\[CDATA\[|\]\]$/g, ""))))
                  : 0 === (null == s ? void 0 : s.indexOf("mce:protected ")) &&
                    ((r.name = "#text"),
                    (r.type = 3),
                    (r.raw = !0),
                    (r.value = unescape(s).substr(14)));
              }
            }),
            e.addNodeFilter("xml:namespace,input", (e, t) => {
              let n = e.length;
              for (; n--; ) {
                const o = e[n];
                7 === o.type
                  ? o.remove()
                  : 1 === o.type &&
                    ("input" !== t || o.attr("type") || o.attr("type", "text"));
              }
            }),
            e.addAttributeFilter("data-mce-type", (t) => {
              q(t, (t) => {
                "format-caret" === t.attr("data-mce-type") &&
                  (t.isEmpty(e.schema.getNonEmptyElements())
                    ? t.remove()
                    : t.unwrap());
              });
            }),
            e.addAttributeFilter(
              "data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-block,data-mce-type,data-mce-resize,data-mce-placeholder",
              (e, t) => {
                let n = e.length;
                for (; n--; ) e[n].attr(t, null);
              }
            ),
            t.remove_trailing_brs &&
              ((e, t, n) => {
                t.addNodeFilter("br", (t, o, r) => {
                  const s = Dt.extend({}, n.getBlockElements()),
                    a = n.getNonEmptyElements(),
                    i = n.getWhitespaceElements();
                  s.body = 1;
                  const l = (e) => e.name in s || Gr(n, e);
                  for (let o = 0, d = t.length; o < d; o++) {
                    let d = t[o],
                      c = d.parent;
                    if (c && l(c) && d === c.lastChild) {
                      let t = d.prev;
                      for (; t; ) {
                        const e = t.name;
                        if (
                          "span" !== e ||
                          "bookmark" !== t.attr("data-mce-type")
                        ) {
                          "br" === e && (d = null);
                          break;
                        }
                        t = t.prev;
                      }
                      if (d && (d.remove(), Eb(n, a, i, c))) {
                        const t = n.getElementRule(c.name);
                        t &&
                          (t.removeEmpty
                            ? c.remove()
                            : t.paddEmpty && wb(e, r, l, c));
                      }
                    } else {
                      let e = d;
                      for (
                        ;
                        c &&
                        c.firstChild === e &&
                        c.lastChild === e &&
                        ((e = c), !s[c.name]);

                      )
                        c = c.parent;
                      if (e === c) {
                        const e = new Jg("#text", 3);
                        (e.value = Wo), d.replace(e);
                      }
                    }
                  }
                });
              })(t, e, e.schema);
        })(a, o, r),
        {
          schema: s,
          addNodeFilter: a.addNodeFilter,
          addAttributeFilter: a.addAttributeFilter,
          serialize: (e, n = {}) => {
            const i = { format: "html", ...n },
              l = ((e, t, n) =>
                ((e, t) =>
                  C(e) && e.hasEventListeners("PreProcess") && !t.no_events)(
                  e,
                  n
                )
                  ? ((e, t, n) => {
                      let o;
                      const r = e.dom;
                      let s = t.cloneNode(!0);
                      const a = document.implementation;
                      if (a.createHTMLDocument) {
                        const e = a.createHTMLDocument("");
                        Dt.each(
                          "BODY" === s.nodeName ? s.childNodes : [s],
                          (t) => {
                            e.body.appendChild(e.importNode(t, !0));
                          }
                        ),
                          (s =
                            "BODY" !== s.nodeName ? e.body.firstChild : e.body),
                          (o = r.doc),
                          (r.doc = e);
                      }
                      return (
                        ((e, t) => {
                          e.dispatch("PreProcess", t);
                        })(e, { ...n, node: s }),
                        o && (r.doc = o),
                        s
                      );
                    })(e, t, n)
                  : t)(t, e, i),
              d = ((e, t, n) => {
                const o = ei(n.getInner ? t.innerHTML : e.getOuterHTML(t));
                return n.selection || Ga(Cn(t)) ? o : Dt.trim(o);
              })(r, l, i),
              c = ((e, t, n) => {
                const o = n.selection ? { forced_root_block: !1, ...n } : n,
                  r = e.parse(t, o);
                return (
                  ((e) => {
                    const t = (e) => "br" === (null == e ? void 0 : e.name),
                      n = e.lastChild;
                    if (t(n)) {
                      const e = n.prev;
                      t(e) && (n.remove(), e.remove());
                    }
                  })(r),
                  r
                );
              })(a, d, i);
            return "tree" === i.format
              ? c
              : ((e, t, n, o, r) => {
                  const s = ((e, t, n) => vp(e, t).serialize(n))(t, n, o);
                  return ((e, t, n) => {
                    if (!t.no_events && e) {
                      const o = ((e, t) => e.dispatch("PostProcess", t))(e, {
                        ...t,
                        content: n,
                      });
                      return o.content;
                    }
                    return n;
                  })(e, r, s);
                })(t, o, s, c, i);
          },
          addRules: s.addValidElements,
          setRules: s.setValidElements,
          addTempAttr: T(mw, a, n),
          getTempAttrs: N(n),
          getNodeFilters: a.getNodeFilters,
          getAttributeFilters: a.getAttributeFilters,
          removeNodeFilter: a.removeNodeFilter,
          removeAttributeFilter: a.removeAttributeFilter,
        }
      );
    },
    gw = (e, t) => {
      const n = fw(e, t);
      return {
        schema: n.schema,
        addNodeFilter: n.addNodeFilter,
        addAttributeFilter: n.addAttributeFilter,
        serialize: n.serialize,
        addRules: n.addRules,
        setRules: n.setRules,
        addTempAttr: n.addTempAttr,
        getTempAttrs: n.getTempAttrs,
        getNodeFilters: n.getNodeFilters,
        getAttributeFilters: n.getAttributeFilters,
        removeNodeFilter: n.removeNodeFilter,
        removeAttributeFilter: n.removeAttributeFilter,
      };
    },
    pw = (e, t, n = {}) => {
      const o = ((e, t) => ({ format: "html", ...e, set: !0, content: t }))(
        n,
        t
      );
      return RC(e, o)
        .map((t) => {
          const n = ((e, t, n) => rw(e).editor.setContent(t, n))(
            e,
            t.content,
            t
          );
          return AC(e, n.html, t), n.content;
        })
        .getOr(t);
    },
    hw =
      "autoresize_on_init,content_editable_state,padd_empty_with_br,block_elements,boolean_attributes,editor_deselector,editor_selector,elements,file_browser_callback_types,filepicker_validator_handler,force_hex_style_colors,force_p_newlines,gecko_spellcheck,images_dataimg_filter,media_scripts,mode,move_caret_before_on_enter_elements,non_empty_elements,self_closing_elements,short_ended_elements,special,spellchecker_select_languages,spellchecker_whitelist,tab_focus,tabfocus_elements,table_responsive_width,text_block_elements,text_inline_elements,toolbar_drawer,types,validate,whitespace_elements,paste_enable_default_filters,paste_filter_drop,paste_word_valid_elements,paste_retain_style_properties,paste_convert_word_fake_lists,template_cdate_classes,template_mdate_classes,template_selected_content_classes,template_preview_replace_values,template_replace_values,templates,template_cdate_format,template_mdate_format".split(
        ","
      ),
    bw = [],
    vw =
      "bbcode,colorpicker,contextmenu,fullpage,legacyoutput,spellchecker,template,textcolor,rtc".split(
        ","
      ),
    yw = [],
    Cw = (e, t) => {
      const n = Y(t, (t) => ke(e, t));
      return ae(n);
    },
    ww = (e) => {
      const t = Cw(e, hw),
        n = e.forced_root_block;
      return (
        (!1 !== n && "" !== n) || t.push("forced_root_block (false only)"),
        ae(t)
      );
    },
    xw = (e) => Cw(e, bw),
    Ew = (e, t) => {
      const n = Dt.makeMap(e.plugins, " "),
        o = Y(t, (e) => ke(n, e));
      return ae(o);
    },
    kw = (e) => Ew(e, vw),
    _w = (e) =>
      Ew(
        e,
        yw.map((e) => e.name)
      ),
    Sw = (e) =>
      Q(yw, (t) => t.name === e).fold(
        () => e,
        (t) => (t.replacedWith ? `${e}, replaced by ${t.replacedWith}` : e)
      ),
    Nw = da.DOM,
    Rw = (e) => I.from(e).each((e) => e.destroy()),
    Aw = (() => {
      const e = {};
      return {
        add: (t, n) => {
          e[t] = n;
        },
        get: (t) => (e[t] ? e[t] : { icons: {} }),
        has: (t) => ke(e, t),
      };
    })(),
    Tw = ba.ModelManager,
    Ow = (e, t) => t.dom[e],
    Bw = (e, t) => parseInt(uo(t, e), 10),
    Pw = T(Ow, "clientWidth"),
    Dw = T(Ow, "clientHeight"),
    Lw = T(Bw, "margin-top"),
    Mw = T(Bw, "margin-left"),
    Iw = (e) => {
      const t = [],
        n = () => {
          const t = e.theme;
          return t && t.getNotificationManagerImpl
            ? t.getNotificationManagerImpl()
            : (() => {
                const e = () => {
                  throw new Error(
                    "Theme did not provide a NotificationManager implementation."
                  );
                };
                return { open: e, close: e, getArgs: e };
              })();
        },
        o = () => I.from(t[0]),
        r = () => {
          q(t, (e) => {
            e.reposition();
          });
        },
        s = (e) => {
          J(t, (t) => t === e).each((e) => {
            t.splice(e, 1);
          });
        },
        a = (a, i = !0) =>
          e.removed ||
          !((e) => {
            return ((t = e.inline ? e.getBody() : e.getContentAreaContainer()),
            I.from(t).map(Cn))
              .map(Xn)
              .getOr(!1);
            var t;
          })(e)
            ? {}
            : (i && e.dispatch("BeforeOpenNotification", { notification: a }),
              Q(t, (e) => {
                return (
                  (t = n().getArgs(e)),
                  (o = a),
                  !(
                    t.type !== o.type ||
                    t.text !== o.text ||
                    t.progressBar ||
                    t.timeout ||
                    o.progressBar ||
                    o.timeout
                  )
                );
                var t, o;
              }).getOrThunk(() => {
                e.editorManager.setActive(e);
                const i = n().open(a, () => {
                  s(i),
                    r(),
                    jg(e) &&
                      o().fold(
                        () => e.focus(),
                        (e) => vg(Cn(e.getEl()))
                      );
                });
                return (
                  ((e) => {
                    t.push(e);
                  })(i),
                  r(),
                  e.dispatch("OpenNotification", { notification: { ...i } }),
                  i
                );
              })),
        i = N(t);
      return (
        ((e) => {
          e.on("SkinLoaded", () => {
            const t = xd(e);
            t && a({ text: t, type: "warning", timeout: 0 }, !1), r();
          }),
            e.on("show ResizeEditor ResizeWindow NodeChange", () => {
              requestAnimationFrame(r);
            }),
            e.on("remove", () => {
              q(t.slice(), (e) => {
                n().close(e);
              });
            });
        })(e),
        {
          open: a,
          close: () => {
            o().each((e) => {
              n().close(e), s(e), r();
            });
          },
          getNotifications: i,
        }
      );
    },
    Fw = ba.PluginManager,
    Uw = ba.ThemeManager,
    zw = (e) => {
      let t = [];
      const n = () => {
          const t = e.theme;
          return t && t.getWindowManagerImpl
            ? t.getWindowManagerImpl()
            : (() => {
                const e = () => {
                  throw new Error(
                    "Theme did not provide a WindowManager implementation."
                  );
                };
                return { open: e, openUrl: e, alert: e, confirm: e, close: e };
              })();
        },
        o =
          (e, t) =>
          (...n) =>
            t ? t.apply(e, n) : void 0,
        r = (n) => {
          ((t) => {
            e.dispatch("CloseWindow", { dialog: t });
          })(n),
            (t = Y(t, (e) => e !== n)),
            0 === t.length && e.focus();
        },
        s = (n) => {
          e.editorManager.setActive(e), Ng(e), e.ui.show();
          const o = n();
          return (
            ((n) => {
              t.push(n),
                ((t) => {
                  e.dispatch("OpenWindow", { dialog: t });
                })(n);
            })(o),
            o
          );
        };
      return (
        e.on("remove", () => {
          q(t, (e) => {
            n().close(e);
          });
        }),
        {
          open: (e, t) => s(() => n().open(e, t, r)),
          openUrl: (e) => s(() => n().openUrl(e, r)),
          alert: (e, t, r) => {
            const s = n();
            s.alert(e, o(r || s, t));
          },
          confirm: (e, t, r) => {
            const s = n();
            s.confirm(e, o(r || s, t));
          },
          close: () => {
            I.from(t[t.length - 1]).each((e) => {
              n().close(e), r(e);
            });
          },
        }
      );
    },
    jw = (e, t) => {
      e.notificationManager.open({ type: "error", text: t });
    },
    Hw = (e, t) => {
      e._skinLoaded
        ? jw(e, t)
        : e.on("SkinLoaded", () => {
            jw(e, t);
          });
    },
    $w = (e, t, n) => {
      mf(e, t, { message: n }), console.error(n);
    },
    Vw = (e, t, n) =>
      n
        ? `Failed to load ${e}: ${n} from url ${t}`
        : `Failed to load ${e} url: ${t}`,
    qw = (e, ...t) => {
      const n = window.console;
      n && (n.error ? n.error(e, ...t) : n.log(e, ...t));
    },
    Ww = (e) => "content/" + e + "/content.css",
    Kw = (e, t) => {
      const n = e.editorManager.baseURL + "/skins/content",
        o = `content${e.editorManager.suffix}.css`;
      return V(t, (t) =>
        ((e) => tinymce.Resource.has(Ww(e)))(t)
          ? t
          : ((e) => /^[a-z0-9\-]+$/i.test(e))(t) && !e.inline
          ? `${n}/${t}/${o}`
          : e.documentBaseURI.toAbsolute(t)
      );
    },
    Yw = (e, t) => {
      const n = {};
      return {
        findAll: (o, r = M) => {
          const s = Y(
              ((e) => (e ? ce(e.getElementsByTagName("img")) : []))(o),
              (t) => {
                const n = t.src;
                return (
                  !t.hasAttribute("data-mce-bogus") &&
                  !t.hasAttribute("data-mce-placeholder") &&
                  !(!n || n === Tt.transparentSrc) &&
                  ($e(n, "blob:")
                    ? !e.isUploaded(n) && r(t)
                    : !!$e(n, "data:") && r(t))
                );
              }
            ),
            a = V(s, (e) => {
              const o = e.src;
              if (ke(n, o))
                return n[o].then((t) =>
                  m(t) ? t : { image: e, blobInfo: t.blobInfo }
                );
              {
                const r = ((e, t) => {
                  const n = () => Promise.reject("Invalid data URI");
                  if ($e(t, "blob:")) {
                    const s = e.getByUri(t);
                    return C(s)
                      ? Promise.resolve(s)
                      : ((o = t),
                        $e(o, "blob:")
                          ? ((e) =>
                              fetch(e)
                                .then((e) =>
                                  e.ok ? e.blob() : Promise.reject()
                                )
                                .catch(() =>
                                  Promise.reject({
                                    message: `Cannot convert ${e} to Blob. Resource might not exist or is inaccessible.`,
                                    uriType: "blob",
                                  })
                                ))(o)
                          : $e(o, "data:")
                          ? ((r = o),
                            new Promise((e, t) => {
                              Zv(r)
                                .bind(
                                  ({ type: e, data: t, base64Encoded: n }) =>
                                    Qv(e, t, n)
                                )
                                .fold(() => t("Invalid data URI"), e);
                            }))
                          : Promise.reject("Unknown URI format")).then((t) =>
                          Jv(t).then((o) =>
                            ty(o, !1, (n) => I.some(ny(e, t, n))).getOrThunk(n)
                          )
                        );
                  }
                  var o, r;
                  return $e(t, "data:")
                    ? oy(e, t).fold(n, (e) => Promise.resolve(e))
                    : Promise.reject("Unknown image data format");
                })(t, o)
                  .then((t) => (delete n[o], { image: e, blobInfo: t }))
                  .catch((e) => (delete n[o], e));
                return (n[o] = r), r;
              }
            });
          return Promise.all(a);
        },
      };
    },
    Gw = () => {
      let e = {};
      const t = (e, t) => ({ status: e, resultUri: t }),
        n = (t) => t in e;
      return {
        hasBlobUri: n,
        getResultUri: (t) => {
          const n = e[t];
          return n ? n.resultUri : null;
        },
        isPending: (t) => !!n(t) && 1 === e[t].status,
        isUploaded: (t) => !!n(t) && 2 === e[t].status,
        markPending: (n) => {
          e[n] = t(1, null);
        },
        markUploaded: (n, o) => {
          e[n] = t(2, o);
        },
        removeFailed: (t) => {
          delete e[t];
        },
        destroy: () => {
          e = {};
        },
      };
    };
  let Xw = 0;
  const Zw = (e, t) => {
      const n = {},
        o = (e, n) =>
          new Promise((o, r) => {
            const s = new XMLHttpRequest();
            s.open("POST", t.url),
              (s.withCredentials = t.credentials),
              (s.upload.onprogress = (e) => {
                n((e.loaded / e.total) * 100);
              }),
              (s.onerror = () => {
                r(
                  "Image upload failed due to a XHR Transport error. Code: " +
                    s.status
                );
              }),
              (s.onload = () => {
                if (s.status < 200 || s.status >= 300)
                  return void r("HTTP Error: " + s.status);
                const e = JSON.parse(s.responseText);
                var n, a;
                e && m(e.location)
                  ? o(
                      ((n = t.basePath),
                      (a = e.location),
                      n ? n.replace(/\/$/, "") + "/" + a.replace(/^\//, "") : a)
                    )
                  : r("Invalid JSON: " + s.responseText);
              });
            const a = new FormData();
            a.append("file", e.blob(), e.filename()), s.send(a);
          }),
        r = w(t.handler) ? t.handler : o,
        s = (e, t) => ({ url: t, blobInfo: e, status: !0 }),
        a = (e, t) => ({ url: "", blobInfo: e, status: !1, error: t }),
        i = (e, t) => {
          Dt.each(n[e], (e) => {
            e(t);
          }),
            delete n[e];
        };
      return {
        upload: (l, d) =>
          t.url || r !== o
            ? ((t, o) => (
                (t = Dt.grep(t, (t) => !e.isUploaded(t.blobUri()))),
                Promise.all(
                  Dt.map(t, (t) =>
                    e.isPending(t.blobUri())
                      ? ((e) => {
                          const t = e.blobUri();
                          return new Promise((e) => {
                            (n[t] = n[t] || []), n[t].push(e);
                          });
                        })(t)
                      : ((t, n, o) => (
                          e.markPending(t.blobUri()),
                          new Promise((r) => {
                            let l, d;
                            try {
                              const c = () => {
                                  l && (l.close(), (d = k));
                                },
                                u = (n) => {
                                  c(),
                                    e.markUploaded(t.blobUri(), n),
                                    i(t.blobUri(), s(t, n)),
                                    r(s(t, n));
                                },
                                f = (n) => {
                                  c(),
                                    e.removeFailed(t.blobUri()),
                                    i(t.blobUri(), a(t, n)),
                                    r(a(t, n));
                                };
                              (d = (e) => {
                                e < 0 ||
                                  e > 100 ||
                                  I.from(l)
                                    .orThunk(() => I.from(o).map(P))
                                    .each((t) => {
                                      (l = t), t.progressBar.value(e);
                                    });
                              }),
                                n(t, d).then(u, (e) => {
                                  f(m(e) ? { message: e } : e);
                                });
                            } catch (e) {
                              r(a(t, e));
                            }
                          })
                        ))(t, r, o)
                  )
                )
              ))(l, d)
            : new Promise((e) => {
                e([]);
              }),
      };
    },
    Qw = (e) => () =>
      e.notificationManager.open({
        text: e.translate("Image uploading..."),
        type: "info",
        timeout: -1,
        progressBar: !0,
      }),
    Jw = (e, t) =>
      Zw(t, {
        url: od(e),
        basePath: rd(e),
        credentials: sd(e),
        handler: ad(e),
      }),
    ex = (e) => {
      const t = (() => {
        let e = [];
        const t = (e) => {
            if (!e.blob || !e.base64)
              throw new Error(
                "blob and base64 representations of the image are required for BlobInfo to be created"
              );
            const t =
                e.id ||
                "blobid" +
                  Xw++ +
                  (() => {
                    const e = () =>
                      Math.round(4294967295 * Math.random()).toString(36);
                    return (
                      "s" + new Date().getTime().toString(36) + e() + e() + e()
                    );
                  })(),
              n = e.name || t,
              o = e.blob;
            var r;
            return {
              id: N(t),
              name: N(n),
              filename: N(
                e.filename ||
                  n +
                    "." +
                    ((r = o.type),
                    {
                      "image/jpeg": "jpg",
                      "image/jpg": "jpg",
                      "image/gif": "gif",
                      "image/png": "png",
                      "image/apng": "apng",
                      "image/avif": "avif",
                      "image/svg+xml": "svg",
                      "image/webp": "webp",
                      "image/bmp": "bmp",
                      "image/tiff": "tiff",
                    }[r.toLowerCase()] || "dat")
              ),
              blob: N(o),
              base64: N(e.base64),
              blobUri: N(e.blobUri || URL.createObjectURL(o)),
              uri: N(e.uri),
            };
          },
          n = (t) => Q(e, t).getOrUndefined(),
          o = (e) => n((t) => t.id() === e);
        return {
          create: (e, n, o, r, s) => {
            if (m(e))
              return t({ id: e, name: r, filename: s, blob: n, base64: o });
            if (f(e)) return t(e);
            throw new Error("Unknown input type");
          },
          add: (t) => {
            o(t.id()) || e.push(t);
          },
          get: o,
          getByUri: (e) => n((t) => t.blobUri() === e),
          getByData: (e, t) =>
            n((n) => n.base64() === e && n.blob().type === t),
          findFirst: n,
          removeByUri: (t) => {
            e = Y(
              e,
              (e) => e.blobUri() !== t || (URL.revokeObjectURL(e.blobUri()), !1)
            );
          },
          destroy: () => {
            q(e, (e) => {
              URL.revokeObjectURL(e.blobUri());
            }),
              (e = []);
          },
        };
      })();
      let n, o;
      const r = Gw(),
        s = [],
        a = (t) => (n) => e.selection ? t(n) : [],
        i = (e, t, n) => {
          let o = 0;
          do {
            (o = e.indexOf(t, o)),
              -1 !== o &&
                ((e = e.substring(0, o) + n + e.substr(o + t.length)),
                (o += n.length - t.length + 1));
          } while (-1 !== o);
          return e;
        },
        l = (e, t, n) => {
          const o = `src="${n}"${
            n === Tt.transparentSrc ? ' data-mce-placeholder="1"' : ""
          }`;
          return (
            (e = i(e, `src="${t}"`, o)),
            i(e, 'data-mce-src="' + t + '"', 'data-mce-src="' + n + '"')
          );
        },
        d = (t, n) => {
          q(e.undoManager.data, (e) => {
            "fragmented" === e.type
              ? (e.fragments = V(e.fragments, (e) => l(e, t, n)))
              : (e.content = l(e.content, t, n));
          });
        },
        c = () => (
          n || (n = Jw(e, r)),
          p().then(
            a((o) => {
              const r = V(o, (e) => e.blobInfo);
              return n.upload(r, Qw(e)).then(
                a((n) => {
                  const r = [];
                  let s = !1;
                  const a = V(n, (n, a) => {
                    const { blobInfo: i, image: l } = o[a];
                    let c = !1;
                    return (
                      n.status && ed(e)
                        ? (n.url && !He(l.src, n.url) && (s = !0),
                          t.removeByUri(l.src),
                          ow(e) ||
                            ((t, n) => {
                              const o = e.convertURL(n, "src");
                              var r;
                              d(t.src, n),
                                en(Cn(t), {
                                  src: Jl(e)
                                    ? ((r = n),
                                      r +
                                        (-1 === r.indexOf("?") ? "?" : "&") +
                                        new Date().getTime())
                                    : n,
                                  "data-mce-src": o,
                                });
                            })(l, n.url))
                        : n.error &&
                          (n.error.remove &&
                            (d(l.src, Tt.transparentSrc), r.push(l), (c = !0)),
                          ((e, t) => {
                            Hw(
                              e,
                              ha.translate(["Failed to upload image: {0}", t])
                            );
                          })(e, n.error.message)),
                      {
                        element: l,
                        status: n.status,
                        uploadUri: n.url,
                        blobInfo: i,
                        removed: c,
                      }
                    );
                  });
                  return (
                    r.length > 0 && !ow(e)
                      ? e.undoManager.transact(() => {
                          q(_o(r), (n) => {
                            const o = Tn(n);
                            Eo(n),
                              o.each(
                                ((e) => (t) => {
                                  ((e, t) =>
                                    e.dom.isEmpty(t.dom) &&
                                    C(e.schema.getTextBlockElements()[$t(t)]))(
                                    e,
                                    t
                                  ) && yo(t, bn('<br data-mce-bogus="1" />'));
                                })(e)
                              ),
                              t.removeByUri(n.dom.src);
                          });
                        })
                      : s && e.undoManager.dispatchChange(),
                    a
                  );
                })
              );
            })
          )
        ),
        u = () => (Ql(e) ? c() : Promise.resolve([])),
        g = (e) => ne(s, (t) => t(e)),
        p = () => (
          o || (o = Yw(r, t)),
          o.findAll(e.getBody(), g).then(
            a((t) => {
              const n = Y(t, (t) =>
                m(t) ? (Hw(e, t), !1) : "blob" !== t.uriType
              );
              return (
                ow(e) ||
                  q(n, (e) => {
                    d(e.image.src, e.blobInfo.blobUri()),
                      (e.image.src = e.blobInfo.blobUri()),
                      e.image.removeAttribute("data-mce-src");
                  }),
                n
              );
            })
          )
        ),
        h = (n) =>
          n.replace(/src="(blob:[^"]+)"/g, (n, o) => {
            const s = r.getResultUri(o);
            if (s) return 'src="' + s + '"';
            let a = t.getByUri(o);
            return (
              a ||
                (a = X(
                  e.editorManager.get(),
                  (e, t) =>
                    e ||
                    (t.editorUpload && t.editorUpload.blobCache.getByUri(o)),
                  void 0
                )),
              a
                ? 'src="data:' + a.blob().type + ";base64," + a.base64() + '"'
                : n
            );
          });
      return (
        e.on("SetContent", () => {
          Ql(e) ? u() : p();
        }),
        e.on("RawSaveContent", (e) => {
          e.content = h(e.content);
        }),
        e.on("GetContent", (e) => {
          e.source_view ||
            "raw" === e.format ||
            "tree" === e.format ||
            (e.content = h(e.content));
        }),
        e.on("PostRender", () => {
          e.parser.addNodeFilter("img", (e) => {
            q(e, (e) => {
              const n = e.attr("src");
              if (!n || t.getByUri(n)) return;
              const o = r.getResultUri(n);
              o && e.attr("src", o);
            });
          });
        }),
        {
          blobCache: t,
          addFilter: (e) => {
            s.push(e);
          },
          uploadImages: c,
          uploadImagesAuto: u,
          scanForImages: p,
          destroy: () => {
            t.destroy(), r.destroy(), (o = n = null);
          },
        }
      );
    },
    tx = { remove_similar: !0, inherit: !1 },
    nx = { selector: "td,th", ...tx },
    ox = {
      tablecellbackgroundcolor: {
        styles: { backgroundColor: "%value" },
        ...nx,
      },
      tablecellverticalalign: { styles: { "vertical-align": "%value" }, ...nx },
      tablecellbordercolor: { styles: { borderColor: "%value" }, ...nx },
      tablecellclass: { classes: ["%value"], ...nx },
      tableclass: { selector: "table", classes: ["%value"], ...tx },
      tablecellborderstyle: { styles: { borderStyle: "%value" }, ...nx },
      tablecellborderwidth: { styles: { borderWidth: "%value" }, ...nx },
    },
    rx = N(ox),
    sx = Dt.each,
    ax = da.DOM,
    ix = (e) => C(e) && f(e),
    lx = (e, t) => {
      const n = (t && t.schema) || Ds({}),
        o = (e) => {
          const t = m(e) ? { name: e, classes: [], attrs: {} } : e,
            n = ax.create(t.name);
          return (
            ((e, t) => {
              t.classes.length > 0 && ax.addClass(e, t.classes.join(" ")),
                ax.setAttribs(e, t.attrs);
            })(n, t),
            n
          );
        },
        r = (e, t, s) => {
          let a;
          const i = t[0],
            l = ix(i) ? i.name : void 0,
            d = ((e, t) => {
              const o = n.getElementRule(e.nodeName.toLowerCase()),
                r = null == o ? void 0 : o.parentsRequired;
              return !(!r || !r.length) && (t && H(r, t) ? t : r[0]);
            })(e, l);
          if (d) l === d ? ((a = i), (t = t.slice(1))) : (a = d);
          else if (i) (a = i), (t = t.slice(1));
          else if (!s) return e;
          const c = a ? o(a) : ax.create("div");
          c.appendChild(e),
            s &&
              Dt.each(s, (t) => {
                const n = o(t);
                c.insertBefore(n, e);
              });
          const u = ix(a) ? a.siblings : void 0;
          return r(c, t, u);
        },
        s = ax.create("div");
      if (e.length > 0) {
        const t = e[0],
          n = o(t),
          a = ix(t) ? t.siblings : void 0;
        s.appendChild(r(n, e.slice(1), a));
      }
      return s;
    },
    dx = (e) => {
      let t = "div";
      const n = { name: t, classes: [], attrs: {}, selector: (e = Dt.trim(e)) };
      return (
        "*" !== e &&
          (t = e.replace(
            /(?:([#\.]|::?)([\w\-]+)|(\[)([^\]]+)\]?)/g,
            (e, t, o, r, s) => {
              switch (t) {
                case "#":
                  n.attrs.id = o;
                  break;
                case ".":
                  n.classes.push(o);
                  break;
                case ":":
                  -1 !==
                    Dt.inArray(
                      "checked disabled enabled read-only required".split(" "),
                      o
                    ) && (n.attrs[o] = o);
              }
              if ("[" === r) {
                const e = s.match(/([\w\-]+)(?:\=\"([^\"]+))?/);
                e && (n.attrs[e[1]] = e[2]);
              }
              return "";
            }
          )),
        (n.name = t || "div"),
        n
      );
    },
    cx = (e, t) => {
      let n = "",
        o = Ad(e);
      if ("" === o) return "";
      const r = (e) => (m(e) ? e.replace(/%(\w+)/g, "") : ""),
        s = (t, n) => ax.getStyle(null != n ? n : e.getBody(), t, !0);
      if (m(t)) {
        const n = e.formatter.get(t);
        if (!n) return "";
        t = n[0];
      }
      if ("preview" in t) {
        const e = t.preview;
        if (!1 === e) return "";
        o = e || o;
      }
      let a,
        i = t.block || t.inline || "span";
      const l =
        ((d = t.selector),
        m(d)
          ? ((d = (d = d.split(/\s*,\s*/)[0]).replace(
              /\s*(~\+|~|\+|>)\s*/g,
              "$1"
            )),
            Dt.map(d.split(/(?:>|\s+(?![^\[\]]+\]))/), (e) => {
              const t = Dt.map(e.split(/(?:~\+|~|\+)/), dx),
                n = t.pop();
              return t.length && (n.siblings = t), n;
            }).reverse())
          : []);
      var d;
      l.length > 0
        ? (l[0].name || (l[0].name = i), (i = t.selector), (a = lx(l, e)))
        : (a = lx([i], e));
      const c = ax.select(i, a)[0] || a.firstChild;
      sx(t.styles, (e, t) => {
        const n = r(e);
        n && ax.setStyle(c, t, n);
      }),
        sx(t.attributes, (e, t) => {
          const n = r(e);
          n && ax.setAttrib(c, t, n);
        }),
        sx(t.classes, (e) => {
          const t = r(e);
          ax.hasClass(c, t) || ax.addClass(c, t);
        }),
        e.dispatch("PreviewFormats"),
        ax.setStyles(a, { position: "absolute", left: -65535 }),
        e.getBody().appendChild(a);
      const u = s("fontSize"),
        f = /px$/.test(u) ? parseInt(u, 10) : 0;
      return (
        sx(o.split(" "), (e) => {
          let t = s(e, c);
          if (
            !(
              ("background-color" === e &&
                /transparent|rgba\s*\([^)]+,\s*0\)/.test(t) &&
                ((t = s(e)), "#ffffff" === $s(t).toLowerCase())) ||
              ("color" === e && "#000000" === $s(t).toLowerCase())
            )
          ) {
            if ("font-size" === e && /em|%$/.test(t)) {
              if (0 === f) return;
              t = (parseFloat(t) / (/%$/.test(t) ? 100 : 1)) * f + "px";
            }
            "border" === e && t && (n += "padding:0 2px;"),
              (n += e + ":" + t + ";");
          }
        }),
        e.dispatch("AfterPreviewFormats"),
        ax.remove(a),
        n
      );
    },
    ux = (e) => {
      const t = ((e) => {
          const t = {},
            n = (e, o) => {
              e &&
                (m(e)
                  ? (p(o) || (o = [o]),
                    q(o, (e) => {
                      v(e.deep) && (e.deep = !Im(e)),
                        v(e.split) && (e.split = !Im(e) || Fm(e)),
                        v(e.remove) && Im(e) && !Fm(e) && (e.remove = "none"),
                        Im(e) &&
                          Fm(e) &&
                          ((e.mixed = !0), (e.block_expand = !0)),
                        m(e.classes) && (e.classes = e.classes.split(/\s+/));
                    }),
                    (t[e] = o))
                  : pe(e, (e, t) => {
                      n(t, e);
                    }));
            };
          return (
            n(
              ((e) => {
                const t = e.dom,
                  n = e.schema.type,
                  o = {
                    valigntop: [
                      { selector: "td,th", styles: { verticalAlign: "top" } },
                    ],
                    valignmiddle: [
                      {
                        selector: "td,th",
                        styles: { verticalAlign: "middle" },
                      },
                    ],
                    valignbottom: [
                      {
                        selector: "td,th",
                        styles: { verticalAlign: "bottom" },
                      },
                    ],
                    alignleft: [
                      {
                        selector: "figure.image",
                        collapsed: !1,
                        classes: "align-left",
                        ceFalseOverride: !0,
                        preview: "font-family font-size",
                      },
                      {
                        selector:
                          "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li,pre",
                        styles: { textAlign: "left" },
                        inherit: !1,
                        preview: !1,
                      },
                      {
                        selector: "img,audio,video",
                        collapsed: !1,
                        styles: { float: "left" },
                        preview: "font-family font-size",
                      },
                      {
                        selector: "table",
                        collapsed: !1,
                        styles: { marginLeft: "0px", marginRight: "auto" },
                        onformat: (e) => {
                          t.setStyle(e, "float", null);
                        },
                        preview: "font-family font-size",
                      },
                      {
                        selector: ".mce-preview-object,[data-ephox-embed-iri]",
                        ceFalseOverride: !0,
                        styles: { float: "left" },
                      },
                    ],
                    aligncenter: [
                      {
                        selector:
                          "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li,pre",
                        styles: { textAlign: "center" },
                        inherit: !1,
                        preview: "font-family font-size",
                      },
                      {
                        selector: "figure.image",
                        collapsed: !1,
                        classes: "align-center",
                        ceFalseOverride: !0,
                        preview: "font-family font-size",
                      },
                      {
                        selector: "img,audio,video",
                        collapsed: !1,
                        styles: {
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        },
                        preview: !1,
                      },
                      {
                        selector: "table",
                        collapsed: !1,
                        styles: { marginLeft: "auto", marginRight: "auto" },
                        preview: "font-family font-size",
                      },
                      {
                        selector: ".mce-preview-object",
                        ceFalseOverride: !0,
                        styles: {
                          display: "table",
                          marginLeft: "auto",
                          marginRight: "auto",
                        },
                        preview: !1,
                      },
                      {
                        selector: "[data-ephox-embed-iri]",
                        ceFalseOverride: !0,
                        styles: { marginLeft: "auto", marginRight: "auto" },
                        preview: !1,
                      },
                    ],
                    alignright: [
                      {
                        selector: "figure.image",
                        collapsed: !1,
                        classes: "align-right",
                        ceFalseOverride: !0,
                        preview: "font-family font-size",
                      },
                      {
                        selector:
                          "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li,pre",
                        styles: { textAlign: "right" },
                        inherit: !1,
                        preview: "font-family font-size",
                      },
                      {
                        selector: "img,audio,video",
                        collapsed: !1,
                        styles: { float: "right" },
                        preview: "font-family font-size",
                      },
                      {
                        selector: "table",
                        collapsed: !1,
                        styles: { marginRight: "0px", marginLeft: "auto" },
                        onformat: (e) => {
                          t.setStyle(e, "float", null);
                        },
                        preview: "font-family font-size",
                      },
                      {
                        selector: ".mce-preview-object,[data-ephox-embed-iri]",
                        ceFalseOverride: !0,
                        styles: { float: "right" },
                        preview: !1,
                      },
                    ],
                    alignjustify: [
                      {
                        selector:
                          "figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li,pre",
                        styles: { textAlign: "justify" },
                        inherit: !1,
                        preview: "font-family font-size",
                      },
                    ],
                    bold: [
                      {
                        inline: "strong",
                        remove: "all",
                        preserve_attributes: ["class", "style"],
                      },
                      { inline: "span", styles: { fontWeight: "bold" } },
                      {
                        inline: "b",
                        remove: "all",
                        preserve_attributes: ["class", "style"],
                      },
                    ],
                    italic: [
                      {
                        inline: "em",
                        remove: "all",
                        preserve_attributes: ["class", "style"],
                      },
                      { inline: "span", styles: { fontStyle: "italic" } },
                      {
                        inline: "i",
                        remove: "all",
                        preserve_attributes: ["class", "style"],
                      },
                    ],
                    underline: [
                      {
                        inline: "span",
                        styles: { textDecoration: "underline" },
                        exact: !0,
                      },
                      {
                        inline: "u",
                        remove: "all",
                        preserve_attributes: ["class", "style"],
                      },
                    ],
                    strikethrough: (() => {
                      const e = {
                          inline: "span",
                          styles: { textDecoration: "line-through" },
                          exact: !0,
                        },
                        t = {
                          inline: "strike",
                          remove: "all",
                          preserve_attributes: ["class", "style"],
                        },
                        o = {
                          inline: "s",
                          remove: "all",
                          preserve_attributes: ["class", "style"],
                        };
                      return "html4" !== n ? [o, e, t] : [e, o, t];
                    })(),
                    forecolor: {
                      inline: "span",
                      styles: { color: "%value" },
                      links: !0,
                      remove_similar: !0,
                      clear_child_styles: !0,
                    },
                    hilitecolor: {
                      inline: "span",
                      styles: { backgroundColor: "%value" },
                      links: !0,
                      remove_similar: !0,
                      clear_child_styles: !0,
                    },
                    fontname: {
                      inline: "span",
                      toggle: !1,
                      styles: { fontFamily: "%value" },
                      clear_child_styles: !0,
                    },
                    fontsize: {
                      inline: "span",
                      toggle: !1,
                      styles: { fontSize: "%value" },
                      clear_child_styles: !0,
                    },
                    lineheight: {
                      selector: "h1,h2,h3,h4,h5,h6,p,li,td,th,div",
                      styles: { lineHeight: "%value" },
                    },
                    fontsize_class: {
                      inline: "span",
                      attributes: { class: "%value" },
                    },
                    blockquote: {
                      block: "blockquote",
                      wrapper: !0,
                      remove: "all",
                    },
                    subscript: { inline: "sub" },
                    superscript: { inline: "sup" },
                    code: { inline: "code" },
                    link: {
                      inline: "a",
                      selector: "a",
                      remove: "all",
                      split: !0,
                      deep: !0,
                      onmatch: (e, t, n) => er(e) && e.hasAttribute("href"),
                      onformat: (e, n, o) => {
                        Dt.each(o, (n, o) => {
                          t.setAttrib(e, o, n);
                        });
                      },
                    },
                    lang: {
                      inline: "span",
                      clear_child_styles: !0,
                      remove_similar: !0,
                      attributes: {
                        lang: "%value",
                        "data-mce-lang": (e) => {
                          var t;
                          return null !==
                            (t = null == e ? void 0 : e.customValue) &&
                            void 0 !== t
                            ? t
                            : null;
                        },
                      },
                    },
                    removeformat: [
                      {
                        selector:
                          "b,strong,em,i,font,u,strike,s,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins,small",
                        remove: "all",
                        split: !0,
                        expand: !1,
                        block_expand: !0,
                        deep: !0,
                      },
                      {
                        selector: "span",
                        attributes: ["style", "class"],
                        remove: "empty",
                        split: !0,
                        expand: !1,
                        deep: !0,
                      },
                      {
                        selector: "*",
                        attributes: ["style", "class"],
                        split: !1,
                        expand: !1,
                        deep: !0,
                      },
                    ],
                  };
                return (
                  Dt.each(
                    "p h1 h2 h3 h4 h5 h6 div address pre dt dd samp".split(
                      /\s/
                    ),
                    (e) => {
                      o[e] = { block: e, remove: "all" };
                    }
                  ),
                  o
                );
              })(e)
            ),
            n(rx()),
            n(Rd(e)),
            {
              get: (e) => (C(e) ? t[e] : t),
              has: (e) => ke(t, e),
              register: n,
              unregister: (e) => (e && t[e] && delete t[e], t),
            }
          );
        })(e),
        n = ma({});
      return (
        ((e) => {
          e.addShortcut("meta+b", "", "Bold"),
            e.addShortcut("meta+i", "", "Italic"),
            e.addShortcut("meta+u", "", "Underline");
          for (let t = 1; t <= 6; t++)
            e.addShortcut("access+" + t, "", ["FormatBlock", !1, "h" + t]);
          e.addShortcut("access+7", "", ["FormatBlock", !1, "p"]),
            e.addShortcut("access+8", "", ["FormatBlock", !1, "div"]),
            e.addShortcut("access+9", "", ["FormatBlock", !1, "address"]);
        })(e),
        ((e) => {
          e.on("mouseup keydown", (t) => {
            var n;
            ((e, t, n) => {
              const o = e.selection,
                r = e.getBody();
              Qb(e, null, n),
                (8 !== t && 46 !== t) ||
                  !o.isCollapsed() ||
                  o.getStart().innerHTML !== Yb ||
                  Qb(e, Wu(r, o.getStart()), !0),
                (37 !== t && 39 !== t) || Qb(e, Wu(r, o.getStart()), !0);
            })(
              e,
              t.keyCode,
              ((n = e.selection.getRng().endContainer), dr(n) && Ve(n.data, Wo))
            );
          });
        })(e),
        ow(e) ||
          ((e, t) => {
            e.set({}),
              t.on("NodeChange", (n) => {
                Kv(t, n.element, e.get());
              }),
              t.on("FormatApply FormatRemove", (n) => {
                const o = I.from(n.node)
                  .map((e) => (Cm(e) ? e : e.startContainer))
                  .bind((e) => (er(e) ? I.some(e) : I.from(e.parentElement)))
                  .getOrThunk(() => Vv(t));
                Kv(t, o, e.get());
              });
          })(n, e),
        {
          get: t.get,
          has: t.has,
          register: t.register,
          unregister: t.unregister,
          apply: (t, n, o) => {
            ((e, t, n, o) => {
              sw(e).formatter.apply(t, n, o);
            })(e, t, n, o);
          },
          remove: (t, n, o, r) => {
            ((e, t, n, o, r) => {
              sw(e).formatter.remove(t, n, o, r);
            })(e, t, n, o, r);
          },
          toggle: (t, n, o) => {
            ((e, t, n, o) => {
              sw(e).formatter.toggle(t, n, o);
            })(e, t, n, o);
          },
          match: (t, n, o, r) =>
            ((e, t, n, o, r) => sw(e).formatter.match(t, n, o, r))(
              e,
              t,
              n,
              o,
              r
            ),
          closest: (t) => ((e, t) => sw(e).formatter.closest(t))(e, t),
          matchAll: (t, n) =>
            ((e, t, n) => sw(e).formatter.matchAll(t, n))(e, t, n),
          matchNode: (t, n, o, r) =>
            ((e, t, n, o, r) => sw(e).formatter.matchNode(t, n, o, r))(
              e,
              t,
              n,
              o,
              r
            ),
          canApply: (t) => ((e, t) => sw(e).formatter.canApply(t))(e, t),
          formatChanged: (t, o, r, s) =>
            ((e, t, n, o, r, s) =>
              sw(e).formatter.formatChanged(t, n, o, r, s))(e, n, t, o, r, s),
          getCssText: T(cx, e),
        }
      );
    },
    mx = (e) => {
      switch (e.toLowerCase()) {
        case "undo":
        case "redo":
        case "mcefocus":
          return !0;
        default:
          return !1;
      }
    },
    fx = (e) => {
      const t = ya(),
        n = ma(0),
        o = ma(0),
        r = {
          data: [],
          typing: !1,
          beforeChange: () => {
            ((e, t, n) => {
              sw(e).undoManager.beforeChange(t, n);
            })(e, n, t);
          },
          add: (s, a) =>
            ((e, t, n, o, r, s, a) => sw(e).undoManager.add(t, n, o, r, s, a))(
              e,
              r,
              o,
              n,
              t,
              s,
              a
            ),
          dispatchChange: () => {
            e.setDirty(!0);
            const t = YC(e);
            (t.bookmark = yl(e.selection)),
              e.dispatch("change", {
                level: t,
                lastLevel: ie(r.data, o.get()).getOrUndefined(),
              });
          },
          undo: () =>
            ((e, t, n, o) => sw(e).undoManager.undo(t, n, o))(e, r, n, o),
          redo: () => ((e, t, n) => sw(e).undoManager.redo(t, n))(e, o, r.data),
          clear: () => {
            ((e, t, n) => {
              sw(e).undoManager.clear(t, n);
            })(e, r, o);
          },
          reset: () => {
            ((e, t) => {
              sw(e).undoManager.reset(t);
            })(e, r);
          },
          hasUndo: () =>
            ((e, t, n) => sw(e).undoManager.hasUndo(t, n))(e, r, o),
          hasRedo: () =>
            ((e, t, n) => sw(e).undoManager.hasRedo(t, n))(e, r, o),
          transact: (t) =>
            ((e, t, n, o) => sw(e).undoManager.transact(t, n, o))(e, r, n, t),
          ignore: (t) => {
            ((e, t, n) => {
              sw(e).undoManager.ignore(t, n);
            })(e, n, t);
          },
          extra: (t, n) => {
            ((e, t, n, o, r) => {
              sw(e).undoManager.extra(t, n, o, r);
            })(e, r, o, t, n);
          },
        };
      return (
        ow(e) ||
          ((e, t, n) => {
            const o = ma(!1),
              r = (e) => {
                ew(t, !1, n), t.add({}, e);
              };
            e.on("init", () => {
              t.add();
            }),
              e.on("BeforeExecCommand", (e) => {
                const o = e.command;
                mx(o) || (tw(t, n), t.beforeChange());
              }),
              e.on("ExecCommand", (e) => {
                const t = e.command;
                mx(t) || r(e);
              }),
              e.on("ObjectResizeStart cut", () => {
                t.beforeChange();
              }),
              e.on("SaveContent ObjectResized blur", r),
              e.on("dragend", r),
              e.on("keyup", (n) => {
                const s = n.keyCode;
                if (n.isDefaultPrevented()) return;
                const a = Tt.os.isMacOS() && "Meta" === n.key;
                ((s >= 33 && s <= 36) ||
                  (s >= 37 && s <= 40) ||
                  45 === s ||
                  n.ctrlKey ||
                  a) &&
                  (r(), e.nodeChanged()),
                  (46 !== s && 8 !== s) || e.nodeChanged(),
                  o.get() &&
                    t.typing &&
                    !QC(YC(e), t.data[0]) &&
                    (e.isDirty() || e.setDirty(!0),
                    e.dispatch("TypingUndo"),
                    o.set(!1),
                    e.nodeChanged());
              }),
              e.on("keydown", (e) => {
                const s = e.keyCode;
                if (e.isDefaultPrevented()) return;
                if ((s >= 33 && s <= 36) || (s >= 37 && s <= 40) || 45 === s)
                  return void (t.typing && r(e));
                const a = (e.ctrlKey && !e.altKey) || e.metaKey;
                if (
                  (s < 16 || s > 20) &&
                  224 !== s &&
                  91 !== s &&
                  !t.typing &&
                  !a
                )
                  return (
                    t.beforeChange(), ew(t, !0, n), t.add({}, e), void o.set(!0)
                  );
                (Tt.os.isMacOS() ? e.metaKey : e.ctrlKey && !e.altKey) &&
                  t.beforeChange();
              }),
              e.on("mousedown", (e) => {
                t.typing && r(e);
              }),
              e.on("input", (e) => {
                var t;
                e.inputType &&
                  ("insertReplacementText" === e.inputType ||
                    ("insertText" === (t = e).inputType && null === t.data) ||
                    ((e) =>
                      "insertFromPaste" === e.inputType ||
                      "insertFromDrop" === e.inputType)(e)) &&
                  r(e);
              }),
              e.on("AddUndo Undo Redo ClearUndos", (t) => {
                t.isDefaultPrevented() || e.nodeChanged();
              });
          })(e, r, n),
        ((e) => {
          e.addShortcut("meta+z", "", "Undo"),
            e.addShortcut("meta+y,meta+shift+z", "", "Redo");
        })(e),
        r
      );
    },
    gx = [
      9,
      27,
      yf.HOME,
      yf.END,
      19,
      20,
      44,
      144,
      145,
      33,
      34,
      45,
      16,
      17,
      18,
      91,
      92,
      93,
      yf.DOWN,
      yf.UP,
      yf.LEFT,
      yf.RIGHT,
    ].concat(Tt.browser.isFirefox() ? [224] : []),
    px = "data-mce-placeholder",
    hx = (e) => "keydown" === e.type || "keyup" === e.type,
    bx = (e) => {
      const t = e.keyCode;
      return t === yf.BACKSPACE || t === yf.DELETE;
    },
    vx = (e, t) => ({ from: e, to: t }),
    yx = (e, t) => {
      const n = Cn(e),
        o = Cn(t.container());
      return Mh(n, o).map((e) => ((e, t) => ({ block: e, position: t }))(e, t));
    },
    Cx = (e, t) =>
      Jn(
        t,
        (e) => Ya(e) || br(e.dom),
        (t) => _n(t, e)
      )
        .filter(Kt)
        .getOr(e),
    wx = (e, t) => {
      const n = ((e, t) => {
        const n = In(e);
        return J(n, (e) => t.isBlock($t(e))).fold(N(n), (e) => n.slice(0, e));
      })(e, t);
      return q(n, Eo), n;
    },
    xx = (e, t, n) => {
      const o = Up(n, t);
      return Q(o.reverse(), (t) => Tr(e, t)).each(Eo);
    },
    Ex = (e, t, n, o, r) => {
      if (Tr(o, n)) return Za(n), Hu(n.dom);
      ((e, t) => 0 === Y(Ln(t), (t) => !Tr(e, t)).length)(o, r) &&
        Tr(o, t) &&
        ho(r, vn("br"));
      const s = ju(n.dom, Qi.before(r.dom));
      return (
        q(wx(t, o), (e) => {
          ho(r, e);
        }),
        xx(o, e, t),
        s
      );
    },
    kx = (e, t, n, o) => {
      if (Tr(o, n)) {
        if (Tr(o, t)) {
          const e = (e) => {
              const t = (e, n) =>
                Un(e).fold(
                  () => n,
                  (e) =>
                    ((e, t) => e.isInline($t(t)))(o, e)
                      ? t(e, n.concat(Ma(e)))
                      : n
                );
              return t(e, []);
            },
            r = G(e(n), (e, t) => (Co(e, t), t), Xa());
          xo(t), yo(t, r);
        }
        return Eo(n), Hu(t.dom);
      }
      const r = $u(n.dom);
      return (
        q(wx(t, o), (e) => {
          yo(n, e);
        }),
        xx(o, e, t),
        r
      );
    },
    _x = (e, t) => {
      Uu(e, t.dom)
        .bind((e) => I.from(e.getNode()))
        .map(Cn)
        .filter($a)
        .each(Eo);
    },
    Sx = (e, t, n, o) => (
      _x(!0, t),
      _x(!1, n),
      ((e, t) =>
        Sn(t, e)
          ? ((e, t) => {
              const n = Up(t, e);
              return I.from(n[n.length - 1]);
            })(t, e)
          : I.none())(t, n).fold(T(kx, e, t, n, o), T(Ex, e, t, n, o))
    ),
    Nx = (e, t, n, o, r) => (t ? Sx(e, o, n, r) : Sx(e, n, o, r)),
    Rx = (e, t) => {
      const n = Cn(e.getBody()),
        o = ((e, t, n, o) =>
          o.collapsed
            ? ((e, t, n, o) => {
                const r = yx(t, Qi.fromRangeStart(o)),
                  s = r.bind((o) =>
                    Mu(n, t, o.position).bind((o) =>
                      yx(t, o).map((o) =>
                        ((e, t, n, o) =>
                          pr(o.position.getNode()) && !Tr(e, o.block)
                            ? Uu(!1, o.block.dom)
                                .bind((e) =>
                                  e.isEqual(o.position)
                                    ? Mu(n, t, e).bind((e) => yx(t, e))
                                    : I.some(o)
                                )
                                .getOr(o)
                            : o)(e, t, n, o)
                      )
                    )
                  );
                return It(r, s, vx).filter(
                  (e) =>
                    ((e) => !_n(e.from.block, e.to.block))(e) &&
                    ((e, t) => {
                      const n = Cn(e);
                      return _n(Cx(n, t.from.block), Cx(n, t.to.block));
                    })(t, e) &&
                    ((e) =>
                      !1 === vr(e.from.block.dom) && !1 === vr(e.to.block.dom))(
                      e
                    ) &&
                    ((e) => {
                      const t = (e) => Va(e) || Vr(e.dom);
                      return t(e.from.block) && t(e.to.block);
                    })(e)
                );
              })(e, t, n, o)
            : I.none())(e.schema, n.dom, t, e.selection.getRng()).map(
          (o) => () => {
            Nx(n, t, o.from.block, o.to.block, e.schema).each((t) => {
              e.selection.setRng(t.toRange());
            });
          }
        );
      return o;
    },
    Ax = (e, t) => {
      const n = Cn(t),
        o = T(_n, e);
      return Qn(n, Ya, o).isSome();
    },
    Tx = (e) => {
      const t = Cn(e.getBody());
      return ((e, t) => {
        const n = ju(e.dom, Qi.fromRangeStart(t)).isNone(),
          o = zu(e.dom, Qi.fromRangeEnd(t)).isNone();
        return (
          !((e, t) => Ax(e, t.startContainer) || Ax(e, t.endContainer))(e, t) &&
          n &&
          o
        );
      })(t, e.selection.getRng())
        ? ((e) =>
            I.some(() => {
              e.setContent(""), e.selection.setCursorLocation();
            }))(e)
        : ((e, t, n) => {
            const o = t.getRng();
            return It(
              Mh(e, Cn(o.startContainer)),
              Mh(e, Cn(o.endContainer)),
              (r, s) =>
                _n(r, s)
                  ? I.none()
                  : I.some(() => {
                      o.deleteContents(),
                        Nx(e, !0, r, s, n).each((e) => {
                          t.setRng(e.toRange());
                        });
                    })
            ).getOr(I.none());
          })(t, e.selection, e.schema);
    },
    Ox = (e, t) => (e.selection.isCollapsed() ? I.none() : Tx(e)),
    Bx = (e, t, n, o, r) => I.from(t._selectionOverrides.showCaret(e, n, o, r)),
    Px = (e, t) =>
      e.dispatch("BeforeObjectSelected", { target: t }).isDefaultPrevented()
        ? I.none()
        : I.some(
            ((e) => {
              const t = e.ownerDocument.createRange();
              return t.selectNode(e), t;
            })(t)
          ),
    Dx = (e, t, n) =>
      t.collapsed
        ? ((e, t, n) => {
            const o = pu(1, e.getBody(), t),
              r = Qi.fromRangeStart(o),
              s = r.getNode();
            if (Wc(s)) return Bx(1, e, s, !r.isAtEnd(), !1);
            const a = r.getNode(!0);
            if (Wc(a)) return Bx(1, e, a, !1, !1);
            const i = fb(e.dom.getRoot(), r.getNode());
            return Wc(i) ? Bx(1, e, i, !1, n) : I.none();
          })(e, t, n).getOr(t)
        : t,
    Lx = (e) => Mp(e) || Bp(e),
    Mx = (e) => Ip(e) || Pp(e),
    Ix = (e, t, n, o, r, s) => {
      Bx(o, e, s.getNode(!r), r, !0).each((n) => {
        if (t.collapsed) {
          const e = t.cloneRange();
          r
            ? e.setEnd(n.startContainer, n.startOffset)
            : e.setStart(n.endContainer, n.endOffset),
            e.deleteContents();
        } else t.deleteContents();
        e.selection.setRng(n);
      }),
        ((e, t) => {
          dr(t) && 0 === t.data.length && e.remove(t);
        })(e.dom, n);
    },
    Fx = (e, t) =>
      ((e, t) => {
        const n = e.selection.getRng();
        if (!dr(n.commonAncestorContainer)) return I.none();
        const o = t ? wu.Forwards : wu.Backwards,
          r = Bu(e.getBody()),
          s = T(yu, t ? r.next : r.prev),
          a = t ? Lx : Mx,
          i = bu(o, e.getBody(), n),
          l = s(i),
          d = l ? Th(t, l) : l;
        if (!d || !Cu(i, d)) return I.none();
        if (a(d)) return I.some(() => Ix(e, n, i.getNode(), o, t, d));
        const c = s(d);
        return c && a(c) && Cu(d, c)
          ? I.some(() => Ix(e, n, i.getNode(), o, t, c))
          : I.none();
      })(e, t),
    Ux = (e, t) => {
      const n = e.getBody();
      return t ? Hu(n).filter(Mp) : $u(n).filter(Ip);
    },
    zx = (e) => {
      const t = e.selection.getRng();
      return (
        !t.collapsed &&
        (Ux(e, !0).exists((e) => e.isEqual(Qi.fromRangeStart(t))) ||
          Ux(e, !1).exists((e) => e.isEqual(Qi.fromRangeEnd(t))))
      );
    },
    jx = El([
      { remove: ["element"] },
      { moveToElement: ["element"] },
      { moveToPosition: ["position"] },
    ]),
    Hx = (e, t, n, o) =>
      Mu(t, e, n).bind((r) => {
        return (
          (s = r.getNode()),
          (C(s) && (Ya(Cn(s)) || Wa(Cn(s)))) ||
          ((e, t, n, o, r) => {
            const s = (t) =>
              r.isInline(t.nodeName.toLowerCase()) && !lu(n, o, e);
            return hu(!t, n).fold(() => hu(t, o).fold(L, s), s);
          })(e, t, n, r, o)
            ? I.none()
            : (t && vr(r.getNode())) || (!t && vr(r.getNode(!0)))
            ? ((e, t, n, o, r) => {
                const s = r.getNode(!n);
                return Mh(Cn(t), Cn(o.getNode()))
                  .map((t) =>
                    Tr(e, t) ? jx.remove(t.dom) : jx.moveToElement(s)
                  )
                  .orThunk(() => I.some(jx.moveToElement(s)));
              })(o, e, t, n, r)
            : (t && Ip(n)) || (!t && Mp(n))
            ? I.some(jx.moveToPosition(r))
            : I.none()
        );
        var s;
      }),
    $x = (e, t) => I.from(fb(e.getBody(), t)),
    Vx = (e, t) => {
      const n = e.selection.getNode();
      return $x(e, n)
        .filter(vr)
        .fold(
          () =>
            ((e, t, n, o) => {
              const r = pu(t ? 1 : -1, e, n),
                s = Qi.fromRangeStart(r),
                a = Cn(e);
              return !t && Ip(s)
                ? I.some(jx.remove(s.getNode(!0)))
                : t && Mp(s)
                ? I.some(jx.remove(s.getNode()))
                : !t && Mp(s) && Zp(a, s, o)
                ? Qp(a, s, o).map((e) => jx.remove(e.getNode()))
                : t && Ip(s) && Xp(a, s, o)
                ? Jp(a, s, o).map((e) => jx.remove(e.getNode()))
                : ((e, t, n, o) =>
                    ((e, t) => {
                      const n = t.getNode(!e),
                        o = e ? "after" : "before";
                      return er(n) && n.getAttribute("data-mce-caret") === o;
                    })(t, n)
                      ? ((e, t) =>
                          y(t)
                            ? I.none()
                            : e && vr(t.nextSibling)
                            ? I.some(jx.moveToElement(t.nextSibling))
                            : !e && vr(t.previousSibling)
                            ? I.some(jx.moveToElement(t.previousSibling))
                            : I.none())(t, n.getNode(!t)).orThunk(() =>
                          Hx(e, t, n, o)
                        )
                      : Hx(e, t, n, o).bind((t) =>
                          ((e, t, n) =>
                            n.fold(
                              (e) => I.some(jx.remove(e)),
                              (e) => I.some(jx.moveToElement(e)),
                              (n) =>
                                lu(t, n, e)
                                  ? I.none()
                                  : I.some(jx.moveToPosition(n))
                            ))(e, n, t)
                        ))(e, t, s, o);
            })(e.getBody(), t, e.selection.getRng(), e.schema).map(
              (n) => () =>
                n.fold(
                  ((e, t) => (n) => (
                    e._selectionOverrides.hideFakeCaret(), _h(e, t, Cn(n)), !0
                  ))(e, t),
                  ((e, t) => (n) => {
                    const o = t ? Qi.before(n) : Qi.after(n);
                    return e.selection.setRng(o.toRange()), !0;
                  })(e, t),
                  ((e) => (t) => (e.selection.setRng(t.toRange()), !0))(e)
                )
            ),
          () => I.some(k)
        );
    },
    qx = (e) => {
      const t = e.dom,
        n = e.selection,
        o = fb(e.getBody(), n.getNode());
      if (br(o) && t.isBlock(o) && t.isEmpty(o)) {
        const e = t.create("br", { "data-mce-bogus": "1" });
        t.setHTML(o, ""), o.appendChild(e), n.setRng(Qi.before(e).toRange());
      }
      return !0;
    },
    Wx = (e, t) =>
      e.selection.isCollapsed()
        ? Vx(e, t)
        : ((e, t) => {
            const n = e.selection.getNode();
            return vr(n) && !yr(n)
              ? $x(e, n.parentNode)
                  .filter(vr)
                  .fold(
                    () =>
                      I.some(() => {
                        var n;
                        (n = Cn(e.getBody())),
                          q(zo(n, ".mce-offscreen-selection"), Eo),
                          _h(e, t, Cn(e.selection.getNode())),
                          Ih(e);
                      }),
                    () => I.some(k)
                  )
              : zx(e)
              ? I.some(() => {
                  zh(e, e.selection.getRng(), Cn(e.getBody()));
                })
              : I.none();
          })(e, t),
    Kx = (e, t) =>
      e.selection.isCollapsed()
        ? ((e, t) => {
            const n = Qi.fromRangeStart(e.selection.getRng());
            return Mu(t, e.getBody(), n)
              .filter((e) => (t ? Tp(e) : Op(e)))
              .bind((e) => du(t ? 0 : -1, e))
              .map((t) => () => e.selection.select(t));
          })(e, t)
        : I.none(),
    Yx = dr,
    Gx = (e) => Yx(e) && e.data[0] === Qa,
    Xx = (e) => Yx(e) && e.data[e.data.length - 1] === Qa,
    Zx = (e) => {
      var t;
      return (
        null !== (t = e.ownerDocument) && void 0 !== t ? t : document
      ).createTextNode(Qa);
    },
    Qx = (e, t) =>
      e
        ? ((e) => {
            var t;
            if (Yx(e.previousSibling))
              return (
                Xx(e.previousSibling) || e.previousSibling.appendData(Qa),
                e.previousSibling
              );
            if (Yx(e)) return Gx(e) || e.insertData(0, Qa), e;
            {
              const n = Zx(e);
              return (
                null === (t = e.parentNode) ||
                  void 0 === t ||
                  t.insertBefore(n, e),
                n
              );
            }
          })(t)
        : ((e) => {
            var t, n;
            if (Yx(e.nextSibling))
              return (
                Gx(e.nextSibling) || e.nextSibling.insertData(0, Qa),
                e.nextSibling
              );
            if (Yx(e)) return Xx(e) || e.appendData(Qa), e;
            {
              const o = Zx(e);
              return (
                e.nextSibling
                  ? null === (t = e.parentNode) ||
                    void 0 === t ||
                    t.insertBefore(o, e.nextSibling)
                  : null === (n = e.parentNode) ||
                    void 0 === n ||
                    n.appendChild(o),
                o
              );
            }
          })(t),
    Jx = T(Qx, !0),
    eE = T(Qx, !1),
    tE = (e, t) =>
      dr(e.container()) ? Qx(t, e.container()) : Qx(t, e.getNode()),
    nE = (e, t) => {
      const n = t.get();
      return n && e.container() === n && ri(n);
    },
    oE = (e, t) =>
      t.fold(
        (t) => {
          Uc(e.get());
          const n = Jx(t);
          return e.set(n), I.some(Qi(n, n.length - 1));
        },
        (t) =>
          Hu(t).map((t) => {
            if (nE(t, e)) {
              const t = e.get();
              return Qi(t, 1);
            }
            {
              Uc(e.get());
              const n = tE(t, !0);
              return e.set(n), Qi(n, 1);
            }
          }),
        (t) =>
          $u(t).map((t) => {
            if (nE(t, e)) {
              const t = e.get();
              return Qi(t, t.length - 1);
            }
            {
              Uc(e.get());
              const n = tE(t, !1);
              return e.set(n), Qi(n, n.length - 1);
            }
          }),
        (t) => {
          Uc(e.get());
          const n = eE(t);
          return e.set(n), I.some(Qi(n, 1));
        }
      ),
    rE = (e, t) => {
      for (let n = 0; n < e.length; n++) {
        const o = e[n].apply(null, t);
        if (o.isSome()) return o;
      }
      return I.none();
    },
    sE = El([
      { before: ["element"] },
      { start: ["element"] },
      { end: ["element"] },
      { after: ["element"] },
    ]),
    aE = (e, t) => iu(t, e) || e,
    iE = (e, t, n) => {
      const o = Oh(n),
        r = aE(t, o.container());
      return Ah(e, r, o).fold(
        () =>
          zu(r, o)
            .bind(T(Ah, e, r))
            .map((e) => sE.before(e)),
        I.none
      );
    },
    lE = (e, t) => null === Wu(e, t),
    dE = (e, t, n) => Ah(e, t, n).filter(T(lE, t)),
    cE = (e, t, n) => {
      const o = Bh(n);
      return dE(e, t, o).bind((e) =>
        ju(e, o).isNone() ? I.some(sE.start(e)) : I.none()
      );
    },
    uE = (e, t, n) => {
      const o = Oh(n);
      return dE(e, t, o).bind((e) =>
        zu(e, o).isNone() ? I.some(sE.end(e)) : I.none()
      );
    },
    mE = (e, t, n) => {
      const o = Bh(n),
        r = aE(t, o.container());
      return Ah(e, r, o).fold(
        () =>
          ju(r, o)
            .bind(T(Ah, e, r))
            .map((e) => sE.after(e)),
        I.none
      );
    },
    fE = (e) => !Rh(pE(e)),
    gE = (e, t, n) => rE([iE, cE, uE, mE], [e, t, n]).filter(fE),
    pE = (e) => e.fold(R, R, R, R),
    hE = (e) => e.fold(N("before"), N("start"), N("end"), N("after")),
    bE = (e) => e.fold(sE.before, sE.before, sE.after, sE.after),
    vE = (e) => e.fold(sE.start, sE.start, sE.end, sE.end),
    yE = (e, t, n, o, r, s) =>
      It(Ah(t, n, o), Ah(t, n, r), (t, o) =>
        t !== o &&
        ((e, t, n) => {
          const o = iu(t, e),
            r = iu(n, e);
          return C(o) && o === r;
        })(n, t, o)
          ? sE.after(e ? t : o)
          : s
      ).getOr(s),
    CE = (e, t) =>
      e.fold(M, (e) => {
        return (o = t), !(hE((n = e)) === hE(o) && pE(n) === pE(o));
        var n, o;
      }),
    wE = (e, t) =>
      e
        ? t.fold(_(I.some, sE.start), I.none, _(I.some, sE.after), I.none)
        : t.fold(I.none, _(I.some, sE.before), I.none, _(I.some, sE.end)),
    xE = (e, t, n) => {
      const o = e ? 1 : -1;
      return (
        t.setRng(Qi(n.container(), n.offset() + o).toRange()),
        t.getSel().modify("move", e ? "forward" : "backward", "word"),
        !0
      );
    };
  var EE;
  !(function (e) {
    (e[(e.Br = 0)] = "Br"),
      (e[(e.Block = 1)] = "Block"),
      (e[(e.Wrap = 2)] = "Wrap"),
      (e[(e.Eol = 3)] = "Eol");
  })(EE || (EE = {}));
  const kE = (e, t) => (e === wu.Backwards ? oe(t) : t),
    _E = (e, t, n) => (e === wu.Forwards ? t.next(n) : t.prev(n)),
    SE = (e, t, n, o) =>
      pr(o.getNode(t === wu.Forwards))
        ? EE.Br
        : !1 === lu(n, o)
        ? EE.Block
        : EE.Wrap,
    NE = (e, t, n, o) => {
      const r = Bu(n);
      let s = o;
      const a = [];
      for (; s; ) {
        const n = _E(t, r, s);
        if (!n) break;
        if (pr(n.getNode(!1)))
          return t === wu.Forwards
            ? {
                positions: kE(t, a).concat([n]),
                breakType: EE.Br,
                breakAt: I.some(n),
              }
            : { positions: kE(t, a), breakType: EE.Br, breakAt: I.some(n) };
        if (n.isVisible()) {
          if (e(s, n)) {
            const e = SE(0, t, s, n);
            return { positions: kE(t, a), breakType: e, breakAt: I.some(n) };
          }
          a.push(n), (s = n);
        } else s = n;
      }
      return { positions: kE(t, a), breakType: EE.Eol, breakAt: I.none() };
    },
    RE = (e, t, n, o) =>
      t(n, o)
        .breakAt.map((o) => {
          const r = t(n, o).positions;
          return e === wu.Backwards ? r.concat(o) : [o].concat(r);
        })
        .getOr([]),
    AE = (e, t) =>
      X(
        e,
        (e, n) =>
          e.fold(
            () => I.some(n),
            (o) =>
              It(le(o.getClientRects()), le(n.getClientRects()), (e, r) => {
                const s = Math.abs(t - e.left);
                return Math.abs(t - r.left) <= s ? n : o;
              }).or(e)
          ),
        I.none()
      ),
    TE = (e, t) => le(t.getClientRects()).bind((t) => AE(e, t.left)),
    OE = T(NE, Qi.isAbove, -1),
    BE = T(NE, Qi.isBelow, 1),
    PE = T(RE, -1, OE),
    DE = T(RE, 1, BE),
    LE = (e, t) => OE(e, t).breakAt.isNone(),
    ME = (e, t) => BE(e, t).breakAt.isNone(),
    IE = (e, t) => TE(PE(e, t), t),
    FE = (e, t) => TE(DE(e, t), t),
    UE = vr,
    zE = (e, t) => Math.abs(e.left - t),
    jE = (e, t) => Math.abs(e.right - t),
    HE = (e, t) =>
      Be(e, (e, n) => {
        const o = Math.min(zE(e, t), jE(e, t)),
          r = Math.min(zE(n, t), jE(n, t));
        return (r === o && _e(n, "node") && UE(n.node)) || r < o ? n : e;
      }),
    $E = (e) => {
      const t = (t) =>
        V(t, (t) => {
          const n = gi(t);
          return (n.node = e), n;
        });
      if (er(e)) return t(e.getClientRects());
      if (dr(e)) {
        const n = e.ownerDocument.createRange();
        return (
          n.setStart(e, 0), n.setEnd(e, e.data.length), t(n.getClientRects())
        );
      }
      return [];
    },
    VE = (e) => te(e, $E);
  var qE;
  !(function (e) {
    (e[(e.Up = -1)] = "Up"), (e[(e.Down = 1)] = "Down");
  })(qE || (qE = {}));
  const WE = (e, t, n, o, r, s) => {
      let a = 0;
      const i = [],
        l = (o) => {
          let s = VE([o]);
          -1 === e && (s = s.reverse());
          for (let e = 0; e < s.length; e++) {
            const o = s[e];
            if (!n(o, d)) {
              if ((i.length > 0 && t(o, De(i)) && a++, (o.line = a), r(o)))
                return !0;
              i.push(o);
            }
          }
          return !1;
        },
        d = De(s.getClientRects());
      if (!d) return i;
      const c = s.getNode();
      return (
        c &&
          (l(c),
          ((e, t, n, o) => {
            let r = o;
            for (; (r = au(r, e, Di, t)); ) if (n(r)) return;
          })(e, o, l, c)),
        i
      );
    },
    KE = T(WE, qE.Up, bi, vi),
    YE = T(WE, qE.Down, vi, bi),
    GE = (e) => De(e.getClientRects()),
    XE = (e) => (t) => ((e, t) => t.line > e)(e, t),
    ZE = (e) => (t) => ((e, t) => t.line === e)(e, t),
    QE = (e, t) => {
      e.selection.setRng(t), bg(e, e.selection.getRng());
    },
    JE = (e, t, n) => I.some(Dx(e, t, n)),
    ek = (e, t, n, o, r, s) => {
      const a = t === wu.Forwards,
        i = Bu(e.getBody()),
        l = T(yu, a ? i.next : i.prev),
        d = a ? o : r;
      if (!n.collapsed) {
        const o = Ci(n);
        if (s(o)) return Bx(t, e, o, t === wu.Backwards, !1);
        if (zx(e)) {
          const e = n.cloneRange();
          return e.collapse(t === wu.Backwards), I.from(e);
        }
      }
      const c = bu(t, e.getBody(), n);
      if (d(c)) return Px(e, c.getNode(!a));
      let u = l(c);
      const m = mi(n);
      if (!u) return m ? I.some(n) : I.none();
      if (((u = Th(a, u)), d(u))) return Bx(t, e, u.getNode(!a), a, !1);
      const f = l(u);
      return f && d(f) && Cu(u, f)
        ? Bx(t, e, f.getNode(!a), a, !1)
        : m
        ? JE(e, u.toRange(), !1)
        : I.none();
    },
    tk = (e, t, n, o, r, s) => {
      const a = bu(t, e.getBody(), n),
        i = De(a.getClientRects()),
        l = t === qE.Down,
        d = e.getBody();
      if (!i) return I.none();
      if (zx(e)) {
        const e = l ? Qi.fromRangeEnd(n) : Qi.fromRangeStart(n);
        return (l ? FE : IE)(d, e)
          .orThunk(() => I.from(e))
          .map((e) => e.toRange());
      }
      const c = (l ? YE : KE)(d, XE(1), a),
        u = Y(c, ZE(1)),
        m = i.left,
        f = HE(u, m);
      if (f && s(f.node)) {
        const n = Math.abs(m - f.left),
          o = Math.abs(m - f.right);
        return Bx(t, e, f.node, n < o, !1);
      }
      let g;
      if (((g = o(a) ? a.getNode() : r(a) ? a.getNode(!0) : Ci(n)), g)) {
        const n = ((e, t, n, o) => {
          const r = Bu(t);
          let s, a, i, l;
          const d = [];
          let c = 0;
          1 === e
            ? ((s = r.next), (a = vi), (i = bi), (l = Qi.after(o)))
            : ((s = r.prev), (a = bi), (i = vi), (l = Qi.before(o)));
          const u = GE(l);
          do {
            if (!l.isVisible()) continue;
            const e = GE(l);
            if (i(e, u)) continue;
            d.length > 0 && a(e, De(d)) && c++;
            const t = gi(e);
            if (((t.position = l), (t.line = c), n(t))) return d;
            d.push(t);
          } while ((l = s(l)));
          return d;
        })(t, d, XE(1), g);
        let o = HE(Y(n, ZE(1)), m);
        if (o) return JE(e, o.position.toRange(), !1);
        if (((o = De(Y(n, ZE(0)))), o)) return JE(e, o.position.toRange(), !1);
      }
      return 0 === u.length
        ? nk(e, l)
            .filter(l ? r : o)
            .map((t) => Dx(e, t.toRange(), !1))
        : I.none();
    },
    nk = (e, t) => {
      const n = e.selection.getRng(),
        o = t ? Qi.fromRangeEnd(n) : Qi.fromRangeStart(n),
        r =
          ((s = o.container()),
          (a = e.getBody()),
          Qn(
            Cn(s),
            (e) => Yc(e.dom),
            (e) => e.dom === a
          )
            .map((e) => e.dom)
            .getOr(a));
      var s, a;
      if (t) {
        const e = BE(r, o);
        return de(e.positions);
      }
      {
        const e = OE(r, o);
        return le(e.positions);
      }
    },
    ok = (e, t, n) =>
      nk(e, t)
        .filter(n)
        .exists((t) => (e.selection.setRng(t.toRange()), !0)),
    rk = (e, t) => {
      const n = e.dom.createRng();
      n.setStart(t.container(), t.offset()),
        n.setEnd(t.container(), t.offset()),
        e.selection.setRng(n);
    },
    sk = (e, t) => {
      e
        ? t.setAttribute("data-mce-selected", "inline-boundary")
        : t.removeAttribute("data-mce-selected");
    },
    ak = (e, t, n) => oE(t, n).map((t) => (rk(e, t), n)),
    ik = (e, t, n) => {
      const o = e.getBody(),
        r = ((e, t, n) => {
          const o = Qi.fromRangeStart(e);
          if (e.collapsed) return o;
          {
            const r = Qi.fromRangeEnd(e);
            return n ? ju(t, r).getOr(r) : zu(t, o).getOr(o);
          }
        })(e.selection.getRng(), o, n);
      return ((e, t, n, o) => {
        const r = Th(e, o),
          s = gE(t, n, r);
        return gE(t, n, r)
          .bind(T(wE, e))
          .orThunk(() =>
            ((e, t, n, o, r) => {
              const s = Th(e, r);
              return Mu(e, n, s)
                .map(T(Th, e))
                .fold(
                  () => o.map(bE),
                  (r) => gE(t, n, r).map(T(yE, e, t, n, s, r)).filter(T(CE, o))
                )
                .filter(fE);
            })(e, t, n, s, o)
          );
      })(n, T(Nh, e), o, r).bind((n) => ak(e, t, n));
    },
    lk = (e, t, n) => !!Nd(e) && ik(e, t, n).isSome(),
    dk = (e, t, n) =>
      !!Nd(t) &&
      ((e, t) => {
        const n = t.selection.getRng(),
          o = e ? Qi.fromRangeEnd(n) : Qi.fromRangeStart(n);
        return (
          !!((e) => w(e.selection.getSel().modify))(t) &&
          (e && ii(o)
            ? xE(!0, t.selection, o)
            : !(e || !li(o)) && xE(!1, t.selection, o))
        );
      })(e, t),
    ck = (e) => {
      const t = ma(null),
        n = T(Nh, e);
      return (
        e.on("NodeChange", (o) => {
          Nd(e) &&
            (((e, t, n) => {
              const o = V(
                  zo(Cn(t.getRoot()), '*[data-mce-selected="inline-boundary"]'),
                  (e) => e.dom
                ),
                r = Y(o, e),
                s = Y(n, e);
              q(re(r, s), T(sk, !1)), q(re(s, r), T(sk, !0));
            })(n, e.dom, o.parents),
            ((e, t) => {
              const n = t.get();
              if (e.selection.isCollapsed() && !e.composing && n) {
                const o = Qi.fromRangeStart(e.selection.getRng());
                Qi.isTextPosition(o) &&
                  !((e) => ii(e) || li(e))(o) &&
                  (rk(e, Fc(n, o)), t.set(null));
              }
            })(e, t),
            ((e, t, n, o) => {
              if (t.selection.isCollapsed()) {
                const r = Y(o, e);
                q(r, (o) => {
                  const r = Qi.fromRangeStart(t.selection.getRng());
                  gE(e, t.getBody(), r).bind((e) => ak(t, n, e));
                });
              }
            })(n, e, t, o.parents));
        }),
        t
      );
    },
    uk = T(dk, !0),
    mk = T(dk, !1),
    fk = (e, t, n) => {
      if (Nd(e)) {
        const o = nk(e, t).getOrThunk(() => {
          const n = e.selection.getRng();
          return t ? Qi.fromRangeEnd(n) : Qi.fromRangeStart(n);
        });
        return gE(T(Nh, e), e.getBody(), o).exists((t) => {
          const o = bE(t);
          return oE(n, o).exists((t) => (rk(e, t), !0));
        });
      }
      return !1;
    },
    gk = (e, t) => (n) => oE(t, n).map((t) => () => rk(e, t)),
    pk = (e, t, n, o) => {
      const r = e.getBody(),
        s = T(Nh, e);
      e.undoManager.ignore(() => {
        e.selection.setRng(
          ((e, t) => {
            const n = document.createRange();
            return (
              n.setStart(e.container(), e.offset()),
              n.setEnd(t.container(), t.offset()),
              n
            );
          })(n, o)
        ),
          Dh(e),
          gE(s, r, Qi.fromRangeStart(e.selection.getRng()))
            .map(vE)
            .bind(gk(e, t))
            .each(D);
      }),
        e.nodeChanged();
    },
    hk = (e, t, n) => {
      if (e.selection.isCollapsed() && Nd(e)) {
        const o = Qi.fromRangeStart(e.selection.getRng());
        return ((e, t, n, o) => {
          const r = ((e, t) => iu(t, e) || e)(e.getBody(), o.container()),
            s = T(Nh, e),
            a = gE(s, r, o);
          return a
            .bind((e) =>
              n
                ? e.fold(N(I.some(vE(e))), I.none, N(I.some(bE(e))), I.none)
                : e.fold(I.none, N(I.some(bE(e))), I.none, N(I.some(vE(e))))
            )
            .map(gk(e, t))
            .getOrThunk(() => {
              const i = Iu(n, r, o),
                l = i.bind((e) => gE(s, r, e));
              return It(a, l, () =>
                Ah(s, r, o).bind((t) =>
                  ((e) =>
                    It(Hu(e), $u(e), (t, n) => {
                      const o = Th(!0, t),
                        r = Th(!1, n);
                      return zu(e, o).forall((e) => e.isEqual(r));
                    }).getOr(!0))(t)
                    ? I.some(() => {
                        _h(e, n, Cn(t));
                      })
                    : I.none()
                )
              ).getOrThunk(() =>
                l.bind(() =>
                  i.map((r) => () => {
                    n ? pk(e, t, o, r) : pk(e, t, r, o);
                  })
                )
              );
            });
        })(e, t, n, o);
      }
      return I.none();
    },
    bk = (e, t) => {
      const n = Cn(e.getBody()),
        o = Cn(e.selection.getStart()),
        r = Up(o, n);
      return J(r, t).fold(N(r), (e) => r.slice(0, e));
    },
    vk = (e) => 1 === jn(e),
    yk = (e, t) => {
      const n = T(rv, e);
      return te(t, (e) => (n(e) ? [e.dom] : []));
    },
    Ck = (e) => {
      const t = ((e) => bk(e, (t) => e.schema.isBlock($t(t))))(e);
      return yk(e, t);
    },
    wk = (e, t) => {
      const n = Y(
        ((e) => bk(e, (t) => e.schema.isBlock($t(t)) || ((e) => jn(e) > 1)(t)))(
          e
        ),
        vk
      );
      return de(n).bind((o) => {
        const r = Qi.fromRangeStart(e.selection.getRng());
        return Fh(t, r, o.dom) && !jm(o)
          ? I.some(() =>
              ((e, t, n, o) => {
                const r = yk(t, o);
                if (0 === r.length) _h(t, e, n);
                else {
                  const e = ov(n.dom, r);
                  t.selection.setRng(e.toRange());
                }
              })(t, e, o, n)
            )
          : I.none();
      });
    },
    xk = (e, t) => {
      const n = e.selection.getStart(),
        o =
          ((e, t) => {
            const n = t.parentElement;
            return pr(t) && !h(n) && e.dom.isEmpty(n);
          })(e, n) || jm(Cn(n))
            ? ov(n, t)
            : ((e, t) => {
                const { caretContainer: n, caretPosition: o } = nv(t);
                return e.insertNode(n.dom), o;
              })(e.selection.getRng(), t);
      e.selection.setRng(o.toRange());
    },
    Ek = (e) => dr(e.startContainer),
    kk = (e) => {
      const t = e.selection.getRng();
      return (
        ((e) => 0 === e.startOffset && Ek(e))(t) &&
        ((e, t) => {
          const n = t.startContainer.parentElement;
          return !h(n) && rv(e, Cn(n));
        })(e, t) &&
        ((e) =>
          ((e) =>
            ((e) => {
              const t = e.startContainer.parentNode,
                n = e.endContainer.parentNode;
              return !h(t) && !h(n) && t.isEqualNode(n);
            })(e) &&
            ((e) => {
              const t = e.endContainer;
              return e.endOffset === (dr(t) ? t.length : t.childNodes.length);
            })(e))(e) ||
          ((e) => !e.endContainer.isEqualNode(e.commonAncestorContainer))(e))(t)
      );
    },
    _k = (e, t) =>
      e.selection.isCollapsed()
        ? wk(e, t)
        : ((e) => {
            if (kk(e)) {
              const t = Ck(e);
              return I.some(() => {
                Dh(e),
                  ((e, t) => {
                    const n = re(t, Ck(e));
                    n.length > 0 && xk(e, n);
                  })(e, t);
              });
            }
            return I.none();
          })(e),
    Sk = (e) => (
      ((e) => {
        const t = e.selection.getRng();
        return (
          t.collapsed &&
          (Ek(t) || e.dom.isEmpty(t.startContainer)) &&
          !((e) => {
            return (
              (t = Cn(e.selection.getStart())),
              (n = e.schema),
              jo(
                t,
                (e) => qu(e.dom),
                (e) => n.isBlock($t(e))
              )
            );
            var t, n;
          })(e)
        );
      })(e) && xk(e, []),
      !0
    ),
    Nk = (e, t, n) =>
      C(n)
        ? I.some(() => {
            e._selectionOverrides.hideFakeCaret(), _h(e, t, Cn(n));
          })
        : I.none(),
    Rk = (e, t) =>
      e.selection.isCollapsed()
        ? ((e, t) => {
            const n = t ? Bp : Pp,
              o = t ? wu.Forwards : wu.Backwards,
              r = bu(o, e.getBody(), e.selection.getRng());
            return n(r)
              ? Nk(e, t, r.getNode(!t))
              : I.from(Th(t, r))
                  .filter((e) => n(e) && Cu(r, e))
                  .bind((n) => Nk(e, t, n.getNode(!t)));
          })(e, t)
        : ((e, t) => {
            const n = e.selection.getNode();
            return wr(n) ? Nk(e, t, n) : I.none();
          })(e, t),
    Ak = (e) => Ze(null != e ? e : "").getOr(0),
    Tk = (e, t) =>
      (e || "table" === $t(t) ? "margin" : "padding") +
      ("rtl" === uo(t, "direction") ? "-right" : "-left"),
    Ok = (e) => {
      const t = Pk(e);
      return (
        !e.mode.isReadOnly() &&
        (t.length > 1 ||
          ((e, t) =>
            ne(t, (t) => {
              const n = Tk(ud(e), t),
                o = fo(t, n).map(Ak).getOr(0);
              return "false" !== e.dom.getContentEditable(t.dom) && o > 0;
            }))(e, t))
      );
    },
    Bk = (e) => qa(e) || Wa(e),
    Pk = (e) =>
      Y(
        _o(e.selection.getSelectedBlocks()),
        (e) =>
          !Bk(e) &&
          !((e) => Tn(e).exists(Bk))(e) &&
          Jn(e, (e) => br(e.dom) || vr(e.dom)).exists((e) => br(e.dom))
      ),
    Dk = (e, t) => {
      var n, o;
      const { dom: r } = e,
        s = md(e),
        a =
          null !==
            (o =
              null === (n = /[a-z%]+$/i.exec(s)) || void 0 === n
                ? void 0
                : n[0]) && void 0 !== o
            ? o
            : "px",
        i = Ak(s),
        l = ud(e);
      q(Pk(e), (e) => {
        ((e, t, n, o, r, s) => {
          const a = Tk(n, Cn(s)),
            i = Ak(e.getStyle(s, a));
          if ("outdent" === t) {
            const t = Math.max(0, i - o);
            e.setStyle(s, a, t ? t + r : "");
          } else {
            const t = i + o + r;
            e.setStyle(s, a, t);
          }
        })(r, t, l, i, a, e.dom);
      });
    },
    Lk = (e) => Dk(e, "outdent"),
    Mk = (e) => {
      if (e.selection.isCollapsed() && Ok(e)) {
        const t = e.dom,
          n = e.selection.getRng(),
          o = Qi.fromRangeStart(n),
          r = t.getParent(n.startContainer, t.isBlock);
        if (null !== r && Vp(Cn(r), o, e.schema)) return I.some(() => Lk(e));
      }
      return I.none();
    },
    Ik = (e, t, n) =>
      ue([Mk, Wx, Fx, (e, n) => hk(e, t, n), Rx, mb, Kx, Rk, Ox, _k], (t) =>
        t(e, n)
      ).filter((t) => e.selection.isEditable()),
    Fk = (e, t) => {
      e.addCommand("delete", () => {
        ((e, t) => {
          Ik(e, t, !1).fold(() => {
            e.selection.isEditable() && (Dh(e), Ih(e));
          }, D);
        })(e, t);
      }),
        e.addCommand("forwardDelete", () => {
          ((e, t) => {
            Ik(e, t, !0).fold(() => {
              e.selection.isEditable() &&
                ((e) => {
                  Ph(e, "ForwardDelete");
                })(e);
            }, D);
          })(e, t);
        });
    },
    Uk = (e) =>
      void 0 === e.touches || 1 !== e.touches.length
        ? I.none()
        : I.some(e.touches[0]),
    zk = (e, t) => ke(e, t.nodeName),
    jk = (e, t) =>
      !!dr(t) ||
      (!!er(t) && !(zk(e.getBlockElements(), t) || rm(t) || Kr(e, t) || Pr(t))),
    Hk = (e, t) => {
      if (dr(t)) {
        if (0 === t.data.length) return !0;
        if (/^\s+$/.test(t.data))
          return !t.nextSibling || zk(e, t.nextSibling) || Pr(t.nextSibling);
      }
      return !1;
    },
    $k = (e) => e.dom.create(ql(e), Wl(e)),
    Vk = (e) => {
      const t = e.dom,
        n = e.selection,
        o = e.schema,
        r = o.getBlockElements(),
        s = n.getStart(),
        a = e.getBody();
      let i,
        l,
        d = !1;
      const c = ql(e);
      if (!s || !er(s)) return;
      const u = a.nodeName.toLowerCase();
      if (
        !o.isValidChild(u, c.toLowerCase()) ||
        ((e, t, n) => $(Fp(Cn(n), Cn(t)), (t) => zk(e, t.dom)))(r, a, s)
      )
        return;
      const m = n.getRng(),
        {
          startContainer: f,
          startOffset: g,
          endContainer: p,
          endOffset: h,
        } = m,
        b = zg(e);
      let v = a.firstChild;
      for (; v; )
        if ((er(v) && $r(o, v), jk(o, v))) {
          if (Hk(r, v)) {
            (l = v), (v = v.nextSibling), t.remove(l);
            continue;
          }
          i || ((i = $k(e)), a.insertBefore(i, v), (d = !0)),
            (l = v),
            (v = v.nextSibling),
            i.appendChild(l);
        } else (i = null), (v = v.nextSibling);
      d &&
        b &&
        (m.setStart(f, g), m.setEnd(p, h), n.setRng(m), e.nodeChanged());
    },
    qk = (e, t, n) => {
      const o = Cn($k(e)),
        r = Xa();
      yo(o, r), n(t, o);
      const s = document.createRange();
      return s.setStartBefore(r.dom), s.setEndBefore(r.dom), s;
    },
    Wk = (e) => (t) => -1 !== (" " + t.attr("class") + " ").indexOf(e),
    Kk = (e, t, n) =>
      function (o) {
        const r = arguments,
          s = r[r.length - 2],
          a = s > 0 ? t.charAt(s - 1) : "";
        if ('"' === a) return o;
        if (">" === a) {
          const e = t.lastIndexOf("<", s);
          if (
            -1 !== e &&
            -1 !== t.substring(e, s).indexOf('contenteditable="false"')
          )
            return o;
        }
        return (
          '<span class="' +
          n +
          '" data-mce-content="' +
          e.dom.encode(r[0]) +
          '">' +
          e.dom.encode("string" == typeof r[1] ? r[1] : r[0]) +
          "</span>"
        );
      },
    Yk = (e, t) => {
      t.hasAttribute("data-mce-caret") &&
        (ui(t),
        e.selection.setRng(e.selection.getRng()),
        e.selection.scrollIntoView(t));
    },
    Gk = (e, t) => {
      const n = ((e) =>
        no(Cn(e.getBody()), "*[data-mce-caret]")
          .map((e) => e.dom)
          .getOrNull())(e);
      if (n)
        return "compositionstart" === t.type
          ? (t.preventDefault(), t.stopPropagation(), void Yk(e, n))
          : void (ai(n) && (Yk(e, n), e.undoManager.add()));
    },
    Xk = vr,
    Zk = (e, t, n) => {
      const o = Bu(e.getBody()),
        r = T(yu, 1 === t ? o.next : o.prev);
      if (n.collapsed) {
        const o = e.dom.getParent(n.startContainer, "PRE");
        if (!o) return;
        if (!r(Qi.fromRangeStart(n))) {
          const n = Cn(
            ((e) => {
              const t = e.dom.create(ql(e));
              return (t.innerHTML = '<br data-mce-bogus="1">'), t;
            })(e)
          );
          1 === t ? bo(Cn(o), n) : ho(Cn(o), n),
            e.selection.select(n.dom, !0),
            e.selection.collapse();
        }
      }
    },
    Qk = (e, t) =>
      ((e, t) => {
        const n = t ? wu.Forwards : wu.Backwards,
          o = e.selection.getRng();
        return ((e, t, n) => ek(t, e, n, Mp, Ip, Xk))(n, e, o).orThunk(
          () => (Zk(e, n, o), I.none())
        );
      })(
        e,
        ((e, t) => {
          const n = t ? e.getEnd(!0) : e.getStart(!0);
          return Rh(n) ? !t : t;
        })(e.selection, t)
      ).exists((t) => (QE(e, t), !0)),
    Jk = (e, t) =>
      ((e, t) => {
        const n = t ? 1 : -1,
          o = e.selection.getRng();
        return ((e, t, n) =>
          tk(
            t,
            e,
            n,
            (e) => Mp(e) || Dp(e),
            (e) => Ip(e) || Lp(e),
            Xk
          ))(n, e, o).orThunk(() => (Zk(e, n, o), I.none()));
      })(e, t).exists((t) => (QE(e, t), !0)),
    e_ = (e, t) => ok(e, t, t ? Ip : Mp),
    t_ = (e, t) =>
      Ux(e, !t)
        .map((n) => {
          const o = n.toRange(),
            r = e.selection.getRng();
          return (
            t
              ? o.setStart(r.startContainer, r.startOffset)
              : o.setEnd(r.endContainer, r.endOffset),
            o
          );
        })
        .exists((t) => (QE(e, t), !0)),
    n_ = (e) => H(["figcaption"], $t(e)),
    o_ = (e, t) =>
      !!e.selection.isCollapsed() &&
      ((e, t) => {
        const n = Cn(e.getBody()),
          o = Qi.fromRangeStart(e.selection.getRng());
        return ((e, t, n) => {
          const o = T(_n, t);
          return Jn(Cn(e.container()), (e) => n.isBlock($t(e)), o).filter(n_);
        })(o, n, e.schema).exists(() => {
          if (((e, t, n) => (t ? ME(e.dom, n) : LE(e.dom, n)))(n, t, o)) {
            const o = qk(e, n, t ? yo : vo);
            return e.selection.setRng(o), !0;
          }
          return !1;
        });
      })(e, t),
    r_ = (e, t) =>
      ((e, t) =>
        t
          ? I.from(e.dom.getParent(e.selection.getNode(), "details"))
              .map((t) =>
                ((e, t) => {
                  const n = e.selection.getRng(),
                    o = Qi.fromRangeStart(n);
                  return !(
                    e.getBody().lastChild !== t ||
                    !ME(t, o) ||
                    (e.execCommand("InsertNewBlockAfter"), 0)
                  );
                })(e, t)
              )
              .getOr(!1)
          : I.from(e.dom.getParent(e.selection.getNode(), "summary"))
              .bind((t) =>
                I.from(e.dom.getParent(t, "details")).map((n) =>
                  ((e, t, n) => {
                    const o = e.selection.getRng(),
                      r = Qi.fromRangeStart(o);
                    return !(
                      e.getBody().firstChild !== t ||
                      !LE(n, r) ||
                      (e.execCommand("InsertNewBlockBefore"), 0)
                    );
                  })(e, n, t)
                )
              )
              .getOr(!1))(e, t),
    s_ = { shiftKey: !1, altKey: !1, ctrlKey: !1, metaKey: !1, keyCode: 0 },
    a_ = (e, t) =>
      t.keyCode === e.keyCode &&
      t.shiftKey === e.shiftKey &&
      t.altKey === e.altKey &&
      t.ctrlKey === e.ctrlKey &&
      t.metaKey === e.metaKey,
    i_ =
      (e, ...t) =>
      () =>
        e.apply(null, t),
    l_ = (e, t) =>
      Q(
        ((e, t) =>
          te(((e) => V(e, (e) => ({ ...s_, ...e })))(e), (e) =>
            a_(e, t) ? [e] : []
          ))(e, t),
        (e) => e.action()
      ),
    d_ = (e, t) =>
      ue(
        ((e, t) =>
          te(((e) => V(e, (e) => ({ ...s_, ...e })))(e), (e) =>
            a_(e, t) ? [e] : []
          ))(e, t),
        (e) => e.action()
      ),
    c_ = (e, t) => {
      const n = t ? wu.Forwards : wu.Backwards,
        o = e.selection.getRng();
      return ek(e, n, o, Bp, Pp, wr).exists((t) => (QE(e, t), !0));
    },
    u_ = (e, t) => {
      const n = t ? 1 : -1,
        o = e.selection.getRng();
      return tk(e, n, o, Bp, Pp, wr).exists((t) => (QE(e, t), !0));
    },
    m_ = (e, t) => ok(e, t, t ? Pp : Bp),
    f_ = El([
      { none: ["current"] },
      { first: ["current"] },
      { middle: ["current", "target"] },
      { last: ["current"] },
    ]),
    g_ = { ...f_, none: (e) => f_.none(e) },
    p_ = (e, t, n) =>
      te(In(e), (e) => (En(e, t) ? (n(e) ? [e] : []) : p_(e, t, n))),
    h_ = (e, t) => oo(e, "table", t),
    b_ = (e, t, n, o, r = M) => {
      const s = 1 === o;
      if (!s && n <= 0) return g_.first(e[0]);
      if (s && n >= e.length - 1) return g_.last(e[e.length - 1]);
      {
        const s = n + o,
          a = e[s];
        return r(a) ? g_.middle(t, a) : b_(e, t, s, o, r);
      }
    },
    v_ = (e, t) =>
      h_(e, t).bind((t) => {
        const n = p_(t, "th,td", M);
        return J(n, (t) => _n(e, t)).map((e) => ({ index: e, all: n }));
      }),
    y_ = ["img", "br"],
    C_ = (e) => {
      return (
        ((t = e), za.getOption(t))
          .filter((e) => 0 !== e.trim().length || e.indexOf(Wo) > -1)
          .isSome() ||
        H(y_, $t(e)) ||
        ((e) => Wt(e) && "false" === tn(e, "contenteditable"))(e)
      );
      var t;
    },
    w_ = (e, t, n, o, r) => {
      const s = zo(Cn(n), "td,th,caption").map((e) => e.dom),
        a = Y(
          ((e, t) =>
            te(t, (t) => {
              const n = ((e, t) => ({
                left: e.left - t,
                top: e.top - t,
                right: e.right + -2,
                bottom: e.bottom + -2,
                width: e.width + t,
                height: e.height + t,
              }))(gi(t.getBoundingClientRect()), -1);
              return [
                { x: n.left, y: e(n), cell: t },
                { x: n.right, y: e(n), cell: t },
              ];
            }))(e, s),
          (e) => t(e, r)
        );
      return ((e, t, n) =>
        X(
          e,
          (e, o) =>
            e.fold(
              () => I.some(o),
              (e) => {
                const r = Math.sqrt(Math.abs(e.x - t) + Math.abs(e.y - n)),
                  s = Math.sqrt(Math.abs(o.x - t) + Math.abs(o.y - n));
                return I.some(s < r ? o : e);
              }
            ),
          I.none()
        ))(a, o, r).map((e) => e.cell);
    },
    x_ = T(
      w_,
      (e) => e.bottom,
      (e, t) => e.y < t
    ),
    E_ = T(
      w_,
      (e) => e.top,
      (e, t) => e.y > t
    ),
    k_ = (e, t, n) => {
      const o = e(t, n);
      return ((e) => e.breakType === EE.Wrap && 0 === e.positions.length)(o) ||
        (!pr(n.getNode()) &&
          ((e) => e.breakType === EE.Br && 1 === e.positions.length)(o))
        ? !((e, t, n) => n.breakAt.exists((n) => e(t, n).breakAt.isSome()))(
            e,
            t,
            o
          )
        : o.breakAt.isNone();
    },
    __ = T(k_, OE),
    S_ = T(k_, BE),
    N_ = (e, t, n, o) => {
      const r = e.selection.getRng(),
        s = t ? 1 : -1;
      return !(
        !qc() ||
        !((e, t, n) => {
          const o = Qi.fromRangeStart(t);
          return Uu(!e, n).exists((e) => e.isEqual(o));
        })(t, r, n) ||
        (Bx(s, e, n, !t, !1).each((t) => {
          QE(e, t);
        }),
        0)
      );
    },
    R_ = (e, t, n) => {
      const o = ((e, t) => {
          const n = t.getNode(e);
          return ar(n) ? I.some(n) : I.none();
        })(!!t, n),
        r = !1 === t;
      o.fold(
        () => QE(e, n.toRange()),
        (o) =>
          Uu(r, e.getBody())
            .filter((e) => e.isEqual(n))
            .fold(
              () => QE(e, n.toRange()),
              (n) =>
                ((e, t, n) => {
                  t.undoManager.transact(() => {
                    const o = e ? bo : ho,
                      r = qk(t, Cn(n), o);
                    QE(t, r);
                  });
                })(t, e, o)
            )
      );
    },
    A_ = (e, t, n, o) => {
      const r = e.selection.getRng(),
        s = Qi.fromRangeStart(r),
        a = e.getBody();
      if (!t && __(o, s)) {
        const o = ((e, t, n) =>
          ((e, t) =>
            le(t.getClientRects())
              .bind((t) => x_(e, t.left, t.top))
              .bind((e) => {
                return TE(
                  $u((n = e))
                    .map((e) => OE(n, e).positions.concat(e))
                    .getOr([]),
                  t
                );
                var n;
              }))(t, n)
            .orThunk(() =>
              le(n.getClientRects()).bind((n) =>
                AE(PE(e, Qi.before(t)), n.left)
              )
            )
            .getOr(Qi.before(t)))(a, n, s);
        return R_(e, t, o), !0;
      }
      if (t && S_(o, s)) {
        const o = ((e, t, n) =>
          ((e, t) =>
            de(t.getClientRects())
              .bind((t) => E_(e, t.left, t.top))
              .bind((e) => {
                return TE(
                  Hu((n = e))
                    .map((e) => [e].concat(BE(n, e).positions))
                    .getOr([]),
                  t
                );
                var n;
              }))(t, n)
            .orThunk(() =>
              le(n.getClientRects()).bind((n) => AE(DE(e, Qi.after(t)), n.left))
            )
            .getOr(Qi.after(t)))(a, n, s);
        return R_(e, t, o), !0;
      }
      return !1;
    },
    T_ = (e, t, n) =>
      I.from(e.dom.getParent(e.selection.getNode(), "td,th"))
        .bind((o) =>
          I.from(e.dom.getParent(o, "table")).map((r) => n(e, t, r, o))
        )
        .getOr(!1),
    O_ = (e, t) => T_(e, t, N_),
    B_ = (e, t) => T_(e, t, A_),
    P_ = (e, t, n) =>
      n.fold(
        I.none,
        I.none,
        (e, t) => {
          return ((n = t), eo(n, C_)).map((e) =>
            ((e) => {
              const t = Df.exact(e, 0, e, 0);
              return Uf(t);
            })(e)
          );
          var n;
        },
        (n) => (e.execCommand("mceTableInsertRowAfter"), D_(e, t, n))
      ),
    D_ = (e, t, n) => {
      return P_(
        e,
        t,
        ((r = ro),
        v_((o = n), void 0).fold(
          () => g_.none(o),
          (e) => b_(e.all, o, e.index, 1, r)
        ))
      );
      var o, r;
    },
    L_ = (e, t, n) => {
      return P_(
        e,
        t,
        ((r = ro),
        v_((o = n), void 0).fold(
          () => g_.none(),
          (e) => b_(e.all, o, e.index, -1, r)
        ))
      );
      var o, r;
    },
    M_ = (e, t) => {
      const n = ["table", "li", "dl"],
        o = Cn(e.getBody()),
        r = (e) => {
          const t = $t(e);
          return _n(e, o) || H(n, t);
        },
        s = e.selection.getRng();
      return ((e, t) =>
        ((e, t, n = L) =>
          n(t)
            ? I.none()
            : H(e, $t(t))
            ? I.some(t)
            : to(t, e.join(","), (e) => En(e, "table") || n(e)))(
          ["td", "th"],
          e,
          t
        ))(Cn(t ? s.endContainer : s.startContainer), r)
        .map(
          (n) => (
            h_(n, r).each((t) => {
              e.model.table.clearSelectedCells(t.dom);
            }),
            e.selection.collapse(!t),
            (t ? D_ : L_)(e, r, n).each((t) => {
              e.selection.setRng(t);
            }),
            !0
          )
        )
        .getOr(!1);
    },
    I_ = (e, t) => ({ container: e, offset: t }),
    F_ = da.DOM,
    U_ = (e) => (t) => e === t ? -1 : 0,
    z_ = (e, t, n) => {
      if (dr(e) && t >= 0) return I.some(I_(e, t));
      {
        const o = Ua(F_);
        return I.from(o.backwards(e, t, U_(e), n)).map((e) =>
          I_(e.container, e.container.data.length)
        );
      }
    },
    j_ = (e, t, n) => {
      if (!dr(e)) return I.none();
      const o = e.data;
      if (t >= 0 && t <= o.length) return I.some(I_(e, t));
      {
        const o = Ua(F_);
        return I.from(o.backwards(e, t, U_(e), n)).bind((e) => {
          const o = e.container.data;
          return j_(e.container, t + o.length, n);
        });
      }
    },
    H_ = (e, t, n) => {
      if (!dr(e)) return I.none();
      const o = e.data;
      if (t <= o.length) return I.some(I_(e, t));
      {
        const r = Ua(F_);
        return I.from(r.forwards(e, t, U_(e), n)).bind((e) =>
          H_(e.container, t - o.length, n)
        );
      }
    },
    $_ = (e, t, n, o, r) => {
      const s = Ua(
        e,
        (
          (e) => (t) =>
            e.isBlock(t) ||
            H(["BR", "IMG", "HR", "INPUT"], t.nodeName) ||
            "false" === e.getContentEditable(t)
        )(e)
      );
      return I.from(s.backwards(t, n, o, r));
    },
    V_ = (e) => "" !== e && -1 !== " \xa0\f\n\r\t\v".indexOf(e),
    q_ = (e, t) => e.substring(t.length),
    W_ = (e, t, n, o = !1) => {
      if (!(r = t).collapsed || !dr(r.startContainer)) return I.none();
      var r;
      const s = { text: "", offset: 0 },
        a = e.getParent(t.startContainer, e.isBlock) || e.getRoot();
      return $_(
        e,
        t.startContainer,
        t.startOffset,
        (e, t, r) => (
          (s.text = r + s.text),
          (s.offset += t),
          ((e, t, n, o = !1) => {
            let r;
            const s = n.charAt(0);
            for (r = t - 1; r >= 0; r--) {
              const a = e.charAt(r);
              if (!o && V_(a)) return I.none();
              if (s === a && He(e, n, r, t)) break;
            }
            return I.some(r);
          })(s.text, s.offset, n, o).getOr(t)
        ),
        a
      ).bind((e) => {
        const o = t.cloneRange();
        if (
          (o.setStart(e.container, e.offset),
          o.setEnd(t.endContainer, t.endOffset),
          o.collapsed)
        )
          return I.none();
        const r = ((e) => ei(e.toString().replace(/\u00A0/g, " ")))(o);
        return 0 !== r.lastIndexOf(n)
          ? I.none()
          : I.some({ text: q_(r, n), range: o, trigger: n });
      });
    },
    K_ = (e) => {
      if (((e) => 3 === e.nodeType)(e)) return I_(e, e.data.length);
      {
        const t = e.childNodes;
        return t.length > 0 ? K_(t[t.length - 1]) : I_(e, t.length);
      }
    },
    Y_ = (e, t) => {
      const n = e.childNodes;
      return n.length > 0 && t < n.length
        ? Y_(n[t], 0)
        : n.length > 0 && ((e) => 1 === e.nodeType)(e) && n.length === t
        ? K_(n[n.length - 1])
        : I_(e, t);
    },
    G_ = (e, t, n, o = {}) => {
      var r;
      const s = t(),
        a =
          null !== (r = e.selection.getRng().startContainer.nodeValue) &&
          void 0 !== r
            ? r
            : "",
        i = Y(
          s.lookupByTrigger(n.trigger),
          (t) =>
            n.text.length >= t.minChars &&
            t.matches.getOrThunk(() =>
              ((e) => (t) => {
                const n = Y_(t.startContainer, t.startOffset);
                return !((e, t) => {
                  var n;
                  const o =
                    null !== (n = e.getParent(t.container, e.isBlock)) &&
                    void 0 !== n
                      ? n
                      : e.getRoot();
                  return $_(
                    e,
                    t.container,
                    t.offset,
                    (e, t) => (0 === t ? -1 : t),
                    o
                  )
                    .filter((e) => {
                      const t = e.container.data.charAt(e.offset - 1);
                      return !V_(t);
                    })
                    .isSome();
                })(e, n);
              })(e.dom)
            )(n.range, a, n.text)
        );
      if (0 === i.length) return I.none();
      const l = Promise.all(
        V(i, (e) =>
          e
            .fetch(n.text, e.maxResults, o)
            .then((t) => ({
              matchText: n.text,
              items: t,
              columns: e.columns,
              onAction: e.onAction,
              highlightOn: e.highlightOn,
            }))
        )
      );
      return I.some({ lookupData: l, context: n });
    };
  var X_;
  !(function (e) {
    (e[(e.Error = 0)] = "Error"), (e[(e.Value = 1)] = "Value");
  })(X_ || (X_ = {}));
  const Z_ = (e, t, n) => (e.stype === X_.Error ? t(e.serror) : n(e.svalue)),
    Q_ = (e) => ({ stype: X_.Value, svalue: e }),
    J_ = (e) => ({ stype: X_.Error, serror: e }),
    eS = Z_,
    tS = (e) =>
      f(e) && fe(e).length > 100
        ? " removed due to size"
        : JSON.stringify(e, null, 2),
    nS = (e, t) => J_([{ path: e, getErrorInfo: t }]),
    oS = (e, t) => ({
      extract: (n, o) =>
        Ee(o, e).fold(
          () =>
            ((e, t) =>
              nS(
                e,
                () => 'Choice schema did not contain choice key: "' + t + '"'
              ))(n, e),
          (e) =>
            ((e, t, n, o) =>
              Ee(n, o).fold(
                () =>
                  ((e, t, n) =>
                    nS(
                      e,
                      () =>
                        'The chosen schema: "' +
                        n +
                        '" did not exist in branches: ' +
                        tS(t)
                    ))(e, n, o),
                (n) => n.extract(e.concat(["branch: " + o]), t)
              ))(n, o, t, e)
        ),
      toString: () => "chooseOn(" + e + "). Possible values: " + fe(t),
    }),
    rS =
      (e) =>
      (...t) => {
        if (0 === t.length) throw new Error("Can't merge zero objects");
        const n = {};
        for (let o = 0; o < t.length; o++) {
          const r = t[o];
          for (const t in r) ke(r, t) && (n[t] = e(n[t], r[t]));
        }
        return n;
      },
    sS = rS((e, t) => (g(e) && g(t) ? sS(e, t) : t)),
    aS = (rS((e, t) => t), (e) => ({ tag: "defaultedThunk", process: N(e) })),
    iS = (e) => {
      const t = ((e) => {
        const t = [],
          n = [];
        return (
          q(e, (e) => {
            Z_(
              e,
              (e) => n.push(e),
              (e) => t.push(e)
            );
          }),
          { values: t, errors: n }
        );
      })(e);
      return t.errors.length > 0
        ? ((n = t.errors), _(J_, ee)(n))
        : Q_(t.values);
      var n;
    },
    lS = (e, t, n) => {
      switch (e.tag) {
        case "field":
          return t(e.key, e.newKey, e.presence, e.prop);
        case "custom":
          return n(e.newKey, e.instantiator);
      }
    },
    dS = (e) => ({
      extract: (t, n) => {
        return (
          (o = e(n)),
          (r = (e) => ((e, t) => nS(e, N(t)))(t, e)),
          o.stype === X_.Error ? r(o.serror) : o
        );
        var o, r;
      },
      toString: N("val"),
    }),
    cS = dS(Q_),
    uS = (e, t, n, o) => o(Ee(e, t).getOrThunk(() => n(e))),
    mS = (e, t, n, o, r) => {
      const s = (e) => r.extract(t.concat([o]), e),
        a = (e) =>
          e.fold(
            () => Q_(I.none()),
            (e) => {
              const n = r.extract(t.concat([o]), e);
              return (
                (s = n),
                (a = I.some),
                s.stype === X_.Value
                  ? { stype: X_.Value, svalue: a(s.svalue) }
                  : s
              );
              var s, a;
            }
          );
      switch (e.tag) {
        case "required":
          return ((e, t, n, o) =>
            Ee(t, n).fold(
              () =>
                ((e, t, n) =>
                  nS(
                    e,
                    () =>
                      'Could not find valid *required* value for "' +
                      t +
                      '" in ' +
                      tS(n)
                  ))(e, n, t),
              o
            ))(t, n, o, s);
        case "defaultedThunk":
          return uS(n, o, e.process, s);
        case "option":
          return ((e, t, n) => n(Ee(e, t)))(n, o, a);
        case "defaultedOptionThunk":
          return ((e, t, n, o) =>
            o(Ee(e, t).map((t) => (!0 === t ? n(e) : t))))(n, o, e.process, a);
        case "mergeWithThunk":
          return uS(n, o, N({}), (t) => {
            const o = sS(e.process(n), t);
            return s(o);
          });
      }
    },
    fS = (e) => ({
      extract: (t, n) =>
        ((e, t, n) => {
          const o = {},
            r = [];
          for (const s of n)
            lS(
              s,
              (n, s, a, i) => {
                const l = mS(a, e, t, n, i);
                eS(
                  l,
                  (e) => {
                    r.push(...e);
                  },
                  (e) => {
                    o[s] = e;
                  }
                );
              },
              (e, n) => {
                o[e] = n(t);
              }
            );
          return r.length > 0 ? J_(r) : Q_(o);
        })(t, n, e),
      toString: () => {
        const t = V(e, (e) =>
          lS(
            e,
            (e, t, n, o) => e + " -> " + o.toString(),
            (e, t) => "state(" + e + ")"
          )
        );
        return "obj{\n" + t.join("\n") + "}";
      },
    }),
    gS = (e) => ({
      extract: (t, n) => {
        const o = V(n, (n, o) => e.extract(t.concat(["[" + o + "]"]), n));
        return iS(o);
      },
      toString: () => "array(" + e.toString() + ")",
    }),
    pS = (e, t, n) => {
      return (
        (o = ((e, t, n) =>
          ((e, t) =>
            e.stype === X_.Error
              ? { stype: X_.Error, serror: t(e.serror) }
              : e)(t.extract([e], n), (e) => ({ input: n, errors: e })))(
          e,
          t,
          n
        )),
        Z_(o, xl.error, xl.value)
      );
      var o;
    },
    hS = (e, t) => oS(e, he(t, fS)),
    bS = N(cS),
    vS = (e, t) =>
      dS((n) => {
        const o = typeof n;
        return e(n) ? Q_(n) : J_(`Expected type: ${t} but got: ${o}`);
      }),
    yS = vS(x, "number"),
    CS = vS(m, "string"),
    wS = vS(b, "boolean"),
    xS = vS(w, "function"),
    ES = (e, t, n, o) => ({
      tag: "field",
      key: e,
      newKey: t,
      presence: n,
      prop: o,
    }),
    kS = (e, t) => ({ tag: "custom", newKey: e, instantiator: t }),
    _S = (e, t) => ES(e, e, { tag: "required", process: {} }, t),
    SS = (e) => _S(e, CS),
    NS = (e) => _S(e, xS),
    RS = (e, t) => ES(e, e, { tag: "option", process: {} }, t),
    AS = (e) => RS(e, CS),
    TS = (e, t, n) => ES(e, e, aS(t), n),
    OS = (e, t) => TS(e, t, yS),
    BS = (e, t, n) =>
      TS(
        e,
        t,
        ((e) => {
          return (
            (t = (t) =>
              H(e, t)
                ? xl.value(t)
                : xl.error(
                    `Unsupported value: "${t}", choose one of "${e.join(
                      ", "
                    )}".`
                  )),
            dS((e) => t(e).fold(J_, Q_))
          );
          var t;
        })(n)
      ),
    PS = (e, t) => TS(e, t, wS),
    DS = (e, t) => TS(e, t, xS),
    LS = SS("type"),
    MS = NS("fetch"),
    IS = NS("onAction"),
    FS = DS("onSetup", () => k),
    US = AS("text"),
    zS = AS("icon"),
    jS = AS("tooltip"),
    HS = AS("label"),
    $S = PS("active", !1),
    VS = PS("enabled", !0),
    qS = PS("primary", !1),
    WS = (e) => ((e, t) => TS("type", t, CS))(0, e),
    KS = fS([
      LS,
      SS("trigger"),
      OS("minChars", 1),
      (1, ((e, t) => ES(e, e, aS(1), bS()))("columns")),
      OS("maxResults", 10),
      ("matches", RS("matches", xS)),
      MS,
      IS,
      ((YS = CS), TS("highlightOn", [], gS(YS))),
    ]);
  var YS;
  const GS = [VS, jS, zS, US, FS],
    XS = [$S].concat(GS),
    ZS = [
      DS("predicate", L),
      BS("scope", "node", ["node", "editor"]),
      BS("position", "selection", ["node", "selection", "line"]),
    ],
    QS = GS.concat([WS("contextformbutton"), qS, IS, kS("original", R)]),
    JS = XS.concat([WS("contextformbutton"), qS, IS, kS("original", R)]),
    eN = GS.concat([WS("contextformbutton")]),
    tN = XS.concat([WS("contextformtogglebutton")]),
    nN = hS("type", { contextformbutton: QS, contextformtogglebutton: JS });
  fS(
    [
      WS("contextform"),
      DS("initValue", N("")),
      HS,
      ((e, t) => ES(e, e, { tag: "required", process: {} }, gS(t)))(
        "commands",
        nN
      ),
      RS(
        "launch",
        hS("type", { contextformbutton: eN, contextformtogglebutton: tN })
      ),
    ].concat(ZS)
  );
  const oN = (e) => {
      const t = e.ui.registry.getAll().popups,
        n = he(t, (e) => {
          return ((t = e), pS("Autocompleter", KS, t)).fold((e) => {
            throw new Error(
              "Errors: \n" +
                ((e) => {
                  const t =
                    e.length > 10
                      ? e
                          .slice(0, 10)
                          .concat([
                            {
                              path: [],
                              getErrorInfo: N(
                                "... (only showing first ten failures)"
                              ),
                            },
                          ])
                      : e;
                  return V(
                    t,
                    (e) =>
                      "Failed path: (" +
                      e.path.join(" > ") +
                      ")\n" +
                      e.getErrorInfo()
                  );
                })((t = e).errors).join("\n") +
                "\n\nInput object: " +
                tS(t.input)
            );
            var t;
          }, R);
          var t;
        }),
        o = Se(we(n, (e) => e.trigger)),
        r = xe(n);
      return {
        dataset: n,
        triggers: o,
        lookupByTrigger: (e) => Y(r, (t) => t.trigger === e),
      };
    },
    rN = (e) => {
      const t = ya(),
        n = ma(!1),
        o = t.isSet,
        r = () => {
          o() &&
            (((e) => {
              e.dispatch("AutocompleterEnd");
            })(e),
            n.set(!1),
            t.clear());
        },
        s = Le(() => oN(e)),
        a = (a) => {
          ((n) =>
            t
              .get()
              .map((t) =>
                W_(e.dom, e.selection.getRng(), t.trigger, !0).bind((t) =>
                  G_(e, s, t, n)
                )
              )
              .getOrThunk(() =>
                ((e, t) => {
                  const n = t(),
                    o = e.selection.getRng();
                  return ((e, t, n) => ue(n.triggers, (n) => W_(e, t, n)))(
                    e.dom,
                    o,
                    n
                  ).bind((n) => G_(e, t, n));
                })(e, s)
              ))(a).fold(r, (s) => {
            ((e) => {
              o() || t.set({ trigger: e.trigger, matchLength: e.text.length });
            })(s.context),
              s.lookupData.then((o) => {
                t.get().map((a) => {
                  const i = s.context;
                  a.trigger === i.trigger &&
                    (i.text.length - a.matchLength >= 10
                      ? r()
                      : (t.set({ ...a, matchLength: i.text.length }),
                        n.get()
                          ? (bf(e, { range: i.range }),
                            ((e, t) => {
                              e.dispatch("AutocompleterUpdate", t);
                            })(e, { lookupData: o }))
                          : (n.set(!0),
                            bf(e, { range: i.range }),
                            ((e, t) => {
                              e.dispatch("AutocompleterStart", t);
                            })(e, { lookupData: o }))));
                });
              });
          });
        },
        i = () =>
          t.get().bind(({ trigger: t }) => {
            const o = e.selection.getRng();
            return W_(e.dom, o, t, n.get())
              .filter(({ range: e }) =>
                ((e, t) => {
                  const n = e.compareBoundaryPoints(
                      window.Range.START_TO_START,
                      t
                    ),
                    o = e.compareBoundaryPoints(window.Range.END_TO_END, t);
                  return n >= 0 && o <= 0;
                })(o, e)
              )
              .map(({ range: e }) => e);
          });
      e.addCommand("mceAutocompleterReload", (e, t) => {
        const n = f(t) ? t.fetchOptions : {};
        a(n);
      }),
        e.addCommand("mceAutocompleterClose", r),
        e.addCommand("mceAutocompleterRefreshActiveRange", () => {
          i().each((t) => {
            bf(e, { range: t });
          });
        }),
        e.editorCommands.addQueryStateHandler("mceAutoCompleterInRange", () =>
          i().isSome()
        ),
        ((e, t) => {
          const n = wa(t.load, 50);
          e.on("input", () => {
            n.throttle();
          }),
            e.on(
              "keydown",
              (e) => {
                const o = e.which;
                8 === o
                  ? n.throttle()
                  : 27 === o
                  ? (n.cancel(), t.cancelIfNecessary())
                  : (38 !== o && 40 !== o) || n.cancel();
              },
              !0
            ),
            e.on("remove", n.cancel);
        })(e, { cancelIfNecessary: r, load: a });
    },
    sN = Et().browser.isSafari(),
    aN = (e) => Za(Cn(e)),
    iN = (e, t) => {
      var n;
      return (
        0 === e.startOffset &&
        e.endOffset ===
          (null === (n = t.textContent) || void 0 === n ? void 0 : n.length)
      );
    },
    lN = (e, t) => I.from(e.getParent(t.container(), "details")),
    dN = (e, t) => lN(e, t).isSome(),
    cN = (e, t) => {
      const n = t.getNode();
      v(n) || e.selection.setCursorLocation(n, t.offset());
    },
    uN = (e, t, n) => {
      const o = e.dom.getParent(t.container(), "details");
      if (o && !o.open) {
        const t = e.dom.select("summary", o)[0];
        t && (n ? Hu(t) : $u(t)).each((t) => cN(e, t));
      } else cN(e, t);
    },
    mN = (e, t, n) => {
      const { dom: o, selection: r } = e,
        s = e.getBody();
      if ("character" === n) {
        const n = Qi.fromRangeStart(r.getRng()),
          a = o.getParent(n.container(), o.isBlock),
          i = lN(o, n),
          l = a && o.isEmpty(a),
          d = h(null == a ? void 0 : a.previousSibling),
          c = h(null == a ? void 0 : a.nextSibling);
        return (
          !!(
            l &&
            (t ? c : d) &&
            Iu(!t, s, n).exists((e) => dN(o, e) && !Mt(i, lN(o, e)))
          ) ||
          Iu(t, s, n).fold(L, (n) => {
            const r = lN(o, n);
            if (dN(o, n) && !Mt(i, r)) {
              if ((t || uN(e, n, !1), a && l)) {
                if (t && d) return !0;
                if (!t && c) return !0;
                uN(e, n, t), e.dom.remove(a);
              }
              return !0;
            }
            return !1;
          })
        );
      }
      return !1;
    },
    fN = (e, t, n, o) => {
      const r = e.selection.getRng(),
        s = Qi.fromRangeStart(r),
        a = e.getBody();
      return "selection" === o
        ? ((e, t) => {
            const n = t.startSummary.exists((t) =>
                t.contains(e.startContainer)
              ),
              o = t.startSummary.exists((t) => t.contains(e.endContainer)),
              r = t.startDetails.forall((e) =>
                t.endDetails.forall((t) => e !== t)
              );
            return ((n || o) && !(n && o)) || r;
          })(r, t)
        : n
        ? ((e, t) =>
            t.startSummary.exists((t) =>
              ((e, t) =>
                $u(t).exists(
                  (n) =>
                    (pr(n.getNode()) && ju(t, n).exists((t) => t.isEqual(e))) ||
                    n.isEqual(e)
                ))(e, t)
            ))(s, t) ||
          ((e, t, n) =>
            n.startDetails.exists((n) =>
              zu(e, t).forall((e) => !n.contains(e.container()))
            ))(a, s, t)
        : ((e, t) =>
            t.startSummary.exists((t) =>
              ((e, t) => Hu(t).exists((t) => t.isEqual(e)))(e, t)
            ))(s, t) ||
          ((e, t) =>
            t.startDetails.exists((n) =>
              ju(n, e).forall((n) =>
                t.startSummary.exists(
                  (t) => !t.contains(e.container()) && t.contains(n.container())
                )
              )
            ))(s, t);
    },
    gN = (e, t, n) =>
      ((e, t, n) =>
        ((e, t) => {
          const n = I.from(e.getParent(t.startContainer, "details")),
            o = I.from(e.getParent(t.endContainer, "details"));
          if (n.isSome() || o.isSome()) {
            const t = n.bind((t) => I.from(e.select("summary", t)[0]));
            return I.some({ startSummary: t, startDetails: n, endDetails: o });
          }
          return I.none();
        })(e.dom, e.selection.getRng()).fold(
          () => mN(e, t, n),
          (o) => fN(e, o, t, n) || mN(e, t, n)
        ))(e, t, n) ||
      (sN &&
        ((e, t, n) => {
          const o = e.selection,
            r = o.getNode(),
            s = o.getRng(),
            a = Qi.fromRangeStart(s);
          return (
            !!kr(r) &&
            (("selection" === n && iN(s, r)) || Fh(t, a, r)
              ? aN(r)
              : e.undoManager.transact(() => {
                  const s = o.getSel();
                  let {
                    anchorNode: a,
                    anchorOffset: i,
                    focusNode: l,
                    focusOffset: d,
                  } = null != s ? s : {};
                  const c = () => {
                      C(a) &&
                        C(i) &&
                        C(l) &&
                        C(d) &&
                        (null == s || s.setBaseAndExtent(a, i, l, d));
                    },
                    u = (e, t) => {
                      q(e.childNodes, (e) => {
                        Cm(e) && t.appendChild(e);
                      });
                    },
                    m = e.dom.create("span", { "data-mce-bogus": "1" });
                  u(r, m),
                    r.appendChild(m),
                    c(),
                    ("word" !== n && "line" !== n) ||
                      null == s ||
                      s.modify("extend", t ? "right" : "left", n),
                    !o.isCollapsed() && iN(o.getRng(), m)
                      ? aN(r)
                      : (e.execCommand(t ? "ForwardDelete" : "Delete"),
                        (a = null == s ? void 0 : s.anchorNode),
                        (i = null == s ? void 0 : s.anchorOffset),
                        (l = null == s ? void 0 : s.focusNode),
                        (d = null == s ? void 0 : s.focusOffset),
                        u(m, r),
                        c()),
                    e.dom.remove(m);
                }),
            !0)
          );
        })(e, t, n))
        ? I.some(k)
        : I.none(),
    pN =
      (e) =>
      (t, n, o = {}) => {
        const r = t.getBody(),
          s = {
            bubbles: !0,
            composed: !0,
            data: null,
            isComposing: !1,
            detail: 0,
            view: null,
            target: r,
            currentTarget: r,
            eventPhase: Event.AT_TARGET,
            originalTarget: r,
            explicitOriginalTarget: r,
            isTrusted: !1,
            srcElement: r,
            cancelable: !1,
            preventDefault: k,
            inputType: n,
          },
          a = Ws(new InputEvent(e));
        return t.dispatch(e, { ...a, ...s, ...o });
      },
    hN = pN("input"),
    bN = pN("beforeinput"),
    vN = Et(),
    yN = vN.os,
    CN = yN.isMacOS() || yN.isiOS(),
    wN = vN.browser.isFirefox(),
    xN = (e, t) => {
      const n = e.dom,
        o = e.schema.getMoveCaretBeforeOnEnterElements();
      if (!t) return;
      if (/^(LI|DT|DD)$/.test(t.nodeName)) {
        const e = ((e) => {
          for (; e; ) {
            if (er(e) || (dr(e) && e.data && /[\r\n\s]/.test(e.data))) return e;
            e = e.nextSibling;
          }
          return null;
        })(t.firstChild);
        e &&
          /^(UL|OL|DL)$/.test(e.nodeName) &&
          t.insertBefore(n.doc.createTextNode(Wo), t.firstChild);
      }
      const r = n.createRng();
      if ((t.normalize(), t.hasChildNodes())) {
        const e = new Vo(t, t);
        let n,
          s = t;
        for (; (n = e.current()); ) {
          if (dr(n)) {
            r.setStart(n, 0), r.setEnd(n, 0);
            break;
          }
          if (o[n.nodeName.toLowerCase()]) {
            r.setStartBefore(n), r.setEndBefore(n);
            break;
          }
          (s = n), (n = e.next());
        }
        n || (r.setStart(s, 0), r.setEnd(s, 0));
      } else
        pr(t)
          ? t.nextSibling && n.isBlock(t.nextSibling)
            ? (r.setStartBefore(t), r.setEndBefore(t))
            : (r.setStartAfter(t), r.setEndAfter(t))
          : (r.setStart(t, 0), r.setEnd(t, 0));
      e.selection.setRng(r), bg(e, r);
    },
    EN = (e, t) => {
      const n = e.getRoot();
      let o,
        r = t;
      for (; r !== n && r && "false" !== e.getContentEditable(r); ) {
        if ("true" === e.getContentEditable(r)) {
          o = r;
          break;
        }
        r = r.parentNode;
      }
      return r !== n ? o : n;
    },
    kN = (e) =>
      I.from(e.dom.getParent(e.selection.getStart(!0), e.dom.isBlock)),
    _N = (e) => {
      e.innerHTML = '<br data-mce-bogus="1">';
    },
    SN = (e, t) => {
      ql(e).toLowerCase() === t.tagName.toLowerCase() &&
        ((e, t, n) => {
          const o = e.dom;
          I.from(n.style)
            .map(o.parseStyle)
            .each((e) => {
              const n = { ...go(Cn(t)), ...e };
              o.setStyles(t, n);
            });
          const r = I.from(n.class).map((e) => e.split(/\s+/)),
            s = I.from(t.className).map((e) =>
              Y(e.split(/\s+/), (e) => "" !== e)
            );
          It(r, s, (e, n) => {
            const r = Y(n, (t) => !H(e, t)),
              s = [...e, ...r];
            o.setAttrib(t, "class", s.join(" "));
          });
          const a = ["style", "class"],
            i = Ce(n, (e, t) => !H(a, t));
          o.setAttribs(t, i);
        })(e, t, Wl(e));
    },
    NN = (e, t, n, o, r = !0, s, a) => {
      const i = e.dom,
        l = e.schema,
        d = ql(e),
        c = n ? n.nodeName.toUpperCase() : "";
      let u = t;
      const m = l.getTextInlineElements();
      let f;
      f =
        s || "TABLE" === c || "HR" === c
          ? i.create(s || d, a || {})
          : n.cloneNode(!1);
      let g = f;
      if (r) {
        do {
          if (m[u.nodeName]) {
            if (qu(u) || rm(u)) continue;
            const e = u.cloneNode(!1);
            i.setAttrib(e, "id", ""),
              f.hasChildNodes()
                ? (e.appendChild(f.firstChild), f.appendChild(e))
                : ((g = e), f.appendChild(e));
          }
        } while ((u = u.parentNode) && u !== o);
      } else i.setAttrib(f, "style", null), i.setAttrib(f, "class", null);
      return SN(e, f), _N(g), f;
    },
    RN = (e, t) => {
      const n = null == e ? void 0 : e.parentNode;
      return C(n) && n.nodeName === t;
    },
    AN = (e) => C(e) && /^(OL|UL|LI)$/.test(e.nodeName),
    TN = (e) => C(e) && /^(LI|DT|DD)$/.test(e.nodeName),
    ON = (e) => {
      const t = e.parentNode;
      return TN(t) ? t : e;
    },
    BN = (e, t, n) => {
      let o = e[n ? "firstChild" : "lastChild"];
      for (; o && !er(o); ) o = o[n ? "nextSibling" : "previousSibling"];
      return o === t;
    },
    PN = (e) =>
      X(
        we(go(Cn(e)), (e, t) => `${t}: ${e};`),
        (e, t) => e + t,
        ""
      ),
    DN = (e, t) => t && "A" === t.nodeName && e.isEmpty(t),
    LN = (e, t) =>
      e.nodeName === t ||
      (e.previousSibling && e.previousSibling.nodeName === t),
    MN = (e, t) =>
      C(t) &&
      e.isBlock(t) &&
      !/^(TD|TH|CAPTION|FORM)$/.test(t.nodeName) &&
      !/^(fixed|absolute)/i.test(t.style.position) &&
      e.isEditable(t.parentNode) &&
      "false" !== e.getContentEditable(t),
    IN = (e, t, n) =>
      dr(t)
        ? e
          ? 1 === n && t.data.charAt(n - 1) === Qa
            ? 0
            : n
          : n === t.data.length - 1 && t.data.charAt(n) === Qa
          ? t.data.length
          : n
        : n,
    FN = {
      insert: (e, t) => {
        let n,
          o,
          r,
          s,
          a = !1;
        const i = e.dom,
          l = e.schema.getNonEmptyElements(),
          d = e.selection.getRng(),
          c = ql(e),
          u = Cn(d.startContainer),
          f = Fn(u, d.startOffset),
          g = f.exists((e) => Wt(e) && !ro(e)),
          p = d.collapsed && g,
          b = (t, o) => NN(e, n, _, k, Xl(e), t, o),
          v = (e) => {
            const t = IN(e, n, o);
            if (dr(n) && (e ? t > 0 : t < n.data.length)) return !1;
            if ((n.parentNode === _ || n === _) && a && !e) return !0;
            if (e && er(n) && n === _.firstChild) return !0;
            if (LN(n, "TABLE") || LN(n, "HR")) return (a && !e) || (!a && e);
            const r = new Vo(n, _);
            let s;
            for (
              dr(n) &&
              (e && 0 === t ? r.prev() : e || t !== n.data.length || r.next());
              (s = r.current());

            ) {
              if (er(s)) {
                if (!s.getAttribute("data-mce-bogus")) {
                  const e = s.nodeName.toLowerCase();
                  if (l[e] && "br" !== e) return !1;
                }
              } else if (dr(s) && !Go(s.data)) return !1;
              e ? r.prev() : r.next();
            }
            return !0;
          },
          w = () => {
            let t;
            return (
              (t =
                /^(H[1-6]|PRE|FIGURE)$/.test(r) && "HGROUP" !== S ? b(c) : b()),
              ((e, t) => {
                const n = Zl(e);
                return (
                  !y(t) &&
                  (m(n) ? H(Dt.explode(n), t.nodeName.toLowerCase()) : n)
                );
              })(e, s) &&
              MN(i, s) &&
              i.isEmpty(_, void 0, { includeZwsp: !0 })
                ? (t = i.split(s, _))
                : i.insertAfter(t, _),
              xN(e, t),
              t
            );
          };
        Yf(i, d).each((e) => {
          d.setStart(e.startContainer, e.startOffset),
            d.setEnd(e.endContainer, e.endOffset);
        }),
          (n = d.startContainer),
          (o = d.startOffset);
        const x = !(!t || !t.shiftKey),
          E = !(!t || !t.ctrlKey);
        er(n) &&
          n.hasChildNodes() &&
          !p &&
          ((a = o > n.childNodes.length - 1),
          (n = n.childNodes[Math.min(o, n.childNodes.length - 1)] || n),
          (o = a && dr(n) ? n.data.length : 0));
        const k = EN(i, n);
        if (
          !k ||
          ((e, t) => {
            const n = e.dom.getParent(t, "ol,ul,dl");
            return null !== n && "false" === e.dom.getContentEditableParent(n);
          })(e, n)
        )
          return;
        x ||
          (n = ((e, t, n, o, r) => {
            var s, a;
            const i = e.dom,
              l = null !== (s = EN(i, o)) && void 0 !== s ? s : i.getRoot();
            let d = i.getParent(o, i.isBlock);
            if (!d || !MN(i, d)) {
              if (((d = d || l), !d.hasChildNodes())) {
                const o = i.create(t);
                return (
                  SN(e, o),
                  d.appendChild(o),
                  n.setStart(o, 0),
                  n.setEnd(o, 0),
                  o
                );
              }
              let s,
                c = o;
              for (; c && c.parentNode !== d; ) c = c.parentNode;
              for (; c && !i.isBlock(c); ) (s = c), (c = c.previousSibling);
              const u =
                null === (a = null == s ? void 0 : s.parentElement) ||
                void 0 === a
                  ? void 0
                  : a.nodeName;
              if (s && u && e.schema.isValidChild(u, t.toLowerCase())) {
                const a = s.parentNode,
                  l = i.create(t);
                for (
                  SN(e, l), a.insertBefore(l, s), c = s;
                  c && !i.isBlock(c);

                ) {
                  const e = c.nextSibling;
                  l.appendChild(c), (c = e);
                }
                n.setStart(o, r), n.setEnd(o, r);
              }
            }
            return o;
          })(e, c, d, n, o));
        let _ = i.getParent(n, i.isBlock) || i.getRoot();
        (s = C(null == _ ? void 0 : _.parentNode)
          ? i.getParent(_.parentNode, i.isBlock)
          : null),
          (r = _ ? _.nodeName.toUpperCase() : "");
        const S = s ? s.nodeName.toUpperCase() : "";
        if (
          ("LI" !== S || E || ((_ = s), (s = s.parentNode), (r = S)),
          er(s) &&
            ((e, t, n) =>
              !t &&
              n.nodeName.toLowerCase() === ql(e) &&
              e.dom.isEmpty(n) &&
              ((t, n, o) => {
                let r = n;
                for (; r && r !== t && h(r.nextSibling); ) {
                  const t = r.parentElement;
                  if (
                    !t ||
                    ((s = t),
                    !ke(
                      e.schema.getTextBlockElements(),
                      s.nodeName.toLowerCase()
                    ))
                  )
                    return Er(t);
                  r = t;
                }
                var s;
                return !1;
              })(e.getBody(), n))(e, x, _))
        )
          return ((e, t, n) => {
            var o, r, s;
            const a = t(ql(e)),
              i = ((e, t) => e.dom.getParent(t, Er))(e, n);
            i &&
              (e.dom.insertAfter(a, i),
              xN(e, a),
              (null !==
                (s =
                  null ===
                    (r =
                      null === (o = n.parentElement) || void 0 === o
                        ? void 0
                        : o.childNodes) || void 0 === r
                    ? void 0
                    : r.length) && void 0 !== s
                ? s
                : 0) > 1 && e.dom.remove(n));
          })(e, b, _);
        if (/^(LI|DT|DD)$/.test(r) && er(s) && i.isEmpty(_))
          return void ((e, t, n, o, r) => {
            const s = e.dom,
              a = e.selection.getRng(),
              i = n.parentNode;
            if (n === e.getBody() || !i) return;
            var l;
            AN((l = n)) && AN(l.parentNode) && (r = "LI");
            const d = TN(o) ? PN(o) : void 0;
            let c = TN(o) && d ? t(r, { style: PN(o) }) : t(r);
            if (BN(n, o, !0) && BN(n, o, !1))
              if (RN(n, "LI")) {
                const e = ON(n);
                s.insertAfter(c, e),
                  ((e) => {
                    var t;
                    return (
                      (null === (t = e.parentNode) || void 0 === t
                        ? void 0
                        : t.firstChild) === e
                    );
                  })(n)
                    ? s.remove(e)
                    : s.remove(n);
              } else s.replace(c, n);
            else if (BN(n, o, !0))
              RN(n, "LI")
                ? (s.insertAfter(c, ON(n)),
                  c.appendChild(s.doc.createTextNode(" ")),
                  c.appendChild(n))
                : i.insertBefore(c, n),
                s.remove(o);
            else if (BN(n, o, !1)) s.insertAfter(c, ON(n)), s.remove(o);
            else {
              n = ON(n);
              const e = a.cloneRange();
              e.setStartAfter(o), e.setEndAfter(n);
              const t = e.extractContents();
              if (
                "LI" === r &&
                ((e, t) => e.firstChild && "LI" === e.firstChild.nodeName)(t)
              ) {
                const e = Y(V(c.children, Cn), O(Zt("br")));
                (c = t.firstChild),
                  s.insertAfter(t, n),
                  q(e, (e) => vo(Cn(c), e)),
                  d && c.setAttribute("style", d);
              } else s.insertAfter(t, n), s.insertAfter(c, n);
              s.remove(o);
            }
            xN(e, c);
          })(e, b, s, _, c);
        if (!(p || (_ !== e.getBody() && MN(i, _)))) return;
        const N = _.parentNode;
        let R;
        if (p)
          (R = b(c)),
            f.fold(
              () => {
                yo(u, Cn(R));
              },
              (e) => {
                ho(e, Cn(R));
              }
            ),
            e.selection.setCursorLocation(R, 0);
        else if (oi(_)) (R = ui(_)), i.isEmpty(_) && _N(_), SN(e, R), xN(e, R);
        else if (v(!1)) R = w();
        else if (v(!0) && N) {
          R = N.insertBefore(b(), _);
          const t = Cn(d.startContainer).dom.hasChildNodes() && d.collapsed;
          xN(e, LN(_, "HR") || t ? R : _);
        } else {
          const t = ((e) => {
            const t = e.cloneRange();
            return (
              t.setStart(
                e.startContainer,
                IN(!0, e.startContainer, e.startOffset)
              ),
              t.setEnd(e.endContainer, IN(!1, e.endContainer, e.endOffset)),
              t
            );
          })(d).cloneRange();
          t.setEndAfter(_);
          const n = t.extractContents();
          ((e) => {
            q(Uo(Cn(e), Yt), (e) => {
              const t = e.dom;
              t.nodeValue = ei(t.data);
            });
          })(n),
            ((e) => {
              let t = e;
              do {
                dr(t) && (t.data = t.data.replace(/^[\r\n]+/, "")),
                  (t = t.firstChild);
              } while (t);
            })(n),
            (R = n.firstChild),
            i.insertAfter(n, _),
            ((e, t, n) => {
              var o;
              const r = [];
              if (!n) return;
              let s = n;
              for (; (s = s.firstChild); ) {
                if (e.isBlock(s)) return;
                er(s) && !t[s.nodeName.toLowerCase()] && r.push(s);
              }
              let a = r.length;
              for (; a--; )
                (s = r[a]),
                  (!s.hasChildNodes() ||
                    (s.firstChild === s.lastChild &&
                      "" ===
                        (null === (o = s.firstChild) || void 0 === o
                          ? void 0
                          : o.nodeValue)) ||
                    DN(e, s)) &&
                    e.remove(s);
            })(i, l, R),
            ((e, t) => {
              t.normalize();
              const n = t.lastChild;
              (!n ||
                (er(n) &&
                  /^(left|right)$/gi.test(e.getStyle(n, "float", !0)))) &&
                e.add(t, "br");
            })(i, _),
            i.isEmpty(_) && _N(_),
            R.normalize(),
            i.isEmpty(R) ? (i.remove(R), w()) : (SN(e, R), xN(e, R));
        }
        i.setAttrib(R, "id", ""), e.dispatch("NewBlock", { newBlock: R });
      },
      fakeEventName: "insertParagraph",
    },
    UN = (e, t, n) => {
      const o = e.dom.createRng();
      n
        ? (o.setStartBefore(t), o.setEndBefore(t))
        : (o.setStartAfter(t), o.setEndAfter(t)),
        e.selection.setRng(o),
        bg(e, o);
    },
    zN = (e, t) => {
      const n = vn("br");
      ho(Cn(t), n), e.undoManager.add();
    },
    jN = (e, t) => {
      HN(e.getBody(), t) || bo(Cn(t), vn("br"));
      const n = vn("br");
      bo(Cn(t), n), UN(e, n.dom, !1), e.undoManager.add();
    },
    HN = (e, t) => {
      return (
        (n = Qi.after(t)),
        !!pr(n.getNode()) ||
          zu(e, Qi.after(t))
            .map((e) => pr(e.getNode()))
            .getOr(!1)
      );
      var n;
    },
    $N = (e) => e && "A" === e.nodeName && "href" in e,
    VN = (e) => e.fold(L, $N, $N, L),
    qN = (e, t) => {
      t.fold(k, T(zN, e), T(jN, e), k);
    },
    WN = {
      insert: (e, t) => {
        const n = ((e) => {
          const t = T(Nh, e),
            n = Qi.fromRangeStart(e.selection.getRng());
          return gE(t, e.getBody(), n).filter(VN);
        })(e);
        n.isSome()
          ? n.each(T(qN, e))
          : ((e, t) => {
              const n = e.selection,
                o = e.dom,
                r = n.getRng();
              let s,
                a = !1;
              Yf(o, r).each((e) => {
                r.setStart(e.startContainer, e.startOffset),
                  r.setEnd(e.endContainer, e.endOffset);
              });
              let i = r.startOffset,
                l = r.startContainer;
              if (er(l) && l.hasChildNodes()) {
                const e = i > l.childNodes.length - 1;
                (l = l.childNodes[Math.min(i, l.childNodes.length - 1)] || l),
                  (i = e && dr(l) ? l.data.length : 0);
              }
              let d = o.getParent(l, o.isBlock);
              const c =
                  d && d.parentNode
                    ? o.getParent(d.parentNode, o.isBlock)
                    : null,
                u = c ? c.nodeName.toUpperCase() : "",
                m = !(!t || !t.ctrlKey);
              "LI" !== u || m || (d = c),
                dr(l) &&
                  i >= l.data.length &&
                  (((e, t, n) => {
                    const o = new Vo(t, n);
                    let r;
                    const s = e.getNonEmptyElements();
                    for (; (r = o.next()); )
                      if (
                        s[r.nodeName.toLowerCase()] ||
                        (dr(r) && r.length > 0)
                      )
                        return !0;
                    return !1;
                  })(e.schema, l, d || o.getRoot()) ||
                    ((s = o.create("br")),
                    r.insertNode(s),
                    r.setStartAfter(s),
                    r.setEndAfter(s),
                    (a = !0))),
                (s = o.create("br")),
                el(o, r, s),
                UN(e, s, a),
                e.undoManager.add();
            })(e, t);
      },
      fakeEventName: "insertLineBreak",
    },
    KN = (e, t) =>
      kN(e)
        .filter((e) => t.length > 0 && En(Cn(e), t))
        .isSome(),
    YN = El([{ br: [] }, { block: [] }, { none: [] }]),
    GN = (e, t) => ((e) => KN(e, Gl(e)))(e),
    XN = (e) => (t, n) =>
      ((e) =>
        kN(e)
          .filter((e) => Wa(Cn(e)))
          .isSome())(t) === e,
    ZN = (e, t) => (n, o) => {
      const r =
        ((e) => kN(e).fold(N(""), (e) => e.nodeName.toUpperCase()))(n) ===
        e.toUpperCase();
      return r === t;
    },
    QN = (e) => {
      const t = EN(e.dom, e.selection.getStart());
      return y(t);
    },
    JN = (e) => ZN("pre", e),
    eR = (e) => (t, n) => Vl(t) === e,
    tR = (e, t) => ((e) => KN(e, Yl(e)))(e),
    nR = (e, t) => t,
    oR = (e) => {
      const t = ql(e),
        n = EN(e.dom, e.selection.getStart());
      return C(n) && e.schema.isValidChild(n.nodeName, t);
    },
    rR = (e) => {
      const t = e.selection.getRng(),
        n = Cn(t.startContainer),
        o = Fn(n, t.startOffset).map((e) => Wt(e) && !ro(e));
      return t.collapsed && o.getOr(!0);
    },
    sR = (e, t) => (n, o) =>
      X(e, (e, t) => e && t(n, o), !0) ? I.some(t) : I.none(),
    aR = (e, t, n) => {
      t.selection.isCollapsed() ||
        ((e) => {
          e.execCommand("delete");
        })(t),
        (C(n) && bN(t, e.fakeEventName).isDefaultPrevented()) ||
          (e.insert(t, n), C(n) && hN(t, e.fakeEventName));
    },
    iR = (e, t) => {
      const n = () => aR(WN, e, t),
        o = () => aR(FN, e, t),
        r = ((e, t) =>
          rE(
            [
              sR([GN], YN.none()),
              sR([JN(!0), QN], YN.none()),
              sR([ZN("summary", !0)], YN.br()),
              sR([JN(!0), eR(!1), nR], YN.br()),
              sR([JN(!0), eR(!1)], YN.block()),
              sR([JN(!0), eR(!0), nR], YN.block()),
              sR([JN(!0), eR(!0)], YN.br()),
              sR([XN(!0), nR], YN.br()),
              sR([XN(!0)], YN.block()),
              sR([tR], YN.br()),
              sR([nR], YN.br()),
              sR([oR], YN.block()),
              sR([rR], YN.block()),
            ],
            [e, !(!t || !t.shiftKey)]
          ).getOr(YN.none()))(e, t);
      switch (Kl(e)) {
        case "linebreak":
          r.fold(n, n, k);
          break;
        case "block":
          r.fold(o, o, k);
          break;
        case "invert":
          r.fold(o, n, k);
          break;
        default:
          r.fold(n, o, k);
      }
    },
    lR = Et(),
    dR = lR.os.isiOS() && lR.browser.isSafari(),
    cR = (e, t) => {
      var n;
      t.isDefaultPrevented() ||
        (t.preventDefault(),
        (n = e.undoManager).typing && ((n.typing = !1), n.add()),
        e.undoManager.transact(() => {
          iR(e, t);
        }));
    },
    uR = Et(),
    mR = (e) => e.stopImmediatePropagation(),
    fR = (e) => e.keyCode === yf.PAGE_UP || e.keyCode === yf.PAGE_DOWN,
    gR = (e, t, n) => {
      n && !e.get()
        ? t.on("NodeChange", mR, !0)
        : !n && e.get() && t.off("NodeChange", mR),
        e.set(n);
    },
    pR = (e, t) => {
      const n = t.container(),
        o = t.offset();
      return dr(n)
        ? (n.insertData(o, e), I.some(Qi(n, o + e.length)))
        : vu(t).map((n) => {
            const o = yn(e);
            return t.isAtEnd() ? bo(n, o) : ho(n, o), Qi(o.dom, e.length);
          });
    },
    hR = T(pR, Wo),
    bR = T(pR, " "),
    vR = (e) => (t) => {
      e.selection.setRng(t.toRange()), e.nodeChanged();
    },
    yR = (e) => {
      const t = Qi.fromRangeStart(e.selection.getRng()),
        n = Cn(e.getBody());
      if (e.selection.isCollapsed()) {
        const o = T(Nh, e),
          r = Qi.fromRangeStart(e.selection.getRng());
        return gE(o, e.getBody(), r)
          .bind(
            (
              (e) => (t) =>
                t.fold(
                  (t) => ju(e.dom, Qi.before(t)),
                  (e) => Hu(e),
                  (e) => $u(e),
                  (t) => zu(e.dom, Qi.after(t))
                )
            )(n)
          )
          .map(
            (o) => () =>
              (
                (e, t, n) => (o) =>
                  ah(e, o, n) ? hR(t) : bR(t)
              )(
                n,
                t,
                e.schema
              )(o).each(vR(e))
          );
      }
      return I.none();
    },
    CR = (e) => {
      return Ft(
        Tt.browser.isFirefox() &&
          e.selection.isEditable() &&
          ((t = e.dom),
          (n = e.selection.getRng().startContainer),
          t.isEditable(t.getParent(n, "summary"))),
        () => {
          const t = Cn(e.getBody());
          e.selection.isCollapsed() || e.getDoc().execCommand("Delete"),
            ((e, t, n) => (ah(e, t, n) ? hR(t) : bR(t)))(
              t,
              Qi.fromRangeStart(e.selection.getRng()),
              e.schema
            ).each(vR(e));
        }
      );
      var t, n;
    },
    wR = (e) =>
      kc(e)
        ? [
            { keyCode: yf.TAB, action: i_(M_, e, !0) },
            { keyCode: yf.TAB, shiftKey: !0, action: i_(M_, e, !1) },
          ]
        : [],
    xR = (e) => {
      if ((e.addShortcut("Meta+P", "", "mcePrint"), rN(e), ow(e)))
        return ma(null);
      {
        const t = ck(e);
        return (
          ((e) => {
            e.on("beforeinput", (t) => {
              (e.selection.isEditable() &&
                !$(t.getTargetRanges(), (t) => !$g(e.dom, t))) ||
                t.preventDefault();
            });
          })(e),
          ((e) => {
            e.on("keyup compositionstart", T(Gk, e));
          })(e),
          ((e, t) => {
            e.on("keydown", (n) => {
              n.isDefaultPrevented() ||
                ((e, t, n) => {
                  const o = Tt.os.isMacOS() || Tt.os.isiOS();
                  l_(
                    [
                      { keyCode: yf.RIGHT, action: i_(Qk, e, !0) },
                      { keyCode: yf.LEFT, action: i_(Qk, e, !1) },
                      { keyCode: yf.UP, action: i_(Jk, e, !1) },
                      { keyCode: yf.DOWN, action: i_(Jk, e, !0) },
                      ...(o
                        ? [
                            {
                              keyCode: yf.UP,
                              action: i_(t_, e, !1),
                              metaKey: !0,
                              shiftKey: !0,
                            },
                            {
                              keyCode: yf.DOWN,
                              action: i_(t_, e, !0),
                              metaKey: !0,
                              shiftKey: !0,
                            },
                          ]
                        : []),
                      { keyCode: yf.RIGHT, action: i_(O_, e, !0) },
                      { keyCode: yf.LEFT, action: i_(O_, e, !1) },
                      { keyCode: yf.UP, action: i_(B_, e, !1) },
                      { keyCode: yf.DOWN, action: i_(B_, e, !0) },
                      { keyCode: yf.UP, action: i_(B_, e, !1) },
                      { keyCode: yf.UP, action: i_(r_, e, !1) },
                      { keyCode: yf.DOWN, action: i_(r_, e, !0) },
                      { keyCode: yf.RIGHT, action: i_(c_, e, !0) },
                      { keyCode: yf.LEFT, action: i_(c_, e, !1) },
                      { keyCode: yf.UP, action: i_(u_, e, !1) },
                      { keyCode: yf.DOWN, action: i_(u_, e, !0) },
                      { keyCode: yf.RIGHT, action: i_(lk, e, t, !0) },
                      { keyCode: yf.LEFT, action: i_(lk, e, t, !1) },
                      {
                        keyCode: yf.RIGHT,
                        ctrlKey: !o,
                        altKey: o,
                        action: i_(uk, e, t),
                      },
                      {
                        keyCode: yf.LEFT,
                        ctrlKey: !o,
                        altKey: o,
                        action: i_(mk, e, t),
                      },
                      { keyCode: yf.UP, action: i_(o_, e, !1) },
                      { keyCode: yf.DOWN, action: i_(o_, e, !0) },
                    ],
                    n
                  ).each((e) => {
                    n.preventDefault();
                  });
                })(e, t, n);
            });
          })(e, t),
          ((e, t) => {
            let n = !1;
            e.on("keydown", (o) => {
              (n = o.keyCode === yf.BACKSPACE),
                o.isDefaultPrevented() ||
                  ((e, t, n) => {
                    const o =
                        n.keyCode === yf.BACKSPACE
                          ? "deleteContentBackward"
                          : "deleteContentForward",
                      r = e.selection.isCollapsed(),
                      s = r ? "character" : "selection",
                      a = (e) => (r ? (e ? "word" : "line") : "selection");
                    d_(
                      [
                        { keyCode: yf.BACKSPACE, action: i_(Mk, e) },
                        { keyCode: yf.BACKSPACE, action: i_(Wx, e, !1) },
                        { keyCode: yf.DELETE, action: i_(Wx, e, !0) },
                        { keyCode: yf.BACKSPACE, action: i_(Fx, e, !1) },
                        { keyCode: yf.DELETE, action: i_(Fx, e, !0) },
                        { keyCode: yf.BACKSPACE, action: i_(hk, e, t, !1) },
                        { keyCode: yf.DELETE, action: i_(hk, e, t, !0) },
                        { keyCode: yf.BACKSPACE, action: i_(mb, e, !1) },
                        { keyCode: yf.DELETE, action: i_(mb, e, !0) },
                        { keyCode: yf.BACKSPACE, action: i_(gN, e, !1, s) },
                        { keyCode: yf.DELETE, action: i_(gN, e, !0, s) },
                        ...(CN
                          ? [
                              {
                                keyCode: yf.BACKSPACE,
                                altKey: !0,
                                action: i_(gN, e, !1, a(!0)),
                              },
                              {
                                keyCode: yf.DELETE,
                                altKey: !0,
                                action: i_(gN, e, !0, a(!0)),
                              },
                              {
                                keyCode: yf.BACKSPACE,
                                metaKey: !0,
                                action: i_(gN, e, !1, a(!1)),
                              },
                            ]
                          : [
                              {
                                keyCode: yf.BACKSPACE,
                                ctrlKey: !0,
                                action: i_(gN, e, !1, a(!0)),
                              },
                              {
                                keyCode: yf.DELETE,
                                ctrlKey: !0,
                                action: i_(gN, e, !0, a(!0)),
                              },
                            ]),
                        { keyCode: yf.BACKSPACE, action: i_(Kx, e, !1) },
                        { keyCode: yf.DELETE, action: i_(Kx, e, !0) },
                        { keyCode: yf.BACKSPACE, action: i_(Rk, e, !1) },
                        { keyCode: yf.DELETE, action: i_(Rk, e, !0) },
                        { keyCode: yf.BACKSPACE, action: i_(Ox, e, !1) },
                        { keyCode: yf.DELETE, action: i_(Ox, e, !0) },
                        { keyCode: yf.BACKSPACE, action: i_(Rx, e, !1) },
                        { keyCode: yf.DELETE, action: i_(Rx, e, !0) },
                        { keyCode: yf.BACKSPACE, action: i_(_k, e, !1) },
                        { keyCode: yf.DELETE, action: i_(_k, e, !0) },
                      ],
                      n
                    )
                      .filter((t) => e.selection.isEditable())
                      .each((t) => {
                        n.preventDefault(),
                          bN(e, o).isDefaultPrevented() || (t(), hN(e, o));
                      });
                  })(e, t, o);
            }),
              e.on("keyup", (t) => {
                t.isDefaultPrevented() ||
                  ((e, t, n) => {
                    l_(
                      [
                        { keyCode: yf.BACKSPACE, action: i_(qx, e) },
                        { keyCode: yf.DELETE, action: i_(qx, e) },
                        ...(CN
                          ? [
                              {
                                keyCode: yf.BACKSPACE,
                                altKey: !0,
                                action: i_(Sk, e),
                              },
                              {
                                keyCode: yf.DELETE,
                                altKey: !0,
                                action: i_(Sk, e),
                              },
                              ...(n
                                ? [
                                    {
                                      keyCode: wN ? 224 : 91,
                                      action: i_(Sk, e),
                                    },
                                  ]
                                : []),
                            ]
                          : [
                              {
                                keyCode: yf.BACKSPACE,
                                ctrlKey: !0,
                                action: i_(Sk, e),
                              },
                              {
                                keyCode: yf.DELETE,
                                ctrlKey: !0,
                                action: i_(Sk, e),
                              },
                            ]),
                      ],
                      t
                    );
                  })(e, t, n),
                  (n = !1);
              });
          })(e, t),
          ((e) => {
            let t = I.none();
            e.on("keydown", (n) => {
              n.keyCode === yf.ENTER &&
                (dR &&
                ((e) => {
                  if (!e.collapsed) return !1;
                  const t = e.startContainer;
                  if (dr(t)) {
                    const n =
                        /^[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]$/,
                      o = t.data.charAt(e.startOffset - 1);
                    return n.test(o);
                  }
                  return !1;
                })(e.selection.getRng())
                  ? ((e) => {
                      (t = I.some(e.selection.getBookmark())),
                        e.undoManager.add();
                    })(e)
                  : cR(e, n));
            }),
              e.on("keyup", (n) => {
                n.keyCode === yf.ENTER &&
                  t.each(() =>
                    ((e, n) => {
                      e.undoManager.undo(),
                        t.fold(k, (t) => e.selection.moveToBookmark(t)),
                        cR(e, n),
                        (t = I.none());
                    })(e, n)
                  );
              });
          })(e),
          ((e) => {
            e.on("keydown", (t) => {
              t.isDefaultPrevented() ||
                ((e, t) => {
                  d_(
                    [
                      { keyCode: yf.SPACEBAR, action: i_(yR, e) },
                      { keyCode: yf.SPACEBAR, action: i_(CR, e) },
                    ],
                    t
                  ).each((n) => {
                    t.preventDefault(),
                      bN(e, "insertText", { data: " " }).isDefaultPrevented() ||
                        (n(), hN(e, "insertText", { data: " " }));
                  });
                })(e, t);
            });
          })(e),
          ((e) => {
            e.on("input", (t) => {
              t.isComposing ||
                ((e) => {
                  const t = Cn(e.getBody());
                  e.selection.isCollapsed() &&
                    gh(
                      t,
                      Qi.fromRangeStart(e.selection.getRng()),
                      e.schema
                    ).each((t) => {
                      e.selection.setRng(t.toRange());
                    });
                })(e);
            });
          })(e),
          ((e) => {
            e.on("keydown", (t) => {
              t.isDefaultPrevented() ||
                ((e, t) => {
                  l_([...wR(e)], t).each((e) => {
                    t.preventDefault();
                  });
                })(e, t);
            });
          })(e),
          ((e, t) => {
            e.on("keydown", (n) => {
              n.isDefaultPrevented() ||
                ((e, t, n) => {
                  const o = Tt.os.isMacOS() || Tt.os.isiOS();
                  l_(
                    [
                      { keyCode: yf.END, action: i_(e_, e, !0) },
                      { keyCode: yf.HOME, action: i_(e_, e, !1) },
                      ...(o
                        ? []
                        : [
                            {
                              keyCode: yf.HOME,
                              action: i_(t_, e, !1),
                              ctrlKey: !0,
                              shiftKey: !0,
                            },
                            {
                              keyCode: yf.END,
                              action: i_(t_, e, !0),
                              ctrlKey: !0,
                              shiftKey: !0,
                            },
                          ]),
                      { keyCode: yf.END, action: i_(m_, e, !0) },
                      { keyCode: yf.HOME, action: i_(m_, e, !1) },
                      { keyCode: yf.END, action: i_(fk, e, !0, t) },
                      { keyCode: yf.HOME, action: i_(fk, e, !1, t) },
                    ],
                    n
                  ).each((e) => {
                    n.preventDefault();
                  });
                })(e, t, n);
            });
          })(e, t),
          ((e, t) => {
            if (uR.os.isMacOS()) return;
            const n = ma(!1);
            e.on("keydown", (t) => {
              fR(t) && gR(n, e, !0);
            }),
              e.on("keyup", (o) => {
                o.isDefaultPrevented() ||
                  ((e, t, n) => {
                    l_(
                      [
                        { keyCode: yf.PAGE_UP, action: i_(fk, e, !1, t) },
                        { keyCode: yf.PAGE_DOWN, action: i_(fk, e, !0, t) },
                      ],
                      n
                    );
                  })(e, t, o),
                  fR(o) && n.get() && (gR(n, e, !1), e.nodeChanged());
              });
          })(e, t),
          t
        );
      }
    };
  class ER {
    constructor(e) {
      let t;
      (this.lastPath = []), (this.editor = e);
      const n = this;
      "onselectionchange" in e.getDoc() ||
        e.on("NodeChange click mouseup keyup focus", (n) => {
          const o = e.selection.getRng(),
            r = {
              startContainer: o.startContainer,
              startOffset: o.startOffset,
              endContainer: o.endContainer,
              endOffset: o.endOffset,
            };
          ("nodechange" !== n.type && jf(r, t)) ||
            e.dispatch("SelectionChange"),
            (t = r);
        }),
        e.on("contextmenu", () => {
          Ng(e), e.dispatch("SelectionChange");
        }),
        e.on("SelectionChange", () => {
          const t = e.selection.getStart(!0);
          t &&
            bm(e) &&
            !n.isSameElementPath(t) &&
            e.dom.isChildOf(t, e.getBody()) &&
            e.nodeChanged({ selectionChange: !0 });
        }),
        e.on("mouseup", (t) => {
          !t.isDefaultPrevented() &&
            bm(e) &&
            ("IMG" === e.selection.getNode().nodeName
              ? Tg.setEditorTimeout(e, () => {
                  e.nodeChanged();
                })
              : e.nodeChanged());
        });
    }
    nodeChanged(e = {}) {
      const t = this.editor.selection;
      let n;
      if (
        this.editor.initialized &&
        t &&
        !Ud(this.editor) &&
        !this.editor.mode.isReadOnly()
      ) {
        const o = this.editor.getBody();
        (n = t.getStart(!0) || o),
          (n.ownerDocument === this.editor.getDoc() &&
            this.editor.dom.isChildOf(n, o)) ||
            (n = o);
        const r = [];
        this.editor.dom.getParent(n, (e) => e === o || (r.push(e), !1)),
          this.editor.dispatch("NodeChange", { ...e, element: n, parents: r });
      }
    }
    isSameElementPath(e) {
      let t;
      const n = this.editor,
        o = oe(n.dom.getParents(e, M, n.getBody()));
      if (o.length === this.lastPath.length) {
        for (t = o.length; t >= 0 && o[t] === this.lastPath[t]; t--);
        if (-1 === t) return (this.lastPath = o), !0;
      }
      return (this.lastPath = o), !1;
    }
  }
  const kR = Da("image"),
    _R = Da("event"),
    SR = (e) => (t) => {
      t[_R] = e;
    },
    NR = SR(0),
    RR = SR(2),
    AR = SR(1),
    TR =
      (0,
      (e) => {
        const t = e;
        return I.from(t[_R]).exists((e) => 0 === e);
      });
  const OR = Da("mode"),
    BR = (e) => (t) => {
      t[OR] = e;
    },
    PR = (e, t) => BR(t)(e),
    DR = BR(0),
    LR = BR(2),
    MR = BR(1),
    IR = (e) => (t) => {
      const n = t;
      return I.from(n[OR]).exists((t) => t === e);
    },
    FR = IR(0),
    UR = IR(1),
    zR = ["none", "copy", "link", "move"],
    jR = [
      "none",
      "copy",
      "copyLink",
      "copyMove",
      "link",
      "linkMove",
      "move",
      "all",
      "uninitialized",
    ],
    HR = () => {
      const e = new window.DataTransfer();
      let t = "move",
        n = "all";
      const o = {
        get dropEffect() {
          return t;
        },
        set dropEffect(e) {
          H(zR, e) && (t = e);
        },
        get effectAllowed() {
          return n;
        },
        set effectAllowed(e) {
          TR(o) && H(jR, e) && (n = e);
        },
        get items() {
          return ((e, t) => ({
            ...t,
            get length() {
              return t.length;
            },
            add: (n, o) => {
              if (FR(e)) {
                if (!m(n)) return t.add(n);
                if (!v(o)) return t.add(n, o);
              }
              return null;
            },
            remove: (n) => {
              FR(e) && t.remove(n);
            },
            clear: () => {
              FR(e) && t.clear();
            },
          }))(o, e.items);
        },
        get files() {
          return UR(o)
            ? Object.freeze({ length: 0, item: (e) => null })
            : e.files;
        },
        get types() {
          return e.types;
        },
        setDragImage: (t, n, r) => {
          var s;
          FR(o) &&
            ((s = { image: t, x: n, y: r }),
            (o[kR] = s),
            e.setDragImage(t, n, r));
        },
        getData: (t) => (UR(o) ? "" : e.getData(t)),
        setData: (t, n) => {
          FR(o) && e.setData(t, n);
        },
        clearData: (t) => {
          FR(o) && e.clearData(t);
        },
      };
      return DR(o), o;
    },
    $R = (e, t) => e.setData("text/html", t),
    VR = "x-tinymce/html",
    qR = N(VR),
    WR = "\x3c!-- " + VR + " --\x3e",
    KR = (e) => WR + e,
    YR = (e) => -1 !== e.indexOf(WR),
    GR = "%MCEPASTEBIN%",
    XR = (e) => e.dom.get("mcepastebin"),
    ZR = (e) => C(e) && "mcepastebin" === e.id,
    QR = (e) => e === GR,
    JR = (e, t) => (
      Dt.each(t, (t) => {
        e = u(t, RegExp) ? e.replace(t, "") : e.replace(t[0], t[1]);
      }),
      e
    ),
    eA = (e) =>
      JR(e, [
        /^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/gi,
        /<!--StartFragment-->|<!--EndFragment-->/g,
        [
          /( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g,
          (e, t, n) => (t || n ? Wo : " "),
        ],
        /<br class="Apple-interchange-newline">/g,
        /<br>$/i,
      ]),
    tA = (e, t) => ({ content: e, cancelled: t }),
    nA = (e, t) => (e.insertContent(t, { merge: dc(e), paste: !0 }), !0),
    oA = (e) => /^https?:\/\/[\w\-\/+=.,!;:&%@^~(){}?#]+$/i.test(e),
    rA = (e, t, n) =>
      !(e.selection.isCollapsed() || !oA(t)) &&
      ((e, t, n) => (
        e.undoManager.extra(
          () => {
            n(e, t);
          },
          () => {
            e.execCommand("mceInsertLink", !1, t);
          }
        ),
        !0
      ))(e, t, n),
    sA = (e, t, n) =>
      !!((e, t) =>
        oA(t) && $(Ec(e), (e) => Ve(t.toLowerCase(), `.${e.toLowerCase()}`)))(
        e,
        t
      ) &&
      ((e, t, n) => (
        e.undoManager.extra(
          () => {
            n(e, t);
          },
          () => {
            e.insertContent('<img src="' + t + '">');
          }
        ),
        !0
      ))(e, t, n),
    aA = ((e) => {
      let t = 0;
      return () => "mceclip" + t++;
    })(),
    iA = (e) => {
      const t = HR();
      return $R(t, e), LR(t), t;
    },
    lA = (e, t, n, o, r) => {
      const s = ((e, t, n) =>
        ((e, t, n) => {
          const o = ((e, t, n) =>
              e.dispatch("PastePreProcess", { content: t, internal: n }))(
              e,
              t,
              n
            ),
            r = ((e, t) => {
              const n = EC(
                {
                  sanitize: wc(e),
                  sandbox_iframes: Nc(e),
                  sandbox_iframes_exclusions: Rc(e),
                  convert_unsafe_embeds: Ac(e),
                },
                e.schema
              );
              n.addNodeFilter("meta", (e) => {
                Dt.each(e, (e) => {
                  e.remove();
                });
              });
              const o = n.parse(t, {
                forced_root_block: !1,
                isRootContent: !0,
              });
              return vp({ validate: !0 }, e.schema).serialize(o);
            })(e, o.content);
          return e.hasEventListeners("PastePostProcess") &&
            !o.isDefaultPrevented()
            ? ((e, t, n) => {
                const o = e.dom.create("div", { style: "display:none" }, t),
                  r = ((e, t, n) =>
                    e.dispatch("PastePostProcess", { node: t, internal: n }))(
                    e,
                    o,
                    n
                  );
                return tA(r.node.innerHTML, r.isDefaultPrevented());
              })(e, r, n)
            : tA(r, o.isDefaultPrevented());
        })(e, t, n))(e, t, n);
      if (!s.cancelled) {
        const t = s.content,
          n = () =>
            ((e, t, n) => {
              n || !cc(e)
                ? nA(e, t)
                : ((e, t) => {
                    Dt.each([rA, sA, nA], (n) => !n(e, t, nA));
                  })(e, t);
            })(e, t, o);
        r
          ? bN(e, "insertFromPaste", {
              dataTransfer: iA(t),
            }).isDefaultPrevented() || (n(), hN(e, "insertFromPaste"))
          : n();
      }
    },
    dA = (e, t, n, o) => {
      const r = n || YR(t);
      lA(e, ((e) => e.replace(WR, ""))(t), r, !1, o);
    },
    cA = (e, t, n) => {
      const o = e.dom.encode(t).replace(/\r\n/g, "\n"),
        r = ((e, t, n) => {
          const o = e.split(/\n\n/),
            r = ((e, t) => {
              let n = "<" + e;
              const o = we(t, (e, t) => t + '="' + bs.encodeAllRaw(e) + '"');
              return o.length && (n += " " + o.join(" ")), n + ">";
            })(t, n),
            s = "</" + t + ">",
            a = V(o, (e) => e.split(/\n/).join("<br />"));
          return 1 === a.length ? a[0] : V(a, (e) => r + e + s).join("");
        })(Zo(o, mc(e)), ql(e), Wl(e));
      lA(e, r, !1, !0, n);
    },
    uA = (e) => {
      const t = {};
      if (e && e.types)
        for (let n = 0; n < e.types.length; n++) {
          const o = e.types[n];
          try {
            t[o] = e.getData(o);
          } catch (e) {
            t[o] = "";
          }
        }
      return t;
    },
    mA = (e, t) => t in e && e[t].length > 0,
    fA = (e) => mA(e, "text/html") || mA(e, "text/plain"),
    gA = (e, t, n) => {
      const o = "paste" === t.type ? t.clipboardData : t.dataTransfer;
      var r;
      if (oc(e) && o) {
        const s = ((e, t) => {
          const n = t.items
              ? te(ce(t.items), (e) =>
                  "file" === e.kind ? [e.getAsFile()] : []
                )
              : [],
            o = t.files ? ce(t.files) : [];
          return Y(
            n.length > 0 ? n : o,
            ((e) => {
              const t = Ec(e);
              return (e) =>
                $e(e.type, "image/") &&
                $(
                  t,
                  (t) =>
                    ((e) => {
                      const t = e.toLowerCase(),
                        n = {
                          jpg: "jpeg",
                          jpe: "jpeg",
                          jfi: "jpeg",
                          jif: "jpeg",
                          jfif: "jpeg",
                          pjpeg: "jpeg",
                          pjp: "jpeg",
                          svg: "svg+xml",
                        };
                      return Dt.hasOwn(n, t) ? "image/" + n[t] : "image/" + t;
                    })(t) === e.type
                );
            })(e)
          );
        })(e, o);
        if (s.length > 0)
          return (
            t.preventDefault(),
            ((r = s),
            Promise.all(
              V(r, (e) => Jv(e).then((t) => ({ file: e, uri: t })))
            )).then((t) => {
              n && e.selection.setRng(n),
                q(t, (t) => {
                  ((e, t) => {
                    Zv(t.uri).each(({ data: n, type: o, base64Encoded: r }) => {
                      const s = r ? n : btoa(n),
                        a = t.file,
                        i = e.editorUpload.blobCache,
                        l = i.getByData(s, o),
                        d =
                          null != l
                            ? l
                            : ((e, t, n, o) => {
                                const r = aA(),
                                  s = Jl(e) && C(n.name),
                                  a = s
                                    ? ((e, t) => {
                                        const n = t.match(
                                          /([\s\S]+?)(?:\.[a-z0-9.]+)$/i
                                        );
                                        return C(n)
                                          ? e.dom.encode(n[1])
                                          : void 0;
                                      })(e, n.name)
                                    : r,
                                  i = s ? n.name : void 0,
                                  l = t.create(r, n, o, a, i);
                                return t.add(l), l;
                              })(e, i, a, s);
                      dA(e, `<img src="${d.blobUri()}">`, !1, !0);
                    });
                  })(e, t);
                });
            }),
            !0
          );
      }
      return !1;
    },
    pA = (e, t, n, o, r) => {
      let s = eA(n);
      const a = mA(t, qR()) || YR(n),
        i =
          !a &&
          ((e) =>
            !/<(?:\/?(?!(?:div|p|br|span)>)\w+|(?:(?!(?:span style="white-space:\s?pre;?">)|br\s?\/>))\w+\s[^>]+)>/i.test(
              e
            ))(s),
        l = oA(s);
      (QR(s) || !s.length || (i && !l)) && (o = !0),
        (o || l) &&
          (s =
            mA(t, "text/plain") && i
              ? t["text/plain"]
              : ((e) => {
                  const t = Ds(),
                    n = EC({}, t);
                  let o = "";
                  const r = t.getVoidElements(),
                    s = Dt.makeMap(
                      "script noscript style textarea video audio iframe object",
                      " "
                    ),
                    a = t.getBlockElements(),
                    i = (e) => {
                      const n = e.name,
                        l = e;
                      if ("br" !== n) {
                        if ("wbr" !== n)
                          if ((r[n] && (o += " "), s[n])) o += " ";
                          else {
                            if (
                              (3 === e.type && (o += e.value),
                              !(e.name in t.getVoidElements()))
                            ) {
                              let t = e.firstChild;
                              if (t)
                                do {
                                  i(t);
                                } while ((t = t.next));
                            }
                            a[n] &&
                              l.next &&
                              ((o += "\n"), "p" === n && (o += "\n"));
                          }
                      } else o += "\n";
                    };
                  return (e = JR(e, [/<!\[[^\]]+\]>/g])), i(n.parse(e)), o;
                })(s)),
        QR(s) || (o ? cA(e, s, r) : dA(e, s, a, r));
    },
    hA = (e, t, n) => {
      ((e, t, n) => {
        let o;
        e.on("keydown", (e) => {
          ((e) =>
            (yf.metaKeyPressed(e) && 86 === e.keyCode) ||
            (e.shiftKey && 45 === e.keyCode))(e) &&
            !e.isDefaultPrevented() &&
            (o = e.shiftKey && 86 === e.keyCode);
        }),
          e.on("paste", (r) => {
            if (
              r.isDefaultPrevented() ||
              ((e) => {
                var t, n;
                return (
                  Tt.os.isAndroid() &&
                  0 ===
                    (null ===
                      (n =
                        null === (t = e.clipboardData) || void 0 === t
                          ? void 0
                          : t.items) || void 0 === n
                      ? void 0
                      : n.length)
                );
              })(r)
            )
              return;
            const s = "text" === n.get() || o;
            o = !1;
            const a = uA(r.clipboardData);
            (!fA(a) && gA(e, r, t.getLastRng() || e.selection.getRng())) ||
              (mA(a, "text/html")
                ? (r.preventDefault(), pA(e, a, a["text/html"], s, !0))
                : mA(a, "text/plain") && mA(a, "text/uri-list")
                ? (r.preventDefault(), pA(e, a, a["text/plain"], s, !0))
                : (t.create(),
                  Tg.setEditorTimeout(
                    e,
                    () => {
                      const n = t.getHtml();
                      t.remove(), pA(e, a, n, s, !1);
                    },
                    0
                  )));
          });
      })(e, t, n),
        ((e) => {
          const t = (e) => $e(e, "webkit-fake-url"),
            n = (e) => $e(e, "data:");
          e.parser.addNodeFilter("img", (o, r, s) => {
            if (
              !oc(e) &&
              ((e) => {
                var t;
                return (
                  !0 ===
                  (null === (t = e.data) || void 0 === t ? void 0 : t.paste)
                );
              })(s)
            )
              for (const r of o) {
                const o = r.attr("src");
                m(o) &&
                  !r.attr("data-mce-object") &&
                  o !== Tt.transparentSrc &&
                  (t(o) || (!fc(e) && n(o))) &&
                  r.remove();
              }
          });
        })(e);
    },
    bA = (e, t, n, o) => {
      ((e, t, n) => {
        if (!e) return !1;
        try {
          return (
            e.clearData(),
            e.setData("text/html", t),
            e.setData("text/plain", n),
            e.setData(qR(), t),
            !0
          );
        } catch (e) {
          return !1;
        }
      })(e.clipboardData, t.html, t.text)
        ? (e.preventDefault(), o())
        : n(t.html, o);
    },
    vA = (e) => (t, n) => {
      const { dom: o, selection: r } = e,
        s = o.create("div", {
          contenteditable: "false",
          "data-mce-bogus": "all",
        }),
        a = o.create("div", { contenteditable: "true" }, t);
      o.setStyles(s, {
        position: "fixed",
        top: "0",
        left: "-3000px",
        width: "1000px",
        overflow: "hidden",
      }),
        s.appendChild(a),
        o.add(e.getBody(), s);
      const i = r.getRng();
      a.focus();
      const l = o.createRng();
      l.selectNodeContents(a),
        r.setRng(l),
        Tg.setEditorTimeout(
          e,
          () => {
            r.setRng(i), o.remove(s), n();
          },
          0
        );
    },
    yA = (e) => ({
      html: KR(e.selection.getContent({ contextual: !0 })),
      text: e.selection.getContent({ format: "text" }),
    }),
    CA = (e) =>
      !e.selection.isCollapsed() ||
      ((e) =>
        !!e.dom.getParent(
          e.selection.getStart(),
          "td[data-mce-selected],th[data-mce-selected]",
          e.getBody()
        ))(e),
    wA = (e, t) => {
      var n, o;
      return Zf.getCaretRangeFromPoint(
        null !== (n = t.clientX) && void 0 !== n ? n : 0,
        null !== (o = t.clientY) && void 0 !== o ? o : 0,
        e.getDoc()
      );
    },
    xA = (e, t) => {
      e.focus(), t && e.selection.setRng(t);
    },
    EA = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,
    kA = (e) => Dt.trim(e).replace(EA, $s).toLowerCase(),
    _A = (e, t, n) => {
      const o = ic(e);
      if (n || "all" === o || !lc(e)) return t;
      const r = o ? o.split(/[, ]/) : [];
      if (r && "none" !== o) {
        const n = e.dom,
          o = e.selection.getNode();
        t = t.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, (e, t, s, a) => {
          const i = n.parseStyle(n.decode(s)),
            l = {};
          for (let e = 0; e < r.length; e++) {
            const t = i[r[e]];
            let s = t,
              a = n.getStyle(o, r[e], !0);
            /color/.test(r[e]) && ((s = kA(s)), (a = kA(a))),
              a !== s && (l[r[e]] = t);
          }
          const d = n.serializeStyle(l, "span");
          return d ? t + ' style="' + d + '"' + a : t + a;
        });
      } else t = t.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi, "$1$3");
      return (
        (t = t.replace(
          /(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi,
          (e, t, n, o) => t + ' style="' + n + '"' + o
        )),
        t
      );
    },
    SA = (e) => {
      const t = ma(!1),
        n = ma(uc(e) ? "text" : "html"),
        o = ((e) => {
          const t = ma(null);
          return {
            create: () =>
              ((e, t) => {
                const { dom: n, selection: o } = e,
                  r = e.getBody();
                t.set(o.getRng());
                const s = n.add(
                  e.getBody(),
                  "div",
                  {
                    id: "mcepastebin",
                    class: "mce-pastebin",
                    contentEditable: !0,
                    "data-mce-bogus": "all",
                    style:
                      "position: fixed; top: 50%; width: 10px; height: 10px; overflow: hidden; opacity: 0",
                  },
                  GR
                );
                Tt.browser.isFirefox() &&
                  n.setStyle(
                    s,
                    "left",
                    "rtl" === n.getStyle(r, "direction", !0) ? 65535 : -65535
                  ),
                  n.bind(s, "beforedeactivate focusin focusout", (e) => {
                    e.stopPropagation();
                  }),
                  s.focus(),
                  o.select(s, !0);
              })(e, t),
            remove: () =>
              ((e, t) => {
                const n = e.dom;
                if (XR(e)) {
                  let o;
                  const r = t.get();
                  for (; (o = XR(e)); ) n.remove(o), n.unbind(o);
                  r && e.selection.setRng(r);
                }
                t.set(null);
              })(e, t),
            getEl: () => XR(e),
            getHtml: () =>
              ((e) => {
                const t = e.dom,
                  n = (e, n) => {
                    e.appendChild(n), t.remove(n, !0);
                  },
                  [o, ...r] = Y(e.getBody().childNodes, ZR);
                q(r, (e) => {
                  n(o, e);
                });
                const s = t.select("div[id=mcepastebin]", o);
                for (let e = s.length - 1; e >= 0; e--) {
                  const r = t.create("div");
                  o.insertBefore(r, s[e]), n(r, s[e]);
                }
                return o ? o.innerHTML : "";
              })(e),
            getLastRng: t.get,
          };
        })(e);
      ((e) => {
        (Tt.browser.isChromium() || Tt.browser.isSafari()) &&
          ((e, t) => {
            e.on("PastePreProcess", (n) => {
              n.content = t(e, n.content, n.internal);
            });
          })(e, _A);
      })(e),
        ((e, t) => {
          e.addCommand("mceTogglePlainTextPaste", () => {
            ((e, t) => {
              "text" === t.get()
                ? (t.set("html"), vf(e, !1))
                : (t.set("text"), vf(e, !0)),
                e.focus();
            })(e, t);
          }),
            e.addCommand("mceInsertClipboardContent", (t, n) => {
              n.html && dA(e, n.html, n.internal, !1),
                n.text && cA(e, n.text, !1);
            });
        })(e, n),
        ((e) => {
          const t = (t) => (n) => {
              t(e, n);
            },
            n = rc(e);
          w(n) && e.on("PastePreProcess", t(n));
          const o = sc(e);
          w(o) && e.on("PastePostProcess", t(o));
        })(e),
        e.on("PreInit", () => {
          ((e) => {
            e.on(
              "cut",
              ((e) => (t) => {
                !t.isDefaultPrevented() &&
                  CA(e) &&
                  e.selection.isEditable() &&
                  bA(t, yA(e), vA(e), () => {
                    if (Tt.browser.isChromium() || Tt.browser.isFirefox()) {
                      const t = e.selection.getRng();
                      Tg.setEditorTimeout(
                        e,
                        () => {
                          e.selection.setRng(t), e.execCommand("Delete");
                        },
                        0
                      );
                    } else e.execCommand("Delete");
                  });
              })(e)
            ),
              e.on(
                "copy",
                ((e) => (t) => {
                  !t.isDefaultPrevented() && CA(e) && bA(t, yA(e), vA(e), k);
                })(e)
              );
          })(e),
            ((e, t) => {
              nc(e) &&
                e.on("dragend dragover draggesture dragdrop drop drag", (e) => {
                  e.preventDefault(), e.stopPropagation();
                }),
                oc(e) ||
                  e.on("drop", (e) => {
                    const t = e.dataTransfer;
                    t &&
                      ((e) => $(e.files, (e) => /^image\//.test(e.type)))(t) &&
                      e.preventDefault();
                  }),
                e.on("drop", (n) => {
                  if (n.isDefaultPrevented()) return;
                  const o = wA(e, n);
                  if (y(o)) return;
                  const r = uA(n.dataTransfer),
                    s = mA(r, qR());
                  if (
                    (!fA(r) ||
                      ((e) => {
                        const t = e["text/plain"];
                        return !!t && 0 === t.indexOf("file://");
                      })(r)) &&
                    gA(e, n, o)
                  )
                    return;
                  const a = r[qR()],
                    i = a || r["text/html"] || r["text/plain"],
                    l = ((e, t, n, o) => {
                      const r = e.getParent(n, (e) => Kr(t, e));
                      if (!h(e.getParent(n, "summary"))) return !0;
                      if (r && ke(o, "text/html")) {
                        const e = new DOMParser().parseFromString(
                          o["text/html"],
                          "text/html"
                        ).body;
                        return !h(e.querySelector(r.nodeName.toLowerCase()));
                      }
                      return !1;
                    })(e.dom, e.schema, o.startContainer, r),
                    d = t.get();
                  (d && !l) ||
                    (i &&
                      (n.preventDefault(),
                      Tg.setEditorTimeout(e, () => {
                        e.undoManager.transact(() => {
                          (a || (d && l)) && e.execCommand("Delete"), xA(e, o);
                          const t = eA(i);
                          r["text/html"] ? dA(e, t, s, !0) : cA(e, t, !0);
                        });
                      })));
                }),
                e.on("dragstart", (e) => {
                  t.set(!0);
                }),
                e.on("dragover dragend", (n) => {
                  oc(e) && !t.get() && (n.preventDefault(), xA(e, wA(e, n))),
                    "dragend" === n.type && t.set(!1);
                }),
                ((e) => {
                  e.on("input", (t) => {
                    const n = (e) => h(e.querySelector("summary"));
                    if ("deleteByDrag" === t.inputType) {
                      const t = Y(e.dom.select("details"), n);
                      q(t, (t) => {
                        pr(t.firstChild) && t.firstChild.remove();
                        const n = e.dom.create("summary");
                        n.appendChild(Xa().dom), t.prepend(n);
                      });
                    }
                  });
                })(e);
            })(e, t),
            hA(e, o, n);
        });
    },
    NA = pr,
    RA = dr,
    AA = (e) => vr(e.dom),
    TA = (e) => (t) => _n(Cn(e), t),
    OA = (e, t) => Jn(Cn(e), AA, TA(t)),
    BA = (e, t, n) => {
      const o = new Vo(e, t),
        r = n ? o.next.bind(o) : o.prev.bind(o);
      let s = e;
      for (let t = n ? e : r(); t && !NA(t); t = r()) Bi(t) && (s = t);
      return s;
    },
    PA = (e) => {
      const t = ((e, t, n) => {
        const o = Qi.fromRangeStart(e).getNode(),
          r = ((e, t, n) =>
            Jn(
              Cn(e),
              (e) => ((e) => br(e.dom))(e) || n.isBlock($t(e)),
              TA(t)
            ).getOr(Cn(t)).dom)(o, t, n),
          s = BA(o, r, !1),
          a = BA(o, r, !0),
          i = document.createRange();
        return (
          OA(s, r).fold(
            () => {
              RA(s) ? i.setStart(s, 0) : i.setStartBefore(s);
            },
            (e) => i.setStartBefore(e.dom)
          ),
          OA(a, r).fold(
            () => {
              RA(a) ? i.setEnd(a, a.data.length) : i.setEndAfter(a);
            },
            (e) => i.setEndAfter(e.dom)
          ),
          i
        );
      })(e.selection.getRng(), e.getBody(), e.schema);
      e.selection.setRng(Rb(t));
    };
  var DA;
  !(function (e) {
    (e.Before = "before"), (e.After = "after");
  })(DA || (DA = {}));
  const LA = (e, t) => Math.abs(e.left - t),
    MA = (e, t) => Math.abs(e.right - t),
    IA = (e, t) =>
      ((e) =>
        X(
          e,
          (e, t) =>
            e.fold(
              () => I.some(t),
              (e) => {
                const n = Math.min(t.left, e.left),
                  o = Math.min(t.top, e.top),
                  r = Math.max(t.right, e.right),
                  s = Math.max(t.bottom, e.bottom);
                return I.some({
                  top: o,
                  right: r,
                  bottom: s,
                  left: n,
                  width: r - n,
                  height: s - o,
                });
              }
            ),
          I.none()
        ))(
        Y(e, (e) => {
          return (n = t) >= (o = e).top && n <= o.bottom;
          var n, o;
        })
      ).fold(
        () => [[], e],
        (t) => {
          const { pass: n, fail: o } = K(e, (e) =>
            ((e, t) => {
              const n =
                ((e, t) =>
                  Math.max(
                    0,
                    Math.min(e.bottom, t.bottom) - Math.max(e.top, t.top)
                  ))(e, t) / Math.min(e.height, t.height);
              return (
                ((e, t) => e.top < t.bottom && e.bottom > t.top)(e, t) &&
                n > 0.5
              );
            })(e, t)
          );
          return [n, o];
        }
      ),
    FA = (e, t, n) =>
      t > e.left && t < e.right
        ? 0
        : Math.min(Math.abs(e.left - t), Math.abs(e.right - t)),
    UA = (e, t, n, o) => {
      const r = (e) =>
          Bi(e.node)
            ? I.some(e)
            : er(e.node)
            ? UA(ce(e.node.childNodes), t, n, !1)
            : I.none(),
        s = (e, s) => {
          const a = ae(e, (e, o) => s(e, t, n) - s(o, t, n));
          return ue(a, r).map((e) =>
            o && !dr(e.node) && a.length > 1
              ? ((e, o, s) =>
                  r(o).filter(
                    (o) => Math.abs(s(e, t, n) - s(o, t, n)) < 2 && dr(o.node)
                  ))(e, a[1], s).getOr(e)
              : e
          );
        },
        [a, i] = IA(VE(e), n),
        { pass: l, fail: d } = K(i, (e) => e.top < n);
      return s(a, FA)
        .orThunk(() => s(d, yi))
        .orThunk(() => s(l, yi));
    },
    zA = (e, t, n) =>
      ((e, t, n) => {
        const o = Cn(e),
          r = Rn(o),
          s = wn(r, t, n)
            .filter((e) => Sn(o, e))
            .getOr(o);
        return ((e, t, n, o) => {
          const r = (t, s) => {
            const a = Y(
              t.dom.childNodes,
              O((e) => er(e) && e.classList.contains("mce-drag-container"))
            );
            return s
              .fold(
                () => UA(a, n, o, !0),
                (e) => {
                  const t = Y(a, (t) => t !== e.dom);
                  return UA(t, n, o, !0);
                }
              )
              .orThunk(() =>
                (_n(t, e) ? I.none() : On(t)).bind((e) => r(e, I.some(t)))
              );
          };
          return r(t, I.none());
        })(o, s, t, n);
      })(e, t, n)
        .filter((e) => Kc(e.node))
        .map((e) =>
          ((e, t) => ({
            node: e.node,
            position: LA(e, t) < MA(e, t) ? DA.Before : DA.After,
          }))(e, t)
        ),
    jA = (e) => {
      var t, n;
      const o = e.getBoundingClientRect(),
        r = e.ownerDocument,
        s = r.documentElement,
        a = r.defaultView;
      return {
        top:
          o.top +
          (null !== (t = null == a ? void 0 : a.scrollY) && void 0 !== t
            ? t
            : 0) -
          s.clientTop,
        left:
          o.left +
          (null !== (n = null == a ? void 0 : a.scrollX) && void 0 !== n
            ? n
            : 0) -
          s.clientLeft,
      };
    },
    HA = (e) => ({ target: e, srcElement: e }),
    $A = (e, t, n, o) => {
      const r = ((e, t) => {
        const n = ((e) => {
          const t = HR(),
            n = ((e) => {
              const t = e;
              return I.from(t[OR]);
            })(e);
          return (
            LR(e),
            NR(t),
            (t.dropEffect = e.dropEffect),
            (t.effectAllowed = e.effectAllowed),
            ((e) => {
              const t = e;
              return I.from(t[kR]);
            })(e).each((e) => t.setDragImage(e.image, e.x, e.y)),
            q(e.types, (n) => {
              "Files" !== n && t.setData(n, e.getData(n));
            }),
            q(e.files, (e) => t.items.add(e)),
            ((e) => {
              const t = e;
              return I.from(t[_R]);
            })(e).each((e) => {
              ((e, t) => {
                SR(t)(e);
              })(t, e);
            }),
            n.each((n) => {
              PR(e, n), PR(t, n);
            }),
            t
          );
        })(e);
        return (
          "dragstart" === t
            ? (NR(n), DR(n))
            : "drop" === t
            ? (RR(n), LR(n))
            : (AR(n), MR(n)),
          n
        );
      })(n, e);
      return v(o)
        ? ((e, t, n) => {
            const o = B("Function not supported on simulated event.");
            return {
              bubbles: !0,
              cancelBubble: !1,
              cancelable: !0,
              composed: !1,
              currentTarget: null,
              defaultPrevented: !1,
              eventPhase: 0,
              isTrusted: !0,
              returnValue: !1,
              timeStamp: 0,
              type: e,
              composedPath: o,
              initEvent: o,
              preventDefault: k,
              stopImmediatePropagation: k,
              stopPropagation: k,
              AT_TARGET: window.Event.AT_TARGET,
              BUBBLING_PHASE: window.Event.BUBBLING_PHASE,
              CAPTURING_PHASE: window.Event.CAPTURING_PHASE,
              NONE: window.Event.NONE,
              altKey: !1,
              button: 0,
              buttons: 0,
              clientX: 0,
              clientY: 0,
              ctrlKey: !1,
              metaKey: !1,
              movementX: 0,
              movementY: 0,
              offsetX: 0,
              offsetY: 0,
              pageX: 0,
              pageY: 0,
              relatedTarget: null,
              screenX: 0,
              screenY: 0,
              shiftKey: !1,
              x: 0,
              y: 0,
              detail: 0,
              view: null,
              which: 0,
              initUIEvent: o,
              initMouseEvent: o,
              getModifierState: o,
              dataTransfer: n,
              ...HA(t),
            };
          })(e, t, r)
        : ((e, t, n, o) => ({ ...t, dataTransfer: o, type: e, ...HA(n) }))(
            e,
            o,
            t,
            r
          );
    },
    VA = vr,
    qA = (
      (...e) =>
      (t) => {
        for (let n = 0; n < e.length; n++) if (e[n](t)) return !0;
        return !1;
      }
    )(VA, br),
    WA = (e, t, n, o) => {
      const r = e.dom,
        s = t.cloneNode(!0);
      r.setStyles(s, { width: n, height: o }),
        r.setAttrib(s, "data-mce-selected", null);
      const a = r.create("div", {
        class: "mce-drag-container",
        "data-mce-bogus": "all",
        unselectable: "on",
        contenteditable: "false",
      });
      return (
        r.setStyles(a, {
          position: "absolute",
          opacity: 0.5,
          overflow: "hidden",
          border: 0,
          padding: 0,
          margin: 0,
          width: n,
          height: o,
        }),
        r.setStyles(s, { margin: 0, boxSizing: "border-box" }),
        a.appendChild(s),
        a
      );
    },
    KA = (e, t) => (n) => () => {
      const o = "left" === e ? n.scrollX : n.scrollY;
      n.scroll({ [e]: o + t, behavior: "smooth" });
    },
    YA = KA("left", -32),
    GA = KA("left", 32),
    XA = KA("top", -32),
    ZA = KA("top", 32),
    QA = (e) => {
      e && e.parentNode && e.parentNode.removeChild(e);
    },
    JA = (e, t, n, o, r) => {
      "dragstart" === t && $R(o, e.dom.getOuterHTML(n));
      const s = $A(t, n, o, r);
      return e.dispatch(t, s);
    },
    eT = (e, t) => {
      const n = Ca(
        (e, n) =>
          ((e, t, n) => {
            e._selectionOverrides.hideFakeCaret(),
              zA(e.getBody(), t, n).fold(
                () => e.selection.placeCaretAt(t, n),
                (o) => {
                  const r = e._selectionOverrides.showCaret(
                    1,
                    o.node,
                    o.position === DA.Before,
                    !1
                  );
                  r ? e.selection.setRng(r) : e.selection.placeCaretAt(t, n);
                }
              );
          })(t, e, n),
        0
      );
      t.on("remove", n.cancel);
      const o = e;
      return (r) =>
        e.on((e) => {
          const s = Math.max(
            Math.abs(r.screenX - e.screenX),
            Math.abs(r.screenY - e.screenY)
          );
          if (!e.dragging && s > 10) {
            const n = JA(t, "dragstart", e.element, e.dataTransfer, r);
            if (
              (C(n.dataTransfer) && (e.dataTransfer = n.dataTransfer),
              n.isDefaultPrevented())
            )
              return;
            (e.dragging = !0), t.focus();
          }
          if (e.dragging) {
            const s = r.currentTarget === t.getDoc().documentElement,
              l = ((e, t) => ({ pageX: t.pageX - e.relX, pageY: t.pageY + 5 }))(
                e,
                ((e, t) => {
                  return (
                    (n = ((e) =>
                      e.inline ? jA(e.getBody()) : { left: 0, top: 0 })(e)),
                    (o = ((e) => {
                      const t = e.getBody();
                      return e.inline
                        ? { left: t.scrollLeft, top: t.scrollTop }
                        : { left: 0, top: 0 };
                    })(e)),
                    (r = ((e, t) => {
                      if (t.target.ownerDocument !== e.getDoc()) {
                        const n = jA(e.getContentAreaContainer()),
                          o = ((e) => {
                            const t = e.getBody(),
                              n = e.getDoc().documentElement,
                              o = { left: t.scrollLeft, top: t.scrollTop },
                              r = {
                                left: t.scrollLeft || n.scrollLeft,
                                top: t.scrollTop || n.scrollTop,
                              };
                            return e.inline ? o : r;
                          })(e);
                        return {
                          left: t.pageX - n.left + o.left,
                          top: t.pageY - n.top + o.top,
                        };
                      }
                      return { left: t.pageX, top: t.pageY };
                    })(e, t)),
                    {
                      pageX: r.left - n.left + o.left,
                      pageY: r.top - n.top + o.top,
                    }
                  );
                  var n, o, r;
                })(t, r)
              );
            (a = e.ghost),
              (i = t.getBody()),
              a.parentNode !== i && i.appendChild(a),
              ((e, t, n, o, r, s, a, i, l, d, c, u) => {
                let m = 0,
                  f = 0;
                (e.style.left = t.pageX + "px"),
                  (e.style.top = t.pageY + "px"),
                  t.pageX + n > r && (m = t.pageX + n - r),
                  t.pageY + o > s && (f = t.pageY + o - s),
                  (e.style.width = n - m + "px"),
                  (e.style.height = o - f + "px");
                const g = l.clientHeight,
                  p = l.clientWidth,
                  h = a + l.getBoundingClientRect().top,
                  b = i + l.getBoundingClientRect().left;
                c.on((e) => {
                  e.intervalId.clear(),
                    e.dragging &&
                      u &&
                      (a + 8 >= g
                        ? e.intervalId.set(ZA(d))
                        : a - 8 <= 0
                        ? e.intervalId.set(XA(d))
                        : i + 8 >= p
                        ? e.intervalId.set(GA(d))
                        : i - 8 <= 0
                        ? e.intervalId.set(YA(d))
                        : h + 16 >= window.innerHeight
                        ? e.intervalId.set(ZA(window))
                        : h - 16 <= 0
                        ? e.intervalId.set(XA(window))
                        : b + 16 >= window.innerWidth
                        ? e.intervalId.set(GA(window))
                        : b - 16 <= 0 && e.intervalId.set(YA(window)));
                });
              })(
                e.ghost,
                l,
                e.width,
                e.height,
                e.maxX,
                e.maxY,
                r.clientY,
                r.clientX,
                t.getContentAreaContainer(),
                t.getWin(),
                o,
                s
              ),
              n.throttle(r.clientX, r.clientY);
          }
          var a, i;
        });
    },
    tT = (e, t, n) => {
      e.on((e) => {
        e.intervalId.clear(),
          e.dragging &&
            n.fold(
              () => JA(t, "dragend", e.element, e.dataTransfer),
              (n) => JA(t, "dragend", e.element, e.dataTransfer, n)
            );
      }),
        nT(e);
    },
    nT = (e) => {
      e.on((e) => {
        e.intervalId.clear(), QA(e.ghost);
      }),
        e.clear();
    },
    oT = (e) => {
      const t = ya(),
        n = da.DOM,
        o = document,
        r = ((e, t) => (n) => {
          if (((e) => 0 === e.button)(n)) {
            const o = Q(t.dom.getParents(n.target), qA).getOr(null);
            if (
              C(o) &&
              ((e, t, n) => VA(n) && n !== t && e.isEditable(n.parentElement))(
                t.dom,
                t.getBody(),
                o
              )
            ) {
              const r = t.dom.getPos(o),
                s = t.getBody(),
                a = t.getDoc().documentElement;
              e.set({
                element: o,
                dataTransfer: HR(),
                dragging: !1,
                screenX: n.screenX,
                screenY: n.screenY,
                maxX: (t.inline ? s.scrollWidth : a.offsetWidth) - 2,
                maxY: (t.inline ? s.scrollHeight : a.offsetHeight) - 2,
                relX: n.pageX - r.x,
                relY: n.pageY - r.y,
                width: o.offsetWidth,
                height: o.offsetHeight,
                ghost: WA(t, o, o.offsetWidth, o.offsetHeight),
                intervalId: va(100),
              });
            }
          }
        })(t, e),
        s = eT(t, e),
        a = ((e, t) => (n) => {
          e.on((e) => {
            var o;
            if ((e.intervalId.clear(), e.dragging)) {
              if (
                ((e, t, n) =>
                  !y(t) &&
                  t !== n &&
                  !e.dom.isChildOf(t, n) &&
                  e.dom.isEditable(t))(
                  t,
                  ((e) => {
                    const t = e.getSel();
                    if (C(t)) {
                      const e = t.getRangeAt(0).startContainer;
                      return dr(e) ? e.parentNode : e;
                    }
                    return null;
                  })(t.selection),
                  e.element
                )
              ) {
                const r =
                  null !==
                    (o = t.getDoc().elementFromPoint(n.clientX, n.clientY)) &&
                  void 0 !== o
                    ? o
                    : t.getBody();
                JA(t, "drop", r, e.dataTransfer, n).isDefaultPrevented() ||
                  t.undoManager.transact(() => {
                    ((e, t) => {
                      const n = e.getParent(t.parentNode, e.isBlock);
                      QA(t),
                        n && n !== e.getRoot() && e.isEmpty(n) && Za(Cn(n));
                    })(t.dom, e.element),
                      ((e) => {
                        const t = e.getData("text/html");
                        return "" === t ? I.none() : I.some(t);
                      })(e.dataTransfer).each((e) => t.insertContent(e)),
                      t._selectionOverrides.hideFakeCaret();
                  });
              }
              JA(t, "dragend", t.getBody(), e.dataTransfer, n);
            }
          }),
            nT(e);
        })(t, e),
        i = (
          (e, t) => (n) =>
            tT(e, t, I.some(n))
        )(t, e);
      e.on("mousedown", r),
        e.on("mousemove", s),
        e.on("mouseup", a),
        n.bind(o, "mousemove", s),
        n.bind(o, "mouseup", i),
        e.on("remove", () => {
          n.unbind(o, "mousemove", s), n.unbind(o, "mouseup", i);
        }),
        e.on("keydown", (n) => {
          n.keyCode === yf.ESC && tT(t, e, I.none());
        });
    },
    rT = vr,
    sT = (e, t) => fb(e.getBody(), t),
    aT = (e) => {
      const t = e.selection,
        n = e.dom,
        o = e.getBody(),
        r = Vc(e, o, n.isBlock, () => zg(e)),
        s = "sel-" + n.uniqueId(),
        a = "data-mce-selected";
      let i;
      const l = (e) =>
          e !== o &&
          (rT(e) || wr(e)) &&
          n.isChildOf(e, o) &&
          n.isEditable(e.parentNode),
        d = (n, o, s, a = !0) =>
          e
            .dispatch("ShowCaret", { target: o, direction: n, before: s })
            .isDefaultPrevented()
            ? null
            : (a && t.scrollIntoView(o, -1 === n), r.show(s, o)),
        c = (e) => si(e) || di(e) || ci(e),
        u = (e) => c(e.startContainer) || c(e.endContainer),
        m = (t) => {
          const o = e.schema.getVoidElements(),
            r = n.createRng(),
            s = t.startContainer,
            a = t.startOffset,
            i = t.endContainer,
            l = t.endOffset;
          return (
            ke(o, s.nodeName.toLowerCase())
              ? 0 === a
                ? r.setStartBefore(s)
                : r.setStartAfter(s)
              : r.setStart(s, a),
            ke(o, i.nodeName.toLowerCase())
              ? 0 === l
                ? r.setEndBefore(i)
                : r.setEndAfter(i)
              : r.setEnd(i, l),
            r
          );
        },
        f = (r, c) => {
          if (!r) return null;
          if (r.collapsed) {
            if (!u(r)) {
              const e = c ? 1 : -1,
                t = bu(e, o, r),
                s = t.getNode(!c);
              if (C(s)) {
                if (Kc(s)) return d(e, s, !!c && !t.isAtEnd(), !1);
                if (ri(s) && vr(s.nextSibling)) {
                  const e = n.createRng();
                  return e.setStart(s, 0), e.setEnd(s, 0), e;
                }
              }
              const a = t.getNode(c);
              if (C(a)) {
                if (Kc(a)) return d(e, a, !c && !t.isAtEnd(), !1);
                if (ri(a) && vr(a.previousSibling)) {
                  const e = n.createRng();
                  return e.setStart(a, 1), e.setEnd(a, 1), e;
                }
              }
            }
            return null;
          }
          let m = r.startContainer,
            f = r.startOffset;
          const g = r.endOffset;
          if (
            (dr(m) &&
              0 === f &&
              rT(m.parentNode) &&
              ((m = m.parentNode), (f = n.nodeIndex(m)), (m = m.parentNode)),
            !er(m))
          )
            return null;
          if (g === f + 1 && m === r.endContainer) {
            const o = m.childNodes[f];
            if (l(o))
              return ((o) => {
                const r = o.cloneNode(!0),
                  l = e.dispatch("ObjectSelected", {
                    target: o,
                    targetClone: r,
                  });
                if (l.isDefaultPrevented()) return null;
                const d = ((o, r) => {
                    const a = Cn(e.getBody()),
                      i = e.getDoc(),
                      l = no(a, "#" + s).getOrThunk(() => {
                        const e = bn(
                          '<div data-mce-bogus="all" class="mce-offscreen-selection"></div>',
                          i
                        );
                        return Jt(e, "id", s), yo(a, e), e;
                      }),
                      d = n.createRng();
                    xo(l),
                      wo(l, [yn(Wo, i), Cn(r), yn(Wo, i)]),
                      d.setStart(l.dom.firstChild, 1),
                      d.setEnd(l.dom.lastChild, 0),
                      co(l, { top: n.getPos(o, e.getBody()).y + "px" }),
                      vg(l);
                    const c = t.getSel();
                    return c && (c.removeAllRanges(), c.addRange(d)), d;
                  })(o, l.targetClone),
                  c = Cn(o);
                return (
                  q(zo(Cn(e.getBody()), `*[${a}]`), (e) => {
                    _n(c, e) || rn(e, a);
                  }),
                  n.getAttrib(o, a) || o.setAttribute(a, "1"),
                  (i = o),
                  p(),
                  d
                );
              })(o);
          }
          return null;
        },
        g = () => {
          i && i.removeAttribute(a),
            no(Cn(e.getBody()), "#" + s).each(Eo),
            (i = null);
        },
        p = () => {
          r.hide();
        };
      return (
        ow(e) ||
          (e.on("click", (t) => {
            n.isEditable(t.target) || (t.preventDefault(), e.focus());
          }),
          e.on("blur NewBlock", g),
          e.on("ResizeWindow FullscreenStateChanged", r.reposition),
          e.on(
            "tap",
            (t) => {
              const n = t.target,
                o = sT(e, n);
              rT(o)
                ? (t.preventDefault(), Px(e, o).each(f))
                : l(n) && Px(e, n).each(f);
            },
            !0
          ),
          e.on("mousedown", (r) => {
            const s = r.target;
            if (s !== o && "HTML" !== s.nodeName && !n.isChildOf(s, o)) return;
            if (
              !((e, t, n) => {
                const o = Cn(e.getBody()),
                  r = e.inline ? o : Cn(Rn(o).dom.documentElement),
                  s = ((e, t, n, o) => {
                    const r = ((e) => e.dom.getBoundingClientRect())(t);
                    return {
                      x: n - (e ? r.left + t.dom.clientLeft + Mw(t) : 0),
                      y: o - (e ? r.top + t.dom.clientTop + Lw(t) : 0),
                    };
                  })(e.inline, r, t, n);
                return ((e, t, n) => {
                  const o = Pw(e),
                    r = Dw(e);
                  return t >= 0 && n >= 0 && t <= o && n <= r;
                })(r, s.x, s.y);
              })(e, r.clientX, r.clientY)
            )
              return;
            g(), p();
            const a = sT(e, s);
            rT(a)
              ? (r.preventDefault(), Px(e, a).each(f))
              : zA(o, r.clientX, r.clientY).each((n) => {
                  var o;
                  r.preventDefault(),
                    (o = d(1, n.node, n.position === DA.Before, !1)) &&
                      t.setRng(o),
                    tr(a) ? a.focus() : e.getBody().focus();
                });
          }),
          e.on("keypress", (e) => {
            yf.modifierPressed(e) || (rT(t.getNode()) && e.preventDefault());
          }),
          e.on("GetSelectionRange", (e) => {
            let t = e.range;
            if (i) {
              if (!i.parentNode) return void (i = null);
              (t = t.cloneRange()), t.selectNode(i), (e.range = t);
            }
          }),
          e.on("SetSelectionRange", (e) => {
            e.range = m(e.range);
            const t = f(e.range, e.forward);
            t && (e.range = t);
          }),
          e.on("AfterSetSelectionRange", (e) => {
            const t = e.range,
              o = t.startContainer.parentElement;
            var r;
            u(t) || (er((r = o)) && "mcepastebin" === r.id) || p(),
              ((e) => C(e) && n.hasClass(e, "mce-offscreen-selection"))(o) ||
                g();
          }),
          ((e) => {
            oT(e),
              qd(e) &&
                ((e) => {
                  const t = (t) => {
                      if (!t.isDefaultPrevented()) {
                        const n = t.dataTransfer;
                        n &&
                          (H(n.types, "Files") || n.files.length > 0) &&
                          (t.preventDefault(),
                          "drop" === t.type &&
                            Hw(e, "Dropped file type is not supported"));
                      }
                    },
                    n = (n) => {
                      Dg(e, n.target) && t(n);
                    },
                    o = () => {
                      const o = da.DOM,
                        r = e.dom,
                        s = document,
                        a = e.inline ? e.getBody() : e.getDoc(),
                        i = ["drop", "dragover"];
                      q(i, (e) => {
                        o.bind(s, e, n), r.bind(a, e, t);
                      }),
                        e.on("remove", () => {
                          q(i, (e) => {
                            o.unbind(s, e, n), r.unbind(a, e, t);
                          });
                        });
                    };
                  e.on("init", () => {
                    Tg.setEditorTimeout(e, o, 0);
                  });
                })(e);
          })(e),
          ((e) => {
            const t = Ca(() => {
              if (!e.removed && e.getBody().contains(document.activeElement)) {
                const t = e.selection.getRng();
                if (t.collapsed) {
                  const n = Dx(e, t, !1);
                  e.selection.setRng(n);
                }
              }
            }, 0);
            e.on("focus", () => {
              t.throttle();
            }),
              e.on("blur", () => {
                t.cancel();
              });
          })(e),
          ((e) => {
            e.on("init", () => {
              e.on("focusin", (t) => {
                const n = t.target;
                if (wr(n)) {
                  const t = fb(e.getBody(), n),
                    o = vr(t) ? t : n;
                  e.selection.getNode() !== o &&
                    Px(e, o).each((t) => e.selection.setRng(t));
                }
              });
            });
          })(e)),
        {
          showCaret: d,
          showBlockCaretContainer: (e) => {
            e.hasAttribute("data-mce-caret") && (ui(e), t.scrollIntoView(e));
          },
          hideFakeCaret: p,
          destroy: () => {
            r.destroy(), (i = null);
          },
        }
      );
    },
    iT = (e, t) => {
      let n = t;
      for (let t = e.previousSibling; dr(t); t = t.previousSibling)
        n += t.data.length;
      return n;
    },
    lT = (e, t, n, o, r) => {
      if (dr(n) && (o < 0 || o > n.data.length)) return [];
      const s = r && dr(n) ? [iT(n, o)] : [o];
      let a = n;
      for (; a !== t && a.parentNode; )
        s.push(e.nodeIndex(a, r)), (a = a.parentNode);
      return a === t ? s.reverse() : [];
    },
    dT = (e, t, n, o, r, s, a = !1) => ({
      start: lT(e, t, n, o, a),
      end: lT(e, t, r, s, a),
    }),
    cT = (e, t) => {
      const n = t.slice(),
        o = n.pop();
      return x(o)
        ? X(
            n,
            (e, t) => e.bind((e) => I.from(e.childNodes[t])),
            I.some(e)
          ).bind((e) =>
            dr(e) && (o < 0 || o > e.data.length)
              ? I.none()
              : I.some({ node: e, offset: o })
          )
        : I.none();
    },
    uT = (e, t) =>
      cT(e, t.start).bind(({ node: n, offset: o }) =>
        cT(e, t.end).map(({ node: e, offset: t }) => {
          const r = document.createRange();
          return r.setStart(n, o), r.setEnd(e, t), r;
        })
      ),
    mT = (e, t, n) => {
      if (t && e.isEmpty(t) && !n(t)) {
        const o = t.parentNode;
        e.remove(t, dr(t.firstChild) && Go(t.firstChild.data)), mT(e, o, n);
      }
    },
    fT = (e, t, n, o = !0) => {
      const r = t.startContainer.parentNode,
        s = t.endContainer.parentNode;
      t.deleteContents(),
        o &&
          !n(t.startContainer) &&
          (dr(t.startContainer) &&
            0 === t.startContainer.data.length &&
            e.remove(t.startContainer),
          dr(t.endContainer) &&
            0 === t.endContainer.data.length &&
            e.remove(t.endContainer),
          mT(e, r, n),
          r !== s && mT(e, s, n));
    },
    gT = (e, t) => I.from(e.dom.getParent(t.startContainer, e.dom.isBlock)),
    pT = (e, t, n) => {
      const o = e.dynamicPatternsLookup({ text: n, block: t });
      return {
        ...e,
        blockPatterns: Nl(o).concat(e.blockPatterns),
        inlinePatterns: Rl(o).concat(e.inlinePatterns),
      };
    },
    hT = (e, t, n, o) => {
      const r = e.createRng();
      return r.setStart(t, 0), r.setEnd(n, o), r.toString();
    },
    bT = (e, t) => e.create("span", { "data-mce-type": "bookmark", id: t }),
    vT = (e, t) => {
      const n = e.createRng();
      return n.setStartAfter(t.start), n.setEndBefore(t.end), n;
    },
    yT = (e, t, n) => {
      const o = uT(e.getRoot(), n).getOrDie("Unable to resolve path range"),
        r = o.startContainer,
        s = o.endContainer,
        a = 0 === o.endOffset ? s : s.splitText(o.endOffset),
        i = 0 === o.startOffset ? r : r.splitText(o.startOffset),
        l = i.parentNode;
      return {
        prefix: t,
        end: a.parentNode.insertBefore(bT(e, t + "-end"), a),
        start: l.insertBefore(bT(e, t + "-start"), i),
      };
    },
    CT = (e, t, n) => {
      mT(e, e.get(t.prefix + "-end"), n), mT(e, e.get(t.prefix + "-start"), n);
    },
    wT = (e) => 0 === e.start.length,
    xT = (e, t, n, o) => {
      const r = t.start;
      var s;
      return $_(
        e,
        o.container,
        o.offset,
        ((s = r),
        (e, t) => {
          const n = e.data.substring(0, t),
            o = n.lastIndexOf(s.charAt(s.length - 1)),
            r = n.lastIndexOf(s);
          return -1 !== r ? r + s.length : -1 !== o ? o + 1 : -1;
        }),
        n
      ).bind((o) => {
        var s, a;
        const i =
          null !==
            (a =
              null === (s = n.textContent) || void 0 === s
                ? void 0
                : s.indexOf(r)) && void 0 !== a
            ? a
            : -1;
        if (-1 !== i && o.offset >= i + r.length) {
          const t = e.createRng();
          return (
            t.setStart(o.container, o.offset - r.length),
            t.setEnd(o.container, o.offset),
            I.some(t)
          );
        }
        {
          const s = o.offset - r.length;
          return j_(o.container, s, n)
            .map((t) => {
              const n = e.createRng();
              return (
                n.setStart(t.container, t.offset),
                n.setEnd(o.container, o.offset),
                n
              );
            })
            .filter((e) => e.toString() === r)
            .orThunk(() => xT(e, t, n, I_(o.container, 0)));
        }
      });
    },
    ET = (e, t, n, o) => {
      const r = e.dom,
        s = r.getRoot(),
        a = n.pattern,
        i = n.position.container,
        l = n.position.offset;
      return j_(i, l - n.pattern.end.length, t).bind((d) => {
        const c = dT(r, s, d.container, d.offset, i, l, o);
        if (wT(a))
          return I.some({
            matches: [{ pattern: a, startRng: c, endRng: c }],
            position: d,
          });
        {
          const i = kT(e, n.remainingPatterns, d.container, d.offset, t, o),
            l = i.getOr({ matches: [], position: d }),
            u = l.position,
            m = ((e, t, n, o, r, s = !1) => {
              if (0 === t.start.length && !s) {
                const t = e.createRng();
                return t.setStart(n, o), t.setEnd(n, o), I.some(t);
              }
              return z_(n, o, r).bind((n) =>
                xT(e, t, r, n).bind((e) => {
                  var t;
                  if (s) {
                    if (
                      e.endContainer === n.container &&
                      e.endOffset === n.offset
                    )
                      return I.none();
                    if (
                      0 === n.offset &&
                      (null === (t = e.endContainer.textContent) || void 0 === t
                        ? void 0
                        : t.length) === e.endOffset
                    )
                      return I.none();
                  }
                  return I.some(e);
                })
              );
            })(r, a, u.container, u.offset, t, i.isNone());
          return m.map((e) => {
            const t = ((e, t, n, o = !1) =>
              dT(
                e,
                t,
                n.startContainer,
                n.startOffset,
                n.endContainer,
                n.endOffset,
                o
              ))(r, s, e, o);
            return {
              matches: l.matches.concat([
                { pattern: a, startRng: t, endRng: c },
              ]),
              position: I_(e.startContainer, e.startOffset),
            };
          });
        }
      });
    },
    kT = (e, t, n, o, r, s) => {
      const a = e.dom;
      return z_(n, o, a.getRoot()).bind((i) => {
        const l = hT(a, r, n, o);
        for (let a = 0; a < t.length; a++) {
          const d = t[a];
          if (!Ve(l, d.end)) continue;
          const c = t.slice();
          c.splice(a, 1);
          const u = ET(
            e,
            r,
            { pattern: d, remainingPatterns: c, position: i },
            s
          );
          if (u.isNone() && o > 0) return kT(e, t, n, o - 1, r, s);
          if (u.isSome()) return u;
        }
        return I.none();
      });
    },
    _T = (e, t, n) => {
      e.selection.setRng(n),
        "inline-format" === t.type
          ? q(t.format, (t) => {
              e.formatter.apply(t);
            })
          : e.execCommand(t.cmd, !1, t.value);
    },
    ST = (e, t, n, o, r, s) => {
      var a;
      return ((e, t) => {
        const n = ne(e, (e) =>
          $(
            t,
            (t) =>
              e.pattern.start === t.pattern.start &&
              e.pattern.end === t.pattern.end
          )
        );
        return e.length === t.length
          ? n
            ? e
            : t
          : e.length > t.length
          ? e
          : t;
      })(
        kT(e, r.inlinePatterns, n, o, t, s).fold(
          () => [],
          (e) => e.matches
        ),
        kT(
          e,
          ((a = r.inlinePatterns),
          ae(a, (e, t) => t.end.length - e.end.length)),
          n,
          o,
          t,
          s
        ).fold(
          () => [],
          (e) => e.matches
        )
      );
    },
    NT = (e, t) => {
      if (0 === t.length) return;
      const n = e.dom,
        o = e.selection.getBookmark(),
        r = ((e, t) => {
          const n = Da("mce_textpattern"),
            o = G(
              t,
              (t, o) => {
                const r = yT(e, n + `_end${t.length}`, o.endRng);
                return t.concat([{ ...o, endMarker: r }]);
              },
              []
            );
          return G(
            o,
            (t, r) => {
              const s = o.length - t.length - 1,
                a = wT(r.pattern)
                  ? r.endMarker
                  : yT(e, n + `_start${s}`, r.startRng);
              return t.concat([{ ...r, startMarker: a }]);
            },
            []
          );
        })(n, t);
      q(r, (t) => {
        const o = n.getParent(t.startMarker.start, n.isBlock),
          r = (e) => e === o;
        wT(t.pattern)
          ? ((e, t, n, o) => {
              const r = vT(e.dom, n);
              fT(e.dom, r, o), _T(e, t, r);
            })(e, t.pattern, t.endMarker, r)
          : ((e, t, n, o, r) => {
              const s = e.dom,
                a = vT(s, o),
                i = vT(s, n);
              fT(s, i, r), fT(s, a, r);
              const l = { prefix: n.prefix, start: n.end, end: o.start },
                d = vT(s, l);
              _T(e, t, d);
            })(e, t.pattern, t.startMarker, t.endMarker, r),
          CT(n, t.endMarker, r),
          CT(n, t.startMarker, r);
      }),
        e.selection.moveToBookmark(o);
    },
    RT = (e, t, n) =>
      ((e, t, n) => {
        if (dr(e) && 0 >= e.length) return I.some(I_(e, 0));
        {
          const t = Ua(F_);
          return I.from(t.forwards(e, 0, U_(e), n)).map((e) =>
            I_(e.container, 0)
          );
        }
      })(t, 0, t).map((o) => {
        const r = o.container;
        return (
          H_(r, n.start.length, t).each((n) => {
            const o = e.createRng();
            o.setStart(r, 0),
              o.setEnd(n.container, n.offset),
              fT(e, o, (e) => e === t);
          }),
          r
        );
      }),
    AT = (e) => (t, n) => {
      const o = t.dom,
        r = n.pattern,
        s = uT(o.getRoot(), n.range).getOrDie("Unable to resolve path range");
      return (
        gT(t, s).each((n) => {
          "block-format" === r.type
            ? ((e, t) => {
                const n = t.get(e);
                return p(n) && le(n).exists((e) => ke(e, "block"));
              })(r.format, t.formatter) &&
              t.undoManager.transact(() => {
                e(t.dom, n, r), t.formatter.apply(r.format);
              })
            : "block-command" === r.type &&
              t.undoManager.transact(() => {
                e(t.dom, n, r), t.execCommand(r.cmd, !1, r.value);
              });
        }),
        !0
      );
    },
    TT = (e) => (t, n) => {
      const o = ((e) => ae(e, (e, t) => t.start.length - e.start.length))(t),
        r = n.replace(Wo, " ");
      return Q(o, (t) => e(t, n, r));
    },
    OT = (e, t) => (n, o, r, s, a) => {
      var i;
      void 0 === a &&
        (a = null !== (i = o.textContent) && void 0 !== i ? i : "");
      const l = n.dom,
        d = ql(n);
      return l.is(o, d)
        ? e(r.blockPatterns, a)
            .map((e) =>
              t && Dt.trim(a).length === e.start.length
                ? []
                : [{ pattern: e, range: dT(l, l.getRoot(), o, 0, o, 0, s) }]
            )
            .getOr([])
        : [];
    },
    BT = AT((e, t, n) => {
      RT(e, t, n).each((e) => {
        const t = Cn(e),
          n = ja(t);
        /^\s[^\s]/.test(n) &&
          ((e, t) => {
            za.set(e, t);
          })(t, n.slice(1));
      });
    }),
    PT = TT((e, t, n) => 0 === t.indexOf(e.start) || 0 === n.indexOf(e.start)),
    DT = OT(PT, !0),
    LT = AT(RT),
    MT = TT((e, t, n) => t === e.start || n === e.start),
    IT = OT(MT, !1),
    FT = (e, t, n) => {
      for (let o = 0; o < e.length; o++) if (n(e[o], t)) return !0;
      return !1;
    },
    UT = (e) => {
      const t = [",", ".", ";", ":", "!", "?"],
        n = [32],
        o = () => {
          return (
            (t = gc(e)),
            (n = pc(e)),
            {
              inlinePatterns: Rl(t),
              blockPatterns: Nl(t),
              dynamicPatternsLookup: n,
            }
          );
          var t, n;
        },
        r = () => ((e) => e.options.isSet("text_patterns_lookup"))(e);
      e.on(
        "keydown",
        (t) => {
          if (
            13 === t.keyCode &&
            !yf.modifierPressed(t) &&
            e.selection.isCollapsed()
          ) {
            const n = Al(o(), "enter");
            (n.inlinePatterns.length > 0 ||
              n.blockPatterns.length > 0 ||
              r()) &&
              ((e, t) =>
                ((e, t) => {
                  const n = e.selection.getRng();
                  return gT(e, n)
                    .map((o) => {
                      var r;
                      const s = Math.max(0, n.startOffset),
                        a = pT(
                          t,
                          o,
                          null !== (r = o.textContent) && void 0 !== r ? r : ""
                        );
                      return {
                        inlineMatches: ST(e, o, n.startContainer, s, a, !0),
                        blockMatches: DT(e, o, a, !0),
                      };
                    })
                    .filter(
                      ({ inlineMatches: e, blockMatches: t }) =>
                        t.length > 0 || e.length > 0
                    );
                })(e, t).fold(
                  L,
                  ({ inlineMatches: t, blockMatches: n }) => (
                    e.undoManager.add(),
                    e.undoManager.extra(
                      () => {
                        e.execCommand("mceInsertNewLine");
                      },
                      () => {
                        ((e) => {
                          e.insertContent(Qa, { preserve_zwsp: !0 });
                        })(e),
                          NT(e, t),
                          ((e, t) => {
                            if (0 === t.length) return;
                            const n = e.selection.getBookmark();
                            q(t, (t) => BT(e, t)),
                              e.selection.moveToBookmark(n);
                          })(e, n);
                        const o = e.selection.getRng(),
                          r = z_(
                            o.startContainer,
                            o.startOffset,
                            e.dom.getRoot()
                          );
                        e.execCommand("mceInsertNewLine"),
                          r.each((t) => {
                            const n = t.container;
                            n.data.charAt(t.offset - 1) === qo &&
                              (n.deleteData(t.offset - 1, 1),
                              mT(
                                e.dom,
                                n.parentNode,
                                (t) => t === e.dom.getRoot()
                              ));
                          });
                      }
                    ),
                    !0
                  )
                ))(e, n) &&
              t.preventDefault();
          }
        },
        !0
      ),
        e.on(
          "keydown",
          (t) => {
            if (32 === t.keyCode && e.selection.isCollapsed()) {
              const n = Al(o(), "space");
              (n.blockPatterns.length > 0 || r()) &&
                ((e, t) =>
                  ((e, t) => {
                    const n = e.selection.getRng();
                    return gT(e, n)
                      .map((o) => {
                        const r = Math.max(0, n.startOffset),
                          s = hT(e.dom, o, n.startContainer, r),
                          a = pT(t, o, s);
                        return IT(e, o, a, !1, s);
                      })
                      .filter((e) => e.length > 0);
                  })(e, t).fold(
                    L,
                    (t) => (
                      e.undoManager.transact(() => {
                        ((e, t) => {
                          q(t, (t) => LT(e, t));
                        })(e, t);
                      }),
                      !0
                    )
                  ))(e, n) &&
                t.preventDefault();
            }
          },
          !0
        );
      const s = () => {
        if (e.selection.isCollapsed()) {
          const t = Al(o(), "space");
          (t.inlinePatterns.length > 0 || r()) &&
            ((e, t) => {
              const n = e.selection.getRng();
              gT(e, n).map((o) => {
                const r = Math.max(0, n.startOffset - 1),
                  s = hT(e.dom, o, n.startContainer, r),
                  a = pT(t, o, s),
                  i = ST(e, o, n.startContainer, r, a, !1);
                i.length > 0 &&
                  e.undoManager.transact(() => {
                    NT(e, i);
                  });
              });
            })(e, t);
        }
      };
      e.on("keyup", (e) => {
        FT(n, e, (e, t) => e === t.keyCode && !yf.modifierPressed(t)) && s();
      }),
        e.on("keypress", (n) => {
          FT(t, n, (e, t) => e.charCodeAt(0) === t.charCode) &&
            Tg.setEditorTimeout(e, s);
        });
    },
    zT = (e) => {
      const t = Dt.each,
        n = yf.BACKSPACE,
        o = yf.DELETE,
        r = e.dom,
        s = e.selection,
        a = e.parser,
        i = Tt.browser,
        l = i.isFirefox(),
        d = i.isChromium() || i.isSafari(),
        c = Tt.deviceType.isiPhone() || Tt.deviceType.isiPad(),
        u = Tt.os.isMacOS() || Tt.os.isiOS(),
        m = (t, n) => {
          try {
            e.getDoc().execCommand(t, !1, String(n));
          } catch (e) {}
        },
        f = (e) => e.isDefaultPrevented(),
        g = () => {
          e.shortcuts.add("meta+a", null, "SelectAll");
        },
        p = () => {
          e.inline ||
            r.bind(e.getDoc(), "mousedown mouseup", (t) => {
              let n;
              if (t.target === e.getDoc().documentElement)
                if (
                  ((n = s.getRng()),
                  e.getBody().focus(),
                  "mousedown" === t.type)
                ) {
                  if (si(n.startContainer)) return;
                  s.placeCaretAt(t.clientX, t.clientY);
                } else s.setRng(n);
            });
        },
        h = () => {
          Range.prototype.getClientRects ||
            e.on("mousedown", (t) => {
              if (!f(t) && "HTML" === t.target.nodeName) {
                const t = e.getBody();
                t.blur(),
                  Tg.setEditorTimeout(e, () => {
                    t.focus();
                  });
              }
            });
        },
        b = () => {
          const t = Yd(e);
          e.on("click", (n) => {
            const o = n.target;
            /^(IMG|HR)$/.test(o.nodeName) &&
              r.isEditable(o) &&
              (n.preventDefault(), e.selection.select(o), e.nodeChanged()),
              "A" === o.nodeName &&
                r.hasClass(o, t) &&
                0 === o.childNodes.length &&
                r.isEditable(o.parentNode) &&
                (n.preventDefault(), s.select(o));
          });
        },
        v = () => {
          e.on("keydown", (e) => {
            if (
              !f(e) &&
              e.keyCode === n &&
              s.isCollapsed() &&
              0 === s.getRng().startOffset
            ) {
              const t = s.getNode().previousSibling;
              if (t && t.nodeName && "table" === t.nodeName.toLowerCase())
                return e.preventDefault(), !1;
            }
            return !0;
          });
        },
        y = () => {
          zd(e) ||
            e.on("BeforeExecCommand mousedown", () => {
              m("StyleWithCSS", !1),
                m("enableInlineTableEditing", !1),
                vd(e) || m("enableObjectResizing", !1);
            });
        },
        C = () => {
          e.contentStyles.push(
            "img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"
          );
        },
        w = () => {
          e.inline ||
            e.on("keydown", () => {
              document.activeElement === document.body && e.getWin().focus();
            });
        },
        x = () => {
          e.inline ||
            (e.contentStyles.push("body {min-height: 150px}"),
            e.on("click", (t) => {
              let n;
              "HTML" === t.target.nodeName &&
                ((n = e.selection.getRng()),
                e.getBody().focus(),
                e.selection.setRng(n),
                e.selection.normalize(),
                e.nodeChanged());
            }));
        },
        E = () => {
          u &&
            e.on("keydown", (t) => {
              !yf.metaKeyPressed(t) ||
                t.shiftKey ||
                (37 !== t.keyCode && 39 !== t.keyCode) ||
                (t.preventDefault(),
                e.selection
                  .getSel()
                  .modify(
                    "move",
                    37 === t.keyCode ? "backward" : "forward",
                    "lineboundary"
                  ));
            });
        },
        _ = () => {
          e.on("click", (e) => {
            let t = e.target;
            do {
              if ("A" === t.tagName) return void e.preventDefault();
            } while ((t = t.parentNode));
          }),
            e.contentStyles.push(
              ".mce-content-body {-webkit-touch-callout: none}"
            );
        },
        S = () => {
          e.on("init", () => {
            e.dom.bind(e.getBody(), "submit", (e) => {
              e.preventDefault();
            });
          });
        },
        N = k;
      return (
        ow(e)
          ? (d && (p(), b(), S(), g(), c && (w(), x(), _())),
            l && (h(), y(), C(), E()))
          : (e.on("keydown", (t) => {
              if (f(t) || t.keyCode !== yf.BACKSPACE) return;
              let n = s.getRng();
              const o = n.startContainer,
                a = n.startOffset,
                i = r.getRoot();
              let l = o;
              if (n.collapsed && 0 === a) {
                for (
                  ;
                  l.parentNode &&
                  l.parentNode.firstChild === l &&
                  l.parentNode !== i;

                )
                  l = l.parentNode;
                "BLOCKQUOTE" === l.nodeName &&
                  (e.formatter.toggle("blockquote", void 0, l),
                  (n = r.createRng()),
                  n.setStart(o, 0),
                  n.setEnd(o, 0),
                  s.setRng(n));
              }
            }),
            (() => {
              const t = (e) => {
                const t = r.create("body"),
                  n = e.cloneContents();
                return (
                  t.appendChild(n),
                  s.serializer.serialize(t, { format: "html" })
                );
              };
              e.on("keydown", (s) => {
                const a = s.keyCode;
                if (!f(s) && (a === o || a === n) && e.selection.isEditable()) {
                  const n = e.selection.isCollapsed(),
                    o = e.getBody();
                  if (n && !Ar(e.schema, o)) return;
                  if (
                    !n &&
                    !((n) => {
                      const o = t(n),
                        s = r.createRng();
                      return s.selectNode(e.getBody()), o === t(s);
                    })(e.selection.getRng())
                  )
                    return;
                  s.preventDefault(),
                    e.setContent(""),
                    o.firstChild && r.isBlock(o.firstChild)
                      ? e.selection.setCursorLocation(o.firstChild, 0)
                      : e.selection.setCursorLocation(o, 0),
                    e.nodeChanged();
                }
              });
            })(),
            Tt.windowsPhone ||
              e.on(
                "keyup focusin mouseup",
                (t) => {
                  yf.modifierPressed(t) ||
                    ((e) => {
                      const t = e.getBody(),
                        n = e.selection.getRng();
                      return (
                        n.startContainer === n.endContainer &&
                        n.startContainer === t &&
                        0 === n.startOffset &&
                        n.endOffset === t.childNodes.length
                      );
                    })(e) ||
                    s.normalize();
                },
                !0
              ),
            d &&
              (p(),
              b(),
              e.on("init", () => {
                m("DefaultParagraphSeparator", ql(e));
              }),
              S(),
              v(),
              a.addNodeFilter("br", (e) => {
                let t = e.length;
                for (; t--; )
                  "Apple-interchange-newline" === e[t].attr("class") &&
                    e[t].remove();
              }),
              c ? (w(), x(), _()) : g()),
            l &&
              (e.on("keydown", (t) => {
                if (!f(t) && t.keyCode === n) {
                  if (!e.getBody().getElementsByTagName("hr").length) return;
                  if (s.isCollapsed() && 0 === s.getRng().startOffset) {
                    const e = s.getNode(),
                      n = e.previousSibling;
                    if ("HR" === e.nodeName)
                      return r.remove(e), void t.preventDefault();
                    n &&
                      n.nodeName &&
                      "hr" === n.nodeName.toLowerCase() &&
                      (r.remove(n), t.preventDefault());
                  }
                }
              }),
              h(),
              (() => {
                const n = () => {
                    const n = r.getAttribs(s.getStart().cloneNode(!1));
                    return () => {
                      const o = s.getStart();
                      o !== e.getBody() &&
                        (r.setAttrib(o, "style", null),
                        t(n, (e) => {
                          o.setAttributeNode(e.cloneNode(!0));
                        }));
                    };
                  },
                  o = () =>
                    !s.isCollapsed() &&
                    r.getParent(s.getStart(), r.isBlock) !==
                      r.getParent(s.getEnd(), r.isBlock);
                e.on("keypress", (t) => {
                  let r;
                  return !(
                    !(f(t) || (8 !== t.keyCode && 46 !== t.keyCode)) &&
                    o() &&
                    ((r = n()),
                    e.getDoc().execCommand("delete", !1),
                    r(),
                    t.preventDefault(),
                    1)
                  );
                }),
                  r.bind(e.getDoc(), "cut", (t) => {
                    if (!f(t) && o()) {
                      const t = n();
                      Tg.setEditorTimeout(e, () => {
                        t();
                      });
                    }
                  });
              })(),
              y(),
              e.on("SetContent ExecCommand", (e) => {
                ("setcontent" !== e.type && "mceInsertLink" !== e.command) ||
                  t(r.select("a:not([data-mce-block])"), (e) => {
                    var t;
                    let n = e.parentNode;
                    const o = r.getRoot();
                    if ((null == n ? void 0 : n.lastChild) === e) {
                      for (; n && !r.isBlock(n); ) {
                        if (
                          (null === (t = n.parentNode) || void 0 === t
                            ? void 0
                            : t.lastChild) !== n ||
                          n === o
                        )
                          return;
                        n = n.parentNode;
                      }
                      r.add(n, "br", { "data-mce-bogus": 1 });
                    }
                  });
              }),
              C(),
              E(),
              v())),
        {
          refreshContentEditable: N,
          isHidden: () => {
            if (!l || e.removed) return !1;
            const t = e.selection.getSel();
            return !t || !t.rangeCount || 0 === t.rangeCount;
          },
        }
      );
    },
    jT = da.DOM,
    HT = (e) => (e.inline ? e.getElement().nodeName.toLowerCase() : void 0),
    $T = (e) => Ce(e, (e) => !1 === v(e)),
    VT = (e) => {
      const t = e.options.get,
        n = e.editorUpload.blobCache;
      return $T({
        allow_conditional_comments: t("allow_conditional_comments"),
        allow_html_data_urls: t("allow_html_data_urls"),
        allow_svg_data_urls: t("allow_svg_data_urls"),
        allow_html_in_named_anchor: t("allow_html_in_named_anchor"),
        allow_script_urls: t("allow_script_urls"),
        allow_unsafe_link_target: t("allow_unsafe_link_target"),
        convert_unsafe_embeds: t("convert_unsafe_embeds"),
        convert_fonts_to_spans: t("convert_fonts_to_spans"),
        fix_list_elements: t("fix_list_elements"),
        font_size_legacy_values: t("font_size_legacy_values"),
        forced_root_block: t("forced_root_block"),
        forced_root_block_attrs: t("forced_root_block_attrs"),
        preserve_cdata: t("preserve_cdata"),
        inline_styles: t("inline_styles"),
        root_name: HT(e),
        sandbox_iframes: t("sandbox_iframes"),
        sandbox_iframes_exclusions: Rc(e),
        sanitize: t("xss_sanitization"),
        validate: !0,
        blob_cache: n,
        document: e.getDoc(),
      });
    },
    qT = (e) => {
      const t = e.options.get;
      return $T({
        custom_elements: t("custom_elements"),
        extended_valid_elements: t("extended_valid_elements"),
        invalid_elements: t("invalid_elements"),
        invalid_styles: t("invalid_styles"),
        schema: t("schema"),
        valid_children: t("valid_children"),
        valid_classes: t("valid_classes"),
        valid_elements: t("valid_elements"),
        valid_styles: t("valid_styles"),
        verify_html: t("verify_html"),
        padd_empty_block_inline_children: t("format_empty_lines"),
      });
    },
    WT = (e) => (e.inline ? e.ui.styleSheetLoader : e.dom.styleSheetLoader),
    KT = (e) => {
      const t = WT(e),
        n = pd(e),
        o = e.contentCSS,
        r = () => {
          t.unloadAll(o), e.inline || e.ui.styleSheetLoader.unloadAll(n);
        },
        s = () => {
          e.removed ? r() : e.on("remove", r);
        };
      if (e.contentStyles.length > 0) {
        let t = "";
        Dt.each(e.contentStyles, (e) => {
          t += e + "\r\n";
        }),
          e.dom.addStyle(t);
      }
      const a = Promise.all(
          ((e, t, n) => {
            const { pass: o, fail: r } = K(t, (e) =>
                tinymce.Resource.has(Ww(e))
              ),
              s = o.map((t) => {
                const n = tinymce.Resource.get(Ww(t));
                return m(n)
                  ? Promise.resolve(WT(e).loadRawCss(t, n))
                  : Promise.resolve();
              }),
              a = [...s, WT(e).loadAll(r)];
            return e.inline ? a : a.concat([e.ui.styleSheetLoader.loadAll(n)]);
          })(e, o, n)
        )
          .then(s)
          .catch(s),
        i = gd(e);
      return (
        i &&
          ((e, t) => {
            const n = Cn(e.getBody()),
              o = Wn(qn(n)),
              r = vn("style");
            Jt(r, "type", "text/css"),
              yo(r, yn(t)),
              yo(o, r),
              e.on("remove", () => {
                Eo(r);
              });
          })(e, i),
        a
      );
    },
    YT = (e) => {
      !0 !== e.removed &&
        (((e) => {
          ow(e) || e.load({ initial: !0, format: "html" }),
            (e.startContent = e.getContent({ format: "raw" }));
        })(e),
        ((e) => {
          e.bindPendingEventDelegates(),
            (e.initialized = !0),
            ((e) => {
              e.dispatch("Init");
            })(e),
            e.focus(!0),
            ((e) => {
              const t = e.dom.getRoot();
              e.inline ||
                (bm(e) && e.selection.getStart(!0) !== t) ||
                Hu(t).each((t) => {
                  const n = t.getNode(),
                    o = ar(n) ? Hu(n).getOr(t) : t;
                  e.selection.setRng(o.toRange());
                });
            })(e),
            e.nodeChanged({ initial: !0 });
          const t = Zd(e);
          w(t) && t.call(e, e),
            ((e) => {
              const t = Jd(e);
              t &&
                Tg.setEditorTimeout(
                  e,
                  () => {
                    let n;
                    (n = !0 === t ? e : e.editorManager.get(t)),
                      n &&
                        !n.destroyed &&
                        (n.focus(), n.selection.scrollIntoView());
                  },
                  100
                );
            })(e);
        })(e));
    },
    GT = (e) => {
      const t = e.getElement();
      let n = e.getDoc();
      e.inline &&
        (jT.addClass(t, "mce-content-body"),
        (e.contentDocument = n = document),
        (e.contentWindow = window),
        (e.bodyElement = t),
        (e.contentAreaContainer = t));
      const o = e.getBody();
      (o.disabled = !0),
        (e.readonly = zd(e)),
        (e._editableRoot = jd(e)),
        !e.readonly &&
          e.hasEditableRoot() &&
          (e.inline &&
            "static" === jT.getStyle(o, "position", !0) &&
            (o.style.position = "relative"),
          (o.contentEditable = "true")),
        (o.disabled = !1),
        (e.editorUpload = ex(e)),
        (e.schema = Ds(qT(e))),
        (e.dom = da(n, {
          keep_values: !0,
          url_converter: e.convertURL,
          url_converter_scope: e,
          update_styles: !0,
          root_element: e.inline ? e.getBody() : null,
          collect: e.inline,
          schema: e.schema,
          contentCssCors: id(e),
          referrerPolicy: ld(e),
          onSetAttrib: (t) => {
            e.dispatch("SetAttrib", t);
          },
        })),
        (e.parser = ((e) => {
          const t = EC(VT(e), e.schema);
          return (
            t.addAttributeFilter("src,href,style,tabindex", (t, n) => {
              const o = e.dom,
                r = "data-mce-" + n;
              let s = t.length;
              for (; s--; ) {
                const a = t[s];
                let i = a.attr(n);
                if (i && !a.attr(r)) {
                  if (0 === i.indexOf("data:") || 0 === i.indexOf("blob:"))
                    continue;
                  "style" === n
                    ? ((i = o.serializeStyle(o.parseStyle(i), a.name)),
                      i.length || (i = null),
                      a.attr(r, i),
                      a.attr(n, i))
                    : "tabindex" === n
                    ? (a.attr(r, i), a.attr(n, null))
                    : a.attr(r, e.convertURL(i, n, a.name));
                }
              }
            }),
            t.addNodeFilter("script", (e) => {
              let t = e.length;
              for (; t--; ) {
                const n = e[t],
                  o = n.attr("type") || "no/type";
                0 !== o.indexOf("mce-") && n.attr("type", "mce-" + o);
              }
            }),
            yc(e) &&
              t.addNodeFilter("#cdata", (t) => {
                var n;
                let o = t.length;
                for (; o--; ) {
                  const r = t[o];
                  (r.type = 8),
                    (r.name = "#comment"),
                    (r.value =
                      "[CDATA[" +
                      e.dom.encode(
                        null !== (n = r.value) && void 0 !== n ? n : ""
                      ) +
                      "]]");
                }
              }),
            t.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div", (t) => {
              let n = t.length;
              const o = e.schema.getNonEmptyElements();
              for (; n--; ) {
                const e = t[n];
                e.isEmpty(o) &&
                  0 === e.getAll("br").length &&
                  e.append(new Jg("br", 1));
              }
            }),
            t
          );
        })(e)),
        (e.serializer = gw(
          ((e) => {
            const t = e.options.get;
            return {
              ...VT(e),
              ...qT(e),
              ...$T({
                remove_trailing_brs: t("remove_trailing_brs"),
                pad_empty_with_br: t("pad_empty_with_br"),
                url_converter: t("url_converter"),
                url_converter_scope: t("url_converter_scope"),
                element_format: t("element_format"),
                entities: t("entities"),
                entity_encoding: t("entity_encoding"),
                indent: t("indent"),
                indent_after: t("indent_after"),
                indent_before: t("indent_before"),
              }),
            };
          })(e),
          e
        )),
        (e.selection = uw(e.dom, e.getWin(), e.serializer, e)),
        (e.annotator = df(e)),
        (e.formatter = ux(e)),
        (e.undoManager = fx(e)),
        (e._nodeChangeDispatcher = new ER(e)),
        (e._selectionOverrides = aT(e)),
        ((e) => {
          const t = ya(),
            n = ma(!1),
            o = wa((t) => {
              e.dispatch("longpress", { ...t, type: "longpress" }), n.set(!0);
            }, 400);
          e.on(
            "touchstart",
            (e) => {
              Uk(e).each((r) => {
                o.cancel();
                const s = { x: r.clientX, y: r.clientY, target: e.target };
                o.throttle(e), n.set(!1), t.set(s);
              });
            },
            !0
          ),
            e.on(
              "touchmove",
              (r) => {
                o.cancel(),
                  Uk(r).each((o) => {
                    t.on((r) => {
                      ((e, t) => {
                        const n = Math.abs(e.clientX - t.x),
                          o = Math.abs(e.clientY - t.y);
                        return n > 5 || o > 5;
                      })(o, r) &&
                        (t.clear(), n.set(!1), e.dispatch("longpresscancel"));
                    });
                  });
              },
              !0
            ),
            e.on(
              "touchend touchcancel",
              (r) => {
                o.cancel(),
                  "touchcancel" !== r.type &&
                    t
                      .get()
                      .filter((e) => e.target.isEqualNode(r.target))
                      .each(() => {
                        n.get()
                          ? r.preventDefault()
                          : e.dispatch("tap", { ...r, type: "tap" });
                      });
              },
              !0
            );
        })(e),
        ((e) => {
          ((e) => {
            e.on("click", (t) => {
              e.dom.getParent(t.target, "details") && t.preventDefault();
            });
          })(e),
            ((e) => {
              e.parser.addNodeFilter("details", (t) => {
                const n = _c(e);
                q(t, (e) => {
                  "expanded" === n
                    ? e.attr("open", "open")
                    : "collapsed" === n && e.attr("open", null);
                });
              }),
                e.serializer.addNodeFilter("details", (t) => {
                  const n = Sc(e);
                  q(t, (e) => {
                    "expanded" === n
                      ? e.attr("open", "open")
                      : "collapsed" === n && e.attr("open", null);
                  });
                });
            })(e);
        })(e),
        ((e) => {
          const t = "contenteditable",
            n = " " + Dt.trim(bc(e)) + " ",
            o = " " + Dt.trim(hc(e)) + " ",
            r = Wk(n),
            s = Wk(o),
            a = vc(e);
          a.length > 0 &&
            e.on("BeforeSetContent", (t) => {
              ((e, t, n) => {
                let o = t.length,
                  r = n.content;
                if ("raw" !== n.format) {
                  for (; o--; ) r = r.replace(t[o], Kk(e, r, hc(e)));
                  n.content = r;
                }
              })(e, a, t);
            }),
            e.parser.addAttributeFilter("class", (e) => {
              let n = e.length;
              for (; n--; ) {
                const o = e[n];
                r(o) ? o.attr(t, "true") : s(o) && o.attr(t, "false");
              }
            }),
            e.serializer.addAttributeFilter(t, (e) => {
              let n = e.length;
              for (; n--; ) {
                const o = e[n];
                (r(o) || s(o)) &&
                  (a.length > 0 && o.attr("data-mce-content")
                    ? ((o.name = "#text"),
                      (o.type = 3),
                      (o.raw = !0),
                      (o.value = o.attr("data-mce-content")))
                    : o.attr(t, null));
              }
            });
        })(e),
        ow(e) ||
          (((e) => {
            e.on("mousedown", (t) => {
              t.detail >= 3 && (t.preventDefault(), PA(e));
            });
          })(e),
          ((e) => {
            UT(e);
          })(e));
      const r = xR(e);
      Fk(e, r),
        ((e) => {
          e.on("NodeChange", T(Vk, e));
        })(e),
        ((e) => {
          var t;
          const n = e.dom,
            o = ql(e),
            r = null !== (t = Cd(e)) && void 0 !== t ? t : "",
            s = (t, a) => {
              if (
                ((e) => {
                  if (hx(e)) {
                    const t = e.keyCode;
                    return (
                      !bx(e) &&
                      (yf.metaKeyPressed(e) ||
                        e.altKey ||
                        (t >= 112 && t <= 123) ||
                        H(gx, t))
                    );
                  }
                  return !1;
                })(t)
              )
                return;
              const i = e.getBody(),
                l =
                  !((e) =>
                    hx(e) &&
                    !(bx(e) || ("keyup" === e.type && 229 === e.keyCode)))(t) &&
                  ((e, t, n) => {
                    if (
                      e.isEmpty(t, void 0, { skipBogus: !1, includeZwsp: !0 })
                    ) {
                      const o = t.firstElementChild;
                      return (
                        !o ||
                        (!e.getStyle(t.firstElementChild, "padding-left") &&
                          !e.getStyle(t.firstElementChild, "padding-right") &&
                          n === o.nodeName.toLowerCase())
                      );
                    }
                    return !1;
                  })(n, i, o);
              (("" !== n.getAttrib(i, px)) !== l || a) &&
                (n.setAttrib(i, px, l ? r : null),
                ((e, t) => {
                  e.dispatch("PlaceholderToggle", { state: t });
                })(e, l),
                e.on(l ? "keydown" : "keyup", s),
                e.off(l ? "keyup" : "keydown", s));
            };
          Ge(r) &&
            e.on("init", (t) => {
              s(t, !0),
                e.on("change SetContent ExecCommand", s),
                e.on("paste", (t) => Tg.setEditorTimeout(e, () => s(t)));
            });
        })(e),
        SA(e);
      const s = ((e) => {
        const t = e;
        return ((e) => Ee(e.plugins, "rtc").bind((e) => I.from(e.setup)))(
          e
        ).fold(
          () => ((t.rtcInstance = nw(e)), I.none()),
          (e) => (
            (t.rtcInstance = (() => {
              const e = N(null),
                t = N("");
              return {
                init: { bindEvents: k },
                undoManager: {
                  beforeChange: k,
                  add: e,
                  undo: e,
                  redo: e,
                  clear: k,
                  reset: k,
                  hasUndo: L,
                  hasRedo: L,
                  transact: e,
                  ignore: k,
                  extra: k,
                },
                formatter: {
                  match: L,
                  matchAll: N([]),
                  matchNode: N(void 0),
                  canApply: L,
                  closest: t,
                  apply: k,
                  remove: k,
                  toggle: k,
                  formatChanged: N({ unbind: k }),
                },
                editor: {
                  getContent: t,
                  setContent: N({ content: "", html: "" }),
                  insertContent: N(""),
                  addVisual: k,
                },
                selection: { getContent: t },
                autocompleter: { addDecoration: k, removeDecoration: k },
                raw: { getModel: N(I.none()) },
              };
            })()),
            I.some(() =>
              e().then(
                (e) => (
                  (t.rtcInstance = ((e) => {
                    const t = (e) => (f(e) ? e : {}),
                      {
                        init: n,
                        undoManager: o,
                        formatter: r,
                        editor: s,
                        selection: a,
                        autocompleter: i,
                        raw: l,
                      } = e;
                    return {
                      init: { bindEvents: n.bindEvents },
                      undoManager: {
                        beforeChange: o.beforeChange,
                        add: o.add,
                        undo: o.undo,
                        redo: o.redo,
                        clear: o.clear,
                        reset: o.reset,
                        hasUndo: o.hasUndo,
                        hasRedo: o.hasRedo,
                        transact: (e, t, n) => o.transact(n),
                        ignore: (e, t) => o.ignore(t),
                        extra: (e, t, n, r) => o.extra(n, r),
                      },
                      formatter: {
                        match: (e, n, o, s) => r.match(e, t(n), s),
                        matchAll: r.matchAll,
                        matchNode: r.matchNode,
                        canApply: (e) => r.canApply(e),
                        closest: (e) => r.closest(e),
                        apply: (e, n, o) => r.apply(e, t(n)),
                        remove: (e, n, o, s) => r.remove(e, t(n)),
                        toggle: (e, n, o) => r.toggle(e, t(n)),
                        formatChanged: (e, t, n, o, s) =>
                          r.formatChanged(t, n, o, s),
                      },
                      editor: {
                        getContent: (e) => s.getContent(e),
                        setContent: (e, t) => ({
                          content: s.setContent(e, t),
                          html: "",
                        }),
                        insertContent: (e, t) => (s.insertContent(e), ""),
                        addVisual: s.addVisual,
                      },
                      selection: { getContent: (e, t) => a.getContent(t) },
                      autocompleter: {
                        addDecoration: i.addDecoration,
                        removeDecoration: i.removeDecoration,
                      },
                      raw: { getModel: () => I.some(l.getRawModel()) },
                    };
                  })(e)),
                  e.rtc.isRemote
                )
              )
            )
          )
        );
      })(e);
      ((e) => {
        const t = e.getDoc(),
          n = e.getBody();
        ((e) => {
          e.dispatch("PreInit");
        })(e),
          ec(e) ||
            ((t.body.spellcheck = !1), jT.setAttrib(n, "spellcheck", "false")),
          (e.quirks = zT(e)),
          ((e) => {
            e.dispatch("PostRender");
          })(e);
        const o = hd(e);
        void 0 !== o && (n.dir = o);
        const r = tc(e);
        r &&
          e.on("BeforeSetContent", (e) => {
            Dt.each(r, (t) => {
              e.content = e.content.replace(
                t,
                (e) => "\x3c!--mce:protected " + escape(e) + "--\x3e"
              );
            });
          }),
          e.on("SetContent", () => {
            e.addVisual(e.getBody());
          }),
          e.on("compositionstart compositionend", (t) => {
            e.composing = "compositionstart" === t.type;
          });
      })(e),
        ((e) => {
          const t = Tc(e);
          m(Oc(e)) ||
            (!v(t) &&
              "INVALID" !==
                ((e) =>
                  ((e) => "gpl" === e.toLowerCase())(e) ||
                  ((e) => e.length >= 64 && e.length <= 255)(e)
                    ? "VALID"
                    : "INVALID")(t)) ||
            console.warn(
              "TinyMCE is running in evaluation mode. Provide a valid license key or add license_key: 'gpl' to the init config to agree to the open source license terms. Read more at https://www.tiny.cloud/license-key/"
            );
        })(e),
        s.fold(
          () => {
            const t = ((e) => {
              let t = !1;
              const n = setTimeout(() => {
                t || e.setProgressState(!0);
              }, 500);
              return () => {
                clearTimeout(n), (t = !0), e.setProgressState(!1);
              };
            })(e);
            KT(e).then(() => {
              YT(e), t();
            });
          },
          (t) => {
            e.setProgressState(!0),
              KT(e).then(() => {
                t().then(
                  (t) => {
                    e.setProgressState(!1), YT(e), aw(e);
                  },
                  (t) => {
                    e.notificationManager.open({
                      type: "error",
                      text: String(t),
                    }),
                      YT(e),
                      aw(e);
                  }
                );
              });
          }
        );
    },
    XT = M,
    ZT = da.DOM,
    QT = da.DOM,
    JT = (e, t) => ({ editorContainer: e, iframeContainer: t, api: {} }),
    eO = (e) => {
      const t = e.getElement();
      return e.inline
        ? JT(null)
        : ((e) => {
            const t = QT.create("div");
            return QT.insertAfter(t, e), JT(t, t);
          })(t);
    },
    tO = async (e) => {
      e.dispatch("ScriptsLoaded"),
        ((e) => {
          const t = Dt.trim(td(e)),
            n = e.ui.registry.getAll().icons,
            o = { ...Aw.get("default").icons, ...Aw.get(t).icons };
          pe(o, (t, o) => {
            ke(n, o) || e.ui.registry.addIcon(o, t);
          });
        })(e),
        ((e) => {
          const t = Ed(e);
          if (m(t)) {
            const n = Uw.get(t);
            (e.theme = n(e, Uw.urls[t]) || {}),
              w(e.theme.init) &&
                e.theme.init(
                  e,
                  Uw.urls[t] || e.documentBaseUrl.replace(/\/$/, "")
                );
          } else e.theme = {};
        })(e),
        ((e) => {
          const t = _d(e),
            n = Tw.get(t);
          e.model = n(e, Tw.urls[t]);
        })(e),
        ((e) => {
          const t = [];
          q($d(e), (n) => {
            ((e, t, n) => {
              const o = Fw.get(n),
                r = Fw.urls[n] || e.documentBaseUrl.replace(/\/$/, "");
              if (((n = Dt.trim(n)), o && -1 === Dt.inArray(t, n))) {
                if (e.plugins[n]) return;
                try {
                  const s = o(e, r) || {};
                  (e.plugins[n] = s), w(s.init) && (s.init(e, r), t.push(n));
                } catch (t) {
                  ((e, t, n) => {
                    const o = ha.translate([
                      "Failed to initialize plugin: {0}",
                      t,
                    ]);
                    mf(e, "PluginLoadError", { message: o }),
                      qw(o, n),
                      Hw(e, o);
                  })(e, n, t);
                }
              }
            })(e, t, ((e) => e.replace(/^\-/, ""))(n));
          });
        })(e);
      const t = await ((e) => {
        const t = e.getElement();
        return (
          (e.orgDisplay = t.style.display),
          m(Ed(e))
            ? ((e) => {
                const t = e.theme.renderUI;
                return t ? t() : eO(e);
              })(e)
            : w(Ed(e))
            ? ((e) => {
                const t = e.getElement(),
                  n = Ed(e)(e, t);
                return (
                  n.editorContainer.nodeType &&
                    (n.editorContainer.id =
                      n.editorContainer.id || e.id + "_parent"),
                  n.iframeContainer &&
                    n.iframeContainer.nodeType &&
                    (n.iframeContainer.id =
                      n.iframeContainer.id || e.id + "_iframecontainer"),
                  (n.height = n.iframeHeight ? n.iframeHeight : t.offsetHeight),
                  n
                );
              })(e)
            : eO(e)
        );
      })(e);
      ((e, t) => {
        const n = {
          show: I.from(t.show).getOr(k),
          hide: I.from(t.hide).getOr(k),
          isEnabled: I.from(t.isEnabled).getOr(M),
          setEnabled: (n) => {
            e.mode.isReadOnly() || I.from(t.setEnabled).each((e) => e(n));
          },
        };
        e.ui = { ...e.ui, ...n };
      })(e, I.from(t.api).getOr({})),
        (e.editorContainer = t.editorContainer),
        ((e) => {
          e.contentCSS = e.contentCSS.concat(
            ((e) => Kw(e, fd(e)))(e),
            ((e) => Kw(e, pd(e)))(e)
          );
        })(e),
        e.inline
          ? GT(e)
          : ((e, t) => {
              ((e, t) => {
                const n = e.translate("Rich Text Area"),
                  o = nn(Cn(e.getElement()), "tabindex").bind(Ze),
                  r = ((e, t, n, o) => {
                    const r = vn("iframe");
                    return (
                      o.each((e) => Jt(r, "tabindex", e)),
                      en(r, n),
                      en(r, {
                        id: e + "_ifr",
                        frameBorder: "0",
                        allowTransparency: "true",
                        title: t,
                      }),
                      mn(r, "tox-edit-area__iframe"),
                      r
                    );
                  })(e.id, n, Fl(e), o).dom;
                (r.onload = () => {
                  (r.onload = null), e.dispatch("load");
                }),
                  (e.contentAreaContainer = t.iframeContainer),
                  (e.iframeElement = r),
                  (e.iframeHTML = ((e) => {
                    let t = Ul(e) + "<html><head>";
                    zl(e) !== e.documentBaseUrl &&
                      (t +=
                        '<base href="' + e.documentBaseURI.getURI() + '" />'),
                      (t +=
                        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />');
                    const n = jl(e),
                      o = Hl(e),
                      r = e.translate(Gd(e));
                    return (
                      $l(e) &&
                        (t +=
                          '<meta http-equiv="Content-Security-Policy" content="' +
                          $l(e) +
                          '" />'),
                      (t += `</head><body id="${n}" class="mce-content-body ${o}" data-id="${e.id}" aria-label="${r}"><br></body></html>`),
                      t
                    );
                  })(e)),
                  ZT.add(t.iframeContainer, r);
              })(e, t),
                t.editorContainer &&
                  ((t.editorContainer.style.display = e.orgDisplay),
                  (e.hidden = ZT.isHidden(t.editorContainer))),
                (e.getElement().style.display = "none"),
                ZT.setAttrib(e.id, "aria-hidden", "true"),
                (e.getElement().style.visibility = e.orgVisibility),
                ((e) => {
                  const t = e.iframeElement,
                    n = () => {
                      (e.contentDocument = t.contentDocument), GT(e);
                    };
                  if (xc(e) || Tt.browser.isFirefox()) {
                    const t = e.getDoc();
                    t.open(), t.write(e.iframeHTML), t.close(), n();
                  } else {
                    const r =
                      ((o = Cn(t)),
                      Ro(o, "load", XT, () => {
                        r.unbind(), n();
                      }));
                    t.srcdoc = e.iframeHTML;
                  }
                  var o;
                })(e);
            })(e, {
              editorContainer: t.editorContainer,
              iframeContainer: t.iframeContainer,
            });
    },
    nO = da.DOM,
    oO = (e) => "-" === e.charAt(0),
    rO = (e, t, n) =>
      I.from(t)
        .filter((e) => Ge(e) && !Aw.has(e))
        .map((t) => ({
          url: `${e.editorManager.baseURL}/icons/${t}/icons${n}.js`,
          name: I.some(t),
        })),
    sO = (e, t) => {
      const n = ua.ScriptLoader,
        o = () => {
          !e.removed &&
            ((e) => {
              const t = Ed(e);
              return !m(t) || C(Uw.get(t));
            })(e) &&
            ((e) => {
              const t = _d(e);
              return C(Tw.get(t));
            })(e) &&
            tO(e);
        };
      ((e, t) => {
        const n = Ed(e);
        if (m(n) && !oO(n) && !ke(Uw.urls, n)) {
          const o = kd(e),
            r = o
              ? e.documentBaseURI.toAbsolute(o)
              : `themes/${n}/theme${t}.js`;
          Uw.load(n, r).catch(() => {
            ((e, t, n) => {
              $w(e, "ThemeLoadError", Vw("theme", t, n));
            })(e, r, n);
          });
        }
      })(e, t),
        ((e, t) => {
          const n = _d(e);
          if ("plugin" !== n && !ke(Tw.urls, n)) {
            const o = Sd(e),
              r = m(o)
                ? e.documentBaseURI.toAbsolute(o)
                : `models/${n}/model${t}.js`;
            Tw.load(n, r).catch(() => {
              ((e, t, n) => {
                $w(e, "ModelLoadError", Vw("model", t, n));
              })(e, r, n);
            });
          }
        })(e, t),
        ((e, t) => {
          const n = dd(t),
            o = cd(t);
          if (!ha.hasCode(n) && "en" !== n) {
            const r = Ge(o) ? o : `${t.editorManager.baseURL}/langs/${n}.js`;
            e.add(r).catch(() => {
              ((e, t, n) => {
                $w(e, "LanguageLoadError", Vw("language", t, n));
              })(t, r, n);
            });
          }
        })(n, e),
        ((e, t, n) => {
          const o = rO(t, "default", n),
            r = ((e) =>
              I.from(nd(e))
                .filter(Ge)
                .map((e) => ({ url: e, name: I.none() })))(t).orThunk(() =>
              rO(t, td(t), "")
            );
          q(
            ((e) => {
              const t = [],
                n = (e) => {
                  t.push(e);
                };
              for (let t = 0; t < e.length; t++) e[t].each(n);
              return t;
            })([o, r]),
            (n) => {
              e.add(n.url).catch(() => {
                ((e, t, n) => {
                  $w(e, "IconsLoadError", Vw("icons", t, n));
                })(t, n.url, n.name.getOrUndefined());
              });
            }
          );
        })(n, e, t),
        ((e, t) => {
          const n = (t, n) => {
            Fw.load(t, n).catch(() => {
              ((e, t, n) => {
                $w(e, "PluginLoadError", Vw("plugin", t, n));
              })(e, n, t);
            });
          };
          pe(Vd(e), (t, o) => {
            n(o, t), e.options.set("plugins", $d(e).concat(o));
          }),
            q($d(e), (e) => {
              !(e = Dt.trim(e)) ||
                Fw.urls[e] ||
                oO(e) ||
                n(e, `plugins/${e}/plugin${t}.js`);
            });
        })(e, t),
        n.loadQueue().then(o, o);
    },
    aO = Et().deviceType,
    iO = aO.isPhone(),
    lO = aO.isTablet(),
    dO = (e) => {
      if (y(e)) return [];
      {
        const t = p(e) ? e : e.split(/[ ,]/),
          n = V(t, We);
        return Y(n, Ge);
      }
    },
    cO = (e, t) => {
      const n = ((t, n) => {
        const o = {},
          r = {};
        return ye(t, (t, n) => H(e, n), ve(o), ve(r)), { t: o, f: r };
      })(t);
      return (o = n.t), (r = n.f), { sections: N(o), options: N(r) };
      var o, r;
    },
    uO = (e, t) => ke(e.sections(), t),
    mO = (e, t) => ({
      table_grid: !1,
      object_resizing: !1,
      resize: !1,
      toolbar_mode: Ee(e, "toolbar_mode").getOr("scrolling"),
      toolbar_sticky: !1,
      ...(t ? { menubar: !1 } : {}),
    }),
    fO = (e, t) => {
      var n;
      const o = null !== (n = t.external_plugins) && void 0 !== n ? n : {};
      return e && e.external_plugins ? Dt.extend({}, e.external_plugins, o) : o;
    },
    gO = (e, t, n, o, r) => {
      var s;
      const a = e
          ? { mobile: mO(null !== (s = r.mobile) && void 0 !== s ? s : {}, t) }
          : {},
        i = cO(["mobile"], sS(a, r)),
        l = Dt.extend(
          n,
          o,
          i.options(),
          ((e, t) => e && uO(t, "mobile"))(e, i)
            ? ((e, t, n = {}) => {
                const o = e.sections(),
                  r = Ee(o, t).getOr({});
                return Dt.extend({}, n, r);
              })(i, "mobile")
            : {},
          { external_plugins: fO(o, i.options()) }
        );
      return ((e, t, n, o) => {
        const r = dO(n.forced_plugins),
          s = dO(o.plugins),
          a = ((e, t) => (uO(e, t) ? e.sections()[t] : {}))(t, "mobile"),
          i = ((e, t, n, o) => (e && uO(t, "mobile") ? o : n))(
            e,
            t,
            s,
            a.plugins ? dO(a.plugins) : s
          ),
          l = ((e, t) => [...dO(e), ...dO(t)])(r, i);
        return Dt.extend(o, { forced_plugins: r, plugins: l });
      })(e, i, o, l);
    },
    pO = (e) => {
      ((e) => {
        const t = (t) => () => {
          q("left,center,right,justify".split(","), (n) => {
            t !== n && e.formatter.remove("align" + n);
          }),
            "none" !== t &&
              ((t, n) => {
                e.formatter.toggle(t, void 0), e.nodeChanged();
              })("align" + t);
        };
        e.editorCommands.addCommands({
          JustifyLeft: t("left"),
          JustifyCenter: t("center"),
          JustifyRight: t("right"),
          JustifyFull: t("justify"),
          JustifyNone: t("none"),
        });
      })(e),
        ((e) => {
          const t = (t) => () => {
            const n = e.selection,
              o = n.isCollapsed()
                ? [e.dom.getParent(n.getNode(), e.dom.isBlock)]
                : n.getSelectedBlocks();
            return $(o, (n) => C(e.formatter.matchNode(n, t)));
          };
          e.editorCommands.addCommands(
            {
              JustifyLeft: t("alignleft"),
              JustifyCenter: t("aligncenter"),
              JustifyRight: t("alignright"),
              JustifyFull: t("alignjustify"),
            },
            "state"
          );
        })(e);
    },
    hO = (e, t) => {
      const n = e.selection,
        o = e.dom;
      return /^ | $/.test(t)
        ? ((e, t, n, o) => {
            const r = Cn(e.getRoot());
            return (
              (n = ih(r, Qi.fromRangeStart(t), o)
                ? n.replace(/^ /, "&nbsp;")
                : n.replace(/^&nbsp;/, " ")),
              lh(r, Qi.fromRangeEnd(t), o)
                ? n.replace(/(&nbsp;| )(<br( \/)>)?$/, "&nbsp;")
                : n.replace(/&nbsp;(<br( \/)?>)?$/, " ")
            );
          })(o, n.getRng(), t, e.schema)
        : t;
    },
    bO = (e, t) => {
      if (e.selection.isEditable()) {
        const { content: n, details: o } = ((e) => {
          if ("string" != typeof e) {
            const t = Dt.extend(
              { paste: e.paste, data: { paste: e.paste } },
              e
            );
            return { content: e.content, details: t };
          }
          return { content: e, details: {} };
        })(t);
        RC(e, {
          ...o,
          content: hO(e, n),
          format: "html",
          set: !1,
          selection: !0,
        }).each((t) => {
          const n = ((e, t, n) => rw(e).editor.insertContent(t, n))(
            e,
            t.content,
            o
          );
          AC(e, n, t), e.addVisual();
        });
      }
    },
    vO = { "font-size": "size", "font-family": "face" },
    yO = Zt("font"),
    CO = (e) => (t, n) =>
      I.from(n)
        .map(Cn)
        .filter(Kt)
        .bind((n) =>
          ((e, t, n) =>
            zb(
              Cn(n),
              (t) =>
                ((t) =>
                  fo(t, e).orThunk(() =>
                    yO(t) ? Ee(vO, e).bind((e) => nn(t, e)) : I.none()
                  ))(t),
              (e) => _n(Cn(t), e)
            ))(e, t, n.dom).or(
            ((e, t) => I.from(da.DOM.getStyle(t, e, !0)))(e, n.dom)
          )
        )
        .getOr(""),
    wO = CO("font-size"),
    xO = _(
      (e) => e.replace(/[\'\"\\]/g, "").replace(/,\s+/g, ","),
      CO("font-family")
    ),
    EO = (e) =>
      Hu(e.getBody()).bind((e) => {
        const t = e.container();
        return I.from(dr(t) ? t.parentNode : t);
      }),
    kO = (e, t) =>
      ((e, t) =>
        ((e) =>
          I.from(e.selection.getRng()).bind((t) => {
            const n = e.getBody();
            return t.startContainer === n && 0 === t.startOffset
              ? I.none()
              : I.from(e.selection.getStart(!0));
          }))(e)
          .orThunk(T(EO, e))
          .map(Cn)
          .filter(Kt)
          .bind(t))(e, S(I.some, t)),
    _O = (e, t) => {
      if (/^[0-9.]+$/.test(t)) {
        const n = parseInt(t, 10);
        if (n >= 1 && n <= 7) {
          const o = ((e) =>
              Dt.explode(e.options.get("font_size_style_values")))(e),
            r = ((e) => Dt.explode(e.options.get("font_size_classes")))(e);
          return r.length > 0 ? r[n - 1] || t : o[n - 1] || t;
        }
        return t;
      }
      return t;
    },
    SO = (e) => {
      const t = e.split(/\s*,\s*/);
      return V(t, (e) =>
        -1 === e.indexOf(" ") || $e(e, '"') || $e(e, "'") ? e : `'${e}'`
      ).join(",");
    },
    NO = (e, t) => {
      const n = e.dom,
        o = e.selection.getRng(),
        r = t ? e.selection.getStart() : e.selection.getEnd(),
        s = t ? o.startContainer : o.endContainer,
        a = EN(n, s);
      if (!a || !a.isContentEditable) return;
      const i = t ? ho : bo,
        l = ql(e);
      ((e, t, n, o) => {
        const r = e.dom,
          s = (e) => r.isBlock(e) && e.parentElement === n,
          a = s(t) ? t : r.getParent(o, s, n);
        return I.from(a).map(Cn);
      })(e, r, a, s).each((t) => {
        const n = NN(e, s, t.dom, a, !1, l);
        i(t, Cn(n)),
          e.selection.setCursorLocation(n, 0),
          e.dispatch("NewBlock", { newBlock: n }),
          hN(e, "insertParagraph");
      });
    },
    RO = (e) => {
      pO(e),
        ((e) => {
          e.editorCommands.addCommands({
            "Cut,Copy,Paste": (t) => {
              const n = e.getDoc();
              let o;
              try {
                n.execCommand(t);
              } catch (e) {
                o = !0;
              }
              if (
                ("paste" !== t || n.queryCommandEnabled(t) || (o = !0),
                o || !n.queryCommandSupported(t))
              ) {
                let t = e.translate(
                  "Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead."
                );
                (Tt.os.isMacOS() || Tt.os.isiOS()) &&
                  (t = t.replace(/Ctrl\+/g, "\u2318+")),
                  e.notificationManager.open({ text: t, type: "error" });
              }
            },
          });
        })(e),
        ((e) => {
          e.editorCommands.addCommands({
            mceAddUndoLevel: () => {
              e.undoManager.add();
            },
            mceEndUndoLevel: () => {
              e.undoManager.add();
            },
            Undo: () => {
              e.undoManager.undo();
            },
            Redo: () => {
              e.undoManager.redo();
            },
          });
        })(e),
        ((e) => {
          e.editorCommands.addCommands({
            mceSelectNodeDepth: (t, n, o) => {
              let r = 0;
              e.dom.getParent(
                e.selection.getNode(),
                (t) => !er(t) || r++ !== o || (e.selection.select(t), !1),
                e.getBody()
              );
            },
            mceSelectNode: (t, n, o) => {
              e.selection.select(o);
            },
            selectAll: () => {
              const t = e.dom.getParent(e.selection.getStart(), br);
              if (t) {
                const n = e.dom.createRng();
                n.selectNodeContents(t), e.selection.setRng(n);
              }
            },
          });
        })(e),
        ((e) => {
          e.editorCommands.addCommands({
            mceCleanup: () => {
              const t = e.selection.getBookmark();
              e.setContent(e.getContent()), e.selection.moveToBookmark(t);
            },
            insertImage: (t, n, o) => {
              bO(e, e.dom.createHTML("img", { src: o }));
            },
            insertHorizontalRule: () => {
              e.execCommand("mceInsertContent", !1, "<hr>");
            },
            insertText: (t, n, o) => {
              bO(e, e.dom.encode(o));
            },
            insertHTML: (t, n, o) => {
              bO(e, o);
            },
            mceInsertContent: (t, n, o) => {
              bO(e, o);
            },
            mceSetContent: (t, n, o) => {
              e.setContent(o);
            },
            mceReplaceContent: (t, n, o) => {
              e.execCommand(
                "mceInsertContent",
                !1,
                o.replace(
                  /\{\$selection\}/g,
                  e.selection.getContent({ format: "text" })
                )
              );
            },
            mceNewDocument: () => {
              e.setContent(ac(e));
            },
          });
        })(e),
        ((e) => {
          const t = (t, n, o) => {
            const r = m(o) ? { href: o } : o,
              s = e.dom.getParent(e.selection.getNode(), "a");
            f(r) &&
              m(r.href) &&
              ((r.href = r.href.replace(/ /g, "%20")),
              (s && r.href) || e.formatter.remove("link"),
              r.href && e.formatter.apply("link", r, s));
          };
          e.editorCommands.addCommands({
            unlink: () => {
              if (e.selection.isEditable()) {
                if (e.selection.isCollapsed()) {
                  const t = e.dom.getParent(e.selection.getStart(), "a");
                  return void (t && e.dom.remove(t, !0));
                }
                e.formatter.remove("link");
              }
            },
            mceInsertLink: t,
            createLink: t,
          });
        })(e),
        ((e) => {
          e.editorCommands.addCommands({
            Indent: () => {
              ((e) => {
                Dk(e, "indent");
              })(e);
            },
            Outdent: () => {
              Lk(e);
            },
          }),
            e.editorCommands.addCommands({ Outdent: () => Ok(e) }, "state");
        })(e),
        ((e) => {
          e.editorCommands.addCommands({
            InsertNewBlockBefore: () => {
              ((e) => {
                NO(e, !0);
              })(e);
            },
            InsertNewBlockAfter: () => {
              ((e) => {
                NO(e, !1);
              })(e);
            },
          });
        })(e),
        ((e) => {
          e.editorCommands.addCommands({
            insertParagraph: () => {
              aR(FN, e);
            },
            mceInsertNewLine: (t, n, o) => {
              iR(e, o);
            },
            InsertLineBreak: (t, n, o) => {
              aR(WN, e);
            },
          });
        })(e),
        ((e) => {
          ((e) => {
            const t = (t, n) => {
              e.formatter.toggle(t, n), e.nodeChanged();
            };
            e.editorCommands.addCommands({
              "Bold,Italic,Underline,Strikethrough,Superscript,Subscript": (
                e
              ) => {
                t(e);
              },
              "ForeColor,HiliteColor": (e, n, o) => {
                t(e, { value: o });
              },
              BackColor: (e, n, o) => {
                t("hilitecolor", { value: o });
              },
              FontName: (t, n, o) => {
                ((e, t) => {
                  const n = _O(e, t);
                  e.formatter.toggle("fontname", { value: SO(n) }),
                    e.nodeChanged();
                })(e, o);
              },
              FontSize: (t, n, o) => {
                ((e, t) => {
                  e.formatter.toggle("fontsize", { value: _O(e, t) }),
                    e.nodeChanged();
                })(e, o);
              },
              LineHeight: (t, n, o) => {
                ((e, t) => {
                  e.formatter.toggle("lineheight", { value: String(t) }),
                    e.nodeChanged();
                })(e, o);
              },
              Lang: (e, n, o) => {
                var r;
                t(e, {
                  value: o.code,
                  customValue:
                    null !== (r = o.customCode) && void 0 !== r ? r : null,
                });
              },
              RemoveFormat: (t) => {
                e.formatter.remove(t);
              },
              mceBlockQuote: () => {
                t("blockquote");
              },
              FormatBlock: (e, n, o) => {
                t(m(o) ? o : "p");
              },
              mceToggleFormat: (e, n, o) => {
                t(o);
              },
            });
          })(e),
            ((e) => {
              const t = (t) => e.formatter.match(t);
              e.editorCommands.addCommands(
                {
                  "Bold,Italic,Underline,Strikethrough,Superscript,Subscript": (
                    e
                  ) => t(e),
                  mceBlockQuote: () => t("blockquote"),
                },
                "state"
              ),
                e.editorCommands.addQueryValueHandler("FontName", () =>
                  ((e) => kO(e, (t) => xO(e.getBody(), t.dom)).getOr(""))(e)
                ),
                e.editorCommands.addQueryValueHandler("FontSize", () =>
                  ((e) => kO(e, (t) => wO(e.getBody(), t.dom)).getOr(""))(e)
                ),
                e.editorCommands.addQueryValueHandler("LineHeight", () =>
                  ((e) =>
                    kO(e, (t) => {
                      const n = Cn(e.getBody()),
                        o = zb(t, (e) => fo(e, "line-height"), T(_n, n));
                      return o.getOrThunk(() => {
                        const e = parseFloat(uo(t, "line-height")),
                          n = parseFloat(uo(t, "font-size"));
                        return String(e / n);
                      });
                    }).getOr(""))(e)
                );
            })(e);
        })(e),
        ((e) => {
          e.editorCommands.addCommands({
            mceRemoveNode: (t, n, o) => {
              const r = null != o ? o : e.selection.getNode();
              if (r !== e.getBody()) {
                const t = e.selection.getBookmark();
                e.dom.remove(r, !0), e.selection.moveToBookmark(t);
              }
            },
            mcePrint: () => {
              e.getWin().print();
            },
            mceFocus: (t, n, o) => {
              ((e, t) => {
                e.removed ||
                  (t
                    ? Hg(e)
                    : ((e) => {
                        const t = e.selection,
                          n = e.getBody();
                        let o = t.getRng();
                        e.quirks.refreshContentEditable(),
                          C(e.bookmark) &&
                            !zg(e) &&
                            Rg(e).each((t) => {
                              e.selection.setRng(t), (o = t);
                            });
                        const r = ((e, t) =>
                          e.dom.getParent(
                            t,
                            (t) => "true" === e.dom.getContentEditable(t)
                          ))(e, t.getNode());
                        if (r && e.dom.isChildOf(r, n))
                          return Ug(r), Fg(e, o), void Hg(e);
                        e.inline ||
                          (Tt.browser.isOpera() || Ug(n), e.getWin().focus()),
                          (Tt.browser.isFirefox() || e.inline) &&
                            (Ug(n), Fg(e, o)),
                          Hg(e);
                      })(e));
              })(e, !0 === o);
            },
            mceToggleVisualAid: () => {
              (e.hasVisual = !e.hasVisual), e.addVisual();
            },
          });
        })(e);
    },
    AO = ["toggleview"],
    TO = (e) => H(AO, e.toLowerCase());
  class OO {
    constructor(e) {
      (this.commands = { state: {}, exec: {}, value: {} }), (this.editor = e);
    }
    execCommand(e, t = !1, n, o) {
      const r = this.editor,
        s = e.toLowerCase(),
        a = null == o ? void 0 : o.skip_focus;
      if (r.removed) return !1;
      if (
        ("mcefocus" !== s &&
          (/^(mceAddUndoLevel|mceEndUndoLevel)$/i.test(s) || a
            ? ((e) => {
                Rg(e).each((t) => e.selection.setRng(t));
              })(r)
            : r.focus()),
        r
          .dispatch("BeforeExecCommand", { command: e, ui: t, value: n })
          .isDefaultPrevented())
      )
        return !1;
      const i = this.commands.exec[s];
      return (
        !!w(i) &&
        (i(s, t, n),
        r.dispatch("ExecCommand", { command: e, ui: t, value: n }),
        !0)
      );
    }
    queryCommandState(e) {
      if ((!TO(e) && this.editor.quirks.isHidden()) || this.editor.removed)
        return !1;
      const t = e.toLowerCase(),
        n = this.commands.state[t];
      return !!w(n) && n(t);
    }
    queryCommandValue(e) {
      if ((!TO(e) && this.editor.quirks.isHidden()) || this.editor.removed)
        return "";
      const t = e.toLowerCase(),
        n = this.commands.value[t];
      return w(n) ? n(t) : "";
    }
    addCommands(e, t = "exec") {
      const n = this.commands;
      pe(e, (e, o) => {
        q(o.toLowerCase().split(","), (o) => {
          n[t][o] = e;
        });
      });
    }
    addCommand(e, t, n) {
      const o = e.toLowerCase();
      this.commands.exec[o] = (e, o, r) =>
        t.call(null != n ? n : this.editor, o, r);
    }
    queryCommandSupported(e) {
      const t = e.toLowerCase();
      return !!this.commands.exec[t];
    }
    addQueryStateHandler(e, t, n) {
      this.commands.state[e.toLowerCase()] = () =>
        t.call(null != n ? n : this.editor);
    }
    addQueryValueHandler(e, t, n) {
      this.commands.value[e.toLowerCase()] = () =>
        t.call(null != n ? n : this.editor);
    }
  }
  const BO = "data-mce-contenteditable",
    PO = (e, t, n) => {
      try {
        e.getDoc().execCommand(t, !1, String(n));
      } catch (e) {}
    },
    DO = (e, t) => {
      e.dom.contentEditable = t ? "true" : "false";
    },
    LO = (e) => e.readonly,
    MO = (e) => {
      e.parser.addAttributeFilter("contenteditable", (t) => {
        LO(e) &&
          q(t, (e) => {
            e.attr(BO, e.attr("contenteditable")),
              e.attr("contenteditable", "false");
          });
      }),
        e.serializer.addAttributeFilter(BO, (t) => {
          LO(e) &&
            q(t, (e) => {
              e.attr("contenteditable", e.attr(BO));
            });
        }),
        e.serializer.addTempAttr(BO);
    },
    IO = ["copy"],
    FO = Dt.makeMap(
      "focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input beforeinput contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchmove touchend touchcancel",
      " "
    );
  class UO {
    static isNative(e) {
      return !!FO[e.toLowerCase()];
    }
    constructor(e) {
      (this.bindings = {}),
        (this.settings = e || {}),
        (this.scope = this.settings.scope || this),
        (this.toggleEvent = this.settings.toggleEvent || L);
    }
    fire(e, t) {
      return this.dispatch(e, t);
    }
    dispatch(e, t) {
      const n = e.toLowerCase(),
        o = Ks(n, null != t ? t : {}, this.scope);
      this.settings.beforeFire && this.settings.beforeFire(o);
      const r = this.bindings[n];
      if (r)
        for (let e = 0, t = r.length; e < t; e++) {
          const t = r[e];
          if (!t.removed) {
            if (
              (t.once && this.off(n, t.func), o.isImmediatePropagationStopped())
            )
              return o;
            if (!1 === t.func.call(this.scope, o)) return o.preventDefault(), o;
          }
        }
      return o;
    }
    on(e, t, n, o) {
      if ((!1 === t && (t = L), t)) {
        const r = { func: t, removed: !1 };
        o && Dt.extend(r, o);
        const s = e.toLowerCase().split(" ");
        let a = s.length;
        for (; a--; ) {
          const e = s[a];
          let t = this.bindings[e];
          t || ((t = []), this.toggleEvent(e, !0)),
            (t = n ? [r, ...t] : [...t, r]),
            (this.bindings[e] = t);
        }
      }
      return this;
    }
    off(e, t) {
      if (e) {
        const n = e.toLowerCase().split(" ");
        let o = n.length;
        for (; o--; ) {
          const r = n[o];
          let s = this.bindings[r];
          if (!r)
            return (
              pe(this.bindings, (e, t) => {
                this.toggleEvent(t, !1), delete this.bindings[t];
              }),
              this
            );
          if (s) {
            if (t) {
              const e = K(s, (e) => e.func === t);
              (s = e.fail),
                (this.bindings[r] = s),
                q(e.pass, (e) => {
                  e.removed = !0;
                });
            } else s.length = 0;
            s.length || (this.toggleEvent(e, !1), delete this.bindings[r]);
          }
        }
      } else
        pe(this.bindings, (e, t) => {
          this.toggleEvent(t, !1);
        }),
          (this.bindings = {});
      return this;
    }
    once(e, t, n) {
      return this.on(e, t, n, { once: !0 });
    }
    has(e) {
      e = e.toLowerCase();
      const t = this.bindings[e];
      return !(!t || 0 === t.length);
    }
  }
  const zO = (e) => (
      e._eventDispatcher ||
        (e._eventDispatcher = new UO({
          scope: e,
          toggleEvent: (t, n) => {
            UO.isNative(t) && e.toggleNativeEvent && e.toggleNativeEvent(t, n);
          },
        })),
      e._eventDispatcher
    ),
    jO = {
      fire(e, t, n) {
        return this.dispatch(e, t, n);
      },
      dispatch(e, t, n) {
        const o = this;
        if (o.removed && "remove" !== e && "detach" !== e)
          return Ks(e.toLowerCase(), null != t ? t : {}, o);
        const r = zO(o).dispatch(e, t);
        if (!1 !== n && o.parent) {
          let t = o.parent();
          for (; t && !r.isPropagationStopped(); )
            t.dispatch(e, r, !1), (t = t.parent ? t.parent() : void 0);
        }
        return r;
      },
      on(e, t, n) {
        return zO(this).on(e, t, n);
      },
      off(e, t) {
        return zO(this).off(e, t);
      },
      once(e, t) {
        return zO(this).once(e, t);
      },
      hasEventListeners(e) {
        return zO(this).has(e);
      },
    },
    HO = da.DOM;
  let $O;
  const VO = (e, t) => {
      if ("selectionchange" === t) return e.getDoc();
      if (
        !e.inline &&
        /^(?:mouse|touch|click|contextmenu|drop|dragover|dragend)/.test(t)
      )
        return e.getDoc().documentElement;
      const n = wd(e);
      return n
        ? (e.eventRoot || (e.eventRoot = HO.select(n)[0]), e.eventRoot)
        : e.getBody();
    },
    qO = (e, t, n) => {
      ((e) => !e.hidden && !LO(e))(e)
        ? e.dispatch(t, n)
        : LO(e) &&
          ((e, t) => {
            if (((e) => "click" === e.type)(t) && !yf.metaKeyPressed(t)) {
              const n = Cn(t.target);
              ((e, t) =>
                oo(t, "a", (t) => _n(t, Cn(e.getBody()))).bind((e) =>
                  nn(e, "href")
                ))(e, n).each((n) => {
                if ((t.preventDefault(), /^#/.test(n))) {
                  const t = e.dom.select(`${n},[name="${je(n, "#")}"]`);
                  t.length && e.selection.scrollIntoView(t[0], !0);
                } else
                  window.open(
                    n,
                    "_blank",
                    "rel=noopener noreferrer,menubar=yes,toolbar=yes,location=yes,status=yes,resizable=yes,scrollbars=yes"
                  );
              });
            } else ((e) => H(IO, e.type))(t) && e.dispatch(t.type, t);
          })(e, n);
    },
    WO = (e, t) => {
      if ((e.delegates || (e.delegates = {}), e.delegates[t] || e.removed))
        return;
      const n = VO(e, t);
      if (wd(e)) {
        if (
          ($O ||
            (($O = {}),
            e.editorManager.on("removeEditor", () => {
              e.editorManager.activeEditor ||
                ($O &&
                  (pe($O, (t, n) => {
                    e.dom.unbind(VO(e, n));
                  }),
                  ($O = null)));
            })),
          $O[t])
        )
          return;
        const o = (n) => {
          const o = n.target,
            r = e.editorManager.get();
          let s = r.length;
          for (; s--; ) {
            const e = r[s].getBody();
            (e === o || HO.isChildOf(o, e)) && qO(r[s], t, n);
          }
        };
        ($O[t] = o), HO.bind(n, t, o);
      } else {
        const o = (n) => {
          qO(e, t, n);
        };
        HO.bind(n, t, o), (e.delegates[t] = o);
      }
    },
    KO = {
      ...jO,
      bindPendingEventDelegates() {
        const e = this;
        Dt.each(e._pendingNativeEvents, (t) => {
          WO(e, t);
        });
      },
      toggleNativeEvent(e, t) {
        const n = this;
        "focus" !== e &&
          "blur" !== e &&
          (n.removed ||
            (t
              ? n.initialized
                ? WO(n, e)
                : n._pendingNativeEvents
                ? n._pendingNativeEvents.push(e)
                : (n._pendingNativeEvents = [e])
              : n.initialized &&
                n.delegates &&
                (n.dom.unbind(VO(n, e), e, n.delegates[e]),
                delete n.delegates[e])));
      },
      unbindAllNativeEvents() {
        const e = this,
          t = e.getBody(),
          n = e.dom;
        e.delegates &&
          (pe(e.delegates, (t, n) => {
            e.dom.unbind(VO(e, n), n, t);
          }),
          delete e.delegates),
          !e.inline &&
            t &&
            n &&
            ((t.onload = null), n.unbind(e.getWin()), n.unbind(e.getDoc())),
          n && (n.unbind(t), n.unbind(e.getContainer()));
      },
    },
    YO = (e) =>
      m(e)
        ? { value: e.split(/[ ,]/), valid: !0 }
        : E(e, m)
        ? { value: e, valid: !0 }
        : {
            valid: !1,
            message:
              "The value must be a string[] or a comma/space separated string.",
          },
    GO = (e, t) => e + (Xe(t.message) ? "" : `. ${t.message}`),
    XO = (e) => e.valid,
    ZO = (e, t, n = "") => {
      const o = t(e);
      return b(o)
        ? o
          ? { value: e, valid: !0 }
          : { valid: !1, message: n }
        : o;
    },
    QO = ["design", "readonly"],
    JO = (e, t, n, o) => {
      const r = n[t.get()],
        s = n[o];
      try {
        s.activate();
      } catch (e) {
        return void console.error(
          `problem while activating editor mode ${o}:`,
          e
        );
      }
      r.deactivate(),
        r.editorReadOnly !== s.editorReadOnly &&
          ((e, t) => {
            const n = Cn(e.getBody());
            ((e, t, n) => {
              pn(e, t) && !n ? gn(e, t) : n && mn(e, t);
            })(n, "mce-content-readonly", t),
              t
                ? (e.selection.controlSelection.hideResizeRect(),
                  e._selectionOverrides.hideFakeCaret(),
                  ((e) => {
                    I.from(e.selection.getNode()).each((e) => {
                      e.removeAttribute("data-mce-selected");
                    });
                  })(e),
                  (e.readonly = !0),
                  DO(n, !1),
                  q(zo(n, '*[contenteditable="true"]'), (e) => {
                    Jt(e, BO, "true"), DO(e, !1);
                  }))
                : ((e.readonly = !1),
                  e.hasEditableRoot() && DO(n, !0),
                  q(zo(n, `*[${BO}="true"]`), (e) => {
                    rn(e, BO), DO(e, !0);
                  }),
                  PO(e, "StyleWithCSS", !1),
                  PO(e, "enableInlineTableEditing", !1),
                  PO(e, "enableObjectResizing", !1),
                  jg(e) && e.focus(),
                  ((e) => {
                    e.selection.setRng(e.selection.getRng());
                  })(e),
                  e.nodeChanged());
          })(e, s.editorReadOnly),
        t.set(o),
        ((e, t) => {
          e.dispatch("SwitchMode", { mode: t });
        })(e, o);
    },
    eB = Dt.each,
    tB = Dt.explode,
    nB = {
      f1: 112,
      f2: 113,
      f3: 114,
      f4: 115,
      f5: 116,
      f6: 117,
      f7: 118,
      f8: 119,
      f9: 120,
      f10: 121,
      f11: 122,
      f12: 123,
    },
    oB = Dt.makeMap("alt,ctrl,shift,meta,access"),
    rB = (e) => {
      const t = {},
        n = Tt.os.isMacOS() || Tt.os.isiOS();
      eB(tB(e.toLowerCase(), "+"), (e) => {
        ((e) => e in oB)(e)
          ? (t[e] = !0)
          : /^[0-9]{2,}$/.test(e)
          ? (t.keyCode = parseInt(e, 10))
          : ((t.charCode = e.charCodeAt(0)),
            (t.keyCode = nB[e] || e.toUpperCase().charCodeAt(0)));
      });
      const o = [t.keyCode];
      let r;
      for (r in oB) t[r] ? o.push(r) : (t[r] = !1);
      return (
        (t.id = o.join(",")),
        t.access && ((t.alt = !0), n ? (t.ctrl = !0) : (t.shift = !0)),
        t.meta && (n ? (t.meta = !0) : ((t.ctrl = !0), (t.meta = !1))),
        t
      );
    };
  class sB {
    constructor(e) {
      (this.shortcuts = {}), (this.pendingPatterns = []), (this.editor = e);
      const t = this;
      e.on("keyup keypress keydown", (e) => {
        (!t.hasModifier(e) && !t.isFunctionKey(e)) ||
          e.isDefaultPrevented() ||
          (eB(t.shortcuts, (n) => {
            t.matchShortcut(e, n) &&
              ((t.pendingPatterns = n.subpatterns.slice(0)),
              "keydown" === e.type && t.executeShortcutAction(n));
          }),
          t.matchShortcut(e, t.pendingPatterns[0]) &&
            (1 === t.pendingPatterns.length &&
              "keydown" === e.type &&
              t.executeShortcutAction(t.pendingPatterns[0]),
            t.pendingPatterns.shift()));
      });
    }
    add(e, t, n, o) {
      const r = this,
        s = r.normalizeCommandFunc(n);
      return (
        eB(tB(Dt.trim(e)), (e) => {
          const n = r.createShortcut(e, t, s, o);
          r.shortcuts[n.id] = n;
        }),
        !0
      );
    }
    remove(e) {
      const t = this.createShortcut(e);
      return !!this.shortcuts[t.id] && (delete this.shortcuts[t.id], !0);
    }
    normalizeCommandFunc(e) {
      const t = this,
        n = e;
      return "string" == typeof n
        ? () => {
            t.editor.execCommand(n, !1, null);
          }
        : Dt.isArray(n)
        ? () => {
            t.editor.execCommand(n[0], n[1], n[2]);
          }
        : n;
    }
    createShortcut(e, t, n, o) {
      const r = Dt.map(tB(e, ">"), rB);
      return (
        (r[r.length - 1] = Dt.extend(r[r.length - 1], {
          func: n,
          scope: o || this.editor,
        })),
        Dt.extend(r[0], {
          desc: this.editor.translate(t),
          subpatterns: r.slice(1),
        })
      );
    }
    hasModifier(e) {
      return e.altKey || e.ctrlKey || e.metaKey;
    }
    isFunctionKey(e) {
      return "keydown" === e.type && e.keyCode >= 112 && e.keyCode <= 123;
    }
    matchShortcut(e, t) {
      return (
        !!t &&
        t.ctrl === e.ctrlKey &&
        t.meta === e.metaKey &&
        t.alt === e.altKey &&
        t.shift === e.shiftKey &&
        !!(
          e.keyCode === t.keyCode ||
          (e.charCode && e.charCode === t.charCode)
        ) &&
        (e.preventDefault(), !0)
      );
    }
    executeShortcutAction(e) {
      return e.func ? e.func.call(e.scope) : null;
    }
  }
  const aB = () => {
      const e = (() => {
        const e = {},
          t = {},
          n = {},
          o = {},
          r = {},
          s = {},
          a = {},
          i = {},
          l = (e, t) => (n, o) => {
            e[n.toLowerCase()] = { ...o, type: t };
          };
        return {
          addButton: l(e, "button"),
          addGroupToolbarButton: l(e, "grouptoolbarbutton"),
          addToggleButton: l(e, "togglebutton"),
          addMenuButton: l(e, "menubutton"),
          addSplitButton: l(e, "splitbutton"),
          addMenuItem: l(t, "menuitem"),
          addNestedMenuItem: l(t, "nestedmenuitem"),
          addToggleMenuItem: l(t, "togglemenuitem"),
          addAutocompleter: l(n, "autocompleter"),
          addContextMenu: l(r, "contextmenu"),
          addContextToolbar: l(s, "contexttoolbar"),
          addContextForm: l(s, "contextform"),
          addSidebar: l(a, "sidebar"),
          addView: l(i, "views"),
          addIcon: (e, t) => (o[e.toLowerCase()] = t),
          getAll: () => ({
            buttons: e,
            menuItems: t,
            icons: o,
            popups: n,
            contextMenus: r,
            contextToolbars: s,
            sidebars: a,
            views: i,
          }),
        };
      })();
      return {
        addAutocompleter: e.addAutocompleter,
        addButton: e.addButton,
        addContextForm: e.addContextForm,
        addContextMenu: e.addContextMenu,
        addContextToolbar: e.addContextToolbar,
        addIcon: e.addIcon,
        addMenuButton: e.addMenuButton,
        addMenuItem: e.addMenuItem,
        addNestedMenuItem: e.addNestedMenuItem,
        addSidebar: e.addSidebar,
        addSplitButton: e.addSplitButton,
        addToggleButton: e.addToggleButton,
        addGroupToolbarButton: e.addGroupToolbarButton,
        addToggleMenuItem: e.addToggleMenuItem,
        addView: e.addView,
        getAll: e.getAll,
      };
    },
    iB = da.DOM,
    lB = Dt.extend,
    dB = Dt.each;
  class cB {
    constructor(e, t, n) {
      (this.plugins = {}),
        (this.contentCSS = []),
        (this.contentStyles = []),
        (this.loadedCSS = {}),
        (this.isNotDirty = !1),
        (this.composing = !1),
        (this.destroyed = !1),
        (this.hasHiddenInput = !1),
        (this.iframeElement = null),
        (this.initialized = !1),
        (this.readonly = !1),
        (this.removed = !1),
        (this.startContent = ""),
        (this._pendingNativeEvents = []),
        (this._skinLoaded = !1),
        (this._editableRoot = !0),
        (this.editorManager = n),
        (this.documentBaseUrl = n.documentBaseURL),
        lB(this, KO);
      const o = this;
      (this.id = e), (this.hidden = !1);
      const r = ((e, t) => gO(iO || lO, iO, t, e, t))(n.defaultOptions, t);
      (this.options = ((e, t) => {
        const n = {},
          o = {},
          r = (e, t, n) => {
            const r = ZO(t, n);
            return XO(r)
              ? ((o[e] = r.value), !0)
              : (console.warn(
                  GO(`Invalid value passed for the ${e} option`, r)
                ),
                !1);
          },
          s = (e) => ke(n, e);
        return {
          register: (e, s) => {
            const a = ((e) => m(e.processor))(s)
                ? ((e) => {
                    const t = (() => {
                      switch (e) {
                        case "array":
                          return p;
                        case "boolean":
                          return b;
                        case "function":
                          return w;
                        case "number":
                          return x;
                        case "object":
                          return f;
                        case "string":
                          return m;
                        case "string[]":
                          return YO;
                        case "object[]":
                          return (e) => E(e, f);
                        case "regexp":
                          return (e) => u(e, RegExp);
                        default:
                          return M;
                      }
                    })();
                    return (n) => ZO(n, t, `The value must be a ${e}.`);
                  })(s.processor)
                : s.processor,
              i = ((e, t, n) => {
                if (!v(t)) {
                  const o = ZO(t, n);
                  if (XO(o)) return o.value;
                  console.error(
                    GO(`Invalid default value passed for the "${e}" option`, o)
                  );
                }
              })(e, s.default, a);
            (n[e] = { ...s, default: i, processor: a }),
              Ee(o, e)
                .orThunk(() => Ee(t, e))
                .each((t) => r(e, t, a));
          },
          isRegistered: s,
          get: (e) =>
            Ee(o, e)
              .orThunk(() => Ee(n, e).map((e) => e.default))
              .getOrUndefined(),
          set: (e, t) => {
            if (s(e)) {
              const o = n[e];
              return o.immutable
                ? (console.error(
                    `"${e}" is an immutable option and cannot be updated`
                  ),
                  !1)
                : r(e, t, o.processor);
            }
            return (
              console.warn(
                `"${e}" is not a registered option. Ensure the option has been registered before setting a value.`
              ),
              !1
            );
          },
          unset: (e) => {
            const t = s(e);
            return t && delete o[e], t;
          },
          isSet: (e) => ke(o, e),
        };
      })(0, r)),
        ((e) => {
          const t = e.options.register;
          t("id", { processor: "string", default: e.id }),
            t("selector", { processor: "string" }),
            t("target", { processor: "object" }),
            t("suffix", { processor: "string" }),
            t("cache_suffix", { processor: "string" }),
            t("base_url", { processor: "string" }),
            t("referrer_policy", { processor: "string", default: "" }),
            t("language_load", { processor: "boolean", default: !0 }),
            t("inline", { processor: "boolean", default: !1 }),
            t("iframe_attrs", { processor: "object", default: {} }),
            t("doctype", { processor: "string", default: "<!DOCTYPE html>" }),
            t("document_base_url", {
              processor: "string",
              default: e.documentBaseUrl,
            }),
            t("body_id", { processor: Il(e, "tinymce"), default: "tinymce" }),
            t("body_class", { processor: Il(e), default: "" }),
            t("content_security_policy", { processor: "string", default: "" }),
            t("br_in_pre", { processor: "boolean", default: !0 }),
            t("forced_root_block", {
              processor: (e) => {
                const t = m(e) && Ge(e);
                return t
                  ? { value: e, valid: t }
                  : { valid: !1, message: "Must be a non-empty string." };
              },
              default: "p",
            }),
            t("forced_root_block_attrs", { processor: "object", default: {} }),
            t("newline_behavior", {
              processor: (e) => {
                const t = H(["block", "linebreak", "invert", "default"], e);
                return t
                  ? { value: e, valid: t }
                  : {
                      valid: !1,
                      message:
                        "Must be one of: block, linebreak, invert or default.",
                    };
              },
              default: "default",
            }),
            t("br_newline_selector", {
              processor: "string",
              default: ".mce-toc h2,figcaption,caption",
            }),
            t("no_newline_selector", { processor: "string", default: "" }),
            t("keep_styles", { processor: "boolean", default: !0 }),
            t("end_container_on_empty_block", {
              processor: (e) =>
                b(e) || m(e)
                  ? { valid: !0, value: e }
                  : { valid: !1, message: "Must be boolean or a string" },
              default: "blockquote",
            }),
            t("font_size_style_values", {
              processor: "string",
              default: "xx-small,x-small,small,medium,large,x-large,xx-large",
            }),
            t("font_size_legacy_values", {
              processor: "string",
              default: "xx-small,small,medium,large,x-large,xx-large,300%",
            }),
            t("font_size_classes", { processor: "string", default: "" }),
            t("automatic_uploads", { processor: "boolean", default: !0 }),
            t("images_reuse_filename", { processor: "boolean", default: !1 }),
            t("images_replace_blob_uris", {
              processor: "boolean",
              default: !0,
            }),
            t("icons", { processor: "string", default: "" }),
            t("icons_url", { processor: "string", default: "" }),
            t("images_upload_url", { processor: "string", default: "" }),
            t("images_upload_base_path", { processor: "string", default: "" }),
            t("images_upload_credentials", {
              processor: "boolean",
              default: !1,
            }),
            t("images_upload_handler", { processor: "function" }),
            t("language", { processor: "string", default: "en" }),
            t("language_url", { processor: "string", default: "" }),
            t("entity_encoding", { processor: "string", default: "named" }),
            t("indent", { processor: "boolean", default: !0 }),
            t("indent_before", {
              processor: "string",
              default:
                "p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,details,summary,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",
            }),
            t("indent_after", {
              processor: "string",
              default:
                "p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,details,summary,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",
            }),
            t("indent_use_margin", { processor: "boolean", default: !1 }),
            t("indentation", { processor: "string", default: "40px" }),
            t("content_css", {
              processor: (e) => {
                const t = !1 === e || m(e) || E(e, m);
                return t
                  ? m(e)
                    ? { value: V(e.split(","), We), valid: t }
                    : p(e)
                    ? { value: e, valid: t }
                    : !1 === e
                    ? { value: [], valid: t }
                    : { value: e, valid: t }
                  : {
                      valid: !1,
                      message:
                        "Must be false, a string or an array of strings.",
                    };
              },
              default: Pd(e) ? [] : ["default"],
            }),
            t("content_style", { processor: "string" }),
            t("content_css_cors", { processor: "boolean", default: !1 }),
            t("font_css", {
              processor: (e) => {
                const t = m(e) || E(e, m);
                return t
                  ? { value: p(e) ? e : V(e.split(","), We), valid: t }
                  : {
                      valid: !1,
                      message: "Must be a string or an array of strings.",
                    };
              },
              default: [],
            }),
            t("inline_boundaries", { processor: "boolean", default: !0 }),
            t("inline_boundaries_selector", {
              processor: "string",
              default: "a[href],code,span.mce-annotation",
            }),
            t("object_resizing", {
              processor: (e) => {
                const t = b(e) || m(e);
                return t
                  ? !1 === e || Ol.isiPhone() || Ol.isiPad()
                    ? { value: "", valid: t }
                    : {
                        value:
                          !0 === e
                            ? "table,img,figure.image,div,video,iframe"
                            : e,
                        valid: t,
                      }
                  : { valid: !1, message: "Must be boolean or a string" };
              },
              default: !Bl,
            }),
            t("resize_img_proportional", { processor: "boolean", default: !0 }),
            t("event_root", { processor: "string" }),
            t("service_message", { processor: "string" }),
            t("theme", {
              processor: (e) => !1 === e || m(e) || w(e),
              default: "silver",
            }),
            t("theme_url", { processor: "string" }),
            t("formats", { processor: "object" }),
            t("format_empty_lines", { processor: "boolean", default: !1 }),
            t("format_noneditable_selector", {
              processor: "string",
              default: "",
            }),
            t("preview_styles", {
              processor: (e) => {
                const t = !1 === e || m(e);
                return t
                  ? { value: !1 === e ? "" : e, valid: t }
                  : { valid: !1, message: "Must be false or a string" };
              },
              default:
                "font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow",
            }),
            t("custom_ui_selector", { processor: "string", default: "" }),
            t("hidden_input", { processor: "boolean", default: !0 }),
            t("submit_patch", { processor: "boolean", default: !0 }),
            t("encoding", { processor: "string" }),
            t("add_form_submit_trigger", { processor: "boolean", default: !0 }),
            t("add_unload_trigger", { processor: "boolean", default: !0 }),
            t("custom_undo_redo_levels", { processor: "number", default: 0 }),
            t("disable_nodechange", { processor: "boolean", default: !1 }),
            t("readonly", { processor: "boolean", default: !1 }),
            t("editable_root", { processor: "boolean", default: !0 }),
            t("plugins", { processor: "string[]", default: [] }),
            t("external_plugins", { processor: "object" }),
            t("forced_plugins", { processor: "string[]" }),
            t("model", {
              processor: "string",
              default: e.hasPlugin("rtc") ? "plugin" : "dom",
            }),
            t("model_url", { processor: "string" }),
            t("block_unsupported_drop", { processor: "boolean", default: !0 }),
            t("visual", { processor: "boolean", default: !0 }),
            t("visual_table_class", {
              processor: "string",
              default: "mce-item-table",
            }),
            t("visual_anchor_class", {
              processor: "string",
              default: "mce-item-anchor",
            }),
            t("iframe_aria_text", {
              processor: "string",
              default: "Rich Text Area. Press ALT-0 for help.",
            }),
            t("setup", { processor: "function" }),
            t("init_instance_callback", { processor: "function" }),
            t("url_converter", {
              processor: "function",
              default: e.convertURL,
            }),
            t("url_converter_scope", { processor: "object", default: e }),
            t("urlconverter_callback", { processor: "function" }),
            t("allow_conditional_comments", {
              processor: "boolean",
              default: !1,
            }),
            t("allow_html_data_urls", { processor: "boolean", default: !1 }),
            t("allow_svg_data_urls", { processor: "boolean" }),
            t("allow_html_in_named_anchor", {
              processor: "boolean",
              default: !1,
            }),
            t("allow_script_urls", { processor: "boolean", default: !1 }),
            t("allow_unsafe_link_target", {
              processor: "boolean",
              default: !1,
            }),
            t("convert_fonts_to_spans", {
              processor: "boolean",
              default: !0,
              deprecated: !0,
            }),
            t("fix_list_elements", { processor: "boolean", default: !1 }),
            t("preserve_cdata", { processor: "boolean", default: !1 }),
            t("remove_trailing_brs", { processor: "boolean", default: !0 }),
            t("pad_empty_with_br", { processor: "boolean", default: !1 }),
            t("inline_styles", {
              processor: "boolean",
              default: !0,
              deprecated: !0,
            }),
            t("element_format", { processor: "string", default: "html" }),
            t("entities", { processor: "string" }),
            t("schema", { processor: "string", default: "html5" }),
            t("convert_urls", { processor: "boolean", default: !0 }),
            t("relative_urls", { processor: "boolean", default: !0 }),
            t("remove_script_host", { processor: "boolean", default: !0 }),
            t("custom_elements", { processor: Ml }),
            t("extended_valid_elements", { processor: "string" }),
            t("invalid_elements", { processor: "string" }),
            t("invalid_styles", { processor: Ml }),
            t("valid_children", { processor: "string" }),
            t("valid_classes", { processor: Ml }),
            t("valid_elements", { processor: "string" }),
            t("valid_styles", { processor: Ml }),
            t("verify_html", { processor: "boolean", default: !0 }),
            t("auto_focus", { processor: (e) => m(e) || !0 === e }),
            t("browser_spellcheck", { processor: "boolean", default: !1 }),
            t("protect", { processor: "array" }),
            t("images_file_types", {
              processor: "string",
              default: "jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp",
            }),
            t("deprecation_warnings", { processor: "boolean", default: !0 }),
            t("a11y_advanced_options", { processor: "boolean", default: !1 }),
            t("api_key", { processor: "string" }),
            t("license_key", { processor: "string" }),
            t("paste_block_drop", { processor: "boolean", default: !1 }),
            t("paste_data_images", { processor: "boolean", default: !0 }),
            t("paste_preprocess", { processor: "function" }),
            t("paste_postprocess", { processor: "function" }),
            t("paste_webkit_styles", { processor: "string", default: "none" }),
            t("paste_remove_styles_if_webkit", {
              processor: "boolean",
              default: !0,
            }),
            t("paste_merge_formats", { processor: "boolean", default: !0 }),
            t("smart_paste", { processor: "boolean", default: !0 }),
            t("paste_as_text", { processor: "boolean", default: !1 }),
            t("paste_tab_spaces", { processor: "number", default: 4 }),
            t("text_patterns", {
              processor: (e) =>
                E(e, f) || !1 === e
                  ? { value: Tl(!1 === e ? [] : e), valid: !0 }
                  : {
                      valid: !1,
                      message: "Must be an array of objects or false.",
                    },
              default: [
                { start: "*", end: "*", format: "italic" },
                { start: "**", end: "**", format: "bold" },
                { start: "#", format: "h1", trigger: "space" },
                { start: "##", format: "h2", trigger: "space" },
                { start: "###", format: "h3", trigger: "space" },
                { start: "####", format: "h4", trigger: "space" },
                { start: "#####", format: "h5", trigger: "space" },
                { start: "######", format: "h6", trigger: "space" },
                { start: "1.", cmd: "InsertOrderedList", trigger: "space" },
                { start: "*", cmd: "InsertUnorderedList", trigger: "space" },
                { start: "-", cmd: "InsertUnorderedList", trigger: "space" },
                { start: ">", cmd: "mceBlockQuote", trigger: "space" },
                { start: "---", cmd: "InsertHorizontalRule", trigger: "space" },
              ],
            }),
            t("text_patterns_lookup", {
              processor: (e) => {
                return w(e)
                  ? {
                      value:
                        ((t = e),
                        (e) => {
                          const n = t(e);
                          return Tl(n);
                        }),
                      valid: !0,
                    }
                  : { valid: !1, message: "Must be a single function" };
                var t;
              },
              default: (e) => [],
            }),
            t("noneditable_class", {
              processor: "string",
              default: "mceNonEditable",
            }),
            t("editable_class", {
              processor: "string",
              default: "mceEditable",
            }),
            t("noneditable_regexp", {
              processor: (e) =>
                E(e, Dl)
                  ? { value: e, valid: !0 }
                  : Dl(e)
                  ? { value: [e], valid: !0 }
                  : {
                      valid: !1,
                      message: "Must be a RegExp or an array of RegExp.",
                    },
              default: [],
            }),
            t("table_tab_navigation", { processor: "boolean", default: !0 }),
            t("highlight_on_focus", { processor: "boolean", default: !0 }),
            t("xss_sanitization", { processor: "boolean", default: !0 }),
            t("details_initial_state", {
              processor: (e) => {
                const t = H(["inherited", "collapsed", "expanded"], e);
                return t
                  ? { value: e, valid: t }
                  : {
                      valid: !1,
                      message:
                        "Must be one of: inherited, collapsed, or expanded.",
                    };
              },
              default: "inherited",
            }),
            t("details_serialized_state", {
              processor: (e) => {
                const t = H(["inherited", "collapsed", "expanded"], e);
                return t
                  ? { value: e, valid: t }
                  : {
                      valid: !1,
                      message:
                        "Must be one of: inherited, collapsed, or expanded.",
                    };
              },
              default: "inherited",
            }),
            t("init_content_sync", { processor: "boolean", default: !1 }),
            t("newdocument_content", { processor: "string", default: "" }),
            t("sandbox_iframes", { processor: "boolean", default: !0 }),
            t("sandbox_iframes_exclusions", {
              processor: "string[]",
              default: [
                "youtube.com",
                "youtu.be",
                "vimeo.com",
                "player.vimeo.com",
                "dailymotion.com",
                "embed.music.apple.com",
                "open.spotify.com",
                "giphy.com",
                "dai.ly",
                "codepen.io",
              ],
            }),
            t("convert_unsafe_embeds", { processor: "boolean", default: !0 }),
            e.on("ScriptsLoaded", () => {
              t("directionality", {
                processor: "string",
                default: ha.isRtl() ? "rtl" : void 0,
              }),
                t("placeholder", {
                  processor: "string",
                  default: Pl.getAttrib(e.getElement(), "placeholder"),
                });
            });
        })(o);
      const s = this.options.get;
      s("deprecation_warnings") &&
        ((e, t) => {
          ((e, t) => {
            const n = ww(e),
              o = kw(t),
              r = o.length > 0,
              s = n.length > 0,
              a = "mobile" === t.theme;
            if (r || s || a) {
              const e = "\n- ",
                t = a ? `\n\nThemes:${e}mobile` : "",
                i = r ? `\n\nPlugins:${e}${o.join(e)}` : "",
                l = s ? `\n\nOptions:${e}${n.join(e)}` : "";
              console.warn(
                "The following deprecated features are currently enabled and have been removed in TinyMCE 7.0. These features will no longer work and should be removed from the TinyMCE configuration. See https://www.tiny.cloud/docs/tinymce/7/migration-from-6x/ for more information." +
                  t +
                  i +
                  l
              );
            }
          })(e, t),
            ((e, t) => {
              const n = xw(e),
                o = _w(t),
                r = o.length > 0,
                s = n.length > 0;
              if (r || s) {
                const e = "\n- ",
                  t = r ? `\n\nPlugins:${e}${o.map(Sw).join(e)}` : "",
                  a = s ? `\n\nOptions:${e}${n.join(e)}` : "";
                console.warn(
                  "The following deprecated features are currently enabled but will be removed soon." +
                    t +
                    a
                );
              }
            })(e, t);
        })(t, r);
      const a = s("suffix");
      a && (n.suffix = a), (this.suffix = n.suffix);
      const i = s("base_url");
      i && n._setBaseUrl(i), (this.baseUri = n.baseURI);
      const l = ld(o);
      l &&
        (ua.ScriptLoader._setReferrerPolicy(l),
        da.DOM.styleSheetLoader._setReferrerPolicy(l));
      const d = Hd(o);
      C(d) && da.DOM.styleSheetLoader._setContentCssCors(d),
        (ba.languageLoad = s("language_load")),
        (ba.baseURL = n.baseURL),
        this.setDirty(!1),
        (this.documentBaseURI = new dC(zl(o), { base_uri: this.baseUri })),
        (this.baseURI = this.baseUri),
        (this.inline = Pd(o)),
        (this.hasVisual = Wd(o)),
        (this.shortcuts = new sB(this)),
        (this.editorCommands = new OO(this)),
        RO(this);
      const c = s("cache_suffix");
      c && (Tt.cacheSuffix = c.replace(/^[\?\&]+/, "")),
        (this.ui = {
          registry: aB(),
          styleSheetLoader: void 0,
          show: k,
          hide: k,
          setEnabled: k,
          isEnabled: M,
        }),
        (this.mode = ((e) => {
          const t = ma("design"),
            n = ma({
              design: { activate: k, deactivate: k, editorReadOnly: !1 },
              readonly: { activate: k, deactivate: k, editorReadOnly: !0 },
            });
          return (
            ((e) => {
              e.serializer
                ? MO(e)
                : e.on("PreInit", () => {
                    MO(e);
                  });
            })(e),
            ((e) => {
              e.on("ShowCaret", (t) => {
                LO(e) && t.preventDefault();
              }),
                e.on("ObjectSelected", (t) => {
                  LO(e) && t.preventDefault();
                });
            })(e),
            {
              isReadOnly: () => LO(e),
              set: (o) =>
                ((e, t, n, o) => {
                  if (o !== n.get()) {
                    if (!ke(t, o))
                      throw new Error(`Editor mode '${o}' is invalid`);
                    e.initialized
                      ? JO(e, n, t, o)
                      : e.on("init", () => JO(e, n, t, o));
                  }
                })(e, n.get(), t, o),
              get: () => t.get(),
              register: (e, t) => {
                n.set(
                  ((e, t, n) => {
                    if (H(QO, t))
                      throw new Error(`Cannot override default mode ${t}`);
                    return {
                      ...e,
                      [t]: {
                        ...n,
                        deactivate: () => {
                          try {
                            n.deactivate();
                          } catch (e) {
                            console.error(
                              `problem while deactivating editor mode ${t}:`,
                              e
                            );
                          }
                        },
                      },
                    };
                  })(n.get(), e, t)
                );
              },
            }
          );
        })(o)),
        n.dispatch("SetupEditor", { editor: this });
      const g = Xd(o);
      w(g) && g.call(o, o);
    }
    render() {
      ((e) => {
        const t = e.id;
        ha.setCode(dd(e));
        const n = () => {
          nO.unbind(window, "ready", n), e.render();
        };
        if (!Js.Event.domLoaded) return void nO.bind(window, "ready", n);
        if (!e.getElement()) return;
        const o = Cn(e.getElement()),
          r = sn(o);
        e.on("remove", () => {
          W(o.dom.attributes, (e) => rn(o, e.name)), en(o, r);
        }),
          (e.ui.styleSheetLoader = ((e, t) =>
            es.forElement(e, { contentCssCors: Hd(t), referrerPolicy: ld(t) }))(
            o,
            e
          )),
          Pd(e)
            ? (e.inline = !0)
            : ((e.orgVisibility = e.getElement().style.visibility),
              (e.getElement().style.visibility = "hidden"));
        const s = e.getElement().form || nO.getParent(t, "form");
        s &&
          ((e.formElement = s),
          Dd(e) &&
            !lr(e.getElement()) &&
            (nO.insertAfter(nO.create("input", { type: "hidden", name: t }), t),
            (e.hasHiddenInput = !0)),
          (e.formEventDelegate = (t) => {
            e.dispatch(t.type, t);
          }),
          nO.bind(s, "submit reset", e.formEventDelegate),
          e.on("reset", () => {
            e.resetContent();
          }),
          !Ld(e) ||
            s.submit.nodeType ||
            s.submit.length ||
            s._mceOldSubmit ||
            ((s._mceOldSubmit = s.submit),
            (s.submit = () => (
              e.editorManager.triggerSave(), e.setDirty(!1), s._mceOldSubmit(s)
            )))),
          (e.windowManager = zw(e)),
          (e.notificationManager = Iw(e)),
          ((e) => "xml" === e.options.get("encoding"))(e) &&
            e.on("GetContent", (e) => {
              e.save && (e.content = nO.encode(e.content));
            }),
          Md(e) &&
            e.on("submit", () => {
              e.initialized && e.save();
            }),
          Id(e) &&
            ((e._beforeUnload = () => {
              !e.initialized ||
                e.destroyed ||
                e.isHidden() ||
                e.save({ format: "raw", no_events: !0, set_dirty: !1 });
            }),
            e.editorManager.on("BeforeUnload", e._beforeUnload)),
          e.editorManager.add(e),
          sO(e, e.suffix);
      })(this);
    }
    focus(e) {
      this.execCommand("mceFocus", !1, e);
    }
    hasFocus() {
      return zg(this);
    }
    translate(e) {
      return ha.translate(e);
    }
    getParam(e, t, n) {
      const o = this.options;
      return (
        o.isRegistered(e) ||
          (C(n)
            ? o.register(e, { processor: n, default: t })
            : o.register(e, { processor: M, default: t })),
        o.isSet(e) || v(t) ? o.get(e) : t
      );
    }
    hasPlugin(e, t) {
      return !(!H($d(this), e) || (t && void 0 === Fw.get(e)));
    }
    nodeChanged(e) {
      this._nodeChangeDispatcher.nodeChanged(e);
    }
    addCommand(e, t, n) {
      this.editorCommands.addCommand(e, t, n);
    }
    addQueryStateHandler(e, t, n) {
      this.editorCommands.addQueryStateHandler(e, t, n);
    }
    addQueryValueHandler(e, t, n) {
      this.editorCommands.addQueryValueHandler(e, t, n);
    }
    addShortcut(e, t, n, o) {
      this.shortcuts.add(e, t, n, o);
    }
    execCommand(e, t, n, o) {
      return this.editorCommands.execCommand(e, t, n, o);
    }
    queryCommandState(e) {
      return this.editorCommands.queryCommandState(e);
    }
    queryCommandValue(e) {
      return this.editorCommands.queryCommandValue(e);
    }
    queryCommandSupported(e) {
      return this.editorCommands.queryCommandSupported(e);
    }
    show() {
      const e = this;
      e.hidden &&
        ((e.hidden = !1),
        e.inline
          ? (e.getBody().contentEditable = "true")
          : (iB.show(e.getContainer()), iB.hide(e.id)),
        e.load(),
        e.dispatch("show"));
    }
    hide() {
      const e = this;
      e.hidden ||
        (e.save(),
        e.inline
          ? ((e.getBody().contentEditable = "false"),
            e === e.editorManager.focusedEditor &&
              (e.editorManager.focusedEditor = null))
          : (iB.hide(e.getContainer()),
            iB.setStyle(e.id, "display", e.orgDisplay)),
        (e.hidden = !0),
        e.dispatch("hide"));
    }
    isHidden() {
      return this.hidden;
    }
    setProgressState(e, t) {
      this.dispatch("ProgressState", { state: e, time: t });
    }
    load(e = {}) {
      const t = this,
        n = t.getElement();
      if (t.removed) return "";
      if (n) {
        const o = { ...e, load: !0 },
          r = lr(n) ? n.value : n.innerHTML,
          s = t.setContent(r, o);
        return (
          o.no_events || t.dispatch("LoadContent", { ...o, element: n }), s
        );
      }
      return "";
    }
    save(e = {}) {
      const t = this;
      let n = t.getElement();
      if (!n || !t.initialized || t.removed) return "";
      const o = { ...e, save: !0, element: n };
      let r = t.getContent(o);
      const s = { ...o, content: r };
      if (
        (s.no_events || t.dispatch("SaveContent", s),
        "raw" === s.format && t.dispatch("RawSaveContent", s),
        (r = s.content),
        lr(n))
      )
        n.value = r;
      else {
        (!e.is_removing && t.inline) || (n.innerHTML = r);
        const o = iB.getParent(t.id, "form");
        o && dB(o.elements, (e) => e.name !== t.id || ((e.value = r), !1));
      }
      return (
        (s.element = o.element = n = null),
        !1 !== s.set_dirty && t.setDirty(!1),
        r
      );
    }
    setContent(e, t) {
      return pw(this, e, t);
    }
    getContent(e) {
      return ((e, t = {}) => {
        const n = ((e, t) => ({ ...e, format: t, get: !0, getInner: !0 }))(
          t,
          t.format ? t.format : "html"
        );
        return SC(e, n).fold(R, (t) => {
          const n = ((e, t) => rw(e).editor.getContent(t))(e, t);
          return NC(e, n, t);
        });
      })(this, e);
    }
    insertContent(e, t) {
      t && (e = lB({ content: e }, t)),
        this.execCommand("mceInsertContent", !1, e);
    }
    resetContent(e) {
      void 0 === e
        ? pw(this, this.startContent, { format: "raw" })
        : pw(this, e),
        this.undoManager.reset(),
        this.setDirty(!1),
        this.nodeChanged();
    }
    isDirty() {
      return !this.isNotDirty;
    }
    setDirty(e) {
      const t = !this.isNotDirty;
      (this.isNotDirty = !e), e && e !== t && this.dispatch("dirty");
    }
    getContainer() {
      const e = this;
      return (
        e.container ||
          (e.container = e.editorContainer || iB.get(e.id + "_parent")),
        e.container
      );
    }
    getContentAreaContainer() {
      return this.contentAreaContainer;
    }
    getElement() {
      return (
        this.targetElm || (this.targetElm = iB.get(this.id)), this.targetElm
      );
    }
    getWin() {
      const e = this;
      if (!e.contentWindow) {
        const t = e.iframeElement;
        t && (e.contentWindow = t.contentWindow);
      }
      return e.contentWindow;
    }
    getDoc() {
      const e = this;
      if (!e.contentDocument) {
        const t = e.getWin();
        t && (e.contentDocument = t.document);
      }
      return e.contentDocument;
    }
    getBody() {
      var e, t;
      const n = this.getDoc();
      return null !==
        (t =
          null !== (e = this.bodyElement) && void 0 !== e
            ? e
            : null == n
            ? void 0
            : n.body) && void 0 !== t
        ? t
        : null;
    }
    convertURL(e, t, n) {
      const o = this,
        r = o.options.get,
        s = Qd(o);
      if (w(s)) return s.call(o, e, n, !0, t);
      if (
        !r("convert_urls") ||
        "link" === n ||
        (f(n) && "LINK" === n.nodeName) ||
        0 === e.indexOf("file:") ||
        0 === e.length
      )
        return e;
      const a = new dC(e);
      return "http" !== a.protocol &&
        "https" !== a.protocol &&
        "" !== a.protocol
        ? e
        : r("relative_urls")
        ? o.documentBaseURI.toRelative(e)
        : (e = o.documentBaseURI.toAbsolute(e, r("remove_script_host")));
    }
    addVisual(e) {
      ((e, t) => {
        ((e, t) => {
          sw(e).editor.addVisual(t);
        })(e, t);
      })(this, e);
    }
    setEditableRoot(e) {
      ((e, t) => {
        e._editableRoot !== t &&
          ((e._editableRoot = t),
          e.readonly ||
            ((e.getBody().contentEditable = String(e.hasEditableRoot())),
            e.nodeChanged()),
          ((e, t) => {
            e.dispatch("EditableRootStateChange", { state: t });
          })(e, t));
      })(this, e);
    }
    hasEditableRoot() {
      return this._editableRoot;
    }
    remove() {
      ((e) => {
        if (!e.removed) {
          const { _selectionOverrides: t, editorUpload: n } = e,
            o = e.getBody(),
            r = e.getElement();
          o && e.save({ is_removing: !0 }),
            (e.removed = !0),
            e.unbindAllNativeEvents(),
            e.hasHiddenInput &&
              C(null == r ? void 0 : r.nextSibling) &&
              Nw.remove(r.nextSibling),
            ((e) => {
              e.dispatch("remove");
            })(e),
            e.editorManager.remove(e),
            !e.inline &&
              o &&
              ((e) => {
                Nw.setStyle(e.id, "display", e.orgDisplay);
              })(e),
            ((e) => {
              e.dispatch("detach");
            })(e),
            Nw.remove(e.getContainer()),
            Rw(t),
            Rw(n),
            e.destroy();
        }
      })(this);
    }
    destroy(e) {
      ((e, t) => {
        const { selection: n, dom: o } = e;
        e.destroyed ||
          (t || e.removed
            ? (t ||
                (e.editorManager.off("beforeunload", e._beforeUnload),
                e.theme && e.theme.destroy && e.theme.destroy(),
                Rw(n),
                Rw(o)),
              ((e) => {
                const t = e.formElement;
                t &&
                  (t._mceOldSubmit &&
                    ((t.submit = t._mceOldSubmit), delete t._mceOldSubmit),
                  Nw.unbind(t, "submit reset", e.formEventDelegate));
              })(e),
              ((e) => {
                const t = e;
                (t.contentAreaContainer =
                  t.formElement =
                  t.container =
                  t.editorContainer =
                    null),
                  (t.bodyElement = t.contentDocument = t.contentWindow = null),
                  (t.iframeElement = t.targetElm = null);
                const n = e.selection;
                if (n) {
                  const e = n.dom;
                  t.selection = n.win = n.dom = e.doc = null;
                }
              })(e),
              (e.destroyed = !0))
            : e.remove());
      })(this, e);
    }
    uploadImages() {
      return this.editorUpload.uploadImages();
    }
    _scanForImages() {
      return this.editorUpload.scanForImages();
    }
  }
  const uB = da.DOM,
    mB = Dt.each;
  let fB,
    gB = !1,
    pB = [];
  const hB = (e) => {
      const t = e.type;
      mB(CB.get(), (n) => {
        switch (t) {
          case "scroll":
            n.dispatch("ScrollWindow", e);
            break;
          case "resize":
            n.dispatch("ResizeWindow", e);
        }
      });
    },
    bB = (e) => {
      if (e !== gB) {
        const t = da.DOM;
        e
          ? (t.bind(window, "resize", hB), t.bind(window, "scroll", hB))
          : (t.unbind(window, "resize", hB), t.unbind(window, "scroll", hB)),
          (gB = e);
      }
    },
    vB = (e) => {
      const t = pB;
      return (
        (pB = Y(pB, (t) => e !== t)),
        CB.activeEditor === e &&
          (CB.activeEditor = pB.length > 0 ? pB[0] : null),
        CB.focusedEditor === e && (CB.focusedEditor = null),
        t.length !== pB.length
      );
    },
    yB = "CSS1Compat" !== document.compatMode,
    CB = {
      ...jO,
      baseURI: null,
      baseURL: null,
      defaultOptions: {},
      documentBaseURL: null,
      suffix: null,
      majorVersion: "7",
      minorVersion: "0.0",
      releaseDate: "2024-03-20",
      i18n: ha,
      activeEditor: null,
      focusedEditor: null,
      setup() {
        const e = this;
        let t = "",
          n = "",
          o = dC.getDocumentBaseUrl(document.location);
        /^[^:]+:\/\/\/?[^\/]+\//.test(o) &&
          ((o = o.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, "")),
          /[\/\\]$/.test(o) || (o += "/"));
        const r = window.tinymce || window.tinyMCEPreInit;
        if (r) (t = r.base || r.baseURL), (n = r.suffix);
        else {
          const e = document.getElementsByTagName("script");
          for (let o = 0; o < e.length; o++) {
            const r = e[o].src || "";
            if ("" === r) continue;
            const s = r.substring(r.lastIndexOf("/"));
            if (/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(r)) {
              -1 !== s.indexOf(".min") && (n = ".min"),
                (t = r.substring(0, r.lastIndexOf("/")));
              break;
            }
          }
          if (!t && document.currentScript) {
            const e = document.currentScript.src;
            -1 !== e.indexOf(".min") && (n = ".min"),
              (t = e.substring(0, e.lastIndexOf("/")));
          }
        }
        var s;
        (e.baseURL = new dC(o).toAbsolute(t)),
          (e.documentBaseURL = o),
          (e.baseURI = new dC(e.baseURL)),
          (e.suffix = n),
          (s = e).on("AddEditor", T(Mg, s)),
          s.on("RemoveEditor", T(Ig, s));
      },
      overrideDefaults(e) {
        const t = e.base_url;
        t && this._setBaseUrl(t);
        const n = e.suffix;
        n && (this.suffix = n), (this.defaultOptions = e);
        const o = e.plugin_base_urls;
        void 0 !== o &&
          pe(o, (e, t) => {
            ba.PluginManager.urls[t] = e;
          });
      },
      init(e) {
        const t = this;
        let n;
        const o = Dt.makeMap(
          "area base basefont br col frame hr img input isindex link meta param embed source wbr track colgroup option table tbody tfoot thead tr th td script noscript style textarea video audio iframe object menu",
          " "
        );
        let r = (e) => {
          n = e;
        };
        const s = () => {
          let n = 0;
          const a = [];
          let i;
          uB.unbind(window, "ready", s),
            ((n) => {
              const o = e.onpageload;
              o && o.apply(t, []);
            })(),
            (i = me(
              ((e) =>
                Tt.browser.isIE() || Tt.browser.isEdge()
                  ? (qw(
                      "TinyMCE does not support the browser you are using. For a list of supported browsers please see: https://www.tiny.cloud/docs/tinymce/6/support/#supportedwebbrowsers"
                    ),
                    [])
                  : yB
                  ? (qw(
                      "Failed to initialize the editor as the document is not in standards mode. TinyMCE requires standards mode."
                    ),
                    [])
                  : m(e.selector)
                  ? uB.select(e.selector)
                  : C(e.target)
                  ? [e.target]
                  : [])(e)
            )),
            Dt.each(i, (e) => {
              var n;
              (n = t.get(e.id)) &&
                n.initialized &&
                !(n.getContainer() || n.getBody()).parentNode &&
                (vB(n),
                n.unbindAllNativeEvents(),
                n.destroy(!0),
                (n.removed = !0));
            }),
            (i = Dt.grep(i, (e) => !t.get(e.id))),
            0 === i.length
              ? r([])
              : mB(i, (s) => {
                  ((e, t) => e.inline && t.tagName.toLowerCase() in o)(e, s)
                    ? qw(
                        "Could not initialize inline editor on invalid inline target element",
                        s
                      )
                    : ((e, o, s) => {
                        const l = new cB(e, o, t);
                        a.push(l),
                          l.on("init", () => {
                            ++n === i.length && r(a);
                          }),
                          (l.targetElm = l.targetElm || s),
                          l.render();
                      })(
                        ((e) => {
                          let t = e.id;
                          return (
                            t ||
                              ((t = Ee(e, "name")
                                .filter((e) => !uB.get(e))
                                .getOrThunk(uB.uniqueId)),
                              e.setAttribute("id", t)),
                            t
                          );
                        })(s),
                        e,
                        s
                      );
                });
        };
        return (
          uB.bind(window, "ready", s),
          new Promise((e) => {
            n
              ? e(n)
              : (r = (t) => {
                  e(t);
                });
          })
        );
      },
      get(e) {
        return 0 === arguments.length
          ? pB.slice(0)
          : m(e)
          ? Q(pB, (t) => t.id === e).getOr(null)
          : x(e) && pB[e]
          ? pB[e]
          : null;
      },
      add(e) {
        const t = this,
          n = t.get(e.id);
        return (
          n === e ||
            (null === n && pB.push(e),
            bB(!0),
            (t.activeEditor = e),
            t.dispatch("AddEditor", { editor: e }),
            fB ||
              ((fB = (e) => {
                const n = t.dispatch("BeforeUnload");
                if (n.returnValue)
                  return (
                    e.preventDefault(),
                    (e.returnValue = n.returnValue),
                    n.returnValue
                  );
              }),
              window.addEventListener("beforeunload", fB))),
          e
        );
      },
      createEditor(e, t) {
        return this.add(new cB(e, t, this));
      },
      remove(e) {
        const t = this;
        let n;
        if (e) {
          if (!m(e))
            return (
              (n = e),
              h(t.get(n.id))
                ? null
                : (vB(n) && t.dispatch("RemoveEditor", { editor: n }),
                  0 === pB.length &&
                    window.removeEventListener("beforeunload", fB),
                  n.remove(),
                  bB(pB.length > 0),
                  n)
            );
          mB(uB.select(e), (e) => {
            (n = t.get(e.id)), n && t.remove(n);
          });
        } else for (let e = pB.length - 1; e >= 0; e--) t.remove(pB[e]);
      },
      execCommand(e, t, n) {
        var o;
        const r = this,
          s = f(n) ? (null !== (o = n.id) && void 0 !== o ? o : n.index) : n;
        switch (e) {
          case "mceAddEditor":
            if (!r.get(s)) {
              const e = n.options;
              new cB(s, e, r).render();
            }
            return !0;
          case "mceRemoveEditor": {
            const e = r.get(s);
            return e && e.remove(), !0;
          }
          case "mceToggleEditor": {
            const e = r.get(s);
            return e
              ? (e.isHidden() ? e.show() : e.hide(), !0)
              : (r.execCommand("mceAddEditor", !1, n), !0);
          }
        }
        return !!r.activeEditor && r.activeEditor.execCommand(e, t, n);
      },
      triggerSave: () => {
        mB(pB, (e) => {
          e.save();
        });
      },
      addI18n: (e, t) => {
        ha.add(e, t);
      },
      translate: (e) => ha.translate(e),
      setActive(e) {
        const t = this.activeEditor;
        this.activeEditor !== e &&
          (t && t.dispatch("deactivate", { relatedTarget: e }),
          e.dispatch("activate", { relatedTarget: t })),
          (this.activeEditor = e);
      },
      _setBaseUrl(e) {
        (this.baseURL = new dC(this.documentBaseURL).toAbsolute(
          e.replace(/\/+$/, "")
        )),
          (this.baseURI = new dC(this.baseURL));
      },
    };
  CB.setup();
  const wB = (() => {
      const e = ya();
      return {
        FakeClipboardItem: (e) => ({
          items: e,
          types: fe(e),
          getType: (t) => Ee(e, t).getOrUndefined(),
        }),
        write: (t) => {
          e.set(t);
        },
        read: () => e.get().getOrUndefined(),
        clear: e.clear,
      };
    })(),
    xB = Math.min,
    EB = Math.max,
    kB = Math.round,
    _B = (e, t, n) => {
      let o = t.x,
        r = t.y;
      const s = e.w,
        a = e.h,
        i = t.w,
        l = t.h,
        d = (n || "").split("");
      return (
        "b" === d[0] && (r += l),
        "r" === d[1] && (o += i),
        "c" === d[0] && (r += kB(l / 2)),
        "c" === d[1] && (o += kB(i / 2)),
        "b" === d[3] && (r -= a),
        "r" === d[4] && (o -= s),
        "c" === d[3] && (r -= kB(a / 2)),
        "c" === d[4] && (o -= kB(s / 2)),
        SB(o, r, s, a)
      );
    },
    SB = (e, t, n, o) => ({ x: e, y: t, w: n, h: o }),
    NB = {
      inflate: (e, t, n) => SB(e.x - t, e.y - n, e.w + 2 * t, e.h + 2 * n),
      relativePosition: _B,
      findBestRelativePosition: (e, t, n, o) => {
        for (let r = 0; r < o.length; r++) {
          const s = _B(e, t, o[r]);
          if (
            s.x >= n.x &&
            s.x + s.w <= n.w + n.x &&
            s.y >= n.y &&
            s.y + s.h <= n.h + n.y
          )
            return o[r];
        }
        return null;
      },
      intersect: (e, t) => {
        const n = EB(e.x, t.x),
          o = EB(e.y, t.y),
          r = xB(e.x + e.w, t.x + t.w),
          s = xB(e.y + e.h, t.y + t.h);
        return r - n < 0 || s - o < 0 ? null : SB(n, o, r - n, s - o);
      },
      clamp: (e, t, n) => {
        let o = e.x,
          r = e.y,
          s = e.x + e.w,
          a = e.y + e.h;
        const i = t.x + t.w,
          l = t.y + t.h,
          d = EB(0, t.x - o),
          c = EB(0, t.y - r),
          u = EB(0, s - i),
          m = EB(0, a - l);
        return (
          (o += d),
          (r += c),
          n && ((s += d), (a += c), (o -= u), (r -= m)),
          (s -= u),
          (a -= m),
          SB(o, r, s - o, a - r)
        );
      },
      create: SB,
      fromClientRect: (e) => SB(e.left, e.top, e.width, e.height),
    },
    RB = (() => {
      const e = {},
        t = {},
        n = {};
      return {
        load: (n, o) => {
          const r = `Script at URL "${o}" failed to load`,
            s = `Script at URL "${o}" did not call \`tinymce.Resource.add('${n}', data)\` within 1 second`;
          if (void 0 !== e[n]) return e[n];
          {
            const a = new Promise((e, a) => {
              const i = ((e, t, n = 1e3) => {
                let o = !1,
                  r = null;
                const s =
                    (e) =>
                    (...t) => {
                      o ||
                        ((o = !0),
                        null !== r && (clearTimeout(r), (r = null)),
                        e.apply(null, t));
                    },
                  a = s(e),
                  i = s(t);
                return {
                  start: (...e) => {
                    o ||
                      null !== r ||
                      (r = setTimeout(() => i.apply(null, e), n));
                  },
                  resolve: a,
                  reject: i,
                };
              })(e, a);
              (t[n] = i.resolve),
                ua.ScriptLoader.loadScript(o).then(
                  () => i.start(s),
                  () => i.reject(r)
                );
            });
            return (e[n] = a), a;
          }
        },
        add: (o, r) => {
          void 0 !== t[o] && (t[o](r), delete t[o]),
            (e[o] = Promise.resolve(r)),
            (n[o] = r);
        },
        has: (e) => e in n,
        get: (e) => n[e],
        unload: (t) => {
          delete e[t], delete n[t];
        },
      };
    })();
  let AB;
  try {
    const e = "__storage_test__";
    (AB = window.localStorage), AB.setItem(e, e), AB.removeItem(e);
  } catch (e) {
    AB = (() => {
      let e = {},
        t = [];
      const n = {
        getItem: (t) => e[t] || null,
        setItem: (n, o) => {
          t.push(n), (e[n] = String(o));
        },
        key: (e) => t[e],
        removeItem: (n) => {
          (t = t.filter((e) => e === n)), delete e[n];
        },
        clear: () => {
          (t = []), (e = {});
        },
        length: 0,
      };
      return (
        Object.defineProperty(n, "length", {
          get: () => t.length,
          configurable: !1,
          enumerable: !1,
        }),
        n
      );
    })();
  }
  const TB = {
      geom: { Rect: NB },
      util: {
        Delay: Tg,
        Tools: Dt,
        VK: yf,
        URI: dC,
        EventDispatcher: UO,
        Observable: jO,
        I18n: ha,
        LocalStorage: AB,
        ImageUploader: (e) => {
          const t = Gw(),
            n = Jw(e, t);
          return { upload: (t, o = !0) => n.upload(t, o ? Qw(e) : void 0) };
        },
      },
      dom: {
        EventUtils: Js,
        TreeWalker: Vo,
        TextSeeker: Ua,
        DOMUtils: da,
        ScriptLoader: ua,
        RangeUtils: Zf,
        Serializer: gw,
        StyleSheetLoader: Jr,
        ControlSelection: kf,
        BookmarkManager: cf,
        Selection: uw,
        Event: Js.Event,
      },
      html: {
        Styles: Vs,
        Entities: bs,
        Node: Jg,
        Schema: Ds,
        DomParser: EC,
        Writer: bp,
        Serializer: vp,
      },
      Env: Tt,
      AddOnManager: ba,
      Annotator: df,
      Formatter: ux,
      UndoManager: fx,
      EditorCommands: OO,
      WindowManager: zw,
      NotificationManager: Iw,
      EditorObservable: KO,
      Shortcuts: sB,
      Editor: cB,
      FocusManager: Ag,
      EditorManager: CB,
      DOM: da.DOM,
      ScriptLoader: ua.ScriptLoader,
      PluginManager: Fw,
      ThemeManager: Uw,
      ModelManager: Tw,
      IconManager: Aw,
      Resource: RB,
      FakeClipboard: wB,
      trim: Dt.trim,
      isArray: Dt.isArray,
      is: Dt.is,
      toArray: Dt.toArray,
      makeMap: Dt.makeMap,
      each: Dt.each,
      map: Dt.map,
      grep: Dt.grep,
      inArray: Dt.inArray,
      extend: Dt.extend,
      walk: Dt.walk,
      resolve: Dt.resolve,
      explode: Dt.explode,
      _addCacheSuffix: Dt._addCacheSuffix,
    },
    OB = Dt.extend(CB, TB);
  ((e) => {
    (window.tinymce = e), (window.tinyMCE = e);
  })(OB),
    ((e) => {
      if ("object" == typeof module)
        try {
          module.exports = e;
        } catch (e) {}
    })(OB);
})();
tinymce.overrideDefaults({ promotion: false });

/* Ephox Fluffy plugin
 *
 * Copyright 2010-2016 Ephox Corporation.  All rights reserved.
 *
 * Version: 2.9.0-18
 */

!(function () {
  "use strict";
  function n(r) {
    return function (n) {
      return (
        (t = typeof (n = n)),
        (null === n
          ? "null"
          : "object" == t &&
            (Array.prototype.isPrototypeOf(n) ||
              (n.constructor && "Array" === n.constructor.name))
          ? "array"
          : "object" == t &&
            (String.prototype.isPrototypeOf(n) ||
              (n.constructor && "String" === n.constructor.name))
          ? "string"
          : t) === r
      );
      var t;
    };
  }
  function t(n, t) {
    return { isRequired: n, applyPatch: t };
  }
  function u(e, o) {
    return function () {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      var r = o.apply(this, n),
        r = v(r) ? n : r;
      return e.apply(this, r);
    };
  }
  function r() {
    return d;
  }
  function i(n, t) {
    for (var r = 0, e = n.length; r < e; r++) t(n[r], r);
  }
  function e(n, t) {
    for (
      var r = (function (n, t) {
          for (var r = n.length, e = new Array(r), o = 0; o < r; o++) {
            var i = n[o];
            e[o] = t(i, o);
          }
          return e;
        })(n, t),
        e = [],
        o = 0,
        i = r.length;
      o < i;
      ++o
    ) {
      if (!g(r[o]))
        throw new Error(
          "Arr.flatten item " + o + " was not an array, input: " + r
        );
      L.apply(e, r[o]);
    }
    return e;
  }
  function a(r) {
    return function (n, t) {
      r[t] = n;
    };
  }
  function o(c) {
    return function () {
      for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
      if (0 === n.length) throw new Error("Can't merge zero objects");
      for (var r, e, o = {}, i = 0; i < n.length; i++) {
        var u,
          a = n[i];
        for (u in a) (r = a), (e = u), k.call(r, e) && (o[u] = c(o[u], a[u]));
      }
      return o;
    };
  }
  function c(n) {
    var t;
    return null != (t = n.defaultOptions) ? t : n.defaultSettings;
  }
  function f(n, t) {
    var n = E(n, t),
      r = x(t.plugins),
      e = n.custom_plugin_urls || {},
      e = q(e, function (n, t) {
        return U(r, t);
      }),
      n = n.external_plugins || {},
      o = {},
      e =
        (b(e.t, function (n, t) {
          o[t] = n;
        }),
        M(o, n)),
      n = 0 === w(e).length ? {} : { external_plugins: e };
    return M(t, n);
  }
  var l,
    s,
    d,
    p = n("object"),
    g = n("array"),
    v =
      ((l = void 0),
      function (n) {
        return l === n;
      }),
    y =
      ((s = "function"),
      function (n) {
        return typeof n === s;
      }),
    m = "undefined" != typeof window ? window : Function("return this;")(),
    h = ((d = !0), Array.prototype.indexOf),
    L = Array.prototype.push,
    U = function (n, t) {
      return -1 < h.call(n, t);
    },
    w = Object.keys,
    k = Object.hasOwnProperty,
    b = function (n, t) {
      for (var r = w(n), e = 0, o = r.length; e < o; e++) {
        var i = r[e];
        t(n[i], i);
      }
    },
    q = function (n, t) {
      var r,
        e,
        o,
        i = {},
        u = {};
      return (
        (r = t),
        (e = a(i)),
        (o = a(u)),
        b(n, function (n, t) {
          (r(n, t) ? e : o)(n, t);
        }),
        { t: i, f: u }
      );
    },
    E = o(function (n, t) {
      return p(n) && p(t) ? E(n, t) : t;
    }),
    M = o(function (n, t) {
      return t;
    }),
    x = function (n) {
      if (v(n) || "" === n) return [];
      n = g(n)
        ? e(n, function (n) {
            return n.split(/[\s+,]/);
          })
        : n.split(/[\s+,]/);
      return e(n, function (n) {
        return 0 < n.length ? [n.trim()] : [];
      });
    },
    V = t(r, function (r) {
      var n = r.EditorManager;
      (n.init = u(n.init, function (n) {
        return [f(c(r), n)];
      })),
        (n.createEditor = u(n.createEditor, function (n, t) {
          return [n, f(c(r), t)];
        }));
    });
  function A(n, t, r) {
    if (r || 2 === arguments.length)
      for (var e, o = 0, i = t.length; o < i; o++)
        (!e && o in t) ||
          ((e = e || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
    return n.concat(e || Array.prototype.slice.call(t));
  }
  function j(n) {
    return parseInt(n, 10);
  }
  function S(n, t) {
    return 0 == (n -= t) ? 0 : 0 < n ? 1 : -1;
  }
  function O(n, t, r) {
    return { major: n, minor: t, patch: r };
  }
  function I(e, o) {
    return function (n) {
      var t = x(n.plugins),
        r = G(o),
        r = 0 < r.length ? t.concat(r) : t;
      return [e.util.Tools.extend({}, n, { plugins: r })];
    };
  }
  function _(n, t) {
    D(t, ".tox-notifications-container", "block"),
      C(n, "6.0.0") && D(t, ".tox-notification", "-ms-grid"),
      D(t, ".tox-notification", "grid"),
      D(t, ".mce-notification", "block");
  }
  function P() {
    return new Date().getTime();
  }
  function z(r) {
    return function () {
      n = "position";
      var n,
        t = (
          ((t = r).currentStyle || window.getComputedStyle(t, null))[n] || ""
        ).toLowerCase();
      return "absolute" === t || "fixed" === t;
    };
  }
  function R(n) {
    n.parentNode.removeChild(n);
  }
  function B(n) {
    var t = n,
      r = [J, K, Y, Z, H, V];
    if (t)
      for (var e = 0; e < r.length; e++)
        r[e].isRequired(t) && r[e].applyPatch(t);
  }
  var N = function (n) {
      n = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(n);
      return n ? O(j(n[1]), j(n[2]), j(n[3])) : O(0, 0, 0);
    },
    F = function (n, t) {
      var r = S(n.major, t.major);
      if (0 !== r) return r;
      r = S(n.minor, t.minor);
      if (0 !== r) return r;
      r = S(n.patch, t.patch);
      return 0 !== r ? r : 0;
    },
    $ = function (n) {
      return N(
        [n.majorVersion, n.minorVersion]
          .join(".")
          .split(".")
          .slice(0, 3)
          .join(".")
      );
    },
    C = function (n, t) {
      return !!n && -1 === F($(n), N(t));
    },
    G = function (n) {
      n = c(n).forced_plugins;
      return n || [];
    },
    H = t(
      function (n) {
        return C(n, "4.7.0");
      },
      function (n) {
        var r = n,
          e = r.EditorManager;
        (e.init = u(e.init, I(r, e))),
          (e.createEditor = u(e.createEditor, function (n, t) {
            return A([n], I(r, e)(t), !0);
          }));
      }
    ),
    T = "readonly",
    J = t(r, function (r) {
      Object.defineProperty(r, "forceReadOnly", {
        value: function () {
          r.on("AddEditor", function (n) {
            var t = n.editor;
            t.options
              ? t.options.set("readonly", !0)
              : t.settings && (t.settings.readonly = !0),
              t.on("init", function () {
                t.on("SwitchMode", function (n) {
                  n.mode !== T &&
                    (t.mode
                      ? t.mode.set(T)
                      : t.setMode &&
                        r.util.Promise.resolve().then(function () {
                          t.setMode(T);
                        }));
                });
              });
          });
        },
      });
    }),
    D = function (e, n, o) {
      n = document.querySelectorAll(n);
      i(n, function (n) {
        var t, r;
        "none" === window.getComputedStyle(n).display &&
          ((r = n.style.cssText),
          (t = "display:".concat(o, " !important;")),
          (n.style.cssText = r ? "".concat(r, ";").concat(t) : t),
          (n = e).theme &&
            n.notificationManager &&
            ((r = n.notificationManager.getNotifications()),
            y(n.theme.getNotificationManagerImpl) &&
              y(n.theme.getNotificationManagerImpl().reposition) &&
              n.theme.getNotificationManagerImpl().reposition(r),
            i(r, function (n) {
              y(n.reposition) && n.reposition();
            })));
      });
    },
    K = t(
      function (n) {
        return !0;
      },
      function (r) {
        C(r, "5.6.0")
          ? r.on("AddEditor", function (n) {
              var t = n.editor;
              t.on("SkinLoaded", function () {
                setTimeout(function () {
                  t.removed || _(r, t);
                }, 0);
              });
            })
          : r.on("AddEditor", function (n) {
              var t = n.editor;
              t.on("OpenNotification", function () {
                _(r, t);
              });
            });
      }
    ),
    Q = function (n, t, r, e, o) {
      var i = P(),
        u = setInterval(function () {
          n() && (clearInterval(u), t()),
            P() - i > o && (clearInterval(u), r());
        }, e);
    },
    W = function (n, t) {
      ((r = document.createElement("div")).style.display = "none"),
        (r.className = "mce-floatpanel");
      var r,
        e = r;
      document.body.appendChild(e),
        Q(
          z(e),
          function () {
            R(e), n();
          },
          function () {
            R(e), t();
          },
          10,
          5e3
        );
    },
    X = function (n, t) {
      n.notificationManager
        ? n.notificationManager.open({
            text: t,
            type: "warning",
            timeout: 0,
            icon: "",
          })
        : n.windowManager.alert(t);
    },
    Y = t(
      function (n) {
        return "function" != typeof n.overrideDefaults;
      },
      function (n) {
        var t,
          e,
          r = n,
          o = r.EditorManager,
          i =
            (r.EditorManager.on("AddEditor", function (n) {
              var t = n.editor,
                r = t.settings.service_message;
              r &&
                W(
                  function () {
                    X(t, r);
                  },
                  function () {
                    window.alert(r);
                  }
                );
            }),
            (t = r),
            function (n) {
              return [t.util.Tools.extend({}, this.defaultSettings, n)];
            });
        (n.overrideDefaults =
          ((e = r),
          function (n) {
            var t = e.util.URI,
              r = n.base_url,
              r =
                (r &&
                  ((this.baseURL = new t(this.documentBaseURL).toAbsolute(
                    r.replace(/\/+$/, "")
                  )),
                  (this.baseURI = new t(this.baseURL))),
                n.suffix);
            r && (this.suffix = r), (this.defaultSettings = n);
          })),
          (o.init = u(o.init, i)),
          (o.createEditor = u(o.createEditor, function (n, t) {
            return A([n], i.call(o, t), !0);
          }));
      }
    ),
    Z = t(
      function (n) {
        return C(n, "4.5.0");
      },
      function (n) {
        var e;
        n.overrideDefaults = u(
          n.overrideDefaults,
          ((e = n),
          function (n) {
            var t,
              r = n.plugin_base_urls;
            for (t in r) e.PluginManager.urls[t] = r[t];
          })
        );
      }
    );
  B(m.tinymce);
})();

(function tcsl(cloudSettings, consoleMessage, forceReadOnly) {
  var entryUrl =
    document.currentScript != null &&
    typeof document.currentScript.src === "string"
      ? document.currentScript.src
      : null;
  var origin = window.location.origin;
  function emitConsoleMessage(msg) {
    console.warn(
      msg +
        "\n\n↓↓↓↓↓ ATTENTION ADMINS ↓↓↓↓↓" +
        "\nPlease include these details in Tiny Cloud support requests." +
        "\nResolved API key: " +
        cloudSettings["api_key"] +
        "\nEditor read-only?: " +
        (forceReadOnly ? "yes" : "no") +
        "\nOrigin: " +
        origin +
        "\nTiny Cloud entry URL: " +
        entryUrl +
        "\n↑↑↑↑↑ ---------------- ↑↑↑↑↑"
    );
  }
  if (forceReadOnly) {
    tinymce.forceReadOnly();
    console.error(
      "All created TinyMCE editors are configured to be read-only."
    );
  }
  if (consoleMessage != "") {
    emitConsoleMessage(consoleMessage);
  }
  cloudSettings["tiny_cloud_entry_url"] = entryUrl;
  tinymce.overrideDefaults(cloudSettings);
})(
  {
    rtc_tenant_id: "no-origin",
    editimage_api_key: "no-origin",
    imagetools_proxy: "https://imageproxy.tiny.cloud/2/image",
    autocorrect_service_url: "https://spelling.tiny.cloud",
    suffix: ".min",
    linkchecker_service_url: "https://hyperlinking.tiny.cloud",
    spellchecker_rpc_url: "https://spelling.tiny.cloud",
    spellchecker_api_key: "no-origin",
    tinydrive_service_url: "https://catalog.tiny.cloud",
    api_key: "no-origin",
    imagetools_api_key: "no-origin",
    tinydrive_api_key: "no-origin",
    export_image_proxy_service_url: "https://imageproxy.tiny.cloud",
    forced_plugins: ["chiffer"],
    referrer_policy: "origin",
    content_css_cors: true,
    custom_plugin_urls: {},
    chiffer_snowplow_service_url: "https://sp.tinymce.com/i",
    mediaembed_api_key: "no-origin",
    promotion: false,
    rtc_service_url: "https://rtc.tiny.cloud",
    editimage_proxy_service_url: "https://imageproxy.tiny.cloud",
    linkchecker_api_key: "no-origin",
    chiffer_cdp_init_service_url:
      "https://cdn.tiny.cloud/1/no-origin/tinymce/7.0.0-23/cdn-init",
    mediaembed_service_url: "https://hyperlinking.tiny.cloud",
    service_message:
      '\u003cspan style="display: block"\u003eWe’re unable to check your domain because the referer header is missing.\u003c/span\u003e\n\u003cspan style="display: block"\u003ePlease read the\n\u003ca target="_blank" href="https://www.tiny.cloud/docs/tinymce/6/cloud-troubleshooting/"\u003eGuide\u003c/a\u003e\non how to ensure your referer header is present, so we can then customize your editor experience.\n\u003cimg alt="" loading="lazy" src="https://sp.tinymce.com/i?aid=no-origin\u0026amp;e=se\u0026amp;se_ca=notification_displayed" style="display: inline"\u003e\n\u003c/span\u003e\n',
  },
  "We’re unable to check your domain because the referer header is missing.\n\nEnsure your referer header is present, so we can then customize your editor experience.\n\nRead to learn more:\nhttps://www.tiny.cloud/docs/tinymce/6/cloud-troubleshooting/\n",
  false
);
tinymce.baseURL = "https://cdn.tiny.cloud/1/no-origin/tinymce/7.0.0-23";

/*!
 * Tiny Chiffer plugin
 *
 * Copyright (c) 2023 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 3.3.0-25
 */
!(function () {
  "use strict";
  function n(t) {
    return function (n) {
      return (
        (e = typeof (n = n)),
        (null === n
          ? "null"
          : "object" == e &&
            (Array.prototype.isPrototypeOf(n) ||
              (n.constructor && "Array" === n.constructor.name))
          ? "array"
          : "object" == e &&
            (String.prototype.isPrototypeOf(n) ||
              (n.constructor && "String" === n.constructor.name))
          ? "string"
          : e) === t
      );
      var e;
    };
  }
  function e(e) {
    return function (n) {
      return typeof n === e;
    };
  }
  function a(n) {
    return !(null == n);
  }
  function o() {}
  function i(n) {
    return function () {
      return n;
    };
  }
  function t(n) {
    return n;
  }
  var r,
    s = n("string"),
    l = n("object"),
    c = e("boolean"),
    u = function (n) {
      return r === n;
    },
    f = e("function"),
    V = e("number"),
    d = i(!1),
    p = i(!(r = void 0)),
    m = function () {
      return (m =
        Object.assign ||
        function (n) {
          for (var e, t = 1, r = arguments.length; t < r; t++)
            for (var o in (e = arguments[t]))
              Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
          return n;
        }).apply(this, arguments);
    };
  function g(n, e, t) {
    if (t || 2 === arguments.length)
      for (var r, o = 0, i = e.length; o < i; o++)
        (!r && o in e) ||
          ((r = r || Array.prototype.slice.call(e, 0, o))[o] = e[o]);
    return n.concat(r || Array.prototype.slice.call(e));
  }
  function y() {
    return v;
  }
  var N = function (n) {
      n = n.chiffer_cdp_init_service_url;
      return s(n) ? n : void 0;
    },
    v = {
      fold: function (n, e) {
        return n();
      },
      isSome: d,
      isNone: p,
      getOr: t,
      getOrThunk: h,
      getOrDie: function (n) {
        throw new Error(n || "error: getOrDie called on none.");
      },
      getOrNull: i(null),
      getOrUndefined: i(void 0),
      or: t,
      orThunk: h,
      map: y,
      each: o,
      bind: y,
      exists: d,
      forall: p,
      filter: function () {
        return v;
      },
      toArray: function () {
        return [];
      },
      toString: i("none()"),
    };
  function h(n) {
    return n();
  }
  function w(t) {
    function n() {
      return o;
    }
    function e(n) {
      return n(t);
    }
    var r = i(t),
      o = {
        fold: function (n, e) {
          return e(t);
        },
        isSome: p,
        isNone: d,
        getOr: r,
        getOrThunk: r,
        getOrDie: r,
        getOrNull: r,
        getOrUndefined: r,
        or: n,
        orThunk: n,
        map: function (n) {
          return w(n(t));
        },
        each: function (n) {
          n(t);
        },
        bind: e,
        exists: e,
        forall: e,
        filter: function (n) {
          return n(t) ? o : v;
        },
        toArray: function () {
          return [t];
        },
        toString: function () {
          return "some(" + t + ")";
        },
      };
    return o;
  }
  function z(n, t, r, o) {
    for (
      var e = n,
        i = function (n, e) {
          (t(n, e) ? r : o)(n, e);
        },
        c = U(e),
        a = 0,
        u = c.length;
      a < u;
      a++
    ) {
      var s = c[a];
      i(e[s], s);
    }
  }
  function b(n, e) {
    var t,
      r = {};
    return (
      z(
        n,
        e,
        ((t = r),
        function (n, e) {
          t[e] = n;
        }),
        o
      ),
      r
    );
  }
  function C() {
    return new Date().getTime();
  }
  function _(n) {
    return parseInt(n, 10);
  }
  function M(n, e, t) {
    return { major: n, minor: e, patch: t };
  }
  function H(n) {
    return ln(n.editorManager);
  }
  function K(n, e) {
    return -1 < dn.call(n, e);
  }
  function k(i, c) {
    return function (n) {
      var e = n.options,
        t = c.processor,
        r = c.legacyProcessor,
        o = c.defaultValue;
      return (
        a(e)
          ? (e.isSet(i) ? E.from(e.get(i)) : E.none()).bind(t)
          : r(n.getParam(i))
      ).getOr(o);
    };
  }
  function W(n) {
    return yn(n, "/");
  }
  function L(e) {
    return function (n) {
      return e(n) ? E.some(n) : E.none();
    };
  }
  function S(n) {
    return R(n).filter(
      ((e = W),
      function (n) {
        return !e(n);
      })
    );
    var e;
  }
  function O(n) {
    return s(n) ? E.some(n) : c(n) || V(n) ? E.some(n.toString()) : E.none();
  }
  function J(n) {
    return (
      (n = n.plugins),
      (n = b(n, function (n, e) {
        var t = K(mn, e),
          n = !!n.isStub;
        return !!e && !n && !("chiffer" === e) && t;
      })),
      0 < (n = U(n)).length ? n : void 0
    );
  }
  function Z(n, e) {
    var t,
      r,
      o = tinymce.Env,
      i = sn(),
      c = "unknown",
      e = (function (n) {
        n = n.tiny_cloud_entry_url;
        return s(n) ? n : void 0;
      })(e),
      o =
        (l(o.os) &&
          (t = {
            name: o.os.current || c,
            version: null == (t = o.os.version) ? void 0 : t.major.toString(),
          }),
        l(o.os) &&
          (r = {
            name: o.browser.current || c,
            version:
              null == (c = o.browser.version) ? void 0 : c.major.toString(),
          }),
        null == i ? void 0 : i.timeZone),
      c = null == i ? void 0 : i.locale,
      i = {
        width: window.innerWidth,
        height: window.innerHeight,
        density: window.devicePixelRatio,
      },
      a = navigator.userAgent,
      u = (function () {
        var n;
        try {
          return null == (n = navigator.userAgentData) ? void 0 : n.toJSON();
        } catch (n) {}
      })();
    return m(m({}, n), {
      browser: r,
      os: t,
      timezone: o,
      locale: c,
      screen: i,
      userAgent: a,
      userAgentData: u,
      tinyCloudEntryUrl: e,
    });
  }
  function q(n, e) {
    var t = (function (n) {
        n = H(n);
        return "".concat(n.major, ".").concat(n.minor, ".").concat(n.patch);
      })(n),
      r = gn.getIdForEditor(n);
    return {
      apiKey: e.apiKey,
      pageId: e.pageId,
      editorId: r,
      editorVersion: t,
      editorOptions: (function (n) {
        var e, t, r, o, i, c, a, u, s, l, f;
        if (!fn(n))
          return (
            (e = vn(n)),
            (t = Sn(n)),
            (r = hn(n)),
            (o = wn(n)),
            (i = bn(n)),
            (c = kn(n)),
            (a = _n(n)),
            (u = xn(n)),
            (s = On(n)),
            (l = In(n)),
            (f = Pn(n)),
            {
              plugins: J(n),
              icons: i,
              inline: e,
              language: t,
              readonly: r,
              resize: o,
              skin: c,
              theme: a,
              height: u,
              toolbarMode: s,
              toolbarLocation: l,
              uiMode: f,
            }
          );
      })(n),
    };
  }
  function B(n) {
    return "plugin_".concat(n, "_loaded");
  }
  var G,
    Q,
    I,
    X,
    P,
    Y,
    x,
    $,
    j,
    nn,
    T,
    A,
    E = {
      some: w,
      none: y,
      from: function (n) {
        return null == n ? v : w(n);
      },
    },
    D = (function () {
      for (var n = [], e = 0; e < 256; e++)
        n.push((e + 256).toString(16).substring(1));
      return n;
    })(),
    en = E.from(window.crypto),
    tn = function () {
      return en.bind(function (n) {
        return f(n.randomUUID) ? E.some(n.randomUUID()) : E.none();
      });
    },
    rn = function () {
      return (
        (e = new Uint8Array(16)),
        en
          .bind(function (n) {
            return f(n.getRandomValues)
              ? E.some(n.getRandomValues(e))
              : E.none();
          })
          .map(function (n) {
            for (var e = "", t = 0; t < 16; t++) {
              var r = n[t];
              (e +=
                6 === t
                  ? D[(15 & r) | 64]
                  : 8 === t
                  ? D[(63 & r) | 128]
                  : D[r]),
                (3 !== t && 5 !== t && 7 !== t && 9 !== t) || (e += "-");
            }
            return e;
          })
      );
      var e;
    },
    on = "00000000-0000-0000-0000-000000000000",
    cn = function () {
      return tn().orThunk(rn);
    },
    U = Object.keys,
    an = Object.hasOwnProperty,
    un = function (n, e) {
      return an.call(n, e);
    },
    sn =
      ((I = !(G = function () {
        if (a(Intl)) return Intl.DateTimeFormat().resolvedOptions();
      })),
      function () {
        for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
        return I || ((I = !0), (Q = G.apply(null, n))), Q;
      }),
    ln = function (n) {
      n = [n.majorVersion, n.minorVersion]
        .join(".")
        .split(".")
        .slice(0, 3)
        .join(".");
      return (n = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(n))
        ? M(_(n[1]), _(n[2]), _(n[3]))
        : M(0, 0, 0);
    },
    fn =
      ((X = 4),
      function (n) {
        return H(n).major === X;
      }),
    dn = Array.prototype.indexOf,
    pn = function (n, e) {
      for (var t = 0, r = n.length; t < r; t++) e(n[t], t);
    },
    mn = g(
      g(
        [],
        [
          "accordion",
          "advlist",
          "anchor",
          "autolink",
          "autoresize",
          "autosave",
          "bbcode",
          "charmap",
          "code",
          "codesample",
          "colorpicker",
          "compat3x",
          "contextmenu",
          "directionality",
          "emoticons",
          "fullpage",
          "fullscreen",
          "help",
          "hr",
          "image",
          "imagetools",
          "importcss",
          "insertdatetime",
          "legacyoutput",
          "link",
          "lists",
          "media",
          "nonbreaking",
          "noneditable",
          "pagebreak",
          "paste",
          "preview",
          "print",
          "quickbars",
          "save",
          "searchreplace",
          "spellchecker",
          "tabfocus",
          "table",
          "textcolor",
          "textpattern",
          "toc",
          "visualblocks",
          "visualchars",
          "wordcount",
        ],
        !0
      ),
      [
        "a11ychecker",
        "advcode",
        "advtable",
        "advtemplate",
        "ai",
        "autocorrect",
        "casechange",
        "checklist",
        "editimage",
        "export",
        "exportpdf",
        "exportword",
        "footnotes",
        "formatpainter",
        "importword",
        "inlinecss",
        "linkchecker",
        "markdown",
        "mediaembed",
        "mentions",
        "mergetags",
        "pageembed",
        "permanentpen",
        "powerpaste",
        "revisionhistory",
        "tableofcontents",
        "tinycomments",
        "tinydrive",
        "tinymcespellchecker",
        "typography",
      ],
      !0
    ),
    gn =
      ((P = new WeakMap()),
      {
        getIdForEditor: function (e) {
          return E.from(P.get(e)).getOrThunk(function () {
            var n = cn().getOr(on);
            return P.set(e, n), n;
          });
        },
      }),
    yn = function (n, e) {
      return -1 !== n.indexOf(e);
    },
    R = L(s),
    F = L(c),
    vn = k("inline", { processor: E.some, legacyProcessor: F }),
    hn = k("readonly", { processor: E.some, legacyProcessor: F }),
    wn = k("resize", { processor: O, legacyProcessor: O }),
    bn = k("icons", { processor: S, legacyProcessor: S }),
    _n = k("theme", { processor: S, legacyProcessor: S }),
    kn = k("skin", { processor: S, legacyProcessor: S }),
    Sn = k("language", { processor: S, legacyProcessor: S }),
    On = k("toolbar_mode", { processor: E.some, legacyProcessor: R }),
    In = k("toolbar_location", { processor: R, legacyProcessor: R }),
    Pn = k("ui_mode", { processor: R, legacyProcessor: E.none }),
    xn = k("height", { processor: O, legacyProcessor: O }),
    jn = function (n, e) {
      if (f(window.fetch))
        try {
          var t = {
            method: "POST",
            mode: "cors",
            headers: new window.Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(e),
            keepalive: !0,
          };
          window.fetch(n, t).then(o, o);
        } catch (n) {}
    },
    Tn = { direct: !1, library: { name: "chiffer", version: "3.3.0-25" } },
    An = function (n, e, t) {
      (t = Z(Tn, t)), (n = q(n, e));
      return {
        anonymousId: e.pageId,
        event: "editor_init",
        context: t,
        properties: n,
        userId: e.apiKey,
      };
    },
    En = { mceInsertToc: "toc_insert", mceUpdateToc: "toc_update" },
    Dn = {
      mceEditImage: "imagetools_open_dialog",
      mceImageRotateLeft: "imagetools_rotate",
      mceImageRotateRight: "imagetools_rotate",
      mceImageFlipVertical: "imagetools_flip",
      mceImageFlipHorizontal: "imagetools_flip",
    },
    Un = [
      "a11ychecker",
      "advcode",
      "advtable",
      "advtemplate",
      "autocorrect",
      "ai",
      "casechange",
      "checklist",
      "editimage",
      "export",
      "exportpdf",
      "exportword",
      "footnotes",
      "formatpainter",
      "importword",
      "inlinecss",
      "linkchecker",
      "markdown",
      "mediaembed",
      "mentions",
      "mergetags",
      "pageembed",
      "permanentpen",
      "powerpaste",
      "revisionhistory",
      "tableofcontents",
      "tinycomments",
      "tinydrive",
      "tinymcespellchecker",
      "typography",
    ],
    Rn = function (n) {
      for (
        var n = b(n, function (n, e) {
            n = !!n.isStub;
            return !!e && !n && K(Un, e);
          }),
          e = U(n),
          t = B,
          r = e.length,
          o = new Array(r),
          i = 0;
        i < r;
        i++
      ) {
        var c = e[i];
        o[i] = t(c, i);
      }
      return o;
    },
    Fn = function (a, u) {
      return {
        send: function (n, e, t) {
          var r,
            o = a,
            i = C(),
            c =
              "undefined" != typeof Intl
                ? encodeURIComponent(
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                  )
                : "N%2FA",
            o = "?aid="
              .concat(o, "&tna=")
              .concat("tinymce_cloud", "&p=")
              .concat("web", "&dtm=")
              .concat(e, "&stm=")
              .concat(i, "&tz=")
              .concat(c, "&e=")
              .concat("se", "&se_ca=")
              .concat(n),
            e = (function (n) {
              n = n.chiffer_snowplow_service_url;
              return s(n) ? n : void 0;
            })(u);
          s(e)
            ? (((r = document.createElement("img")).src = e + o),
              (r.onload = (i = function (n) {
                return function () {
                  (r.onload = null), (r.onerror = null), t(n);
                };
              })(!0)),
              (r.onerror = i(!1)))
            : t(!1);
        },
      };
    },
    Vn = function (e) {
      return {
        sendStat: function (n) {
          e.send(n, C(), o);
        },
      };
    };
  (F = { load: o }),
    (A = null != (A = tinymce.defaultOptions) ? A : tinymce.defaultSettings),
    (T = (function (n) {
      n = n.api_key;
      return s(n) ? n : void 0;
    })((A = m({}, A)))),
    (A = u(T)
      ? F
      : ((j = (function (n, e) {
          n = Fn(n, e);
          return Vn(n);
        })((F = T), (T = A))),
        (Y = F),
        (x = T),
        ($ = cn().getOr(on)),
        (nn = {
          sendInit: function (n) {
            var e = N(x);
            s(e) && ((n = An(n, { apiKey: Y, pageId: $ }, x)), jn(e, n));
          },
        }),
        j.sendStat("script_load"),
        {
          load: function (t) {
            t.once("init", function () {
              return j.sendStat("init");
            }),
              t.once("init", function () {
                return nn.sendInit(t);
              }),
              t.once("focus", function () {
                return j.sendStat("focus");
              }),
              t.on("ExportPdf", function () {
                return j.sendStat("export_pdf");
              }),
              t.on("InlineCSS", function () {
                return j.sendStat("inlinecss_get_content");
              }),
              t.on("PastePreProcess PowerPasteTempStats", function (n) {
                n = n.source;
                a(n) && j.sendStat("powerpaste_".concat(n));
              }),
              t.on("SpellcheckerLanguageChanged", function (n) {
                n = n.language;
                j.sendStat("spellcheckerpro_language_changed_".concat(n));
              }),
              t.on("AIResponse", function () {
                return j.sendStat("ai_response");
              }),
              t.on("ExportToPdf", function () {
                return j.sendStat("exportpdf_download");
              }),
              t.on("ExportToWord", function () {
                return j.sendStat("exportword_download");
              }),
              t.on("ImportFromWord", function () {
                return j.sendStat("importword_insert");
              }),
              t.on("MarkdownPaste", function () {
                return j.sendStat("markdown_paste");
              }),
              t.on("RevisionHistoryOpen", function () {
                return j.sendStat("revisionhistory_open");
              }),
              t.on("ExecCommand", function (n) {
                n = (function (n) {
                  n = n.command;
                  return un(Dn, n) ? Dn[n] : un(En, n) ? En[n] : void 0;
                })(n);
                u(n) || j.sendStat(n);
              }),
              t.on("PreInit", function () {
                var n = j,
                  e = t.plugins;
                (e = Rn(e)), pn(e, n.sendStat);
              });
          },
        })),
    tinymce.PluginManager.add("chiffer", A.load);
})();
