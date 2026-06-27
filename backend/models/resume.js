const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
{
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  title:{
    type:String,
    required:true
  },

  personal:{
    fullName:String,
    email:String,
    phone:String,
    location:String,
    linkedin:String,
    github:String,
    portfolio:String
  },

  summary:{
    type:String,
    default:""
  },

  skills:[
    String
  ],

  education:[
    {
      college:String,
      degree:String,
      year:String
    }
  ],

  experience:[
    {
      company:String,
      role:String,
      duration:String,
      description:String
    }
  ],

  projects:[
    {
      title:String,
      description:String,
      techStack:[String],
      github:String,
      liveLink:String
    }
  ],

  template:{
    type:String,
    enum:[
      "ATS",
      "Modern",
      "Professional"
    ],
    default:"ATS"
  },

  atsScore:{
    type:Number,
    default:0
  },

  isPublic:{
    type:Boolean,
    default:false
  }

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Resume",
  resumeSchema
);