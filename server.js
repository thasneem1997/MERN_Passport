
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/components/config/db');
const passport = require('passport');

const app = express();


connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Passport middleware
app.use(passport.initialize());
require('./src/components/config/passport')(passport);


app.use('/api/auth', require('./src/components/routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
