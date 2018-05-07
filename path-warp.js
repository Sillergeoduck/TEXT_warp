! function(t) {
    var s = {};

    function i(h) {
        if (s[h]) return s[h].exports;
        var e = s[h] = {
            i: h,
            l: !1,
            exports: {}
        };
        return t[h].call(e.exports, e, e.exports, i), e.l = !0, e.exports
    }
    i.m = t, i.c = s, i.d = function(t, s, h) {
        i.o(t, s) || Object.defineProperty(t, s, {
            configurable: !1,
            enumerable: !0,
            get: h
        })
    }, i.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.n = function(t) {
        var s = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(s, "a", s), s
    }, i.o = function(t, s) {
        return Object.prototype.hasOwnProperty.call(t, s)
    }, i.p = "", i(i.s = 4)
}([function(t, s, i) {
    var h = i(1),
        e = i(3);
    t.exports = class {
        constructor(t, s) {
            this.source = s, this.A = new h(s.left, s.top), this.B = new h(s.right, s.top), this.C = new h(s.right, s.bottom), this.D = new h(s.left, s.bottom), this.Aleft = new h(s.left, s.top + s.height / 3), this.Atop = new h(s.left + s.width / 3, s.top), this.Btop = new h(s.right - s.width / 3, s.top), this.Bright = new h(s.right, s.top + s.height / 3), this.Cright = new h(s.right, s.bottom - s.height / 3), this.Cbottom = new h(s.right - s.width / 3, s.bottom), this.Dbottom = new h(s.left + s.width / 3, s.bottom), this.Dleft = new h(s.left, s.bottom - s.height / 3), this.ABx = 0, this.ABy = 0, this.CDx = 0, this.CDy = 0, this.BCx = 0, this.BCy = 0, this.ADx = 0, this.ADy = 0, this.STEPS = 10, this.distortX = 0, this.distortY1 = 0, this.distortY2 = 0, this.T1 = 1 / 3, this.T2 = 2 / 3, this.kAB = 0, this.kBC = 0, this.kCD = 0, this.kAD = 0, this.angle, this.sin, this.cos, this.kt, this.applyParameters(t)
        }
        applyParameters(t) {
            var s = this.source,
                i = this._parameters = new e(t);
            this.angle = i.bend * Math.PI / 2, this.sin = Math.sin(this.angle), this.cos = Math.cos(this.angle), this.kt = 1 + Math.pow(i.bend, 4), this.distortX = .5 * i.distortV * s.width;
            var h = .5 * i.distortH * s.height;
            switch (this.distortY1 = h * (1 - i.distortV), this.distortY2 = h * (1 + i.distortV), this.kAB = 1 - i.distortV, this.kBC = 1 + i.distortH, this.kCD = 1 + i.distortV, this.kAD = 1 - i.distortH, this.setAnchors(), i.type) {
                case "WARP_ARC":
                    this.setArc();
                    break;
                case "WARP_ARC_LOWER":
                    this.setArcLower();
                    break;
                case "WARP_ARC_UPPER":
                    this.setArcUpper();
                    break;
                case "WARP_ARCH":
                    this.setArch();
                    break;
                case "WARP_BULGE":
                    this.setBulge();
                    break;
                case "WARP_FLAG":
                    this.setFlag();
                    break;
                case "WARP_FISH":
                    this.setFish();
                    break;
                case "WARP_RISE":
                    this.setRise();
                    break;
                case "WARP_INFLATE":
                    this.setInflate();
                    break;
                case "WARP_SQUEEZE":
                    this.setSqueeze();
                    break;
                case "WARP_WAVE_LOWER":
                    this.setWaveLower();
                    break;
                case "WARP_WAVE_UPPER":
                    this.setWaveUpper()
            }
        }
        setAnchors() {
            this.A.x = this.source.left + this.distortX, this.B.x = this.source.right - this.distortX, this.C.x = this.source.right + this.distortX, this.D.x = this.source.left - this.distortX, this.A.y = this.source.top + this.distortY1, this.B.y = this.source.top - this.distortY1, this.C.y = this.source.bottom + this.distortY2, this.D.y = this.source.bottom - this.distortY2
        }
        setControls() {
            this.Atop.x = this.A.x + this.ABx, this.Atop.y = this.A.y + this.ABy, this.Btop.x = this.B.x - this.ABx, this.Btop.y = this.B.y - this.ABy, this.Dbottom.x = this.D.x + this.CDx, this.Dbottom.y = this.D.y + this.CDy, this.Cbottom.x = this.C.x - this.CDx, this.Cbottom.y = this.C.y - this.CDy, this.Bright.x = this.B.x + this.BCx, this.Bright.y = this.B.y + this.BCy, this.Cright.x = this.C.x - this.BCx, this.Cright.y = this.C.y - this.BCy, this.Aleft.x = this.A.x + this.ADx, this.Aleft.y = this.A.y + this.ADy, this.Dleft.x = this.D.x - this.ADx, this.Dleft.y = this.D.y - this.ADy
        }
        changeCubic(t, s, i, h) {
            let e = this._changePoint(t),
                o = this._changePoint(h),
                r = this.getPointOn(1 / 3, t, h, s, i),
                n = this.getPointOn(2 / 3, t, h, s, i),
                a = this._changePoint(r),
                y = this._changePoint(n);
            return this.getNewSegment(e, o, a, y)
        }
        changePoint(t) {
            var s = this._changePoint(t);
            return [s.x, s.y]
        }
        _changePoint(t) {
            let s = this.A,
                i = this.Atop,
                e = this.Aleft,
                o = this.B,
                r = this.Btop,
                n = this.Bright,
                a = this.C,
                y = this.Cright,
                x = this.Cbottom,
                c = this.D,
                A = this.Dbottom,
                C = this.Dleft;
            var d = (t.x - this.source.x) / this.source.width,
                b = (t.y - this.source.y) / this.source.height,
                p = 1 - b,
                B = this.getPointOn(b, s, c, e, C),
                l = this.getPointOn(b, o, a, n, y),
                D = new h(i.x * p + A.x * b, i.y * p + A.y * b),
                m = new h(r.x * p + x.x * b, r.y * p + x.y * b),
                k = this.getPointOn(d, B, l, D, m);
            return new h(k.x, k.y)
        }
        getPointOn(t, s, i, e, o) {
            var r = new h,
                n = t * t * t,
                a = t * t;
            return r.x = n * (i.x + 3 * (e.x - o.x) - s.x) + 3 * a * (s.x - 2 * e.x + o.x) + 3 * t * (e.x - s.x) + s.x, r.y = n * (i.y + 3 * (e.y - o.y) - s.y) + 3 * a * (s.y - 2 * e.y + o.y) + 3 * t * (e.y - s.y) + s.y, r
        }
        setArc() {
            var t = this._parameters,
                s = this.source,
                i = 1 - t.distortV;
            t.bend > 0 ? (this.A.x -= i * (s.height - this.distortY1) * this.sin, this.B.x += i * (s.height + this.distortY1) * this.sin, this.A.y += (s.height - this.distortY1) * (1 - this.cos), this.B.y += (s.height + this.distortY1) * (1 - this.cos), this.C.x -= this.distortY2 * this.sin, this.D.x -= this.distortY2 * this.sin, this.C.y += this.distortY2 * (this.cos - 1), this.D.y -= this.distortY2 * (this.cos - 1)) : t.bend < 0 && (this.D.x += i * (s.height - this.distortY2) * this.sin, this.C.x -= i * (s.height + this.distortY2) * this.sin, this.D.y += (s.height - this.distortY2) * (this.cos - 1), this.C.y += (s.height + this.distortY2) * (this.cos - 1), this.A.x += this.distortY1 * this.sin, this.B.x += this.distortY1 * this.sin, this.A.y -= this.distortY1 * (1 - this.cos), this.B.y += this.distortY1 * (1 - this.cos)), this.calculateArms(), this.setControls(), this.Atop.x += this.ABx * (this.cos * this.kt - 1), this.Atop.y -= this.ABx * this.sin * this.kt, this.Btop.x += this.ABx * (1 - this.cos * this.kt), this.Btop.y -= this.ABx * this.sin * this.kt, this.Dbottom.x += this.CDx * (this.cos * this.kt - 1), this.Dbottom.y -= this.CDx * this.sin * this.kt, this.Cbottom.x += this.CDx * (1 - this.cos * this.kt), this.Cbottom.y -= this.CDx * this.sin * this.kt
        }
        setFish() {
            var t = this._parameters;
            this.calculateArms(), this.setControls(), this.Atop.y -= 2 * t.bend * this.kAB * (2 * this.ADy + this.BCy), this.Btop.y += 2 * t.bend * this.kAB * (this.ADy + 2 * this.BCy), this.Dbottom.y += 2 * t.bend * this.kCD * (2 * this.ADy + this.BCy), this.Cbottom.y -= 2 * t.bend * this.kCD * (this.ADy + 2 * this.BCy)
        }
        setFlag() {
            this.calculateArms(), this.setControls();
            var t = this._parameters;
            this.Atop.y += 3 * t.bend * this.kAB * (this.ADy + this.BCy), this.Btop.y -= 3 * t.bend * this.kAB * (this.ADy + this.BCy), this.Dbottom.y += 3 * t.bend * this.kCD * (this.ADy + this.BCy), this.Cbottom.y -= 3 * t.bend * this.kCD * (this.ADy + this.BCy)
        }
        setBulge() {
            this.calculateArms(), this.setControls(), this._parameters, this.Atop.x += this.ABx * (this.cos * this.kt - 1), this.Atop.y -= this.ABx * this.sin * this.kt, this.Btop.x += this.ABx * (1 - this.cos * this.kt), this.Btop.y -= this.ABx * this.sin * this.kt, this.Dbottom.x += this.CDx * (this.cos * this.kt - 1), this.Dbottom.y += this.CDx * this.sin * this.kt, this.Cbottom.x += this.CDx * (1 - this.cos * this.kt), this.Cbottom.y += this.CDx * this.sin * this.kt
        }
        setArch() {
            this.calculateArms(), this.setControls(), this._parameters, this.Atop.x += this.ABx * (this.cos * this.kt - 1), this.Atop.y -= this.ABx * this.sin * this.kt, this.Btop.x += this.ABx * (1 - this.cos * this.kt), this.Btop.y -= this.ABx * this.sin * this.kt, this.Dbottom.x += this.CDx * (this.cos * this.kt - 1), this.Dbottom.y -= this.CDx * this.sin * this.kt, this.Cbottom.x += this.CDx * (1 - this.cos * this.kt), this.Cbottom.y -= this.CDx * this.sin * this.kt
        }
        setArcLower() {
            this.calculateArms(), this.setControls(), this._parameters, this.Dbottom.x += this.CDx * (this.cos * this.kt - 1), this.Dbottom.y += this.CDx * this.sin * this.kt, this.Cbottom.x += this.CDx * (1 - this.cos * this.kt), this.Cbottom.y += this.CDx * this.sin * this.kt
        }
        setArcUpper() {
            this.calculateArms(), this.setControls(), this._parameters, this.Atop.x += this.ABx * (this.cos * this.kt - 1), this.Atop.y -= this.ABx * this.sin * this.kt, this.Btop.x += this.ABx * (1 - this.cos * this.kt), this.Btop.y -= this.ABx * this.sin * this.kt
        }
        setSqueeze() {
            this.calculateArms(), this.setControls();
            var t = this._parameters;
            this.Atop.y -= t.bend * this.kAB * this.ADy, this.Btop.y -= t.bend * this.kAB * this.BCy, this.Dbottom.y += t.bend * this.kCD * this.ADy, this.Cbottom.y += t.bend * this.kCD * this.BCy, this.Bright.x -= t.bend * this.kBC * this.ABx, this.Cright.x -= t.bend * this.kBC * this.CDx, this.Aleft.x += t.bend * this.kAD * this.ABx, this.Dleft.x += t.bend * this.kAD * this.CDx
        }
        setInflate() {
            this.calculateArms(), this.setControls();
            var t = this._parameters,
                s = (this.ADy + this.BCy) / 2,
                i = (this.ABx + this.CDx) / 2;
            this.Atop.y -= t.bend * this.kAB * s, this.Btop.y -= t.bend * this.kAB * s, this.Dbottom.y += t.bend * this.kCD * s, this.Cbottom.y += t.bend * this.kCD * s, this.Bright.x += t.bend * this.kBC * i, this.Cright.x += t.bend * this.kBC * i, this.Aleft.x -= t.bend * this.kAD * i, this.Dleft.x -= t.bend * this.kAD * i
        }
        setRise() {
            var t = this._parameters;
            this.A.y += t.bend * this.kAB * source.height, this.D.y += t.bend * this.kCD * source.height, this.B.y -= t.bend * this.kAB * source.height, this.C.y -= t.bend * this.kCD * source.height, this.calculateArms(), this.setControls();
            var s = this.ADy + this.BCy;
            this.Atop.y += t.bend * this.kAB * s, this.Btop.y -= t.bend * this.kAB * s, this.Dbottom.y += t.bend * this.kCD * s, this.Cbottom.y -= t.bend * this.kCD * s
        }
        setWaveUpper() {
            this.calculateArms(), this.setControls();
            var t = this._parameters;
            this.Atop.y += 3 * t.bend * this.kAB * (this.ADy + this.BCy), this.Btop.y -= 3 * t.bend * this.kAB * (this.ADy + this.BCy)
        }
        setWaveLower() {
            this.calculateArms(), this.setControls();
            var t = this._parameters;
            this.Dbottom.y += 3 * t.bend * this.kCD * (this.ADy + this.BCy), this.Cbottom.y -= 3 * t.bend * this.kCD * (this.ADy + this.BCy)
        }
        calculateArms() {
            this.ABx = (this.B.x - this.A.x) / 3, this.ABy = (this.B.y - this.A.y) / 3, this.CDx = (this.C.x - this.D.x) / 3, this.CDy = (this.C.y - this.D.y) / 3, this.BCx = (this.C.x - this.B.x) / 3, this.BCy = (this.C.y - this.B.y) / 3, this.ADx = (this.D.x - this.A.x) / 3, this.ADy = (this.D.y - this.A.y) / 3
        }
        getNewSegment(t, s, i, e) {
            var o = this.T1,
                r = o * o * o,
                n = 1 - o,
                a = n * n * n,
                y = this.T2,
                x = y * y * y,
                c = 1 - y,
                A = c * c * c,
                C = 3 * o * n,
                d = {};
            d.x = (i.x - a * t.x - r * s.x) / C, d.y = (i.y - a * t.y - r * s.y) / C;
            var b = 3 * y * c,
                p = {};
            p.x = (e.x - A * t.x - x * s.x) / b, p.y = (e.y - A * t.y - x * s.y) / b;
            var B = {};
            B.x = (y * d.x - o * p.x) / (n * p.x - c * d.x), B.y = (y * d.y - o * p.y) / (n * p.y - c * d.y), isNaN(B.x) && (B.x = 0), isNaN(B.y) && (B.y = 0);
            var l = {},
                D = {};
            D.x = d.x / (n * B.x + o), D.y = d.y / (n * B.y + o), l.x = B.x * D.x, l.y = B.y * D.y;
            var m = new h(l.x, l.y),
                k = new h(D.x, D.y);
            return [m.x, m.y, k.x, k.y, s.x, s.y]
        }
    }
}, function(t, s) {
    t.exports = class {
        constructor(t = 0, s = 0) {
            if ("number" != typeof t || "number" != typeof s) throw new Exception("Invalid points");
            let i = t || 0,
                h = s || 0;
            i && (i = parseInt(1e3 * i) / 1e3), h && (h = parseInt(1e3 * h) / 1e3), this._props = [i, h], this[0] = i, this[1] = h
        }
        set x(t) {
            this[0] = t, this._props[0] = t
        }
        set y(t) {
            this[1] = t, this._props[1] = t
        }
        get x() {
            return this._props[0]
        }
        get y() {
            return this._props[1]
        }
    }
}, function(t, s) {
    t.exports = class {
        constructor(t, s, i, h) {
            this.x = t, this.y = s, this.width = i, this.height = h, this.top = s, this.bottom = s + h, this.left = t, this.right = t + i
        }
    }
}, function(t, s, i) {
    i(0);
    t.exports = class {
        constructor(t) {
            this.type = t.type || 0, this.bend = t.bend || 0, this.distortV = t.distortV || 0, this.distortH = t.distortH || 0, this.vertical = t.vertical || !1
        }
    }
}, function(t, s, i) {
    var h = i(1),
        e = i(0),
        o = i(2),
        r = "C",
        n = "Q",
        a = "L",
        y = "M",
        x = "Z",
        c = class {
            constructor(t) {
                this.data = [], this.commands = [], this.parseString(t)
            }
            parseString(t) {
                var s = [],
                    i = [];
                t.match(/[A-Za-z][0-9\.\s\,\-]+\d/g).forEach(t => {
                    var h = t[0],
                        e = t.match(/[\d\.\-]+/g);
                    s.push(h), i.push(...e.map(parseFloat))
                }), this.commands = s, this.data = i
            }
            scale(t, s = 0) {
                0 == s && (s = t);
                const i = this.data;
                for (let h = 0; h < i.length; h += 2) i[h] *= t, i[h + 1] *= s
            }
            warp(t) {
                let s = new e(t, this.calcRectangle()),
                    i = this.commands,
                    o = this.data,
                    n = [],
                    a = new h,
                    y = new h,
                    c = new h,
                    A = new h,
                    C = 0,
                    d = new h;
                for (let t = 0; t < i.length; t++) {
                    switch (i[t]) {
                        case "L":
                            i[t] = r, a = new h((2 * A[0] + o[C]) / 3, (2 * A[1] + o[C + 1]) / 3), y = new h((A[0] + 2 * o[C]) / 3, (A[1] + 2 * o[C + 1]) / 3), d = new h(o[C], o[C + 1]), n = n.concat(s.changeCubic(A, a, y, d)), A = d, C += 2;
                            break;
                        case "Q":
                            i[t] = r, a = new h((2 * o[C] + A.x) / 3, (2 * o[C + 1] + A.y) / 3), y = new h((2 * o[C] + o[C + 2]) / 3, (2 * o[C + 1] + o[C + 3]) / 3), d = new h(o[C + 2], o[C + 3]), n = n.concat(s.changeCubic(A, a, y, d)), A = d, C += 4;
                            break;
                        case "M":
                            A = c = new h(o[C], o[C + 1]), n = n.concat(s.changePoint(A)), C += 2;
                            break;
                        case "C":
                            n = n.concat(s.changeCubic(A, new h(o[C], o[C + 1]), new h(o[C + 2], o[C + 3]), new h(o[C + 4], o[C + 5]))), A = new h(o[C + 4], o[C + 5]), C += 6;
                            break;
                        case x:
                            A = c
                    }
                }
                this.data = n
            }
            output() {
                var t = [],
                    s = this.data.slice();
                for (let i = 0; i < this.commands.length; i++) {
                    let h = this.commands[i],
                        e = 0;
                    switch (h) {
                        case "M":
                        case "L":
                            e = 2;
                            break;
                        case "Q":
                            e = 4;
                            break;
                        case "C":
                            e = 6
                    }
                    t.push(h + s.splice(0, e).join(" "))
                }
                return t.join(" ")
            }
            calcRectangle() {
                let t = this.commands,
                    s = this.data;
                for (var i, h, e = {
                        xMin: 1 / 0,
                        yMin: 1 / 0,
                        xMax: -1 / 0,
                        yMax: -1 / 0
                    }, x = 0, c = 0; c < t.length; c++) {
                    switch (t[c]) {
                        case y:
                        case a:
                            i = s[x], h = s[x + 1], x += 2;
                            break;
                        case n:
                            i = s[x + 2], h = s[x + 3], x += 4;
                            break;
                        case r:
                            i = s[x + 4], h = s[x + 5], x += 6
                    }
                    e.xMin = Math.min(i, e.xMin), e.xMax = Math.max(i, e.xMax), e.yMin = Math.min(h, e.yMin), e.yMax = Math.max(h, e.yMax)
                }
                return e.xMax == -1 / 0 ? null : new o(e.xMin, e.yMin, e.xMax - e.xMin, e.yMax - e.yMin)
            }
        };
    t.exports = c, "undefined" != typeof window && (window.Path = c)
}]);