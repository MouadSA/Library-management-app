// controllers/bookController.js
const Book = require('../models/Book');
const User = require('../models/User');
const Loan = require('../models/Loan');


// controllers/bookController.js
exports.reserveBook = async (req, res) => {
    try {
        // Extract the book ID from the request parameters
        const { id } = req.params; // book ID
        const userId = req.user.id; // Correctly extract user ID from req.user

        const book = await Book.findByPk(id);

        // If the book doesn't exist, return a 404 Not Found response
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Check if the book is already reserved
        if (!book.disponible) {
            return res.status(400).json({ error: 'Book is already reserved' });
        }

        // Update the book's status to indicate it has been reserved
        book.disponible = false; // Assuming 'disponible' is the field indicating availability
        await book.save();

        // Create a new loan
        const loan = await Loan.create({
            idUtilisateur: userId, // Use userId variable
            idLivre: id,
            dateEmprunt: new Date(),
            dateRetour: new Date(new Date().setMonth(new Date().getMonth() + 1)) // Setting return date to one month from now
        });

        // Return a 201 Created response with the reserved book and loan details
        res.status(201).json({ message: 'Book reserved successfully', book, loan });

    } catch (error) {
        // Handle any errors
        console.error('Error reserving book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





exports.getAllBooks = async (req, res) => {
    try {
       
        const books = await Book.findAll();
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error);
    }
};





exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).send('Livre non trouvé');
        }
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.addBook = async (req, res) => {
    try {
        const { titre, auteur, anneePublication, genre, resume, disponible } = req.body;
        const book = await Book.create({ titre, auteur, anneePublication, genre, resume, disponible });
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).send('Livre non trouvé');
        }
        const updatedBook = await book.update(req.body);
        res.status(200).send(updatedBook);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).send('Livre non trouvé');
        }
        await book.destroy();
        res.status(200).send('Livre supprimé');
    } catch (error) {
        res.status(500).send(error);
    }
    
};
