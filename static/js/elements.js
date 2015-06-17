
(function(){

	function toggleRow(index){

		var box = $('#position-' + index),

			state = app.state(),
			positions = state.positions || [],
			position = positions[index] || {},

			values = {
				clade: state.clade,
				species: state.species,
				block: position.block,
				element: position.element
			};

		if (box.data('expanded')){
			box.data('expanded', false);
			box.html('');
			return;
		}

		box.data('expanded', true);
		box.html('loading..' + position.block + ' ' + position.element);

		var elements = app.load('/element', values);

		app.render('elements.html', elements).then(function(html){
			box.html(html);
		});
	}


	function init(){
		$('#content').on('click', '.s-position-row', function(event){
			toggleRow(event.currentTarget.getAttribute('data-id'));
		});
	}


	app.on('init', init);

})();

