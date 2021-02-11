import { RequestHandler } from ".";
import nanoid from "nanoid";

export const UserController = {
  get: (request, response, next) => {
    return response.json({});
  },
  set: (request, response, next) => {
    return response.json({});
  },
} as {
  get: RequestHandler<{ name: string }, {}, { name: string }>;
  set: RequestHandler<{}, {}, {}>;
};
