import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { Training } from '../../types/training';
import { RefObject } from 'react';
import { AppRoute, STATIC_DIRECTORY } from '../../const';
import { Link } from 'react-router-dom';

type SpecTrainingCarouselProp = {
  trainings?: Training[],
  error?: boolean,
  sliderRef?: RefObject<Slider>
}

function SpecTrainingCarousel(props: SpecTrainingCarouselProp): JSX.Element {

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  return (
    <Slider
      ref={props.sliderRef}
      {...settings}
    >
      {
        props.error === false ?
        props.trainings?.map((training) => (
        <li className="special-for-you__item">
         <div className="thumbnail-preview">
          <div className="thumbnail-preview__image">
            <picture>
              <source type="image/webp"/>
                <img src={`${STATIC_DIRECTORY}${training.backgroundImage}`} width="452" height="191" alt=""/>
            </picture>
          </div>
          <div className="thumbnail-preview__inner">
            <h3 className="thumbnail-preview__title">{training.title}</h3>
            <div className="thumbnail-preview__button-wrapper">
              <Link className="btn btn--small thumbnail-preview__button" to={`${AppRoute.Training}/${training.id}`}>Подробнее</Link>
            </div>
          </div>
         </div>
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

  )
}

export default SpecTrainingCarousel;

