
(function(){

	var names = ['clade', 'species', 'request', 'length', 'score', 'status', 'sort'];


	function updateState(params, state){

		if (!params.clade || !params.species){
			return;
		}

		$.each(names, function(index, name){
			app.set(name, params[name]);
		});

		var min = '',
			max = '';

		if (String(state.length).match(/^(\d+)-(\d+)$/)){
			min = RegExp.$1,
			max = RegExp.$2;
		}

		app.set('minLength', min);
		app.set('maxLength', max);

		min = '';
		max = '';

		if (String(state.score).match(/^(\d+)-(\d+)$/)){
			min = RegExp.$1,
			max = RegExp.$2;
		}

		app.set('minScore', min);
		app.set('maxScore', max);
	}


	function sendRequest(){

		var params = {},
			state = app.state();

		state.length = state.minLength && state.maxLength ? state.minLength + '-' + state.maxLength : '';
		state.score = state.minScore && state.maxScore ? state.minScore + '-' + state.maxScore : '';

		$.each(names, function(index, name){
			params[name] = state[name];
		});

		app.navigate('', params);
	}


	function init(){

		app.set('clade', 'vertebrata_human_69_all');
		app.set('species', 'Homo Sapiens');
		app.set('status', 'noncoding');

		$('#submit-button').click(sendRequest);
	}


	app.on('navigate', updateState);
	app.on('init', init);

})();

