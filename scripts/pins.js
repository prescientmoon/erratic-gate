let count = 0;
let pins = [];
let sels = "yay";
let sele = "yay";
let num;

function pin(type) {
    this.state = true;
    this.nei = "yay";
    this.val = false;
    if (type == 0) {
        this.type = true;
        color = "black";
    } else {
        this.type = false;
        color = "red";
    }
    this.update = function() {
        if (this.nei != "yay") {
            if (!(this.type)) {
                this.val = this.nei.activation();
            } else {
                this.val = this.nei.val;
            }
        }
        if (this.val) {
            $((this.rep)).attr("fill", "red");
        } else {
            $((this.rep)).attr("fill", "yellow");
        }
    }
    this.id = count.toString();
    this.name = "#" + this.id;
    this.rep = add(20, 20, "yellow", "black", this.id, false);
    clicked(this);
    count++;
    this.name = "#" + this.id;
    this.set = function(x, y) {
        $(this.name).attr("x", x.toString());
        $(this.name).attr("y", y.toString());
    }
    pins[pins.length] = this;
    this.num = pins.length - 1;
}

function clicked(ob) {
    $(ob.rep).on("click touchstart", function(e) {
        e.preventDefault();
        if (ob.type == true) {
            sels = ob;
        } else {
            sele = ob;
        }
        if ((sels != "yay") && (sele != "yay")) {
            if ((sels.state)) {
                sels.nei = sele;
                sels.state = false;
                sele.state = false;
                a = new edge(sels, sele);
                sels = "yay";
                sele = "yay";
            }
        }
    });
}