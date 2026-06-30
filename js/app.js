const navToggle = document.querySelector('#navToggle');
const siteNav = document.querySelector('#siteNav');
const themeToggle = document.querySelector('#themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.pill').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('[data-category]').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});
