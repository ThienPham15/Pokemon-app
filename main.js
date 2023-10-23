const content = document.querySelector('.pokeList');
const searchText = document.querySelector('#searchBox').value; 
const genBtn = document.querySelectorAll('.genBtn'); 
const pokeNum = document.querySelector('#pokeNum');
const searchBox = document.querySelector('#searchBox');
const toTopBtn = document.querySelector(".toTopContainer");

let pokeData = []

/* async function fetchData() {await
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
 */

/* Fetching data of Poke generation */
async function fetchGeneration(genNumber) {await 
    fetch(`https://pokeapi.co/api/v2/generation/${genNumber}/`)
    .then(res => res.json())
    .then((data) => {
        const fetches = data.pokemon_species.map(specie => {
            //show number of pokemon in each generation 
            pokeNum.textContent = `There are ${data.pokemon_species.length} species in group ${IntToRoman(genNumber)}`;
            return fetch(`https://pokeapi.co/api/v2/pokemon/${specie.name}/`)

            .then(response => {
                  if (response.ok) {
                    return response.json()
                  } else if(response.status === 404) {
                    return Promise.reject('error 404')
                  } else {
                    return Promise.reject('some other error: ' + response.status)
                  }
            })
            .then(data => {
                // console.log(data);
                return {
                    id: data.id,
                    name: data.name,
                    img: data.sprites.other['official-artwork'].front_default,
                    types: data.types,
                    weight: data.weight,
                    height: data.height,
                };
            })
            .catch(error => {
                return {};
            });
        });
    Promise.all(fetches) //using when there is multiple fetches, fetch everything in order
    .then(res => {
        pokeData = res;
        pokeCards(pokeData);

    });
    });
};

/*A function adds things to html page*/
function pokeCards(data){
    //map is a method to loop through each element in array and do sth(by function) with each element
    const cards = data.map(pokemon => {
        if (pokemon.types != undefined) {
            // console.log(pokemon.types);
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
        }
    })
    content.innerHTML = cards 
    searchBox.classList.add('show');

}
    
function getType(type) {
    return `<p>${type.type.name}</p>`
}

function searchPoke(input, array) {
    pokeList = []; //an array of pokemons contains search alphabet
    if (input.length <= 0) {
        pokeCards(pokeData)
    } else {
        const defined_pokemons = array.filter((pokemon) => pokemon != undefined && pokemon.name != undefined);
        filterPoke = defined_pokemons.filter((pokemon) => pokemon.name.includes(input));
        pokeCards(filterPoke);
    }   
};

function IntToRoman(int) {
    switch(int) {
        case 1:
            return 'I';
            break; 
        case 2:
            return 'II';
            break; 
        case 3:
            return 'III';
            break; 
        case 4:
            return 'IV';
            break; 
        case 5:
            return 'V';
            break; 
        case 6:
            return 'VI';
            break; 
        case 7:
            return 'VII';
            break; 
        case 8:
            return 'VIII';
            break; 
        case 9:
            return 'IX';
            break; 
    }
}

genBtn.forEach((el,i) =>{
    console.log(genBtn)
    el.addEventListener('click', () => fetchGeneration(i+1))
});

searchBox.addEventListener('input', () => searchPoke(searchBox.value, pokeData));


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    toTopBtn.style.display = "block";
  } else {
    toTopBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 0;
}

toTopBtn.addEventListener('click', topFunction);