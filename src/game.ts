// Define the structure for a flash card
export interface FlashCard {
    front: string;
    back: string[];
}

// Sample card data
export const cardData: FlashCard[] = [
    // Greetings
    { front: "Helo", back: ["Hello"] },
    { front: "Bore da", back: ["Good morning"] },
    { front: "Prynhawn da", back: ["Good afternoon"] },
    { front: "Nos da", back: ["Good night"] },
    { front: "Sut mae?", back: ["How are you?"] },
    { front: "Diolch", back: ["Thank you", "Thanks"] },
    { front: "Croeso", back: ["Welcome"] },
    { front: "Hwyl", back: ["Bye"] },
    
    // Travel
    { front: "Ble mae'r tŷ bach?", back: ["Where is the toilet?"] },
    { front: "Gorsaf drenau", back: ["Train station"] },
    { front: "Arhosfan bws", back: ["Bus stop"] },
    { front: "Tocyn", back: ["Ticket"] },
    { front: "Faint?", back: ["How much?"] },
    { front: "Cwrw, os gwelwch yn dda.", back: ["A beer, please."] },
    { front: "Iechyd da!", back: ["Cheers!"] },
    { front: "Dydw i ddim yn deall.", back: ["I don't understand."] },
    { front: "Ydych chi'n siarad Saesneg?", back: ["Do you speak English?"] },
    { front: "Ydw", back: ["Yes"] },
    { front: "Nac ydw", back: ["No"] },
];

// Game state
export const state = {
    maxHealth: 5,
    health: 3,
    score: 0,
    activeCards: [] as { element: HTMLElement, data: FlashCard }[],
    gameSpeed: 1, // Pixels per frame
    cardDeck: [] as FlashCard[],
    paused: false,
};

let spawnTimeoutId: ReturnType<typeof setTimeout>;
let gameLoopId: number;

// DOM Elements
// Initialized in initGameDOM to allow tests to set up JSDOM first.
let gameArea: HTMLElement = null!;
let healthDisplay: HTMLElement = null!;
let scoreDisplay: HTMLElement = null!;
let answerInput: HTMLInputElement = null!;

export function initGameDOM() {
    gameArea = document.getElementById('game-area')!;
    healthDisplay = document.getElementById('health')!;
    scoreDisplay = document.getElementById('score')!;
    answerInput = document.getElementById('answer-input') as HTMLInputElement;

    answerInput.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') return;

        if (state.paused) {
            resumeGame();
            return;
        }

        const answer = answerInput.value.trim();
        answerInput.value = '';

        if (!answer) return;

        if (!handleCorrectAnswer(answer)) {
            document.body.classList.add('shake');
            setTimeout(() => document.body.classList.remove('shake'), 500);
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseGame();
        }
    });
}

function pauseGame() {
    if (state.paused || state.health <= 0) return;
    state.paused = true;
    clearTimeout(spawnTimeoutId);
    if (gameLoopId) cancelAnimationFrame(gameLoopId);

    // Show pause message
    const pauseOverlay = document.createElement('div');
    pauseOverlay.id = 'pause-overlay';
    pauseOverlay.innerHTML = '<h1>Paused</h1><p>Press Enter to continue</p>';
    gameArea.appendChild(pauseOverlay);
}

function resumeGame() {
    if (!state.paused) return;
    state.paused = false;

    // Remove pause message
    const pauseOverlay = document.getElementById('pause-overlay');
    if (pauseOverlay) {
        pauseOverlay.remove();
    }

    // Restart game logic
    gameLoopId = requestAnimationFrame(gameLoop);
    spawnCard();
}

export function updateStats() {
    healthDisplay.textContent = '❤️'.repeat(state.health) + '🖤'.repeat(state.maxHealth - state.health);
    scoreDisplay.textContent = state.score.toString();
}

export function createShuffledDeck() {
    const deck: FlashCard[] = [];
    for (let i = 0; i < 5; i++) {
        deck.push(...cardData);
    }

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    state.cardDeck = deck;
}

export function createCardElement(card: FlashCard): HTMLElement {
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

export function spawnCard() {
    if (state.health <= 0) return; // Don't spawn cards if game is over

    if (!document.hidden) {
        if (state.cardDeck.length === 0) {
            createShuffledDeck();
        }

        const nextCardData = state.cardDeck.pop()!;
        const cardElement = createCardElement(nextCardData);

        gameArea.appendChild(cardElement);
        state.activeCards.push({ element: cardElement, data: nextCardData });
    }

    const spawnDelay = Math.max(8000 - state.score * 250, 2000); // From 8s down to 2s
    spawnTimeoutId = setTimeout(spawnCard, spawnDelay);
}

export function handleCorrectAnswer(answer: string): boolean {
    let cardRemoved = false;
    state.activeCards = state.activeCards.filter(card => {
        if (card.data.back.some(b => b.toLowerCase() === answer.toLowerCase())) {
            card.element.remove();
            state.score++;
            if (state.score > 0 && state.score % 5 === 0 && state.health < state.maxHealth) {
                state.health++;
            }
            cardRemoved = true;
            return false; // Remove from active cards
        }
        return true;
    });

    if (cardRemoved) {
        updateStats();
        // Increase drop speed every 5 points
        state.gameSpeed = 1 + Math.floor(state.score / 5) * 0.2;
    }
    return cardRemoved;
}

export function handleIncorrectCard(card: { element: HTMLElement, data: FlashCard }) {
    state.health--;
    updateStats();

    // Flip card to show answer
    card.element.classList.add('flipped');

    // Remove it after a delay
    setTimeout(() => {
        card.element.remove();
    }, 2000);

    if (state.health <= 0) {
        endGame();
    }
}

export function endGame() {
    // Clear intervals
    clearTimeout(spawnTimeoutId);
    if (gameLoopId) cancelAnimationFrame(gameLoopId);

    // Show game over message
    gameArea.innerHTML = '<h1>Game Over</h1>';
    answerInput.disabled = true;
}

export function gameLoop() {
    if (state.health <= 0) {
        return;
    }
    const gameAreaHeight = gameArea.clientHeight;

    // Move cards down
    state.activeCards = state.activeCards.filter(card => {
        const currentTop = parseFloat(card.element.style.top || '0');
        const newTop = currentTop + state.gameSpeed;
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


// Start the game
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
    initGameDOM();
    updateStats();
    createShuffledDeck();
    spawnCard(); // Start the first card spawn, which will schedule the next one
    gameLoopId = requestAnimationFrame(gameLoop);
}
