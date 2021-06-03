const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes for auth
require('./database/routes/auth.routes')(app);
require('./database/routes/user.routes')(app);

//routes get data from external server
require('./database/routes/data.routes')(app);

// use req.body
app.use(express.urlencoded({ extended: true }));

module.exports = app;
