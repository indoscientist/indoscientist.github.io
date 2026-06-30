import { supabase } from './supabase.js';

const loginForm = document.querySelector('#loginForm');
const logoutBtn = document.querySelector('#logoutBtn');
const contentForm = document.querySelector('#contentForm');
const authStatus = document.querySelector('#authStatus');
const contentStatus = document.querySelector('#contentStatus');

async function refreshAuthStatus() {
  const { data } = await supabase.auth.getUser();
  authStatus.textContent = data.user ? `Login sebagai ${data.user.email}` : 'Belum login.';
}

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  authStatus.textContent = error ? `Gagal login: ${error.message}` : 'Login berhasil.';
  refreshAuthStatus();
});

logoutBtn?.addEventListener('click', async () => {
  await supabase.auth.signOut();
  refreshAuthStatus();
});

contentForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const tableName = document.querySelector('#tableName').value;
  const judul = document.querySelector('#judul').value;
  const mapel = document.querySelector('#mapel').value;
  const kelas = document.querySelector('#kelas').value;
  const deskripsi = document.querySelector('#deskripsi').value;
  const linkFile = document.querySelector('#linkFile').value;

  let payload;
  if (tableName === 'artikel') {
    payload = { judul, kategori: mapel, ringkasan: deskripsi, isi: deskripsi };
  } else {
    payload = { judul, mapel, kelas, deskripsi, link_file: linkFile };
  }

  const { error } = await supabase.from(tableName).insert(payload);
  contentStatus.textContent = error ? `Gagal menyimpan: ${error.message}` : 'Konten berhasil disimpan.';
  if (!error) contentForm.reset();
});

refreshAuthStatus();
