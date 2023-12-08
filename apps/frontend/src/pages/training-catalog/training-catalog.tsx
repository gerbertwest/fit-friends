import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { myTrainingsSelector } from "../../store/training/selectors";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchTrainingsAction } from "../../store/api-actions";
import { AppRoute, DEFAULT_TRAININGS_COUNT_LIMIT, STATIC_DIRECTORY, TRAINING_TYPES } from "../../const";
import FilterSlider from "../../components/filter-slider/filter-slider";
import { getQueryString } from "../../util";

function TrainingCatalogScreen(): JSX.Element {

  const DEFAULT_FILTERS = {
    minPrice: 0,
    maxPrice: 1000,
    minCalories: 1000,
    maxCalories: 5000,
    minRating: 0,
    maxRating: 5,
  }

  const DEFAULT_TYPE: string[] = [];
  const DEFAULT_PAGE = 1;

  const trainings = useAppSelector(myTrainingsSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filterType, addFilterType] = useState<string[]>(DEFAULT_TYPE)
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [sortDirection, setSortDirection] = useState('desc');

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFilters({...filters, [target.name]: target.value});
  };

  const onFilterChange = (minName: string, maxName: string, count: number[]) => {
    setFilters({...filters, [minName]: count[0], [maxName]: count[1]})
  };

  const changeFilterTime = (value: string) => {
    if (filterType) {
    const ind = filterType.indexOf(value);
    if (ind === -1) {
      addFilterType([...filterType, value]);
    }
    else {
      addFilterType(() => filterType.filter((val) => val !== value));
    }
   }
  };

  const onChangeFilterType = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    changeFilterTime(target.value);
  };

  useEffect(() => {
    const queryString = getQueryString({
      maxPrice: filters.maxPrice,
      minPrice: filters.minPrice,
      maxCaloriesCount: filters.maxCalories,
      minCaloriesCount: filters.minCalories,
      maxRaiting: filters.maxRating,
      minRaiting: filters.minRating,
      trainingTypes: filterType,
      page: page,
      sortDirection: sortDirection,
    })
    dispatch(fetchTrainingsAction({queryString}))
  }, [dispatch, filterType, filters.maxCalories, filters.maxPrice, filters.maxRating, filters.minCalories, filters.minPrice, filters.minRating, page, sortDirection])

  console.log(trainings.data)

  const backCondition = trainings.data.find((item) => item.totalPageNumber > page*DEFAULT_TRAININGS_COUNT_LIMIT)
  const disabledCondition = trainings.data.find((item) => item.totalPageNumber <= DEFAULT_TRAININGS_COUNT_LIMIT)

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <button className="btn-flat btn-flat--underlined gym-catalog-form__btnback" type="button" onClick={() => navigate(`${AppRoute.Main}/${params.id}`)}>
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <form className="gym-catalog-form__form">
                    <div className="gym-catalog-form__block gym-catalog-form__block--price">
                      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input type="number" id="text-min" name="minPrice" value={filters.minPrice} onChange={onChange}/>
                          <label htmlFor="minPrice">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input type="number" id="text-max" name="maxPrice" value={filters.maxPrice} onChange={onChange}/>
                          <label htmlFor="maxPrice">до</label>
                        </div>
                      </div>
                      <FilterSlider minCountName='minPrice' maxCountName='maxPrice'
                       minCount={DEFAULT_FILTERS.minPrice} maxCount={DEFAULT_FILTERS.maxPrice} onChange={onFilterChange}/>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                      <h4 className="gym-catalog-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input type="number" id="text-min-cal" name="minCalories" value={filters.minCalories} onChange={onChange}/>
                          <label htmlFor="minCalories">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input type="number" id="text-max-cal" name="maxCalories" value={filters.maxCalories} onChange={onChange}/>
                          <label htmlFor="maxCalories">до</label>
                        </div>
                      </div>
                      <FilterSlider maxCountName="maxCalories" minCountName="minCalories"
                       minCount={DEFAULT_FILTERS.minCalories} maxCount={DEFAULT_FILTERS.maxCalories}
                       onChange={onFilterChange}
                      />
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                      <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <FilterSlider maxCountName="maxRating" minCountName="minRating"
                         maxCount={DEFAULT_FILTERS.maxRating} minCount={DEFAULT_FILTERS.minRating} onChange={onFilterChange}
                        />
                        <div className="filter-raiting__control">
                         <span>{filters.minRating}</span>
                         <span>{filters.maxRating}</span>
                        </div>
                      </div>
                     </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--type">
                      <h4 className="gym-catalog-form__block-title">Тип</h4>
                      <ul className="gym-catalog-form__check-list">
                        {
                          TRAINING_TYPES.map((type) => (
                            <li className="gym-catalog-form__check-list-item">
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input type="checkbox" value={type} name="type" onChange={onChangeFilterType}/>
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">{type}</span>
                              </label>
                            </div>
                          </li>
                          ))
                        }
                      </ul>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
                      <div className="btn-radio-sort gym-catalog-form__radio">
                        <label>
                          <input type="radio" name="sort" checked={sortDirection === 'desc' ? true : false} onChange={() => {setSortDirection('desc'); setFilters(DEFAULT_FILTERS)}}/>
                          <span className="btn-radio-sort__label">Дешевле</span>
                        </label>
                        <label>
                          <input type="radio" name="sort" checked={sortDirection === 'asc' ? true : false} onChange={() => {setSortDirection('asc'); setFilters(DEFAULT_FILTERS)}}/>
                          <span className="btn-radio-sort__label">Дороже</span>
                        </label>
                        <label>
                          <input type="radio" name="sort" checked={filters.minPrice === 0 && filters.maxPrice === 0 ? true : false}
                            onChange={() => setFilters({...filters, 'minPrice': 0, 'maxPrice': 0})}/>
                          <span className="btn-radio-sort__label">Бесплатные</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {
                    trainings.data.map((training) => (
                    <li className="training-catalog__item">
                      <div className="thumbnail-training">
                        <div className="thumbnail-training__inner">
                          <div className="thumbnail-training__image">
                            <picture>
                              <source type="image/webp"/>
                                <img src={`${STATIC_DIRECTORY}${training.backgroundImage}`} width="330" height="190" alt=""/>
                            </picture>
                          </div>
                          {
                          training.price === 0 ? <p className="thumbnail-training__price">Бесплатно</p> :
                          <p className="thumbnail-training__price">
                            <span className="thumbnail-training__price-value">{training.price}</span><span>₽</span>
                          </p>
                          }
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
                            <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    ))
                  }
                </ul>
                <div className="show-more training-catalog__show-more">
                  {backCondition !== undefined || disabledCondition !== undefined ?
                    <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(page + 1)}
                     disabled={disabledCondition !== undefined ? true : false}>Показать еще</button>
                     :
                   <button className="btn show-more__button show-more__button--more" type="button" onClick={() => setPage(1)}>Вернуться в начало</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default TrainingCatalogScreen;
