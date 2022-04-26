import { Router } from "express";
import AuthService from "../services/Auth.service";
import * as jwt from "jsonwebtoken";
import "../config/passport";
import * as passport from "passport";

class AuthController {
  private route = Router();
  private defaultURL = "/auth";
  private service = new AuthService();

  constructor() {
    this.get();
    this.post();
    this.put();
    this.patch();
    this.delete();
    this.signUp();
  }

  private get(): void {
    this.route.get(`${this.defaultURL}`, async (req, res) => {
      res.json({
        message: "GET",
      });
    });
  }

  private signUp(): void {
    this.route.post(
      `${this.defaultURL}/signup`,
      passport.authenticate("signup", { session: false }),
      async (req, res) => {
        res.json({
          message: "SIGNUP",
        });
      }
    );
  }

  private post(): void {
    this.route.post(
      `${this.defaultURL}`,
      async (req, res, next) => {
        passport.authenticate("sign", async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error("An error occurred." + err);

              return next(error);
            }

            req.login(user, { session: false }, async (error) => {
              if (error) return next(error);

              const body = { _id: 123, email: user.email };
              const token = jwt.sign({ user: body }, "TOP_SECRET");

              return res.json({ token });
            });
          } catch (error) {
            return next(error);
          }
        })(req, res, next);
      },
      async (req, res) => {
        this.service.login();

        res.json({
          message: "LOGIN",
        });
      }
    );
  }

  private put(): void {
    this.route.put(`${this.defaultURL}`, async (req, res) => {
      res.json({
        message: "PUT",
      });
    });
  }

  private patch(): void {
    this.route.patch(`${this.defaultURL}`, async (req, res) => {
      res.json({
        message: "PATCH",
      });
    });
  }

  private delete(): void {
    this.route.delete(`${this.defaultURL}`, async (req, res) => {
      res.json({
        message: "DELETE",
      });
    });
  }

  public getRouter(): Router {
    return this.route;
  }
}

export default new AuthController().getRouter();
