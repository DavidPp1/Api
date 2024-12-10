const API_ALBUM = "https://rickandmortyapi.com/api/character";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.results);
            pagination(json.info);
        })
        .catch((error) => {
            console.log(error, "consumiendo la API");
        });
}

function fillData(results) {
    let cards = "";
    for (let i = 0; i < results.length; i++) { // Usa results.length para evitar errores
        cards += `
            <div class="col">
                <div class="card h-100" style="width: 12rem;">
                    <img src="${results[i].image}" class="card-img-top" alt="img-personaje">
                    <div class="card-body">
                        <h2 class="card-title">${results[i].name}</h2>
                        <h5 class="card-title">Status: ${results[i].status}</h5>
                        <h5 class="card-title">Species: ${results[i].species}</h5>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById("dataAlbum").innerHTML = cards;
}

function pagination(info) {
    let prevDisabled = info.prev ? "" : "disabled";
    let nextDisabled = info.next ? "" : "disabled";

    let html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="getAlbum('${info.prev}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="getAlbum('${info.next}')">Next</a>
        </li>`;
    document.getElementById("pagination").innerHTML = html;
}

getAlbum(API_ALBUM);
// Llamada inicial



