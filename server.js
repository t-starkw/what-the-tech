const express = require('express');
const sequelize = require('./config/connection');
// const mysql = require('mysql2');
const { User, Post, Comment } = require('./models')
const routes = require('./controllers');
const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    res.send('The server is live!');
});

sequelize.sync({ force:true }).then(() => {
    app.listen(PORT)
    console.log(`Server listening on port ${PORT}!`)
});

