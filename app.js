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

  // Players stored in objects
  const players = {
    playerOne: null,
    playerTwo: null,
  };

  // Object that will control flow of the game
  const controlFlowOfGame = {
    gameActive: true,
    playerTurn: null,
  };

  return { getGameBoard };
})();

const displayController = (() => {
  const getTableContainer = () => {
    const boardContainer = document.querySelector('.boardContainer');
    return boardContainer;
  };

  const renderBoard = (gameBoardArr) => {
    const getBoardContainer = getTableContainer();
    const tableContainer = document.createElement('table');

    let newRow;

    // We want to create a 3x3 table
    for (let i = 0; i < 3; i += 1) {
      if (i % 3 == 0 && i != 0) {
        //insert table row
        newRow = tableContainer.insertRow(-1);
      }
    }

    return tableContainer;
  };

  return { renderBoard };
})();

displayController.renderBoard();

// Little global code as possible (Use factory or module)
// If you ever need one of something, use a module
// If you need multiple of something, use factories
