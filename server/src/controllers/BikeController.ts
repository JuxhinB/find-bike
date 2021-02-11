import { BikeModel } from "../models/BikeModel";
import { RequestHandler } from ".";

export const BikeController = {
  list: (request, response, next) => {
    BikeModel.find((err, bikes) => {
      if (err) response.send(err);
      return response.json(bikes);
    });
    // message: `Hello ${request.query.name}`,
  },
  add: (request, response, next) => {
    const bike = new BikeModel({
      status: "AVAILABLE",
      lat: 41.3200327,
      lng: 19.8200031,
    });

    bike.save(function (err) {
      if (err) response.send(err);
      response.json(bike.toJSON());
    });
    // return response.json({});
  },
  rent: (request, response, next) => {
    BikeModel.findByIdAndUpdate(
      request.body.id,
      {
        status: "RENTED",
      },
      {},
      (err, doc) => {
        return response.json(doc.toJSON());
      }
    );
  },
  return: (request, response, next) => {
    return response.json({});
  },
} as {
  list: RequestHandler<{ name: string }, {}, {}>;
  add: RequestHandler<{}, {}, {}>;
  rent: RequestHandler<{}, {}, { id: string }>;
  return: RequestHandler<{}, {}, {}>;
};
