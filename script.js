// Get references to DOM elements
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const startGameButton = document.getElementById("startGame");
const statusText = document.getElementById("status");
const board = document.getElementById("board");
const cells = Array.from(document.getElementsByClassName("cell"));
const resetButton = document.getElementById("resetGame");

// Game variables
let playerXName = "";
let playerOName = "";
let currentPlayer = "X";
let gameActive = false;
let boardState = Array(9).fill(null);

// Function to reset the game
function resetGame() {
  boardState = Array(9).fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("filled");
  });
  currentPlayer = "X";
  statusText.textContent = "${playerXName}'s Turn (X)".replace('${playerXName}',playerXName);
  gameActive = true;
}

// Function to update the status text
function updateStatusText() {
  const currentPlayerName = currentPlayer === "X" ? playerXName : playerOName;
  statusText.textContent = "${currentPlayerName}'s Turn (${currentPlayer})".replace ('${currentPlayerName}',currentPlayerName).replace ('${currentPlayer}',currentPlayer);
}

// Function to check for a win
function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return boardState[a] &&
           boardState[a] === boardState[b] &&
           boardState[a] === boardState[c];
  });
}

// Function to handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  // Ignore clicks on already filled cells or if the game is over
  if (boardState[index] || !gameActive) return;

  // Update board state and UI
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("filled");

  // Check for a win or draw
  if (checkWin()) {
    const winnerName = currentPlayer === "X" ? playerXName : playerOName;
    statusText.textContent = '🎉 Congratulations ${winnerName}! You Win! 🎉'.replace('${winnerName}',winnerName);
    gameActive = false;
  } else if (boardState.every(cell => cell !== null)) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    // Switch player and update status text
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatusText();
  }
}

// Start game button click handler
startGameButton.addEventListener("click", () => {
  playerXName = playerXInput.value.trim() || "Player X";
  playerOName = playerOInput.value.trim() || "Player O";
  resetGame();
  board.classList.remove("hidden");
  resetButton.classList.remove("hidden");
});

// Reset button click handler
resetButton.addEventListener("click", resetGame);

// Add click event listeners to all cells
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});