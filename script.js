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

const customRadios = () => {
  const radios = document.querySelectorAll('input[type="radio"]');
  const label = document.querySelectorAll(".radios");
  radios.forEach((radio) =>
    radio.addEventListener("click", () => {
      for (let i = 0; i < radios.length; i++) {
        label[i].style.outline = "none";
        if (radios[i].checked == true) {
          label[i].style.outline = "0.2rem solid #00ff00";
        }
      }
    })
  );
};

const showFormTwo = () => {
  const formTwo = document.querySelector(".form2");
  // formTwo.style.display = "grid";
  if (formTwo.style.display == "none") {
    formTwo.style.display = "grid";
  } else {
    formTwo.style.display = "none";
  }
  const saveButtonTwo = document.querySelector(".save2");
  document.querySelector("#player2").focus();
  saveButtonTwo.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (document.querySelector("#player2").value == "") {
      alert("Моля въведете име.");
      return;
    } else {
      const nameTwo = document.querySelector("#player2").value;
      let symbolTwo;
      if (players[0].symbol == "X") {
        symbolTwo = "O";
      } else if (players[0].symbol == "O") {
        symbolTwo = "X";
      }
      const playerTwo = Player(nameTwo, symbolTwo);
      players.push(playerTwo);
      formTwo.reset();
      formTwo.style.display = "none";
      addDiv("Играч 2: ", cardTwo);
      addDiv(players[1].name, cardTwo);
      addDiv("Символ: ", cardTwo);
      addDiv(players[1].symbol, cardTwo);
    }
  });
};

const startGame = (function () {
  const startButton = document.querySelector("#start-button");
  const formOne = document.querySelector(".form1");
  const boxes = document.querySelectorAll(".field");
  startButton.addEventListener("click", () => {
    const endScreen = document.querySelector(".end-screen");
    endScreen.style.display = "none";
    boxes.forEach((box) => {
      box.classList.remove("mark1");
      box.classList.remove("mark2");
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
    document.querySelector("#player1").focus();
    customRadios();
  });
  const saveButton = document.querySelector(".save1");
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (document.querySelector("#player1").value == "") {
      alert("Моля въведете име.");
      return;
    } else {
      const labels = document.querySelectorAll(".radios");
      labels.forEach((label) => (label.style.outline = "none"));
      const name = document.querySelector("#player1").value;
      const symbol = document.querySelector(
        'input[name="symbol1"]:checked'
      ).value;
      const playerOne = Player(name, symbol);
      players.push(playerOne);
      // showFormTwo();
      formOne.reset();
      formOne.style.display = "none";
      addDiv("Играч 1: ", cardOne);
      addDiv(players[0].name, cardOne);
      addDiv("Символ: ", cardOne);
      addDiv(players[0].symbol, cardOne);
      showFormTwo();
    }
  });
})();

const gameFlow = (function () {
  // adds marks in boxes and controls how players take turns
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

// checks if there's a winner or if the game is a tie

const playGame = () => {
  let gameFields = document.querySelectorAll(".field");
  const endScreen = document.querySelector(".end-screen");
  let endText = document.querySelector(".end-text");
  if (
    (gameFields[0].textContent == gameFields[1].textContent &&
      gameFields[0].textContent == gameFields[2].textContent &&
      (gameFields[0].textContent == "X" || gameFields[0].textContent == "O")) ||
    (gameFields[3].textContent == gameFields[4].textContent &&
      gameFields[3].textContent == gameFields[5].textContent &&
      (gameFields[3].textContent == "X" || gameFields[3].textContent == "O")) ||
    (gameFields[6].textContent == gameFields[7].textContent &&
      gameFields[6].textContent == gameFields[8].textContent &&
      (gameFields[6].textContent == "X" || gameFields[6].textContent == "O")) ||
    (gameFields[0].textContent == gameFields[3].textContent &&
      gameFields[0].textContent == gameFields[6].textContent &&
      (gameFields[0].textContent == "X" || gameFields[0].textContent == "O")) ||
    (gameFields[1].textContent == gameFields[4].textContent &&
      gameFields[1].textContent == gameFields[7].textContent &&
      (gameFields[1].textContent == "X" || gameFields[1].textContent == "O")) ||
    (gameFields[2].textContent == gameFields[5].textContent &&
      gameFields[2].textContent == gameFields[8].textContent &&
      (gameFields[2].textContent == "X" || gameFields[2].textContent == "O")) ||
    (gameFields[0].textContent == gameFields[4].textContent &&
      gameFields[0].textContent == gameFields[8].textContent &&
      (gameFields[0].textContent == "X" || gameFields[0].textContent == "O")) ||
    (gameFields[2].textContent == gameFields[4].textContent &&
      gameFields[2].textContent == gameFields[6].textContent &&
      (gameFields[2].textContent == "X" || gameFields[2].textContent == "O"))
  ) {
    let winner;
    if (
      document.querySelectorAll(".mark1").length >
      document.querySelectorAll(".mark2").length
    ) {
      winner = players[0].name;
    } else if (
      document.querySelectorAll(".mark1").length ==
      document.querySelectorAll(".mark2").length
    ) {
      winner = players[1].name;
    }
    endText.textContent = `${winner} печели!`;
    endScreen.style.display = "grid";
  } else if (
    document.querySelectorAll(".mark1").length +
      document.querySelectorAll(".mark2").length ==
    9
  ) {
    endText.textContent = `Равен!`;
    endScreen.style.display = "grid";
  }
};

// button that resets the game with the same player details

const newGame = () => {
  const endScreen = document.querySelector(".end-screen");
  endScreen.style.display = "none";
  const boxes = document.querySelectorAll(".field");
  boxes.forEach((box) => {
    box.classList.remove("mark1");
    box.classList.remove("mark2");
    while (box.firstChild) {
      box.removeChild(box.firstChild);
    }
  });
};

const newRound = document.querySelector(".new-round");
newRound.addEventListener("click", newGame);
