// import * as React from "react";
// import { SearchBox } from "../components/SearchBox";

// export default function MainPage() {
//   const [foodResult, setFoodResult] = React.useState<string | null>(null);

//   const handleSearch = async (q: string) => {
//     const res = await fetch("http://localhost:8000/query", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query: q }),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("API error:", text);
//       setFoodResult(" API error. Check console.");
//       return;
//     }

//     const data = await res.json();
//     console.log("ES results:", data);
//     setFoodResult(
//       data ? `Found: ${JSON.stringify(data)}` : "No results found.",
//     );
//   };

//   return (
//     <div className="w-full flex flex-col items-center gap-6 py-10">
//       <h1 className="text-4xl font-semibold tracking-tight text-center">
//         Ctrl + F(ood)
//       </h1>

//       <div className="w-full max-w-3xl">
//         <SearchBox onSearch={handleSearch} />
//       </div>

//       {foodResult ? <pre className="...">{foodResult}</pre> : null}
//     </div>
//   );
// }

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
