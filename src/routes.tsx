import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import DrillPage from "./pages/DrillPage";
import React from "react";
import LoadingPage from "./pages/LoadingPage";
import ConfigPage from "./pages/ConfigPage";
import KeyVisualizerPage from "./pages/KeyVisualizer";

const DrillStartPage = lazy(() => import("@pages/DrillStartPage"));

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
}

export const routes: AppRoute[] = [
  {
    path: "/",
    element:
      <>
        <Navbar />
        <HomePage />
      </>,
  },
  {
    path: "/drills",
    element:
      <>
        <Navbar />
        <DrillPage />
      </>,
  },
  {
    path: "/config",
    element:
      <>
        <Navbar />
        <ConfigPage />
      </>,
  },
  {
    path: "/drills/start",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Navbar />
        <DrillStartPage />
      </Suspense>
    ),
  },
  {
    path: "/keyvisualizer",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Navbar />
        <KeyVisualizerPage />
      </Suspense>
    ),
  }
];
