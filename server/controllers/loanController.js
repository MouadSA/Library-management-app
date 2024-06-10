// controllers/loanController.js
const Loan = require('../models/Loan');
const User = require('../models/User');
const Book = require('../models/Book');

exports.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'nom', 'email']
                },
                {
                    model: Book,
                    attributes: ['id','titre']
                }
            ]
        });
        res.status(200).send(loans);
    } catch (error) {
        console.error('Error fetching loans:', error);
        res.status(500).send(error);
    }
};

exports.getLoanById = async (req, res) => {
    try {
        const loan = await Loan.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'nom', 'email']
                },
                {
                    model: Book,
                    attributes: ['id', 'titre']
                }
            ]
        });
        if (!loan) {
            return res.status(404).send('Prêt non trouvé');
        }
        res.status(200).send(loan);
    } catch (error) {
        console.error('Error fetching loan by ID:', error);
        res.status(500).send(error);
    }
};

exports.addLoan = async (req, res) => {
    try {
        const { idUtilisateur, idLivre, dateEmprunt, dateRetour } = req.body;
        const loan = await Loan.create({ idUtilisateur, idLivre, dateEmprunt, dateRetour });
        res.status(201).send(loan);
    } catch (error) {
        console.error('Error adding loan:', error);
        res.status(500).send(error);
    }
};

exports.updateLoan = async (req, res) => {
    try {
        const loan = await Loan.findByPk(req.params.id);
        if (!loan) {
            return res.status(404).send('Prêt non trouvé');
        }
        const updatedLoan = await loan.update(req.body);
        res.status(200).send(updatedLoan);
    } catch (error) {
        console.error('Error updating loan:', error);
        res.status(500).send(error);
    }
};

exports.deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findByPk(req.params.id);
        if (!loan) {
            return res.status(404).send('Prêt non trouvé');
        }
        await loan.destroy();
        res.status(200).send('Prêt supprimé');
    } catch (error) {
        console.error('Error deleting loan:', error);
        res.status(500).send(error);
    }
};
