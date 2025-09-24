import * as fs from 'fs';
import * as path from 'path';
import { state, createShuffledDeck, handleCorrectAnswer, cardData, initGameDOM } from './game';

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

    describe('createShuffledDeck', () => {
        it('should create a deck with 3 copies of the first 10 cards', () => {
            createShuffledDeck();
            expect(state.cardDeck.length).toBe(10 * 3);

            // Check if one card ('Helo') appears 3 times
            const heloCards = state.cardDeck.filter(card => card.front.includes('Helo'));
            expect(heloCards.length).toBe(3);
        });
    });

    describe('handleCorrectAnswer', () => {
        it('should increase score and remove card for a correct answer', () => {
            const gameArea = document.getElementById('game-area')!;
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
            const gameArea = document.getElementById('game-area')!;
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
    });
});
