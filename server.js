const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
const cors = require('cors');
app.use(cors());

// MySQL Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Add your MySQL username
    password: 'Otaku@357', // Add your MySQL password
    database: 'game_analytics'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

// Add user to database
app.post('/add-user', (req, res) => {
    const { username } = req.body;
    const query = 'INSERT INTO users (username) VALUES (?)';
    db.query(query, [username], (err, result) => {
        if (err) throw err;
        res.json({ userId: result.insertId });
    });
});

// Save game score
app.post('/save-score', (req, res) => {
    const { user_id, game_name, score } = req.body;

    if (!user_id || !game_name || !score) {
        return res.status(400).send('All fields are required');
    }

    const query = 'INSERT INTO game_scores (user_id, game_name, score) VALUES (?, ?, ?)';
    db.query(query, [user_id, game_name, score], (err) => {
        if (err) {
            console.error('Error inserting score:', err);
            return res.status(500).send('Error saving score');
        }
        res.status(200).send('Score saved successfully');
    });
});




// Get analytics
app.get('/analytics', (req, res) => {
    const query = `
        SELECT u.username, g.game_name, g.score, g.play_time 
        FROM users u 
        JOIN game_scores g ON u.id = g.user_id
    `;
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://localhost:3000');
});


app.get('/', (req, res) => {
    res.send('Welcome to the Game Analytics Server!');
});

