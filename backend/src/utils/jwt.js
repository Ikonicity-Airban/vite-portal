const { sign, verify } = require("jsonwebtoken");
const { UnauthenticatedError } = require("../error");
// const log = require("./logger");

const signAccessToken = (payload) => {
  try {
    if (!payload) return null;
    const accessToken = sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "7d",
    });

    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

const signTokens = (response, payload) => {
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  const oneDay = 1000 * 60 * 60 * 24;
  response.cookie("jwt-token", refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  return {
    accessToken,
    refreshToken,
  };
};

const signRefreshToken = (payload) => {
  try {
    if (!payload) return null;
    const refreshToken = sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });

    return refreshToken;
  } catch (error) {
    console.error(error);
  }
};

//verify accessToken
const verifyAccessToken = (jwt) => {
  let decoded;
  if (!jwt) return false;
  try {
    decoded = verify(jwt, process.env.ACCESS_TOKEN);
  } catch (error) {
    throw new UnauthenticatedError(`Invalid access Token ${error.message}`);
  }
  return decoded;
};

//verify refreshToken
const verifyRefreshToken = (jwt) => {
  let decoded;
  if (!jwt) return false;
  try {
    decoded = verify(jwt, process.env.REFRESH_TOKEN);
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError(`Invalid refresh Token ${error.message}`);
  }
  return decoded;
};

//verify refreshToken
module.exports = {
  signTokens,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
