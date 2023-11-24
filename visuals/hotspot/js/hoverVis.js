class HoverVis {
    constructor(parentElement, data) {
        // The DOM element of the parent
        this.parentElement = parentElement;
        this.data = data;

        this.initVis();
    }

    initVis() {
        let vis = this;

        // define margins
        vis.margin = {top: 0, right: 20, bottom: 0, left: 100};
        vis.width = vis.parentElement.getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = vis.parentElement.getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select(vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.image = vis.svg.append("svg:image")
            .attr("x", 0)
            .attr("y", 0)
            .attr("xlink:href", "visuals/hotspot/img/defender.png")

        vis.title = document.getElementById('title-hotspot');
        vis.description = document.getElementById('description-hotspot');

        vis.titleText = vis.title.innerHTML;
        vis.descriptionText = vis.description.innerHTML;

        console.log(vis.titleText)

        const t = d3.transition().duration(500).ease(d3.easeLinear);

        // Create the animations for the circles
        vis.circleAnimation = vis.svg.selectAll()
            .data(vis.data)
            .enter()
            .append("circle")
            .attr("cx", (d) => +d.x)
            .attr("cy", (d) => +d.y)
            .attr("r", 12)
            .attr("fill", "green")
            .attr("stroke", "green")
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 3)
            .attr("opacity", 0.5)

        vis.circleAnimation
            .transition(t)
            .attr("r", 25)
            .attr("stroke-opacity", 0)
            .attr("opacity", 0)

        // Create the clickable tweetTimeline circles
        vis.hotspots = vis.svg.selectAll()
            .data(vis.data)
            .enter()
            .append("circle")
            .attr("cx", (d) => +d.x)
            .attr("cy", (d) => +d.y)
            .attr("r", 12)
            .attr("fill", "green")
            .attr("opacity", 0.5)
            .on("mouseover", function (event, d) {
                    const t = d3.transition().duration(300).ease(d3.easeLinear);
                    vis.title.innerHTML = d.title;
                    vis.description.innerHTML = d.description;

                    d3.select(this)
                        .transition(t)
                        .attr("opacity", 1)
                        .attr("stroke-opacity", 1)

                vis.svg.selectAll(`.item-${d.index}`)
                    .transition(t)
                    .attr("stroke-opacity", 1);
                }
            )
            .on("mouseout", function (event, d) {
                const t = d3.transition().duration(500).ease(d3.easeLinear);
                d3.select(this)
                    .transition(t)
                    .attr("opacity", 0.5);
                vis.pulse()
                vis.svg.selectAll(`.item-${d.index}`)
                    .transition(t)
                    .attr("stroke-opacity", 0);

                vis.title.innerHTML = vis.titleText;
                vis.description.innerHTML = vis.descriptionText;
            })

        vis.bar = vis.svg.selectAll("rect")
            .data(vis.data);

        vis.rectangles = vis.svg.selectAll("rect")
            .data(vis.data)
            .enter()
            .append("rect")
            .attr("x", (d) => +d.rectX)
            .attr("y", (d) => +d.rectY)
            .attr("width", (d) => +d.rectWidth)
            .attr("height", function (d, i) {
                return +d.rectHeight
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("stroke-opacity", 0)
            .attr("stroke-width",3)
            .attr("stroke", "blue")
            .attr("fill", "none")
            .attr("class", (d) => "item-" + d.index)

        vis.pulse()
        vis.timer()
    }

    // Cause the green markers to pulse
    pulse() {
        const vis = this;
        const t = d3.transition().duration(500).ease(d3.easeLinear);
        vis.circleAnimation
            .attr("r", 12)
            .attr("stroke-opacity", 1)
            .attr("opacity", 0.5)
            .transition(t)
            .attr("r", 25)
            .attr("stroke-opacity", 0)
            .attr("opacity", 0)
    }

    // Cause the pulse every 5 seconds
    timer() {
        const vis = this;
        vis.pulse();
        setTimeout(function() { vis.timer() }, 5000)
    }
}


