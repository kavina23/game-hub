// Fetch and display game analytics
function loadAnalytics() {
    fetch('/analytics')
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
            const analyticsList = document.getElementById('analytics-list');
            analyticsList.innerHTML = '';  // Clear any previous data

            // Loop through the data and display each entry
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.username} played ${item.game_name} and scored ${item.score}`;
                analyticsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching analytics:', error));
}

// Call the function when the page loads
window.onload = loadAnalytics;
