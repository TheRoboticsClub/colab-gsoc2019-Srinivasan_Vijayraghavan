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
