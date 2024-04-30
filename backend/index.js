const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const app = express()
const dbconnect = require('./config/dbconnection')
require("dotenv").config()



//database connection
dbconnect.dbconnect()

//cores connection
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200',
    
}))


app.use(cookieparser())
app.use(express.json())

//user route
const userRoute = require('./routes/useerRoute')
// const taskRoute = require('./routes/taskRoute')
app.use('', userRoute)
// app.use('taskRoute', taskRoute)


//start the server
app.listen(process.env.PORT, () => {
    console.log("server started listening to port");
})