const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const HEROES_FETCHING = 'HEROES_FETCHING';
const HEROES_FETCHED = 'HEROES_FETCHED';
const HEROES_FETCHING_ERROR = 'HEROES_FETCHING_ERROR';
const HEROES_DELETE = 'HEROES_DELETE';
const HEROES_ADD = 'HEROES_ADD';

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case HEROES_FETCHING:
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case HEROES_FETCHED:
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: 'idle',
      };
    case HEROES_FETCHING_ERROR:
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };

    case HEROES_DELETE: {
      return {
        ...state,
        heroes: state.heroes.filter((element) => element.id !== action.payload),
      };
    }
    case HEROES_ADD:
      return {
        ...state,
        heroes: [state.heroes, action.payload],
      };

    default:
      return state;
  }
};

export const heroesFetching = () => ({ type: HEROES_FETCHING });
export const heroesFetched = (payload) => ({ type: HEROES_FETCHED, payload });
export const heroesFetchingError = () => ({ type: HEROES_FETCHING_ERROR });
export const heroesDelete = (payload) => ({ type: HEROES_DELETE, payload });
export const heroesAdd = (payload) => ({ type: HEROES_ADD, payload });

export default heroes;

// export const heroesFetched = (heroes) => {
//   return {
//     type: 'HEROES_FETCHED',
//     payload: heroes,
//   };
// };
