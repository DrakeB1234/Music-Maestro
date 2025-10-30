import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { routes } from "./routes";
import LoadingPage from "./pages/LoadingPage";
import { useModal } from "./context/ModalProvider";
import OctaveSelector from "./components/ModalComponents/OctaveSelector/OctaveSelector";

function App() {

  // const { openModal } = useModal();

  // useEffect(() => {
  //   openModal(<OctaveSelector />)
  // }, [])

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
