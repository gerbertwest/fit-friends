import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen from "../pages/main-screen/main-screen";
import { AppRoute } from "../const";
import SignIn from "../pages/sing-in-screen/sing-in-screen";
import Registry from "../pages/registry-screen/registry-screen";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainScreen/>
        }
      />
      <Route
        path={AppRoute.SignIn}
        element={
          <SignIn/>
        }
      />
      <Route
        path={AppRoute.Registry}
        element={
          <Registry/>
        }
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
