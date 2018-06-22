var t_count = 0;
function text(parent,value){
	//variables
	this.parent = parent;
	this.val = value;
	this.id = t_count.toString() + "text";
	t_count++;
	this.name = "#"+this.id;
	
	//adding the text to the SVG
	var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	$(g).attr({
        width: "100%",
        height: "100%"
    });
	var el = $(document.createElementNS('http://www.w3.org/2000/svg', 'text')).attr({
        x: "50",
        y:"50",
        id: this.id,
        fill:"white",
		stroke: "black"
    });
	$(el).text(value);
	$(el).attr("class","heavy");
	$(g).append(el);
	var elem = document.getElementById("svg1");
    elem.appendChild(g);
	this.rep = el;
	$((this.rep)).click(function(e){
		e.preventDefault();
	});
	
	//updating
	this.update = function(){
		$((this.name)).attr("x",(parseFloat($((this.parent)).attr("x"))+15).toString());
		$((this.name)).attr("y",(parseFloat($((this.parent)).attr("y"))+25).toString());
	}
	
	//beeing sure it would be updated
	pieces[pieces.length] = this;
}