var __PyStr__ = function (x) {
	__PyObject__.call (this);
	this.x = String (x);
	this.__class__ = __PyStr__;
}
__PyStr__.prototype = Object.create (__PyObject__.prototype);
__PyStr__.__class__ = __PyType__;
__PyStr__.__name__ = new __PyStr__ ('str');
__PyStr__.__call__ = function (x) {
	if (x instanceof __PyStr__) {
		return x;
	} else {
		return x.__str__ ();
	}
}
__PyStr__.__str__ = function () {return (new __PyStr__ (`<class 'str'>`));}
__PyStr__.prototype.__str__ = function () {return this;}
__PyStr__.prototype.toString = function () {return this.x;}
__PyStr__.prototype.__add__ = function (other) {
	if (other instanceof __PyStr__) {
		return (new __PyStr__ (this.x.concat (other.x)));
	}
	__callstack__ = new Error ().stack; throw (new __PyTypeError__ (`must be str, not ${other.__class__.__name__}`));
}
__PyStr__.prototype.__mul__ = function (other) {
	if (other instanceof __PyInt__) {
		return (new __PyStr__ (this.x.repeat (other.x)));
	}
	__callstack__ = new Error ().stack; throw (new __PyTypeError__ (`can't multiply sequence by non-int of type ${other.__class__.__name__}`));
}
__PyStr__.prototype.__len__ = function () {
	return (new __PyInt__ (this.x.length));
}
__PyStr__.prototype.__eq__ = function (other) {return (this.x == other.x) ? __PyTrue__ : __PyFalse__;}
__PyStr__.prototype.__getitem__ = function (pos) {
	if (! (pos instanceof __PyInt__)) {
		__callstack__ = new Error ().stack; throw new TypeError (`string indices must be integers, not ${i.__class__.__name__}`);
	}

	if (__ge__ (pos, new __PyInt__ (0)) == __PyTrue__ && __lt__ (pos, this.__len__()) == __PyTrue__) {
		return new __PyStr__ (this.x[pos.x]);
	}
	__callstack__ = new Error ().stack; throw new IndexError (`string index out of range`);
}
__PyStr__.prototype.__iter__ = function * () {
	for (let x of this.x) {
		yield (new __PyStr__ (x));
	}
}


// Add __str__ method for object, type.
__PyObject__.__name__ = new __PyStr__ ('object');
__PyObject__.__str__ = function () {return (new __PyStr__ (`<class 'object'>`));}

__PyType__.__name__ = new __PyStr__ ('type');
__PyType__.__str__ = function () {return (new __PyStr__ (`<class 'type'>`));}
