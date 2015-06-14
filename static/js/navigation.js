
(function(){

	function params(){

		var results = {};

		location.search.replace(/(\w+)=([^&]*)/g, function(match, name, value){
			results[name] = decodeURIComponent(value);
		});

		return results;
	}


	function navigate(){
		app.fireEvent('navigate', params());
	}


	function setup(){
		$(window).bind("popstate", navigate);
	}


	function ready(){
		$.when.apply($, app.fireEvent('ready', params())).then(setup).then(navigate);
	}


	function init(){
		$.when.apply($, app.fireEvent('init', params())).then(ready);
	}


	$(init);


	app.navigate = function(path, values){

		var url = path;

		if (values){
			url += '?' + $.param(values, true);
		}

		// IE8, IE9 do not support history API
		if (window.history && history.pushState){
			history.pushState({}, document.title, url);
			navigate();
		}
		else {
			window.location.href = url;
		}
	};

})();

