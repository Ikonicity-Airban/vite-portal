const router = require("express").Router();
const {
  GetAllCourses,
  CreateCourse,
  GetOneCourse,
  UpdateOneCourse,
  DeleteOneCourse,
  RegisterCourse,
  UnRegisterCourse,
} = require("../controllers/course.controller");
const { authorizeRoles } = require("../middlewares/auth");

router
  .route("/")
  .get(GetAllCourses)
  .post(authorizeRoles("admin", "instructor"), CreateCourse);
router.post("/register", authorizeRoles("admin", "student"), RegisterCourse);
router.post(
  "/unregister",
  authorizeRoles("admin", "student"),
  UnRegisterCourse
);
router
  .route("/:courseId")
  .get(GetOneCourse)
  .patch(authorizeRoles("admin", "instructor"), UpdateOneCourse)
  .delete(authorizeRoles("admin", "instructor"), DeleteOneCourse);

//export
module.exports = router;
