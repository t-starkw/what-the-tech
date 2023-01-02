const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;


const app = express();

app.get('/', (req, res) => {
    res.send('The server is live!');
});


app.listen(PORT)