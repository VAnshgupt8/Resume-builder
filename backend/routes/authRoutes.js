const express =
require("express");

const router =
express.Router();

const {

 registerUser,
 loginUser,
 getProfile

} =
require(
 "../controllers/authController"
);

const protect =
require(
 "../middleware/authMiddleWare"
);

const {
 body
} = require(
 "express-validator"
);

const registerValidation = [

 body("name")
 .notEmpty(),

 body("email")
 .isEmail(),

 body("password")
 .isLength({
  min:6
 })

];

router.post(
 "/register",
 registerUser
);

router.post(
 "/login",
 loginUser
);

router.get(
 "/profile",
 protect,
 getProfile
);

module.exports =
router;