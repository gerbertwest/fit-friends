import { useEffect, useRef } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { myTrainingsSelector, rairingTrainingsSelector, specTrainingsSelector } from "../../store/training/selectors";
import { fetchRaitingTrainingsAction, fetchSpecTrainingsAction, fetchTrainingsAction, fetchUserByIdAction, fetchUsers } from "../../store/api-actions";
import { userSelector, usersSelector } from "../../store/user/selectors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppRoute, STATIC_DIRECTORY } from "../../const";
import UserCarousel from "../../components/userCarousel/userCarousel";
import Slider from "react-slick";
import TrainingCarousel from "../../components/trainingCarousel/trainingCarousel";
import SpecialOffersCarousel from "../../components/specialOffersCarousel/specialOffersCarousel";

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
  const special = '?limit=4&special=true'
  const raiting = '?limit=2&sortField=raiting'
  const readyToTraining = '?limit=5&readyToTraining=true'

  useEffect(() => {
    dispatch(fetchTrainingsAction({queryString}))
    dispatch(fetchSpecTrainingsAction({queryString: special}))
    dispatch(fetchRaitingTrainingsAction({queryString: raiting}))
    dispatch(fetchUserByIdAction(String(params.id)))
    dispatch(fetchUsers({queryString: readyToTraining}))
  }, [dispatch, params.id, queryString])

  const sliderUsers = useRef<Slider>(null);
  const sliderTrainings = useRef<Slider>(null);

  const nextUser = () => {
    sliderUsers.current?.slickNext();
  };
  const previousUser = () => {
    sliderUsers.current?.slickPrev();
  };

  const nextTraining = () => {
    sliderTrainings.current?.slickNext();
  };
  const previousTraining = () => {
    sliderTrainings.current?.slickPrev();
  };

  console.log(specTrainings)

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
                      <Link className="btn btn--small thumbnail-preview__button" to={`${AppRoute.Training}/${training.id}`}>Подробнее</Link>
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
            <SpecialOffersCarousel
            specTrainings={specTrainings.data}
            error={specTrainings.isError}
            />
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
                <button className="btn-icon popular-trainings__control" type="button" aria-label="previous" onClick={previousTraining}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon popular-trainings__control" type="button" aria-label="next" onClick={nextTraining}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <TrainingCarousel
            trainings={raitingTrainings.data}
            error={raitingTrainings.isError}
            sliderRef={sliderTrainings}
            />
          </div>
        </div>
      </section>
      <section className="look-for-company">
        <div className="container">
          <div className="look-for-company__wrapper">
            <div className="look-for-company__title-wrapper">
              <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
              <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={() => navigate(`${AppRoute.UserCatalog}/${params.id}`)}>
                <span>Смотреть все</span>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
              <div className="look-for-company__controls">
                <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous" onClick={previousUser}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next" onClick={nextUser}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <UserCarousel
            user={users.data}
            error={users.isError}
            sliderRef={sliderUsers}
            />
          </div>
        </div>
      </section>
    </main>
  </div>
  )
}

export default MainScreen;
