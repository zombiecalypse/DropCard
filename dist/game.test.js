import * as fs from 'fs';
import * as path from 'path';
import { state, createShuffledDeck, handleCorrectAnswer, initGameDOM, updateStats } from './game';
import { getCardProvider } from './cards';
describe('FlashCard Game Tests', () => {
    beforeEach(() => {
        // Load the HTML content into JSDOM
        const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        document.body.innerHTML = html;
        initGameDOM();
        // Reset state before each test
        state.health = 3;
        state.score = 0;
        state.activeCards = [];
        state.cardDeck = [];
        state.gameSpeed = 1;
        // Clear the game area
        const gameArea = document.getElementById('game-area');
        if (gameArea) {
            gameArea.innerHTML = '';
        }
    });
    describe('Card Providers', () => {
        it('should return default cards when no mode is specified', () => {
            const defaultProvider = getCardProvider();
            const defaultCards = defaultProvider.getCards();
            const heloCard = defaultCards.find(c => c.front[0] === 'Helo');
            expect(heloCard === null || heloCard === void 0 ? void 0 : heloCard.back[0]).toBe('Hello');
        });
        it('should return reversed cards for "reverse" mode', () => {
            const reverseProvider = getCardProvider('reverse');
            const reversedCards = reverseProvider.getCards();
            const helloCard = reversedCards.find(c => c.front[0] === 'Hello');
            expect(helloCard === null || helloCard === void 0 ? void 0 : helloCard.back[0]).toBe('Helo');
        });
        it('should return forward and reversed cards for "both" mode', () => {
            const defaultProvider = getCardProvider();
            const defaultCards = defaultProvider.getCards();
            const bothProvider = getCardProvider('both');
            const bothCards = bothProvider.getCards();
            expect(bothCards.length).toBe(defaultCards.length * 2);
            const heloCard = defaultCards[0]; // Assuming "Helo" is the first card
            expect(bothCards[0].front[0]).toBe(heloCard.front[0]); // Helo
            expect(bothCards[0].back[0]).toBe(heloCard.back[0]); // Hello
            expect(bothCards[1].front[0]).toBe(heloCard.back[0]); // Hello
            expect(bothCards[1].back[0]).toBe(heloCard.front[0]); // Helo
        });
    });
    describe('createShuffledDeck', () => {
        it('should create a deck with 3 copies of the first 10 cards', () => {
            createShuffledDeck();
            expect(state.cardDeck.length).toBe(10 * 3);
            // Check if one card ('Helo') appears 3 times
            const heloCards = state.cardDeck.filter(card => card.front.includes('Helo'));
            expect(heloCards.length).toBe(3);
        });
    });
    describe('updateStats', () => {
        it('should display the correct health and score', () => {
            state.health = 2;
            state.score = 123;
            updateStats();
            const healthDisplay = document.getElementById('health');
            const scoreDisplay = document.getElementById('score');
            expect(healthDisplay.textContent).toBe('❤️❤️🖤🖤🖤');
            expect(scoreDisplay.textContent).toBe('123');
        });
    });
    describe('handleCorrectAnswer', () => {
        it('should increase score and remove card for a correct answer', () => {
            const gameArea = document.getElementById('game-area');
            const cardElement = document.createElement('div');
            gameArea.appendChild(cardElement);
            state.activeCards.push({
                element: cardElement,
                data: { front: ['Diolch'], back: ['Thank you', 'Thanks'] },
                speedMultiplier: 1.0
            });
            const result = handleCorrectAnswer('Thank you');
            expect(result).toBe(true);
            expect(state.score).toBe(1);
            expect(state.activeCards.length).toBe(0);
            expect(gameArea.contains(cardElement)).toBe(false);
        });
        it('should not change score for an incorrect answer', () => {
            const gameArea = document.getElementById('game-area');
            const cardElement = document.createElement('div');
            gameArea.appendChild(cardElement);
            state.activeCards.push({
                element: cardElement,
                data: { front: ['Diolch'], back: ['Thank you', 'Thanks'] },
                speedMultiplier: 1.0
            });
            const result = handleCorrectAnswer('Wrong answer');
            expect(result).toBe(false);
            expect(state.score).toBe(0);
            expect(state.activeCards.length).toBe(1);
            expect(gameArea.contains(cardElement)).toBe(true);
        });
        it('should restore 1 health when score is a multiple of 5', () => {
            state.health = 2;
            state.score = 4;
            state.maxHealth = 5;
            const gameArea = document.getElementById('game-area');
            const cardElement = document.createElement('div');
            gameArea.appendChild(cardElement);
            state.activeCards.push({
                element: cardElement,
                data: { front: ['Diolch'], back: ['Thank you', 'Thanks'] },
                speedMultiplier: 1.0
            });
            handleCorrectAnswer('Thank you');
            expect(state.score).toBe(5);
            expect(state.health).toBe(3);
        });
        it('should not restore health if already at max health', () => {
            state.health = 5;
            state.score = 4;
            state.maxHealth = 5;
            const gameArea = document.getElementById('game-area');
            const cardElement = document.createElement('div');
            gameArea.appendChild(cardElement);
            state.activeCards.push({
                element: cardElement,
                data: { front: ['Diolch'], back: ['Thank you', 'Thanks'] },
                speedMultiplier: 1.0
            });
            handleCorrectAnswer('Thank you');
            expect(state.score).toBe(5);
            expect(state.health).toBe(5);
        });
    });
    describe('Game Over and Restart', () => {
        it('should restart game when Enter is pressed after game over', () => {
            const gameArea = document.getElementById('game-area');
            gameArea.innerHTML = '<h1>Game Over</h1>';
            state.health = 0;
            state.score = 50;
            const answerInput = document.getElementById('answer-input');
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
            answerInput.dispatchEvent(enterEvent);
            expect(state.health).toBe(3);
            expect(state.score).toBe(0);
            expect(state.cardDeck.length).toBeGreaterThan(0);
            expect(gameArea.innerHTML).not.toContain('<h1>Game Over</h1>');
        });
    });
    describe('Pause and Resume', () => {
        it('should pause game when Tab key is pressed', () => {
            expect(state.paused).toBe(false);
            const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
            document.dispatchEvent(tabEvent);
            expect(state.paused).toBe(true);
            const pauseOverlay = document.getElementById('pause-overlay');
            expect(pauseOverlay).not.toBeNull();
            expect(pauseOverlay.textContent).toContain('Paused');
        });
        it('should resume game when Enter key is pressed while paused', () => {
            // Pause the game first
            const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
            document.dispatchEvent(tabEvent);
            expect(state.paused).toBe(true);
            // Then resume
            const answerInput = document.getElementById('answer-input');
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
            answerInput.dispatchEvent(enterEvent);
            expect(state.paused).toBe(false);
            const pauseOverlay = document.getElementById('pause-overlay');
            expect(pauseOverlay).toBeNull();
        });
    });
});
