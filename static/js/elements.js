
(function(){

	var template;

	app.on('init', function(){
		return $.get('static/templates/msa.html').then(function(source){
			template = Handlebars.compile(source);
		});
	});

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

		var ready = app.render('elements.html', {index:index}).then(function(html){
			box.html(html);
		});

		$.when(elements, ready).then(function(res){

			var i, seqs = [], a = res.data;

			for(i=0; i<a.length; i++){
				seqs[i] = {
					id: 'r' + i,
					labels: template(a[i]),
					name: a[i].spc,
					seq: a[i].seq
				};
			}

			var opt = {
					el: document.getElementById('msa' + index),
					seqs : seqs,
					vis: {labelId: false},
					zoomer: {labelNameLength: 420}
				},

				m = new msa.msa(opt);

			m.render();

		});
	}


	function init(){
		$('#content').on('click', '.s-position-cells', function(event){
			toggleRow(event.currentTarget.getAttribute('data-id'));
		});
	}


	app.on('init', init);

})();


(function(){

	// LabelView
	require(155).prototype.render = function() {

		this.el.setAttribute("class", "biojs_msa_labels");
		this.el.style.width = (this.g.zoomer.getLabelWidth()) + "px";
		this.el.innerHTML = this.model.attributes.labels;
		return this;
	};

})();