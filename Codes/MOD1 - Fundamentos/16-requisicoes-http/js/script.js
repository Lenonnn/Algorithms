window.addEventListener('load', function() {
  doFetch();
  doFetchAsync();

  divisionPromise(12, 6).then(result => {
    console.log(result);
  });

  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();
});

function doFetch() {
  fetch('https://api.github.com/users/Lenonnn')
    .then(res => {
      res.json().then(data => {
        showData('ShowData >>>>>>>>> ',data);
        console.log("Console.log >>>>>>>> ",data);
      });
    })
    .catch(error => {
      console.log('Erro na requisição');
    });
}

async function doFetchAsync() {
  const res = await fetch('https://api.github.com/users/Lenonnn');
  const json = await res.json();
  console.log(json);
}

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.name;
}

// Divisão de dois numeros usando promisse
function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possível dividir por 0');
    }

    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(12, 0)
    .then(result => {
      console.log(result);
    })
    .catch(errorMessage => {
      console.log('Falha na divisão ' + errorMessage);
    });
}

async function executeDivisionPromiseAsyncAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}
