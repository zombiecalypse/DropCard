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

    // Food and Drink
    { front: "Bara", back: ["Bread"] },
    { front: "Caws", back: ["Cheese"] },
    { front: "Dŵr", back: ["Water"] },
    { front: "Gwin", back: ["Wine"] },
    { front: "Te", back: ["Tea"] },
    { front: "Coffi", back: ["Coffee"] },
    { front: "Llaeth", back: ["Milk"] },
    { front: "Cig", back: ["Meat"] },
    { front: "Pysgod", back: ["Fish"] },
    { front: "Llysiau", back: ["Vegetables"] },
    { front: "Ffrwythau", back: ["Fruit"] },
    { front: "Brecwast", back: ["Breakfast"] },
    { front: "Cinio", back: ["Lunch", "Dinner"] },
    { front: "Swper", back: ["Supper"] },
    { front: "Pwdin", back: ["Pudding", "Dessert"] },
    { front: "Halen", back: ["Salt"] },
    { front: "Pupur", back: ["Pepper"] },
    { front: "Siwgr", back: ["Sugar"] },
    { front: "Bwyty", back: ["Restaurant"] },
    { front: "Tafarn", back: ["Pub"] },
    { front: "Cawl", back: ["Soup"] },
    { front: "Cacen", back: ["Cake"] },
    { front: "Tatws", back: ["Potatoes"] },
    { front: "Sglodion", back: ["Chips"] },
    { front: "Wyau", back: ["Eggs"] },

    // Numbers
    { front: "Un", back: ["One"] },
    { front: "Dau", back: ["Two"] },
    { front: "Tri", back: ["Three"] },
    { front: "Pedwar", back: ["Four"] },
    { front: "Pump", back: ["Five"] },
    { front: "Chwech", back: ["Six"] },
    { front: "Saith", back: ["Seven"] },
    { front: "Wyth", back: ["Eight"] },
    { front: "Naw", back: ["Nine"] },
    { front: "Deg", back: ["Ten"] },
    { front: "Un deg un", back: ["Eleven"] },
    { front: "Un deg dau", back: ["Twelve"] },
    { front: "Ugain", back: ["Twenty"] },
    { front: "Cant", back: ["One hundred"] },
    { front: "Mil", back: ["One thousand"] },

    // Days of the Week & Time
    { front: "Dydd Llun", back: ["Monday"] },
    { front: "Dydd Mawrth", back: ["Tuesday"] },
    { front: "Dydd Mercher", back: ["Wednesday"] },
    { front: "Dydd Iau", back: ["Thursday"] },
    { front: "Dydd Gwener", back: ["Friday"] },
    { front: "Dydd Sadwrn", back: ["Saturday"] },
    { front: "Dydd Sul", back: ["Sunday"] },
    { front: "Heddiw", back: ["Today"] },
    { front: "Yfory", back: ["Tomorrow"] },
    { front: "Ddoe", back: ["Yesterday"] },
    { front: "Nawr", back: ["Now"] },
    { front: "Yn ddiweddarach", back: ["Later"] },
    { front: "Amser", back: ["Time"] },
    { front: "Awr", back: ["Hour"] },
    { front: "Munud", back: ["Minute"] },

    // Places
    { front: "Cymru", back: ["Wales"] },
    { front: "Lloegr", back: ["England"] },
    { front: "Caerdydd", back: ["Cardiff"] },
    { front: "Abertawe", back: ["Swansea"] },
    { front: "Bangor", back: ["Bangor"] },
    { front: "Castell", back: ["Castle"] },
    { front: "Traeth", back: ["Beach"] },
    { front: "Mynydd", back: ["Mountain"] },
    { front: "Afon", back: ["River"] },
    { front: "Llyn", back: ["Lake"] },
    { front: "Siop", back: ["Shop"] },
    { front: "Marchnad", back: ["Market"] },
    { front: "Ysbyty", back: ["Hospital"] },
    { front: "Fferyllfa", back: ["Pharmacy"] },
    { front: "Gwesty", back: ["Hotel"] },
    { front: "Canol y dref", back: ["Town centre"] },
    { front: "Eglwys", back: ["Church"] },
    { front: "Amgueddfa", back: ["Museum"] },
    { front: "Parc", back: ["Park"] },
    { front: "Coedwig", back: ["Forest"] },

    // Directions
    { front: "I'r chwith", back: ["To the left"] },
    { front: "I'r dde", back: ["To the right"] },
    { front: "Yn syth ymlaen", back: ["Straight on"] },
    { front: "Gogledd", back: ["North"] },
    { front: "De", back: ["South"] },
    { front: "Dwyrain", back: ["East"] },
    { front: "Gorllewin", back: ["West"] },
    { front: "I fyny", back: ["Up"] },
    { front: "I lawr", back: ["Down"] },
    { front: "Ble?", back: ["Where?"] },

    // Common Phrases & Questions
    { front: "Pwy?", back: ["Who?"] },
    { front: "Pryd?", back: ["When?"] },
    { front: "Pam?", back: ["Why?"] },
    { front: "Beth?", back: ["What?"] },
    { front: "Sut?", back: ["How?"] },
    { front: "Esgusodwch fi", back: ["Excuse me"] },
    { front: "Mae'n ddrwg gen i", back: ["I'm sorry"] },
    { front: "Os gwelwch yn dda", back: ["Please"] },
    { front: "Help!", back: ["Help!"] },
    { front: "Beth yw eich enw?", back: ["What is your name?"] },
    { front: "Fy enw i yw...", back: ["My name is..."] },
    { front: "Dw i'n dod o...", back: ["I come from..."] },
    { front: "Ble dych chi'n byw?", back: ["Where do you live?"] },
    { front: "Dw i'n byw yn...", back: ["I live in..."] },
    { front: "Beth sy'n bod?", back: ["What's wrong?"] },

    // People/Family
    { front: "Dyn", back: ["Man"] },
    { front: "Dynes", back: ["Woman"] },
    { front: "Bachgen", back: ["Boy"] },
    { front: "Merch", back: ["Girl", "Daughter"] },
    { front: "Ffrind", back: ["Friend"] },
    { front: "Teulu", back: ["Family"] },
    { front: "Tad", back: ["Father"] },
    { front: "Mam", back: ["Mother"] },
    { front: "Brawd", back: ["Brother"] },
    { front: "Chwaer", back: ["Sister"] },
    { front: "Mab", back: ["Son"] },
    { front: "Gŵr", back: ["Husband"] },
    { front: "Gwraig", back: ["Wife"] },
    { front: "Plant", back: ["Children"] },
    { front: "Pobl", back: ["People"] },

    // Adjectives/Common Words
    { front: "Mawr", back: ["Big"] },
    { front: "Bach", back: ["Small"] },
    { front: "Da", back: ["Good"] },
    { front: "Drwg", back: ["Bad"] },
    { front: "Poeth", back: ["Hot"] },
    { front: "Oer", back: ["Cold"] },
    { front: "Newydd", back: ["New"] },
    { front: "Hen", back: ["Old"] },
    { front: "Hardd", back: ["Beautiful", "Pretty"] },
    { front: "Hapus", back: ["Happy"] },
    { front: "Trist", back: ["Sad"] },
    { front: "Hawdd", back: ["Easy"] },
    { front: "Anodd", back: ["Difficult"] },
    { front: "Agored", back: ["Open"] },
    { front: "Ar gau", back: ["Closed"] },

    // Weather
    { front: "Tywydd", back: ["Weather"] },
    { front: "Mae hi'n bwrw glaw", back: ["It's raining"] },
    { front: "Mae hi'n heulog", back: ["It's sunny"] },
    { front: "Mae hi'n wyntog", back: ["It's windy"] },
    { front: "Mae hi'n oer", back: ["It's cold"] },
    { front: "Mae hi'n boeth", back: ["It's hot"] },
    { front: "Cymylog", back: ["Cloudy"] },
    { front: "Eira", back: ["Snow"] },
    { front: "Niwl", back: ["Fog"] },
    { front: "Storm", back: ["Storm"] },

    // Shopping
    { front: "Arian", back: ["Money"] },
    { front: "Cerdyn credyd", back: ["Credit card"] },
    { front: "Pres", back: ["Cash"] },
    { front: "Derbynneb", back: ["Receipt"] },
    { front: "Rhad", back: ["Cheap"] },
    { front: "Drud", back: ["Expensive"] },
    { front: "Anrheg", back: ["Gift"] },
    { front: "Hoffwn i...", back: ["I would like..."] },
    { front: "Ga i...", back: ["Can I have..."] },
    { front: "Dim ond edrych, diolch", back: ["Just looking, thanks"] },

    // Transport
    { front: "Car", back: ["Car"] },
    { front: "Bws", back: ["Bus"] },
    { front: "Trên", back: ["Train"] },
    { front: "Beic", back: ["Bike"] },
    { front: "Awyren", back: ["Aeroplane"] },
    { front: "Maes awyr", back: ["Airport"] },
    { front: "Ffordd", back: ["Road"] },
    { front: "Gorsaf", back: ["Station"] },
    { front: "Tacsi", back: ["Taxi"] },
    { front: "Pryd mae'r bws nesaf?", back: ["When is the next bus?"] },

    // Emergencies
    { front: "Heddlu", back: ["Police"] },
    { front: "Ambiwlans", back: ["Ambulance"] },
    { front: "Tân", back: ["Fire"] },
    { front: "Helpwch fi!", back: ["Help me!"] },
    { front: "Dw i ar goll", back: ["I am lost"] },
    { front: "Ffoniwch yr heddlu", back: ["Call the police"] },
    { front: "Angen meddyg", back: ["I need a doctor"] },
    { front: "Damwain", back: ["Accident"] },
    { front: "Ble mae'r ysbyty agosaf?", back: ["Where is the nearest hospital?"] },
    { front: "Stopiwch!", back: ["Stop!"] },

    // Nature and Animals
    { front: "Draig", back: ["Dragon"] },
    { front: "Ci", back: ["Dog"] },
    { front: "Cath", back: ["Cat"] },
    { front: "Dafad", back: ["Sheep"] },
    { front: "Aderyn", back: ["Bird"] },
    { front: "Coeden", back: ["Tree"] },
    { front: "Blodyn", back: ["Flower"] },
    { front: "Môr", back: ["Sea"] },
    { front: "Seren", back: ["Star"] },
    { front: "Lleuad", back: ["Moon"] },
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
