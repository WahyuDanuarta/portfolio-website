/**
 * Skills Matrix Filter & Animated Bars
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('#skills .skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('#skills .skill-card');

  // Trigger skill bar animation when scrolled into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fillBar = entry.target.querySelector('.skill-bar-fill');
        if (fillBar) {
          const targetWidth = fillBar.dataset.width || '80%';
          fillBar.style.width = targetWidth;
        }
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach(card => observer.observe(card));

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      if (window.soundEngine) window.soundEngine.playClick();

      skillCards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        if (category === 'all' || categories.includes(category)) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Detail Handler for Skills
  const modalBackdrop = document.getElementById('detailsModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalCloseBtn');

  skillCards.forEach(card => {
    card.addEventListener('click', () => {
      const nameEl = card.querySelector('.skill-name');
      const pctEl = card.querySelector('.skill-pct');
      const descEl = card.querySelector('.skill-desc');
      if (!nameEl || !pctEl || !descEl) return;

      const skillName = nameEl.innerText;
      const skillPct = pctEl.innerText;
      const skillDesc = descEl.innerText;
      const details = card.dataset.details || 'Berbagai proyek komersial dan open source telah dibangun dengan stack ini.';

      if (modalTitle && modalBody && modalBackdrop) {
        modalTitle.innerHTML = `<i class="fas fa-layer-group" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> ${skillName} (${skillPct})`;
        modalBody.innerHTML = `
          <p style="font-size: 1.05rem; margin-bottom: 1rem; color: var(--text-primary);">${skillDesc}</p>
          <div style="background: rgba(255,255,255,0.04); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass); margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.95rem; color: var(--accent-primary); margin-bottom: 0.5rem; text-transform: uppercase;">Kompetensi & Tooling</h4>
            <p style="color: var(--text-secondary); line-height: 1.7;">${details}</p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span class="neon-badge">Production Ready</span>
            <span class="neon-badge">High Performance</span>
            <span class="neon-badge">Clean Architecture</span>
          </div>
        `;
        modalBackdrop.classList.add('active');
        if (window.soundEngine) window.soundEngine.playClick();
      }
    });
  });

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        modalBackdrop.classList.remove('active');
      }
    });
  }
});
