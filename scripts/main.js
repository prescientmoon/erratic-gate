//the absolute start, adding the buttons
//adding the button for the modal
//in main.js i have some basic functions like adding rectangles
//and drag and drop

//====================first adding the modal=================================

//order is used to generate new id's for components
let order = 0;

//piece would contain all the components 
//(without pins and edges)
//we will use that array for updating the value and the position
let pieces = [];

//this 'modal' letiable is used to keep the blue box
//basically when you click on it the modal for adding components will pop
let modal = add(40, 40, "blue", "black", "butt", false);

//adding the event for clicking
$(modal).on("mousedown touchstart", function() {

    //showing the modal
    //actually 'modal' is just the button
    //and 'addel' is the true id of the modal from DOM
    $("#addel").modal("show");

    //being sure we wont move the components
    moveing = false;

    //activatng the drag and drop for the blue box
    selected = "butt";
});

//the event for finishing the drag and drop on the blue box
$(modal).on("mouseup touchend", function() {
    //telling that we dont want to drag it anymore
    selected = "yay";
});

//changing the positon of the blue box
//we dont want it to be in the left top corner at 0 0
$(modal).attr("y", "500");
$(modal).attr("x", "500");

//let desc = new text(modal,"+")


//used for actually getting the new ids
function getname() {
    //getting the 'order'
    //than making it bigger by 1
    //convert it to string
    //than add 'piece' to it for avoiding confusion between pieces and pins
    return ((order++).toString() + "piece")
}

//the function that fires when you tap 'add'
function addel() {
    for (let i = 0; i < parseFloat($("#times").val()); i++) {
        let added = eval("new " + $("#sel option:selected").attr("value") + "(getname())");
    }
}




//================================preventing deafult actions==========================

//nothing to say here
$("img,rect,circle,p,foreignObject").on("mousedown touchstart", function(e) {
    e.preventDefault();
});
$("*").on("mouseup touchend", function(e) {
    e.preventDefault();
    moveing = false;
});
$("img").on("click touchstart", function(e) {
    e.preventDefault();
});



//===============================letiables============================================

//setting the drag and drop to our value
//'yay' means 'nothing selected'
let selected = "yay";

//the first positios of the clicks
let firstx = 0;
let firsty = 0;

//the first position of an element dragged
let fx = 0;
let fy = 0;

//snap settings
let snap = false;

//=====================================some events===================================

//nothing to say here...
//just some basic things
$("body").on("mousemove touchmove", function(e) {
    //calling the drag function
    drag(e, selected);
});
$("body").on("mouseup touchend", function(e) {
    selected = "yay";
});
$("body").on("mousedown touchstart", function(e) {
    //beeing sure that we actually want to drag something
    if (selected != "yay") {

        //setting our first mouse poitions
        firstx = e.pageX * zoomx / window.innerWidth;
        firsty = e.pageY * zoomy / window.innerHeight;

        firstx += xvb;
        firsty += yvb;

        //conveerting the id to an actual thing 
        name = "#" + selected;

        //beeing sure we get the corect attributes
        //circle have 'cx' and 'cy'
        //and rectangles have 'x' and 'y'
        if ($(name).attr("class") == "light") {
            fx = parseFloat($(name).attr("cx"));
            fy = parseFloat($(name).attr("cy"));
        } else {
            fx = parseFloat($(name).attr("x"));
            fy = parseFloat($(name).attr("y"));
        }
    }
});



//======================================funcctions for actual draging===========================


//thefunction that tranfers the data from the event to our set_position function
function drag(e, selected) {

    //the name
    let name = "#" + selected;

    //the positions
    let x = e.pageX;
    let y = e.pageY;

    x *= zoomx / window.innerWidth;
    y *= zoomy / window.innerHeight;

    //updating positions
    set_position(name, x, y);
}

//our main place to change things
function set_position(name, x, y) {
    let obj, objx, objy;
    obj = "#" + selected;

    x = parseFloat(x);
    y = parseFloat(y);

    x += xvb;
    y += yvb;



    if ($(name).attr("class") != "light") {
        //getting the letiables
        obj = "#" + selected;
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
        if (snap) {
            x = Math.floor(x / 80) * 80;
            y = Math.floor(y / 80) * 80;
        }
        //setting the new positions
        $(obj).attr("x", (x).toString());
        $(obj).attr("y", (y).toString());
    } else {
        //for circles
        //getting the letiables
        obj = "#" + selected;
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
        if (snap) {
            x = Math.floor(x / 80) * 80 + 40;
            y = Math.floor(y / 80) * 80 + 40;
        }
        //setting the new positions
        $(obj).attr("cx", (x).toString());
        $(obj).attr("cy", (y).toString());
    }
}

function add(h, w, color, stroke, id, on) {
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    $(g).attr({
        width: "100%",
        height: "100%"
    });
    let el = $(document.createElementNS('http://www.w3.org/2000/svg', 'rect')).attr({
        x: "50",
        y: "50",
        id: id,
        fill: color,
        height: h.toString() + "px",
        width: w.toString() + "px",
        stroke: stroke,
        rx: "20",
        ry: "20"
    });
    if (on) {
        $(el).attr("onmousedown", "selected='" + id + "';");
        $(el).attr("onmouseup", "selected='yay';");
    }
    $(el).attr("stroke-width", "4");
    $(g).append(el);
    let elem = document.getElementById("svg1");
    elem.appendChild(g);
    return el;
}

setInterval(function() {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].update();
    }
    for (let i = 0; i < lines.length; i++) {
        lines[i].update();
    }
    for (let i = 0; i < pins.length; i++) {
        pins[i].update();
    }
}, 0.001);








//objects are made in other files