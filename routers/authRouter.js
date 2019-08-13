const express = require("express");
const authRouter = express.Router();

// matches '/auth/login' route
authRouter.post("/login", (req, res, next) => {
  res.status(200).json({ message: "So far so good!" });
});

module.exports = authRouter;
