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
  );
}

export default App;
