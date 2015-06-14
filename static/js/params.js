
(function(){

	function updateState(params){

		if (!params.clade || !params.species){
			return;
		}

		app.set('clade', params.clade);
		app.set('species', params.species);
		app.set('request', params.request);
	}


	function sendRequest(){

		var state = app.state(),
			params = {
				clade: state.clade,
				species: state.species,
				request: state.request
			};

		app.navigate('', params);
	}


	function init(){
		$('#submit-button').click(sendRequest);
	}


	app.on('navigate', updateState);
	app.on('init', init);

})();

