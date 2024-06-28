import {combineReducers} from '@reduxjs/toolkit';
import userDamiReducer from './userDami';

export const rootReducer = combineReducers({
  // Add reducers here
  userDami: userDamiReducer,
});

export {
  login,
  logout,
  register,
  setError,
  startFetching,
  stopFetching,
  unRegister,
} from './userDami';
