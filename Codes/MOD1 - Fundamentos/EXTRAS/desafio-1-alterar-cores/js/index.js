const quadro = document.getElementById("quadro");

let corR = 0;
let corG = 0;
let corB = 0;


onHandleBoxColor();

function onHandleBoxColor() {
    corR = document.getElementById("red").value;
    corG = document.getElementById("green").value;
    corB = document.getElementById("blue").value;

    quadro.style.backgroundColor = `rgb(${corR},${corG},${corB})`;
};

