import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { userFriendsSelector, userRequests } from "../../store/user/selectors";
import { fetchMyFriends, fetchRequestsByUser } from "../../store/api-actions";
import { AppRoute, STATIC_DIRECTORY } from "../../const";
import { useNavigate, useParams } from "react-router-dom";
import { getQueryString } from "../../util";

function FriendsListCoach(): JSX.Element {

  const DEFAULT_PAGE = 1;

  const myFriends = useAppSelector(userFriendsSelector);
  const requests = useAppSelector(userRequests);
  const navigate = useNavigate();
  const params = useParams();

  const [page, setPage] = useState<number>(DEFAULT_PAGE)

  const dispatch = useAppDispatch();
  useEffect(() => {
    const queryString = getQueryString({
      page: page,
    })
    dispatch(fetchMyFriends({queryString}))
    dispatch(fetchRequestsByUser())
  }, [dispatch, page])


  const initiators = requests.data.map((req) => req.initiatorId)


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button" onClick={() => navigate(`${AppRoute.CoachAccount}/${params.id}`)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {myFriends.data.map((friend) =>
                <li className="friends-list__item">
                 <div className="thumbnail-friend">
                  <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                    <div className="thumbnail-friend__image-status">
                      <div className="thumbnail-friend__image">
                        <picture>
                          <source type="image/webp"/>
                            <img src={`${STATIC_DIRECTORY}${friend.avatar}`} width="78" height="78" alt=""/>
                        </picture>
                      </div>
                    </div>
                    <div className="thumbnail-friend__header">
                      <h2 className="thumbnail-friend__name">{friend.name}</h2>
                      <div className="thumbnail-friend__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-friend__location-address">{friend.location}</address>
                      </div>
                    </div>
                    <ul className="thumbnail-friend__training-types-list">
                      {friend.trainingType?.map((type) =>
                      <li>
                        <div className="hashtag thumbnail-friend__hashtag"><span>#{type}</span></div>
                      </li>
                      )}
                    </ul>
                    {friend.readyToTraining ?
                    <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                      </div>
                    </div> :
                    <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не&nbsp;готов к&nbsp;тренировке</span>
                      </div>
                    </div>}
                    </div>
                    {friend.id && initiators.includes(friend.id) ?
                    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                        <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                      <div className="thumbnail-friend__button-wrapper">
                        <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                        <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
                      </div>
                    </div> : ''}
                 </div>
                </li>
                )}
              </ul>
              <div className="show-more friends-list__show-more">
                <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(page + 1)}>Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FriendsListCoach;
