const API = process.env.API || 'http://localhost:5000/api';

async function req(path, opts = {}) {
  const res = await fetch(`${API}${path}`, opts);
  let bodyText = await res.text();
  let body = bodyText;
  try { body = JSON.parse(bodyText); } catch (e) {}
  return { status: res.status, body };
}

async function run() {
  console.log('API base:', API);

  const admin = { name: 'Arun', email: 'admin@me.com', password: '123', role: 'admin' };

  console.log('\nRegistering admin...');
  const reg = await req('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(admin) });
  console.log('/auth/register ->', reg.status, reg.body);

  console.log('\nLogging in admin...');
  const login = await req('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: admin.email, password: admin.password }) });
  console.log('/auth/login ->', login.status, login.body);
}

run().catch(err => { console.error(err); process.exit(1); });
