
(function(){

	Handlebars.registerHelper('length', function(start, stop){
		return Number(stop) - Number(start);
	});


	function requestPositions(params, state){

		if (!params.clade || !params.species){
			return;
		}

		var values = {
			clade: state.clade,
			species: state.species,
			request: state.request
		};

		var positions = $.getJSON('position', values).then(app.verifyRespones);

		app.render('#content', 'positions', positions);
	}

	app.on('navigate', requestPositions);

})();

