const express = require('express');
const sequelize = require('./config/connection');
// const mysql = require('mysql2');
const { User, Post, Comment } = require('./models');
const routes = require('./controllers');
const PORT = process.env.PORT || 3000;

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

app.use(session(sessionOptions));
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    res.send('The server is live!');
});

sequelize.sync({ force:false }).then(() => {
    app.listen(PORT)
    console.log(`Server listening on port ${PORT}!`)
});

