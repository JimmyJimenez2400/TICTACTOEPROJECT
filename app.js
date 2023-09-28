//Make the factory for the Players
const Player = (playerName, marker, score) => {
  const getPlayerName = () => playerName;

  const getPlayerMarker = () => marker;

  let getPlayerScore = () => score;

  let increasePlayerScore = () => {
    // just increase the score
    score = ++score;
    console.log(score);
  };

  let playerStorage = [];

  const getPlayerStorage = () => playerStorage;

  return {
    getPlayerName,
    getPlayerMarker,
    getPlayerScore,
    increasePlayerScore,
    getPlayerStorage,
  };
};

// store gameboard inside an array inside of a Gameboard Object, Module Pattern

// Purpose of Gameboard is building the thing, placing markers, and printBoard to console
const GameBoard = (() => {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  const getGameBoard = () => gameBoard;
  // LOL

  const printToConsole = () => {
    // we need a way to print the gameBoard array to console
    console.log(getGameBoard());
  };

  const placeMarker = (playerMarker, placement) => {
    // const playerMarker = player.getPlayerMarker();

    // in here we'll get the active player marker or save it's value

    let board = getGameBoard();

    board[placement] = playerMarker;

    printToConsole();
  };

  const isCellAvailable = (indexValueSelected) => {
    const currentGameBoard = getGameBoard();

    if (currentGameBoard[indexValueSelected] === '') {
      placeMarker(
        GameController.statusOf.currentActivePlayer.getPlayerMarker(),
        indexValueSelected
      );
      return GameController.switchActivePlayer();
    } else {
      console.log(`Sorry, that index isn't available! Pick another one!`);
      console.log(
        `Still your turn ${GameController.statusOf.currentActivePlayer.getPlayerName()}`
      );
    }
  };

  return { getGameBoard, printToConsole, isCellAvailable, placeMarker };
})();

// Control flow and state of the game's turn and checking if anyone won
const GameController = (() => {
  const players = {
    playerOne: Player('John', 'X', 0),
    playerTwo: Player('Shani', 'O', 0),
  };

  //statusOf should be calling the functions not be the status's

  const controlFlowOfGame = () => {
    // Controls flow of game but still need to test
  };

  const statusOf = {
    game: true,
    currentActivePlayer: players.playerOne,
  };

  const switchActivePlayer = () => {
    // This will switch the activePlayer
    console.log(statusOf.currentActivePlayer === players.playerOne);

    if (statusOf.currentActivePlayer === players.playerOne) {
      console.log('Switching to playerTwo');
      statusOf.currentActivePlayer = players.playerTwo;
      console.log(statusOf.currentActivePlayer.getPlayerName());
    } else {
      console.log('Switching to playerOne');
      statusOf.currentActivePlayer = players.playerOne;
      console.log(statusOf.currentActivePlayer.getPlayerName());
    }
  };

  return { statusOf, switchActivePlayer, controlFlowOfGame };
})();

// ONLY FOR DOM
const displayController = (() => {
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
            newCell.classList.add('square');

            const newText = document.createTextNode(gameBoardArr[startCount++]);

            newCell.appendChild(newText);
          }
        }
      }
    }

    return tableContainer;
  };

  const renderBoard = () => {
    const boardContainerElement = document.querySelector('.boardContainer');

    boardContainerElement.appendChild(createBoard(GameBoard.getGameBoard()));
    return boardContainerElement;
  };

  const BoardClickable = () => {
    // We need to grab all squares on the board and turn them into event listeners
    const allSquares = document.querySelectorAll('.square');

    const allSquaresToArray = [...allSquares];

    allSquaresToArray.forEach((square, index) => {
      square.setAttribute('data-id', index);
      square.addEventListener('click', (e) => {
        const squareID = e.target.dataset.id;
        GameBoard.placeMarker(
          GameController.statusOf.currentActivePlayer.getPlayerMarker(),
          squareID
        );
        displayController.updateBoard();
      });
    });
  };

  // will update DOM Board
  const updateBoard = () => {
    // There needs to be someway to be able to tie the gameBoard array elements value as textContext to the squares
    const gameBoard = GameBoard.getGameBoard();
    for (let i = 0; i < gameBoard.length; i++) {
      console.log(gameBoard[i]);
    }
  };

  return { renderBoard, BoardClickable, updateBoard };
})();

//John,players switch
GameBoard.isCellAvailable(0);

//Shani turn, picks same index as John
GameBoard.isCellAvailable(0);
// Still shani turn

GameBoard.isCellAvailable(1);

GameBoard.isCellAvailable(2);

GameBoard.isCellAvailable(5);
