const messageContainer = document.querySelector(".mgs-container");
const message = document.querySelector(".mgs");
const playAgainBtn = document.querySelector("#newgame");
const gameContainer = document.querySelector(".container");
const gameBoard = document.querySelector(".gameBoard");
const turnShower = document.querySelector("#turn");
const icon = document.querySelector("#icon");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const players = ["X", "O"];
const btnClickMusic = new Audio("./assets/btn.mp3")
const boxClickMusic = new Audio("./assets/box.wav")
const gameOverMusic = new Audio("./assets/gameover.wav ")
let currentTurn = players[Math.floor(Math.random() * 2)];
let previousTarget;
let count = 0;
let isGameOver = false;
let isMuted = false;
const iconsSrc = {
    mute: "./assets/mute.svg",
    unmute: "./assets/unmute.svg"
}
const winnerIndex = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

turnShower.innerText = currentTurn;
function checkWinner() {
    winnerIndex.forEach(([a, b, c]) => {
        if (boxes[a].innerHTML !== "" &&
            boxes[b].innerHTML !== "" &&
            boxes[c].innerHTML !== "" &&
            !isGameOver) {
            isGameOver = boxes[a].innerHTML === boxes[b].innerHTML && boxes[b].innerHTML === boxes[c].innerHTML;
            if (isGameOver) {
                boxes[a].style.color = "red";
                boxes[b].style.color = "red";
                boxes[c].style.color = "red";
            }
        }
    })
    return isGameOver;
}

const handleSound = () => {
    isMuted = !isMuted;
    icon.src = isMuted ? iconsSrc.mute : iconsSrc.unmute;
}

const handleTargetBackGroundColor = () => {

}
const changeTurn = () => {
    currentTurn = players[(players.indexOf(currentTurn) + 1) % 2]
    turnShower.innerText = currentTurn;
}


const showDraw = () => {
    message.innerHTML = `Draw!!`
    gameContainer.classList.add("hidden");
    messageContainer.classList.remove("hidden");
}
const showWinner = () => {
    message.innerHTML = `Player ${currentTurn} wins`
    gameContainer.classList.add("hidden");
    messageContainer.classList.remove("hidden");
}

const cleanBoxes = () => {
    boxes.forEach(box => {
        box.style.cursor = "pointer";
        box.innerHTML = "";
        box.removeAttribute("style");
    });
}
const playAgain = () => {
    !isMuted ? btnClickMusic.play() : null;
    messageContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    previousTarget.classList.remove("currentTarget");
    count = 0;
    isGameOver = false;
    cleanBoxes();
}
const resetGame = () => {
    if (!count) return;
    !isMuted ? btnClickMusic.play() : null;
    currentTurn = players[Math.floor(Math.random() * 2)];
    turnShower.innerText = currentTurn;
    previousTarget.classList.remove("currentTarget");
    count = 0;
    cleanBoxes();
    isMuted = false;
    icon.src = iconsSrc.unmute;
}

const handleBoxClick = (e) => {
    let targetBox = e.target;
    if (targetBox.innerHTML !== "" ||
        isGameOver) return;
    !isMuted ? boxClickMusic.play() : null;
    count > 0 ? previousTarget.classList.remove("currentTarget") : null;
    targetBox.classList.add("currentTarget")
    targetBox.innerHTML = currentTurn;
    targetBox.style.cursor = "not-allowed"
    count++;
    if (checkWinner()) {
        !isMuted ? gameOverMusic.play() : null;
        setTimeout(showWinner, 2000);
    }
    else if (count === 9) {
        !isMuted ? gameOverMusic.play() : null;
        showDraw();
        changeTurn();
    }
    else {
        changeTurn();
    }
    previousTarget = targetBox;
}

gameBoard.addEventListener("click", handleBoxClick);
playAgainBtn.addEventListener("click", playAgain);
resetBtn.addEventListener("click", resetGame)
icon.addEventListener("click", handleSound);