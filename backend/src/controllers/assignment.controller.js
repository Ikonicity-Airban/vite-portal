const Assignment = require("../models/assignment.model");
const { NotFoundError, BadRequestError } = require("../error");
const Instructor = require("../models/instructor.model");

async function GetAllAssignment(req, res) {
  const { level, instructor, course } = req.query;
  const query = {};

  if (level) query.level = level;
  if (course) query.course = course;
  if (instructor) query.instructor = instructor;

  const assignments = await Assignment.find(query).populate(
    "instructor course"
  );
  if (!assignments) throw new NotFoundError("No assignments");

  res.status(200).json({ count: assignments.length, assignments });
}

async function GetOneAssignment(req, res) {
  const { assignmentId } = req.params;
  if (!assignmentId) throw new BadRequestError("No id passed");

  const assignment = await Assignment.findById(assignmentId);
  if (!assignment)
    throw new NotFoundError(`No assignment with id ${assignmentId}`);

  res.status(200).json(assignment);
}

async function CreateAssignment(req, res) {
  const assignmentFields = req.body;

  if (!assignmentFields) throw new BadRequestError("No fields provided");
  const instructor = await Instructor.findById(req.body.instructor);

  const newAssignment = await Assignment.create(assignmentFields);
  instructor.assignments.push(newAssignment._id);

  res.status(200).json(newAssignment);
}

async function UpdateOneAssignment(req, res) {
  const { assignmentId } = req.params;
  if (!assignmentId) throw new BadRequestError("No id passed");

  const assignment = await Assignment.findByIdAndUpdate(
    assignmentId,
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!assignment)
    throw new NotFoundError(`No assignment with id ${assignmentId}`);

  res.status(200).json(assignment);
}

async function DeleteOneAssignment(req, res) {
  const { assignmentId } = req.params;
  if (!assignmentId) throw new BadRequestError("No id passed");

  await Assignment.findByIdAndDelete(assignmentId);
  res.status(200).json("Deleted");
}

module.exports = {
  GetAllAssignment,
  CreateAssignment,
  GetOneAssignment,
  UpdateOneAssignment,
  DeleteOneAssignment,
};
