/* BEERER */




async function webMovie() { // Simplemente recoge los datos de la api para pintar el DOM

    /*    CREDENCIALES */

    const URL = "./movies.json"; // Local
    const IMG = "https://image.tmdb.org/t/p/w500";

    try {
        // Lanzamos la solicitud utilizando fetch() y esperamos respuesta
        const response = await fetch(URL);
        // Verificamos que la respuesta es correcta, es una buena práctica y pide de comer
        if (!response.ok) {
            console.error("Houston, la respuesta no ha sido del todo correcta");
        }
        const data = await response.json();
        // Ya tenemos nuestros datos listos para procesar
        // Sólo necesito "results", que es un array de objetos con la info de las pelis        

        let moviesInformation = data.results;
        console.log(moviesInformation); // Sólo para verificar

        let nowPlaying = "";
        // de momento queiro pintar una tarjeta con su foto y el nomobre
        moviesInformation.forEach(movie => {
            nowPlaying += `
            <article class="containerMovie">
                <figure>
                    <img src="${IMG+movie.poster_path}" alt="${movie.title}" class = "pictureMovie">
                </figure>
                <p>${movie.title}</p>
            </article>`

        });
        document.querySelector(".nowPlaying_container").innerHTML = nowPlaying;

    }
    catch (error) {
        console.error("Houston, tenemos un problema: " + error)
    }
}

webMovie();