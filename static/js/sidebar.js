
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
			window.setTimeout(function(){
				$('#submit-button').click();
			}, 0);
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

		app.on('query', function(){
			enableZoomOut();
		});
	}


	app.on('init', function(){

		var load1 = $.getJSON('static/data/clades.json'),
			load2 = $.getJSON('static/data/species.json');

		return $.when(load1, load2).then(init);
	});


	app.resetFilters = function(){

		app.set('minLength', '');
		app.set('maxLength', '');
		app.set('minScore', '');
		app.set('maxScore', '');
		app.set('status', '');

		$('#submit-button').click();
	};


	app.zoomOut = function(){

		var query = app.get('query');

		if (!String(query).match(/(\S+):(\d+)-(\d+)/)){
			return;
		}

		var chr = RegExp.$1,
			start = Math.max(Number(RegExp.$2)-1000, 0),
			end = Number(RegExp.$3) + 1000;

		app.set('request', chr + ':' + start + '-' + end);

		$('#submit-button').click();
	};


	function enableZoomOut(query){

		var query = app.get('query'),
			disabled = 's-disabled',
			$link = $('.s-zoom-out');

		if (String(query).match(/(\S+):(\d+)-(\d+)/)){
			$link.removeClass(disabled);
		}
		else {
			$link.addClass(disabled);
		};
	}



})();
