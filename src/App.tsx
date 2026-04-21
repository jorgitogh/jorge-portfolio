import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import { config } from "./config";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  useEffect(() => {
    const { site, theme } = config;
    const root = document.documentElement;

    root.lang = site.language;
    root.style.setProperty("--fontFamily", theme.fontFamily);
    root.style.setProperty("--accentColor", theme.accent);
    root.style.setProperty("--accentStrong", theme.accentStrong);
    root.style.setProperty("--accentRgb", theme.accentRgb);
    root.style.setProperty("--backgroundColor", theme.background);
    root.style.setProperty("--backgroundRgb", theme.backgroundRgb);
    root.style.setProperty("--surfaceColor", theme.surface);
    root.style.setProperty("--surfaceRgb", theme.surfaceRgb);
    root.style.setProperty("--textColor", theme.text);
    root.style.setProperty("--mutedColor", theme.muted);
    root.style.setProperty("--glowColor", theme.glow);
    root.style.setProperty("--glowShadowRgb", theme.glowShadowRgb);

    document.title = site.title;

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", site.description);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoadingProvider>
              <Suspense>
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          }
        />
        <Route
          path="/myworks"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MyWorks />
            </Suspense>
          }
        />
        <Route
          path="/play"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Play />
            </Suspense>
          }
        />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
