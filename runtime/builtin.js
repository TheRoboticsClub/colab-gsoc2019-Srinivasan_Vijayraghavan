// <builtin print>
var print = new __PyFunction__ (function (x) {
	console.log (x.__str__().toString ());
});

var range = new __PyFunction__ (function (start, end, step) {
	return (new __PyRange__ (start, end, step));
});
