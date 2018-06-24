//the absolute start, adding the buttons
//adding the button for the modal
//in main.js i have some basic functions like adding rectangles
//and drag and drop

//====================first adding the modal=================================

//order is used to generate new id's for components
var order = 0;

//selected indicates what is the last element the user clicked on
var selecte="yay"

//piece would contain all the components 
//(without pins and edges)
//we will use that array for updating the value and the position
var pieces = [];

//this 'modal' variable is used to keep the blue box
//basically when you click on it the modal for adding components will pop
var modal =  add(40,40,"blue","black","butt",false);

//adding the event for clicking
$(modal).mousedown(function(e){
	
	//showing the modal
	//actually 'modal' is just the button
	//and 'addel' is the true id of the modal from DOM
	$("#addel").modal("show");
	
	//activatng the drag and drop for the blue box
	selected = "butt"; 
});

//the event for finishing the drag and drop on the blue box
$(modal).mouseup(function(e){
	//telling that we dont want to drag it anymore
	selected = "yay"; 
});

//changing the positon of the blue box
//we dont want it to be in the left top corner at 0 0
$(modal).attr("y","500");
$(modal).attr("x","500");

//var desc = new text(modal,"+")


//used for actually getting the new ids
function getname(){
	//getting the 'order'
	//than making it bigger by 1
	//convert it to string
	//than add 'piece' to it for avoiding confusion between pieces and pins
	return ((order++).toString()+"piece")
}

//the function that fires when you tap 'add'
function addel(){
	var added =  eval("new "+$("#sel option:selected").attr("value")+"(getname())");
}




//================================preventing deafult actions==========================

//nothing to say here
$("img,rect,circle,p").mousedown(function(e){
	e.preventDefault();
});
$("*").mouseup(function(e){
	e.preventDefault();
});
$("img").click(function(e){
	e.preventDefault();
});



//===============================variables============================================

//setting the drag and drop to our value
//'yay' means 'nothing selected'
var selected = "yay";

//the first positios of the clicks
var firstx = 0;
var firsty = 0;

//the first position of an element dragged
var fx = 0;
var fy = 0;

//snap settings
let snap = false;

//=====================================some events===================================

//nothing to say here...
//just some basic things
$("body").mousemove(function(e){
	//calling the drag function
	drag(e,selected);
	
	if (moveing){
		if (!(zooming)){
			zooming = true;
			
			//setting our first mouse poitions
			xbeg = e.pageX * zoomx/window.innerWidth;
			ybeg = e.pageY * zoomy/window.innerHeight;
			
			xbeg += xvb;
			ybeg += yvb;
			console.log("started zooming"+xbeg+"and"+ybeg);
		}
		
		var newx = e.pageX * zoomx/window.innerWidth;
		var newy = e.pageY * zoomy/window.innerHeight;
		
		newx += xvb;
		newy += yvb;
		
		xvb -= newx - xbeg;
		yvb -= newy - ybeg;
		updatescr();
		
		console.log(xvb+"newx"+newx+"xbeg"+xbeg);
	}
});
$("body").mouseup(function(e){
	selected = "yay";
});
$("body").mousedown(function(e){
	
	//beeing sure that we actually want to drag something
	if (selected!="yay"){
		
		//setting our first mouse poitions
		firstx = e.pageX * zoomx/window.innerWidth;
		firsty = e.pageY * zoomy/window.innerHeight;
		
		firstx += xvb;
		firsty += yvb;
		
		//conveerting the id to an actual thing 
		name = "#"+selected;
		
		//beeing sure we get the corect attributes
		//circle have 'cx' and 'cy'
		//and rectangles have 'x' and 'y'
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



//======================================funcctions for actual draging===========================


//thefunction that tranfers the data from the event to our set_position function
function drag(e,selected){
	
	//the name
	let name = "#" + selected;
	
	//the positions
	let x = e.pageX;
	let y = e.pageY;
	
	x *= zoomx/window.innerWidth;
	y *= zoomy/window.innerHeight;
	
	//updating positions
	set_position(name,x,y);
}

//our main place to change things
function set_position(name,x,y){
	var obj,objx,objy;
	obj = "#"+selected;
	
	x = parseFloat(x);
	y = parseFloat(y);
	
	x += xvb;
	y += yvb;
	
	
	
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