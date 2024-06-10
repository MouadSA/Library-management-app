// middleware/verifyToken.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey';

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'Aucun token fourni.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error decoding token:', err);
            return res.status(500).send({ auth: false, message: 'Échec de l\'authentification du token.' });
        }

        console.log('Decoded token:', decoded); // Log the decoded token
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;
