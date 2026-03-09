// utils/generateTokens.js

const jwt = require("jsonwebtoken");

exports.generateAccessToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" } // short expiry
  );
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // long expiry
  );
};
