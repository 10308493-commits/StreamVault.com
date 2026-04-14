// movies-page.js — Movies.html script

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

// ── Hero Slider ──
const slides = [
  { img: 'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',    badge: 'Trending #1',   title: 'Dark Horizon',       meta: '2024 · 18+ · 2h 14m · Action · Sci-Fi',   desc: 'A rogue AI seizes Earth\'s defense grid. One disgraced astronaut stands between humanity and extinction.', youtube: 'NIJFpgU18gY' },
  { img: 'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',    badge: 'Top Pick',      title: 'Neon Requiem',        meta: '2023 · 18+ · 1h 58m · Crime · Neo-Noir',   desc: 'In a rain-soaked city of neon and shadows, a detective unravels a conspiracy that goes all the way to the top.', youtube: '2P2QttzbqAU' },
  { img: 'https://tse1.mm.bing.net/th/id/OIP.4UBmzySch2WW1TpzuNjy6wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',   badge: 'Must Watch',    title: 'Phantom Protocol',    meta: '2023 · 16+ · 2h 02m · Spy · Thriller',     desc: 'A ghost operative is pulled back into the field for one final mission — but nothing is what it seems.', youtube: 'QJGvMtYIDu8' },
  { img: 'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',  badge: 'New Release',   title: 'Echoes of Tomorrow',  meta: '2024 · 13+ · 1h 52m · Sci-Fi · Mystery',   desc: 'When a scientist discovers she can rewrite her past, she must decide how far she\'s willing to go.', youtube: '5KESiLdE5uU' },
  { img: 'https://th.bing.com/th/id/OIP.ZyTIt0Ts9HNz1WvrSYkrvQHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', badge: 'Fan Favourite', title: 'The Deep',            meta: '2022 · 18+ · 1h 44m · Horror · Sci-Fi',    desc: 'A deep-sea research crew awakens something ancient and terrifying in the darkest trench on Earth.', youtube: 'Pic2cThP7mU' },
];

const sliderTrack   = document.getElementById('sliderTrack');
const sliderContent = document.getElementById('sliderContent');
const sliderDots    = document.getElementById('sliderDots');
const sliderPrev    = document.getElementById('sliderPrev');
const sliderNext    = document.getElementById('sliderNext');
let current = 0, autoTimer;

slides.forEach((s, i) => {
  const bg = document.createElement('div');
  bg.className = 'slider-bg' + (i === 0 ? ' active' : '');
  bg.style.backgroundImage = `url('${s.img}')`;
  sliderTrack.appendChild(bg);

  const info = document.createElement('div');
  info.className = 'slide-info' + (i === 0 ? ' active' : '');
  info.innerHTML = `
    <span class="slide-badge">${s.badge}</span>
    <h1 class="slide-title">${s.title}</h1>
    <p class="slide-meta">${s.meta}</p>
    <p class="slide-desc">${s.desc}</p>
    <div class="slide-actions">
      <button class="btn btn-primary" onclick="openSliderPlayer('${s.youtube}','${s.title}')">&#9654; Play Now</button>
      <button class="btn btn-secondary">+ My List</button>
    </div>`;
  sliderContent.appendChild(info);

  const dot = document.createElement('button');
  dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  sliderDots.appendChild(dot);
});

function goTo(index) {
  document.querySelectorAll('.slider-bg').forEach((el,i) => el.classList.toggle('active', i===index));
  document.querySelectorAll('.slide-info').forEach((el,i) => el.classList.toggle('active', i===index));
  document.querySelectorAll('.slider-dot').forEach((el,i) => el.classList.toggle('active', i===index));
  current = index;
}
function nextSlide() { goTo((current+1) % slides.length); }
function prevSlide() { goTo((current-1+slides.length) % slides.length); }
sliderNext.addEventListener('click', () => { nextSlide(); clearInterval(autoTimer); autoTimer = setInterval(nextSlide,5000); });
sliderPrev.addEventListener('click', () => { prevSlide(); clearInterval(autoTimer); autoTimer = setInterval(nextSlide,5000); });
autoTimer = setInterval(nextSlide, 5000);

// ── Player ──
function openSliderPlayer(youtubeId, title) {
  if (!youtubeId) return;
  const modal  = document.getElementById('playerModal');
  const iframe = document.getElementById('playerIframe');
  const video  = document.getElementById('playerVideo');
  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  iframe.style.display = 'block';
  video.style.display  = 'none';
  document.getElementById('playerTitle').textContent = title || '';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.getElementById('playerClose').addEventListener('click', () => {
  const modal  = document.getElementById('playerModal');
  const iframe = document.getElementById('playerIframe');
  const video  = document.getElementById('playerVideo');
  iframe.src = ''; video.src = '';
  modal.classList.remove('active');
  document.body.style.overflow = '';
});
document.getElementById('playerModal').addEventListener('click', e => {
  if (e.target === document.getElementById('playerModal')) document.getElementById('playerClose').click();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.getElementById('playerClose').click(); });

// ── Navbar ──
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const navbar      = document.querySelector('.navbar');
const navAccount  = document.getElementById('navAccount');
const avatarBtn   = document.getElementById('avatarBtn');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 10));
document.addEventListener('click', e => {
  if (!e.target.closest('#navAccount')) navAccount.classList.remove('open');
});

// ── Category Navigation ──
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    const genre = card.querySelector('span').textContent.trim();
    // Find section with h2 containing the genre
    const sections = document.querySelectorAll('section.featured .section-title');
    for (const title of sections) {
      if (title.textContent.includes(genre)) {
        title.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      }
    }
  });
});

// ── Search ──
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
    if (wrap.classList.contains('active')) setTimeout(() => input.focus(), 50);
    else { input.value = ''; hideResults(); }
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

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { wrap.classList.remove('active'); input.value = ''; hideResults(); }
  });

  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) { wrap.classList.remove('active'); input.value = ''; hideResults(); }
  });

  function highlight(text, q) {
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return text.slice(0,idx) + '<mark style="background:#e50914;color:#fff;border-radius:2px;padding:0 1px">' + text.slice(idx, idx+q.length) + '</mark>' + text.slice(idx+q.length);
  }

  function showResults(hits, q) {
    results.innerHTML = '';
    if (!hits.length) {
      results.innerHTML = `<p class="sv-no-results">No results for "<strong style="color:#fff">${q}</strong>"</p>`;
      results.classList.add('show'); return;
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
      item.addEventListener('click', () => { input.value = movie.title; hideResults(); });
      if (movie.youtube) {
        item.querySelector('.sv-result-play').addEventListener('click', e => {
          e.stopPropagation(); hideResults(); wrap.classList.remove('active'); input.value = '';
          openSliderPlayer(movie.youtube, movie.title);
        });
      }
      results.appendChild(item);
    });
    results.classList.add('show');
  }

  function hideResults() { results.classList.remove('show'); results.innerHTML = ''; }
})();
function renderDropdown(results) {
  searchDropdown.innerHTML = '';
  if (!results.length) { searchDropdown.innerHTML = '<p class="search-no-results">No titles found</p>'; }
  else {
    results.slice(0,8).forEach(movie => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.style.cursor = 'pointer';
      item.innerHTML = `
        <img class="result-thumb" src="${movie.img}" alt="${movie.title}" />
        <div class="result-info">
          <span class="result-title">${movie.title}</span>
          <span class="result-meta">${movie.year} · ${movie.genre}</span>
        </div>
        ${movie.youtube ? `<button class="result-play-btn">&#9654;</button>` : ''}`;
      item.addEventListener('click', () => { searchInput.value = movie.title; closeDropdown(); });
      if (movie.youtube) {
        item.querySelector('.result-play-btn').addEventListener('click', e => {
          e.stopPropagation(); closeDropdown();
          openSliderPlayer(movie.youtube, movie.title);
        });
      }
      searchDropdown.appendChild(item);
    });
  }
  searchDropdown.classList.add('visible');
}
function closeDropdown() { searchDropdown.classList.remove('visible'); searchDropdown.innerHTML = ''; }

// ── Generic card renderer ──
function renderAdvCards(containerId, movies) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'adv-card';
    card.innerHTML = `
      <img class="adv-thumb" src="${movie.img}" alt="${movie.title}" loading="lazy" />
      <div class="adv-body">
        <div>
          ${movie.badge ? `<span class="adv-badge">${movie.badge}</span>` : ''}
          <p class="adv-title">${movie.title}</p>
          <p class="adv-meta">${movie.year} &nbsp;·&nbsp; ${movie.genre}</p>
        </div>
        <div class="adv-rating-row">
          <div class="adv-rating-bar"><div class="adv-rating-fill" style="width:${(movie.rating/5)*100}%"></div></div>
          <span class="adv-rating-val">⭐ ${movie.rating}</span>
        </div>
        <div class="adv-actions">
          <button class="adv-btn play">▶ Play</button>
          <button class="adv-btn list">+ List</button>
        </div>
      </div>`;
    card.querySelector('.adv-btn.play').addEventListener('click', e => {
      e.stopPropagation();
      openSliderPlayer(movie.youtube, movie.title);
    });
    grid.appendChild(card);
  });
}

// ── Adventure ──
renderAdvCards('adventureGrid', [
  { title:'Wildfire',          genre:'Drama · Adventure',   year:2022, rating:'4.4', badge:null,       img:'https://tse4.mm.bing.net/th/id/OIP.yPR6Phs6mXP_fJRtNH80PgHaK4?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'kVmC0ktznNo' },
  { title:'The Deep',          genre:'Adventure · Sci-Fi',  year:2022, rating:'4.3', badge:null,       img:'https://th.bing.com/th/id/OIP.ZyTIt0Ts9HNz1WvrSYkrvQHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'Pic2cThP7mU' },
  { title:'Starfall',          genre:'Fantasy · Adventure', year:2024, rating:'4.7', badge:'Hot',      img:'https://tse1.mm.bing.net/th/id/OIP.2f2TV9iFHUFE4LP0VC8-tgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'ByXuk9QqQkk' },
  { title:'Dark Horizon',      genre:'Action · Adventure',  year:2024, rating:'4.9', badge:'Trending', img:'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'NIJFpgU18gY' },
  { title:'Crimson Tide II',   genre:'Action · War',        year:2024, rating:'4.5', badge:'Sequel',   img:'https://th.bing.com/th?id=OIF.IH1uZTLGw%2bvR8yEsWkl61Q&rs=1&pid=ImgDetMain&o=7&rm=3',          youtube:'JNiK-rfzZPE' },
  { title:'Echoes of Tomorrow',genre:'Sci-Fi · Adventure',  year:2024, rating:'4.8', badge:'New',      img:'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'5KESiLdE5uU' },
]);

// ── Comedy ──
renderAdvCards('comedyGrid', [
  { title:'The Grand Bluff',  genre:'Comedy · Crime',   year:2023, rating:'4.3', badge:'Fan Fav', img:'https://www.francetvpro.fr/sites/default/files/styles/crop_format_bandeau/public/telechargements/images/LE%20GRAND%20BLUFF%20Bande%20annonce%20(2024)%20Vanessa%20Feuillatte%2C%20Nahid%20Abdourraquib.jpg.webp?itok=1Z_lKCSO',    youtube:'hY7m5jjJ9mM' },
  { title:'Laugh Track',      genre:'Comedy · Drama',   year:2024, rating:'4.1', badge:'New',     img:'https://tse3.mm.bing.net/th/id/OIP.ThkJiM7rc7QWUJG9QWMUtgHaEp?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube:'ZSS5dEeMX64' },
  { title:'Office Chaos',     genre:'Comedy · Satire',  year:2023, rating:'4.5', badge:null,      img:'https://tse2.mm.bing.net/th/id/OIP.GhWWKbvEEC8nbdyubfUn9QHaEO?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'rRgTMs_bGuQ' },
  { title:'Totally Normal',   genre:'Comedy · Romance', year:2022, rating:'4.0', badge:null,      img:'https://tse4.mm.bing.net/th/id/OIP.CXAs2P5G-zrwvumFhZ40YQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'KAOdjqyG37A' },
  { title:'The Wrong Address',genre:'Comedy · Mystery', year:2024, rating:'4.2', badge:'Hot',     img:'https://tse3.mm.bing.net/th/id/OIP.ziRhzDFcUMSSvLhx_RX9ggHaFU?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'dQw4w9WgXcQ' },
  { title:'Accidental Hero',  genre:'Comedy · Action',  year:2023, rating:'4.4', badge:null,      img:'https://tse2.mm.bing.net/th/id/OIP.ODQZX96xLQ045DpO2reRtAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',youtube:'BQ0mxQXmLsk' },
]);

// ── Action ──
renderAdvCards('actionGrid', [
  { title:'Dark Horizon',     genre:'Action · Sci-Fi',  year:2024, rating:'4.9', badge:'Trending', img:'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'NIJFpgU18gY' },
  { title:'Crimson Tide II',  genre:'Action · War',     year:2024, rating:'4.5', badge:'Sequel',   img:'https://th.bing.com/th?id=OIF.IH1uZTLGw%2bvR8yEsWkl61Q&rs=1&pid=ImgDetMain&o=7&rm=3',          youtube:'JNiK-rfzZPE' },
  { title:'Phantom Protocol', genre:'Action · Spy',     year:2023, rating:'4.5', badge:null,       img:'https://tse1.mm.bing.net/th/id/OIP.4UBmzySch2WW1TpzuNjy6wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'QJGvMtYIDu8' },
  { title:'Starfall',         genre:'Action · Fantasy', year:2024, rating:'4.7', badge:'Hot',      img:'https://tse1.mm.bing.net/th/id/OIP.2f2TV9iFHUFE4LP0VC8-tgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'ByXuk9QqQkk' },
  { title:'Broken Circuit',   genre:'Action · Cyber',   year:2023, rating:'4.6', badge:'New',      img:'https://tse3.mm.bing.net/th/id/OIP.XxTVBzIzv_J08HvpA9qVAAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'PXLkapBHD5w' },
  { title:'Wildfire',         genre:'Action · Drama',   year:2022, rating:'4.4', badge:null,       img:'https://tse4.mm.bing.net/th/id/OIP.yPR6Phs6mXP_fJRtNH80PgHaK4?rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'kVmC0ktznNo' },
]);

// ── Sci-Fi ──
renderAdvCards('scifiGrid', [
  { title:'Dark Horizon',       genre:'Sci-Fi · Action',    year:2024, rating:'4.9', badge:'Trending', img:'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'NIJFpgU18gY' },
  { title:'Echoes of Tomorrow', genre:'Sci-Fi · Mystery',   year:2024, rating:'4.8', badge:'New',      img:'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'5KESiLdE5uU' },
  { title:'The Deep',           genre:'Sci-Fi · Horror',    year:2022, rating:'4.3', badge:null,       img:'https://th.bing.com/th/id/OIP.ZyTIt0Ts9HNz1WvrSYkrvQHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'Pic2cThP7mU' },
  { title:'Broken Circuit',     genre:'Sci-Fi · Cyberpunk', year:2023, rating:'4.6', badge:'New',      img:'https://tse3.mm.bing.net/th/id/OIP.XxTVBzIzv_J08HvpA9qVAAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'PXLkapBHD5w' },
  { title:'Starfall',           genre:'Sci-Fi · Fantasy',   year:2024, rating:'4.7', badge:'Hot',      img:'https://tse1.mm.bing.net/th/id/OIP.2f2TV9iFHUFE4LP0VC8-tgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'ByXuk9QqQkk' },
  { title:'The Last Signal',    genre:'Sci-Fi · Thriller',  year:2023, rating:'4.6', badge:null,       img:'https://tse2.mm.bing.net/th/id/OIP.7ZgswEd3JEtEVKYzjWSlywHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'vOUVVDWdXbo' },
]);

// ── Fantasy ──
renderAdvCards('fantasyGrid', [
  { title:'Starfall',           genre:'Fantasy · Action',    year:2024, rating:'4.7', badge:'Hot',      img:'https://tse1.mm.bing.net/th/id/OIP.2f2TV9iFHUFE4LP0VC8-tgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'ByXuk9QqQkk' },
  { title:'Echoes of Tomorrow', genre:'Fantasy · Mystery',   year:2024, rating:'4.8', badge:'New',      img:'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'5KESiLdE5uU' },
  { title:'Neon Requiem',       genre:'Fantasy · Neo-Noir',  year:2023, rating:'4.7', badge:'Top Pick', img:'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'2P2QttzbqAU' },
  { title:'The Last Signal',    genre:'Fantasy · Thriller',  year:2023, rating:'4.6', badge:null,       img:'https://tse2.mm.bing.net/th/id/OIP.7ZgswEd3JEtEVKYzjWSlywHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'vOUVVDWdXbo' },
  { title:'Wildfire',           genre:'Fantasy · Adventure', year:2022, rating:'4.4', badge:null,       img:'https://tse4.mm.bing.net/th/id/OIP.yPR6Phs6mXP_fJRtNH80PgHaK4?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'kVmC0ktznNo' },
  { title:'Dark Horizon',       genre:'Fantasy · Sci-Fi',    year:2024, rating:'4.9', badge:'Trending', img:'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'NIJFpgU18gY' },
]);

// ── Western ──
renderAdvCards('westernGrid', [
  { title: 'The Harder They Fall',  genre: 'Western · Action',    year: 2021, rating: '4.8', badge: 'Top Pick', img: 'https://cdn.mos.cms.futurecdn.net/2WxoEqA422BR54rFhNZsja-1200-80.jpg', youtube: 'J50ALgqS6cM' },
  { title: 'Old Henry',             genre: 'Western · Action',    year: 2021, rating: '4.7', badge: 'Gritty',   img: 'https://th.bing.com/th/id/R.d4ba2c04fa373d007d55c63526c5277d?rik=hRd4r0eMEAcuqw&pid=ImgRaw&r=0', youtube: 'n1sucYeSVc8' },
  { title: 'Horizon: Am. Saga',     genre: 'Western · Drama',     year: 2024, rating: '4.6', badge: 'New',      img: 'https://www.slashfilm.com/img/gallery/horizon-an-american-saga-chapter-1-review-the-most-expensive-trailer-for-a-sequel-ever-made/intro-1718995039.jpg', youtube: '0pmLEu3pQiE' },
  { title: 'Django Unchained',      genre: 'Western · Action',    year: 2012, rating: '4.9', badge: 'Classic',  img: 'https://image.tmdb.org/t/p/original/ltkWGokEIToUYyoUqc6PBI1kHPx.jpg', youtube: '0fUCuvNlOCg' },
  { title: 'The Revenant',          genre: 'Western · Adventure', year: 2015, rating: '4.8', badge: 'Epic',     img: 'https://tse2.mm.bing.net/th/id/OIP.5fkKLhGcDBG43b8cam1nfAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', youtube: 'LoebZZ8K5N0' },
  { title: 'Hell or High Water',    genre: 'Western · Crime',     year: 2016, rating: '4.7', badge: 'Must-See', img: 'https://tse2.mm.bing.net/th/id/OIP.VgrLo5eurfEaAwcpcRBXMgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', youtube: 'JQoqsKoJVDw' },
]);

// ── Trailers ──
renderAdvCards('trailersGrid', [
  { title:'Dark Horizon',       genre:'Action · Sci-Fi',   year:2024, rating:'4.9', badge:'Official Trailer', img:'https://tse3.mm.bing.net/th/id/OIP.cN-RSRUO83lwievUuYSI5QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'NIJFpgU18gY' },
  { title:'Neon Requiem',       genre:'Crime · Neo-Noir',  year:2023, rating:'4.7', badge:'Official Trailer', img:'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube:'2P2QttzbqAU' },
  { title:'Phantom Protocol',   genre:'Spy · Thriller',    year:2023, rating:'4.5', badge:'Teaser',           img:'https://tse1.mm.bing.net/th/id/OIP.4UBmzySch2WW1TpzuNjy6wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'QJGvMtYIDu8' },
  { title:'Echoes of Tomorrow', genre:'Sci-Fi · Mystery',  year:2024, rating:'4.8', badge:'Official Trailer', img:'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'5KESiLdE5uU' },
  { title:'The Deep',           genre:'Horror · Sci-Fi',   year:2022, rating:'4.3', badge:'Official Trailer', img:'https://th.bing.com/th/id/OIP.ZyTIt0Ts9HNz1WvrSYkrvQHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',youtube:'Pic2cThP7mU' },
  { title:'Crimson Tide II',    genre:'Action · War',      year:2024, rating:'4.5', badge:'Final Trailer',    img:'https://th.bing.com/th?id=OIF.IH1uZTLGw%2bvR8yEsWkl61Q&rs=1&pid=ImgDetMain&o=7&rm=3',          youtube:'JNiK-rfzZPE' },
]);

// ── Drama ──
renderAdvCards('dramaGrid', [
  { title:'Wildfire',           genre:'Drama · Adventure', year:2022, rating:'4.4', badge:null,       img:'https://tse4.mm.bing.net/th/id/OIP.yPR6Phs6mXP_fJRtNH80PgHaK4?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'kVmC0ktznNo' },
  { title:'The Last Signal',    genre:'Drama · Thriller',  year:2023, rating:'4.6', badge:null,       img:'https://tse2.mm.bing.net/th/id/OIP.7ZgswEd3JEtEVKYzjWSlywHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'vOUVVDWdXbo' },
  { title:'Broken Circuit',     genre:'Drama · Cyberpunk', year:2023, rating:'4.6', badge:'New',      img:'https://tse3.mm.bing.net/th/id/OIP.XxTVBzIzv_J08HvpA9qVAAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'PXLkapBHD5w' },
  { title:'Neon Requiem',       genre:'Drama · Neo-Noir',  year:2023, rating:'4.7', badge:'Top Pick', img:'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube:'2P2QttzbqAU' },
  { title:'Echoes of Tomorrow', genre:'Drama · Sci-Fi',    year:2024, rating:'4.8', badge:'New',      img:'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', youtube:'5KESiLdE5uU' },
  { title:'Crimson Tide II',    genre:'Drama · War',       year:2024, rating:'4.5', badge:'Sequel',   img:'https://th.bing.com/th?id=OIF.IH1uZTLGw%2bvR8yEsWkl61Q&rs=1&pid=ImgDetMain&o=7&rm=3',          youtube:'JNiK-rfzZPE' },
]);

// ── Auth Session ──
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

avatarBtn.addEventListener('click', e => { e.stopPropagation(); navAccount.classList.toggle('open'); });
