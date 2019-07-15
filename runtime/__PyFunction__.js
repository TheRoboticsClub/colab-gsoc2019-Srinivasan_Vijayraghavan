var __PyFunction__ = function (name, posargs, defaults, f) {
	__PyObject__.call (this);
	this.fvalue = f;
	this.__name__ = new __PyStr__ (name);
	this.__class__ = __PyFunction__;
	this.__defaults__ = defaults;
	this.__posargs__ = posargs;
}
__PyFunction__.prototype = Object.assign (__PyFunction__.prototype, __PyObject__.prototype);
__PyFunction__.__call__ = function (name, f) {return new __PyFunction__ (f);}
__PyFunction__.__str__ = function () {return (new __PyStr__ (`<class 'function'>`));}

__PyFunction__.prototype.__str__ = function () {
	return this.__name__;
};
__PyFunction__.prototype.__call__ = function () {
	if (arguments.length < this.__posargs__.length - this.__defaults__.length
		|| arguments.length > this.__posargs__.length
	) {
		throw new __PyTypeError__ (
			`${this.__name__}() takes ${this.__posargs__.length} positional arguments`
		);
	}
	return this.fvalue.apply (null, arguments);
}
