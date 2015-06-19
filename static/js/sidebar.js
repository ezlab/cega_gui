
(function(){

	var fields = {},
		statuses = ['all', 'coding', 'intronic', 'intergenic', 'noncoding'],
		lists = {};


	function updateSpecies(){

		var clade = app.get('clade'),
			select = fields.species;

		select.empty();

		$.each(lists[clade] || [], function(key, value) {
			 select.append($("<option></option>").attr("value", value).text(value));
		});

		select.val(app.get('species'));
	}


	function submit(e){
		if ((e.keyCode || e.which) == 13){
			$(this).blur();
			$('#submit-button').click();
		}
	}


	function bind(){

		var field = $(this),
			name = field.attr('data-field');

		function getState(){
			field.val(app.get(name));
		}

		app.on('ready', getState);
		app.on(name, getState);

		function setState(){
			app.set(name, field.val());
		}

		if (this.tagName == 'INPUT'){
			field.blur(setState);
			field.keypress(submit);
		}

		if (this.tagName == 'SELECT'){
			field.change(setState);
		}

		fields[name] = field;
	}


	function init(clades, species){

		$('input[data-field]').each(bind);
		$('select[data-field]').each(bind);

		$.each(clades[0], function(key, value) {
			 fields.clade.append($("<option></option>").attr("value", key).text(value));
		});

		$.each(species[0], function(key, value) {
			 lists[key] = value.split(',');
		});

		$.each(statuses, function(key, value) {
			 fields.status.append($("<option></option>").attr("value", value).text(value));
		});

		updateSpecies();

		app.on('clade', function(clade){
			updateSpecies();
		});
	}


	app.on('init', function(){

		var load1 = $.getJSON('static/data/clades.json'),
			load2 = $.getJSON('static/data/species.json');

		return $.when(load1, load2).then(init);
	});

})();
