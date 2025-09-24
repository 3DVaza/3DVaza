// Fade-up animation
const fadeElems = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
fadeElems.forEach(el => observer.observe(el));

// Установка PWA
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});
installBtn.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('User choice:', outcome);
    deferredPrompt = null;
  } else {
    alert('На iOS установка через кнопку недоступна. Используйте «Поделиться → На экран Домой»');
  }
});
