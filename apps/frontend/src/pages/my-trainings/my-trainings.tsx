import { ChangeEvent, useEffect, useState } from "react";
import Header from "../../components/header/header";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { myTrainingsSelector } from "../../store/training/selectors";
import { fetchMyTrainingsAction } from "../../store/api-actions";
import { AppRoute, DEFAULT_TRAININGS_COUNT_LIMIT, STATIC_DIRECTORY, TRAINING_TIMES } from "../../const";
import { Link, useNavigate, useParams } from "react-router-dom";
import FilterSlider from "../../components/filter-slider/filter-slider";
import { getQueryString } from "../../util";
import LoadingScreen from "../loading-screen/loading-screen";
import ShowMoreButton from "../../components/show-more-button/show-more-button";

function MyTrainings(): JSX.Element {

  const DEFAULT_FILTERS = {
    minPrice: 0,
    maxPrice: 1000,
    minCalories: 1000,
    maxCalories: 5000,
    minRating: 0,
    maxRating: 5,
  }

  const DEFAULT_TIME: string[] = [];
  const DEFAULT_PAGE = 1;

  const myTrainings = useAppSelector(myTrainingsSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filterTime, addFilterTime] = useState<string[]>(DEFAULT_TIME)
  const [page, setPage] = useState<number>(DEFAULT_PAGE)

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFilters({...filters, [target.name]: target.value});
  };

  const onFilterChange = (minName: string, maxName: string, count: number[]) => {
    setFilters({...filters, [minName]: count[0], [maxName]: count[1]})
  };

  const changeFilterTime = (value: string) => {
    if (filterTime) {
    const ind = filterTime.indexOf(value);
    if (ind === -1) {
      addFilterTime([...filterTime, value]);
    }
    else {
      addFilterTime(() => filterTime.filter((val) => val !== value));
    }
   }
  };

  const onChangeFilterTime = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
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
      trainingTime: filterTime,
      page: page,
    })
    dispatch(fetchMyTrainingsAction({queryString}))
  }, [dispatch, filterTime, filters.maxCalories, filters.maxPrice, filters.maxRating, filters.minCalories, filters.minPrice, filters.minRating, page])

  const backCondition = myTrainings.data.find((item) => item.totalPageNumber > page*DEFAULT_TRAININGS_COUNT_LIMIT)
  const disabledCondition = myTrainings.data.find((item) => item.totalPageNumber <= DEFAULT_TRAININGS_COUNT_LIMIT)

  return (
  <div className="wrapper">
  <Header/>
  <main>
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>
          <div className="my-training-form">
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className="my-training-form__wrapper">
              <button className="btn-flat btn-flat--underlined my-training-form__btnback" type="button" onClick={() => navigate(`${AppRoute.CoachAccount}/${params.id}`)}>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <h3 className="my-training-form__title">фильтры</h3>
              <form className="my-training-form__form">
                <div className="my-training-form__block my-training-form__block--price">
                  <h4 className="my-training-form__block-title">Цена, ₽</h4>
                  <div className="filter-price">
                    <div className="filter-price__input-text filter-price__input-text--min">
                      <input type="number" id="text-min" name="minPrice" value={filters.minPrice} onChange={onChange}/>
                      <label htmlFor="text-min">от</label>
                    </div>
                    <div className="filter-price__input-text filter-price__input-text--max">
                      <input type="number" id="text-max" name="maxPrice" value={filters.maxPrice} onChange={onChange}/>
                      <label htmlFor="text-max">до</label>
                    </div>
                  </div>
                    <FilterSlider minCountName='minPrice' maxCountName='maxPrice'
                    minCount={DEFAULT_FILTERS.minPrice} maxCount={DEFAULT_FILTERS.maxPrice} onChange={onFilterChange}/>
                </div>
                <div className="my-training-form__block my-training-form__block--calories">
                  <h4 className="my-training-form__block-title">Калории</h4>
                  <div className="filter-calories">
                    <div className="filter-calories__input-text filter-calories__input-text--min">
                      <input type="number" id="text-min-cal" name="minCalories" value={filters.minCalories} onChange={onChange}/>
                      <label htmlFor="text-min-cal">от</label>
                    </div>
                    <div className="filter-calories__input-text filter-calories__input-text--max">
                      <input type="number" id="text-max-cal" name="maxCalories" value={filters.maxCalories} onChange={onChange}/>
                      <label htmlFor="text-max-cal">до</label>
                    </div>
                  </div>
                    <FilterSlider maxCountName="maxCalories" minCountName="minCalories"
                     minCount={DEFAULT_FILTERS.minCalories} maxCount={DEFAULT_FILTERS.maxCalories}
                     onChange={onFilterChange}
                    />
                </div>
                <div className="my-training-form__block my-training-form__block--raiting">
                  <h4 className="my-training-form__block-title">Рейтинг</h4>
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
                <div className="my-training-form__block my-training-form__block--duration">
                  <h4 className="my-training-form__block-title">Длительность</h4>
                  <ul className="my-training-form__check-list">
                    {TRAINING_TIMES.map((time, i) =>
                      <li className="my-training-form__check-list-item" key={i}>
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input type="checkbox" value={time} name="duration" onChange={onChangeFilterTime}/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                               <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">{time}</span>
                        </label>
                      </div>
                    </li>
                    )}
                  </ul>
                </div>
              </form>
            </div>
          </div>

          <div className="inner-page__content">
            {
            myTrainings.isLoading || myTrainings.data === null ? <LoadingScreen/> :
            <div className="my-trainings">
              <ul className="my-trainings__list">
                {
                myTrainings.data.map((training, i) =>
                  <li className="my-trainings__item" key={i}>
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source type="image/webp"/>
                            <img src={`${STATIC_DIRECTORY}${training.backgroundImage}`}  width="330" height="190" alt=""/>
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
                            <div className="hashtag thumbnail-training__hashtag"><span>#1{training.caloriesCount}</span></div>
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
                )}
              </ul>
              {myTrainings.data.length !== 0 ?
              <ShowMoreButton
                backCondition={backCondition}
                disabledCondition={disabledCondition}
                page={page}
                onClick={() => setPage(page + 1)}
                onClickBack={() => setPage(1)}
              />
              :
              'Тренировок нет'
              }
            </div>
          }
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

  )
}

export default MyTrainings;
