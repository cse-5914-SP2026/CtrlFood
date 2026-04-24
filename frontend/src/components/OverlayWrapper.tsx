import React from "react";
import { CategoryIslands } from "./category-islands";
import { DatePicker } from "./date-picker";
//import LeftBar from "./left-bar";
import { LocationBar } from "./LocationBar";
import QueryList from "./query-list";
import { SearchBar } from "./SearchBar";
import { queryStore, filterStore } from "@/store/store";

const OverlayWrapper = () => {
  // const [foodResult, setFoodResult] = React.useState<string | null>(null);
  const [userLocation, setUserLocation] = React.useState({
    street: "",
    city: "",
    state: "",
  });
  const updateCurrentQueryList = queryStore(
    (state) => state.populateBackendQueryList,
  );
  const selectedDate = filterStore((state) => state.selectedDate);
  const selectedLocations = filterStore((state) => state.selectedLocations);

  const handleSearch = async (q: string) => {
    const body: Record<string, unknown> = { query: q };

    const cleanedAddress =
      `${userLocation.street}, ${userLocation.city}, ${userLocation.state}`
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", ");

    if (cleanedAddress) {
      body.userLocation = [cleanedAddress]; // ✅ send as list
    }

    if (selectedDate) body.date = selectedDate;
    if (selectedLocations.length > 0) body.location = selectedLocations;

    const res = await fetch("http://localhost:8000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", text);
      return;
    }
    const data = await res.json();
    console.log("ES results:", data);

    // setFoodResult( data ? ` Found: ${JSON.stringify(data)}` : " No results found.", );

    updateCurrentQueryList(data); // set new to global store
  };

  return (
    <>
      <div className="absolute top-18 left-20 z-[1000] flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
        <SearchBar onSearch={handleSearch} />
        <span className="text-sm font-medium text-slate-500 whitespace-nowrap">
          near
        </span>
        <LocationBar
          street={userLocation.street}
          city={userLocation.city}
          state={userLocation.state}
          onChange={setUserLocation}
        />{" "}
        <DatePicker />
        <CategoryIslands />
      </div>
      {/* <LeftBar></LeftBar> */}
      <QueryList />
    </>
  );
};

export default OverlayWrapper;
