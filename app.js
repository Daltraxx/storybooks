const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

connectDB();

const app = express();

// Body Parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
const devMode = process.env.NODE_ENV;
if (devMode === 'development') app.use(morgan('dev'));

// Handlebars Helpers
const { formatDate, truncate, stripTags, editIcon } = require('./helpers/hbs');

// Handlebars
const { engine } = require('express-handlebars');
const engineOptions = { 
  helpers: {
    formatDate,
    truncate,
    stripTags,
    editIcon
  },
  defaultLayout: 'main', 
  extname: '.hbs' 
};
app.engine('.hbs', engine(engineOptions));
app.set('view engine', '.hbs');
app.set('views', './views');

// Sessions
const sessionOptions = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION_STRING })
};
app.use(session(sessionOptions));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${devMode} mode on port ${PORT}`));