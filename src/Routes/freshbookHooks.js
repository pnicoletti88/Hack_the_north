const express = require('express');

const Router = express.Router();
const createhook = require('./webhooks');

createhook('invoice', 'n7nxNe');

Router.post('/invoice', (req, res) => {
  console.log(req);
});

Router.post('/expense', (req, res) => {

});

module.exports = Router;
