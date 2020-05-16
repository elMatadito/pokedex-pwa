var pokemons = [];

const pokemonItemOnClick = (event) => {
  var elements = document.getElementsByClassName("pokemon-item");
  Array.from(elements).forEach(function (element) {
    element.classList.remove("selected");
  });
  event.target.classList.add("selected");
  const image = document.getElementById("pokemon-image");
  image.classList.remove("loading");
  image.setAttribute("src", event.target.getAttribute("data-image"));
};

const getPokemonDetail = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });
};

const render = () => {
  const pokemonList = document.querySelector(".pokemon-list");
  pokemonList.innerHTML = "";
  for (const pokemon of pokemons) {
    const pokemonItem = document.createElement("p");
    const entry_number = ("000" + pokemon.id).slice(-3);
    pokemonItem.setAttribute("class", "pokemon-item");
    pokemonItem.setAttribute(
      "data-image",
      `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${entry_number}.png`
    );
    pokemonItem.innerHTML = `#${entry_number} ${pokemon.name}`;
    pokemonItem.addEventListener("click", pokemonItemOnClick);
    pokemonList.appendChild(pokemonItem);
    if (pokemon.id === 1) pokemonItem.click();
  }
};

const getAllPokemons = () => {
  fetch("https://pokeapi.co/api/v2/pokedex/1")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var promises = [];
      for (const pokemon of data.pokemon_entries) {
        promises.push(getPokemonDetail(pokemon.pokemon_species.url));
      }

      Promise.all(promises)
        .then((responses) => {
          pokemons = responses;
          render();
        })
        .catch(console.log);
    })
    .catch(console.log);
};

document.addEventListener("DOMContentLoaded", () => {
  getAllPokemons();
});
