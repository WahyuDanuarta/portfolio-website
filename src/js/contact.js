/**
 * Contact Form Validation, Clipboard Copy & Toast Notifications
 */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('portfolioContactForm');
  const toastContainer = document.getElementById('toastContainer');
  const copyButtons = document.querySelectorAll('.btn-copy-item');

  // Show Toast Notification (Safely built using textContent to prevent DOM XSS)
  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const iconColor = type === 'success' ? 'var(--status-success)' : 'var(--status-danger)';

    // Icon
    const iconEl = document.createElement('i');
    iconEl.className = `fas ${iconClass}`;
    iconEl.style.color = iconColor;
    iconEl.style.fontSize = '1.25rem';

    // Text Container
    const textContainer = document.createElement('div');

    const titleEl = document.createElement('div');
    titleEl.style.fontWeight = '700';
    titleEl.style.fontSize = '0.95rem';
    titleEl.style.marginBottom = '2px';
    titleEl.textContent = type === 'success' ? 'Berhasil!' : 'Perhatian';

    const messageEl = document.createElement('div');
    messageEl.style.fontSize = '0.88rem';
    messageEl.style.color = 'var(--text-secondary)';
    messageEl.textContent = message;

    textContainer.appendChild(titleEl);
    textContainer.appendChild(messageEl);

    toast.appendChild(iconEl);
    toast.appendChild(textContainer);

    toastContainer.appendChild(toast);

    if (window.soundEngine) {
      if (type === 'success') window.soundEngine.playSuccess();
      else window.soundEngine.playBeep();
    }

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.35s ease';
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  // Expose globally
  window.showToast = showToast;

  // CV Resume Download Button Action
  const cvDownloadBtn = document.getElementById('cvDownloadBtn');
  if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', () => {
      showToast('CV Resume ATS Wahyu Danuarta siap dikirim. Silakan kontak langsung via surel atau WhatsApp!', 'success');
    });
  }

  // 1-Click Copy Buttons
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
          btn.style.background = 'var(--status-success)';
          btn.style.color = '#fff';

          showToast(`${textToCopy} telah disalin ke papan klip!`);

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }).catch(() => {
          showToast('Gagal menyalin otomatis. Silakan salin manual.', 'error');
        });
      }
    });
  });

  // Contact Form Submission (Hardened against Bot Spam & Rapid Flood)
  let lastSubmitTime = 0;
  const SUBMIT_COOLDOWN_MS = 10000; // 10s cooldown per submission

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Anti-Bot Honeypot Field Check
      const honeypot = document.getElementById('websiteUrl');
      if (honeypot && honeypot.value.trim().length > 0) {
        // Silently reset and simulate success for automated bots
        contactForm.reset();
        showToast('Pesan Anda berhasil diterima.');
        return;
      }

      // 2. Client-Side Submission Rate Limiting
      const now = Date.now();
      if (now - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
        const remainingSeconds = Math.ceil((SUBMIT_COOLDOWN_MS - (now - lastSubmitTime)) / 1000);
        showToast(`Mohon tunggu ${remainingSeconds} detik sebelum mengirim pesan kembali.`, 'error');
        return;
      }

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const messageInput = document.getElementById('senderMessage');
      const submitBtn = document.getElementById('submitContactBtn');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const messageVal = messageInput ? messageInput.value.trim() : '';

      if (!nameVal || !emailVal || !messageVal) {
        showToast('Mohon lengkapi seluruh formulir sebelum mengirim pesan.', 'error');
        return;
      }

      // 3. Email format regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showToast('Format alamat surel (email) tidak valid.', 'error');
        return;
      }

      // 4. Input Length Boundary Check
      if (nameVal.length > 100 || emailVal.length > 150 || messageVal.length > 3000) {
        showToast('Panjang teks melebihi batas yang diperbolehkan.', 'error');
        return;
      }

      lastSubmitTime = Date.now();

      // Simulate sending state
      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim Pesan...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        contactForm.reset();
        showToast(`Terima kasih, ${nameVal}! Pesan Anda berhasil dikirim. Wahyu akan segera merespons.`);
      }, 1000);
    });
  }

  // Code Sandbox Copy
  const copySandboxBtn = document.getElementById('copySandboxBtn');
  if (copySandboxBtn) {
    copySandboxBtn.addEventListener('click', () => {
      const codeBlock = document.querySelector('#sandboxCodePre code');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          showToast('Cuplikan kode berhasil disalin ke papan klip!');
        });
      }
    });
  }
});
