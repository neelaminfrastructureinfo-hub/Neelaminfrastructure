async function api(path, options = {}) {
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(path, {
    method: options.method || 'POST',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  if (!res.ok) {
    let err;
    try { err = await res.json(); } catch { err = { error: res.statusText }; }
    throw new Error(err.error || 'Request failed');
  }
  // For GET returning arrays etc.
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}
window.api = api;
