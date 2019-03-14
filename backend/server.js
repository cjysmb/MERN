
require('./models/mongodb');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const todoCtrllr = require('./router/todoRouter');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {

    console.log(`Connected to port: ${port} !`);
    
});

app.use('/todos', todoCtrllr);

