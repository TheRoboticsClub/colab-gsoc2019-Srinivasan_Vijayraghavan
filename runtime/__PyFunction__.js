var __PyFunction__ = function (f) {
	this.fvalue = f;
	this.__name__ = new __PyStr__ (`function ${this.fvalue.name}`);
}
__PyFunction__.__call__ = function (f) {return new __PyFunction__ (f);}

__PyFunction__.prototype.__call__ = function () {
	if (arguments.length != this.fvalue.length) {
		throw Error (`Arity Mismatch`);
	}
	return this.fvalue.apply (null, arguments);
}
