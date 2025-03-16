const express= require('express')
const mongoose=require('mongoose')
const cors=require('cors');

const UserModel=require('./Models/register')

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/authentication",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

app.post('/register',async (req,res)=>{
    try{
   const { fullname, email, phone, age, password } = req.body;
   const newUser = new UserModel({
    fullname,
    email,
    phone,
    age,
    password,
});

 const savedUser = await newUser.save();
 res.status(201).json({ message: "User registered successfully", user: savedUser });

    }
    catch{
        res.status(400).json({error:"Failed to register"});
    }
});

app.post('/login',async (req,res)=>{
    const { fullname, email, password } = req.body;
   const userdata= await UserModel.findOne({fullname:fullname, email:email})
  
    .then((user)=>{
        if(user){
            if(user.password===password){
                res.json("Success")
            }
            else{
                res.json("The password is incorrect")
            }

        }
        else{
            res.json("User doesn't exist")
        }
    })
})

app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
    
}) 