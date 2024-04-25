import { ChangeEventHandler } from "react";
import { ucFirst } from "../../util";
import { LEVELS } from "../../const";

type LevelCheckboxProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function LevelCheckbox(props: LevelCheckboxProps): JSX.Element {
  return (
    <>
    {LEVELS.map((level, i) => (
      <div className="custom-toggle-radio__block" key={i}>
        <label>
          <input type="radio" name="level" value={level} onChange={props.onChange} required/>
            <span className="custom-toggle-radio__icon"></span>
            <span className="custom-toggle-radio__label">{ucFirst(level)}</span>
        </label>
      </div>
    ))}
    </>
  )
}

export default LevelCheckbox;
