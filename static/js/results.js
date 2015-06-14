
(function(){

	function requestPositions(params, state){

		if (!params.clade || !params.species){
			return;
		}

		var values = {
			clade: state.clade,
			species: state.species,
			request: state.request
		};

		var positions = $.getJSON('position', values);

		app.render('#content', 'positions', positions);
	}

	app.on('navigate', requestPositions);

})();

