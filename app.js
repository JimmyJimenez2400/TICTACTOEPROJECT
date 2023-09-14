//Make the factory for the Players
const Player = (playerName, marker, score) => {
  const getPlayerName = () => playerName;

  const getPlayerMarker = () => marker;

  const getPlayerScore = () => score;

  return { getPlayerName, getPlayerMarker, getPlayerScore };
};

// store gameboard inside an array inside of a Gameboard Object, Module Pattern
const GameBoard = (() => {
  const gameBoard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

  const getGameBoard = () => gameBoard;

  const players = {
    playerOne: null,
    playerTwo: null,
  };

  return { getGameBoard };
})();

// Players stored in objects
// Object that will control flow of the game

// Little global code as possible (Use factory or module)
// If you ever need one of something, use a module
// If you need multiple of something, use factories
