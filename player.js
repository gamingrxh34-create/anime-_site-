// Video player functionality
let currentAnime = null;
let currentEpisodeIndex = 0;
let currentTrack = 'sub'; // 'sub' or 'dub'

function initPlayer() {
  // Sub/Dub toggle
  document.getElementById('subBtn').addEventListener('click', () => {
    currentTrack = 'sub';
    document.getElementById('subBtn').classList.add('active');
    document.getElementById('dubBtn').classList.remove('active');
    updateVideoSource();
  });
  
  document.getElementById('dubBtn').addEventListener('click', () => {
    currentTrack = 'dub';
    document.getElementById('dubBtn').classList.add('active');
    document.getElementById('subBtn').classList.remove('active');
    updateVideoSource();
  });
}

function watchAnime(slug, episodeIndex = 0) {
  // Check if user is logged in
  if (!isLoggedIn()) {
    navigateToPage('login');
    return;
  }
  
  // Find anime
  const anime = animeData.find(a => a.slug === slug);
  if (!anime) {
    alert('Anime not found');
    return;
  }
  
  currentAnime = anime;
  currentEpisodeIndex = episodeIndex;
  currentTrack = 'sub';
  
  // Add to history
  addToHistory(slug, episodeIndex);
  
  // Navigate to watch page
  navigateToPage('watch');
  
  // Update UI
  document.getElementById('watchAnimeTitle').textContent = anime.title;
  document.getElementById('watchEpisodeName').textContent = anime.episodes[episodeIndex].name;
  
  // Reset sub/dub toggle
  document.getElementById('subBtn').classList.add('active');
  document.getElementById('dubBtn').classList.remove('active');
  
  // Load video
  updateVideoSource();
  
  // Render episodes list
  renderEpisodesList();
}

function updateVideoSource() {
  if (!currentAnime || !currentAnime.episodes[currentEpisodeIndex]) return;
  
  const episode = currentAnime.episodes[currentEpisodeIndex];
  const videoUrl = currentTrack === 'sub' ? episode.sub : episode.dub;
  
  if (!videoUrl) {
    alert(`${currentTrack.toUpperCase()} version not available for this episode`);
    return;
  }
  
  document.getElementById('videoIframe').src = videoUrl;
}

function renderEpisodesList() {
  const episodesList = document.getElementById('episodesList');
  episodesList.innerHTML = '';
  
  currentAnime.episodes.forEach((episode, index) => {
    const episodeItem = document.createElement('div');
    episodeItem.className = 'episode-item';
    if (index === currentEpisodeIndex) {
      episodeItem.classList.add('active');
    }
    episodeItem.textContent = episode.name;
    episodeItem.addEventListener('click', () => {
      currentEpisodeIndex = index;
      document.getElementById('watchEpisodeName').textContent = episode.name;
      updateVideoSource();
      addToHistory(currentAnime.slug, index);
      renderEpisodesList();
    });
    episodesList.appendChild(episodeItem);
  });
}