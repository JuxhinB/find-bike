import express from "express";
import db from "./config/db";

import { BaseRouter } from "./routes";

const app = express();

db();

app.use("/", BaseRouter());

export { app };
