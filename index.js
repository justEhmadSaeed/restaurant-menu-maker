'use strict'
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
// Routes
const routes = require('./routes/menu');
app.use(express.json());
app.use(cors());
app.use('/api', routes);
