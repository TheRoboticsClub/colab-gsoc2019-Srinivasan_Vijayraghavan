var __PyObject__ = function () {
	this.__class__ = __PyObject__;
}
__PyObject__.__class__ = __PyType__;
__PyObject__.__call__ = function () {
	return new __PyObject__ ();
}
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
__PyObject__.prototype.__eq__ = function (other) {
	if (this === other) {return __PyTrue__;}
	return __PyNotImplemented__;
}
__PyObject__.prototype.__ge__ = function (other) {return __PyNotImplemented__;}
__PyObject__.prototype.__gt__ = function (other) {return __PyNotImplemented__;}
__PyObject__.prototype.__lt__ = function (other) {return __PyNotImplemented__;}
__PyObject__.prototype.__le__ = function (other) {return __PyNotImplemented__;}
__PyObject__.prototype.__ne__ = function (other) {
	if (this === other) {return __PyFalse__;}
	return __PyNotImplemented__;
}


// Extend __PyType__ to be a child of object.
__PyType__.prototype = Object.assign (__PyObject__.prototype, __PyObject__.prototype);
