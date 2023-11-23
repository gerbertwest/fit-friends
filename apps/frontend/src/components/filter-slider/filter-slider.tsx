import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type FilterSliderProps = {
  minCountName: string,
  maxCountName: string,
  minCount: number,
  maxCount: number
  onChange: (minName:string, maxName:string, count: number[]) => void;
}

function FilterSlider(props: FilterSliderProps): JSX.Element {
  return (
    <Slider range className="filter-range__control" min={props.minCount} max={props.maxCount}
      defaultValue={[props.minCount, props.maxCount]}
      onChange={(_count) => {const count = _count as number[]; props.onChange(props.minCountName, props.maxCountName, count)}}
      styles={{track: { backgroundColor: "black", height: 1 }, rail: {backgroundColor: "#aeaeae", height: 1},
      handle: {
        borderColor: "black",
        height: 16,
        width: 16,
        marginLeft: 0,
        marginTop: -8,
        backgroundColor: "black",
        boxShadow: "none"
      }
      }}
    />
  )
}

export default FilterSlider
