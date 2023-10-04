const router = require("express").Router();

const {
  Login,
  CreateAccount,
  Logout,
} = require("../controllers/auth.controller");

router.post("/login", Login);
router.post("/create-account/student", CreateAccount);
router.post("/create-account/instructor", CreateAccount);
router.get("/refresh");
router.get("/logout", Logout);
module.exports = router;
