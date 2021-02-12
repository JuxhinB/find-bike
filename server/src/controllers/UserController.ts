import { UserModel } from "../models/UserModel";
import { RequestHandler } from ".";

export const UserController = {
  login: (request, response, next) => {
    UserModel.find((err, users) => {
      if (err) response.send(err);
      return response.json(users);
    });
  },
  get: (request, response, next) => {
    UserModel.find((err, users) => {
      if (err) response.send(err);
      return response.json(users);
    });
  },
  register: (request, response, next) => {
    UserModel.findOne({ name: request.body.name }, null, null, (err, user) => {
      if (err) {
        response.send(err);
      } else {
        if (!user) {
          const user = new UserModel({
            name: request.body.name,
            password: request.body.password,
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
