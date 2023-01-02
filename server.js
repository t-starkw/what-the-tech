const express = require('express');
const sequelize = require('./config/connection');
// const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;


const app = express();

app.get('/', (req, res) => {
    res.send('The server is live!');
});

sequelize.sync().then(() => {
    app.listen(PORT)
    console.log(`Server listening on port ${PORT}!`)
});

