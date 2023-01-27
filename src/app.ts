import * as express from "express";
import * as morgan from "morgan";
import * as http from "http";
import * as error from "http-errors";
import * as cors from "cors";
import IClientResponse from "./types/clientResponse";
import { connectDatabase } from "./configs/database";
import authroutes from "./routes/auth";
import { verifyToken } from "./middlewares/authentication";

export default class App {
  public express: express.Application;
  public server: http.Server;

  public async init() {
    this.express = express();
    this.server = http.createServer(this.express);
    this.connectdb();
    this.middleares();
    this.routes();
    this.handleErrors();
  }

  private baseRoute = (req: express.Request, res: express.Response): void => {
    res.json({
      message: "Server is runnnig",
    });
  };

  private middleares(): void {
    this.express.use(verifyToken());
    this.express.use(cors());
    this.express.use(morgan(":method :url :status :response-time ms"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.express.get("/api", this.baseRoute);
    this.express.use("/api/auth", authroutes);
  }

  private connectdb(): void {
    connectDatabase();
  }

  private handleErrors(): void {
    this.express.use(
      (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        next(new error.NotFound("URL not found"));
      },
    );

    this.express.use(
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: any,
        req: express.Request,
        res: express.Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: express.NextFunction,
      ): void => {
        res.status(error.status || 500);

        res.json(<IClientResponse>{
          message: error.message || "Internal Error",
          data: null,
          error,
          success: false,
        });
      },
    );
  }
}
