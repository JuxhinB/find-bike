import { BikeModel } from "../models/BikeModel";
import { RequestHandler } from ".";

export const BikeController = {
  add: (request, response, next) => {
    const bike = new BikeModel({
      status: "AVAILABLE",
      lat: request.body.lat,
      lng: request.body.lng,
    });

    bike.save(function (err) {
      if (err) response.send(err);
      response.json(bike.toJSON());
    });
  },
  list: (request, response, next) => {
    BikeModel.find((err, bikes) => {
      if (err) response.send(err);
      return response.json(bikes);
    });
    // message: `Hello ${request.query.name}`,
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
    BikeModel.findByIdAndUpdate(
      request.body.id,
      {
        status: "AVAILABLE",
      },
      {},
      (err, doc) => {
        return response.json(doc.toJSON());
      }
    );
  },
} as {
  add: RequestHandler<{}, {}, { lat: number; lng: number }>;
  list: RequestHandler<{ name: string }, {}, {}>;
  rent: RequestHandler<{}, {}, { id: string }>;
  return: RequestHandler<{}, {}, { id: string }>;
};
