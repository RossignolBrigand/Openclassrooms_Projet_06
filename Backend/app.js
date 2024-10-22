const express = require('express');
const mongoose = require('mongoose');
const app = express();

//----------------------------------------------------------------------------------------------------------------------------------------------------------

//Enable access to (req.body) prop
app.use(express.json());

// Connect to MongoDB Database 
mongoose.connect('mongodb+srv://thomaspineau93:crRdZJYsKjiQ4B62@cluster0.5n0xo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: "Object créé !"
    });
});


// Create any middleware like so
app.use((req, res, next) => {
    res.json({ message: 'Hello World' });
});

module.exports = app;