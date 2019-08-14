const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwts;

const SECRET = "steamin hot secret"; // use an ENV variable & more secure string in a real app
const jwtSign = payload => {
  return jwt.sign(payload, SECRET);
};

passport.use(
  new JWTStrategy(
    {
      secretOrKey: SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        const user = await User.findByPk(token.id);

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const {
          body: { name }
        } = req;

        const user = await User.create({
          name: name,
          email: email,
          password: password
        });

        if (!user) {
          return done(null, false, { message: "Unable to sign up user" });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        // find user by their email
        const user = await User.findOne({ where: { email: email } });
        console.log(user.email);
        console.log(`*** user: ${user} ***`);

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // compare passwords
        const validate = await bcrypt.compare(password, user.password);
        console.log(`*** validate: ${validate} ***`);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }

        // login was a success, return the user object
        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

/**
 * middleware for checking authorization with jwt
 * source: https://github.com/mikenicholson/passport-jwt/issues/153#issuecomment-419627512
 */
const authorized = (request, response, next) => {
  passport.authenticate("jwt", { session: false }, async (error, user) => {
    if (error || !user) {
      // response.status(401).json({ message: 'Unauthorized' });
      let err = new Error("No bueno, no access allowed");
      err.status = 401;
      return next(err);
    }

    request.user = user;
    return next();
  })(request, response, next);
};

module.exports = {
  // export enhanced passport object (with strategy)
  passport,
  jwtSign,
  authorized // <- new code
};
