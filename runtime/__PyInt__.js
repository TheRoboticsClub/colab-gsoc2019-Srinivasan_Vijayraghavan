var __PyInt__ = function (x) {
	this.x = parseInt (x);
	this.__class__ = __PyInt__;
}
__PyInt__.__call__ = function (x) {
	if (x instanceof __PyInt__) {
		return x;
	} else if (x instanceof __PyStr__) {
		let n = Number (x.x);
		if (isNaN (n)) {
			throw new __PyValueError__ (`invalid literal for int(): '${x.x}'`);
		}
		return (new __PyInt__ (n));
	} else {
		try {
			return __int__ (x);
		} catch (e) {
			throw new __PyTypeError__ (`int() argument must be a string, a bytes-like object or a number, not '${x.__class__.__name__}'`);
		}
	}
}
__PyInt__.__name__ = new __PyStr__ ('int');
__PyInt__.__str__ = function () {return (new __PyStr__ (`<class 'int'>`));}
__PyInt__.prototype.__int__ = function () {return this;}
__PyInt__.prototype.__index__ = function () {return this;}
__PyInt__.prototype.__float__ = function () {return (new __PyFloat__ (this.x));}
__PyInt__.prototype.__bool__ = function () {this.x == 0 ? __PyFalse__ : __PyTrue__;}
__PyInt__.prototype.__pos__ = function () {return this;};
__PyInt__.prototype.__neg__ = function () {return (new __PyInt__ (-this.x));};

__PyInt__.prototype.__mod__ = function (other) {
	if (other instanceof __PyInt__) {
		let ret = this.x % other.x;
		if (isNaN (ret)) {
			throw new __PyZeroDivisionError__ (`integer division or modulo by zero`)
		}
		return new __PyInt__ (ret);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__add__ = function (other) {
	if (other instanceof __PyInt__) {
		return new __PyInt__ (this.x + other.x);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__sub__ = function (other) {
	if (other instanceof __PyInt__) {
		return new __PyInt__ (this.x - other.x);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__div__ = function (other) {
	if (other instanceof __PyInt__ || other instanceof __PyFloat__) {
		if (other.x == 0) {
			throw Error ('ZeroDivisionError: float division by zero');
		}
		return new __PyFloat__ (this.x / other.x);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__mul__ = function (other) {
	if (other instanceof __PyInt__ ) {
		return new __PyInt__ (this.x * other.x);
	}
	return __PyNotImplemented__;
}

__PyInt__.prototype.__le__ = function (other) {
	if (other instanceof __PyInt__) {
		return ((this.x <= other.x) ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__lt__ = function (other) {
	if (other instanceof __PyInt__) {
		return ((this.x < other.x) ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__ge__ = function (other) {
	if (other instanceof __PyInt__) {
		return ((this.x >= other.x) ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__gt__ = function (other) {
	if (other instanceof __PyInt__) {
		return ((this.x > other.x) ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__eq__ = function (other) {
	if (other instanceof __PyInt__) {
		return ((this.x == other.x) ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyInt__.prototype.__str__ = function () {return (new __PyStr__ (this.x));}

let __zero__ = new __PyInt__ (0);
let __one__ = new __PyInt__ (1);
