const express = require("express")
require("dotenv").config()
const mongoose =  require("mongoose")
const app = express()
let port = 5200

const ejs = require("ejs")

app.set("view engine", ejs)
app.use(express.json())
app.use(express.urlencoded ({extended:true}))

const todoSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
})
const todoModel = mongoose.models.todo_tbs || mongoose.model("todo_tbs", todoSchema)

app.get("/",async(req , res)=>{
    const arr =await todoModel.find({})
  res.render("login.ejs", {arr})
})
app.post("/postToTodo", async(req,res)=>{
    const {title, description} = req.body 
    const todo = await todoModel.create({title,description})


})
 const connect = () =>{
    mongoose.set("strictQuery",false)
    mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
        console.log("connected to mongodb")
    
    }).catch((error)=>{
        console.log(error)})
    
 }
 connect()
app.listen(process.env.PORT, ()=>{
    console.log(`started, ${process.env.PORT}`
    )
   }) 