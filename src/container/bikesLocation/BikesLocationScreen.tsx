import React, { useContext, useEffect } from "react";
import { GeneralLayout } from "../../layouts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import { UserContext } from "../../provider/UserProvider";
import onMapMarker from "../../assets/svg/on-find-bike-marker.svg";
import offMapMarker from "../../assets/svg/off-find-bike-marker.svg";
import _string from "../../config/localization/_string";
import modules from "../../modules";
import { Button } from "antd";

const initialPosition: LatLngLiteral = { lat: 41.3250327, lng: 19.8200031 };

function BikesLocationScreen() {
  const { bikeList, rentBike, returnBike, userInfo } = useContext(UserContext);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
    document.body.classList.add("bikes-location-screen");
    return () => {
      document.body.classList.remove("bikes-location-screen");
    };
  }, []);

  return (
    <GeneralLayout>
      <>
        <modules.navigation.Navigation />
        <MapContainer
          className="flex-grow"
          center={initialPosition}
          zoom={15}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {bikeList &&
            bikeList.map((bike, index) => (
              <Marker
                key={index}
                position={{ lat: bike.lat, lng: bike.lng }}
                icon={divIcon({
                  html:
                    bike.status === "AVAILABLE"
                      ? `<img src=${onMapMarker} class="leaflet-marker-img" />`
                      : `<img src=${offMapMarker} class="leaflet-marker-img" />`,
                })}
              >
                <Popup>
                  <span
                    style={{
                      marginBottom: "10px",
                      fontSize: "1rem",
                      color: bike.status === "AVAILABLE" ? "green" : "red",
                    }}
                  >
                    {bike.status === "AVAILABLE" && _string.LABELS.available}
                    {bike.status === "RENTED" && _string.LABELS.rented}
                    {bike.status === "OUT-OF-USE" &&
                      _string.LABELS.out_of_service}
                  </span>
                  {bike.status === "AVAILABLE" ? (
                    <Button
                      disabled={!userInfo}
                      type="primary"
                      onClick={() => {
                        rentBike(bike._id);
                      }}
                    >
                      {_string.ACTIONS.rent}
                    </Button>
                  ) : (
                    <Button
                      disabled={!userInfo}
                      type="ghost"
                      danger={true}
                      onClick={() => {
                        returnBike(bike._id);
                      }}
                    >
                      {_string.ACTIONS.return}
                    </Button>
                  )}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </>
    </GeneralLayout>
  );
}

export default BikesLocationScreen;
