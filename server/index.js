const express = require("express")
const fs = require("fs")
const app = express()
const PORT = 5000
app.get("/user",(req,res)=>{
    // res.download("assets/2.jpeg")
    // res.send
    const {name,age,school} = req.query
  
    res.send(`Hello ${name}. You are ${age} Years old from ${school} School.`)
})
app.get("/profile",(req,res)=>{
    res.send("Welcome to my Profile")
})
app.get("/mkdir/:name",(req,res)=>{
    const {name }= req.params
    fs.mkdir(name,()=>{
        res.send(`Folder created with name ${name}`)
    })
})
app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})