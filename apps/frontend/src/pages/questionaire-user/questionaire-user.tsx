import { ChangeEvent, FormEvent, useState } from "react";
import BackgroungLogo from "../../components/background-logo/background-logo";
import { TRAINING_TIMES } from "../../const";
import { useAppDispatch } from "../../hooks/index";
import { UpdateUser } from "../../types/update-user";
import { updateUser } from "../../store/api-actions";
import SpecializationCheckbox from "../../components/specialization-checkbox/specialization-checkbox";
import LevelCheckbox from "../../components/level-checkbox/level-checkbox";

function QuestionaireUser(): JSX.Element {

  const dispatch = useAppDispatch();

  const [registryData, setRegistryData] = useState({
    level: '',
    trainingTime: '',
    caloriesToLose: 0,
    caloriesToBurn: 0,
  });

  const DEFAULT_TYPE: string[] = [];
  const [trainingType, addTrainingType] = useState(DEFAULT_TYPE)

  const changeType = (value: string) => {
    const ind = trainingType.indexOf(value);
    if (ind === -1) {
      addTrainingType([...trainingType, value]);
    }
    else {
      addTrainingType(() => trainingType.filter((val) => val !== value));
    }
  };

  const onChangeType = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    changeType(target.value);
  };

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setRegistryData({...registryData, [target.name]: target.value});
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData: UpdateUser = {
      level: registryData.level,
      trainingType: trainingType,
      trainingTime: registryData.trainingTime,
      caloriesToLose: Number(registryData.caloriesToLose),
      caloriesToBurn: Number(registryData.caloriesToBurn),
    };

    dispatch(updateUser(formData));
  };

  return (
    <div className="wrapper">
      <main>
        <BackgroungLogo/>
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmit}>
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-user__specializations">
                          <SpecializationCheckbox onChangeType={onChangeType} trainingType={trainingType}/>
                        </div>
                      </div>
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          {TRAINING_TIMES.map((time) => (
                            <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainingTime" value={time} onChange={onChange} required/>
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">{time}</span>
                            </label>
                          </div>
                          ))}
                        </div>
                      </div>
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          <LevelCheckbox onChange={onChange}/>
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label><span className="custom-input__wrapper">
                                <input type="number" name="caloriesToLose" value={registryData.caloriesToLose} onChange={onChange} required min={1000} max={5000}/>
                                <span className="custom-input__text">ккал</span></span>
                            </label>
                          </div>
                        </div>
                        <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label><span className="custom-input__wrapper">
                                <input type="number" name="caloriesToBurn" value={registryData.caloriesToBurn} onChange={onChange} required min={1000} max={5000}/>
                                <span className="custom-input__text">ккал</span></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
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

export default QuestionaireUser;
