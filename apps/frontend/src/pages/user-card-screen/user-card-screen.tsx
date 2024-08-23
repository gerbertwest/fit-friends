import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header"
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { checkAuthAction, fetchAddFriendAction, fetchDeleteFriendAction, fetchExistFriend, fetchUserByIdAction } from "../../store/api-actions";
import { existFriend, tokenPayloadSelector, userSelector } from "../../store/user/selectors";
import PopupMap from "../popup-map/popup-map";
import { STATIC_DIRECTORY, UserRole } from "../../const";

function UserCardScreen(): JSX.Element {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const friendExistError = useAppSelector(existFriend).isError
  const authAction = useAppSelector(tokenPayloadSelector)

  const [isModalActive, setModalActive] = useState(false);
  const [friendButtonType, setFriendButtonType] = useState(true)

  useEffect(() => {
    if (params.id) {
      dispatch(fetchUserByIdAction(params.id))
      dispatch(fetchExistFriend(params.id))
      setFriendButtonType(friendExistError)
      dispatch(checkAuthAction())
    }
  }, [dispatch, friendExistError, params.id])

  const handleModalOpen = () => {
    setModalActive(true)
  };
  const handleModalClose = () => {
    setModalActive(false);
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

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button" onClick={() => navigate(-1)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card">
                  <h1 className="visually-hidden">Карточка пользователя</h1>
                  <div className="user-card__wrapper">
                    <div className="user-card__content">
                      <div className="user-card__head">
                        <h2 className="user-card__title">{user.data?.name}</h2>
                      </div>
                      <div className="user-card__label">
                        <Link to="" onClick={handleModalOpen}>
                          <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg><span>{user.data?.location}</span></Link>
                      </div>
                      {user.data?.readyToTraining ?
                      <div className="user-card__status"><span>Готов к тренировке</span></div>
                      :
                      <div className="user-card-coach-2__status user-card-coach-2__status--check"><span>Не готов к тренировке</span></div>
                      }
                      <div className="user-card__text">
                        {user.data?.description}
                      </div>
                      <ul className="user-card__hashtag-list">
                        {user.data?.trainingType?.map((type, i) => (
                          <li className="user-card__hashtag-item" key={i}>
                            <div className="hashtag"><span>#{type}</span></div>
                          </li>
                        ))}
                      </ul>
                      {!friendButtonType ?
                      <button className="btn user-card__btn" type="button" onClick={handleAddFriend} disabled={authAction.data?.role === UserRole.Admin}>Добавить в друзья</button>
                      :
                      <button className="btn btn--outlined user-card-coach-2__btn" type="button" onClick={handleDeleteFriend}>Удалить из друзей</button>
                      }
                    </div>
                    <div className="user-card__gallary">
                      <ul className="user-card__gallary-list">
                        <li className="user-card__gallary-item">
                          <img src={`${STATIC_DIRECTORY}/static/user-card-photo1.jpg`} srcSet={`${STATIC_DIRECTORY}/static/user-card-photo1@2x.jpg 2x`} width="334" height="573" alt="photo1"/>
                        </li>
                        <li className="user-card__gallary-item">
                          <img src={`${STATIC_DIRECTORY}/static/user-card-photo2.jpg`} srcSet={`${STATIC_DIRECTORY}/static/user-card-photo2@2x.jpg 2x`} width="334" height="573" alt="photo2"/>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div>
        {isModalActive && (<PopupMap user={user.data} onClose={handleModalClose}/>)}
      </div>
    </div>
  )
}

export default UserCardScreen
