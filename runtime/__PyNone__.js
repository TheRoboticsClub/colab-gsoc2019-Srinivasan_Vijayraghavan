var __PyNoneType__ = function () {
	this.__class__ = __PyNoneType__;
}
__PyNoneType__.prototype.__str__ = function () {
	return (new __PyStr__ ('None'))
}
__PyNoneType__.prototype.__bool__ = function () {
	return False;
}
__PyNoneType__.prototype.__eq__ = function (other) {
	if (other === None) {return True;}
	return False;
}
__PyNoneType__.prototype.__ne__ = function (other) {
	return __eq__ (False, this.__eq__ (other));
}
const __PyNone__ = new __PyNoneType__ ();
