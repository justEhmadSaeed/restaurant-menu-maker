'use strict'
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Routes
const menuRouters = require('./src/routes/menu');
const restRouters = require('./src/routes/restaurant');
app.use(express.json());
app.use(cors());
app.use('/api/menu', menuRouters);
app.use('/api/rest', restRouters);

const port = process.env.PORT || 8000;

app.listen(port, () =>
	console.log(`Server is listening to PORT ${port}`)
);
