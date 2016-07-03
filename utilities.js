(function () {
	var _ = function(element) {
		utils = {
			first: function	() {
				return element[0];
			},
			last: function () {
				return element[element.length - 1];
			},
			without: function() {
				var new_arr = [],
					args = Array.prototype.slice.call(arguments);

				element.forEach(function(ele) {
					// javascript doesn't let you index last element with -1
					// so we can check that an element isn't in our arguments
					// if it isn't in the arguments then we save the value
					if (args.indexOf(ele) === -1) {
						new_arr.push(ele);
					}
				});

				return new_arr;
			},
			lastIndexOf: function(search) {
				var idx = -1;
				for (var i = element.length -1; i >= 0; i--) {
					if (element[i] === search) {
						idx = i;
						break;
					}
				}

				return idx;
			},
			sample: function(qty) {
				var sampled = [],
					copy = element.slice(), // so we don't mutate original array
					get = function() {
						var idx = Math.floor(Math.random() * copy.length),
							ele = copy[idx];
						copy.splice(idx, 1);
						return ele;
					};

				if (!qty) {return get();}
				while(qty) {
					sampled.push(get());
					qty--;
				}

				return sampled;
			},

			// Collection methods
			findWhere: function	(props) {
				// match object to objects in element
				// how can we compare objects?
				var match; 

				element.some(function(obj) {
					var all_match = true;

					for (var prop in props) {
						if (!(prop in obj) || obj[prop] !== props[prop] ){
							all_match = false;
						}
					}

					if (all_match) {
						match = obj;
						return true;
					}
				});

				return match;
			},

			where: function	(props) {
				var matches = [];

				element.forEach(function(obj) {
					
					for (var prop in props) {
						if ((prop in obj) || obj[prop] === props[prop]) {
							matches.push(obj);
						}
					}
				});

				return matches;
			},
	    };

	    return utils;
	};

	_.range = function(start, stop) {
		var range = [];
		if (stop === undefined) {
			stop = start;
			start = 0;
		}

		for (var i = start; i < stop; i++) {
			range.push(i);
		}

		return range;
	};

	window._ = _;
})();
