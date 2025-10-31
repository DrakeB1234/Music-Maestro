import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useRef } from "react";
import { routes } from "./routes";
import LoadingPage from "./pages/LoadingPage";
import GenerateStave from "./helpers/GenerateStave";
import { OCTAVE_RANGE_LIMITS } from "./helpers/DrillHelpers";
import { GetSpacesAboveStaff, GetSpacesBelowStaff } from "./helpers/NoteHelpers";

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children?.map((child) => (
                <Route key={child.path} path={child.path} element={child.element} />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
