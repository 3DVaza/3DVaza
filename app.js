const installBtn = document.getElementById('installBtn');
let deferredPrompt;

if (installBtn) {
  // ANDROID
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';

    installBtn.onclick = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(() => deferredPrompt = null);
      }
    };
  });

  // iOS
  const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;

  if (isIos && !isInStandaloneMode) {
    installBtn.style.display = 'block';
    installBtn.onclick = () => {
      alert("📱 На iPhone установка делается вручную:\n\n1. Нажмите «Поделиться» (иконка внизу Safari).\n2. Выберите «На экран Домой».\n3. Подтвердите установку.");
    };
  }
}
