const pokemonList = document.querySelector(".pokemon-list");

const fetchPokemon = async () => {
  try {
    // 1. Fetch list of first 151 Pokémon
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    // Parse JSON response into JS object
    const parsedPokemon = await response.json();

    // 2. Loop through each Pokémon
    for (const pokemon of parsedPokemon.results) {
      // Create <div> element for current Pokémon
      const pokemonContainer = document.createElement("div");
      pokemonContainer.classList.add("pokemon-container");

      // Create <p> for current Pokémons name
      const pokemonName = document.createElement("p");
      pokemonName.classList.add("pokemon-name");
      pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

      // Fetch detailed data for current Pokémon
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();

      // Create <img> element for current Pokémon
      const pokemonArtwork = document.createElement("img");
      pokemonArtwork.classList.add("pokemon-img")
      pokemonArtwork.src = pokemonData.sprites.other["official-artwork"].front_default;

      // Create <div> element to hold current Pokémons stats
      const statsContainer = document.createElement("div");
      for (const statistic of pokemonData.stats) {
        const statElement = document.createElement("p");
        statElement.classList.add("stat-element");
        const statName = document.createElement("span");
        statName.classList.add("stat-name");
        const baseStat = document.createElement("span");

        statName.textContent = `${statistic.stat.name}:`;
        baseStat.textContent = statistic.base_stat;
        statElement.appendChild(statName);
        statElement.appendChild(baseStat);

        
        statsContainer.appendChild(statElement); // Add stat to stats container
      }



      // Append name, stats and img to the Pokémon element
      pokemonContainer.appendChild(pokemonArtwork);
      pokemonContainer.appendChild(pokemonName);
      pokemonContainer.appendChild(statsContainer);

      // Append complete Pokémon element to the main pokemon list.
      pokemonList.appendChild(pokemonContainer);
    }
  } catch (error) {
    console.error("Failed to fetch Pokémon", error);
  }
};


fetchPokemon();

/*
// --- "THEN" VERSION --- 

const pokemonList = document.querySelector(".pokemon-list");
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")n((response) => {
  response.json()n((parsedPokemon) => {
    console.log("Parsed data:", parsedPokemon);

    for (const pokemon of parsedPokemon.results) {
      const pokemonContainer = document.createElement("div");
      pokemonContainer.classList.add("pokemon");

      const pokemonName = document.createElement("p");
      pokemonName.textContent = pokemon.name;

      const pokemonId = document.createElement("p");

      fetch(pokemon.url)n((response) => {
        response.json()n((parsedPokemonUrl) => {
          pokemonId.textContent = `Pokémon ID: ${parsedPokemonUrl.id}`;
        });
      });

      pokemonContainer.appendChild(pokemonName);
      pokemonContainer.appendChild(pokemonId);
      pokemonList.appendChild(pokemonContainer);
    }
  });
});

*/




// species.official-artwork.front_default