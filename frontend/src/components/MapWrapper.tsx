import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { currentSelectedStore } from '@/store/store';
import { useEffect, useRef } from 'react';

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

    > Given the new changes with the query store and having the global store stuff
     this is my current idea of possible way to handle the clickon food it goes to such place on map
     basically make a map wrapper component which hooks onto the "current selected food" global state (means certain objs will also need to set taht when clicked)
     then that wrapper component (I think MyMap is alreadyy fine) will own the actual MapCOntinaer component the flyTo function wil be a child of the MapContainer\
     mayybye makign that its own UI-les react component file then when the curretnly slected food global state is changed then the wrapper comp should rerender making the map run flyto wiht a different 
     posiiton

     OR 

     Actually I think the fly to headleass UI component can also subscribe instead of the wrapper parent comp this way onlyy the headless UI component rerender 


     Then for each food card there should be a coordinate sent back the backend in each card can easilyy do with mappings they will be used to enter to flyto

*/

interface FlyToProps {
    markerRefs: React.RefObject<Record<string, any>>;
}

// bc of the weird ass rule of MapContainer make this UI less comp hook onto the global current selected food
// item store, the food cards will subscribe to the global setter helper function
// then use the use effect with dep as theat state to do an effect of pan to when that state changes
function FlyTo({ markerRefs }: FlyToProps) {
    const map = useMap();
    const selectedItem = currentSelectedStore((state) => state.selectedFoodItem);

    useEffect(() => {
        if (selectedItem) {
            const { lat, lng } = selectedItem.coordinates;
            map.panTo([lat, lng]);

            // click the coresp marker as well
            const targetMarker = markerRefs.current[selectedItem.location];
            if (targetMarker) {
                targetMarker.openPopup();
            }
        }
    }, [selectedItem, map, markerRefs]);

    return null;
}

function MapWrapper() {

    // I think better touse useRef since it still needs to be like a state but shouldnt trigger rerender on append
    const mapMarkerReferences = useRef<Record<string, any>>({}); // use ref state dictionary of K, V where K is backend rest name V is ref of that map marker

    return (
        <MapContainer center={[40.0017, -83.0160]} zoom={15} zoomControl={false} className="h-full w-full">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyTo markerRefs={mapMarkerReferences} /> {/* For leaflet react shi to work apparently useMap must be called in a comp that is a child of the MapContainer thus need a UI less comp here*/}

            {/* FlyTo func componetn child place*/}

            {/* 12th Avenue Bread Company */}
            <Marker
                position={[39.99668, -83.01389]}
                ref={(el) => { mapMarkerReferences.current["12th-avenue-bread-company"] = el }}
            >
                <Tooltip>12th Avenue Bread Company</Tooltip>
                <Popup autoPan={false}>12th Avenue Bread Company</Popup>
            </Marker>

            {/* Berry Café */}
            <Marker
                position={[39.9992718, -83.014958]}
                ref={(el) => { mapMarkerReferences.current["berry-cafe"] = el }}
            >
                <Tooltip>Berry Café</Tooltip>
                <Popup autoPan={false}>Berry Café</Popup>
            </Marker>

            {/* Café Carmenton */}
            <Marker
                position={[40.0059613, -83.0351248]}
                ref={(el) => { mapMarkerReferences.current["cafe-carmenton"] = el }}
            >
                <Tooltip>Café Carmenton</Tooltip>
                <Popup autoPan={false}>Café Carmenton</Popup>
            </Marker>

            {/* Caffeine Element */}
            <Marker
                position={[39.9947705, -83.017084]}
                ref={(el) => { mapMarkerReferences.current["the-caffeine-element"] = el }}
            >
                <Tooltip>Caffeine Element</Tooltip>
                <Popup autoPan={false}>Caffeine Element</Popup>
            </Marker>

            {/* CFAES Café */}
            <Marker
                position={[40.0054224, -83.0272226]}
                ref={(el) => { mapMarkerReferences.current["cfaes-cafe"] = el }}
            >
                <Tooltip>CFAES Café</Tooltip>
                <Popup autoPan={false}>CFAES Café</Popup>
            </Marker>

            {/* Connecting Grounds */}
            <Marker
                position={[40.0043306, -83.0133935]}
                ref={(el) => { mapMarkerReferences.current["connecting-grounds"] = el }}
            >
                <Tooltip>Connecting Grounds</Tooltip>
                <Popup autoPan={false}>Connecting Grounds</Popup>
            </Marker>

            {/* Crane Café */}
            <Marker
                position={[39.9984393, -83.0102061]}
                ref={(el) => { mapMarkerReferences.current["crane-cafe"] = el }}
            >
                <Tooltip>Crane Café</Tooltip>
                <Popup autoPan={false}>Crane Café</Popup>
            </Marker>

            {/* Curl Market */}
            <Marker
                position={[40.0042782, -83.0109501]}
                ref={(el) => { mapMarkerReferences.current["curl-market"] = el }}
            >
                <Tooltip>Curl Market</Tooltip>
                <Popup autoPan={false}>Curl Market</Popup>
            </Marker>

            {/* ksa café */}
            <Marker
                position={[40.0037013, -83.0167559]}
                ref={(el) => { mapMarkerReferences.current["ksa-cafe"] = el }}
            >
                <Tooltip>ksa café</Tooltip>
                <Popup autoPan={false}>ksa café</Popup>
            </Marker>

            {/* Mirror Lake Eatery */}
            <Marker
                position={[39.9973692, -83.0144008]}
                ref={(el) => { mapMarkerReferences.current["mirror-lake-eatery"] = el }}
            >
                <Tooltip>Mirror Lake Eatery</Tooltip>
                <Popup autoPan={false}>Mirror Lake Eatery</Popup>
            </Marker>

            {/* Postle Café */}
            <Marker
                position={[39.9960543, -83.0164153]}
                ref={(el) => { mapMarkerReferences.current["postle-cafe"] = el }}
            >
                <Tooltip>Postle Café</Tooltip>
                <Popup autoPan={false}>Postle Café</Popup>
            </Marker>

            {/* Terra Byte Café */}
            <Marker
                position={[40.0016229, -83.0133167]}
                ref={(el) => { mapMarkerReferences.current["terra-byte-cafe"] = el }}
            >
                <Tooltip>Terra Byte Café</Tooltip>
                <Popup autoPan={false}>Terra Byte Café</Popup>
            </Marker>

            {/* The Campus Grind - McPherson */}
            <Marker
                position={[40.0025136, -83.0123396]}
                ref={(el) => { mapMarkerReferences.current["the-campus-grind-mcpherson"] = el }}
            >
                <Tooltip>The Campus Grind - McPherson</Tooltip>
                <Popup autoPan={false}>The Campus Grind - McPherson</Popup>
            </Marker>

            {/* The Coffey Café at Vet Med */}
            <Marker
                position={[40.0009157, -83.0277092]}
                ref={(el) => { mapMarkerReferences.current["the-coffey-road-cafe-at-vet-med"] = el }}
            >
                <Tooltip>The Coffey Café at Vet Med</Tooltip>
                <Popup autoPan={false}>The Coffey Café at Vet Med</Popup>
            </Marker>

            {/* Traditions at Kennedy (No backend map provided) */}
            <Marker position={[39.99648, -83.0128899]}>
                <Tooltip>Traditions at Kennedy</Tooltip>
                <Popup autoPan={false}>Traditions at Kennedy</Popup>
            </Marker>

            {/* Locations at the Ohio Union */}
            <Marker
                position={[39.9978745, -83.0086663]}
                ref={(el) => { mapMarkerReferences.current["espressoh"] = el }}
            >
                <Tooltip>Espress-OH</Tooltip>
                <Popup autoPan={false}>Espress-OH</Popup>
            </Marker>
            <Marker
                position={[39.9976745, -83.0086663]}
                ref={(el) => { mapMarkerReferences.current["sloopys-diner"] = el }}
            >
                <Tooltip>Sloopy's Diner</Tooltip>
                <Popup autoPan={false}>Sloopy's Diner</Popup>
            </Marker>
            <Marker
                position={[39.9973745, -83.0087563]}
                ref={(el) => { mapMarkerReferences.current["union-market"] = el }}
            >
                <Tooltip>Union Market</Tooltip>
                <Popup autoPan={false}>Union Market</Popup>
            </Marker>
            <Marker
                position={[39.9978545, -83.0089663]}
                ref={(el) => { mapMarkerReferences.current["woodys-tavern"] = el }}
            >
                <Tooltip>Woody's Tavern</Tooltip>
                <Popup autoPan={false}>Woody's Tavern</Popup>
            </Marker>

            {/* Marketplace on Neil Locations */}
            <Marker
                position={[39.9938397, -83.014022]}
                ref={(el) => { mapMarkerReferences.current["marketplace"] = el }}
            >
                <Tooltip>Marketplace on Neil</Tooltip>
                <Popup autoPan={false}>Marketplace on Neil</Popup>
            </Marker>
            {/* No specific backend map provided for just the coffee shop */}
            <Marker position={[39.9939397, -83.014022]}>
                <Tooltip>Marketplace - Coffee Shop</Tooltip>
                <Popup autoPan={false}>Marketplace - Coffee Shop</Popup>
            </Marker>
            <Marker
                position={[39.9935397, -83.014022]}
                ref={(el) => { mapMarkerReferences.current["marketplace-c-store"] = el }}
            >
                <Tooltip>Marketplace C-Store</Tooltip>
                <Popup autoPan={false}>Marketplace C-Store</Popup>
            </Marker>

            {/* RPAC Locations */}
            <Marker
                position={[39.9996195, -83.0181668]}
                ref={(el) => { mapMarkerReferences.current["courtside-cafe"] = el }}
            >
                <Tooltip>Courtside Café</Tooltip>
                <Popup autoPan={false}>Courtside Café</Popup>
            </Marker>
            <Marker
                position={[39.9996195, -83.0181668]}
                ref={(el) => { mapMarkerReferences.current["juice-2"] = el }}
            >
                <Tooltip>Juice at RPAC</Tooltip>
                <Popup autoPan={false}>Juice at RPAC</Popup>
            </Marker>

            {/* Oxley's Locations */}
            <Marker
                position={[40.0027256, -83.0174201]}
                ref={(el) => { mapMarkerReferences.current["oxleys-by-the-numbers"] = el }}
            >
                <Tooltip>Oxley's by the Numbers</Tooltip>
                <Popup autoPan={false}>Oxley's by the Numbers</Popup>
            </Marker>
            <Marker
                position={[40.0027256, -83.0174201]}
                ref={(el) => { mapMarkerReferences.current["oxleys-to-go"] = el }}
            >
                <Tooltip>Oxleys To Go</Tooltip>
                <Popup autoPan={false}>Oxleys To Go</Popup>
            </Marker>

            {/* Morrill Tower Locations (No backend map provided) */}
            <Marker position={[40.000208, -83.0219719]}>
                <Tooltip>Morrill C-Store</Tooltip>
                <Popup autoPan={false}>Morrill C-Store</Popup>
            </Marker>
            <Marker position={[40.000208, -83.0219719]}>
                <Tooltip>Traditions at Morrill</Tooltip>
                <Popup autoPan={false}>Traditions at Morrill</Popup>
            </Marker>

            {/* Scott House Locations */}
            <Marker
                position={[40.004556, -83.0132844]}
                ref={(el) => { mapMarkerReferences.current["juice-north"] = el }}
            >
                <Tooltip>Juice North</Tooltip>
                <Popup autoPan={false}>Juice North</Popup>
            </Marker>
            {/* Traditions at Scott (No backend map provided) */}
            <Marker position={[40.004556, -83.0132844]}>
                <Tooltip>Traditions at Scott</Tooltip>
                <Popup autoPan={false}>Traditions at Scott</Popup>
            </Marker>

        </MapContainer>
    );
}

export default MapWrapper;
