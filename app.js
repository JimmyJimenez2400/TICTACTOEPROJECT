//Make the factory for the Players
const Player = (playerName, marker, score) => {
  const getPlayerName = () => playerName;

  const getPlayerMarker = () => marker;

  const getPlayerScore = () => score;

  return { getPlayerName, getPlayerMarker, getPlayerScore };
};

// store gameboard inside an array inside of a Gameboard Object, Module Pattern

// Purpose of Gameboard is building the thing, placing markers, and printBoard to console
const GameBoard = (() => {
  let gameBoard = ['X', 'O', 'X', 'O', 'O', '', '', '', 'NINE'];

  const getGameBoard = () => gameBoard;

  const printToConsole = () => {
    const boardCellValues = gameBoard.map((x) => {
      // We need a way to update each element
      return x;
    });
    console.log(boardCellValues);
  };

  const placeMarker = (player, placement) => {
    // in here we'll get the active player marker or save it's value
  };

  const isCellAvailable = () => {
    // We need to check if the array element value is '' (empty string), if so it's valid and we can PLACE MARKER
    // If not, we return with an error message
    const currentGameBoard = getGameBoard();

    currentGameBoard.filter((x, index, arr) => {
      if (x === '') {
        console.log(`Empty at index: ${index}`);
        // now we can allow the player who's active to place their marker
        placeMarker();
      } else {
        console.log(`Not empty at index: ${index}`);
      }
    });

    console.log(currentGameBoard);
  };

  return { getGameBoard, printToConsole, isCellAvailable };
})();

GameBoard.printToConsole();

// Control flow and state of the game's turn and checking if anyone won
const GameController = (() => {
  // Players stored in objects
  const players = {
    playerOne: Player('John', 'X', 0),
    playerTwo: Player('Shani', 'O', 0),
  };

  // Object that will control flow of the game
  const controlFlowOfGame = {
    gameActive: true,
    playerTurn: null,
  };

  return { players };
})();

// ONLY FOR DOM
const displayController = (() => {
  const renderBoard = () => {
    const boardContainer = document.querySelector('.boardContainer');

    boardContainer.appendChild(createBoard(GameBoard.getGameBoard()));
    return boardContainer;
  };

  const createBoard = (gameBoardArr) => {
    const tableContainer = document.createElement('table');

    // We want to create a 3x3 table
    let startCount = 0;
    for (let i = 0; i <= gameBoardArr.length; i += 1) {
      if (i % 3 == 0 && i != 0) {
        //insert table row
        const newRow = tableContainer.insertRow();

        for (let row = 0; row < gameBoardArr.length; row += 1) {
          if (row % 3 == 0) {
            const newCell = newRow.insertCell();

            const newText = document.createTextNode(gameBoardArr[startCount++]);

            newCell.appendChild(newText);
          }
        }
      }
    }

    return tableContainer;
  };

  return { renderBoard };
})();

console.log(GameController.players.playerOne.getPlayerName());
displayController.renderBoard();
GameBoard.isCellAvailable();

// Little global code as possible (Use factory or module)
// If you ever need one of something, use a module
// If you need multiple of something, use factories
