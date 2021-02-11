import mongoose from "mongoose";

type BikeStatus = "AVAILABLE" | "RENTED" | "OUT-OF-USE";
export interface BikeType {
  status: BikeStatus;
  lng: number;
  lat: number;
}

const BikeSchema = new mongoose.Schema<mongoose.Document<BikeType>>({
  status: String,
  lng: Number,
  lat: Number,
});

export const BikeModel = mongoose.model("Bike", BikeSchema);
