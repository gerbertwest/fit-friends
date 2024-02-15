import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useRef } from 'react';
import { User } from '../../types/user';
import { AppRoute, STATIC_DIRECTORY, UserRole } from '../../const';
import { Link, useNavigate, useParams } from 'react-router-dom';

type CarouselProp = {
  data: User[],
  error: boolean
}

function SimpleCarousel(props: CarouselProp): JSX.Element {

  const params = useParams();
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    //dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="look-for-company__wrapper">
      <div className="look-for-company__title-wrapper">
        <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
              <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={() => navigate(`${AppRoute.UserCatalog}/${params.id}`)}>
                <span>Смотреть все</span>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
              <div className="look-for-company__controls">
                <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous" onClick={previous}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next" onClick={next}>
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>


            <Slider
              ref={sliderRef}
              {...settings}
            >
              {
                props.error === false ?
                props.data.map((user) => (
                  <li className="look-for-company__item">
                  <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div className="thumbnail-user__image">
                      <picture>
                        <source type="image/webp"/>
                          <img src={`${STATIC_DIRECTORY}${user.avatar}`} width="82" height="82" alt=""/>
                      </picture>
                    </div>
                    <div className="thumbnail-user__header">
                      <h3 className="thumbnail-user__name">{user.name}</h3>
                      <div className="thumbnail-user__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-user__location-address">{user.location}</address>
                      </div>
                    </div>
                    <ul className="thumbnail-user__hashtags-list">
                      {
                        user.trainingType ? user.trainingType.map((type) => (
                          <li className="thumbnail-user__hashtags-item">
                            <div className="hashtag thumbnail-user__hashtag"><span>#{type}</span></div>
                          </li>
                        )) : ''
                      }
                    </ul>
                    <Link className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                      to={user.role === UserRole.User ? `${AppRoute.User}/${user.id}` : `${AppRoute.Trainer}/${user.id}`}>
                      Подробнее
                    </Link>
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
    </div>
  );
};

export default SimpleCarousel;
