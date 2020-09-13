const path = require("path");
const express = require("express");
const fs = require("fs")
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static("./build"))


app.post("/new-video",(req,res)=>{
    fs.readFile(path.join(__dirname,"/publick/url.json"),"utf8",(err,result)=>{
        if(err)throw err
        let url = JSON.parse(result)
        url.push(req.body.url)
        console.log(url);
        fs.writeFileSync(path.join(__dirname,"/publick/url.json"),JSON.stringify(url),(err,file)=>{
            res.json(file)
        })
    })
})
app.get("/get-video",(req,res)=>{
    fs.readFile(path.join(__dirname,"/publick/url.json"),"utf8",(err,result)=>{
        if(err)throw err
        let url = JSON.parse(result)
        url.push(req.body.url)
        console.log(url);
        res.json(url)
    })
})
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"build/index.html"))
})  

app.listen(4000,()=>{
    console.log("Сервер has been started");
})