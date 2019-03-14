
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true }, (err) => {

    if(!err) {

        console.log('Connected to mongoDB todos!');

    } else {

        console.log(`Unable to connect, error: ${err}`);

    }
    
});

require('./todo.model');