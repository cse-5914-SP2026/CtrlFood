import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/*
    Notes of leaflet react port:

    Map container is the root everything else is child of it

    <MapContainer>

    > <Marker> places a pin on the map

    > useMap is importnat hook 
            since MapContainer prop immutable and if you need to change its props or control it after mount
            then you need to use useMap(). It returns a L.map isntance
            It must be called froma component that isa child of MapContainer
        
            also react can have renderless components which can act as a comp to hook 
            the leaflet react thing will need this heavily
            
    > Also there is useMapEvents


    > Custom marker icons will need to import L from 'leaflet' then L.icon give it the icon






*/

function MyMap() {
    return (
        <MapContainer center={[40.0061, -83.0283]} zoom={20} zoomControl={false} className="h-full w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[40.0061, -83.0283]}>
                <Tooltip>Hover text</Tooltip>
                <Popup>OSU</Popup>
            </Marker>
            <Marker position={[39.99415, -83.0141]}>
                <Tooltip>Market Place on Neil</Tooltip>
                <Popup>Market Place on Neil</Popup>
            </Marker>
        </MapContainer>
    );
}

export default MyMap;