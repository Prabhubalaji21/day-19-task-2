const body = document.querySelector('body');
const pokemonsList = document.getElementById('pokemon-list');

// API DOCS - https://pokeapi.co/

console.log('WRONG - ASYNC AWAIT EXAMPLE');

const loadPokemons = async () => {
  let data;

  try {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100'); // Asynchronous operation - must be awaited

    console.log('response', response);
    data = await response.json(); // Asynchronous operation - must be awaited
  } catch (error) {
    console.error('Error fetching the Pokemons', error);
  }

  return data; // WRONG APPROACH - Async function always returns a pending promise by default
};


const selectPokemon = listItem => {
  const pokemonIndex = Number.parseInt(listItem.innerHTML);
  let nameOfSelected = document.getElementById('name');
  const imageOfSelected = document.getElementById('selected-image');

  nameOfSelected.innerHTML = listItem.innerHTML.toUpperCase();
  nameOfSelected.style.visibility = 'visible';
  nameOfSelected.style.display = 'visible';
  imageOfSelected.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
};


let pokemons = loadPokemons();
console.log('POKEMONS ???', pokemons); //  Promise {<pending>}

pokemons.results.forEach((pokemon, index) => {
  const listItem = document.createElement('li');
  const name = document.createTextNode(`${index + 1} - ${pokemon.name}`);

  listItem.appendChild(name);
  pokemonsList.appendChild(listItem);

  listItem.addEventListener('click', event => {
    selectPokemon(event.target);
  });
});