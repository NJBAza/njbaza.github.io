document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('dark-mode-toggle');
  const html = document.documentElement;
  const bootstrapLink = document.getElementById('quarto-bootstrap');
  const storageKey = 'site-dark';

  function setDark(dark) {
    if (dark) {
      html.classList.add('quarto-dark');
      html.dataset.theme = 'dark';
      if (bootstrapLink) bootstrapLink.setAttribute('data-mode', 'dark');
      if (btn) btn.textContent = '☀️';
    } else {
      html.classList.remove('quarto-dark');
      html.dataset.theme = 'light';
      if (bootstrapLink) bootstrapLink.setAttribute('data-mode', 'light');
      if (btn) btn.textContent = '🌙';
    }
    try {
      localStorage.setItem(storageKey, dark ? 'true' : 'false');
    } catch (e) {
      /* ignore storage errors */
    }
  }

  // initial preference: stored value -> system preference -> light
  let pref = null;
  try { pref = localStorage.getItem(storageKey); } catch (e) { pref = null; }
  if (pref === null) {
    pref = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'true' : 'false';
  }
  setDark(pref === 'true');

  if (btn) {
    btn.addEventListener('click', function () {
      setDark(!html.classList.contains('quarto-dark'));
    });
  }
});
