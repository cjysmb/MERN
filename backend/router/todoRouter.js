
const express = require('express');
const Todo = require('../models/todo.model');
const router = express.Router();
const objectId = require('mongoose').Types.ObjectId;

//get data from database
router.get('/', (req,res) => {

    Todo.find((err, todos) => {

        if(err) {

            console.log(err);

        } else{

            res.json(todos);
        }
    });
});

//get data by id's
router.get('/:id', (req, res) => {

    let id = req.params.id;

    Todo.findById(id, (err, todo) => {

        res.json(todo);

    });
});

//insert data from database
router.post('/create', (req,res) => {

    let todo = new Todo();

    todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo.save((err, doc) => {

        if(!err) {

            res.send(doc);

        } else {

            return next(err);

        }
    });
});

router.put('/:id', (req, res) => {

    if(!objectId.isValid(req.params.id)) 

        return res.status(400).send(`No record found: ${req.param.id}`);

    let todo = {

    todo_description: req.body.todo_description,
    todo_responsible: req.body.todo_responsible,
    todo_priority: req.body.todo_priority,
    todo_completed: req.body.todo_completed

    }

    Todo.findOneAndUpdate(req.params.id, {$set: todo }, {new: true},(err,doc) => {

        if(!err) {
            
            res.send(doc);

        } else {

            console.log(`Unable to update record, Error: ${err}`);

        }
    });
});

router.delete('/:id', (req, res) => {

    if(!objectId.isValid(req.params.id)) 

        return res.status(400).send(`No record found: ${req.param.id}`);

    Todo.findOneAndDelete(req.param.id , (err, doc) => {

        if(!err) {

            res.send(doc);

        } else {

            console.log(`Unable to delete record, Error: ${err}`);
        }
    });

});



module.exports = router;