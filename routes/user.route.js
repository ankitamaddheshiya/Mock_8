const express = require("express")
const { UserModel } = require("../model/user.model")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) res.send({ "msg": "Something went wrong", "err": err.message })
            else {
                const user = new UserModel({name,email,password:hash})
                await user.save()
                res.send({ "msg": "Now Users has been register Successfull" })
            }
        })

    } catch (err) {
        res.send({ "msg": "New user has been register" })
    }
    //  res.send({"msg":"Now Users has been register Successfull"})
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = (req.body)
    try {
        
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token = jwt.sign({ userID:user[0]._id }, "masai")
                    res.send({ "msg": "Logged in successfull", "token": token })
                }else{
                    res.send({ "msg": "Wrong Creditals" })
                }

            })

        }
    } catch (err) {
        res.send({ "msg": "NEw user has been register" })
    }
    // res.send({ "msg": "Logged in successfull" })

})

module.exports = {
    userRouter
}