var button = document.getElementById("clickme");
var buttonR = document.getElementById("click_right");
var countR = 0;
var countI = 0;

button.onclick = function() {
  countI = countI + 1;
  var posXi = (Math.random()*5);
  dataset.push({"indice":0, "px": posXi, "py": (Math.random() * 9)- posXi});
  button.innerHTML = "Yellow: " + countI;
  plot(dataset,svg);
  epochs();
};

buttonR.onclick  = function (){
  countR++;
  var posXd = Math.random() * (9 - 3.5) + 3.5;
  dataset.push({"indice":1, "px": (posXd), "py": (Math.random() * (9 - 5) + 5) });
  buttonR.innerHTML = "Blue: " + countR;
  plot(dataset,svg);
  epochs();
};


const alpha = 0.0005;
const x = [0,9];
const epo = 5;
var dataset = [];
var w = [-6.5,1,1];
var y = [0,0];
var sumAprox = [0,0,0];
var z = 0 ;
var yhat = 0 ;

//DECLARAR EL MARGEN Y CON BASE EN ESO EL TAMAÑO DE LA ALTURA Y ANCHURA
var margin = {top: 10, right: 30, bottom: 30, left: 60};
var width = (660 - margin.left - margin.right);
var height = (600 - margin.top - margin.bottom);
//QUE COLOR SERA DEPENDIENDO DEL RANGO EN EL QUE ESTE 
var color = d3.scaleOrdinal().domain(["0","1"]).range(["#fde725ff", "#21908dff"]);

//Make an SVG Container
var svg = d3.select("#dataviz_brushCSS").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");




const plot = (dataset,svg) => {

  
  var py = d3.scaleLinear().domain([0, 9]).range([ height, 0]);
  svg.append("g").call(d3.axisLeft(py));
  var px = d3.scaleLinear().domain([0, 9]).range([ 0, width ]);
  svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(px));   

  const circle = svg.selectAll('circle').data(dataset);

  circle.enter().append("circle").attr("cx",function(d) {return  px(dataset[dataset.length - 1]["px"])}) // hasta el 570
    .attr("cy", function(d){return  py (dataset[dataset.length - 1]["py"]) }) // hasta el 500 
    .attr("r",8)
    .style("fill", function (d) { return color(dataset[dataset.length - 1]["indice"]) } )
    .style("opacity", 1)
  ;

  // var line = svg.append("line")
  // .attr("x1",px(6.5))
  // .attr("y1",py(0))
  // .attr("x2",px(0))
  // .attr("y2",py(6.5))
  // .attr("stroke-width", 2)
  // .attr("stroke", function(){
  //   return '#'+Math.floor(Math.random()*16777215).toString(16);});

  svg.selectAll("line").remove();
  
  var line = svg.append("line").
  attr("x1", function (d) {return px(x[0]) }).
  attr("y1", function (d) {return py(y[0]) }).
  attr("x2", function (d) {return px(x[1]) }).
  attr("y2", function (d) {return py(y[1]) }).
  attr("stroke-width", 5).
  attr("stroke", "red");

  // document.getElementById("showAnswer").innerHTML = px(x[0]);

};

function epochs(){
  var e;
  var n;
  if(dataset.length >=2){
    console.log(dataset);
      for(e = 0; e < epo; e++ ){
        for(n = 0; n < dataset.length; n++){
          sumAprox = [0,0,0];
          z = w[0] + (w[1] * ((dataset[n]).px)) + (w[2] * (dataset[n]).py);
          yhat = [ 1 / ( 1 + Math.pow(Math.E,(z * -1))) ];
          sumAprox[0] = sumAprox[0] + ( 1 * ((dataset[n]["indice"]) - yhat));
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



