import * as passport from "passport";
import { Strategy } from "passport-local";

const users: { email: string; password: string }[] = [];

passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        await users.push({ email, password });

        return done(null, { email, password });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "sign",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        console.log(users);
        const user = await users.find((u) => u.email === email);

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // const validate = await user.isValidPassword(password);

        // if (!validate) {
        //   return done(null, false, { message: "Wrong Password" });
        // }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
