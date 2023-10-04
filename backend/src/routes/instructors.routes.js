const instructorRouter = require("express").Router();

const {
  UpdateOneInstructorInfo,
  DeleteOneInstructor,
  GetOneInstructorStats,
  GetInstructorProfile,
} = require("../controllers/instructor.controller");
const { authorizeRoles } = require("../middlewares/auth");

instructorRouter.get("/my-profile", GetInstructorProfile);

instructorRouter
  .route("/:instructorId")
  .get(GetOneInstructorStats)
  .patch(authorizeRoles("admin", "instructor"), UpdateOneInstructorInfo)
  .delete(authorizeRoles("admin"), DeleteOneInstructor);

//export
module.exports = instructorRouter;
