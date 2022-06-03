const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

//load .env file
require('dotenv').config();
//connect to database
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});
//create express app
const app = express();
const port = 3000;
//enable cors
app.use(cors());
//enable body parser
app.use(express.json());
//enable routes
app.use('/api/users', require('./routes/users'));
//start server
app.listen(port, () => console.log(`Server started on port ${port}`));
