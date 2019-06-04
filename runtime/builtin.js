// <builtin print>
var print = new __PyFunction__ (function (x) {
	console.log (x.__str__().toString ());
});
