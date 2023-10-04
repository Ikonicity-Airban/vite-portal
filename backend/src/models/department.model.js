const { Schema, model } = require("mongoose");

// Define the department schema
const DepartmentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    headOfDepartment: { type: String, required: true },
    coursesOffered: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

DepartmentSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "department",
  // count: true,
});

DepartmentSchema.virtual("instructors", {
  ref: "Instructor",
  localField: "_id",
  foreignField: "department",
});

const Department = model("Department", DepartmentSchema);

module.exports = Department;
