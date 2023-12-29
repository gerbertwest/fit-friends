import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { useAppSelector, useAppDispatch } from "../../hooks/index";
import { usersSelector } from "../../store/user/selectors";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchUsers } from "../../store/api-actions";
import { AppRoute, DEFAULT_USERS_COUNT_LIMIT, LEVELS, LOCATIONS, STATIC_DIRECTORY, TRAINING_TYPES } from "../../const";
import { getUsersQueryString, ucFirst } from "../../util";

function UserCalatogScreen(): JSX.Element {

  const POINTS_COUNT = 3

  type Filter = {
    locations: string[],
    types: string[],
    level: string
  }

  const DEFAULT_FILTERS: Filter = {
    locations: [],
    types: [],
    level: '',
  }
  const DEFAULT_PAGE = 1;

  const users = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortDirection, setSortDirection] = useState('desc');
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [moreLocations, setMoreLocations] = useState(false);
  const [moreTypes, setMoreTypes] = useState(false);

  useEffect(() => {
    const queryString = getUsersQueryString({
      trainingTypes: filters.types,
      level: filters.level,
      locations: filters.locations,
      sortDirection: sortDirection,
      page: page
    })
    dispatch(fetchUsers({queryString}))
  }, [dispatch, filters.level, filters.locations, filters.types, page, sortDirection]);

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFilters({...filters, [target.name]: target.value});
  };

  const changeFilterType = (value: string) => {
    if (filters.types) {
    const ind = filters.types.indexOf(value);
    if (ind === -1) {
      setFilters({...filters, types: [...filters.types, value]});
    }
    else {
      setFilters({...filters, types: filters.types.filter((val) => val !== value)});
    }
   }
  };

  const changeFilterLocation = (value: string) => {
    if (filters.locations) {
    const ind = filters.locations.indexOf(value);
    if (ind === -1) {
      setFilters({...filters, locations: [...filters.locations, value]});
    }
    else {
      setFilters({...filters, locations: filters.locations.filter((val) => val !== value)});
    }
   }
  };

  const onChangeFilterType = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    changeFilterType(target.value);
  };

  const onChangeFilterLocation = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    changeFilterLocation(target.value);
  };

  const backCondition = users.data.find((item) => item.totalPageNumber && item.totalPageNumber > page*DEFAULT_USERS_COUNT_LIMIT)
  const disabledCondition = users.data.find((item) => item.totalPageNumber && item.totalPageNumber <= DEFAULT_USERS_COUNT_LIMIT)

  let locations = LOCATIONS.slice(0, POINTS_COUNT);
  if (moreLocations) {
    locations = LOCATIONS
  }

  let trainingTypes = TRAINING_TYPES.slice(0, POINTS_COUNT);
  if (moreTypes) {
    trainingTypes = TRAINING_TYPES
  }


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <button className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button" onClick={() => navigate(`${AppRoute.Main}/${params.id}`)}>
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <form className="user-catalog-form__form">
                    <div className="user-catalog-form__block user-catalog-form__block--location">
                      <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
                      <ul className="user-catalog-form__check-list">
                        {locations.map((location) => (
                          <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={location} name="user-agreement" onChange={onChangeFilterLocation}/>
                                <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">{ucFirst(location)}</span>
                            </label>
                          </div>
                        </li>
                        ))}
                      </ul>
                      <button className="btn-show-more user-catalog-form__btn-show" type="button" onClick={() => setMoreLocations(true)}>
                        <span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                      <h4 className="user-catalog-form__block-title">Специализация</h4>
                      <ul className="user-catalog-form__check-list">
                        {trainingTypes.map((type) => (
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={type} name="spezialization" onChange={onChangeFilterType}/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">{ucFirst(type)}</span>
                            </label>
                          </div>
                        </li>
                        ))}
                      </ul>
                      <button className="btn-show-more user-catalog-form__btn-show" type="button" onClick={() => setMoreTypes(true)}>
                        <span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--level">
                      <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
                      <div className="custom-toggle-radio">
                        {LEVELS.map((level) => (
                          <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="level" value={level} onChange={onChange}/>
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">{ucFirst(level)}</span>
                          </label>
                        </div>
                        ))}
                      </div>
                    </div>
                    <div className="user-catalog-form__block">
                      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                      <div className="btn-radio-sort">
                        <label>
                          <input type="radio" name="sort" checked={sortDirection === 'desc' ? true : false} onChange={() => {setSortDirection('desc'); setFilters(DEFAULT_FILTERS)}}/>
                          <span className="btn-radio-sort__label">Тренеры</span>
                        </label>
                        <label>
                          <input type="radio" name="sort" checked={sortDirection === 'asc' ? true : false} onChange={() => {setSortDirection('asc'); setFilters(DEFAULT_FILTERS)}}/>
                          <span className="btn-radio-sort__label">Пользователи</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {
                      users.data.map((user) => (
                    <li className="users-catalog__item">
                      <div className={`thumbnail-user thumbnail-user--role-${user.role === 'Пользователь' ? 'user' : 'coach'}`}>
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
                          {user.trainingType?.map((type) => (
                            <li className="thumbnail-user__hashtags-item">
                              <div className="hashtag thumbnail-user__hashtag"><span>#{type}</span></div>
                            </li>
                          ))}
                        </ul>
                        <Link className="btn btn--medium thumbnail-user__button"
                          to={user.role === 'Пользователь' ? `${AppRoute.User}/${user.id}` : `${AppRoute.Trainer}/${user.id}`}>Подробнее</Link>
                      </div>
                    </li>
                      ))
                    }
                  </ul>
                  <div className="show-more users-catalog__show-more">
                    {
                      backCondition !== undefined || disabledCondition !== undefined ?
                      <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(page + 1)}
                        disabled={disabledCondition !== undefined ? true : false}>
                          Показать еще
                      </button>
                      :
                      <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(1)}>
                          Вернуться в начало
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default UserCalatogScreen;
