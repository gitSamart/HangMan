const words = ["JAVASCRIPT", "PYTHON", "HTML", "CSS", "NODEJS"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongGuesses = 0;
const maxGuesses = 6;

const wordDisplay = document.getElementById('wordDisplay');
const wrongGuessesDisplay = document.getElementById('wrongGuesses');
const messageDisplay = document.getElementById('message');

// Function to display the current word state
function displayWord() {
  wordDisplay.innerHTML = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
}

// Function to check a guessed letter
function checkLetter(letter) {
  letter = letter.toUpperCase(); // Convert to uppercase for comparison
  if (guessedLetters.includes(letter)) {
    messageDisplay.innerText = "You've already guessed that letter!";
  } else {
    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
      displayWord();
      checkWin();
    } else {
      wrongGuesses++;
      wrongGuessesDisplay.innerText = `Wrong guesses: ${wrongGuesses}`;
      checkLose();
    }
  }
}

// Check if the player won
function checkWin() {
  if (!wordDisplay.innerText.includes('_')) {
    messageDisplay.innerText = "Congratulations! You've won!";
    disableAllButtons();
  }
}

// Check if the player lost
function checkLose() {
  if (wrongGuesses === maxGuesses) {
    messageDisplay.innerText = `Game Over! The word was ${selectedWord}`;
    disableAllButtons();
  }
}

// Disable all letter buttons after the game ends
function disableAllButtons() {
  document.querySelectorAll('.letters button').forEach(button => button.disabled = true);
}

// Restart button functionality
document.getElementById('restartButton').addEventListener('click', () => {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  wrongGuessesDisplay.innerText = 'Wrong guesses: 0';
  messageDisplay.innerText = '';
  displayWord();
  document.querySelectorAll('.letters button').forEach(button => button.disabled = false);
});

// Add event listeners to the letter buttons
document.querySelectorAll('.letters button').forEach(button => {
  button.addEventListener('click', () => {
    checkLetter(button.innerText);
  });
});

// Listen for keyboard input
document.addEventListener('keydown', (event) => {
  const letter = event.key.toUpperCase();
  if (/^[A-Z]$/.test(letter)) { // Check if the key pressed is a letter
    checkLetter(letter);
  }
});

// Display the initial word
displayWord();
