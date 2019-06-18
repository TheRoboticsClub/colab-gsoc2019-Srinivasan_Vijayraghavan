// <builtin print>
var print = new __PyFunction__ (new __PyStr__ ('print'), function (x) {
	console.log (x.__str__().toString ());
	return None;
});

var range = new __PyFunction__ (new __PyStr__ ('range'), function (start, end, step) {
	return (new __PyRange__ (start, end, step));
});

var type = new __PyFunction__ (new __PyStr__ ('type'), function (x) {
	return (x.__class__);
});

var __PyNotImplementedType__ = function () {
	this.__class__ = __PyNotImplementedType__;
	this.__name__ = new __PyStr__ ('NotImplemented');
}
__PyNotImplementedType__.prototype.__str__ = function () {return this.__name__;}

const __PyNotImplemented__ = new __PyNotImplementedType__ ();
