const express =
require("express");

const router =
express.Router();

const protect =
require(
 "../middleware/authMiddleWare"
);

const checkResumeOwner =
require(
 "../middleware/checkResumeowner"
);

const {

 createResume,
 getAllResumes,
 getResumeById,
 updateResume,
 deleteResume,
 duplicateResume,
 getPublicResume,
 togglePublic,
 searchResume,
 resumeStats,
 downloadPDF

}
=
require(
 "../controllers/resumeController"
);


// CRUD

router.post(
 "/",
 protect,
 createResume
);

router.get(
 "/",
 protect,
 getAllResumes
);

router.get(
 "/pdf/:id",
 protect,
 downloadPDF
);

router.get(
 "/search",
 protect,
 searchResume
);

router.get(
 "/stats",
 protect,
 resumeStats
);

router.get(
 "/:id",
 protect,
 getResumeById
);

router.put(
 "/:id",
 protect,
 checkResumeOwner,
 updateResume
);

router.delete(
 "/:id",
 protect,
 checkResumeOwner,
 deleteResume
);


// Duplicate

router.post(
 "/duplicate/:id",
 protect,
 checkResumeOwner,
 duplicateResume
);


// Public Share

router.put(
 "/share/:id",
 protect,
 checkResumeOwner,
 togglePublic
);

router.get(
 "/public/:id",
 getPublicResume
);

module.exports =
router;