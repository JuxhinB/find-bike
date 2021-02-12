import { RequestHandler } from ".";
import { UserActionsModel } from "../models/UserHistoryModel";

export const UserActionsController = {
  list: (request, response, next) => {
    UserActionsModel.find(
      {
        userId: request.body.id,
      },
      (err, actions) => {
        if (err) response.send(err);
        return response.json(actions);
      }
    );
  },
} as {
  list: RequestHandler<{}, {}, { id: string }>;
};
