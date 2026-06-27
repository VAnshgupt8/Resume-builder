const express =
require("express");

const router =
express.Router();

const protect =
require(
 "../middleware/authMiddleWare"
);

const {
 checkATSScore
}
=
require(
 "../controllers/atsController"
);

router.get(
 "/:id",
 protect,
 checkATSScore
);

module.exports =
router;