// new-popular.js

// Navbar
var hamburger  = document.getElementById('hamburger');
var navLinks   = document.getElementById('navLinks');
var navbar     = document.querySelector('.navbar');
var navAccount = document.getElementById('navAccount');
var avatarBtn  = document.getElementById('avatarBtn');

hamburger.addEventListener('click', function() { navLinks.classList.toggle('open'); });
window.addEventListener('scroll', function() { navbar.classList.toggle('scrolled', window.scrollY > 10); });
avatarBtn.addEventListener('click', function(e) { e.stopPropagation(); navAccount.classList.toggle('open'); });
document.addEventListener('click', function(e) {
  if (!e.target.closest('#navAccount')) navAccount.classList.remove('open');
});

// Auth Session
(function() {
  var session = JSON.parse(localStorage.getItem('sv_session') || 'null');
  var avatar  = document.getElementById('avatarBtn');
  var nameEl  = document.querySelector('.account-name');
  var emailEl = document.querySelector('.account-email');
  if (session) {
    var ini = session.name.trim().split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
    if (avatar)  avatar.textContent  = ini;
    if (nameEl)  nameEl.textContent  = session.name;
    if (emailEl) emailEl.textContent = session.email;
  }
  var signout = document.querySelector('.account-signout');
  if (signout) {
    signout.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('sv_session');
      window.location.href = 'auth.html';
    });
  }
})();

// Player
function openPlayer(youtubeId, title) {
  var modal  = document.getElementById('playerModal');
  var iframe = document.getElementById('playerIframe');
  var video  = document.getElementById('playerVideo');
  iframe.src = 'https://www.youtube.com/embed/' + youtubeId + '?autoplay=1';
  iframe.style.display = 'block';
  video.style.display  = 'none';
  document.getElementById('playerTitle').textContent = title;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePlayer() {
  var modal  = document.getElementById('playerModal');
  var iframe = document.getElementById('playerIframe');
  var video  = document.getElementById('playerVideo');
  iframe.src = '';
  video.src  = '';
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('playerClose').addEventListener('click', closePlayer);
document.getElementById('playerModal').addEventListener('click', function(e) {
  if (e.target === document.getElementById('playerModal')) closePlayer();
});
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closePlayer(); });

// Hero Slider Data
var heroSlides = [
  {
    img: 'https://image.tmdb.org/t/p/original/wmO6JtcPHypiEFJat0dlBCDL5NW.jpg',
    badge: 'Trending #1 This Week',
    title: 'Dark Horizon',
    desc: 'A rogue AI awakens in deep space, forcing a crew of astronauts to make an impossible choice between survival and humanity.',
    meta: '2024 &nbsp;&middot;&nbsp; 2h 18m &nbsp;&middot;&nbsp; Action &middot; Sci-Fi &nbsp;&middot;&nbsp; &#11088; 4.9',
    youtube: 'dtchgU23IDs'
  },
  {
    img: 'https://tse2.mm.bing.net/th/id/OIP.cSGZLH6YOG_Z2CZd_JrUHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'New Arrival',
    title: 'Echoes of Tomorrow',
    desc: 'When a scientist discovers she can receive memories from the future, she must decide whether to change fate or let it unfold.',
    meta: '2024 &nbsp;&middot;&nbsp; 1h 54m &nbsp;&middot;&nbsp; Sci-Fi &middot; Mystery &nbsp;&middot;&nbsp; &#11088; 4.8',
    youtube: '5KESiLdE5uU'
  },
  {
    img: 'https://tse1.mm.bing.net/th/id/OIP.2f2TV9iFHUFE4LP0VC8-tgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Hot Right Now',
    title: 'Starfall',
    desc: 'An ancient prophecy, a fallen kingdom, and one warrior standing between the world and total darkness.',
    meta: '2024 &nbsp;&middot;&nbsp; 2h 05m &nbsp;&middot;&nbsp; Fantasy &middot; Action &nbsp;&middot;&nbsp; &#11088; 4.7',
    youtube: 'ByXuk9QqQkk'
  },
  {
    img: 'https://tse1.mm.bing.net/th/id/OIP.ivpM86SDLfEdHqm60IZZ_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Top Pick',
    title: 'Neon Requiem',
    desc: 'In a rain-soaked city where crime never sleeps, a disgraced detective hunts a ghost no one else believes exists.',
    meta: '2023 &nbsp;&middot;&nbsp; 1h 48m &nbsp;&middot;&nbsp; Crime &middot; Neo-Noir &nbsp;&middot;&nbsp; &#11088; 4.7',
    youtube: 'fznMYLhi0HQ'
  },
  {
    img: 'https://tse3.mm.bing.net/th/id/OIP.XxTVBzIzv_J08HvpA9qVAAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    badge: 'Just Added',
    title: 'Broken Circuit',
    desc: 'A cyberpunk thriller set in 2087 where a hacker uncovers a corporate conspiracy that could rewrite human consciousness.',
    meta: '2023 &nbsp;&middot;&nbsp; 2h 01m &nbsp;&middot;&nbsp; Cyberpunk &middot; Drama &nbsp;&middot;&nbsp; &#11088; 4.6',
    youtube: '76zO21Z5cog'
  }
];

var npTrack   = document.getElementById('npSliderTrack');
var npDots    = document.getElementById('npSliderDots');
var npPrev    = document.getElementById('npSliderPrev');
var npNext    = document.getElementById('npSliderNext');
var npCurrent = 0;
var npTimer;

heroSlides.forEach(function(slide, i) {
  var el = document.createElement('div');
  el.className = 'tv-slide';
  el.innerHTML =
    '<img src="' + slide.img + '" alt="' + slide.title + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '" />' +
    '<div class="tv-slide-overlay"></div>' +
    '<div class="tv-slide-content np-slide-content">' +
      '<span class="tv-slide-badge np-slide-badge">' + slide.badge + '</span>' +
      '<h1 class="tv-slide-title np-slide-title">' + slide.title + '</h1>' +
      '<p class="np-slide-desc">' + slide.desc + '</p>' +
      '<p class="tv-slide-meta">' + slide.meta + '</p>' +
      '<div class="tv-slide-actions np-slide-actions">' +
        '<button class="btn btn-primary" onclick="openPlayer(\'' + slide.youtube + '\',\'' + slide.title + '\')">&#9654; Watch Now</button>' +
        '<button class="btn btn-secondary">+ My List</button>' +
        '<button class="btn btn-ghost">&#9432; More Info</button>' +
      '</div>' +
    '</div>' +
    '<div class="np-slide-number">' + String(i + 1).padStart(2, '0') + '<span>/' + String(heroSlides.length).padStart(2, '0') + '</span></div>';
  npTrack.appendChild(el);

  var dot = document.createElement('button');
  dot.className = 'tv-slider-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Slide ' + (i + 1));
  dot.addEventListener('click', (function(idx) {
    return function() { npGoTo(idx); npResetTimer(); };
  })(i));
  npDots.appendChild(dot);
});

function npGoTo(index) {
  npCurrent = index;
  npTrack.style.transform = 'translateX(-' + (index * 100) + '%)';
  document.querySelectorAll('.tv-slider-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === index);
  });
}

function npResetTimer() {
  clearInterval(npTimer);
  npTimer = setInterval(function() { npGoTo((npCurrent + 1) % heroSlides.length); }, 6000);
}

npNext.addEventListener('click', function() { npGoTo((npCurrent + 1) % heroSlides.length); npResetTimer(); });
npPrev.addEventListener('click', function() { npGoTo((npCurrent - 1 + heroSlides.length) % heroSlides.length); npResetTimer(); });
npTimer = setInterval(function() { npGoTo((npCurrent + 1) % heroSlides.length); }, 6000);
