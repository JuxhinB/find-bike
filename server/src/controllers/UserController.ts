import { UserModel } from "../models/UserModel";
import { RequestHandler } from ".";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

export const UserController = {
  login: (request, response, next) => {
    UserModel.findOne(
      {
        name: request.body.name,
        password: request.body.password,
      },
      null,
      null,
      (err, user) => {
        if (err) {
          response.status(500);
          response.send(err);
        } else {
          if (user) {
            response.json(user.toJSON());
          } else {
            response.status(403);
            response.send("User not found");
          }
        }
      }
    );
  },
  get: (request, response, next) => {
    UserModel.findOne(
      {
        id: request.body.id,
      },
      null,
      null,
      (err, user) => {
        if (err) {
          response.status(500);
          response.send(err.message);
        } else {
          if (user) {
            response.json(user.toJSON());
          } else {
            response.status(403);
            response.send("User not found");
          }
        }
      }
    );
  },
  register: (request, response, next) => {
    UserModel.findOne({ name: request.body.name }, null, null, (err, user) => {
      if (err) {
        response.status(500);
        response.send(err);
      } else {
        if (!user) {
          const user = new UserModel({
            name: request.body.name,
            password: request.body.password,
            id: nanoid(40),
          });
          user.save(function (err) {
            if (err) response.send(err);
            response.json(user.toJSON());
          });
        } else {
          response.status(403);
          response.send("User already exists");
        }
      }
    });
  },
} as {
  login: RequestHandler<{}, {}, { name: string; password: string }>;
  get: RequestHandler<{}, {}, { id: string }>;
  register: RequestHandler<{}, {}, { name: string; password: string }>;
};
