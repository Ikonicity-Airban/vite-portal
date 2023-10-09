const Submission = require("../models/submission.model");
const { NotFoundError, BadRequestError } = require("../error");
const Assignment = require("../models/assignment.model");

async function GetAllSubmission(req, res) {
  const submissions = await Submission.find({}).populate("student course");

  if (!submissions) throw new NotFoundError("No submissions");

  res.status(200).json({ count: submissions.length, submissions });
}

async function GetOneSubmission(req, res) {
  const { submissionId } = req.params;
  if (!submissionId) throw new BadRequestError("No id passed");

  const submission = await Submission.findById(submissionId);
  if (!submission)
    throw new NotFoundError(`No submission with id ${submissionId}`);

  res.status(200).json(submission);
}

async function CreateSubmission(req, res) {
  const submissionFields = req.body;
  const { userId } = res.locals.user;

  if (!submissionFields) throw new BadRequestError("No fields provided");

  const newSubmission = await Submission.create({
    ...submissionFields,
    student: userId,
  });

  const assignment = await Assignment.findById(submissionFields.assignment);
  if (!assignment) {
    newSubmission.delete();
    throw new NotFoundError("Assignment not found");
  }
  assignment.submissions.push(newSubmission._id);

  res.status(200).json(newSubmission);
}

async function UpdateOneSubmission(req, res) {
  const { submissionId } = req.params;
  if (!submissionId) throw new BadRequestError("No id passed");

  const submission = await Submission.findByIdAndUpdate(
    submissionId,
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!submission)
    throw new NotFoundError(`No submission with id ${submissionId}`);

  res.status(200).json(submission);
}

async function DeleteOneSubmission(req, res) {
  const { submissionId } = req.params;
  if (!submissionId) throw new BadRequestError("No id passed");

  await Submission.findByIdAndDelete(submissionId);
  res.status(200).json("Deleted");
}

module.exports = {
  GetAllSubmission,
  CreateSubmission,
  GetOneSubmission,
  UpdateOneSubmission,
  DeleteOneSubmission,
};
