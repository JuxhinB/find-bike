import mongoose from "mongoose";

export interface User {
  id: string;
  name: string;
  password: string;
}

const User = new mongoose.Schema<mongoose.Document<User>>({
  id: String,
  name: String,
  password: String,
});

export const UserModel = mongoose.model("User", User);
