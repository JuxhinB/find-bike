import mongoose from "mongoose";

type BikeStatus = "AVAILABLE" | "RENTED" | "OUT-OF-USE";
export interface BikeType {
  id: String;
  status: BikeStatus;
  lng: number;
  lat: number;
}

const BikeSchema = new mongoose.Schema<mongoose.Document<BikeType>>({
  id: String,
  status: String,
  lng: Number,
  lat: Number,
});

export const BikeModel = mongoose.model("Bike", BikeSchema);
