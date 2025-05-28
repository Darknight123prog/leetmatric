// proxy.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/leetcode', async (req, res) => {
    const { query, variables } = req.body;

    try {
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Optional: You can also add cookies or headers here if needed
            },
            body: JSON.stringify({ query, variables })
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error('Error fetching from LeetCode:', err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ CORS Proxy running at http://localhost:${PORT}`);
});
