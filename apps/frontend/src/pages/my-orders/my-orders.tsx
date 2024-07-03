import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useAppSelector, useAppDispatch } from "../../hooks/index";
import { trainerOrdersSelector } from "../../store/training/selectors";
import { fetchTrainerOrdersAction } from "../../store/api-actions";
import { AppRoute, DEFAULT_ORDERS_COUNT_LIMIT, STATIC_DIRECTORY } from "../../const";
import { Link, useNavigate } from "react-router-dom";
import { getSortQueryString } from "../../util";
import LoadingScreen from "../loading-screen/loading-screen";

function MyOrders(): JSX.Element {

  const DEFAULT_SORT = {
    sortField: 'idCount',
    sortDirection: 'desc'
  }

  const DEFAULT_PAGE = 1;

  const orders = useAppSelector(trainerOrdersSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sort, setSort] = useState(DEFAULT_SORT);
  const [page, setPage] = useState<number>(DEFAULT_PAGE)

  const onChange = (value: string) => {
    sort.sortDirection === 'desc' ? setSort({...sort, sortField: value, sortDirection: 'asc'}) : setSort({...sort, sortField: value, sortDirection: 'desc'})
  };

  useEffect(() => {
    const queryString = getSortQueryString({
      sortDirection: sort.sortDirection,
      sortField: sort.sortField,
      page: page,
    })
    dispatch(fetchTrainerOrdersAction({queryString}))
  }, [dispatch, page, sort.sortDirection, sort.sortField])

  const backCondition = orders.data.find((item) => item.totalPageNumber > page*DEFAULT_ORDERS_COUNT_LIMIT)
  const disabledCondition = orders.data.find((item) => item.totalPageNumber <= DEFAULT_ORDERS_COUNT_LIMIT)

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <button className="btn-flat btn-flat--underlined my-orders__back" type="button" onClick={() => navigate(-1)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button className="btn-filter-sort" type="button" onClick={() => onChange('totalPrice')}><span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-up"></use>
                      </svg>
                    </button>
                    <button className="btn-filter-sort" type="button" onClick={() => onChange('idCount')}><span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-down"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {orders.isLoading ? <LoadingScreen/> :
              <ul className="my-orders__list">
                {orders.data.map((order, i) =>
                    <li className="my-orders__item" key={i}>
                    <div className="thumbnail-training">
                      <div className="thumbnail-training__inner">
                        <div className="thumbnail-training__image">
                          <picture>
                            <source type="image/webp"/>
                              <img src={`${STATIC_DIRECTORY}${order.training.backgroundImage}`} width="330" height="190" alt=""/>
                          </picture>
                        </div>
                        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{order.training.price}</span><span>₽</span>
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
                        <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to={`${AppRoute.Training}/${order.training.trainingId}`}>
                          <svg width="18" height="18" aria-hidden="true">
                            <use xlinkHref="#icon-info"></use>
                          </svg><span>Подробнее</span>
                        </Link>
                      </div>
                      <div className="thumbnail-training__total-info">
                        <div className="thumbnail-training__total-info-card">
                          <svg width="32" height="32" aria-hidden="true">
                            <use xlinkHref="#icon-chart"></use>
                          </svg>
                          <p className="thumbnail-training__total-info-value">{order.idCount}</p>
                          <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
                        </div>
                        <div className="thumbnail-training__total-info-card">
                          <svg width="31" height="28" aria-hidden="true">
                            <use xlinkHref="#icon-wallet"></use>
                          </svg>
                          <p className="thumbnail-training__total-info-value">{order.totalPrice}<span>₽</span></p>
                          <p className="thumbnail-training__total-info-text">Общая сумма</p>
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
              'Заказов нет'
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default MyOrders;
