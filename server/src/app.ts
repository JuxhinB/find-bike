import path from 'path';
import express from "express";

import { BaseRouter } from './routes';

const app = express();

app.use('/', BaseRouter());

export {
  app,
};
