import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppDispatch } from '../../hooks/index';
import { refreshAuthAction } from '../../store/api-actions';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    dispatch(refreshAuthAction())
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
