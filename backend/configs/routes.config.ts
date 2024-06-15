import { Express } from "express";
import {
  AdminRouter,
  AuthRouter,
  PostRouter,
  ReportRouter,
  UserRouter,
  DebugRouter,
} from "../routes";

export const configureRoutes = (app: Express) => {
  app.use("/auth", AuthRouter);
  app.use("/posts", PostRouter);
  app.use("/reports", ReportRouter);
  app.use("/users", UserRouter);
  app.use("/admin", AdminRouter);
  app.use("/debug", DebugRouter);
};
