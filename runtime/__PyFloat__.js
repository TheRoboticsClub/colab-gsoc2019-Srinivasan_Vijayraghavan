var __PyFloat__ = function (x) {
	this.x = parseFloat (x);
	this.__class__ = __PyFloat__;
}
__PyFloat__.__name__ = new __PyStr__ ('float');
__PyFloat__.__call__ = function (x) {
	if (x instanceof __PyFloat__) {
		return x;
	} else if (x instanceof __PyStr__) {
		let n = Number (x);
		if (isNaN (n)) {
			throw Error (`ValueError: invalid literal for float(): '${x.x}'`);
		}
		return (new __PyFloat__ (n));
	} else {
		try {
			return __float__ (x);
		} catch (e) {
			throw Error (`TypeError: float() argument must be a string, a bytes-like object or a number, not '${x.__class__.__name__.toString ()}'`);
		}
	}
}
__PyFloat__.__str__ = function () {return (new __PyStr__ (`<class 'float'>`));}
__PyFloat__.prototype.__int__ = function () {
	return (new __PyInt__ (this.x));
};
__PyFloat__.prototype.__float__ = function () {
	return this;
};
__PyFloat__.prototype.__pos__ = function () {return this;};
__PyFloat__.prototype.__neg__ = function () {
	return (new __PyFloat__ (-this.x));
};
__PyFloat__.prototype.__add__ = function (other) {
	if ('__float__' in other) {
		var other = other.__float__ ();
		return (new __PyFloat__ (this.x + other.x));
	}
	throw Error (`TypeError: unsupported operand type(s) for +:.`)
}
__PyFloat__.prototype.__sub__ = function (other) {
	if ('__float__' in other) {
		var other = other.__float__ ();
		return (new __PyFloat__ (this.x - other.x));
	}
	throw Error (`TypeError: unsupported operand type(s) for -:.`)
}
__PyFloat__.prototype.__div__ = function (other) {
	if ('__float__' in other) {
		var other = other.__float__ ();
		if (other.x == 0) {
			throw Error ('ZeroDivisionError: float division by zero');
		}
		return (new __PyFloat__ (this.x - other.x));
	}
	throw Error (`TypeError: unsupported operand type(s) for /:.`)
}
__PyFloat__.prototype.__mul__ = function (other) {
	if ('__float__' in other) {
		return (new __PyFloat__ (this.x * (other.__float__().x)));
	}
	throw Error (`TypeError: unsupported operand type(s) for *:.`)
}
__PyFloat__.prototype.__str__ = function () {
	return (new __PyStr__ (this.x));
}
__PyFloat__.prototype.__iadd__ = function (other) {return this.__add__ (other);}
__PyFloat__.prototype.__isub__ = function (other) {return this.__sub__ (other);}
__PyFloat__.prototype.__idiv__ = function (other) {return this.__div__ (other);}
__PyFloat__.prototype.__imul__ = function (other) {return this.__mul__ (other);}
