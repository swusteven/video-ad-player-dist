var gt = Object.defineProperty;
var Ct = (t, e, n) => e in t ? gt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var q = (t, e, n) => Ct(t, typeof e != "symbol" ? e + "" : e, n);
function bt(t) {
  if (t === void 0)
    return;
  const e = t.slice(0, 5);
  return e != "https" && e.slice(0, 4) === "http" ? t.replace("http", "https") : t;
}
class We {
  async getFromUrl(e) {
    const r = await (await fetch(e)).text();
    return this.getInformation(r);
  }
  getFromContent(e) {
    return this.getInformation(e);
  }
  getInformation(e) {
    try {
      const n = new window.DOMParser().parseFromString(e, "text/xml");
      return this.parseFile(n);
    } catch (n) {
      throw console.error("Could not fetch vast file", n), n;
    }
  }
  parseFile(e) {
    return {
      clickThroughUrl: this.queryXMLFile(e, "ClickThrough"),
      beacons: {
        adFirstQuartile: this.queryXMLFile(
          e,
          "Tracking[event='firstQuartile']"
        ),
        adMidpoint: this.queryXMLFile(e, "Tracking[event='midpoint']"),
        adThirdQuartile: this.queryXMLFile(
          e,
          "Tracking[event='thirdQuartile']"
        ),
        adCompleted: this.queryXMLFile(e, "Tracking[event='complete']"),
        mute: this.queryXMLFile(e, "Tracking[event='mute']"),
        unmute: this.queryXMLFile(e, "Tracking[event='unmute']"),
        pause: this.queryXMLFile(e, "Tracking[event='pause']"),
        resume: this.queryXMLFile(e, "Tracking[event='resume']"),
        impression: this.queryXMLFile(e, "Impression"),
        adStarted: this.queryXMLFile(e, "Tracking[event='start']"),
        clickThrough: this.queryXMLFile(e, "ClickTracking"),
        verificationNotExecuted: this.queryXMLFile(
          e,
          'TrackingEvents Tracking[event="verificationNotExecuted"]'
        )
      },
      adVerifications: this.loadAdVerifications(e),
      mediaFiles: this.queryMediaFiles(e)
    };
  }
  loadAdVerifications(e) {
    let n = e.querySelectorAll("AdVerifications Verification");
    return n.length ? Array.from(n).map((r) => ({
      javascriptResource: this.queryXMLFile(
        r,
        "JavaScriptResource"
      ),
      apiFramework: this.queryXMLAttribute(
        r.querySelector("JavaScriptResource"),
        "apiFramework"
      ),
      vendor: this.queryXMLAttribute(r, "vendor"),
      verificationParameters: this.queryXMLFile(
        r,
        "VerificationParameters"
      )
    })) : [];
  }
  queryXMLFile(e, n) {
    var r;
    return (r = e.querySelector(n)) == null ? void 0 : r.firstChild.wholeText.trim();
  }
  queryXMLAttribute(e, n) {
    return (e == null ? void 0 : e.getAttribute(n)) ?? void 0;
  }
  queryXMLText(e) {
    if (!(!e || !e.firstChild))
      return e.firstChild.wholeText.trim();
  }
  queryMediaFiles(e) {
    const n = e.querySelector("MediaFiles > ClosedCaptionFiles > ClosedCaptionFile"), r = e.querySelectorAll("MediaFile"), i = n ? this.queryXMLFile(e, "MediaFiles > ClosedCaptionFiles > ClosedCaptionFile") : void 0, o = n ? this.queryXMLAttribute(n, "language") : void 0;
    return Array.from(r).map(
      (l) => {
        const c = bt(this.queryXMLText(l)), a = this.queryXMLAttribute(l, "width"), f = this.queryXMLAttribute(l, "height"), s = a && f ? parseInt(a) / parseInt(f) : void 0, d = i ?? this.queryXMLFile(l, "ClosedCaptionFiles > ClosedCaptionFile"), u = o ?? this.queryXMLAttribute(
          l.querySelector("ClosedCaptionFiles > ClosedCaptionFile"),
          "language"
        );
        return {
          mediaUrl: c,
          width: a,
          height: f,
          aspectRatio: s,
          closedCaptionFile: d,
          closedCaptionLanguage: u
        };
      }
    );
  }
}
var re, h, Qe, D, Ce, je, ze, Ke, ue, se, _e, Q = {}, Ze = [], wt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, z = Array.isArray;
function U(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function de(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function le(t, e, n) {
  var r, i, o, _ = {};
  for (o in e) o == "key" ? r = e[o] : o == "ref" ? i = e[o] : _[o] = e[o];
  if (arguments.length > 2 && (_.children = arguments.length > 3 ? re.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) _[o] === void 0 && (_[o] = t.defaultProps[o]);
  return J(t, _, r, i, null);
}
function J(t, e, n, r, i) {
  var o = { type: t, props: e, key: n, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: i ?? ++Qe, __i: -1, __u: 0 };
  return i == null && h.vnode != null && h.vnode(o), o;
}
function O(t) {
  return t.children;
}
function $(t, e) {
  this.props = t, this.context = e;
}
function X(t, e) {
  if (e == null) return t.__ ? X(t.__, t.__i + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? X(t) : null;
}
function Je(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) {
      t.__e = t.__c.base = n.__e;
      break;
    }
    return Je(t);
  }
}
function be(t) {
  (!t.__d && (t.__d = !0) && D.push(t) && !ee.__r++ || Ce != h.debounceRendering) && ((Ce = h.debounceRendering) || je)(ee);
}
function ee() {
  for (var t, e, n, r, i, o, _, l = 1; D.length; ) D.length > l && D.sort(ze), t = D.shift(), l = D.length, t.__d && (n = void 0, i = (r = (e = t).__v).__e, o = [], _ = [], e.__P && ((n = U({}, r)).__v = r.__v + 1, h.vnode && h.vnode(n), fe(e.__P, n, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [i] : null, o, i ?? X(r), !!(32 & r.__u), _), n.__v = r.__v, n.__.__k[n.__i] = n, et(o, n, _), n.__e != i && Je(n)));
  ee.__r = 0;
}
function Ge(t, e, n, r, i, o, _, l, c, a, f) {
  var s, d, u, g, k, C, v, m = r && r.__k || Ze, T = e.length;
  for (c = kt(n, e, m, c, T), s = 0; s < T; s++) (u = n.__k[s]) != null && (d = u.__i == -1 ? Q : m[u.__i] || Q, u.__i = s, C = fe(t, u, d, i, o, _, l, c, a, f), g = u.__e, u.ref && d.ref != u.ref && (d.ref && pe(d.ref, null, u), f.push(u.ref, u.__c || g, u)), k == null && g != null && (k = g), (v = !!(4 & u.__u)) || d.__k === u.__k ? c = Ye(u, c, t, v) : typeof u.type == "function" && C !== void 0 ? c = C : g && (c = g.nextSibling), u.__u &= -7);
  return n.__e = k, c;
}
function kt(t, e, n, r, i) {
  var o, _, l, c, a, f = n.length, s = f, d = 0;
  for (t.__k = new Array(i), o = 0; o < i; o++) (_ = e[o]) != null && typeof _ != "boolean" && typeof _ != "function" ? (c = o + d, (_ = t.__k[o] = typeof _ == "string" || typeof _ == "number" || typeof _ == "bigint" || _.constructor == String ? J(null, _, null, null, null) : z(_) ? J(O, { children: _ }, null, null, null) : _.constructor == null && _.__b > 0 ? J(_.type, _.props, _.key, _.ref ? _.ref : null, _.__v) : _).__ = t, _.__b = t.__b + 1, l = null, (a = _.__i = Ft(_, n, c, s)) != -1 && (s--, (l = n[a]) && (l.__u |= 2)), l == null || l.__v == null ? (a == -1 && (i > f ? d-- : i < f && d++), typeof _.type != "function" && (_.__u |= 4)) : a != c && (a == c - 1 ? d-- : a == c + 1 ? d++ : (a > c ? d-- : d++, _.__u |= 4))) : t.__k[o] = null;
  if (s) for (o = 0; o < f; o++) (l = n[o]) != null && !(2 & l.__u) && (l.__e == r && (r = X(l)), nt(l, l));
  return r;
}
function Ye(t, e, n, r) {
  var i, o;
  if (typeof t.type == "function") {
    for (i = t.__k, o = 0; i && o < i.length; o++) i[o] && (i[o].__ = t, e = Ye(i[o], e, n, r));
    return e;
  }
  t.__e != e && (r && (e && t.type && !e.parentNode && (e = X(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function te(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (z(t) ? t.some(function(n) {
    te(n, e);
  }) : e.push(t)), e;
}
function Ft(t, e, n, r) {
  var i, o, _, l = t.key, c = t.type, a = e[n], f = a != null && (2 & a.__u) == 0;
  if (a === null && t.key == null || f && l == a.key && c == a.type) return n;
  if (r > (f ? 1 : 0)) {
    for (i = n - 1, o = n + 1; i >= 0 || o < e.length; ) if ((a = e[_ = i >= 0 ? i-- : o++]) != null && !(2 & a.__u) && l == a.key && c == a.type) return _;
  }
  return -1;
}
function we(t, e, n) {
  e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || wt.test(e) ? n : n + "px";
}
function K(t, e, n, r, i) {
  var o, _;
  e: if (e == "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof r == "string" && (t.style.cssText = r = ""), r) for (e in r) n && e in n || we(t.style, e, "");
    if (n) for (e in n) r && n[e] == r[e] || we(t.style, e, n[e]);
  }
  else if (e[0] == "o" && e[1] == "n") o = e != (e = e.replace(Ke, "$1")), _ = e.toLowerCase(), e = _ in t || e == "onFocusOut" || e == "onFocusIn" ? _.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = n, n ? r ? n.u = r.u : (n.u = ue, t.addEventListener(e, o ? _e : se, o)) : t.removeEventListener(e, o ? _e : se, o);
  else {
    if (i == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t) try {
      t[e] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
  }
}
function ke(t) {
  return function(e) {
    if (this.l) {
      var n = this.l[e.type + t];
      if (e.t == null) e.t = ue++;
      else if (e.t < n.u) return;
      return n(h.event ? h.event(e) : e);
    }
  };
}
function fe(t, e, n, r, i, o, _, l, c, a) {
  var f, s, d, u, g, k, C, v, m, T, L, R, A, M, V, N, B, x = e.type;
  if (e.constructor != null) return null;
  128 & n.__u && (c = !!(32 & n.__u), o = [l = e.__e = n.__e]), (f = h.__b) && f(e);
  e: if (typeof x == "function") try {
    if (v = e.props, m = "prototype" in x && x.prototype.render, T = (f = x.contextType) && r[f.__c], L = f ? T ? T.props.value : f.__ : r, n.__c ? C = (s = e.__c = n.__c).__ = s.__E : (m ? e.__c = s = new x(v, L) : (e.__c = s = new $(v, L), s.constructor = x, s.render = Et), T && T.sub(s), s.props = v, s.state || (s.state = {}), s.context = L, s.__n = r, d = s.__d = !0, s.__h = [], s._sb = []), m && s.__s == null && (s.__s = s.state), m && x.getDerivedStateFromProps != null && (s.__s == s.state && (s.__s = U({}, s.__s)), U(s.__s, x.getDerivedStateFromProps(v, s.__s))), u = s.props, g = s.state, s.__v = e, d) m && x.getDerivedStateFromProps == null && s.componentWillMount != null && s.componentWillMount(), m && s.componentDidMount != null && s.__h.push(s.componentDidMount);
    else {
      if (m && x.getDerivedStateFromProps == null && v !== u && s.componentWillReceiveProps != null && s.componentWillReceiveProps(v, L), !s.__e && s.shouldComponentUpdate != null && s.shouldComponentUpdate(v, s.__s, L) === !1 || e.__v == n.__v) {
        for (e.__v != n.__v && (s.props = v, s.state = s.__s, s.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(H) {
          H && (H.__ = e);
        }), R = 0; R < s._sb.length; R++) s.__h.push(s._sb[R]);
        s._sb = [], s.__h.length && _.push(s);
        break e;
      }
      s.componentWillUpdate != null && s.componentWillUpdate(v, s.__s, L), m && s.componentDidUpdate != null && s.__h.push(function() {
        s.componentDidUpdate(u, g, k);
      });
    }
    if (s.context = L, s.props = v, s.__P = t, s.__e = !1, A = h.__r, M = 0, m) {
      for (s.state = s.__s, s.__d = !1, A && A(e), f = s.render(s.props, s.state, s.context), V = 0; V < s._sb.length; V++) s.__h.push(s._sb[V]);
      s._sb = [];
    } else do
      s.__d = !1, A && A(e), f = s.render(s.props, s.state, s.context), s.state = s.__s;
    while (s.__d && ++M < 25);
    s.state = s.__s, s.getChildContext != null && (r = U(U({}, r), s.getChildContext())), m && !d && s.getSnapshotBeforeUpdate != null && (k = s.getSnapshotBeforeUpdate(u, g)), N = f, f != null && f.type === O && f.key == null && (N = tt(f.props.children)), l = Ge(t, z(N) ? N : [N], e, n, r, i, o, _, l, c, a), s.base = e.__e, e.__u &= -161, s.__h.length && _.push(s), C && (s.__E = s.__ = null);
  } catch (H) {
    if (e.__v = null, c || o != null) if (H.then) {
      for (e.__u |= c ? 160 : 128; l && l.nodeType == 8 && l.nextSibling; ) l = l.nextSibling;
      o[o.indexOf(l)] = null, e.__e = l;
    } else {
      for (B = o.length; B--; ) de(o[B]);
      ae(e);
    }
    else e.__e = n.__e, e.__k = n.__k, H.then || ae(e);
    h.__e(H, e, n);
  }
  else o == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : l = e.__e = St(n.__e, e, n, r, i, o, _, c, a);
  return (f = h.diffed) && f(e), 128 & e.__u ? void 0 : l;
}
function ae(t) {
  t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(ae);
}
function et(t, e, n) {
  for (var r = 0; r < n.length; r++) pe(n[r], n[++r], n[++r]);
  h.__c && h.__c(e, t), t.some(function(i) {
    try {
      t = i.__h, i.__h = [], t.some(function(o) {
        o.call(i);
      });
    } catch (o) {
      h.__e(o, i.__v);
    }
  });
}
function tt(t) {
  return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : z(t) ? t.map(tt) : U({}, t);
}
function St(t, e, n, r, i, o, _, l, c) {
  var a, f, s, d, u, g, k, C = n.props, v = e.props, m = e.type;
  if (m == "svg" ? i = "http://www.w3.org/2000/svg" : m == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), o != null) {
    for (a = 0; a < o.length; a++) if ((u = o[a]) && "setAttribute" in u == !!m && (m ? u.localName == m : u.nodeType == 3)) {
      t = u, o[a] = null;
      break;
    }
  }
  if (t == null) {
    if (m == null) return document.createTextNode(v);
    t = document.createElementNS(i, m, v.is && v), l && (h.__m && h.__m(e, o), l = !1), o = null;
  }
  if (m == null) C === v || l && t.data == v || (t.data = v);
  else {
    if (o = o && re.call(t.childNodes), C = n.props || Q, !l && o != null) for (C = {}, a = 0; a < t.attributes.length; a++) C[(u = t.attributes[a]).name] = u.value;
    for (a in C) if (u = C[a], a != "children") {
      if (a == "dangerouslySetInnerHTML") s = u;
      else if (!(a in v)) {
        if (a == "value" && "defaultValue" in v || a == "checked" && "defaultChecked" in v) continue;
        K(t, a, null, u, i);
      }
    }
    for (a in v) u = v[a], a == "children" ? d = u : a == "dangerouslySetInnerHTML" ? f = u : a == "value" ? g = u : a == "checked" ? k = u : l && typeof u != "function" || C[a] === u || K(t, a, u, C[a], i);
    if (f) l || s && (f.__html == s.__html || f.__html == t.innerHTML) || (t.innerHTML = f.__html), e.__k = [];
    else if (s && (t.innerHTML = ""), Ge(e.type == "template" ? t.content : t, z(d) ? d : [d], e, n, r, m == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, o, _, o ? o[0] : n.__k && X(n, 0), l, c), o != null) for (a = o.length; a--; ) de(o[a]);
    l || (a = "value", m == "progress" && g == null ? t.removeAttribute("value") : g != null && (g !== t[a] || m == "progress" && !g || m == "option" && g != C[a]) && K(t, a, g, C[a], i), a = "checked", k != null && k != t[a] && K(t, a, k, C[a], i));
  }
  return t;
}
function pe(t, e, n) {
  try {
    if (typeof t == "function") {
      var r = typeof t.__u == "function";
      r && t.__u(), r && e == null || (t.__u = t(e));
    } else t.current = e;
  } catch (i) {
    h.__e(i, n);
  }
}
function nt(t, e, n) {
  var r, i;
  if (h.unmount && h.unmount(t), (r = t.ref) && (r.current && r.current != t.__e || pe(r, null, e)), (r = t.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (o) {
      h.__e(o, e);
    }
    r.base = r.__P = null;
  }
  if (r = t.__k) for (i = 0; i < r.length; i++) r[i] && nt(r[i], e, n || typeof t.type != "function");
  n || de(t.__e), t.__c = t.__ = t.__e = void 0;
}
function Et(t, e, n) {
  return this.constructor(t, n);
}
function Lt(t, e, n) {
  var r, i, o, _;
  e == document && (e = document.documentElement), h.__ && h.__(t, e), i = (r = !1) ? null : e.__k, o = [], _ = [], fe(e, t = e.__k = le(O, null, [t]), i || Q, Q, e.namespaceURI, i ? null : e.firstChild ? re.call(e.childNodes) : null, o, i ? i.__e : e.firstChild, r, _), et(o, t, _);
}
re = Ze.slice, h = { __e: function(t, e, n, r) {
  for (var i, o, _; e = e.__; ) if ((i = e.__c) && !i.__) try {
    if ((o = i.constructor) && o.getDerivedStateFromError != null && (i.setState(o.getDerivedStateFromError(t)), _ = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), _ = i.__d), _) return i.__E = i;
  } catch (l) {
    t = l;
  }
  throw t;
} }, Qe = 0, $.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = U({}, this.state), typeof t == "function" && (t = t(U({}, n), this.props)), t && U(n, t), t != null && this.__v && (e && this._sb.push(e), be(this));
}, $.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), be(this));
}, $.prototype.render = O, D = [], je = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ze = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, ee.__r = 0, Ke = /(PointerCapture)$|Capture$/i, ue = 0, se = ke(!1), _e = ke(!0);
var Mt = 0;
function y(t, e, n, r, i, o) {
  e || (e = {});
  var _, l, c = e;
  if ("ref" in c) for (l in c = {}, e) l == "ref" ? _ = e[l] : c[l] = e[l];
  var a = { type: t, props: c, key: n, ref: _, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --Mt, __i: -1, __u: 0, __source: i, __self: o };
  if (typeof t == "function" && (_ = t.defaultProps)) for (l in _) c[l] === void 0 && (c[l] = _[l]);
  return h.vnode && h.vnode(a), a;
}
var j, w, ie, Fe, ne = 0, rt = [], F = h, Se = F.__b, Ee = F.__r, Le = F.diffed, Me = F.__c, Te = F.unmount, xe = F.__;
function he(t, e) {
  F.__h && F.__h(w, t, ne || e), ne = 0;
  var n = w.__H || (w.__H = { __: [], __h: [] });
  return t >= n.__.length && n.__.push({}), n.__[t];
}
function W(t) {
  return ne = 1, Tt(st, t);
}
function Tt(t, e, n) {
  var r = he(j++, 2);
  if (r.t = t, !r.__c && (r.__ = [n ? n(e) : st(void 0, e), function(l) {
    var c = r.__N ? r.__N[0] : r.__[0], a = r.t(c, l);
    c !== a && (r.__N = [a, r.__[1]], r.__c.setState({}));
  }], r.__c = w, !w.__f)) {
    var i = function(l, c, a) {
      if (!r.__c.__H) return !0;
      var f = r.__c.__H.__.filter(function(d) {
        return !!d.__c;
      });
      if (f.every(function(d) {
        return !d.__N;
      })) return !o || o.call(this, l, c, a);
      var s = r.__c.props !== l;
      return f.forEach(function(d) {
        if (d.__N) {
          var u = d.__[0];
          d.__ = d.__N, d.__N = void 0, u !== d.__[0] && (s = !0);
        }
      }), o && o.call(this, l, c, a) || s;
    };
    w.__f = !0;
    var o = w.shouldComponentUpdate, _ = w.componentWillUpdate;
    w.componentWillUpdate = function(l, c, a) {
      if (this.__e) {
        var f = o;
        o = void 0, i(l, c, a), o = f;
      }
      _ && _.call(this, l, c, a);
    }, w.shouldComponentUpdate = i;
  }
  return r.__N || r.__;
}
function it(t, e) {
  var n = he(j++, 3);
  !F.__s && ot(n.__H, e) && (n.__ = t, n.u = e, w.__H.__h.push(n));
}
function G(t) {
  return ne = 5, xt(function() {
    return { current: t };
  }, []);
}
function xt(t, e) {
  var n = he(j++, 7);
  return ot(n.__H, e) && (n.__ = t(), n.__H = e, n.__h = t), n.__;
}
function Pt() {
  for (var t; t = rt.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(Y), t.__H.__h.forEach(ce), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], F.__e(e, t.__v);
  }
}
F.__b = function(t) {
  w = null, Se && Se(t);
}, F.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), xe && xe(t, e);
}, F.__r = function(t) {
  Ee && Ee(t), j = 0;
  var e = (w = t.__c).__H;
  e && (ie === w ? (e.__h = [], w.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (e.__h.forEach(Y), e.__h.forEach(ce), e.__h = [], j = 0)), ie = w;
}, F.diffed = function(t) {
  Le && Le(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (rt.push(e) !== 1 && Fe === F.requestAnimationFrame || ((Fe = F.requestAnimationFrame) || At)(Pt)), e.__H.__.forEach(function(n) {
    n.u && (n.__H = n.u), n.u = void 0;
  })), ie = w = null;
}, F.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(Y), n.__h = n.__h.filter(function(r) {
        return !r.__ || ce(r);
      });
    } catch (r) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], F.__e(r, n.__v);
    }
  }), Me && Me(t, e);
}, F.unmount = function(t) {
  Te && Te(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      Y(r);
    } catch (i) {
      e = i;
    }
  }), n.__H = void 0, e && F.__e(e, n.__v));
};
var Pe = typeof requestAnimationFrame == "function";
function At(t) {
  var e, n = function() {
    clearTimeout(r), Pe && cancelAnimationFrame(e), setTimeout(t);
  }, r = setTimeout(n, 35);
  Pe && (e = requestAnimationFrame(n));
}
function Y(t) {
  var e = w, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), w = e;
}
function ce(t) {
  var e = w;
  t.__c = t.__(), w = e;
}
function ot(t, e) {
  return !t || t.length !== e.length || e.some(function(n, r) {
    return n !== t[r];
  });
}
function st(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Vt(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function Ae(t, e) {
  for (var n in t) if (n !== "__source" && !(n in e)) return !0;
  for (var r in e) if (r !== "__source" && t[r] !== e[r]) return !0;
  return !1;
}
function Ve(t, e) {
  this.props = t, this.context = e;
}
(Ve.prototype = new $()).isPureReactComponent = !0, Ve.prototype.shouldComponentUpdate = function(t, e) {
  return Ae(this.props, t) || Ae(this.state, e);
};
var Ue = h.__b;
h.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Ue && Ue(t);
};
var Ut = h.__e;
h.__e = function(t, e, n, r) {
  if (t.then) {
    for (var i, o = e; o = o.__; ) if ((i = o.__c) && i.__c) return e.__e == null && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
  }
  Ut(t, e, n, r);
};
var $e = h.unmount;
function _t(t, e, n) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), t.__c.__H = null), (t = Vt({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
    return _t(r, e, n);
  })), t;
}
function lt(t, e, n) {
  return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
    return lt(r, e, n);
  }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
}
function oe() {
  this.__u = 0, this.o = null, this.__b = null;
}
function at(t) {
  var e = t.__.__c;
  return e && e.__a && e.__a(t);
}
function Z() {
  this.i = null, this.l = null;
}
h.unmount = function(t) {
  var e = t.__c;
  e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), $e && $e(t);
}, (oe.prototype = new $()).__c = function(t, e) {
  var n = e.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var i = at(r.__v), o = !1, _ = function() {
    o || (o = !0, n.__R = null, i ? i(l) : l());
  };
  n.__R = _;
  var l = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var c = r.state.__a;
        r.__v.__k[0] = lt(c, c.__c.__P, c.__c.__O);
      }
      var a;
      for (r.setState({ __a: r.__b = null }); a = r.o.pop(); ) a.forceUpdate();
    }
  };
  r.__u++ || 32 & e.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), t.then(_, _);
}, oe.prototype.componentWillUnmount = function() {
  this.o = [];
}, oe.prototype.render = function(t, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = _t(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var i = e.__a && le(O, null, t.fallback);
  return i && (i.__u &= -33), [le(O, null, e.__a ? null : t.children), i];
};
var Re = function(t, e, n) {
  if (++n[1] === n[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size)) for (n = t.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    t.i = n = n[2];
  }
};
(Z.prototype = new $()).__a = function(t) {
  var e = this, n = at(e.__v), r = e.l.get(t);
  return r[0]++, function(i) {
    var o = function() {
      e.props.revealOrder ? (r.push(i), Re(e, t, r)) : i();
    };
    n ? n(o) : o();
  };
}, Z.prototype.render = function(t) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var e = te(t.children);
  t.revealOrder && t.revealOrder[0] === "b" && e.reverse();
  for (var n = e.length; n--; ) this.l.set(e[n], this.i = [1, 0, this.i]);
  return t.children;
}, Z.prototype.componentDidUpdate = Z.prototype.componentDidMount = function() {
  var t = this;
  this.l.forEach(function(e, n) {
    Re(t, n, e);
  });
};
var $t = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Rt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Nt = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Ht = /[A-Z0-9]/g, It = typeof document < "u", qt = function(t) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
};
$.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty($.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(e) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
  } });
});
var Ne = h.event;
function Dt() {
}
function Ot() {
  return this.cancelBubble;
}
function Xt() {
  return this.defaultPrevented;
}
h.event = function(t) {
  return Ne && (t = Ne(t)), t.persist = Dt, t.isPropagationStopped = Ot, t.isDefaultPrevented = Xt, t.nativeEvent = t;
};
var Bt = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, He = h.vnode;
h.vnode = function(t) {
  typeof t.type == "string" && function(e) {
    var n = e.props, r = e.type, i = {}, o = r.indexOf("-") === -1;
    for (var _ in n) {
      var l = n[_];
      if (!(_ === "value" && "defaultValue" in n && l == null || It && _ === "children" && r === "noscript" || _ === "class" || _ === "className")) {
        var c = _.toLowerCase();
        _ === "defaultValue" && "value" in n && n.value == null ? _ = "value" : _ === "download" && l === !0 ? l = "" : c === "translate" && l === "no" ? l = !1 : c[0] === "o" && c[1] === "n" ? c === "ondoubleclick" ? _ = "ondblclick" : c !== "onchange" || r !== "input" && r !== "textarea" || qt(n.type) ? c === "onfocus" ? _ = "onfocusin" : c === "onblur" ? _ = "onfocusout" : Nt.test(_) && (_ = c) : c = _ = "oninput" : o && Rt.test(_) ? _ = _.replace(Ht, "-$&").toLowerCase() : l === null && (l = void 0), c === "oninput" && i[_ = c] && (_ = "oninputCapture"), i[_] = l;
      }
    }
    r == "select" && i.multiple && Array.isArray(i.value) && (i.value = te(n.children).forEach(function(a) {
      a.props.selected = i.value.indexOf(a.props.value) != -1;
    })), r == "select" && i.defaultValue != null && (i.value = te(n.children).forEach(function(a) {
      a.props.selected = i.multiple ? i.defaultValue.indexOf(a.props.value) != -1 : i.defaultValue == a.props.value;
    })), n.class && !n.className ? (i.class = n.class, Object.defineProperty(i, "className", Bt)) : (n.className && !n.class || n.class && n.className) && (i.class = i.className = n.className), e.props = i;
  }(t), t.$$typeof = $t, He && He(t);
};
var Ie = h.__r;
h.__r = function(t) {
  Ie && Ie(t), t.__c;
};
var qe = h.diffed;
h.diffed = function(t) {
  qe && qe(t);
  var e = t.props, n = t.__e;
  n != null && t.type === "textarea" && "value" in e && e.value !== n.value && (n.value = e.value == null ? "" : e.value);
};
function Wt() {
  return /* @__PURE__ */ y("svg", { class: "cc-icon", viewBox: "0 0 24 24", width: "15", height: "15", children: /* @__PURE__ */ y(
    "text",
    {
      x: "50%",
      y: "58%",
      "font-size": "15",
      fill: "currentColor",
      "dominant-baseline": "middle",
      "text-anchor": "middle",
      children: "CC"
    }
  ) });
}
function Qt() {
  return /* @__PURE__ */ y("svg", { viewBox: "0 0 24 24", width: "15", height: "15", children: /* @__PURE__ */ y(
    "path",
    {
      fill: "currentColor",
      d: "M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
    }
  ) });
}
function jt() {
  return /* @__PURE__ */ y("svg", { viewBox: "0 0 24 24", width: "15", height: "15", children: /* @__PURE__ */ y(
    "path",
    {
      fill: "currentColor",
      d: "M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
    }
  ) });
}
function zt() {
  return /* @__PURE__ */ y("svg", { viewBox: "0 0 24 24", width: "15", height: "15", children: /* @__PURE__ */ y("path", { fill: "currentColor", d: "M14,19H18V5H14M6,19H10V5H6V19Z" }) });
}
function Kt() {
  return /* @__PURE__ */ y("svg", { viewBox: "0 0 24 24", width: "15", height: "15", children: /* @__PURE__ */ y("path", { fill: "currentColor", d: "M8,5.14V19.14L19,12.14L8,5.14Z" }) });
}
function Zt({
  onClickMute: t,
  onClickPlayPause: e,
  isMuted: n,
  isPlaying: r,
  ccButtonLabel: i,
  onClickCcButton: o,
  isCcActive: _
}) {
  return /* @__PURE__ */ y("div", { class: "rm-video-controls-container", children: /* @__PURE__ */ y("div", { class: "controls", children: [
    /* @__PURE__ */ y("div", { class: "play-pause-container", children: /* @__PURE__ */ y(
      "button",
      {
        class: "play-pause-btn",
        onClick: e,
        "data-testid": "play-button",
        "aria-label": r ? "Pause" : "Play",
        children: r ? /* @__PURE__ */ y(zt, {}) : /* @__PURE__ */ y(Kt, {})
      }
    ) }),
    /* @__PURE__ */ y("div", { class: "volume-container", children: /* @__PURE__ */ y(
      "button",
      {
        class: "mute-btn",
        onClick: t,
        "data-testid": "mute-button",
        "aria-label": n ? "Unmute" : "Mute",
        children: n ? /* @__PURE__ */ y(Qt, {}) : /* @__PURE__ */ y(jt, {})
      }
    ) }),
    /* @__PURE__ */ y("div", { class: "cc-container", children: /* @__PURE__ */ y(
      "button",
      {
        class: `cc-btn ${_ ? "active" : "disabled"}`,
        onClick: o,
        "aria-label": i || "Closed Captions Button",
        children: /* @__PURE__ */ y(Wt, {})
      }
    ) })
  ] }) });
}
function Jt({
  fallbackImage: t,
  optionalVideoRedirectUrl: e,
  optionalRedirectTarget: n
}) {
  return /* @__PURE__ */ y("a", { href: e, target: n, children: /* @__PURE__ */ y("img", { class: "rm-video-fallback-image", src: t }) });
}
class De {
  constructor(e, n) {
    q(this, "currentLoop", 1);
    q(this, "adImpressionSent", !1);
    q(this, "adStartedSent", !1);
    q(this, "adFirstQuartileSent", !1);
    q(this, "adMidpointSent", !1);
    q(this, "adThirdQuartileSent", !1);
    q(this, "adCompletedSent", !1);
    this.vastInformation = e, this.mediaEvents = n;
  }
  setTime(e, n, r) {
    const i = e / n * 100;
    this.currentLoop == 1 && (i >= 0.01 && !this.adStartedSent && (this.sendAdImpression(), this.sendAdStarted(n, r)), i >= 25 && !this.adFirstQuartileSent && this.sendFirstQuartile(), i >= 50 && !this.adMidpointSent && this.sendMidpoint(), i >= 75 && !this.adThirdQuartileSent && this.sendThirdQuartile());
  }
  loop() {
    this.currentLoop === 1 && (P(this.vastInformation.beacons.adCompleted), this.mediaEvents && this.mediaEvents.complete(), this.adCompletedSent = !0), this.currentLoop++;
  }
  pause() {
    P(this.vastInformation.beacons.pause), this.mediaEvents && this.mediaEvents.pause();
  }
  play() {
    P(this.vastInformation.beacons.resume), this.mediaEvents && this.mediaEvents.resume();
  }
  mute() {
    P(this.vastInformation.beacons.mute), this.mediaEvents && this.mediaEvents.volumeChange(0);
  }
  unmute(e) {
    P(this.vastInformation.beacons.unmute), this.mediaEvents && this.mediaEvents.volumeChange(e);
  }
  bufferStart() {
    this.mediaEvents && this.mediaEvents.bufferStart();
  }
  bufferFinish() {
    this.mediaEvents && this.mediaEvents.bufferFinish();
  }
  // Beacons track when the video ad is loaded and displayed to the user
  sendAdImpression() {
    P(this.vastInformation.beacons.impression), this.adImpressionSent = !0;
  }
  sendAdStarted(e, n) {
    P(this.vastInformation.beacons.adStarted), this.mediaEvents && this.mediaEvents.start(e, n), this.adStartedSent = !0;
  }
  sendFirstQuartile() {
    P(this.vastInformation.beacons.adFirstQuartile), this.mediaEvents && this.mediaEvents.firstQuartile(), this.adFirstQuartileSent = !0;
  }
  sendMidpoint() {
    P(this.vastInformation.beacons.adMidpoint), this.mediaEvents && this.mediaEvents.midpoint(), this.adMidpointSent = !0;
  }
  sendThirdQuartile() {
    P(this.vastInformation.beacons.adThirdQuartile), this.mediaEvents && this.mediaEvents.thirdQuartile(), this.adThirdQuartileSent = !0;
  }
}
const P = (t) => {
  if (t !== void 0)
    try {
      const e = new URL(t);
      navigator.sendBeacon(e);
    } catch (e) {
      console.error("Could not send beacon", e);
    }
};
async function Gt(t, e, n) {
  if (t.adVerifications.length < 1)
    return console.log("No ad verifications found"), null;
  if (e === "" || n === "")
    return console.log("Missing sessionClientUrl or omWebUrl. Abort loading OMID verification."), null;
  if ((!window.OmidSessionClient || !window.OmidSessionClient.default) && await Yt(e, n), !window.OmidSessionClient || !window.OmidSessionClient.default)
    return console.error("OMID Session Client not loaded"), null;
  const r = window.OmidSessionClient.default, i = r.AdSession, o = r.Partner, _ = r.Context, l = r.VerificationScriptResource, c = r.MediaEvents, a = r.AdEvents, f = window.location.href, s = "criteo", d = Object.keys(window.OmidSessionClient)[0], u = new o(s, d), g = window.top, k = [];
  for (const M of t.adVerifications) {
    if (M.apiFramework != "omid") {
      if (console.log(
        "detected non-omid compatible script, skipping load, attempting to fire verificationNotExecuted"
      ), !t.beacons.verificationNotExecuted) {
        console.log("Failed to load verificationNotExecuted beacon");
        continue;
      }
      P(t.beacons.verificationNotExecuted), console.log(
        t.beacons.verificationNotExecuted,
        "verificationNotExecuted beacon dropped"
      );
      continue;
    }
    k.push(
      new l(
        M.javascriptResource,
        M.vendor,
        M.verificationParameters,
        "full"
      )
    );
  }
  if (k.length < 1)
    return console.log("no valid verification tags detected"), null;
  const C = new _(u, k, f);
  C.setServiceWindow(g);
  const v = new i(C);
  if (v.setCreativeType("video"), v.setImpressionType("beginToRender"), !v.isSupported())
    return console.log("This AdSession is not supported"), null;
  const m = new a(v), T = r.VastProperties, L = new c(v);
  return v.start(), { onAdLoaded: () => {
    v.registerSessionObserver((M) => {
      if (M.type === "sessionStart") {
        const V = new T(!1, 0, !0, "standalone");
        m.loaded(V), m.impressionOccurred(), console.log("OMID AdEvent loaded and impression occurred");
      }
    });
  }, mediaEvents: L, setVideoContext: (M) => {
    C.setVideoElement(M);
  } };
}
async function Yt(t, e) {
  try {
    await Oe(t), await Oe(e);
  } catch (n) {
    console.error(n);
  }
}
function Oe(t) {
  return new Promise((e, n) => {
    const r = document.createElement("script");
    r.src = t, r.onload = () => e(), r.onerror = () => n(new Error(`Failed to load script ${t}`)), document.head.appendChild(r);
  });
}
function en(t) {
  const { mediaFiles: e, targetDimensions: n } = t;
  let r;
  const i = {
    mediaUrl: void 0,
    closedCaptionFile: void 0,
    closedCaptionLanguage: void 0
  };
  if (e.length === 0) return i;
  if (n && (r = n.width / n.height), e.length === 1 || e.length > 1 && (!n || !r || e.every((l) => l.aspectRatio === void 0))) {
    const l = e[0];
    return i.mediaUrl = l.mediaUrl, i.closedCaptionFile = l.closedCaptionFile || void 0, i.closedCaptionLanguage = l.closedCaptionLanguage || "", i;
  }
  e.sort((l, c) => {
    const a = l.aspectRatio ?? 0, f = c.aspectRatio ?? 0;
    return a - f;
  });
  let o = null, _ = 1 / 0;
  for (const l of e) {
    let c = 1 / 0;
    if (typeof l.aspectRatio == "number" && typeof r == "number" && (c = Math.abs(l.aspectRatio - r)), c < _ && (_ = c, o = l), o && o.mediaUrl !== l.mediaUrl && o.aspectRatio === l.aspectRatio) {
      const a = n == null ? void 0 : n.width, f = n == null ? void 0 : n.height, s = Xe(a, l.width), d = Be(f, l.height), u = Xe(a, o.width), g = Be(f, o.height), k = s + d, C = u + g;
      k < C && (o = l);
    }
  }
  return i.mediaUrl = o == null ? void 0 : o.mediaUrl, i.closedCaptionFile = (o == null ? void 0 : o.closedCaptionFile) || void 0, i.closedCaptionLanguage = (o == null ? void 0 : o.closedCaptionLanguage) || "", i;
}
function Xe(t, e) {
  const n = typeof e == "string" ? parseFloat(e) : e;
  return typeof t == "number" && typeof n == "number" ? Math.abs(t - n) : 1 / 0;
}
function Be(t, e) {
  const n = typeof e == "string" ? parseFloat(e) : e;
  return typeof t == "number" && typeof n == "number" ? Math.abs(t - n) : 1 / 0;
}
function ct(t) {
  const e = t instanceof HTMLTrackElement ? t.track : t, n = e == null ? void 0 : e.activeCues;
  if (n && n.length > 0) {
    const r = n[0];
    if ("text" in r && typeof r.text == "string")
      return r.text;
  }
  return "";
}
function tn({
  closedCaptionFile: t,
  closedCaptionLanguage: e,
  setCcContent: n
}) {
  const r = G(null), i = () => {
    var l;
    const _ = (l = r.current) == null ? void 0 : l.track;
    _ && (_.mode = "hidden");
  }, o = () => {
    n(r.current ? ct(r.current) : null);
  };
  return it(() => {
    var l;
    i();
    const _ = () => {
      var a;
      i();
      const c = (a = r.current) == null ? void 0 : a.track;
      c == null || c.addEventListener("cuechange", o);
    };
    return (l = r.current) == null || l.addEventListener("load", _), () => {
      var c;
      (c = r.current) == null || c.removeEventListener("load", _);
    };
  }, []), /* @__PURE__ */ y(
    "track",
    {
      ref: r,
      kind: "subtitles",
      src: t,
      srclang: e || "en",
      label: (e || "").toUpperCase(),
      default: !0
    }
  );
}
function nn({
  isCcActive: t,
  content: e
}) {
  return /* @__PURE__ */ y(
    "div",
    {
      class: `custom-subtitle-container ${t ? "active" : "disabled"}`,
      children: e
    }
  );
}
function rn(t) {
  const { vastInformation: e, options: n } = t, { mediaFiles: r } = e, {
    fallbackImage: i,
    altText: o,
    maxVolume: _,
    targetDimensions: l,
    ccButtonLabel: c,
    sessionClientUrl: a,
    omWebUrl: f
  } = n, s = en({ mediaFiles: r, targetDimensions: l }), d = G(null), u = G(null), g = G(!1), [k, C] = W(!0), [v, m] = W(!1), [T, L] = W(!1), [R, A] = W(!0), [M, V] = W(null), N = () => {
    C((p) => {
      var b, S;
      return p ? (b = u.current) == null || b.mute() : (S = u.current) == null || S.unmute(_ || 1), !p;
    });
  }, B = (p) => {
    var S, E;
    T && (L(!1), (S = u.current) == null || S.bufferFinish());
    const b = p.target;
    (E = u.current) == null || E.setTime(
      b.currentTime,
      b.duration,
      b.volume
    );
  }, x = () => {
    var p, b;
    (p = u.current) == null || p.loop(), (b = d.current) == null || b.play();
  }, H = () => {
    e.clickThroughUrl ? (P(e.beacons.clickThrough), window.open(e.clickThroughUrl, "_self")) : (v ? d.current.pause() : d.current.play(), m(!v), g.current = !v);
  }, dt = () => {
    new IntersectionObserver(
      (b) => {
        for (let S = 0; S < b.length; S++) {
          let I = b[S].isIntersecting;
          I && !g.current ? (d.current.play(), m(!0), g.current = !0) : !I && g.current && (d.current.pause(), m(!1), g.current = !1);
        }
      },
      { threshold: 0.5 }
    ).observe(d.current);
  }, ft = async () => {
    const p = await Gt(
      e,
      a || "",
      f || ""
    );
    if (p === null) {
      u.current = new De(e, null);
      return;
    }
    const { onAdLoaded: b, setVideoContext: S, mediaEvents: E } = p;
    u.current = new De(e, E), S(d.current), d.current.addEventListener("canplay", b, { once: !0 });
  };
  it(() => {
    async function p() {
      await ft(), dt(), ht(), mt();
    }
    p();
  }, []);
  const ve = () => {
    m((p) => {
      var S, E;
      const b = !p;
      return p ? (d.current.pause(), (S = u.current) == null || S.pause()) : (d.current.play(), (E = u.current) == null || E.play()), g.current = b, b;
    });
  }, pt = () => {
    var p;
    L(!0), (p = u.current) == null || p.bufferStart();
  }, me = (p) => {
    p && typeof p.preventDefault == "function" && p.preventDefault(), A((b) => {
      var I, ge;
      const S = !b, E = (ge = (I = d.current) == null ? void 0 : I.textTracks) == null ? void 0 : ge[0];
      return V(ct(E)), S;
    });
  }, ht = () => {
    A(!!s.closedCaptionFile);
  }, ye = () => {
    var p;
    return ((p = d.current) == null ? void 0 : p.parentElement) ?? null;
  }, vt = (p, b) => !!p && !!b && (p === b || p.contains(b)), mt = () => {
    const p = ye();
    p && p.addEventListener("keydown", yt);
  }, yt = (p) => {
    const b = ye(), S = document.activeElement;
    if (!vt(b, S) || p.key === "Tab") return;
    const E = p.code || p.key, I = (p.key || "").toLowerCase();
    if (S === d.current && (E === "Space" || p.key === " ")) {
      p.preventDefault(), ve();
      return;
    }
    if (E === "KeyM" || I === "m") {
      p.preventDefault(), N();
      return;
    }
    if (E === "KeyC" || I === "c") {
      p.preventDefault(), me(p);
      return;
    }
  };
  return /* @__PURE__ */ y("div", { class: "rm-video-player-container", children: [
    /* @__PURE__ */ y(
      "video",
      {
        ref: d,
        class: "rm-ad-player",
        muted: k,
        playsInline: !0,
        "webkit-playsInline": !0,
        disablePictureInPicture: !0,
        "aria-label": o,
        src: s.mediaUrl,
        onTimeUpdate: B,
        onEnded: x,
        onClick: H,
        onWaiting: pt,
        "data-testid": "video-element",
        volume: _,
        tabIndex: 0,
        crossorigin: "anonymous",
        children: [
          (i == null ? void 0 : i.src) && (i == null ? void 0 : i.optionalVideoRedirectUrl) && (i == null ? void 0 : i.optionalRedirectTarget) && /* @__PURE__ */ y(
            Jt,
            {
              fallbackImage: i == null ? void 0 : i.src,
              optionalVideoRedirectUrl: i == null ? void 0 : i.optionalVideoRedirectUrl,
              optionalRedirectTarget: i == null ? void 0 : i.optionalRedirectTarget
            }
          ),
          /* @__PURE__ */ y(
            tn,
            {
              closedCaptionFile: s.closedCaptionFile,
              closedCaptionLanguage: s.closedCaptionLanguage,
              setCcContent: V
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ y(
      Zt,
      {
        onClickPlayPause: ve,
        onClickMute: N,
        isMuted: k,
        isPlaying: v,
        ccButtonLabel: c,
        onClickCcButton: me,
        isCcActive: R
      }
    ),
    /* @__PURE__ */ y(
      nn,
      {
        isCcActive: R,
        content: M
      }
    )
  ] });
}
const ut = async (t, e, n) => {
  Lt(
    /* @__PURE__ */ y(rn, { options: n, vastInformation: t }),
    document.getElementById(e)
  );
}, sn = async (t, e, n) => {
  const i = await new We().getFromUrl(t);
  return ut(i, e, n);
}, _n = async (t, e, n) => {
  const i = await new We().getFromContent(t);
  return ut(i, e, n);
};
export {
  _n as criteoVideoPlayerFromContent,
  sn as criteoVideoPlayerFromUrl
};
