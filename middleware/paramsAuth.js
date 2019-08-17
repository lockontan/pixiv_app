module.exports = function (ctx, next) {
	try {
		const url = ctx.request.url
		if (url.indexOf('/api/ranking/date') === 0) {
			return next()
		}
		let request = ctx.request
	  let query = request.query
	  const isSign = sign(query.p) === query.s
	  const params = JSON.parse(query.p)
	  const isParmas = Object.keys(params).every(key => params[key] == query[key])
	  if (isSign && isParmas) {
	  	return next()
	  } else {
	  	throw new Error()
	  }
	} catch(e) {
		ctx.body = {
      code: 500,
      data: []
    }
	}
}

function sign(e) {
  function t(e, t) {
    return e << t | e >>> 32 - t
  }
  function n(e, t) {
    var n, r, o, i, a;
    return o = 2147483648 & e,
    i = 2147483648 & t,
    n = 1073741824 & e,
    r = 1073741824 & t,
    a = (1073741823 & e) + (1073741823 & t),
    n & r ? 2147483648 ^ a ^ o ^ i : n | r ? 1073741824 & a ? 3221225472 ^ a ^ o ^ i : 1073741824 ^ a ^ o ^ i : a ^ o ^ i
  }
  function r(e, t, n) {
    return e & t | ~e & n
  }
  function o(e, t, n) {
    return e & n | t & ~n
  }
  function i(e, t, n) {
    return e ^ t ^ n
  }
  function a(e, t, n) {
    return t ^ (e | ~n)
  }
  function l(e, o, i, a, l, s, u) {
    return e = n(e, n(n(r(o, i, a), l), u)),
    n(t(e, s), o)
  }
  function s(e, r, i, a, l, s, u) {
    return e = n(e, n(n(o(r, i, a), l), u)),
    n(t(e, s), r)
  }
  function u(e, r, o, a, l, s, u) {
    return e = n(e, n(n(i(r, o, a), l), u)),
    n(t(e, s), r)
  }
  function c(e, r, o, i, l, s, u) {
    return e = n(e, n(n(a(r, o, i), l), u)),
    n(t(e, s), r)
  }
  function p(e) {
    for (var t, n = e.length, r = n + 8, o = 16 * ((r - r % 64) / 64 + 1), i = new Array(o - 1), a = 0, l = 0; n > l; )
      t = (l - l % 4) / 4,
      a = l % 4 * 8,
      i[t] = i[t] | e.charCodeAt(l) << a,
      l++;
    return t = (l - l % 4) / 4,
    a = l % 4 * 8,
    i[t] = i[t] | 128 << a,
    i[o - 2] = n << 3,
    i[o - 1] = n >>> 29,
    i
  }
  function f(e) {
    var t, n, r = "", o = "";
    for (n = 0; 3 >= n; n++)
      t = e >>> 8 * n & 255,
      o = "0" + t.toString(16),
      r += o.substr(o.length - 2, 2);
    return r
  }
  function d(e) {
    e = e.replace(/\r\n/g, "\n");
    for (var t = "", n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n);
      128 > r ? t += String.fromCharCode(r) : r > 127 && 2048 > r ? (t += String.fromCharCode(r >> 6 | 192),
      t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
      t += String.fromCharCode(r >> 6 & 63 | 128),
      t += String.fromCharCode(63 & r | 128))
    }
    return t
  }
  var h, m, y, g, b, v, w, _, x, O = [], T = 7, P = 12, S = 17, E = 22, k = 5, C = 9, j = 14, A = 20, I = 4, N = 11, R = 16, M = 23, L = 6, D = 10, F = 15, B = 21;
  for (e = d(e),
  O = p(e),
  v = 1732584193,
  w = 4023233417,
  _ = 2562383102,
  x = 271733878,
  h = 0; h < O.length; h += 16)
    m = v,
    y = w,
    g = _,
    b = x,
    v = l(v, w, _, x, O[h + 0], T, 3614090360),
    x = l(x, v, w, _, O[h + 1], P, 3905402710),
    _ = l(_, x, v, w, O[h + 2], S, 606105819),
    w = l(w, _, x, v, O[h + 3], E, 3250441966),
    v = l(v, w, _, x, O[h + 4], T, 4118548399),
    x = l(x, v, w, _, O[h + 5], P, 1200080426),
    _ = l(_, x, v, w, O[h + 6], S, 2821735955),
    w = l(w, _, x, v, O[h + 7], E, 4249261313),
    v = l(v, w, _, x, O[h + 8], T, 1770035416),
    x = l(x, v, w, _, O[h + 9], P, 2336552879),
    _ = l(_, x, v, w, O[h + 10], S, 4294925233),
    w = l(w, _, x, v, O[h + 11], E, 2304563134),
    v = l(v, w, _, x, O[h + 12], T, 1804603682),
    x = l(x, v, w, _, O[h + 13], P, 4254626195),
    _ = l(_, x, v, w, O[h + 14], S, 2792965006),
    w = l(w, _, x, v, O[h + 15], E, 1236535329),
    v = s(v, w, _, x, O[h + 1], k, 4129170786),
    x = s(x, v, w, _, O[h + 6], C, 3225465664),
    _ = s(_, x, v, w, O[h + 11], j, 643717713),
    w = s(w, _, x, v, O[h + 0], A, 3921069994),
    v = s(v, w, _, x, O[h + 5], k, 3593408605),
    x = s(x, v, w, _, O[h + 10], C, 38016083),
    _ = s(_, x, v, w, O[h + 15], j, 3634488961),
    w = s(w, _, x, v, O[h + 4], A, 3889429448),
    v = s(v, w, _, x, O[h + 9], k, 568446438),
    x = s(x, v, w, _, O[h + 14], C, 3275163606),
    _ = s(_, x, v, w, O[h + 3], j, 4107603335),
    w = s(w, _, x, v, O[h + 8], A, 1163531501),
    v = s(v, w, _, x, O[h + 13], k, 2850285829),
    x = s(x, v, w, _, O[h + 2], C, 4243563512),
    _ = s(_, x, v, w, O[h + 7], j, 1735328473),
    w = s(w, _, x, v, O[h + 12], A, 2368359562),
    v = u(v, w, _, x, O[h + 5], I, 4294588738),
    x = u(x, v, w, _, O[h + 8], N, 2272392833),
    _ = u(_, x, v, w, O[h + 11], R, 1839030562),
    w = u(w, _, x, v, O[h + 14], M, 4259657740),
    v = u(v, w, _, x, O[h + 1], I, 2763975236),
    x = u(x, v, w, _, O[h + 4], N, 1272893353),
    _ = u(_, x, v, w, O[h + 7], R, 4139469664),
    w = u(w, _, x, v, O[h + 10], M, 3200236656),
    v = u(v, w, _, x, O[h + 13], I, 681279174),
    x = u(x, v, w, _, O[h + 0], N, 3936430074),
    _ = u(_, x, v, w, O[h + 3], R, 3572445317),
    w = u(w, _, x, v, O[h + 6], M, 76029189),
    v = u(v, w, _, x, O[h + 9], I, 3654602809),
    x = u(x, v, w, _, O[h + 12], N, 3873151461),
    _ = u(_, x, v, w, O[h + 15], R, 530742520),
    w = u(w, _, x, v, O[h + 2], M, 3299628645),
    v = c(v, w, _, x, O[h + 0], L, 4096336452),
    x = c(x, v, w, _, O[h + 7], D, 1126891415),
    _ = c(_, x, v, w, O[h + 14], F, 2878612391),
    w = c(w, _, x, v, O[h + 5], B, 4237533241),
    v = c(v, w, _, x, O[h + 12], L, 1700485571),
    x = c(x, v, w, _, O[h + 3], D, 2399980690),
    _ = c(_, x, v, w, O[h + 10], F, 4293915773),
    w = c(w, _, x, v, O[h + 1], B, 2240044497),
    v = c(v, w, _, x, O[h + 8], L, 1873313359),
    x = c(x, v, w, _, O[h + 15], D, 4264355552),
    _ = c(_, x, v, w, O[h + 6], F, 2734768916),
    w = c(w, _, x, v, O[h + 13], B, 1309151649),
    v = c(v, w, _, x, O[h + 4], L, 4149444226),
    x = c(x, v, w, _, O[h + 11], D, 3174756917),
    _ = c(_, x, v, w, O[h + 2], F, 718787259),
    w = c(w, _, x, v, O[h + 9], B, 3951481745),
    v = n(v, m),
    w = n(w, y),
    _ = n(_, g),
    x = n(x, b);
  var H = f(v) + f(w) + f(_) + f(x);
  return H.toLowerCase()
}