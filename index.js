const express = require("express")
const cors = require("cors")
require("dotenv").config()
const {connection} = require("./config/db")

const {userRouter} = require("./routes//user.route")

const { olxRouter } = require("./routes/olx.route")
const { authenticate } = require("./middleware/auth.middleware")




const app = express()

app.use(express.json())
app.use(cors())



app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/olx",olxRouter)



app.listen(8000,async()=>{
    try{
        await connection
        console.log("server is running at port 8000")  
    }catch(err){
        console.log(err)
    }
    // console.log("server is running at port 8000")
})