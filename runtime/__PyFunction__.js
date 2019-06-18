var __PyFunction__ = function (name, f) {
	this.fvalue = f;
	this.__name__ = name;
	this.__class__ = __PyFunction__;
}
__PyFunction__.__call__ = function (name, f) {return new __PyFunction__ (f);}
__PyFunction__.__str__ = function () {return (new __PyStr__ (`<class 'function'>`));}

__PyFunction__.prototype.__str__ = function () {
	return this.__name__;
};
__PyFunction__.prototype.__call__ = function () {
	if (arguments.length != this.fvalue.length) {
		throw Error (`Arity Mismatch`);
	}
	return this.fvalue.apply (null, arguments);
}
