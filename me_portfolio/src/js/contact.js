/**
 * Contact Form Validation, Clipboard Copy & Toast Notifications
 */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('portfolioContactForm');
  const toastContainer = document.getElementById('toastContainer');
  const copyButtons = document.querySelectorAll('.btn-copy-item');

  // Show Toast Notification
  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const iconColor = type === 'success' ? 'var(--status-success)' : 'var(--status-danger)';

    toast.innerHTML = `
      <i class="fas ${icon}" style="color: ${iconColor}; font-size: 1.25rem;"></i>
      <div>
        <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 2px;">${type === 'success' ? 'Berhasil!' : 'Perhatian'}</div>
        <div style="font-size: 0.88rem; color: var(--text-secondary);">${message}</div>
      </div>
    `;

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

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const messageInput = document.getElementById('senderMessage');
      const submitBtn = document.getElementById('submitContactBtn');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Mohon lengkapi seluruh formulir sebelum mengirim pesan.', 'error');
        return;
      }

      // Simulate sending state
      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim Pesan...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        contactForm.reset();
        showToast(`Terima kasih, ${nameInput.value.trim()}! Pesan Anda berhasil dikirim. Wahyu akan segera merespons.`);
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
