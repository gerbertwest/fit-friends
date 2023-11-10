import { Route, Routes } from "react-router-dom";
import { AppRoute } from "../const";
import SignIn from "../pages/sing-in-screen/sing-in-screen";
import Registry from "../pages/registry-screen/registry-screen";
import IntroScreen from "../pages/intro-screen/intro-screen";
import browserHistory from "../browser-history";
import HistoryRouter from "../components/history-route/history-route";
import MainScreen from "../pages/main-screen/main-screen";
import CoachAccount from "../pages/coach-account-screen/coach-account-screen";
import PrivateRoute from "../components/private-route/private-route";
import { useAppSelector } from "../hooks/index";
import { getAuthorizationStatus } from "../store/user/selectors";

export function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
    <Routes>
      <Route
        path={AppRoute.Intro}
        element={
          <IntroScreen/>
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
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
          <MainScreen/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.CoachAccount}
        element={
          <PrivateRoute
          authorizationStatus={authorizationStatus}
        >
          <CoachAccount/>
          </PrivateRoute>
        }
      />
    </Routes>
    </HistoryRouter>
  );
}

export default App;
