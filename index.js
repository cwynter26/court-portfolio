const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.navigation__menu-toggle');
const navLinks = document.querySelector('.navigation__links');

function setTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-theme', isLight);
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
  try { localStorage.setItem('portfolio-theme', theme); } catch (error) { /* Storage may be unavailable. */ }
}

let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch (error) { /* Storage may be unavailable. */ }
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (systemPrefersLight ? 'light' : 'dark'));

themeButton.addEventListener('click', () => {
  setTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
});

function closeMenu() {
  navLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();