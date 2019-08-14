const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const authRouter = require("./routers/authRouter");
const passport = require("passport");
const appRouter = require("./routers/appRouter");
const { authorized } = require("./auth/auth");

// establishing the I/O port
const PORT = process.env.PORT || 4567;

// initializing the express app
const app = express();

// configure middleware
app.use(logger("dev"));
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/app", authorized, appRouter);
app.use(passport.initialize()); //<- new code

app.get("/", async (request, response) => {
  try {
    response.json({ message: "Welcome to Express Auth App!" });
  } catch (e) {
    response.status(e.status).json({ message: e.status });
  }
});

// Centralized Error Handler Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

app.listen(PORT, () =>
  console.log(`App is up and running listening on port ${PORT}`)
);
