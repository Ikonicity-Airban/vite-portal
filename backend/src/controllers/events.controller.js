const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../error");

const Event = require("../models/events.model");

//Creates only one Event
async function CreateEvent(req, res) {
  const { title, content } = req.body;
  // const { userId } = res.locals.user;

  if (!title || !content) {
    throw new BadRequestError("invalid fields");
  }

  const event = await Event.create({
    ...req.body,
    date: new Date(Date.now()),
  });

  res.status(StatusCodes.CREATED).json({ event });
}

//get Students in current Event
async function GetAllEvents(req, res) {
  const events = await Event.find({})
    .populate("instructor", "-__v -createdAt -updatedAt")
    .lean();
  res.status(StatusCodes.OK).json({ events, count: events.length });
}

async function UpdateEventInfo(req, res) {
  if (!req.body || !req.body.title)
    throw new BadRequestError("Invalid Field to be updated");

  const { eventId } = req.params;
  console.log(
    "🚀 ~ file: events.controller.js:40 ~ UpdateEventInfo ~ eventId:",
    eventId
  );
  const event = await Event.findByIdAndUpdate(
    eventId,
    { ...req.body },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(StatusCodes.OK).json(event);
}

async function DeleteEventInfo(req, res) {
  const { eventId } = req.params;
  await Event.findByIdAndDelete(eventId);
  res.status(StatusCodes.OK).json({ msg: "Otilo" });
}

module.exports = {
  CreateEvent,
  GetAllEvents,
  DeleteEventInfo,
  UpdateEventInfo,
};
