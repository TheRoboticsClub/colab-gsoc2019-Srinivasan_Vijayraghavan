var __PyDict__ = function (keys, values) {
	__PyObject__.call (this);
	this.keys = keys;
	this.values = values;
	this.__class__ = __PyDict__;
	this.__dict__ = {
		'items' : __PyDict__.prototype.items.bind (this),
		'keys' : __PyDict__.prototype.keys.bind (this),
		'values' : __PyDict__.prototype.values.bind (this),
		'clear' : __PyDict__.prototype.clear.bind (this),
		'items' : __PyDict__.prototype.items.bind (this),
		'pop' : __PyDict__.prototype.pop.bind (this),
	};
	this.dict = {};
}

__PyDict__.__class__ = __PyType__;
__PyDict__.__name__ = new __PyStr__ (`dict`);
__PyDict__.__str__ = function () {return new __PyStr__ (`<class 'dict'>`);}
__PyDict__.__call__ = function (x) {
	return new __PyDict__ ([]);
}
__PyDict__.prototype = Object.create (__PyObject__.prototype);

__PyDict__.prototype.__getitem__ = function (x) {
	if (!('__hash__' in x)) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`unhashable type: ${x.__class__.__name__}`);
	}
	if (x.__hash__ () in this.dict) {
		return this.dict[x.__hash__ ()];
	}
	__callstack__ = new Error ().stack; throw new __PyKeyError__ (`${x.__str__ ()}`);
}
__PyDict__.prototype.__setitem__ = function (x, v) {
	if (!('__hash__' in x)) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`unhashable type: ${x.__class__.__name__}`);
	}
	this.keys.push (x);
	this.values.push (v);
	this.dict[x.__hash__ ()] = v;
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
	if (! ('__hash__' in x)) {
		__callstack__ = new Error ().stack; throw new __PyType__ (`unhashable type: ${x.__class__.__name__}`);
	}
	return __getbool__ (x.__hash__ () in this.dict);
}
__PyDict__.prototype.__iter__ = function * () {
	for (let x of this.keys) {
		yield x;
	}
}

// API
__PyDict__.prototype.keys = function () {
	return new __PyList__ (this.keys);
}
__PyDict__.prototype.values = function () {
	return new __PyList__ (this.values);
}
__PyDict__.prototype.clear = function () {
	this.keys = [];
	this.values = [];
	this.dict = {}
	return __PyNone__;
}
__PyDict__.prototype.items = function () {
	let n = this.keys.length, l = [];
	for (let i = 0; i < n; i++) {
		l.push (new __PyTuple__ ([this.keys[i], this.values[i]]));
	}
	return new __PyList__ (l);
}
__PyDict__.prototype.pop = function (k) {
	for (let i = 0; i < n; i++) {
		if (__getjsbool__ (__eq__ (this.keys[i], k))) {
			let ret = this.values[i];
			this.keys.splice (i, 1);
			this.values.splice (i, 1);

			return ret;
		}
	}
	__callstack__ = new Error ().stack; throw new __PyKeyError__ (`${k.__class__.__name__}`);
}
