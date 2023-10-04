import { model, Schema } from "mongoose";

const submissionSchema = new Schema({
    instructor: {type: Schema.Types.ObjectId, ref: "Instructor"}
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment' },
    linkOrFile: { data: Buffer, contentType: String }
}, { timestamps: true });

const Submission = model('Submission', submissionSchema)
export default Submission