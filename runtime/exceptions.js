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
		`unsupported operand type(s) for ${op}: '${a.__class__.__name__.toString ()}' and '${b.__class__.__name__.toString ()}'`
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
	this.msg = (new __PyStr__ (`NameError: ${msg}`));
}
__PyUnboundLocalError__.__str__ = function () {return (new __PyStr__ (`<class 'UnboundLocalError'>`));}
__PyUnboundLocalError__.__name__ = new __PyStr__ ('TypeError');
__PyUnboundLocalError__.__call__ = function (msg) {return new __PyUnboundLocalError__ (msg);}
__PyUnboundLocalError__.prototype.__str__ = function () {return this.msg;}
