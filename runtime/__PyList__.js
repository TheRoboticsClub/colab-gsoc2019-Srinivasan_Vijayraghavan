var __PyList__ = function (l) {
	this.l = l;
}
__PyList__.__call__ = function (l) {return new __PyList__ (l);}
__PyList__.prototype.__getitem__ = function (i) {
	try {
		var n = __index__ (i).x;
	} catch (e) {
		throw Error (`TypeError: List indices must be integers`);
	}
	if (n >= 0 && n < this.l.length) {
		return this.l[n];
	}
	throw Error (`IndexError: list index out of range`);
}
__PyList__.prototype.__setitem__ = function (i, val) {
	try {
		var n = __index__ (i).x;
	} catch (e) {
		throw Error (`TypeError: List indices must be integers`);
	}
	if (n >= 0 && n < this.l.length) {
		this.l[n] = val;
	} else {
		throw Error (`IndexError: list index out of range`);
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
	return (__PyStr__.__call__ (ret));
}
__PyList__.prototype.__iadd__ = function (l) {
	if (l instanceof __PyList__) {
		this.l = this.l.concat (l.l);
	}
	return this;
}
