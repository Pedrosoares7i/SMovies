const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const media = params.get('media');


// Ao carregar a página executa as funções de buscar os dados
document.addEventListener("DOMContentLoaded", async () => {
    await getMovie();

})

async function getMovie() {
    let movie;
    let baseUrl = 'https://api.themoviedb.org/3/'
    await fetch(`${baseUrl}${media}/${id}?language=pt-br`, options)
        .then(res => res.json())
        .then(res => movie = res)
        .catch(err => console.log('Erro ao carregar filme', err));
    // console.log(movie);


    // poster
    document.querySelector('.poster').src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

    // detalhes  do filme

    let detalhes = document.getElementById('detalhes');
    detalhes.innerHTML = `<h1>${movie.title ?? movie.name}</h1>
    <h5 class='mb-4'>Título Original: ${movie.original_title ?? movie.original_name}</h5>
    <p class='mb-2'> Data de estreia: ${movie.release_date}</p>
    <p class='mb-2'> País de Origem: ${movie.origin_country}</p>
    <p class='mb-2'> Popularidade: ${movie.popularity.toFixed(1)}</p>
    <p class='mb-2'> Status: ${movie.status}</p>
    <p>${movie.overview}</p>`;


    movie.genres.forEach (genre => { 
        detalhes.innerHTML += `<button class='btn btn-lg btn-outline-danger me-2'>${genre.name}</button>`
    })
}