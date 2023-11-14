import { Route, Routes } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../const";
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
import QuestionaireCoach from "../pages/questionaire-coach/questionaire-coach";
import QuestionaireUser from "../pages/questionaire-user/questionaire-user";
import LoadingScreen from "../pages/loading-screen/loading-screen";

export function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <LoadingScreen/>
    );
  }

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
      <Route path={AppRoute.Main}>
       <Route path={AppRoute.UserId}>
         <Route index element={
          <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
          <MainScreen/>
          </PrivateRoute>
        }
        />
       </Route>
      </Route>

      <Route path={AppRoute.CoachAccount}>
       <Route path={AppRoute.UserId}>
        <Route index element={
          <PrivateRoute
          authorizationStatus={authorizationStatus}
        >
          <CoachAccount/>
          </PrivateRoute>
        }
        />
       </Route>
     </Route>

      <Route
        path={AppRoute.QuestionaireCoach}
        element={
          <PrivateRoute
          authorizationStatus={authorizationStatus}
        >
          <QuestionaireCoach/>
         </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.QuestionaireUser}
        element={
          <PrivateRoute
          authorizationStatus={authorizationStatus}
        >
          <QuestionaireUser/>
         </PrivateRoute>
        }
      />
    </Routes>
    </HistoryRouter>
  );
}

export default App;
