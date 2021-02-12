import cors from "cors";
import express from "express";
import db from "./config/db";

import { BikeRouter, UserRouter, UserActionsRouter } from "./routes";

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json({ limit: "100mb" }));

db();

app.use("/bike/", BikeRouter());
app.use("/user/", UserRouter());
app.use("/user-actions/", UserActionsRouter());

export { app };
