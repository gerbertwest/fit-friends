import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header/header"
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { fetchUserByIdAction } from "../../store/api-actions";
import { userSelector } from "../../store/user/selectors";
import PopupMap from "../popup-map/popup-map";

function UserCardScreen(): JSX.Element {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const params = useParams();

  const [isModalActive, setModalActive] = useState(false);

  useEffect(() => {
    params.id && dispatch(fetchUserByIdAction(params.id))
  }, [dispatch, params.id])

  const handleModalOpen = () => {
    setModalActive(true)
  };
  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
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
                      {/* <div className="user-card__status"><span>Готов к тренировке</span></div>
                      <div className="user-card-coach-2__status user-card-coach-2__status--check"><span>Не готов тренировать</span></div>
                      <div className="user-card-coach__status user-card-coach__status--check"><span>Готов тренировать</span></div> */}

                      <div className="user-card__text">
                        {user.data?.description}
                      </div>
                      <ul className="user-card__hashtag-list">
                        {user.data?.trainingType?.map((type) => (
                          <li className="user-card__hashtag-item">
                            <div className="hashtag"><span>#{type}</span></div>
                          </li>
                        ))}
                        {/* <li className="user-card__hashtag-item">
                          <div className="hashtag"><span>#йога</span></div>
                        </li>
                        <li className="user-card__hashtag-item">
                          <div className="hashtag"><span>#кроссфит</span></div>
                        </li>
                        <li className="user-card__hashtag-item">
                          <div className="hashtag"><span>#пилатес</span></div>
                        </li>
                        <li className="user-card__hashtag-item">
                          <div className="hashtag"><span>#любитель</span></div>
                        </li> */}
                      </ul>
                      <button className="btn user-card__btn" type="button">Добавить в друзья</button>
                    </div>
                    <div className="user-card__gallary">
                      <ul className="user-card__gallary-list">
                        <li className="user-card__gallary-item">
                          <img src="public/img/content/user-card-photo1.jpg" srcSet="public/img/content/user-card-photo1@2x.jpg 2x" width="334" height="573" alt="photo1"/>
                        </li>
                        <li className="user-card__gallary-item">
                          <img src="public/img/content/user-card-photo2.jpg" srcSet="public/img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2"/>
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
