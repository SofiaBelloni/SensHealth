'use strict'
const callDAO = require('./DAO/DAOCall');
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


/* --- APIs ---*/

/* GET /api/calls */
app.get('/api/calls', async (req, res) => {
    try {
      const listCalls = await callDAO.listCalls();
      return res.status(200).json(listCalls).end();
    } catch (error) {
      return res.status(500).json(error).end();
    }
  });

app.get('/api/call/:callId', async(req, res) => {
    try {
        const call = await callDAO.getCallById(req.params.callId);
        return res.status(200).json(call).end();
    } catch (error) {
        return res.status(500).json(error).end();
    }
})


// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});