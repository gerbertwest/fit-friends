import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Training } from "../../types/training";
import { STATIC_DIRECTORY } from "../../const";
import { NewOrder } from "../../types/new-order";
import { createOrder, fetchOrderAction } from "../../store/api-actions";
import { useAppDispatch } from "../../hooks/index";

type PopupBuyProps = {
  onClose: () => void;
  training: Training | null;
  userId: string | undefined;
};

function PopupBuy(props: PopupBuyProps): JSX.Element {

  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

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

  const [data, setData] = useState({
    paymentMethod: '',
    count: 0,
  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setData({...data, [target.name]: target.value});
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (props.training?.id && props.userId) {
      const formData: NewOrder = {
        count: data.count,
        paymentMethod: data.paymentMethod,
        trainingId: props.training?.id,
        type: 'абонемент',
        userId: props.userId
      };
      dispatch(createOrder(formData));
    }

    props.onClose();
    window.location.reload();
  };

  return (
    <div className="popup-form popup-form--buy">
          <section className="popup" ref={rootRef}>
           <form method="get" onSubmit={handleSubmit}>
            <div className="popup__wrapper">
              <div className="popup-head">
                <h2 className="popup-head__header">Купить тренировку</h2>
                <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={props.onClose}>
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              </div>
              <div className="popup__content popup__content--purchases">
                <div className="popup__product">
                  <div className="popup__product-image">
                    <picture>
                      <source type="image/webp"/>
                        <img src={`${STATIC_DIRECTORY}${props.training?.backgroundImage}`} width="98" height="80" alt=""/>
                    </picture>
                  </div>
                  <div className="popup__product-info">
                    <h3 className="popup__product-title">{props.training?.title}</h3>
                    <p className="popup__product-price">{props.training?.price} ₽</p>
                  </div>
                  <div className="popup__product-quantity">
                    <p className="popup__quantity">Количество</p>
                    <div className="input-quantity">
                      <button className="btn-icon btn-icon--quantity" type="button" aria-label="minus"
                      onClick={() => setData({...data, count: data.count - 1})} disabled={data.count === 0}>
                        <svg width="12" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-minus"></use>
                        </svg>
                      </button>
                      <div className="input-quantity__input">
                        <label>
                          <input type="text" name="count" value={data.count} size={2} onChange={onChange}/>
                        </label>
                      </div>
                      <button className="btn-icon btn-icon--quantity" type="button" aria-label="plus"
                      onClick={() => setData({...data, count: data.count + 1})} disabled={data.count === 50}>
                        <svg width="12" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-plus"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <section className="payment-method">
                  <h4 className="payment-method__title">Выберите способ оплаты</h4>
                  <ul className="payment-method__list">
                    <li className="payment-method__item">
                      <div className="btn-radio-image">
                        <label>
                          <input type="radio" name="paymentMethod" aria-label="Visa." value={'visa'} onChange={onChange} required/>
                          <span className="btn-radio-image__image">
                            <svg width="58" height="20" aria-hidden="true">
                              <use xlinkHref="#visa-logo"></use>
                            </svg>
                          </span>
                        </label>
                      </div>
                    </li>
                    <li className="payment-method__item">
                      <div className="btn-radio-image">
                        <label>
                          <input type="radio" name="paymentMethod" aria-label="Мир." value={'mir'} onChange={onChange} required/>
                          <span className="btn-radio-image__image">
                            <svg width="66" height="20" aria-hidden="true">
                              <use xlinkHref="#mir-logo"></use>
                            </svg></span>
                        </label>
                      </div>
                    </li>
                    <li className="payment-method__item">
                      <div className="btn-radio-image">
                        <label>
                          <input type="radio" name="paymentMethod" aria-label="Iomoney." value={'umoney'} onChange={onChange} required/>
                          <span className="btn-radio-image__image">
                            <svg width="106" height="24" aria-hidden="true">
                              <use xlinkHref="#iomoney-logo"></use>
                            </svg></span>
                        </label>
                      </div>
                    </li>
                  </ul>
                </section>
                <div className="popup__total">
                  <p className="popup__total-text">Итого</p>
                  <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                    <use xlinkHref="#dash-line"></use>
                  </svg>
                  <p className="popup__total-price">{props.training?.price && props.training?.price * data.count}₽</p>
                </div>
                <div className="popup__button">
                  <button className="btn" type="submit">Купить</button>
                </div>
              </div>
            </div>
           </form>
          </section>
        </div>
  )
}

export default PopupBuy;
