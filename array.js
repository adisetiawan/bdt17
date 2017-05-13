var cats = ['kitty', 'casper', 'bony'];
cats.forEach(
	function(item) {
		console.log('meow ' + item);
	}
);

var dogs = {
	count : 1,
	bark : function() {
		return 'guk';
	},
	dogCount : function() {
		return this.count;
	}

};
var people = function(name) {
	return this.name;
};
console.log(dogs.bark());
console.log(dogs.dogCount());
var person = new people('john');
console.log(person);