// <builtin print>
var print = new __PyFunction__ (new __PyStr__ ('print'), [], [], function (x) {
	console.log (x.__str__().toString ());
	return __PyNone__;
});
print.__call__ = function () {
	for (let x of arguments) {
		console.log (x.__str__ ().toString ());
	}
}
var range = new __PyFunction__ (new __PyStr__ ('range'), function (start, end, step) {
	return (new __PyRange__ (start, end, step));
});

var len = new __PyFunction__ (new __PyStr__ ('len'), [], [], function (x) {
	if ('__len__' in x) {
		return x.__len__ ();
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`TypeError: object of type '${x.__class__.__name__}' has no len()`)
});
len.__call__ = function (x) {
	if (arguments.length != 1) {
		__callstack__ = new Error ().stack; throw (new __PyTypeError__ (`
			len() takes exactly one argument (${arguments.length} given)
			`))
	}
	if ('__len__' in x) {
		return x.__len__ ();
	}
	__callstack__ = new Error ().stack; throw new __PyTypeError__ (`TypeError: object of type '${x.__class__.__name__}' has no len()`)
}
var __PyNotImplementedType__ = function () {
	this.__class__ = __PyNotImplementedType__;
	this.__name__ = new __PyStr__ ('NotImplemented');
}
__PyNotImplementedType__.prototype.__str__ = function () {return this.__name__;}

const __PyNotImplemented__ = new __PyNotImplementedType__ ();
