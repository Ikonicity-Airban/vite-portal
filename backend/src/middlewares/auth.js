const { UnauthenticatedError } = require("../error");
const { verifyAccessToken } = require("../utils/jwt");
const logger = require("../utils/logger");

const authenticateUser = async (req, res, next) => {
  if (res.locals.user?.isAuthenticated) {
    next();
    return;
  }

  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    logger.info("I used token 👌✔");
    if (!token) {
      throw new UnauthenticatedError("Authentication invalid");
    }
  }

  const payload = verifyAccessToken(token);
  // Attach the user and his permissions to the req object
  res.locals.user = {
    userId: payload._id,
    role: payload?.role,
    email: payload.email,
  };
  next();
};

//AUTHENTICATE ROLE
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // if (!roles.includes(res.locals.user.role)) {
    //   throw new UnauthenticatedError("Unauthorized to access this route");
    // }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles,
};
