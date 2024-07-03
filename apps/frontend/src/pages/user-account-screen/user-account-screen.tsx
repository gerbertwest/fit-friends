import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Header from "../../components/header/header"
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { fetchDeleteFile, fetchUserByIdAction, updateUser } from "../../store/api-actions";
import { userSelector } from "../../store/user/selectors";
import { User } from "../../types/user";
import { Link, useParams } from "react-router-dom";
import { UpdateUser } from "../../types/update-user";
import LoadingScreen from "../loading-screen/loading-screen";
import { AppRoute } from "../../const";
import UserInfo from "../../components/user-info/user-info";

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
      avatarFile: avatar,
      avatar: registryData.avatar,
      readyToTraining: readyToTraining,
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
                readyToTraining={readyToTraining}
                onChangeReadyToTraining={() => setReadyToTraining(!readyToTraining)}
              />
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
                      <Link className="thumbnail-link thumbnail-link--theme-light" to={`${AppRoute.MyPurchases}/${params.id}`}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои покупки</span></Link>
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
