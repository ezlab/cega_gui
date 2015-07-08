
(function(){

	var template,
		headers;


	function compileTemplate(source){
		template = Handlebars.compile(source);
		headers = template({headers: true});
	};


	app.on('init', function(){
		return $.get('static/templates/msa.html').then(compileTemplate);
	});


	function renderLabels(key, value){
		value.id = 'r' + key;
		value.labels = template(value);
	}


	function toggleRow(event){

		if (event.target.nodeName == 'INPUT'){
			return; // ignore checkbox clicks
		}

		var $box = $(event.currentTarget).next();

			state = app.state(),

			values = {
				clade: state.clade,
				species: state.species,
				block: $box.attr('data-block'),
				element: $box.attr('data-element')
			};

		if ($box.find('div').length){
			$box.empty();
			return;
		}

		function expand(content){
			$box.html(content);
		}

		function initMSA(results){

			var cfg = {
				el: $box.find('.msa>div'),
				seqs : results.data,
				vis: {labelId: false},
				zoomer: {labelNameLength: 420, alignmentHeight: Math.min(150, 15*results.data.length)}
			};

			$.each(cfg.seqs, renderLabels);

			var m = new msa.msa(cfg);

			m.render();
		}

		$box.html('<div class="s-loading">Loading..</div>');

		var elements = app.load('/element', values),
			ready = app.render('elements.html', elements).then(expand);

		$.when(elements, ready).then(initMSA);
	}


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


	app.on('init', 	function init(){
		$('#content').on('click', '.s-position-cells', toggleRow);
		$('#content').on('click', '.s-col-select>input', selectRow);
	});


	// MSA LabelHeader
	require(149).prototype.labelDOM	= function(){
		var el = document.createElement('div');
		el.style.width = this.g.zoomer.getLabelWidth() + 'px';
		el.innerHTML = headers;
		return el;
	};

	// MSA LabelView
	require(155).prototype.render = function() {
		this.el.setAttribute('class', 'biojs_msa_labels');
		this.el.style.width = this.g.zoomer.getLabelWidth() + 'px';
		this.el.innerHTML = this.model.attributes.labels;
		return this;
	};

})();