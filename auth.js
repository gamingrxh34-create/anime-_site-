// In-memory authentication system (no localStorage/sessionStorage)
let users = [];
let currentUser = null;
let watchHistory = [];

// Initialize with a demo user
users.push({
  username: "demo",
  email: "demo@animewatch.com",
  password: "demo123"
});

// Check if user is logged in
function isLoggedIn() {
  return currentUser !== null;
}

// Login function
function login(usernameOrEmail, password) {
  const user = users.find(u => 
    (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
    u.password === password
  );
  
  if (user) {
    currentUser = { username: user.username, email: user.email };
    updateProfileUI();
    return { success: true };
  }
  
  return { success: false, message: "Invalid username/email or password" };
}

// Signup function
function signup(username, email, password) {
  // Check if username already exists
  if (users.find(u => u.username === username)) {
    return { success: false, message: "Username already exists" };
  }
  
  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return { success: false, message: "Email already registered" };
  }
  
  // Create new user
  users.push({ username, email, password });
  currentUser = { username, email };
  updateProfileUI();
  
  return { success: true };
}

// Logout function
function logout() {
  currentUser = null;
  updateProfileUI();
  navigateToPage('home');
}

// Update profile button UI
function updateProfileUI() {
  const profileText = document.getElementById('profileText');
  const profileBtn = document.getElementById('profileBtn');
  
  if (isLoggedIn()) {
    profileText.textContent = currentUser.username;
    profileBtn.style.cursor = 'pointer';
  } else {
    profileText.textContent = 'Login';
  }
}

// Check if page requires authentication
function requireAuth(page) {
  return protectedPages.includes(page);
}

// Add to watch history
function addToHistory(animeSlug, episodeIndex) {
  if (!isLoggedIn()) return;
  
  const historyItem = {
    slug: animeSlug,
    episodeIndex: episodeIndex,
    timestamp: new Date().toISOString()
  };
  
  // Remove if already exists
  watchHistory = watchHistory.filter(item => 
    !(item.slug === animeSlug && item.episodeIndex === episodeIndex)
  );
  
  // Add to beginning
  watchHistory.unshift(historyItem);
  
  // Keep only last 20 items
  if (watchHistory.length > 20) {
    watchHistory = watchHistory.slice(0, 20);
  }
}

// Get watch history
function getWatchHistory() {
  return watchHistory;
}

// Setup auth event listeners
function setupAuthListeners() {
  // Profile button click
  document.getElementById('profileBtn').addEventListener('click', () => {
    if (isLoggedIn()) {
      document.getElementById('profileDropdown').classList.toggle('show');
    } else {
      navigateToPage('login');
    }
  });
  
  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('profileDropdown').classList.remove('show');
    logout();
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const profileSection = document.querySelector('.profile-section');
    if (!profileSection.contains(e.target)) {
      document.getElementById('profileDropdown').classList.remove('show');
    }
  });
  
  // Login form toggle
  document.getElementById('showLoginBtn').addEventListener('click', () => {
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('showLoginBtn').classList.add('active');
    document.getElementById('showSignupBtn').classList.remove('active');
  });
  
  document.getElementById('showSignupBtn').addEventListener('click', () => {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'flex';
    document.getElementById('showSignupBtn').classList.add('active');
    document.getElementById('showLoginBtn').classList.remove('active');
  });
  
  // Login form submit
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const result = login(username, password);
    
    if (result.success) {
      navigateToPage('home');
    } else {
      document.getElementById('loginError').textContent = result.message;
    }
  });
  
  // Signup form submit
  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Clear previous error
    document.getElementById('signupError').textContent = '';
    
    // Validate
    if (password !== confirmPassword) {
      document.getElementById('signupError').textContent = 'Passwords do not match';
      return;
    }
    
    if (password.length < 6) {
      document.getElementById('signupError').textContent = 'Password must be at least 6 characters';
      return;
    }
    
    const result = signup(username, email, password);
    
    if (result.success) {
      navigateToPage('home');
    } else {
      document.getElementById('signupError').textContent = result.message;
    }
  });
}