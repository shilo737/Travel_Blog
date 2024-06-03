import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import myStore from "./redux/store";
import { routes } from "./utils/routes";

function App() {
  return (
    <Provider store={myStore}>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path}>
              {route.children && route.children.map((child) => (
                <Route
                  path={child.path}
                  element={child.element}
                  key={child.path}
                  index={child.index}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
