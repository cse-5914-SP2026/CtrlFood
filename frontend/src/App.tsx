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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import 'leaflet/dist/leaflet.css';
import MyMap from "./components/test-map";
import { CategoryIslands } from "./components/category-islands";
import { SearchBar } from "./components/SearchBar";
import LeftBar from "./components/left-bar";
import { DatePicker } from "./components/date-picker";
import { Calendar } from "./components/ui/calendar";
import QueryList from "./components/query-list";
import { queryStore } from "./store/store";

function App() {
  const [foodResult, setFoodResult] = React.useState<string | null>(null);

  const updateCurrentQueryList = queryStore((state) => state.populateBackendQueryList)

  const handleSearch = async (q: string) => {
    const res = await fetch("http://localhost:8000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("API error:", text);
      return;
    }
    const data = await res.json();
    console.log("ES results:", data);
    setFoodResult(
      data ? ` Found: ${JSON.stringify(data)}` : " No results found.",
    );

    updateCurrentQueryList(data) // set new to global store
  };

  return (
    <ThemeProvider>
      <div className="relative h-screen w-screen">

        <MyMap></MyMap>
        <CategoryIslands></CategoryIslands>
        <SearchBar onSearch={handleSearch}></SearchBar>
        <LeftBar></LeftBar>
        <DatePicker></DatePicker>
        <QueryList></QueryList>
        {/* <Calendar
          mode="single"
          className="rounded-lg border"
          captionLayout="dropdown"
        /> */}

      </div>
    </ThemeProvider>
  );
}

export default App;
