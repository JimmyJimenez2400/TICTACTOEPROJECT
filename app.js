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

  return {
    getPlayerName,
    getPlayerMarker,
    getPlayerScore,
    increasePlayerScore,
  };
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

    // in here we'll get the active player marker or save it's value

    let board = getGameBoard();

    board[placement] = playerMarker;

    return printToConsole();
  };

  const isCellAvailable = (indexValueSelected) => {
    const currentGameBoard = getGameBoard();

    if (currentGameBoard[indexValueSelected] === '') {
      placeMarker(
        GameController.controlFlowOfGame.currentActivePlayer.getPlayerMarker(),
        indexValueSelected
      );
      return GameController.switchActivePlayer();
    } else {
      console.log(`Sorry, that index isn't available! Pick another one!`);
      console.log(
        `Still your turn ${GameController.controlFlowOfGame.currentActivePlayer.getPlayerName()}`
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

  const controlFlowOfGame = {
    gameActive: true,
    currentActivePlayer: players.playerOne,
  };

  const switchActivePlayer = () => {
    // This will switch the activePlayer
    console.log(controlFlowOfGame.currentActivePlayer === players.playerOne);

    if (controlFlowOfGame.currentActivePlayer === players.playerOne) {
      console.log('Switching to playerTwo');
      controlFlowOfGame.currentActivePlayer = players.playerTwo;
      console.log(controlFlowOfGame.currentActivePlayer.getPlayerName());
    } else {
      console.log('Switching to playerOne');
      controlFlowOfGame.currentActivePlayer = players.playerOne;
      console.log(controlFlowOfGame.currentActivePlayer.getPlayerName());
    }
  };

  return { controlFlowOfGame, switchActivePlayer };
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
          GameController.controlFlowOfGame.currentActivePlayer.getPlayerMarker(),
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
