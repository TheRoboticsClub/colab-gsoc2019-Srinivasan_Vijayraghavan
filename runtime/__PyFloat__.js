var __PyFloat__ = function (x) {
	__PyObject__.call (this);
	this.x = parseFloat (x);
	this.__class__ = __PyFloat__;
}
__PyFloat__.prototype = Object.assign (__PyFloat__.prototype, __PyObject__.prototype);
__PyFloat__.__class__ = __PyType__;
__PyFloat__.__name__ = new __PyStr__ ('float');
__PyFloat__.__str__ = function () {return (new __PyStr__ (`<class 'float'>`));}
__PyFloat__.__call__ = function (x) {
	if (x instanceof __PyFloat__) {
		return x;
	} else if (x instanceof __PyStr__) {
		let n = Number (x.x);
		if (isNaN (n)) {
			__callstack__ = new Error ().stack; throw new __PyValueError__ (`could not convert string to float: '${x.x}'`);
		}
		return (new __PyFloat__ (n));
	} else {
		try {
			return __float__ (x);
		} catch (e) {
			__callstack__ = new Error ().stack; throw new __PyTypeError__ (`float() argument must be a string, a bytes-like object or a number, not '${x.__class__.__name__}'`);
		}
	}
}
__PyFloat__.__str__ = function () {return (new __PyStr__ (`<class 'float'>`));}
__PyFloat__.prototype.__str__ = function () {return (new __PyStr__ (this.x));}
__PyFloat__.prototype.__int__ = function () {return (new __PyInt__ (this.x));};
__PyFloat__.prototype.__float__ = function () {return this;};
__PyFloat__.prototype.__pos__ = function () {return this;};
__PyFloat__.prototype.__neg__ = function () {
	return (new __PyFloat__ (-this.x));
};
__PyFloat__.prototype.__add__ = function (other) {
	if (other instanceof __PyFloat__) {
		return new __PyFloat__ (this.x + other.x);
	} else if (other instanceof __PyInt__) {
		return new __PyFloat__ (this.x + other.x);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__sub__ = function (other) {
	if (other instanceof __PyFloat__) {
		return new __PyFloat__ (this.x - other.x);
	} else if (other instanceof __PyInt__) {
		return new __PyFloat__ (this.x - other.x);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__div__ = function (other) {
	if (other instanceof __PyFloat__) {
		return new __PyFloat__ (this.x / other.x);
	} else if (other instanceof __PyInt__) {
		return new __PyFloat__ (this.x / other.x);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__mul__ = function (other) {
	if (other instanceof __PyFloat__) {
		return new __PyFloat__ (this.x * other.x);
	} else if (other instanceof __PyInt__) {
		return new __PyFloat__ (this.x * other.x);
	}
	return __PyNotImplemented__;
}

__PyFloat__.prototype.__radd__ = __PyFloat__.prototype.__add__;
__PyFloat__.prototype.__rsub__ = __PyFloat__.prototype.__sub__;
__PyFloat__.prototype.__rmul__ = __PyFloat__.prototype.__mul__;
__PyFloat__.prototype.__rdiv__ = __PyFloat__.prototype.__div__;

__PyFloat__.prototype.__le__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x <= other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__lt__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x < other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__ge__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x >= other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__gt__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x > other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
__PyFloat__.prototype.__eq__ = function (other) {
	if (other instanceof __PyFloat__
	||	other instanceof __PyInt__) {
		return (this.x == other.x ? __PyTrue__ : __PyFalse__);
	}
	return __PyNotImplemented__;
}
