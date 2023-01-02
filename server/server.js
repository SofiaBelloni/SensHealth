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

/* GET /api/calls/order/id */
app.get('/api/calls/order/id', async (req, res) => {
    try {
        const listCalls = await callDAO.listCallsAsc();
        return res.status(200).json(listCalls).end();
    } catch (error) {
        return res.status(500).json(error).end();
    }
});

/* GET /api/calls/order/active */
app.get('/api/calls/order/active', async (req, res) => {
    try {
        const listCalls = await callDAO.orderbyActiveCalls();
        return res.status(200).json(listCalls).end();
    } catch (error) {
        return res.status(500).json(error).end();
    }
});

/* GET /api/calls/order/closed */
app.get('/api/calls/order/closed', async (req, res) => {
    try {
        const listCalls = await callDAO.orderbyClosedCalls();
        return res.status(200).json(listCalls).end();
    } catch (error) {
        return res.status(500).json(error).end();
    }
});


/* PUT /api/call/:callId */
app.put('/api/call/:callId', async (req, res) => {
    const call = req.body;

    if (call.status === 'Active' || call.status === 'Closed') {
        if (req.params.callId == call.id) {
            try {
                const callId = await callDAO.updateCall(call);
                res.status(200).json({ Ok: `Status for Call #${call.id} updated` }).end();
            }
            catch (err) {
                console.error(err);
                res.status(503).json({ error: `Database error while updating call #${call.id}.` });
            }
        }
        else {
            res.status(503).json({ error: `Wrong call id in the request body.` });
        }
    }
    else {
        res.status(503).json({ error: `Status no possible in the request body.` });
    }

});

/* GET /api/call/:callId */
app.get('/api/call/:callId', async (req, res) => {
    try {
        const call = await callDAO.getCallById(req.params.callId);
        return res.status(200).json(call).end();
    } catch (error) {
        return res.status(500).json(error).end();
    }
})


/* Activate the server */
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});