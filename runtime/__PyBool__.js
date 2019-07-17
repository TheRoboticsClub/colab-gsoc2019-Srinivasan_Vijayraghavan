var __PyBool__ = function (x) {
	__PyInt__.call (this, x);
	this.__class__ = __PyBool__;
}
__PyBool__.prototype = Object.create (__PyInt__.prototype);
__PyBool__.__class__ = __PyType__;
__PyBool__.__call__ = function (x) {
	if ('__bool__' in x) {
		return x.__bool__ ();
	} else if ('__len__' in x) {
		let len = x.__len__ ();
		return (len.x == 0 ? __PyFalse__ : __PyTrue__);
	}
	return __PyFalse__;
}
__PyBool__.__name__ = new __PyStr__ ('bool');
__PyBool__.__str__ = function () {return (new __PyStr__ (`<class 'bool'>`));}
__PyBool__.prototype.valueOf = function () {return this.x == true;}
__PyBool__.prototype.__str__ = function () {
	return (new __PyStr__ (this.x ? "True" : "False"));
}
__PyBool__.prototype.__int__ = function () {
	return this.x ? (new __PyInt__ (1)) : (new __PyInt__ (0));
}
__PyBool__.prototype.__bool__ = function () {return this;}
__PyBool__.prototype.__index__ = function () {return this.__int__();}

__PyBool__.prototype.__and__ = function (other) {
	var other = other.__bool__ ()
	return __getbool__ (this.x && other.x);
}
__PyBool__.prototype.__or__ = function (other) {
	var other = other.__bool__ ();
	return __getbool__ (this.x || other.x);
}

function __getbool__ (x) {return (x == true) ? __PyTrue__ : __PyFalse__;}
function __getjsbool__ (x) {return x.__bool__ () === __PyTrue__;}
const __PyTrue__ = new __PyBool__ (1);
const __PyFalse__ = new __PyBool__ (0);
