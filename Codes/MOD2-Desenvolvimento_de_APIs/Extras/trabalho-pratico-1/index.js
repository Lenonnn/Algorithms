const fs = require("fs").promises;


// Leitura de arquivo
// fs.readFile("./files/Estados.json")
//     .then(data => {
//         console.log(JSON.parse(data));
//         const states = (JSON.parse(data));
// });

init();

async function init() {
    await createFiles(); // cria arquivos
    console.log(await getCitiesCount("SP")); // retorna a qtd de cidades por estado
    // await getStatesWithMoreCities();
    // await getStatesWithLessCities();
    await getStatesWithMoreOrLessCities(true); // pega os 5 estados com mais cidades
    await getStatesWithMoreOrLessCities(false); // pegas os 5 estados com menos cidades
    await getCityWithSmallerOrBiggerName(false); // pega cidade com o menor nome por estado
    await getCityWithSmallerOrBiggerName(true); // pega cidade com o maior nome por estado
    console.log(await getSmallerName('RS')); // busca cidade com menor nome
    console.log(await getBiggerName('MG')); // busca cidade com maior nome
    await getBiggerOrSmallerCityName(true); // busca o maior nome entre todas as cidades
    await getBiggerOrSmallerCityName(false); // busca o menor nome entre todas as cidades
}

async function createFiles() {
    let data = await fs.readFile("./files/Estados.json");
    const states = JSON.parse(data);

    data = await fs.readFile("./files/Cidades.json");
    const cities = JSON.parse(data);

    for (state of states) {
        const stateCities = cities.filter(city => city.Estado === state.ID);
        await fs.writeFile(`./states/${state.Sigla}.json`, JSON.stringify(stateCities));
    }

    // console.log(cities);
}

async function getCitiesCount(uf) {
    const data = await fs.readFile(`./states/${uf}.json`);
    const cities = JSON.parse(data);
    // console.log("Cidades >>>>>>", cities);
    // console.log("Cidades >>>>>>", cities.length);
    return cities.length;
}

// Pega estados com mais ou menos cidades
async function getStatesWithMoreOrLessCities(more) {
    const states = JSON.parse(await fs.readFile("./files/Estados.json"));

    const list = [];

    for (state of states) {
        const count = await getCitiesCount(state.Sigla);
        list.push({ uf: state.Sigla, count })
    }
    // Ordenação do maior para o menor
    list.sort((a, b) => {
        if (a.count < b.count) return 1;
        else if (a.count > b.count) return -1;
        else return 0;
    });

    // Pegar os 5 estados com maior numeros de cidades
    // Imprimir em array de strings
    const result = [];
    if (more) {
        list.slice(0, 5)
            .forEach(item => result.push(
                item.uf + " - " + item.count
            ));
        console.log("Mais cidades", result);
        return result;

    } else {
        list.slice(-5)
            .forEach(item => result.push(
                item.uf + " - " + item.count
            ));
        console.log("Menos cidades", result);
        return result;
    };

    // console.log(list);
}

// // Pega estados com mais cidades
// async function getStatesWithMoreCities(){
//     const states = JSON.parse(await fs.readFile("./files/Estados.json"));

//     const list = [];

//     for (state of states) {
//         const count = await getCitiesCount(state.Sigla);
//         list.push({uf: state.Sigla, count})
//     }
//     // Ordenação do maior para o menor
//     list.sort((a, b) => {
//         if (a.count < b.count) return 1;
//         else if (a.count > b.count ) return -1;
//         else return 0 ;
//     });

//     // Pegar os 5 estados com maior numeros de cidades
//     // Imprimir em array de strings
//     const result = [];
//     list.slice(0, 5)
//         .forEach(item => result.push(
//             item.uf + " - " + item.count
//     ));

//     // console.log(list);
//     console.log("Mais cidades",result);
// }

// // Pega estados com menos cidades
// async function getStatesWithLessCities(){
//     const states = JSON.parse(await fs.readFile("./files/Estados.json"));

//     const list = [];

//     for (state of states) {
//         const count = await getCitiesCount(state.Sigla);
//         list.push({uf: state.Sigla, count})
//     }
//     // Ordenação do maior para o menor
//     list.sort((a, b) => {
//         if (a.count < b.count) return -1;
//         else if (a.count > b.count ) return 1;
//         else return 0 ;
//     });

//     // Pegar os 5 estados com maior numeros de cidades
//     // Imprimir em array de strings
//     const result = [];
//     list.slice(0, 5)
//         .forEach(item => result.push(
//             item.uf + " - " + item.count
//     ));

//     // console.log(list);
//     console.log("Menos cidades", result);
// }


async function getCityWithSmallerOrBiggerName(bigger) {
    const states = JSON.parse(await fs.readFile("./files/Estados.json"));
    const result = [];
    let city;
    for(state of states){
        if(bigger){
            city = await getBiggerName(state.Sigla);
        } else {
            city = await getSmallerName(state.Sigla);
        }
        // result.push(city.Nome + " - " + state.Sigla + " - TAM: " + city.Nome.length);
        result.push(city.Nome + " - " + state.Sigla);
    }
    console.log(result);

}

async function getBiggerName(uf) {
    const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`));

    let result;
    cities.forEach(city => {
        if (!result){
            result = city;
        }
        else if (city.Nome.length > result.Nome.length) {
            result = city;
        }
        else if((city.Nome.length === result.Nome.length) &&
                (city.Nome.toLowerCase() < result.Nome.toLowerCase())){
            result = city;
        };
    });
    return result;
}


async function getSmallerName(uf) {
    const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`));

    let result;
    cities.forEach(city => {
        if (!result){
            result = city;
        }
        else if (city.Nome.length < result.Nome.length) {
            result = city;
        }
        else if((city.Nome.length === result.Nome.length) &&
                (city.Nome.toLowerCase() < result.Nome.toLowerCase())){
            result = city;
        };
    });
    return result;
}

async function getBiggerOrSmallerCityName(bigger){
    const states = JSON.parse(await fs.readFile("./files/Estados.json"));
    let list = [];
    for(state of states){
        let city;
        if(bigger){
            city = await getBiggerName(state.Sigla);
        } else {
            city = await getSmallerName(state.Sigla);

        }
        list.push({name: city.Nome, uf: state.Sigla});
    }
    // console.log(list);
    const result = list.reduce((prev, curr) => {
        if(bigger){
            if (prev.name.length > curr.name.length){
                return prev;
            }
            else if(prev.name.length < curr.name.length){
                return curr;
            }
            else {
                return prev.name.toLowerCase( ) < curr.name.toLowerCase( ) ? prev : curr;
            }
        } else {
            if (prev.name.length < curr.name.length){
                return prev;
            }
            else if(prev.name.length > curr.name.length){
                return curr;
            }
            else {
                return prev.name.toLowerCase( ) < curr.name.toLowerCase( ) ? prev : curr;
            }
        }
    });
    console.log(result.name + " - " + result.uf);
}