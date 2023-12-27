import { useEffect, useRef } from "react";
import { User } from "../../types/user";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { LOCATION_DICTIONARY } from "../../const";

type PopupMapProps = {
  onClose: () => void;
  user: User | null
};

const svgIcon = L.divIcon({
  html: `
  <svg
      width="40"
      height="49"
      aria-hidden="true"
    >
    <use xlink:href="#icon-pin-user"></use>
    </svg>`,
  className: "popup__pin-icon",
  iconSize: [40, 49],
  iconAnchor: [12, 49]
});

function PopupMap(props: PopupMapProps): JSX.Element {
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

  return (
      <div className="popup-form popup-form--map">
        <section className="popup" ref={rootRef}>
          <div className="popup__wrapper popup__wrapper--map">
            <div className="popup-head popup-head--address">
              <h2 className="popup-head__header">{props.user?.name}</h2>
              <p className="popup-head__address">
                <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-location"></use>
                </svg><span>м. {props.user?.location}</span>
              </p>
              <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={props.onClose}>
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div className="popup__content-map">
              <div className="popup__map">
                {props.user?.location &&
                <MapContainer center={LOCATION_DICTIONARY[props.user?.location]} zoom={15} scrollWheelZoom={true} style={{ height: '623px', width: '1160px' }}>
                  <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={LOCATION_DICTIONARY[props.user?.location]} icon={svgIcon}>
                    <Popup>
                      {props.user?.location}
                    </Popup>
                  </Marker>
                </MapContainer>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}

export default PopupMap;
