import { ChangeEventHandler } from "react";
import { TRAINING_TYPES } from "../../const";
import { ucFirst } from "../../util";

type SpecializationCheckboxProps = {
  onChangeType?: ChangeEventHandler<HTMLInputElement>;
  trainingType?: string[];
  editStatus?: boolean;
}

function SpecializationCheckbox(props: SpecializationCheckboxProps): JSX.Element {

  const isDisabled = (id: string) => {
    if (props.trainingType) {
    return props.editStatus === false || props.trainingType?.length > 2 && props.trainingType.indexOf(id) === -1
    }
  }

  return (
    <>
    {TRAINING_TYPES.map((type, i) => (
    <div className="btn-checkbox" key={i}>
      <label>
        <input className="visually-hidden" type="checkbox" name="trainingType" value={type}
        onChange={props.onChangeType}
        disabled={isDisabled(type)}
        checked={props.trainingType && props.trainingType.indexOf(type) === -1 ? false : true}/>
        <span className="btn-checkbox__btn">{ucFirst(type)}</span>
      </label>
    </div>
    ))}
    </>
  )
}

export default SpecializationCheckbox;
