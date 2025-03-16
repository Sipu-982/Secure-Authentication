const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    fullname:String,
    email:String,
    phone:String,
    age:Number,
    password:String,
})
const UserModel=mongoose.model("Register",UserSchema,'register')
module.exports=UserModel