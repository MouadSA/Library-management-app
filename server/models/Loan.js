const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Book = require('./Book');

const Loan = sequelize.define('Loan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idUtilisateur: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    idLivre: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        }
    },
    dateEmprunt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateRetour: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

User.hasMany(Loan, { foreignKey: 'idUtilisateur' });
Loan.belongsTo(User, { foreignKey: 'idUtilisateur' });

Book.hasMany(Loan, { foreignKey: 'idLivre' });
Loan.belongsTo(Book, { foreignKey: 'idLivre' });

module.exports = Loan;
