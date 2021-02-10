import { Bike } from "./BikeModel";
import { User } from "./UserModel";

export interface UserHistory {
  actionsList: UserActions[]
}

interface UserActions {
  created_at: Date;
  bike: Bike;
  user: User;
}