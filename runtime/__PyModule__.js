var __PyModule__ = function (name, dict) {
	__PyObject__.call (this);
	this.__name__ = name;
	this.__dict__ = dict;
}
__PyModule__.__class__ = __PyType__;
__PyModule__.__name__ = new __PyStr__ ('module');
__PyModule__.__str__ = function () {return (new __PyStr__ (`<class 'module'>`));}

__PyModule__.prototype = Object.create (__PyObject__.prototype);
__PyModule__.prototype.__getattr__ = function (x) {
	if (! (x in this.__dict__)) {
		throw new __PyAttributeError__ (`${x} not in module`);
	}
	return this.__dict__[x];
}
__PyModule__.prototype.__setattr__ = function (x, y) {
	this.__dict__[x] = y;
	return __PyNone__;
}

__PyModule__.prototype.__str__ = function () {return new __PyStr__ (`<module '${this.__name__}'>`);}
