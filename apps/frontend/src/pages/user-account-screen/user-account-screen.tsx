import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Header from "../../components/header/header"
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { fetchUserByIdAction, updateUser } from "../../store/api-actions";
import { userSelector } from "../../store/user/selectors";
import { User } from "../../types/user";
import { Link, useParams } from "react-router-dom";
import { UpdateUser } from "../../types/update-user";
import LoadingScreen from "../loading-screen/loading-screen";
import { AppRoute, LEVELS, LOCATIONS, SEX, STATIC_DIRECTORY } from "../../const";
import SpecializationCheckbox from "../../components/specialization-checkbox/specialization-checkbox";
import { ucFirst } from "../../util";

function UserAccount(): JSX.Element {

  const DEFAULT_DATA: User = {
    name: '',
    sex: '',
    description: '',
    location: '',
    level: '',
    avatar: '',
    caloriesToLose: 0,
  }
  const DEFAULT_TYPE: string[] = [];

  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const userData = user.data
  const params = useParams();

  useEffect(() => {
    dispatch(fetchUserByIdAction(String(params.id)))
  }, [dispatch, params.id])

  const [registryData, setRegistryData] = useState(DEFAULT_DATA);
  const [trainingType, addTrainingType] = useState<string[] | undefined>(DEFAULT_TYPE)
  const [readyToTraining, setReadyToTraining] = useState<boolean | undefined>(false)
  const [avatar, setAvatar] = useState<File | undefined>();
  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    if (userData) {
      setRegistryData({
        name: userData.name,
        sex: userData.sex,
        location: userData.location,
        level: userData.level,
        description: userData.description,
        avatar: userData.avatar,
        caloriesToLose: userData.caloriesToLose
       }
      );
      addTrainingType(userData.trainingType);
      setReadyToTraining(userData.readyToTraining)
    }
  }, [userData])

  const changeType = (value: string) => {
    if (trainingType) {
    const ind = trainingType.indexOf(value);
    if (ind === -1) {
      addTrainingType([...trainingType, value]);
    }
    else {
      addTrainingType(() => trainingType.filter((val) => val !== value));
    }
   }
  };

  const onChangeType = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    changeType(target.value);
  };

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setRegistryData({...registryData, [target.name]: target.value});
  };

  const handleAvatarUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setAvatar(evt.target.files[0]);
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData: UpdateUser = {
      name: registryData.name,
      sex: registryData.sex,
      description: registryData.description,
      location: registryData.location,
      trainingType: trainingType,
      avatar,
      readyToTraining: readyToTraining,
      level: registryData.level,
    };

    setEditStatus(false)
    dispatch(updateUser(formData));
  };

  const handleCancel = () => {
    setRegistryData({
      name: userData?.name,
      sex: userData?.sex,
      location: userData?.location,
      level: userData?.level,
      description: userData?.description,
      avatar: userData?.avatar,
      certificates: userData?.certificates
     }
    );
    addTrainingType(userData?.trainingType);
    setReadyToTraining(userData?.readyToTraining)
    setEditStatus(false)
}

  if (user.isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  console.log(registryData)

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info">
                <div className="user-info__header">
                  <div className="input-load-avatar">
                    <label>
                      <input className="visually-hidden" type="file" name="avatar" accept="image/png, image/jpeg" onChange={handleAvatarUpload} disabled={!editStatus}/>
                        <span className="input-load-avatar__avatar">
                        {
                           avatar ? (
                                <img
                                src={URL.createObjectURL(avatar)}
                                alt="avatar"
                                width="70" height="70" aria-hidden="true"
                              />
                              ) : registryData.avatar === '' ?
                              (
                                <img
                                src="public/img/content/user-photo-1.png" srcSet="public/img/content/user-photo-1@2x.png 2x"
                                alt="avatar"
                                width="70" height="70" aria-hidden="true"
                              />
                              ) :
                              <img
                                src={`${STATIC_DIRECTORY}${registryData.avatar}`}
                                alt="avatar"
                                width="70" height="70" aria-hidden="true"
                              />
                            }
                        </span>
                    </label>
                  </div>
                  {editStatus === true ?
                  <div className="user-info-edit__controls">
                    <button className="user-info-edit__control-btn" aria-label="обновить" type="button" onClick={handleSubmit} >
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-change"></use>
                      </svg>
                    </button>
                    <button className="user-info-edit__control-btn" aria-label="удалить" onClick={handleCancel}>
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div> : ''}
                </div>
                <form className="user-info__form" action="#" method="post">
                  {editStatus === false ? <button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label="Редактировать" onClick={() => setEditStatus(true)}>
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg><span>Редактировать</span>
                  </button> : ''}
                  <div className="user-info__section">
                    <h2 className="user-info__title">Обо мне</h2>
                    <div className={editStatus ? "custom-input user-info-edit__input" : "custom-input custom-input--readonly user-info-edit__input"}>
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input type="text" name="name" value={registryData.name} disabled={!editStatus} onChange={onChange}/>
                        </span>
                      </label>
                    </div>
                    <div className="custom-textarea custom-textarea--readonly user-info__textarea">
                      <label><span className="custom-textarea__label">Описание</span>
                        <textarea name="description" placeholder=" " value={registryData.description}
                         onChange={onChange} readOnly={!editStatus}>
                          {registryData.description}
                        </textarea>
                      </label>
                    </div>
                  </div>
                  <div className="user-info__section user-info__section--status">
                    <h2 className="user-info__title user-info__title--status">Статус</h2>
                    <div className="custom-toggle custom-toggle--switch user-info__toggle">
                      <label>
                        <input type="checkbox" name="readyToTraining" disabled={!editStatus} onChange={()=> setReadyToTraining(!readyToTraining)} checked={readyToTraining}/>
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                          </span>
                          <span className="custom-toggle__label">Готов к тренировке</span>
                      </label>
                    </div>
                  </div>
                  <div className="user-info__section">
                    <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
                    <div className="specialization-checkbox user-info__specialization">
                      <SpecializationCheckbox onChangeType={onChangeType} trainingType={trainingType} editStatus={editStatus}/>
                    </div>
                  </div>
                  <div className="custom-select--readonly custom-select user-info__select">
                    <span className="custom-select__label">Локация</span>
                    <select className="custom-select__button" name='location' aria-label="Выберите одну из опций" value={registryData.location}
                      onChange={({target}) => setRegistryData({...registryData, [target.name]: target.value})} disabled={!editStatus}>
                          {LOCATIONS.map((local) => (<option value={local}>{local}</option>))}
                      </select>
                  </div>
                  <div className="custom-select--readonly custom-select user-info__select">
                    <span className="custom-select__label">Пол</span>
                    <select className="custom-select__button" name='sex' aria-label="Выберите одну из опций" value={registryData.sex}
                       onChange={({target}) => setRegistryData({...registryData, [target.name]: target.value})} disabled={!editStatus}>
                          {SEX.map((sex) => (<option value={sex}>{ucFirst(sex)}</option>))}
                     </select>
                  </div>
                  <div className="custom-select--readonly custom-select user-info__select">
                    <span className="custom-select__label">Уровень</span>
                    <select className="custom-select__button" name='level' aria-label="Выберите одну из опций" value={registryData.level}
                       onChange={({target}) => setRegistryData({...registryData, [target.name]: target.value})} disabled={!editStatus}>
                          {LEVELS.map((level) => (<option value={level}>{ucFirst(level)}</option>))}
                     </select>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на день, ккал</span>
                            <input type="text" name="schedule-for-the-day" value={registryData.caloriesToLose} disabled/>
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label><span className="personal-account-user__label">План на неделю, ккал</span>
                            <input type="text" name="schedule-for-the-week" value={registryData.caloriesToLose && registryData.caloriesToLose * 7} disabled/>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                   <div className="personal-account-user__additional-info">
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={`${AppRoute.MyFriends}/${params.id}`}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                      <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои покупки</span></a>
                        <div className="thumbnail-spec-gym">
                         <div className="thumbnail-spec-gym__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/nearest-gym-01.webp, public/img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/nearest-gym-01.jpg" srcSet="public/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
                          </picture>
                         </div>
                         <div className="thumbnail-spec-gym__header">
                          <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                         </div>
                       </div>
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

export default UserAccount
