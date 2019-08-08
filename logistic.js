///////////////////////77

alpha = 0.3;
w = [0,1,1];
y = [0,0];
x = [0,9];
sumAprox = [0,0,0];
z = 0 ;

function prube(){
    
    for(let n = 0; n < dataset.length; n++){
        
        z = w[0] + (w[1] * dataset[n]["px"]) + (w[2] * dataset[n]["py"]);
        yhat = [ 1 / ( 1 + Math.pow(Math.E,-z)) ];
        err = - ( dataset[n]["py"] * Math.log(yhat) + (1- (dataset[n]["indice"]) ) * Math.log(1 - yhat) ) ;

        sumAprox[0] = sumAprox[0] + ( 1 * ((dataset[n]["indice"]) - yhat));
        sumAprox[1] = sumAprox[1] + (dataset[n]["px"] * ((dataset[n]["indice"]) - yhat));
        sumAprox[2] = sumAprox[2] + (dataset[n]["py"] * ((dataset[n]["indice"]) - yhat));
    }
    w[0] = w[0] + (alpha * sumAprox[0]);
    w[1] = w[1] + (alpha * sumAprox[1]);
    w[2] = w[2] + (alpha * sumAprox[2]);

    y[0] = ( (x[0] * w[1]) + w[0]) * ( -1 / w[2]);
    y[1] = ( (x[1] * w[1]) + w[0]) * ( -1 / w[2]);
      
    
    document.getElementById("showAnswer1").innerHTML = err;
}