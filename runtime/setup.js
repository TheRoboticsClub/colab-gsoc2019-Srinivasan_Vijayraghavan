var __callstack__;
var __symbolmap__ = {}; var __linemap__ = {};
var getfuncatline = function (lineno) {
	for (let x in __symbolmap__) {
		let p = __symbolmap__[x];
		if (p[0] <= lineno && p[1] >= lineno) {
			return x;
		}
	}
}
function decodecallstack () {
	let arr = __callstack__.split ('\n');
	let lineno_stack = [];
	for (let el of arr) {
		let lineno = el.slice (el.indexOf (':') + 1, el.lastIndexOf (':'));
		lineno_stack.push (lineno);
	}

	for (let x of lineno_stack) {
		let name = getfuncatline (x);
		if (name != undefined) {
			console.log (`function ${name} at ${__linemap__[x]}\n`);
		}
	}
}
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

function __PyType__ () {
	__PyObject__.call (this);
}
__PyType__.__class__ = __PyType__;
__PyType__.__call__ = function (x) {
	return x.__class__;
}
