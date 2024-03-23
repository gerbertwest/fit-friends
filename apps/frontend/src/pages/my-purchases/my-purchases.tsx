import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { useAppSelector, useAppDispatch } from "../../hooks/index";
import { userOrdersSelector } from "../../store/training/selectors";
import { fetchUserOrdersAction } from "../../store/api-actions";
import { useEffect, useState } from "react";
import { AppRoute, DEFAULT_ORDERS_COUNT_LIMIT, STATIC_DIRECTORY } from "../../const";
import LoadingScreen from "../loading-screen/loading-screen";

function MyPurchases(): JSX.Element {

  const DEFAULT_PAGE = 1;

  const orders = useAppSelector(userOrdersSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [active, setActive] = useState(false);
  const [page, setPage] = useState<number>(DEFAULT_PAGE)

  const onChange = () => {
    setActive(!active)
  }

  useEffect(() => {
    const queryString = `?limit=${DEFAULT_ORDERS_COUNT_LIMIT}&active=${active}&page=${page}`
    dispatch(fetchUserOrdersAction({queryString}))
  }, [active, dispatch, page])

  const backCondition = orders.data.find((item) => item.totalPageNumber > page*DEFAULT_ORDERS_COUNT_LIMIT)
  const disabledCondition = orders.data.find((item) => item.totalPageNumber <= DEFAULT_ORDERS_COUNT_LIMIT)

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <button className="btn-flat my-purchases__back" type="button" onClick={() => navigate(`${AppRoute.UserAccount}/${params.id}`)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement-1" name="user-agreement" onChange={onChange}/>
                        <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                        </span>
                        <span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                </div>
              </div>
              {orders.isLoading ? <LoadingScreen/> :
              <ul className="my-purchases__list">
                {orders.data.map((order) =>
                  <li className="my-purchases__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source type="image/webp"/>
                            <img src={`${STATIC_DIRECTORY}${order.training.backgroundImage}`} width="330" height="190" alt=""/>
                        </picture>
                      </div>
                      <p className="thumbnail-training__price">
                        <span className="thumbnail-training__price-value">{order.training.price}</span><span>₽</span>
                      </p>
                      <h2 className="thumbnail-training__title">{order.training.title}</h2>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag"><span>#{order.training.trainingType}</span></div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag"><span>#{order.training.caloriesCount}ккал</span></div>
                          </li>
                        </ul>
                        <div className="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg><span className="thumbnail-training__rate-value">{order.training.raiting}</span>
                        </div>
                      </div>
                      <div className="thumbnail-training__text-wrapper">
                        <p className="thumbnail-training__text">{order.training.description}</p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <Link className="btn btn--small thumbnail-training__button-catalog" to={`${AppRoute.Training}/${order.training.trainingId}`}>Подробнее</Link>
                        <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={`${AppRoute.Training}/${order.training.trainingId}`}>Отзывы</Link>
                      </div>
                    </div>
                  </div>
                </li>
                )}
              </ul>
              }
              {orders.data.length !== 0 ?
                <div className="show-more my-orders__show-more">
                {backCondition !== undefined || disabledCondition !== undefined ?
                  <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(page + 1)}
                  disabled={disabledCondition !== undefined ? true : false}>Показать еще</button>
                :
                <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(1)}>Вернуться в начало</button>
                }
              </div> :
              'Покупок нет'
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default MyPurchases;
