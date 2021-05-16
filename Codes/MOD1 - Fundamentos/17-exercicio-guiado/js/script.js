// Estado da aplicação - ( state )
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load', () => {
    tabCountries = document.querySelector('#tabCountries');
    tabFavorites = document.querySelector('#tabFavorites');

    countCountries = document.querySelector('#countCountries');
    countFavorites = document.querySelector('#countFavorites');

    totalPopulationList = document.querySelector('#totalPopulationList');
    totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

    numberFormat = Intl.NumberFormat('pt-BR');

    fetchCountries();
})

/* Sem usar async/await
function fetchCountries() {
    // console.log('fetching ...')
    const service = fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(json => { 
            allCountries = json;
            console.log(allCountries)
        });
}
*/
async function fetchCountries() {
    // console.log('fetching ...')
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    // allCountries = json;
    allCountries = json.map(country => {

        const { numericCode, translations, population, flag } = country;

        return {
            id: numericCode,
            name: translations.pt,
            population,
            formattedPopulation: formatNumber(population),
            flag
        }
    })
    // console.log(allCountries);
    // favoriteCountries = allCountries;
    render();
}

function render() {
    // console.log('rendering');
    renderCountryList();
    renderFavorites();
    renderSummary();
    renderCountryButtons();
    handleCountryButtons();
};

function renderCountryList() {
    // console.log('rendering');
    let countriesHTML = "<div>";

    allCountries.forEach(country => {
        const { name, flag, id, population, formattedPopulation } = country;

        const countryHTML = `
        <div class='country'>
            <a id="${id}" class="waves-effect waves-ligth btn">+</a>
        <div>
            <img src="${flag}" alt="${name}">
        </div>
        <div>
            <ul>
                <li>${name}</li>
                <li>${formattedPopulation}</li>
            </ul>
        </div>
        </div>

        `;
        countriesHTML += countryHTML;
    });
    // countriesHTML += '</div>';
    tabCountries.innerHTML = countriesHTML;
}

function renderFavorites() {
    let favoritesHTML = '<div>';
  
    favoriteCountries.forEach(country => {
      const { name, flag, id, population, formattedPopulation } = country;
  
      const favoriteCountryHTML = `
        <div class='country'>
          <div>
            <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
          </div>
          <div>
            <img src="${flag}" alt="${name}">
          </div>
          <div>
            <ul>
              <li>${name}</li>
              <li>${formattedPopulation}</li>
            </ul>
          </div>
        </div>  
      `;
  
      favoritesHTML += favoriteCountryHTML;
    });
  
    favoritesHTML += '</div>';
    tabFavorites.innerHTML = favoritesHTML;
  }
  
function renderSummary() {
    countCountries.textContent = allCountries.length;
    countFavorites.textContent = favoriteCountries.length;

    const totalPopulation = allCountries.reduce((accumulator, current) => {
        return accumulator + current.population;
    }, 0);
    
    const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
        return accumulator + current.population;
    }, 0);

    totalPopulationList.textContent = formatNumber(totalPopulation) ;
    totalPopulationFavorites.textContent = formatNumber(totalFavorites) ;

    // totalPopulationList.textContent = totalPopulation ;
    // totalPopulationFavorites.textContent = totalFavorites ;
    // console.log();
}

function handleCountryButtons(){
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
    const favoritesButtons = Array.from(tabFavorites.querySelectorAll('.btn'));
    // console.log(countryButtons);

    countryButtons.forEach(button => {
        button.addEventListener('click', () => addToFavorites(button.id));
    });
    favoritesButtons.forEach(button => {
        button.addEventListener('click', () => removeFromFavorites(button.id));
    });
    
}


function addToFavorites(id){
    const countryToAdd = allCountries.find( button => button.id === id);
    // console.log(countryToAdd);

    favoriteCountries = [...favoriteCountries, countryToAdd];
    favoriteCountries.sort((a, b) => {
        // Ordena ordem alfabética crescente
        return a.name.localeCompare(b.name);
        // Ordena ordem alfabética decrescente
        // return b.name.localeCompare(a.name);

    });
    // console.log(favoriteCountries);

    allCountries = allCountries.filter(country => country.id !== id);
    // console.log(favoriteCountries.length);
    // console.log(allCountries.length);
    render();
}

function removeFromFavorites(id){
    const countryToRemove = favoriteCountries.find( button => button.id === id);
    // console.log(countryToAdd);

    allCountries = [...allCountries, countryToRemove];
    allCountries.sort((a, b) => {
        // Ordena ordem alfabética crescente
        return a.name.localeCompare(b.name);
        // Ordena ordem alfabética decrescente
        // return b.name.localeCompare(a.name);

    });
    // console.log(favoriteCountries);

    favoriteCountries = favoriteCountries.filter(country => country.id !== id);
    // console.log(favoriteCountries.length);
    // console.log(allCountries.length);
    render();
}

function formatNumber(number){
    return numberFormat.format(number);
}




function renderCountryButtons() {
    // console.log('rendering');

};

/**
 * Pausado na aula 17.4
 * Verificar porque não atualiza texto
 */