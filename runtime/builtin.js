// <builtin print>
var print = new __PyFunction__ (new __PyStr__ ('print'), function (x) {
	console.log (x.__str__().toString ());
	return __PyNone__;
});

var range = new __PyFunction__ (new __PyStr__ ('range'), function (start, end, step) {
	return (new __PyRange__ (start, end, step));
});

var type = new __PyFunction__ (new __PyStr__ ('type'), function (x) {
	return (x.__class__);
});

var len = new __PyFunction__ (new __PyStr__ ('len'), function (x) {
	if ('__len__' in x) {
		return x.__len__ ();
	}
	throw new __PyTypeError__ (`TypeError: object of type '${x.__class__.__name__}' has no len()`)
});
var __PyNotImplementedType__ = function () {
	this.__class__ = __PyNotImplementedType__;
	this.__name__ = new __PyStr__ ('NotImplemented');
}
__PyNotImplementedType__.prototype.__str__ = function () {return this.__name__;}

const __PyNotImplemented__ = new __PyNotImplementedType__ ();
