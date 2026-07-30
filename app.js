const greetingElement = document.getElementById('greeting');
const themeButton = document.getElementById('themeToggle');

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return 'A quiet night, perfect for a glow-up experience.';
  if (hour < 12) return 'Good morning — start the day with mobile-first style.';
  if (hour < 18) return 'Good afternoon — swipe into your next experience.';
  return 'Good evening — unwind with our curated mobile stories.';
}

function updateGreeting() {
  if (!greetingElement) return;
  greetingElement.textContent = getTimeGreeting();
}

function setTheme(isLight) {
  document.documentElement.classList.toggle('light', isLight);
  if (themeButton) {
    themeButton.textContent = isLight ? '🌙' : '☀️';
    themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }
  localStorage.setItem('miss-hot-theme', isLight ? 'light' : 'dark');
}

function toggleTheme() {
  const isLight = document.documentElement.classList.contains('light');
  setTheme(!isLight);
}

function initTheme() {
  const stored = localStorage.getItem('miss-hot-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(stored === 'light' || (stored === null && prefersLight));
}

if (themeButton) {
  themeButton.addEventListener('click', toggleTheme);
}

updateGreeting();
initTheme();
