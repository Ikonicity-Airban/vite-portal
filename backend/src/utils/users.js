const { verifyRefreshToken } = require('./jwt');
const logger = require('./logger');

const createTokenUser = (user) => {
    const { email, _id, role } = user;
    return { _id, email, role };
};

const deserializeUser = (req, res, next) => {
    if (!req.cookies) return next();
    const jwt = req.cookies['jwt-token'];
    const payload = verifyRefreshToken(jwt);
    //setting the user in the response local object
    if (payload)
        res.locals.user = {
            userId: payload._id,
            role: payload.role,
            email: payload.email,
            isAuthenticated: true,
        };
    next();
};

module.exports = {
    createTokenUser,
    deserializeUser,
};
