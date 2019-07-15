var __PyList__ = function (l) {
	__PyObject__.call (this);
	this.l = l;
	this.__class__ = __PyList__;
}
__PyList__.prototype = Object.assign (__PyList__.prototype, __PyObject__.prototype);
__PyList__.__class__ = __PyType__;
__PyList__.__name__ = new __PyStr__ ('list');
__PyList__.__str__ = function () {return (new __PyStr__ (`<class 'list'>`));}
__PyList__.__call__ = function (l) {return new __PyList__ (l);}
__PyList__.prototype.__getitem__ = function (i) {
	if (!((i instanceof __PyInt__) || (i instanceof __PySlice__))) {
		throw new TypeError (`list indices must be integers or slices, not ${i.__class__.__name__}`);
	}
	if (i instanceof __PySlice__) {
		let m = Math.min (i.upper, this.l.length);
		let ret = [];
		for (let id = i.lower; id < m; id+=i.step) {
			ret.push (this.l[id]);
		}
		return (new __PyList__ (ret));
	}
	var n = i.x;
	if (n < 0) {n += this.l.length;}
	if (n >= 0 && n < this.l.length) {
		return this.l[n];
	}
	throw new IndexError (`list index out of range`);
}
__PyList__.prototype.__setitem__ = function (i, val) {
	if (!(i instanceof __PyInt__)) {
		throw new TypeError (`list indices must be integers, not ${i.__class__.__name__}`);
	}
	var n = i.x;
	if (n < 0) {n += this.l.length;}
	if (n >= 0 && n < this.l.length) {
		this.l[n] = val;
	} else {
		throw new IndexError (`list index out of range`);
	}
}
__PyList__.prototype.__len__ = function () {return new __PyInt__ (this.l.length);}
__PyList__.prototype.__str__ = function () {
	var ret = '[';
	for (let i = 0; i < this.l.length - 1; i++) {
		ret += this.l[i].__str__ ().toString ();
		ret += ', '
	}
	ret += this.l[this.l.length - 1].__str__ ().toString ();
	ret += ']'
	return (new __PyStr__ (ret));
}
__PyList__.prototype.__add__ = function (other) {
	if (other instanceof __PyList__) {
		return new __PyList__ (this.l.concat (other.l));
	}
	return __PyNotImplemented__;
}
__PyList__.prototype.__mul__ = function (other) {
	if (other instanceof __PyInt__) {
		let ret = [];
		for (let x = 0; x < other.x; x++) {
			ret = ret.concat (this.l);
		}
		return new __PyList__ (ret);
	}
	throw new __PyTypeError__ (
		`cant't muliply list by non-int of type '${other.__class__.__name__}'`
	);
}

__PyList__.prototype.__iadd__ = function (l) {
	if (l instanceof __PyList__) {
		this.l = this.l.concat (l.l);
		return this;
	}
	throw new __PyTypeError__ (`'${l.__class__.__name__}' object is not iterable`);
}
__PyList__.prototype.__imul__ = function (other) {
	if (other instanceof __PyInt__) {
		for (let x = 1; x < other.x; x++) {
			this.l = this.l.concat (this.l);
		}
		return this;
	}
	throw new __PyTypeError__ (
		`cant't muliply list by non-int of type '${other.__class__.__name__}'`
	);
}

__PyList__.prototype.__radd__ = __PyList__.prototype.__add__;
__PyList__.prototype.__rmul__ = __PyList__.prototype.__mul__;

__PyList__.prototype.__iter__ = function * () {
	for (let x of this.l) {
		yield x;
	}
}
