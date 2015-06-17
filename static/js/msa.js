
(function(){

	// backbone-viewj
	var view = require(9);

	// dom-helper
	var dom = require(66);

	// LabelView
	require(155).prototype.render = function() {

		var checkBox, id, name, part, val;
		dom.removeAllChilds(this.el);
		this.el.style.width = (this.g.zoomer.getLabelWidth()) + "px";
		this.el.setAttribute("class", "biojs_msa_labels");
		if (this.g.vis.get("labelCheckbox")) {
			checkBox = document.createElement("input");
			checkBox.setAttribute("type", "checkbox");
			checkBox.value = this.model.get('id');
			checkBox.name = "seq";
			checkBox.style.width = this.g.zoomer.get("labelCheckLength") + "px";
			this.el.appendChild(checkBox);
		}
		if (this.g.vis.get("labelId")) {
			id = document.createElement("span");
			val = this.model.get("id");
			if (!isNaN(val)) {
				val++;
			}
			id.textContent = val;
			id.style.width = this.g.zoomer.get("labelIdLength") + "px";
			id.style.display = "inline-block";
			this.el.appendChild(id);
		}
		if (this.g.vis.get("labelPartition")) {
			part = document.createElement("span");
			part.style.width = this.g.zoomer.get("labelPartLength") + "px";
			part.textContent = this.model.get("partition");
			part.style.display = "inline-block";
			this.el.appendChild(id);
			this.el.appendChild(part);
		}
		if (this.g.vis.get("labelName")) {
			name = document.createElement("span");
			name.textContent = this.model.get("name");
			if (this.model.get("ref") && this.g.config.get("hasRef")) {
				name.style.fontWeight = "bold";
			}
			name.style.width = this.g.zoomer.get("labelNameLength") + "px";
			this.el.appendChild(name);
		}
		this.el.style.overflow = scroll;
		this.el.style.fontSize = (this.g.zoomer.get('labelFontsize')) + "px";
		return this;
	};

})();
