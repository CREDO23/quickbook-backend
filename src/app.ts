import * as express from "express";
import * as morgan from "morgan";
import * as http from "http";
import * as error from "http-errors";
import * as cors from "cors";
import { connectDatabase } from "./configs/database";
import authroutes from "./routes/auth";
import userRoutes from "./routes/user";
import passwordRoutes from "./routes/password";
import { verifyToken } from "./middlewares/authentication";

export default class App {
  public express: express.Application = express();
  public server: http.Server = http.createServer(this.express);

  public async init() {
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
    this.express.use("/api/users", userRoutes);
    this.express.use("/api/password", passwordRoutes);
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
