import { FlashCard, cardProvider } from './cards.js';

export const cardData = cardProvider.getCards();

interface ActiveCard {
    element: HTMLElement;
    data: FlashCard;
    speedMultiplier: number;
}


// Game state
export const state = {
    maxHealth: 5,
    health: 3,
    score: 0,
    activeCards: [] as ActiveCard[],
    gameSpeed: 1, // Pixels per frame
    cardDeck: [] as FlashCard[],
    paused: false,
    unlockedCardsCount: 0,
    newCardThreshold: 0,
    debug: false,
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

        if (state.health <= 0) {
            restartGame();
            return;
        }

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

function restartGame() {
    // Clear game area of cards and "Game Over" message
    gameArea.innerHTML = '';

    // Reset game state
    state.health = 3; // Initial health
    state.score = 0;
    state.activeCards = [];
    state.cardDeck = [];
    state.paused = false;
    state.gameSpeed = 1;
    state.unlockedCardsCount = 0;
    state.newCardThreshold = 0;

    answerInput.disabled = false;
    answerInput.value = '';

    // Restart game processes
    updateStats();
    createShuffledDeck();
    spawnCard();
    gameLoopId = requestAnimationFrame(gameLoop);
}

export function updateStats() {
    healthDisplay.textContent = '❤️'.repeat(state.health) + '🖤'.repeat(state.maxHealth - state.health);
    scoreDisplay.textContent = state.score.toString();
}

function updateDebugPanel() {
    if (!state.debug) return;

    const debugPanel = document.getElementById('debug-panel');
    if (!debugPanel) return;

    debugPanel.style.display = 'block';

    const unlockedCards = cardData.slice(0, state.unlockedCardsCount);
    unlockedCards.sort((a, b) => a.front[0].localeCompare(b.front[0]));

    let content = '<h2>Unlocked Cards</h2><ul>';
    unlockedCards.forEach(card => {
        content += `<li><b>${card.front.join(' / ')}</b>: ${card.back.join(' / ')}</li>`;
    });
    content += '</ul>';
    debugPanel.innerHTML = content;
}

export function createShuffledDeck() {
    state.newCardThreshold = state.unlockedCardsCount;
    if (state.unlockedCardsCount === 0) {
        // Start with the first 10 cards
        state.unlockedCardsCount = 10;
    } else {
        // Add 10 more cards, up to the total number of cards available
        state.unlockedCardsCount = Math.min(state.unlockedCardsCount + 10, cardData.length);
    }

    const cardsToShuffle = cardData.slice(0, state.unlockedCardsCount);

    const deck: FlashCard[] = [];
    for (let i = 0; i < 3; i++) {
        deck.push(...cardsToShuffle);
    }

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    state.cardDeck = deck;
    updateDebugPanel();
}

export function createCardElement(card: FlashCard): HTMLElement {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    const front = document.createElement('div');
    front.className = 'front';
    front.textContent = card.front.join(' / ');

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

        const cardIndex = cardData.indexOf(nextCardData);
        let speedMultiplier = 1.0;
        if (state.newCardThreshold > 0 && cardIndex >= state.newCardThreshold) {
            speedMultiplier = 0.5; // New cards are slower
        }

        const longestAnswerLength = Math.max(...nextCardData.back.map(answer => answer.length));
        const baseLength = 10;
        const lengthAdjustmentFactor = 0.05;
        const lengthMultiplier = Math.max(0.25, 1 + (baseLength - longestAnswerLength) * lengthAdjustmentFactor);
        speedMultiplier *= lengthMultiplier;

        gameArea.appendChild(cardElement);
        state.activeCards.push({ element: cardElement, data: nextCardData, speedMultiplier });
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

export function handleIncorrectCard(card: ActiveCard) {
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
    gameArea.innerHTML = '<h1>Game Over</h1><p>Press Enter to restart</p>';
}

export function gameLoop() {
    if (state.health <= 0) {
        return;
    }
    const gameAreaHeight = gameArea.clientHeight;

    // Move cards down
    state.activeCards = state.activeCards.filter(card => {
        const currentTop = parseFloat(card.element.style.top || '0');
        const newTop = currentTop + (state.gameSpeed * card.speedMultiplier);
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
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') === 'true') {
        state.debug = true;
    }

    initGameDOM();
    updateStats();
    createShuffledDeck();
    spawnCard(); // Start the first card spawn, which will schedule the next one
    gameLoopId = requestAnimationFrame(gameLoop);
}
