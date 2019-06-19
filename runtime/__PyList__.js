var __PyList__ = function (l) {
	this.l = l;
	this.__class__ = __PyList__;
}
__PyList__.__name__ = new __PyStr__ ('list');
__PyList__.__str__ = function () {return (new __PyStr__ (`<class 'list'>`));}
__PyList__.__call__ = function (l) {return new __PyList__ (l);}
__PyList__.prototype.__getitem__ = function (i) {
	try {
		var n = __index__ (i).x;
	} catch (e) {
		throw new TypeError (`list indices must be integers, not ${i.__class__.__name__}`);
	}
	if (n < 0) {n += this.l.length;}
	if (n >= 0 && n < this.l.length) {
		return this.l[n];
	}
	throw new IndexError (`list index out of range`);
}
__PyList__.prototype.__setitem__ = function (i, val) {
	try {
		var n = __index__ (i).x;
	} catch (e) {
		throw new TypeError (`list indices must be integers, not ${i.__class__.__name__}`);
	}
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
	for (let i = 0; i < this.l.length; i++) {
		ret += this.l[i].__str__ ().toString ();
		ret += ', '
	}
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
	} else if (other instanceof __PyBool__) {
		if (other === __PyTrue__) {
			return (new __PyList__ (this.l));
		} else {
			return (new __PyList__ ([]));
		}
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
	} else if (other instanceof __PyBool__) {
		if (other === __PyFalse__) {this.l = [];}
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
