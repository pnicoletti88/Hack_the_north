const express = require('express');

const Router = express.Router();
const createhook = require('./webhooks');

Router.post('/invoice', (req, res) => {

});

Router.post('/expense', (req, res) => {

});

module.exports = Router;
