const ErrorHander = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.message = err.message || "Internal server error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found ${err.path}`;
    err = new ErrorHander(message, 400);
  }

  // Mongoose Duplicate Key Error

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHander(message, 400);
  }

  // Wrong JWT Token
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Please try again`;
    err = new ErrorHander(message, 400);
  }
  
  // JWT EXPIRE Token
  
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired , Please try again`;
    err = new ErrorHander(message, 400);
  }
  
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
