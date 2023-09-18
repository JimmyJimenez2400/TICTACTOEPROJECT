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
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  const getGameBoard = () => gameBoard;

  const printToConsole = () => {
    // we need a way to print the gameBoard array to console
    console.log(getGameBoard());
  };

  const placeMarker = (playerMarker, placement) => {
    // const playerMarker = player.getPlayerMarker();
    console.log(placement);
    // in here we'll get the active player marker or save it's value

    let board = getGameBoard();

    board[placement] = playerMarker;

    printToConsole();
  };

  const isCellAvailable = () => {
    // We need to check if the array element value is '' (empty string), if so it's valid and we can PLACE MARKER
    // If not, we return with an error message
    const currentGameBoard = getGameBoard();

    currentGameBoard.filter((element, index, arr) => {
      if (element === '') {
        console.log(`Empty at index: ${index}`);
        // now we can allow the player who's active to place their marker
        placeMarker(
          GameController.controlFlowOfGame.currentActivePlayer.getPlayerMarker(),
          1
        );
      } else {
        console.log(`Not empty at index: ${index}`);
      }
    });

    console.log(currentGameBoard);
  };

  return { getGameBoard, printToConsole, isCellAvailable };
})();

// Control flow and state of the game's turn and checking if anyone won
const GameController = (() => {
  const players = {
    playerOne: Player('John', 'X', 0),
    playerTwo: Player('Shani', 'O', 0),
  };

  const controlFlowOfGame = {
    gameActive: true,
    currentActivePlayer: players.playerOne,
  };
  return { controlFlowOfGame };
})();

// ONLY FOR DOM
const displayController = (() => {
  const renderBoard = () => {
    const boardContainerElement = document.querySelector('.boardContainer');

    boardContainerElement.appendChild(createBoard(GameBoard.getGameBoard()));
    return boardContainerElement;
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

  // will update DOM Board
  const updateBoard = () => {};

  return { renderBoard };
})();

GameBoard.printToConsole();
displayController.renderBoard();
GameBoard.isCellAvailable();

// Little global code as possible (Use factory or module)
// If you ever need one of something, use a module
// If you need multiple of something, use factories
