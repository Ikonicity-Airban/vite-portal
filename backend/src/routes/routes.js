const mainRouter = require("express").Router();
const authRoutes = require("./auth.routes");
const courseRoutes = require("./courses.routes");
const studentRoutes = require("./students.routes");
const instructorRoutes = require("./instructors.routes");
const departmentRoutes = require("./department.routes");
const assignmentRoutes = require("./assignment.routes");
const { deserializeUser } = require("../utils/users");
const { authenticateUser } = require("../middlewares/auth");
const { GetAllCourses } = require("../controllers/course.controller");
const { GetAllEvents } = require("../controllers/events.controller");
const eventRouter = require("./event.routes");
const { GetAllInstructors } = require("../controllers/instructor.controller");

mainRouter.use("/", authRoutes);
mainRouter.get("/courses", GetAllCourses);
mainRouter.get("/events", GetAllEvents);
mainRouter.get("/instructors", GetAllInstructors);
mainRouter.use([deserializeUser, authenticateUser]);
mainRouter.use("/courses", courseRoutes);

mainRouter.use("/events", eventRouter);
mainRouter.use("/students", studentRoutes);
mainRouter.use("/instructors", instructorRoutes);
mainRouter.use("/department", departmentRoutes);
mainRouter.use("/assignments", assignmentRoutes);

module.exports = mainRouter;
