const Resume = require("../models/resume");

const checkResumeOwner = async (
  req,
  res,
  next
) => {

  try {

    const resume =
      await Resume.findById(
        req.params.id
      );

    if (!resume) {

      return res.status(404)
      .json({
        success:false,
        message:
        "Resume Not Found"
      });

    }

    if (
      resume.user.toString()
      !==
      req.user.id
    ) {

      return res.status(403)
      .json({
        success:false,
        message:
        "Unauthorized"
      });

    }

    req.resume = resume;

    next();

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};

module.exports =
checkResumeOwner;