const express=require("express");
const app=express();
const {spawn,exec} = require('child_process');

const PORT=5001;
app.listen(process.env.PORT || PORT, ()=>{
    console.log("running");
})

app.get("/user/:id", (req, res)=>{
    res.send(`welcome ${req.params.id}`)
})
app.get("/photo", (req, res)=>{
    res.download("./assets/2.jpeg")
})
app.get("/", (req, res)=>{
    res.send(req.query)
})

app.get('/python', (req, res) => {
 
 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python', ['demo.py']);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.send(dataToSend)
 });

 
})
app.get('/cpp', (req, res) => {
    var dataToSend;
    const cpp = spawn('g++', ['-o','app','demo.cpp']);
    cpp.on('close', (code) => {
        exec("demo", (error, stdout, stderr) => res.send(stdout));
        
        });

    });
