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
import MyTrainings from "../pages/my-trainings/my-trainings";
import MyOrders from "../pages/my-orders/my-orders";
import CreateTraining from "../pages/create-training/create-training";
import FriendsListCoach from "../pages/friends-list-coach/friends-list-coach";
import TrainingCatalogScreen from "../pages/training-catalog/training-catalog";
import TrainingCardScreen from "../pages/training-card/training-cars";

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

      <Route path={AppRoute.MyTrainings}>
       <Route path={AppRoute.UserId}>
        <Route index element={
          <PrivateRoute
          authorizationStatus={authorizationStatus}
        >
          <MyTrainings/>
          </PrivateRoute>
        }
        />
       </Route>
     </Route>

     <Route path={AppRoute.MyOrders}>
       <Route path={AppRoute.UserId}>
        <Route index element={
          <PrivateRoute
          authorizationStatus={authorizationStatus}
        >
          <MyOrders/>
          </PrivateRoute>
        }
        />
       </Route>
     </Route>

     <Route path={AppRoute.CreateTraining}>
       <Route path={AppRoute.UserId}>
        <Route index element={
          <PrivateRoute
          authorizationStatus={authorizationStatus}
        >
          <CreateTraining/>
          </PrivateRoute>
        }
        />
       </Route>
     </Route>

     <Route path={AppRoute.MyFriends}>
       <Route path={AppRoute.UserId}>
        <Route index element={
          <PrivateRoute
          authorizationStatus={authorizationStatus}
        >
          <FriendsListCoach/>
          </PrivateRoute>
        }
        />
       </Route>
     </Route>

     <Route path={AppRoute.TrainingCatalog}>
       <Route path={AppRoute.UserId}>
         <Route index element={
          <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
          <TrainingCatalogScreen/>
          </PrivateRoute>
        }
        />
       </Route>
      </Route>

      <Route path={AppRoute.Training}>
       <Route path={AppRoute.TrainingId}>
         <Route index element={
          <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
          <TrainingCardScreen/>
          </PrivateRoute>
        }
        />
       </Route>
      </Route>

    </Routes>
    </HistoryRouter>
  );
}

export default App;
