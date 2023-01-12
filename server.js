const express = require('express');
const sequelize = require('./config/connection');
// const mysql = require('mysql2');
const { User, Post, Comment } = require('./models');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const path = require('path');

const PORT = process.env.PORT || 3000;

// Session
const session = require('express-session');
const sessionSequelize = require('connect-session-sequelize');
const SequelizeStore = sessionSequelize(session.Store);
const sessionOptions = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();

// Handlebars middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, '/public')));
app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Handlebars route


sequelize.sync({ force:false }).then(() => {
    app.listen(PORT)
    console.log(`Server listening on port ${PORT}!`)
});

