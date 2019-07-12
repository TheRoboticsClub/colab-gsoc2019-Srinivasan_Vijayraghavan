Function.prototype.__eq__ = function (other) {return __getbool__ (this == other);}

function make_array (init = []) {
	return new Proxy (init, {
		get (target, key, recv) {
			var id = Number (key);
			if (!isNaN (id)) {
				if (id < 0) {id += target.length;}
				console.log (key);
				return Reflect.get(target, id, recv);
			}
            return Reflect.get(target, key, recv);
		},
		set (target, key, value, recv) {
			var id = Number (key);
			if (!isNaN (id)) {
				if (id < 0) {id += target.length;}
				console.log (key);
				return Reflect.set(target, id, recv);
			}
            return Reflect.set (target, key, value, recv);
		}
	});
}

function __PyType__ () {}
__PyType__.__class__ = __PyType__;
