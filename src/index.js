const express = require("express");
const app = express();
var validator = require("email-validator");

require("./db")
const user = require("./model")

app.use(express.json());

app.get('/',(req,res)=>{
    return res.send("Welcome to Summer School")
})

app.post('/api/user',async(req,res)=>{
    try{
        const users = new user({
            name : req.body.name,
            email : req.body.email
        })
        if(validator.validate(users.email)){
            await users.save();
            return res.status(201).send(users);
        }
        else{
            return res.status(400).send("Invalid email");
        }
    }catch(e){
        return res.status(500).send(e)
    }
});

app.get('/api/user',async(req,res)=>{
    try{
        const users = await user.find();
        return res.status(200).send(users)
    }catch(e){
        return res.status(500).send(e)
    }
})

app.patch('/api/user/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const users = await user.findByIdAndUpdate(_id,req.body)
        if(users){
            const usersUp = await user.findByIdAndUpdate(_id);
            return res.status(200).send(usersUp)
        }
        else{
            return res.status(400).send("Update Failed")
        }    
    }catch(e){
        return res.status(500).send(e)
    }
});

app.delete('/api/user/:id',async(req,res)=>{
    const _id = req.params.id;
    try{
        const users = await user.findByIdAndDelete(_id);
        if(users){
            return res.send("User account deleted")
        }
        return res.send("User account not identified");
    }catch(e){
        return res.status(500).send(e)
    }
})

app.get('/api/user/:id',async(req,res)=>{
    const _id = req.params.id;
    try{
        const users = await user.findById(_id);
        return res.status(200).send(users)
    }catch(e){
        return res.status(500).send(e)
    }
})

app.listen(3000,()=>{console.log("Listening on Port 3000")})





