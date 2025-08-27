(function init() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) { window.location.href = '/login.html'; return; }
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userRole').textContent = user.role;

  if (user.role === 'admin') {
    document.getElementById('adminPanel').classList.remove('hidden');
    loadProjects();
  } else {
    document.getElementById('employeePanel').classList.remove('hidden');
    loadTimesheets();
  }

  // Create user
  const createUserForm = document.getElementById('createUserForm');
  if (createUserForm) {
    createUserForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(createUserForm);
      try {
        await api('/api/auth/register', {
          method: 'POST',
          body: Object.fromEntries(fd.entries())
        });
        alert('User created');
        createUserForm.reset();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Create project
  const createProjectForm = document.getElementById('createProjectForm');
  if (createProjectForm) {
    createProjectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(createProjectForm);
      try {
        await api('/api/projects', {
          method: 'POST',
          body: Object.fromEntries(fd.entries())
        });
        createProjectForm.reset();
        loadProjects();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Timesheet submit
  const tsForm = document.getElementById('tsForm');
  if (tsForm) {
    tsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(tsForm);
      try {
        await api('/api/timesheets', {
          method: 'POST',
          body: {
            date: fd.get('date'),
            hours: parseFloat(fd.get('hours')),
            task: fd.get('task')
          }
        });
        tsForm.reset();
        loadTimesheets();
      } catch (err) {
        alert(err.message);
      }
    });
  }
})();

async function loadProjects() {
  try {
    const projects = await api('/api/projects', { method: 'GET' });
    const list = document.getElementById('projectsList');
    if (!list) return;
    list.innerHTML = projects.map(p => `
      <li class="border rounded-xl p-3 flex items-center justify-between">
        <div>
          <div class="font-medium">${'{'}p.name{'}'}</div>
          <div class="text-xs text-gray-600">${'{'}p.status{'}'}</div>
        </div>
      </li>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}

async function loadTimesheets() {
  try {
    const rows = await api('/api/timesheets', { method: 'GET' });
    const list = document.getElementById('tsList');
    if (!list) return;
    list.innerHTML = rows.map(r => `
      <li class="border rounded-xl p-3">
        <div class="text-sm"><b>Date:</b> ${'{'}new Date(r.date).toLocaleDateString(){'}'} | <b>Hours:</b> ${'{'}r.hours{'}'}</div>
        <div class="text-xs text-gray-600">${'{'}r.task{'}'}</div>
      </li>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}
