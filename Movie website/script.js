const hamburger      = document.getElementById('hamburger');
const navLinks       = document.getElementById('navLinks');
const navbar         = document.querySelector('.navbar');
const cwRow          = document.getElementById('cwRow');
const playerModal    = document.getElementById('playerModal');
const playerVideo    = document.getElementById('playerVideo');
const playerIframe   = document.getElementById('playerIframe');
const playerTitle    = document.getElementById('playerTitle');
const playerResume   = document.getElementById('playerResume');
const playerClose    = document.getElementById('playerClose');

// ── Movie Database ──
const MOVIES_DB = [
  { title: 'Dark Horizon',       genre: 'Action · Sci-Fi',    year: 2024, rating: '4.9', badge: 'Trending', img: 'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: 'NIJFpgU18gY' },
  { title: 'Neon Requiem',       genre: 'Crime · Neo-Noir',   year: 2023, rating: '4.7', badge: 'Top Pick', img: 'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: '2P2QttzbqAU' },
  { title: 'The Last Signal',    genre: 'Thriller · Drama',   year: 2023, rating: '4.6', badge: null,       img: 'https://tse2.mm.bing.net/th/id/OIP.7ZgswEd3JEtEVKYzjWSlywHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: 'vOUVVDWdXbo' },
  { title: 'Echoes of Tomorrow', genre: 'Sci-Fi · Mystery',   year: 2024, rating: '4.8', badge: 'New',      img: 'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: '5KESiLdE5uU' },
  { title: 'Phantom Protocol',   genre: 'Spy · Thriller',     year: 2023, rating: '4.5', badge: null,       img: 'https://tse1.mm.bing.net/th/id/OIP.4UBmzySch2WW1TpzuNjy6wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: 'QJGvMtYIDu8' },
  { title: 'Starfall',           genre: 'Fantasy · Action',   year: 2024, rating: '4.7', badge: 'Hot',      img: 'https://tse1.mm.bing.net/th/id/OIP.2f2TV9iFHUFE4LP0VC8-tgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: 'ByXuk9QqQkk' },
  { title: 'Wildfire',           genre: 'Drama · Adventure',  year: 2022, rating: '4.4', badge: null,       img: 'https://tse4.mm.bing.net/th/id/OIP.yPR6Phs6mXP_fJRtNH80PgHaK4?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: 'kVmC0ktznNo' },
  { title: 'Broken Circuit',     genre: 'Cyberpunk · Drama',  year: 2023, rating: '4.6', badge: 'New',      img: 'https://tse3.mm.bing.net/th/id/OIP.XxTVBzIzv_J08HvpA9qVAAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: 'PXLkapBHD5w' },
  { title: 'The Deep',           genre: 'Horror · Sci-Fi',    year: 2022, rating: '4.3', badge: null,       img: 'https://th.bing.com/th/id/OIP.ZyTIt0Ts9HNz1WvrSYkrvQHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', youtube: 'Pic2cThP7mU' },
  { title: 'Crimson Tide II',    genre: 'Action · War',       year: 2024, rating: '4.5', badge: 'Sequel',   img: 'https://th.bing.com/th?id=OIF.IH1uZTLGw%2bvR8yEsWkl61Q&rs=1&pid=ImgDetMain&o=7&rm=3',           youtube: 'JNiK-rfzZPE' },
  { title: 'The Harder They Fall',  genre: 'Western · Action',    year: 2021, rating: '4.8', badge: 'Top Pick', img: 'https://cdn.mos.cms.futurecdn.net/2WxoEqA422BR54rFhNZsja-1200-80.jpg', youtube: 'J50ALgqS6cM' },
  { title: 'Old Henry',             genre: 'Western · Action',    year: 2021, rating: '4.7', badge: 'Gritty',   img: 'https://th.bing.com/th/id/R.d4ba2c04fa373d007d55c63526c5277d?rik=hRd4r0eMEAcuqw&pid=ImgRaw&r=0', youtube: 'n1sucYeSVc8' },
  { title: 'Horizon: Am. Saga',     genre: 'Western · Drama',     year: 2024, rating: '4.6', badge: 'New',      img: 'https://www.slashfilm.com/img/gallery/horizon-an-american-saga-chapter-1-review-the-most-expensive-trailer-for-a-sequel-ever-made/intro-1718995039.jpg', youtube: '0pmLEu3pQiE' },
  { title: 'Django Unchained',      genre: 'Western · Action',    year: 2012, rating: '4.9', badge: 'Classic',  img: 'https://image.tmdb.org/t/p/original/ltkWGokEIToUYyoUqc6PBI1kHPx.jpg', youtube: '0fUCuvNlOCg' },
  { title: 'The Revenant',          genre: 'Western · Adventure', year: 2015, rating: '4.8', badge: 'Epic',     img: 'https://tse2.mm.bing.net/th/id/OIP.5fkKLhGcDBG43b8cam1nfAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', youtube: 'LoebZZ8K5N0' },
  { title: 'Hell or High Water',    genre: 'Western · Crime',     year: 2016, rating: '4.7', badge: 'Must-See', img: 'https://tse2.mm.bing.net/th/id/OIP.VgrLo5eurfEaAwcpcRBXMgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', youtube: 'JQoqsKoJVDw' },
  { title: 'The Grand Bluff',    genre: 'Comedy · Crime',     year: 2023, rating: '4.3', badge: 'Fan Fav',  img: 'https://www.francetvpro.fr/sites/default/files/styles/crop_format_bandeau/public/telechargements/images/LE%20GRAND%20BLUFF%20Bande%20annonce%20(2024)%20Vanessa%20Feuillatte%2C%20Nahid%20Abdourraquib.jpg.webp?itok=1Z_lKCSO',          youtube: 'hY7m5jjJ9mM' },
  { title: 'Laugh Track',        genre: 'Comedy · Drama',     year: 2024, rating: '4.1', badge: 'New',      img: 'https://tse3.mm.bing.net/th/id/OIP.ThkJiM7rc7QWUJG9QWMUtgHaEp?rs=1&pid=ImgDetMain&o=7&rm=3',          youtube: 'hY7m5jjJ9mM' },
  { title: 'Office Chaos',       genre: 'Comedy · Satire',    year: 2023, rating: '4.5', badge: null,       img: 'https://tse2.mm.bing.net/th/id/OIP.GhWWKbvEEC8nbdyubfUn9QHaEO?rs=1&pid=ImgDetMain&o=7&rm=3',         youtube: 'hY7m5jjJ9mM' },
  { title: 'Totally Normal',     genre: 'Comedy · Romance',   year: 2022, rating: '4.0', badge: null,       img: 'https://tse4.mm.bing.net/th/id/OIP.CXAs2P5G-zrwvumFhZ40YQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',       youtube: 'KAOdjqyG37A' },
  { title: 'The Wrong Address',  genre: 'Comedy · Mystery',   year: 2024, rating: '4.2', badge: 'Hot',      img: 'https://tse3.mm.bing.net/th/id/OIP.ziRhzDFcUMSSvLhx_RX9ggHaFU?rs=1&pid=ImgDetMain&o=7&rm=3',        youtube: 'dQw4w9WgXcQ' },
  { title: 'Accidental Hero',    genre: 'Comedy · Action',    year: 2023, rating: '4.4', badge: null,       img: 'https://tse2.mm.bing.net/th/id/OIP.ODQZX96xLQ045DpO2reRtAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',      youtube: 'BQ0mxQXmLsk' },
];

// ══════════════════════════════════════
// SV SEARCH
// ══════════════════════════════════════
(function () {
  const wrap    = document.getElementById('svSearch');
  const btn     = document.getElementById('svSearchBtn');
  const input   = document.getElementById('svSearchInput');
  const results = document.getElementById('svSearchResults');
  if (!wrap || !btn || !input || !results) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.toggle('active');
    if (wrap.classList.contains('active')) {
      setTimeout(() => input.focus(), 50);
    } else {
      input.value = '';
      hideResults();
    }
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { hideResults(); return; }
    const hits = MOVIES_DB.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.genre.toLowerCase().includes(q) ||
      String(m.year).includes(q)
    );
    showResults(hits, q);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { wrap.classList.remove('active'); input.value = ''; hideResults(); }
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) { wrap.classList.remove('active'); input.value = ''; hideResults(); }
  });

  function highlight(text, q) {
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return text.slice(0, idx) + '<mark style="background:#e50914;color:#fff;border-radius:2px;padding:0 1px">' + text.slice(idx, idx + q.length) + '</mark>' + text.slice(idx + q.length);
  }

  function showResults(hits, q) {
    results.innerHTML = '';
    if (!hits.length) {
      results.innerHTML = `<p class="sv-no-results">No results for "<strong style="color:#fff">${q}</strong>"</p>`;
      results.classList.add('show');
      return;
    }
    const header = document.createElement('div');
    header.className = 'sv-result-header';
    header.textContent = `${hits.length} result${hits.length > 1 ? 's' : ''}`;
    results.appendChild(header);

    hits.slice(0, 10).forEach(movie => {
      const item = document.createElement('div');
      item.className = 'sv-result-item';
      item.innerHTML = `
        <img class="sv-result-thumb" src="${movie.img}" alt="${movie.title}" loading="lazy" />
        <div class="sv-result-info">
          <div class="sv-result-title">${highlight(movie.title, q)}</div>
          <div class="sv-result-meta">${movie.year} · ${movie.genre} · ⭐ ${movie.rating}</div>
        </div>
        ${movie.badge ? `<span class="sv-result-badge">${movie.badge}</span>` : ''}
        ${movie.youtube ? `<button class="sv-result-play" title="Play now">▶</button>` : ''}
      `;
      item.addEventListener('click', () => {
        input.value = movie.title;
        hideResults();
      });
      if (movie.youtube) {
        item.querySelector('.sv-result-play').addEventListener('click', (e) => {
          e.stopPropagation();
          hideResults();
          wrap.classList.remove('active');
          input.value = '';
          // open player
          const modal  = document.getElementById('playerModal');
          const iframe = document.getElementById('playerIframe');
          const video  = document.getElementById('playerVideo');
          const title  = document.getElementById('playerTitle');
          if (!modal) return;
          iframe.src = `https://www.youtube.com/embed/${movie.youtube}?autoplay=1`;
          iframe.style.display = 'block';
          video.style.display  = 'none';
          title.textContent    = movie.title;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      }
      results.appendChild(item);
    });
    results.classList.add('show');
  }

  function hideResults() {
    results.classList.remove('show');
    results.innerHTML = '';
  }
})();function renderDropdown(results) {
  // legacy — replaced by SV SEARCH
}
function closeDropdown() {
  // legacy — replaced by SV SEARCH
}

// ── Account dropdown ──
const navAccount = document.getElementById('navAccount');
const avatarBtn  = document.getElementById('avatarBtn');

avatarBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  navAccount.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#navAccount')) navAccount.classList.remove('open');
});

// ── Hamburger ──
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    navLinks.classList.remove('open');
  });
});

window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 10));

// ── Video Player ──
let currentMovieKey = null;
let isYoutube = false;

function openPlayer(item) {
  currentMovieKey = `sv_progress_${item.title}`;
  playerTitle.textContent = item.title;
  playerModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (item.youtube) {
    isYoutube = true;
    const saved = parseFloat(localStorage.getItem(currentMovieKey)) || 0;
    playerIframe.src = `https://www.youtube.com/embed/${item.youtube}?autoplay=1${saved > 0 ? `&start=${Math.floor(saved)}` : ''}`;
    playerIframe.style.display = 'block';
    playerVideo.style.display  = 'none';
    playerResume.textContent   = saved > 0 ? `Resumed from ${formatTime(saved)}` : '';
  } else {
    isYoutube = false;
    const saved = parseFloat(localStorage.getItem(currentMovieKey)) || 0;
    playerVideo.src = item.video;
    playerVideo.style.display  = 'block';
    playerIframe.style.display = 'none';
    playerVideo.addEventListener('loadedmetadata', () => {
      if (saved > 0) { playerVideo.currentTime = saved; playerResume.textContent = `Resumed from ${formatTime(saved)}`; }
      else { playerResume.textContent = ''; }
      playerVideo.play();
    }, { once: true });
  }
}

function closePlayer() {
  if (!isYoutube && currentMovieKey && playerVideo.currentTime > 0)
    localStorage.setItem(currentMovieKey, playerVideo.currentTime);
  playerVideo.pause();
  playerVideo.src  = '';
  playerIframe.src = '';
  playerModal.classList.remove('active');
  document.body.style.overflow = '';
  updateCWProgress();
}

function formatTime(secs) {
  return `${Math.floor(secs / 60)}:${Math.floor(secs % 60).toString().padStart(2,'0')}`;
}

function updateCWProgress() {
  document.querySelectorAll('.cw-card').forEach((card, i) => {
    const item  = continueWatching[i];
    const saved = parseFloat(localStorage.getItem(`sv_progress_${item.title}`)) || 0;
    if (saved > 0 && playerVideo.duration) {
      const pct = Math.min((saved / playerVideo.duration) * 100, 100).toFixed(0);
      card.querySelector('.cw-progress-bar').style.width = pct + '%';
      card.querySelector('.cw-meta span:last-child').textContent = pct + '% watched';
    }
  });
}

playerClose.addEventListener('click', closePlayer);
playerModal.addEventListener('click', (e) => { if (e.target === playerModal) closePlayer(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePlayer(); });

if (playerVideo) {
  playerVideo.addEventListener('timeupdate', () => {
    if (currentMovieKey && playerVideo.currentTime > 0 && Math.floor(playerVideo.currentTime) % 5 === 0)
      localStorage.setItem(currentMovieKey, playerVideo.currentTime);
  });
}

// ── Continue Watching ──
const continueWatching = [
  { title: 'Dark Horizon',     progress: 72, timeLeft: '38 min left',  img: 'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',       video: null, youtube: 'NIJFpgU18gY' },
  { title: 'Neon Requiem',     progress: 45, timeLeft: '1h 12m left',  img: 'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',       video: null, youtube: '2P2QttzbqAU' },
  { title: 'Phantom Protocol', progress: 88, timeLeft: '18 min left',  img: 'https://tse1.mm.bing.net/th/id/OIP.4UBmzySch2WW1TpzuNjy6wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',       video: null, youtube: 'QJGvMtYIDu8' },
  { title: 'The Deep',         progress: 30, timeLeft: '1h 28m left',  img: 'https://th.bing.com/th/id/OIP.ZyTIt0Ts9HNz1WvrSYkrvQHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',   video: null, youtube: 'Pic2cThP7mU' },
  { title: 'Broken Circuit',   progress: 60, timeLeft: '52 min left',  img: 'https://tse3.mm.bing.net/th/id/OIP.XxTVBzIzv_J08HvpA9qVAAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',       video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

continueWatching.forEach(item => {
  if (!cwRow) return;
  const card = document.createElement('div');
  card.className = 'cw-card';
  card.innerHTML = `
    <div class="cw-thumb-wrap">
      <img class="cw-thumb" src="${item.img}" alt="${item.title}" loading="lazy" />
      <div class="cw-play-overlay"><div class="cw-play-icon">&#9654;</div></div>
      <div class="cw-progress-bar" style="width:${item.progress}%"></div>
    </div>
    <div class="cw-info">
      <p class="cw-title">${item.title}</p>
      <div class="cw-meta"><span>${item.timeLeft}</span><span>${item.progress}% watched</span></div>
    </div>
  `;
  card.addEventListener('click', () => openPlayer(item));
  cwRow.appendChild(card);
});

// ── Featured Movies ──
const featuredMovies = MOVIES_DB.slice(0, 10);
const moviesGrid = document.getElementById('moviesGrid');

if (moviesGrid) {
  featuredMovies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      ${movie.badge ? `<span class="card-badge">${movie.badge}</span>` : ''}
      <span class="card-rating">⭐ ${movie.rating}</span>
      <img class="card-thumb" src="${movie.img}" alt="${movie.title}" loading="lazy" />
      <div class="card-overlay">
        <p class="card-title">${movie.title}</p>
        <p class="card-meta">${movie.year} · ${movie.genre}</p>
        <div class="card-actions">
          <button class="card-btn play">▶ Play</button>
          <button class="card-btn list">+ List</button>
        </div>
      </div>
    `;
    card.querySelector('.card-btn.play').addEventListener('click', (e) => {
      e.stopPropagation();
      openPlayer(movie.youtube ? movie : { ...movie, video: 'https://www.w3schools.com/html/mov_bbb.mp4' });
    });
    moviesGrid.appendChild(card);
  });
}

// ── Reviews ──
const allMovieTitles = MOVIES_DB.map(m => m.title);
const seedReviews = [
  { author: 'Alex M.',   movie: 'Dark Horizon',      stars: 5, text: 'Absolutely mind-blowing. The AI storyline felt terrifyingly real.',                              date: 'Mar 12, 2026' },
  { author: 'Priya S.',  movie: 'Neon Requiem',       stars: 4, text: 'Gorgeous cinematography and a gripping neo-noir atmosphere. The ending left me speechless.',    date: 'Mar 18, 2026' },
  { author: 'Jordan K.', movie: 'Phantom Protocol',   stars: 5, text: 'Non-stop tension from start to finish. The spy sequences are incredibly creative.',             date: 'Mar 20, 2026' },
  { author: 'Sam T.',    movie: 'The Deep',            stars: 4, text: 'Genuinely terrifying. The underwater horror elements are executed perfectly.',                  date: 'Mar 22, 2026' },
  { author: 'Mia R.',    movie: 'Echoes of Tomorrow', stars: 5, text: 'A beautiful and haunting sci-fi mystery. Kept me guessing until the very last scene.',          date: 'Mar 25, 2026' },
  { author: 'Chris L.',  movie: 'Wildfire',            stars: 3, text: 'Solid drama with great performances, though the pacing drags a bit in the second act.',        date: 'Mar 26, 2026' },
];

const reviewsGrid       = document.getElementById('reviewsGrid');
const reviewMovieSelect = document.getElementById('reviewMovie');
const starPicker        = document.getElementById('starPicker');
const reviewForm        = document.getElementById('reviewForm');
let selectedStars = 0;

allMovieTitles.forEach(title => {
  const opt = document.createElement('option');
  opt.value = title; opt.textContent = title;
  reviewMovieSelect.appendChild(opt);
});

starPicker.querySelectorAll('span').forEach(star => {
  star.addEventListener('mouseover', () => highlightStars(+star.dataset.val));
  star.addEventListener('mouseout',  () => highlightStars(selectedStars));
  star.addEventListener('click',     () => { selectedStars = +star.dataset.val; highlightStars(selectedStars); });
});

function highlightStars(count) {
  starPicker.querySelectorAll('span').forEach(s => s.classList.toggle('active', +s.dataset.val <= count));
}
function starsHTML(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }
function initials(name) { return name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2); }
function avatarColor(name) {
  const colors = ['#e50914','#0070f3','#7c3aed','#059669','#d97706','#db2777'];
  let hash = 0;
  for (const c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function renderReview(r) {
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="review-card-header">
      <div class="review-avatar" style="background:${avatarColor(r.author)}">${initials(r.author)}</div>
      <div class="review-meta"><p class="review-author">${r.author}</p><p class="review-movie-tag">${r.movie}</p></div>
      <span class="review-stars">${starsHTML(r.stars)}</span>
    </div>
    <p class="review-body">${r.text}</p>
    <span class="review-date">${r.date}</span>
  `;
  reviewsGrid.prepend(card);
}

seedReviews.forEach(renderReview);

reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const movie = reviewMovieSelect.value;
  const name  = document.getElementById('reviewName').value.trim();
  const text  = document.getElementById('reviewText').value.trim();
  if (!movie || !name || !text || selectedStars === 0) { alert('Please fill in all fields and select a rating.'); return; }
  const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  renderReview({ author: name, movie, stars: selectedStars, text, date: now });
  reviewForm.reset(); selectedStars = 0; highlightStars(0);
});

// ── Auth Session ──
(function () {
  const session = JSON.parse(localStorage.getItem('sv_session') || 'null');
  const avatar  = document.getElementById('avatarBtn');
  const nameEl  = document.querySelector('.account-name');
  const emailEl = document.querySelector('.account-email');
  if (session) {
    const ini = session.name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    if (avatar)  avatar.textContent  = ini;
    if (nameEl)  nameEl.textContent  = session.name;
    if (emailEl) emailEl.textContent = session.email;
  } else {
    avatar?.addEventListener('click', (e) => { e.stopPropagation(); window.location.href = 'auth.html'; }, { once: true });
  }
  document.querySelector('.account-signout')?.addEventListener('click', (e) => {
    e.preventDefault(); localStorage.removeItem('sv_session'); window.location.href = 'auth.html';
  });
})();
