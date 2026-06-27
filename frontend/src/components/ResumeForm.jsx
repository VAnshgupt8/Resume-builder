import {
 useForm,
 useFieldArray
}
from
"react-hook-form";

import {
 useNavigate
}
from
"react-router-dom";

import API
from
"../services/api";

import {
 toast
}
from
"react-toastify";
import AiSummaryGenerator
from "./AiSummaryGenerator";

import {
 useState
}
from
"react";

import ResumePreview
from "./ResumePreview";

const ResumeForm =
({ editData })=>{

 const navigate =
 useNavigate();

 // eslint-disable-next-line no-unused-vars
 const [preview,
 // eslint-disable-next-line no-unused-vars
 setPreview] =
 useState(
  editData || {}
 );

 const {

  register,
  control,
  handleSubmit,
  watch,
  setValue

 } = useForm({

  defaultValues:
  editData || {

   skills:[
    {name:""}
   ],

   education:[
    {
     school:"",
     degree:""
    }
   ],

   experience:[
    {
     company:"",
     role:""
    }
   ],

   projects:[
    {
     title:"",
     description:""
    }
   ]

  }

 });
 

 const {

  fields:
  skillFields,

  append:
  addSkill,

  remove:
  removeSkill

 } =
 useFieldArray({

  control,

  name:"skills"

 });

 const {

  fields:
  educationFields,

  append:
  addEducation
 } =
 useFieldArray({

  control,

  name:"education"

 });

 const {

  fields:
  experienceFields,

  append:
  addExperience
 } =
 useFieldArray({

  control,

  name:"experience"

 });

 const {

  fields:
  projectFields,

  append:
  addProject

 } =
 useFieldArray({

  control,

  name:"projects"

 });

 const onSubmit =
 async(data)=>{

  try{

   if(editData){

    await API.put(
     `/resume/${editData._id}`,
     data
    );

    toast.success(
     "Updated"
    );

   }else{

    await API.post(
     "/resume",
     data
    );

    toast.success(
     "Created"
    );

   }

   navigate(
    "/dashboard"
   );

  // eslint-disable-next-line no-unused-vars
  }catch(error){

   toast.error(
    "Failed"
   );

  }

 };

 return(
  <>
    <select

 {...register(
 "template"
 )}

 className="
 border
 p-3
 rounded
 w-full
 mb-5"

>

 <option value="ATS">
  ATS
 </option>

 <option value="Modern">
  Modern
 </option>

 <option value="Professional">
  Professional
 </option>

</select>
    
    

 <div
 className="
 grid
 lg:grid-cols-2
 gap-8">

  <form
  onSubmit={
   handleSubmit(
    onSubmit
   )
  }
  className="
  bg-white
  p-6
  rounded-xl
  shadow">

   <input

    placeholder=
    "Resume Title"

    {...register(
     "title"
    )}

    className="
    border
    p-3
    rounded
    w-full
    mb-4"

   />
   <AiSummaryGenerator

 // eslint-disable-next-line no-undef
 setValue={setValue}

 summary={watch("summary")}

/>

   <textarea

    placeholder=
    "Summary"

    {...register(
     "summary"
    )}

    className="
    border
    p-3
    rounded
    w-full
    mb-4"

   />

   <h3>
   Skills
   </h3>

   {
    skillFields.map(
     (field,index)=>(

     <div
     key={field.id}
     className="flex gap-2">

      <input

       {...register(
       `skills.${index}.name`
       )}

       placeholder=
       "Skill"

       className="
       border
       p-2
       flex-1"

      />

      <button
      type="button"
      onClick={()=>
       removeSkill(index)
      }
      >

       X

      </button>

     </div>

    ))
   }

   <button
   type="button"
   onClick={()=>
   addSkill({
    name:""
   })
   }
   >

    Add Skill

   </button>

   <hr
   className="my-6"
   />

   <h3>
   Education
   </h3>

   {
    educationFields.map(
    (field,index)=>(

    <div
    key={field.id}>

     <input

      {...register(
      `education.${index}.school`
      )}

      placeholder=
      "School"

      className="
      border
      p-2
      w-full
      mb-2"

     />

     <input

      {...register(
      `education.${index}.degree`
      )}

      placeholder=
      "Degree"

      className="
      border
      p-2
      w-full"

     />

    </div>

   ))
   }

   <button
   type="button"
   onClick={()=>
   addEducation({
    school:"",
    degree:""
   })
   }
   >

    Add Education

   </button>

   <hr
   className="my-6"
   />

   <h3>
   Experience
   </h3>

   {
    experienceFields.map(
    (field,index)=>(

    <div
    key={field.id}>

     <input

      {...register(
      `experience.${index}.company`
      )}

      placeholder=
      "Company"

      className="
      border
      p-2
      w-full
      mb-2"

     />

     <input

      {...register(
      `experience.${index}.role`
      )}

      placeholder=
      "Role"

      className="
      border
      p-2
      w-full"

     />

    </div>

   ))
   }

   <button
   type="button"
   onClick={()=>
   addExperience({
    company:"",
    role:""
   })
   }
   >

    Add Experience

   </button>

   <hr
   className="my-6"
   />

   <h3>
   Projects
   </h3>

   {
    projectFields.map(
    (field,index)=>(

    <div
    key={field.id}>

     <input

      {...register(
      `projects.${index}.title`
      )}

      placeholder=
      "Project Title"

      className="
      border
      p-2
      w-full
      mb-2"

     />

     <textarea

      {...register(
      `projects.${index}.description`
      )}

      placeholder=
      "Description"

      className="
      border
      p-2
      w-full"

     />

    </div>

   ))
   }

   <button
   type="button"
   onClick={()=>
   addProject({
    title:"",
    description:""
   })
   }
   >

    Add Project

   </button>

   <button
   className="
   mt-6
   bg-indigo-600
   text-white
   px-6
   py-3
   rounded">

    Save Resume

   </button>

  </form>

  <ResumePreview
   resume={
    watch()
   }
  />

 </div>
  </>
 );

};

export default ResumeForm;