// tvshows-page.js — Tv Shows.html script

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
});

// ── SV Search ──
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
];

(function () {
  const wrap    = document.getElementById('svSearch');
  const btn     = document.getElementById('svSearchBtn');
  const input   = document.getElementById('svSearchInput');
  const results = document.getElementById('svSearchResults');
  if (!wrap || !btn || !input || !results) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    wrap.classList.toggle('active');
    if (wrap.classList.contains('active')) setTimeout(() => input.focus(), 50);
    else { input.value = ''; hideResults(); }
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { hideResults(); return; }
    showResults(MOVIES_DB.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.genre.toLowerCase().includes(q) ||
      String(m.year).includes(q)
    ), q);
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
    return text.slice(0,idx) + '<mark style="background:#e50914;color:#fff;border-radius:2px;padding:0 1px">' + text.slice(idx,idx+q.length) + '</mark>' + text.slice(idx+q.length);
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
    hits.slice(0,10).forEach(movie => {
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
      results.appendChild(item);
    });
    results.classList.add('show');
  }

  function hideResults() { results.classList.remove('show'); results.innerHTML = ''; }
})();

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

// ── TV Hero Player ──
function openTvPlayer(youtubeId, title, start) {
  const modal  = document.getElementById('playerModal');
  const iframe = document.getElementById('playerIframe');
  const video  = document.getElementById('playerVideo');
  if (!modal) return;
  const startParam = start ? `&start=${start}` : '';
  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1${startParam}`;
  iframe.style.display = 'block';
  video.style.display  = 'none';
  document.getElementById('playerTitle').textContent = title;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTvPlayer() {
  const modal  = document.getElementById('playerModal');
  const iframe = document.getElementById('playerIframe');
  const video  = document.getElementById('playerVideo');
  iframe.src = ''; video.src = '';
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('tvPlayBtn')?.addEventListener('click', () =>
  openTvPlayer('NIJFpgU18gY', 'Echoes of the Grid – S2 E8: The Fracture'));

document.getElementById('tvPreviewPlay')?.addEventListener('click', () =>
  openTvPlayer('NIJFpgU18gY', 'Echoes of the Grid – Preview'));

document.getElementById('playerClose')?.addEventListener('click', closeTvPlayer);
document.getElementById('playerModal')?.addEventListener('click', e => {
  if (e.target === document.getElementById('playerModal')) closeTvPlayer();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTvPlayer(); });

// ── TV Image Slider ──
const tvShows = [
  {
    img: 'https://tse2.mm.bing.net/th/id/OIP.PAxdeW_4Ns6Fidv13iwSTQHaEO?rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Season 2 · New Episode',
    title: 'Romance',
    meta: '2024 · TV-MA · Sci-Fi · Thriller · ⭐ 9.2',
    youtube: 'NIJFpgU18gY',
  },
  {
    img: 'https://tse2.mm.bing.net/th/id/OIP.3tJPYOwppYUBdPC_1sPpGAHaE9?rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Top Rated',
    title: 'Horror',
    meta: '2023 · TV-14 · Crime · Drama · ⭐ 8.8',
    youtube: '2P2QttzbqAU',
  },
  {
    img: 'https://th.bing.com/th/id/R.bdfcb491147a63c0981fe9ca15b410ec?rik=DpAIkeCyRTE4QQ&pid=ImgRaw&r=0',
    badge: 'Fan Favourite',
    title: 'SCI-FI',
    meta: '2023 · TV-MA · Thriller · Mystery · ⭐ 9.0',
    youtube: 'QJGvMtYIDu8',
  },
  {
    img: 'https://tse2.mm.bing.net/th/id/OIP.RcMNQM9Xc1wCkE0TI0tqgwHaET?rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'New Series',
    title: 'Game Shows',
    meta: '2024 · TV-PG · Sci-Fi · Adventure · ⭐ 8.6',
    youtube: '5KESiLdE5uU',
  },
  {
    img: 'https://assets.vogue.com/photos/5a01d1c79c1319291916b141/16:9/w_1280,c_limit/00-social-image-best-documentaries.jpg',
    badge: 'Trending',
    title: 'Documentaries',
    meta: '2024 · TV-MA · Horror · Drama · ⭐ 8.9',
    youtube: 'Pic2cThP7mU',
  },
];

const tvTrack = document.getElementById('tvSliderTrack');
const tvDots  = document.getElementById('tvSliderDots');
const tvPrev  = document.getElementById('tvSliderPrev');
const tvNext  = document.getElementById('tvSliderNext');
let tvCurrent = 0, tvTimer;

tvShows.forEach((show, i) => {
  const slide = document.createElement('div');
  slide.className = 'tv-slide';
  slide.innerHTML = `
    <img src="${show.img}" alt="${show.title}" loading="lazy" />
    <div class="tv-slide-overlay"></div>
    <div class="tv-slide-content">
      <span class="tv-slide-badge">${show.badge}</span>
      <h2 class="tv-slide-title">${show.title}</h2>
      <p class="tv-slide-meta">${show.meta}</p>
      <div class="tv-slide-actions">
        <button class="btn btn-primary" onclick="openTvPlayer('${show.youtube}','${show.title}')">&#9654; Watch Now</button>
        <button class="btn btn-secondary">+ My List</button>
      </div>
    </div>
  `;
  tvTrack.appendChild(slide);

  const dot = document.createElement('button');
  dot.className = 'tv-slider-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => { tvGoTo(i); tvResetTimer(); });
  tvDots.appendChild(dot);
});

function tvGoTo(index) {
  tvCurrent = index;
  tvTrack.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll('.tv-slider-dot').forEach((d, i) => d.classList.toggle('active', i === index));
}

function tvResetTimer() {
  clearInterval(tvTimer);
  tvTimer = setInterval(() => tvGoTo((tvCurrent + 1) % tvShows.length), 5000);
}

tvNext.addEventListener('click', () => { tvGoTo((tvCurrent + 1) % tvShows.length); tvResetTimer(); });
tvPrev.addEventListener('click', () => { tvGoTo((tvCurrent - 1 + tvShows.length) % tvShows.length); tvResetTimer(); });
tvTimer = setInterval(() => tvGoTo((tvCurrent + 1) % tvShows.length), 5000);

// ── Documentaries ──
const docsShows = [
  { title: 'Our Planet',          genre: 'Nature · Documentary',   year: 2023, rating: '4.9', badge: 'Top Pick', img: 'https://th.bing.com/th/id/OIP.b6RqZm6_FRyz9PNoj5eXqgHaEo?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',  youtube: 'cTQ3Ko9ZKg8' },
  { title: 'The Last Ocean',      genre: 'Environment · Doc',      year: 2022, rating: '4.7', badge: null,       img: 'https://th.bing.com/th/id/OIP.OSTgDn5uO1wBBaTVCUtE-gHaEW?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',  youtube: 'TQLAnOdnzdk' },
  { title: 'Inside the Mind',     genre: 'Science · Documentary',  year: 2024, rating: '4.8', badge: 'New',      img: 'https://tse3.mm.bing.net/th/id/OIP.wofVKjAXX-WZG-1sSL4figHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: 'uYMbQPWN-YU' },
  { title: 'War & Truth',         genre: 'History · Documentary',  year: 2023, rating: '4.6', badge: null,       img: 'https://th.bing.com/th/id/OIP.y0-UdxS4kFYbzXbYsSs1GAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',  youtube: 'qSNvIt8OqYE' },
  { title: 'Human Kind',          genre: 'Society · Documentary',  year: 2024, rating: '4.7', badge: 'Trending', img: 'https://tse3.mm.bing.net/th/id/OIP.AjPq51eg6SHIebe-Oml9lwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',      youtube: 'bXz2rkattBw' },
  { title: 'The Food Chain',      genre: 'Food · Documentary',     year: 2022, rating: '4.5', badge: null,       img: 'https://th.bing.com/th/id/OIP.xXDygXmZI23XmW5-HJdDIwHaGh?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: '5Z8rKhXUYAg' },
];

const docsGrid = document.getElementById('docsGrid');
if (docsGrid) {
  docsShows.forEach(show => {
    const card = document.createElement('div');
    card.className = 'adv-card';
    card.innerHTML = `
      <img class="adv-thumb" src="${show.img}" alt="${show.title}" loading="lazy" />
      <div class="adv-body">
        <div>
          ${show.badge ? `<span class="adv-badge">${show.badge}</span>` : ''}
          <p class="adv-title">${show.title}</p>
          <p class="adv-meta">${show.year} &nbsp;·&nbsp; ${show.genre}</p>
        </div>
        <div class="adv-rating-row">
          <div class="adv-rating-bar"><div class="adv-rating-fill" style="width:${(show.rating/5)*100}%"></div></div>
          <span class="adv-rating-val">⭐ ${show.rating}</span>
        </div>
        <div class="adv-actions">
          <button class="adv-btn play" ${!show.youtube ? 'disabled style="opacity:.4"' : ''}>▶ Watch</button>
          <button class="adv-btn list">+ List</button>
        </div>
      </div>
    `;
    const playBtn = card.querySelector('.adv-btn.play');
    playBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (show.youtube) openTvPlayer(show.youtube, show.title);
    });
    docsGrid.appendChild(card);
  });
}

// ── Music Shows ──
const musicShows = [
  { title: 'The Stage',         genre: 'Music · Reality',      year: 2024, rating: '4.7', badge: 'New',      img: 'https://static.vecteezy.com/system/resources/previews/020/832/319/large_2x/empty-stage-of-the-theater-simple-minimalist-with-front-view-and-copy-space-lit-by-spotlights-and-smoke-before-the-performance-free-photo.jpg',        youtube: 'ju6Q_0jXFE0' },
  { title: 'Beat Drop',         genre: 'Music · Competition',  year: 2023, rating: '4.5', badge: null,       img: 'https://tse2.mm.bing.net/th/id/OIP.37RW5Dh0AoIT3qnQ9vVfxgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',        youtube: 'JdToBXtffL0' },
  { title: 'Unplugged Live',    genre: 'Music · Concert',      year: 2024, rating: '4.8', badge: 'Top Pick', img: 'https://tse3.mm.bing.net/th/id/OIP.g4PVwPXSs1EsOEjYo1jKTAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: 'O-fyNgHdmLI' },
  { title: 'Chart Breakers',    genre: 'Music · Talk Show',    year: 2023, rating: '4.4', badge: null,       img: 'https://tse1.mm.bing.net/th/id/OIP.BmGHGjDz1zDZs2JkufvzlwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',   youtube: '4pi1euN2zJg' },
  { title: 'Soul Sessions',     genre: 'Music · Documentary',  year: 2022, rating: '4.6', badge: null,       img: 'https://th.bing.com/th/id/R.ebcd6abfbeaed0dfd132739f59ee47e7?rik=usEL%2bqFKfKKAog&riu=http%3a%2f%2fwww.native-instruments.com%2fuploads%2fmedia%2fSoul-Session-product-page-00-social-share.jpg&ehk=6l5B3Pt237mMHxPxLGvs6Mz5NtxdqIuCuWdMri91cOQ%3d&risl=&pid=ImgRaw&r=0',    youtube: 'P5BZdg2aRVA' },
  { title: 'The Remix Battle',  genre: 'Music · Competition',  year: 2024, rating: '4.5', badge: 'Hot',      img: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2024/11/fortniteremixthefinale.jpg',     youtube: 'P1hfFablPBg' },
];

const musicGrid = document.getElementById('musicGrid');
if (musicGrid) {
  musicShows.forEach(show => {
    const card = document.createElement('div');
    card.className = 'adv-card';
    card.innerHTML = `
      <img class="adv-thumb" src="${show.img}" alt="${show.title}" loading="lazy" />
      <div class="adv-body">
        <div>
          ${show.badge ? `<span class="adv-badge">${show.badge}</span>` : ''}
          <p class="adv-title">${show.title}</p>
          <p class="adv-meta">${show.year} &nbsp;·&nbsp; ${show.genre}</p>
        </div>
        <div class="adv-rating-row">
          <div class="adv-rating-bar"><div class="adv-rating-fill" style="width:${(show.rating/5)*100}%"></div></div>
          <span class="adv-rating-val">⭐ ${show.rating}</span>
        </div>
        <div class="adv-actions">
          <button class="adv-btn play" ${!show.youtube ? 'disabled style="opacity:.4"' : ''}>▶ Watch</button>
          <button class="adv-btn list">+ List</button>
        </div>
      </div>
    `;
    const playBtn = card.querySelector('.adv-btn.play');
    playBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (show.youtube) openTvPlayer(show.youtube, show.title, show.start);
    });
    musicGrid.appendChild(card);
  });
}

// ── Membership Modal ──
const membershipBtn   = document.getElementById('membershipBtn');
const membershipModal = document.getElementById('membershipModal');
const membershipClose = document.getElementById('membershipClose');
const membershipForm  = document.getElementById('membershipForm');
const memErr          = document.getElementById('memErr');
const cancelModal     = document.getElementById('cancelModal');

function openModal(modal)  { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeModal(modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }

membershipBtn?.addEventListener('click', e => { e.preventDefault(); openModal(membershipModal); });
membershipClose?.addEventListener('click', () => closeModal(membershipModal));
membershipModal?.addEventListener('click', e => { if (e.target === membershipModal) closeModal(membershipModal); });

// Cancel membership
document.getElementById('cancelMembershipBtn')?.addEventListener('click', e => { e.preventDefault(); openModal(cancelModal); });
document.getElementById('cancelClose')?.addEventListener('click', () => closeModal(cancelModal));
cancelModal?.addEventListener('click', e => { if (e.target === cancelModal) closeModal(cancelModal); });
document.getElementById('keepMembershipBtn')?.addEventListener('click', () => closeModal(cancelModal));
document.getElementById('confirmCancelBtn')?.addEventListener('click', () => {
  localStorage.removeItem('sv_session');
  closeModal(cancelModal);
  alert('Your membership has been cancelled. You can rejoin anytime.');
});

// Plan selection
document.querySelectorAll('.nf-plan').forEach(plan => {
  plan.addEventListener('click', () => {
    document.querySelectorAll('.nf-plan').forEach(p => p.classList.remove('active'));
    plan.classList.add('active');
  });
});

membershipForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name     = document.getElementById('memName').value.trim();
  const email    = document.getElementById('memEmail').value.trim();
  const password = document.getElementById('memPassword').value;
  const plan     = document.querySelector('.nf-plan.active')?.dataset.plan || 'free';

  if (!name || !email || !email.includes('@') || password.length < 6) {
    memErr.textContent = 'Please fill in all fields correctly (min 6 char password).';
    return;
  }

  const users = JSON.parse(localStorage.getItem('sv_users') || '[]');
  if (users.find(u => u.email === email.toLowerCase())) {
    memErr.textContent = 'An account with this email already exists.';
    return;
  }

  // Show loading
  membershipForm.style.display = 'none';
  document.getElementById('nfPlanRow').style.display = 'none';
  document.querySelector('.membership-modal-header').style.display = 'none';
  document.querySelector('.mem-signin').style.display = 'none';
  document.getElementById('memLoading').style.display = 'block';

  setTimeout(() => {
    // Save session
    users.push({ name, email: email.toLowerCase(), password, plan });
    localStorage.setItem('sv_users', JSON.stringify(users));
    localStorage.setItem('sv_session', JSON.stringify({ name, email: email.toLowerCase(), plan }));

    // Show success
    document.getElementById('memLoading').style.display = 'none';
    document.getElementById('memSuccess').style.display = 'block';
  }, 2500);
});

document.getElementById('memSuccessClose')?.addEventListener('click', () => {
  closeModal(membershipModal);
  window.location.href = 'Movies.html';
});

// ── Reality Shows ──
const realityShows = [
  { title: 'Survival Island',    genre: 'Reality · Adventure',  year: 2024, rating: '4.6', badge: 'Trending', img: 'https://image.tmdb.org/t/p/original/pNsw71rQcCiRUknCOLHosuxPpew.jpg',   youtube: 'yLk8inSjrcc' },
  { title: 'The Real Deal',      genre: 'Reality · Drama',      year: 2023, rating: '4.4', badge: null,       img: 'https://tse1.mm.bing.net/th/id/OIP.5gqqJ5F4g-2X-bEntkqa9AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',     youtube: 'bIzNqXTcUgc' },
  { title: 'Love & Chaos',       genre: 'Reality · Romance',    year: 2024, rating: '4.5', badge: 'Hot',      img: 'https://tse4.mm.bing.net/th/id/OIP.w5-jciJHaUmfaQke4_C0xQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',    youtube: '4tsjCKbOaTc' },
  { title: 'Boss Level',         genre: 'Reality · Competition',year: 2023, rating: '4.3', badge: null,       img: 'https://tse4.mm.bing.net/th/id/OIP.hYzt3SXsF1CUYAYb9qGy0wHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',         youtube: 'LfRCwf1VtBE' },
  { title: 'House of Secrets',   genre: 'Reality · Mystery',    year: 2024, rating: '4.7', badge: 'New',      img: 'https://tse2.mm.bing.net/th/id/OIP.VG44nu1iNMHBe0WIsN5q0QHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3',  youtube: 'wpOMpEVAjWo' },
  { title: 'Wild & Free',        genre: 'Reality · Lifestyle',  year: 2022, rating: '4.2', badge: null,       img: 'https://tse3.mm.bing.net/th/id/OIP.3fKh2d867YExnWVaf2cdgAHaC0?rs=1&pid=ImgDetMain&o=7&rm=3',      youtube: 'tea0aJarTfk' },
];

const realityGrid = document.getElementById('realityGrid');
if (realityGrid) {
  realityShows.forEach(show => {
    const card = document.createElement('div');
    card.className = 'adv-card';
    card.innerHTML = `
      <img class="adv-thumb" src="${show.img}" alt="${show.title}" loading="lazy" />
      <div class="adv-body">
        <div>
          ${show.badge ? `<span class="adv-badge">${show.badge}</span>` : ''}
          <p class="adv-title">${show.title}</p>
          <p class="adv-meta">${show.year} &nbsp;·&nbsp; ${show.genre}</p>
        </div>
        <div class="adv-rating-row">
          <div class="adv-rating-bar"><div class="adv-rating-fill" style="width:${(show.rating/5)*100}%"></div></div>
          <span class="adv-rating-val">⭐ ${show.rating}</span>
        </div>
        <div class="adv-actions">
          <button class="adv-btn play" ${!show.youtube ? 'disabled style="opacity:.4"' : ''}>▶ Watch</button>
          <button class="adv-btn list">+ List</button>
        </div>
      </div>
    `;
    card.querySelector('.adv-btn.play').addEventListener('click', e => {
      e.stopPropagation();
      if (show.youtube) openTvPlayer(show.youtube, show.title);
    });
    realityGrid.appendChild(card);
  });
}

// ── Talent Shows ──
const talentShows = [
  { title: 'Got Talent Global',  genre: 'Talent · Competition', year: 2024, rating: '4.8', badge: 'Top Pick', img: 'https://i.ytimg.com/vi/xCi-EobWxrc/maxresdefault.jpg',        youtube: '6fwgZvfdIJ8' },
  { title: 'The Voice Stage',    genre: 'Talent · Music',       year: 2023, rating: '4.7', badge: null,       img: 'https://www.stageone.co.uk/wp-content/uploads/2023/01/The-Voice-4-830x570-1-600x412.jpeg',        youtube: 'l_OLUANWngI' },
  { title: 'Dance Off',          genre: 'Talent · Dance',       year: 2024, rating: '4.6', badge: 'Hot',      img: 'https://th.bing.com/th?id=OIF.KctgCbenXptLwDvM%2foiE0A&rs=1&pid=ImgDetMain&o=7&rm=3',          youtube: null },
  { title: 'Star Search',        genre: 'Talent · Variety',     year: 2023, rating: '4.5', badge: null,       img: 'https://tse2.mm.bing.net/th/id/OIP.2yOqF0Rl6942Yf5i-K1M0wHaDt?rs=1&pid=ImgDetMain&o=7&rm=3',        youtube: 'kYviByAYCbg' },
  { title: 'Rising Stars',       genre: 'Talent · Drama',       year: 2024, rating: '4.7', badge: 'New',      img: 'https://th.bing.com/th/id/R.6e633d41252b038ed4f24183d2799c3c?rik=AfWShjaFR%2fHdCg&riu=http%3a%2f%2fwww.tikonline.de%2fwp-content%2fuploads%2f2014%2f06%2frising-star-logo-gr.jpg&ehk=%2f9TJBs6TzDwg9XOs4APGImGUIVZWSCFCMDVccvM243M%3d&risl=&pid=ImgRaw&r=0',       youtube: '1oBBwMhZUYo' },
  { title: 'The Grand Audition', genre: 'Talent · Competition', year: 2022, rating: '4.4', badge: null,       img: 'https://tse2.mm.bing.net/th/id/OIP.6v6Mo9sJzldHtWiHX2iMNQHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3',     youtube: 'Pcftuvw2xrk' },
];

const talentGrid = document.getElementById('talentGrid');
if (talentGrid) {
  talentShows.forEach(show => {
    const card = document.createElement('div');
    card.className = 'adv-card';
    card.innerHTML = `
      <img class="adv-thumb" src="${show.img}" alt="${show.title}" loading="lazy" />
      <div class="adv-body">
        <div>
          ${show.badge ? `<span class="adv-badge">${show.badge}</span>` : ''}
          <p class="adv-title">${show.title}</p>
          <p class="adv-meta">${show.year} &nbsp;·&nbsp; ${show.genre}</p>
        </div>
        <div class="adv-rating-row">
          <div class="adv-rating-bar"><div class="adv-rating-fill" style="width:${(show.rating/5)*100}%"></div></div>
          <span class="adv-rating-val">⭐ ${show.rating}</span>
        </div>
        <div class="adv-actions">
          <button class="adv-btn play" ${!show.youtube ? 'disabled style="opacity:.4"' : ''}>▶ Watch</button>
          <button class="adv-btn list">+ List</button>
        </div>
      </div>
    `;
    card.querySelector('.adv-btn.play').addEventListener('click', e => {
      e.stopPropagation();
      if (show.youtube) openTvPlayer(show.youtube, show.title);
    });
    talentGrid.appendChild(card);
  });
}

// ── Talk Shows ──
const talkShows = [
  { title: 'The Late Shift',     genre: 'Talk · Comedy',        year: 2024, rating: '4.6', badge: 'New',      img: 'https://earlyaxes.co.za/wp-content/uploads/2018/04/Webp.net-compress-image.jpg',        youtube: 'ZKtVrzF-5q4' },
  { title: 'Morning Buzz',       genre: 'Talk · Lifestyle',     year: 2023, rating: '4.4', badge: null,       img: 'https://th.bing.com/th/id/R.a7cf824687dcf59c05497e14626c3432?rik=ZjS453ZfdtNmhA&pid=ImgRaw&r=0',       youtube: 'A5fK-noAjds' },
  { title: 'The Roundtable',     genre: 'Talk · News',          year: 2024, rating: '4.5', badge: 'Hot',      img: 'https://th.bing.com/th/id/OIP.8zOOQoDFAAYWfKf59fPCaAHaHY?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',         youtube: 'wFDpWQngRYc' },
  { title: 'Deep Conversations',  genre: 'Talk · Documentary',  year: 2023, rating: '4.7', badge: 'Top Pick', img: 'https://tse1.explicit.bing.net/th/id/OIP.RR6ladfs16UvosvrZW9H3wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',        youtube: 'HLVzEHGLF7Y' },
  { title: 'Celebrity Spotlight', genre: 'Talk · Entertainment',year: 2024, rating: '4.3', badge: null,       img: 'https://tse1.mm.bing.net/th/id/OIP._D7MBJBdjdMzfcZPlFjlDAHaD3?rs=1&pid=ImgDetMain&o=7&rm=3', youtube: 'djqOPR2_qT8' },
  { title: 'Open Mic Night',     genre: 'Talk · Comedy',        year: 2022, rating: '4.5', badge: null,       img: 'https://tse3.mm.bing.net/th/id/OIP.kWaMBZ5FMsFLPrZyDUVqJwHaJL?rs=1&pid=ImgDetMain&o=7&rm=3',           youtube: 'RFymHEN-jeM' },
];

const talkGrid = document.getElementById('talkGrid');
if (talkGrid) {
  talkShows.forEach(show => {
    const card = document.createElement('div');
    card.className = 'adv-card';
    card.innerHTML = `
      <img class="adv-thumb" src="${show.img}" alt="${show.title}" loading="lazy" />
      <div class="adv-body">
        <div>
          ${show.badge ? `<span class="adv-badge">${show.badge}</span>` : ''}
          <p class="adv-title">${show.title}</p>
          <p class="adv-meta">${show.year} &nbsp;·&nbsp; ${show.genre}</p>
        </div>
        <div class="adv-rating-row">
          <div class="adv-rating-bar"><div class="adv-rating-fill" style="width:${(show.rating/5)*100}%"></div></div>
          <span class="adv-rating-val">⭐ ${show.rating}</span>
        </div>
        <div class="adv-actions">
          <button class="adv-btn play" ${!show.youtube ? 'disabled style="opacity:.4"' : ''}>▶ Watch</button>
          <button class="adv-btn list">+ List</button>
        </div>
      </div>
    `;
    card.querySelector('.adv-btn.play').addEventListener('click', e => {
      e.stopPropagation();
      if (show.youtube) openTvPlayer(show.youtube, show.title);
    });
    talkGrid.appendChild(card);
  });
}
