const Resume =
require("../models/resume");
const generatePDF =
require(
 "../utils/pdfGenerator"
);

// Create Resume

exports.createResume =
async (req,res)=>{

 try{

  const resume =
  await Resume.create({

   ...req.body,

   user:req.user.id

  });

  res.status(201).json({
   success:true,
   data:resume
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


exports.downloadPDF =
async (req,res)=>{

 try{

  const resume =
  await Resume.findById(
   req.params.id
  );

  if(!resume){

   return res.status(404)
   .json({
    success:false,
    message:
    "Resume Not Found"
   });

  }

  generatePDF(
   resume,
   res
  );

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Get All Resumes

exports.getAllResumes =
async (req,res)=>{

 try{

  const resumes =
  await Resume.find({

   user:req.user.id

  }).sort({
   createdAt:-1
  });

  res.json({
   success:true,
   count:resumes.length,
   data:resumes
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Get Resume By ID

exports.getResumeById =
async (req,res)=>{

 try{

  const resume =
  await Resume.findById(
   req.params.id
  );

  if(!resume){

   return res.status(404)
   .json({
    success:false,
    message:
    "Resume Not Found"
   });

  }

  res.json({
   success:true,
   data:resume
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Update Resume

exports.updateResume =
async (req,res)=>{

 try{

  const updated =
  await Resume.findByIdAndUpdate(

   req.params.id,

   req.body,

   {new:true}

  );

  res.json({
   success:true,
   data:updated
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Delete Resume

exports.deleteResume =
async (req,res)=>{

 try{

  await Resume.findByIdAndDelete(
   req.params.id
  );

  res.json({
   success:true,
   message:
   "Resume Deleted"
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Duplicate Resume

exports.duplicateResume =
async (req,res)=>{

 try{

  const resume =
  await Resume.findById(
   req.params.id
  );

  const copy =
  await Resume.create({

   user:req.user.id,

   title:
   resume.title +
   " Copy",

   personal:
   resume.personal,

   summary:
   resume.summary,

   skills:
   resume.skills,

   education:
   resume.education,

   experience:
   resume.experience,

   projects:
   resume.projects,

   template:
   resume.template

  });

  res.status(201).json({
   success:true,
   data:copy
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Public Resume

exports.getPublicResume =
async (req,res)=>{

 try{

  const resume =
  await Resume.findOne({

   _id:req.params.id,

   isPublic:true

  });

  if(!resume){

   return res.status(404)
   .json({
    success:false,
    message:
    "Public Resume Not Found"
   });

  }

  res.json({
   success:true,
   data:resume
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Share Resume

exports.togglePublic =
async (req,res)=>{

 try{

  const resume =
  await Resume.findById(
   req.params.id
  );

  resume.isPublic =
  !resume.isPublic;

  await resume.save();

  res.json({
   success:true,
   isPublic:
   resume.isPublic
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Search Resume

exports.searchResume =
async (req,res)=>{

 try{

  const resumes =
  await Resume.find({

   user:req.user.id,

   title:{
    $regex:req.query.q,
    $options:"i"
   }

  });

  res.json({
   success:true,
   data:resumes
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};


// Dashboard Stats

exports.resumeStats =
async (req,res)=>{

 try{

  const resumes =
  await Resume.find({
   user:req.user.id
  });

  const total =
  resumes.length;

  const publicCount =
  resumes.filter(
   r=>r.isPublic
  ).length;

  const averageATS =
  total > 0
  ?
  resumes.reduce(
   (sum,r)=>
   sum+r.atsScore,
   0
  )/total
  :
  0;

  res.json({

   totalResumes:
   total,

   publicResumes:
   publicCount,

   averageATS:
   averageATS

  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:error.message
  });

 }

};