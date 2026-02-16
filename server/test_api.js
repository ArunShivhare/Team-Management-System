const API = process.env.API || 'http://localhost:5000/api';

async function request(path, opts = {}) {
  const res = await fetch(`${API}${path}`, opts);
  const body = await res.text();
  let parsed = body;
  try { parsed = JSON.parse(body); } catch (e) {}
  return { status: res.status, body: parsed };
}

async function run() {
  console.log('API base:', API);

  // Register (if already exists, ignore)
  const regPayload = { name: 'Test User', email: 'testuser@example.com', password: 'password' };
  const reg = await request('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(regPayload) });
  console.log('\n/register ->', reg.status, reg.body);

  // Login
  const login = await request('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: regPayload.email, password: regPayload.password }) });
  console.log('\n/login ->', login.status, login.body);

  const token = login.body && login.body.token;
  if (!token) {
    console.error('No token received; aborting task tests.');
    return;
  }

  // Create task
  const taskPayload = { title: 'Automated test task', description: 'Created by test script' };
  const create = await request('/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(taskPayload) });
  console.log('\nPOST /tasks ->', create.status, create.body);

  // Get tasks
  const list = await request('/tasks', { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
  console.log('\nGET /tasks ->', list.status, list.body);
}

run().catch(err => {
  console.error('Test run error:', err);
  process.exit(1);
});
