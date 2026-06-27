import ATSResume
from "../templates/ATSResume";

import ModernResume
from "../templates/ModernResume";

import ProfessionalResume
from "../templates/PrefessionalResume";

const ResumePreview =
({ resume })=>{

 switch(
  resume.template
 ){

  case "Modern":

   return(
    <ModernResume
     resume={resume}
    />
   );

  case "Professional":

   return(
    <ProfessionalResume
     resume={resume}
    />
   );

  default:

   return(
    <ATSResume
     resume={resume}
    />
   );

 }

};

export default ResumePreview;