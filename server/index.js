let express = require('express')
let cors = require('cors')
let bodyparser= require('body-parser')
let morgan= require('morgan')
let app = express()
let db = require('./connection/config')
let router= require('./router/routs')
let dbo 
db.connect((err,body)=>dbo=body)

let corsOptions={
    origin:'http://localhost:3000',
    optionSuccessStatus:200
}
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use('/API/v1/',router)


app.listen(3500)
