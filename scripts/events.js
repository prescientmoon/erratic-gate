window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
var xvb = 0;
var yvb=0;
var zoomx = window.innerWidth;
var zoomy = window.innerHeight;

updatescr();

function updatescr(){
	if (zoomx < 51){
		zoomx += 50;
	}
	if (zoomy < 51){
		zoomy += 50;
	}
	let newname = xvb.toString() + " " + yvb.toString() + " " + zoomx.toString() + " " + zoomy.toString();
	$("#svg1").removeAttr("viewBox");
	$("#svg1").each(function(){$(this)[0].setAttribute("viewBox",newname)});
}
document.addEventListener("keydown",e=> {
	if(e.keyCode == 40){
		yvb += 10;
		updatescr();
	}
	else if(e.keyCode == 39){
		xvb += 10;
		updatescr();
	}
	else if(e.keyCode == 38){
		yvb -= 10;
		updatescr();
	}
	else if(e.keyCode == 37){
		xvb -= 10;
		updatescr();
	}
	else if(e.keyCode == 187){
		if (!(zoomx < 101)&&!(zoomy < 101)){
			xvb += 25;
			yvb += 25;
		}
		zoomx -= 50;
		zoomy -= 50;
		updatescr();
	}
	else if(e.keyCode == 189){
		xvb -= 25;
		yvb -= 25;
		zoomx += 50;
		zoomy += 50;
		updatescr();
	}
},false);


var zooming  = false;
var xbeg = 0;
var ybeg = 0;
var moveing = false;

$("svg").mousemove(function(e){
	if (moveing && selected == "yay"){
		if (!(zooming)){
			zooming = true;
			
			//setting our first mouse poitions
			xbeg = e.pageX * zoomx/window.innerWidth;
			ybeg = e.pageY * zoomy/window.innerHeight;
			
			xbeg += xvb;
			ybeg += yvb;
			console.log("started zooming"+xbeg+"and"+ybeg);
			//moveing = (moveing +1)%2;
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


$("svg").mousedown(function(e){
	//e.preventDefault();
	moveing = true;
});


$("svg").mouseup(function(e){
	e.preventDefault();
	selected = "yay";
	zooming = false;
	moveing = false;
});











