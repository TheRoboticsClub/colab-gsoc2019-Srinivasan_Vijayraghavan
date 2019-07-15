var __PyBaseException__ = function (msg) {
	__PyObject__.call (this);
	this.__class__  = __PyBaseException__;
	this.msg = msg;
}
__PyBaseException__.prototype = Object.assign (__PyBaseException__.prototype, __PyObject__.prototype);
__PyBaseException__.prototype.__str__ = function () {return `${this.__class__.__name__}: ${this.msg}`;}
__PyBaseException__.__str__ = function () {return (new __PyStr__ (`<class 'BaseException'>`));}
__PyBaseException__.__name__ = new __PyStr__ ('BaseException');
__PyBaseException__.__call__ = function (msg) {return new __PyBaseException__ (msg);}

var __PyException__ = function (msg) {
	__PyBaseException__.call (this, msg);
	this.__class__ = __PyException__;
}
__PyException__.prototype = Object.create (__PyBaseException__.prototype);
__PyException__.__str__ = function () {return (new __PyStr__ (`<class 'Exception'>`));}
__PyException__.__name__ = new __PyStr__ ('Exception');
__PyException__.__call__ = function (msg) {return new __PyException__ (msg);}

var __PyTypeError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyTypeError__;
}
__PyTypeError__.prototype = Object.create (__PyException__.prototype);
__PyTypeError__.__str__ = function () {return (new __PyStr__ (`<class 'TypeError'>`));}
__PyTypeError__.__name__ = new __PyStr__ ('TypeError');
__PyTypeError__.__call__ = function (msg) {return new __PyTypeError__ (msg);}

function __unsupportedbinaryop__ (op, a, b) {
	return (new __PyTypeError__ (
		`unsupported operand type(s) for ${op}: '${a.__class__.__name__}' and '${b.__class__.__name__}'`
	));
}


var __PyNameError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyNameError__;
}
__PyNameError__.prototype = Object.create (__PyException__.prototype);
__PyNameError__.__str__ = function () {return (new __PyStr__ (`<class 'NameError'>`));}
__PyNameError__.__name__ = new __PyStr__ ('NameError');
__PyNameError__.__call__ = function (msg) {return new __PyNameError__ (msg);}


var __PyUnboundLocalError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyUnboundLocalError__;
}
__PyUnboundLocalError__.prototype = Object.create (__PyException__.prototype);
__PyUnboundLocalError__.__str__ = function () {return (new __PyStr__ (`<class 'UnboundLocalError'>`));}
__PyUnboundLocalError__.__name__ = new __PyStr__ ('UnboundLocalError');
__PyUnboundLocalError__.__call__ = function (msg) {return new __PyUnboundLocalError__ (msg);}


var __PyIndexError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyIndexError__;
}
__PyIndexError__.prototype = Object.create (__PyException__.prototype);
__PyIndexError__.__str__ = function () {return (new __PyStr__ (`<class 'IndexError'>`));}
__PyIndexError__.__name__ = new __PyStr__ ('IndexError');
__PyIndexError__.__call__ = function (msg) {return new __PyIndexError__ (msg);}


var __PyValueError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyValueError__;
}
__PyValueError__.prototype = Object.create (__PyException__.prototype);
__PyValueError__.__str__ = function () {return (new __PyStr__ (`<class 'ValueError'>`));}
__PyValueError__.__name__ = new __PyStr__ ('ValueError');
__PyValueError__.__call__ = function (msg) {return new __PyValueError__ (msg);}


var __PyZeroDivisionError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyZeroDivisionError__;
}
__PyZeroDivisionError__.prototype = Object.create (__PyException__.prototype);
__PyZeroDivisionError__.__str__ = function () {return (new __PyStr__ (`<class 'ZeroDivisionError'>`));}
__PyZeroDivisionError__.__name__ = new __PyStr__ ('ZeroDivisionError');
__PyZeroDivisionError__.__call__ = function (msg) {return new __PyZeroDivisionError__ (msg);}


var __PyAttributeError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyAttributeError__;
}
__PyAttributeError__.prototype = Object.create (__PyException__.prototype);
__PyAttributeError__.__str__ = function () {return (new __PyStr__ (`<class 'AttributeError'>`));}
__PyAttributeError__.__name__ = new __PyStr__ ('AttributeError');
__PyAttributeError__.__call__ = function (msg) {return new __PyAttributeError__ (msg);}


var __PyModuleNotFoundError__ = function (msg) {
	__PyException__.call (this, msg);
	this.__class__ = __PyModuleNotFoundError__;
}
__PyModuleNotFoundError__.prototype = Object.create (__PyException__.prototype);
__PyModuleNotFoundError__.__str__ = function () {return (new __PyStr__ (`<class 'ModuleNotFoundError'>`));}
__PyModuleNotFoundError__.__name__ = new __PyStr__ ('ModuleNotFoundError');
__PyModuleNotFoundError__.__call__ = function (msg) {return new __PyModuleNotFoundError__ (msg);}
