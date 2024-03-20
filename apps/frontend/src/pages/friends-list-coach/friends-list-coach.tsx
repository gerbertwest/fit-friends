import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { userFriendsSelector, userRequests, userSelector } from "../../store/user/selectors";
import { fetchMyFriends, fetchNewRequestAction, fetchRequestsByUser, fetchUpdateRequest, fetchUserByIdAction, fetchUserFriends } from "../../store/api-actions";
import { AppRoute, DEFAULT_FRIENDS_COUNT_LIMIT, STATIC_DIRECTORY, UserRole } from "../../const";
import { useNavigate, useParams } from "react-router-dom";
import { Request } from "../../types/request";
import { UserRequest } from "@fit-friends/shared/app-types"
import LoadingScreen from "../loading-screen/loading-screen";

function FriendsListCoach(): JSX.Element {

  const DEFAULT_PAGE = 1;

  const myFriends = useAppSelector(userFriendsSelector);
  const requests = useAppSelector(userRequests);
  const navigate = useNavigate();
  const params = useParams();
  const user = useAppSelector(userSelector).data;

  const [page, setPage] = useState<number>(DEFAULT_PAGE)
  const [requestData, setRequestData] = useState<Request>({
    initiatorId: '',
    status: UserRequest.approval
  })

  const dispatch = useAppDispatch();

  useEffect(() => {
    const queryString = `?limit=${DEFAULT_FRIENDS_COUNT_LIMIT}&page=${page}`

    dispatch(fetchRequestsByUser())
    dispatch(fetchUserByIdAction(String(params.id)))

    if (user?.role === UserRole.Admin) {
      dispatch(fetchMyFriends({queryString}))
    }
    else {
      dispatch(fetchUserFriends({queryString}))
    }
  }, [dispatch, page, params.id, user?.role])


  const handleCreateRequest = (friendId: string) => {
      dispatch(fetchNewRequestAction(friendId))
  }

  const initiators = requests.data.map((req) => req.initiatorId)
  const backCondition = myFriends.data.find((item) => item.totalPageNumber && item.totalPageNumber > page*DEFAULT_FRIENDS_COUNT_LIMIT)
  const disabledCondition = myFriends.data.find((item) => item.totalPageNumber && item.totalPageNumber <= DEFAULT_FRIENDS_COUNT_LIMIT)

  const handleUpdateRequest = (friendId: string, status: string) => {
    setRequestData({status: status, initiatorId: friendId})
    dispatch(fetchUpdateRequest({status: status, initiatorId: friendId}))
  }

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button" onClick={() => user?.role === UserRole.Admin ? navigate(`${AppRoute.CoachAccount}/${params.id}`) :
               navigate(`${AppRoute.UserAccount}/${params.id}`)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              {myFriends.isLoading ? <LoadingScreen/> :
              <ul className="friends-list__list">
                {myFriends.data.map((friend) => {
                  const request = requests.data.find((req) => req.initiatorId === friend.id)
                  return (
                <li className="friends-list__item" key={friend.id}>
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
                      <li key={friend.id}>
                        <div className="hashtag thumbnail-friend__hashtag"><span>#{type}</span></div>
                      </li>
                      )}
                    </ul>
                    {friend.role === UserRole.User ?
                    friend.readyToTraining ?
                    <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                      </div>
                      {user?.role === UserRole.User ?
                      <button className="thumbnail-friend__invite-button" type="button" onClick={() => {friend.id && handleCreateRequest(friend.id)}}>
                          <svg width="43" height="46" aria-hidden="true" focusable="false">
                            <use xlinkHref="#icon-invite"></use>
                          </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
                      </button> : ''
                      }
                    </div> :
                    <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не&nbsp;готов к&nbsp;тренировке</span>
                      </div>
                    </div>
                    :
                      friend.personalTrainings ?
                      <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                      </div>
                      {user?.role === UserRole.User ?
                      <button className="thumbnail-friend__invite-button" type="button" onClick={() => {friend.id && handleCreateRequest(friend.id)}}>
                          <svg width="43" height="46" aria-hidden="true" focusable="false">
                            <use xlinkHref="#icon-invite"></use>
                          </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
                      </button> : ''
                      }
                    </div> :
                    <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не&nbsp;готов к&nbsp;тренировке</span>
                      </div>
                    </div>
                    }
                    </div>
                    {friend.id && initiators.includes(friend.id) && request?.status === UserRequest.approval && requestData.status === UserRequest.approval ?
                    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user" key={friend.id}>
                        <p className="thumbnail-friend__request-text">Запрос на&nbsp;{user?.role === UserRole.Admin ? 'персональную' : 'совместную'} тренировку</p>
                      <div className="thumbnail-friend__button-wrapper">
                        <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button"
                          onClick={() => friend.id && handleUpdateRequest(friend.id, UserRequest.accepted)}>
                          Принять
                        </button>
                        <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button"
                         onClick={() => friend.id && handleUpdateRequest(friend.id, UserRequest.rejected)}>
                          Отклонить
                        </button>
                      </div>
                    </div> : ''}
                    {requestData.status ===  UserRequest.accepted && requestData.initiatorId === friend.id || request?.status === UserRequest.accepted ?
                      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user" key={friend.id}>
                        <p className="thumbnail-friend__request-text">Запрос на&nbsp;{user?.role === UserRole.Admin ? 'персональную' : 'совместную'} тренировку принят</p>
                      </div> :
                      requestData.status ===  UserRequest.rejected && requestData.initiatorId === friend.id || request?.status === UserRequest.rejected ?
                      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user" key={friend.id}>
                        <p className="thumbnail-friend__request-text">Запрос на&nbsp;{user?.role === UserRole.Admin ? 'персональную' : 'совместную'} тренировку отклонен</p>
                    </div> : ''
                    }
                 </div>
                </li>
                )})}
              </ul>
              }
              <div className="show-more friends-list__show-more">
                {
                  backCondition !== undefined || disabledCondition !== undefined ?
                  <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(page + 1)}
                  disabled={disabledCondition !== undefined ? true : false}>
                    Показать еще
                  </button>
                  :
                  <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(1)}>
                    Вернуться в начало
                  </button>
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FriendsListCoach;
