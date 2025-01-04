document.getElementById('start-memory-game').addEventListener('click', () => {
    const symbols = ['🍎', '🍌', '🍓', '🍇', '🍎', '🍌', '🍓', '🍇'];
    symbols.sort(() => Math.random() - 0.5);

    const grid = document.createElement('div');
    grid.id = 'game-grid';
    document.getElementById('memory-game-container').appendChild(grid); // Appending to the container

    let firstCard = null;
    let secondCard = null;
    let matches = 0;

    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.textContent = '';
        grid.appendChild(card);

        card.addEventListener('click', () => {
            if (card.classList.contains('matched') || firstCard === card) return;

            card.textContent = card.dataset.symbol;

            if (!firstCard) {
                firstCard = card;
            } else if (!secondCard) {
                secondCard = card;

                if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    matches++;

                    if (matches === symbols.length / 2) {
                        alert('You matched all pairs!');
                        fetch('http://localhost:3000/save-score', {
                            method: 'POST',  // Ensure it's a POST request
                            headers: { 
                                'Content-Type': 'application/json' 
                            },
                            body: JSON.stringify({
                                user_id: 1, // Replace with actual user ID
                                game_name: 'Memory Match Game',
                                score: 100
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Score saved:', data);
                        })
                        .catch(err => {
                            console.error('Error saving score:', err);
                        });
                        
                    }
                } else {
                    setTimeout(() => {
                        firstCard.textContent = '';
                        secondCard.textContent = '';
                    }, 1000);
                }

                firstCard = null;
                secondCard = null;
            }
        });
    });
});
