import { RequestHandler } from ".";

export const BikeController = {
  getBikeList: (request, response, next) => {
    return response.json({
      // message: `Hello ${request.query.name}`,
    });
  },
  rentBike: (request, response, next) => {
    return response.json({
    });
  },
  returnBike: (request, response, next) => {
    return response.json({
    });
  },
} as {
  getBikeList: RequestHandler<{ name: string }, {}, { name: string }>;
  rentBike: RequestHandler<{}, {}, {}>;
  returnBike: RequestHandler<{}, {}, {}>;
};
