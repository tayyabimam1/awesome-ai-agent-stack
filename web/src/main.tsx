import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { MotionConfig } from "motion/react";
import "./index.css";
import { PaletteProvider } from "./components/CommandPalette";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import { LayerRoute, NotFound } from "./components/Layer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <PaletteProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="index.html" element={<Home />} />
              <Route path="404.html" element={<NotFound />} />
              <Route path=":page" element={<LayerRoute />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </PaletteProvider>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
);
