const STORAGE_KEY = 'theme'; // 'light' or 'dark'

// Apply initial theme - prefer saved, else system
(function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    return;
  }
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
})();

// Keep in sync if system preference changes and user hasn’t chosen
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  }
});

// Toggle handler
document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEY, next);
});
