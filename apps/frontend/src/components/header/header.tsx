import { Link } from "react-router-dom";
import { AppRoute, UserRole } from "../../const";
import { useEffect, useState } from "react";
import { checkAuthAction, fetchAlertsAction, fetchDeleteAlertAction } from "../../store/api-actions";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { alerts, tokenPayloadSelector } from "../../store/user/selectors";
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { Alert } from "../../types/alert";

function Header(): JSX.Element {

  const dispatch = useAppDispatch();
  const token = useAppSelector(tokenPayloadSelector);
  const alertsList = useAppSelector(alerts).data
  const role = token.data?.role;

  useEffect(() => {
    dispatch(checkAuthAction())
    dispatch(fetchAlertsAction())
  }, [dispatch])

  const [alertData, setAlertData] = useState<Alert[]>([]);

  useEffect(() => {
    if (alertsList) {
      setAlertData(alertsList)
    }
  }, [alertsList])

  const handleDeleteAlert = (id: string | undefined) => {
    id && dispatch(fetchDeleteAlertAction(id))
    dispatch(fetchAlertsAction())
    setAlertData(alertsList)
  }

  return (
    <header className="header">
    <div className="container">
      <a className="header__logo" href="/" aria-label="Переход на главную">
        <svg width="187" height="70" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg>
      </a>
      <nav className="main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <Link className="main-nav__link"
            to={role === UserRole.User ? `${AppRoute.Main}/${token.data?.sub}` : `${AppRoute.CoachAccount}/${token.data?.sub}`}
            aria-label="На главную">
              <svg width="18" height="18" aria-hidden="true">
                <use xlinkHref="#icon-home"></use>
              </svg>
            </Link>
          </li>
          <li className="main-nav__item">
            <Link className="main-nav__link"
            to={role === UserRole.User ? `${AppRoute.UserAccount}/${token.data?.sub}` : `${AppRoute.CoachAccount}/${token.data?.sub}`}
            aria-label="Личный кабинет">
              <svg width="16" height="18" aria-hidden="true">
                <use xlinkHref="#icon-user"></use>
              </svg>
            </Link>
          </li>
          <li className="main-nav__item">
            <Link className="main-nav__link" to={`${AppRoute.MyFriends}/${token.data?.sub}`} aria-label="Друзья">
              <svg width="22" height="16" aria-hidden="true">
                <use xlinkHref="#icon-friends"></use>
              </svg>
            </Link>
          </li>
          <li className="main-nav__item main-nav__item--notifications">
            <Link className="main-nav__link" to="" aria-label="Уведомления">
              <svg width="14" height="18" aria-hidden="true">
                <use xlinkHref="#icon-notification"></use>
              </svg>
            </Link>
            <div className="main-nav__dropdown">
              <p className="main-nav__label">Оповещения</p>
              <ul className="main-nav__sublist">
                {alertsList.length !== 0 ? alertData.map((alert) =>
                 <li className="main-nav__subitem">
                   <Link className="notification is-active" to="" onClick={() => handleDeleteAlert(alert.id)}>
                     <p className="notification__text">{alert.title}</p>
                     <time className="notification__time" dateTime="2023-12-23 12:35">{dayjs(alert.alertDate).locale('ru').format('DD MMMM, H:m')}</time>
                   </Link>
                 </li>
                ) :
                 <li className="main-nav__subitem">
                    <p className="notification__text">Оповещений нет</p>
                 </li>
                }
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <div className="search">
        <form action="#" method="get">
          <label><span className="search__label">Поиск</span>
            <input type="search" name="search"/>
            <svg className="search__icon" width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-search"></use>
            </svg>
          </label>
        </form>
      </div>
    </div>
  </header>
  )
}

export default Header;
