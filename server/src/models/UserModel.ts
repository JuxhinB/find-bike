import mongoose from "mongoose";

export interface User {
  id: string;
  name: string;
}

const User = new mongoose.Schema<mongoose.Document<User>>({
  id: String,
  name: String,
});

export default mongoose.model("User", User);
