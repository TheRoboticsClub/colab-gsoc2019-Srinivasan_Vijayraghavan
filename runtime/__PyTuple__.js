var __PyTuple__ = function (t) {
	this.t = t;
	this.__size__ = new __PyInt__ (t.length);
	this.__class__ = __PyTuple__;
}

__PyTuple__.__name__ = new __PyStr__ ('tuple');
__PyTuple__.__str__ = function () {return (new __PyStr__ (`<class 'tuple'>`));}
__PyTuple__.__call__ = function (t) {return new __PyTuple__ (t);}

__PyTuple__.prototype.__len__ = function () {return this.__size__;}
__PyTuple__.prototype.__getitem__ = function (i) {
	try {
		var id = __index__ (i);
	} catch (e) {
		throw new TypeError (`tuple indices must be integers, not ${i.__class__.__name__}`);
	}
	if (__lt__ (id, __zero__) === __PyTrue__) {
		id = id.__add__ (this.__len__ ());
	}
	if (__ge__ (id, this.__len__ ()) === __PyTrue__ ||
		__lt__ (id, __zero__) === __PyTrue__) {
		throw new IndexError (`tuple index out of range`);
	}
	return this.t[id.x];
}
__PyTuple__.prototype.__add__ = function (other) {
	if (other instanceof __PyTuple__) {
		return (new __PyTuple__ (this.t.concat (other.t)));
	}
	throw new __PyTypeError__ (`can only concatenate tuple (not "${other.__class__.__name__}") to tuple`)
}
__PyTuple__.prototype.__str__ = function () {
	let ret = '('
	for (let x of this.t) {
		ret += x.__str__().toString ();
		ret += ', ';
	}
	ret += ')'

	return (new __PyStr__ (ret));
}
