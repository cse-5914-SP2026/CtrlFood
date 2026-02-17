import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { TopNav } from "./components/TopNav";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SpinWheelPage from "./pages/SpinWheelPage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative h-screen w-screen overflow-hidden bg-background">
          <TopNav />

          {/* Let main take the full height and width without padding constraints */}
          <main className="h-full w-full">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/spin" element={<SpinWheelPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;