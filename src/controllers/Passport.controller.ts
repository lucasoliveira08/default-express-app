import "../config/passport";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";

class PassportController {
  public signWithLocalStrategy(req, res, next) {
    return passport.authenticate("sign", async (err, user, info) => {
      try {
        if (err || !user) throw new Error("An error occurred." + err);

        req.login(user, { session: false }, async (error) => {
          if (error) return error;

          const body = { id: user.id, email: user.email, role: user.role };
          const token = jwt.sign(body, process.env.JWT_TOKEN, {
            expiresIn: "1h",
            algorithm: "HS256",
          });

          res.cookie("authorization", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          });

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }

  public signup(req, res, next) {
    passport.authenticate(
      "signup",
      { session: false },
      async (err, user, info) => {
        if (err || !user) throw new Error("An error occurred." + err);

        res.json({
          message: "User created successfully.",
        });
      }
    )(req, res, next);
  }
}

export default new PassportController();
