import { ChangeEvent, FormEvent, useState } from "react";
import Header from "../../components/header/header";
import { NewTraining } from "../../types/new-training";
import { AppRoute, GENDERS, GENDERS_DICTIONARY, LEVELS, TRAINING_TIMES, TRAINING_TYPES } from "../../const";
import { ucFirst } from "../../util";
import { useAppDispatch } from "../../hooks/index";
import { createTraining } from "../../store/api-actions";
import { useNavigate, useParams } from "react-router-dom";

function CreateTraining(): JSX.Element {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [creatingData, setCreatingData] = useState({
    title: '',
    level: '',
    trainingType: '',
    trainingTime: '',
    price: 0,
    caloriesCount: 0,
    sex: '',
    description: '',
    special: false,
  });

  const [video, setVideo] = useState<File | undefined>();

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setCreatingData({...creatingData, [target.name]: target.value});
  };

  const handleVideoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setVideo(evt.target.files[0]);
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData: NewTraining = {
      title: creatingData.title,
      level: creatingData.level,
      trainingType: creatingData.trainingType,
      trainingTime: creatingData.trainingTime,
      price: Number(creatingData.price),
      caloriesCount: Number(creatingData.caloriesCount),
      sex: creatingData.sex,
      description: creatingData.description,
      video,
      special: false
    };
    dispatch(createTraining(formData));
    navigate(`${AppRoute.CoachAccount}/${params.id}`)
  };


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={handleSubmit}>
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Название тренировки</h2>
                        <div className="custom-input create-training__input">
                          <label><span className="custom-input__wrapper">
                              <input type="text" name="title" value={creatingData.title} onChange={onChange}/></span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Характеристики тренировки</h2>
                        <div className="create-training__info">
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">Выберите тип тренировки</span>
                            <select className="custom-select__button" name='trainingType' aria-label="Выберите одну из опций" value={creatingData.trainingType}
                              onChange={({target}) => setCreatingData({...creatingData, [target.name]: target.value})}>
                             {TRAINING_TYPES.map((type) => (<option value={type}>{ucFirst(type)}</option>))}
                            </select>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Сколько калорий потратим</span>
                              <span className="custom-input__wrapper">
                                <input type="number" name="caloriesCount" value={creatingData.caloriesCount} onChange={onChange}/>
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">Сколько времени потратим</span>
                            <select className="custom-select__button" name='trainingTime' aria-label="Выберите одну из опций" value={creatingData.trainingTime}
                              onChange={({target}) => setCreatingData({...creatingData, [target.name]: target.value})}>
                             {TRAINING_TIMES.map((time) => (<option value={time}>{time}</option>))}
                            </select>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input type="number" name="price" value={creatingData.price} onChange={onChange}/>
                                <span className="custom-input__text">₽</span></span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected">
                            <span className="custom-select__label">Выберите уровень тренировки</span>
                            <select className="custom-select__button" name='level' aria-label="Выберите одну из опций" value={creatingData.level}
                              onChange={({target}) => setCreatingData({...creatingData, [target.name]: target.value})}>
                             {LEVELS.map((level) => (<option value={level}>{ucFirst(level)}</option>))}
                            </select>
                            <ul className="custom-select__list" role="listbox">
                            </ul>
                          </div>
                          <div className="create-training__radio-wrapper">
                            <span className="create-training__label">Кому подойдет тренировка</span>
                            <br/>
                            <div className="custom-toggle-radio create-training__radio">
                              {GENDERS.map((sex) => (
                               <div className="custom-toggle-radio__block">
                                <label>
                                 <input type="radio" name="sex" value={sex} checked={creatingData.sex === sex ? true : false} onChange={onChange} required></input>
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">{GENDERS_DICTIONARY[sex]}</span>
                                </label>
                               </div>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Описание тренировки</h2>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <textarea name="description" placeholder=" " value={creatingData.description}
                              onChange={onChange}>
                            </textarea>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label">{video ? video.name :'Загрузите сюда файлы формата MOV, AVI или MP4'}
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg></span>
                            <input type="file" name="video" accept=".mov, .avi, .mp4" onChange={handleVideoUpload}/>
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="btn create-training__button" type="submit">Опубликовать</button>
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

export default CreateTraining;
