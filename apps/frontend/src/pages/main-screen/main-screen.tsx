import { useEffect, useRef } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { myTrainingsSelector, rairingTrainingsSelector, specTrainingsSelector } from "../../store/training/selectors";
import { fetchRaitingTrainingsAction, fetchSpecTrainingsAction, fetchTrainingsAction, fetchUserByIdAction, fetchUsers } from "../../store/api-actions";
import { userSelector, usersSelector } from "../../store/user/selectors";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoute, DEFAULT_OFFERS_COUNT_LIMIT, DEFAULT_SPEC_TRAININGS_COUNT_LIMIT, DEFAULT_TRAININGS_COUNT_LIMIT, READY_TO_TRAINING_USERS_COUNT } from "../../const";
import UserCarousel from "../../components/user-carousel/user-carousel";
import Slider from "react-slick";
import TrainingCarousel from "../../components/training-carousel/training-carousel";
import SpecialOffersCarousel from "../../components/special-offers-carousel/special-offers-carousel";
import SpecTrainingCarousel from "../../components/spec-training-carousel/spec-training-carousel";

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
  const special = `?limit=${DEFAULT_OFFERS_COUNT_LIMIT}&special=true`
  const raiting = `?limit=${DEFAULT_TRAININGS_COUNT_LIMIT}&sortField=raiting`
  const readyToTraining = `?limit=${READY_TO_TRAINING_USERS_COUNT}&readyToTraining=true`
  const queryString = `?limit=${DEFAULT_SPEC_TRAININGS_COUNT_LIMIT}&trainingTypes=${types}`

  useEffect(() => {
    dispatch(fetchTrainingsAction({queryString}))
    dispatch(fetchSpecTrainingsAction({queryString: special}))
    dispatch(fetchRaitingTrainingsAction({queryString: raiting}))
    dispatch(fetchUserByIdAction(String(params.id)))
    dispatch(fetchUsers({queryString: readyToTraining}))
  }, [dispatch, params.id, queryString, raiting, readyToTraining, special])

  const sliderUsers = useRef<Slider>(null);
  const sliderTrainings = useRef<Slider>(null);
  const sliderSpecTraining = useRef<Slider>(null);

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

  const nextSpecTraining = () => {
    sliderSpecTraining.current?.slickNext();
  };
  const previousSpecTraining = () => {
    sliderSpecTraining.current?.slickPrev();
  };

  return (
    <div className="wrapper">
    <Header/>
    <main>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <section className="special-for-you" hidden={trainings.data.length === 0}>
        <div className="container">
          <div className="special-for-you__wrapper">
            <div className="special-for-you__title-wrapper">
              <h2 className="special-for-you__title">Специально подобрано для вас</h2>
              <div className="special-for-you__controls">
                <button className="btn-icon special-for-you__control" type="button" aria-label="previous" onClick={previousSpecTraining}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon special-for-you__control" type="button" aria-label="next" onClick={nextSpecTraining}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            <SpecTrainingCarousel
            trainings={trainings.data}
            error={trainings.isError}
            sliderRef={sliderSpecTraining}
            />
          </div>
        </div>
      </section>
      <section className="special-offers" hidden={specTrainings.data.length === 0}>
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
