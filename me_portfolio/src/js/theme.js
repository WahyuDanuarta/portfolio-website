/**
 * Theme Accent Switcher
 * Supports Cyan, Purple, Emerald, and Sunset themes with localStorage persistence.
 */
document.addEventListener('DOMContentLoaded', () => {
  const dots = document.querySelectorAll('.theme-dot');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'cyan';

  function applyTheme(themeName) {
    document.body.classList.remove('theme-purple', 'theme-emerald', 'theme-sunset');
    if (themeName !== 'cyan') {
      document.body.classList.add(`theme-${themeName}`);
    }

    dots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.theme === themeName);
    });

    localStorage.setItem('portfolio_theme', themeName);
  }

  // Set initial theme
  applyTheme(savedTheme);

  // Add click listeners to dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const theme = dot.dataset.theme;
      applyTheme(theme);
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // Sound Toggle button
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    const isMuted = window.soundEngine ? window.soundEngine.isMuted : false;
    updateSoundBtnIcon(soundBtn, isMuted);

    soundBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        const muted = window.soundEngine.toggleMute();
        updateSoundBtnIcon(soundBtn, muted);
        if (!muted) window.soundEngine.playSuccess();
      }
    });
  }

  function updateSoundBtnIcon(btn, isMuted) {
    btn.classList.toggle('muted', isMuted);
    btn.innerHTML = isMuted 
      ? '<i class="fas fa-volume-mute"></i>' 
      : '<i class="fas fa-volume-up"></i>';
    btn.title = isMuted ? 'Unmute UI Sounds' : 'Mute UI Sounds';
  }
});
