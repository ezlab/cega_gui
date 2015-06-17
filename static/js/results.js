
(function(){

	app.helper('subtract', function(v1, v2){
		return Number(v2) - Number(v1);
	});


	function replaceContent(content){
		$('#content').html(content);
	}


	function requestPositions(params, state){

		if (!params.clade || !params.species){
			return;
		}

		var values = {
			clade: state.clade,
			species: state.species,
			request: state.request
		};

		var positions = app.load('/position', values);

		app.render('positions.html', positions).then(replaceContent);
	}

	app.on('navigate', requestPositions);

})();

