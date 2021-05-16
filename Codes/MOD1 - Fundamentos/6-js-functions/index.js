function sum(a, b){
    return a + b ;
}

console.log(sum(1,5));


function compareNumbers(a, b){
    return a > b ? 1 : a < b ? -1 : 0;
}

console.log(compareNumbers(2,1));
console.log(compareNumbers(2,2));
console.log(compareNumbers(1,2));

function superSum(from, upTo){
    var sum = 0;
    for( var i = from; i <= upTo; i++){
        sum += i;
    }
    if (upTo > from){}
    return sum;
}

console.log("..." + superSum( 1, 10));
console.log("..." + superSum(9, 10));
console.log("..." + superSum(9, 10));
console.log("..." + superSum(9, 100));
console.log("..." + superSum(55, 35));