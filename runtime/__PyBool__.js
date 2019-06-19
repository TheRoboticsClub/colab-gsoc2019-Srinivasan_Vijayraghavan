var __PyBool__ = function (x) {
	this.__class__ = __PyBool__;
	this.x = Boolean (x);
}
__PyBool__.__call__ = function (x) {
	if ('__bool__' in x) {
		return x.__bool__ ();
	} else if ('__len__' in x) {
		let len = x.__len__ ();
		return (len.x == 0 ? __PyFalse__ : __PyTrue__);
	}
	return __PyFalse__;
}
__PyBool__.__name__ = new __PyStr__ ('bool');
__PyBool__.__str__ = function () {return (new __PyStr__ (`<class 'bool'>`));}
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
	}
	return __PyNotImplemented__;
}
__PyBool__.prototype.__sub__ = function (other) {
	if (other instanceof __PyBool__) {
		return __sub__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __sub__ (this.__int__(), other);
	}
	return __PyNotImplemented__;
}
__PyBool__.prototype.__mul__ = function (other) {
	if (other instanceof __PyBool__) {
		return __mul__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __mul__ (this.__int__(), other);
	}
	return __PyNotImplemented__;
}
__PyBool__.prototype.__div__ = function (other) {
	if (other instanceof __PyBool__) {
		return __div__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __div__ (this.__int__(), other);
	}
	return __PyNotImplemented__;
}

__PyBool__.prototype.__and__ = function (other) {
	var other = other.__bool__ ()
	if (this.x && other.x) {return __PyTrue__;}
	return __PyFalse__;
}
__PyBool__.prototype.__or__ = function (other) {
	var other = other.__bool__ ();
	if (this.x || other.x) {return __PyTrue__;}
	return __PyFalse__;
}


const __PyTrue__ = new __PyBool__ (true);
const __PyFalse__ = new __PyBool__ (false);
