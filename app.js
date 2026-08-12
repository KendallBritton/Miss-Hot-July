const surpriseButton = document.getElementById('surpriseButton');

function spawnCuteBurst() {
  const container = document.querySelector('.surface') || document.body;
  const burst = document.createElement('div');
  burst.className = 'cute-burst';

  const icons = ['💚', '✨', '🌿', '🍃', '🌼'];
  const count = 8 + Math.floor(Math.random() * 5);

  for (let i = 0; i < count; i += 1) {
    const icon = document.createElement('span');
    icon.className = 'burst-item';
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = `${10 + Math.random() * 80}%`;
    icon.style.top = `${20 + Math.random() * 60}%`;
    icon.style.fontSize = `${18 + Math.random() * 18}px`;
    icon.style.animationDelay = `${Math.random() * 0.4}s`;
    burst.appendChild(icon);
  }

  container.appendChild(burst);
  setTimeout(() => burst.remove(), 2600);
}

if (surpriseButton) {
  surpriseButton.addEventListener('click', spawnCuteBurst);
}
