import { ChangeEvent, FormEvent, useState } from "react";
import BackgroungLogo from "../../components/background-logo/background-logo";
import { useAppDispatch } from "../../hooks/index";
import { UpdateUser } from "../../types/update-user";
import { updateUser } from "../../store/api-actions";
import SpecializationCheckbox from "../../components/specialization-checkbox/specialization-checkbox";
import LevelCheckbox from "../../components/level-checkbox/level-checkbox";

function QuestionaireCoach(): JSX.Element {

  const DEFAULT_TYPE: string[] = [];
  const dispatch = useAppDispatch();

  const [registryData, setRegistryData] = useState({
    level: '',
    merits: '',
  });

  const [certificate, setCertificate] = useState<File | undefined>();
  const [checkbox, setCheckbox] = useState(false);

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

  const handleCertificateUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setCertificate(evt.target.files[0]);
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData: UpdateUser = {
      level: registryData.level,
      trainingType: trainingType,
      merits: registryData.merits,
      certificate,
      personalTrainings: checkbox,
    };

    dispatch(updateUser(formData));
  };

  return (
    <div className="wrapper">
      <main>
        <BackgroungLogo/>
        <div className="popup-form popup-form--questionnaire-coach">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmit}>
                  <div className="questionnaire-coach">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-coach__wrapper">
                      <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-coach__specializations">
                        <SpecializationCheckbox onChangeType={onChangeType} trainingType={trainingType}/>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                        <LevelCheckbox onChange={onChange}/>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
                        <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>{certificate ? certificate.name : 'Загрузите сюда файлы формата PDF, JPG или PNG'}
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import"></use>
                              </svg></span>
                            <input type="file" name="certificates" tabIndex={-1} accept=".pdf, .jpg, .png" onChange={handleCertificateUpload}/>
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                        <div className="custom-textarea questionnaire-coach__textarea">
                          <label>
                            <textarea name="merits" placeholder=" " onChange={onChange} required minLength={10} maxLength={140}></textarea>
                          </label>
                        </div>
                        <div className="questionnaire-coach__checkbox">
                          <label>
                            <input type="checkbox" value="individual-training" name="personalTrainings" checked={checkbox} onChange={() => setCheckbox(!checkbox)}/>
                              <span className="questionnaire-coach__checkbox-icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg></span><span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="btn questionnaire-coach__button" type="submit">Продолжить</button>
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

export default QuestionaireCoach;
