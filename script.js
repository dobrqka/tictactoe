const Gameboard = () => {
  // module that has an array with gameboard
  let currentBoard = [];
  const getBoard = () => {
    return currentBoard;
  };
  return { getBoard };
};

const Player = (name, symbol) => {
  // factory that's used to create players
  return { name, symbol };
};

// const playerOne;

// const playerTwo;

const Gameflow = () => {
  // module that controls the flow of the game
};

const showGameboard = () => {
  // renders the gameboard array contents on the webpages using 'X' and 'O'
};

// 1.Press start button
// 2.Get prompted to insert Player1 Name and pick a symbol
// 3.Get prompted to insert Player2 Name and automatically assign remaining symbol
// 4.Player one makes a move > his symbol is added to the corresponding
//position in the array.
// 5.Player two makes a move > his symbol is added as well

const startGame = (function () {
  const startButton = document.querySelector("#start-button");
  const formOne = document.querySelector(".form1");
  startButton.addEventListener("click", () => {
    if (formOne.style.display == "none") {
      formOne.style.display = "grid";
    } else {
      formOne.style.display = "none";
    }
  });
  const saveButton = document.querySelector(".save1");
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.querySelector("#player1").value;
    const symbol = document.querySelector(
      'input[name="symbol1"]:checked'
    ).value;
    const playerOne = Player(name, symbol);
    console.log(playerOne);
    formOne.reset();
    // code that creates player 1 and displays their stats
  });
})();
