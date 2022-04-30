import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { urlencoded } from "express";


const app=express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myKeeperAppDB" ,{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log("db coneected");});



const keeperSchema=mongoose.Schema({
    title:String,
    description:String
})

const Keeper= new mongoose.model("Keeper",keeperSchema);


app.get('/api/getAll',(req,res)=>{
   
    Keeper.find({},(err,keeperList)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(keeperList);
        }
    })
})

app.post("/api/addNew",(req,res)=>{
    

    const {title, description}= req.body; 
    const keeperobj= new Keeper({
        title,
        description
    })

    keeperobj.save(  err=>{
        if(err){
            console.log(err);
        }

        Keeper.find({},(err,keeperList)=>{
            if(err){
                console.log(err);
            }else{
                res.status(200).send(keeperList);
            }
        })
    })

})

app.post("/api/delete",(req,res)=>{
    
    const { id }=req.body;
    Keeper.deleteOne({_id:id},()=>{
        Keeper.find({},(err,keeperList)=>{
            if(err){
                console.log(err);
            }else{
                res.status(200).send(keeperList);
            }
        })
    })
})
app.listen(3001,()=>{
    console.log("backend created at port 3001");


})