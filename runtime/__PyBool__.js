var __PyBool__ = function (x) {
	this.__class__ = __PyBool__;
	this.x = Boolean (x);
}
__PyBool__.prototype.__str__ = function () {
	return (new __PyStr__ (this.x ? "True" : "False"));
}
__PyBool__.prototype.__int__ = function () {
	return this.x ? (new __PyInt__ (1)) : (new __PyInt__ (0));
}
__PyBool__.prototype.__bool__ = function () {return this;}
__PyBool__.prototype.__index__ = function () {return this.__int__();}
__PyBool__.prototype.__float__ = function () {
	return this.x ? (new __PyFloat__ (1)) : (new __PyFloat__ (0));
}
__PyBool__.prototype.__add__ = function (other) {
	if (other instanceof __PyBool__) {
		return __add__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __add__ (this.__int__(), other);
	} else if (other instanceof __PyFloat__) {
		return __add__ (this.__float__ (), other);
	}
	throw Error (`TypeError: unsupported operand type(s) for +:`);
}
__PyBool__.prototype.__sub__ = function (other) {
	if (other instanceof __PyBool__) {
		return __sub__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __sub__ (this.__int__(), other);
	} else if (other instanceof __PyFloat__) {
		return __sub__ (this.__float__ (), other);
	}
	throw Error (`TypeError: unsupported operand type(s) for -:`);
}
__PyBool__.prototype.__mul__ = function (other) {
	if (other instanceof __PyBool__) {
		return __mul__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __mul__ (this.__int__(), other);
	} else if (other instanceof __PyFloat__) {
		return __mul__ (this.__float__ (), other);
	}
	throw Error (`TypeError: unsupported operand type(s) for *:`);
}
__PyBool__.prototype.__div__ = function (other) {
	if (other instanceof __PyBool__) {
		return __div__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __div__ (this.__int__(), other);
	} else if (other instanceof __PyFloat__) {
		return __div__ (this.__float__ (), other);
	}
	throw Error (`TypeError: unsupported operand type(s) for /:`);
}
__PyBool__.prototype.__iadd__ = function (other) {return this.__add__ (other);}
__PyBool__.prototype.__isub__ = function (other) {return this.__sub__ (other);}
__PyBool__.prototype.__idiv__ = function (other) {return this.__div__ (other);}
__PyBool__.prototype.__imul__ = function (other) {return this.__mul__ (other);}

__PyBool__.prototype.__and__ = function (other) {
	var other = other.__bool__ ()
	if (this.x && other.x) {return True;}
	return False;
}
__PyBool__.prototype.__or__ = function (other) {
	var other = other.__bool__ ();
	if (this.x || other.x) {return True;}
	return False;
}


const True = new __PyBool__ (true);
const False = new __PyBool__ (false);
