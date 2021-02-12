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
    const user = new UserModel({
      name: request.body.name,
      password: request.body.password,
    });

    user.save(function (err) {
      if (err) response.send(err);
      response.json(user.toJSON());
    });
  },
} as {
  login: RequestHandler<{}, {}, { name: string, password: string }>;
  get: RequestHandler<{}, {}, { id: string }>;
  register: RequestHandler<{}, {}, { name: string, password: string }>;
};
