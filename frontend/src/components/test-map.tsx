import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/*
    Notes of leaflet react port:










*/

function MyMap() {
    return (
        <MapContainer center={[40.0061, -83.0283]} zoom={20} zoomControl={false} className="h-full w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>Hello!</Popup>
            </Marker>
        </MapContainer>
    );
}

export default MyMap;