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

var margin = {top: 10, right: 30, bottom: 30, left: 60};
var width = (660 - margin.left - margin.right);
var height = (600 - margin.top - margin.bottom);
var color = d3.scaleOrdinal().domain(["0","1"]).range(["#fde725ff", "#21908dff"]);
var svg = d3.select("#dataviz_brushCSS").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
//var myCircle = d3.select("#dataviz_brushCSS").append("svg").append("circle").attr("cx", 250).attr("cy", 150).attr("r", 40).attr("fill", "#69a3b2")
//Make an SVG Container

const plot = (dataset,svg) => {

  var py = d3.scaleLinear().domain([0, 9]).range([ height, 0]);
  
  svg.append("g").call(d3.axisLeft(py));

  var px = d3.scaleLinear().domain([0, 9]).range([ 0, width ]);

  svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(px));   

  const circle = svg.selectAll('circle').data(dataset);
  
  circle.enter().append("circle").attr("cx",function(d) {return  px(dataset[dataset.length - 1]["px"])}) // hasta el 500
    .attr("cy", function(d){return  py (dataset[dataset.length - 1]["py"]) }) // hasta el 500 
    .attr("r",8)
    .style("fill", function (d) { return color(dataset[dataset.length - 1]["indice"]) } )
    .style("opacity", 1)
  ;
  
  if(dataset.length >=2){

    svg.selectAll("line").remove();

    var line = svg.append("line").
      attr("x1", function (d) {return px(x[0]) }).
      attr("y1", function (d) {return py(y[0]) }).
      attr("x2", function (d) {return px(x[1]) }).
      attr("y2", function (d) {return py(y[1]) }).
      attr("stroke-width", 2).
      attr("stroke", "black")
    ;
  }
  
  
};



