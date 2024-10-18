const express = require('express');

const app = express();

// Create any middleware like so
app.use((req, res, next) => {
    res.json({ message: 'Hello World' });
});

module.exports = app;