import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { AppRoute, STATIC_DIRECTORY } from "../../const";
import { Training } from "../../types/training";
import { Fragment, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type SpecialOffersCarouselProp = {
  specTrainings?: Training[],
  error?: boolean,
}

function SpecialOffersCarousel(props: SpecialOffersCarouselProp): JSX.Element {

  const dots = [...Array(props.specTrainings?.length).keys()];

  const sliderRef = useRef<Slider>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (next: number) => setSlideIndex(next),
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider
    {...settings}
    ref={sliderRef}
    >
      {
        props.error === false ?
        props.specTrainings?.map((spec, i) => (
        <li className="special-offers__item is-active" key={i}>

          <aside className="promo-slider">
            <div className="promo-slider__overlay"></div>
            <Link to={`${AppRoute.Training}/${spec.id}`}>
            <div className="promo-slider__image">
              <img src={`${STATIC_DIRECTORY}${spec.backgroundImage}`} height="469" alt="promo"/>
            </div>

            <div className="promo-slider__header">
              <h3 className="promo-slider__title">{spec.title}</h3>
              <div className="promo-slider__logo">
                <svg width="74" height="74" aria-hidden="true">
                  <use xlinkHref="#logotype"></use>
                </svg>
              </div>
            </div>
            <span className="promo-slider__text">Горячие предложения на {spec.description}</span>
            </Link>
            <div className="promo-slider__bottom-container">
              <div className="promo-slider__slider-dots">
                {
                  dots.map((dot) => (
                    <Fragment key={dot}>
                      {dot === slideIndex ?
                        <button className="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="первый слайд"></button> :
                        <button className="promo-slider__slider-dot" aria-label="второй слайд" onClick={() => {sliderRef.current?.slickGoTo(dot)}}></button>
                      }
                    </Fragment>
                  ))
                }
              </div>
              <div className="promo-slider__price-container">
                <p className="promo-slider__price">{spec.price*0.9} ₽</p>
                <p className="promo-slider__sup">за занятие</p>
                <p className="promo-slider__old-price">{spec.price} ₽</p>
              </div>
            </div>
          </aside>
        </li>
        )) :
        <div className="thumbnail-spec-gym">
        <div className="thumbnail-spec-gym__image">
          <picture>
            <source type="image/webp" srcSet="public/img/content/thumbnails/nearest-gym-01.webp, public/img/content/thumbnails/nearest-gym-01@2x.webp 2x"/>
              <img src="public/img/content/thumbnails/nearest-gym-01.jpg" srcSet="public/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt=""/>
          </picture>
        </div>
        <div className="thumbnail-spec-gym__header">
          <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
        </div>
      </div>
      }
      </Slider>
  );
};

export default SpecialOffersCarousel;
