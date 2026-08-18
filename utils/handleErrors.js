const createError = (validatior, message, status = 400) => {
  const text = String(message);
  const fullMessage = text.includes("Error:")
    ? text
    : `${validatior} Error: ${text}`;

  const error = new Error(fullMessage);
  error.status = status;
  throw error;
};

const handleError = (res, status = 500, message = "Internal Server Error") => {
  console.log(message);
  return res.status(status).send(message);
};

module.exports = { createError, handleError };
