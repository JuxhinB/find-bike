import { RequestHandler } from ".";

export const BaseController = {
  helloWorld: (request, response, next) => {
    return response.json({
      message: `Hello ${request.query.name}`,
    });
  },
} as {
  helloWorld: RequestHandler<{ name: string }, {}, { name: string }>;
};
