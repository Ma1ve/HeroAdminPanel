// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
// import { filtersFetching, filtersFetched, filtersFetchingError } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

import { filtersFetching, filtersFetched, filtersFetchingError } from '../../reducers/filters';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
  }, []);

  console.log(filters);

  if (filtersLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (filtersLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    return arr.map(({ name, label, className }) => {
      const btnClass = classNames('btn', className, {
        active: name === activeFilter,
      });

      return (
        <button key={name} id={name} className={btnClass}>
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;

//  <button className="btn btn-outline-dark active">Все</button>
//           <button className="btn btn-danger">Огонь</button>
//           <button className="btn btn-primary">Вода</button>
//           <button className="btn btn-success">Ветер</button>
//           <button className="btn btn-secondary">Земля</button>