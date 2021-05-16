window.addEventListener('load', start);

const names = ['Um', 'Dois', 'Tres', 'Quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
    inputName = document.querySelector('#inputName');
    preventFormSubmit();
    activateInput();
    render();
}

function preventFormSubmit() {

    function handleFormSubmit(event) {
        event.preventDefault();
    }
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {

    function insertName(insertData) {
        names.push(insertData);
        // render();
        // console.log(names);
    }

    function updateName(newName){
        names[currentIndex] = newName; 
    }
    function handleTyping(event) {
        // if (event.key === 'Enter' && event.target.value.trim() !== '') {
        if (event.key === 'Enter') {
        // console.log('ENTER')
        // console.log(event.target.value)
            var hasText = !!event.target.value  && event.target.value.trim() !== '' ;
            if(!hasText){
                clearInput();
                return;
            }
            if(isEditing){
                updateName(event.target.value);
            }
            else{
                insertName(event.target.value);
            }
            isEditing = false;
            clearInput();
            render();
        }
    }
    inputName.addEventListener('keyup', handleTyping)
    inputName.focus();
}

function render(){
    function createDeleteButton(index){
        function deleteName(){
            console.log('Deletadoooo!!')
            names.splice(index, 1);
            render();
        }
        const button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'X';
        button.addEventListener('click', deleteName);
        return button;
    }


    function createSpan(name, index){
        function editItem(){
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }
        const span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem)
        return span;
    }

    var divNames =  document.querySelector('#names');
    divNames.innerHTML = "";

    const ul = document.createElement('ul');

    for(let i = 0; i < names.length; i++){
        const currentName = names[i];
        
        const li = document.createElement('li');
        const button = createDeleteButton(i);
        const span = createSpan(currentName, i);

        li.appendChild(button); 
        li.appendChild(span); 
        ul.appendChild(li); 
    }
    
    divNames.appendChild(ul);
    clearInput();

}

function clearInput(){
    inputName.value = "";
    inputName.focus();
}