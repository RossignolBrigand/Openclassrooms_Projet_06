const Book = require('../models/Book');

//----------------------------------------------------------------------------------------------------------------------------------------

// POST a new Book / Auth required
exports.createBook = (req, res, next) => {
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ book, message: String }))
        .catch(error => res.status(400).json({ error }));
};

// POST a rating for a specific Book / Auth required
exports.rateBook = (req, res, next) => {

};

// PUT Updates a specific Book from the provided ID / Auth required
exports.updateBook = (req, res, next) => {

};

// DELETE Removes a specific Book from Database with the provided Id / Auth required
exports.deleteBook = (req, res, next) => {

};

// GET a specific Book, no Auth required
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

// GET the three Books which have the bestRating on average
exports.getBestBooks = (req, res, next) => {
    Book.find()
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 3)
        .then(bestBooks => res.status(200).json({ bestBooks }))
        .catch(error => res.status(400).json({ error }));
};

// GET all Books, no Auth required
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ error }));
};

