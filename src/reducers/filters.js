const initialState = {
  filters: [],
  filtersLoadingStatus: 'idle',
  activeFilter: 'all',
  filteredHeroes: [],
};

const FILTERS_FETCHING = 'FILTERS_FETCHING';
const FILTERS_FETCHED = 'FILTERS_FETCHED';
const FILTERS_FETCHING_ERROR = 'FILTERS_FETCHING_ERROR';
const ACTIVE_FILTER_CHANGED = 'ACTIVE_FILTER_CHANGED';

const filters = (state = initialState, action) => {
  switch (action.type) {
    case FILTERS_FETCHING:
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case FILTERS_FETCHED:
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle',
      };
    case FILTERS_FETCHING_ERROR:
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case ACTIVE_FILTER_CHANGED:
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};

export default filters;

export const filtersFetching = () => ({ type: FILTERS_FETCHING });
export const filtersFetched = (payload) => ({ type: FILTERS_FETCHED, payload });
export const filtersFetchingError = () => ({ type: FILTERS_FETCHING_ERROR });
export const filtersChanged = (payload) => ({ type: ACTIVE_FILTER_CHANGED, payload });
