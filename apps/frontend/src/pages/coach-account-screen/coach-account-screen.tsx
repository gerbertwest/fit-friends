import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { updateUserSelector, userSelector } from "../../store/user/selectors";
import { fetchDeleteFile, fetchUserByIdAction, updateUser } from "../../store/api-actions";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "../loading-screen/loading-screen";
import { AppRoute } from "../../const";
import { UpdateUser } from "../../types/update-user";
import { User } from "../../types/user";
import CertCarousel from "../../components/cert-carousel/cert-carousel";
import Slider from "react-slick";
import UserInfo from "../../components/user-info/user-info";

function CoachAccount(): JSX.Element {

  const DEFAULT_DATA: User = {
    name: '',
    sex: '',
    description: '',
    location: '',
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

  const sliderCert = useRef<Slider>(null);
  const nextCert = () => {
    sliderCert.current?.slickNext();
  };
  const previousCert = () => {
    sliderCert.current?.slickPrev();
  };

  useEffect(() => {
    dispatch(fetchUserByIdAction(String(params.id)))
  }, [dispatch, params.id])

  const [editStatus, setEditStatus] = useState(false);
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
      dispatch(fetchDeleteFile(certificate))
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
        avatarFile: avatar,
        avatar: registryData.avatar,
        personalTrainings: personalTrainings,
        level: registryData.level,
      };
    dispatch(updateUser(formData));
    params.id && dispatch(fetchUserByIdAction(params.id))
    setEditStatus(false)
  };

  const handleDeleteAvatar = () => {
    if (userData?.avatar) {dispatch(fetchDeleteFile(userData?.avatar))}
    setRegistryData({
      avatar: ''
    })
  }

  useEffect(() => {
    if (updateUserData?.certificates) {
      setRegistryData({...registryData, certificates: updateUserData.certificates})
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserData?.certificates])

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
              <UserInfo
                role={userData?.role}
                registryData={registryData}
                avatar={avatar}
                editStatus={editStatus}
                setEditStatus={setEditStatus}
                setRegistryData={setRegistryData}
                handleAvatarUpload={handleAvatarUpload}
                handleSubmit={handleSubmit}
                handleCancel={handleDeleteAvatar}
                onChange={onChange}
                trainingType={trainingType}
                onChangeType={onChangeType}
                personalTrainings={personalTrainings}
                onChangePersonalTrainings={() => setPersonalTrainings(!personalTrainings)}
              />
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
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous" onClick={previousCert} disabled={registryData.certificates?.length === 0}>
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-left"></use>
                          </svg>
                        </button>
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="next" onClick={nextCert} disabled={registryData.certificates?.length === 0}>
                          <svg width="16" height="14" aria-hidden="true">
                            <use xlinkHref="#arrow-right"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                    {registryData.certificates?.length !== 0 ?
                    <CertCarousel
                    certificates={registryData.certificates}
                    handleChangeCertificate={handleChangeCertificate}
                    handleCertificateDelete={handleCertificateDelete}
                    sliderRef={sliderCert}
                    />
                  :
                  <p>Сертификатов нет</p>
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

export default CoachAccount;
