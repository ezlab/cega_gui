
(function(){

	var rows = [],
		rendered = 0,
		total = 0,
		skip = 0,
		limit = 100;


	app.helper('subtract', function(v1, v2){
		return Number(v2) - Number(v1);
	});


	app.helper('plural', function (value, singular, plural, options) {
			return String(value) + ' ' + (value == 1 ? singular : plural);
	});


	app.helper('chromatin', function(value){
		return String(value).replace(/^(\d*).*$/, 'chromatin-$1');
	});


	app.helper('grey', function(value){
		var hex = Math.round(255 * (1-value/1000)).toString(16).replace(/^(\w)$/, '0$1');
		return '#' + hex + hex + hex;
	});


	app.helper('sorter', function(column){

		var s = '<div class="s-sorter" data-column="%1"><div class="s-asc %2"></div><div class="s-desc %3"></div></div>',
			current = String(app.get('sort')).toLowerCase();

		s = s.replace('%1', column);
		s = s.replace('%2', column + '|asc' == current ? 's-current' : '');
		s = s.replace('%3', column + '|desc' == current ? 's-current' : '');

		return new Handlebars.SafeString(s);
	});


	var	resizeSensor;

	function startResizeSensor(){
		resizeSensor = new ResizeSensor($('#positions'), function(){
			app.fireEvent('resize');
		});
	}

	function stopResizeSensor(){
		resizeSensor.detach();
		resizeSensor = null;
	}


	function appendRows(content){

		$('#positions').append(content);

		if (total == 1){
			$('.s-position-cells').click();
		}
	}


	function updateDisplay(){

		var content = $('.s-position-scroll')[0],
			data = rows.slice(rendered, rendered + 50),
			all = app.get('all');

		if (!resizeSensor){
			startResizeSensor();
		}

		if (rendered < total && content.scrollHeight - content.offsetHeight - content.scrollTop < 100){

			app.render('rows.html', {data: data, all: all}).then(appendRows);

			rendered += 50;

			if (rows.length < total && rows.length - rendered < 50){
				requestPositions();
			}
		}
	}


	function updatePositions(content){
		$('#content').html(content);
		updateDisplay();
	}


	function savePositions(response){

		if (response.data && response.data.length){
			rows = rows.concat(response.data);
		}

		if (!total){
			total = response.count;
			response.state = app.state();
			app.render('positions.html', response).then(updatePositions);
			app.set('total', total);
			app.set('query', response.request);
		}
		else {
			updateDisplay();
		}
	}


	function requestPositions(){

		var state = app.state();

		var values = {
			clade: state.clade,
			species: state.species,
			request: state.request,
			length: state.length,
			score: state.score,
			status: state.status,
			sort: state.sort,
			skip: skip,
			limit: limit
		};

		skip += limit;

		app.load('/position', values).then(savePositions);
	}


	app.on('navigate', function(params){

		if (resizeSensor){
			stopResizeSensor();
		}

		if (!params.clade || !params.species){
			return;
		}

		app.set('view', 'data');

		rows = [];
		rendered = 0,
		total = 0;
		skip = 0;

		$('#content').html('<div class="s-loading">Loading..</div>');

		requestPositions();
	});


	app.on('init', function(){

		$('#content').on('click', '.s-sorter>div', function(e){

			var column = this.parentNode.getAttribute('data-column');

			if (this.className.match(/s-asc/)){
				app.set('sort', column + '|asc');
			}

			if (this.className.match(/s-desc/)){
				app.set('sort', column + '|desc');
			}

			$('#submit-button').click();
		});
	});


	app.on('resize', function(){
		$('.s-position-status').width($('#positions').width());
	});


	app.scrollPositions =	function(){

		if ($('#positions').length){
			updateDisplay();
		}
	};

})();

