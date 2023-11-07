"use strict";
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/webhook-lead', (req, res) => {
    console.log(req.originalUrl);
    console.log(req.body);
    return res.status(201).json({ message: req.originalUrl });
});
app.listen(3000, () => console.log('Started'));
