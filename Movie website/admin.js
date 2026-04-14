// admin.js — StreamVault Video URL Manager
// Activate with: Ctrl + Shift + A
// Saves YouTube IDs to localStorage, overrides null youtube values at runtime

(function () {

  var STORE_KEY = 'sv_youtube_overrides';

  // Load saved overrides
  function getOverrides() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); }
    catch(e) { return {}; }
  }

  function saveOverride(title, youtubeId) {
    var data = getOverrides();
    data[title.trim().toLowerCase()] = youtubeId.trim();
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  }

  function getOverride(title) {
    return getOverrides()[title.trim().toLowerCase()] || null;
  }

  // Expose globally so page scripts can call it
  window.svGetYoutube = function(title, fallback) {
    return getOverride(title) || fallback || null;
  };

  // ── Admin Modal ──
  var adminActive = false;

  var modal = document.createElement('div');
  modal.id = 'svAdminModal';
  modal.innerHTML =
    '<div class="sv-admin-backdrop"></div>' +
    '<div class="sv-admin-box">' +
      '<div class="sv-admin-header">' +
        '<span class="sv-admin-logo">StreamVault</span>' +
        '<span class="sv-admin-title">&#9881; Video URL Manager</span>' +
        '<button class="sv-admin-close" id="svAdminClose">&times;</button>' +
      '</div>' +
      '<p class="sv-admin-hint">Paste a YouTube video ID or full URL for any title. Changes save instantly and persist across sessions.</p>' +
      '<div class="sv-admin-form">' +
        '<div class="sv-admin-field">' +
          '<label class="sv-admin-label">Title</label>' +
          '<input class="sv-admin-input" id="svAdminTitle" placeholder="e.g. Dark Horizon" />' +
        '</div>' +
        '<div class="sv-admin-field">' +
          '<label class="sv-admin-label">YouTube ID or URL</label>' +
          '<input class="sv-admin-input" id="svAdminUrl" placeholder="e.g. NIJFpgU18gY or https://youtu.be/NIJFpgU18gY" />' +
        '</div>' +
        '<button class="sv-admin-save" id="svAdminSave">&#10003; Save</button>' +
        '<p class="sv-admin-msg" id="svAdminMsg"></p>' +
      '</div>' +
      '<div class="sv-admin-list-wrap">' +
        '<p class="sv-admin-list-title">Saved Overrides</p>' +
        '<div class="sv-admin-list" id="svAdminList"></div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  // ── Admin Styles ──
  var style = document.createElement('style');
  style.textContent =
    '#svAdminModal { display:none; position:fixed; inset:0; z-index:9999; }' +
    '#svAdminModal.open { display:flex; align-items:center; justify-content:center; }' +
    '.sv-admin-backdrop { position:absolute; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(6px); }' +
    '.sv-admin-box { position:relative; z-index:1; background:#141414; border:1px solid rgba(255,255,255,0.1); border-radius:16px; width:90%; max-width:560px; max-height:85vh; overflow-y:auto; box-shadow:0 24px 80px rgba(0,0,0,0.9); animation:fadeUp 0.25s ease; }' +
    '.sv-admin-header { display:flex; align-items:center; gap:12px; padding:20px 24px 0; border-bottom:1px solid rgba(255,255,255,0.07); padding-bottom:16px; }' +
    '.sv-admin-logo { color:#e50914; font-weight:900; font-size:1rem; }' +
    '.sv-admin-title { color:#fff; font-weight:700; font-size:0.95rem; flex:1; }' +
    '.sv-admin-close { background:transparent; border:none; color:#888; font-size:1.4rem; cursor:pointer; line-height:1; padding:0; }' +
    '.sv-admin-close:hover { color:#fff; }' +
    '.sv-admin-hint { font-size:0.78rem; color:#666; padding:12px 24px 0; line-height:1.6; }' +
    '.sv-admin-form { padding:16px 24px; display:flex; flex-direction:column; gap:12px; }' +
    '.sv-admin-field { display:flex; flex-direction:column; gap:5px; }' +
    '.sv-admin-label { font-size:0.72rem; color:#888; text-transform:uppercase; letter-spacing:1px; font-weight:600; }' +
    '.sv-admin-input { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:8px; color:#fff; padding:10px 14px; font-size:0.88rem; outline:none; font-family:inherit; transition:border-color 0.2s; }' +
    '.sv-admin-input:focus { border-color:#e50914; }' +
    '.sv-admin-save { background:#e50914; color:#fff; border:none; border-radius:8px; padding:11px 24px; font-size:0.88rem; font-weight:700; cursor:pointer; align-self:flex-start; transition:background 0.2s; font-family:inherit; }' +
    '.sv-admin-save:hover { background:#f40612; }' +
    '.sv-admin-msg { font-size:0.78rem; color:#4ade80; min-height:18px; }' +
    '.sv-admin-list-wrap { padding:0 24px 20px; }' +
    '.sv-admin-list-title { font-size:0.72rem; color:#555; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px; font-weight:600; }' +
    '.sv-admin-list { display:flex; flex-direction:column; gap:6px; max-height:200px; overflow-y:auto; }' +
    '.sv-admin-row { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.04); border-radius:8px; padding:8px 12px; }' +
    '.sv-admin-row-title { flex:1; font-size:0.82rem; color:#ccc; }' +
    '.sv-admin-row-id { font-size:0.75rem; color:#e50914; font-family:monospace; }' +
    '.sv-admin-row-del { background:transparent; border:none; color:#555; cursor:pointer; font-size:1rem; padding:0; line-height:1; }' +
    '.sv-admin-row-del:hover { color:#e50914; }' +
    '.sv-admin-trigger { position:fixed; bottom:24px; right:24px; z-index:9998; background:#e50914; color:#fff; border:none; border-radius:50%; width:48px; height:48px; font-size:1.2rem; cursor:pointer; box-shadow:0 4px 20px rgba(229,9,20,0.5); display:none; align-items:center; justify-content:center; transition:transform 0.2s; }' +
    '.sv-admin-trigger:hover { transform:scale(1.1); }' +
    '.sv-admin-trigger.visible { display:flex; }';
  document.head.appendChild(style);

  // ── Floating trigger button ──
  var trigger = document.createElement('button');
  trigger.className = 'sv-admin-trigger';
  trigger.title = 'Video URL Manager (Ctrl+Shift+A)';
  trigger.innerHTML = '&#9881;';
  document.body.appendChild(trigger);

  function openAdmin(prefillTitle) {
    renderList();
    if (prefillTitle) document.getElementById('svAdminTitle').value = prefillTitle;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function() { document.getElementById(prefillTitle ? 'svAdminUrl' : 'svAdminTitle').focus(); }, 50);
  }

  function closeAdmin() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('svAdminMsg').textContent = '';
  }

  function renderList() {
    var list = document.getElementById('svAdminList');
    var data = getOverrides();
    var keys = Object.keys(data);
    if (!keys.length) { list.innerHTML = '<p style="font-size:0.78rem;color:#555;padding:4px 0">No overrides saved yet.</p>'; return; }
    list.innerHTML = '';
    keys.forEach(function(key) {
      var row = document.createElement('div');
      row.className = 'sv-admin-row';
      row.innerHTML =
        '<span class="sv-admin-row-title">' + key + '</span>' +
        '<span class="sv-admin-row-id">' + data[key] + '</span>' +
        '<button class="sv-admin-row-del" data-key="' + key + '" title="Remove">&#10005;</button>';
      row.querySelector('.sv-admin-row-del').addEventListener('click', function() {
        var d = getOverrides(); delete d[this.dataset.key];
        localStorage.setItem(STORE_KEY, JSON.stringify(d));
        renderList();
      });
      list.appendChild(row);
    });
  }

  function extractYoutubeId(input) {
    input = input.trim();
    // Full URL patterns
    var match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
    if (match) return match[1];
    // Plain ID (11 chars)
    if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
    return null;
  }

  document.getElementById('svAdminSave').addEventListener('click', function() {
    var title = document.getElementById('svAdminTitle').value.trim();
    var raw   = document.getElementById('svAdminUrl').value.trim();
    var msg   = document.getElementById('svAdminMsg');
    if (!title) { msg.style.color = '#f87171'; msg.textContent = 'Please enter a title.'; return; }
    var id = extractYoutubeId(raw);
    if (!id) { msg.style.color = '#f87171'; msg.textContent = 'Invalid YouTube ID or URL.'; return; }
    saveOverride(title, id);
    msg.style.color = '#4ade80';
    msg.textContent = '✓ Saved! Refresh the page to see the Watch button activate.';
    document.getElementById('svAdminTitle').value = '';
    document.getElementById('svAdminUrl').value = '';
    renderList();
  });

  document.getElementById('svAdminClose').addEventListener('click', closeAdmin);
  modal.querySelector('.sv-admin-backdrop').addEventListener('click', closeAdmin);
  trigger.addEventListener('click', function() { openAdmin(); });

  // Keyboard shortcut: Ctrl + Shift + A
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      adminActive = !adminActive;
      trigger.classList.toggle('visible', adminActive);
      if (adminActive) openAdmin();
      else closeAdmin();
    }
  });

  // ── Patch all Watch buttons on the page ──
  // After DOM is ready, find any disabled Watch buttons and check overrides
  window.addEventListener('load', function() {
    document.querySelectorAll('.adv-btn.play, .card-btn.play').forEach(function(btn) {
      var card = btn.closest('.adv-card, .movie-card');
      if (!card) return;
      var titleEl = card.querySelector('.adv-title, .card-title');
      if (!titleEl) return;
      var title = titleEl.textContent.trim();
      var id = getOverride(title);
      if (id) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (typeof openPlayer === 'function') openPlayer(id, title);
          else if (typeof openTvPlayer === 'function') openTvPlayer(id, title);
        });
      } else if (btn.disabled) {
        // Right-click or long-press to open admin for this title
        btn.addEventListener('contextmenu', function(e) {
          e.preventDefault();
          openAdmin(title);
          trigger.classList.add('visible');
          adminActive = true;
        });
        btn.title = 'Right-click to add YouTube URL';
      }
    });
  });

})();
