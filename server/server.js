'use strict'
const express = require('express');
const cors = require('cors');

// init express
const app = new express();
app.use(express.json());
// stuff about CORS
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOption));

const port = 3001;


// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});