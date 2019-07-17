var __PyDict__ = function (d) {
	__PyObject__.call (this);
	this.value = d;
	this.__class__ = __PyDict__;
}

__PyDict__.__class__ = __PyType__;
__PyDict__.__name__ = new __PyStr__ (`<class 'dict'>`);
__PyDict__.__call__ = function (x) {
	return new __PyDict__ ([]);
}
__PyDict__.prototype = Object.create (__PyObject__.prototype);

__PyDict__.prototype.__getitem__ = function (x) {
	for (let el of this.value) {
		if (__getjsbool__ (__eq__ (x, el[0]))) {
			return el[1];
		}
	}
	throw new __PyKeyError__ (`${x.__str__ ()}`);
}
__PyDict__.prototype.__setitem__ = function (x, v) {
	for (let el of this.value) {
		if (__getjsbool__ (__eq__ (x, el[0]))) {
			el[1] = v;
			return __PyNone__;
		}
	}
	this.value.push ([x, v]);
	return __PyNone__;
}
__PyDict__.prototype.__str__ = function () {
	let ret = '{';
	for (let el of this.value) {
		ret += el[0].__str__ ().toString () + ' : ' + el[1].__str__ ().toString ();
		ret += ', '
	}
	ret += '}';
	return new __PyStr__ (ret);
};
__PyDict__.prototype.__len__ = function () {
	return new __PyInt__ (this.value.length);
}
__PyDict__.prototype.__contains__ = function (x) {
	for (let el of this.value) {
		if (__getjsbool__ (__eq__ (x, el[0]))) {
			return __PyTrue__;
		}
	}
	return __PyFalse__;
}
