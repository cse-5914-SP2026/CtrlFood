import * as React from "react";
import 'leaflet/dist/leaflet.css';
import OverlayWrapper from "../components/OverlayWrapper";
import MapWrapper from "../components/MapWrapper";

export default function MainPage() {
  return (
    <div className="relative h-full w-full">
      <MapWrapper />
      <OverlayWrapper />
    </div>
  );
}
