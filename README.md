# TICTACTOEPROJECT

This project is a simple implementation of the classic game Tic Tac Toe using JavaScript. The code is structured using factory functions, the module pattern, and objects to create a clean and organized codebase.

## Table of Contents
- Introduction
- Project Structure
- How to Play
- Implementation Details
- Contributing
- License

## Introduction
Tic Tac Toe is a two-player game where each player takes turns marking a 3x3 grid with their symbol (usually "X" and "O") to win the game. This project focuses on creating a functional and interactive Tic Tac Toe game using modern JavaScript design patterns.

## Project Structure
The project's structure leverages the following design principles:

- Factory Functions: Factory functions are used to create player objects, gameboard objects, and control objects. Each factory function encapsulates the logic and properties related to their respective entities.

- Module Pattern: JavaScript modules are used to encapsulate and organize related code. The game logic, user interface updates, and event handling are kept separate in their respective modules for better code organization and maintainability.

- Objects: Player objects represent the players in the game, gameboard objects manage the state of the gameboard, and the control object orchestrates the game by handling game flow, player turns, and winning conditions.

## How to Play
1. Open the index.html file in your web browser to start the game.
2. Two players take turns to click on an empty cell of the 3x3 gameboard.
3. The first player to get three of their symbols in a row, column, or diagonal wins the game.
4. If the game ends in a draw (no empty cells left and no winner), it's a tie.

## Implementation Details
The project is organized into the following modules:

- playerFactory: This module creates player objects with a name and symbol (X or O).

- gameboard: The gameboard module manages the state of the game, including the current state of the cells and the check for winning conditions.

- gameController: The game controller module is responsible for managing the game's flow, player turns, and checking for a win or draw. It updates the UI based on game events.

- displayController: This module handles the user interface, updating the gameboard based on user input and game events.

## Contributing
Feel free to contribute to this project by submitting issues, providing feedback, or making pull requests. Your contributions are welcome and appreciated. Please make sure to follow the project's code of conduct and contributing guidelines.

## License
This project is open-source and available under the MIT License. You can find more details in the LICENSE file.

Enjoy playing Tic Tac Toe!