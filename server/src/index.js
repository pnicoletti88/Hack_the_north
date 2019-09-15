const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const freshHelpers = require('./Routes/helpersFreshBooks');
const hooks = require('./Routes/freshbookHooks');

const port = 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', freshHelpers);
app.use('/hooks', hooks);

app.get('/', (req, res) => res.send('Site is up'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
