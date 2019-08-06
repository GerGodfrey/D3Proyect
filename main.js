var dataset = [];
var button = document.getElementById("clickme");
var buttonR = document.getElementById("click_right");
var countR = 0;
var countI = 0;


button.onclick = function() {
  countI = countI + 1;
  dataset.push({"indice":0, "px": (Math.random()*5), "py": (Math.random() *5)});
  button.innerHTML = "Left: " + countI;
  plot(dataset,svg);
  prube();
};

buttonR.onclick  = function (){
  countR++;
  dataset.push({"indice":1, "px": (Math.random() * (9 - 3.5) + 3.5), "py": (Math.random() * (9 - 5) + 5) });
  buttonR.innerHTML = "Right: " + countR;
  plot(dataset,svg);
  prube();
};

//dataviz_brushChange
var margin = {top: 10, right: 30, bottom: 30, left: 60};
var width = (660 - margin.left - margin.right);
var height = (600 - margin.top - margin.bottom);


const plot = (dataset,svg) => {

  var y = d3.scaleLinear()
    .domain([0, 9])
    .range([ height, 0]);
  svg.append("g")
    
    .call(d3.axisLeft(y));

  var x = d3.scaleLinear()
    .domain([0, 9])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));   

  const circle = svg
    .selectAll('circle')
    .data(dataset);
  
  circle
    .enter()
    .append("circle")
      .attr("cx",function(d) {return  x(dataset[dataset.length - 1]["px"])}) // hasta el 500
      .attr("cy", function(d){return  y(dataset[dataset.length - 1]["py"])}) // hasta el 500 
      .attr("r",8)
      .style("fill", function (d) { return color(dataset[dataset.length - 1]["indice"]) } )
      .style("opacity", 0.5);

  circle
    .exit()
    .transition()
    .attr("r",0)
    .remove();

  svg
    .call( d3.brush()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    );

  function updateChart() {
    extent = d3.event.selection;
    circle.classed("selected", x(d.dataset["px"]), y(d.dataset["py"]) ) ;
  }
    
  function isBrushed(brush_coords, cx, cy) {
    var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
  }

   
};

var svg = d3.select("#dataviz_brushCSS").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var color = d3.scaleOrdinal().domain(["0","1"]).range([ "#fde725ff", "#21908dff"]);

// Function that is triggered when brushing is performed

// Add brushing
d3.select("#dataviz_brushCSS")
  //funciona para cambiar el modo que se despliega la sombra de lo seleccionado puede ser : brushX o brushY y se puede combinar con zoom 
  //https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
  .call( d3.brush()                 // Add the brush feature using the d3.brush function
    .extent( [ [0,0], [300,400] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
  )

var myCircle = d3.select("#dataviz_brushCSS")
  .append("svg")
  .append("circle")
    .attr("cx", 250)
    .attr("cy", 150)
    .attr("r", 40)
    .attr("fill", "#69a3b2")



function updateChart() {

  // Obtiene las coordenadas de la seleccion
  extent = d3.event.selection   // de la forma: [ [12,11], [132,178]]

  // Is the circle in the selection?
  isBrushed = extent[0][0] <= myCircle.attr("cx") && extent[1][0] >= myCircle.attr("cx") && // Check X coordinate
              extent[0][1] <= myCircle.attr("cy") && extent[1][1] >= myCircle.attr("cy")  // And Y coordinate

  myCircle.classed("selected", isBrushed);
}

