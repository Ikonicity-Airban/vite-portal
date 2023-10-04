const {
  CreateDepartment,
  DeleteDepartmentInfo,
  UpdateDepartmentInfo,
  GetStudentInDepartment,
  GetInstructorsInDepartment,
  GetDepartmentInfo,
} = require("../controllers/department.controller");
const { authorizeRoles } = require("../middlewares/auth");

const router = require("express").Router();

router
  .route("/")
  .get(authorizeRoles("admin"), GetDepartmentInfo)
  .post(authorizeRoles("admin"), CreateDepartment)
  .patch(authorizeRoles("admin"), UpdateDepartmentInfo)
  .delete(authorizeRoles("admin"), DeleteDepartmentInfo);

router.get("/students", [authorizeRoles("admin"), GetStudentInDepartment]);
router.get("/instructors", [
  authorizeRoles("admin"),
  GetInstructorsInDepartment,
]);

module.exports = router;
