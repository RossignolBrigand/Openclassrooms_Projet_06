const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Book = require('./models/Book');
const User = require('./models/User');
//----------------------------------------------------------------------------------------------------------------------------------------------------------

const booksUrl = '/api/books';

//Enable access to (req.body) prop
app.use(express.json());

// Connect to MongoDB Database 
mongoose.connect('mongodb+srv://thomaspineau93:crRdZJYsKjiQ4B62@cluster0.5n0xo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

// Lets us get requests which contain a json object and store them within a req.body param
app.use(express.json());

// Create a header for all requests and responses for our paths to help prevent CORS issues
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//#region USER

//* POST create a new User in database & hash the password

//* POST sends auth data and creates an auth token which also contains the UserID

//#endregion

//#region BOOKS
//* POST a new Book / Auth required
app.post(`${booksUrl}`, (req, res, next) => {
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ book, message: String }))
        .catch(error => res.status(400).json({ error }));
});

//* POST a rating for a specific Book / Auth required

//* PUT Updates a specific Book from the provided ID / Auth required

//* DELETE Removes a specific Book from Database with the provided Id / Auth required

//* GET a specific Book, no Auth required
app.get(`${booksUrl}/:id`, (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
});

//* GET the three Books which have the bestRating on average
app.get(`${booksUrl}/bestrating`, (req, res, next) => {
    Book.find()
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 3)
        .then(bestBooks => res.status(200).json({ bestBooks }))
        .catch(error => res.status(400).json({ error }));
});

//* GET all Books, no Auth required
app.use(booksUrl, (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ error }));
});
//#endregion



// Create any middleware like so
app.use((req, res, next) => {
    res.json({ message: 'Hello World' });
});

module.exports = app;