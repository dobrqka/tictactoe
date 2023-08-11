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

const addDiv = (text, parent) => {
  const newDiv = document.createElement("div");
  newDiv.textContent = text;
  parent.appendChild(newDiv);
};

let players = [];
const cardOne = document.querySelector(".card1");
const cardTwo = document.querySelector(".card2");

const showFormTwo = () => {
  const formTwo = document.querySelector(".form2");
  formTwo.style.display = "grid";
  const saveButtonTwo = document.querySelector(".save2");
  saveButtonTwo.addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.querySelector("#player2").value;
    let symbol;
    if (players[0].symbol == "X") {
      symbol = "O";
    } else if (players[0].symbol == "O") {
      symbol = "X";
    }
    const playerTwo = Player(name, symbol);
    players.push(playerTwo);
    formTwo.reset();
    formTwo.style.display = "none";
    addDiv("Играч 2: ", cardTwo);
    addDiv(players[1].name, cardTwo);
    addDiv("Символ: ", cardTwo);
    addDiv(players[1].symbol, cardTwo);
  });
};

const startGame = (function () {
  const startButton = document.querySelector("#start-button");
  const formOne = document.querySelector(".form1");
  const boxes = document.querySelectorAll(".field");
  startButton.addEventListener("click", () => {
    boxes.forEach((box) => {
      while (box.firstChild) {
        box.removeChild(box.firstChild);
      }
    });
    while (cardOne.firstChild) {
      cardOne.removeChild(cardOne.firstChild);
    }
    while (cardTwo.firstChild) {
      cardTwo.removeChild(cardTwo.firstChild);
    }
    players = [];
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
    players.push(playerOne);
    showFormTwo();
    formOne.reset();
    formOne.style.display = "none";
    addDiv("Играч 1: ", cardOne);
    addDiv(players[0].name, cardOne);
    addDiv("Символ: ", cardOne);
    addDiv(players[0].symbol, cardOne);
    return players;
  });
})();

const gameFlow = (function () {
  // module that controls the flow of the game
  const boxes = document.querySelectorAll(".field");
  boxes.forEach((box) =>
    box.addEventListener("click", (e) => {
      if (
        document.querySelectorAll(".mark1").length >
        document.querySelectorAll(".mark2").length
      ) {
        box.classList.add("mark2");
        if (!e.target.firstChild) {
          e.target.textContent = players[1].symbol;
        }
      } else {
        box.classList.add("mark1");
        if (!e.target.firstChild) {
          e.target.textContent = players[0].symbol;
        }
      }
      playGame();
    })
  );
})();

const playGame = () => {
  let gameFields = document.querySelectorAll(".field");
  if (
    (gameFields[0].textContent == gameFields[1].textContent &&
      gameFields[0].textContent == gameFields[2].textContent &&
      gameFields[0].textContent == ("X" || "O")) ||
    (gameFields[3].textContent == gameFields[4].textContent &&
      gameFields[3].textContent == gameFields[5].textContent &&
      gameFields[3].textContent == ("X" || "O")) ||
    (gameFields[6].textContent == gameFields[7].textContent &&
      gameFields[6].textContent == gameFields[8].textContent &&
      gameFields[6].textContent == ("X" || "O")) ||
    (gameFields[0].textContent == gameFields[3].textContent &&
      gameFields[0].textContent == gameFields[6].textContent &&
      gameFields[0].textContent == ("X" || "O")) ||
    (gameFields[1].textContent == gameFields[4].textContent &&
      gameFields[1].textContent == gameFields[7].textContent &&
      gameFields[1].textContent == ("X" || "O")) ||
    (gameFields[2].textContent == gameFields[5].textContent &&
      gameFields[2].textContent == gameFields[8].textContent &&
      gameFields[2].textContent == ("X" || "O")) ||
    (gameFields[0].textContent == gameFields[4].textContent &&
      gameFields[0] == gameFields[8].textContent &&
      gameFields[0] == ("X" || "O")) ||
    (gameFields[2].textContent == gameFields[4].textContent &&
      gameFields[2].textContent == gameFields[6].textContent &&
      gameFields[2].textContent == ("X" || "O"))
  ) {
    alert("We have a winner!");
  }
  // else if (there are no empty fields) {alert("It's a tie!")}
};

//bonus points for AI?
