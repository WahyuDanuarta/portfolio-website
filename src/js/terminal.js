/**
 * Interactive CLI Terminal Simulator
 */
document.addEventListener('DOMContentLoaded', () => {
  const cliOutput = document.getElementById('cliOutput');
  const cliInput = document.getElementById('cliInput');
  const shortcutButtons = document.querySelectorAll('.cli-btn-tag');

  if (!cliOutput || !cliInput) return;

  const commands = {
    help: () => `
<span class="code-var">Perintah yang tersedia:</span>
  • <span class="code-str">whoami</span>       : Menampilkan profil ringkas Wahyu Danuarta
  • <span class="code-str">skills</span>       : Daftar keahlian teknis & stack utama
  • <span class="code-str">projects</span>     : Tampilkan proyek portofolio unggulan
  • <span class="code-str">experience</span>   : Riwayat perjalanan karier & pendidikan
  • <span class="code-str">contact</span>      : Informasi kontak & surel resmi
  • <span class="code-str">socials</span>      : Tautan langsung GitHub & LinkedIn
  • <span class="code-str">sudo hire</span>    : Alur rekrutmen cepat 🚀
  • <span class="code-str">clear</span>        : Bersihkan layar terminal
    `,
    whoami: () => `
<span class="code-var">Wahyu Danuarta</span> - Software Engineer & Full Stack Web Developer
Lokasi: Riau, Indonesia 🇮🇩
Fokus pada perancangan arsitektur web tangguh, aman (Information Security), backend berkinerja tinggi, dan antarmuka pengguna intuitif.
Spesialisasi: PHP/Laravel, Web Security & Hardening (OWASP), MySQL, Intelligent PDF Engine, dan Secure Authentication.
Status: Terbuka untuk peluang kerja profesional (Full-time & Magang)!
    `,
    skills: () => `
<span class="code-var">🛡️ Keamanan & Backend:</span> PHP, Laravel, OWASP Top 10, Multi-Tier RBAC, Shannon Entropy PSV, Anti-IDOR, RESTful APIs
<span class="code-var">📄 Engine & Data:</span> Intelligent PDF Parser (Regex Offset), FPDF, ACID Transactions, MySQL/MariaDB
<span class="code-var">🎨 Frontend & UI:</span> HTML5, Modern CSS3, JavaScript (ES6+), Bootstrap 5, Blade UI, Responsive Layouts
<span class="code-var">🛠️ Tools & DevOps:</span> Git, GitHub, Docker, Postman, Linux, Burp Suite, Nmap, MikroTik RouterOS
    `,
    projects: () => `
<span class="code-var">1. Pemuda Grafika (PGB) - Percetakan Digital & E-Commerce</span> (Laravel, Entropy PSV, Rate Limiting, RBAC & IDOR Guard)
<span class="code-var">2. InventoriSMTR - Logistik & Material Telkom</span> (Laravel, Intelligent PDF Parser, ACID Transactions, RBAC)
<span class="code-var">3. AutoZone Bus Ticketing - Reservasi Tiket Antar-Kota</span> (PHP Native, Prepared Statements SQLi Guard, Anti-IDOR, FPDF)
<span class="code-var">4. Dhuha Driving Center - Manajemen Kursus Mengemudi</span> (Laravel, Scheduling Engine, Payment Gatekeeper, Digital Certificate)
Tip: Gulir ke bagian Proyek untuk melihat demo dan detail studi kasus!
    `,
    experience: () => `
<span class="code-var">💼 Inventory & Asset Mgmt Intern</span> @ PT. Telkom Akses Riau Daratan (Pekanbaru)
<span class="code-var">💼 Web Developer & Security</span> @ Freelance & Independent Projects (2023 - Sekarang)
<span class="code-var">💼 Administration Intern (PKL)</span> @ BAPENDA Kab. Bengkalis (2021)
<span class="code-var">🎓 D4 Keamanan Sistem Informasi (IPK: 3.63)</span> @ Politeknik Negeri Bengkalis (2022 - 2026)
<span class="code-var">🏆 Best Spirit Keamanan Siber</span> @ KMIPN VI 2024 (Tingkat Nasional)
<span class="code-var">📜 Sertifikasi:</span> BNSP Junior Network Administrator & MikroTik MTCNA
    `,
    contact: () => `
<span class="code-var">Surel Resmi:</span> wahyuasegembol23@gmail.com
<span class="code-var">LinkedIn:</span> linkedin.com/in/wahyu-danuarta-0959132b8
<span class="code-var">GitHub:</span> github.com/WahyuDanuarta
<span class="code-var">WhatsApp:</span> 0822-4311-7852
<span class="code-var">Status:</span> Terbuka untuk peluang kerja profesional (Full-time & Magang).
    `,
    socials: () => `
GitHub:   <a href="https://github.com/WahyuDanuarta?tab=repositories" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline;">github.com/WahyuDanuarta</a>
LinkedIn: <a href="https://www.linkedin.com/in/wahyu-danuarta-0959132b8" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline;">linkedin.com/in/wahyu-danuarta-0959132b8</a>
    `,
    'sudo hire': () => `
<span style="color: #10b981; font-weight: bold;">[AKSES DITERIMA] 🎉</span>
Terima kasih atas ketertarikan Anda! Wahyu Danuarta siap berdiskusi mengenai peluang kerja dan kontribusi pada tim Anda.
Surel langsung: <span class="code-str">wahyuasegembol23@gmail.com</span>
Nomor WhatsApp: <span class="code-str">0822-4311-7852</span>
Mari berkolaborasi membangun sistem digital yang andal!
    `,
    clear: () => {
      cliOutput.innerHTML = '';
      return '';
    },
    date: () => new Date().toLocaleString('id-ID')
  };

  function executeCommand(cmdText) {
    const raw = cmdText.trim();
    if (!raw) return;

    if (window.soundEngine) window.soundEngine.playClick();

    // Print command entered
    const cmdLine = document.createElement('div');
    cmdLine.innerHTML = `<span class="cli-command-prompt">visitor@wahyu:~$</span> <span>${escapeHtml(raw)}</span>`;
    cliOutput.appendChild(cmdLine);

    const lower = raw.toLowerCase();
    const resultDiv = document.createElement('div');
    resultDiv.style.marginBottom = '0.85rem';

    if (lower === 'clear') {
      cliOutput.innerHTML = '';
      return;
    }

    if (Object.prototype.hasOwnProperty.call(commands, lower) && typeof commands[lower] === 'function') {
      resultDiv.innerHTML = commands[lower]();
    } else if (lower.startsWith('echo ')) {
      resultDiv.innerText = raw.substring(5);
    } else {
      resultDiv.innerHTML = `<span style="color: #ef4444;">zsh: perintah tidak ditemukan: ${escapeHtml(raw)}. Ketik <span class="code-var">'help'</span> untuk bantuan.</span>`;
    }

    cliOutput.appendChild(resultDiv);
    cliOutput.scrollTop = cliOutput.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(cliInput.value);
      cliInput.value = '';
    }
  });

  shortcutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      executeCommand(cmd);
    });
  });
});
