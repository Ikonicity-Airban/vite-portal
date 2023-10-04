const { Schema, model } = require("mongoose");
const Department = require("./department.model");

const InstructorSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    firstName: { type: String, required: true },
    photoURL: { type: String },
    lastName: { type: String, required: true },
    courseTeaching: { type: Schema.Types.ObjectId, ref: "Course" },
    assignments: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    department: { type: Schema.Types.ObjectId, ref: "Department" },
  },
  { timestamps: true }
);

InstructorSchema.pre("save", async function () {
  const department = Department.findOne({ name: "Computer Science" });
  if (department) {
    this.department = department._id;
  }
});

const Instructor = model("Instructor", InstructorSchema);

module.exports = Instructor;
