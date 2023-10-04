const router = require("express").Router();
const {
  GetAllStudents,
  GetOneStudentStats,
  UpdateOneStudentInfo,
  DeleteOneStudent,
} = require("../controllers/student.controller");
const { authorizeRoles } = require("../middlewares/auth");

router.route("/").get(authorizeRoles("admin", "instructor"), GetAllStudents);

router.get("/my-profile", GetOneStudentStats);
router
  .route("/:studentId")
  .get(GetOneStudentStats)
  .patch(authorizeRoles("admin", "student"), UpdateOneStudentInfo)
  .delete(authorizeRoles("admin"), DeleteOneStudent);

//export
module.exports = router;
