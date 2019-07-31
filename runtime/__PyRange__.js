var __PyRange__ = function (start, stop, step = 1) {
	__PyObject__.call (this);
	this.start = start;
	this.stop = stop;
	this.step = step;
	this.__class__ = __PyRange__;
}
__PyRange__.prototype = Object.create (__PyRange__.prototype);
__PyRange__.__class__ = __PyType__;
__PyRange__.__name__ = new __PyStr__ ('range');
__PyRange__.__call__ = function () {
	if (arguments.length == 1) {
		let x = arguments[0];
		if (x instanceof __PyRange__) {
			return x;
		}
		else if (x instanceof __PyInt__) {
			return new __PyRange__ (0, x.x);
		}
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${x.__class__.__name__}' object cannot be interpreted as an integer`);
	}
	else if (arguments.length == 2) {
		let x = arguments[0], y = arguments[1];
		if (!(x instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${x.__class__.__name__}' object cannot be interpreted as an integer`);
		} else if (! (y instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${y.__class__.__name__}' object cannot be interpreted as an integer`);
		}
		return (new __PyRange__ (x.x, y.x));
	} else if (arguments.length == 3) {
		let x = arguments[0], y = arguments[1], z = arguments[2];
		if (!(x instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${x.__class__.__name__}' object cannot be interpreted as an integer`);
		} else if (! (y instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${y.__class__.__name__}' object cannot be interpreted as an integer`);
		} else if (! (z instanceof __PyInt__)) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`'${z.__class__.__name__}' object cannot be interpreted as an integer`);
		}
		return (new __PyRange__ (x.x, y.x, z.x));
	}
}
__PyRange__.__name__ = new __PyStr__ ('range');
__PyRange__.prototype.__iter__ = function * () {
	for (let x = this.start; x < this.stop; x += this.step) {
		yield (new __PyInt__ (x));
	}
}
__PyRange__.prototype.__bool__  = function () {return __PyTrue__;}
__PyRange__.prototype.__str__ = function () {
	var s = `range(${this.start}, ${this.stop}, ${this.step})`;
	return (new __PyStr__ (s));
}
