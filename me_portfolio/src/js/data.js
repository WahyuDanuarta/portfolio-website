/**
 * Centralized Portfolio Data Configuration
 * Wahyu Danuarta - Full Stack Web Developer & Software Engineer
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Wahyu Danuarta",
    title: "Full Stack Web Developer",
    status: "Tersedia untuk Peluang Kerja (Full-time & Magang)",
    location: "Bengkalis, Riau, Indonesia",
    email: "wahyuasegembol23@gmail.com",
    phone: "0822-4311-7852",
    discord: "wahyudanuarta#2026",
    github: "https://github.com/WahyuDanuarta?tab=repositories",
    linkedin: "https://www.linkedin.com/in/wahyu-danuarta-0959132b8",
    bio: "Lulusan D4 Keamanan Sistem Informasi Politeknik Negeri Bengkalis (IPK 3.63) dengan fokus pada rekayasa aplikasi web yang aman, administrasi jaringan, dan keamanan siber. Tersertifikasi BNSP (Junior Network Administrator) & MikroTik (MTCNA), serta berpengalaman magang di PT Telkom Akses Riau Daratan (Divisi Inventory & Asset Management).",
    typingRoles: [
      "Full Stack Web Developer",
      "Backend & REST API Developer",
      "Web Security & Secure Coding Enthusiast",
      "Laravel & PHP Specialist",
      "Secure Web & UI/UX Developer"
    ]
  },

  skills: [
    { name: "OWASP Top 10 & Web App Hardening", category: "security", level: 88, icon: "🛡️" },
    { name: "Vulnerability Assessment (Burp Suite, Nmap)", category: "security", level: 82, icon: "🔍" },
    { name: "Secure Auth & Access Control (RBAC & IDOR)", category: "security", level: 91, icon: "🔐" },
    { name: "PHP & Laravel", category: "backend", level: 92, icon: "🐘" },
    { name: "Document & PDF Engine (Regex & FPDF)", category: "backend", level: 90, icon: "📄" },
    { name: "JavaScript / ES6+ & Bootstrap 5", category: "frontend", level: 94, icon: "⚡" },
    { name: "MySQL / MariaDB", category: "database", level: 92, icon: "🐬" },
    { name: "RESTful API Architecture", category: "backend", level: 94, icon: "🔗" },
    { name: "HTML5 & Modern CSS3", category: "frontend", level: 95, icon: "🎨" },
    { name: "Git & GitHub Versioning", category: "tools", level: 90, icon: "🐙" },
    { name: "Docker & Linux VPS", category: "tools", level: 78, icon: "🐳" },
    { name: "Postman & API Testing", category: "tools", level: 88, icon: "🚀" }
  ],

  projects: [
    {
      id: "project-pgb",
      title: "Pemuda Grafika (PGB) - E-Commerce & Percetakan Digital",
      category: "fullstack",
      categoryLabel: "Full Stack & Keamanan Web",
      image: "src/assets/images/project_pgb.png",
      description: "Platform e-commerce pemesanan percetakan digital terpadu dengan sistem keamanan autentikasi ketat: Password Strength Validation (PSV) berbasis Shannon Entropy, Rate Limiter pencegah brute-force, dan manajemen pesanan interaktif.",
      techStack: ["Laravel", "PHP", "MySQL", "Shannon Entropy PSV", "Rate Limiter", "RBAC (Owner/Admin)", "IDOR Guard"],
      demoUrl: "#",
      repoUrl: "https://github.com/WahyuDanuarta/admin_pemuda_grafika01",
      deepDive: {
        problem: "Kerentanan akun akibat kata sandi lemah pengguna, serangan brute-force login, dan potensi eksploitasi otorisasi data transaksi (IDOR) pada portal pemesanan percetakan.",
        solution: "Membangun arsitektur keamanan berlapis: Password Strength Validation (PSV) berbasis Teori Entropi Shannon (H = L × log2(C)), proteksi login Rate Limiter, verifikasi kepemilikan transaksi anti-IDOR, dan Multi-Tier RBAC.",
        features: [
          "Password Strength Validation (PSV) real-time dengan kalkulasi entropi bit & klasifikasi kekuatan password",
          "Proteksi Brute-Force Rate Limiting pada portal login (throttling IP + Email dengan lockout 15 menit)",
          "Proteksi IDOR (Insecure Direct Object Reference) pada akses transaksi dan upload bukti pembayaran",
          "Validasi ketat berkas unggahan (MIME-Type & size check) untuk berkas desain cetak dan bukti transfer",
          "Multi-Tier Role-Based Access Control (RBAC): Owner (Admin Besar), Staff Admin (Admin Kecil), dan Customer"
        ]
      }
    },
    {
      id: "project-telkom",
      title: "InventoriSMTR - Logistik & Pergudangan Material Telkom",
      category: "backend",
      categoryLabel: "ERP & Logistik Enterprise",
      image: "src/assets/images/project_telkom.png",
      description: "Sistem informasi manajemen pergudangan logistik telekomunikasi cerdas dengan ekstraksi dokumen otomatis Intelligent PDF Parser (RFC/RFR), transaksi ACID database, dan visualisasi status stok material.",
      techStack: ["Laravel", "PHP", "MySQL", "Intelligent PDF Parser", "ACID Transactions", "Chart.js", "RBAC"],
      demoUrl: "#",
      repoUrl: "https://github.com/WahyuDanuarta/warehouse",
      deepDive: {
        problem: "Input manual data transaksi material masuk dan keluar dari berkas dokumen PDF resmi Telkom (RFC, RFR, dan Surat Jalan) yang tebal, memakan waktu lama, dan rentan salah ketik.",
        solution: "Membangun sistem terintegrasi dengan engine Intelligent PDF Parser berbasis Regex Offset Capture untuk otomasi ekstraksi nomor transaksi, NIK pemakai, dan kuantitas barang, dijamin dengan database ACID transaction.",
        features: [
          "Otomasi ekstraksi berkas dokumen resmi PDF (RFC & RFR) secara instan tanpa input manual",
          "Database ACID Transaction (DB::beginTransaction) untuk konsistensi pencatatan stok massal",
          "Sistem indikator Early Warning stok material kritis (Aman, Rendah, Kritis) dan tren 7 hari",
          "Ekspor data rekonsiliasi transaksi pergudangan otomatis ke format Excel/XLS",
          "Proteksi keamanan Session Fixation Prevention, rotasi CSRF token, dan RBAC (Admin & Staff Magang)"
        ]
      }
    },
    {
      id: "project-busticket",
      title: "AutoZone Bus Ticketing - Reservasi Tiket Antar-Kota",
      category: "fullstack",
      categoryLabel: "Transportasi & Ticketing",
      image: "src/assets/images/project_tiket_bus.png",
      description: "Platform pemesanan tiket perjalanan online terintegrasi dengan proteksi keamanan penuh: pencegahan SQL Injection via Prepared Statements, proteksi IDOR pada tiket digital, hashing password modern, dan generator e-ticket PDF.",
      techStack: ["PHP Native", "MySQLi Prepared Stmts", "SQLi Prevention", "Anti-IDOR Guard", "Bcrypt", "FPDF"],
      demoUrl: "#",
      repoUrl: "https://github.com/WahyuDanuarta/bus-ticket",
      deepDive: {
        problem: "Kerentanan keamanan SQL Injection pada query tiket perjalanan, risiko kebocoran tiket digital akibat akses IDOR, serta inefisiensi pemesanan tiket manual di terminal.",
        solution: "Merancang sistem web multi-peran (Admin & Penumpang) dengan implementasi parameterized query Prepared Statements menyeluruh, otorisasi sesi unduh tiket anti-IDOR, dan cetak e-ticket otomatis berbasis FPDF.",
        features: [
          "Pencegahan SQL Injection (SQLi) dengan Prepared Statements & Parameter Binding pada seluruh alur query",
          "Proteksi IDOR (Insecure Direct Object Reference) pada endpoint unduh e-ticket (WHERE p.id = ? AND p.user_id = ?)",
          "Enkripsi satu arah password akun pengguna menggunakan password_hash() dan password_verify() (Bcrypt)",
          "Katalog tiket dan jadwal rute perjalanan dinamis (Bengkalis, Pekanbaru, Dumai, Duri, Siak, Medan, Padang)",
          "Generator dokumen e-ticket PDF otomatis dan cetak invoice pembayaran resmi menggunakan FPDF"
        ]
      }
    },
    {
      id: "project-driving",
      title: "Dhuha Driving Center - Manajemen Kursus Mengemudi",
      category: "fullstack",
      categoryLabel: "Sistem Manajemen & Edukasi",
      image: "src/assets/images/project_dhuha_driving.png",
      description: "Sistem informasi manajemen lembaga kursus mengemudi privat dengan manajemen penjadwalan armada & instruktur, gatekeeping pembayaran cicilan, notifikasi otomatis, dan sertifikasi digital siswa.",
      techStack: ["Laravel", "PHP", "MySQL", "RBAC Multi-Role", "Payment Gatekeeper", "Notifications", "Digital Certificate"],
      demoUrl: "#",
      repoUrl: "https://github.com/WahyuDanuarta/driving_school",
      deepDive: {
        problem: "Bentroknya jadwal instruktur dan armada mobil, siswa mangkir dari sisa pembayaran cicilan (DP), serta proses verifikasi kelulusan dan sertifikasi siswa yang lambat.",
        solution: "Membangun sistem terpusat privat '1 Siswa 1 Instruktur 1 Mobil' dengan validasi gatekeeping otomatis (blokir sesi ke-5 jika belum lunas), integrasi notifikasi real-time, dan penerbitan sertifikat kelulusan digital.",
        features: [
          "Sistem Penjadwalan Privat '1 Siswa 1 Instruktur 1 Mobil' berbasis ketersediaan armada mobil & instruktur",
          "Financial Gatekeeping: Pemblokiran otomatis pertemuan ke-5 bagi siswa dengan status pembayaran DP",
          "Multi-Tier RBAC: Hak akses terisolasi untuk Administrator, Instruktur Pelatih, dan Siswa Kursus",
          "Sistem Notifikasi Jadwal & Status Pembayaran otomatis terintegrasi ke email/akun siswa",
          "Penerbitan Sertifikat Kelulusan Digital resmi lengkap dengan verifikasi kelayakan siswa tamat"
        ]
      }
    }
  ],

  timeline: [
    {
      role: "Inventory & Asset Management Intern",
      organization: "PT. Telkom Akses Riau Daratan (Pekanbaru)",
      period: "Maret 2026 - Juni 2026",
      description: "Melaksanakan magang di divisi Inventory & Asset Management. Mengembangkan sistem web InventoriSMTR dengan Intelligent PDF Parser untuk otomasi ekstraksi dokumen resmi Telkom (RFC/RFR), pemindaian data aset perangkat jaringan (seperti router), dan pelaksanaan stock opname berkala."
    },
    {
      role: "Web Developer & Secure System Builder",
      organization: "Freelance & Independent Projects",
      period: "2023 - Sekarang",
      description: "Merancang dan membangun aplikasi web fungsional: e-commerce percetakan Pemuda Grafika (PSV Shannon Entropy), reservasi tiket bus AutoZone (anti-SQLi & anti-IDOR), serta platform kursus mengemudi Dhuha Driving Center (gatekeeping & sertifikat digital)."
    },
    {
      role: "Administration Intern (PKL)",
      organization: "Badan Pendapatan Daerah (BAPENDA) Kab. Bengkalis",
      period: "Maret 2021 - Juni 2021",
      description: "Melaksanakan Praktik Kerja Lapangan dengan fokus pada operasional dan administrasi perkantoran, pengolahan data menggunakan Microsoft Office (Excel dan Word), penyusunan surat dinas, serta pengelolaan arsip."
    },
    {
      role: "D4 Keamanan Sistem Informasi (IPK: 3.63)",
      organization: "Politeknik Negeri Bengkalis",
      period: "2022 - 2026",
      description: "Fokus keahlian pada keamanan siber, administrasi jaringan, secure web application development, mitigasi serangan web, serta forensik digital."
    },
    {
      role: "Pemenang Best Spirit Kategori Keamanan Siber",
      organization: "KMIPN VI 2024 — Politeknik Negeri Jakarta",
      period: "2024",
      description: "Meraih penghargaan Best Spirit tingkat nasional pada kategori Keamanan Siber dalam ajang Kompetisi Mahasiswa Informatika Politeknik Nasional (KMIPN) VI."
    },
    {
      role: "Sertifikasi BNSP Junior Network Administrator & MikroTik MTCNA",
      organization: "BNSP (Komdigi Digitalent) & MikroTik Academy",
      period: "2023 - 2025",
      description: "Tersertifikasi standar kompetensi nasional BNSP (Junior Network Admin) dan sertifikasi internasional MikroTik RouterOS (MTCNA)."
    }
  ],

  terminalHelp: [
    { cmd: "whoami", desc: "Menampilkan profil ringkas Wahyu Danuarta" },
    { cmd: "skills", desc: "Daftar keahlian teknis & stack utama" },
    { cmd: "projects", desc: "Daftar proyek unggulan yang telah dibuat" },
    { cmd: "contact", desc: "Informasi kontak dan email" },
    { cmd: "sudo hire", desc: "Alur rekrutmen & kontak langsung" },
    { cmd: "clear", desc: "Bersihkan layar terminal" },
    { cmd: "help", desc: "Menampilkan bantuan perintah ini" }
  ]
};

// Export to window scope
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
