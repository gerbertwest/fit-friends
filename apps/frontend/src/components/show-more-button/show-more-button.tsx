import { MouseEventHandler } from "react"
import { Training } from "../../types/training"
import { User } from "../../types/user"

type ShowMoreButtonProp = {
  backCondition: Training | User | undefined,
  disabledCondition: Training | User | undefined,
  onClick: MouseEventHandler<HTMLButtonElement>,
  onClickBack: MouseEventHandler<HTMLButtonElement>,
  page: number
}

function ShowMoreButton(props: ShowMoreButtonProp): JSX.Element {
  return (
    <div className="show-more my-trainings__show-more">
      {props.backCondition !== undefined || props.disabledCondition !== undefined ?
        <button className="btn show-more__button show-more__button--more" type="button" onClick={props.onClick}
        disabled={props.disabledCondition !== undefined ? true : false}>Показать еще</button>
      :
      <button className="btn show-more__button show-more__button--more" type="button" onClick={props.onClickBack}>Вернуться в начало</button>
      }
    </div>
  )
}

export default ShowMoreButton;
