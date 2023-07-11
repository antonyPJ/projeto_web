// Declarations
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
const searchButton = document.getElementById('search-button');
const featuredGames = new Glide('#featured-games', {
    type: 'carousel',
    perView: 3,
    focusAt: 'center',
});

const gameInformationSection = document.getElementById('game-information');
let currentPage = 1;
let reviewsPerPage = 2; 
let totalReviews = []; 

// Event Listeners
if (searchInput && searchButton) {
    searchInput.addEventListener('input', showSearchSuggestions);
    searchButton.addEventListener('click', performSearch);
}
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', () => {
      const categoryName = category.textContent;
      window.location.href = `search-results.html?category=${categoryName}`;
    });
});
// Carousel
if(document.getElementById('featured-games')){
    featuredGames.mount();
}

// Search
function showSearchSuggestions() {
    const searchQuery = searchInput.value;
    // Realizar sugestões de pesquisa com base na consulta
    const suggestions = performSearchSuggestions(searchQuery);

    // Atualizar a lista de sugestões de pesquisa com as sugestões
    searchSuggestions.innerHTML = '';
    suggestions.forEach((suggestion) => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            searchInput.value = suggestion;
            searchSuggestions.style.display = 'none';
        });
        searchSuggestions.appendChild(li);
    });

    searchSuggestions.style.display = 'block';
}

function performSearch() {
    const searchQuery = searchInput.value;
    // Realizar pesquisa com base na consulta
    // Redirecionar para a página de resultados da pesquisa ou atualizar o conteúdo dinamicamente
    // Exemplo:
    window.location.href = `search-results.html?query=${searchQuery}`;
}

function performSearchSuggestions(query) {
   // Realizar a lógica de sugestão de pesquisa real e retornar um array de sugestões
    // Exemplo:
    const suggestions = ['Jogo A', 'Jogo B', 'Jogo C'];
    return suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
    );
}

// Game Information
function getGameIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('gameId');
}

function fetchGameInformation(gameId) {
    // Realizar a recuperação real de dados para as informações do jogo com base no ID
    // Retornar uma promessa que resolve com o objeto do jogo
    // Exemplo:
    return new Promise((resolve, reject) => {
        // Simulando uma chamada de API assíncrona
        setTimeout(() => {
            const game = {
                title: 'Jogo A',
                releaseDate: '1 de Janeiro, 2023',
                developer: 'Desenvolvedor A',
                genre: 'Ação',
                platforms: 'PS4, Xbox One, PC',
                averagePrice: '100R$',
                userRating: '8.6',
                reviews: [
                    { user: 'Usuario1', rating: 8, content: 'Ótimo jogo!' },
                    { user: 'Usuario2', rating: 9, content: 'Mauris lobortis luctus augue et pharetra. Sed pellentesque luctus massa in congue. Curabitur tincidunt sapien lectus, vel dignissim eros scelerisque imperdiet. Nulla placerat lectus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec interdum tellus sed ante suscipit, at efficitur purus commodo. Donec aliquet, tellus ut tempor porttitor, dolor nisi facilisis dui, id ultricies mi massa nec enim. Quisque molestie tristique nisi aliquet tempor. Vivamus quis porta nisi, a molestie sapien.' },
                    { user: 'Usuario3', rating: 7, content: 'Gostei.' },
                ],
                summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis luctus augue et pharetra. Sed pellentesque luctus massa in congue. Curabitur tincidunt sapien lectus',
            };
            resolve(game);
        }, 1000);
    });
}

// Reviews
function displayReviews() {
    const start = (currentPage - 1) * reviewsPerPage;
    const end = start + reviewsPerPage;
    const currentReviews = totalReviews.slice(start, end);

    const reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = ''; // Clear out the previous reviews

    currentReviews.forEach((review) => {
        const starRating = createStarRating(review.rating);
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        reviewElement.innerHTML = `
        <div class="review-header">
            <span class="review-user">${review.user}</span>
            <span class="review-rating">${starRating}</span>
        </div>
        <p class="review-content">${truncateContent(review.content, 40)}
        </p>
        <div class="review-footer">
            <span class="review-date">${review.date}</span>
        </div>
        `;

        reviewsContainer.appendChild(reviewElement);
    });
}

function displayPagination() {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalReviews.length / reviewsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const pageElement = document.createElement('li');
    pageElement.textContent = i;
    pageElement.addEventListener('click', () => {
      currentPage = i;
      displayReviews();
      displayPagination();
    });

    if (i === currentPage) {
      pageElement.classList.add('active');
    }

    paginationContainer.appendChild(pageElement);
  }
}

function createStarRating(rating) {
    let fullStars = Math.floor(rating / 2);
    let halfStars = rating % 2;
    let emptyStars = 5 - fullStars - halfStars;

    let starHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starHTML += '<img src="../projeto_web/public/starf.png" alt="Full star">';
    }

    for (let i = 0; i < halfStars; i++) {
        starHTML += '<img src="../projeto_web/public/star_half.png" alt="Full star">';  // This can be changed to your half-star character
    }

    for (let i = 0; i < emptyStars; i++) {
        starHTML += '<img src="../projeto_web/public/star_empty.png" alt="Full star">';
    }

    return starHTML;
}

const scoreInput = document.getElementById('score');
const starDisplay = document.getElementById('stars-display');

if (scoreInput){
    scoreInput.addEventListener('input', updateStarRating);

    function updateStarRating() {
        let score = scoreInput.value;

        // Checa se a pontuação está no limite permitido
        if (score < 0) score = 0;
        if (score > 10) score = 10;

        const starHTML = createStarRating(score);
        starDisplay.innerHTML = starHTML;
    }
    updateStarRating();
}


function calculateAverageRating(reviews) {
    if (reviews.length === 0) {
        return 'N/A';
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating.toFixed(1);
}

// Implementar funcionalidade "Leia Mais"
function truncateContent(content, maxLength) {
    if (content.length <= maxLength) {
        return content;
    } else {
        let brokenContent = "";
        for (let i = 0; i < content.length; i++) {
            if (i !== 0 && i % maxLength === 0) {
                brokenContent += '<br>';
            }
            brokenContent += content[i];
        }
        return brokenContent;
    }
}

function expandContent(link) {
    const fullContent = link.parentElement.textContent.replace('Leia mais', '');
    link.parentElement.innerHTML = fullContent;
}

// Initialize
const gameId = getGameIdFromURL(); 
fetchGameInformation(gameId)
    .then((game) => {
			// Update game details on page
            /*
			const gameImage = document.createElement('img');
			gameImage.id = 'game-image';
			gameImage.src = '../Projeto/imgs/Red_Dead_Redemption_2.png';  // assuming 'image' is a property of your game object
			gameImage.alt = 'Imagem do jogo';

			document.getElementById('game-image-section').appendChild(gameImage);
            */
			const gameDetailsHTML = `
				<h2>${game.title}</h2>
                <p>Nota: <span class="game-info">${game.userRating}/10</span></p>
                <p>Categorias: <span class="game-info">${game.genre}</span></p>
                <p>Custo médio: <span class="game-info">${game.averagePrice}</span></p>
                <p>Plataformas: <span class="game-info">${game.platforms}</span></p>
                <p>Produtoras: <span class="game-info">${game.developer}</span></p>
				<p>Lançamento: <span class="game-info">${game.releaseDate}</span></p>
			`;
            if (document.getElementById('game-details-section')){
                document.getElementById('game-details-section').innerHTML = gameDetailsHTML;
                document.getElementById('game-summary').innerHTML = `<p class="game-info-p">${game.summary}</p>`
                totalReviews = game.reviews; 
                displayReviews();
                displayPagination();
            }
            
			// Inicializar deslizador de informações do jogo
            /*
			const gameInformationSlider = new Glide('#game-information', {
				type: 'carousel',
				perView: 1,
				focusAt: 'center',
			});

			gameInformationSlider.mount();
            */
    })
    .catch((error) => {
        console.error('Erro ao buscar informações do jogo:', error);
    });