var counter = function() {
	var count = 0; 
	return function() {
		return ++count; 
	} 
	//return ++count;
}
var c1 = counter();
var c2 = counter();
var c3 = counter();
console.log(c1());
console.log(c2());
console.log(c3());