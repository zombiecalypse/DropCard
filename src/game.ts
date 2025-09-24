// Define the structure for a flash card
interface FlashCard {
    front: string;
    back: string;
}

// Sample card data
const cardData: FlashCard[] = [
    { front: "犬", back: "dog" },
    { front: "猫", back: "cat" },
    { front: "鳥", back: "bird" },
    { front: "魚", back: "fish" },
    { front: "馬", back: "horse" },
    { front: "牛", back: "cow" },
    { front: "羊", back: "sheep" },
    { front: "猿", back: "monkey" },
    { front: "象", back: "elephant" },
    { front: "ライオン", back: "lion" },
];

// Game state
let health = 3;
let score = 0;
let activeCards: { element: HTMLElement, data: FlashCard }[] = [];
const gameSpeed = 1; // Pixels per frame

// DOM Elements
const gameArea = document.getElementById('game-area')!;
const healthDisplay = document.getElementById('health')!;
const scoreDisplay = document.getElementById('score')!;
const answerInput = document.getElementById('answer-input') as HTMLInputElement;

function updateStats() {
    healthDisplay.textContent = health.toString();
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
    back.textContent = card.back;

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
}

function handleCorrectAnswer(answer: string) {
    let cardRemoved = false;
    activeCards = activeCards.filter(card => {
        if (card.data.back.toLowerCase() === answer.toLowerCase()) {
            card.element.remove();
            score++;
            cardRemoved = true;
            return false; // Remove from active cards
        }
        return true;
    });

    if (cardRemoved) {
        updateStats();
        answerInput.value = '';
    }
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
    clearInterval(spawnInterval);
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
answerInput.addEventListener('input', () => {
    handleCorrectAnswer(answerInput.value.trim());
});

// Start the game
updateStats();
const spawnInterval = setInterval(spawnCard, 2000); // Spawn a new card every 2 seconds
let gameLoopId = requestAnimationFrame(gameLoop);
