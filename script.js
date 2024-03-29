/* BEERER */

const COVER_URL = "https://api.themoviedb.org/3/movie/now_playing";
const SEARCH_MOVIE_URL = "https://api.themoviedb.org/3/search/movie";
const URL = COVER_URL + KEY; 
const IMG = "https://image.tmdb.org/t/p/w500";

const cardTemplate = function (movie) {
    return `<article class="template_movie" data-movie-id="${movie.id}">
                <figure>
                    <img src="${IMG + movie.poster_path}" alt="${movie.title}" class="picture_movie">
                </figure>
                <p>${movie.title}</p>
            </article>`
}

async function webMovie() { 
    try {
        // const response = await fetch(URL);
        const response = await fetch("./movies.json");

        if (!response.ok) {
            console.error("Houston, la respuesta no ha sido del todo correcta");
        }
        const data = await response.json();       

        let movies = data.results;

        let billboard = `
            <h1 class="title">Últimos estrenos</h1>
            <div class="movies_container">`;

        movies.forEach(movie => {
            billboard += cardTemplate(movie);
        });

        billboard += `</div>`

        document.querySelector(".billboard").innerHTML = billboard;

        document.querySelectorAll(".template_movie").forEach(element => {
            element.addEventListener("click", function () {
                const movieId = this.dataset.movieId;
                printMoviePage(movieId)
            })
        })
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

        let movies = data.results;

        let result = `
            <h1 class="title">Resultados:</h1>
            <div class="movies_container">`;

        movies.forEach(movie => {
            result += cardTemplate(movie);
        });

        result += "</div>";

        document.querySelector(".search_result").innerHTML = result;

        document.querySelectorAll(".template_movie").forEach(element => {
            element.addEventListener("click", function () {
                const movieId = this.dataset.movieId;
                printMoviePage(movieId)
            })
        })
    }
    catch (error) {
        console.error("Houston, tenemos un problema: " + error)
        document.querySelector(".search_result").innerHTML = "No figura en la base de datos";
    }
})

async function printMoviePage(data) {
    console.log(data);
    let response = await fetch("https://api.themoviedb.org/3/movie/" + data + KEY)
    let movie = await response.json();
    console.log(movie);

    document.querySelector(".search_result").innerHTML = "";
    document.querySelector(".billboard").innerHTML = "";
    document.querySelector(".movie-page").innerHTML = `
        <div>
            <img src="${IMG + movie.backdrop_path}" alt="${movie.title}">
        </div>
        <div>
            <p>Título: ${movie.title}</p>
            <p>Sinopsis: ${movie.overview}</p>
            <p>Web: ${movie.homepage}</p>
            <p>${movie.tagline}</p>
            <p>Valoración: ${movie.vote_average}</p>
        </div>`
}