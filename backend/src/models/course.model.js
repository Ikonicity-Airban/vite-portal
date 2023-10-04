const { Schema, model } = require("mongoose");
const Department = require("./department.model");

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },

    code: {
      type: String,
      required: [true, "Please provide a code"],
      unique: true,
    },

    description: { type: String },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
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

CourseSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "coursesOffered",
});

CourseSchema.pre;
const Course = model("Course", CourseSchema);

module.exports = Course;
