let l_count = 0;
let lines = [];

function edge(start, end) {
    this.id = l_count.toString() + "line";
    l_count++;
    this.start = start;
    this.end = end;
    lines[lines.length] = this;

    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    $(g).attr({
        width: "100%",
        height: "100%"
    });
    let el = $(document.createElementNS('http://www.w3.org/2000/svg', 'line')).attr({
        x1: "50",
        y1: "50",
        x2: "55",
        y2: "55",
        id: this.id,
        fill: "yellow",
        stroke: "black"
    });
    $(el).attr("stroke-width", "2");
    $(g).append(el);
    let elem = document.getElementById("svg1");
    elem.appendChild(g);


    this.rep = el;
    this.name = "#" + this.id;

    this.update = function() {
        let adr = this.start.name;
        let temp = $(adr).attr("x");
        let n = this.name;
        temp = (parseFloat(temp)).toString();
        $(n).attr("x1", temp);
        temp = $(adr).attr("y");
        temp = (parseFloat(temp) + 10).toString();
        $(n).attr("y1", temp);
        adr = this.end.name;
        temp = $(adr).attr("x");
        temp = (parseFloat(temp) + 20).toString();
        $(n).attr("x2", temp);
        temp = $(adr).attr("y");
        temp = (parseFloat(temp) + 10).toString();
        $(n).attr("y2", temp);

        //and the color based on the state
        if (this.start.val) {
            $((this.rep)).attr("stroke", "yellow");
        } else {
            $((this.rep)).attr("stroke", "black");
        }
    }


    rem_edge(this);
}

function rem_edge(ob) {
    $((ob.rep)).on("click touchstart", function(e) {
        e.preventDefault();
        //removing the edge from the array
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] == (ob.id)) {
                lines.splice(i, 1);
            }
        }

        //removing the visual
        $((ob.rep)).remove();

        //fixing the actual start and end pins
        ob.start.nei = "yay";
        ob.start.val = false;
        ob.start.state = true;
        ob.end.val = false;
        ob.end.state = true;
    });
}