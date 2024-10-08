import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { userFriendsSelector, userRequests, userRequestsByInitiator, userSelector } from "../../store/user/selectors";
import { fetchMyFriends, fetchNewRequestAction, fetchRequestsByInitiator, fetchRequestsByUser, fetchUpdateRequest, fetchUserByIdAction, fetchUserFriends } from "../../store/api-actions";
import { AppRoute, DEFAULT_FRIENDS_COUNT_LIMIT, STATIC_DIRECTORY, UserRole } from "../../const";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Request } from "../../types/request";
import { UserRequest } from "@fit-friends/shared/app-types"
import LoadingScreen from "../loading-screen/loading-screen";
import ShowMoreButton from "../../components/show-more-button/show-more-button";

function FriendsListCoach(): JSX.Element {

  const DEFAULT_PAGE = 1;

  const myFriends = useAppSelector(userFriendsSelector);
  const requests = useAppSelector(userRequests);
  const requestByInitiator = useAppSelector(userRequestsByInitiator);
  const navigate = useNavigate();
  const params = useParams();
  const user = useAppSelector(userSelector).data;

  const [page, setPage] = useState<number>(DEFAULT_PAGE)
  const [requestData, setRequestData] = useState<Request>({
    initiatorId: '',
    status: UserRequest.approval
  })

  const [newReq, setNewReq] = useState('')

  const dispatch = useAppDispatch();

  useEffect(() => {
    const queryString = `?limit=${DEFAULT_FRIENDS_COUNT_LIMIT}&page=${page}`

    dispatch(fetchRequestsByUser())
    dispatch(fetchRequestsByInitiator())
    dispatch(fetchUserByIdAction(String(params.id)))

    if (user?.role === UserRole.Admin) {
      dispatch(fetchMyFriends({queryString}))
    }
    else {
      dispatch(fetchUserFriends({queryString}))
    }
  }, [dispatch, page, params.id, user?.role, newReq, requestData])

  const handleCreateRequest = (friendId: string) => {
      dispatch(fetchNewRequestAction(friendId))
      dispatch(fetchRequestsByInitiator())
      setNewReq(friendId)
  }

  const initiators = requests.data.map((req) => req.initiatorId)
  const users = requestByInitiator.data.map((req) => req.userId)
  const backCondition = myFriends.data.find((item) => item.totalPageNumber && item.totalPageNumber > page*DEFAULT_FRIENDS_COUNT_LIMIT)
  const disabledCondition = myFriends.data.find((item) => item.totalPageNumber && item.totalPageNumber <= DEFAULT_FRIENDS_COUNT_LIMIT)

  const handleUpdateRequest = (friendId: string, status: string) => {
    dispatch(fetchUpdateRequest({status: status, initiatorId: friendId}))
    dispatch(fetchRequestsByUser())
    setRequestData({status: status, initiatorId: friendId})
  }

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button" onClick={() => navigate(-1)}>
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
                            <img src={friend.avatar === '' ? 'public/img/content/user-photo-1.png' : `${STATIC_DIRECTORY}${friend.avatar}`} width="78" height="78" alt=""/>
                        </picture>
                      </div>
                    </div>
                    <div className="thumbnail-friend__header">
                      <Link to={friend.role === UserRole.Admin ? `${AppRoute.Trainer}/${friend.id}` : `${AppRoute.User}/${friend.id}`}>
                      <h2 className="thumbnail-friend__name"
                        >
                        {friend.name}
                      </h2>
                      </Link>
                      <div className="thumbnail-friend__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-friend__location-address">{friend.location}</address>
                      </div>
                    </div>
                    <ul className="thumbnail-friend__training-types-list">
                      {friend.trainingType?.map((type, i) =>
                      <li key={i}>
                        <div className="hashtag thumbnail-friend__hashtag"><span>#{type}</span></div>
                      </li>
                      )}
                    </ul>
                    {friend.role === UserRole.User ?
                    friend.readyToTraining ?
                    <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                      </div>
                      {user?.role === UserRole.User && !users.includes(friend.id)?
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
                      {user?.role === UserRole.User && !users.includes(friend.id) ?
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
                    {friend.id && initiators.includes(friend.id) && request?.status === UserRequest.approval && requestData.status === UserRequest.approval
                    ?
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
                    </div> : ''
                    }
                    {requestData.status === UserRequest.accepted && requestData.initiatorId === friend.id || request?.status === UserRequest.accepted
                    ?
                      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user" key={friend.id}>
                        <p className="thumbnail-friend__request-text">Запрос на&nbsp;{user?.role === UserRole.Admin ? 'персональную' : 'совместную'} тренировку принят</p>
                      </div> :
                     requestData.status === UserRequest.rejected && requestData.initiatorId === friend.id || request?.status === UserRequest.rejected
                     ?
                      <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user" key={friend.id}>
                        <p className="thumbnail-friend__request-text">Запрос на&nbsp;{user?.role === UserRole.Admin ? 'персональную' : 'совместную'} тренировку отклонен</p>
                    </div> : ''
                    }
                 </div>
                </li>
                )})}
              </ul>
              }
              {myFriends.data.length !== 0 ?
                <ShowMoreButton
                page={page}
                onClick={() => setPage(page + 1)}
                onClickBack={() => setPage(1)}
                backCondition={backCondition}
                disabledCondition={disabledCondition}
              />
              :
              'Друзей нет'
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FriendsListCoach;
