
(function(){

	var templates = {};

	function render(template, data){
		return template(data);
	}

	app.render = function(name, data){

		function compile(source){
			return (templates[name] = Handlebars.compile(source));
		}

		var template = templates[name] || $.get('static/templates/' + name).then(compile);

		return $.when(template, data).then(render);
	};


	app.helper = function(name, fn){
		Handlebars.registerHelper(name, fn);
	};

})();

