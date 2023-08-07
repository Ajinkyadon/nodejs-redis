// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recordRoutes = require('./routes/recordRoutes');
const dotenv = require('dotenv');



dotenv.config();

const databaseconnection = require('./database/index')
const app = express();


// Middleware
app.use(bodyParser.json());
console.log("here");
// Routes
app.use('/record', recordRoutes);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
