var __PyNone__ = function () {}
__PyNone__.prototype.__str__ = function () {
	return (new __PyStr__ ('None'))
}
__PyNone__.prototype.__bool__ = function () {
	return False;
}
__PyNone__.prototype.__eq__ = function (other) {
	if (other === None) {return True;}
	return False;
}
__PyNone__.prototype.__ne__ = function (other) {
	return __eq__ (False, this.__eq__ (other));
}
const None = new __PyNone__ ();
