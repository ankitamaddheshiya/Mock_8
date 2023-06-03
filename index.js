const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes//user.route")
const { olxRouter } = require("./routes/olx.model")
const { authenticate } = require("./middleware/auth.middleware")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors)
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/olx",olxRouter)



app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("server is running at port 8000")  
    }catch(err){
        console.log(err)
    }
    // console.log("server is running at port 8000")
})