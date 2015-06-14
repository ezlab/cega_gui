
(function(){

	var $clade,
		$species,
		$request,

		lists = {};


	function updateSpecies(){

		var clade = app.get('clade');

		$species.empty();

		$.each(lists[clade] || [], function(key, value) {
			 $species.append($("<option></option>").attr("value", value).text(value));
		});

		$species.val(app.get('species'));
	}


	function init(clades, species){

		$clade = $('#input-clade');
		$species = $('#input-species');
		$request = $('#input-request');

		$.each(clades[0], function(key, value) {
			 $clade.append($("<option></option>").attr("value", key).text(value));
		});

		$.each(species[0], function(key, value) {
			 lists[key] = value.split(',');
		});

		updateSpecies();

		$clade.val(app.get('clade'));
		$species.val(app.get('species'));
		$request.val(app.get('request'));

		$clade.change(function(){
			app.set('clade', $clade.val());
		});

		$species.change(function(){
			app.set('species', $species.val());
		});

		$request.blur(function(){
			app.set('request', $request.val());
		});
	}


	app.on('init', function(){

		var load1 = $.getJSON('static/data/clades.json'),
			load2 = $.getJSON('static/data/species.json');

		return $.when(load1, load2).then(init);
	});


	app.on('clade', function(clade){
		$clade.val(clade);
		updateSpecies();
	});


	app.on('species', function(species){
		$species.val(species);
	});


	app.on('request', function(request){
		$request.val(request);
	});

})();

