const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const event = req.body;

    try {
        await Promise.all([
            axios.post('http://localhost:4000/events', event),
            axios.post('http://localhost:4001/events', event),
            axios.post('http://localhost:4002/events', event),
            axios.post('http://localhost:4003/events', event),
        ]);
        res.send({ status: 'OK' });
    } catch (err) {
        console.error('Error forwarding events:', err.message);
        res.status(500).send({ status: 'Error', message: err.message });
    }
});

app.listen(4005, () => {
    console.log('Listening on 4005');
});
