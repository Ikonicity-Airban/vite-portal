const {
  CreateAssignment,
  GetAllAssignment,
  GetOneAssignment,
  UpdateOneAssignment,
  DeleteOneAssignment,
} = require("../controllers/assignment.controller");

const { authorizeRoles } = require("../middlewares/auth");
const assignmentRouter = require("express").Router();

assignmentRouter
  .route("")
  .get(GetAllAssignment)
  .post(authorizeRoles("admin", "instructor"), CreateAssignment);

assignmentRouter
  .route("/:assignmentId")
  .get(GetOneAssignment)
  .patch(UpdateOneAssignment)
  .delete(DeleteOneAssignment);

module.exports = assignmentRouter;
