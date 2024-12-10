const JIKAN_API_BASE = "https://api.jikan.moe/v4/anime?q=";

const searchButton = document.getElementById("searchButton");
const animeInput = document.getElementById("animeInput");
const animeResults = document.getElementById("animeResults");

searchButton.addEventListener("click", () => {
    const query = animeInput.value.trim();
    if (query) {
        searchAnime(query);
    } else {
        alert("Digita el nombre de un anime.");
    }
});

function searchAnime(query) {
    fetch(`${JIKAN_API_BASE}${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data.data);
        })
        .catch((error) => {
            console.error("Error al buscar el anime:", error);
        });
}

function displayResults(results) {
    animeResults.innerHTML = "";

    if (results.length === 0) {
        animeResults.innerHTML = `<p class="text-center">No se encontraron resultados.</p>`;
        return;
    }

    results.forEach((anime) => {
        const animeCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
                    <div class="card-body">
                        <h5 class="card-title">${anime.title}</h5>
                        <p class="card-text">Episodios: ${anime.episodes || "N/A"}</p>
                        <a href="${anime.url}" target="_blank" class="btn btn-primary">Más información</a>
                    </div>
                </div>
            </div>`;
        animeResults.innerHTML += animeCard;
    });
}
