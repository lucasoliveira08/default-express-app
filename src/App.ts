import express = require("express");
import bodyParser from "body-parser";
import cors from "cors";
import hpp from "hpp";
import xss from "xss-clean";
import helmet from "helmet";
import cookieParser = require("cookie-parser");
import { Sanitize } from "./utils/functions/sanitize";

class App {
  public app: express.Application;
  private corsWhitelist: string[] = ["*"];

  constructor() {
    console.log("Starting server...");

    this.app = express();
    this.config();
    this.securityConfig();
    this.configureCustomMiddlewares();
  }

  private configureCors(): void {
    console.log("Configuring CORS...");

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || !(this.corsWhitelist.indexOf(origin) !== -1))
            return callback(new Error("Not allowed by CORS"));

          callback(null, true);
        },
        credentials: true,
        allowedHeaders: "Content-Type, Accept, Origin, Timestamp",
        preflightContinue: false,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      })
    );
  }

  private config(): void {
    console.log("Configuring server...");

    this.configureCors();
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(cookieParser());
  }

  private securityConfig(): void {
    console.log("Configuring security...");

    this.app.use(helmet());
    this.app.use(hpp());
    this.app.use(xss());
  }

  public start(): void {
    this.app.listen(process.env.PORT || 3333, () =>
      console.log("Server started!")
    );
  }

  private configureCustomMiddlewares(): void {
    console.log("Configuring middlewares...");

    this.app.use((req, res, next) => {
      Promise.all([
        Sanitize(req.body),
        Sanitize(req.params),
        Sanitize(req.query),
        Sanitize(req.headers),
      ]).then(([body, params, query, headers]) => {
        req.body = body;
        req.params = params as any;
        req.query = query as any;
        req.headers = headers as any;
        next();
      });
    });
  }
}

export default App;
