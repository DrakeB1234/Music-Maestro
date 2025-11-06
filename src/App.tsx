import { BrowserRouter, Routes, Route } from "react-router";
import { routes } from "./routes";
import { MidiAutoReconnectHandler } from "./components/HelperComponents/MidiAutoReconnectHandler";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child) => (
              <Route key={child.path} path={child.path} element={child.element} />
            ))}
          </Route>
        ))}
      </Routes>
      <MidiAutoReconnectHandler />
    </BrowserRouter>
  );
}

export default App;
