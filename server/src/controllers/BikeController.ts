import { BikeModel } from "../models/BikeModel";
import { RequestHandler } from ".";
import { UserActionsModel } from "../models/UserHistoryModel";
import { nanoid } from "nanoid";

export const BikeController = {
  add: (request, response, next) => {
    const bike = new BikeModel({
      status: "AVAILABLE",
      id: nanoid(40),
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
  },
  rent: (request, response, next) => {
    BikeModel.findByIdAndUpdate(
      request.body.bike_id,
      {
        status: "RENTED",
      },
      {},
      (err, doc) => {
        const userActions = new UserActionsModel({
          created_at: new Date(),
          bikeId: doc.id,
          userId: request.body.user_id,
          action: "RENT",
        });

        userActions.save(function (err) {
          if (err) response.send(err);
        });

        return response.json(doc.toJSON());
      }
    );
  },
  return: (request, response, next) => {
    BikeModel.findByIdAndUpdate(
      request.body.bike_id,
      {
        status: "AVAILABLE",
      },
      {},
      (err, doc) => {
        const userActions = new UserActionsModel({
          created_at: new Date(),
          bikeId: doc.id,
          userId: request.body.user_id,
          action: "RETURN",
        });

        userActions.save(function (err) {
          if (err) response.send(err);
        });

        return response.json(doc.toJSON());
      }
    );
  },
} as {
  add: RequestHandler<{}, {}, { lat: number; lng: number }>;
  list: RequestHandler<{ name: string }, {}, {}>;
  rent: RequestHandler<{}, {}, { bike_id: string; user_id: string }>;
  return: RequestHandler<{}, {}, { bike_id: string; user_id: string }>;
};
