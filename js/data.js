import { supabase } from './supabase.js';

const tagClass = {
  matematika: 'blue',
  fisika: 'cyan',
  kimia: 'green',
  biologi: 'amber',
  pendidikan: 'blue',
  teknologi: 'cyan'
};

const titleCase = (text = '') => text.charAt(0).toUpperCase() + text.slice(1);

function cardTemplate(item, type) {
  const category = item.mapel || item.kategori || 'pendidikan';
  const label = titleCase(category);
  const action = type === 'bank_soal' ? 'Download Soal →' : type === 'artikel' ? 'Baca Artikel →' : 'Baca Materi →';
  const meta = item.kelas ? `<small>Kelas ${item.kelas}</small>` : '';
  const link = item.link_file || '#';

  return `
    <article class="content-card reveal visible" data-category="${category}">
      <span class="tag ${tagClass[category] || 'blue'}">${label}</span>
      <h3>${item.judul}</h3>
      ${meta}
      <p>${item.deskripsi || item.ringkasan || ''}</p>
      <a href="${link}" target="_blank" rel="noopener">${action}</a>
    </article>
  `;
}

async function loadTable(tableName, gridId, emptyText) {
  const grid = document.querySelector(gridId);
  if (!grid) return;

  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn(error);
    return; // Jika Supabase belum dikonfigurasi, kartu HTML bawaan tetap tampil.
  }

  if (!data || data.length === 0) {
    grid.innerHTML = `<p class="empty-state">${emptyText}</p>`;
    return;
  }

  grid.innerHTML = data.map(item => cardTemplate(item, tableName)).join('');
}

loadTable('materi', '#materiGrid', 'Belum ada materi.');
loadTable('bank_soal', '#bankSoalGrid', 'Belum ada bank soal.');
loadTable('artikel', '#artikelGrid', 'Belum ada artikel.');
