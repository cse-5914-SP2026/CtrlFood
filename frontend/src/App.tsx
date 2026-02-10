import "./App.css";
import { SearchBox } from "./components/SearchBox";

function App() {
  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-3xl flex flex-col items-center gap-6">
          <h1 className="text-4xl font-semibold tracking-tight text-center">
            Ctrl + F(ood)
          </h1>

          <SearchBox onSearch={(q) => console.log("search:", q)} />
        </div>
      </div>
    </>
  );
}

export default App;
