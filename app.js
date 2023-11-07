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

  const resetPlayerStorage = () => {
    playerStorage = [];
  };

  return {
    getPlayerName,
    getPlayerMarker,
    getPlayerScore,
    increasePlayerScore,
    getPlayerStorage,
    pushToStorage,
    resetPlayerStorage,
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

  const resetGameBoard = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
  };

  const placeMarker = (currentPlayer, placement) => {
    // const playerMarker = player.getPlayerMarker();

    // in here we'll get the active player marker or save it's value

    let board = getGameBoard();

    let activePlayer = currentPlayer;
    console.log(`this is the active player: ${activePlayer.getPlayerName()}`);

    let playerMarker = currentPlayer.getPlayerMarker();

    board[placement] = playerMarker;

    activePlayer.pushToStorage(placement);

    console.log(
      `${activePlayer.getPlayerName()} storage: ${activePlayer.getPlayerStorage()}`
    );
  };

  const isCellAvailable = (indexValueSelected) => {
    let indexNumber = parseInt(indexValueSelected);

    const currentGameBoard = getGameBoard();

    if (currentGameBoard[indexNumber] === '') {
      placeMarker(GameController.statusOf.currentActivePlayer, indexNumber);
      return GameController.switchActivePlayer();
    } else {
      console.log(`Sorry, that index isn't available! Pick another one!`);
      console.log(
        `Still your turn ${GameController.statusOf.currentActivePlayer.getPlayerName()}`
      );
    }
  };

  return {
    getGameBoard,
    printToConsole,
    isCellAvailable,
    placeMarker,
    resetGameBoard,
  };
})();

// Control flow and state of the game's turn and checking if anyone won
const GameController = (() => {
  const players = {};

  const statusOf = {
    game: true,
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
      [2, 4, 6],
      [0, 4, 8],
    ],
  };

  const isSubset = (winConditions, playerStorage) => {
    return winConditions.every((element) => playerStorage.includes(element));
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

  const checkForVerticalWin = (player) => {
    let VerticalConditions = winConditions.vertical;

    for (let i = 0; i < VerticalConditions.length; i++) {
      let currentPlayerStorage = player.getPlayerStorage();
      console.log(`${player.getPlayerName()} storage: ${currentPlayerStorage}`);

      if (isSubset(VerticalConditions[i], currentPlayerStorage)) {
        console.log(`${VerticalConditions[i]}`);
        console.log('MATCH');
        player.increasePlayerScore();
        console.log(
          `${player.getPlayerName()} has ${player.getPlayerScore()} points!`
        );
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
      console.log(`${player.getPlayerName()} Storage: ${currentPlayerStorage}`);

      if (isSubset(horizontalConditions[i], currentPlayerStorage)) {
        console.log('MATCH FOUND');
        console.log(`${horizontalConditions[i]}`);
        player.increasePlayerScore();
        console.log(
          `${player.getPlayerName()} has ${player.getPlayerScore()} points!`
        );
        // restart game with score still intact
        return true;
      } else {
        console.log('NO MATCH!');
        console.log(`${horizontalConditions[i]}`);
      }
    }
  };

  const checkForDiagonalWin = (player) => {
    let diagonalWin = winConditions.diagonally;

    for (let i = 0; i < diagonalWin.length; i++) {
      let currentPlayerStorage = player.getPlayerStorage();
      console.log(`${player.getPlayerName()} storage: ${currentPlayerStorage}`);

      if (isSubset(diagonalWin[i], currentPlayerStorage)) {
        console.log('MATCH FOUND');
        console.log(`${diagonalWin[i]}`);
        player.increasePlayerScore();
        console.log(
          `${player.getPlayerName()} has ${player.getPlayerScore()} points!`
        );
        return true;
      } else {
        console.log('NO MATCH!');
        console.log(`${diagonalWin[i]}`);
      }
    }
  };

  const checkForTie = () => {
    // In order to get a tie
    let gameBoard = GameBoard.getGameBoard();

    if (gameBoard.includes('')) {
      console.log('STILL SPACES AVAILABLE');
      return false;
    }

    console.log('No more spaces');
    return true;
  };

  const isGameOver = () => {
    if (players.playerOne.getPlayerScore() === 3) {
      statusOf.game = false;
      console.log(`\n\n${players.playerOne.getPlayerName()} has won the game!\n\n`);
      return true;
    } else if (players.playerTwo.getPlayerScore() === 3) {
      statusOf.game = false;
      console.log(`${players.playerTwo.getPlayerName()} has won the game!`);
      return true;
    } else {
      return false;
    }
  };

  const resetPlayerStorage = () => {
    players.playerOne.resetPlayerStorage();
    players.playerTwo.resetPlayerStorage();
  };

  const isRoundOver = () => {
    // check if player finds a match in winCondition, return true
    if (
      checkForHorizontalWin(statusOf.currentActivePlayer) === true ||
      checkForVerticalWin(statusOf.currentActivePlayer) === true ||
      checkForDiagonalWin(statusOf.currentActivePlayer) === true
    ) {
      return true;
    } else if (checkForTie() === true) {
      return true;
    }
    return false;
  };

  const newRound = () => {
    GameBoard.resetGameBoard();
    resetPlayerStorage();
    displayController.resetDOMBoard();
    statusOf.currentActivePlayer = players.playerOne;
  };
  //statusOf should be calling the functions not be the status's

  const controlFlowOfGame = (playerChoice) => {
    // Controls flow of game but still need to test

    GameBoard.isCellAvailable(playerChoice);

    // switchActivePlayer();

    if (isRoundOver() === true) {
      newRound();
    }

    if (isGameOver()) {
      // stop game
      console.log('GAME HAS ENDED');
      
      // Announce Winner
      // Call PlayAgain Function
      return 'GAME HAS ENDED';
    }

    console.log('GOING AGAIN!');
  };

  return {
    controlFlowOfGame,
    switchActivePlayer,
    statusOf,
    players,
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

  const createGamePage = () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'gameContainer');

    // header
    const headerContainer = document.createElement('header');
    headerContainer.setAttribute('id', 'header');

    const h1Title = document.createElement('h1');

    h1Title.textContent = 'Tic Tac Toe';

    const playerScoreContainer = document.createElement('div');
    playerScoreContainer.classList.add('playerScores');

    const playerOneNameContainer = document.createElement('p');
    playerOneNameContainer.classList.add('playerOne');

    const playerOneName = document.createElement('span');
    playerOneName.classList.add('playerOneName');
    playerOneName.textContent = `${GameController.players.playerOne.getPlayerName()}`;

    const playerOneScore = document.createElement('span');
    playerOneScore.classList.add('playerOneScore');
    playerOneScore.textContent = '0';

    playerScoreContainer.appendChild(playerOneNameContainer);
    playerOneNameContainer.appendChild(playerOneName);
    playerOneNameContainer.appendChild(playerOneScore);

    playerOneName.insertAdjacentHTML('afterend', ' score: ');

    const playerTwoNameContainer = document.createElement('p');
    playerTwoNameContainer.classList.add('playerTwo');

    const playerTwoName = document.createElement('span');
    playerTwoName.classList.add('playerTwoName');
    playerTwoName.textContent = `${GameController.players.playerTwo.getPlayerName()}`;

    const playerTwoScore = document.createElement('span');
    playerTwoScore.classList.add('playerTwoScore');
    playerTwoScore.textContent = '0';

    playerScoreContainer.appendChild(playerTwoNameContainer);
    playerTwoNameContainer.appendChild(playerTwoName);
    playerTwoNameContainer.appendChild(playerTwoScore);

    playerTwoName.insertAdjacentHTML('afterend', ' score: ');

    const activePlayerTurnContainer = document.createElement('div');
    activePlayerTurnContainer.classList.add('activePlayerTurn');

    const playerTurn = document.createElement('p');
    playerTurn.classList.add('playerTurn');
    playerTurn.textContent = "It's "

    const activePlayerName = document.createElement('span');
    activePlayerName.classList.add('activePlayerName');

    activePlayerName.textContent = `${GameController.statusOf.currentActivePlayer.getPlayerName()}`;

    playerTurn.appendChild(activePlayerName);
    playerTurn.insertAdjacentHTML('beforeend', " turn!");

    activePlayerTurnContainer.appendChild(playerTurn);

    headerContainer.appendChild(h1Title);
    headerContainer.appendChild(playerScoreContainer);
    headerContainer.appendChild(activePlayerTurnContainer);

    // main

    const mainContainer = document.createElement('main');
    mainContainer.setAttribute('id', 'main');

    const boardContainer = document.createElement('section');
    boardContainer.classList.add('boardContainer');

    boardContainer.appendChild(createBoard(GameBoard.getGameBoard()));

    mainContainer.appendChild(boardContainer);

    // footer
    const footerContainer = document.createElement('footer');
    footerContainer.setAttribute('id', 'footer');

    const h4Title = document.createElement('h4');
    h4Title.textContent = 'Created by Jimmy Jimenez';

    footerContainer.appendChild(h4Title);

    container.appendChild(headerContainer);
    container.appendChild(mainContainer);
    container.appendChild(footerContainer);

    return container;
  };

  const renderBoard = () => {
    createGamePage();
    const body = document.querySelector('body');

    body.appendChild(createGamePage());
    return body;

    // we will call everything in here
  };

  const BoardClickable = () => {
    // We need to grab all squares on the board and turn them into event listeners
    const allSquares = document.querySelectorAll('.square');

    const allSquaresToArray = [...allSquares];

    allSquaresToArray.forEach((square, index) => {
      square.setAttribute('data-id', index);
      square.addEventListener('click', (e) => {
        const squareID = e.target.dataset.id;

        GameController.controlFlowOfGame(squareID);
        console.log(GameBoard.getGameBoard());
        let gameBoard = GameBoard.getGameBoard();

        square.textContent = gameBoard[index];

        updateScoreBoard();
        updatePlayerTurn();
      });
    });
  };

  const resetDOMBoard = () => {
    const allSquares = document.querySelectorAll('.square');

    const allSquaresToArray = [...allSquares];

    allSquaresToArray.forEach((square) => {
      square.textContent = '';
    });
  };

  const updateScoreBoard = () => {
    // grab elements
    const playerOneName = document.querySelector('.playerOneName');
    const playerTwoName = document.querySelector('.playerTwoName');

    const playerOneScore = document.querySelector('.playerOneScore');
    const playerTwoScore = document.querySelector('.playerTwoScore');

    console.log(playerOneScore, playerTwoScore);

    playerOneName.textContent =
      GameController.players.playerOne.getPlayerName();

    playerOneScore.textContent =
      GameController.players.playerOne.getPlayerScore();
    //grab players scores and names

    playerTwoName.textContent =
      GameController.players.playerTwo.getPlayerName();
    playerTwoScore.textContent =
      GameController.players.playerTwo.getPlayerScore();
  };

  const updatePlayerTurn = () => {
    const playerTurn = document.querySelector('.playerTurn');

    let currentActivePlayer =
      GameController.statusOf.currentActivePlayer.getPlayerName();

    playerTurn.textContent = `It's ${currentActivePlayer} turn!`;
  };

  const playAgainModal = () => {
    const modalContainer = document.createElement('section');
    const topLevel = document.createElement('div');
    const bottomLevel = document.createElement('div');

    topLevel.classList.add('topLevel');

    modalContainer.classList.add('modal');
    // modalContainer.classList.add('hidden');

    const closeButton = document.createElement('button');
    closeButton.classList.add('btn-close');
    closeButton.textContent = 'X';

    const playAgainButton = document.createElement('button');
    playAgainButton.classList.add('playBtn');
    playAgainButton.textContent = `Play Again?`;

    topLevel.appendChild(closeButton);
    bottomLevel.appendChild(playAgainButton);

    modalContainer.appendChild(topLevel);
    modalContainer.appendChild(bottomLevel);

    return modalContainer;
  };

  return { renderBoard, BoardClickable, resetDOMBoard, playAgainModal };
})();

const playButton = document.querySelector('.playBtn');

playButton.addEventListener('click', () => {
  const removeIntroContainer = document.querySelector('#container');
  const playerOneInput = document.getElementById('playerOneName').value;
  const playerTwoInput = document.getElementById('playerTwoName').value;

  GameController.players.playerOne = Player(playerOneInput, 'X', 0);
  GameController.players.playerTwo = Player(playerTwoInput, 'O', 0);
  GameController.statusOf.currentActivePlayer =
    GameController.players.playerOne;

  removeIntroContainer.remove();

  displayController.renderBoard();
  displayController.BoardClickable();
});
