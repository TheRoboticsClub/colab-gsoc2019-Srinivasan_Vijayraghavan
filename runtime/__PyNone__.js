var __PyNoneType__ = function () {
	__PyObject__.call (this);
	this.__class__ = __PyNoneType__;
}
__PyNoneType__.prototype = Object.assign (__PyNoneType__.prototype, __PyObject__.prototype);
__PyNoneType__.__class__ = __PyType__;
__PyNoneType__.__name__ = new __PyStr__ ('NoneType');
__PyNoneType__.prototype.__str__ = function () {
	return (new __PyStr__ ('None'))
}
__PyNoneType__.prototype.__bool__ = function () {
	return __PyFalse__;
}
__PyNoneType__.prototype.__eq__ = function (other) {
	return __getbool__ (other === __PyNone__);
}
__PyNoneType__.prototype.__ne__ = function (other) {
	return __getbool__ (other !== __PyNone__);
}
const __PyNone__ = new __PyNoneType__ ();
