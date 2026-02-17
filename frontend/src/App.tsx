<<<<<<< HEAD
import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { TopNav } from "./components/TopNav";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SpinWheelPage from "./pages/SpinWheelPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <TopNav />

        {/* content area */}
        <main className="mx-auto w-full max-w-5xl px-6 py-8">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/spin" element={<SpinWheelPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </main>
      </div>
    </BrowserRouter>
=======
// import "./App.css";
// import { SearchBox } from "./components/SearchBox";
// import * as React from "react";
// import { ThemeProvider } from "./components/theme-provider";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
// import 'leaflet/dist/leaflet.css';
// import MyMap from "./components/test-map";

// function App() {
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
//       return;
//     }
//     const data = await res.json();
//     console.log("ES results:", data);
//     setFoodResult(
//       data ? ` Found: ${JSON.stringify(data)}` : " No results found.",
//     );
//   };

//   return (
//     <ThemeProvider>
//       <div className="relative h-screen w-screen">
//         <MyMap></MyMap>

//       </div>
//       {/* <div className="w-screen min-h-screen bg-background flex items-center justify-center px-6">
//         <div className="flex flex-col items-center gap-6">
//           <MyMap>

//           </MyMap>
//           <Card>
//             <CardHeader>
//               <CardTitle>Card Title</CardTitle>
//               <CardDescription>Card Description</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p>Card Content</p>
//             </CardContent>
//             <CardFooter>
//               <p>Card Footer</p>
//             </CardFooter>
//           </Card>

//           <h1 className="text-4xl font-semibold tracking-tight text-center">
//             Ctrl + F(ood)
//           </h1>
//           <SearchBox onSearch={handleSearch} />
//           {foodResult}
//         </div>
//       </div> */}
//     </ThemeProvider>
//   );
// }

// export default App;

import { SearchBox } from "./components/SearchBox";
import * as React from "react";
import { ThemeProvider } from "./components/theme-provider";
import 'leaflet/dist/leaflet.css';
import OverlayWrapper from "./components/OverlayWrapper";
import MapWrapper from "./components/MapWrapper";

function App() {

  return (
    <ThemeProvider>
      <div className="relative h-screen w-screen">

        <MapWrapper></MapWrapper>
        <OverlayWrapper></OverlayWrapper>

      </div>
    </ThemeProvider>
>>>>>>> origin/frontend/austin
  );
}

export default App;
