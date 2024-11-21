// Evento de scroll
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (this.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmNlMzA4MDA5MTM4YzExYmQ1ZWMxNTA4NmY2ODQ4MyIsIm5iZiI6MTczMjA0MTEyNy43OTMzNzI2LCJzdWIiOiI2MGMwMGYzMDViMTI0MDAwN2E3NDdiMjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7oBmC6vtiAsSMV6Jz0D4Jt_SMiYd8LrnRF39BCVUnSg",
    },
};

document.addEventListener("DOMContentLoaded", async () => {
    await banner();
});

async function banner() {
    let trendings = [];
    // Corrigido o fetch e tratamento de erro
    try {
        const response = await fetch(
            "https://api.themoviedb.org/3/trending/movie/day?language=pt-br",
            options
        );
        const data = await response.json(); // Precisa chamar .json() como função
        trendings = data.results; // Coleta os resultados
    } catch (err) {
        console.error("Erro ao buscar filmes:", err);
        return; // Sai da função se houver erro
    }

    let carousel = document.querySelector(".carousel-inner");
    carousel.innerHTML = ""; // Limpa o conteúdo do carousel

    for (let i = 0; i < trendings.length; i++) {
        let active = i === 0 ? "active" : ""; // Marca o primeiro slide como ativo
        carousel.innerHTML += `
            <div class="carousel-item ${active}">
                <img 
                    src="https://image.tmdb.org/t/p/original${trendings[i].backdrop_path}" 
                    class="d-block w-100" 
                    alt="${trendings[i].title}">
                <div class="carousel-caption d-none d-md-block">
                    <h3>${trendings[i].title}</h3>
                    <p>${trendings[i].overview}</p>
                </div>
            </div>`;
    }
}
