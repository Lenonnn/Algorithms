window.addEventListener('load', start);

function start(){
    console.log('Aul 04');
    console.log('Página totalmente carregada');

    var dataInput = document.querySelector('#nameInput');
    dataInput.addEventListener('keyup', countName);

    var form = document.querySelector('form');
    form.addEventListener('submit', preventSubmit);
}


function countName(event){
    var counter = event.target.value;
    var span = document.querySelector('#nameLength');
    span.textContent = counter.length;
}

function preventSubmit(event){
   event.preventDefault();

   var nameInput = document.querySelector('#nameInput');
   alert(nameInput.value + ' cadastrado com sucesso !');
  
}