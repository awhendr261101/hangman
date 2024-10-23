document.addEventListener('DOMContentLoaded', () => {
    const wordList = ['javascript', 'developer', 'hangman', 'challenge', 'function', 'variable'];
    let chosenWord = '';
    let displayedWord = '';
    let chancesLeft = 20;
    const wordDisplay = document.getElementById('wordDisplay');
    const messageDisplay = document.getElementById('message');
    const lettersContainer = document.getElementById('lettersContainer');
    const chancesLeftDisplay = document.getElementById('chancesLeft');
    const restartBtn = document.getElementById('restartBtn');

    function startGame() {
        chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
        displayedWord = '_'.repeat(chosenWord.length);
        chancesLeft = 20;
        updateDisplay();

        // Generate alphabet buttons
        lettersContainer.innerHTML = '';
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.classList.add('letter-button');
            button.textContent = letter;
            button.addEventListener('click', () => handleGuess(letter, button));
            lettersContainer.appendChild(button);
        }

        messageDisplay.textContent = '';
        restartBtn.classList.add('hidden');
    }

    function updateDisplay() {
        wordDisplay.textContent = displayedWord.split('').join(' ');
        chancesLeftDisplay.textContent = chancesLeft;
    }

    function handleGuess(letter, button) {
        button.classList.add('disabled');
        button.disabled = true;

        if (chosenWord.includes(letter.toLowerCase())) {
            let newDisplayedWord = '';
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === letter.toLowerCase()) {
                    newDisplayedWord += letter;
                } else {
                    newDisplayedWord += displayedWord[i];
                }
            }
            displayedWord = newDisplayedWord;
            updateDisplay();

            if (!displayedWord.includes('_')) {
                messageDisplay.textContent = 'Congratulations, you won!';
                endGame();
            }
        } else {
            chancesLeft--;
            updateDisplay();

            if (chancesLeft === 0) {
                messageDisplay.textContent = `Game Over! The word was "${chosenWord}".`;
                endGame();
            }
        }
    }

    function endGame() {
        const buttons = document.querySelectorAll('.letter-button');
        buttons.forEach(button => {
            button.disabled = true;
            button.classList.add('disabled');
        });
        restartBtn.classList.remove('hidden');
    }

    restartBtn.addEventListener('click', startGame);

    // Start the game when the page loads
    startGame();
});
