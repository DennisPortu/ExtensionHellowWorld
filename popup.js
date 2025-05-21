const btn = document.getElementById('gameBtn');
const result = document.getElementById('result');
const rankingDiv = document.getElementById('ranking');
const playerInput = document.getElementById('playerName');
const currentPlayer = document.getElementById('currentPlayer');
let player = '';
let startTime, timeout;
let ready = false;

function startSession() {
  player = playerInput.value.trim();
  if (!player || player.length < 2) {
    return alert('Posa un nom vàlid (mínim 2 caràcters)!');
  }
  localStorage.setItem('currentPlayer', player);
  document.getElementById('login').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  currentPlayer.textContent = player;
  updateRanking();
  startGame();
}

function startGame() {
  btn.style.backgroundColor = 'red';
  btn.textContent = 'Espera...';
  result.textContent = '';
  ready = false;

  const delay = Math.random() * 3000 + 2000;

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
    result.textContent = 'Has fet trampes!';
    setTimeout(startGame, 2000);
  } else {
    const reactionTime = Date.now() - startTime;
    result.textContent = `Temps de reacció: ${reactionTime} ms`;
    saveBestTime(player, reactionTime);
    updateRanking();
    setTimeout(startGame, 2000);
  }
});

function saveBestTime(player, time) {
  const data = JSON.parse(localStorage.getItem('ranking')) || {};
  if (!data[player] || time < data[player]) {
    data[player] = time;
    localStorage.setItem('ranking', JSON.stringify(data));
  }
}

function updateRanking() {
  const data = JSON.parse(localStorage.getItem('ranking')) || {};
  const sorted = Object.entries(data).sort((a, b) => a[1] - b[1]);
  rankingDiv.innerHTML = '';
  sorted.forEach(([name, time], i) => {
    rankingDiv.innerHTML += `<div>${i + 1}. ${name}: ${time} ms</div>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', startSession);
  }

  const resetBtn = document.getElementById('resetRankingBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('ranking');
      updateRanking();
    });
  }

  const savedPlayer = localStorage.getItem('currentPlayer');
  if (savedPlayer) {
    playerInput.value = savedPlayer;
  }
});
