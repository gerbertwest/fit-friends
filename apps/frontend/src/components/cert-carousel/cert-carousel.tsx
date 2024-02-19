import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider, { Settings } from 'react-slick';
import { RefObject, useState } from 'react';
import { STATIC_DIRECTORY } from '../../const';

type CertCarouselProp = {
  certificates?: string[],
  sliderRef?: RefObject<Slider>,
  handleChangeCertificate: (cert: string, evt: React.ChangeEvent<HTMLInputElement>) => void,
  handleCertificateDelete: (cert: string) => void,
}

function CertCarousel(props: CertCarouselProp): JSX.Element {

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  const [certEditStatus, setCertEditStatus] = useState(
    {
      key: '',
      status: false
    });

  return (
    <Slider
      ref={props.sliderRef}
      {...settings}
      className='personal-account-coach__list'
    >
    {props.certificates ? props?.certificates.map((cert) => (
      <li className="personal-account-coach__item" key={cert}>
      <div className="certificate-card certificate-card--edit">
        <div className="certificate-card__image">
          <picture>
            <source type="application/pdf" srcSet={`${STATIC_DIRECTORY}${cert}`}/>
              <embed src={`${STATIC_DIRECTORY}${cert}`} width="294" height="360"/>
          </picture>
        </div>
        <div className="certificate-card__buttons">
          {certEditStatus.status === true && certEditStatus.key === cert ?
          <>
          <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button"
          onClick={() => setCertEditStatus({key: cert, status: false})}>
            <svg width="12" height="12" >
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Сохранить</span>
          </button>
          <div className="certificate-card__controls">
          <form className="btn-icon certificate-card__control" aria-label="next">
            <label htmlFor="cert">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change"></use>
            </svg>
            </label>
          </form>
          <input
            type="file"
            name="cert"
            id="cert"
            accept=".pdf"
            hidden
            onChange={(evt) => props.handleChangeCertificate(cert, evt)}
            >
          </input>
          <button className="btn-icon certificate-card__control" type="button" aria-label="next" onClick={() => props.handleCertificateDelete(cert)}>
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-trash"></use>
            </svg>
          </button>
          </div>
          </>
          :
          <button className="btn-flat btn-flat--underlined " type="button" onClick={() => setCertEditStatus({status: true, key: cert})}>
            <svg width="12" height="12" >
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Изменить</span>
          </button>
          }
        </div>
      </div>
      </li>
    )) : ''
    }
    </Slider>
  )
};

export default CertCarousel;
