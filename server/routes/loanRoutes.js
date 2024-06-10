const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', loanController.getAllLoans);
router.get('/:id', loanController.getLoanById);
router.post('/', verifyToken, loanController.addLoan);
router.put('/:id', verifyToken, loanController.updateLoan);
router.delete('/:id', verifyToken, loanController.deleteLoan);

module.exports = router;
