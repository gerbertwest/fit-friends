import { useEffect } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { userFriendsSelector, userRequests } from "../../store/user/selectors";
import { fetchMyFriends, fetchRequestsByUser } from "../../store/api-actions";
import { STATIC_DIRECTORY } from "../../const";

function FriendsListCoach(): JSX.Element {

  const myFriends = useAppSelector(userFriendsSelector);
  const requests = useAppSelector(userRequests);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMyFriends())
    dispatch(fetchRequestsByUser())
  }, [dispatch])


  const initiators = requests.data.map((req) => req.initiatorId)


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {myFriends.data.map((friend) =>
                <li className="friends-list__item">
                 <div className="thumbnail-friend">
                  <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                    <div className="thumbnail-friend__image-status">
                      <div className="thumbnail-friend__image">
                        <picture>
                          <source type="image/webp"/>
                            <img src={`${STATIC_DIRECTORY}${friend.avatar}`} width="78" height="78" alt=""/>
                        </picture>
                      </div>
                    </div>
                    <div className="thumbnail-friend__header">
                      <h2 className="thumbnail-friend__name">{friend.name}</h2>
                      <div className="thumbnail-friend__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-friend__location-address">{friend.location}</address>
                      </div>
                    </div>
                    <ul className="thumbnail-friend__training-types-list">
                      {friend.trainingType?.map((type) =>
                      <li>
                        <div className="hashtag thumbnail-friend__hashtag"><span>#{type}</span></div>
                      </li>
                      )}
                    </ul>
                    {friend.readyToTraining ?
                    <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                      </div>
                    </div> :
                    <div className="thumbnail-friend__activity-bar">
                      <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не&nbsp;готов к&nbsp;тренировке</span>
                      </div>
                    </div>}
                    </div>
                    {friend.id && initiators.includes(friend.id) ?
                    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                        <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                      <div className="thumbnail-friend__button-wrapper">
                        <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                        <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
                      </div>
                    </div> : ''}
                 </div>
                </li>
                )}

                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-14.webp, public/img/content/thumbnails/friend-14@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-14.jpg" srcSet="public/img/content/thumbnails/friend-14@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">Виктория</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Технологический институт II</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#аэробика</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                      <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                      <div className="thumbnail-friend__button-wrapper">
                        <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                        <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-15.webp, public/img/content/thumbnails/friend-15@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-15.jpg" srcSet="public/img/content/thumbnails/friend-15@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">Кристина</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Политехническая</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#бокс</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                      <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                      <div className="thumbnail-friend__button-wrapper">
                        <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                        <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-16.webp, public/img/content/thumbnails/friend-16@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-16.jpg" srcSet="public/img/content/thumbnails/friend-16@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">Алексей</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Обухово</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#кроссфит</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
                      <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
                      <div className="thumbnail-friend__button-wrapper">
                        <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
                        <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-17.webp, public/img/content/thumbnails/friend-17@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-17.jpg" srcSet="public/img/content/thumbnails/friend-17@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">Катерина</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Фрунзенская</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#аэробика</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не&nbsp;готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-18.webp, public/img/content/thumbnails/friend-18@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-18.jpg" srcSet="public/img/content/thumbnails/friend-18@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">Ксения</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Звенигородская</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#бокс</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-19.webp, public/img/content/thumbnails/friend-19@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-19.jpg" srcSet="public/img/content/thumbnails/friend-19@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">Алиса</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Чёрная речка</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#стретчинг</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не&nbsp;готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-20.webp, public/img/content/thumbnails/friend-20@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-20.jpg" srcSet="public/img/content/thumbnails/friend-20@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">Алёна</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Крестовский остров</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#кроссфит</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-21.webp, public/img/content/thumbnails/friend-21@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-21.jpg" srcSet="public/img/content/thumbnails/friend-21@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">София</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Электросила</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#кроссфит</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready"><span>Не&nbsp;готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="friends-list__item">
                  <div className="thumbnail-friend">
                    <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
                      <div className="thumbnail-friend__image-status">
                        <div className="thumbnail-friend__image">
                          <picture>
                            <source type="image/webp" srcSet="public/img/content/thumbnails/friend-09.webp, public/img/content/thumbnails/friend-09@2x.webp 2x"/>
                              <img src="public/img/content/thumbnails/friend-09.jpg" srcSet="public/img/content/thumbnails/friend-09@2x.jpg 2x" width="78" height="78" alt=""/>
                          </picture>
                        </div>
                      </div>
                      <div className="thumbnail-friend__header">
                        <h2 className="thumbnail-friend__name">Валерия</h2>
                        <div className="thumbnail-friend__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-friend__location-address">Московские ворота</address>
                        </div>
                      </div>
                      <ul className="thumbnail-friend__training-types-list">
                        <li>
                          <div className="hashtag thumbnail-friend__hashtag"><span>#стретчинг</span></div>
                        </li>
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="show-more friends-list__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FriendsListCoach;
