const pokemonItemOnClick = (event) => {
  var elements = document.getElementsByClassName("pokemon-item");
  Array.from(elements).forEach(function (element) {
    element.classList.remove("selected");
  });
  event.target.classList.add("selected");
  const url = event.target.getAttribute("data-url");
  getPokemonDetail(url);
};

const getPokemonDetail = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const pokemonImage = document.querySelector("#pokemon-image");
      pokemonImage.setAttribute("src", data.sprites.front_default);
    });
};

const getAllPokemons = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=964")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const pokemons = data.results;
      const pokemonList = document.querySelector(".pokemon-list");
      pokemonList.innerHTML = "";
      for (const pokemon of pokemons) {
        const pokemonItem = document.createElement("p");
        pokemonItem.setAttribute("class", "pokemon-item");
        pokemonItem.setAttribute("data-url", pokemon.url);
        pokemonItem.innerHTML = pokemon.name;
        pokemonItem.addEventListener("click", pokemonItemOnClick);
        pokemonList.appendChild(pokemonItem);
      }
    })
    .catch(console.log);
};

document.addEventListener("DOMContentLoaded", () => {
  getAllPokemons();
});
