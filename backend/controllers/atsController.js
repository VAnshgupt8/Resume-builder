const Resume =
require("../models/resume");

const calculateATSScore =
require("../utils/atsScore");

exports.checkATSScore =
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

  const score =
  calculateATSScore(
   resume
  );

  resume.atsScore =
  score;

  await resume.save();

  let feedback =
  "";

  if(score >= 90){

   feedback =
   "Excellent ATS Resume";

  }else if(
   score >= 75
  ){

   feedback =
   "Good ATS Resume";

  }else if(
   score >= 50
  ){

   feedback =
   "Needs Improvement";

  }else{

   feedback =
   "Poor ATS Resume";

  }

  res.json({

   success:true,

   atsScore:score,

   feedback

  });

 }catch(error){

  res.status(500)
  .json({
   success:false,
   message:error.message
  });

 }

};