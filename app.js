//Make the factory for the Players
const Player = (playerName, marker, score) => {
  const getPlayerName = () => playerName;

  const getPlayerMarker = () => marker;

  let getPlayerScore = () => score;

  let increasePlayerScore = () => {
    // just increase the score
    score = ++score;
  };

  // This will be the players Storage
  let playerStorage = [];

  const pushToStorage = (index) => {
    playerStorage.push(index);
  };

  //retrieve storage
  const getPlayerStorage = () => playerStorage;

  return {
    getPlayerName,
    getPlayerMarker,
    getPlayerScore,
    increasePlayerScore,
    getPlayerStorage,
    pushToStorage,
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

  //for every move, we wanna check if it's a vertical, horizontal, or diagonal win

  const winConditions = {
    vertical: [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ],
    horizontal: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
    diagonally: [
      [0, 4, 8],
      [2, 4, 6],
    ],
  };

  const isSubset = (winConditions, playerStorage) => {
    return winConditions.every((element) => playerStorage.includes(element));
  };

  const checkForVerticalWin = (player) => {
    // Mission: We want to see if there is a match between playerStorage and winCondition for vertical

    let VerticalConditions = winConditions.vertical;

    for (let i = 0; i < VerticalConditions.length; i++) {
      let currentPlayerStorage = player.getPlayerStorage();
      console.log(`Player Storage: ${currentPlayerStorage}`);

      if (isSubset(VerticalConditions[i], currentPlayerStorage)) {
        console.log(`${VerticalConditions[i]}`);
        console.log('MATCH');
        player.increasePlayerScore();
        return true;
      } else {
        console.log('NO MATCH');
        console.log(`${VerticalConditions[i]}`);
      }

      //we will need an if statement that check verticalConditions array matches with playerStorage
    }
  };

  const checkForHorizontalWin = (player) => {
    let horizontalConditions = winConditions.horizontal;

    for (let i = 0; i < horizontalConditions.length; i++) {
      let currentPlayerStorage = player.getPlayerStorage();
      console.log(`Player Storage: ${currentPlayerStorage}`);

      if (isSubset(horizontalConditions[i], currentPlayerStorage)) {
        console.log('MATCH FOUND');
        console.log(`${horizontalConditions[i]}`);
        player.increasePlayerScore();
        return true;
      } else {
        console.log('NO MATCH!');
        console.log(`${horizontalConditions[i]}`);
        return false;
      }
    }
  };

  const checkForDiagonalWin = (player) => {
    let diagonalWin = winConditions.diagonally;

    for (let i = 0; i < diagonalWin.length; i++) {
      let currentPlayerStorage = player.getPlayerStorage();
      console.log(`Player Storage: ${currentPlayerStorage}`);

      if (isSubset(diagonalWin[i], currentPlayerStorage)) {
        console.log('MATCH FOUND');
        console.log(`${diagonalWin[i]}`);
        player.increasePlayerScore();
        return true;
      } else {
        console.log('NO MATCH!');
        console.log(`${diagonalWin[i]}`);
        return false;
      }
    }
  };

  //statusOf should be calling the functions not be the status's

  const controlFlowOfGame = (playerChoice) => {
    // Controls flow of game but still need to test
    while (statusOf.game === true) {
      //We want to essentially go through the game in order:
      //1.
      GameBoard.isCellAvailable(playerChoice);
    }
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

  const testingPlayerStorage = (index) => {
    const activePlayer = statusOf.currentActivePlayer;

    activePlayer.pushToStorage(index);

    // console.log(
    //   `${activePlayer.getPlayerName()} has index's ${activePlayer.getPlayerStorage()} in their storage`
    // );
  };

  return {
    statusOf,
    switchActivePlayer,
    controlFlowOfGame,
    testingPlayerStorage,
    checkForVerticalWin,
    checkForHorizontalWin,
    checkForDiagonalWin,
  };
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

GameController.testingPlayerStorage(0);
GameController.testingPlayerStorage(2);
GameController.testingPlayerStorage(3);
GameController.testingPlayerStorage(6);
GameController.testingPlayerStorage(1);

GameController.checkForVerticalWin(GameController.statusOf.currentActivePlayer);
GameController.checkForHorizontalWin(
  GameController.statusOf.currentActivePlayer
);
GameController.checkForDiagonalWin(GameController.statusOf.currentActivePlayer);
