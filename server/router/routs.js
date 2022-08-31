let app = require('express').Router()
let user= require('../controller/user')
const { body, validationResult } = require('express-validator');

app.post('/createTodo',(req,res)=>{

    user.createTodo(req.body,(result)=>{
        res.send(result)
    })
})
app.post('/updateTodo', (req,res)=>{

    
    user.updateTodo(req.body, (result1)=>{
        res.send(result1)
    })
})
app.post('/deleteTodo', (req, res) => {
    user.deleteTodo(req.body, (result1) => {
        res.send(result1)
    })
})

app.get('/getAllTodo',(req,res)=>{
    user.getAllTodo(req.body,(result)=>{
        res.send(result)
    })
})


module.exports = app