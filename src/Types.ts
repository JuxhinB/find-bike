type BikeStatus = "AVAILABLE" | "RENTED" | "OUT-OF-USE";

export interface BikeType {
  "_id": string,
  "status": BikeStatus,
  "lat": number,
  "lng": number,
  "__v": number,
}

export interface UserInfoType {
  "_id": string,
  "name": string,
  "password": string,
}