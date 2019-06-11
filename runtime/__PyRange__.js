var __PyRange__ = function (start, stop, step) {
	this.start = start.x;
	this.stop = stop.x;
	this.step = step.x;
}
__PyRange__.__name__ = new __PyStr__ ('range');
__PyRange__.prototype.__iter__ = function * () {
	for (let x = this.start; x < this.stop; x += this.step) {
		yield (new __PyInt__ (x));
	}
}
__PyRange__.prototype.__bool__  = function () {return True;}
__PyRange__.prototype.__str__ = function () {
	var s = `range(${this.start}, ${this.stop}, ${this.step})`;
	return (new __PyStr__ (s));
}
