import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "/React-Weather-App/marker-icon.png",
  iconRetinaUrl: "/React-Weather-App/marker-icon-2x.png",
  shadowUrl: "/React-Weather-App/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

import { useWeather } from "../Context/WeatherContext";

export default function Map() {
  const { lat, long, city } = useWeather();

  return (
    <MapContainer
      center={[lat, long]}
      zoom={10}
      style={{
        height: "400px",
        width: "400px",
        borderRadius: "15px",
      }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/hybrid-v4/{z}/{x}/{y}.jpg?key=6xn4qJh0o1Hjrpwia5b6"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={[lat, long]}>
        <Popup offset={[0, -25]}>
          <b>{city}</b>
        </Popup>
      </Marker>
    </MapContainer>
  );
}