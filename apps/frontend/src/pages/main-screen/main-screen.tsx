import { useEffect } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { myTrainingsSelector, rairingTrainingsSelector, specTrainingsSelector } from "../../store/training/selectors";
import { fetchRaitingTrainingsAction, fetchSpecTrainingsAction, fetchTrainingsAction, fetchUserByIdAction, fetchUsers } from "../../store/api-actions";
import { userSelector, usersSelector } from "../../store/user/selectors";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoute, STATIC_DIRECTORY } from "../../const";

function MainScreen(): JSX.Element {

  const trainings = useAppSelector(myTrainingsSelector);
  const specTrainings = useAppSelector(specTrainingsSelector);
  const raitingTrainings = useAppSelector(rairingTrainingsSelector);
  const user = useAppSelector(userSelector);
  const users = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const types = user.data?.trainingType?.join(',')

  const queryString = `?limit=2&trainingTypes=${types}`
  const special = '?limit=1&special=true'
  const raiting = '?limit=2&sortField=raiting'
  const readyToTraining = '?limit=5&readyToTraining=true'

  useEffect(() => {
    dispatch(fetchTrainingsAction({queryString}))
    dispatch(fetchSpecTrainingsAction({queryString: special}))
    dispatch(fetchRaitingTrainingsAction({queryString: raiting}))
    dispatch(fetchUserByIdAction(String(params.id)))
    dispatch(fetchUsers({queryString: readyToTraining}))
  }, [dispatch, params.id, queryString])

  return (
    <div className="wrapper">
    <Header/>
    <main>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <section className="special-for-you">
        <div className="container">
          <div className="special-for-you__wrapper">
            <div className="special-for-you__title-wrapper">
              <h2 className="special-for-you__title">Специально подобрано для вас</h2>
              <div className="special-for-you__controls">
                <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon special-for-you__control" type="button" aria-label="next">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <ul className="special-for-you__list">
              {
                trainings.isError === false ?
                trainings.data.map((training) => (
                <li className="special-for-you__item">
                 <div className="thumbnail-preview">
                  <div className="thumbnail-preview__image">
                    <picture>
                      <source type="image/webp"/>
                        <img src={`${STATIC_DIRECTORY}${training.backgroundImage}`} width="452" height="191" alt=""/>
                    </picture>
                  </div>
                  <div className="thumbnail-preview__inner">
                    <h3 className="thumbnail-preview__title">{training.title}</h3>
                    <div className="thumbnail-preview__button-wrapper">
                      <a className="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                    </div>
                  </div>
                 </div>
                </li>
                )) :
                <div className="thumbnail-spec-gym">
                <div className="thumbnail-spec-gym__image">
                  <picture>
                    <source type="image/webp" srcSet="public/img/content/thumbnails/nearest-gym-01.webp, public/img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
                      <img src="public/img/content/thumbnails/nearest-gym-01.jpg" srcSet="public/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
                  </picture>
                </div>
                <div className="thumbnail-spec-gym__header">
                  <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
                </div>
              </div>
              }
            </ul>
          </div>
        </div>
      </section>
      <section className="special-offers">
        <div className="container">
          <div className="special-offers__wrapper">
            <h2 className="visually-hidden">Специальные предложения</h2>
            <ul className="special-offers__list">
              {
                specTrainings.isError === false ?
                specTrainings.data.map((spec) => (
                  <li className="special-offers__item is-active">
                  <aside className="promo-slider">
                    <div className="promo-slider__overlay"></div>
                    <div className="promo-slider__image">
                      <img src={`${STATIC_DIRECTORY}${spec.backgroundImage}`} height="469" alt="promo"/>
                    </div>
                    <div className="promo-slider__header">
                      <h3 className="promo-slider__title">{spec.title}</h3>
                      <div className="promo-slider__logo">
                        <svg width="74" height="74" aria-hidden="true">
                          <use xlinkHref="#logotype"></use>
                        </svg>
                      </div>
                    </div><span className="promo-slider__text">Горячие предложения на {spec.description}</span>
                    <div className="promo-slider__bottom-container">
                      <div className="promo-slider__slider-dots">
                        <button className="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="первый слайд"></button>
                        <button className="promo-slider__slider-dot" aria-label="второй слайд"></button>
                        <button className="promo-slider__slider-dot" aria-label="третий слайд"></button>
                      </div>
                      <div className="promo-slider__price-container">
                        <p className="promo-slider__price">{spec.price*0.9} ₽</p>
                        <p className="promo-slider__sup">за занятие</p>
                        <p className="promo-slider__old-price">{spec.price} ₽</p>
                      </div>
                    </div>
                  </aside>
                </li>
                )) :
                <div className="thumbnail-spec-gym">
                <div className="thumbnail-spec-gym__image">
                  <picture>
                    <source type="image/webp" srcSet="public/img/content/thumbnails/nearest-gym-01.webp, public/img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
                      <img src="public/img/content/thumbnails/nearest-gym-01.jpg" srcSet="public/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
                  </picture>
                </div>
                <div className="thumbnail-spec-gym__header">
                  <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
                </div>
              </div>
              }
            </ul>
          </div>
        </div>
      </section>
      <section className="popular-trainings">
        <div className="container">
          <div className="popular-trainings__wrapper">
            <div className="popular-trainings__title-wrapper">
              <h2 className="popular-trainings__title">Популярные тренировки</h2>
              <button className="btn-flat popular-trainings__button" type="button" onClick={() => navigate(`${AppRoute.TrainingCatalog}/${params.id}`)}>
                <span>Смотреть все</span>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
              <div className="popular-trainings__controls">
                <button className="btn-icon popular-trainings__control" type="button" aria-label="previous">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon popular-trainings__control" type="button" aria-label="next">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <ul className="popular-trainings__list">
              {
                raitingTrainings.isError === false ?
                raitingTrainings.data.map((training) => (
                  <li className="popular-trainings__item">
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
                        <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                        <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                      </div>
                    </div>
                  </div>
                </li>
                )) :
                <div className="thumbnail-spec-gym">
                <div className="thumbnail-spec-gym__image">
                  <picture>
                    <source type="image/webp" srcSet="public/img/content/thumbnails/nearest-gym-01.webp, public/img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
                      <img src="public/img/content/thumbnails/nearest-gym-01.jpg" srcSet="public/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
                  </picture>
                </div>
                <div className="thumbnail-spec-gym__header">
                  <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
                </div>
              </div>
              }
            </ul>
          </div>
        </div>
      </section>
      <section className="look-for-company">
        <div className="container">
          <div className="look-for-company__wrapper">
            <div className="look-for-company__title-wrapper">
              <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
              <button className="btn-flat btn-flat--light look-for-company__button" type="button"><span>Смотреть все</span>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
              <div className="look-for-company__controls">
                <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next">
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <ul className="look-for-company__list">
              {
                users.isError === false ?
                users.data.map((user) => (
                  <li className="look-for-company__item">
                  <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div className="thumbnail-user__image">
                      <picture>
                        <source type="image/webp"/>
                          <img src={`${STATIC_DIRECTORY}${user.avatar}`} width="82" height="82" alt=""/>
                      </picture>
                    </div>
                    <div className="thumbnail-user__header">
                      <h3 className="thumbnail-user__name">{user.name}</h3>
                      <div className="thumbnail-user__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-user__location-address">{user.location}</address>
                      </div>
                    </div>
                    <ul className="thumbnail-user__hashtags-list">
                      {
                        user.trainingType ? user.trainingType.map((type) => (
                          <li className="thumbnail-user__hashtags-item">
                            <div className="hashtag thumbnail-user__hashtag"><span>#{type}</span></div>
                          </li>
                        )) : ''
                      }
                    </ul>
                    <a className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                  </div>
                </li>
                )) :
                <div className="thumbnail-spec-gym">
                <div className="thumbnail-spec-gym__image">
                  <picture>
                    <source type="image/webp" srcSet="public/img/content/thumbnails/nearest-gym-01.webp, public/img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
                      <img src="public/img/content/thumbnails/nearest-gym-01.jpg" srcSet="public/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
                  </picture>
                </div>
                <div className="thumbnail-spec-gym__header">
                  <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
                </div>
              </div>
              }
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
  )
}

export default MainScreen;
