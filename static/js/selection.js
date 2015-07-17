
(function(){

	var isSelected;

	function updateLinks(value, state){

		var id = [], url = '';

		$.each(state.selected, function(key, value){
			if (value !== state.all){
				id.push(key);
			}
		});

		var params = {
			clade: state.clade,
			species: state.species,
			request: state.request,
			length: state.length,
			score: state.score,
			status: state.status
		};

		var label = 'Download',
			count = state.all ? state.total - id.length : id.length;

		isSelected = !!count;

		if (count){
			label +=  ' ' + count + ' item';
			params.items = String(id);
		}

		if (count > 1){
			label += 's';
		}

		if (state.all){
			params.all = true;
		}

		$('.s-download-button>.s-button-text').text(label);

		$.each(params, function(key, value){
			url += value ? (url ? '&' : '') + key + '=' + encodeURIComponent(value): '';
		});

		$('#download-fasta').attr('href', '/fasta?' + url);
		$('#download-bed').attr('href', '/bed?' + url);
		$('#download-fastalign').attr('href', '/fastalign?' + url);

	}

	app.on('all', updateLinks);
	app.on('selected', updateLinks);


	function selectRow(event){

		var $checkbox = $(event.target),
			checked = $checkbox.prop('checked'),
			id = $checkbox.attr('data-id'),
			all = app.get('all');
			selected = app.get('selected');

		if (id=='all'){
			$('.s-col-select>input').prop('checked', checked);
			all = checked;
			selected = {};
		}
		else {
			$('.s-col-select.s-pos-header>input').prop('checked', false);
			selected[id] = checked;
		}

		app.set('selected', selected);
		app.set('all', all);
	}


	app.on('navigate', function(params){
		isSelected = false;
		app.set('selected', {});
		app.set('all', false);
	});


	function showMenu(event){
		if(!$(event.target).is('.s-button-menu>a')){
			if (isSelected){
				$('.s-download-button>.s-button-menu').show();
			}
			else {
				alert('None of the rows is selected for the download. Select rows with the checkbox in the right column.');
			}
			event.stopPropagation();
		}
	}

	function hideMenu(event){
		$('.s-download-button>.s-button-menu').hide();
	}


	app.on('init', 	function init(){
		$('#content').on('click', '.s-col-select>input', selectRow);
		$('#content').on('click', '.s-download-button', showMenu);
		$(document).on('click', hideMenu);
	});

})();