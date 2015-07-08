
var app = {};

(function(){

	var values = {},
		events = {};


	app.get = function(name){
		return values[name];
	};


	app.set = function(name, value){

		if (value === values[name] && typeof value != 'object'){
			return;
		}

		values[name] = value;
		app.fireEvent(name, value);
	};


	app.on = function(name, fn){

		if (!events[name]){
			events[name] = [];
		}

		events[name].push(fn);
	};


	app.fireEvent = function(name, value){

		var handlers = events[name],
			args = [value, app.state()],
			results = [],
			i;

		if (handlers){
			for(i=0; i<handlers.length; i++){
				results.push(handlers[i].apply(this, args));
			}
		}

		return results;
	};


	function State(){}

	State.prototype = values;

	app.state = function(){
		return new State;
	};

})();

