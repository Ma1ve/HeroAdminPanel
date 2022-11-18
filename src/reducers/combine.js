import { combineReducers } from 'redux';
import filters from './filters';
import heroes from './heroes';

const reducer = combineReducers({ filters, heroes });

export default reducer;
