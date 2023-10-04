const { StatusCodes } = require("http-status-codes");
const Instructor = require("../models/instructor.model");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../error");

//Create a instructor

// Get all available instructors
async function GetAllInstructors(req, res) {
  const instructors = await Instructor.find({})
    .populate("courseTeaching", "-createdAt -updatedAt")
    .populate("userId", "-createdAt -updatedAt -__v")
    .lean();
  res.status(StatusCodes.OK).json({ instructors, count: instructors.length });
}

// Get instructors for a instructor
async function GetOneInstructorStats(req, res) {
  const { instructorId } = req.params;
  const { role, userId } = res.locals.user;
  if (!(role == "admin" || instructorId == userId))
    throw new UnauthenticatedError("You are not authorized, admins only");

  const instructor = await Instructor.findById(instructorId).lean();
  if (!instructor) throw new NotFoundError("instructor Not found");
  res.status(StatusCodes.OK).json(instructor);
}

async function GetInstructorProfile(req, res) {
  const { role, userId } = res.locals.user;
  if (!(role == "admin" || role == "instructor"))
    throw new UnauthenticatedError("You are not authorized");

  const instructor = await Instructor.findOne({ userId })
    .populate("courseTeaching", "-createdAt -updatedAt")
    .populate("userId", "-createdAt -updatedAt -__v")
    .lean();
  if (!instructor) throw new NotFoundError("instructor Not found");
  res.status(StatusCodes.OK).json(instructor);
}

//update instructors
async function UpdateOneInstructorInfo(req, res) {
  const { instructorId } = req.params;
  if (!req.body) throw new BadRequestError("Please provide a valid query");
  const instructor = await Instructor.findByIdAndUpdate(
    instructorId,
    {
      ...req.body,
    },
    {
      new: true,
      runValidators: true,
    }
  ).lean();
  if (!instructor) throw new NotFoundError("instructor Not found");
  res.status(StatusCodes.OK).json(instructor);
}

//Delete a instructor
async function DeleteOneInstructor(req, res) {
  const { instructorId } = req.params;
  const instructor = await Instructor.findOneAndRemove({ _id: instructorId });
  if (!instructor) throw new NotFoundError("instructor Not found");
  res.status(StatusCodes.GONE).json({ msg: "instructor Deleted" });
}

module.exports = {
  GetAllInstructors,
  DeleteOneInstructor,
  GetInstructorProfile,
  GetOneInstructorStats,
  UpdateOneInstructorInfo,
};
