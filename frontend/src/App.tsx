import "./App.css";
import { SearchBox } from "./components/SearchBox";
import * as React from "react";

function App() {
  const [foodResult, setFoodResult] = React.useState<string | null>(null);

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
  };

  return (
    <div className="w-screen min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-center">
          Ctrl + F(ood)
        </h1>

        <SearchBox onSearch={handleSearch} />
        {foodResult}
      </div>
    </div>
  );
}

export default App;
