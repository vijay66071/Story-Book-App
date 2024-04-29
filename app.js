const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const connectDB = require('./config/db');

// Load config from the environment file
dotenv.config({path: './config/config.env'});

// Establish database connection
connectDB();

const app = express();

// Logging middleware for development environment
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Set up handlebars as the view engine
app.engine('.hbs', engine({
    defaultLayout:'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Static folder

app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/',require('./routes/index'))

// Get the port from environment and store in Express.
const PORT = process.env.PORT || 3000;

// Start listening to the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
