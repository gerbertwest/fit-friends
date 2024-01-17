import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/header/header";
import { useAppSelector, useAppDispatch } from "../../hooks/index";
import { fetchUserByIdAction, fetchAddFriendAction, fetchDeleteFriendAction, fetchMyTrainingsByIdAction,
  fetchNewRequestAction, fetchExistRequest, fetchAddSubscriptionAction,
  fetchDeleteSubscriptionAction, fetchSubscriptions, fetchExistFriend } from "../../store/api-actions";
import { userSelector, tokenPayloadSelector, userRequest, usersSelector, existFriend } from "../../store/user/selectors";
import { AppRoute, STATIC_DIRECTORY } from "../../const";
import PopupMap from "../popup-map/popup-map";
import { myTrainingsSelector } from "../../store/training/selectors";
import PopupCertificates from "../popup-certificates/popup-certificates";

function TrainerCardScreen(): JSX.Element {

  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const token = useAppSelector(tokenPayloadSelector);
  const myTrainings = useAppSelector(myTrainingsSelector);
  const existRequest = useAppSelector(userRequest);
  const subscriptions = useAppSelector(usersSelector).data;
  const friendExistError = useAppSelector(existFriend).isError

  const [isModalActive, setModalActive] = useState({
    popupStatus: false,
    mapPopup: false,
    certificatesPopup: false
  });
  const [friendButtonType, setFriendButtonType] = useState(true)
  const [requestButton, setRequestButton] = useState(true)
  const [checkbox, setCheckbox] = useState(false);

  const queryString = '?limit=4'

  useEffect(() => {
    if (params.id) {
      dispatch(fetchUserByIdAction(params.id))
      dispatch(fetchMyTrainingsByIdAction({queryString: queryString, id: params.id}))
      dispatch(fetchExistRequest(params.id))
      dispatch(fetchSubscriptions())
      dispatch(fetchExistFriend(params.id))
      setFriendButtonType(friendExistError)
    }
  }, [dispatch, friendExistError, params.id])

  useEffect(() => {
  const subscription = subscriptions.find((sub) => sub.id === params.id)
    if (subscription !== undefined) {
      setCheckbox(true)
    }
    else {setCheckbox(false)}
  },[params.id, subscriptions])

  const handleModalOpen = (choosePopup: string) => {
    setModalActive({...isModalActive, popupStatus: true, [choosePopup]: true})
  };
  const handleModalClose = (choosePopup: string) => {
    setModalActive({...isModalActive, popupStatus: false, [choosePopup]: false});
  };


  const handleAddFriend = () => {
    if (params.id) {
      dispatch(fetchAddFriendAction(params.id))
      setFriendButtonType(true)
    }
  }

  const handleDeleteFriend = () => {
    if (params.id) {
      dispatch(fetchDeleteFriendAction(params.id))
      setFriendButtonType(false)
    }
  }

  const handleCreateRequest = () => {
    if (params.id) {
      dispatch(fetchNewRequestAction(params.id))
      setRequestButton(false)
    }
  }

  const handleAddSubscription = () => {
    params.id && dispatch(fetchAddSubscriptionAction(params.id))
    setCheckbox(true)
  }

  const handleDeleteSubscription = () => {
    params.id && dispatch(fetchDeleteSubscriptionAction(params.id))
    setCheckbox(false)
  }

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button" onClick={() => navigate(`${AppRoute.UserCatalog}/${token.data?.sub}`)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card-coach__title">{user.data?.name}</h2>
                        </div>
                        <div className="user-card-coach__label">
                          <Link to="" onClick={() => handleModalOpen('mapPopup')}>
                            <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg><span>{user.data?.location}</span></Link>
                        </div>
                        <div className="user-card-coach__status-container">
                          <div className="user-card-coach__status user-card-coach__status--tag">
                            <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-cup"></use>
                            </svg><span>Тренер</span>
                          </div>
                          {user.data?.personalTrainings ?
                            <div className="user-card-coach__status user-card-coach__status--check">
                              <span>Готов тренировать</span>
                            </div>
                            :
                            <div className="user-card-coach-2__status user-card-coach-2__status--check">
                              <span>Не готов к тренировке</span>
                            </div>
                          }
                        </div>
                        <div className="user-card-coach__text">
                          {user.data?.description}
                        </div>
                        <button className="btn-flat user-card-coach__sertificate" type="button" onClick={() => handleModalOpen('certificatesPopup')}>
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-teacher"></use>
                          </svg><span>Посмотреть сертификаты</span>
                        </button>
                        <ul className="user-card-coach__hashtag-list">
                          {user.data?.trainingType?.map((type) => (
                            <li className="user-card-coach__hashtag-item">
                              <div className="hashtag"><span>#{type}</span></div>
                            </li>
                          ))}
                        </ul>
                        {!friendButtonType ?
                        <button className="btn user-card-coach__btn" type="button" onClick={handleAddFriend}>Добавить в друзья</button>
                        :
                        <button className="btn btn--outlined user-card-coach-2__btn" type="button" onClick={handleDeleteFriend}>Удалить из друзей</button>
                        }
                      </div>
                      <div className="user-card-coach__gallary">
                        <ul className="user-card-coach__gallary-list">
                          <li className="user-card-coach__gallary-item">
                            <img src={`${STATIC_DIRECTORY}/static/user-coach-photo1.jpg`} srcSet={`${STATIC_DIRECTORY}/static/user-coach-photo1@2x.jpg 2x`} width="334" height="573" alt="photo1"/>
                          </li>
                          <li className="user-card-coach__gallary-item">
                            <img src={`${STATIC_DIRECTORY}/static/user-coach-photo2.jpg`} srcSet={`${STATIC_DIRECTORY}/static/user-coach-photo2@2x.jpg 2x`} width="334" height="573" alt="photo2"/>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-card-coach__training">
                      <div className="user-card-coach__training-head">
                        <h2 className="user-card-coach__training-title">Тренировки</h2>
                        <div className="user-card-coach__training-bts">
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back">
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next">
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <ul className="user-card-coach__training-list">
                        {myTrainings.data.map((training) => (
                              <li className="user-card-coach__training-item">
                              <div className="thumbnail-training">
                                <div className="thumbnail-training__inner">
                                  <div className="thumbnail-training__image">
                                    <picture>
                                      <source type="image/webp"/>
                                        <img src={`${STATIC_DIRECTORY}${training.backgroundImage}`} width="330" height="190" alt=""/>
                                    </picture>
                                  </div>
                                  <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{training.price}</span><span>₽</span>
                                  </p>
                                  <h3 className="thumbnail-training__title">{training.title}</h3>
                                  <div className="thumbnail-training__info">
                                    <ul className="thumbnail-training__hashtags-list">
                                      <li className="thumbnail-training__hashtags-item">
                                        <div className="hashtag thumbnail-training__hashtag"><span>#{training.trainingType}</span></div>
                                      </li>
                                      <li className="thumbnail-training__hashtags-item">
                                        <div className="hashtag thumbnail-training__hashtag"><span>#{training.caloriesCount}ккал</span></div>
                                      </li>
                                    </ul>
                                    <div className="thumbnail-training__rate">
                                      <svg width="16" height="16" aria-hidden="true">
                                        <use xlinkHref="#icon-star"></use>
                                      </svg><span className="thumbnail-training__rate-value">{training.raiting}</span>
                                    </div>
                                  </div>
                                  <div className="thumbnail-training__text-wrapper">
                                    <p className="thumbnail-training__text">{training.description}</p>
                                  </div>
                                  <div className="thumbnail-training__button-wrapper">
                                    <Link className="btn btn--small thumbnail-training__button-catalog" to={`${AppRoute.Training}/${training.id}`}>Подробнее</Link>
                                    <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={`${AppRoute.Training}/${training.id}`}>Отзывы</Link>
                                  </div>
                                </div>
                              </div>
                            </li>
                        ))}
                      </ul>
                      <form className="user-card-coach__training-form">
                        {!existRequest.isError && user.data?.personalTrainings && requestButton ?
                          <button className="btn user-card-coach__btn-training" type="button" onClick={handleCreateRequest}>
                            Хочу персональную тренировку
                          </button> :
                          ''
                        }
                        <div className="user-card-coach__training-check">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" checked={checkbox} onChange={checkbox ? handleDeleteSubscription : handleAddSubscription}/>
                                <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div>
        {isModalActive.mapPopup && isModalActive.popupStatus && (<PopupMap user={user.data} onClose={() => handleModalClose('mapPopup')}/>)}
        {isModalActive.certificatesPopup && isModalActive.popupStatus && (<PopupCertificates user={user.data} onClose={() => handleModalClose('certificatesPopup')}/>)}
      </div>
    </div>
  )
}

export default TrainerCardScreen;
