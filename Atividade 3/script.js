const GAME_DURATION = 15000; 
const SPAWN_INTERVAL = 800; 
const MASK_LIFETIME = 1200; 

const gameContainer = document.getElementById('game-container');
const playArea = document.getElementById('play-area');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let score = 0;
let isGameActive = false;
let gameInterval;
let gameDurationTimeout;

function startGame() {
    if (isGameActive) return;

    isGameActive = true;
    score = 0;
    scoreDisplay.textContent = score;
    startBtn.style.display = 'none';

    gameInterval = setInterval(spawnMask, SPAWN_INTERVAL);

    gameDurationTimeout = setTimeout(endGame, GAME_DURATION);
}

function spawnMask() {
    if (!isGameActive) return;

    const mask = document.createElement('div');
    mask.className = 'mask-enemy';

    const maxTop = playArea.offsetHeight - 150;
    const maxLeft = playArea.offsetWidth - 110;
    
    mask.style.top = `${Math.random() * maxTop}px`;
    mask.style.left = `${Math.random() * maxLeft}px`;

    setTimeout(() => mask.classList.add('show'), 50);

    mask.addEventListener('click', hitMask);

    const fadeOutTimeout = setTimeout(() => {
        removeMask(mask);
    }, MASK_LIFETIME);

    mask.dataset.fadeOutTimeout = fadeOutTimeout;

    playArea.appendChild(mask);
}

function hitMask(event) {
    if (!isGameActive) return;

    const mask = event.target;
    
    clearTimeout(mask.dataset.fadeOutTimeout);

    createClickFeedback(event.clientX, event.clientY);
    mask.classList.add('fade-out');

    score += 10;
    scoreDisplay.textContent = score;

    setTimeout(() => mask.remove(), 300);
}

function createClickFeedback(x, y) {
    const particle = document.createElement('div');
    particle.className = 'hit-particle';
    
    const rect = gameContainer.getBoundingClientRect();
    particle.style.left = `${x - rect.left}px`;
    particle.style.top = `${y - rect.top}px`;
    
    const size = Math.random() * 30 + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    gameContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 500);
}

function removeMask(mask) {
    if (mask.parentNode === playArea) {
        mask.remove();
    }
}

function endGame() {
    isGameActive = false;
    clearInterval(gameInterval);
    
    while (playArea.firstChild) {
        playArea.removeChild(playArea.firstChild);
    }

    startBtn.style.display = 'block';
    alert(`FIM DE JOGO!\nSua pontuação final foi: ${score}`);
}

startBtn.addEventListener('click', startGame);


