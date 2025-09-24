// Define the structure for a flash card
interface FlashCard {
    front: string;
    back: string[];
}

// Sample card data
const cardData: FlashCard[] = [
    { front: "Helo", back: ["Hello"] },
    { front: "Bore da", back: ["Good morning"] },
    { front: "Prynhawn da", back: ["Good afternoon"] },
    { front: "Nos da", back: ["Good night"] },
    { front: "Sut mae?", back: ["How are you?"] },
    { front: "Diolch", back: ["Thank you", "Thanks"] },
    { front: "Croeso", back: ["Welcome"] },
    { front: "Hwyl", back: ["Bye"] },
];

// Game state
const maxHealth = 5;
let health = 3;
let score = 0;
let activeCards: { element: HTMLElement, data: FlashCard }[] = [];
let gameSpeed = 1; // Pixels per frame
let spawnTimeoutId: number;

// DOM Elements
const gameArea = document.getElementById('game-area')!;
const healthDisplay = document.getElementById('health')!;
const scoreDisplay = document.getElementById('score')!;
const answerInput = document.getElementById('answer-input') as HTMLInputElement;

function updateStats() {
    healthDisplay.textContent = '❤️'.repeat(health) + '🖤'.repeat(maxHealth - health);
    scoreDisplay.textContent = score.toString();
}

function createCardElement(card: FlashCard): HTMLElement {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    const front = document.createElement('div');
    front.className = 'front';
    front.textContent = card.front;

    const back = document.createElement('div');
    back.className = 'back';
    back.textContent = card.back.join(' / ');

    cardElement.appendChild(front);
    cardElement.appendChild(back);
    
    // Random horizontal position
    const gameAreaWidth = gameArea.clientWidth;
    const cardWidth = 100; // should match CSS
    cardElement.style.left = `${Math.random() * (gameAreaWidth - cardWidth)}px`;
    cardElement.style.top = `-60px`; // Start off-screen (card height)

    return cardElement;
}

function spawnCard() {
    if (document.hidden || health <= 0) return; // Don't spawn cards if tab is not active or game is over

    const randomCardData = cardData[Math.floor(Math.random() * cardData.length)];
    const cardElement = createCardElement(randomCardData);

    gameArea.appendChild(cardElement);
    activeCards.push({ element: cardElement, data: randomCardData });

    const spawnDelay = Math.max(8000 - score * 250, 2000); // From 8s down to 2s
    spawnTimeoutId = setTimeout(spawnCard, spawnDelay);
}

function handleCorrectAnswer(answer: string): boolean {
    let cardRemoved = false;
    activeCards = activeCards.filter(card => {
        if (card.data.back.some(b => b.toLowerCase() === answer.toLowerCase())) {
            card.element.remove();
            score++;
            if (score > 0 && score % 5 === 0 && health < maxHealth) {
                health++;
            }
            cardRemoved = true;
            return false; // Remove from active cards
        }
        return true;
    });

    if (cardRemoved) {
        updateStats();
        // Increase drop speed every 5 points
        gameSpeed = 1 + Math.floor(score / 5) * 0.2;
    }
    return cardRemoved;
}

function handleIncorrectCard(card: { element: HTMLElement, data: FlashCard }) {
    health--;
    updateStats();

    // Flip card to show answer
    card.element.classList.add('flipped');

    // Remove it after a delay
    setTimeout(() => {
        card.element.remove();
    }, 2000);

    if (health <= 0) {
        endGame();
    }
}

function endGame() {
    // Clear intervals
    clearTimeout(spawnTimeoutId);
    if (gameLoopId) cancelAnimationFrame(gameLoopId);

    // Show game over message
    gameArea.innerHTML = '<h1>Game Over</h1>';
    answerInput.disabled = true;
}

function gameLoop() {
    if (health <= 0) {
        return;
    }
    const gameAreaHeight = gameArea.clientHeight;

    // Move cards down
    activeCards = activeCards.filter(card => {
        const currentTop = parseFloat(card.element.style.top || '0');
        const newTop = currentTop + gameSpeed;
        card.element.style.top = `${newTop}px`;

        // Check if card hits the bottom
        if (newTop + 60 >= gameAreaHeight) { // 60 is card height
            handleIncorrectCard(card);
            return false; // Remove from active cards
        }
        return true;
    });

    gameLoopId = requestAnimationFrame(gameLoop);
}

// Event Listeners
answerInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;

    const answer = answerInput.value.trim();
    answerInput.value = '';

    if (!answer) return;

    if (!handleCorrectAnswer(answer)) {
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
    }
});

// Start the game
updateStats();
spawnCard(); // Start the first card spawn, which will schedule the next one
let gameLoopId = requestAnimationFrame(gameLoop);
