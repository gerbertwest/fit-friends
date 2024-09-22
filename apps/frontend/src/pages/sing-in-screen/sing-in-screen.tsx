import { useState, ChangeEvent, FormEvent } from "react";
import { loginAction } from "../../store/api-actions";
import { useAppDispatch } from "../../hooks/index";

import BackgroungLogo from "../../components/background-logo/background-logo";

function SignIn(): JSX.Element {

  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setAuthData({...authData, [target.name]: target.value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (authData !== null) {
      dispatch(loginAction({
        login: authData.email,
        password: authData.password,
      }));
    }
  };

  return (
    <div className="wrapper">
      <main>
        <BackgroungLogo/>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmit}>
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="email"
                            name="email"
                            //autoComplete="off"
                            required
                            onChange={onChange}
                            />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="password"
                            name="password"
                            autoComplete="off" required
                            onChange={onChange}
                            />
                        </span>
                      </label>
                    </div>
                    <button className="btn sign-in__button" type="submit">Продолжить</button>
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

export default SignIn;
