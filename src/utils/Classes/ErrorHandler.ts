import { Response } from "express";

export default class ErrorHandler {
  public static Unalthorized(message: string, res?: Response) {
    if (res)
      return res.status(401).json({
        message: message,
      });

    throw new Error(message);
  }
}
