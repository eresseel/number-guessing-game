document.addEventListener("DOMContentLoaded", () => {
    let targetNumber;
    let attempts = 0;

    const guessInput = document.getElementById("guess-input");
    const guessBtn = document.getElementById("guess-btn");
    const resetBtn = document.getElementById("reset-btn");
    const messageContainer = document.getElementById("message-container");
    const attemptsCount = document.getElementById("attempts-count");

    // Új játék indítása és állapot alaphelyzetbe állítása
    function initGame() {
        targetNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        attemptsCount.textContent = attempts;
        messageContainer.textContent = "";
        messageContainer.className = "message-container";
        guessInput.value = "";
        guessInput.disabled = false;
        guessBtn.disabled = false;
    }

    // Tipp ellenőrzése
    function handleGuess() {
        const rawValue = guessInput.value.trim();
        const guess = parseInt(rawValue, 10);

        // Érvénytelen bemenet ellenőrzése
        if (rawValue === "" || isNaN(guess) || guess < 1 || guess > 100) {
            messageContainer.textContent = "Kérjük, adj meg egy érvényes számot 1 és 100 között!";
            messageContainer.className = "message-container msg-warning";
            return;
        }

        attempts++;
        attemptsCount.textContent = attempts;

        if (guess === targetNumber) {
            messageContainer.textContent = `Gratulálok! Eltaláltad a számot (${targetNumber})!`;
            messageContainer.className = "message-container msg-success";
            guessInput.disabled = true;
            guessBtn.disabled = true;
        } else if (guess < targetNumber) {
            messageContainer.textContent = "A szám nagyobb!";
            messageContainer.className = "message-container msg-error";
        } else {
            messageContainer.textContent = "A szám kisebb!";
            messageContainer.className = "message-container msg-error";
        }
    }

    guessBtn.addEventListener("click", handleGuess);
    resetBtn.addEventListener("click", initGame);

    // Enter gomb leütésének kezelése az input mezőben
    guessInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleGuess();
        }
    });

    initGame();
});
