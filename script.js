/* BEERER */

const COVER_URL = "https://api.themoviedb.org/3/movie/now_playing";
const SEARCH_MOVIE_URL = "https://api.themoviedb.org/3/search/movie";
const URL = COVER_URL + KEY; 
const IMG = "https://image.tmdb.org/t/p/w500";


// Creamos la plantilla con el formato de tarjeta tal y como se van a mostrar las películas
const cardTemplate = function (movie){
    return `<article class="template_movie">
                <figure>
                    <img src="${IMG + movie.poster_path}" alt="${movie.title}" class="picture_movie">
                </figure>
                <p>${movie.title}</p>
            </article>`
}

//Creamos la funcion que se cargará al iniciar la página para mostrar en portada, he elegido mostrar las películas más actuales.
async function webMovie() { // Simplemente recoge los datos de la api para pintar el DOM
    try {
        // Lanzamos la solicitud utilizando fetch() y esperamos respuesta
        //const response = await fetch(URL);
        const response = await fetch("./movies.json");
        // Verificamos que la respuesta es correcta, es una buena práctica y pide de comer
        if (!response.ok) {
            console.error("Houston, la respuesta no ha sido del todo correcta");
        }
        const data = await response.json();
        // Ya tenemos nuestros datos listos para procesar
        // Sólo necesito "results", que es un array de objetos con la info de las películas        

        let movies = data.results;
        //console.log(moviesInformation); // Sólo para verificar

        let billboard = `
            <h1 class="title">Últimos estrenos</h1>
            <div class="movies_container">`;
        // de momento queiro pintar una tarjeta con su foto y el nomobre
        movies.forEach(movie => {
            billboard += cardTemplate(movie);
        });

        billboard += `</div>`

        document.querySelector(".billboard").innerHTML = billboard;

    }
    catch (error) {
        console.error("Houston, tenemos un problema: " + error)
    }
}
webMovie();


document.querySelector("#search_button").addEventListener("click", async function () {

    let movie = "&query=" + document.getElementById("search_movie").value;
    const URL_SEARCH = SEARCH_MOVIE_URL + KEY + movie;

    try {
        //const response = await fetch(URL_SEARCH);
        const response = await fetch("./men.json");
        if (!response.ok) {
            console.error("Houston, la respuesta no ha sido del todo correcta");
            document.querySelector(".result").innerHTML = "No figura en la base de datos";
        }
        const data = await response.json();
        console.log(data);

        let movies = data.results;

        let result = `
            <h1 class="title">Resultados:</h1>
            <div class="movies_container">`;

        movies.forEach(movie => {
            result += cardTemplate(movie);
        });

        result += "</div>";

        document.querySelector(".search_result").innerHTML = result;
    }
    catch (error) {
        console.error("Houston, tenemos un problema: " + error)
        document.querySelector(".search_result").innerHTML = "No figura en la base de datos";
    }
})