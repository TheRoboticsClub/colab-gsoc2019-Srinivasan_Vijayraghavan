var __PyInt__ = function (x) {
	this.x = parseInt (x);
	this.__class__ = __PyInt__;
}
__PyInt__.__call__ = function (x) {return new __PyInt__ (x);}
__PyInt__.__name__ = new __PyStr__ ('int');
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
		console.log ("In gt\n");
		return (this.x > __float__ (other).x) ? True : False;
	} catch (e){
		throw TypeError (`unsupported operand type(s) for '>'`);
	}
}
__PyInt__.prototype.__eq__ = function (other) {
	if (other instanceof __PyInt__ || other instanceof __PyFloat__) {
		return (this.x == other.x) ? True : False;
	}
}
__PyInt__.prototype.__str__ = function () {
	return (new __PyStr__ (this.x));
}
