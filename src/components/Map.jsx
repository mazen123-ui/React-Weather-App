import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useWeather } from "../Context/WeatherContext";

export default function Map() {
  const { lat, long, city } = useWeather();
  return (
    <MapContainer
      center={[lat, long]}
      zoom={10}
      style={{ height: "400px", width: "400px", borderRadius: "15px", }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/hybrid-v4/{z}/{x}/{y}.jpg?key=6xn4qJh0o1Hjrpwia5b6"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      <Marker position={[lat, long]}>
        <Popup>
          <b>{city}</b>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
