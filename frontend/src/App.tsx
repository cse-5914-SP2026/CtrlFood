import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { TopNav } from "./components/TopNav";
import { supabase } from "./lib/supabase";

import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SpinWheelPage from "./pages/SpinWheelPage";
import SignInPage from "./pages/SignInPage";

function ProtectedRoute({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

function App() {
  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="relative h-screen w-screen overflow-hidden bg-background">
          <TopNav session={session} />

          <main className="h-full w-full">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/signin"
                element={
                  session ? <Navigate to="/profile" replace /> : <SignInPage />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute session={session}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
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