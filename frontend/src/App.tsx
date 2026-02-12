import "./App.css";
import { SearchBox } from "./components/SearchBox";
import { FoodResultCard } from "./components/Foodresultcard";
import * as React from "react";

function App() {
  const [foodResult, setFoodResult] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearch = async (q: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      
      if (!res.ok) {
        const text = await res.text();
        console.error("API error:", text);
        setFoodResult(null);
        return;
      }
      
      const data = await res.json();
      console.log("ES results:", data);
      
      // Set the actual data object instead of a string
      setFoodResult(data);
    } catch (error) {
      console.error("Search error:", error);
      setFoodResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-center">
          Ctrl + F(ood)
        </h1>
        
        <SearchBox onSearch={handleSearch} />
        
        {isLoading && (
          <div className="text-muted-foreground">Searching...</div>
        )}
        
        {!isLoading && foodResult && (
          <FoodResultCard results={foodResult} />
        )}
      </div>
    </div>
  );
}

export default App;
