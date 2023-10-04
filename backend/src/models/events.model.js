const { Schema, model } = require("mongoose");

const EventsSchema = new Schema(
  {
    title: { type: String, required: true },
    content: String,
    date: Date,
    type: { type: String, enum: ["news", "event"] },
    instructor: { type: String },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", EventsSchema);
module.exports = Event;
