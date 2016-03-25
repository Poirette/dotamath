import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import matches from './matches';
import players from './players';
import heroes from './heroes';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  matches,
  players,
  heroes
});
