
(function(){

	function scrollToAnchor(){
		if (location.hash) {
			var el = $(location.hash)[0];
			if (el) {
				el.scrollIntoView();
			}
		}
	}

	function render(value, state){
		if (state.view == 'page'){
			$("#content").html('Loading..');
			$("#content").load('static/pages/' + state.page + '.html', scrollToAnchor);
		}
	}

	function navigate(params){
		if (params.page || location.search.length < 2){
			app.set('page', params.page || 'home');
			app.set('view', 'page');
			scrollToAnchor();
		}
	}

	app.on('page', render);
	app.on('view', render);
	app.on('navigate', navigate);


	app.href = function(event, anchor){

		if (event.preventDefault && !event.ctrlKey && !event.shiftKey){
			event.preventDefault();
			app.navigate(anchor.href);
		}
	};

})();

