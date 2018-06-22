//the absolute start, adding the buttons
//adding the button for the modal
var order = 0;
var selecte="yay"
var pieces = [];
var modal =  add(40,40,"blue","black","butt",false);
$(modal).mousedown(function(e){
	$("#addel").modal("show");
	selected = "butt"; 
});
$(modal).mouseup(function(e){
	selected = "yay"; 
});
$(modal).attr("y","500");
$(modal).attr("x","500");

//var desc = new text(modal,"+")

function getname(){
	return ((order++).toString()+"piece")
}

function addel(){
	var added =  eval("new "+$("#sel option:selected").attr("value")+"(getname())");
}

//variables
$("img,rect,circle,svg,p").mousedown(function(e){
	e.preventDefault();
});
$("*").mouseup(function(e){
	e.preventDefault();
});
$("img").click(function(e){
	e.preventDefault();
});
var selected = "yay";
var firstx = 0;
var firsty = 0;
var fx = 0;
var fy = 0;
let snap = false;
console.log("started");
//events 

$("body").mousemove(function(e){
	drag(e,selected);
});
$("body").mouseup(function(e){
	selected = "yay";
});
$("body").mousedown(function(e){
	if (selected!="yay"){
		firstx = e.pageX;
		firsty = e.pageY;
		name = "#"+selected;
		if ($(name).attr("class")=="light"){
			fx = parseFloat($(name).attr("cx"));
			fy = parseFloat($(name).attr("cy"));
		}
		else{
			fx = parseFloat($(name).attr("x"));
			fy = parseFloat($(name).attr("y"));
		}
	}
});
//functions
function drag(e,selected){
	
	//the name
	let name = "#" + selected;
	
	//the positions
	let x = e.pageX;
	let y = e.pageY;
	
	//updating positions
	set_position(name,x,y);
}

function set_position(name,x,y){
	var obj,objx,objy;
	obj = "#"+selected;
	if ($(name).attr("class")!="light"){
		//getting the variables
		obj = "#"+selected;
		objx = parseFloat($(obj).attr("x"));
		objy = parseFloat($(obj).attr("y"));
				
		x = parseFloat(x);
		y = parseFloat(y);
				
		xdif = fx - firstx;
		ydif = fy - firsty;
				
		x += xdif;
		y += ydif;
				
		//x -= parseFloat($(obj).attr("width"));
		//y -= parseFloat($(obj).attr("height"));
		if (snap){
			x = Math.floor(x/80)*80;
			y = Math.floor(y/80)*80;
		}
		//console.log("obj:"+obj+"objx:"+objx+"objy:"+objy+"xdif:"+xdif+"ydif:"+ydif)
		//setting the new positions
		$(obj).attr("x",(x).toString());
		$(obj).attr("y",(y).toString());
	}
	else{
		//for circles
		//getting the variables
		obj = "#"+selected;
		objx = parseFloat($(obj).attr("cx"));
		objy = parseFloat($(obj).attr("cy"));
				
		x = parseFloat(x);
		y = parseFloat(y);
				
		xdif = fx - firstx;
		ydif = fy - firsty;
				
		x += xdif;
		y += ydif;
				
		//x -= parseFloat($(obj).attr("width"));
		//y -= parseFloat($(obj).attr("height"));
		if (snap){
			x = Math.floor(x/80)*80+40;
			y = Math.floor(y/80)*80+40;
		}
		//console.log("obj:"+obj+"objx:"+objx+"objy:"+objy+"xdif:"+xdif+"ydif:"+ydif)
		//setting the new positions
		$(obj).attr("cx",(x).toString());
		$(obj).attr("cy",(y).toString());
	}
}

function add(h,w,color,stroke,id,on){
	var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
	$(g).attr({
        width: "100%",
        height: "100%"
    });
	var el = $(document.createElementNS('http://www.w3.org/2000/svg', 'rect')).attr({
        x: "50",
        y:"50",
        id: id,
        fill:color,
        height: h.toString()+"px",
        width:  w.toString()+"px",
		stroke: stroke,
		rx:"20",
		ry:"20"
    });
	if (on){
		$(el).attr("onmousedown","selected='"+id+"';");
		$(el).attr("onmouseup","selected='yay';");
	}
	$(el).attr("stroke-width","4");
	$(g).append(el);
	var elem = document.getElementById("svg1");
    elem.appendChild(g);
	return el;
}

console.log(pieces);
setInterval(function(){
	for (var i = 0;i < pieces.length;i++){
		pieces[i].update();
	}
	for (var i = 0;i < lines.length;i++){
		lines[i].update();
	}
	for (var i = 0;i < pins.length;i++){
		pins[i].update();
	}
},0.001);








//objects are made in other files