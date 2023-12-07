import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { updateUserSelector, userSelector } from "../../store/user/selectors";
import { fetchUserByIdAction, updateUser } from "../../store/api-actions";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "../loading-screen/loading-screen";
import { AppRoute, LEVELS, LOCATIONS, SEX, STATIC_DIRECTORY } from "../../const";
import { ucFirst } from "../../util";
import SpecializationCheckbox from "../../components/specialization-checkbox/specialization-checkbox";
import { UpdateUser } from "../../types/update-user";
import { User } from "../../types/user";

function CoachAccount(): JSX.Element {

  const DEFAULT_DATA: User = {
    name: '',
    sex: '',
    description: '',
    location: '',
    personalTrainings: false,
    level: '',
    avatar: '',
    certificates: [],
  }
  const DEFAULT_TYPE: string[] = [];

  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const userData = user.data
  const params = useParams();
  const updateUserData = useAppSelector(updateUserSelector).data

  useEffect(() => {
    dispatch(fetchUserByIdAction(String(params.id)))
  }, [dispatch, params.id])

  const [editStatus, setEditStatus] = useState(false);
  const [certEditStatus, setCertEditStatus] = useState(
    {
      key: '',
      status: false
    });
  const [registryData, setRegistryData] = useState(DEFAULT_DATA);
  const [avatar, setAvatar] = useState<File | undefined>();
  const [trainingType, addTrainingType] = useState<string[] | undefined>(DEFAULT_TYPE)
  const [personalTrainings, setPersonalTrainings] = useState<boolean | undefined>(false)

  useEffect(() => {
    if (userData) {
      setRegistryData({
        name: userData?.name,
        sex: userData?.sex,
        location: userData?.location,
        personalTrainings: userData?.personalTrainings,
        level: userData?.level,
        description: userData.description,
        avatar: userData?.avatar,
        certificates: userData.certificates
       }
      );
      addTrainingType(userData.trainingType);
      setPersonalTrainings(userData.personalTrainings)
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

  const handleCertificateUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    dispatch(updateUser({certificate: evt.target.files[0]}))
  };

  const handleCertificateDelete = (certificate: string) => {

    if (registryData?.certificates) {
    const index = registryData?.certificates.indexOf(certificate);

    if (index !== -1) {
      const certificates = [...registryData.certificates]
      certificates.splice(index, 1)
      setRegistryData({certificates: certificates})
      dispatch(updateUser({certificates: certificates}))
    }
  }
  };

  const handleChangeCertificate = (certificate: string, evt: ChangeEvent<HTMLInputElement>) => {
    if (registryData?.certificates) {
      const index = registryData?.certificates.indexOf(certificate);

      if (index !== -1) {
        const certificates = [...registryData.certificates]
        certificates.splice(index, 1)
        dispatch(updateUser({certificates: certificates}))
      }
    }
    if (!evt.target.files) {
      return;
    }

    dispatch(updateUser({certificate: evt.target.files[0]}))
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData: UpdateUser = {
      name: registryData.name,
      sex: registryData.sex,
      description: registryData.description,
      location: registryData.location,
      trainingType: trainingType,
      avatar,
      personalTrainings: personalTrainings,
      level: registryData.level,
    };

    setEditStatus(false)
    dispatch(updateUser(formData));
  };

  useEffect(() => {
    if (updateUserData?.certificates) {
      setRegistryData({certificates: updateUserData.certificates})
      }
  }, [updateUserData])

  if (user.isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div className="user-info-edit__header">
                  <div className="input-load-avatar">
                    <label>
                      <input className="visually-hidden" type="file" name="avatar" accept="image/png, image/jpeg" onChange={handleAvatarUpload} disabled={!editStatus}/>
                        <span className="input-load-avatar__avatar">
                        {
                          registryData.avatar === '' ?
                          <img src="public/img/content/user-photo-1.png" srcSet="public/img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user avatar"/>
                          :
                        avatar ? (
                                <img
                                src={URL.createObjectURL(avatar)}
                                alt="avatar"
                                width="70" height="70" aria-hidden="true"
                              />
                              ) :
                              (
                                <img
                                src={`${STATIC_DIRECTORY}${registryData.avatar}`}
                                alt="avatar"
                                width="70" height="70" aria-hidden="true"
                              />
                            )
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
                    <button className="user-info-edit__control-btn" aria-label="удалить" onClick={() => setEditStatus(false)}>
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div> : ''}

                </div>
                <form className="user-info-edit__form" action="#" method="post">
                  {editStatus === false ? <button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label="Редактировать" onClick={() => setEditStatus(true)}>
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg><span>Редактировать</span>
                  </button> : ''}

                  <div className="user-info__section">
                    <h2 className="user-info-edit__title">Обо мне</h2>
                    <div className={editStatus ? "custom-input user-info-edit__input" : "custom-input custom-input--readonly user-info-edit__input"}>
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input type="text" name="name" value={registryData.name} disabled={!editStatus} onChange={onChange}/>
                        </span>
                      </label>
                    </div>
                    <div className="custom-textarea user-info-edit__textarea">
                      <label><span className="custom-textarea__label">Описание</span>
                        <textarea name="description" placeholder=" " value={registryData.description}
                        onChange={onChange} readOnly={!editStatus}>{registryData.description}
                        </textarea>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section user-info-edit__section--status">
                    <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
                    <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
                      <label>
                        <input type="checkbox" name="personalTrainings" disabled={!editStatus} onChange={()=> setPersonalTrainings(!personalTrainings)} checked={personalTrainings}/>
                          <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                          </span>
                          <span className="custom-toggle__label">Готов тренировать</span>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
                    <div className="specialization-checkbox user-info-edit__specialization">
                      <SpecializationCheckbox onChangeType={onChangeType} trainingType={trainingType} editStatus={editStatus}/>
                    </div>
                  </div>
                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Локация</span>
                    <select className="custom-select__button" name='location' aria-label="Выберите одну из опций" value={registryData.location}
                      onChange={({target}) => setRegistryData({...registryData, [target.name]: target.value})} disabled={!editStatus}>
                          {LOCATIONS.map((local) => (<option value={local}>{local}</option>))}
                      </select>
                  </div>

                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Пол</span>
                     <select className="custom-select__button" name='sex' aria-label="Выберите одну из опций" value={registryData.sex}
                       onChange={({target}) => setRegistryData({...registryData, [target.name]: target.value})} disabled={!editStatus}>
                          {SEX.map((sex) => (<option value={sex}>{ucFirst(sex)}</option>))}
                     </select>
                  </div>

                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Уровень</span>
                     <select className="custom-select__button" name='level' aria-label="Выберите одну из опций" value={registryData.level}
                       onChange={({target}) => setRegistryData({...registryData, [target.name]: target.value})} disabled={!editStatus}>
                          {LEVELS.map((level) => (<option value={level}>{ucFirst(level)}</option>))}
                     </select>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={`${AppRoute.MyTrainings}/${params.id}`}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои тренировки</span>
                    </Link>
                      <Link className="thumbnail-link thumbnail-link--theme-light" to={`${AppRoute.CreateTraining}/${params.id}`}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Создать тренировку</span></Link>
                      <Link className="thumbnail-link thumbnail-link--theme-light" to={`${AppRoute.MyFriends}/${params.id}`}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои друзья</span></Link>
                      <Link className="thumbnail-link thumbnail-link--theme-light" to={`${AppRoute.MyOrders}/${params.id}`}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои заказы</span></Link>
                    <div className="personal-account-coach__calendar">
                      <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="public/img/content/thumbnails/nearest-gym-01.webp, public/img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
                            <img src="public/img/content/thumbnails/nearest-gym-01.jpg" srcSet="public/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <div className="thumbnail-spec-gym__header">
                        <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                      </div>
                    </div>
                  </div>
                  </div>


                  <div className="personal-account-coach__additional-info">
                    <div className="personal-account-coach__label-wrapper">
                      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
                      <form className="btn-flat btn-flat--underlined personal-account-coach__button">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-import"></use>
                        </svg>
                        <label htmlFor="certificate">Загрузить</label>
                      </form>
                      <input
                        type="file"
                        name="certificate"
                        id="certificate"
                        accept=".pdf"
                        hidden
                        onChange={handleCertificateUpload}
                         >
                      </input>

                      <div className="personal-account-coach__controls">
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-left"></use>
                          </svg>
                        </button>
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-right"></use>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <ul className="personal-account-coach__list">
                       {registryData.certificates ? registryData?.certificates.map((cert) => (
                        <li className="personal-account-coach__item" key={cert}>
                        <div className="certificate-card certificate-card--edit">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="application/pdf" srcSet={`${STATIC_DIRECTORY}${cert}`}/>
                                <embed src={`${STATIC_DIRECTORY}${cert}`} width="294" height="360"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            {certEditStatus.status === true && certEditStatus.key === cert ?
                            <>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button"
                            onClick={() => setCertEditStatus({key: cert, status: false})}>
                              <svg width="12" height="12" >
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                            <form className="btn-icon certificate-card__control" aria-label="next">
                             <label htmlFor="cert">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-change"></use>
                              </svg>
                             </label>
                            </form>
                            <input
                              type="file"
                              name="cert"
                              id="cert"
                              accept=".pdf"
                              hidden
                              onChange={(evt) => handleChangeCertificate(cert, evt)}
                             >
                            </input>
                            <button className="btn-icon certificate-card__control" type="button" aria-label="next" onClick={() => handleCertificateDelete(cert)}>
                              <svg width="14" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-trash"></use>
                              </svg>
                            </button>
                           </div>
                           </>
                           :
                            <button className="btn-flat btn-flat--underlined " type="button" onClick={() => setCertEditStatus({status: true, key: cert})}>
                              <svg width="12" height="12" >
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                           }


                          </div>
                        </div>
                      </li>
                     )) : ''}

                    </ul>

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

export default CoachAccount;
