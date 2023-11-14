import { ChangeEvent, FormEvent, useState } from "react";
import { NewUser } from "../../types/new-user";
import { useAppDispatch } from "../../hooks/index";
import { registerUser } from "../../store/api-actions";
import { LOCATIONS, SEX } from "../../const";
import BackgroungLogo from "../../components/background-logo/background-logo";
import { ucFirst } from "../../util";

function Registry(): JSX.Element {

  const dispatch = useAppDispatch();

  const [registryData, setRegistryData] = useState({
    email: '',
    password: '',
    name: '',
    dateBirth: '',
    role: '',
    sex: '',
    description: 'описание 1',
    location: LOCATIONS[0]
  });

  const [avatar, setAvatar] = useState<File | undefined>();
  const [checkbox, setCheckbox] = useState(false);

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
    const formData: NewUser = {
      email: registryData.email,
      password: registryData.password,
      name: registryData.name,
      dateBirth: new Date(registryData.dateBirth),
      role: registryData.role,
      sex: registryData.sex,
      description: registryData.description,
      location: registryData.location,
      avatar,
    };

    dispatch(registerUser(formData));
  };

  return (
    <div className="wrapper">
      <main>
      <BackgroungLogo/>
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmit}>
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
                        <label>
                          <input className="visually-hidden" type="file" accept="image/png, image/jpeg" name="avatar" onChange={handleAvatarUpload}></input>
                            <span className="input-load-avatar__btn">
                              {avatar ? (
                                <img
                                src={URL.createObjectURL(avatar)}
                                alt="avatar"
                                width="70" height="70" aria-hidden="true"
                              />
                              ) :
                              (
                              <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                            )}
                            </span>
                        </label>
                      </div>
                      <div className="sign-up__description">
                        <h2 className="sign-up__legend">Загрузите фото профиля</h2><span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                      </div>
                    </div>
                    <div className="sign-up__data">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
                            <input type="text" name="name" value={registryData.name} onChange={onChange} required minLength={1} maxLength={15}></input>
                            </span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label><span className="custom-input__label">E-mail</span><span className="custom-input__wrapper">
                            <input type="email" name="email" value={registryData.email} onChange={onChange} required></input>
                            </span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label><span className="custom-input__label">Дата рождения</span><span className="custom-input__wrapper">
                            <input type="date" name="dateBirth" max="2099-12-31" value={registryData.dateBirth} onChange={onChange} required></input>
                            </span>
                        </label>
                      </div>
                      <div className="custom-input">
                      <label>
                        <span className="custom-select__label">Ваша локация</span>
                        <span className="custom-input__wrapper">
                        <select className="custom-select__button" name='location' aria-label="Выберите одну из опций" value={registryData.location}
                        onChange={({target}) => setRegistryData({...registryData, [target.name]: target.value})}>
                          {LOCATIONS.map((local) => (<option value={local}>{local}</option>))}
                        </select>
                        </span>
                      </label>
                      </div>
                      <div className="custom-input">
                        <label><span className="custom-input__label">Пароль</span><span className="custom-input__wrapper">
                            <input type="password" name="password" autoComplete="off" value={registryData.password} onChange={onChange} required minLength={6} maxLength={12}></input>
                            </span>
                        </label>
                      </div>
                      <div className="sign-up__radio">
                        <span className="sign-up__label">Пол</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big">
                          {SEX.map((sex) => (
                            <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="sex" value={sex} checked={registryData.sex === sex ? true : false} onChange={onChange} required></input>
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{ucFirst(sex)}</span>
                            </label>
                          </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__role">
                      <h2 className="sign-up__legend">Выберите роль</h2>
                      <div className="role-selector sign-up__role-selector">
                        <div className="role-btn">
                          <label>
                            <input className="visually-hidden" type="radio" name="role" value='Тренер' checked={registryData.role === 'Тренер' ? true : false} onChange={onChange}></input>
                              <span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg></span><span className="role-btn__btn">Я хочу тренировать</span>
                          </label>
                        </div>
                        <div className="role-btn">
                          <label>
                            <input className="visually-hidden" type="radio" name="role" value='Пользователь' checked={registryData.role === 'Пользователь' ? true : false} onChange={onChange} required></input>
                              <span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-weight"></use>
                              </svg></span><span className="role-btn__btn">Я хочу тренироваться</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__checkbox">
                      <label>
                        <input type="checkbox" value="user-agreement" name="user-agreement" checked={checkbox} onChange={() => setCheckbox(!checkbox)}></input>
                          <span className="sign-up__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg></span><span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                      </label>
                    </div>
                    <button className="btn sign-up__button" type="submit" disabled={!checkbox}>Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Registry;
