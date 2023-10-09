const { Schema, model } = require("mongoose");

const submissionSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true,
    },
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    linkOrFile: { type: String, required: true },
    dateOfSubmission: { type: Date },
  },
  { timestamps: true }
);

const Submission = model("Submission", submissionSchema);

module.exports = Submission;
