const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


// Generate Resume Summary

exports.generateSummary =
async (req,res)=>{

 try{

  const {
   role,
   skills,
   experience
  } = req.body;

  const prompt = `
Generate a professional resume summary.

Role:
${role}

Skills:
${skills}

Experience:
${experience}

Keep it under 80 words.
`;

  const response =
  await client.chat.completions.create({

   model:"gpt-4o-mini",

   messages:[
    {
     role:"user",
     content:prompt
    }
   ]

  });

  res.json({

   success:true,

   summary:
   response.choices[0]
   .message.content

  });

 }catch(error){

  res.status(500).json({

   success:false,
   message:error.message

  });

 }

};



// Improve Existing Summary

exports.improveSummary =
async (req,res)=>{

 try{

  const {
   summary
  } = req.body;

  const prompt = `
Improve the following resume summary professionally.

${summary}

Make it ATS friendly and concise.
`;

  const response =
  await client.chat.completions.create({

   model:"gpt-4o-mini",

   messages:[
    {
     role:"user",
     content:prompt
    }
   ]

  });

  res.json({

   success:true,

   improvedSummary:
   response.choices[0]
   .message.content

  });

 }catch(error){

  res.status(500).json({

   success:false,
   message:error.message

  });

 }

};