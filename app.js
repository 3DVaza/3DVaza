let deferredPrompt;
const installBtn = document.getElementById('installBtn');

if (installBtn) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(() => deferredPrompt = null);
      } else {
        alert("⚠️ Установка доступна только через меню браузера (Поделиться → Добавить на экран).");
      }
    });
  });
} else {
  console.log("Кнопка установки не найдена на странице.");
}
