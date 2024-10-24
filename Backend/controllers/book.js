const Book = require('../models/Book');
const fs = require('fs');


//----------------------------------------------------------------------------------------------------------------------------------------

// POST a new Book / Auth required
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
    });
    console.log(book)
    book.save()
        .then(() => res.status(201).json({ book, message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// POST a rating for a specific Book / Auth required
exports.rateBook = (req, res, next) => {

};

// PUT Updates a specific Book from the provided ID / Auth required
exports.updateBook = (req, res, next) => {
    console.log(req.body)
    const bookId = req.params.id;
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({ _id: bookId })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message: 'Unauthorized request' });
                return;
            }

            // Check if all fields in bookObject are the same as those in book
            const isSame = Object.keys(bookObject).every(key => book[key] === bookObject[key]);

            // Check if image needs to be updated
            const isImageUpdated = req.file && req.file.filename !== book.imageUrl.split('/').pop();

            if (isSame && !isImageUpdated) {
                return res.status(200).json({ message: 'No changes detected' });
            }

            const oldImageUrl = book.imageUrl;
            const oldImageFilename = oldImageUrl ? oldImageUrl.split('/images/')[1] : null;

            Book.updateOne({ _id: bookId }, { ...bookObject, _id: bookId })
                .then(() => {
                    if (req.file && oldImageFilename) {
                        fs.unlink(`uploads/images/${oldImageFilename}`, error => {
                            if (error) {
                                console.error({ error })
                            }
                            else { console.log('Old image deleted successfully !') }
                        })
                    }
                    res.status(200).json({ message: 'Objet modifié !' })
                })
                .catch(error => res.status(401).json({ error }));

        })
        .catch((error) => res.status(400).json({ error }))
};

// DELETE Removes a specific Book from Database with the provided Id / Auth required
exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

// GET a specific Book, no Auth required
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

// GET the three Books which have the bestRating on average
exports.getTopBooks = async (req, res) => {
    try {
        const topBooks = await Book.find()
            .sort({ averageRating: -1 })
            .limit(3);

        res.status(200).json(topBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving top books', error });
    }
};

// GET all Books, no Auth required
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ error }));
};

