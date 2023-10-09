const { StatusCodes } = require("http-status-codes");
const Course = require("../models/course.model");
const { BadRequestError, NotFoundError } = require("../error");
const User = require("../models/user.model");
const Student = require("../models/student.model");
const Instructor = require("../models/instructor.model");

//Create a course
async function CreateCourse(req, res) {
  if (!req.body) throw new BadRequestError("No body provided");

  const { instructor: instructorId } = req.body;

  const instructor = await Instructor.findById(instructorId);
  if (!instructor) throw NotFoundError("instructor not found");

  const course = await Course.create({
    ...req.body,
  });
  if (!course) throw new Error("Internal Server Error");

  //Add a course for a lecturer through the admin
  instructor.courseTeaching = course._id;
  instructor.save();
  course.save();

  res.status(StatusCodes.CREATED).json(course);
}

//Register a courses
async function RegisterCourse(req, res) {
  const { courseId, studentId } = req.body;
  if (!courseId || !studentId)
    throw new BadRequestError(
      "Please provide an id for the course and student id"
    );

  const student = await Student.findById(studentId);
  const course = await Course.findById(courseId);

  if (!student) throw new NotFoundError("No student with the Id " + studentId);
  if (!course) throw new NotFoundError("No course with the Id " + courseId);

  const alreadyRegister = student.coursesOffered.find(
    (course) => course.toString() == courseId.toString()
  );

  if (alreadyRegister) throw new BadRequestError("You have already registered");
  student.coursesOffered.push(courseId);
  student.save();
  res.status(StatusCodes.OK).json(student);
}

async function UnRegisterCourse(req, res) {
  const { courseId, studentId } = req.body;
  if (!courseId || !studentId)
    throw new BadRequestError(
      "Please provide an id for the course and student id"
    );

  const student = await Student.findById(studentId);
  if (!student) throw new NotFoundError("No student with the Id " + studentId);
  const newArray = student.coursesOffered.filter(
    (c) => c._id.toString() !== courseId
  );
  student.coursesOffered = newArray;
  student.save();
  res.status(StatusCodes.OK).json(student);
}

// Get all available courses
async function GetAllCourses(req, res) {
  const courses = await Course.find({}).populate("instructor").lean();
  res.status(StatusCodes.OK).json({ courses, count: courses.length });
}

// Get courses for a Student
async function GetOneCourse(req, res) {
  const { courseId } = req.params;
  const course = await Course.findById(courseId)
    .populate(["students", "instructors"])
    .lean();
  if (!course) throw new NotFoundError("Course Not found");
  res.status(StatusCodes.OK).json(course);
}

//update courses
async function UpdateOneCourse(req, res) {
  const { courseId } = req.params;
  if (!req.body) throw new BadRequestError("Please provide a valid data");

  const course = await Course.findByIdAndUpdate(
    courseId,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!course) throw new NotFoundError("Course Not found");
  const instructor = await Instructor.findByIdAndUpdate(
    req.body.instructor,
    {
      courseTeaching: courseId,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  instructor.save();
  res.status(StatusCodes.OK).json(course);
}

//Delete a course
async function DeleteOneCourse(req, res) {
  const { courseId } = req.params;
  const course = await Course.findByIdAndDelete(courseId);
  if (!course) throw new NotFoundError("Course Not found");
  const instructor = await Instructor.findByIdAndUpdate(
    req.body.instructor,
    {
      courseTeaching: null,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  instructor.save();
  res.status(StatusCodes.GONE).json({ msg: "Course Deleted" });
}

module.exports = {
  CreateCourse,
  UpdateOneCourse,
  DeleteOneCourse,
  GetOneCourse,
  GetAllCourses,
  RegisterCourse,
  UnRegisterCourse,
};
