const express = require("express");

const {
    generateSummary,
    improveSummary,
} = require("../controllers/aiController.js");

const authMiddleware = require("../middleware/authMiddleWare.js");

const router = express.Router();

router.post(
    "/summary",
    authMiddleware,
    generateSummary
);

router.post(
    "/improve",
    authMiddleware,
    improveSummary
);

module.exports = router;