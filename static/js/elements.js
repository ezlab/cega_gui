
(function(){

	var template,
		headers,
		widgets = {};


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

		var $box = $(event.currentTarget).next(),

			state = app.state(),

			values = {
				clade: state.clade,
				species: state.species,
				block: $box.attr('data-block'),
				element: $box.attr('data-element')
			},

			id = values.block + '_' + values.element;

		if ($box.find('div').length){
			$box.empty();
			$box.parent().removeClass('s-expanded');
			delete widgets[id];
			return;
		}


		function addParams(results){

			if (results){
				results.clade = values.clade;
				results.species = values.species;
				results.block = values.block;
				results.element = values.element;
			}

			return results;
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

			widgets[id] = new msa.msa(cfg);

			widgets[id].render();
		}

		$box.html('<div class="s-loading">Loading..</div>');
		$box.parent().addClass('s-expanded');

		var elements = app.load('/element', values).then(addParams),
			ready = app.render('elements.html', elements).then(expand);

		$.when(elements, ready).then(initMSA);
	}


	app.on('init', 	function init(){
		$('#content').on('click', '.s-position-cells', toggleRow);
	});


	app.on('resize', function(){
		$.each(widgets, function(id, m){
			m.g.zoomer.autoResize();
			m.render();
		});
	});


	app.msaExportAll = function(id){
		msa.utils.export.saveAsFile(widgets[id], id + '.fasta');
	};


	app.msaExportImage = function(id){
		msa.utils.export.saveAsImg(widgets[id], id + '.png');
	};


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
