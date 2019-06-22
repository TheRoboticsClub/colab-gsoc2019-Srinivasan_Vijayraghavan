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
	if (! (i instanceof __PyInt__)) {
		throw new TypeError (`tuple indices must be integers, not ${i.__class__.__name__}`);
	}
	if (__lt__ (i, __zero__) === __PyTrue__) {
		i = i.__add__ (this.__len__ ());
	}
	if (__ge__ (i, this.__len__ ()) === __PyTrue__ ||
		__lt__ (i, __zero__) === __PyTrue__) {
		throw new IndexError (`tuple index out of range`);
	}
	return this.t[i.x];
}
__PyTuple__.prototype.__add__ = function (other) {
	if (other instanceof __PyTuple__) {
		return (new __PyTuple__ (this.t.concat (other.t)));
	}
	throw new __PyTypeError__ (`can only concatenate tuple (not "${other.__class__.__name__}") to tuple`)
}
__PyTuple__.prototype.__str__ = function () {
	let ret = '('
	for (let x = 0; x < this.t.length-1; x++) {
		ret += x.__str__().toString ();
		ret += ', ';
	}
	ret += this.t[this.t.length -1].toString ();
	ret += ')'

	return (new __PyStr__ (ret));
}
__PyTuple__.prototype.__iter__ = function * () {
	for (let x of this.t) {
		yield x;
	}
}
