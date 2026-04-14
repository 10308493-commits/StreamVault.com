// watch-history.js

// ── Navbar ──
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');
const navbar     = document.querySelector('.navbar');
const navAccount = document.getElementById('navAccount');
const avatarBtn  = document.getElementById('avatarBtn');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 10));
avatarBtn.addEventListener('click', e => { e.stopPropagation(); navAccount.classList.toggle('open'); });
document.addEventListener('click', e => {
  if (!e.target.closest('#navAccount')) navAccount.classList.remove('open');
  if (!e.target.closest('#svSearch'))   hideResults();
});

// ── Auth ──
(function () {
  const session = JSON.parse(localStorage.getItem('sv_session') || 'null');
  const avatar  = document.getElementById('avatarBtn');
  const nameEl  = document.querySelector('.account-name');
  const emailEl = document.querySelector('.account-email');
  if (session) {
    const ini = session.name.trim().split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
    if (avatar)  avatar.textContent  = ini;
    if (nameEl)  nameEl.textContent  = session.name;
    if (emailEl) emailEl.textContent = session.email;
  } else {
    avatar?.addEventListener('click', e => { e.stopPropagation(); window.location.href='auth.html'; }, { once:true });
  }
  document.querySelector('.account-signout')?.addEventListener('click', e => {
    e.preventDefault(); localStorage.removeItem('sv_session'); window.location.href='auth.html';
  });
})();

// ── Search ──
const MOVIES_DB = [
  { title: 'Dark Horizon',       genre: 'Action · Sci-Fi',    year: 2024, rating: '4.9', badge: 'Trending', img: 'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: 'dtchgU23IDs' },
  { title: 'Neon Requiem',       genre: 'Crime · Neo-Noir',   year: 2023, rating: '4.7', badge: 'Top Pick', img: 'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: '2P2QttzbqAU' },
  { title: 'The Last Signal',    genre: 'Thriller · Drama',   year: 2023, rating: '4.6', badge: null,       img: 'https://tse2.mm.bing.net/th/id/OIP.7ZgswEd3JEtEVKYzjWSlywHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: 'vOUVVDWdXbo' },
  { title: 'Echoes of Tomorrow', genre: 'Sci-Fi · Mystery',   year: 2024, rating: '4.8', badge: 'New',      img: 'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: '5KESiLdE5uU' },
  { title: 'Phantom Protocol',   genre: 'Spy · Thriller',     year: 2023, rating: '4.5', badge: null,       img: 'https://tse1.mm.bing.net/th/id/OIP.4UBmzySch2WW1TpzuNjy6wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: 'QJGvMtYIDu8' },
  { title: 'The Deep',           genre: 'Horror · Sci-Fi',    year: 2022, rating: '4.3', badge: null,       img: 'https://th.bing.com/th/id/OIP.ZyTIt0Ts9HNz1WvrSYkrvQHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', youtube: 'Pic2cThP7mU' },
];

const svSearch  = document.getElementById('svSearch');
const svBtn     = document.getElementById('svSearchBtn');
const svInput   = document.getElementById('svSearchInput');
const svResults = document.getElementById('svSearchResults');

svBtn?.addEventListener('click', e => {
  e.stopPropagation();
  svSearch.classList.toggle('active');
  if (svSearch.classList.contains('active')) setTimeout(() => svInput.focus(), 50);
  else { svInput.value = ''; hideResults(); }
});

svInput?.addEventListener('input', () => {
  const q = svInput.value.trim().toLowerCase();
  if (!q) { hideResults(); return; }
  showResults(MOVIES_DB.filter(m => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q)), q);
});

svInput?.addEventListener('keydown', e => {
  if (e.key === 'Escape') { svSearch.classList.remove('active'); svInput.value = ''; hideResults(); }
});

function showResults(hits, q) {
  svResults.innerHTML = '';
  if (!hits.length) { svResults.innerHTML = `<p class="sv-no-results">No results for "<strong style="color:#fff">${q}</strong>"</p>`; svResults.classList.add('show'); return; }
  hits.slice(0,8).forEach(m => {
    const item = document.createElement('div');
    item.className = 'sv-result-item';
    item.innerHTML = `<img class="sv-result-thumb" src="${m.img}" alt="${m.title}" /><div class="sv-result-info"><div class="sv-result-title">${m.title}</div><div class="sv-result-meta">${m.year} · ${m.genre}</div></div>`;
    item.addEventListener('click', () => { svInput.value = m.title; hideResults(); });
    svResults.appendChild(item);
  });
  svResults.classList.add('show');
}

function hideResults() { svResults.classList.remove('show'); svResults.innerHTML = ''; }

// ── Player ──
function openPlayer(movie, savedTime) {
  const modal   = document.getElementById('playerModal');
  const iframe  = document.getElementById('playerIframe');
  const video   = document.getElementById('playerVideo');
  const titleEl = document.getElementById('playerTitle');
  const resumeEl= document.getElementById('playerResume');
  if (!modal) return;

  titleEl.textContent = movie.title;

  if (movie.youtube) {
    const startParam = savedTime > 0 ? `&start=${Math.floor(savedTime)}` : '';
    iframe.src = `https://www.youtube.com/embed/${movie.youtube}?autoplay=1${startParam}`;
    iframe.style.display = 'block';
    video.style.display  = 'none';
    resumeEl.textContent = savedTime > 0 ? `Resumed from ${formatTime(savedTime)}` : '';
  } else {
    video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
    video.style.display  = 'block';
    iframe.style.display = 'none';
    video.addEventListener('loadedmetadata', () => {
      if (savedTime > 0) { video.currentTime = savedTime; resumeEl.textContent = `Resumed from ${formatTime(savedTime)}`; }
      video.play();
    }, { once: true });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePlayer() {
  const modal  = document.getElementById('playerModal');
  const iframe = document.getElementById('playerIframe');
  const video  = document.getElementById('playerVideo');
  iframe.src = ''; video.pause(); video.src = '';
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function formatTime(secs) {
  return `${Math.floor(secs/60)}:${Math.floor(secs%60).toString().padStart(2,'0')}`;
}

document.getElementById('playerClose')?.addEventListener('click', closePlayer);
document.getElementById('playerModal')?.addEventListener('click', e => { if (e.target === document.getElementById('playerModal')) closePlayer(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePlayer(); });

// ── Watch History ──
const whGrid     = document.getElementById('whGrid');
const whEmpty    = document.getElementById('whEmpty');
const whClearBtn = document.getElementById('whClearBtn');

// Pull history from localStorage (keys starting with sv_progress_)
function loadHistory() {
  whGrid.innerHTML = '';
  const entries = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('sv_progress_')) {
      const title    = key.replace('sv_progress_', '');
      const progress = parseFloat(localStorage.getItem(key)) || 0;
      const movie    = MOVIES_DB.find(m => m.title === title);
      entries.push({ title, progress, movie });
    }
  }

  if (!entries.length) {
    whEmpty.style.display = 'block';
    whGrid.style.display  = 'none';
    return;
  }

  whEmpty.style.display = 'none';
  whGrid.style.display  = 'grid';

  entries.forEach(({ title, progress, movie }) => {
    const img   = movie?.img   || `https://placehold.co/110x160/1a1a1a/888?text=${encodeURIComponent(title)}`;
    const genre = movie?.genre || '—';
    const year  = movie?.year  || '';
    const mins  = Math.floor(progress / 60);
    const secs  = Math.floor(progress % 60).toString().padStart(2,'0');

    const card = document.createElement('div');
    card.className = 'adv-card wh-card';
    card.innerHTML = `
      <img class="adv-thumb" src="${img}" alt="${title}" loading="lazy" />
      <div class="adv-body">
        <div>
          <p class="adv-title">${title}</p>
          <p class="adv-meta">${year} &nbsp;·&nbsp; ${genre}</p>
          <p class="wh-time">Stopped at ${mins}:${secs}</p>
        </div>
        <div class="adv-rating-row">
          <div class="adv-rating-bar"><div class="adv-rating-fill" style="width:60%"></div></div>
          <span class="adv-rating-val" style="color:#aaa;font-size:.7rem">${mins}m watched</span>
        </div>
        <div class="adv-actions">
          <button class="adv-btn play">▶ Resume</button>
          <button class="adv-btn list wh-remove-btn" data-key="sv_progress_${title}">&#128465; Remove</button>
        </div>
      </div>
    `;
    card.querySelector('.adv-btn.play').addEventListener('click', e => {
      e.stopPropagation();
      if (movie) openPlayer(movie, progress);
    });
    card.querySelector('.wh-remove-btn').addEventListener('click', e => {
      e.stopPropagation();
      localStorage.removeItem(`sv_progress_${title}`);
      loadHistory();
    });
    whGrid.appendChild(card);
  });
}

whClearBtn?.addEventListener('click', () => {
  if (!confirm('Clear all watch history?')) return;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith('sv_progress_')) localStorage.removeItem(key);
  }
  loadHistory();
});

loadHistory();
