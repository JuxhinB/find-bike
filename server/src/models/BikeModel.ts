export interface Bike{
  status: "AVAILABLE" | "BUSY" | "OUT-OF-USE",
  location : BikeLocation,
}

interface BikeLocation {
  lng: number;
  lat: number;
}