const video = document.getElementById('intro-video');
const skipBtn = document.getElementById('skip-btn');
const overlay = document.getElementById('fade-overlay');
const intro = document.getElementById('intro-container');
const main = document.getElementById('main-content');

const params = new URLSearchParams(window.location.search);
if (params.get("from") === "article") {
  intro.style.display = "none";
  main.style.display = "block";
  window.scrollTo(0, 0);
  video.pause();
}

function showMainContent() {
  overlay.style.opacity = 1;
  setTimeout(() => {
    intro.style.display = 'none';
    main.style.display = 'block';
    window.scrollTo(0, 0);
  }, 1000);
}

video.addEventListener('ended', showMainContent);
skipBtn.addEventListener('click', showMainContent);

// Pulsating glow effect for articles
document.querySelectorAll('.article').forEach(article => {
  article.addEventListener('mouseenter', () => {
    article.classList.add('glow-active');

    article.glowTimeout = setTimeout(() => {
      article.classList.add('glow-pulse');
    }, 1500);
  });

  article.addEventListener('mouseleave', () => {
    article.classList.remove('glow-active', 'glow-pulse');

    if (article.glowTimeout) {
      clearTimeout(article.glowTimeout);
    }
  });
});
