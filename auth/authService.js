const { createError, handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");

const TOKEN_GENERATOR = "jwt";

const auth = (req, res, next) => {
  if (TOKEN_GENERATOR === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient) {
        return createError("Authentication", "Please login", 401);
      }

      const userInfo = verifyToken(tokenFromClient);
      if (!userInfo) {
        return createError("Authentication", "Unauthorize user", 401);
      }

      req.user = userInfo;
      next();
    } catch (error) {
      return handleError(res, error.status, error.message);
    }
  }
};

module.exports = auth;
