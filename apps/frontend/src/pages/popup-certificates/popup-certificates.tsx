import { useEffect, useRef } from "react";
import { User } from "../../types/user";
import { STATIC_DIRECTORY } from "../../const";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';

type PopupCertificatesProps = {
  onClose: () => void;
  user: User | null
};

function PopupCertificates(props: PopupCertificatesProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

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

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const sliderCert = useRef<Slider>(null);
  const nextCert = () => {
    sliderCert.current?.slickNext();
  };
  const previousCert = () => {
    sliderCert.current?.slickPrev();
  };

  return (
    <div className="popup-form">
    <section className="popup" ref={rootRef}>
      <h2 className="visually-hidden">Слайдер с сертификатами.</h2>
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Сертификаты</h2>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={props.onClose}>
            <svg width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-cross"></use>
            </svg>
          </button>
        </div>
        <div className="popup__content popup__content--certificates">
          <div className="popup__slider-buttons">
            <button className="btn-icon popup__slider-btn popup__slider-btn--prev" type="button" aria-label="prev" onClick={previousCert}>
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button className="btn-icon popup__slider-btn popup__slider-btn--next" type="button" aria-label="next" onClick={nextCert}>
              <svg width="16" height="14" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
            <Slider
            ref={sliderCert}
            {...settings}
            >
            {props.user?.certificates?.map((cert) => (
            <li className="popup__slide popup__slide--current">
              <div className="popup__slide-img">
                <picture>
                  <source type="application/pdf" srcSet={`${STATIC_DIRECTORY}${cert}`}/>
                    <embed src={`${STATIC_DIRECTORY}${cert}`} width="294" height="360"/>
                </picture>
              </div>
            </li>
            ))}
            </Slider>
        </div>
      </div>
    </section>
  </div>
  )
}

export default PopupCertificates;
