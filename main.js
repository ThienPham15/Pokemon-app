const content = document.querySelector('.pokeList');
const searchText = document.querySelector('#searchBox').value; 

let pokeData = []

async function fetchData() {await
    fetch('https://pokeapi.co/api/v2/pokemon?limit=121&offset=0')
    .then(res => res.json()) //res as a variable named as res, could be respond
    .then(data => {
        const fetches = data.results.map(item => {
            return fetch(item.url)
            .then(res => res.json())
            .then(data => {
                return {
                    id: data.id,
                    name: data.name,
                    img: data.sprites.other['official-artwork'].front_default,
                    types: data.types,
                    weight: data.weight,
                    height: data.height,
                };
            });
        });
    Promise.all(fetches) //using when there is multiple fetches, fetch everything in order
    .then(res => {
        pokeData = res;
        pokeCards();
    });
    });
};

/*A function adds things to html page*/
function pokeCards(){
    //map is a method to loop through each element in array and do sth(by function) with each element
    const cards = pokeData.map(pokemon => {
        console.log(pokemon.types);
        return `<div class="pokeBox">
        <div class="img"><img src=${pokemon.img}></div>
        <div class="pokeName">${pokemon.name}</div>
        <div class="pokeTypes">
        ${pokemon.types.map((type) => getType(type)).join('')}
        </div>
        <div class=pokeDimensions>
        <p>weight: ${pokemon.weight}</p>
        <p>height: ${pokemon.height}</p>
        </div>
        <div class="pokeRank">#${pokemon.id}</div>
        </div>`
    })
    
    content.innerHTML = cards 
}
    

function getType(type) {
    return `<p>${type.type.name}</p>`
}

fetchData(); 