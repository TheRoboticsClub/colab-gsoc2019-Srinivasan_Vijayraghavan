var __PyTypeError__ = function (msg) {
	this.__class__ = __PyTypeError__;
	this.msg = (new __PyStr__ (`TypeError: ${msg}`));
}
__PyTypeError__.__str__ = function () {return (new __PyStr__ (`<class 'TypeError'>`));}
__PyTypeError__.__name__ = new __PyStr__ ('TypeError');
__PyTypeError__.__call__ = function (msg) {return new __PyTypeError__ (msg);}
__PyTypeError__.prototype.__str__ = function () {return this.msg;}

function __unsupportedbinaryop__ (op, a, b) {
	return (new __PyTypeError__ (
		`unsupported operand type(s) for ${op}: '${a.__class__.__name__}' and '${b.__class__.__name__}'`
	));
}


var __PyNameError__ = function (msg) {
	this.__class__ = __PyNameError__;
	this.msg = (new __PyStr__ (`NameError: ${msg}`));
}
__PyNameError__.__str__ = function () {return (new __PyStr__ (`<class 'NameError'>`));}
__PyNameError__.__name__ = new __PyStr__ ('TypeError');
__PyNameError__.__call__ = function (msg) {return new __PyNameError__ (msg);}
__PyNameError__.prototype.__str__ = function () {return this.msg;}



var __PyUnboundLocalError__ = function (msg) {
	this.__class__ = __PyUnboundLocalError__;
	this.msg = (new __PyStr__ (`UnboundLocalError: ${msg}`));
}
__PyUnboundLocalError__.__str__ = function () {return (new __PyStr__ (`<class 'UnboundLocalError'>`));}
__PyUnboundLocalError__.__name__ = new __PyStr__ ('UnboundLocalError');
__PyUnboundLocalError__.__call__ = function (msg) {return new __PyUnboundLocalError__ (msg);}
__PyUnboundLocalError__.prototype.__str__ = function () {return this.msg;}



var __PyIndexError__ = function (msg) {
	this.__class__ = __PyIndexError__;
	this.msg = (new __PyStr__ (`IndexError: ${msg}`));
}
__PyIndexError__.__str__ = function () {return (new __PyStr__ (`<class 'IndexError'>`));}
__PyIndexError__.__name__ = new __PyStr__ ('IndexError');
__PyIndexError__.__call__ = function (msg) {return new __PyIndexError__ (msg);}
__PyIndexError__.prototype.__str__ = function () {return this.msg;}



var __PyValueError__ = function (msg) {
	this.__class__ = __PyValueError__;
	this.msg = (new __PyStr__ (`ValueError: ${msg}`));
}
__PyValueError__.__str__ = function () {return (new __PyStr__ (`<class 'ValueError'>`));}
__PyValueError__.__name__ = new __PyStr__ ('ValueError');
__PyValueError__.__call__ = function (msg) {return new __PyValueError__ (msg);}
__PyValueError__.prototype.__str__ = function () {return this.msg;}
