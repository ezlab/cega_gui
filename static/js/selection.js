
(function(){

	function updateLinks(selected, state){

		var id = [];

		$.each(selected, function(key){
			id.push(key);
		});

		$('#download-fasta').attr('href', '/fasta?clade=' + state.clade + '&request=' + id);
		$('#download-bed').attr('href', '/bed?clade=' + state.clade + '&species=' + state.species + '&request=' + id);

		var label = 'Download';

		if (id.length){
			label +=  ' ' + id.length + ' item';;
		}

		if (id.length > 1){
			label += 's';
		}

		if (selected.all){
			label = 'Download All';
		}

		$('.s-download-button>.s-button-text').text(label);
	}

	app.on('selected', updateLinks);


	function selectRow(event){

		var $checkbox = $(event.target),
			checked = $checkbox.prop('checked'),
			id = $checkbox.attr('data-id'),
			selected = app.get('selected');

		if (id=='all'){
			$('.s-col-select>input').prop('checked', checked);
			selected = {};
		}
		else if (selected.all){
			$('.s-col-select>input').prop('checked', false);
			$checkbox.prop('checked', true);
			delete selected.all;
			checked = true;
		}

		if (checked){
			selected[id] = true;
		}
		else {
			delete selected[id];
		}

		app.set('selected', selected);
	}


	app.on('navigate', function(params){
		app.set('selected', {});
	});


	function showMenu(event){
		if(!$(event.target).is('.s-button-menu>a')){
			$('.s-download-button>.s-button-menu').show();
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