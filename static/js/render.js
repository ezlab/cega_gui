
(function(){

	var templates = {};

	function render(selector, template, data){
		$(selector).html(template(data));
	}

	app.render = function(selector, name, deferred){

		var template = templates[name] || $.get('static/templates/' + name + '.html').then(function(source){
			var tpl = Handlebars.compile(source);
			templates[name] = tpl;
			return tpl;
		});

		var data = deferred.then(function(data){
			return data;
		});

		$.when(selector, template, data).then(render);
	};

})();

