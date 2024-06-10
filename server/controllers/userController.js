const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model defined

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body; // Added role

    console.log('Received registration data:', { name, email, password, role });

    try {
        // Create a new user with the plain password
        const newUser = await User.create({
            nom: name, // Assuming 'nom' in your model corresponds to 'name'
            email,
            motDePasse: password, // Assuming 'motDePasse' in your model corresponds to 'password'
            role
        });

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};


exports.loginUser = async (req, res) => {
    const { email, motDePasse } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        if (user.motDePasse !== motDePasse) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Include role in the JWT payload
        const token = jwt.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
      

        res.json({
            message: 'Sign in successfully',
            token,
            userId : user.id,
            userName: user.nom, // Include the user's name in the response
            role: user.role // Include the user's role in the response
        });
        console.log("Signed in successfully");
    } catch (error) {
        console.error('Erreur lors de la connexion', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


// Get user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['motDePasse'] } // Exclude the password
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { nom, email, motDePasse, role } = req.body; // Assuming 'nom' is the name field

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (motDePasse) {
            user.motDePasse = await bcrypt.hash(motDePasse, 10);
        }

        user.nom = nom;
        user.email = email;
        user.role = role;

        await user.save();

        res.json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// userController.js
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['motDePasse'] } // Exclude the password
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.destroy({ where: { id } });
        if (!result) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};