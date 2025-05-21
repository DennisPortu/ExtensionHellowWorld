const btn = document.getElementById('gameBtn');
const result = document.getElementById('result');

let startTime;
let timeout;
let ready = false;

function startGame() {
  btn.style.backgroundColor = 'red';
  btn.textContent = 'Espera...';
  result.textContent = '';
  ready = false;

  const delay = Math.random() * 3000 + 2000; // entre 2s i 5s

  timeout = setTimeout(() => {
    btn.style.backgroundColor = 'green';
    btn.textContent = 'Clica ara!';
    startTime = Date.now();
    ready = true;
  }, delay);
}

btn.addEventListener('click', () => {
  if (!ready) {
    clearTimeout(timeout);
    result.textContent = 'Has fet trampes! 🙃';
  } else {
    const reactionTime = Date.now() - startTime;
    result.textContent = `Temps de reacció: ${reactionTime} ms`;
  }
  setTimeout(startGame, 2000);
});

startGame();
