import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useMidiProvider } from "./context/MidiProvider";
import { Suspense } from "react";
import { routes } from "./routes";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const { ConnectDevice } = useMidiProvider();

  useEffect(() => {
    ConnectDevice();
  }, []);

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
