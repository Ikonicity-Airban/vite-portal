const { StatusCodes } = require("http-status-codes");
const Student = require("../models/student.model");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../error");

//Create a student

// Get all available students
async function GetAllStudents(req, res) {
  const students = await Student.find({}).populate("coursesOffered").lean();
  res.status(StatusCodes.OK).json({ students, count: students.length });
}

// Get students for a Student
async function GetOneStudentStats(req, res) {
  const { role, userId } = res.locals.user;
  if (!(role == "admin" || role == "student"))
    throw new UnauthenticatedError("You are not authorized");

  const student = await Student.findOne({ userId })
    .populate("coursesOffered userId")

    // .populate("department")
    .lean();
  if (!student) throw new NotFoundError("Student Not found");
  res.status(StatusCodes.OK).json(student);
}

//update students
async function UpdateOneStudentInfo(req, res) {
  const { studentId } = req.params;
  if (!req.body) throw new BadRequestError("Please provide a valid query");
  const student = await Student.findByIdAndUpdate(
    studentId,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("userId")
    .lean();
  if (!student) throw new NotFoundError("student Not found");
  res.status(StatusCodes.OK).json(student);
}

//Delete a student
async function DeleteOneStudent(req, res) {
  const { studentId } = req.params;
  const student = await Student.findOneAndRemove({ _id: studentId });
  if (!student) throw new NotFoundError("student Not found");
  res.status(StatusCodes.GONE).json({ msg: "student Deleted" });
}

module.exports = {
  GetAllStudents,
  DeleteOneStudent,
  GetOneStudentStats,
  UpdateOneStudentInfo,
};
