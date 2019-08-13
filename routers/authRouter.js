const express = require("express");
const authRouter = express.Router();
const { passport, jwtSign } = require("../auth/auth.js"); //import enhanced passport instance

// matches '/auth/login' route
authRouter.post("/login", (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An Error Occurred");
      }

      req.login(user, { session: false }, async error => {
        if (error) return next(error);

        const { email, id } = user; // <- new code
        const payload = { email, id }; // <- new code
        const token = jwtSign(payload); // <- new code

        // return the user object and token
        return res.json({ user, token }); // <- update code
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = authRouter;
