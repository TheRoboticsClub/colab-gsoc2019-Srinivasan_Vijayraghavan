var __PyObject__ = function () {
	this.__class__ = __PyObject__;
	this.__dict__ = {}
}
__PyObject__.__class__ = __PyType__;
__PyObject__.__call__ = function () {
	return new __PyObject__ ();
}
__PyObject__.prototype.__setattr__ = function (x, y) {
	if (x in this.__dict__) {
		this.__dict__.x = y;
	} else {
		throw new __PyAttributeError__ (
			`'${this.__class__}' object has no attribute '${x}'`
		);
	}
}
__PyObject__.prototype.__getattr__ = function (x) {
	if (x in this.__dict__) {return this.__dict__[x];}
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
__PyType__.prototype = Object.assign (__PyType__.prototype, __PyObject__.prototype);

// Extending functions to suit python3
Function.prototype.__eq__ = function (other) {return __getbool__ (this == other);}
Function.prototype.__call__ = function () {
    return this.apply (this, arguments);
}
Function.prototype = Object.assign (Function.prototype, __PyObject__.prototype);
