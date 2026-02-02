const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'history.json');

// Allow CORS from anywhere (for hosted UI access)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Initialize history if needed
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([
        { sender: 'agent', text: 'Neural Link established. Waiting for input.', timestamp: Date.now() }
    ]));
}

// Get History
app.get('/api/chat', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const history = JSON.parse(data);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read memory' });
    }
});

// Post Message
app.post('/api/chat', (req, res) => {
    const { sender, text } = req.body;
    if (!sender || !text) return res.status(400).send('Missing fields');

    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const history = JSON.parse(data);

        const newMessage = { sender, text, timestamp: Date.now() };
        history.push(newMessage);

        // Keep history manageable (last 50 messages)
        if (history.length > 50) history.shift();

        fs.writeFileSync(DATA_FILE, JSON.stringify(history, null, 2));
        res.json(newMessage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save memory' });
    }
});

// Clear Memory (Optional)
app.post('/api/reset', (req, res) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    res.json({ status: 'Memory wiped' });
});

app.listen(PORT, () => {
    console.log(`Neural Bridge running on http://localhost:${PORT}`);
});
