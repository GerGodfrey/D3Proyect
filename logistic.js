w1 = 2;
w2 = 1;
w0 = -1 ;
w = [-1,2,1];
sig = 0.1;

function prube(){
    // for (let n = 0; n < dataset.length; n++) {
    //     for (let i = 0; i < 2; i++) {
    //         w[i] = w[i] +
    //             (sig * (dataset[n]['indice'] -
    //                 [-1 * (1 / ( 1 + Math.exp(w[0] + (w[1]*dataset[n]['px']) + (w[2]*dataset[n]['py']))))])
    //             ) 
    //         ;
    //         document.getElementById("showAnswer").innerHTML = w[0];
    //         document.getElementById("showAnswer1").innerHTML = w[1];
    //         document.getElementById("showAnswer2").innerHTML = w[2];
    //     }
    // }
    for (let i = 0; i <= 2; i++) {
        for (let n = 0; n < dataset.length; n++) {
            sumAprox = (dataset[n]['indice'] - [1 / ( 1 + Math.exp( - (w[0] + (w[1]*dataset[n]['px']) + (w[2]*dataset[n]['py'])) ))]);
        }
        w[i] = w[i] + sig * sumAprox
    }
    document.getElementById("showAnswer").innerHTML = w[0];
    document.getElementById("showAnswer1").innerHTML = w[1];
    document.getElementById("showAnswer2").innerHTML = w[2];
}