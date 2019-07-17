var __PyDict__ = function (keys, values) {
	__PyObject__.call (this);
	this.keys = keys;
	this.values = values;
	this.__class__ = __PyDict__;
	this.__dict__ = {'items' : __PyDict__.prototype.items.bind (this)};
}

__PyDict__.__class__ = __PyType__;
__PyDict__.__name__ = new __PyStr__ (`dict`);
__PyDict__.__str__ = function () {return new __PyStr__ (`<class 'dict'>`);}
__PyDict__.__call__ = function (x) {
	return new __PyDict__ ([]);
}
__PyDict__.prototype = Object.create (__PyObject__.prototype);

__PyDict__.prototype.__getitem__ = function (x) {
	let n = this.keys.length;
	for (let i = 0; i < n; i++) {
		if (__getjsbool__ (__eq__ (x, this.keys[i]))) {
			return this.values[i];
		}
	}
	throw new __PyKeyError__ (`${x.__str__ ()}`);
}
__PyDict__.prototype.__setitem__ = function (x, v) {
	let n = this.keys.length;
	for (let i = 0; i < n; i++) {
		if (__getjsbool__ (__eq__ (x, this.keys[i]))) {
			this.values[i] = v;
			return __PyNone__;
		}
	}
	this.keys.push (x);
	this.values.push (v);

	return __PyNone__;
}
__PyDict__.prototype.__str__ = function () {
	let n = this.keys.length;
	let ret = '{';
	for (let i = 0; i < n; i++) {
		let el = [this.keys[i], this.values[i]];
		ret += el[0].__str__ ().toString () + ' : ' + el[1].__str__ ().toString ();
		ret += ', '
	}
	ret += '}';
	return new __PyStr__ (ret);
};
__PyDict__.prototype.__len__ = function () {
	return new __PyInt__ (this.keys.length);
}
__PyDict__.prototype.__contains__ = function (x) {
	let n = this.keys.length;
	for (let i = 0; i < n; i++) {
		if (__getjsbool__ (__eq__ (x, this.keys[i]))) {
			return __PyTrue__;
		}
	}
	return __PyFalse__;
}
__PyDict__.prototype.__iter__ = function * () {
	for (let x of this.keys) {
		yield x;
	}
}
__PyDict__.prototype.items = function () {
	let n = this.keys.length, l = [];
	for (let i = 0; i < n; i++) {
		l.push (new __PyTuple__ ([this.keys[i], this.values[i]]));
	}
	return new __PyList__ (l);
}
