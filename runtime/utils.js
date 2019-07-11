function __uadd__ (a) {
	if ('__pos__' in a) {
		return a.__pos__ ();
	}
	throw new __PyTypeError__ (`bad operand type for unary +: '${a.__class__.__name__}'`);
}
function __usub__ (a) {
	if ('__neg__' in a) {
		return a.__neg__ ();
	}
	throw new __PyTypeError__ (`bad operand type for unary -: '${a.__class__.__name__}'`);
}
function __add__ (a, b) {
	if ('__add__' in a) {
		let ret = a.__add__ (b);
		if (ret === __PyNotImplemented__) {
			if ('__radd__' in b) {
				let ret = b.__radd__ (a);
				if (ret !== __PyNotImplemented__) {
					return ret;
				}
			}
		} else {
			return ret;
		}
	}
	throw __unsupportedbinaryop__ ('+', a, b);
}
function __sub__ (a, b) {
	if ('__sub__' in a) {
		let ret =  a.__sub__ (b);
		if (ret === __PyNotImplemented__) {
			if ('__rsub__' in b) {
				let ret = b.__rsub__ (a);
				if (ret !== __PyNotImplemented__) {
					return ret;
				}
			}
		} else {
			return ret;
		}
	}
	throw __unsupportedbinaryop__ ('-', a, b);
}
function __mul__ (a, b) {
	if ('__mul__' in a) {
		let ret =  a.__mul__ (b);
		if (ret === __PyNotImplemented__) {
			if ('__rmul__' in b) {
				let ret = b.__rmul__ (a);
				if (ret !== __PyNotImplemented__) {
					return ret;
				}
			}
		} else {
			return ret;
		}
	}
	throw __unsupportedbinaryop__ ('*', a, b);
}
function __div__ (a, b) {
	if ('__div__' in a) {
		let ret =  a.__div__ (b);
		if (ret === __PyNotImplemented__) {
			if ('__rdiv__' in b) {
				let ret = b.__rdiv__ (a);
				if (ret !== __PyNotImplemented__) {
					return ret;
				}
			}
		} else {
			return ret;
		}
	}
	throw __unsupportedbinaryop__ ('/', a, b);
}
function __iadd__ (a, b) {
	if ('__iadd__' in a) {
		return a.__iadd__ (b);
	}
	return __add__ (a, b);
}
function __imul__ (a, b) {
	if ('__imul__' in a) {
		return a.__imul__ (b);
	}
	return __mul__ (a, b);
}
function __isub__ (a, b) {
	if ('__isub__' in a) {
		return a.__isub__ (b);
	}
	return __sub__ (a, b);
}
function __idiv__ (a, b) {
	if ('__idiv__' in a) {
		return a.__idiv__ (b);
	}
	return __div__ (a, b);
}
function __index__ (i) {
	if ('__index__' in i) {
		return i.__index__ ();
	}
	throw Error (`AttributeError: '${i.__class__.__name__}' object has no attribute '__index__'`)
}
function __int__ (i) {
	if ('__int__' in i) {return i.__int__ ();}
	throw Error (`AttributeError: '${i.__class__.__name__}' object has no attribute '__float__'`)
}
function __float__ (i) {
	if ('__float__' in i) {return i.__float__ ();}
	throw Error (`AttributeError: '${i.__class__.__name__}' object has no attribute '__float__'`)
}
function __mod__ (a, b) {
	if ('__mod__' in a) {
		return a.__mod__ (b);
	}
}
function __gt__ (a, b) {return a.__gt__ (b);}
function __ge__ (a, b) {return a.__ge__ (b);}
function __lt__ (a, b) {return a.__lt__ (b);}
function __le__ (a, b) {return a.__le__ (b);}
function __eq__ (a, b) {return a.__eq__ (b);}
function __neq__ (a, b) {return a.__eq__ (b) === __PyTrue__ ? __PyFalse__ : __PyTrue__;}
function __is__ (a, b) {return __getbool__ (a === b);}
function __isnot__ (a, b) {return __getbool__ (a !== b);}

function __getitem__ (l, i) {
	if ('__getitem__' in l) {
		return l.__getitem__ (i);
	}
	throw new __PyTypeError__ (`'${l.__class__.__name__}' object is not subscriptable`)
}
function __setitem__ (l, i, v) {
	if ('__setitem__' in l) {
		return l.__setitem__ (i, v);
	}
	throw new __PyTypeError__ (`'${l.__class__.__name__}' object does not support item assignment`)
}
function __call__ (f) {
    if ('__call__' in f) {
		let ret = f.__call__;
		ret.bind (f);
		return f.__call__.bind (f);
    }
    throw new __PyTypeError__ (`'${f.__class__.__name__}' object is not callable`)
}
function __iter__ (o) {
	if ('__iter__' in o) {
		return o.__iter__ ();
	}
	throw new __PyTypeError__ (`'${o.__class__.__name__}' object is not iterable`);
}
function __raise__ (o) {
	if (o instanceof __PyBaseException__) {throw o;}
	throw new __PyTypeError__ (`exceptions must derive from BaseException`);
}
