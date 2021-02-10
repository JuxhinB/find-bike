import { RequestHandler } from ".";
import nanoid from "nanoid";

export const UserController = {
  getUser: (request, response, next) => {
    return response.json({
    });
  },
  setUser: (request, response, next) => {
    return response.json({
    });
  },
} as {
  getUser: RequestHandler<{ name: string }, {}, { name: string }>;
  setUser: RequestHandler<{}, {}, {}>;
};
