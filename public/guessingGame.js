document.getElementById('start-guessing-game').addEventListener('click', () => {
    console.log('Game Started!'); // Debugging log to see if the event is triggered
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 7;

    while (attempts > 0) {
        const guess = prompt(`Guess a number (1-100). Attempts left: ${attempts}`);
        if (!guess) break;

        if (+guess === randomNumber) {
            console.log('Correct guess! Sending score...');
            alert('Congratulations! You guessed the correct number.');

            fetch('http://localhost:3000/save-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: 1, // Replace with actual user ID
                    game_name: 'Number Guessing Game', // Example game
                    score: 100 // Example score
                })
            })
            .then(response => response.text())
            .then(data => console.log('Response:', data))
            .catch(err => console.error('Error:', err));            
            break;
        } else if (+guess < randomNumber) {
            alert('Too Low!');
        } else {
            alert('Too High!');
        }
        attempts--;
    }

    if (attempts === 0) alert(`Game Over! The number was ${randomNumber}.`);
});
