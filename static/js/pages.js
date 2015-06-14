
(function(){

	function render(value, state){
		if (state.view == 'page'){
			$("#content").html('Loading..');
			$("#content").load('static/pages/' + state.page + '.html');
		}
	}

	function navigate(params){
		if (params.page || location.search.length < 2){
			app.set('page', params.page || 'home');
			app.set('view', 'page');
		}
	}

	app.on('page', render);
	app.on('view', render);
	app.on('navigate', navigate);

})();

