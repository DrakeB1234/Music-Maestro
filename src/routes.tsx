import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import DrillPage from "./pages/DrillPage";
import React from "react";
import LoadingPage from "./pages/LoadingPage";

// function delay(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // lazy load with delay
// const DrillStartPage = React.lazy(async () => {
//   await delay(2000); // 2 seconds delay
//   return import('@pages/DrillStartPage');
// });

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
      <Suspense fallback={<LoadingPage />}>
        <Navbar />
        <DrillStartPage />
      </Suspense>
    ),
  }
];
