const User = require("../models/user");
const bcrypt = require("bcryptjs");

const generateToken =
require("../utils/generateToken");


// Register User
exports.registerUser =
async (req,res)=>{

 try{

  const {
   name,
   email,
   password
  } = req.body;

  const existingUser =
  await User.findOne({
   email
  });

  if(existingUser){

   return res.status(400)
   .json({
    success:false,
    message:
    "User Already Exists"
   });

  }

  const hashedPassword =
  await bcrypt.hash(
   password,
   10
  );

  const user =
  await User.create({

   name,
   email,
   password:
   hashedPassword

  });

  res.status(201).json({

   success:true,

   token:
   generateToken(
    user._id
   ),

   user:{
    id:user._id,
    name:user.name,
    email:user.email
   }

  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Login User
exports.loginUser =
async (req,res)=>{

 try{

  const {
   email,
   password
  } = req.body;

  const user =
  await User.findOne({
   email
  });

  if(!user){

   return res.status(400)
   .json({
    success:false,
    message:
    "Invalid Credentials"
   });

  }

  const match =
  await bcrypt.compare(
   password,
   user.password
  );

  if(!match){

   return res.status(400)
   .json({
    success:false,
    message:
    "Invalid Credentials"
   });

  }

  res.json({

   success:true,

   token:
   generateToken(
    user._id
   ),

   user:{
    id:user._id,
    name:user.name,
    email:user.email
   }

  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Profile
exports.getProfile =
async (req,res)=>{

 try{

  const user =
  await User.findById(
   req.user.id
  ).select("-password");

  res.json(user);

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};