var object = function () {}
object.__name__ = 'object';
object.__base__ = 'None';
object.prototype.__eq__ = function (other) {}
object.prototype.__le__ = function (other) {}
object.prototype.__lt__ = function (other) {}
object.prototype.__ge__ = function (other) {}
object.prototype.__gt__ = function (other) {}
object.prototype.__add__ = function (other) {}
object.prototype.__str__ = function (other) {}
object.prototype.__getattribute__ = function (attr) {}
object.prototype.__setattr__ = function (which, value) {}

var __PyInt__ = function (x) {
	object.call (this);
	this.x = parseInt (x);
	this.__class__ = __PyInt__;
}
__PyInt__.__call__ = function (x) {return new __PyInt__ (x);}
__PyInt__.__base__ = object;
__PyInt__.__name__ = '__int__';
__PyInt__.prototype.__int__ = function () {return this;}
__PyInt__.prototype.__index__ = function () {return this;}
__PyInt__.prototype.__float__ = function () {return (new __PyFloat__ (this.x));}
__PyInt__.prototype.__bool__ = function () {this.x == 0 ? False : True;}
__PyInt__.prototype.__add__ = function (other) {
	if (other instanceof __PyInt__) {
		return new __PyInt__ (this.x + other.x);
	} else if (other instanceof __PyFloat__) {
		return (new __PyFloat__ (this.x + other.x));
	}
	throw Error (`TypeError: unsupported operand type(s) for +:.`)
}
__PyInt__.prototype.__sub__ = function (other) {
	if (other instanceof __PyInt__) {
		return new __PyInt__ (this.x - other.x);
	} else if (other instanceof __PyFloat__) {
		return (new __PyFloat__ (this.x - other.x));
	}
	throw Error (`TypeError: unsupported operand type(s) for -:`)
}
__PyInt__.prototype.__div__ = function (other) {
	if (other instanceof __PyInt__ || other instanceof __PyFloat__) {
		if (other.x == 0) {
			throw Error ('ZeroDivisionError: float division by zero');
		}
		return new __PyFloat__ (this.x / other.x);
	}
	throw Error (`TypeError: unsupported operand type(s) for /:`)
}
__PyInt__.prototype.__mul__ = function (other) {
	if (other instanceof __PyInt__ ) {
		return new __PyInt__ (this.x * other.x);
	} else if (other instanceof __PyFloat__) {
		return new __PyFloat__ (this.x * other.x);
	}
	throw Error (`TypeError: unsupported operand type(s) for *:`)
}
__PyInt__.prototype.__iadd__ = function (other) {return this.__add__ (other);}
__PyInt__.prototype.__isub__ = function (other) {return this.__sub__ (other);}
__PyInt__.prototype.__idiv__ = function (other) {return this.__div__ (other);}
__PyInt__.prototype.__imul__ = function (other) {return this.__mul__ (other);}

__PyInt__.prototype.__le__ = function (other) {
	try {
		return (this.x <= (__float__ (other)).x) ? True : False;
	} catch (e){
		throw TypeError (`unsupported operand type(s) for '<='`);
	}
}
__PyInt__.prototype.__lt__ = function (other) {
	try {
		return (this.x < (__float__ (other)).x) ? True : False;
	} catch (e){
		throw TypeError (`unsupported operand type(s) for '<'`);
	}
}
__PyInt__.prototype.__ge__ = function (other) {
	try {
		return (this.x >= __float__ (other).x) ? True : False;
	} catch (e){
		throw TypeError (`unsupported operand type(s) for '>='`);
	}
}
__PyInt__.prototype.__gt__ = function (other) {
	try {
		return (this.x > __float__ (other).x) ? True : False;
	} catch (e){
		throw TypeError (`unsupported operand type(s) for '>'`);
	}
}
__PyInt__.prototype.__leq__ = function (other) {
	if (other instanceof __PyInt__ || other instanceof __PyFloat__) {
		return (new __PyBool__ (this.x < other.x));
	}
}
__PyInt__.prototype.__str__ = function () {
	return (new __PyStr__ (this.x));
}


var __PyFloat__ = function (x) {
	this.x = parseFloat (x);
}
__PyFloat__.__call__ = function (x) {return new __PyFloat__ (x);}
__PyFloat__.prototype.__int__ = function () {
	return (new __PyInt__ (this.x));
};
__PyFloat__.prototype.__float__ = function () {
	return this;
};
__PyFloat__.prototype.__add__ = function (other) {
	if ('__float__' in other) {
		var other = other.__float__ ();
		return (new __PyFloat__ (this.x + other.x));
	}
	throw Error (`TypeError: unsupported operand type(s) for +:.`)
}
__PyFloat__.prototype.__sub__ = function (other) {
	if ('__float__' in other) {
		var other = other.__float__ ();
		return (new __PyFloat__ (this.x - other.x));
	}
	throw Error (`TypeError: unsupported operand type(s) for -:.`)
}
__PyFloat__.prototype.__div__ = function (other) {
	if ('__float__' in other) {
		var other = other.__float__ ();
		if (other.x == 0) {
			throw Error ('ZeroDivisionError: float division by zero');
		}
		return (new __PyFloat__ (this.x - other.x));
	}
	throw Error (`TypeError: unsupported operand type(s) for /:.`)
}
__PyFloat__.prototype.__mul__ = function (other) {
	if ('__float__' in other) {
		return (new __PyFloat__ (this.x * (other.__float__().x)));
	}
	throw Error (`TypeError: unsupported operand type(s) for *:.`)
}
__PyFloat__.prototype.__str__ = function () {
	return (new __PyStr__ (this.x));
}
__PyFloat__.prototype.__iadd__ = function (other) {return this.__add__ (other);}
__PyFloat__.prototype.__isub__ = function (other) {return this.__sub__ (other);}
__PyFloat__.prototype.__idiv__ = function (other) {return this.__div__ (other);}
__PyFloat__.prototype.__imul__ = function (other) {return this.__mul__ (other);}

var __PyStr__ = function (x) {
	this.x = String (x);
}
__PyStr__.__name__ = new __PyStr__ ('str');
__PyStr__.__call__ = function (x) {return new __PyStr__ (x);}
__PyStr__.prototype.__str__ = function () {return this;}
__PyStr__.prototype.toString = function () {return this.x;}
__PyStr__.prototype.__add__ = function (other) {
	if (other instanceof __PyStr__) {
		return (new __PyStr__ (this.x.concat (other.x)));
	} else {
		try {
			other.__radd__ (this);
		} catch (e) {
			print (e);
		}
	}
}
__PyStr__.prototype.__mul__ = function (other) {
	if (other instanceof __PyInt__) {
		return (new __PyStr__ (this.x.repeat (other.x)));
	}
	throw Error (`TypeError: can't multiply sequence by non-int`);
}
__PyStr__.prototype.__len__ = function () {
	return (new __PyInt__ (this.x.length));
}
__PyStr__.prototype.__eq__ = function (other) {return (this.x == other.x) ? True : False;}
__PyStr__.prototype.__getitem__ = function (pos) {
	var id = __index__ (pos);
	if (__ge__ (id, new __PyInt__ (0)) == True && __lt__ (id, this.__len__()) == True) {
		return new __PyStr__ (this.x[id.x]);
	}
	throw Error (`Indexing Error`);
}
__PyStr__.prototype.__iadd__ = function (other) {return this.__add__ (other);}
__PyStr__.prototype.__imul__ = function (other) {return this.__mul__ (other);}

// bool
var __PyBool__ = function (x) {
	__PyInt__.call (this);
	this.__class__ = __PyBool__;
	this.x = Boolean (x);
}
__PyBool__.prototype.__str__ = function () {
	return (new __PyStr__ (this.x ? "True" : "False"));
}
__PyBool__.prototype.__int__ = function () {
	return this.x ? (new __PyInt__ (1)) : (new __PyInt__ (0));
}
__PyBool__.prototype.__bool__ = function () {return this;}
__PyBool__.prototype.__index__ = function () {return this.__int__();}
__PyBool__.prototype.__float__ = function () {
	return this.x ? (new __PyFloat__ (1)) : (new __PyFloat__ (0));
}
__PyBool__.prototype.__add__ = function (other) {
	if (other instanceof __PyBool__) {
		return __add__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __add__ (this.__int__(), other);
	} else if (other instanceof __PyFloat__) {
		return __add__ (this.__float__ (), other);
	}
	throw Error (`TypeError: unsupported operand type(s) for +:`);
}
__PyBool__.prototype.__sub__ = function (other) {
	if (other instanceof __PyBool__) {
		return __sub__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __sub__ (this.__int__(), other);
	} else if (other instanceof __PyFloat__) {
		return __sub__ (this.__float__ (), other);
	}
	throw Error (`TypeError: unsupported operand type(s) for -:`);
}
__PyBool__.prototype.__mul__ = function (other) {
	if (other instanceof __PyBool__) {
		return __mul__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __mul__ (this.__int__(), other);
	} else if (other instanceof __PyFloat__) {
		return __mul__ (this.__float__ (), other);
	}
	throw Error (`TypeError: unsupported operand type(s) for *:`);
}
__PyBool__.prototype.__div__ = function (other) {
	if (other instanceof __PyBool__) {
		return __div__ (this.__int__ (), other.__int__());
	} else if (other instanceof __PyInt__) {
		return __div__ (this.__int__(), other);
	} else if (other instanceof __PyFloat__) {
		return __div__ (this.__float__ (), other);
	}
	throw Error (`TypeError: unsupported operand type(s) for /:`);
}
__PyBool__.prototype.__iadd__ = function (other) {return this.__add__ (other);}
__PyBool__.prototype.__isub__ = function (other) {return this.__sub__ (other);}
__PyBool__.prototype.__idiv__ = function (other) {return this.__div__ (other);}
__PyBool__.prototype.__imul__ = function (other) {return this.__mul__ (other);}

__PyBool__.prototype.__and__ = function (other) {
	var other = other.__bool__ ()
	if (this.x && other.x) {return True;}
	return False;
}
__PyBool__.prototype.__or__ = function (other) {
	var other = other.__bool__ ();
	if (this.x || other.x) {return True;}
	return False;
}
__PyBool__.prototype.valueOf = function () {return this.x;}

__PyInt__.__name__ = new __PyStr__ ('int');
__PyStr__.__name__ = new __PyStr__ ('str');
__PyFloat__.__name__ = new __PyStr__ ('float');
const True = new __PyBool__ (true);
const False = new __PyBool__ (false);


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
function print (x) {
	console.log (x.__str__ ().toString ());
}
function len (x) {
	if ('__len__' in x) {
		return x.__len__ ();
	}
	throw Error (`TypeError: object of type '${x.__name__}' has no len()`)
}

var __PyList__ = function (l) {
	this.l = l;
}
__PyList__.__call__ = function (l) {return new __PyList__ (l);}
__PyList__.prototype.__getitem__ = function (i) {
	try {
		var n = __index__ (i).x;
		if (n >= 0 && n < this.l.length) {
			return this.l[n];
		}
	} catch (e) {
		throw Error (`TypeError: List indices must be integers`);
	}

}
__PyList__.prototype.__setitem__ = function (i, val) {
	try {
		var n = __index__ (i).x;
	} catch (e) {
		throw Error (`TypeError: List indices must be integers`);
	}
	if (n >= 0 && n < this.l.length) {
		this.l[n] = val;
	} else {
		throw Error (`IndexError: list index out of range`);
	}
}
__PyList__.prototype.__len__ = function () {return new __PyInt__ (this.l.length);}
__PyList__.prototype.__str__ = function () {
	var ret = '';
	for (let i = 0; i < this.l.length; i++) {
		ret += this.l[i].__str__ ().toString ();
		ret += ', '
	}
	return (__PyStr__.__call__ (ret));
}
__PyList__.prototype.__iadd__ = function (l) {
	if (l instanceof __PyList__) {
		this.l = this.l.concat (l.l);
	}
}
var BaseException = function (...args) {

}
var Exception = function (x) {
	this.x = new __PyStr__ (x);
	BaseException.call (this);
}
var ArithmeticError = function (...args) {
	Exception.call (this);
}
var ZeroDivisionError = function (...args) {
	ArithmeticError.call (this);
}

var __PyFunction__ = function (f) {this.fvalue = f;}
__PyFunction__.__call__ = function (f) {return new __PyFunction__ (f);}

__PyFunction__.prototype.__name__ = new __PyStr__ ('function ${this.fvalue.name}');
__PyFunction__.prototype.__call__ = function () {
	if (arguments.length != this.fvalue.length) {
		throw Error (`Arity Mismatch`);
	}
	return this.fvalue.apply (null, arguments);
}

// <built-in print>
var print = new __PyFunction__ (function (x) {
	console.log (x.__str__().toString ());
});
