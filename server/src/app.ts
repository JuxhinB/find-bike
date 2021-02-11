import express from "express";
import db from "./config/db";

import { BikeRouter, UserRouter } from "./routes";

const app = express();

// api.use(cors({ origin: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json({ limit: "100mb" }));

db();

app.use("/bike/", BikeRouter());
app.use("/user/", UserRouter());

export { app };
