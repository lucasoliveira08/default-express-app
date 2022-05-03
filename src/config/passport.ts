import * as passport from "passport";
import { Strategy } from "passport-local";
import { UserMongo, UserPostgre } from "../repositories/User.repository";

const userFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  "signup",
  new Strategy(userFields, async (email, password, done) => {
    try {
      // await UserMongo.create({
      //   email,
      //   password,
      // });

      await UserPostgre.create({
        email,
        password,
      });

      return done(null, { email, password });
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "sign",
  new Strategy(userFields, async (email, password, done) => {
    try {
      const user = await UserMongo.findOne({
        email,
      });

      if (!(await user.compareHash(password)))
        return done(null, false, { message: "Wrong Password" });

      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  })
);
