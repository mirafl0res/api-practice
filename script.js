const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";
const pokemonList = document.querySelector(".pokemon-list");

const fetchPokemons = async () => {
  try {
    const response = await fetch(API_URL);
    const parsedData = await response.json();
    console.log(parsedData);

    const pokemons = parsedData.results;
    return pokemons;
  } catch (error) {
    console.error("Failed to fetch Pokémon", error);
  }
};

const displayPokemons = async () => {
  try {
    const pokemons = await fetchPokemons();

    for (const pokemon of pokemons) {
      const response = await fetch(pokemon.url);
      const pokemonInfo = await response.json();
      const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      const pokemonImg = pokemonInfo.sprites.other["official-artwork"].front_default;
      const pokemonStats = pokemonInfo.stats;

    
      const pokemonContainer = document.createElement("div");
      pokemonContainer.classList.add("pokemon-container");
      
      
      const imgElement = document.createElement("img");
      imgElement.classList.add("img-element");
      imgElement.src = pokemonImg;
      imgElement.alt = `Artwork depicting the pokémon ${pokemonName}`;
      imgElement.title = `Artwork depicting the pokémon ${pokemonName}`;
      
      const nameElement = document.createElement("p");
      nameElement.classList.add("name-element");
      nameElement.textContent = pokemonName;
      
      const statsContainer = document.createElement("div");
      statsContainer.classList.add("stats-container");
      
      const pokemonType = pokemonInfo.types;
      const typeElement = document.createElement("p");
      typeElement.classList.add("type-element")
      
      for (const t of pokemonType) {
        const typeName = t.type.name;
        const typeInfo = t.type.url;
        const typeNameElement = document.createElement("span");
        typeNameElement.textContent = typeName;
        typeElement.appendChild(typeNameElement);
      }

      statsContainer.appendChild(typeElement);

      /*
            for (const t of pokemonType) {
        const typeName = t.type.name;
        const typeInfo = t.type.url;
        const typeNameElement = document.createElement("span");
        const typeInfoElement = document.createElement("span");

        typeNameElement.textContent = typeName;
        typeInfoElement.textContent = typeInfo;

        typeElement.appendChild(typeNameElement);
      }


      */




      
      for (const stat of pokemonStats) {
        const statElement = document.createElement("p");
        statElement.classList.add("stat-element");

        const statNameElement = document.createElement("span");
        statNameElement.classList.add("stat-name-element");
        const statName = stat.stat.name;
        statNameElement.textContent =
          statName.charAt(0).toUpperCase() + statName.slice(1);

        const baseStatElement = document.createElement("span");
        baseStatElement.classList.add("base-stat-element");
        const baseStat = stat.base_stat;
        baseStatElement.textContent = baseStat;

        statElement.appendChild(statNameElement);
        statElement.appendChild(baseStatElement);
        statsContainer.appendChild(statElement);
      }

      

      pokemonContainer.appendChild(imgElement);
      pokemonContainer.appendChild(nameElement);
      pokemonContainer.appendChild(statsContainer);
      pokemonList.appendChild(pokemonContainer);
    }
  } catch (error) {
    console.error("Failed to display Pokémon", error);
  }
};

displayPokemons();