/**
 * Theme Accent Switcher
 * Supports Cyan, Purple, Emerald, and Sunset themes with localStorage persistence.
 */
document.addEventListener('DOMContentLoaded', () => {
  const dots = document.querySelectorAll('.theme-dot');
  const VALID_THEMES = ['cyan', 'purple', 'emerald', 'sunset'];
  const storedTheme = localStorage.getItem('portfolio_theme');
  const savedTheme = VALID_THEMES.includes(storedTheme) ? storedTheme : 'cyan';

  function applyTheme(themeName) {
    const validTheme = VALID_THEMES.includes(themeName) ? themeName : 'cyan';

    document.body.classList.remove('theme-purple', 'theme-emerald', 'theme-sunset');
    if (validTheme !== 'cyan') {
      document.body.classList.add(`theme-${validTheme}`);
    }

    dots.forEach(dot => {
      dot.classList.toggle('active', dot.dataset.theme === validTheme);
    });

    localStorage.setItem('portfolio_theme', validTheme);
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
