const express = require("express")
const {olxModel} = require("../model/olx.model")
const olxRouter = express.Router()

olxRouter.get("/",async(req,res)=>{
    const olxdata =await olxModel.find() 
    res.send(olxdata)
})

olxRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const olxdata= new olxModel(payload)
    await olxdata.save()
    res.send({"msg":"Data Created"})
})


olxRouter.delete("/delete/:id",async(req,res)=>{
    const olxID = req.params.id
    await olxModel.findByIdAndDelete(olxID)
    res.send({"msg":`olx with id:${olxID} has been deleted`})
})

olxRouter.patch("/updat/:id",async(req,res)=>{
    const olxID = req.params.id
    await olxModel.findByIdAndUpdate(olxID)
    res.send({"msg":`olx with id:${olxID} has been updated`})
})

module.exports={
    olxRouter
}