// Atividades de recuperação de notas por ausencia em aula oo vivo
// Questão 1  
const array = [ 1 ,'2' ,'3' , 4 , 5 ];
function f2(){
    return array.filter(
        item => typeof 
        item === 'string'
    );
}
const q1 = f2();
console.log('Questão 1 >>>>> ', q1);



// Questão 2
function example(n1, n2 = 20){
    return n1 + n2 / 4;
}
const q2 = example(10);
console.log('Questão 2 >>>>> ', q2);



// Questão 3
const array2 = [ 1, 2, 3, 4, 5, 6 ];
function f3(){
    return array2
        .map(item => item * 2)
        .filter(item => item % 3 ===0)
        .reduce((accumulator, current) =>
        accumulator + current, 0);
}
const q3 = f3();
console.log('Questão 3 >>>>> ', q3);



// Questão 4
const obj = {
    id: 1,
    name: 'Sabrina',
    instrument: 'Drums',
    age: 67,
    band: 'Rush'
}
const id = obj.id;
const name = obj.name;
const instrument = obj.instrument;
const age = obj.age;
const band = obj.band;
console.log('Questão 4 >>>>> ', obj);


// Questão 5
const array3 = [ 1, 2, 3, 4, 5, 6 , 7, 8];
function f5(){
    return [...array3, 9, 10];
}
const q5 = f5();
console.log('Questão 5 >>>>> ', q5);



// Questão 6
const array4 = [ 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10 ];
function f1(){
    return array4.map(
        item => item ** 2
    );
}
const q6 = f1();
console.log('Questão 6 >>>>> ', q6);


// Questão 7
function p4(){
    let interval = null;
    let i = 0;
    let arr = [];
    interval = setInterval(() => {
        arr.push(i++);

        if ( i === 5 ){
            clearInterval(interval);
            console.log(arr);
        }
    }, 1000);
}
console.log('Questão 7 >>>>> ', p4());

