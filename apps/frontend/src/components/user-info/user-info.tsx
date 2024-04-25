import { ChangeEventHandler, MouseEventHandler } from "react"
import { LEVELS, LOCATIONS, SEX, STATIC_DIRECTORY, UserRole } from "../../const"
import { User } from "../../types/user"
import { ucFirst } from "../../util"
import SpecializationCheckbox from "../specialization-checkbox/specialization-checkbox"

type UserInfoProp = {
  role: string | undefined,
  registryData: User,
  avatar: File | undefined,
  editStatus: boolean,
  setEditStatus: React.Dispatch<React.SetStateAction<boolean>>,
  setRegistryData: React.Dispatch<React.SetStateAction<User>>,
  handleAvatarUpload: ChangeEventHandler<HTMLInputElement>,
  handleSubmit: MouseEventHandler<HTMLButtonElement>,
  handleCancel: MouseEventHandler<HTMLButtonElement>,
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  trainingType: string[] | undefined,
  onChangeType: ChangeEventHandler<HTMLInputElement>,
  readyToTraining?: boolean | undefined,
  personalTrainings?: boolean | undefined,
  onChangeReadyToTraining?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  onChangePersonalTrainings?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

function UserInfo(props: UserInfoProp): JSX.Element {
  return (
    <section className="user-info">
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="avatar" accept="image/png, image/jpeg" onChange={props.handleAvatarUpload} disabled={!props.editStatus}/>
              <span className="input-load-avatar__avatar">
              {
                  props.avatar ? (
                      <img
                      src={URL.createObjectURL(props.avatar)}
                      alt="avatar"
                      width="70" height="70" aria-hidden="true"
                    />
                    ) : props.registryData.avatar === '' ?
                    (
                      <img
                      src="public/img/content/user-photo-1.png" srcSet="public/img/content/user-photo-1@2x.png 2x"
                      alt="avatar"
                      width="70" height="70" aria-hidden="true"
                    />
                    ) :
                    <img
                      src={`${STATIC_DIRECTORY}${props.registryData.avatar}`}
                      alt="avatar"
                      width="70" height="70" aria-hidden="true"
                    />
                  }
              </span>
          </label>
        </div>
        {props.editStatus === true ?
        <div className="user-info-edit__controls">
          <button className="user-info-edit__control-btn" aria-label="обновить" type="button" onClick={props.handleSubmit} >
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change"></use>
            </svg>
          </button>
          <button className="user-info-edit__control-btn" aria-label="удалить" onClick={props.handleCancel} disabled={props.registryData.avatar === ''}>
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-trash"></use>
            </svg>
          </button>
        </div> : ''}
      </div>
      <form className="user-info__form" action="#" method="post">
        {props.editStatus === false ? <button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label="Редактировать" onClick={() => props.setEditStatus(true)}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg><span>Редактировать</span>
        </button> : ''}
        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <div className={props.editStatus ? "custom-input user-info-edit__input" : "custom-input custom-input--readonly user-info-edit__input"}>
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input type="text" name="name" value={props.registryData.name} disabled={!props.editStatus} onChange={props.onChange}/>
              </span>
            </label>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label><span className="custom-textarea__label">Описание</span>
              <textarea name="description" placeholder=" " value={props.registryData.description}
                onChange={props.onChange} readOnly={!props.editStatus}>
                {props.registryData.description}
              </textarea>
            </label>
          </div>
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
            {
             props.role === UserRole.User ?
             <label>
              <input type="checkbox" name="readyToTraining" disabled={!props.editStatus} onChange={props.onChangeReadyToTraining} checked={props.readyToTraining}/>
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
                </span>
                <span className="custom-toggle__label">Готов к тренировке</span>
              </label> :
              <label>
               <input type="checkbox" name="personalTrainings" disabled={!props.editStatus} onChange={props.onChangePersonalTrainings} checked={props.personalTrainings}/>
               <span className="custom-toggle__icon">
               <svg width="9" height="6" aria-hidden="true">
                 <use xlinkHref="#arrow-check"></use>
               </svg>
               </span>
               <span className="custom-toggle__label">Готов тренировать</span>
             </label>
            }
          </div>
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info__specialization">
            <SpecializationCheckbox onChangeType={props.onChangeType} trainingType={props.trainingType} editStatus={props.editStatus}/>
          </div>
        </div>
        <div className="custom-select--readonly custom-select user-info__select">
          <span className="custom-select__label">Локация</span>
          <select className="custom-select__button" name='location' aria-label="Выберите одну из опций" value={props.registryData.location}
            onChange={({target}) => props.setRegistryData({...props.registryData, [target.name]: target.value})} disabled={!props.editStatus}>
                {LOCATIONS.map((local, i) => (<option value={local} key={i}>{local}</option>))}
            </select>
        </div>
        <div className="custom-select--readonly custom-select user-info__select">
          <span className="custom-select__label">Пол</span>
          <select className="custom-select__button" name='sex' aria-label="Выберите одну из опций" value={props.registryData.sex}
              onChange={({target}) => props.setRegistryData({...props.registryData, [target.name]: target.value})} disabled={!props.editStatus}>
                {SEX.map((sex, i) => (<option value={sex} key={i}>{ucFirst(sex)}</option>))}
            </select>
        </div>
        <div className="custom-select--readonly custom-select user-info__select">
          <span className="custom-select__label">Уровень</span>
          <select className="custom-select__button" name='level' aria-label="Выберите одну из опций" value={props.registryData.level}
              onChange={({target}) => props.setRegistryData({...props.registryData, [target.name]: target.value})} disabled={!props.editStatus}>
                {LEVELS.map((level, i) => (<option value={level} key={i}>{ucFirst(level)}</option>))}
            </select>
        </div>
      </form>
    </section>
  )
}

export default UserInfo
