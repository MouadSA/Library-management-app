const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');
const PORT = process.env.PORT || 163;
const app = express();

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());
 
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => console.log(err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
