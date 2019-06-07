function __add__ (a, b) {
	if ('__add__' in a) {
		return a.__add__ (b);
	}
	throw Error (`TypeError: unsupported operand type(s) for +:`);
}
function __sub__ (a, b) {
	if ('__sub__' in a) {
		return a.__sub__ (b);
	}
	throw Error (`TypeError: unsupported operand type(s) for -:`);
}
function __mult__ (a, b) {
	if ('__mul__' in a) {
		return a.__mul__ (b);
	}
	throw Error (`TypeError: unsupported operand type(s) for *:`);
}
function __div__ (a, b) {
	if ('__div__' in a) {
		return a.__div__ (b);
	}
	throw Error (`TypeError: unsupported operand type(s) for /:`);
}
function __index__ (i) {
	if ('__index__' in i) {
		return i.__index__ ();
	}
	throw Error (`AttributeError: '${i.__name__}' object has no attribute '__index__'`)
}
function __float__ (i) {
	if ('__float__' in i) {return i.__float__ ();}
	throw Error (`AttributeError: '${i.__name__}' object has no attribute '__float__'`)
}
function __gt__ (a, b) {return a.__gt__ (b);}
function __ge__ (a, b) {return a.__ge__ (b);}
function __lt__ (a, b) {return a.__lt__ (b);}
function __le__ (a, b) {return a.__le__ (b);}
function __eq__ (a, b) {return a.__eq__ (b);}
function __neq__ (a, b) {return a.__eq__ (b) === True ? False : True;}
function __is__ (a, b) {return a === b ? True : False;}
function __isnot__ (a, b) {return a !== b ? True : False;}

function __and__ () {
	for (let i = 0; i < arguments.length; i++) {
		if (arguments[i].__bool__ () === False) {
			return False;
		}
	}
	return True;
}
function __or__ () {
	for (let i = 0; i < arguments.length; i++) {
		if (arguments[i].__bool__ () === True) {
			return True;
		}
	}
	return False;
}
function __getitem__ (l, i) {
	return l.__getitem__ (i);
}
function __setitem__ (l, i, v) {
	return l.__setitem__ (i, v);
}
