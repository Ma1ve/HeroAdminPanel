import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import { useCallback } from 'react';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesDelete,
} from '../../reducers/heroes';
import { createSelector } from 'reselect';

const HeroesList = () => {
  const renderSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (filters, heroes) => {
      if (filters === 'all') {
        return heroes;
      } else {
        return heroes.filter((item) => item.element === filters);
      }
    },
  );

  const filteredHeroes = useSelector(renderSelector);
  const heroesLoadingStatus = useSelector((state) => state.heroes);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDeleted = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then((data) => console.log(data, 'DELETED'))
        .then(() => dispatch(heroesDelete(id)))
        .catch((err) => console.log(err));
    },
    [request],
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem key={id} {...props} onDeleted={() => onDeleted(id)} />;
    });
  };

  const elements = renderHeroesList(filteredHeroes);

  return <ul>{elements}</ul>;
};

export default HeroesList;
