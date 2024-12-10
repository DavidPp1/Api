const API_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=100";

function fetchPokemon(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            displayPokemon(json.results);
            handlePokemonPagination(json);
        })
        .catch((error) => {
            console.error("Error al consumir la PokeAPI:", error);
        });
}

function displayPokemon(results) {
    let cards = "";
    results.forEach((pokemon) => {
        fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonData) => {
                const stats = pokemonData.stats
                    .map((stat) => `<p>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</p>`)
                    .join("");

                cards += `
                    <div class="col">
                        <div class="card h-100" style="width: 12rem;">
                            <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
                            <div class="card-body">
                                <h5 class="card-title">${pokemonData.name.toUpperCase()}</h5>
                                <p class="card-text">Species: ${pokemonData.species.name}</p>
                                ${stats} 
                            </div>
                        </div>
                    </div>`;
                document.getElementById("dataAlbum").innerHTML = cards;
            })
            .catch((error) => console.error("Error al obtener datos del Pokémon:", error));
    });
}

function handlePokemonPagination(info) {
    const prevDisabled = info.previous ? "" : "disabled";
    const nextDisabled = info.next ? "" : "disabled";

    const paginationHTML = `
        <li class="page-item ${prevDisabled}">
            <button class="page-link" onclick="fetchPokemon('${info.previous}')">Prev</button>
        </li>
        <li class="page-item ${nextDisabled}">
            <button class="page-link" onclick="fetchPokemon('${info.next}')">Next</button>
        </li>`;
    document.getElementById("pagination").innerHTML = paginationHTML;
}

// Llamada inicial para la PokeAPI
fetchPokemon(API_POKEMON);
