console.log("nut");

function but(id) {
    this.wait = true;
    this.id = id;
    this.rep = add(80, 80, "orange", "black", this.id, true);
    this.o = new pin(1);
    this.val = false;
    addevt(this);
    $((this.rep)).attr("stroke-width", 4);
    $((this.rep)).attr("stroke", "black");
    this.o.nei = this;
    this.activation = function() {
        return this.val;
    }

    this.x = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("x"));
    }

    this.y = function() {
        let name = "#" + this.id;
        //console.log("y"+parseFloat($(name).attr("y")));
        return parseFloat($(name).attr("y"));
    }

    //design
    this.init = function() {
        return 0;
    }

    this.update = function() {
        let x = this.x();
        let y = this.y();
        this.o.set(x + 80, y + 30);
    }
    pieces[pieces.length] = this;
}

function addevt(ob) {

    $((ob.rep)).on("mousedown touchstart", function(e) {
        let svg = document.getElementById("svg1");
        $(svg).append(ob.rep);
        $(svg).append($(ob.o.rep));
        selected = ob.id;
        e.preventDefault();
        if (ob.wait) {
            ob.val = (ob.val + 1) % 2;
            if (ob.val) {
                $((ob.rep)).attr("fill", "red");
            } else {
                $((ob.rep)).attr("fill", "orange");
            }
            ob.wait = false;
        }
    });
    $((ob.rep)).on("mouseup touchend", function() {
        selected = "yay";
        ob.wait = true;
    });
}