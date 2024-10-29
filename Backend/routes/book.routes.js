const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const bookCtrl = require('../controllers/book.controller');
//------------------------------------------------------------------------------------------------------------------------------------------------------------

// GET all Books, no Auth required
router.get('/', bookCtrl.getAllBooks);
// GET the three Books which have the bestRating on average
router.get('/bestrating', bookCtrl.getTopBooks);
// GET a specific Book, no Auth required
router.get('/:id', bookCtrl.getOneBook);

// POST a new Book / Auth required
router.post(`/`, auth, multer, bookCtrl.createBook);
// POST a rating for a specific Book / Auth required
router.post('/:id/rating', auth, bookCtrl.rateBook);
// PUT Updates a specific Book from the provided ID / Auth required
router.put('/:id', auth, multer, bookCtrl.updateBook);
// DELETE Removes a specific Book from Database with the provided Id / Auth required
router.delete('/:id', auth, bookCtrl.deleteBook);


module.exports = router;