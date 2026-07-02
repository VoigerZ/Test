/* =====================================================
   SCRIPT.JS — KIR SMAN 2 JAKARTA
   
   DAFTAR ISI:
   1. Navigasi Halaman (showPage, history)
   2. Mobile Menu
   3. Blog Posts Data (TAMBAH/EDIT ARTIKEL DI SINI)
   4. Buka & Tampilkan Artikel Blog
   5. Galeri Filter
   6. Navbar scroll effect
   7. Feed Tab (placeholder)
===================================================== */


/* =====================================================
   1. NAVIGASI HALAMAN
   
   Sistem "Single Page Application" sederhana.
   Setiap "halaman" adalah elemen <main> dengan id "page-xxx".
   showPage() menyembunyikan semua halaman lalu menampilkan
   halaman yang diminta.
===================================================== */

// ID halaman yang tersedia — tambahkan di sini jika buat halaman baru
const PAGES = ['home', 'tentang', 'kegiatan', 'galeri', 'blog', 'blog-detail'];

function showPage(pageId) {
  // Sembunyikan semua halaman
  PAGES.forEach(id => {
    const el = document.getElementById('page-' + id);
    if (el) el.classList.remove('active-page');
  });

  // Tampilkan halaman yang dipilih
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active-page');
    // Scroll ke atas saat ganti halaman
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update class 'active' pada link navbar
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  // Simpan halaman aktif ke localStorage (opsional, agar refresh tidak balik ke home)
  // Hapus baris ini jika tidak diperlukan
  localStorage.setItem('kir_active_page', pageId);
}

// Kembalikan halaman terakhir saat refresh (opsional)
// Hapus blok ini jika ingin selalu mulai dari Home
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('kir_active_page');
  // Jangan restore halaman blog-detail (karena kontennya dinamis)
  if (saved && saved !== 'blog-detail' && PAGES.includes(saved)) {
    showPage(saved);
  } else {
    showPage('home');
  }
});


/* =====================================================
   2. MOBILE MENU
===================================================== */

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.remove('open');
}

// Tutup menu jika klik di luar
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const nav  = document.querySelector('.navbar');
  if (!nav.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('open');
  }
});


/* =====================================================
   3. DATA BLOG POSTS
   
   =========================================
   CARA MENAMBAH ARTIKEL BARU:
   1. Salin satu blok { id: '...', ... }
   2. Ganti id dengan id unik (misal: 'post-5')
   3. Isi semua field:
      - category : Kategori artikel
      - title    : Judul artikel
      - author   : Nama penulis
      - date     : Tanggal terbit
      - tags     : Array tag (bisa kosong [])
      - content  : Isi artikel dalam HTML
                   Gunakan tag: <p>, <h2>, <ul><li>, <blockquote>
   4. Di index.html, tambahkan .blog-list-item baru
      dengan onclick="openBlogPost('post-5')"
   =========================================
===================================================== */

const blogPosts = {

  'post-1': {
    category: 'Pengumuman',
    title: 'Pendaftaran Anggota Baru KIR 2024/2025 Dibuka!',
    author: 'Admin KIR',
    date: '21 April 2025',
    tags: ['Rekrutmen', '2024'],
    content: `
      <p>
        Halo calon peneliti muda! KIR SMAN 2 Jakarta dengan bangga mengumumkan
        dibukanya pendaftaran anggota baru untuk tahun ajaran 2024/2025.
        Ini adalah kesempatanmu untuk bergabung dengan komunitas ilmiah yang
        telah melahirkan ratusan peneliti berbakat selama lebih dari empat dekade.
      </p>
      <h2>Mengapa Bergabung KIR?</h2>
      <p>
        KIR bukan sekadar ekskul biasa. Di sini kamu akan belajar berpikir kritis,
        merancang penelitian, mempresentasikan ide, dan berkompetisi di tingkat
        daerah hingga nasional. Banyak alumni kami kini berkuliah di universitas
        top Indonesia dan luar negeri berbekal pengalaman dari KIR.
      </p>
      <ul>
        <li>Pelatihan metodologi penelitian dari mentor berpengalaman</li>
        <li>Akses ke laboratorium dan fasilitas riset sekolah</li>
        <li>Kesempatan ikut kompetisi ilmiah bergengsi (LKIR, OPSI, dll)</li>
        <li>Jaringan dengan mahasiswa dan peneliti dari berbagai kampus</li>
        <li>Sertifikat dan portofolio penelitian yang diakui</li>
      </ul>
      <h2>Syarat Pendaftaran</h2>
      <ul>
        <li>Siswa aktif SMAN 2 Jakarta kelas X atau XI</li>
        <li>Memiliki minat terhadap ilmu pengetahuan dan penelitian</li>
        <li>Bersedia mengikuti kegiatan KIR secara aktif</li>
        <li>Mengisi formulir pendaftaran online</li>
      </ul>
      <h2>Cara Mendaftar</h2>
      <p>
        Pendaftaran dilakukan secara online melalui formulir Google Form yang
        tersedia di mading sekolah dan Instagram resmi KIR. Batas pendaftaran
        adalah <strong>30 April 2025</strong>.
      </p>
      <blockquote>
        "Penelitian adalah cara kita bertanya kepada alam, dan alam selalu menjawab
        bagi mereka yang cukup sabar untuk mendengarkan." — Pesan Ketua KIR
      </blockquote>
      <p>
        Jangan lewatkan kesempatan ini! Untuk informasi lebih lanjut, hubungi
        pengurus KIR di Instagram <strong>@kir.sman2jakarta</strong> atau datangi
        ruang KIR setiap hari Selasa dan Kamis pukul 15.00–17.00 WIB.
      </p>
    `
  },

  'post-2': {
    category: 'Prestasi',
    title: 'KIR Raih Juara 1 LKIR Nasional 2024',
    author: 'Humas KIR',
    date: '10 April 2025',
    tags: ['Prestasi', 'LKIR', 'Nasional'],
    content: `
      <p>
        Kabar membanggakan datang dari Jakarta! Tim peneliti KIR SMAN 2 Jakarta
        berhasil meraih Juara Pertama dalam Lomba Karya Ilmiah Remaja (LKIR)
        Tingkat Nasional 2024 yang diselenggarakan oleh Lembaga Ilmu Pengetahuan
        Indonesia (LIPI) di Bandung, 5–8 April 2024.
      </p>
      <h2>Penelitian yang Mengantar Kemenangan</h2>
      <p>
        Tim yang terdiri dari tiga anggota KIR — Rizky Aditya, Sari Andini, dan
        Dika Prasetya — mempersembahkan penelitian berjudul
        <strong>"Pemanfaatan Bakteri Pengurai Plastik dari Ekosistem Sungai Ciliwung
        sebagai Solusi Bioteknologi Ramah Lingkungan"</strong>.
      </p>
      <p>
        Penelitian ini mengidentifikasi dan mengisolasi bakteri lokal yang mampu
        mengurai polimer plastik jenis PET secara efektif, menawarkan solusi
        inovatif terhadap masalah pencemaran plastik di perairan perkotaan.
      </p>
      <h2>Proses Panjang Menuju Podium</h2>
      <ul>
        <li>6 bulan penelitian di laboratorium SMAN 2 Jakarta</li>
        <li>Bimbingan dari Departemen Biologi Universitas Indonesia</li>
        <li>Seleksi tingkat DKI Jakarta (Juara 1)</li>
        <li>Seleksi tingkat regional (Juara 2)</li>
        <li>Final nasional melawan 48 tim dari seluruh Indonesia</li>
      </ul>
      <blockquote>
        "Kami tidak pernah menyangka bisa sampai sejauh ini. Kunci kami adalah
        konsistensi dan keberanian untuk terus bertanya." — Rizky Aditya, Ketua Tim
      </blockquote>
      <p>
        Kemenangan ini membawa kebanggaan besar bagi seluruh keluarga SMAN 2 Jakarta
        dan semakin meneguhkan posisi KIR sebagai salah satu kelompok ilmiah remaja
        terbaik di Indonesia.
      </p>
    `
  },

  'post-3': {
    category: 'Kegiatan',
    title: 'Workshop Metode Penelitian Ilmiah bersama UI',
    author: 'Dika Prasetya',
    date: '2 Maret 2025',
    tags: ['Workshop', 'Kolaborasi', 'UI'],
    content: `
      <p>
        Pada 28 Februari – 1 Maret 2025, KIR SMAN 2 Jakarta menyelenggarakan
        workshop intensif bertajuk <strong>"Metodologi Penelitian untuk Pelajar"</strong>
        yang dipimpin oleh dua dosen dari Departemen Ilmu Komputer dan Fakultas MIPA
        Universitas Indonesia.
      </p>
      <h2>Materi Workshop</h2>
      <p>
        Selama dua hari, peserta mendapatkan pembekalan komprehensif mencakup:
      </p>
      <ul>
        <li>Pengantar penelitian ilmiah: jenis, tujuan, dan etika</li>
        <li>Merancang pertanyaan penelitian (research question)</li>
        <li>Tinjauan pustaka dan manajemen referensi (Zotero)</li>
        <li>Desain eksperimen dan pengumpulan data</li>
        <li>Analisis data dasar menggunakan spreadsheet dan Python</li>
        <li>Penulisan laporan ilmiah dan abstrak</li>
        <li>Teknik presentasi di depan juri kompetisi</li>
      </ul>
      <h2>Kesan Peserta</h2>
      <blockquote>
        "Workshop ini membuka mata saya bahwa penelitian bukan hanya soal
        laboratorium. Cara berpikir sistematis inilah yang paling berharga."
        — Nadia Rahma, Anggota KIR
      </blockquote>
      <p>
        Sebanyak 42 anggota aktif KIR mengikuti workshop ini dengan antusias.
        Di akhir sesi, peserta langsung diminta merancang proposal penelitian
        mini sebagai latihan, dan tiga proposal terbaik dipilih untuk dikembangkan
        lebih lanjut dalam program pembinaan selanjutnya.
      </p>
    `
  },

  'post-4': {
    category: 'Riset',
    title: 'Laporan Ekspedisi Riset Alam Ciawi 2025',
    author: 'Tim Riset KIR',
    date: '15 Februari 2025',
    tags: ['Ekspedisi', 'Riset', 'Lingkungan'],
    content: `
      <p>
        Pada 8 Februari 2025, 30 anggota KIR SMAN 2 Jakarta bertolak ke kawasan
        Ciawi, Bogor untuk melaksanakan ekspedisi riset lapangan selama satu hari
        penuh. Ekspedisi ini berfokus pada penelitian ekosistem sungai dan
        keanekaragaman hayati di daerah aliran Sungai Ciawi.
      </p>
      <h2>Tujuan Ekspedisi</h2>
      <ul>
        <li>Mengidentifikasi indeks keanekaragaman makroinvertebrata bentik</li>
        <li>Mengukur parameter fisiko-kimia air sungai (pH, DO, turbiditas)</li>
        <li>Mendokumentasikan vegetasi riparian di sekitar bantaran sungai</li>
        <li>Melatih keterampilan sampling dan observasi lapangan anggota KIR</li>
      </ul>
      <h2>Temuan Awal</h2>
      <p>
        Tim berhasil mengidentifikasi 23 spesies makroinvertebrata dari 8 famili
        berbeda, termasuk penemuan menarik berupa larva Ephemeroptera yang menjadi
        indikator kualitas air yang masih relatif baik di bagian hulu.
      </p>
      <p>
        Parameter kimia air menunjukkan nilai pH 6,8–7,2 dan kandungan oksigen
        terlarut 6,4 mg/L, masih berada dalam kisaran normal untuk ekosistem sungai
        tropis.
      </p>
      <blockquote>
        "Penelitian lapangan mengajarkan kami bahwa data tidak hanya hidup di buku
        teks. Ada kehidupan nyata yang menunggu untuk dipahami." — Koordinator Riset
      </blockquote>
      <p>
        Data yang dikumpulkan selama ekspedisi ini akan dijadikan bahan penelitian
        lanjutan dan berpotensi diikutsertakan dalam Kompetisi Penelitian Lingkungan
        tingkat nasional pada tahun 2025.
      </p>
    `
  }

  // ===================================================
  // TAMBAHKAN ARTIKEL BARU DI BAWAH INI:
  // Salin format di atas dan ganti kontennya
  // ===================================================

};


/* =====================================================
   4. BUKA & TAMPILKAN ARTIKEL BLOG
===================================================== */

// Simpan ID artikel terakhir yang dibuka (untuk tombol back)
let lastBlogSource = 'blog';

function openBlogPost(postId) {
  const post = blogPosts[postId];
  if (!post) {
    console.warn('Post tidak ditemukan:', postId);
    return;
  }

  // Buat HTML artikel
  const tagsHTML = post.tags.map(t => `<span class="tag">${t}</span>`).join('');

  const html = `
    <div class="blog-post-content">
      <div class="post-header">
        <div class="post-category">${post.category}</div>
        <h1 class="post-title">${post.title}</h1>
        <div class="post-meta">
          <span>✍️ ${post.author}</span>
          <span>📅 ${post.date}</span>
          <div style="display:flex;gap:6px;flex-wrap:wrap">${tagsHTML}</div>
        </div>
      </div>
      <div class="post-body">
        ${post.content}
      </div>
    </div>
  `;

  // Masukkan ke halaman detail
  document.getElementById('blogPostContent').innerHTML = html;

  // Tampilkan halaman detail
  showPage('blog-detail');
}

// Tombol kembali dari artikel ke daftar blog
function goBackToBlog() {
  showPage('blog');
}


/* =====================================================
   5. FILTER GALERI
===================================================== */

function filterGaleri(category, btnEl) {
  // Update tombol aktif
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  // Tampilkan / sembunyikan item
  const items = document.querySelectorAll('.galeri-item');
  items.forEach(item => {
    const show = category === 'all' || item.dataset.category === category;
    // Animasi sederhana
    item.style.opacity = '0';
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
      item.style.display = show ? 'block' : 'none';
      if (show) {
        requestAnimationFrame(() => {
          item.style.transition = 'opacity 0.3s, transform 0.3s';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        });
      }
    }, 150);
  });
}


/* =====================================================
   6. NAVBAR SCROLL EFFECT
   Navbar akan menambah shadow saat halaman di-scroll
===================================================== */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


/* =====================================================
   7. FEED TAB INTERAKSI (placeholder)
   Klik tab feed di beranda (Terbaru / Populer / Pinned)
   Tambahkan logika filter konten di sini jika diperlukan
===================================================== */
document.querySelectorAll('.feed-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    // TODO: implementasi filter feed berdasarkan tab yang dipilih
  });
});
