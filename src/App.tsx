import { Routes, Route, HashRouter } from "react-router";
import { routes } from "./routes";
import { PrefsAppInitHandler } from "./components/HelperComponents/PrefsAppInitHandler";

function App() {

  return (
    <HashRouter>
      <PrefsAppInitHandler />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child) => (
              <Route key={child.path} path={child.path} element={child.element} />
            ))}
          </Route>
        ))}
      </Routes>
    </HashRouter>
  );
}

export default App;
