var __PyObject__ = function () {
	this.__class__ = __PyObject__;
}
__PyObject__.__class__ = __PyType__;
__PyObject__.prototype.__setattr__ = function (x, y) {
	if (x in this) {
		this.x = y;
	} else {
		throw new __PyAttributeError__ (
			`'${this.__class__}' object has no attribute '${x}'`
		);
	}
}
__PyObject__.prototype.__getattr__ = function (x) {
	if (x in this) {return this.x;}
	throw new __PyAttributeError__ (
		`'${this.__class__}' object has no attribute '${x}'`
	);
}
__PyFloat__.prototype = Object.assign (__PyFloat__.prototype, __PyObject__.prototype);
__PyInt__.prototype = Object.assign (__PyInt__.prototype, __PyObject__.prototype);
__PyList__.prototype = Object.assign (__PyList__.prototype, __PyObject__.prototype);
__PyTuple__.prototype = Object.assign (__PyTuple__.prototype, __PyObject__.prototype);
