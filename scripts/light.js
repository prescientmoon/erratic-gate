function light(id) {
    this.id = id;
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    $(g).attr({
        width: "100%",
        height: "100%"
    });
    let el = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle')).attr({
        cx: "50",
        cy: "50",
        r: "40",
        id: this.id,
        fill: "white",
        stroke: "black"
    });
    $(el).attr("stroke-width", "2");
    $(el).attr("class", "light");
    $(g).append(el);
    //$(el).attr("onmousedown","selected='"+this.id+"';");
    $(el).attr("onmouseup", "selected='yay';");
    let elem = document.getElementById("svg1");
    elem.appendChild(g);
    this.rep = el;

    this.i = new pin(0);
    this.val = false;
    //addevt(this);
    $((this.rep)).attr("stroke-width", 4);

    this.activation = function() {
        return this.i.val;
    }

    this.x = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("cx"));
    }

    this.y = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("cy"));
    }

    //design
    this.init = function() {
        return 0;
    }

    this.update = function() {
        if (this.i.val != "yay") {
            if ((this.activation())) {
                $((this.rep)).attr("fill", "yellow");
            } else {
                $((this.rep)).attr("fill", "white");
            }
        }
        let x = this.x();
        let y = this.y();
        this.i.set(x - 60, y - 10);
    }
    pieces[pieces.length] = this;

    addclk_light(this);
}

function addclk_light(ob) {
    $(ob.rep).on("mousedown touchstart", function(e) {
        e.preventDefault();
        let svg = document.getElementById("svg1");
        $(svg).append(ob.rep);
        $(svg).append($(ob.i.rep));
        selected = ob.id;
    });
}