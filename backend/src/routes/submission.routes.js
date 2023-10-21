const {
  GetAllSubmission,
  CreateSubmission,
  GetOneSubmission,
  UpdateOneSubmission,
  DeleteOneSubmission,
} = require("../controllers/submission.controller");
const { authorizeRoles } = require("../middlewares/auth");
const submissionRouter = require("express").Router();

submissionRouter
  .route("")
  .get(GetAllSubmission)
  .post(authorizeRoles("admin", "instructor"), CreateSubmission);

submissionRouter
  .route("/:submissionId")
  .get(GetOneSubmission)
  .patch(UpdateOneSubmission)
  .delete(DeleteOneSubmission);

module.exports = submissionRouter;
