import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { userSelector } from "../../store/user/selectors";
import { fetchUserByIdAction, updateUser } from "../../store/api-actions";
import { useParams } from "react-router-dom";
import LoadingScreen from "../loading-screen/loading-screen";
import { LEVELS, LOCATIONS, SEX, STATIC_DIRECTORY } from "../../const";
import { ucFirst } from "../../util";
import SpecializationCheckbox from "../../components/specialization-checkbox/specialization-checkbox";
import { UpdateUser } from "../../types/update-user";
import { User } from "../../types/user";

function CoachAccount(): JSX.Element {

  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const userData = user.data
  const params = useParams();

  useEffect(() => {
    dispatch(fetchUserByIdAction(String(params.id)))
  }, [dispatch, params.id])

  const [editStatus, setEditStatus] = useState(false);

  const DEFAULT_DATA: User = {
    name: '',
    sex: '',
    description: '',
    location: '',
    personalTrainings: false,
    level: '',
  }

  const [registryData, setRegistryData] = useState(DEFAULT_DATA);

  const [avatar, setAvatar] = useState<File | undefined>();

  const DEFAULT_TYPE: string[] = [];
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
       }
      );
      addTrainingType(userData.trainingType);
      setPersonalTrainings(userData.personalTrainings)
    }
  }, [user.data, userData, userData?.avatar, userData?.level, userData?.location, userData?.name, userData?.personalTrainings, userData?.sex])

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
      personalTrainings: personalTrainings,
      level: registryData.level,
    };

    console.log(formData)

    setEditStatus(false)
    dispatch(updateUser(formData));
  };

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
                      <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg"/>
                        <span className="input-load-avatar__avatar">
                          <img src={userData?.avatar ? `${STATIC_DIRECTORY}${userData.avatar}` : "public/img/content/user-photo-1.png"} srcSet="public/img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user avatar"/>
                        </span>
                    </label>
                  </div>

                  {editStatus === true ? <div className="user-info-edit__controls">
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
                        <input type="checkbox" name="personalTrainings" onChange={()=> setPersonalTrainings(!personalTrainings)} checked={personalTrainings}/>
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
                      <SpecializationCheckbox onChangeType={onChangeType} trainingType={userData?.trainingType}/>
                    </div>
                  </div>
                  <div className="user-info-edit__select">
                    <span className="custom-select__label">Локация</span>
                    <select className="custom-select__button" name='location' aria-label="Выберите одну из опций" value={registryData.location}
                      onChange={({target}) => setRegistryData({...registryData, [target.name]: target.value})}>
                          {LOCATIONS.map((local) => (<option value={local}>{local}</option>))}
                      </select>

{/*
                    <div className="custom-select__placeholder">ст. м. Адмиралтейская</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                    <span className="custom-select__text"></span>
                    <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                        </span>
                        </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul> */}
                  </div>

                  <div className="custom-select user-info-edit__select"><span className="custom-select__label">Пол</span>
                     <select className="custom-select__button" name='location' aria-label="Выберите одну из опций" value={registryData.sex}>
                          {SEX.map((sex) => (<option value={sex}>{ucFirst(sex)}</option>))}
                     </select>

                    {/* <div className="custom-select__placeholder">Женский</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg></span></button>
                    <ul className="custom-select__list" role="listbox">
                    </ul> */}
                  </div>

                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Уровень</span>
                     <select className="custom-select__button" name='location' aria-label="Выберите одну из опций" value={registryData.level}>
                          {LEVELS.map((level) => (<option value={level}>{ucFirst(level)}</option>))}
                     </select>

                    {/* <div className="custom-select__placeholder">Профессионал</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций"><span className="custom-select__text"></span><span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg></span></button>
                    <ul className="custom-select__list" role="listbox">
                    </ul> */}
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation"><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои тренировки</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Создать тренировку</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои друзья</span></a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои заказы</span></a>
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
                      <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
                        <svg width="14" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-import"></use>
                        </svg><span>Загрузить</span>
                      </button>
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
                      <li className="personal-account-coach__item">
                        <div className="certificate-card certificate-card--edit">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="public/img/content/certificates-and-diplomas/certificate-1.webp, public/img/content/certificates-and-diplomas/certificate-1@2x.webp 2x"/>
                                <img src="public/img/content/certificates-and-diplomas/certificate-1.jpg" srcSet="public/img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x" width="294" height="360" alt="Сертификат - Биомеханика ударов в боксе"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="public/img/content/certificates-and-diplomas/certificate-2.webp, public/img/content/certificates-and-diplomas/certificate-2@2x.webp 2x"/>
                                <img src="public/img/content/certificates-and-diplomas/certificate-2.jpg" srcSet="public/img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x" width="294" height="360" alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="public/img/content/certificates-and-diplomas/certificate-3.webp, public/img/content/certificates-and-diplomas/certificate-3@2x.webp 2x"/>
                                <img src="public/img/content/certificates-and-diplomas/certificate-3.jpg" srcSet="public/img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x" width="294" height="360" alt="Сертифиционный курс по кроссфиту 2-го уровня"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="public/img/content/certificates-and-diplomas/certificate-4.webp, public/img/content/certificates-and-diplomas/certificate-4@2x.webp 2x"/>
                                <img src="public/img/content/certificates-and-diplomas/certificate-4.jpg" srcSet="public/img/content/certificates-and-diplomas/certificate-4@2x.jpg 2x" width="294" height="360" alt="Сертификат инструкторов йоги"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="public/img/content/certificates-and-diplomas/certificate-5.webp, public/img/content/certificates-and-diplomas/certificate-5@2x.webp 2x"/>
                                <img src="public/img/content/certificates-and-diplomas/certificate-5.jpg" srcSet="public/img/content/certificates-and-diplomas/certificate-5@2x.jpg 2x" width="294" height="360" alt="Сертификат фитне аэробики"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="public/img/content/certificates-and-diplomas/certificate-6.webp, public/img/content/certificates-and-diplomas/certificate-6@2x.webp 2x"/>
                                <img src="public/img/content/certificates-and-diplomas/certificate-6.jpg" srcSet="public/img/content/certificates-and-diplomas/certificate-6@2x.jpg 2x" width="294" height="360" alt="Сертификат фитне аэробики"/>
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
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
