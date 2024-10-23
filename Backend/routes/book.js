const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const bookCtrl = require('../controllers/book');
//------------------------------------------------------------------------------------------------------------------------------------------------------------

// POST a new Book / Auth required
router.post(`/`, auth, bookCtrl.createBook);
// POST a rating for a specific Book / Auth required
router.post('/:id/rating', auth, bookCtrl.rateBook);
// PUT Updates a specific Book from the provided ID / Auth required
router.put('/:id', auth, bookCtrl.updateBook);
// DELETE Removes a specific Book from Database with the provided Id / Auth required
router.delete('/:id', auth, bookCtrl.deleteBook);
// GET a specific Book, no Auth required
router.get('/:id', bookCtrl.getOneBook);
// GET the three Books which have the bestRating on average
router.get('/bestrating', bookCtrl.getBestBooks);
// GET all Books, no Auth required
router.get('/', bookCtrl.getAllBooks);


module.exports = router;