function getUser() {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
}

function updateAuthUI() {
  const user = getUser();
  const loginLink = document.getElementById('loginLink');
  const logoutBtn = document.getElementById('logoutBtn');
  if (user) {
    if (loginLink) loginLink.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
  } else {
    if (loginLink) loginLink.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
  }
}
updateAuthUI();

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  });
}
