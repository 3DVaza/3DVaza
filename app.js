// app.js - install flow + small UX helpers
const installBtn = document.getElementById('installBtn');
const installBtnFooter = document.getElementById('installBtnFooter');
let deferredPrompt = null;

function showInstallMessageIos() {
  // Custom modal style: simple alert fallback
  alert("📱 На iPhone (iOS) установка: откройте меню Safari → «Поделиться» → «На экран Домой».");
}

function bindInstall(el) {
  if (!el) return;
  el.addEventListener('click', async (ev) => {
    // Android flow
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      deferredPrompt = null;
      return;
    }
    // iOS flow or unsupported browser
    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isInStandaloneMode = ('standalone' in window.navigator) && window.navigator.standalone;
    if (isIos && !isInStandaloneMode) {
      showInstallMessageIos();
      return;
    }
    // fallback
    alert("Установка приложения недоступна в вашем браузере. Попробуйте открыть сайт в Chrome на Android или используйте меню браузера.");
  });
}

// Listen for beforeinstallprompt (Android / supported browsers)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // show available install buttons
  const btns = document.querySelectorAll('#installBtn, #installBtnFooter');
  btns.forEach(b => { if (b) b.style.display = 'inline-block'; });
});

bindInstall(installBtn);
bindInstall(installBtnFooter);

// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(reg => {
    console.log('ServiceWorker registered', reg);
  }).catch(err => console.warn('SW registration failed', err));
}

// small accessibility: allow Enter on product list items
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement && document.activeElement.matches('.product-list li')) {
    document.activeElement.click();
  }
});