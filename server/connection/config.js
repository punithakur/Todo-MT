var mongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'
module.exports ={
    connect:function(callback){
        mongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err,db)=>{
            if(err) throw err
            dbo = db.db('bits4')
            console.log('connected to db')
            callback(null,dbo)
        })
    }
}