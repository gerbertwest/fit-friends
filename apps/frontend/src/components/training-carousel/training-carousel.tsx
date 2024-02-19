import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { AppRoute, STATIC_DIRECTORY } from '../../const';
import { Link } from 'react-router-dom';
import { Training } from '../../types/training';
import { RefObject } from 'react';

type TrainingCarouselProp = {
  trainings?: Training[],
  error?: boolean,
  sliderRef?: RefObject<Slider>
}

function TrainingCarousel(props: TrainingCarouselProp): JSX.Element {

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
        <li className="popular-trainings__item">
        <div className="thumbnail-training">
          <div className="thumbnail-training__inner">
            <div className="thumbnail-training__image">
              <picture>
                <source type="image/webp"/>
                  <img src={`${STATIC_DIRECTORY}${training.backgroundImage}`} width="330" height="190" alt=""/>
              </picture>
            </div>
            <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{training.price}</span><span>₽</span>
            </p>
            <h3 className="thumbnail-training__title">{training.title}</h3>
            <div className="thumbnail-training__info">
              <ul className="thumbnail-training__hashtags-list">
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag"><span>#{training.trainingType}</span></div>
                </li>
                <li className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag"><span>#{training.caloriesCount}ккал</span></div>
                </li>
              </ul>
              <div className="thumbnail-training__rate">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg><span className="thumbnail-training__rate-value">{training.raiting}</span>
              </div>
            </div>
            <div className="thumbnail-training__text-wrapper">
              <p className="thumbnail-training__text">{training.description}</p>
            </div>
            <div className="thumbnail-training__button-wrapper">
              <Link className="btn btn--small thumbnail-training__button-catalog" to={`${AppRoute.Training}/${training.id}`}>Подробнее</Link>
              <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={`${AppRoute.Training}/${training.id}`}>Отзывы</Link>
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
  );
};

export default TrainingCarousel;
