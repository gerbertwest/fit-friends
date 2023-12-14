import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { trainingSelector } from "../../store/training/selectors";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { checkAuthAction, fetchTrainingByIdAction, fetchUserByIdAction, updateTraining } from "../../store/api-actions";
import { AppRoute, STATIC_DIRECTORY, UserRole } from "../../const";
import { tokenPayloadSelector, userSelector } from "../../store/user/selectors";
import { EditTraining } from "../../types/edit-training";
//import { useElementListener } from "../../hooks/use-element-listener";

function TrainingCardScreen(): JSX.Element {

  const training = useAppSelector(trainingSelector);
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const token = useAppSelector(tokenPayloadSelector)

  const role = token.data?.role;

  // const [isLoaded, setIsLoaded] = useState(false);
  // useElementListener('loadeddata', videoRef, () => setIsLoaded(true));

  const [isPlaying, setIsPlaying] = useState(false);
  const [editStatus, setEditStatus] = useState(false);

  const DEFAULT_DATA: EditTraining = {
    title: '',
    description: '',
    price: 0,
    id: 0,
    special: false,
  }

  const [editData, setEditData] = useState(DEFAULT_DATA);
  //const [special, setSpecial] = useState(false)

  useEffect(() => {
    if (training.data) {
      setEditData({
        title: training.data.title,
        description: training.data.description,
        price: training.data.price,
        id: training.data.id,
        special: training.data.special,
       }
      );
    }
  }, [training.data])

  useEffect(() => {
    training.data?.reviews?.map((review) => (
      dispatch(fetchUserByIdAction(review.userId))
    ))
  }, [dispatch, training.data?.reviews])

  useEffect(() => {
    dispatch(fetchTrainingByIdAction(Number(params.id)))
    dispatch(checkAuthAction())
  }, [dispatch, params.id])

  const trainer = training.data?.trainer;

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setEditData({...editData, [target.name]: target.value});
  };

  const onChangeSpecial = () => {setEditData({...editData, special: true, price: editData.price * 0.9})}
  const onDeleteSpecial = () => {setEditData({...editData, special: false, price: editData.price / 0.9})}

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData: EditTraining = {
      id: Number(params.id),
      title: editData.title,
      description: editData.description,
      price: Math.ceil(editData.price),
      special: editData.special,
    };
    console.log(formData)
    setEditStatus(false)
    dispatch(updateTraining(formData));
  };

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button" onClick={() => navigate(`${AppRoute.TrainingCatalog}/${user.data?.id}`)}>
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  {
                    training.data?.reviews && training.data?.reviews.map((review) => (
                      <li className="reviews-side-bar__item">
                      <div className="review">
                        <div className="review__user-info">
                          <div className="review__user-photo">
                            <picture>
                              <source type="image/webp"/>
                                <img src={`${STATIC_DIRECTORY}${user.data?.avatar}`} width="64" height="64" alt="Изображение пользователя"/>
                            </picture>
                          </div><span className="review__user-name">{user.data?.name}</span>
                          <div className="review__rating">
                            <svg width="16" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg><span>{review.raiting}</span>
                          </div>
                        </div>
                        <p className="review__comment">{review.message}</p>
                      </div>
                    </li>
                    ))
                    }
                </ul>
                <button className="btn btn--medium reviews-side-bar__button" type="button" disabled={role === UserRole.Admin}>Оставить отзыв</button>
              </aside>
              <div className="training-card training-card--edit">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <picture>
                          <source type="image/webp"/>
                            <img src={`${STATIC_DIRECTORY}${trainer?.avatar}`} width="64" height="64" alt="Изображение тренера"/>
                        </picture>
                      </div>
                      <div className="training-info__coach-info"><span className="training-info__label">Тренер</span><span className="training-info__name">{trainer?.name}</span></div>
                    </div>
                    {role === UserRole.Admin ?

                    editStatus === false ?
                      <button className="btn-flat btn-flat--light training-info__edit" type="button" onClick={() => setEditStatus(true)}>
                       <svg width="12" height="12" aria-hidden="true">
                        <use xlinkHref="#icon-edit"></use>
                       </svg><span>Редактировать</span>
                      </button>
                    :
                      <button className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save" type="button" onClick={handleSubmit}>
                         <svg width="12" height="12" aria-hidden="true">
                         <use xlinkHref="#icon-edit"></use>
                         </svg><span>Сохранить</span>
                      </button>
                    :
                    ''
                    }
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label><span className="training-info__label">Название тренировки</span>
                              <input type="text" name="title" value={editData.title} disabled={role === UserRole.User || !editStatus} onChange={onChange}/>
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label><span className="training-info__label">Описание тренировки</span>
                              <textarea name="description" value={editData.description} disabled={role === UserRole.User || !editStatus} onChange={onChange}>
                                {training.data?.description}
                              </textarea>
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label><span className="training-info__label">Рейтинг</span><span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg></span>
                              <input type="number" name="rating" value={training.data?.raiting} disabled={role === UserRole.User || !editStatus}/>
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.data?.trainingType}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.data?.sex}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.data?.caloriesCount}ккал</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.data?.trainingTime}</span></div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label><span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" value={Math.ceil(editData.price)} disabled={role === UserRole.User || !editStatus} onChange={onChange}/>
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          {role === UserRole.Admin ?
                          !editData.special ?
                            <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button" onClick={onChangeSpecial} disabled={!editStatus}>
                              <svg width="14" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-discount"></use>
                              </svg><span>Сделать скидку 10%</span>
                            </button> :
                            <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button" onClick={onDeleteSpecial} disabled={!editStatus}>
                            <svg width="14" height="14" aria-hidden="true">
                              <use xlinkHref="#icon-discount"></use>
                            </svg><span>Отменить скидку</span>
                          </button>
                             :
                            <button className="btn training-info__buy" type="button">Купить</button>
                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="training-video">
                  <h2 className="training-video__title">Видео</h2>
                  <div className="training-video__video">
                   {isPlaying ?
                    <div className="training-video__thumbnail">
                      <video src={`${STATIC_DIRECTORY}${training.data?.video}`} poster={`${STATIC_DIRECTORY}${training.data?.video}`} ref={videoRef} controls autoPlay>
                     </video>
                    </div>
                    :
                    training.data?.video !== '' ?
                    <>
                    <div className="training-video__thumbnail">
                       <picture>
                          <source type="image/webp"/>
                          <img src={`${STATIC_DIRECTORY}${training.data?.backgroundImage}`} width="922" height="566" alt="Обложка видео"/>
                       </picture>
                    </div>
                    <button className="training-video__play-button btn-reset" onClick={() => setIsPlaying(!isPlaying)}>
                      <svg width="18" height="30" aria-hidden="true">
                        <use xlinkHref="#icon-arrow"></use>
                      </svg>
                    </button>
                    </> :
                    ''
                    }
                  </div>
                  <div className="training-video__drop-files">
                    <form action="#" method="post">
                      <div className="training-video__form-wrapper">
                        <div className="drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg></span>
                            <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4"/>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    {role === UserRole.Admin ?
                    editStatus === true ?
                     <div className="training-video__edit-buttons">
                      <button className="btn" type="button">Сохранить</button>
                      <button className="btn btn--outlined" type="button">Удалить</button>
                     </div> : ''
                     :
                     <>
                     <button className="btn training-video__button" type="button" disabled>Приступить</button>
                     <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
                     </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default TrainingCardScreen
