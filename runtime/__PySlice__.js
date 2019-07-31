var __PySlice__ = function (lower, upper, step) {
	__PyObject__.call (this);
	this.lower = lower;
	this.upper = upper;
	this.step = step;

	this.__class__ = __PySlice__;
}
__PySlice__.prototype = Object.create (__PyObject__.prototype);
__PySlice__.__class__ = __PyType__;
__PySlice__.__name__ = new __PyStr__ ('slice');
__PySlice__.__str__ = function () {return (new __PyStr__ (`<class 'slice'>`));}

__PySlice__.__call__ = function (lower, upper, step) {
	let l, u, s;
	if (! ((lower instanceof __PyNoneType__) || (lower instanceof __PyInt__))
	|| ! ((upper instanceof __PyNoneType__) || (upper instanceof __PyInt__))
	|| ! ((step instanceof __PyNoneType__) || (step instanceof __PyInt__)) ) {
		__callstack__ = new Error ().stack; throw new __PyTypeError__ (`slice indices must be integers or None`);
	}
	if (lower === __PyNone__) {l = 0;}
	else {l = lower.x;}
	if (upper === __PyNone__) {u = 10000000000;}
	else {u = upper.x;}
	if (step === __PyNone__) {s = 1;}
	else {
		s = step.x;
		if (s == 0) {
			__callstack__ = new Error ().stack; throw new __PyValueError__ (`slice step cannot be zero`);
		}
	}

	return (new __PySlice__ (l, u, s));
}

__PySlice__.prototype.__str__ = function () {
	let ret = 'slice (' + this.lower + ', ' + this.upper + ', ' + this.step + ')';
	return new __PyStr__ (ret);
}
