const { genSalt, hash, compare } = require("bcryptjs");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    role: { type: String, enum: ["student", "instructor", "admin"] },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      min: [3, "Password length too short"],
    },
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Department",
    },
    blacklisted: {
      type: Boolean,
      enum: [true, false],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  try {
    if (!this.password) return null;
    const salt = await genSalt(10);
    const hashPassword = await hash(this.password, salt);
    this.password = hashPassword;
  } catch (error) {
    console.log(error);
  }
});

UserSchema.methods.verifyPassword = async function (password) {
  try {
    if (!password) return false;
    const isCorrect = await compare(password, this.password);
    return isCorrect;
  } catch (error) {
    console.log(error);
  }
};
const User = model("User", UserSchema);

//passport related code for the schema

//exporting user
module.exports = User;
