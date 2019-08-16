const express = require("express");
const appRouter = express.Router();
const { passport } = require("../auth/auth");

// Change /protected to /profile
// matches '/app/profile' route
appRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({ user: req.user, message: "authenticated" });
  }
);

module.exports = appRouter;
