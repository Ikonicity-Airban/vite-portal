const { Schema, model } = require("mongoose");

const InstructorSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
    firstName: { type: String, required: true },
    photoURL: { type: String },
    lastName: { type: String, required: true },
    courseTeaching: { type: Schema.Types.ObjectId, ref: "Course" },
    assignments: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const Instructor = model("Instructor", InstructorSchema);

module.exports = Instructor;
