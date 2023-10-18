// SAVE REFERENCE TO THE DOM ELEMENTS WE WILL USE
const body = document.querySelector('body');
const pokemonsList = document.getElementById('pokemon-list');

console.log('PROMISE EXAMPLE');

// API DOCS - https://pokeapi.co/
const loadPokemons = () => {
  // CREATE A FETCH GET REQUEST
  fetch('https://pokeapi.co/api/v2/pokemon/?limit=100') // Asynchronous operation - must be awaited
    .then(response => {
      console.log('response', response);

      // PARSE THE RESPONSE BODY
      const parsedData = response.json(); // Asynchronous operation - must be awaited
      return parsedData;
    })
    .then(data => {
      console.log('DATA  ', data);

      // ITERATE OVER JSON DATA AND CREATE A LIST
      data.results.forEach((pokemon, i) => {
        const listItem = document.createElement('li');
        const name = document.createTextNode(`${i + 1} - ${pokemon.name}`);

        listItem.appendChild(name);
        pokemonsList.appendChild(listItem);

        // ADD "ON CLICK" EVENT LISTENER TO RENDER SELECTED POKEMON
        listItem.addEventListener('click', event => {
          selectPokemon(event.target);
        });
      });
    })
    .catch(error => {
      console.error('Error fetching the Pokemons', error);
    });
};

const selectPokemon = listItem => {
  const pokemonIndex = Number.parseInt(listItem.innerHTML);
  const imageOfSelected = document.getElementById('selected-image');
  let nameOfSelected = document.getElementById('name');

  nameOfSelected.innerHTML = listItem.innerHTML.toUpperCase();
  nameOfSelected.style.visibility = 'visible';
  imageOfSelected.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
};

loadPokemons();