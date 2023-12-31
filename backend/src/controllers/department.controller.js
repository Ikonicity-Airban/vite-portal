const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");
const Department = require("../models/department.model");
const Student = require("../models/student.model");
const Instructor = require("../models/instructor.model");

//Creates only one department
async function GetDepartmentInfo(req, res) {
  const department = await Department.findOne({})
    .populate("instructors", "-__v -createdAt -updatedAt")
    .populate("students", "-__v -createdAt -updatedAt")
    .lean();
  res.status(StatusCodes.OK).json({ department });
}

//get Students in current department
async function GetStudentInDepartment(req, res) {
  const students = await Department.findOne({ name: "Computer Science" })
    .select("students name")
    .populate("students", "-__v -createdAt -updatedAt")
    .lean();
  res.status(StatusCodes.OK).json(students);
}

async function GetInstructorsInDepartment(req, res) {
  const instructors = await Department.findOne({ name: "Computer Science" })
    .select("instructors name")
    .populate("instructors", "-__v -createdAt -updatedAt")
    .lean();
  res.status(StatusCodes.OK).json(instructors);
}

async function UpdateDepartmentInfo(req, res) {
  if (!req.body || req.body.name)
    throw new BadRequestError("Invalid Field to be updated");

  const department = await Department.findOneAndUpdate(
    { name: "Computer Science" },
    { ...req.body },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ department });
}

async function DeleteDepartmentInfo(req, res) {
  await Department.deleteOne({ name: "Computer Science" });
  res.status(StatusCodes.GONE).json({ msg: "Otilo" });
}

module.exports = {
  GetDepartmentInfo,
  DeleteDepartmentInfo,
  UpdateDepartmentInfo,
  GetStudentInDepartment,
  GetInstructorsInDepartment,
};
