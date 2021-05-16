window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});


// Spred - Concatenar dois elementos 
// Vai juntar as duas seleções e colocar num novo array
function doSpread() {
  const marriedMen = people.results.filter(
    person => person.name.title === 'Mr'
  );

  const marriedWomen = people.results.filter(
    person => person.name.title === 'Ms'
  );

  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'Oi' }];

  console.log( 'Spread >>>>>>>> ',marriedPeople);
}

// O Rest Agrupa os dados - Cria um "vetor"
function doRest() {
  console.log('Sum 1 >>>>> ',infiniteSum(1, 2));
  console.log('Sum 2 >>>>> ',infiniteSum(1, 2, 1000));
  console.log('Sum 3 >>>>> ',infiniteSum(1, 2, 1000, 1, 2, 3, 4, 34, 34, 34, 34, 2, 23));
}

function infiniteSum(...numbers) {
  // acc - acumulator 
  // curr - current
  return numbers.reduce((acc, curr) => acc + curr, 0);
}



function doDestructuring() {
  // Escolhe um elemento do array
  const first = people.results[0];

  // Modo "clássico" - pode ser Repetitivo
  // const username = first.login.username;
  // const password = first.login.password;

  // Usando destructuring
  const { username, password } = first.login;
  // Acessa e imprime os valores desetruturados
  console.log('Username >>>>>> ',username);
  console.log('Password >>>>>> ',password);
}
