// routes/book.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', verifyToken, bookController.addBook);
router.put('/:id', verifyToken, bookController.updateBook);
router.delete('/:id', verifyToken, bookController.deleteBook);
router.post('/:id/reserve', verifyToken, bookController.reserveBook); // Added verifyToken middleware

module.exports = router;
