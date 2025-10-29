// Main application logic

// Navigation
function navigateToPage(pageName) {
  // Check if page requires authentication
  if (requireAuth(pageName) && !isLoggedIn()) {
    navigateToPage('login');
    return;
  }
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  
  // Show target page
  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.style.display = 'block';
  }
  
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });
  
  // Update URL hash
  window.location.hash = pageName;
  
  // Load page-specific content
  if (pageName === 'movies') {
    renderMoviesPage();
  } else if (pageName === 'series') {
    renderSeriesPage();
  } else if (pageName === 'history') {
    renderHistoryPage();
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Render anime cards
function renderAnimeCard(anime) {
  const card = document.createElement('div');
  card.className = 'anime-card';
  card.addEventListener('click', () => watchAnime(anime.slug, 0));
  
  const img = document.createElement('img');
  img.src = anime.cover;
  img.alt = anime.title;
  card.appendChild(img);
  
  const info = document.createElement('div');
  info.className = 'anime-card-info';
  
  const title = document.createElement('div');
  title.className = 'anime-card-title';
  title.textContent = anime.title;
  info.appendChild(title);
  
  const genres = document.createElement('div');
  genres.className = 'anime-card-genres';
  anime.genre.forEach(genre => {
    const genreSpan = document.createElement('span');
    genreSpan.className = 'anime-card-genre';
    genreSpan.textContent = genre;
    genres.appendChild(genreSpan);
  });
  info.appendChild(genres);
  
  card.appendChild(info);
  return card;
}

// Render home page carousels
function renderHomePage() {
  // Latest Episodes
  const latestEpisodes = document.getElementById('latestEpisodes');
  latestEpisodes.innerHTML = '';
  animeData.forEach(anime => {
    latestEpisodes.appendChild(renderAnimeCard(anime));
  });
  
  // Popular Series
  const popularSeries = document.getElementById('popularSeries');
  popularSeries.innerHTML = '';
  animeData.filter(a => a.type === 'series').forEach(anime => {
    popularSeries.appendChild(renderAnimeCard(anime));
  });
  
  // Top Movies
  const topMovies = document.getElementById('topMovies');
  topMovies.innerHTML = '';
  animeData.filter(a => a.type === 'movie').forEach(anime => {
    topMovies.appendChild(renderAnimeCard(anime));
  });
}

// Render movies page
function renderMoviesPage() {
  const moviesGrid = document.getElementById('moviesGrid');
  moviesGrid.innerHTML = '';
  
  const movies = animeData.filter(a => a.type === 'movie');
  
  if (movies.length === 0) {
    moviesGrid.innerHTML = '<p class="empty-message">No movies available at the moment.</p>';
    return;
  }
  
  movies.forEach(anime => {
    moviesGrid.appendChild(renderAnimeCard(anime));
  });
}

// Render series page
function renderSeriesPage() {
  const seriesGrid = document.getElementById('seriesGrid');
  seriesGrid.innerHTML = '';
  
  const series = animeData.filter(a => a.type === 'series');
  
  if (series.length === 0) {
    seriesGrid.innerHTML = '<p class="empty-message">No series available at the moment.</p>';
    return;
  }
  
  series.forEach(anime => {
    seriesGrid.appendChild(renderAnimeCard(anime));
  });
}

// Render history page
function renderHistoryPage() {
  const historyGrid = document.getElementById('historyGrid');
  historyGrid.innerHTML = '';
  
  const history = getWatchHistory();
  
  if (history.length === 0) {
    historyGrid.innerHTML = '<p class="empty-message">No watch history yet. Start watching anime to see your history here!</p>';
    return;
  }
  
  // Get unique anime from history
  const uniqueAnime = new Map();
  history.forEach(item => {
    if (!uniqueAnime.has(item.slug)) {
      const anime = animeData.find(a => a.slug === item.slug);
      if (anime) {
        uniqueAnime.set(item.slug, anime);
      }
    }
  });
  
  uniqueAnime.forEach(anime => {
    historyGrid.appendChild(renderAnimeCard(anime));
  });
}

// Setup navigation listeners
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navigateToPage(page);
    });
  });
  
  // Handle hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      navigateToPage(hash);
    }
  });
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    // Filter anime
    const filtered = animeData.filter(anime => 
      anime.title.toLowerCase().includes(query) ||
      anime.genre.some(g => g.toLowerCase().includes(query))
    );
    
    // Update carousels
    const latestEpisodes = document.getElementById('latestEpisodes');
    latestEpisodes.innerHTML = '';
    filtered.forEach(anime => {
      latestEpisodes.appendChild(renderAnimeCard(anime));
    });
  });
}

// Initialize application
function init() {
  // Setup components
  setupNavigation();
  setupAuthListeners();
  setupSearch();
  initSlideshow();
  initPlayer();
  
  // Update profile UI
  updateProfileUI();
  
  // Render home page
  renderHomePage();
  
  // Check URL hash
  const hash = window.location.hash.slice(1);
  if (hash) {
    navigateToPage(hash);
  } else {
    navigateToPage('home');
  }
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}