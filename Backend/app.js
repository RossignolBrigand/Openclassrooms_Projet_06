const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://thomaspineau93:Cowaf2jdd4MtPlpF@clusterprojet06.xcbj6.mongodb.net/?retryWrites=true&w=majority&appName=ClusterProjet06',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Create any middleware like so
app.use((req, res, next) => {
    res.json({ message: 'Hello World' });
});

module.exports = app;