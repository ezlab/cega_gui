
(function(){

	var names = ['clade', 'species', 'request', 'length', 'score', 'status', 'sort'];


	function updateState(params){

		if (!params.clade || !params.species){
			return;
		}

		$.each(names, function(index, name){
			app.set(name, params[name]);
		});
	}


	function sendRequest(){

		var params = {},
			state = app.state();

		$.each(names, function(index, name){
			params[name] = state[name];
		});

		app.navigate('', params);
	}


	function init(){
		$('#submit-button').click(sendRequest);
	}


	app.on('navigate', updateState);
	app.on('init', init);

})();

