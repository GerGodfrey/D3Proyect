var button = document.getElementById("clickme");
var buttonB = document.getElementById("click_right");
var countB = 0;
var countY = 0;

const alpha = 0.0005;
const x = [0,9];
const epo = 2;
var dataset = [];
var w = [-6.5,1,1];
var y = [0,0];
var sumAprox = [0,0,0];
var z = 0 ;
var yhat = 0 ;

//DECLARAR EL MARGEN Y CON BASE EN ESO EL TAMAÑO DE LA ALTURA Y ANCHURA
var margin = {top: 10, right: 30, bottom: 30, left: 60};
var width = (600 - margin.left - margin.right); //510
var height = (600 - margin.top - margin.bottom); //560
//QUE COLOR SERA DEPENDIENDO DEL RANGO EN EL QUE ESTE 
var color = d3.scaleOrdinal().domain(["0","1"]).range(["#fde725ff", "#21908dff"]);

//Make an SVG Container
var svg = d3.select("#container")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 600 600")
  //.attr("width", 600 ) //width + margin.left + margin.right
  //.attr("height", 600) //height + margin.top + margin.bottom
  .classed("svg-content", true)
  .append("g")
  .attr("transform", "translate(" + 60 + ", " + margin.top + ")")
;

var xScale = d3.scaleLinear().domain([0, 9]).range([ 0, width ]);
var yScale = d3.scaleLinear().domain([0,9]).range([height,0]);

svg.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(yScale))   
;
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale))
;


d3.select("#container").on("click", function(){
  var coordenadas = d3.mouse(this);
  console.log(coordenadas[0]);
  console.log(coordenadas[1]);
  // console.log((coordenadas[0]) / (600/9));
  var pxI = (coordenadas[0]-(60)) / (510/9);
  var pyI = (589-coordenadas[1]-20) / (560/9);
  if( (pxI + pyI > 9)){
    var ind = 1
    countB++;
    buttonB.innerHTML = "Blue: " + countB;
  }else{
    var ind =0
    countY++;
    button.innerHTML = "Yellow: " + countY;
  }
  dataset.push({"indice":ind, "px": (pxI), "py": (pyI) });
  plot(dataset,svg);
  epochs();
});


const plot = (dataset,svg) => {
  const circle = svg.selectAll('circle').data(dataset);

  circle.enter().append("circle")

    .attr("cx",function(d) {return  xScale(dataset[dataset.length - 1]["px"])}) // hasta el 570
    .attr("cy",function(d){return  yScale (dataset[dataset.length - 1]["py"]) }) // hasta el 500 
    .attr("r",8)
    .style("fill", function (d) { return color(dataset[dataset.length - 1]["indice"]) } )
    .style("fill-opacity", 1)
    .on("mouseenter",handleMouseOver)
    .on("mouseleave",handleMouseLeave)
  ;

  svg.selectAll("line").remove();

  var line = svg.append("line").
    attr("x1", function (d) {return xScale(x[0]) }).
    attr("y1", function (d) {return yScale(y[0]) }).
    attr("x2", function (d) {return xScale(x[1]) }).
    attr("y2", function (d) {return yScale(y[1]) }).
    attr("stroke-width", 2).
    attr("stroke", "black")
  ;

};

function epochs(){
  var e;
  var n;
  if(dataset.length >=2){
    for(e = 0; e < 1; e++ ){  
      for(n = 0; n < dataset.length; n++){
        // sumAprox = [0,0,0];
        z = w[0] + (w[1] * ((dataset[n]).px)) + (w[2] * (dataset[n]).py);
        yhat = [ 1 / ( 1 + Math.pow(Math.E,(z * -1))) ];
        sumAprox[0] = sumAprox[0] + ( 1 * ((dataset[n].indice) - yhat));
        sumAprox[1] = sumAprox[1] + (dataset[n].px * ((dataset[n].indice) - yhat));
        sumAprox[2] = sumAprox[2] + (dataset[n].py * ((dataset[n].indice) - yhat));
      }
      w[0] = w[0] + (alpha * sumAprox[0]);
      w[1] = w[1] + (alpha * sumAprox[1]);
      w[2] = w[2] + (alpha * sumAprox[2]);    
    }
    y[0] = ( (x[0] * w[1]) + w[0]) * ( -1 / w[2]);
    y[1] = ( (x[1] * w[1]) + w[0]) * ( -1 / w[2]);
  }
}

function handleMouseOver(d,i){

  d3.selectAll("circle")
    .style("fill-opacity", .5)
  ;
  d3.select(this)
    .transition()
      .ease(d3.easeElastic)
      .duration('500')
      .style("fill-opacity",1)
      .attr("r",16)
  ;
  svg.append("text")
    .attr("id","t" + d.x + "-" + d.y + "-" + i) 
    .attr("x",function() {return xScale(d.px) - 50})
    .attr("y",function() {return yScale(d.py) + 60})
    .attr("dy",-5)
    .text(function(){
      return ["(" + d3.format(".1f")(d.px),d3.format(".1f")(d.py) + ")"];
    });
}

function handleMouseLeave(d,i){
  d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();

  d3.select(this)
  .text("gh")
  .transition()
  .ease(d3.easeElastic)
  .duration('500')
  .attr("r",8)
  ;
  d3.selectAll("circle")
    .style("fill-opacity", 1)
  ;
}

button.onclick = function() {
  countY++;
  //VALORES ASIGNADOS DEL 0 AL 9
  var posXi = (Math.random()*5);
  var posYi = Math.abs((Math.random() * 9) - posXi) ;
  dataset.push({"indice":0, "px": posXi, "py": posYi});
  button.innerHTML = "Yellow: " + countY;
  plot(dataset,svg);
  epochs();
};

buttonB.onclick  = function (){
  countB++;
  var posXd = Math.random() * (9 - 3.5) + 3.5;
  dataset.push({"indice":1, "px": (posXd), "py": (Math.random() * (9 - 5) + 5) });
  buttonB.innerHTML = "Blue: " + countB;
  plot(dataset,svg);
  epochs();
};
