var dbo
let db = require('../connection/config')
var { ObjectId } = require('mongodb')
db.connect((err,body)=>dbo=body)

module.exports={
    createTodo:function(data,callback){
        dbo.collection("todo").insertOne(data,(err,res)=>{
            callback("done")
        })
    },
    updateTodo:function(data,callback){
        let id = new ObjectId(data._id)
        let where = {_id:id}
        // console.log(where)
        let set = {
            category: data.category,
            todo: data.todo,
            date: data.date,
            where: data.where,
            status: data.status,
        
        }
        dbo.collection("todo").findOneAndUpdate(where, { $set: set }, { upsert: true },(err,result)=>{
            if(err)
            {
                callback("faild")
            }
            else {
                callback("success") }
          
        })
    },
    deleteTodo:function(data,callback){
        let id = new ObjectId(data._id)
        let where = { _id: id }
        dbo.collection("todo").findOneAndDelete(where,(err,res)=>{
            if(err)
            {callback("faild")}
            else
            {callback("success")}
        })

    },

    getAllTodo:function(data,callback){
        dbo.collection("todo").find().toArray((err,result)=>{
            callback(result)
        })
    }
}