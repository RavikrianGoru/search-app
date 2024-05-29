const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 4000;

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static('public'));
// Serve static files from the root directory (if you have other static files like index.html)
app.use(express.static(path.join(__dirname, '.')));
// Serve D3.js from node_modules
app.use('/d3', express.static(path.join(__dirname, '../node_modules/d3/dist')));



// Endpoint to handle search
app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        // Replace with your REST API URL and any necessary parameters
        const response = await axios.get(`http://localhost:3000/api/treeData`, {
            params: { query }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
