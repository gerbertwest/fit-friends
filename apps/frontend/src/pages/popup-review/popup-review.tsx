import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { NewReview } from "../../types/new-review";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/index";
import { createReview } from "../../store/api-actions";

type PopupReviewProps = {
  onClose: () => void;
};

const ratingCount = 5;
const ratingNumbers = [...Array(ratingCount).keys()].map( i => i + 1);

function PopupReview(props: PopupReviewProps): JSX.Element {

  const rootRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    message: '',
    raiting: 0,
  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setData({...data, [target.name]: target.value});
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const formData: NewReview = {
      message: data.message,
      raiting: Number(data.raiting),
      trainingId: Number(params.id)
    };
    dispatch(createReview(formData));
    props.onClose();
    window.location.reload();
  };

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        props.onClose();
      }
    };
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };

    window.addEventListener("click", handleWrapperClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("click", handleWrapperClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [props, props.onClose]);

  return (
        <div className="popup-form popup-form--feedback">
          <section className="popup" ref={rootRef}>
           <form method="get" onSubmit={handleSubmit}>
            <div className="popup__wrapper">
              <div className="popup-head">
                <h2 className="popup-head__header">Оставить отзыв</h2>
                <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={props.onClose}>
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              </div>
              <div className="popup__content popup__content--feedback">
                <h3 className="popup__feedback-title">Оцените тренировку</h3>
                <ul className="popup__rate-list">
                  {ratingNumbers.map((number) => (
                    <li className="popup__rate-item">
                    <div className="popup__rate-item-wrap">
                      <label>
                        <input type="radio" name="raiting" aria-label={`оценка ${number}.`} value={number} required onChange={onChange}/>
                        <span className="popup__rate-number">{number}</span>
                      </label>
                    </div>
                  </li>
                  ))}
                </ul>
                <div className="popup__feedback">
                  <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
                  <div className="popup__feedback-textarea">
                    <div className="custom-textarea">
                      <label>
                        <textarea name="message" placeholder=" " autoFocus required minLength={100} maxLength={1024}
                          value={data.message} onChange={onChange}>
                        </textarea>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="popup__button">
                  <button className="btn" type="submit">Продолжить</button>
                </div>
              </div>
            </div>
           </form>
          </section>
        </div>
  )
}

export default PopupReview;
