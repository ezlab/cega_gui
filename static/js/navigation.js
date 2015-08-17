
(function(){

	function params(){

		var results = {};

		location.search.replace(/(\w+)=([^&]*)/g, function(match, name, value){
			results[name] = decodeURIComponent(value.replace(/\+/g, '%20'));
		});

		return results;
	}


	function encode(params){

		var i, s = '';

		for (i in params){
			if (params[i]){
				s += (s ? '&' : '') + i + '=' + encodeURIComponent(params[i]).replace(/%20/g, '+');
			}
		}

		return s ? '?' + s : '';
	}


	function navigate(){
		app.fireEvent('navigate', params());
		ga('send', 'pageview', '/' + location.search); // Google analytics
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

		var url = path + encode(values);

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

