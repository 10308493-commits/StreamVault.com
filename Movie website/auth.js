const loginSection  = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');

// Toggle between login / signup
document.getElementById('goSignup').addEventListener('click', (e) => {
  e.preventDefault();
  loginSection.classList.add('hidden');
  signupSection.classList.remove('hidden');
});

document.getElementById('goLogin').addEventListener('click', (e) => {
  e.preventDefault();
  signupSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
});

// ── Helpers ──
function setErr(id, msg) { document.getElementById(id).textContent = msg; }
function clearErrs(...ids) { ids.forEach(id => setErr(id, '')); }

function getUsers() { return JSON.parse(localStorage.getItem('sv_users') || '[]'); }
function saveUsers(users) { localStorage.setItem('sv_users', JSON.stringify(users)); }
function setSession(user) {
  localStorage.setItem('sv_session', JSON.stringify({ name: user.name, email: user.email }));
}

// ── Sign Up ──
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name     = document.getElementById('signupName').value.trim();
  const email    = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;
  const confirm  = document.getElementById('signupConfirm').value;

  clearErrs('signupNameErr','signupEmailErr','signupPassErr','signupConfirmErr','signupGlobalErr');
  let valid = true;

  if (!name)                          { setErr('signupNameErr', 'Name is required.');          valid = false; }
  if (!email || !email.includes('@')) { setErr('signupEmailErr', 'Enter a valid email.');       valid = false; }
  if (password.length < 6)           { setErr('signupPassErr', 'Min 6 characters.');           valid = false; }
  if (password !== confirm)          { setErr('signupConfirmErr', 'Passwords do not match.');  valid = false; }
  if (!valid) return;

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    setErr('signupGlobalErr', 'An account with this email already exists.');
    return;
  }

  users.push({ name, email, password });
  saveUsers(users);
  setSession({ name, email });
  window.location.href = 'index.html';
});

// ── Login ──
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email    = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  clearErrs('loginEmailErr','loginPassErr','loginGlobalErr');
  let valid = true;

  if (!email || !email.includes('@')) { setErr('loginEmailErr', 'Enter a valid email.'); valid = false; }
  if (!password)                      { setErr('loginPassErr', 'Password is required.'); valid = false; }
  if (!valid) return;

  const users = getUsers();
  const user  = users.find(u => u.email === email && u.password === password);

  if (!user) {
    setErr('loginGlobalErr', 'Incorrect email or password.');
    return;
  }

  if (document.getElementById('rememberMe').checked) {
    localStorage.setItem('sv_remember', email);
  }

  setSession(user);
  window.location.href = 'index.html';
});

// Pre-fill remembered email
const remembered = localStorage.getItem('sv_remember');
if (remembered) {
  document.getElementById('loginEmail').value = remembered;
  document.getElementById('rememberMe').checked = true;
}

// Redirect if already logged in
if (localStorage.getItem('sv_session')) {
  window.location.href = 'index.html';
}
