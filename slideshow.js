// Featured anime slideshow
let currentSlide = 0;
let slideshowInterval = null;

function initSlideshow() {
  const featuredCard = document.getElementById('featuredCard');
  const dotsContainer = document.getElementById('slideshowDots');
  
  // Create dots
  featuredAnime.forEach((slug, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  // Show first slide
  showSlide(0);
  
  // Start auto-rotation
  startSlideshow();
  
  // Featured card click handler
  featuredCard.addEventListener('click', () => {
    const currentAnimeSlug = featuredAnime[currentSlide];
    watchAnime(currentAnimeSlug, 0);
  });
}

function showSlide(index) {
  const anime = animeData.find(a => a.slug === featuredAnime[index]);
  if (!anime) return;
  
  const featuredImage = document.getElementById('featuredImage');
  const featuredTitle = document.getElementById('featuredTitle');
  const featuredGenres = document.getElementById('featuredGenres');
  
  // Update content
  featuredImage.src = anime.cover;
  featuredImage.alt = anime.title;
  featuredTitle.textContent = anime.title;
  
  // Update genres
  featuredGenres.innerHTML = '';
  anime.genre.forEach(genre => {
    const badge = document.createElement('span');
    badge.className = 'genre-badge';
    badge.textContent = genre;
    featuredGenres.appendChild(badge);
  });
  
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  // Add fade animation
  featuredImage.classList.add('fade');
  setTimeout(() => featuredImage.classList.remove('fade'), 500);
  
  currentSlide = index;
}

function goToSlide(index) {
  showSlide(index);
  resetSlideshow();
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % featuredAnime.length;
  showSlide(nextIndex);
}

function startSlideshow() {
  slideshowInterval = setInterval(nextSlide, 4000);
}

function resetSlideshow() {
  clearInterval(slideshowInterval);
  startSlideshow();
}

function stopSlideshow() {
  clearInterval(slideshowInterval);
}