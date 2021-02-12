import mongoose from "mongoose";

export interface User {
  name: string;
  password: string;
}

const User = new mongoose.Schema<mongoose.Document<User>>({
  name: String,
  password: String,
});

export const UserModel = mongoose.model("User", User);
