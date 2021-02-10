import express from "express";
import db from "./config/db";

import { BikeRouter } from "./routes";

const app = express();

db();

app.use("/api/v1/", BikeRouter());

export { app };
