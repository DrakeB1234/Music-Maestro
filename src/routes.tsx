import { lazy } from "react";
import Navbar from "./components/Navbar/Navbar";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("@pages/HomePage"));
const DrillPage = lazy(() => import("@pages/DrillPage"));
const DrillStartPage = lazy(() => import("@pages/DrillStartPage"));

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  children?: AppRoute[];
}

export const routes: AppRoute[] = [
  {
    path: "/h",
    element:
      <>
        <Navbar />
        <HomePage />
      </>,
  },
  {
    path: "/",
    element:
      <>
        <Navbar />
        <DrillPage />
      </>,
  },
  {
    path: "/drills/start",
    element: (
      <>
        <Navbar />
        <DrillStartPage />
      </>
    ),
  }
];
