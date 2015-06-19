
(function(){

	var rows = [],
		rendered = 0,
		total = 0,
		skip = 0,
		limit = 100;


	app.helper('subtract', function(v1, v2){
		return Number(v2) - Number(v1);
	});


	function appendRows(content){
		$('#positions').append(content);
	}


	function updateDisplay(){

		var content = $('#content')[0];

		if (rendered < total && content.scrollHeight - content.offsetHeight - content.scrollTop < 100){

			app.render('rows.html', rows.slice(rendered, rendered + 50)).then(appendRows);

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

		if (!params.clade || !params.species){
			return;
		}

		rows = [];
		rendered = 0,
		total = 0;
		skip = 0;

		$('#content').html('<div class="s-loading">Loading..</div>');

		requestPositions();
	});


	app.on('init', function(){

		$('#content').on('scroll', function(){

			if ($('#positions').length){
				updateDisplay();
			}
		});
	});

})();

