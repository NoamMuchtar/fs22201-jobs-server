const { verifyToken } = require("./providers/jwt");

const TOKEN_GENERATOR = "jwt";

const auth = (req, res, next) => {
  if (TOKEN_GENERATOR === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient) {
        throw new Error("Authentication Error: Please login");
      }

      const userInfo = verifyToken(tokenFromClient);
      if (!userInfo) {
        throw new Error("Authentication Error: Unauthorize user");
      }

      req.user = userInfo;
      next();
    } catch (error) {
      return res.status(401).send(error.message);
    }
  }
};

module.exports = auth;
