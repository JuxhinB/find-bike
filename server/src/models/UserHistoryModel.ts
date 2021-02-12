import mongoose from "mongoose";

export interface UserHistory {
  actionsList: UserActions[];
}

export interface UserActions {
  created_at: Date;
  bikeId: String;
  userId: String;
  action: "RENT" | "RETURN";
}

const UserActions = new mongoose.Schema<mongoose.Document<UserActions>>({
  created_at: Date,
  bikeId: String,
  userId: String,
  action: String,
});

export const UserActionsModel = mongoose.model("UserActions", UserActions);
