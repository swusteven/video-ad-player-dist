var gt = Object.defineProperty;
var bt = (t, e, n) => e in t ? gt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var R = (t, e, n) => bt(t, typeof e != "symbol" ? e + "" : e, n);
function Ct(t) {
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
      (a) => {
        const c = Ct(this.queryXMLText(a)), l = this.queryXMLAttribute(a, "width"), f = this.queryXMLAttribute(a, "height"), s = l && f ? parseInt(l) / parseInt(f) : void 0, d = i ?? this.queryXMLFile(a, "ClosedCaptionFiles > ClosedCaptionFile"), u = o ?? this.queryXMLAttribute(
          a.querySelector("ClosedCaptionFiles > ClosedCaptionFile"),
          "language"
        );
        return {
          mediaUrl: c,
          width: l,
          height: f,
          aspectRatio: s,
          closedCaptionFile: d,
          closedCaptionLanguage: u
        };
      }
    );
  }
}
var re, h, Qe, D, be, je, ze, Ke, ue, se, _e, Q = {}, Ze = [], wt = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, z = Array.isArray;
function V(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function fe(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function ae(t, e, n) {
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
function U(t, e) {
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
function Ce(t) {
  (!t.__d && (t.__d = !0) && D.push(t) && !ee.__r++ || be != h.debounceRendering) && ((be = h.debounceRendering) || je)(ee);
}
function ee() {
  for (var t, e, n, r, i, o, _, a = 1; D.length; ) D.length > a && D.sort(ze), t = D.shift(), a = D.length, t.__d && (n = void 0, i = (r = (e = t).__v).__e, o = [], _ = [], e.__P && ((n = V({}, r)).__v = r.__v + 1, h.vnode && h.vnode(n), de(e.__P, n, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [i] : null, o, i ?? X(r), !!(32 & r.__u), _), n.__v = r.__v, n.__.__k[n.__i] = n, et(o, n, _), n.__e != i && Je(n)));
  ee.__r = 0;
}
function Ge(t, e, n, r, i, o, _, a, c, l, f) {
  var s, d, u, C, F, g, m, v = r && r.__k || Ze, S = e.length;
  for (c = kt(n, e, v, c, S), s = 0; s < S; s++) (u = n.__k[s]) != null && (d = u.__i == -1 ? Q : v[u.__i] || Q, u.__i = s, g = de(t, u, d, i, o, _, a, c, l, f), C = u.__e, u.ref && d.ref != u.ref && (d.ref && pe(d.ref, null, u), f.push(u.ref, u.__c || C, u)), F == null && C != null && (F = C), (m = !!(4 & u.__u)) || d.__k === u.__k ? c = Ye(u, c, t, m) : typeof u.type == "function" && g !== void 0 ? c = g : C && (c = C.nextSibling), u.__u &= -7);
  return n.__e = F, c;
}
function kt(t, e, n, r, i) {
  var o, _, a, c, l, f = n.length, s = f, d = 0;
  for (t.__k = new Array(i), o = 0; o < i; o++) (_ = e[o]) != null && typeof _ != "boolean" && typeof _ != "function" ? (c = o + d, (_ = t.__k[o] = typeof _ == "string" || typeof _ == "number" || typeof _ == "bigint" || _.constructor == String ? J(null, _, null, null, null) : z(_) ? J(O, { children: _ }, null, null, null) : _.constructor == null && _.__b > 0 ? J(_.type, _.props, _.key, _.ref ? _.ref : null, _.__v) : _).__ = t, _.__b = t.__b + 1, a = null, (l = _.__i = Et(_, n, c, s)) != -1 && (s--, (a = n[l]) && (a.__u |= 2)), a == null || a.__v == null ? (l == -1 && (i > f ? d-- : i < f && d++), typeof _.type != "function" && (_.__u |= 4)) : l != c && (l == c - 1 ? d-- : l == c + 1 ? d++ : (l > c ? d-- : d++, _.__u |= 4))) : t.__k[o] = null;
  if (s) for (o = 0; o < f; o++) (a = n[o]) != null && !(2 & a.__u) && (a.__e == r && (r = X(a)), nt(a, a));
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
function Et(t, e, n, r) {
  var i, o, _, a = t.key, c = t.type, l = e[n], f = l != null && (2 & l.__u) == 0;
  if (l === null && t.key == null || f && a == l.key && c == l.type) return n;
  if (r > (f ? 1 : 0)) {
    for (i = n - 1, o = n + 1; i >= 0 || o < e.length; ) if ((l = e[_ = i >= 0 ? i-- : o++]) != null && !(2 & l.__u) && a == l.key && c == l.type) return _;
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
function de(t, e, n, r, i, o, _, a, c, l) {
  var f, s, d, u, C, F, g, m, v, S, L, A, $, M, I, q, B, T = e.type;
  if (e.constructor != null) return null;
  128 & n.__u && (c = !!(32 & n.__u), o = [a = e.__e = n.__e]), (f = h.__b) && f(e);
  e: if (typeof T == "function") try {
    if (m = e.props, v = "prototype" in T && T.prototype.render, S = (f = T.contextType) && r[f.__c], L = f ? S ? S.props.value : f.__ : r, n.__c ? g = (s = e.__c = n.__c).__ = s.__E : (v ? e.__c = s = new T(m, L) : (e.__c = s = new U(m, L), s.constructor = T, s.render = St), S && S.sub(s), s.props = m, s.state || (s.state = {}), s.context = L, s.__n = r, d = s.__d = !0, s.__h = [], s._sb = []), v && s.__s == null && (s.__s = s.state), v && T.getDerivedStateFromProps != null && (s.__s == s.state && (s.__s = V({}, s.__s)), V(s.__s, T.getDerivedStateFromProps(m, s.__s))), u = s.props, C = s.state, s.__v = e, d) v && T.getDerivedStateFromProps == null && s.componentWillMount != null && s.componentWillMount(), v && s.componentDidMount != null && s.__h.push(s.componentDidMount);
    else {
      if (v && T.getDerivedStateFromProps == null && m !== u && s.componentWillReceiveProps != null && s.componentWillReceiveProps(m, L), !s.__e && s.shouldComponentUpdate != null && s.shouldComponentUpdate(m, s.__s, L) === !1 || e.__v == n.__v) {
        for (e.__v != n.__v && (s.props = m, s.state = s.__s, s.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(H) {
          H && (H.__ = e);
        }), A = 0; A < s._sb.length; A++) s.__h.push(s._sb[A]);
        s._sb = [], s.__h.length && _.push(s);
        break e;
      }
      s.componentWillUpdate != null && s.componentWillUpdate(m, s.__s, L), v && s.componentDidUpdate != null && s.__h.push(function() {
        s.componentDidUpdate(u, C, F);
      });
    }
    if (s.context = L, s.props = m, s.__P = t, s.__e = !1, $ = h.__r, M = 0, v) {
      for (s.state = s.__s, s.__d = !1, $ && $(e), f = s.render(s.props, s.state, s.context), I = 0; I < s._sb.length; I++) s.__h.push(s._sb[I]);
      s._sb = [];
    } else do
      s.__d = !1, $ && $(e), f = s.render(s.props, s.state, s.context), s.state = s.__s;
    while (s.__d && ++M < 25);
    s.state = s.__s, s.getChildContext != null && (r = V(V({}, r), s.getChildContext())), v && !d && s.getSnapshotBeforeUpdate != null && (F = s.getSnapshotBeforeUpdate(u, C)), q = f, f != null && f.type === O && f.key == null && (q = tt(f.props.children)), a = Ge(t, z(q) ? q : [q], e, n, r, i, o, _, a, c, l), s.base = e.__e, e.__u &= -161, s.__h.length && _.push(s), g && (s.__E = s.__ = null);
  } catch (H) {
    if (e.__v = null, c || o != null) if (H.then) {
      for (e.__u |= c ? 160 : 128; a && a.nodeType == 8 && a.nextSibling; ) a = a.nextSibling;
      o[o.indexOf(a)] = null, e.__e = a;
    } else {
      for (B = o.length; B--; ) fe(o[B]);
      le(e);
    }
    else e.__e = n.__e, e.__k = n.__k, H.then || le(e);
    h.__e(H, e, n);
  }
  else o == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : a = e.__e = Ft(n.__e, e, n, r, i, o, _, c, l);
  return (f = h.diffed) && f(e), 128 & e.__u ? void 0 : a;
}
function le(t) {
  t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(le);
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
  return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : z(t) ? t.map(tt) : V({}, t);
}
function Ft(t, e, n, r, i, o, _, a, c) {
  var l, f, s, d, u, C, F, g = n.props, m = e.props, v = e.type;
  if (v == "svg" ? i = "http://www.w3.org/2000/svg" : v == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), o != null) {
    for (l = 0; l < o.length; l++) if ((u = o[l]) && "setAttribute" in u == !!v && (v ? u.localName == v : u.nodeType == 3)) {
      t = u, o[l] = null;
      break;
    }
  }
  if (t == null) {
    if (v == null) return document.createTextNode(m);
    t = document.createElementNS(i, v, m.is && m), a && (h.__m && h.__m(e, o), a = !1), o = null;
  }
  if (v == null) g === m || a && t.data == m || (t.data = m);
  else {
    if (o = o && re.call(t.childNodes), g = n.props || Q, !a && o != null) for (g = {}, l = 0; l < t.attributes.length; l++) g[(u = t.attributes[l]).name] = u.value;
    for (l in g) if (u = g[l], l != "children") {
      if (l == "dangerouslySetInnerHTML") s = u;
      else if (!(l in m)) {
        if (l == "value" && "defaultValue" in m || l == "checked" && "defaultChecked" in m) continue;
        K(t, l, null, u, i);
      }
    }
    for (l in m) u = m[l], l == "children" ? d = u : l == "dangerouslySetInnerHTML" ? f = u : l == "value" ? C = u : l == "checked" ? F = u : a && typeof u != "function" || g[l] === u || K(t, l, u, g[l], i);
    if (f) a || s && (f.__html == s.__html || f.__html == t.innerHTML) || (t.innerHTML = f.__html), e.__k = [];
    else if (s && (t.innerHTML = ""), Ge(e.type == "template" ? t.content : t, z(d) ? d : [d], e, n, r, v == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, o, _, o ? o[0] : n.__k && X(n, 0), a, c), o != null) for (l = o.length; l--; ) fe(o[l]);
    a || (l = "value", v == "progress" && C == null ? t.removeAttribute("value") : C != null && (C !== t[l] || v == "progress" && !C || v == "option" && C != g[l]) && K(t, l, C, g[l], i), l = "checked", F != null && F != t[l] && K(t, l, F, g[l], i));
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
  n || fe(t.__e), t.__c = t.__ = t.__e = void 0;
}
function St(t, e, n) {
  return this.constructor(t, n);
}
function Lt(t, e, n) {
  var r, i, o, _;
  e == document && (e = document.documentElement), h.__ && h.__(t, e), i = (r = !1) ? null : e.__k, o = [], _ = [], de(e, t = e.__k = ae(O, null, [t]), i || Q, Q, e.namespaceURI, i ? null : e.firstChild ? re.call(e.childNodes) : null, o, i ? i.__e : e.firstChild, r, _), et(o, t, _);
}
re = Ze.slice, h = { __e: function(t, e, n, r) {
  for (var i, o, _; e = e.__; ) if ((i = e.__c) && !i.__) try {
    if ((o = i.constructor) && o.getDerivedStateFromError != null && (i.setState(o.getDerivedStateFromError(t)), _ = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), _ = i.__d), _) return i.__E = i;
  } catch (a) {
    t = a;
  }
  throw t;
} }, Qe = 0, U.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = V({}, this.state), typeof t == "function" && (t = t(V({}, n), this.props)), t && V(n, t), t != null && this.__v && (e && this._sb.push(e), Ce(this));
}, U.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), Ce(this));
}, U.prototype.render = O, D = [], je = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ze = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, ee.__r = 0, Ke = /(PointerCapture)$|Capture$/i, ue = 0, se = ke(!1), _e = ke(!0);
var Mt = 0;
function y(t, e, n, r, i, o) {
  e || (e = {});
  var _, a, c = e;
  if ("ref" in c) for (a in c = {}, e) a == "ref" ? _ = e[a] : c[a] = e[a];
  var l = { type: t, props: c, key: n, ref: _, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --Mt, __i: -1, __u: 0, __source: i, __self: o };
  if (typeof t == "function" && (_ = t.defaultProps)) for (a in _) c[a] === void 0 && (c[a] = _[a]);
  return h.vnode && h.vnode(l), l;
}
var j, w, ie, Ee, ne = 0, rt = [], k = h, Fe = k.__b, Se = k.__r, Le = k.diffed, Me = k.__c, Te = k.unmount, Pe = k.__;
function he(t, e) {
  k.__h && k.__h(w, t, ne || e), ne = 0;
  var n = w.__H || (w.__H = { __: [], __h: [] });
  return t >= n.__.length && n.__.push({}), n.__[t];
}
function W(t) {
  return ne = 1, Tt(st, t);
}
function Tt(t, e, n) {
  var r = he(j++, 2);
  if (r.t = t, !r.__c && (r.__ = [n ? n(e) : st(void 0, e), function(a) {
    var c = r.__N ? r.__N[0] : r.__[0], l = r.t(c, a);
    c !== l && (r.__N = [l, r.__[1]], r.__c.setState({}));
  }], r.__c = w, !w.__f)) {
    var i = function(a, c, l) {
      if (!r.__c.__H) return !0;
      var f = r.__c.__H.__.filter(function(d) {
        return !!d.__c;
      });
      if (f.every(function(d) {
        return !d.__N;
      })) return !o || o.call(this, a, c, l);
      var s = r.__c.props !== a;
      return f.forEach(function(d) {
        if (d.__N) {
          var u = d.__[0];
          d.__ = d.__N, d.__N = void 0, u !== d.__[0] && (s = !0);
        }
      }), o && o.call(this, a, c, l) || s;
    };
    w.__f = !0;
    var o = w.shouldComponentUpdate, _ = w.componentWillUpdate;
    w.componentWillUpdate = function(a, c, l) {
      if (this.__e) {
        var f = o;
        o = void 0, i(a, c, l), o = f;
      }
      _ && _.call(this, a, c, l);
    }, w.shouldComponentUpdate = i;
  }
  return r.__N || r.__;
}
function it(t, e) {
  var n = he(j++, 3);
  !k.__s && ot(n.__H, e) && (n.__ = t, n.u = e, w.__H.__h.push(n));
}
function G(t) {
  return ne = 5, Pt(function() {
    return { current: t };
  }, []);
}
function Pt(t, e) {
  var n = he(j++, 7);
  return ot(n.__H, e) && (n.__ = t(), n.__H = e, n.__h = t), n.__;
}
function xt() {
  for (var t; t = rt.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(Y), t.__H.__h.forEach(ce), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], k.__e(e, t.__v);
  }
}
k.__b = function(t) {
  w = null, Fe && Fe(t);
}, k.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Pe && Pe(t, e);
}, k.__r = function(t) {
  Se && Se(t), j = 0;
  var e = (w = t.__c).__H;
  e && (ie === w ? (e.__h = [], w.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (e.__h.forEach(Y), e.__h.forEach(ce), e.__h = [], j = 0)), ie = w;
}, k.diffed = function(t) {
  Le && Le(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (rt.push(e) !== 1 && Ee === k.requestAnimationFrame || ((Ee = k.requestAnimationFrame) || At)(xt)), e.__H.__.forEach(function(n) {
    n.u && (n.__H = n.u), n.u = void 0;
  })), ie = w = null;
}, k.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(Y), n.__h = n.__h.filter(function(r) {
        return !r.__ || ce(r);
      });
    } catch (r) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], k.__e(r, n.__v);
    }
  }), Me && Me(t, e);
}, k.unmount = function(t) {
  Te && Te(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(r) {
    try {
      Y(r);
    } catch (i) {
      e = i;
    }
  }), n.__H = void 0, e && k.__e(e, n.__v));
};
var xe = typeof requestAnimationFrame == "function";
function At(t) {
  var e, n = function() {
    clearTimeout(r), xe && cancelAnimationFrame(e), setTimeout(t);
  }, r = setTimeout(n, 35);
  xe && (e = requestAnimationFrame(n));
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
function It(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function Ae(t, e) {
  for (var n in t) if (n !== "__source" && !(n in e)) return !0;
  for (var r in e) if (r !== "__source" && t[r] !== e[r]) return !0;
  return !1;
}
function Ie(t, e) {
  this.props = t, this.context = e;
}
(Ie.prototype = new U()).isPureReactComponent = !0, Ie.prototype.shouldComponentUpdate = function(t, e) {
  return Ae(this.props, t) || Ae(this.state, e);
};
var Ve = h.__b;
h.__b = function(t) {
  t.type && t.type.__f && t.ref && (t.props.ref = t.ref, t.ref = null), Ve && Ve(t);
};
var Vt = h.__e;
h.__e = function(t, e, n, r) {
  if (t.then) {
    for (var i, o = e; o = o.__; ) if ((i = o.__c) && i.__c) return e.__e == null && (e.__e = n.__e, e.__k = n.__k), i.__c(t, e);
  }
  Vt(t, e, n, r);
};
var Ue = h.unmount;
function _t(t, e, n) {
  return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), t.__c.__H = null), (t = It({}, t)).__c != null && (t.__c.__P === n && (t.__c.__P = e), t.__c.__e = !0, t.__c = null), t.__k = t.__k && t.__k.map(function(r) {
    return _t(r, e, n);
  })), t;
}
function at(t, e, n) {
  return t && n && (t.__v = null, t.__k = t.__k && t.__k.map(function(r) {
    return at(r, e, n);
  }), t.__c && t.__c.__P === e && (t.__e && n.appendChild(t.__e), t.__c.__e = !0, t.__c.__P = n)), t;
}
function oe() {
  this.__u = 0, this.o = null, this.__b = null;
}
function lt(t) {
  var e = t.__.__c;
  return e && e.__a && e.__a(t);
}
function Z() {
  this.i = null, this.l = null;
}
h.unmount = function(t) {
  var e = t.__c;
  e && e.__R && e.__R(), e && 32 & t.__u && (t.type = null), Ue && Ue(t);
}, (oe.prototype = new U()).__c = function(t, e) {
  var n = e.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var i = lt(r.__v), o = !1, _ = function() {
    o || (o = !0, n.__R = null, i ? i(a) : a());
  };
  n.__R = _;
  var a = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var c = r.state.__a;
        r.__v.__k[0] = at(c, c.__c.__P, c.__c.__O);
      }
      var l;
      for (r.setState({ __a: r.__b = null }); l = r.o.pop(); ) l.forceUpdate();
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
  var i = e.__a && ae(O, null, t.fallback);
  return i && (i.__u &= -33), [ae(O, null, e.__a ? null : t.children), i];
};
var $e = function(t, e, n) {
  if (++n[1] === n[0] && t.l.delete(e), t.props.revealOrder && (t.props.revealOrder[0] !== "t" || !t.l.size)) for (n = t.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    t.i = n = n[2];
  }
};
(Z.prototype = new U()).__a = function(t) {
  var e = this, n = lt(e.__v), r = e.l.get(t);
  return r[0]++, function(i) {
    var o = function() {
      e.props.revealOrder ? (r.push(i), $e(e, t, r)) : i();
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
    $e(t, n, e);
  });
};
var Ut = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, $t = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Ht = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Nt = /[A-Z0-9]/g, Rt = typeof document < "u", qt = function(t) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(t);
};
U.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t) {
  Object.defineProperty(U.prototype, t, { configurable: !0, get: function() {
    return this["UNSAFE_" + t];
  }, set: function(e) {
    Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
  } });
});
var He = h.event;
function Dt() {
}
function Ot() {
  return this.cancelBubble;
}
function Xt() {
  return this.defaultPrevented;
}
h.event = function(t) {
  return He && (t = He(t)), t.persist = Dt, t.isPropagationStopped = Ot, t.isDefaultPrevented = Xt, t.nativeEvent = t;
};
var Bt = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, Ne = h.vnode;
h.vnode = function(t) {
  typeof t.type == "string" && function(e) {
    var n = e.props, r = e.type, i = {}, o = r.indexOf("-") === -1;
    for (var _ in n) {
      var a = n[_];
      if (!(_ === "value" && "defaultValue" in n && a == null || Rt && _ === "children" && r === "noscript" || _ === "class" || _ === "className")) {
        var c = _.toLowerCase();
        _ === "defaultValue" && "value" in n && n.value == null ? _ = "value" : _ === "download" && a === !0 ? a = "" : c === "translate" && a === "no" ? a = !1 : c[0] === "o" && c[1] === "n" ? c === "ondoubleclick" ? _ = "ondblclick" : c !== "onchange" || r !== "input" && r !== "textarea" || qt(n.type) ? c === "onfocus" ? _ = "onfocusin" : c === "onblur" ? _ = "onfocusout" : Ht.test(_) && (_ = c) : c = _ = "oninput" : o && $t.test(_) ? _ = _.replace(Nt, "-$&").toLowerCase() : a === null && (a = void 0), c === "oninput" && i[_ = c] && (_ = "oninputCapture"), i[_] = a;
      }
    }
    r == "select" && i.multiple && Array.isArray(i.value) && (i.value = te(n.children).forEach(function(l) {
      l.props.selected = i.value.indexOf(l.props.value) != -1;
    })), r == "select" && i.defaultValue != null && (i.value = te(n.children).forEach(function(l) {
      l.props.selected = i.multiple ? i.defaultValue.indexOf(l.props.value) != -1 : i.defaultValue == l.props.value;
    })), n.class && !n.className ? (i.class = n.class, Object.defineProperty(i, "className", Bt)) : (n.className && !n.class || n.class && n.className) && (i.class = i.className = n.className), e.props = i;
  }(t), t.$$typeof = Ut, Ne && Ne(t);
};
var Re = h.__r;
h.__r = function(t) {
  Re && Re(t), t.__c;
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
class De {
  constructor(e, n) {
    R(this, "currentLoop", 1);
    R(this, "adImpressionSent", !1);
    R(this, "adStartedSent", !1);
    R(this, "adFirstQuartileSent", !1);
    R(this, "adMidpointSent", !1);
    R(this, "adThirdQuartileSent", !1);
    R(this, "adCompletedSent", !1);
    this.vastInformation = e, this.mediaEvents = n;
  }
  setTime(e, n, r) {
    const i = e / n * 100;
    this.currentLoop == 1 && (i >= 0.01 && !this.adStartedSent && this.sendAdStarted(n, r), i >= 25 && !this.adFirstQuartileSent && this.sendFirstQuartile(), i >= 50 && !this.adMidpointSent && this.sendMidpoint(), i >= 75 && !this.adThirdQuartileSent && this.sendThirdQuartile());
  }
  loop() {
    this.currentLoop === 1 && (x(this.vastInformation.beacons.adCompleted), this.mediaEvents && this.mediaEvents.complete(), this.adCompletedSent = !0), this.currentLoop++;
  }
  pause() {
    x(this.vastInformation.beacons.pause), this.mediaEvents && this.mediaEvents.pause();
  }
  play() {
    x(this.vastInformation.beacons.resume), this.mediaEvents && this.mediaEvents.resume();
  }
  mute() {
    x(this.vastInformation.beacons.mute), this.mediaEvents && this.mediaEvents.volumeChange(0);
  }
  unmute(e) {
    x(this.vastInformation.beacons.unmute), this.mediaEvents && this.mediaEvents.volumeChange(e);
  }
  bufferStart() {
    this.mediaEvents && this.mediaEvents.bufferStart();
  }
  bufferFinish() {
    this.mediaEvents && this.mediaEvents.bufferFinish();
  }
  sendAdImpression() {
    this.adImpressionSent || (x(this.vastInformation.beacons.impression), this.adImpressionSent = !0);
  }
  sendAdStarted(e, n) {
    x(this.vastInformation.beacons.adStarted), this.mediaEvents && this.mediaEvents.start(e, n), this.adStartedSent = !0;
  }
  sendFirstQuartile() {
    x(this.vastInformation.beacons.adFirstQuartile), this.mediaEvents && this.mediaEvents.firstQuartile(), this.adFirstQuartileSent = !0;
  }
  sendMidpoint() {
    x(this.vastInformation.beacons.adMidpoint), this.mediaEvents && this.mediaEvents.midpoint(), this.adMidpointSent = !0;
  }
  sendThirdQuartile() {
    x(this.vastInformation.beacons.adThirdQuartile), this.mediaEvents && this.mediaEvents.thirdQuartile(), this.adThirdQuartileSent = !0;
  }
}
const x = (t) => {
  if (t !== void 0)
    try {
      const e = new URL(t);
      navigator.sendBeacon(e);
    } catch (e) {
      console.error("Could not send beacon", e);
    }
};
async function Jt(t, e, n, r) {
  if (t.adVerifications.length < 1)
    return console.log("No ad verifications found"), null;
  if (e === "" || n === "")
    return console.log("Missing sessionClientUrl or omWebUrl. Abort loading OMID verification."), null;
  if ((!window.OmidSessionClient || !window.OmidSessionClient.default) && await Gt(e, n), !window.OmidSessionClient || !window.OmidSessionClient.default)
    return console.error("OMID Session Client not loaded"), null;
  const i = window.OmidSessionClient.default, o = i.AdSession, _ = i.Partner, a = i.Context, c = i.VerificationScriptResource, l = i.MediaEvents, f = i.AdEvents, s = window.location.href, d = "criteo", u = Object.keys(window.OmidSessionClient)[0], C = new _(d, u), F = window.top, g = [];
  for (const M of t.adVerifications) {
    if (M.apiFramework != "omid") {
      if (console.log(
        "detected non-omid compatible script, skipping load, attempting to fire verificationNotExecuted"
      ), !t.beacons.verificationNotExecuted) {
        console.log("Failed to load verificationNotExecuted beacon");
        continue;
      }
      x(t.beacons.verificationNotExecuted), console.log(
        t.beacons.verificationNotExecuted,
        "verificationNotExecuted beacon dropped"
      );
      continue;
    }
    g.push(
      new c(
        M.javascriptResource,
        M.vendor,
        M.verificationParameters,
        "full"
      )
    );
  }
  if (g.length < 1)
    return console.log("no valid verification tags detected"), null;
  const m = new a(C, g, s);
  m.setVideoElement(r.current), m.setServiceWindow(F);
  const v = new o(m);
  if (v.setCreativeType("video"), v.setImpressionType("beginToRender"), !v.isSupported())
    return console.log("This AdSession is not supported"), null;
  const S = new f(v), L = i.VastProperties, A = new l(v);
  return v.start(), { onAdLoaded: () => {
    v.registerSessionObserver((M) => {
      if (M.type === "sessionStart") {
        const I = new L(!1, 0, !0, "standalone");
        S.loaded(I), S.impressionOccurred(), console.log("OMID AdEvent loaded and impression occurred");
      }
    });
  }, mediaEvents: A };
}
async function Gt(t, e) {
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
function Yt(t) {
  const { mediaFiles: e, targetDimensions: n } = t;
  let r;
  const i = {
    mediaUrl: void 0,
    closedCaptionFile: void 0,
    closedCaptionLanguage: void 0
  };
  if (e.length === 0) return i;
  if (n && (r = n.width / n.height), e.length === 1 || e.length > 1 && (!n || !r || e.every((a) => a.aspectRatio === void 0))) {
    const a = e[0];
    return i.mediaUrl = a.mediaUrl, i.closedCaptionFile = a.closedCaptionFile || void 0, i.closedCaptionLanguage = a.closedCaptionLanguage || "", i;
  }
  e.sort((a, c) => {
    const l = a.aspectRatio ?? 0, f = c.aspectRatio ?? 0;
    return l - f;
  });
  let o = null, _ = 1 / 0;
  for (const a of e) {
    let c = 1 / 0;
    if (typeof a.aspectRatio == "number" && typeof r == "number" && (c = Math.abs(a.aspectRatio - r)), c < _ && (_ = c, o = a), o && o.mediaUrl !== a.mediaUrl && o.aspectRatio === a.aspectRatio) {
      const l = n == null ? void 0 : n.width, f = n == null ? void 0 : n.height, s = Xe(l, a.width), d = Be(f, a.height), u = Xe(l, o.width), C = Be(f, o.height), F = s + d, g = u + C;
      F < g && (o = a);
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
function en({
  closedCaptionFile: t,
  closedCaptionLanguage: e,
  setCcContent: n
}) {
  const r = G(null), i = () => {
    var a;
    const _ = (a = r.current) == null ? void 0 : a.track;
    _ && (_.mode = "hidden");
  }, o = () => {
    n(r.current ? ct(r.current) : null);
  };
  return it(() => {
    var a;
    i();
    const _ = () => {
      var l;
      i();
      const c = (l = r.current) == null ? void 0 : l.track;
      c == null || c.addEventListener("cuechange", o);
    };
    return (a = r.current) == null || a.addEventListener("load", _), () => {
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
function tn({
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
function nn(t) {
  const { vastInformation: e, options: n } = t, { mediaFiles: r } = e, {
    altText: i,
    maxVolume: o,
    targetDimensions: _,
    ccButtonLabel: a,
    sessionClientUrl: c,
    omWebUrl: l
  } = n, f = Yt({ mediaFiles: r, targetDimensions: _ }), s = G(null), d = G(null), u = G(!1), [C, F] = W(!0), [g, m] = W(!1), [v, S] = W(!1), [L, A] = W(!0), [$, M] = W(null), I = () => {
    F((p) => {
      var b, E;
      return p ? (b = d.current) == null || b.mute() : (E = d.current) == null || E.unmute(o || 1), !p;
    });
  }, q = (p) => {
    var E, P;
    v && (S(!1), (E = d.current) == null || E.bufferFinish());
    const b = p.target;
    (P = d.current) == null || P.setTime(
      b.currentTime,
      b.duration,
      b.volume
    );
  }, B = () => {
    var p, b;
    (p = d.current) == null || p.loop(), (b = s.current) == null || b.play();
  }, T = () => {
    e.clickThroughUrl ? (x(e.beacons.clickThrough), window.open(e.clickThroughUrl, "_self")) : (g ? s.current.pause() : s.current.play(), m(!g), u.current = !g);
  }, H = () => {
    new IntersectionObserver(
      (b) => {
        for (let E = 0; E < b.length; E++) {
          let N = b[E].isIntersecting;
          N && !u.current ? (s.current.play(), m(!0), u.current = !0) : !N && u.current && (s.current.pause(), m(!1), u.current = !1);
        }
      },
      { threshold: 0.5 }
    ).observe(s.current);
  }, ft = async () => {
    const p = await Jt(
      e,
      c || "",
      l || "",
      s
    );
    if (p === null) {
      d.current = new De(e, null);
      return;
    }
    const { onAdLoaded: b, mediaEvents: E } = p;
    d.current = new De(e, E), s.current.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA ? b() : s.current.addEventListener("canplay", b, { once: !0 });
  }, dt = () => {
    var p;
    s.current.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA ? (p = d.current) == null || p.sendAdImpression() : s.current.addEventListener("canplay", () => {
      var b;
      (b = d.current) == null || b.sendAdImpression();
    }, { once: !0 });
  };
  it(() => {
    async function p() {
      await ft(), dt(), H(), ht(), mt();
    }
    p();
  }, []);
  const ve = () => {
    m((p) => {
      var E, P;
      const b = !p;
      return p ? (s.current.pause(), (E = d.current) == null || E.pause()) : (s.current.play(), (P = d.current) == null || P.play()), u.current = b, b;
    });
  }, pt = () => {
    var p;
    S(!0), (p = d.current) == null || p.bufferStart();
  }, me = (p) => {
    p && typeof p.preventDefault == "function" && p.preventDefault(), A((b) => {
      var N, ge;
      const E = !b, P = (ge = (N = s.current) == null ? void 0 : N.textTracks) == null ? void 0 : ge[0];
      return M(ct(P)), E;
    });
  }, ht = () => {
    A(!!f.closedCaptionFile);
  }, ye = () => {
    var p;
    return ((p = s.current) == null ? void 0 : p.parentElement) ?? null;
  }, vt = (p, b) => !!p && !!b && (p === b || p.contains(b)), mt = () => {
    const p = ye();
    p && p.addEventListener("keydown", yt);
  }, yt = (p) => {
    const b = ye(), E = document.activeElement;
    if (!vt(b, E) || p.key === "Tab") return;
    const P = p.code || p.key, N = (p.key || "").toLowerCase();
    if (E === s.current && (P === "Space" || p.key === " ")) {
      p.preventDefault(), ve();
      return;
    }
    if (P === "KeyM" || N === "m") {
      p.preventDefault(), I();
      return;
    }
    if (P === "KeyC" || N === "c") {
      p.preventDefault(), me(p);
      return;
    }
  };
  return /* @__PURE__ */ y("div", { class: "rm-video-player-container", children: [
    /* @__PURE__ */ y(
      "video",
      {
        ref: s,
        class: "rm-ad-player",
        muted: C,
        playsInline: !0,
        "webkit-playsInline": !0,
        disablePictureInPicture: !0,
        "aria-label": i,
        src: f.mediaUrl,
        onTimeUpdate: q,
        onEnded: B,
        onClick: T,
        onWaiting: pt,
        "data-testid": "video-element",
        volume: o,
        tabIndex: 0,
        crossorigin: "anonymous",
        children: /* @__PURE__ */ y(
          en,
          {
            closedCaptionFile: f.closedCaptionFile,
            closedCaptionLanguage: f.closedCaptionLanguage,
            setCcContent: M
          }
        )
      }
    ),
    /* @__PURE__ */ y(
      Zt,
      {
        onClickPlayPause: ve,
        onClickMute: I,
        isMuted: C,
        isPlaying: g,
        ccButtonLabel: a,
        onClickCcButton: me,
        isCcActive: L
      }
    ),
    /* @__PURE__ */ y(
      tn,
      {
        isCcActive: L,
        content: $
      }
    )
  ] });
}
const ut = async (t, e, n) => {
  Lt(
    /* @__PURE__ */ y(nn, { options: n, vastInformation: t }),
    document.getElementById(e)
  );
}, on = async (t, e, n) => {
  const i = await new We().getFromUrl(t);
  return ut(i, e, n);
}, sn = async (t, e, n) => {
  const i = await new We().getFromContent(t);
  return ut(i, e, n);
};
export {
  sn as criteoVideoPlayerFromContent,
  on as criteoVideoPlayerFromUrl
};
