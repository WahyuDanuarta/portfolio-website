/**
 * Projects Showcase Filter & Deep Dive Modal
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('#projects .projects-filter-nav .filter-btn');
  const projectCards = document.querySelectorAll('#projects .project-card');
  const modalBackdrop = document.getElementById('detailsModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  // Filter Projects
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      if (window.soundEngine) window.soundEngine.playClick();

      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Details Modal Trigger
  const detailButtons = document.querySelectorAll('.btn-details-trigger');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.project-card');
      if (!card) return;

      const titleEl = card.querySelector('.project-title');
      const descEl = card.querySelector('.project-summary');
      const imgEl = card.querySelector('.project-thumb-img');
      const tagsEl = card.querySelector('.project-tech-pills');
      if (!titleEl || !descEl || !imgEl || !tagsEl) return;

      const title = titleEl.innerText;
      const desc = descEl.innerText;
      const imgSrc = imgEl.getAttribute('src');
      const tags = tagsEl.innerHTML;
      const details = card.dataset.fullDetails || 'Aplikasi enterprise dirancang dengan clean code pattern, pemisahan service layer, database indexing optimal, serta otentikasi role-based yang aman.';

      if (modalTitle && modalBody && modalBackdrop) {
        modalTitle.innerHTML = `<i class="fas fa-rocket" style="color: var(--accent-primary); margin-right: 0.5rem;"></i> ${title}`;
        modalBody.innerHTML = `
          <div style="margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden; max-height: 320px; border: 1px solid var(--border-glass);">
            <img src="${imgSrc}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <p style="font-size: 1.05rem; line-height: 1.8; color: var(--text-primary); margin-bottom: 1.25rem;">${desc}</p>
          <div style="background: rgba(255,255,255,0.03); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-glass); margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.95rem; color: var(--accent-primary); margin-bottom: 0.5rem; text-transform: uppercase;">Arsitektur & Fitur Unggulan</h4>
            <p style="color: var(--text-secondary); line-height: 1.7;">${details}</p>
          </div>
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase;">Teknologi Digunakan</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">${tags}</div>
          </div>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="#contact" class="btn btn-primary" onclick="document.getElementById('detailsModal').classList.remove('active');">
              <i class="fas fa-paper-plane"></i> Konsultasikan Proyek Serupa
            </a>
          </div>
        `;
        modalBackdrop.classList.add('active');
        if (window.soundEngine) window.soundEngine.playClick();
      }
    });
  });
});
