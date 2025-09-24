# Falling Flashcards Game

[**Play Online!**](https://zombiecalypse.github.io/DropCard/)

A simple web-based flashcard game to help you study. Answer the prompts on the falling cards before they reach the bottom of the screen!

## How to Play

-   Cards with questions will start falling from the top of the screen.
-   Type your answer in the input box at the bottom and press `Enter`.
-   If your answer is correct, the card disappears and your score increases.
-   If a card reaches the bottom of the screen, you lose one health point.
-   The game ends when you run out of health.
-   Press `Tab` to pause the game, and `Enter` to resume.

## Features

### Game Modes

You can change the game mode by adding a `mode` parameter to the URL:

-   **`?mode=reverse`**: Practice translating from English to Welsh.
-   **`?mode=both`**: Practice both Welsh to English and English to Welsh.

### Debug Mode

For developers or curious players, you can enable debug mode with the `?debug=true` URL parameter. This will display a list of all currently unlocked cards on the side of the game area.

## Development

To run the game locally:

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
4.  Run tests:
    ```bash
    npm test
    ```

## Why?

This is an experiment for trying out coding agents in a green-field environment. Plus I want to learn welsh.
