import React, { useEffect, useState } from "react";
import { GeneralLayout } from "../../layouts";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { divIcon, LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";

const initialPosition: LatLngLiteral = { lat: 41.3200327, lng: 19.8200031 };

function BikesLocationScreen() {
  const [clickedMarkerLocation, setClickedMarkerLocation] = useState<any>(null);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
    document.body.classList.add("bikes-location-screen");
    return () => {
      document.body.classList.remove("bikes-location-screen");
    };
  }, []);

  return (
    <GeneralLayout>
      <MapContainer
        className="flex-grow"
        center={initialPosition}
        zoom={15}
        scrollWheelZoom={false}
      >
        <MyComponent setClickedMarkerLocation={setClickedMarkerLocation} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clickedMarkerLocation && (
          <Marker
            position={clickedMarkerLocation}
            icon={divIcon({
              html: `
              <svg width="18" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.774 2.535A8.598 8.598 0 008.654 0C6.343 0 4.17.9 2.534 2.535A8.598 8.598 0 000 8.655c0 2.31.9 4.484 2.535 6.119l4.598 4.598c.405.405.945.628 1.521.628s1.117-.223 1.522-.628l4.598-4.598a8.597 8.597 0 002.534-6.12c0-2.311-.9-4.485-2.534-6.12zm-6.12 8.044A1.927 1.927 0 016.73 8.654c0-1.06.863-1.924 1.924-1.924s1.925.863 1.925 1.924a1.927 1.927 0 01-1.925 1.925z" fill="#FF4949"/><path d="M14.774 2.535A8.598 8.598 0 008.654 0v6.73c1.061 0 1.925.863 1.925 1.924a1.927 1.927 0 01-1.925 1.925V20c.576 0 1.117-.223 1.522-.628l4.598-4.598a8.597 8.597 0 002.534-6.12c0-2.311-.9-4.485-2.534-6.12z" fill="#F30051"/></svg>
            `,
            })}
          />
        )}
      </MapContainer>
    </GeneralLayout>
  );
}

export default BikesLocationScreen;

function MyComponent({ setClickedMarkerLocation }: any) {
  const map = useMapEvents({
    drag: () => {
      // console.log(map.getCenter())
      console.log(map.getCenter().lat, map.getCenter().lng);
    },
    click: (e) => {
      setClickedMarkerLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
      console.log(map.getBounds().getNorth(), map.getBounds().getEast());
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
  return null;
}
