// console.log(people)
window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});


// Array map - pegar nome e email
function doMap() {
  const nameEmailArray = people.results.map(person => {
    return {
      name: person.name,
      email: person.email
    };
  });

  console.log('Array map >>>>>> ',nameEmailArray);

  return nameEmailArray;
}

// Array Filter - pegar maior de 50 anos
function doFilter() {
  const olderThan50 = people.results.filter(person => {
    return person.dob.age > 50;
  });

  console.log('Array Filter >>>>>> ',olderThan50);
}


// Array ForEach - Soma a qantidade de caracteres de um nome completo
function doForEach() {
  // pega os valores da função doMap
  const mappedPeople = doMap();

  mappedPeople.forEach(person => {
      person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });

  console.log('Array ForEach >>>>>>> ', mappedPeople);
}



// Array Reduce - Soma os valores contidos no array
function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log('Array Reduce >>>>>> ',totalAges);

  // let sumAges = 0;
  // for (let i = 0; i < people.results.length; i++) {
  //   var current = people.results[i];
  //   sumAges += current.dob.age;
  // }
  // console.log(sumAges);
}

// Array Find - Vai retornar o primeiro usuário achado de Minas Gerais
function doFind() {
  const found = people.results.find(person => {
    return person.location.state === 'Minas Gerais';
  });

  console.log('Array Find >>>>>>> ',found);
}

// Array Some - Valida e retorna true se ouver algum objeto do estado de Amazonas
function doSome() {
  const found = people.results.some(person => {
    return person.location.state === 'Amazonas';
  });

  console.log(found);
}

// Array Every - Valido se todos atendem uma regra especifica
// Nessa caso a regra é ser natural do Brasil
function doEvery() {
  const every = people.results.every(person => {
    return person.nat === 'BR';
  });

  console.log(every);
}

// Array Sort - Ordenação
function doSort() {
  
  const mappedNames = people.results
    .map(person => {
      return {
        name: person.name.first
      };
    })
    .filter(person => person.name.startsWith('A'))
    .sort((a, b) => {
      return b.name.length - a.name.length;
      // return a.name.localeCompare(b.name);
    });

  console.log(mappedNames);
}
