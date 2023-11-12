import { ChangeEventHandler } from "react";
import { TRAINING_TYPES } from "../../const";
import { ucFirst } from "../../util";

type SpecializationCheckboxProps = {
  onChangeType: ChangeEventHandler<HTMLInputElement>;
}

function SpecializationCheckbox(props: SpecializationCheckboxProps): JSX.Element {
  return (
    <>
    {TRAINING_TYPES.map((type) => (
    <div className="btn-checkbox">
      <label>
        <input className="visually-hidden" type="checkbox" name="trainingType" value={type} onChange={props.onChangeType}/>
        <span className="btn-checkbox__btn">{ucFirst(type)}</span>
      </label>
    </div>
    ))}
    </>
  )
}

export default SpecializationCheckbox;
