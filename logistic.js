w = [-1,2,1];
sig = 0.1;
numx = 0;
y= [0,0];
sumAprox = 0;
function prube(){
    
    if(dataset.length >= 2){
        for (let i = 0; i <= 2; i++) {
            for (let n = 0; n < dataset.length; n++) {
                if(i == 0){
                    sumAprox = sumAprox + ( dataset[n]['indice'] - [ 1 / ( 1 + Math.exp( - ( (w[1]*dataset[n]['px']) + (w[2]*dataset[n]['py'])+ w[0] ) )) ] );
                }else if(i == 1){
                    sumAprox = sumAprox + ( dataset[n]['indice'] - [ 1 / ( 1 + Math.exp( - ( (w[1]*dataset[n]['px']) + (w[2]*dataset[n]['py'])+ w[0] ) )) ] ) * dataset[n]['px'];   
                }else{
                    sumAprox = sumAprox + ( dataset[n]['indice'] - [ 1 / ( 1 + Math.exp( - ( (w[1]*dataset[n]['px']) + (w[2]*dataset[n]['py'])+ w[0] ) )) ] ) * dataset[n]['py'];
                }
            }
            
            w[i] = w[i] + (sig * sumAprox) ;
        }
        numx = numx +1;
        y[0] = (-1/w[2]) * ( (w[1]* dataset[0]["px"]) +w[0]);
        y[1]= (-1/w[2])* ( (w[1]*dataset[dataset.length-1]["px"])+ w[0]);
    }    
    document.getElementById("showAnswer").innerHTML = y[0];
    document.getElementById("showAnswer1").innerHTML = dataset[0]["px"];
    document.getElementById("showAnswer2").innerHTML = y[1];
    document.getElementById("showAnswer3").innerHTML = dataset[dataset.length-1]["px"];
}

// function prube(){
//     if(dataset.length >= 2){
//         for (let i = 0; i <= 2; i++) {
//             for (let n = 0; n < dataset.length; n++) {
//                 sumAprox = (dataset[n]['indice'] - [1 / ( 1 + Math.exp( - (w[0] + (w[1]*dataset[n]['px']) + (w[2]*dataset[n]['py'])) ))]);
//             }
//             w[i] = w[i] + sig * sumAprox
//         }
//         y[0] = (-1/w[2])* (w[1]*dataset[numx-1]["px"] +w[0]);
//         y[1]= (-1/w[2])* (w[1]*dataset[numx]["px"]+w[0]);
//         numx=numx+1;
//     }
    
//     document.getElementById("showAnswer1").innerHTML = dataset[dataset.length-2]["px"];
//     document.getElementById("showAnswer2").innerHTML = y[0];
//     document.getElementById("showAnswer").innerHTML = dataset[dataset.length-1]["px"];
//     document.getElementById("showAnswer3").innerHTML = y[1];
// }